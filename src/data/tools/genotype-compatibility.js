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

// ------------------------- The four genotype questions ----------------------
//
// One question per screen, driven by the shared Stepper. The ids are what
// computeGenotype and genotypeAdvice already read, so the square is fed by
// exactly the same four answers it has always been fed by.

export function genotypeFeedback(value, side) {
  if (!value) return "";
  if (value === "unknown") {
    return side === "you"
      ? "Not confirmed yet. Your partner's genotype next."
      : "Not confirmed yet, so there will be no odds to give. We will show you what settles it.";
  }
  if (side === "you") return `${value}: ${GENOTYPE_MEANING[value]} Your partner's next.`;
  return `${value} noted. That is enough to draw the square.`;
}

export const GENOTYPE_STEPS = [
  {
    id: "you",
    kind: "choice",
    layout: "grid",
    text: "What is your genotype?",
    help: "The two-letter code from a haemoglobin electrophoresis or HPLC report.",
    options: GENOTYPE_OPTIONS,
    feedback: (v) => genotypeFeedback(v, "you"),
  },
  {
    id: "partner",
    kind: "choice",
    layout: "grid",
    text: "And your partner's genotype?",
    options: GENOTYPE_OPTIONS,
    feedback: (v) => genotypeFeedback(v, "partner"),
  },
  {
    id: "basis",
    kind: "choice",
    text: "How do you know these genotypes?",
    help: "This does not change the odds. It changes how firmly we suggest confirming them.",
    options: GENOTYPE_BASIS_OPTIONS,
    feedback: (v) =>
      v === "electrophoresis"
        ? "A report that names the letters. The odds will stand as calculated."
        : "Noted. We will say how much weight the odds can carry.",
  },
  {
    id: "familyScd",
    kind: "choice",
    text: "Does anyone in either family have sickle cell disease?",
    options: FAMILY_SCD_OPTIONS,
    feedback: (v) =>
      v === "yes"
        ? "Noted. A known case in the family makes a confirmed result for both of you more useful."
        : "Noted. A carrier usually has no symptoms, which is why the test exists.",
  },
];

