import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { activityBySlug } from "@/content/guide";
import { pageMeta, placeJsonLd } from "@/lib/seo";
import { SaveButton } from "@/components/save-button";

export const Route = createFileRoute("/things-to-do/$slug")({
  loader: ({ params }) => {
    const activity = activityBySlug(params.slug);
    if (!activity) throw notFound();
    return activity;
  },
  head: ({ loaderData }) =>
    pageMeta({
      title: `${loaderData?.title ?? "Activity"} | Stoke Fleming Guide`,
      description: loaderData?.summary ?? "",
      path: `/things-to-do/${loaderData?.slug ?? ""}`,
      jsonLd: loaderData
        ? placeJsonLd({
            name: loaderData.title,
            description: loaderData.summary,
            path: `/things-to-do/${loaderData.slug}`,
            image: loaderData.image,
          })
        : undefined,
    }),
  component: ActivityPage,
});

function ActivityPage() {
  const activity = Route.useLoaderData();
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm font-semibold text-sea">
        <Link to="/things-to-do" className="underline">Things to do</Link>
      </p>
      <h1 className="mt-2 text-4xl sm:text-5xl">{activity.title}</h1>
      <p className="mt-4 text-lg">{activity.summary}</p>
      <figure className="mt-6">
        <img src={activity.image} alt={activity.imageAlt} width={activity.width} height={activity.height} className="w-full object-cover" />
        {activity.credit ? <figcaption className="mt-2 text-sm text-muted">{activity.credit}</figcaption> : null}
      </figure>
      <dl className="mt-8 space-y-4">
        <div><dt className="font-semibold">Time</dt><dd>{activity.duration}</dd></div>
        <div><dt className="font-semibold">Effort</dt><dd>{activity.effort}</dd></div>
        <div><dt className="font-semibold">Parking</dt><dd>{activity.parking}</dd></div>
        <div><dt className="font-semibold">The route</dt><dd>{activity.route}</dd></div>
        <div>
          <dt className="font-semibold">Who to contact</dt>
          <dd>
            {activity.who}{" "}
            {activity.whoUrl ? <a className="font-semibold text-sea underline" href={activity.whoUrl}>Their site</a> : null}
          </dd>
        </div>
      </dl>
      {activity.warning ? <p className="mt-6 border border-line bg-sand/40 p-4">{activity.warning}</p> : null}
      <div className="mt-6 flex flex-wrap gap-3">
        <a className="inline-flex min-h-11 items-center bg-sea px-4 font-semibold text-paper" href={activity.mapUrl}>
          Open the map
        </a>
        <SaveButton
          item={{ type: "activity", name: activity.title, detail: activity.duration, href: `/things-to-do/${activity.slug}` }}
        />
      </div>
    </main>
  );
}
