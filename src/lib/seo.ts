import { SITE } from "@/content/guide";

export function canonical(path: string) {
  if (path === "/") return SITE.origin;
  return `${SITE.origin}${path}`;
}

export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}) {
  const url = canonical(opts.path);
  const image = `${SITE.origin}/og.jpg`;
  const scripts = opts.jsonLd
    ? [
        {
          type: "application/ld+json",
          children: JSON.stringify(opts.jsonLd),
        },
      ]
    : [];
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:image", content: image },
      { property: "og:locale", content: "en_GB" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: opts.title },
      { name: "twitter:description", content: opts.description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts,
  };
}

export function placeJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: opts.name,
    description: opts.description,
    url: canonical(opts.path),
    image: opts.image ? `${SITE.origin}${opts.image}` : undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Stoke Fleming",
      addressRegion: "Devon",
      addressCountry: "GB",
    },
  };
}
