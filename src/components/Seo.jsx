import { Helmet } from "react-helmet-async";
import { ROUTE_SEO, DEFAULT_OG_IMAGE } from "../data/seo";
import { pageUrl } from "./structured-data.js";

/**
 * Single source of per-route SEO. Reads ROUTE_SEO (src/data/seo.js) — the same
 * data the build-time pre-render in vite.config.js uses — so the client-side
 * <head> and the static pre-rendered HTML never drift apart.
 *
 * Usage: <Seo route="pricing" />
 */
export default function Seo({ route }) {
  const page = ROUTE_SEO[route];
  if (!page) return null;

  const url = pageUrl(route);
  const image = page.image || DEFAULT_OG_IMAGE;
  const jsonld = page.jsonld
    ? Array.isArray(page.jsonld)
      ? page.jsonld
      : [page.jsonld]
    : [];

  return (
    <Helmet>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={page.imageAlt || page.title} />
      <meta property="og:site_name" content="BetterHealth Africa" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={page.title} />
      <meta property="twitter:description" content={page.description} />
      <meta property="twitter:image" content={image} />
      {jsonld.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}
