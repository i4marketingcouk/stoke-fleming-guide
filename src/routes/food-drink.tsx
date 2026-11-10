import { createFileRoute } from "@tanstack/react-router";
import { FOOD } from "@/content/guide";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/food-drink")({
  head: () =>
    pageMeta({
      title: "Food and drink in Stoke Fleming | Pub, beach café, hotel",
      description:
        "The Green Dragon is the village pub. The beach has a café. Kendricks, formerly Radius 7, may have closed — check before you go. No invented star ratings.",
      path: "/food-drink",
    }),
  component: FoodPage,
});

function FoodPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl sm:text-5xl">Food and drink</h1>
      <p className="mt-4 max-w-3xl text-lg">
        British spelling, no stars, no review counts. If a place wants a rating it can earn one on its own site. Menus go stale, so the button goes to them.
      </p>
      <div className="mt-8 space-y-8">
        {FOOD.map((place) => (
          <article key={place.name} className="grid gap-6 overflow-hidden rounded-2xl bg-paper shadow-lg sm:grid-cols-[240px_1fr]">
            {place.image ? (
              <img src={place.image} alt={place.imageAlt} width={place.width} height={place.height} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <div className="flex min-h-40 items-end bg-foam p-4 font-display text-2xl text-sea-deep">{place.kind}</div>
            )}
            <div className="p-5 sm:py-6 sm:pr-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-sea">{place.kind}</p>
              <h2 className="text-3xl">{place.name}</h2>
              <p className="mt-2 text-muted">{place.where}</p>
              <p className="mt-3">{place.summary}</p>
              <p className="mt-3"><span className="font-semibold">Hours. </span>{place.hours}</p>
              <div className="mt-4 flex flex-wrap gap-4">
                {place.url ? <a className="inline-flex min-h-11 items-center font-semibold text-sea underline" href={place.url}>Website</a> : null}
                {place.phone ? <a className="inline-flex min-h-11 items-center font-semibold text-sea underline" href={`tel:${place.phone.replace(/\s/g, "")}`}>{place.phone}</a> : null}
                <a className="inline-flex min-h-11 items-center font-semibold text-sea underline" href={place.mapUrl}>Map</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
