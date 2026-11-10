import { createFileRoute, Link } from "@tanstack/react-router";
import { ACTIVITIES, BEACHES, SITE } from "@/content/guide";
import { ConditionsPanel } from "@/components/weather-panel";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta({
      title: "Visit Stoke Fleming | South Devon coastal village",
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

const AREAS = ["st-peters-church", "blackpool-sands-day", "coast-path-dartmouth", "slapton-ley"];

const BEACH_CHIPS: Record<string, string[]> = {
  "blackpool-sands": ["Shingle cove", "Clear water", "Café in season"],
  "strete-gate": ["Naturist beach", "About 3 miles south", "No café"],
  "slapton-sands": ["Pebble bar", "Nature reserve", "No lifeguard"],
};

function Home() {
  const featured = ACTIVITIES.slice(0, 6);
  const areas = AREAS.map((slug) => ACTIVITIES.find((item) => item.slug === slug)).filter((item) => item !== undefined);

  return (
    <main>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/photos/blackpool-sands.jpg"
            alt=""
            width={1600}
            height={1200}
            className="hero-drift h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-sea-deep/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-sea-deep/80 via-transparent to-sea-deep/35" />
        </div>
        <div className="relative z-10 w-full max-w-5xl px-4 pb-16 pt-24 text-center text-paper">
          <h1 className="text-4xl font-bold leading-tight text-paper md:text-6xl lg:text-7xl">
            Welcome to
            <br />
            <span className="text-paper">Stoke Fleming</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-light text-paper md:text-2xl">
            A South Devon village above Start Bay. The cove, the coast path, and one pub.
          </p>
          <a
            href="#things-to-do"
            className="mt-8 inline-flex min-h-11 items-center bg-sea px-8 py-3 text-lg font-semibold text-paper shadow-lg"
          >
            Start Exploring
          </a>
          <ConditionsPanel />
          <p className="mt-4 text-xs text-paper/70">
            Beach photograph: Derek Harper, Geograph 4343133, CC BY-SA 2.0.{" "}
            <a className="underline" href="https://www.youtube.com/watch?v=tJBDtusZWYg">
              Watch a film of the village
            </a>
            . An independent guide, not a tourist board.
          </p>
        </div>
      </section>

      <section id="things-to-do" className="scroll-mt-20 bg-paper py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl text-ink md:text-5xl">Things to do in Stoke Fleming</h2>
            <p className="mt-4 text-xl text-muted">
              Coastal walks, the church, and a day on the shingle. The times are the real ones.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <Link
                key={item.slug}
                to="/things-to-do/$slug"
                params={{ slug: item.slug }}
                className="overflow-hidden rounded-2xl bg-paper shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                <img src={item.image} alt={item.imageAlt} width={item.width} height={item.height} className="aspect-3/2 w-full object-cover" loading="lazy" />
                <div className="p-6 text-left">
                  <h3 className="text-xl text-ink">{item.title}</h3>
                  <p className="mt-2 text-muted">{item.summary}</p>
                  <p className="mt-4 text-sm text-muted">{item.duration}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-10 text-center">
            <Link to="/things-to-do" className="inline-flex min-h-11 items-center bg-sea px-8 font-semibold text-paper">
              All things to do
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-foam py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl text-ink md:text-5xl">Explore by area</h2>
            <p className="mt-4 text-xl text-muted">
              The village centre, the cove, the cliffs towards Dartmouth, and the long shore at Slapton.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {areas.map((item) => (
              <Link
                key={item.slug}
                to="/things-to-do/$slug"
                params={{ slug: item.slug }}
                className="group relative min-h-72 overflow-hidden rounded-2xl shadow-lg"
              >
                <img src={item.image} alt="" width={item.width} height={item.height} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-sea-deep/85 via-sea-deep/25 to-transparent" />
                <div className="relative flex h-full min-h-72 flex-col justify-end p-6 text-paper">
                  <h3 className="text-2xl text-paper">{item.title}</h3>
                  <p className="mt-2 text-paper/90">{item.duration}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl text-ink md:text-5xl">Beautiful beaches nearby</h2>
          <p className="mx-auto mt-4 max-w-3xl text-xl text-muted">
            Three different shores. Blackpool Sands is the village cove. The other two are a drive away.
          </p>
          <div className="mt-12 space-y-12 text-left">
            {BEACHES.map((beach, index) => (
              <article key={beach.slug} className="grid items-center gap-8 lg:grid-cols-2">
                <img
                  src={beach.image}
                  alt={beach.imageAlt}
                  width={beach.width}
                  height={beach.height}
                  className={`aspect-3/2 w-full rounded-2xl object-cover shadow-lg ${index % 2 === 1 ? "lg:order-2" : ""}`}
                  loading="lazy"
                />
                <div>
                  <h3 className="text-3xl text-ink">{beach.name}</h3>
                  <p className="mt-3 text-lg text-muted">{beach.summary}</p>
                  <p className="mt-3 font-semibold text-ink">{beach.fromVillage}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(BEACH_CHIPS[beach.slug] ?? []).map((chip) => (
                      <span key={chip} className="rounded-full bg-sand px-3 py-1 text-sm font-medium text-sea-deep">
                        {chip}
                      </span>
                    ))}
                  </div>
                  <Link to="/beaches/$slug" params={{ slug: beach.slug }} className="mt-6 inline-flex min-h-11 items-center bg-sea px-6 font-semibold text-paper">
                    Beach notes
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-foam py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl text-ink">Map of the village</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            OpenStreetMap, centred on St Peter's Church. Walking routes are written on each activity, not drawn as a promise this map cannot keep.
          </p>
          <iframe
            title="Map of Stoke Fleming on OpenStreetMap"
            className="mt-8 h-96 w-full rounded-2xl border border-line shadow-lg"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-3.64%2C50.29%2C-3.56%2C50.35&layer=mapnik&marker=50.3237%2C-3.6000"
            loading="lazy"
          />
          <a
            className="mt-6 inline-flex min-h-11 items-center bg-sea px-8 py-3 font-semibold text-paper"
            href="https://www.openstreetmap.org/?mlat=50.3237&mlon=-3.6000#map=14/50.3237/-3.6000"
          >
            View full map
          </a>
        </div>
      </section>
    </main>
  );
}
