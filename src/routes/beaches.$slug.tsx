import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { beachBySlug } from "@/content/guide";
import { pageMeta, placeJsonLd } from "@/lib/seo";
import { SaveButton } from "@/components/save-button";

export const Route = createFileRoute("/beaches/$slug")({
  loader: ({ params }) => {
    const beach = beachBySlug(params.slug);
    if (!beach) throw notFound();
    return beach;
  },
  head: ({ loaderData }) =>
    pageMeta({
      title: `${loaderData?.name ?? "Beach"} | Stoke Fleming Guide`,
      description: loaderData?.summary ?? "",
      path: `/beaches/${loaderData?.slug ?? ""}`,
      jsonLd: loaderData
        ? placeJsonLd({
            name: loaderData.name,
            description: loaderData.summary,
            path: `/beaches/${loaderData.slug}`,
            image: loaderData.image,
          })
        : undefined,
    }),
  component: BeachPage,
});

function BeachPage() {
  const beach = Route.useLoaderData();
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm font-semibold text-sea">
        <Link to="/beaches" className="underline">Beaches</Link>
      </p>
      <h1 className="mt-2 text-4xl sm:text-5xl">{beach.name}</h1>
      <p className="mt-4 text-lg">{beach.summary}</p>
      <figure className="mt-6">
        <img src={beach.image} alt={beach.imageAlt} width={beach.width} height={beach.height} className="aspect-3/2 w-full rounded-2xl object-cover shadow-lg" />
        {beach.credit ? <figcaption className="mt-2 text-sm text-muted">{beach.credit}</figcaption> : null}
      </figure>
      <dl className="mt-8 space-y-4">
        <div><dt className="font-semibold">Underfoot</dt><dd>{beach.surface}</dd></div>
        <div><dt className="font-semibold">From the village</dt><dd>{beach.fromVillage}</dd></div>
        <div><dt className="font-semibold">Dogs</dt><dd>{beach.dogs}</dd></div>
        <div><dt className="font-semibold">Facilities</dt><dd>{beach.facilities}</dd></div>
        <div><dt className="font-semibold">Safety</dt><dd>{beach.safety}</dd></div>
      </dl>
      <p className="mt-6">
        <Link to="/webcam" className="font-semibold text-sea underline">How to check conditions without a fake webcam</Link>
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a className="inline-flex min-h-11 items-center bg-sea px-4 font-semibold text-paper" href={beach.mapUrl}>Open the map</a>
        {beach.website ? (
          <a className="inline-flex min-h-11 items-center border border-sea px-4 font-semibold text-sea" href={beach.website}>
            Beach or reserve website
          </a>
        ) : null}
        <SaveButton item={{ type: "beach", name: beach.name, detail: beach.fromVillage, href: `/beaches/${beach.slug}` }} />
      </div>
    </main>
  );
}
