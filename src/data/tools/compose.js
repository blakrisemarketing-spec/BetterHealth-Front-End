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
import { computeGenotype, genotypeAdvice } from "./genotype-compatibility.js";
import { PLATE_STEPS, packPlate, summarisePlate } from "./plate.js";
import { HABIT_STEPS, packHabits, summariseHabits } from "./heart-habits.js";
import { LIFESTYLE_STEPS, packLifestyle, summariseLifestyle } from "./lifestyle.js";

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

/** How many question screens a set of parts holds, before any skipIf runs. */
export function countQuestions(parts) {
  return parts.reduce((n, p) => n + p.steps.length, 0);
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