export default {
  slug: "genotype-compatibility",
  // MESSAGE MATCH. The paid creatives read "Genotype Compatibility Calculator"
  // and "Genotype compatibility, free", so the ad's promise is the H1, near
  // verbatim. The tool now covers four more traits; that breadth is the
  // subtitle under the H1 rather than a replacement for it. `seoTitle` keeps
  // the <title> tag carrying both phrases.
  title: "Genotype Compatibility Calculator",
  subtitle: "Now also blood group, Rh factor and G6PD.",
  seoTitle: "Genotype Compatibility Calculator | Family Inheritance | BetterHealth Africa",
  shortTitle: "Inheritance Calculator",
  eyebrow: "Free instant calculator",
  promise:
    "Genotype compatibility first, worked out as a plain Punnett square. Then blood group, Rh factor and G6PD, each on the rule that governs it, and a straight answer about the traits no test can predict. Share the result as a card.",
  description:
    "Genotype compatibility odds plus blood group, Rh factor and G6PD for your future children. Free instant inheritance calculator from BetterHealth Africa.",
  format: "Pick your traits, a few taps each, instant result",
  bullets: [
    "Genotype compatibility first, on the same Punnett square as always",
    "Blood group, Rh factor and G6PD, each on its own published rule",
    "Which outcomes are ruled out, and where an exact figure does not exist",
    "A result card you can share on WhatsApp",
  ],
  intro:
    "Genotype compatibility comes first, on the same Punnett square a genetic counsellor draws on paper. Add blood group, Rh factor or G6PD and each gets the rule that governs it. Where two answers cannot settle a figure, we say so rather than inventing one.",
  sections: [
    {
      heading: "Genotype compatibility, and what else follows a rule",
      paragraphs: [
        "Everyone inherits one haemoglobin gene from their mother and one from their father. A genotype test reports the pair you ended up with as a two-letter code: AA, AS, SS, AC, SC or CC.",
        "Put two confirmed genotypes together and the arithmetic is fixed. Each parent passes one of their two genes with equal chance, which gives four equally likely combinations. The calculator counts those four and turns them into percentages.",
        "Three other results work the same way, on their own rules: the ABO blood group, the Rh factor, and G6PD. Each is a single gene with a published pattern, so each can be counted rather than guessed at.",
      ],
      callout:
        "Genotype compatibility describes the chance a couple's future children could inherit sickle cell disease, calculated from both partners' confirmed genotypes. It is a statement about probability, not a verdict on whether two people should be together.",
    },
    {
      heading: "Where the numbers come from, and where they stop",
      paragraphs: [
        "Nothing here is estimated. Counting the ways two parents can combine is not modelling, so the same two answers always give the same result.",
        "Some pairings have no exact answer, and the tool says which. A blood group report gives you a letter, not the pair of genes behind it, so knowing you are group A does not tell you whether a hidden O is riding along. Where that hidden gene decides the split, we report which groups are possible and which are ruled out. Where a share holds whichever gene is hidden, as it does for group A with group AB, we give that share as the exact figure it is.",
        "The calculator cannot check any of your results. It works from what you tap in, so a result is only as good as the test behind it. If you have only ever had a sickling test, or none at all, the honest answer is that you do not know your genotype yet.",
      ],
    },
    {
      heading: "What it will not tell you",
      paragraphs: [
        "Eye colour is the question couples ask most, and the one with no answer. It is set by many genes rather than the single brown-beats-blue gene taught in school: the largest study of it found 124 separate associations. The variant that drives blue against brown is absent from African populations, so it explains nothing about the variation Ghanaians see in each other's eyes, and no genetic basis has been established for a brown against black distinction.",
        "Diabetes, high blood pressure and heart disease run in families without following a square either. They are polygenic and lifestyle-driven, so family history is a measured risk factor rather than a per-child percentage. The diabetes risk score on this site scores it directly.",
      ],
    },
  ],
  // The result screen cites studies by short name; these are the full entries.
  // Every inheritance rule and every figure in src/data/tools/inheritance.js
  // traces to one of them. Ordered by the section that uses it.
  sources: [
    { label: "Genotype test (AA, AS, SS): what your result means", url: "/blog/genotype-test-aa-as-ss" },
    { label: "Sickle cell trait testing in Ghana", url: "/blog/sickle-cell-trait-testing" },
    { label: "Premarital screening: what a couple is tested for", url: "/blog/premarital-screening" },
    { label: "Blood group and Rhesus factor: what your blood type means", url: "/blog/blood-group-test" },
    { label: "G6PD deficiency: why this test matters before some medications", url: "/blog/g6pd-deficiency-test" },
    {
      label:
        "Dean L. Blood Groups and Red Cell Antigens: the ABO blood group. NCBI Bookshelf, 2005 (ABO alleles, codominance, the H antigen and Bombay)",
      url: "https://www.ncbi.nlm.nih.gov/books/NBK2267/",
    },
    {
      label:
        "Romanos-Sirakis EC, Desai D. ABO Blood Group System. StatPearls, 2025 (why the O allele makes no antigen; weak A subgroups)",
      url: "https://www.ncbi.nlm.nih.gov/books/NBK580518/",
    },
    {
      label:
        "Nkansah C, Osei-Boakye F, Appiah SK, et al. Phenotypic and Allelic Frequencies of ABO and Rh(D) Blood Antigens in Ghana: A Systematic Review. Immunity, Inflammation and Disease 2024;12(12):e70112 (29 studies, 134,227 people: O 54.72%, B 21.74%, A 19.65%, AB 3.89%, RhD negative 7.72%)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11669777/",
    },
    {
      label:
        "Das SS, Zaman RU, Safi M, et al. Investigating weak A subgroups in a healthy lady. Asian Journal of Transfusion Science 2014;8(1):62-63 (weak A mistyped as group O)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3943153/",
    },
    {
      label:
        "Dean L. Blood Groups and Red Cell Antigens: the Rh blood group. NCBI Bookshelf, 2005 (RHD deletion, pseudogene and hybrid gene in African populations)",
      url: "https://www.ncbi.nlm.nih.gov/books/NBK2269/",
    },
    {
      label:
        "Dean L. Blood Groups and Red Cell Antigens: hemolytic disease of the newborn. NCBI Bookshelf, 2005 (sensitisation at delivery; IgM then IgG anti-D)",
      url: "https://www.ncbi.nlm.nih.gov/books/NBK2266/",
    },
    {
      label:
        "Qureshi H, Massey E, Kirwan D, et al. BCSH guideline for the use of anti-D immunoglobulin for the prevention of haemolytic disease of the fetus and newborn. Transfusion Medicine 2014;24(1):8-20 (16%, about 2%, and 0.17 to 0.28%; the anti-D schedule). RCOG Green-top Guideline No. 22 is archived and RCOG now points here.",
      url: "https://onlinelibrary.wiley.com/doi/10.1111/tme.12091",
    },
    {
      label:
        "Mak GK, Shah M. Glucose-6-Phosphate Dehydrogenase Deficiency. StatPearls (X-linked inheritance, named drug triggers, the limits of the fluorescent spot test in women)",
      url: "https://www.ncbi.nlm.nih.gov/books/NBK470315/",
    },
    {
      label:
        "Errigo A, Bitti A, Galistu F, et al. Relationship between G6PD Deficiency, X-Chromosome Inactivation and Inflammatory Markers. Antioxidants 2023;12(2):334 (why a carrier's enzyme activity runs on a continuum)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9952105/",
    },
    {
      label:
        "Amoah LE, Asare KK, Dickson D, et al. Genotypic G6PD deficiency protects against Plasmodium falciparum infection in individuals living in Ghana. PLOS ONE 2021;16(9):e0257562 (20.06%, 1,225 of 6,108 across all ten regions: a genotype prevalence counting carriers)",
      url: "https://doi.org/10.1371/journal.pone.0257562",
    },
    {
      label:
        "Suzuki K, Hatzikotoulas K, Southam L, et al. Genetic drivers of heterogeneity in type 2 diabetes pathophysiology. Nature 2024 (2,535,601 individuals; 1,289 signals across 611 loci)",
      url: "https://doi.org/10.1038/s41586-024-07019-6",
    },
    {
      label:
        "Keaton JM, Kamali Z, Xie T, et al. Genome-wide analysis in over 1 million individuals of European ancestry yields improved polygenic risk scores for blood pressure traits. Nature Genetics 2024;56(5):778-791 (2,103 independent signals)",
      url: "https://doi.org/10.1038/s41588-024-01714-w",
    },
    {
      label:
        "Meigs JB, Cupples LA, Wilson PW. Parental transmission of type 2 diabetes: the Framingham Offspring Study. Diabetes 2000;49(12):2201-2207 (one parent OR 3.4 to 3.5, both parents OR 6.1)",
      url: "https://doi.org/10.2337/diabetes.49.12.2201",
    },
    {
      label:
        "Naylor R, Johnson AK, del Gaudio D. Maturity-Onset Diabetes of the Young Overview. GeneReviews, 2018 (monogenic, autosomal dominant, 50% per child, at least 1% to 3% of all diabetes, onset typically under 35 years)",
      url: "https://www.ncbi.nlm.nih.gov/books/NBK500456/",
    },
    {
      label:
        "Simcoe M, Valdes A, Liu F, et al. Genome-wide association study in almost 195,000 individuals identifies 50 previously unidentified genetic loci for eye color. Science Advances 2021;7(11):eabd1239 (124 associations across 61 regions)",
      url: "https://doi.org/10.1126/sciadv.abd1239",
    },
    {
      label:
        "Beleza S, Johnson NA, Candille SI, et al. Genetic architecture of skin and eye color in an African-European admixed population. PLOS Genetics 2013;9(3):e1003372 (HERC2/OCA2 shifts brown intensity too, and the derived allele is absent from African populations)",
      url: "https://doi.org/10.1371/journal.pgen.1003372",
    },
    {
      label:
        "Yengo L, Vedantam S, Marouli E, et al. A saturated map of common genetic variants associated with human height. Nature 2022;610(7933):704-712 (12,111 variants; 40% of variance in Europeans, 10 to 20% elsewhere)",
      url: "https://doi.org/10.1038/s41586-022-05275-y",
    },
    {
      label:
        "Crawford NG, Kelly DE, Hansen MEB, et al. Loci associated with skin pigmentation identified in African populations. Science 2017;358(6365):eaan8433",
      url: "https://doi.org/10.1126/science.aan8433",
    },
    {
      label:
        "Shaffer JR, Li J, Lee MK, et al. Multiethnic GWAS Reveals Polygenic Architecture of Earlobe Attachment. American Journal of Human Genetics 2017;101(6):913-924 (49 loci in 74,660 people, and no African cohort)",
      url: "https://doi.org/10.1016/j.ajhg.2017.10.001",
    },
    {
      label:
        "Martin NG. No evidence for a genetic basis of tongue rolling or hand clasping. Journal of Heredity 1975;66(3):179-180",
      url: "https://doi.org/10.1093/oxfordjournals.jhered.a108608",
    },
    {
      label:
        "McDonald JH. Myths of Human Genetics. University of Delaware, 2011. An educational compilation rather than a peer-reviewed paper, used here for the primary studies it names: Matlock 1952 on twin discordance, Harris and Joseph 1949 and Beckman et al. 1960 on thumbs and chins, and the absence of any published evidence on dimples and widow's peak.",
      url: "https://udel.edu/~mcdonald/mythintro.html",
    },
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
