// Joins each tool's Part 1 (the validated instrument, untouched) to its Part 2
// (the descriptive lifestyle section, unscored).
//
// Pure. No JSX and no browser globals. The Stepper walks PARTS; the runner
// hands the flat answer map to the compute*Full function, which calls the
// instrument's own function on it and staples the Part 2 description and the
// packed answers alongside. The instrument's output is spread first and never
// overwritten, which the tests in scripts/test-tools.mjs pin.

import { STEPS as FINDRISC_STEPS, computeFindrisc } from "./diabetes-risk.js";
import { STEPS as HEART_STEPS, computeHeartAge } from "./heart-age.js";
import { STEPS as BMI_WAIST_STEPS, computeBmiWaist } from "./bmi-waist.js";
import { GENOTYPE_STEPS, computeGenotype, genotypeAdvice } from "./genotype-compatibility.js";
import { PLATE_STEPS, packPlate, summarisePlate } from "./plate.js";
import { HABIT_STEPS, packHabits, summariseHabits } from "./heart-habits.js";
import { LIFESTYLE_STEPS, packLifestyle, summariseLifestyle } from "./lifestyle.js";
import {
  ABO_STEPS,
  G6PD_STEPS,
  MOTHER_STEP,
  RH_STEPS,
  TRAIT_STEP,
  computeAbo,
  computeG6pd,
  computeRh,
  computeSex,
  hasTrait,
  inheritanceCta,
  packInheritance,
  selectedTraits,
} from "./inheritance.js";

export const DIABETES_PARTS = [
  { id: "score", number: 1, title: "The FINDRISC score", steps: FINDRISC_STEPS },
  {
    id: "plate",
    number: 2,
    title: "Your week on a plate",
    intro:
      "Your score is worked out. This part asks what a typical week looks like on your plate, kenkey to koko, so the result can describe your week rather than a generic one. Taps only, no typing, and nothing here changes the score.",
    steps: PLATE_STEPS,
  },
];

export const HEART_PARTS = [
  { id: "chart", number: 1, title: "The WHO chart", steps: HEART_STEPS },
  {
    id: "habits",
    number: 2,
    title: "Heart habits",
    intro:
      "The chart reads five things and stops. This part asks about the habits it has no line for: salt in Ghanaian cooking, activity, drinks, sleep and family history. Nothing here changes the chart reading.",
    steps: HABIT_STEPS,
  },
];

export const BMI_PARTS = [
  { id: "measure", number: 1, title: "Your measurements", steps: BMI_WAIST_STEPS },
  {
    id: "lifestyle",
    number: 2,
    title: "A normal day and a normal week",
    intro:
      "Your bands are worked out. Five quick taps about a normal day, the last year, and what a week looks like on your plate. Nothing here changes the bands.",
    steps: LIFESTYLE_STEPS,
  },
];

// The genotype questions are the instrument's own steps, wrapped with the one
// skip rule the multi-trait flow needs. Nothing else about them changes, and
// the four answers they collect are the four computeGenotype has always read.
const GENOTYPE_PART_STEPS = GENOTYPE_STEPS.map((step) => ({
  ...step,
  skipIf: (v) => !hasTrait(v, "genotype"),
}));

export const INHERITANCE_PARTS = [
  { id: "pick", number: 1, title: "What to work out", steps: [TRAIT_STEP, MOTHER_STEP] },
  {
    id: "genotype",
    number: 2,
    title: "Sickle cell genotype",
    intro:
      "The one most couples come for. Two genotypes go in, a Punnett square comes out, and two follow-ups decide how much weight the answer can carry.",
    steps: GENOTYPE_PART_STEPS,
  },
  {
    id: "abo",
    number: 3,
    title: "Blood group",
    intro:
      "A, B, AB or O. The letters rule some outcomes out, which is the useful half, and for most pairings they cannot settle an exact split. The result says which is which.",
    steps: ABO_STEPS,
  },
  {
    id: "rh",
    number: 4,
    title: "Rh factor",
    intro:
      "The plus or minus on the same report as the blood group. It matters most when the mother is Rh negative, because that is what antenatal care plans around.",
    steps: RH_STEPS,
  },
  {
    id: "g6pd",
    number: 5,
    title: "G6PD",
    intro:
      "The enzyme that matters before some malaria drugs. It sits on the X chromosome, so sons and daughters get different answers.",
    steps: G6PD_STEPS,
  },
];

/** How many question screens a set of parts holds, before any skipIf runs. */
export function countQuestions(parts) {
  return parts.reduce((n, p) => n + p.steps.length, 0);
}

/** How many question screens a set of parts actually shows for these answers. */
export function countVisibleQuestions(parts, values = {}) {
  return parts.reduce(
    (n, p) => n + p.steps.filter((s) => typeof s.skipIf !== "function" || !s.skipIf(values)).length,
    0,
  );
}

export function computeDiabetesFull(values) {
  const findrisc = computeFindrisc(values);
  return {
    ...findrisc,
    plate: summarisePlate(values),
    answers: { ...findrisc.answers, ...packPlate(values) },
  };
}

export function computeHeartFull(values) {
  const heart = computeHeartAge(values);
  return {
    ...heart,
    habits: summariseHabits(values),
    answers: { ...heart.answers, ...packHabits(values) },
  };
}

export function computeBmiFull(values) {
  const bmi = computeBmiWaist(values);
  return {
    ...bmi,
    lifestyle: summariseLifestyle(values),
    answers: { ...bmi.answers, ...packLifestyle(values) },
  };
}

export function computeGenotypeFull({ you, partner, basis, familyScd }) {
  const odds = computeGenotype({ you, partner });
  return {
    ...odds,
    advice: genotypeAdvice({ you, partner, basis, familyScd }),
    answers: { ...odds.answers, basis: basis || "", familyScd: familyScd || "" },
  };
}

/**
 * The whole family inheritance calculator: one result carrying a section per
 * selected trait, in TRAITS order, with genotype first.
 *
 * The genotype section is computeGenotypeFull's output, spread in untouched, so
 * the Punnett square this tool prints is the same object the genotype-only tool
 * has always printed. Nothing below can overwrite it, which the tests pin.
 */
export function computeInheritanceFull(values = {}) {
  const traits = selectedTraits(values);
  const sections = {};

  if (traits.includes("genotype")) sections.genotype = computeGenotypeFull(values);
  if (traits.includes("abo")) sections.abo = computeAbo(values);
  if (traits.includes("rh")) sections.rh = computeRh(values);
  if (traits.includes("g6pd")) sections.g6pd = computeG6pd(values);
  if (traits.includes("sex")) sections.sex = computeSex();

  const cta = inheritanceCta(sections);
  const healthInterest = cta.kind === "test" ? cta.testCode : "HB_ELECTRO";

  return {
    slug: "genotype-compatibility",
    traits,
    ...sections,
    cta,
    healthInterest,
    answers: {
      ...packInheritance(values, sections),
      ...(sections.genotype ? sections.genotype.answers : {}),
    },
  };
}
