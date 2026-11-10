import { useEffect, useState } from "react";
import { SITE } from "@/content/guide";

type Weather = {
  temperature: number;
  wind: number;
  summary: string;
};

const CODES: Record<number, string> = {
  0: "Clear",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  80: "Showers",
  81: "Showers",
  82: "Heavy showers",
  95: "Thunderstorm",
};

export function ConditionsPanel() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${SITE.lat}&longitude=${SITE.lon}&current=temperature_2m,weather_code,wind_speed_10m&timezone=Europe%2FLondon`;
    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("weather");
        return response.json();
      })
      .then((data: { current?: { temperature_2m?: number; weather_code?: number; wind_speed_10m?: number } }) => {
        const current = data.current;
        if (!current || typeof current.temperature_2m !== "number") throw new Error("shape");
        setWeather({
          temperature: Math.round(current.temperature_2m),
          wind: Math.round(current.wind_speed_10m ?? 0),
          summary: CODES[current.weather_code ?? -1] ?? "Weather available",
        });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setFailed(true);
      });
    return () => controller.abort();
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
