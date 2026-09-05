// The traits the family inheritance calculator works out, beyond genotype.
//
// Pure data + maths. No JSX and no browser globals, because src/data/seo.js
// imports the tool registry on the Node side at build time (same rule as
// src/data/tools/genotype-compatibility.js).
//
// SCOPE, AND WHY IT IS THIS SHORT. Only traits that follow a single published
// inheritance rule are here: ABO blood group, the Rh(D) factor, G6PD, and the
// sex of the child. Eye colour, height, skin tone and the school-taught
// "simple" traits are NOT here, and CANNOT_PREDICT below says why.
//
// FOUR CLAIM TYPES, KEPT APART. The evidence brief this file was written from
// separates them and so does the code:
//   impossible     excluded under every parental genotype consistent with the
//                  stated phenotypes. `impossible` on each outcome object.
//   possible       happens under at least one consistent genotype, at a share
//                  that depends on genes the couple has not measured.
//   probability p  exact from the phenotypes alone, no hidden variable.
//                  `certain` (and `percentages` when it covers everything).
//   expected       a population average from Ghanaian allele frequencies. It
//                  describes many couples, never this couple. `expected`.
// Mixing the third and the fourth is the error that would make this tool wrong,
// so they are separate fields, separately labelled in the UI.
//
// SOURCES. Every rule and every figure below carries the study it came from,
// named inline in the prose in short form and listed in full on the page's own
// Sources block (see `sources` in genotype-compatibility.js). Code comments
// name the reference for rules that carry no visible figure.

// --------------------------------------------------------------------------
// The traits, in the order they are asked and shown.
// --------------------------------------------------------------------------

export const TRAITS = [
  {
    id: "genotype",
    label: "Sickle cell genotype",
    short: "Genotype",
    hint: "AA, AS, SS, AC, SC or CC",
    questions: 4,
  },
  {
    id: "abo",
    label: "Blood group",
    short: "Blood group",
    hint: "A, B, AB or O",
    questions: 2,
  },
  {
    id: "rh",
    label: "Rh factor",
    short: "Rh factor",
    hint: "The plus or minus after the letter",
    questions: 2,
  },
  {
    id: "g6pd",
    label: "G6PD",
    short: "G6PD",
    hint: "The enzyme that matters before some malaria drugs",
    questions: 2,
  },
  {
    id: "sex",
    label: "Boy or girl",
    short: "Boy or girl",
    hint: "Always 50/50, and it is where the G6PD maths starts",
    questions: 0,
  },
];

export const TRAIT_IDS = TRAITS.map((t) => t.id);

/** The selected traits, always in TRAITS order, with genotype guaranteed present. */
export function selectedTraits(values = {}) {
  const picked = Array.isArray(values.traits) ? values.traits : [];
  const kept = TRAIT_IDS.filter((id) => picked.includes(id));
  return kept.length > 0 ? kept : ["genotype"];
}

export const hasTrait = (values, id) => selectedTraits(values).includes(id);

/** Rh and G6PD both read differently for a mother and a father, so they ask. */
export const NEEDS_MOTHER = ["rh", "g6pd"];
export const needsMother = (values) => NEEDS_MOTHER.some((id) => hasTrait(values, id));

export const MOTHER_OPTIONS = [
  { value: "you", label: "I would be the mother" },
  { value: "partner", label: "My partner would be" },
];

/** { mother, father } as "you" / "partner", defaulting to you as the mother. */
export function roles(values = {}) {
  const motherIsYou = values.motherIs !== "partner";
  return { mother: motherIsYou ? "you" : "partner", father: motherIsYou ? "partner" : "you" };
}

// --------------------------------------------------------------------------
// Ghanaian population frequencies, used ONLY for the expected-probability
// layer. Nothing in the possible / impossible / exact answers touches them.
//
// Nkansah C, Osei-Boakye F, Appiah SK, et al. Phenotypic and Allelic
// Frequencies of ABO and Rh(D) Blood Antigens in Ghana: A Systematic Review.
// Immunity, Inflammation and Disease 2024;12(12):e70112. 29 studies published
// 2000 to 2024, pooling 134,227 individuals.
//
// APPROXIMATE, AND THE REVIEW'S OWN NUMBERS SAY SO. The published allele
// frequencies do not exactly regenerate the published phenotype frequencies
// under Hardy-Weinberg: r^2 and p^2 + 2pr reproduce O and A exactly, but
// q^2 + 2qr = 0.2225 against a published B of 21.74%, and 2pq = 0.0338 against
// a published AB of 3.89%. Everything derived from them is labelled as
// approximate in the copy, and never as a figure about one couple.
// --------------------------------------------------------------------------

export const GHANA_ABO = {
  source: "Nkansah et al. 2024",
  n: 134227,
  phenotype: { O: 54.72, B: 21.74, A: 19.65, AB: 3.89 },
  allele: { A: 0.1227, B: 0.1376, O: 0.7397 },
};

export const GHANA_RH = {
  source: "Nkansah et al. 2024",
  n: 134227,
  positive: 92.28,
  negative: 7.72,
  allele: { D: 0.7222, d: 0.2778 },
};

/**
 * The share of Ghanaian group A (or group B) people carrying a hidden O,
 * under Hardy-Weinberg with the frequencies above: 2r / (p + 2r).
 * Group A 92.3%, group B 91.5%.
 */
export function aboHiddenOShare(group) {
  const { A: p, B: q, O: r } = GHANA_ABO.allele;
  if (group === "A") return ((2 * r) / (p + 2 * r)) * 100;
  if (group === "B") return ((2 * r) / (q + 2 * r)) * 100;
  return 0;
}

/** The share of Rh positive Ghanaians who are Dd and carry a hidden d: 43.5%. */
export function rhHiddenDShare() {
  const { D, d } = GHANA_RH.allele;
  return ((2 * d) / (D + 2 * d)) * 100;
}

export const EXPECTED_LABEL = "Typical across Ghanaian couples";

export const EXPECTED_CAVEAT =
  "This is what happens across many Ghanaian couples with your two results, worked out from pooled national frequencies (Nkansah et al., 134,227 people). It is not your figure. Your own answer is decided by genes neither report shows, and it is one of a small number of exact splits rather than this average. The review's own allele figures do not perfectly regenerate its phenotype figures, so read these as approximate.";

