// SEO builders for blog routes, kept in their own module so they can be called
// with a SINGLE article. Nothing here imports the article registry, so a page
// that already holds one article (BlogPost) can build its own <head> without
// pulling in all 67 posts. seo.js maps these over the whole registry at build
// time for the pre-render.
import {
  getArticleSchema,
  getBreadcrumbSchema,
  getBlogSchema,
  getFaqPageSchema,
  pageUrl,
} from "../../components/structured-data.js";
import { SITE_URL, DEFAULT_OG_IMAGE } from "../seo-static.js";

// FAQ blocks an article opts into, used for FAQPage rich results.
export function articleFaqItems(article) {
  return article.body
    .filter((b) => b.type === "faq")
    .flatMap((b) => b.items);
}

// One /blog/<slug> route's SEO: Article + BreadcrumbList (+ FAQPage when the
// article carries an FAQ block), with og:type=article.
export function blogRouteSeo(article) {
  const route = `blog/${article.slug}`;
  const url = pageUrl(route);
  const faq = articleFaqItems(article);
  const jsonld = [
    getArticleSchema(article),
    getBreadcrumbSchema([
      { name: "Home", url: pageUrl("") },
      { name: "Blog", url: pageUrl("blog") },
      { name: article.title, url },
    ]),
    ...(faq.length
      ? [
          getFaqPageSchema({
            url,
            name: article.title,
            description: article.description,
            questions: faq,
          }),
        ]
      : []),
  ];

  return {
    title: `${article.title} | BetterHealth Africa`,
    description: article.description,
    image: article.image ? `${SITE_URL}${article.image}` : DEFAULT_OG_IMAGE,
    imageAlt: article.imageAlt || article.title,
    ogType: "article",
    lastmod: article.dateModified || article.datePublished,
    jsonld,
  };
}

// The /blog index. Takes the registry because the Blog schema lists every post;
// the caller (seo.js at build time, Blog.jsx at runtime) already holds it.
// getBlogSchema goes FIRST so the emitted block order matches the pre-render.
export function blogIndexSeo(staticBlogEntry, articles) {
  return {
    ...staticBlogEntry,
    jsonld: [getBlogSchema(articles), ...(staticBlogEntry.jsonld || [])],
  };
}
