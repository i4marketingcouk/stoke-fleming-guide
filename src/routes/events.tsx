import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { FIXTURES } from "@/content/guide";
import { listEvents, submitEvent } from "@/lib/community.functions";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/events")({
  loader: () => listEvents(),
  head: () =>
    pageMeta({
      title: "Events in Stoke Fleming | Village fixtures and community listings",
      description:
        "Parish council, the village show and neighbouring Dartmouth dates, plus events local businesses add themselves. No empty month pretending nothing happens.",
      path: "/events",
    }),
  component: EventsPage,
});

function EventsPage() {
  const events = Route.useLoaderData();
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl sm:text-5xl">Events</h1>
      <p className="mt-4 max-w-3xl text-lg">
        Dated listings are added by businesses and residents and appear straight away, marked as unchecked. The fixtures underneath happen whether or not anyone has typed in this year’s date.
      </p>

      <section className="mt-10">
        <h2 className="text-3xl">Coming up</h2>
        {events.length === 0 ? (
          <p className="mt-3 max-w-2xl">
            No dated event has been submitted yet. That is an empty list, not an empty village — the fixtures below are the regular ones.
          </p>
        ) : (
          <ul className="mt-4 space-y-4">
            {events.map((event) => (
              <li key={event.id} className="border border-line p-4">
                <p className="text-sm font-semibold text-sea">{event.startsOn}{event.startTime ? ` · ${event.startTime}` : ""}</p>
                <h3 className="text-2xl">{event.title}</h3>
                <p>{event.summary}</p>
                <p className="mt-2 text-muted">{event.place} · {event.organiser}</p>
                <p className="mt-2 text-sm">Added by a local business or resident. Not checked by an editor.</p>
                {event.website ? <a className="mt-2 inline-flex min-h-11 items-center font-semibold text-sea underline" href={event.website}>More</a> : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-3xl">Through the year</h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {FIXTURES.map((fixture) => (
            <li key={fixture.title} className="bg-foam p-4">
              <h3 className="text-2xl">{fixture.title}</h3>
              <p className="font-semibold">{fixture.when}</p>
              <p className="text-muted">{fixture.where}</p>
              <p className="mt-2">{fixture.summary}</p>
              <a className="mt-2 inline-flex min-h-11 items-center font-semibold text-sea underline" href={fixture.url}>Where the date is confirmed</a>
            </li>
          ))}
        </ul>
      </section>

      <EventForm />
    </main>
  );
}

function EventForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  return (
    <form
      className="mt-12 max-w-2xl border border-line p-5"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        setPending(true);
        setMessage("");
        try {
          const result = await submitEvent({
            data: {
              title: String(form.get("title") || ""),
              startsOn: String(form.get("startsOn") || ""),
              startTime: String(form.get("startTime") || ""),
              place: String(form.get("place") || ""),
              summary: String(form.get("summary") || ""),
              organiser: String(form.get("organiser") || ""),
              website: String(form.get("website") || ""),
              companyFax: String(form.get("companyFax") || ""),
            },
          });
          if (!result.ok) setMessage(result.error);
          else {
            setMessage("Published. It is on the list now, and marked as unchecked.");
            event.currentTarget.reset();
            await router.invalidate();
          }
        } catch {
          setMessage("Check the date and the description. Do not put a phone number in the form — it is not asked for, and it would be public.");
        } finally {
          setPending(false);
        }
      }}
    >
      <h2 className="text-3xl">Add an event</h2>
      <p className="mt-2 text-muted">
        For a business, club or village date. The organiser field is the name you want published — the pub, the school, the show committee — not a private mobile. No passcode. No email is stored.
      </p>
      <div className="mt-4 grid gap-3">
        <label className="grid gap-1 font-semibold">Title<input name="title" required className="min-h-11 border border-line px-3 font-normal" /></label>
        <label className="grid gap-1 font-semibold">Date<input name="startsOn" type="date" required className="min-h-11 border border-line px-3 font-normal" /></label>
        <label className="grid gap-1 font-semibold">Time<input name="startTime" placeholder="19:00" className="min-h-11 border border-line px-3 font-normal" /></label>
        <label className="grid gap-1 font-semibold">Place<input name="place" required className="min-h-11 border border-line px-3 font-normal" /></label>
        <label className="grid gap-1 font-semibold">What is happening<textarea name="summary" required minLength={10} rows={4} className="border border-line px-3 py-2 font-normal" /></label>
        <label className="grid gap-1 font-semibold">Organisation<input name="organiser" required className="min-h-11 border border-line px-3 font-normal" /></label>
        <label className="grid gap-1 font-semibold">Website, if you have one<input name="website" type="url" placeholder="https://" className="min-h-11 border border-line px-3 font-normal" /></label>
        <input name="companyFax" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <button type="submit" disabled={pending} className="min-h-11 bg-sea px-4 font-semibold text-paper disabled:opacity-60">
          {pending ? "Publishing…" : "Publish event"}
        </button>
        {message ? <p role="status">{message}</p> : null}
      </div>
    </form>
  );
}