// --------------------------------------------------------------------------
// ABO blood group.
//
// Three common alleles at one locus on chromosome 9. A and B are co-dominant
// and O is recessive, because the O allele encodes no working
// glycosyltransferase and so builds no antigen.
//   Dean L. Blood Groups and Red Cell Antigens, ABO chapter (NCBI NBK2267)
//   Romanos-Sirakis EC, Desai D. ABO Blood Group System. StatPearls 2025.
//
// Group O and group AB each have exactly one possible genotype, so what they
// pass on is fixed. Group A and group B each have two, and routine serological
// typing reports the phenotype only: it cannot tell AA from AO. That asymmetry
// is the whole reason most pairings have no exact per-child figure.
// --------------------------------------------------------------------------

export const ABO_GROUPS = ["A", "B", "AB", "O"];

export const ABO_OPTIONS = [
  { value: "A", label: "A", hint: "A antigen only" },
  { value: "B", label: "B", hint: "B antigen only" },
  { value: "AB", label: "AB", hint: "Both antigens" },
  { value: "O", label: "O", hint: "Neither antigen" },
  { value: "unknown", label: "I don't know yet", hint: "Never had a blood group test" },
];

// Phenotype -> the genotypes that produce it. A and B each hide an O.
const ABO_GENOTYPES = {
  A: ["AA", "AO"],
  B: ["BB", "BO"],
  AB: ["AB"],
  O: ["OO"],
};

// The two phenotypes whose genotype is settled by the phenotype alone.
export const ABO_DETERMINED = ["AB", "O"];

/** Group letter for a two-allele genotype: "AO" -> "A", "OO" -> "O". */
export function aboPhenotype(genotype) {
  const a = genotype[0];
  const b = genotype[1];
  if (a === "O" && b === "O") return "O";
  if (a === b) return a;
  if (a === "O") return b;
  if (b === "O") return a;
  return "AB";
}

/**
 * Which child blood groups this pairing can and cannot produce, and which
 * shares are exact.
 *
 * The square is drawn once per consistent pair of parental genotypes. A group
 * is IMPOSSIBLE when it appears in none of them, and its share is CERTAIN when
 * it is identical in all of them. That derivation reproduces the published
 * table of the ten unordered pairings, including the two rows a developer gets
 * wrong by default:
 *
 *   A x AB  P(group A) = 50% whichever allele the A parent hides. If the A
 *           parent is AA the children are 1/2 A and 1/2 AB; if AO they are
 *           1/2 A, 1/4 AB, 1/4 B. Only the other half moves.
 *   B x AB  the mirror image, with P(group B) = 50%.
 *
 * Three pairings are fully exact (O x O, O x AB, AB x AB), two are half exact
 * (A x AB, B x AB), and the remaining five turn entirely on hidden alleles.
 *
 * @param {string} one    "A" | "B" | "AB" | "O"
 * @param {string} other  same
 * @returns {{
 *   determinable: boolean,
 *   certain: Array<{ group: string, percent: number }>,
 *   certainTotal: number,
 *   undecided: string[],
 *   possible: string[],
 *   impossible: string[],
 *   percentages: Array<{ group: string, percent: number }> | null,
 *   expected: Array<{ group: string, percent: number }>,
 *   hiddenIn: string[],
 * }}
 */
export function aboOutcomes(one, other) {
  // One distribution per consistent pair of parental genotypes.
  const combos = [];
  for (const g1 of ABO_GENOTYPES[one]) {
    for (const g2 of ABO_GENOTYPES[other]) {
      const counts = {};
      for (const a of g1) {
        for (const b of g2) {
          const group = aboPhenotype(a + b);
          counts[group] = (counts[group] || 0) + 1;
        }
      }
      combos.push(Object.fromEntries(ABO_GROUPS.map((g) => [g, ((counts[g] || 0) / 4) * 100])));
    }
  }

  const possible = ABO_GROUPS.filter((g) => combos.some((c) => c[g] > 0));
  const impossible = ABO_GROUPS.filter((g) => combos.every((c) => c[g] === 0));
  const certain = ABO_GROUPS.filter((g) => combos[0][g] > 0 && combos.every((c) => c[g] === combos[0][g])).map(
    (group) => ({ group, percent: combos[0][group] }),
  );
  const certainTotal = certain.reduce((sum, r) => sum + r.percent, 0);
  const determinable = certainTotal === 100;

  return {
    determinable,
    certain,
    certainTotal,
    undecided: possible.filter((g) => !certain.some((c) => c.group === g)),
    possible,
    impossible,
    // Kept for the callers that only ever want a full exact split.
    percentages: determinable ? certain.map((r) => ({ ...r })) : null,
    expected: aboExpected(one, other),
    hiddenIn: [...new Set([one, other].filter((g) => !ABO_DETERMINED.includes(g)))],
  };
}

/** Each parental genotype with the weight Ghanaian frequencies give it. */
function aboGenotypeWeights(group) {
  const hidden = aboHiddenOShare(group) / 100;
  if (group === "A") return [["AA", 1 - hidden], ["AO", hidden]];
  if (group === "B") return [["BB", 1 - hidden], ["BO", hidden]];
  return [[ABO_GENOTYPES[group][0], 1]];
}

/**
 * The expected child distribution across Ghanaian couples with this pairing.
 *
 * A POPULATION AVERAGE, NOT A PROBABILITY FOR ONE COUPLE. For a given A x A
 * couple the chance of a group O child is 25% (both AO) or 0% (either AA). It
 * is never the 21.3% this returns, which is the mean over all such couples.
 * The zeroes come from the impossibility rules and are real; every other figure
 * carries EXPECTED_CAVEAT.
 */
export function aboExpected(one, other) {
  const totals = Object.fromEntries(ABO_GROUPS.map((g) => [g, 0]));
  for (const [g1, w1] of aboGenotypeWeights(one)) {
    for (const [g2, w2] of aboGenotypeWeights(other)) {
      for (const a of g1) {
        for (const b of g2) {
          totals[aboPhenotype(a + b)] += (w1 * w2) / 4;
        }
      }
    }
  }
  return ABO_GROUPS.filter((g) => totals[g] > 0).map((group) => ({ group, percent: totals[group] * 100 }));
}

export const ABO_HIDDEN_ALLELE_NOTE =
  "A blood group test reports the letter, not the pair of genes behind it. Group A can be carrying a second A or a hidden O, and the same goes for group B, so for most pairings the exact split depends on a gene neither report shows. The letters do settle which groups are off the table, and that part is exact.";

export const ABO_ONLY_TWO_SETTLE_NOTE =
  "Only AB and O say what the pair of genes is outright: AB carries one A and one B, and O carries two O genes. A fully exact split needs both partners to be one of those two.";

