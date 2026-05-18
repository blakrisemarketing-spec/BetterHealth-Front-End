export const SITE_URL = "https://www.betterhealth.africa";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

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
