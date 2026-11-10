import { createFileRoute, Link } from "@tanstack/react-router";
import { DIRECTORY } from "@/content/guide";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/community")({
  head: () =>
    pageMeta({
      title: "Stoke Fleming village directory | Council, hall, church, clubs",
      description:
        "Public organisations in Stoke Fleming, with links rather than private mobiles. Personal email addresses from the old directory are not republished.",
      path: "/community",
    }),
  component: CommunityPage,
});

function CommunityPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl sm:text-5xl">Village directory</h1>
      <p className="mt-4 max-w-3xl text-lg">
        This used to be hidden in the footer, and it printed neighbours’ mobiles and home email addresses. Those are gone. If a club wants to be found, it can publish a website and send a correction.
      </p>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {DIRECTORY.map((entry) => (
          <li key={entry.name} className="border border-line p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-sea">{entry.category}</p>
            <h2 className="text-2xl">{entry.name}</h2>
            <p className="mt-2">{entry.summary}</p>
            <a className="mt-3 inline-flex min-h-11 items-center font-semibold text-sea underline" href={entry.url}>Public page</a>
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <Link to="/contact" className="font-semibold text-sea underline">Tell us a public website that should be added</Link>
      </p>
    </main>
  );
}