// The A x AB and B x AB rows. Half the answer is exact and half is not, and
// saying which half is the useful part.
export const ABO_HALF_CERTAIN_NOTE =
  "Half of this answer is exact and half is not, and the exact half does not depend on the hidden gene. If the group A partner is carrying a second A, the children are half group A and half group AB. If a hidden O is riding along instead, they are half group A, a quarter AB and a quarter B. Group A comes out at 50% either way, and only the other 50% moves.";

// Row 6 of the published table, and the most useful thing this section can tell
// a couple: nothing is ruled out, and a child can match neither parent.
export const ABO_ANY_GROUP_NOTE =
  "A group A parent and a group B parent are the one pairing that rules nothing out. Each of you can pass on a hidden O as easily as your own letter, so a child can be A, B, AB or O, including a group the two of you do not have between you. A child whose blood group matches neither parent is what these two letters are expected to produce.";

// Said once, on the ABO section, and not repeated. Bombay, weak subgroups and
// cis-AB are individually rare and collectively the reason a table like this
// settles nothing about anybody's family.
//   Dean L, NCBI NBK2267 (H antigen, h/h)
//   Das SS et al. Asian J Transfus Sci 2014;8(1):62-63 (weak A mistyped as O)
//   Erhabor O et al. 2015: no Bombay cases among group O donors in Sokoto,
//   Nigeria. Direction only; the denominator could not be verified.
export const ABO_EXCEPTIONS_NOTE =
  "A few rare laboratory situations break the rules above, and they are worth stating once. The Bombay phenotype types as group O on a routine grouping while still carrying and passing on a working A or B gene. Weak A subgroups are often mistyped as group O for reasons of reagent sensitivity rather than rare genetics, which makes them the likeliest of these to turn up in practice. A cis-AB chromosome carries both antigens at once and breaks the AB rules in both directions. Ghanaian figures for any of them are thin, and a Nigerian donor study found no Bombay cases. Each is rare on its own, and together they are why an inheritance table can never settle a question about parentage, and why a laboratory can resolve what a blood group card cannot.";

// --------------------------------------------------------------------------
// Rh(D) factor.
//
// The D antigen appears whenever at least one working RHD allele is present,
// so Rh positive covers DD and Dd, and Rh negative is dd only. Rh negative is
// the one Rh phenotype that settles its own genes.
//   Rosenkrans D, Zubair M, Doyal A. Rh Blood Group System. StatPearls 2023.
//   Dean L. Blood Groups and Red Cell Antigens, Rh chapter (NCBI NBK2269)
//
// In people of African ancestry D negative is often not the clean RHD deletion
// seen in Europeans: an RHD pseudogene carrying a premature stop codon, and an
// RHD/RHCE hybrid gene, both produce no D antigen by other routes. The
// phenotype table below still holds. Molecular typing is harder, which is a
// reason to defer to a laboratory rather than a reason to change the table.
//   Dean L, NCBI NBK2269; StatPearls 2023.
// --------------------------------------------------------------------------

export const RH_OPTIONS = [
  { value: "pos", label: "Rh positive", hint: "The plus in O+ or A+" },
  { value: "neg", label: "Rh negative", hint: "The minus in O- or B-" },
  { value: "unknown", label: "I don't know yet", hint: "Never had a blood group test" },
];

export const RH_LABEL = { pos: "Rh positive", neg: "Rh negative" };

const RH_GENOTYPES = { pos: ["DD", "Dd"], neg: ["dd"] };

/**
 * Which Rh results this pairing can produce.
 *
 * Same derivation as ABO: certain where every consistent parental genotype
 * agrees. Only Rh negative with Rh negative is exact, at 100% Rh negative.
 * Two Rh positive parents can have an Rh negative child, which needs both of
 * them to be Dd.
 */
export function rhOutcomes(one, other) {
  const values = ["pos", "neg"];
  const combos = [];
  for (const g1 of RH_GENOTYPES[one]) {
    for (const g2 of RH_GENOTYPES[other]) {
      const counts = { pos: 0, neg: 0 };
      for (const a of g1) {
        for (const b of g2) counts[a === "d" && b === "d" ? "neg" : "pos"] += 1;
      }
      combos.push({ pos: (counts.pos / 4) * 100, neg: (counts.neg / 4) * 100 });
    }
  }

  const possible = values.filter((v) => combos.some((c) => c[v] > 0));
  const certain = values.filter((v) => combos[0][v] > 0 && combos.every((c) => c[v] === combos[0][v])).map((value) => ({
    value,
    percent: combos[0][value],
  }));
  const determinable = certain.reduce((sum, r) => sum + r.percent, 0) === 100;

  return {
    determinable,
    certain,
    possible,
    impossible: values.filter((v) => combos.every((c) => c[v] === 0)),
    percentages: determinable ? certain.map((r) => ({ ...r })) : null,
    expected: rhExpected(one, other),
  };
}

/**
 * The expected Rh split across Ghanaian couples with this pairing.
 * 43.5% of Rh positive Ghanaians carry a hidden d, so two Rh positive Ghanaian
 * parents have an expected 4.7% chance of an Rh negative child. A population
 * average, on the same terms as aboExpected.
 */
export function rhExpected(one, other) {
  const het = rhHiddenDShare() / 100;
  const weights = (value) => (value === "neg" ? [["dd", 1]] : [["DD", 1 - het], ["Dd", het]]);
  const totals = { pos: 0, neg: 0 };
  for (const [g1, w1] of weights(one)) {
    for (const [g2, w2] of weights(other)) {
      for (const a of g1) {
        for (const b of g2) {
          totals[a === "d" && b === "d" ? "neg" : "pos"] += (w1 * w2) / 4;
        }
      }
    }
  }
  return ["pos", "neg"].filter((v) => totals[v] > 0).map((value) => ({ value, percent: totals[value] * 100 }));
}

/**
 * The part of an Rh result that changes what antenatal care does.
 *
 * DIRECTIONAL, AND THE DIRECTION IS THE POINT. The risk needs an Rh negative
 * MOTHER carrying an Rh positive baby. An Rh negative father creates none, so
 * "this couple is Rh incompatible" is not a thing this file will ever say.
 *   Dean L. Hemolytic disease of the newborn (NCBI NBK2266)
 */
export function rhPregnancyFlag(motherRh, fatherRh) {
  if (motherRh !== "neg") return null;
  if (fatherRh === "neg") return "cleared";
  if (fatherRh === "pos") return "plan";
  return "unknown";
}

