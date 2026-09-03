// Interactive tool 1: the Genotype Compatibility Calculator.
//
// Pure data + maths. No JSX and no browser globals, because src/data/seo.js
// imports this module on the Node side at build time (same rule as
// src/data/guides/*).
//
// THE MATHS IS A PLAIN PUNNETT SQUARE. Each parent passes one of their two
// haemoglobin alleles with equal probability, which gives four equally likely
// combinations. Each combination is normalised to a canonical allele order
// (A, then S, then C) so AS and SA are counted as the same outcome, then
// duplicates are summed into percentages. Nothing is weighted, and no
// population frequency is applied: the numbers are the genetics of a single
// pregnancy, not a prediction about a family.
//
// Clinical content is copied from the site's own vetted articles and cites
// what they cite:
//   src/data/blog/posts/genotype-test-aa-as-ss.js
//   src/data/blog/posts/sickle-cell-trait-testing.js
//   src/data/blog/posts/premarital-screening.js
// Do not add a genotype claim here that is not in one of those three.

// Allele priority for canonical ordering. A before S before C, so a pair is
// always rendered AS (never SA) and AC (never CA), and SC (never CS).
const ALLELE_ORDER = { A: 0, S: 1, C: 2 };

// Display order for the outcome table, coarsest-risk-last within each group.
const GENOTYPE_ORDER = ["AA", "AS", "AC", "SS", "SC", "CC"];

export const GENOTYPE_OPTIONS = [
  { value: "AA", label: "AA", hint: "No sickle gene" },
  { value: "AS", label: "AS", hint: "Sickle cell trait" },
  { value: "SS", label: "SS", hint: "Sickle cell disease" },
  { value: "AC", label: "AC", hint: "Haemoglobin C trait" },
  { value: "SC", label: "SC", hint: "A form of sickle cell disease" },
  { value: "CC", label: "CC", hint: "Haemoglobin C disease" },
  { value: "unknown", label: "I don't know yet", hint: "Never tested, or only a sickling test" },
];

// What each genotype means, in the words of the site's own genotype article.
export const GENOTYPE_MEANING = {
  AA: "Two normal haemoglobin genes. The most common result, and no sickle cell risk to pass on.",
  AS: "Sickle cell trait. One normal gene, one sickle gene (HbS). Usually causes no symptoms on its own.",
  SS: "Sickle cell disease, also called sickle cell anaemia. Two sickle genes. A serious, lifelong condition.",
  SC: "A form of sickle cell disease. One sickle gene, one haemoglobin C gene.",
  AC: "Haemoglobin C trait. Generally harmless alone, but relevant if a partner carries AS or SC.",
  CC: "Haemoglobin C disease, a milder condition than SS but still worth a specialist's review.",
};

// The four outcome groups the result screen sorts children's genotypes into.
export const OUTCOME_GROUPS = [
  { id: "clear", label: "No sickle gene", genotypes: ["AA"] },
  { id: "trait", label: "Carries a trait", genotypes: ["AS", "AC"] },
  { id: "disease", label: "Has a sickle cell condition", genotypes: ["SS", "SC"] },
  { id: "hbc", label: "Haemoglobin C disease", genotypes: ["CC"] },
];

// Plain-English pairing lines, copied verbatim from
// src/data/blog/posts/genotype-test-aa-as-ss.js. Keys are the two genotypes in
// canonical order joined by "+", so lookup is order-independent.
const PAIRING_LINES = {
  "AA+AA": "AA + AA: no risk of sickle cell disease in any child.",
  "AA+AS": "AA + AS: no child can have sickle cell disease from this pairing, though half may inherit the trait.",
  "AS+AS": "AS + AS: each pregnancy carries a 25% chance of sickle cell disease (SS), independently, every time.",
  "AS+SS": "AS + SS: every child inherits at least one sickle gene; about half will have the disease.",
  "SS+SS": "SS + SS: every child inherits sickle cell disease.",
};

const C_PAIRING_LINE =
  "Any pairing involving AC or SC: haemoglobin C changes the picture and needs the same electrophoresis-confirmed review before drawing conclusions.";

// The two framing lines the site already commits to. Both are carried on every
// result, including the ones that come back at 0%.
export const PROBABILITY_FRAMING =
  "This is a statement about probability, not a verdict on whether two people should be together.";
export const PER_PREGNANCY_FRAMING =
  "These odds apply independently to every pregnancy, not just the first, and they are the same regardless of how many unaffected children a couple already has.";

/** Two alleles in canonical order: canonicalPair("S", "A") === "AS". */
export function canonicalPair(a, b) {
  return ALLELE_ORDER[a] <= ALLELE_ORDER[b] ? `${a}${b}` : `${b}${a}`;
}

/**
 * Punnett square for two haemoglobin genotypes.
 *
 * @param {string} one    e.g. "AS"
 * @param {string} other  e.g. "AC"
 * @returns {Array<{ genotype: string, count: number, percent: number }>}
 *   One row per distinct outcome, in GENOTYPE_ORDER, percentages summing to 100.
 */
