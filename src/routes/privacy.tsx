import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageMeta({
      title: "Privacy | Stoke Fleming Guide",
      description: "What the Stoke Fleming Guide stores, and what it refuses to store. No analytics. No private phone numbers.",
      path: "/privacy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl">Privacy</h1>
      <p className="mt-4">This guide is published from the United Kingdom. The short version:</p>
      <ul className="mt-4 list-disc space-y-3 pl-5">
        <li>Event and stay forms publish what you type, except a hidden anti-spam field. They do not ask for an email or a phone number. Do not put one in the description.</li>
        <li>The correction form stores the page name and the message for the editor. There is no public inbox. Do not include your home address.</li>
        <li>Joining the newsletter stores your email address, and the time you ticked consent, in a private Cloudflare database used only to send the monthly note. It is not published on the site and it is not mixed in with events. Emails are not sent until a mail service is connected. Tick the box only if you want the note.</li>
        <li>The trip planner uses local storage on your device. It never leaves the browser.</li>
        <li>Weather is fetched from Open-Meteo. That request includes the village coordinates, which are not personal.</li>
        <li>We do not run Google Analytics, Microsoft Clarity or Crazy Egg. The previous site did, and it started them before asking.</li>
        <li>The old village directory’s personal mobiles and private email addresses are not on this site. If one of yours was on the old site, say so via the contact form and it will stay off.</li>
      </ul>
      <p className="mt-4">Council business and your data as a resident are the parish council’s responsibility, at stokefleming.org.</p>
    </main>
  );
}