// Prevalence and the anti-D numbers, both quoted rather than modelled.
//   Nkansah et al. 2024: Rh(D) negative 7.72% of 134,227 Ghanaians.
//   Qureshi H et al. BCSH guideline for the use of anti-D immunoglobulin.
//   Transfusion Medicine 2014;24(1):8-20. RCOG Green-top 22 is archived and
//   RCOG now points to BCSH, so BCSH is what this cites.
export const RH_GHANA_NOTE =
  "Rh negative is about half as common in Ghana as in European populations, and still not rare: 7.72% of 134,227 Ghanaians in a pooled national review (Nkansah et al.). In a country this size that is a large number of women.";

export const RH_ANTI_D_NOTE =
  "Sensitisation usually happens at delivery, and the first antibody a mother makes is the type that cannot cross the placenta, which is why it is typically a second Rh positive baby that is affected rather than a first. Anti-D immunoglobulin interrupts that. Before it existed, roughly 16% of Rh negative women were sensitised after two deliveries of Rh positive babies. Routine anti-D after delivery brought that to about 2%, and adding routine antenatal prophylaxis in the third trimester brought it to between 0.17% and 0.28% (BCSH guideline).";

export const RH_ANTI_D_SCHEDULE_NOTE =
  "The schedule belongs to an antenatal team, not to a web page. In outline, BCSH recommends routine antenatal anti-D at around 28 weeks, or at 28 and 34 weeks; at least 500 IU within 72 hours of delivering an Rh positive baby; and a dose as soon as possible and always within 72 hours after any potentially sensitising event. Knowing you are Rh negative before you are pregnant is the part that is yours to do.";

// --------------------------------------------------------------------------
// G6PD. X-linked, which is the whole reason it splits by the sex of the child.
//
// A son takes his single X from his mother and his Y from his father, so a
// father's G6PD status cannot reach a son at all. A daughter takes one X from
// each, so one affected copy makes her a carrier.
//   Mak GK, Shah M. Glucose-6-Phosphate Dehydrogenase Deficiency. StatPearls.
//
// The reported RESULT is not the same thing as the pair of genes. A man has one
// X, so his result reads straight through. A woman is a mosaic, because one X
// is silenced at random in each cell, and enzyme activity in a heterozygote
// "follows a continuum, from total deficiency up to full activity". The
// fluorescent spot test may miss heterozygous females; a quantitative assay is
// what StatPearls recommends where precision matters, "eg, in females".
//   Errigo A et al. Antioxidants 2023;12(2):334 (X-inactivation)
//   Mak GK, Shah M, StatPearls (spot test limits)
// --------------------------------------------------------------------------

export const G6PD_MOTHER_OPTIONS = [
  { value: "normal", label: "Normal", hint: "Enzyme activity in the expected range" },
  { value: "carrier", label: "Intermediate", hint: "Between normal and clearly deficient" },
  { value: "deficient", label: "Deficient", hint: "Clearly below normal" },
  { value: "unknown", label: "I don't know yet", hint: "Never tested for G6PD" },
];

export const G6PD_FATHER_OPTIONS = [
  { value: "normal", label: "Normal", hint: "Enzyme activity in the expected range" },
  { value: "deficient", label: "Deficient", hint: "Clearly below normal" },
  { value: "unknown", label: "I don't know yet", hint: "Never tested for G6PD" },
];

// Mother's reported result -> the X pair it is read as. Only "carrier" is
// unambiguous; the other two carry the caveat in G6PD_READING below.
const MOTHER_X = { normal: ["N", "N"], carrier: ["N", "d"], deficient: ["d", "d"] };
const FATHER_X = { normal: "N", deficient: "d" };

export const G6PD_STATUS = {
  normal: "Normal",
  carrier: "A carrier, with one affected copy",
  deficient: "Deficient",
};

/**
 * The G6PD table, split by the sex of the child, because it has to be.
 *
 * Exact given the parents' genotypes, unlike ABO. Establishing the mother's
 * genotype is the hard part, which G6PD_READING handles.
 *
 * @param {string} mother  "normal" | "carrier" | "deficient"
 * @param {string} father  "normal" | "deficient"
 * @returns {{
 *   sons: Array<{ status: string, percent: number }>,
 *   daughters: Array<{ status: string, percent: number }>,
 *   fatherReachesSons: false,
 * }}
 *   Percentages are within that sex, not across all children, because that is
 *   how the answer is useful: it answers "if we have a son" and "if we have a
 *   daughter" separately.
 */
export function g6pdOutcomes(mother, father) {
  const mx = MOTHER_X[mother];
  const fx = FATHER_X[father];

  // Sons: one X from the mother, a Y from the father. The father cannot reach them.
  const sonCounts = {};
  for (const x of mx) {
    const status = x === "d" ? "deficient" : "normal";
    sonCounts[status] = (sonCounts[status] || 0) + 1;
  }

  // Daughters: one X from each parent. Two affected copies is deficient, one is a carrier.
  const daughterCounts = {};
  for (const x of mx) {
    const status = x === "d" && fx === "d" ? "deficient" : x === "d" || fx === "d" ? "carrier" : "normal";
    daughterCounts[status] = (daughterCounts[status] || 0) + 1;
  }

  const rows = (counts, total) =>
    ["normal", "carrier", "deficient"]
      .filter((s) => counts[s])
      .map((status) => ({ status, percent: (counts[status] / total) * 100 }));

  return {
    sons: rows(sonCounts, mx.length),
    daughters: rows(daughterCounts, mx.length),
    fatherReachesSons: false,
  };
}

export const G6PD_SONS_NOTE =
  "A son takes his single X from his mother and his Y from his father, so a father's G6PD status cannot reach a son. Whatever a father's result says, the mother's copies decide this half of the table.";

export const G6PD_DAUGHTERS_NOTE =
  "A daughter takes one X from each parent, so a deficient father makes every one of his daughters at least a carrier. One affected copy is enough to matter, and an intermediate result is worth asking a clinician about rather than filing away.";

// A woman's reported result does not settle her pair of copies, so these two
// readings are flagged rather than treated as exact.
//   Errigo A et al. Antioxidants 2023;12(2):334; Mak GK, Shah M, StatPearls.
export const G6PD_READING = {
  normal:
    "A normal result in a woman does not rule out carrying one affected copy. One X chromosome is switched off at random in each cell, so a carrier's red cells are a mixture and her overall activity can read anywhere from clearly deficient to fully normal (Errigo et al.). The commonly used fluorescent spot test may miss heterozygous women, which is why a quantitative assay is the one recommended for women. The table below reads her as having two normal copies, which is the likeliest reading of a normal result rather than a certainty.",
  deficient:
    "A clearly deficient result in a woman is usually two affected copies, though a carrier whose cells happen to be weighted towards the affected copy can also read deficient. The table below reads her as having two affected copies.",
  carrier: null,
};

