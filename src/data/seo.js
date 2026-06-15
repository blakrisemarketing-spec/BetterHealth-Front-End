// Single source of per-route static SEO for the build-time pre-render in
// vite.config.js. This is what non-JS crawlers and social scrapers (WhatsApp,
// Facebook, LinkedIn, X) see for each route. Keep titles/descriptions in sync
// with each page's <Helmet>. The homepage ('/') uses index.html directly.

export const SITE_URL = "https://www.betterhealth.africa";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const ROUTE_SEO = {
  foundation: {
    title: "100 Healthy Years Foundation — Free Health Screening in Ghana",
    description:
      "The 100 Healthy Years Foundation runs free community health screenings across Ghana, catching preventable conditions early. Volunteer, partner, or request a free screening for your community.",
    image: `${SITE_URL}/foundation-og.jpg`,
    imageAlt:
      "A volunteer runs a free health screening for a smiling community member in Ghana.",
    jsonld: {
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
    },
  },
  "how-it-works": {
    title: "How It Works — BetterHealth Africa",
    description: "Sign up, book a collection, and get your results in 48 hours. Learn how BetterHealth Africa makes comprehensive health screening simple and accessible.",
    image: DEFAULT_OG_IMAGE,
  },
  "what-we-test": {
    title: "What We Test — BetterHealth Africa",
    description: "Explore 155 biomarkers across 17 body systems — heart, liver, kidneys, hormones, blood, immunity, metabolism, fertility, urine, stool, and more. Know your full health picture.",
    image: DEFAULT_OG_IMAGE,
  },
  "stories": {
    title: "Member Stories — BetterHealth Africa",
    description: "Real stories from BetterHealth Africa members. See how early health screening helped Ghanaians take control of their health before symptoms appeared.",
    image: DEFAULT_OG_IMAGE,
  },
  "about": {
    title: "About Us — BetterHealth Africa",
    description: "Meet the team behind BetterHealth Africa. Our mission is to make proactive health screening accessible and affordable for every Ghanaian.",
    image: DEFAULT_OG_IMAGE,
  },
  "pricing": {
    title: "Pricing — BetterHealth Africa",
    description: "Flexible health screening plans starting from GHS 8/day. Choose the right plan for your health goals — individual, family, or enterprise.",
    image: DEFAULT_OG_IMAGE,
  },
  "faq": {
    title: "FAQ — BetterHealth Africa",
    description: "Answers to the most common questions about BetterHealth Africa — how it works, what we test, pricing, sample collection, and your results.",
    image: DEFAULT_OG_IMAGE,
  },
  "contact": {
    title: "Contact Us — BetterHealth Africa",
    description: "Get in touch with BetterHealth Africa via WhatsApp, email, or phone. We respond to most enquiries within 24 hours.",
    image: DEFAULT_OG_IMAGE,
  },
  "blog": {
    title: "Blog — BetterHealth Africa",
    description: "Health insights, biomarker explainers, and wellness guides from the BetterHealth Africa team. Coming soon.",
    image: DEFAULT_OG_IMAGE,
  },
  "careers": {
    title: "Careers — BetterHealth Africa",
    description: "Join the BetterHealth Africa team. We're building the future of proactive healthcare in Ghana. See open roles and our company values.",
    image: DEFAULT_OG_IMAGE,
  },
  "download-app": {
    title: "Download the App — BetterHealth Africa",
    description: "Download the BetterHealth app for iOS and Android. Track your biomarkers, book collections, and take control of your health — all from your phone.",
    image: DEFAULT_OG_IMAGE,
  },
  "for-labs": {
    title: "For Labs — Free Lab Management Software | BetterHealth Africa",
    description: "Replace your paper logs and spreadsheets with a full LIMS — free, forever. Instrument interfaces, automated QC, digital reporting, and access to the BetterHealth patient network.",
    image: DEFAULT_OG_IMAGE,
  },
  "for-doctors": {
    title: "For Doctors — Partner with BetterHealth Africa",
    description: "Stop chasing lab results. BetterHealth delivers validated results directly to your dashboard, with full patient history, AI clinical notes, and referral income. Free to partner.",
    image: DEFAULT_OG_IMAGE,
  },
  "for-nutritionists": {
    title: "For Nutritionists & Dieticians — Partner with BetterHealth Africa",
    description: "Register as a BetterHealth Africa nutrition partner. Receive client lab results digitally, refer clients for testing, earn from every referral, and build data-driven meal plans.",
    image: DEFAULT_OG_IMAGE,
  },
  "privacy": {
    title: "Privacy Policy — BetterHealth Africa",
    description: "How BetterHealth Africa collects, uses, and protects your personal and health data. Written in plain language, no legal jargon.",
    image: DEFAULT_OG_IMAGE,
  },
  "terms": {
    title: "Terms of Service — BetterHealth Africa",
    description: "Read BetterHealth Africa's Terms of Service. Understand your rights, our service commitments, and how we operate.",
    image: DEFAULT_OG_IMAGE,
  },
};
