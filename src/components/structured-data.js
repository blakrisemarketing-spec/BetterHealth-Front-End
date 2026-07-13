export const SITE_URL = "https://www.betterhealth.africa";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// Canonical URL for a route path (no leading/trailing slashes, "" = homepage).
// Always emits a trailing slash for sub-routes because that is what LiteSpeed
// serves as 200 (dist/<route>/ is a directory); the no-slash form 301-redirects.
// Using this everywhere keeps canonical tags, JSON-LD @ids, breadcrumbs, og:url
// and the sitemap pointing at the actually-served URL instead of a redirect.
export const pageUrl = (route) =>
  route ? `${SITE_URL}/${String(route).replace(/^\/+|\/+$/g, "")}/` : `${SITE_URL}/`;

// Turn a site-relative path ("/blog/x.jpg") into an absolute URL. Passes through
// values that are already absolute. Schema.org image/url fields want absolute URLs.
export const absUrl = (pathOrUrl) =>
  !pathOrUrl
    ? undefined
    : /^https?:\/\//i.test(pathOrUrl)
    ? pathOrUrl
    : `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "BetterHealth Africa",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon-512x512.png`,
    description:
      "BetterHealth Africa is Ghana's first health intelligence platform, helping people book lab tests, understand doctor-reviewed results, and track health indicators over time.",
    areaServed: {
      "@type": "Country",
      name: "Ghana",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Accra",
      addressRegion: "Greater Accra",
      addressCountry: "GH",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: "+233268596410",
      email: "hello@betterhealth.africa",
      availableLanguage: ["en", "tw"],
    },
    // Entity disambiguation across the knowledge graph — one of the strongest
    // signals for search sitelinks/knowledge-panel association and AI-engine
    // citation. Kept in sync with the Foundation NGO sameAs in src/data/seo.js.
    sameAs: [
      "https://www.facebook.com/betterhealth.africa",
      "https://www.instagram.com/betterhealth.africa",
      "https://www.x.com/BetterHealthAfrica",
      "https://www.tiktok.com/@betterhealth.africa",
    ],
  };
}

export function getMedicalWebPageSchema({ url, name, description, about }) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en-GH",
    isPartOf: {
      "@id": ORGANIZATION_ID,
    },
    about:
      about || {
        "@type": "MedicalBusiness",
        name: "BetterHealth Africa",
        areaServed: {
          "@type": "Country",
          name: "Ghana",
        },
      },
  };
}

export function getFaqPageSchema({ url, name, description, questions }) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    name,
    description,
    mainEntity: questions.map((question) => ({
      "@type": "Question",
      name: question.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: question.a,
      },
    })),
  };
}

// Site-wide WebSite entity. Helps search engines and AI engines treat the domain
// as a single named entity (enables sitelinks / knowledge-panel association).
// SearchAction is intentionally omitted until an on-site /search endpoint exists —
// declaring one that 404s is invalid markup. Emitted once, statically, in index.html.
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "BetterHealth Africa",
    inLanguage: "en-GH",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

// BreadcrumbList from an ordered [{ name, url }] trail. url should be absolute.
export function getBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absUrl(item.url),
    })),
  };
}

// Article schema for a blog post. Author is a Person; publisher references the
// shared Organization node. mainEntityOfPage + dates + image give AI engines the
// provenance signals they weight when deciding what to cite.
export function getArticleSchema(article) {
  const url = pageUrl(`blog/${article.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.description,
    image: absUrl(article.image),
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    inLanguage: "en-GH",
    author: {
      "@type": "Person",
      name: article.author?.name || "BetterHealth Africa",
      url: absUrl(article.author?.url) || pageUrl("about"),
    },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(article.tags?.length ? { keywords: article.tags.join(", ") } : {}),
    ...(article.medicallyReviewedBy
      ? {
          reviewedBy: {
            "@type": "Person",
            name: article.medicallyReviewedBy,
          },
        }
      : {}),
  };
}

// Blog index schema: a Blog node listing its posts. Used on /blog.
export function getBlogSchema(articles) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${pageUrl("blog")}#blog`,
    url: pageUrl("blog"),
    name: "BetterHealth Africa Blog",
    description:
      "Plain-language health education for Ghanaians: result explainers, testing guides, and what earlier health checks can reveal.",
    inLanguage: "en-GH",
    publisher: { "@id": ORGANIZATION_ID },
    blogPost: articles.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      url: pageUrl(`blog/${a.slug}`),
      datePublished: a.datePublished,
      dateModified: a.dateModified || a.datePublished,
      image: absUrl(a.image),
      author: {
        "@type": "Person",
        name: a.author?.name || "BetterHealth Africa",
      },
    })),
  };
}
