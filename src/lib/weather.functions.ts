import { createServerFn } from "@tanstack/react-start";
import { SITE } from "@/content/guide";

const CODES: Record<number, string> = {
  0: "Clear",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Fog",
  51: "Light drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  80: "Showers",
  95: "Thunderstorm",
};

export const getWeather = createServerFn({ method: "GET" }).handler(async () => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${SITE.lat}&longitude=${SITE.lon}&current=temperature_2m,weather_code,wind_speed_10m&timezone=Europe%2FLondon`;
  const response = await fetch(url);
  if (!response.ok) return null;
  const data = (await response.json()) as {
    current?: { temperature_2m?: number; weather_code?: number; wind_speed_10m?: number };
  };
  const current = data.current;
  if (!current || typeof current.temperature_2m !== "number") return null;
  return {
    temperature: Math.round(current.temperature_2m),
    wind: Math.round(current.wind_speed_10m ?? 0),
    summary: CODES[current.weather_code ?? -1] ?? "Recorded weather",
  };
});
