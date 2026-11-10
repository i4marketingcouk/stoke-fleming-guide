import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageMeta({
      title: "Terms | Stoke Fleming Guide",
      description: "Terms for using the independent Stoke Fleming guide, including community listings.",
      path: "/terms",
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl">Terms</h1>
      <ul className="mt-4 list-disc space-y-3 pl-5">
        <li>The guide is information, not a service you pay for, and not an instruction to swim. Tide times are deliberately not provided. Use a published tide table.</li>
        <li>Opening hours, bus numbers and whether a restaurant is still trading change. Follow the link to the business. Where sources disagree, the page says so.</li>
        <li>If you add an event or a place to stay, you confirm you have the right to publish that text and that link, and that you are not uploading someone else’s phone number.</li>
        <li>Owner-submitted stays are labelled as such. They are not a recommendation.</li>
        <li>Photographs credited to Geograph stay under CC BY-SA. Do not strip the credit if you reuse them.</li>
      </ul>
    </main>
  );
}
