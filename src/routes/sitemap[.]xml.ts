import { createFileRoute } from "@tanstack/react-router";
import { ACTIVITIES, BEACHES, SITE, SITEMAP } from "@/content/guide";

function xmlEscape(value: string) {
  return value.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const today = new Date().toISOString().slice(0, 10);
        const paths = [
          ...SITEMAP.map((page) => page.path),
          ...ACTIVITIES.map((item) => `/things-to-do/${item.slug}`),
          ...BEACHES.map((item) => `/beaches/${item.slug}`),
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (path) => `  <url><loc>${xmlEscape(path === "/" ? SITE.origin : `${SITE.origin}${path}`)}</loc><lastmod>${today}</lastmod></url>`,
  )
  .join("\n")}
</urlset>`;
        return new Response(body, {
          headers: { "content-type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
