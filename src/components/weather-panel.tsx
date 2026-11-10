import { useEffect, useState } from "react";
import { CloudSun, Waves } from "lucide-react";
import { getWeather } from "@/lib/weather.functions";

type Weather = {
  temperature: number;
  wind: number;
  summary: string;
  high: number | null;
  low: number | null;
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
    <div className="mt-8 rounded-2xl bg-paper/15 p-6 text-paper backdrop-blur-md">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="text-center">
          <h2 className="flex items-center justify-center gap-2 text-lg font-semibold text-paper">
            <CloudSun className="h-5 w-5" aria-hidden="true" />
            Today's weather
          </h2>
          <p className="mt-1 text-xs text-paper/75">Open-Meteo for the village. Not a Met Office warning.</p>
          {weather ? (
            <>
              <p className="mt-3 text-3xl font-bold text-paper">
                {weather.temperature}°C
                <span className="ml-2 text-lg font-medium text-paper/90">{weather.summary}</span>
              </p>
              <p className="mt-1 text-sm text-paper/80">
                {weather.high !== null && weather.low !== null ? `High ${weather.high}°C · Low ${weather.low}°C · ` : null}
                Wind {weather.wind} mph
              </p>
            </>
          ) : (
            <p className="mt-3 text-sm text-paper/80">{failed ? "Weather could not be loaded." : "Loading the current hour…"}</p>
          )}
        </div>
        <div className="text-center md:border-l md:border-paper/25 md:pl-6">
          <h2 className="flex items-center justify-center gap-2 text-lg font-semibold text-paper">
            <Waves className="h-5 w-5" aria-hidden="true" />
            Tides — Dartmouth
          </h2>
          <p className="mt-3 text-sm text-paper/85">
            Heights are not calculated on this site. Use a Dartmouth table before you swim.
          </p>
          <div className="mt-3 flex flex-col items-center gap-1">
            <a className="inline-flex min-h-11 items-center font-semibold text-paper underline" href="https://www.tidetimes.org.uk/dartmouth-tide-times">
              Dartmouth tide times
            </a>
            <a className="inline-flex min-h-11 items-center font-semibold text-paper underline" href="https://easytide.admiralty.co.uk/">
              UKHO EasyTide
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
