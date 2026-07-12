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

// Routes that are primarily medical/health content get a MedicalWebPage node.
const MEDICAL_ROUTES = new Set(["how-it-works", "what-we-test", "stories", "book-tests"]);

// Per-route SEO before auto-derived schema is layered on. Only the page-unique
// schema (NGO/Product/FAQ/Blog) is declared here; MedicalWebPage and
// BreadcrumbList are added automatically below so every page stays consistent.
const RAW_ROUTE_SEO = {
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