// Amoah LE, Asare KK, Dickson D, et al. PLOS ONE 2021;16(9):e0257562.
// 6,108 community subjects across all ten regions of Ghana, genotyped for
// A376G and G202A rather than screened with a spot test.
//
// A GENOTYPE PREVALENCE, WHICH IS NOT A DEFICIENCY RATE. The 20.06% counts
// hemizygous deficient males, homozygous deficient females and heterozygous
// carrier females in one number. The copy says "carries a variant" and must
// never be shortened to "one in five Ghanaians is G6PD deficient".
export const G6PD_GHANA_NOTE =
  "Roughly one in five Ghanaians carries a G6PD A-minus variant: 20.06%, or 1,225 of 6,108 people genotyped across all ten regions (Amoah et al. 2021). Read that as carriers rather than cases. It counts deficient men, deficient women and carrier women together in a single figure, so it is not the same as saying one in five Ghanaians is G6PD deficient.";

// Named triggers, from StatPearls. Primaquine and tafenoquine are antimalarials
// and Ghana is malaria-endemic, which is the case for testing without any
// appeal to fear.
export const G6PD_TRIGGERS_NOTE =
  "Infections, fava beans and a named list of medicines set off the haemolysis. The high-risk ones include dapsone, methylene blue, phenazopyridine, primaquine, rasburicase and tafenoquine; nitrofurantoin sits at medium risk (StatPearls). Primaquine and tafenoquine are antimalarials, and Ghana is malaria-endemic, which is what makes this worth knowing here.";

// --------------------------------------------------------------------------
// Sex of the child. Deliberately not presented as a finding.
// --------------------------------------------------------------------------

export const SEX_SPLIT = 50;

export const SEX_LINES = {
  headline: "A boy or a girl, at 50 and 50, every pregnancy.",
  body:
    "A mother's egg always carries an X. A father's sperm carries either an X or a Y, in roughly equal numbers, and whichever arrives first decides it. There is nothing to calculate here and no answer a test could give you before conception.",
  perPregnancy:
    "Like the odds above it, this resets with every pregnancy. Having three girls already does not tilt the fourth.",
  whyItMatters:
    "This is where the G6PD maths starts. G6PD sits on the X chromosome, so the sex of the child changes that answer and no other on this page.",
};

// --------------------------------------------------------------------------
// The two closing sections. Both are content in their own right.
// --------------------------------------------------------------------------

// Loci counts, so "polygenic" is a number rather than an adjective:
//   Suzuki K et al. Nature 2024. 2,535,601 individuals, 428,452 cases:
//     1,289 independent signals mapping to 611 loci for type 2 diabetes.
//   Vujkovic M et al. Nat Genet 2020: common genotyped variation explains 19%
//     of type 2 diabetes liability.
//   Keaton JM et al. Nat Genet 2024: 2,103 independent signals for blood
//     pressure in 1,028,980 individuals.
//   Aragam KG et al. Nat Genet 2022: 241 associations for coronary artery
//     disease in 1,165,690 participants.
//   MedlinePlus Genetics: type 2 diabetes "does not have a clear pattern of
//     inheritance". The ADA is NOT a source for the word polygenic.
//   Meigs JB, Cupples LA, Wilson PW. Diabetes 2000;49(12):2201-2207,
//     Framingham Offspring, 2,527 offspring of 1,303 families: OR 3.4 maternal
//     only, 3.5 paternal only, 6.1 both parents. Population estimates, from a
//     European-ancestry cohort, and never a per-child figure.
//
// MODY: mentioned, never scored. GeneReviews (Naylor R, Johnson AK, del Gaudio
// D, NBK500456) gives monogenic autosomal dominant inheritance, a 50% chance
// per child, "at least 1%-3% of all diabetes", and typical onset under 35 years
// rather than the older convention of under 25. Shields BM et al. Diabetologia
// 2010: it can only be confirmed by molecular genetic testing. There is NO West
// African prevalence data at all (Adadey SM et al. Eur J Med Genet 2023): every
// published figure is from a UK or US cohort, so none is quoted here.
//
// WHY THERE IS NO CHECKLIST. The Exeter MODY probability calculator was built
// in white Europeans and over-calls badly outside them: applied to 2,033
// Hispanic youth it implied 382 expected cases against 18 confirmed (Alarcon et
// al. 2025). Ghana has plenty of young-onset diabetes and plenty of family
// history for reasons that have nothing to do with MODY, so a feature list here
// would flag a large number of readers who have ordinary type 2 diabetes. The
// specific harm is that GCK-MODY needs no medication, so a reader who
// self-diagnosed and eased off treatment for real type 2 diabetes would be
// worse off than if this section had never mentioned it. No study quantifies
// that; it is the reasoning behind the two-sentence limit.
export const RUNS_IN_FAMILIES = {
  heading: "What runs in families but does not work like this",
  intro:
    "Diabetes, high blood pressure and heart disease all cluster in families, and it is reasonable to assume there is a square to draw for them too. There is not. These are polygenic, meaning many genes each nudging the odds a little, in constant argument with what you eat, how much you move, your weight and your age. The largest study of type 2 diabetes to date, in 2.5 million people, found 1,289 independent signals across 611 stretches of the genome (Suzuki et al. 2024). Blood pressure runs to 2,103 signals (Keaton et al. 2024). No single gene is passed down, so there is no percentage to hand a couple, and any calculator that offers one has made it up.",
  handoff:
    "That does not make family history useless. It makes it a risk factor rather than a verdict. In the Framingham Offspring Study, one parent with type 2 diabetes roughly tripled the odds for a child and two parents roughly sextupled them. That is risk accumulating rather than a coin flip on one gene, and it describes thousands of families rather than yours. Published instruments already measure it.",
  // The FINDRISC family-history item, as scored in src/data/tools/diabetes-risk.js.
  scored:
    "The diabetes risk score on this site scores it directly: a parent, brother, sister or child with diabetes is 5 points of a possible 26, and diabetes further out in the family is 3.",
  // Two sentences, no features to tick off, and a route to a clinician.
  mody:
    "Roughly 1% to 3% of diabetes is caused by a single gene and does pass down at a 50% chance per child, and it is routinely mistaken for type 1 or type 2 diabetes. Only a genetic test can confirm it, so it is a question for a doctor rather than for this page.",
  links: [
    { to: "/tools/diabetes-risk", label: "Score your diabetes risk, family history included" },
    { to: "/tools/heart-age", label: "Check your heart age on the WHO chart" },
    { to: "/guides/family-health-map", label: "Map what actually runs in your family" },
  ],
};

