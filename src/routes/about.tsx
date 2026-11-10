import { createFileRoute, Link } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta({
      title: "About this guide | Stoke Fleming",
      description:
        "Who this website is, and who it is not. An independent Stoke Fleming guide. The parish council remains at stokefleming.org.",
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl sm:text-5xl">About this guide</h1>
      <p className="mt-4 text-lg">
        This site is written for people visiting Stoke Fleming and for people who live here. It is not “Stoke Fleming Tourism”, it is not the parish council, and it is not Visit Devon. Calling it official was wrong, and so was the telephone number that went with that claim.
      </p>
      <p className="mt-4">
        Council minutes, planning and the clerk live at <a className="font-semibold text-sea underline" href="https://www.stokefleming.org/">stokefleming.org</a>. Church times live on the church noticeboard.
      </p>
      <p className="mt-4">
        The earlier website loaded a stock photograph and captioned it as the village, estimated the tide after its table ran out, and put a cottage associated with the publisher at the top of the stay page. Those are gone. Photographs of the church, the pub and Slapton come from that project. The Blackpool Sands picture is a Geograph photograph by Derek Harper, <a className="font-semibold text-sea underline" href="https://www.geograph.org.uk/photo/4343133">photo 4343133</a>, CC BY-SA 2.0.
      </p>
      <p className="mt-4">
        There is still no staffed desk and no public email address invented for one. Corrections go through the <Link to="/contact" className="font-semibold text-sea underline">contact form</Link>, which stores the note and not your address.
      </p>
      <p className="mt-4 text-muted">© {new Date().getFullYear()}</p>
    </main>
  );
}
