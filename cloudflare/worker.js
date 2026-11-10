const FIXTURES = [
  "Parish council: first Wednesday of the month, Village Hall.",
  "Horticultural and sports show: once a year, date announced locally.",
  "Dartmouth Royal Regatta: usually the end of August, in Dartmouth.",
];

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
    },
  });
}

function compose(events, month) {
  const lines = [
    `Stoke Fleming Guide — ${month}`,
    "",
    "Dated events:",
    ...(events.length
      ? events.map((event) => `• ${event.starts_on} ${event.start_time || ""} — ${event.title}, ${event.place}. ${event.summary}`)
      : ["Nothing new has been submitted."]),
    "",
    "Through the year:",
    ...FIXTURES.map((line) => `• ${line}`),
    "",
    "Tides are not calculated in this note. Use a Dartmouth tide table.",
  ];
  return lines.join("\n");
}

async function sendDraft(env, body, month) {
  if (!env.RESEND_API_KEY || !env.NEWSLETTER_FROM) return { sent: 0, reason: "no-mailer" };
  const rows = await env.DB.prepare("select email from subscribers").all();
  let sent = 0;
  for (const row of rows.results || []) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: env.NEWSLETTER_FROM,
        to: row.email,
        subject: `Stoke Fleming — ${month}`,
        text: `${body}\n\nYou asked for this monthly note. Reply to this address to stop.`,
      }),
    });
    if (response.ok) sent += 1;
  }
  return { sent };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "POST, GET, OPTIONS",
          "access-control-allow-headers": "content-type",
        },
      });
    }
    if (url.pathname === "/subscribe" && request.method === "POST") {
      const body = await request.json();
      if (!body?.consent || typeof body.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
        return json({ ok: false, error: "Email and consent are required." }, 400);
      }
      await env.DB.prepare("insert into subscribers (email, consented_at) values (?1, ?2) on conflict(email) do update set consented_at = excluded.consented_at")
        .bind(body.email.trim().toLowerCase(), new Date().toISOString())
        .run();
      return json({ ok: true });
    }
    if (url.pathname === "/events" && request.method === "POST") {
      const body = await request.json();
      if (body.companyFax) return json({ ok: true });
      const title = String(body.title || "").trim();
      const startsOn = String(body.startsOn || "");
      const place = String(body.place || "").trim();
      const summary = String(body.summary || "").trim();
      const organiser = String(body.organiser || "").trim();
      if (title.length < 3 || !/^\d{4}-\d{2}-\d{2}$/.test(startsOn) || summary.length < 10 || organiser.length < 2) {
        return json({ ok: false, error: "Check the event fields." }, 400);
      }
      await env.DB.prepare(
        "insert into events (title, starts_on, start_time, place, summary, organiser, website, created_at) values (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)",
      )
        .bind(title, startsOn, body.startTime || null, place, summary, organiser, body.website || null, new Date().toISOString())
        .run();
      return json({ ok: true });
    }
    if (url.pathname === "/draft" && request.method === "GET") {
      const row = await env.DB.prepare("select month, body from drafts order by month desc limit 1").first();
      return json({ draft: row || null });
    }
    return json({ ok: false, error: "Not found" }, 404);
  },

  async scheduled(_event, env) {
    const month = new Date().toISOString().slice(0, 7);
    const events = await env.DB.prepare(
      "select title, starts_on, start_time, place, summary from events where starts_on >= date('now') order by starts_on limit 30",
    ).all();
    const body = compose(events.results || [], month);
    await env.DB.prepare(
      "insert into drafts (month, body, created_at) values (?1, ?2, ?3) on conflict(month) do update set body = excluded.body, created_at = excluded.created_at",
    )
      .bind(month, body, new Date().toISOString())
      .run();
    await sendDraft(env, body, month);
  },
};