// Eye colour, height, skin tone and the school traits.
//
//   Sturm RA, Larsson M. Pigment Cell Melanoma Res 2009: the dominant-brown /
//     recessive-blue model is "too simplistic"; one interval on chromosome 15
//     containing OCA2 explains most of blue versus brown.
//   Simcoe M et al. Sci Adv 2021: 124 independent associations across 61
//     genomic regions in up to 192,986 European participants. No African
//     participants; the darkest category scored is dark brown, not black.
//   Beleza S et al. PLOS Genet 2013, 699 Cape Verdeans: HERC2/OCA2 and SLC24A5
//     account for blue versus brown AND for varying intensities of BROWN eye
//     colour. The same paper: the derived HERC2 (OCA2) allele "is absent from
//     African and East Asian populations". That is the claim that carries here,
//     NOT "these genes say nothing about shades of brown".
//   Wielgus AR, Sarna T. Pigment Cell Res 2005; Wilkerson CL et al. Arch
//     Ophthalmol 1996: iris colour is melanin quantity, not melanocyte count.
//     Present as the current understanding: no study has measured iris
//     pigmentation in an unadmixed African population (Katsara & Nothnagel
//     2019; Edwards et al. 2016 sampled no African group).
//   Yengo L et al. Nature 2022: 12,111 height SNPs across 7,209 segments in 5.4
//     million people, explaining 40% of variance in Europeans and 10-20%
//     elsewhere. Silventoinen K et al. 2003: heritability 0.68 to 0.93, so the
//     range is reported and never rounded to "80%".
//   Crawford NG et al. Science 2017; Martin AR et al. Cell 2017: skin
//     pigmentation is MORE polygenic in Africa than the textbook gene lists
//     imply, and known loci explain only a small fraction of the variance.
//
// THE SCHOOL TRAITS SPLIT INTO TWO GROUPS AND MUST STAY SPLIT.
//   Disproven with data: attached earlobes (Shaffer JR et al. AJHG 2017, 49
//     loci in 74,660 people, and no African cohort), tongue rolling (Martin NG,
//     J Hered 1975, "No evidence for a genetic basis"; Matlock 1952, 7 of 33
//     identical twin pairs discordant), hitchhiker's thumb (Harris & Joseph
//     1949 continuous angles; Beckman et al. 1960), cleft chin (Beckman et al.
//     1960). Adhikari et al. 2016 is NOT a source on cleft chin: it never
//     mentions the trait.
//   Never demonstrated at all: cheek dimples and widow's peak. McDonald found
//     no genetic evidence published for either, and two studies scoring widow's
//     peak reported 3% and 81% because neither defined it. Calling these
//     "debunked" is the error, and merging them with the first group hands a
//     critic a correction.
// The claim that two non-rollers can have a tongue-rolling child is NOT in the
// evidence and has been removed; the twin discordance is what the record shows.
export const CANNOT_PREDICT = {
  heading: "What genetics cannot tell you",
  intro:
    "We chose the traits above because each one follows a rule you can count. Most of the things couples ask about do not, and the school biology lesson that taught otherwise is where the confusion starts.",
  items: [
    {
      label: "Eye colour",
      text:
        "Eye colour is set by many genes rather than the one brown-beats-blue gene taught in school. The largest study of it found 124 separate genetic associations across 61 stretches of the genome, and its authors concluded the complexity considerably exceeds what anyone expected (Simcoe et al. 2021). The variant that does most of the work for blue against brown, and that also shifts the shade of brown in mixed-ancestry populations, is absent from African populations, so it explains nothing about the variation Ghanaians see in each other's eyes. In Ghana the question usually means brown against black, and no genetic basis for that distinction has been established. The darkest category in the field's largest study is dark brown. As best anyone can currently tell, the difference is how much melanin the iris holds rather than how many pigment cells it has, and nobody has yet measured how iris pigmentation varies within a West African population. There is no percentage to give because there are no two outcomes to divide.",
    },
    {
      label: "Height",
      text:
        "The most complete map of height yet built used 5.4 million people and found 12,111 separate genetic variants (Yengo et al. 2022). Twin studies put heritability somewhere between 0.68 and 0.93 depending on sex and country, and yet that same saturated map explains 40% of the variation in Europeans and 10 to 20% in everyone else. High heritability describes a population and licenses no statement about which genes one child will get. Childhood nutrition and illness are still in the picture. Two tall parents lean towards a tall child and nothing more precise than that.",
    },
    {
      label: "Skin tone",
      text:
        "Skin tone is more polygenic in Africa than the textbook gene lists suggest, not less. Pigmentation varies widely within Africa, from the darkest measured in East African pastoralist populations to the lightest in southern African San populations, and in some of those populations the known pigmentation genes explain only a small fraction of the variation (Crawford et al. 2017; Martin et al. 2017). A child's tone often lands somewhere between the parents, and often does not.",
    },
    {
      label: "Earlobes, tongue rolling, thumbs and chins",
      text:
        "These four are the classic school examples, and the ones with real evidence against them. Attached earlobes turn out to involve at least 49 genetic regions across 74,660 people, not one gene. Tongue rolling failed its own test twice over: a 1975 paper is titled No evidence for a genetic basis of tongue rolling, and in an earlier twin study 7 of 33 identical twin pairs disagreed with each other, one rolling and one not. Hitchhiker's thumb measures as a smooth range of angles rather than two categories. Cleft chin turns up in children of two smooth-chinned parents. The geneticist who proposed the tongue-rolling model in 1940 later wrote that he was embarrassed to see it still taught.",
    },
    {
      label: "Dimples and widow's peak",
      text:
        "These two are a weaker claim than the four above, and worth separating. They were never disproven, because no study ever supported them. McDonald's survey of the literature found no genetic evidence published on cheek dimples, and none on widow's peak either. Two studies that tried to score widow's peak reported prevalences of 3 and 81 in every hundred people, because neither had defined what counted as one.",
    },
  ],
  close:
    "Better testing would not change this. Counting works on a single gene with a clean rule, and not on a trait built from hundreds of them.",
};

// --------------------------------------------------------------------------
// The questions. Ids are unique across the whole flow and never collide with
// the genotype step ids in genotype-compatibility.js.
// --------------------------------------------------------------------------

const traitLabel = (id) => TRAITS.find((t) => t.id === id)?.short || id;

