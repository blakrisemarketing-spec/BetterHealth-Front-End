// Single source of per-route SEO. Consumed by BOTH the build-time pre-render
// (vite.config.js) and the client-side <Seo> component (src/components/Seo.jsx),
// so the static HTML that crawlers/social scrapers see and the live <head> can
// never drift apart. The homepage ('/') uses index.html directly.

import { faqSections, testPanels } from "./content.js";
import {
  getMedicalWebPageSchema,
  getBreadcrumbSchema,
  getArticleSchema,
  getBlogSchema,
  getFaqPageSchema,
  pageUrl,
} from "../components/structured-data.js";
import { ARTICLES, articleFaqItems } from "./blog/index.js";
import { WELLNESS_CONSULTATION_SEO } from "./wellness-consultation-seo.js";
import { GUIDES } from "./guides/index.js";
import { TOOLS } from "./tools/index.js";
import { getTestDetail } from "./test-details.js";

export const SITE_URL = "https://www.betterhealth.africa";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
// Stable lastmod for static pages so the sitemap doesn't churn every build.
// Bump when the marketing pages get a meaningful content update. Blog routes
// carry their own per-article dateModified instead.
export const SITE_LASTMOD = "2026-06-20";

// FAQ rich-results schema — built from the same Q&A the /faq page renders, so the
// structured data always matches the visible content (a Google requirement).
const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqSections
    .flatMap((s) => s.items)
    .map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
};

// Test panel schema — built from the same public prices the /book-tests page renders.
const PANEL_PRICES = testPanels
  .map((p) => Number(String(p.price).replace(/[^\d.]/g, "")))
  .filter((n) => n > 0);
const PRICING_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "BetterHealth Africa health tests",
  description:
    "Single health tests and focused panels with home or in-lab sample collection in Ghana.",
  brand: { "@type": "Brand", name: "BetterHealth Africa" },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "GHS",
    lowPrice: String(Math.min(...PANEL_PRICES)),
    highPrice: String(Math.max(...PANEL_PRICES)),
    offerCount: PANEL_PRICES.length,
    url: `${SITE_URL}/book-tests`,
  },
};

const FOUNDATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "100 Healthy Years Foundation",
  alternateName: "BetterHealth Africa Foundation",
  url: `${SITE_URL}/foundation`,
  logo: `${SITE_URL}/foundation-og.jpg`,
  description:
    "Free community health screening for working-age adults in underserved communities across Ghana.",
  areaServed: { "@type": "Country", name: "Ghana" },
  sameAs: [
    "https://www.facebook.com/betterhealth.africa",
    "https://www.instagram.com/betterhealth.africa",
    "https://www.x.com/BetterHealthAfrica",
    "https://www.tiktok.com/@betterhealth.africa",
  ],
};

// "What We Test — BetterHealth Africa" -> "What We Test" (breadcrumb label).
const shortName = (title) => title.split(/[—|]/)[0].trim();

