import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ACTIVITIES, BEACHES, DIRECTORY, FOOD, STAYS } from "@/content/guide";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => {
    const q = typeof search.q === "string" ? search.q.slice(0, 80) : "";
    return q ? { q } : {};
  },
  head: ({ match }) =>
    pageMeta({
      title: match.search.q ? `Search “${match.search.q}” | Stoke Fleming Guide` : "Search the Stoke Fleming Guide",
      description: "Search walks, beaches, food, stays and the village directory.",
      path: "/search",
    }),
  component: SearchPage,
});

function SearchPage() {
  const { q = "" } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const needle = q.trim().toLowerCase();
  const results = needle
    ? [
        ...ACTIVITIES.filter((item) => `${item.title} ${item.summary}`.toLowerCase().includes(needle)).map((item) => ({
          href: `/things-to-do/${item.slug}` as const,
          title: item.title,
          kind: "Things to do",
        })),
        ...BEACHES.filter((item) => `${item.name} ${item.summary}`.toLowerCase().includes(needle)).map((item) => ({
          href: `/beaches/${item.slug}` as const,
          title: item.name,
          kind: "Beach",
        })),
        ...FOOD.filter((item) => `${item.name} ${item.summary}`.toLowerCase().includes(needle)).map((item) => ({
          href: "/food-drink" as const,
          title: item.name,
          kind: "Food",
        })),
        ...STAYS.filter((item) => `${item.name} ${item.summary}`.toLowerCase().includes(needle)).map((item) => ({
          href: "/stay" as const,
          title: item.name,
          kind: "Stay",
        })),
        ...DIRECTORY.filter((item) => `${item.name} ${item.summary}`.toLowerCase().includes(needle)).map((item) => ({
          href: "/community" as const,
          title: item.name,
          kind: "Community",
        })),
      ]
    : [];

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl">Search</h1>
      <form
        className="mt-6 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          navigate({ search: { q: String(data.get("q") || "") } });
        }}
      >
        <label className="sr-only" htmlFor="q">Search the guide</label>
        <input id="q" name="q" defaultValue={q} className="min-h-11 flex-1 border border-line px-3" />
        <button type="submit" className="min-h-11 bg-sea px-4 font-semibold text-paper">Search</button>
      </form>
      {needle ? <p className="mt-6">{results.length} result{results.length === 1 ? "" : "s"} for “{q.trim()}”.</p> : <p className="mt-6 text-muted">Try beach, pub, bus, church, show.</p>}
      <ul className="mt-4 space-y-3">
        {results.map((result) => (
          <li key={`${result.kind}-${result.title}`}>
            <a href={result.href} className="font-semibold text-sea underline">{result.title}</a>
            <span className="ml-2 text-muted">{result.kind}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
