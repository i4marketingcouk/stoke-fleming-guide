import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { STAY_KINDS, STAYS, type StayKind } from "@/content/guide";
import { listStays, submitStay } from "@/lib/community.functions";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/stay")({
  loader: () => listStays(),
  head: () =>
    pageMeta({
      title: "Where to stay in Stoke Fleming | Hotels, guest houses, cottages",
      description:
        "Filter Stoke Fleming stays by type, bedrooms, guests and amenities. Hotels, bed and breakfasts, cottages and Leonards Cove. No invented prices or ratings.",
      path: "/stay",
    }),
  component: StayPage,
});

type Card = {
  key: string;
  name: string;
  kind: string;
  area: string;
  summary: string;
  website: string;
  ownerListed: boolean;
  bedrooms: number | null;
  guests: number | null;
  seaView: boolean;
  parking: boolean;
  wifi: boolean;
  dogFriendly: boolean;
  hotTub: boolean;
};

const BED_OPTIONS = [0, 1, 2, 3, 4, 5] as const;
const GUEST_OPTIONS = [0, 2, 4, 6, 8, 10] as const;

function StayPage() {
  const added = Route.useLoaderData();
  const [kind, setKind] = useState<StayKind | "All">("All");
  const [bedrooms, setBedrooms] = useState(0);
  const [guests, setGuests] = useState(0);
  const [seaView, setSeaView] = useState(false);
  const [parking, setParking] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [dogFriendly, setDogFriendly] = useState(false);
  const [hotTub, setHotTub] = useState(false);

  const cards: Card[] = [
    ...STAYS.map((stay) => ({ ...stay, key: stay.name, website: stay.url })),
    ...added.map((stay) => ({ ...stay, key: `owner-${stay.id}`, ownerListed: true })),
  ];

  const filtered = useMemo(
    () =>
      cards.filter((stay) => {
        if (kind !== "All" && stay.kind !== kind) return false;
        if (bedrooms && (stay.bedrooms ?? 0) < bedrooms) return false;
        if (guests && (stay.guests ?? 0) < guests) return false;
        if (seaView && !stay.seaView) return false;
        if (parking && !stay.parking) return false;
        if (wifi && !stay.wifi) return false;
        if (dogFriendly && !stay.dogFriendly) return false;
        if (hotTub && !stay.hotTub) return false;
        return true;
      }),
    [cards, kind, bedrooms, guests, seaView, parking, wifi, dogFriendly, hotTub],
  );

  const filtersOn = kind !== "All" || bedrooms > 0 || guests > 0 || seaView || parking || wifi || dogFriendly || hotTub;

  function clearFilters() {
    setKind("All");
    setBedrooms(0);
    setGuests(0);
    setSeaView(false);
    setParking(false);
    setWifi(false);
    setDogFriendly(false);
    setHotTub(false);
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl sm:text-5xl">Find your stay</h1>
      <p className="mt-4 max-w-3xl text-lg">
        Hotels, bed and breakfasts, cottages and the holiday park. Prices and availability stay on the booking site. Nothing here is given a star rating.
      </p>

      <form className="mt-8 rounded-2xl bg-foam p-5 shadow-lg" aria-label="Filter stays" onSubmit={(event) => event.preventDefault()}>
        <fieldset>
          <legend className="text-sm font-semibold uppercase tracking-wide text-sea">Accommodation type</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {(["All", ...STAY_KINDS] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={kind === option}
                className={`min-h-11 px-4 text-sm font-semibold ${kind === option ? "bg-sea text-paper" : "border border-line bg-paper text-ink"}`}
                onClick={() => setKind(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 font-semibold">
            Bedrooms
            <select
              className="min-h-11 border border-line bg-paper px-3 font-normal"
              value={bedrooms}
              onChange={(event) => setBedrooms(Number(event.target.value))}
            >
              {BED_OPTIONS.map((value) => (
                <option key={value} value={value}>{value === 0 ? "Any" : `${value}+`}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 font-semibold">
            Guests
            <select
              className="min-h-11 border border-line bg-paper px-3 font-normal"
              value={guests}
              onChange={(event) => setGuests(Number(event.target.value))}
            >
              {GUEST_OPTIONS.map((value) => (
                <option key={value} value={value}>{value === 0 ? "Any" : `${value}+`}</option>
              ))}
            </select>
          </label>
        </div>

        <fieldset className="mt-5">
          <legend className="text-sm font-semibold uppercase tracking-wide text-sea">Amenities</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            <AmenityChip label="Sea view" pressed={seaView} onClick={() => setSeaView((value) => !value)} />
            <AmenityChip label="Parking" pressed={parking} onClick={() => setParking((value) => !value)} />
            <AmenityChip label="Wi-Fi" pressed={wifi} onClick={() => setWifi((value) => !value)} />
            <AmenityChip label="Dogs welcome" pressed={dogFriendly} onClick={() => setDogFriendly((value) => !value)} />
            <AmenityChip label="Hot tub" pressed={hotTub} onClick={() => setHotTub((value) => !value)} />
          </div>
        </fieldset>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-muted">{filtered.length === 1 ? "1 place" : `${filtered.length} places`}</p>
          {filtersOn ? (
            <button type="button" className="min-h-11 border border-sea px-4 font-semibold text-sea" onClick={clearFilters}>
              Clear all filters
            </button>
          ) : null}
        </div>
      </form>

      {filtered.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-line p-6">
          Nothing matches those filters. Clear them, or add the place at the bottom if you run it.
        </p>
      ) : (
        <div className="mt-8 grid gap-4">
          {filtered.map((stay) => (
            <StayCard key={stay.key} stay={stay} />
          ))}
        </div>
      )}

      <StayForm />
    </main>
  );
}

function AmenityChip({ label, pressed, onClick }: { label: string; pressed: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={`min-h-11 px-4 text-sm font-semibold ${pressed ? "bg-sea text-paper" : "border border-line bg-paper text-ink"}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function StayCard({ stay }: { stay: Card }) {
  const facts = [
    stay.seaView ? "Sea view" : null,
    stay.parking ? "Parking" : null,
    stay.wifi ? "Wi-Fi" : null,
    stay.dogFriendly ? "Dogs welcome" : null,
    stay.hotTub ? "Hot tub" : null,
  ].filter((fact): fact is string => Boolean(fact));

  return (
    <article className="overflow-hidden rounded-2xl bg-paper p-6 shadow-lg">
      <p className="text-sm font-semibold uppercase tracking-wide text-sea">{stay.kind}</p>
      <h2 className="text-3xl">{stay.name}</h2>
      <p className="text-muted">{stay.area}</p>
      <p className="mt-2 font-semibold">
        {stay.bedrooms ? `${stay.bedrooms} bedroom${stay.bedrooms === 1 ? "" : "s"}` : "Bedrooms on their site"}
        {stay.guests ? ` · sleeps ${stay.guests}${stay.kind === "Hotel" || stay.kind === "Holiday park" ? "+" : ""}` : ""}
      </p>
      <p className="mt-3">{stay.summary}</p>
      {facts.length ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {facts.map((fact) => (
            <li key={fact} className="rounded-full bg-sand px-3 py-1 text-sm font-medium text-sea-deep">{fact}</li>
          ))}
        </ul>
      ) : null}
      {stay.ownerListed ? (
        <p className="mt-3 bg-sand/50 p-3 text-sm">Listed by the owner through this site. Not an independent review, and not checked for availability.</p>
      ) : null}
      <a className="mt-4 inline-flex min-h-11 items-center font-semibold text-sea underline" href={stay.website}>Booking site</a>
    </article>
  );
}

function StayForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  return (
    <form
      className="mt-12 max-w-2xl rounded-2xl border border-line bg-foam p-5"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        setPending(true);
        setMessage("");
        try {
          const result = await submitStay({
            data: {
              name: String(form.get("name") || ""),
              kind: String(form.get("kind") || "Self catering") as StayKind,
              area: String(form.get("area") || ""),
              summary: String(form.get("summary") || ""),
              website: String(form.get("website") || ""),
              bedrooms: Number(form.get("bedrooms") || 0),
              guests: Number(form.get("guests") || 0),
              seaView: form.get("seaView") === "on",
              parking: form.get("parking") === "on",
              wifi: form.get("wifi") === "on",
              dogFriendly: form.get("dogFriendly") === "on",
              hotTub: form.get("hotTub") === "on",
              companyFax: String(form.get("companyFax") || ""),
            },
          });
          if (!result.ok) {
            setMessage("That listing could not be saved.");
          } else {
            setMessage("Saved. It is labelled as an owner listing.");
            event.currentTarget.reset();
            await router.invalidate();
          }
        } catch {
          setMessage("Check the fields. The website must be a full https link, and bedrooms and guests need a number.");
        } finally {
          setPending(false);
        }
      }}
    >
      <h2 className="text-3xl">List a place to stay</h2>
      <p className="mt-2 text-muted">
        If your business is missing, add it. No email address is stored. The card uses the type and amenities so the filters above can find it.
      </p>
      <div className="mt-4 grid gap-3">
        <label className="grid gap-1 font-semibold">Name<input name="name" required className="min-h-11 border border-line bg-paper px-3 font-normal" /></label>
        <label className="grid gap-1 font-semibold">
          Type
          <select name="kind" required className="min-h-11 border border-line bg-paper px-3 font-normal">
            {STAY_KINDS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1 font-semibold">Bedrooms<input name="bedrooms" type="number" min={1} max={40} required className="min-h-11 border border-line bg-paper px-3 font-normal" /></label>
          <label className="grid gap-1 font-semibold">Guests<input name="guests" type="number" min={1} max={80} required className="min-h-11 border border-line bg-paper px-3 font-normal" /></label>
        </div>
        <label className="grid gap-1 font-semibold">Where it actually is<input name="area" required className="min-h-11 border border-line bg-paper px-3 font-normal" /></label>
        <label className="grid gap-1 font-semibold">Short description<textarea name="summary" required minLength={20} rows={4} className="border border-line bg-paper px-3 py-2 font-normal" /></label>
        <label className="grid gap-1 font-semibold">Website<input name="website" type="url" required placeholder="https://" className="min-h-11 border border-line bg-paper px-3 font-normal" /></label>
        <fieldset>
          <legend className="font-semibold">Amenities you actually offer</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <label className="flex items-center gap-2 font-normal"><input type="checkbox" name="seaView" className="h-5 w-5" /> Sea view</label>
            <label className="flex items-center gap-2 font-normal"><input type="checkbox" name="parking" className="h-5 w-5" /> Parking</label>
            <label className="flex items-center gap-2 font-normal"><input type="checkbox" name="wifi" className="h-5 w-5" /> Wi-Fi</label>
            <label className="flex items-center gap-2 font-normal"><input type="checkbox" name="dogFriendly" className="h-5 w-5" /> Dogs welcome</label>
            <label className="flex items-center gap-2 font-normal"><input type="checkbox" name="hotTub" className="h-5 w-5" /> Hot tub</label>
          </div>
        </fieldset>
        <input name="companyFax" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <button type="submit" disabled={pending} className="min-h-11 bg-sea px-4 font-semibold text-paper disabled:opacity-60">
          {pending ? "Saving…" : "Publish listing"}
        </button>
        {message ? <p role="status">{message}</p> : null}
      </div>
    </form>
  );
}