// Panel detail pages (/book-tests/<slug>). Without a prerendered file the
// LiteSpeed SPA fallback serves these with a 404 status, which Meta rejects as
// an ad destination. Title, description and JSON-LD mirror what
// src/pages/TestDetail.jsx renders through Helmet (MedicalTest with the static
// offer price, plus FAQPage when the panel has FAQs), so the static <head> and
// the live one agree. Prices here are the content.js fallbacks; the page swaps
// in the live catalogue price after hydration, as it does for the price copy.
const PANEL_ROUTE_SEO = Object.fromEntries(
  testPanels.flatMap((base) => {
    const panel = getTestDetail(base.slug);
    if (!panel) return [];
    const route = `book-tests/${panel.slug}`;
    const url = pageUrl(route);
    const title = `${panel.displayName} (${panel.name}) | BetterHealth Africa`;
    const jsonld = [
      {
        "@context": "https://schema.org",
        "@type": "MedicalTest",
        name: `${panel.displayName} (${panel.name} Panel)`,
        description: panel.description,
        url,
        provider: {
          "@type": "MedicalOrganization",
          name: "BetterHealth Africa",
          url: SITE_URL,
        },
        usesDevice: { "@type": "MedicalDevice", name: "Laboratory analysis" },
        ...(panel.price && {
          offers: {
            "@type": "Offer",
            priceCurrency: "GHS",
            price: String(panel.price).replace(/[^\d.]/g, ""),
            url,
            availability: "https://schema.org/InStock",
          },
        }),
      },
      ...(panel.faqs?.length
        ? [
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: panel.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
      getBreadcrumbSchema([
        { name: "Home", url: pageUrl("") },
        { name: "Book Tests", url: pageUrl("book-tests") },
        { name: `${panel.displayName} (${panel.name})`, url },
      ]),
    ];
    return [[route, { title, description: panel.description, image: DEFAULT_OG_IMAGE, jsonld }]];
  }),
);

// Routes that are primarily medical/health content get a MedicalWebPage node.
const MEDICAL_ROUTES = new Set([
  "how-it-works",
  "what-we-test",
  "stories",
  "book-tests",
  // Panel detail pages and the free health-education guides are medical
  // content too, as are the interactive calculators under /tools.
  ...testPanels.map((p) => `book-tests/${p.slug}`),
  ...GUIDES.map((g) => `guides/${g.slug}`),
  ...TOOLS.map((t) => `tools/${t.slug}`),
]);

// Per-route SEO before auto-derived schema is layered on. Only the page-unique
// schema (NGO/Product/FAQ/Blog) is declared here; MedicalWebPage and
// BreadcrumbList are added automatically below so every page stays consistent.
const RAW_ROUTE_SEO = {
  // Paid-campaign landing variants. `noindex` keeps four near-identical pages
  // out of the index and the sitemap (doorway-page pattern) while still getting
  // them a prerendered <head> so the ad's link preview renders.
  ...Object.fromEntries(
    Object.entries(WELLNESS_CONSULTATION_SEO).map(([slug, page]) => [
      `wellness-consultation/${slug}`,
      { ...page, image: DEFAULT_OG_IMAGE, noindex: true },
    ]),
  ),
  // Free lead-magnet guides (/guides, /guides/<slug>). Indexable evergreen
  // pages: unlike the consultation variants these are distinct pieces of
  // content, so they belong in the index and the sitemap.
  guides: {
    title: "Free Health Guides | BetterHealth Africa",
    description:
      "Free plain-English health guides for Ghana: know your numbers, read your lab results, log your blood sugar or blood pressure, map your family history, and find the right test.",
    image: DEFAULT_OG_IMAGE,
    noindex: false,
  },
  ...Object.fromEntries(
    GUIDES.map((g) => [
      `guides/${g.slug}`,
      {
        title: `${g.title} | ${g.kind === "quiz" ? "Free Quiz" : "Free Guide"} | BetterHealth Africa`,
        description: g.description,
        image: DEFAULT_OG_IMAGE,
        noindex: false,
      },
    ]),
  ),
  // Free interactive calculators (/tools, /tools/<slug>). Indexable for the
  // same reason as the guides: each one is a distinct piece of content that
  // answers a query on its own.
  tools: {
    title: "Free Health Tools | BetterHealth Africa",
    description:
      "Three free calculators for Ghana: genotype compatibility odds for a couple, your FINDRISC diabetes risk score, and a heart age estimate. No sign-up.",
    image: DEFAULT_OG_IMAGE,
    noindex: false,
  },
  ...Object.fromEntries(
    TOOLS.map((t) => [
      `tools/${t.slug}`,
      {
        title: `${t.title} | Free Tool | BetterHealth Africa`,
        description: t.description,
        image: DEFAULT_OG_IMAGE,
        noindex: false,
      },
    ]),
  ),
  foundation: {
    title: "100 Healthy Years Foundation | Free Health Screening in Ghana",
    description:
      "The 100 Healthy Years Foundation runs free community health screenings across Ghana, catching preventable conditions early. Volunteer, partner, or request a free screening for your community.",
    image: `${SITE_URL}/foundation-og.jpg`,
    imageAlt:
      "A volunteer runs a free health screening for a smiling community member in Ghana.",
    jsonld: [FOUNDATION_JSONLD],
  },
  "how-it-works": {
    title: "How BetterHealth Works | Health Intelligence Platform in Ghana",
    description:
      "Start with a health concern, book a relevant test in Ghana, get doctor-reviewed results in 48 to 72 hours, and track the indicators that matter over time.",
    image: `${SITE_URL}/how-it-works-og.jpg`,
  },
  "what-we-test": {
    title: "What We Test | Health Indicators & Intelligence | BetterHealth Africa",
    description:
      "Explore the health indicators behind BetterHealth Africa's health intelligence platform: blood sugar, heart risk, liver, kidneys, hormones, fertility, nutrition, blood health, urine, stool, and more.",
    image: `${SITE_URL}/what-we-test-og.jpg`,
  },
  stories: {
    title: "Member Stories | BetterHealth Africa",
    description:
      "Anonymised BetterHealth stories showing how Ghanaians used lab tests, doctor-reviewed results, and clear explanations to move from health worry to clarity.",
    image: DEFAULT_OG_IMAGE,
  },
  about: {
    title: "About Us | BetterHealth Africa",
    description:
      "Meet the team building Ghana's first health intelligence platform for lab testing, doctor-reviewed results, clear explanations, and trend tracking.",
    image: DEFAULT_OG_IMAGE,
  },
  "book-tests": {
    title: "Book Tests | Comprehensive Health Panels | BetterHealth Africa",
    description:
      "Choose from 9 health test panels: Dialics (diabetes), Cardion (heart), Panorama (full body) and more. Fixed prices, doctor-reviewed results, home sample collection across Ghana.",
    image: DEFAULT_OG_IMAGE,
    jsonld: [PRICING_JSONLD],
  },
  // /book-tests/<slug> for all nine panels (Campaign 1 ad destinations).
  ...PANEL_ROUTE_SEO,
  programs: {
    title: "Condition Programs: Diabetes, Hypertension & More | BetterHealth Africa",
    description:
      "Join the waitlist for chronic-condition programs built around diabetes, hypertension, kidney, heart, liver, fertility, and PCOS, with doctor review and coaching.",
    image: DEFAULT_OG_IMAGE,
  },
  faq: {
    title: "FAQ | BetterHealth Africa",
    description:
      "Answers to common questions about BetterHealth Africa: how it works, what we test, pricing, sample collection, and your results.",
    image: DEFAULT_OG_IMAGE,
    jsonld: [FAQ_JSONLD],
  },
  contact: {
    title: "Contact Us | BetterHealth Africa",
    description:
      "Contact BetterHealth Africa for booking help, results questions, partnerships, privacy requests, or support by WhatsApp, email, or phone.",
    image: DEFAULT_OG_IMAGE,
  },
  blog: {
    title: "Blog | BetterHealth Africa",
    description:
      "Plain-language health education for Ghanaians: result explainers, screening guides, and what early detection can catch before symptoms appear.",
    image: DEFAULT_OG_IMAGE,
    jsonld: [getBlogSchema(ARTICLES)],
  },
  careers: {
    title: "Careers | BetterHealth Africa",
    description:
      "Join the BetterHealth Africa team building Ghana's health intelligence platform for earlier testing, clearer results, and better health tracking.",
    image: DEFAULT_OG_IMAGE,
  },
  "download-app": {
    title: "Download the App | BetterHealth Africa",
    description:
      "Get notified when the BetterHealth app launches for iOS and Android. Track health indicators, book tests, and review results from your phone.",
    image: DEFAULT_OG_IMAGE,
  },
  "for-labs": {
    title: "For Labs | Free Lab Management Software | BetterHealth Africa",
    description:
      "Replace your paper logs and spreadsheets with a full LIMS that is free forever. Instrument interfaces, automated QC, digital reporting, and access to the BetterHealth patient network.",
    image: `${SITE_URL}/for-labs-og.jpg`,
  },
  "for-doctors": {
    title: "For Doctors | Partner with BetterHealth Africa",
    description:
      "Stop chasing lab results. BetterHealth delivers validated results directly to your dashboard, with full patient history, AI clinical notes, and referral income. Free to partner.",
    image: `${SITE_URL}/for-doctors-og.jpg`,
  },
  "for-nutritionists": {
    title: "For Nutritionists & Dieticians | Partner with BetterHealth Africa",
    description:
      "Register as a BetterHealth Africa nutrition partner. Receive client lab results digitally, refer clients for testing, earn from every referral, and build data-driven meal plans.",
    image: `${SITE_URL}/for-nutritionists-og.jpg`,
  },
  privacy: {
    title: "Privacy Policy | BetterHealth Africa",
    description:
      "How BetterHealth Africa collects, uses, and protects your personal and health data. Written in plain language, no legal jargon.",
    image: DEFAULT_OG_IMAGE,
  },
  terms: {
    title: "Terms of Service | BetterHealth Africa",
    description:
      "Read BetterHealth Africa's Terms of Service. Understand your rights, our service commitments, and how we operate.",
    image: DEFAULT_OG_IMAGE,
  },
};

// Layer auto-derived schema onto every static route: a MedicalWebPage node for
// medical-content routes, and a BreadcrumbList for all of them. Declaring these
// once here (rather than per route above) keeps them consistent and means a new
// page only has to provide its unique schema.
const STATIC_ROUTE_SEO = Object.fromEntries(
  Object.entries(RAW_ROUTE_SEO).map(([route, page]) => {
    const jsonld = Array.isArray(page.jsonld)
      ? [...page.jsonld]
      : page.jsonld
      ? [page.jsonld]
      : [];

    if (
      MEDICAL_ROUTES.has(route) &&
      !jsonld.some((b) => b["@type"] === "MedicalWebPage")
    ) {
      jsonld.unshift(
        getMedicalWebPageSchema({
          url: pageUrl(route),
          name: shortName(page.title),
          description: page.description,
        })
      );
    }

    if (!jsonld.some((b) => b["@type"] === "BreadcrumbList")) {
      jsonld.push(
        getBreadcrumbSchema([
          { name: "Home", url: pageUrl("") },
          { name: shortName(page.title), url: pageUrl(route) },
        ])
      );
    }

    return [route, { ...page, lastmod: SITE_LASTMOD, jsonld }];
  })
);

// Blog routes are derived entirely from the article registry. Each post becomes a
// prerendered /blog/<slug> page carrying Article + BreadcrumbList (+ FAQPage when
// the article has an FAQ block) schema, with og:type=article.
const BLOG_ROUTE_SEO = Object.fromEntries(
  ARTICLES.map((a) => {
    const route = `blog/${a.slug}`;
    const url = pageUrl(route);
    const faq = articleFaqItems(a);
    const jsonld = [
      getArticleSchema(a),
      getBreadcrumbSchema([
        { name: "Home", url: pageUrl("") },
        { name: "Blog", url: pageUrl("blog") },
        { name: a.title, url },
      ]),
      ...(faq.length
        ? [
            getFaqPageSchema({
              url,
              name: a.title,
              description: a.description,
              questions: faq,
            }),
          ]
        : []),
    ];
    return [
      route,
      {
        title: `${a.title} | BetterHealth Africa`,
        description: a.description,
        image: a.image ? `${SITE_URL}${a.image}` : DEFAULT_OG_IMAGE,
        imageAlt: a.imageAlt || a.title,
        ogType: "article",
        lastmod: a.dateModified || a.datePublished,
        jsonld,
      },
    ];
  })
);

export const ROUTE_SEO = { ...STATIC_ROUTE_SEO, ...BLOG_ROUTE_SEO };
