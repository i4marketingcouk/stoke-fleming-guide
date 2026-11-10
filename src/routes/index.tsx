import { createFileRoute, Link } from "@tanstack/react-router";
import { ACTIVITIES, BEACHES, FOOD, SITE } from "@/content/guide";
import { ConditionsPanel } from "@/components/weather-panel";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta({
      title: "Stoke Fleming Guide | Start Bay, South Devon",
      description: SITE.description,
      path: "/",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE.name,
        url: SITE.origin,
        description: SITE.description,
        inLanguage: "en-GB",
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE.origin}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    }),
  component: Home,
});

function Home() {
  return (
    <main>
      <section className="bg-sea-deep text-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 lg:grid-cols-2 lg:py-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-sand">South Devon · Start Bay</p>
            <h1 className="mt-3 text-5xl text-paper sm:text-6xl">Stoke Fleming</h1>
            <p className="mt-4 max-w-xl text-lg text-sand">
              A hill village between Dartmouth and Strete. One pub, a church, a steep walk down to a clear-water cove. This is an independent guide, not a tourist board.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/visit" className="inline-flex min-h-11 items-center bg-sand px-5 font-semibold text-ink">
                Plan the practical bits
              </Link>
              <Link to="/beaches" className="inline-flex min-h-11 items-center border border-sand px-5 font-semibold text-paper">
                The three beaches
              </Link>
            </div>
          </div>
          <figure>
            <img
              src="/photos/village.jpg"
              alt="The stone tower of St Peter's Church in Stoke Fleming"
              width={1024}
              height={768}
              className="aspect-4/3 w-full object-cover"
            />
            <figcaption className="mt-2 text-sm text-sand">St Peter's Church, the landmark in the village centre.</figcaption>
          </figure>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12">
        <ConditionsPanel />

        <section>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl">Start with something true</h2>
            <Link to="/things-to-do" className="hidden font-semibold text-sea underline sm:inline">
              All things to do
            </Link>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {ACTIVITIES.slice(0, 3).map((item) => (
              <Link key={item.slug} to="/things-to-do/$slug" params={{ slug: item.slug }} className="border border-line bg-paper">
                <img src={item.image} alt={item.imageAlt} width={item.width} height={item.height} className="aspect-3/2 w-full object-cover" loading="lazy" />
                <div className="p-4">
                  <h3 className="text-2xl">{item.title}</h3>
                  <p className="mt-2 text-muted">{item.duration}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-3xl">Beaches, with the distances unmixed</h2>
            <ul className="mt-4 space-y-4">
              {BEACHES.map((beach) => (
                <li key={beach.slug} className="border-b border-line pb-4">
                  <Link to="/beaches/$slug" params={{ slug: beach.slug }} className="text-xl font-semibold text-sea-deep">
                    {beach.name}
                  </Link>
                  <p className="text-muted">{beach.fromVillage}</p>
                  <p className="mt-1">{beach.surface}</p>
                </li>
              ))}
            </ul>
          </div>
          <aside className="bg-foam p-5">
            <h2 className="text-2xl">Eat</h2>
            <p className="mt-2 text-muted">No star ratings. Hours live on the business's own site.</p>
            <ul className="mt-4 space-y-3">
              {FOOD.slice(0, 3).map((place) => (
                <li key={place.name}>
                  <p className="font-semibold">{place.name}</p>
                  <p className="text-muted">{place.kind}</p>
                </li>
              ))}
            </ul>
            <Link to="/food-drink" className="mt-4 inline-flex min-h-11 items-center font-semibold text-sea underline">
              Food and drink
            </Link>
          </aside>
        </section>

        <section className="border border-line p-5">
          <h2 className="text-3xl">A map that goes somewhere</h2>
          <p className="mt-2 max-w-3xl text-muted">
            OpenStreetMap, centred on the church. Walking routes are described on each activity, not drawn as a promise this map cannot keep.
          </p>
          <iframe
            title="Map of Stoke Fleming on OpenStreetMap"
            className="mt-4 h-80 w-full border border-line"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-3.64%2C50.29%2C-3.56%2C50.35&layer=mapnik&marker=50.3237%2C-3.6000"
            loading="lazy"
          />
          <a
            className="mt-3 inline-flex min-h-11 items-center font-semibold text-sea underline"
            href="https://www.openstreetmap.org/?mlat=50.3237&mlon=-3.6000#map=14/50.3237/-3.6000"
          >
            Open the full map
          </a>
        </section>
      </div>
    </main>
  );
}
