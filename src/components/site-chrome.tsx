import type { ReactNode } from "react";
import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { NAV, SITE } from "@/content/guide";

export function SiteChrome({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="min-h-11 leading-tight">
            <span className="block font-display text-xl text-sea-deep">Stoke Fleming</span>
            <span className="block text-sm text-muted">Independent village guide</span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`min-h-11 px-2.5 py-2 text-sm font-semibold ${
                  path === item.to ? "text-sea-deep underline decoration-sand decoration-2 underline-offset-8" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/search" className="min-h-11 px-2.5 py-2 text-sm font-semibold text-ink">
              Search
            </Link>
            <Link to="/planner" className="inline-flex min-h-11 items-center bg-sea px-3 text-sm font-semibold text-paper">
              Planner
            </Link>
          </nav>
          <button
            type="button"
            className="inline-flex min-h-11 items-center border border-line px-3 text-sm font-semibold lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close menu" : "Menu"}
          </button>
        </div>
        {open ? (
          <nav id="mobile-nav" className="border-t border-line px-4 py-2 lg:hidden" aria-label="Mobile">
            {[...NAV, { to: "/search" as const, label: "Search" }, { to: "/planner" as const, label: "Planner" }].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block min-h-11 py-2 font-semibold"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </header>
      <div id="content" className="flex-1">
        {children}
      </div>
      <footer className="border-t border-line bg-sea-deep text-paper">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-2xl">About this guide</h2>
            <p className="mt-3 text-sand">
              An independent guide to Stoke Fleming and Start Bay. Not the parish council, and not an official tourist board.
            </p>
            <p className="mt-3 text-sm text-sand">
              <a className="underline" href="https://www.stokefleming.org/">Parish council site</a>
              {" · "}
              <a className="underline" href="https://www.facebook.com/groups/553276165587518">Village Facebook group</a>
              {" · "}
              <a className="underline" href="https://www.instagram.com/discoverstokeflemingdevon/">Instagram @discoverstokeflemingdevon</a>
            </p>
          </div>
          <div>
            <h2 className="text-xl">In the guide</h2>
            <ul className="mt-3 space-y-2 text-sand">
              <li><Link to="/things-to-do" className="underline">Things to do</Link></li>
              <li><Link to="/beaches" className="underline">Beaches</Link></li>
              <li><Link to="/food-drink" className="underline">Food and drink</Link></li>
              <li><Link to="/stay" className="underline">Stay</Link></li>
              <li><Link to="/events" className="underline">Events</Link></li>
              <li><Link to="/community" className="underline">Village directory</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl">Plan your visit</h2>
            <ul className="mt-3 space-y-2 text-sand">
              <li><Link to="/visit" className="underline">Getting here, parking, buses</Link></li>
              <li><Link to="/visit" hash="dogs" className="underline">Dogs</Link></li>
              <li><Link to="/webcam" className="underline">Weather, not a webcam</Link></li>
              <li><Link to="/accessibility" className="underline">Accessibility</Link></li>
              <li><Link to="/newsletter" className="underline">Monthly newsletter</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl">The small print</h2>
            <ul className="mt-3 space-y-2 text-sand">
              <li><Link to="/about" className="underline">Who runs this</Link></li>
              <li><Link to="/contact" className="underline">Correct a listing</Link></li>
              <li><Link to="/privacy" className="underline">Privacy</Link></li>
              <li><Link to="/cookies" className="underline">Cookies</Link></li>
              <li><Link to="/terms" className="underline">Terms</Link></li>
              <li><a className="underline" href="/sitemap.xml">Sitemap</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-sea px-4 py-4 text-sm text-sand">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} {SITE.name}. Written for visitors and neighbours.</p>
            <p>No analytics cookies. We do not estimate the tide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
