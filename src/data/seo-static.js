// Per-route SEO for every NON-BLOG route. Split out of seo.js so that importing
// SEO does not drag in the blog corpus: src/data/blog/index.js statically imports
// all 67 article files (~1.2MB of prose), and 23 pages that render no blog content
// were paying for it. The client-side <Seo> component reads THIS module; only the
// build-time pre-render (vite.config.js) reads seo.js, which adds the blog routes.
//
// Blog routes live in seo.js + src/data/blog/article-seo.js. The homepage ('/')
// uses index.html directly.
import { faqSections, testPanels, singleTests } from "./content.js";
import {
  getMedicalWebPageSchema,
  getBreadcrumbSchema,
  getArticleSchema,
  getFaqPageSchema,
  pageUrl,
} from "../components/structured-data.js";
import { WELLNESS_CONSULTATION_SEO } from "./wellness-consultation-seo.js";
import { GUIDES } from "./guides/index.js";
import { getTestDetail } from "./test-details.js";
import { getSingleTestDetail } from "./single-test-details.js";

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

// Single-test detail pages (/test/<slug>). Same defect as the panel pages
// above, on the other half of the catalogue: without a prerendered file the
// LiteSpeed rewrite in public/.htaccess returns a real 404 for these URLs, so
// crawlers, social scrapers and ad reviewers see a 404 even though React still
// renders the page for humans. Title, description and JSON-LD mirror what
// src/pages/SingleTestDetail.jsx renders through Helmet (MedicalTest with the
// static offer price, plus FAQPage when the test has FAQs), so the static <head>
// and the live one agree. Prices here are the content.js fallbacks; the page
// swaps in the live catalogue price after hydration, as it does for the price
// copy. The MedicalWebPage node is declared here rather than via MEDICAL_ROUTES
// because the auto-derived name would be the whole "<test>: <subtitle>" title.
const SINGLE_TEST_ROUTE_SEO = Object.fromEntries(
  singleTests.flatMap((base) => {
    const test = getSingleTestDetail(base.slug);
    if (!test) return [];
    const route = `test/${test.slug}`;
    const url = pageUrl(route);
    const title = `${test.name}: ${test.subtitle} | BetterHealth Africa`;
    const jsonld = [
      getMedicalWebPageSchema({
        url,
        name: test.name,
        description: test.description,
      }),
      {
        "@context": "https://schema.org",
        "@type": "MedicalTest",
        name: test.name,
        description: test.description,
        url,
        provider: {
          "@type": "MedicalOrganization",
          name: "BetterHealth Africa",
          url: SITE_URL,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "GHS",
          price: String(test.price).replace(/[^\d.]/g, ""),
          url,
          availability: "https://schema.org/InStock",
        },
      },
      ...(test.faqs?.length
        ? [
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: test.faqs.map((f) => ({
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
        { name: test.name, url },
      ]),
    ];
    return [[route, { title, description: test.description, image: DEFAULT_OG_IMAGE, jsonld }]];
  }),
);

// Routes that are primarily medical/health content get a MedicalWebPage node.
const MEDICAL_ROUTES = new Set([
  "how-it-works",
  "what-we-test",
  "stories",
  "book-tests",
  // Panel detail pages and the free health-education guides are medical
  // content too.
  ...testPanels.map((p) => `book-tests/${p.slug}`),
  ...GUIDES.map((g) => `guides/${g.slug}`),
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
  // /test/<slug> for every single test in content.js#singleTests.
  ...SINGLE_TEST_ROUTE_SEO,
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
export const STATIC_ROUTE_SEO = Object.fromEntries(
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
