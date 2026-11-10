import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ITINERARIES } from "@/content/guide";
import { readPlan, writePlan, type PlanItem } from "@/components/save-button";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/planner")({
  head: () =>
    pageMeta({
      title: "Trip planner | Stoke Fleming Guide",
      description: "Save beaches and walks, or start from a wet-day, a beach morning, or an hour in the village. Stored on this device only.",
      path: "/planner",
    }),
  component: PlannerPage,
});

function PlannerPage() {
  const [items, setItems] = useState<PlanItem[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const sync = () => setItems(readPlan());
    sync();
    setReady(true);
    window.addEventListener("sf-plan", sync);
    return () => window.removeEventListener("sf-plan", sync);
  }, []);

  const text = items.map((item) => `${item.name} — ${item.detail}`).join("\n");

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl sm:text-5xl">Planner</h1>
      <p className="mt-4">Saved on this phone or computer only. Nothing is uploaded.</p>
      {!ready ? <p className="mt-6">Opening your list…</p> : null}
      {ready && items.length === 0 ? (
        <p className="mt-6">Nothing saved yet. Use “Save to planner” on a walk or a beach, or start from one of these.</p>
      ) : null}
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item.name} className="flex flex-wrap items-center justify-between gap-3 border border-line p-4">
            <div>
              <a href={item.href} className="font-semibold text-sea underline">{item.name}</a>
              <p className="text-muted">{item.detail}</p>
            </div>
            <button
              type="button"
              className="min-h-11 border border-line px-3"
              onClick={() => writePlan(readPlan().filter((entry) => entry.name !== item.name))}
            >
              Remove {item.name}
            </button>
          </li>
        ))}
      </ul>
      {items.length > 0 ? (
        <button
          type="button"
          className="mt-4 min-h-11 bg-sea px-4 font-semibold text-paper"
          onClick={() => navigator.clipboard?.writeText(text)}
        >
          Copy the list
        </button>
      ) : null}

      <h2 className="mt-12 text-3xl">Start from a shape of day</h2>
      <div className="mt-4 space-y-4">
        {ITINERARIES.map((plan) => (
          <article key={plan.id} className="bg-foam p-4">
            <h3 className="text-2xl">{plan.title}</h3>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              {plan.steps.map((step) => <li key={step}>{step}</li>)}
            </ol>
            <button
              type="button"
              className="mt-3 min-h-11 border border-sea px-3 font-semibold text-sea"
              onClick={() => {
                const existing = readPlan();
                const next = [...existing];
                for (const step of plan.steps) {
                  if (!next.some((item) => item.name === step)) {
                    next.push({ type: "note", name: step, detail: plan.title, href: "/planner" });
                  }
                }
                writePlan(next);
              }}
            >
              Add “{plan.title}” to the planner
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}
