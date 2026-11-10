import { createFileRoute, Link } from "@tanstack/react-router";
import { BEACHES } from "@/content/guide";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/beaches")({
  head: () =>
    pageMeta({
      title: "Beaches near Stoke Fleming | Blackpool Sands, Strete Gate, Slapton",
      description:
        "Blackpool Sands is a 25-minute walk and a shingle cove. Strete Gate is a naturist beach several miles on. Slapton Sands is the long bar. Distances are not mixed up.",
      path: "/beaches",
    }),
  component: BeachesPage,
});

function BeachesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl sm:text-5xl">Beaches</h1>
      <p className="mt-4 max-w-3xl text-lg">
        Three different shores. They do not share a photograph, a walking time, or a dog rule.
      </p>
      <div className="mt-8 space-y-10">
        {BEACHES.map((beach) => (
          <article key={beach.slug} className="grid items-start gap-6 border-b border-line pb-10 lg:grid-cols-2">
            <img src={beach.image} alt={beach.imageAlt} width={beach.width} height={beach.height} className="w-full object-cover" loading="lazy" />
            <div>
              <h2 className="text-3xl">{beach.name}</h2>
              <p className="mt-3">{beach.summary}</p>
              <p className="mt-3 font-semibold">{beach.fromVillage}</p>
              <Link to="/beaches/$slug" params={{ slug: beach.slug }} className="mt-4 inline-flex min-h-11 items-center font-semibold text-sea underline">
                Facilities, dogs and safety
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
