import { useEffect, useState } from "react";

export type PlanItem = {
  type: string;
  name: string;
  detail: string;
  href: string;
};

const KEY = "stokeFlemingGuidePlan";

export function readPlan(): PlanItem[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "[]") as PlanItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writePlan(items: PlanItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("sf-plan"));
}

export function SaveButton({ item }: { item: PlanItem }) {
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const sync = () => setSaved(readPlan().some((entry) => entry.name === item.name));
    sync();
    window.addEventListener("sf-plan", sync);
    return () => window.removeEventListener("sf-plan", sync);
  }, [item.name]);

  return (
    <button
      type="button"
      className="inline-flex min-h-11 items-center border border-sea px-4 font-semibold text-sea"
      aria-pressed={saved}
      onClick={() => {
        const current = readPlan();
        if (saved) writePlan(current.filter((entry) => entry.name !== item.name));
        else writePlan([...current, item]);
      }}
    >
      {saved ? `Remove ${item.name} from planner` : `Save ${item.name} to planner`}
    </button>
  );
}
