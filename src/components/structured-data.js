export const SITE_URL = "https://www.betterhealth.africa";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

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
      "BetterHealth Africa is a health technology company making proactive lab testing and preventive care accessible across Ghana.",
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
  const url = `${SITE_URL}/blog/${article.slug}`;
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
      url: absUrl(article.author?.url || "/about"),
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
    "@id": `${SITE_URL}/blog#blog`,
    url: `${SITE_URL}/blog`,
    name: "BetterHealth Africa Blog",
    description:
      "Plain-language health education for Ghanaians: biomarker explainers, screening guides, and what early detection can catch.",
    inLanguage: "en-GH",
    publisher: { "@id": ORGANIZATION_ID },
    blogPost: articles.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      url: `${SITE_URL}/blog/${a.slug}`,
      datePublished: a.datePublished,
    })),
  };
}
