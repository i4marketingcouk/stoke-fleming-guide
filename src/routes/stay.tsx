import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { STAYS } from "@/content/guide";
import { listStays, submitStay } from "@/lib/community.functions";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/stay")({
  loader: () => listStays(),
  head: () =>
    pageMeta({
      title: "Where to stay in Stoke Fleming | Hotels, guest houses, hides",
      description:
        "Stoke Lodge, Channel View and the Birdhouses, with links to the people who actually take the booking. No invented prices or ratings. Owners can add a listing.",
      path: "/stay",
    }),
  component: StayPage,
});

function StayPage() {
  const added = Route.useLoaderData();
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl sm:text-5xl">Stay</h1>
      <p className="mt-4 max-w-3xl text-lg">
        Prices and “superhost” badges were being typed in by hand and going stale. This page links to the booking site and stops there. The publisher’s own cottage is not pinned to the top.
      </p>
      <div className="mt-8 grid gap-4">
        {STAYS.map((stay) => (
          <StayCard key={stay.name} name={stay.name} kind={stay.kind} area={stay.area} summary={stay.summary} website={stay.url} ownerListed={stay.ownerListed} />
        ))}
        {added.map((stay) => (
          <StayCard key={stay.id} name={stay.name} kind={stay.kind} area={stay.area} summary={stay.summary} website={stay.website} ownerListed />
        ))}
      </div>
      <StayForm />
    </main>
  );
}

function StayCard(stay: { name: string; kind: string; area: string; summary: string; website: string; ownerListed: boolean }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-paper p-6 shadow-lg">
      <p className="text-sm font-semibold uppercase tracking-wide text-sea">{stay.kind}</p>
      <h2 className="text-3xl">{stay.name}</h2>
      <p className="text-muted">{stay.area}</p>
      <p className="mt-3">{stay.summary}</p>
      {stay.ownerListed ? (
        <p className="mt-3 bg-sand/50 p-3 text-sm">Listed by the owner through this site. Not an independent review, and not checked for availability.</p>
      ) : null}
      <a className="mt-4 inline-flex min-h-11 items-center font-semibold text-sea underline" href={stay.website}>Booking site</a>
    </article>
  );
}

function StayForm() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  return (
    <form
      className="mt-12 max-w-2xl border border-line bg-foam p-5"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        setPending(true);
        setMessage("");
        try {
          const result = await submitStay({
            data: {
              name: String(form.get("name") || ""),
              kind: String(form.get("kind") || ""),
              area: String(form.get("area") || ""),
              summary: String(form.get("summary") || ""),
              website: String(form.get("website") || ""),
              companyFax: String(form.get("companyFax") || ""),
            },
          });
          if (!result.ok) {
            setMessage("That listing could not be saved.");
          } else {
            setMessage("Saved. It is labelled as an owner listing. Refresh to see it.");
            event.currentTarget.reset();
          }
        } catch {
          setMessage("Check the fields. The website must be a full https link, and the description needs a proper sentence.");
        } finally {
          setPending(false);
        }
      }}
    >
      <h2 className="text-3xl">List a place to stay</h2>
      <p className="mt-2 text-muted">
        No email address is stored. The card shows your public website. Say if you are the owner in the description — the card is already marked “listed by the owner”.
      </p>
      <div className="mt-4 grid gap-3">
        <label className="grid gap-1 font-semibold">Name<input name="name" required className="min-h-11 border border-line bg-paper px-3 font-normal" /></label>
        <label className="grid gap-1 font-semibold">Type<input name="kind" required placeholder="Cottage, room, hotel" className="min-h-11 border border-line bg-paper px-3 font-normal" /></label>
        <label className="grid gap-1 font-semibold">Where it actually is<input name="area" required className="min-h-11 border border-line bg-paper px-3 font-normal" /></label>
        <label className="grid gap-1 font-semibold">Short description<textarea name="summary" required minLength={20} rows={4} className="border border-line bg-paper px-3 py-2 font-normal" /></label>
        <label className="grid gap-1 font-semibold">Website<input name="website" type="url" required placeholder="https://" className="min-h-11 border border-line bg-paper px-3 font-normal" /></label>
        <input name="companyFax" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <button type="submit" disabled={pending} className="min-h-11 bg-sea px-4 font-semibold text-paper disabled:opacity-60">
          {pending ? "Saving…" : "Publish listing"}
        </button>
        {message ? <p role="status">{message}</p> : null}
      </div>
    </form>
  );
}