export function punnett(one, other) {
  const counts = {};
  for (const a of one) {
    for (const b of other) {
      const key = canonicalPair(a, b);
      counts[key] = (counts[key] || 0) + 1;
    }
  }
  return GENOTYPE_ORDER.filter((g) => counts[g]).map((genotype) => ({
    genotype,
    count: counts[genotype],
    percent: (counts[genotype] / 4) * 100,
  }));
}

/** Roll the per-genotype rows up into the four outcome groups. */
export function groupOutcomes(rows) {
  return OUTCOME_GROUPS.map((group) => ({
    ...group,
    percent: rows
      .filter((r) => group.genotypes.includes(r.genotype))
      .reduce((sum, r) => sum + r.percent, 0),
    rows: rows.filter((r) => group.genotypes.includes(r.genotype)),
  })).filter((g) => g.percent > 0);
}

/** The article's own line for this pairing, or null when it has not written one. */
export function pairingLine(one, other) {
  const key = [one, other].sort((a, b) => GENOTYPE_ORDER.indexOf(a) - GENOTYPE_ORDER.indexOf(b)).join("+");
  if (PAIRING_LINES[key]) return PAIRING_LINES[key];
  if (one.includes("C") || other.includes("C")) return C_PAIRING_LINE;
  return null;
}

/**
 * Score the two answers.
 *
 * @param {{ you: string, partner: string }} answers
 * @returns {{ kind: "unknown" | "odds", you, partner, rows?, groups?, pairingLine?, answers, healthInterest }}
 */
export function computeGenotype({ you, partner }) {
  const base = {
    you,
    partner,
    healthInterest: "HB_ELECTRO",
    answers: { yourGenotype: you, partnerGenotype: partner },
  };

  if (you === "unknown" || partner === "unknown") {
    return { ...base, kind: "unknown" };
  }

  const rows = punnett(you, partner);
  const groups = groupOutcomes(rows);
  return {
    ...base,
    kind: "odds",
    rows,
    groups,
    pairingLine: pairingLine(you, partner),
    answers: {
      ...base.answers,
      outcomes: rows.map((r) => `${r.genotype} ${r.percent}%`).join(", "),
    },
  };
}

// ------------------------- Part 2: two follow-up questions -------------------
//
// The Punnett square takes exactly two inputs and nothing below changes it.
// These two answers change the ADVICE: how firmly the result recommends an
// electrophoresis test, and what the family-history line says. The wording
// draws on the same three articles as the rest of this file.

export const GENOTYPE_BASIS_OPTIONS = [
  {
    value: "electrophoresis",
    label: "An electrophoresis or HPLC report",
    hint: "A lab report that names the genotype, for both of us",
  },
  { value: "sickling", label: "A sickling test only", hint: "Positive or negative, with no letters" },
  { value: "clinic", label: "A clinic told us, no paperwork", hint: "Said out loud, never written down" },
  { value: "guess", label: "Guessing, or going from memory", hint: "Or a test so long ago the report is gone" },
];

export const FAMILY_SCD_OPTIONS = [
  { value: "yes", label: "Yes, in one or both families" },
  { value: "no", label: "No, as far as we know" },
  { value: "unsure", label: "Not sure" },
];

// The line under the odds explaining that these two answers moved the advice
// and nothing else. Every result screen carries it.
export const FOLLOW_UP_NOTE =
  "The two follow-up questions do not change the odds above, which come from the two genotypes alone; they change what we suggest doing next.";

/**
 * Turn the two follow-up answers into the next-step copy.
 *
 * @param {{ you, partner, basis, familyScd }} input
 * @returns {{ id, strength: "standard" | "strong", headline, body, familyLine, ctaLabel }}
 */
