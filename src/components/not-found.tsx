import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20">
      <p className="text-sm font-semibold uppercase tracking-widest text-sea">404</p>
      <h1 className="mt-2 text-4xl text-ink">This page is not on the guide</h1>
      <p className="mt-4 text-muted">
        The address is wrong, or it belonged to the old site. Unknown addresses
        now answer as not found, instead of pretending to be the homepage.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex min-h-11 items-center bg-sea px-5 text-paper"
      >
        Back to the guide
      </Link>
    </main>
  );
}
