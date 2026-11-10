import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarDays, Menu, Search, X } from "lucide-react";
import { SITE } from "@/content/guide";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/things-to-do", label: "Things to Do" },
  { to: "/beaches", label: "Beaches" },
  { to: "/food-drink", label: "Food & Drink" },
  { to: "/stay", label: "Stay" },
  { to: "/events", label: "Events" },
] as const;

export function SiteChrome({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const home = path === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = (to: string) => (to === "/" ? path === "/" : path === to || path.startsWith(`${to}/`));

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || !home ? "bg-paper shadow-lg" : "bg-paper/90 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-2xl font-bold text-sea-deep" title="Visit Stoke Fleming">
            Stoke Fleming
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`border-b-2 px-3 py-2 text-sm font-medium ${
                  active(item.to) ? "border-sea text-sea" : "border-transparent text-ink hover:text-sea"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-1 lg:flex">
            <Link to="/search" className="inline-flex h-11 w-11 items-center justify-center text-ink hover:text-sea" aria-label="Search">
              <Search className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link to="/planner" className="inline-flex h-11 w-11 items-center justify-center text-ink hover:text-sea" aria-label="Trip planner">
              <CalendarDays className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            <span className="sr-only">{open ? "Close menu" : "Menu"}</span>
          </button>
        </div>
        {open ? (
          <nav id="mobile-nav" className="border-t border-line bg-paper px-4 py-2 lg:hidden" aria-label="Mobile">
            {LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`block min-h-11 py-2 font-medium ${active(item.to) ? "text-sea" : "text-ink"}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/visit" className="block min-h-11 py-2 font-medium" onClick={() => setOpen(false)}>Visit</Link>
            <Link to="/community" className="block min-h-11 py-2 font-medium" onClick={() => setOpen(false)}>Village directory</Link>
            <div className="flex gap-2 py-2">
              <Link to="/search" className="inline-flex h-11 w-11 items-center justify-center" aria-label="Search" onClick={() => setOpen(false)}>
                <Search className="h-5 w-5" />
              </Link>
              <Link to="/planner" className="inline-flex h-11 w-11 items-center justify-center" aria-label="Trip planner" onClick={() => setOpen(false)}>
                <CalendarDays className="h-5 w-5" />
              </Link>
            </div>
          </nav>
        ) : null}
      </header>
      <div id="content" className={home ? "flex-1" : "flex-1 pt-16"}>
        {children}
      </div>
      <footer className="bg-night text-paper">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <h2 className="text-2xl text-paper">About Stoke Fleming</h2>
            <p className="mt-4 leading-relaxed text-paper/75">
              A coastal village in South Devon, between Dartmouth and Strete. This is an independent guide, not the parish council and not an official tourist board.
            </p>
            <p className="mt-4 text-sm text-paper/75">
              <a className="underline" href="https://www.stokefleming.org/">Parish council site</a>
              {" · "}
              <a className="underline" href="https://www.facebook.com/groups/553276165587518">Village Facebook group</a>
              {" · "}
              <a className="underline" href="https://www.instagram.com/discoverstokeflemingdevon/">Instagram</a>
            </p>
          </div>
          <div>
            <h2 className="text-lg text-paper">Explore</h2>
            <ul className="mt-4 space-y-3 text-paper/75">
              <li><Link to="/things-to-do" className="underline">Things to do</Link></li>
              <li><Link to="/beaches" className="underline">Beaches</Link></li>
              <li><Link to="/food-drink" className="underline">Food and drink</Link></li>
              <li><Link to="/stay" className="underline">Stay</Link></li>
              <li><Link to="/events" className="underline">Events</Link></li>
              <li><Link to="/community" className="underline">Village directory</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg text-paper">Plan your visit</h2>
            <ul className="mt-4 space-y-3 text-paper/75">
              <li><Link to="/visit" className="underline">Getting here, parking, buses</Link></li>
              <li><Link to="/visit" hash="dogs" className="underline">Dogs</Link></li>
              <li><Link to="/webcam" className="underline">Weather, not a webcam</Link></li>
              <li><Link to="/accessibility" className="underline">Accessibility</Link></li>
              <li><Link to="/newsletter" className="underline">Monthly newsletter</Link></li>
              <li><Link to="/planner" className="underline">Trip planner</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg text-paper">The small print</h2>
            <ul className="mt-4 space-y-3 text-paper/75">
              <li><Link to="/about" className="underline">Who runs this</Link></li>
              <li><Link to="/contact" className="underline">Correct a listing</Link></li>
              <li><Link to="/privacy" className="underline">Privacy</Link></li>
              <li><Link to="/cookies" className="underline">Cookies</Link></li>
              <li><Link to="/terms" className="underline">Terms</Link></li>
              <li><a className="underline" href="/sitemap.xml">Sitemap</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-paper/10 px-4 py-4 text-sm text-paper/60">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} {SITE.name}.</p>
            <p>No analytics cookies. Tides are not estimated here.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
