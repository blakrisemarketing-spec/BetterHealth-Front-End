// Patients-led biomarker explainer (cluster: "understand your biomarkers").
// Voice: plain, human, no em dashes (run through the bh-humanizer pass). Ranges
// are the widely-accepted WHO/ADA thresholds; the Ghana-specific haemoglobin-variant
// caveat is what sets this apart from generic content.
export default {
  slug: "hba1c-explained",
  title: "What Is HbA1c? Your 3-Month Blood Sugar Average, Explained",
  description:
    "HbA1c shows your average blood sugar over the past two to three months. Learn what the normal, prediabetes and diabetes ranges mean, and a caveat that matters in Ghana.",
  excerpt:
    "HbA1c is the one number that tells you how your blood sugar has behaved for the last two to three months, not just today. What your result means, and one reason it can mislead in Ghana.",
  datePublished: "2026-06-20",
  dateModified: "2026-06-20",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt: "An illustration explaining what the HbA1c blood test measures.",
  tags: ["HbA1c", "diabetes", "blood sugar", "biomarkers"],
  cluster: "biomarkers",
  primaryKeyword: "what is HbA1c",
  readingMinutes: 6,
  body: [
    {
      type: "image",
      src: "/blog/hba1c-hero.svg",
      alt: "HbA1c explained: your average blood sugar over about 90 days, not just today.",
    },
    {
      type: "p",
      text: "HbA1c is one of the most useful numbers on a blood test. It shows how your blood sugar has behaved over the past two to three months, not just at the moment the needle goes in. If you want to know whether your sugar is creeping toward diabetes before you feel anything, this is the number to look at.",
    },
    {
      type: "h2",
      id: "what-it-measures",
      text: "What HbA1c measures",
    },
    {
      type: "p",
      text: "Haemoglobin is the protein in your red blood cells that carries oxygen. HbA1c measures how much of that haemoglobin has glucose stuck to it. The more sugar in your blood over time, the more of it sticks, so a higher HbA1c means a higher average blood sugar.",
    },
    {
      type: "p",
      text: "Red blood cells live for about three to four months, so HbA1c reflects your average glucose over roughly that period. That is why breakfast this morning does not move the result, and why you do not need to fast before the test.",
    },
    {
      type: "h2",
      id: "ranges",
      text: "HbA1c ranges: normal, prediabetes and diabetes",
    },
    {
      type: "p",
      text: "Labs and the World Health Organization read an HbA1c result, given as a percentage, in three bands:",
    },
    {
      type: "list",
      items: [
        "Normal: below 5.7%",
        "Prediabetes: 5.7% to 6.4%. Sugar is higher than ideal but not yet in the diabetes range.",
        "Diabetes: 6.5% or higher, usually confirmed on a second test",
      ],
    },
    {
      type: "image",
      src: "/blog/hba1c-ranges.svg",
      alt: "HbA1c result bands: normal below 5.7%, prediabetes 5.7% to 6.4%, and diabetes 6.5% and above.",
      caption: "The three HbA1c bands, using the WHO/ADA thresholds.",
    },
    {
      type: "callout",
      title: "One high result isn't a diagnosis",
      text: "One raised HbA1c is not a diagnosis on its own. A clinician should confirm it with a repeat test and read it alongside your symptoms and history. Prediabetes is a warning worth acting on, and many people bring their numbers back down with changes to diet, activity and weight.",
    },
    {
      type: "h2",
      id: "why-it-matters",
      text: "Why HbA1c matters more than a single glucose reading",
    },
    {
      type: "p",
      text: "A single fasting glucose test is a snapshot. HbA1c is the trend. Your sugar can read fine on the morning of a test and still run high on most other days. Diabetes builds up over years without symptoms, so the average HbA1c captures gives you a better early warning than any one reading.",
    },
    {
      type: "h2",
      id: "ghana-caveat",
      text: "A Ghana-specific caveat: haemoglobin variants and anaemia",
    },
    {
      type: "p",
      text: "HbA1c can read falsely high or low in people with certain blood conditions that are common in Ghana. Sickle cell trait, sickle cell disease, other haemoglobin variants and iron-deficiency anaemia all change how long red blood cells survive, which throws off the HbA1c calculation. Around one in four Ghanaians carries the sickle cell trait.",
    },
    {
      type: "p",
      text: "That does not make the test useless. It means a clinician who knows your blood picture should read the result. Where HbA1c is unreliable, a fasting glucose test, an oral glucose tolerance test, or a fructosamine test can stand in.",
    },
    {
      type: "h2",
      id: "what-to-do",
      text: "What to do with your HbA1c result",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Write the number down and keep it. Trends over time matter more than any single value.",
        "If you are in the prediabetes or diabetes range, see a doctor to confirm it and plan next steps.",
        "Pair HbA1c with a full metabolic and lipid panel, since high sugar rarely travels alone.",
        "Recheck on the schedule your clinician sets, so you can see which way your numbers are moving.",
      ],
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "See the metabolic panel BetterHealth tests",
    },
    {
      type: "faq",
      items: [
        {
          q: "Do I need to fast before an HbA1c test?",
          a: "No. HbA1c reflects your average blood sugar over the past two to three months, so your most recent meal does not change it. You can take it at any time of day without fasting.",
        },
        {
          q: "How often should I check my HbA1c?",
          a: "It depends on your result and your risk. People with a normal result and no risk factors are often screened every one to three years, while those with prediabetes or diabetes may be checked every three to six months. Your clinician will set the right interval for you.",
        },
        {
          q: "Can a high HbA1c be reversed?",
          a: "Prediabetes can often improve, and sometimes return to the normal range, through changes to diet, physical activity and weight, though results vary from person to person. Established diabetes is usually managed rather than cured. Talk to a doctor about your own situation.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis or treatment by a qualified healthcare professional. Always discuss your own results with your doctor.",
    },
  ],
};