export function genotypeAdvice({ you, partner, basis, familyScd }) {
  const anyUnknown = you === "unknown" || partner === "unknown";

  let id = basis || "unspecified";
  let strength = "standard";
  let headline;
  let body;
  let ctaLabel = "Confirm both genotypes";

  if (anyUnknown) {
    id = "unknown";
    strength = "strong";
    headline = "The first step is a test for each of you.";
    body =
      "A Punnett square needs two confirmed results. Haemoglobin electrophoresis or HPLC states a genotype outright, from one small blood sample, with no fasting.";
    ctaLabel = "Get both genotypes confirmed";
  } else if (basis === "electrophoresis") {
    headline = "Both genotypes come from the test that states them outright.";
    body =
      "An electrophoresis or HPLC report names the letters, so the odds above stand as calculated. If a report is old or covers only one of you, the other needs the same test.";
    ctaLabel = "Confirm a missing or old result";
  } else if (basis === "sickling") {
    strength = "strong";
    headline = "A sickling test cannot give the letters these odds rest on.";
    body =
      "It comes back positive for both AS and SS, because both contain HbS, so it cannot tell a carrier apart from someone with sickle cell disease. Treat the odds above as provisional until an electrophoresis or HPLC report confirms both genotypes.";
    ctaLabel = "Confirm both genotypes before relying on this";
  } else if (basis === "clinic") {
    strength = "strong";
    headline = "A genotype given out loud is worth having on paper.";
    body =
      "A result with no report cannot be checked, and memory of a two-letter code is easy to get wrong. Electrophoresis or HPLC states the letters and the report is yours to keep, so a decision can rest on it.";
    ctaLabel = "Get it on paper for both of you";
  } else if (basis === "guess") {
    strength = "strong";
    headline = "A guessed genotype gives a guessed result.";
    body =
      "The square above is only as good as the two letters that went into it. Electrophoresis or HPLC replaces the guess with a report, and the test is the same whatever letters it finds.";
    ctaLabel = "Replace the guess with a test";
  } else {
    headline = "Confirm both genotypes before a decision rests on this.";
    body =
      "Haemoglobin electrophoresis or HPLC is the test that states a genotype outright: AA, AS, SS, SC or another combination.";
  }

  let familyLine = null;
  if (familyScd === "yes") {
    familyLine =
      "Sickle cell disease in either family means at least one sickle or haemoglobin C gene is already known to be present, which makes a confirmed result for both of you more useful.";
  } else if (familyScd === "no") {
    familyLine =
      "No known sickle cell disease in either family does not rule out the trait. A carrier usually has no symptoms, which is why the test exists.";
  } else if (familyScd === "unsure") {
    familyLine =
      "Not knowing the family history is common. A genotype test for each of you settles it without needing the family history.";
  }

  return { id, strength, headline, body, familyLine, ctaLabel };
}

export default {
  slug: "genotype-compatibility",
  title: "Genotype Compatibility Calculator",
  shortTitle: "Genotype Calculator",
  eyebrow: "Free instant calculator",
  promise:
    "Pick your genotype and your partner's. See the odds for each pregnancy, worked out as a plain Punnett square, then two quick follow-ups that sharpen what to do next. Share the result as a card.",
  description:
    "Enter both genotypes and see the chance of AA, AS, SS, AC, SC or CC in each pregnancy. Free instant Punnett-square calculator from BetterHealth Africa.",
  format: "Two questions, two follow-ups, instant result",
  bullets: [
    "Two questions, no waiting",
    "The odds for every possible outcome, per pregnancy",
    "Two follow-ups that sharpen the next step, without touching the odds",
    "A result card you can share on WhatsApp",
  ],
  intro:
    "Two questions, then two follow-ups. The calculator does the same Punnett square a genetic counsellor draws on paper, so the numbers are the plain genetics of one pregnancy. The follow-ups only change the advice.",
  sections: [
    {
      heading: "What this calculator does",
      paragraphs: [
        "Everyone inherits one haemoglobin gene from their mother and one from their father. A genotype test reports the pair you ended up with as a two-letter code: AA, AS, SS, AC, SC or CC.",
        "Put two confirmed genotypes together and the arithmetic is fixed. Each parent passes one of their two genes with equal chance, which gives four equally likely combinations. The calculator counts those four and turns them into percentages.",
      ],
      callout:
        "Genotype compatibility describes the chance a couple's future children could inherit sickle cell disease, calculated from both partners' confirmed genotypes. It is a statement about probability, not a verdict on whether two people should be together.",
    },
    {
      heading: "Where the numbers come from",
      paragraphs: [
        "Nothing here is estimated. A Punnett square is counting, not modelling, so the same two genotypes always give the same four combinations.",
        "The calculator cannot check your genotype. It works from what you type in, so a result is only as good as the test behind it. If you have only ever had a sickling test, or none at all, the honest answer is that you do not know your genotype yet.",
      ],
    },
  ],
  sources: [
    { label: "Genotype test (AA, AS, SS): what your result means", url: "/blog/genotype-test-aa-as-ss" },
    { label: "Sickle cell trait testing in Ghana", url: "/blog/sickle-cell-trait-testing" },
    { label: "Premarital screening: what a couple is tested for", url: "/blog/premarital-screening" },
  ],
  cta: {
    kind: "test",
    testCode: "HB_ELECTRO",
    slug: "hb-electrophoresis",
    name: "HB Electrophoresis (Sickling Included)",
    // Static fallback only. The card renders the live catalogue price for
    // HB_ELECTRO and falls back to this when the catalogue is unreachable.
    price: "GHS 170",
    label: "Confirm both genotypes",
    body:
      "Haemoglobin electrophoresis is the test that states a genotype outright: AA, AS, SS, SC or another combination. Book it for one of you or for both.",
  },
  secondaryCta: {
    kind: "test",
    testCode: "BLOOD_GROUP",
    slug: "blood-group",
    name: "Blood Grouping",
    // Static fallback only, as above (BLOOD_GROUP).
    price: "GHS 75",
    label: "Doing premarital screening?",
    body:
      "Blood group and Rh factor is the other half of a standard premarital panel. A genotype test and a blood group test are two different results from two different tests, and one cannot substitute for the other.",
  },
};