export function traitsFeedback(picked = []) {
  const list = TRAIT_IDS.filter((id) => picked.includes(id));
  if (list.length === 0) return "";
  if (list.length === 1) return `${traitLabel(list[0])} it is. Questions next.`;
  const names = list.map(traitLabel);
  const last = names.pop();
  return `${names.join(", ")} and ${last}. Genotype first, as always.`;
}

export const TRAIT_STEP = {
  id: "traits",
  kind: "multi",
  layout: "cards",
  min: 1,
  text: "What would you like to work out?",
  help: "Pick as many as you want. Genotype is already on, and it is answered first.",
  options: TRAITS.map((t) => ({ value: t.id, label: t.label, hint: t.hint })),
  feedback: (v) => traitsFeedback(v),
};

export const MOTHER_STEP = {
  id: "motherIs",
  kind: "choice",
  text: "Which of you would be the mother?",
  help: "Rh factor and G6PD read differently for a mother and a father, so the answer changes what we can tell you. Nothing else on this page uses it.",
  options: MOTHER_OPTIONS,
  skipIf: (v) => !needsMother(v),
  feedback: (v) =>
    v === "you"
      ? "Noted. Your Rh and G6PD answers are read as the mother's."
      : "Noted. Your partner's Rh and G6PD answers are read as the mother's.",
};

export const ABO_STEPS = [
  {
    id: "aboYou",
    kind: "choice",
    layout: "grid",
    text: "What is your blood group?",
    help: "The letter part only. The plus or minus is the next question.",
    options: ABO_OPTIONS,
    skipIf: (v) => !hasTrait(v, "abo"),
    feedback: (v) => (v === "unknown" ? "Not known yet. Your partner's group next." : `Group ${v}. Your partner's group next.`),
  },
  {
    id: "aboPartner",
    kind: "choice",
    layout: "grid",
    text: "And your partner's blood group?",
    options: ABO_OPTIONS,
    skipIf: (v) => !hasTrait(v, "abo"),
    feedback: (v, all) => aboPairFeedback(all.aboYou, v),
  },
];

export function aboPairFeedback(you, partner) {
  if (!you || !partner) return "";
  if (you === "unknown" || partner === "unknown") return "One group still unknown, so we will show you what a blood group test settles.";
  const { impossible, determinable, certainTotal } = aboOutcomes(you, partner);
  if (determinable) return `${you} and ${partner}. These two settle an exact split.`;
  if (certainTotal > 0) return `${you} and ${partner}. Half of this one is exact.`;
  if (impossible.length > 0) return `${you} and ${partner}. Some child groups are already ruled out.`;
  return `${you} and ${partner}. Every group stays on the table for this pairing.`;
}

export const RH_STEPS = [
  {
    id: "rhYou",
    kind: "choice",
    text: "Are you Rh positive or Rh negative?",
    help: "The plus or minus after your blood group letter. O+ is Rh positive, B- is Rh negative.",
    options: RH_OPTIONS,
    skipIf: (v) => !hasTrait(v, "rh"),
    feedback: (v) => (v === "unknown" ? "Not known yet. Your partner's next." : `${RH_LABEL[v]}. Your partner's next.`),
  },
  {
    id: "rhPartner",
    kind: "choice",
    text: "And your partner?",
    options: RH_OPTIONS,
    skipIf: (v) => !hasTrait(v, "rh"),
    feedback: (v, all) => rhPairFeedback(all.rhYou, v),
  },
];

export function rhPairFeedback(you, partner) {
  if (!you || !partner) return "";
  if (you === "unknown" || partner === "unknown") return "One Rh status still unknown, so we will show you what the test settles.";
  if (you === "neg" && partner === "neg") return "Two Rh negatives. That pairing has an exact answer.";
  return "Noted. Both Rh results are on the same report as the blood group.";
}

const motherIs = (v, side) => roles(v).mother === side;

export const G6PD_STEPS = [
  {
    id: "g6pdYouMother",
    kind: "choice",
    text: "What did your G6PD test say?",
    help: "Read as the mother's result. A woman can come back normal, intermediate or deficient.",
    options: G6PD_MOTHER_OPTIONS,
    skipIf: (v) => !hasTrait(v, "g6pd") || !motherIs(v, "you"),
    feedback: (v) => g6pdFeedback(v, "mother"),
  },
  {
    id: "g6pdYouFather",
    kind: "choice",
    text: "What did your G6PD test say?",
    help: "Read as the father's result. A man has one X chromosome, so his result is normal or deficient with nothing in between.",
    options: G6PD_FATHER_OPTIONS,
    skipIf: (v) => !hasTrait(v, "g6pd") || motherIs(v, "you"),
    feedback: (v) => g6pdFeedback(v, "father"),
  },
  {
    id: "g6pdPartnerMother",
    kind: "choice",
    text: "And your partner's G6PD result?",
    help: "Read as the mother's result.",
    options: G6PD_MOTHER_OPTIONS,
    skipIf: (v) => !hasTrait(v, "g6pd") || !motherIs(v, "partner"),
    feedback: (v) => g6pdFeedback(v, "mother"),
  },
  {
    id: "g6pdPartnerFather",
    kind: "choice",
    text: "And your partner's G6PD result?",
    help: "Read as the father's result.",
    options: G6PD_FATHER_OPTIONS,
    skipIf: (v) => !hasTrait(v, "g6pd") || motherIs(v, "partner"),
    feedback: (v) => g6pdFeedback(v, "father"),
  },
];

export function g6pdFeedback(value, role) {
  if (!value) return "";
  if (value === "unknown") return "Not known yet. A G6PD test is a small blood sample with no fasting.";
  if (role === "father") {
    return value === "deficient"
      ? "Noted. A deficient father passes an affected copy to every daughter and to no son."
      : "Noted. A father's G6PD status reaches his daughters and never his sons.";
  }
  if (value === "carrier") return "An intermediate result. This is the one the sons and daughters split turns on.";
  return "Noted. The mother's copies are what decide the sons.";
}

/** Which G6PD answer belongs to the mother, whichever side she is on. */
export function g6pdAnswers(values = {}) {
  const { mother } = roles(values);
  return mother === "you"
    ? { mother: values.g6pdYouMother, father: values.g6pdPartnerFather }
    : { mother: values.g6pdPartnerMother, father: values.g6pdYouFather };
}

/** Which Rh answer belongs to the mother, whichever side she is on. */
export function rhAnswers(values = {}) {
  const { mother } = roles(values);
  return mother === "you"
    ? { mother: values.rhYou, father: values.rhPartner }
    : { mother: values.rhPartner, father: values.rhYou };
}

