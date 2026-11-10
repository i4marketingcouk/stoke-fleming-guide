import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { SITE } from "@/content/guide";
import { getSql } from "@/lib/db";

export type CommunityEvent = {
  id: number;
  title: string;
  startsOn: string;
  startTime: string;
  place: string;
  summary: string;
  organiser: string;
  website: string;
};

export type StayListing = {
  id: number;
  name: string;
  kind: string;
  area: string;
  summary: string;
  website: string;
};

const emptyToNull = (value: string | undefined) => {
  const trimmed = value?.trim() ?? "";
  return trimmed.length ? trimmed : null;
};

const httpUrl = z
  .string()
  .trim()
  .max(200)
  .refine((value) => value === "" || /^https?:\/\/[^\s]+$/i.test(value), "Use a full http or https link, or leave it blank.");

export const listEvents = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql<{
    id: number;
    title: string;
    starts_on: string;
    start_time: string | null;
    place: string;
    summary: string;
    organiser: string;
    website: string | null;
  }>`select id, title, starts_on::text as starts_on, start_time, place, summary, organiser, website
     from community_events
     where starts_on >= current_date
     order by starts_on asc, id asc
     limit 100`;
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    startsOn: row.starts_on,
    startTime: row.start_time ?? "",
    place: row.place,
    summary: row.summary,
    organiser: row.organiser,
    website: row.website ?? "",
  })) satisfies CommunityEvent[];
});

const eventInput = z.object({
  title: z.string().trim().min(3).max(120),
  startsOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z.string().trim().max(40),
  place: z.string().trim().min(2).max(120),
  summary: z.string().trim().min(10).max(600),
  organiser: z.string().trim().min(2).max(80),
  website: httpUrl,
  companyFax: z.string().max(0).optional(),
});

export const submitEvent = createServerFn({ method: "POST" })
  .validator((data: unknown) => eventInput.parse(data))
  .handler(async ({ data }) => {
    if (data.companyFax) return { ok: true as const };
    const today = new Date().toISOString().slice(0, 10);
    if (data.startsOn < today) {
      return { ok: false as const, error: "The date needs to be today or later." };
    }
    const sql = await getSql();
    await sql`insert into community_events (title, starts_on, start_time, place, summary, organiser, website)
      values (${data.title}, ${data.startsOn}, ${emptyToNull(data.startTime)}, ${data.place}, ${data.summary}, ${data.organiser}, ${emptyToNull(data.website)})`;
    await fetch(SITE.eventsEndpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        startsOn: data.startsOn,
        startTime: data.startTime,
        place: data.place,
        summary: data.summary,
        organiser: data.organiser,
        website: data.website,
      }),
    }).catch(() => undefined);
    return { ok: true as const };
  });

export const listStays = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql<{
    id: number;
    name: string;
    kind: string;
    area: string;
    summary: string;
    website: string;
  }>`select id, name, kind, area, summary, website from stay_listings order by id desc limit 50`;
  return rows satisfies StayListing[];
});

const stayInput = z.object({
  name: z.string().trim().min(2).max(80),
  kind: z.string().trim().min(2).max(40),
  area: z.string().trim().min(2).max(120),
  summary: z.string().trim().min(20).max(400),
  website: z.string().trim().url().max(200),
  companyFax: z.string().max(0).optional(),
});

export const submitStay = createServerFn({ method: "POST" })
  .validator((data: unknown) => stayInput.parse(data))
  .handler(async ({ data }) => {
    if (data.companyFax) return { ok: true as const };
    const sql = await getSql();
    await sql`insert into stay_listings (name, kind, area, summary, website)
      values (${data.name}, ${data.kind}, ${data.area}, ${data.summary}, ${data.website})`;
    return { ok: true as const };
  });

const correctionInput = z.object({
  page: z.string().trim().min(1).max(120),
  message: z.string().trim().min(10).max(500),
  companyFax: z.string().max(0).optional(),
});

export const submitCorrection = createServerFn({ method: "POST" })
  .validator((data: unknown) => correctionInput.parse(data))
  .handler(async ({ data }) => {
    if (data.companyFax) return { ok: true as const };
    const sql = await getSql();
    await sql`insert into corrections (page, message) values (${data.page}, ${data.message})`;
    return { ok: true as const };
  });

export const listNewsletterMonths = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  return sql<{ month: string; body: string }>`select month, body from newsletter_drafts order by month desc limit 6`;
});

export const saveNewsletterDraft = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z.object({ month: z.string().regex(/^\d{4}-\d{2}$/), body: z.string().min(20).max(8000) }).parse(data),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`insert into newsletter_drafts (month, body) values (${data.month}, ${data.body})
      on conflict (month) do update set body = excluded.body, created_at = now()`;
    return { ok: true as const };
  });
