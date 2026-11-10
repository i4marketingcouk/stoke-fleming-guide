import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/cookies")({
  head: () =>
    pageMeta({
      title: "Cookies | Stoke Fleming Guide",
      description: "The Stoke Fleming Guide does not set analytics or advertising cookies.",
      path: "/cookies",
    }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl">Cookies</h1>
      <p className="mt-4">
        There is no cookie banner asking you to accept tracking, because there is no tracking to accept. Google Analytics, Clarity and Crazy Egg are not loaded, before or after a click.
      </p>
      <p className="mt-4">
        The planner and the newsletter preview use local storage, which is not a cookie and stays on your device. If a future version adds measurement, it will stay switched off until you opt in, and this page will name the tool.
      </p>
    </main>
  );
}