// --------------------------------------------------------------------------
// Scoring each selected trait into a result section.
// --------------------------------------------------------------------------

export function computeAbo(values = {}) {
  const you = values.aboYou;
  const partner = values.aboPartner;
  if (!you || !partner) return null;
  if (you === "unknown" || partner === "unknown") {
    return { id: "abo", kind: "unknown", you, partner, bothUnknown: you === "unknown" && partner === "unknown" };
  }
  return { id: "abo", kind: "outcomes", you, partner, ...aboOutcomes(you, partner) };
}

export function computeRh(values = {}) {
  const you = values.rhYou;
  const partner = values.rhPartner;
  if (!you || !partner) return null;
  const { mother, father } = rhAnswers(values);
  if (you === "unknown" || partner === "unknown") {
    return {
      id: "rh",
      kind: "unknown",
      you,
      partner,
      bothUnknown: you === "unknown" && partner === "unknown",
      pregnancy: rhPregnancyFlag(mother, father),
    };
  }
  return {
    id: "rh",
    kind: "outcomes",
    you,
    partner,
    mother,
    father,
    pregnancy: rhPregnancyFlag(mother, father),
    ...rhOutcomes(you, partner),
  };
}

export function computeG6pd(values = {}) {
  const { mother, father } = g6pdAnswers(values);
  if (!mother || !father) return null;
  if (mother === "unknown" || father === "unknown") {
    return { id: "g6pd", kind: "unknown", mother, father, bothUnknown: mother === "unknown" && father === "unknown" };
  }
  return {
    id: "g6pd",
    kind: "outcomes",
    mother,
    father,
    reading: G6PD_READING[mother] || null,
    ...g6pdOutcomes(mother, father),
  };
}

export function computeSex() {
  return { id: "sex", kind: "fixed", percent: SEX_SPLIT, ...SEX_LINES };
}

// --------------------------------------------------------------------------
// Packing for the lead. One key per trait, so the whole tool stays well inside
// the endpoint's 16-key limit (src/lib/leads.js).
// --------------------------------------------------------------------------

export function packInheritance(values = {}, sections = {}) {
  const out = { traits: selectedTraits(values).join(",") };
  if (values.motherIs) out.motherIs = values.motherIs;

  const abo = sections.abo;
  if (abo) {
    out.abo =
      abo.kind === "unknown"
        ? `${abo.you}+${abo.partner}`
        : `${abo.you}+${abo.partner}|no:${abo.impossible.join(".") || "none"}`;
  }

  const rh = sections.rh;
  if (rh) {
    out.rh = rh.kind === "unknown" ? `${rh.you}+${rh.partner}` : `${rh.you}+${rh.partner}|${rh.possible.join(".")}`;
  }

  const g6pd = sections.g6pd;
  if (g6pd) {
    out.g6pd =
      g6pd.kind === "unknown"
        ? `m:${g6pd.mother}|f:${g6pd.father}`
        : `m:${g6pd.mother}|f:${g6pd.father}|s:${g6pd.sons.map((r) => `${r.status}${r.percent}`).join(".")}`;
  }

  return out;
}

// --------------------------------------------------------------------------
// The next step. Which test a result leans towards, and when not to push one.
//
// Catalogue codes and static fallback prices verified against the Ghana
// catalogue on 2026-09-05, and read live through src/lib/pricing-catalogue.js:
//   HB_ELECTRO  HB Electrophoresis (Sickling Included)  GHS 170
//   BLOOD_GROUP Blood Grouping                          GHS 75
//   G6PD        G6PD (Quantitative)                     GHS 150
// --------------------------------------------------------------------------

export const TESTS = {
  hbElectro: { testCode: "HB_ELECTRO", slug: "hb-electrophoresis", name: "HB Electrophoresis (Sickling Included)", price: "GHS 170" },
  bloodGroup: { testCode: "BLOOD_GROUP", slug: "blood-group", name: "Blood Grouping", price: "GHS 75" },
  g6pd: { testCode: "G6PD", slug: "g6pd", name: "G6PD (Quantitative)", price: "GHS 150" },
};

/**
 * What is still unconfirmed, in the order it is worth fixing.
 * A sickling-only or guessed genotype counts as unconfirmed for this purpose,
 * because a sickling test cannot tell AS from SS.
 *   src/data/blog/posts/sickle-cell-trait-testing.js
 */
export function openQuestions(result) {
  const open = [];
  const g = result.genotype;
  if (g) {
    if (g.kind === "unknown") open.push({ id: "genotype", test: TESTS.hbElectro, why: "Neither square can be drawn without both genotypes." });
    else if (g.advice && (g.advice.id === "sickling" || g.advice.id === "guess" || g.advice.id === "clinic"))
      open.push({ id: "genotype", test: TESTS.hbElectro, why: "The letters behind the odds are not on a report yet." });
  }
  const needsGroup = (result.abo && result.abo.kind === "unknown") || (result.rh && result.rh.kind === "unknown");
  if (needsGroup) open.push({ id: "bloodGroup", test: TESTS.bloodGroup, why: "One blood group test settles both the letter and the Rh factor." });
  if (result.g6pd && result.g6pd.kind === "unknown")
    open.push({ id: "g6pd", test: TESTS.g6pd, why: "G6PD is the one here that changes what is safe to prescribe." });
  return open;
}

/**
 * The CTA card for a finished result.
 *
 * @returns {{ kind: "test" | "tests" | "none", ... }}
 *   "none" when every answer is confirmed and nothing is outstanding: there is
 *   no test left to sell, so the card says so instead.
 */
export function inheritanceCta(result) {
  const open = openQuestions(result);

  if (open.length === 0) {
    return {
      kind: "none",
      label: "Nothing here is waiting on a test.",
      body:
        "Every answer you gave came from a result you already have. Keep the reports somewhere you can find them, take them to an antenatal booking visit, and there is nothing to book today.",
    };
  }

  if (open.length === 1) {
    const only = open[0];
    return {
      kind: "test",
      ...only.test,
      label: only.id === "genotype" ? "Confirm both genotypes" : only.id === "g6pd" ? "Get G6PD checked" : "Get blood group and Rh confirmed",
      body: only.why,
    };
  }

  return {
    kind: "tests",
    label: "Three tests cover everything still open",
    body:
      "A premarital panel usually covers all three, and they can also be booked one at a time. Whichever way you do it, the reports are yours to keep and none of them needs repeating.",
    items: open.map((o) => o.test),
  };
}
