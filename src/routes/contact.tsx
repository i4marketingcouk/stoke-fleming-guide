import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { submitCorrection } from "@/lib/community.functions";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageMeta({
      title: "Contact | Correct the Stoke Fleming Guide",
      description:
        "Send a correction to the Stoke Fleming Guide. For council business use the parish council. This form does not ask for your email address.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl sm:text-5xl">Contact</h1>
      <p className="mt-4">
        Parish council business: <a className="font-semibold text-sea underline" href="https://www.stokefleming.org/parish-council/">stokefleming.org</a>. Do not send planning comments here.
      </p>
      <p className="mt-3">
        For a wrong fact on this guide, use the form. It stores the page and the correction for the editor. It does not ask for your name, phone or email, and it is not shown on the site. Please do not type a home address into the box.
      </p>
      <form
        className="mt-8 grid max-w-xl gap-3"
        onSubmit={async (event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          setPending(true);
          setMessage("");
          try {
            const result = await submitCorrection({
              data: {
                page: String(form.get("page") || ""),
                message: String(form.get("message") || ""),
                companyFax: String(form.get("companyFax") || ""),
              },
            });
            if (result.ok) {
              setMessage("Saved for the editor. It will not appear publicly.");
              event.currentTarget.reset();
            }
          } catch {
            setMessage("Write a little more detail — at least a sentence — and name the page.");
          } finally {
            setPending(false);
          }
        }}
      >
        <label className="grid gap-1 font-semibold">Which page<input name="page" required defaultValue="Home" className="min-h-11 border border-line px-3 font-normal" /></label>
        <label className="grid gap-1 font-semibold">What should change<textarea name="message" required minLength={10} rows={5} className="border border-line px-3 py-2 font-normal" /></label>
        <input name="companyFax" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <button type="submit" disabled={pending} className="min-h-11 bg-sea px-4 font-semibold text-paper disabled:opacity-60">
          {pending ? "Sending…" : "Send correction"}
        </button>
        {message ? <p role="status">{message}</p> : null}
      </form>
    </main>
  );
}
