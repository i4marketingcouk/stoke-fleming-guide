import { createFileRoute, Link } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/accessibility")({
  head: () =>
    pageMeta({
      title: "Accessibility in Stoke Fleming | Hills, shingle, step-free access",
      description:
        "What is hard about visiting Stoke Fleming: the hill back from the beach, shingle underfoot, and the coast path. Ask each business about step-free access.",
      path: "/accessibility",
    }),
  component: AccessPage,
});

function AccessPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl sm:text-5xl">Accessibility</h1>
      <p className="mt-4 text-lg">Honest limits, not a badge.</p>
      <ul className="mt-6 list-disc space-y-3 pl-5">
        <li>The village is on a hill. Pavements are narrow or missing. The walk down to Blackpool Sands is steep on the way back.</li>
        <li>The South West Coast Path has steps, mud and climbs. It is not a wheelchair route.</li>
        <li>Blackpool Sands is shingle. That is hard work with a wheelchair, a buggy or a bad knee, even though the car park is close to the café.</li>
        <li>Strete Gate has a steep access and almost no facilities.</li>
        <li>Step-free loos, hearing loops and ground-floor rooms depend on the building. Ask the Green Dragon, the hotel or the beach before you rely on them. This guide will not guess.</li>
      </ul>
      <p className="mt-6">The website itself uses a skip link, labelled buttons, and text you can enlarge. If a page blocks you, <Link to="/contact" className="font-semibold text-sea underline">tell us which one</Link>.</p>
    </main>
  );
}
