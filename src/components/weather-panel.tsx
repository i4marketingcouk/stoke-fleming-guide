import { useEffect, useState } from "react";
import { getWeather } from "@/lib/weather.functions";

type Weather = {
  temperature: number;
  wind: number;
  summary: string;
};

export function ConditionsPanel() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getWeather()
      .then((result) => {
        if (cancelled) return;
        if (!result) setFailed(true);
        else setWeather(result);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="grid gap-4 lg:grid-cols-2" aria-label="Weather and tides">
      <div className="border border-line bg-foam p-5">
        <h2 className="text-2xl text-sea-deep">Weather in the village</h2>
        <p className="mt-1 text-sm text-muted">Live from Open-Meteo for Stoke Fleming (50.324, 3.600°W). Not a Met Office warning.</p>
        {weather ? (
          <p className="mt-4 text-3xl text-ink">
            {weather.temperature}°C
            <span className="ml-3 text-lg">{weather.summary}</span>
          </p>
        ) : failed ? (
          <p className="mt-4">Weather could not be loaded. Try the Met Office.</p>
        ) : (
          <p className="mt-4">Loading the current hour…</p>
        )}
        {weather ? <p className="mt-2 text-muted">Wind about {weather.wind} km/h.</p> : null}
        <a className="mt-4 inline-flex min-h-11 items-center font-semibold text-sea underline" href="https://www.metoffice.gov.uk/weather">
          Met Office — search Stoke Fleming
        </a>
      </div>
      <div className="border border-line bg-paper p-5">
        <h2 className="text-2xl text-sea-deep">Tides — not calculated here</h2>
        <p className="mt-3">
          The previous site called a homemade table “live”. After December 2025 it invented the next high water. A height that drifts while the arrow says “rising” is a guess, and a guess is a bad thing to swim on.
        </p>
        <p className="mt-3">
          Dartmouth is the nearest standard port. Blackpool Sands is a little south and can differ. Use a proper table.
        </p>
        <div className="mt-4 flex flex-col gap-2">
          <a className="inline-flex min-h-11 items-center font-semibold text-sea underline" href="https://www.tidetimes.org.uk/dartmouth-tide-times">
            Dartmouth tide times
          </a>
          <a className="inline-flex min-h-11 items-center font-semibold text-sea underline" href="https://easytide.admiralty.co.uk/">
            UK Hydrographic Office EasyTide
          </a>
        </div>
      </div>
    </section>
  );
}
