import { createFileRoute, Link } from "@tanstack/react-router";
import { ACTIVITIES } from "@/content/guide";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/things-to-do")({
  head: () =>
    pageMeta({
      title: "Things to do in Stoke Fleming | Walks, the beach, Dartmouth",
      description:
        "Walks from Stoke Fleming with real timings: 25 minutes down to Blackpool Sands, longer on the coast path, and Dartmouth for boats. Each card links to a detail page.",
      path: "/things-to-do",
    }),
  component: ThingsPage,
});

function ThingsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl sm:text-5xl">Things to do</h1>
      <p className="mt-4 max-w-3xl text-lg text-muted">
        Eight things you can actually follow up. Boat trips and fishing leave from Dartmouth, so they are not listed as if they start in the village. There is no photography tour with no photographer.
      </p>
      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {ACTIVITIES.map((item) => (
          <article key={item.slug} className="overflow-hidden rounded-2xl bg-paper shadow-lg">
            <img src={item.image} alt={item.imageAlt} width={item.width} height={item.height} className="aspect-3/2 w-full object-cover" loading="lazy" />
            <div className="p-5">
              <h2 className="text-2xl">{item.title}</h2>
              <p className="mt-2">{item.summary}</p>
              <p className="mt-3 text-sm font-semibold text-sea-deep">{item.duration} · {item.effort}</p>
              <Link to="/things-to-do/$slug" params={{ slug: item.slug }} className="mt-4 inline-flex min-h-11 items-center font-semibold text-sea underline">
                Route, parking and who to ask
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
