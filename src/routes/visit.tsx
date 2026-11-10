import { createFileRoute, Link } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/visit")({
  head: () =>
    pageMeta({
      title: "Plan your visit to Stoke Fleming | Buses, parking, dogs, toilets",
      description:
        "How to reach Stoke Fleming without guessing a bus number. Parking, the shop, dogs on the beach, toilets, and what the village is not.",
      path: "/visit",
    }),
  component: VisitPage,
});

function VisitPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl sm:text-5xl">Plan your visit</h1>
      <p className="mt-4 text-lg">
        Stoke Fleming sits on the A379 between Dartmouth and Strete, above Start Bay. It is a hill village. It is not a fishing village and it does not have a harbour. Boats are in Dartmouth.
      </p>

      <section className="mt-10" id="getting-here">
        <h2 className="text-3xl">Getting here</h2>
        <p className="mt-3">There is no railway station. The nearest useful stations are Totnes and, further off, Paignton or Plymouth, then a bus or a taxi.</p>
        <p className="mt-3">Buses run along the A379 between Dartmouth and the villages towards Kingsbridge, and they stop in Stoke Fleming. The route number changes when the operator changes the timetable. Look up the day you are travelling on <a className="font-semibold text-sea underline" href="https://www.stagecoachbus.com/">stagecoachbus.com</a> rather than trusting a number printed on a website.</p>
        <p className="mt-3">By car, the A379 is the road. In summer it is slow. The lanes off it are single track.</p>
      </section>

      <section className="mt-10" id="parking">
        <h2 className="text-3xl">Parking</h2>
        <p className="mt-3">The centre has little room. Do not block the bus stop, the church or a field gate. For the beach, use the Blackpool Sands car park and read their charge on the day. Strete Gate and Slapton have roadside parking that fills when the weather is kind.</p>
      </section>

      <section className="mt-10" id="shop">
        <h2 className="text-3xl">Shop, post office, toilets</h2>
        <p className="mt-3">The village has a shop and post office on the main road. The hours are on the door, because they are the shop’s hours, not ours.</p>
        <p className="mt-3">Toilets are at Blackpool Sands when the beach facilities are open. Do not plan on a public toilet in the middle of the village.</p>
      </section>

      <section className="mt-10" id="dogs">
        <h2 className="text-3xl">Dogs</h2>
        <p className="mt-3">Beach dog rules are seasonal and they are not the same cove to cove. Read the sign at Blackpool Sands. The coast path is fine for a dog under control. Sheep and cattle are not a suggestion.</p>
      </section>

      <section className="mt-10">
        <h2 className="text-3xl">Winter</h2>
        <p className="mt-3">The pub aims to stay open through the year, with shorter days early in the week. The beach café does not. Check both before you drive down for lunch in January.</p>
      </section>

      <p className="mt-10">
        <Link to="/accessibility" className="font-semibold text-sea underline">Accessibility, hills and wheelchairs</Link>
      </p>
    </main>
  );
}
