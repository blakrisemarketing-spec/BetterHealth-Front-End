// The COMPLETE per-route SEO map: every static route plus one entry per blog
// article. Consumed by the build-time pre-render in vite.config.js, which runs in
// a plain Node context and needs every route in one object.
//
// Client code must NOT import this module. Importing it pulls in the article
// registry, which statically imports all 67 post files (~1.2MB of prose). Import
// ./seo-static.js instead; <Seo> reads that, and the two blog pages build their
// own entries from ./blog/article-seo.js using the article they already hold.
import { STATIC_ROUTE_SEO, SITE_URL, DEFAULT_OG_IMAGE, SITE_LASTMOD } from "./seo-static.js";
import { ARTICLES } from "./blog/index.js";
import { blogRouteSeo, blogIndexSeo } from "./blog/article-seo.js";

export { SITE_URL, DEFAULT_OG_IMAGE, SITE_LASTMOD };

// Blog routes are derived entirely from the article registry. Each post becomes a
// prerendered /blog/<slug> page carrying Article + BreadcrumbList (+ FAQPage when
// the article has an FAQ block) schema, with og:type=article.
const BLOG_ROUTE_SEO = Object.fromEntries(
  ARTICLES.map((a) => [`blog/${a.slug}`, blogRouteSeo(a)])
);

// Re-key 'blog' in place so the /blog index keeps its Blog schema, which lists
// every article and therefore cannot live in the corpus-free static module.
export const ROUTE_SEO = {
  ...STATIC_ROUTE_SEO,
  blog: blogIndexSeo(STATIC_ROUTE_SEO.blog, ARTICLES),
  ...BLOG_ROUTE_SEO,
};
