import { createFileRoute, Link } from "@tanstack/react-router";
import { ConditionsPanel } from "@/components/weather-panel";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/webcam")({
  head: () =>
    pageMeta({
      title: "Conditions | There is no Stoke Fleming webcam",
      description:
        "The old webcam page embedded a YouTube video that does not play, and it described Dartmouth and Stoke Fleming as the same view. This page does not do that.",
      path: "/webcam",
    }),
  component: WebcamPage,
});

function WebcamPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl sm:text-5xl">There is no village webcam</h1>
      <p className="mt-4 text-lg">
        The previous page showed a red “live” dot on a YouTube film. The film is unavailable, and the words around it said Dartmouth in one sentence and Stoke Fleming in the next. A camera will go back on this page only when it shows a named view — the beach, the church, or the bay — and says which.
      </p>
      <div className="mt-8">
        <ConditionsPanel />
      </div>
      <p className="mt-8">
        For the sea itself, use the beach’s own site before you pack the car. <a className="font-semibold text-sea underline" href="https://www.blackpoolsands.co.uk/">Blackpool Sands</a> publishes whether the facilities are open. <Link to="/beaches/$slug" params={{ slug: "blackpool-sands" }} className="font-semibold text-sea underline">Read the beach notes</Link>.
      </p>
    </main>
  );
}
