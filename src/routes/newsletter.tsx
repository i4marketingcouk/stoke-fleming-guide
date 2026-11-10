import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { listEvents, listNewsletterMonths, saveNewsletterDraft } from "@/lib/community.functions";
import { composeNewsletter, currentMonthKey } from "@/lib/newsletter";
import { pageMeta } from "@/lib/seo";

const LOCAL_KEY = "stokeFlemingNewsletter";

export const Route = createFileRoute("/newsletter")({
  loader: async () => {
    const [events, drafts] = await Promise.all([listEvents(), listNewsletterMonths()]);
    return { events, drafts };
  },
  head: () =>
    pageMeta({
      title: "Monthly newsletter | Stoke Fleming Guide",
      description:
        "A monthly note of village events, fixtures and food hours. The preview shows the edition. Addresses are not stored on the public site until the mail worker is connected.",
      path: "/newsletter",
    }),
  component: NewsletterPage,
});

function NewsletterPage() {
  const { events, drafts } = Route.useLoaderData();
  const month = currentMonthKey();
  const draft = composeNewsletter(events, month);
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const [consent, setConsent] = useState(false);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl sm:text-5xl">Monthly newsletter</h1>
      <p className="mt-4 text-lg">
        On the first morning of the month the guide builds this note from whatever events people have added, plus the fixtures that happen anyway. You can prepare the same draft now.
      </p>
      <form
        className="mt-8 grid gap-3 border border-line p-5"
        onSubmit={async (event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const email = String(form.get("email") || "").trim();
          if (!consent) {
            setStatus("Tick the box. A newsletter needs a yes.");
            return;
          }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setStatus("That does not look like an email address.");
            return;
          }
          setPending(true);
          try {
            const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT as string | undefined;
            if (endpoint) {
              const response = await fetch(endpoint, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email, consent: true }),
              });
              if (!response.ok) throw new Error("subscribe");
              setStatus("You are on the list. The next edition goes on the first of the month.");
            } else {
              const existing = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]") as string[];
              const next = Array.from(new Set([...existing, email]));
              localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
              await saveNewsletterDraft({ data: { month, body: draft } });
              setStatus("Saved in this browser, and this month’s draft is stored without your address. Live sending starts when the Cloudflare mail worker is connected — your address is not in the public database.");
            }
            event.currentTarget.reset();
            setConsent(false);
          } catch {
            setStatus("The list did not save. Try again in a moment.");
          } finally {
            setPending(false);
          }
        }}
      >
        <label className="grid gap-1 font-semibold" htmlFor="email">
          Email address
          <input id="email" name="email" type="email" required autoComplete="email" className="min-h-11 border border-line px-3 font-normal" />
        </label>
        <label className="flex items-start gap-3">
          <input type="checkbox" className="mt-1 h-5 w-5" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
          <span>Send me one email a month about Stoke Fleming events and practical changes. I can stop by replying, or by clearing this browser if I only joined the preview.</span>
        </label>
        <button type="submit" disabled={pending} className="min-h-11 bg-sea px-4 font-semibold text-paper disabled:opacity-60">
          {pending ? "Saving…" : "Join the monthly note"}
        </button>
        {status ? <p role="status">{status}</p> : null}
      </form>

      <h2 className="mt-12 text-3xl">This month’s draft</h2>
      <pre className="mt-4 overflow-x-auto whitespace-pre-wrap border border-line bg-foam p-4 font-sans text-base">{drafts[0]?.body || draft}</pre>
      <button
        type="button"
        className="mt-4 min-h-11 border border-sea px-4 font-semibold text-sea"
        onClick={() => saveNewsletterDraft({ data: { month, body: draft } }).then(() => setStatus("Draft refreshed from the events currently on the site."))}
      >
        Rebuild the {month} draft
      </button>
    </main>
  );
}
