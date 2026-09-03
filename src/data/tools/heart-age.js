// Interactive tool 3: the Heart Age Check.
//
// Pure data + maths. No JSX and no browser globals: src/data/seo.js imports
// this module on the Node side at build time.
//
// ============================ SOURCE OF THE NUMBERS ==========================
//
// Every percentage below is a published cell from the WHO 2019 NON-LABORATORY
// -BASED cardiovascular risk chart for WESTERN SUB-SAHARAN AFRICA. Nothing is
// modelled, interpolated or fitted here. Ghana sits in the Western Sub-Saharan
// Africa GBD region (WHO HEARTS module, Annex 1, Table 5), alongside Benin,
// Burkina Faso, Cabo Verde, Cameroon, Chad, Cote d'Ivoire, Gambia, Guinea,
// Guinea-Bissau, Liberia, Mali, Mauritania, Niger, Nigeria, Sao Tome and
// Principe, Senegal, Sierra Leone and Togo. WHO publishes 21 regional charts
// and splits Sub-Saharan Africa into four; this is the Western one.
//
// Chart source (the cell values in WSSA_NON_LAB_CHART below, verified by
// extracting page 6 of the PDF and reading it back against the rendered page):
//   WHO. WHO cardiovascular disease risk non-laboratory-based charts. Geneva:
//   World Health Organization; 2019. Annex 3 of the HEARTS technical package.
//   https://www.who.int/docs/default-source/ncds/cvd-risk-non-laboratory-based-charts.pdf?sfvrsn=fbb10584_2
//   (Western Sub-Saharan Africa is page 6.)
//
// Chart usage, risk bands, outcome definition and regional country lists:
//   WHO. HEARTS technical package for cardiovascular disease management in
//   primary health care: risk-based CVD management. Geneva: WHO; 2020.
//   ISBN 978-92-4-000136-7. https://www.who.int/publications/i/item/9789240001367
//
// Underlying models, derivation, validation and limitations:
//   WHO CVD Risk Chart Working Group. World Health Organization cardiovascular
//   disease risk charts: revised models to estimate risk in 21 global regions.
//   Lancet Glob Health 2019;7(10):e1332-45. doi:10.1016/S2214-109X(19)30318-3
//
// AXES, exactly as printed:
//   Sex           separate Men and Women panels (the models were fitted separately)
//   Smoking       Non-smoker | Smoker (HEARTS footnotes "smoker" as current smoker)
//   Age (rows)    40-44, 45-49, 50-54, 55-59, 60-64, 65-69, 70-74. Nothing is
//                 published outside 40 to 74, so this tool refuses to answer there.
//   SBP (rows)    <120, 120-139, 140-159, 160-179, >=180 mmHg
//   BMI (columns) <20, 20-24, 25-29, 30-35, >=35 kg/m2  (FIVE columns, not four)
//
// RISK BANDS, printed on every chart page as the Risk Level legend. The cell
// value is the 10-year risk of a fatal or non-fatal cardiovascular event:
//   <5% | 5% to <10% | 10% to <20% | 20% to <30% | >=30%
// Note for anyone porting the older 2007 WHO/ISH chart: the colours were
// re-cut. 2007 green was <10%; 2019 green is <5%. Do not reuse 2007 logic.
//
// WHAT THE CHART DOES NOT COVER, carried into the result copy on purpose:
//   - The derivation cohorts were mostly from high-income countries (about 66%
//     European, 23% North American). No African cohort contributed. The
//     Sub-Saharan African values come from recalibrating those models to
//     regional aggregates, not from African cohort data.
//   - HEARTS (p11) states the non-laboratory algorithm substantially
//     underestimates CVD risk in people with diabetes.
//   - HEARTS (p11, p16, p21) positions the non-lab charts for stratification
//     and referral, NOT for treatment decisions, and says anyone at 10% or
//     above on the non-lab chart should be reassessed on the laboratory-based
//     chart once cholesterol and glucose have been measured.
//   - "Heart age" is not a WHO term. It appears nowhere in the chart PDF, the
//     HEARTS module, the Lancet paper or its appendix. The heart age this tool
//     reports is a way of READING the same published table (see heartAgeFor
//     below), never a second model.
//
// Blood pressure category wording quoted in the copy comes from the site's own
// vetted article, src/data/blog/posts/high-blood-pressure-silent-killer.js.

// Part 2 of this tool ("Heart habits") lives in heart-habits.js and never
// touches the chart reading. Its sources are spread into this tool's list
// below so they render on the page.
import { HABIT_SOURCES } from "./heart-habits.js";

/** True when the risk bands come from a real published chart rather than a fallback. */
export const HEART_AGE_IS_CALIBRATED = true;

export const CHART_REGION = "Western Sub-Saharan Africa";

// Age bands, youngest first. Keys match the chart's printed rows.
export const AGE_KEYS = ["40to44", "45to49", "50to54", "55to59", "60to64", "65to69", "70to74"];
export const AGE_LABELS = {
  "40to44": "40 to 44",
  "45to49": "45 to 49",
  "50to54": "50 to 54",
  "55to59": "55 to 59",
  "60to64": "60 to 64",
  "65to69": "65 to 69",
  "70to74": "70 to 74",
};

// BMI columns, in printed order.
export const BMI_LABELS = ["Under 20", "20 to 24", "25 to 29", "30 to 35", "35 or over"];
// The chart's healthy-weight reference column.
const REFERENCE_BMI_INDEX = 1;

// Each row holds all twenty printed cells for one (age band, SBP band), in the
// chart's own left-to-right order, so this table can be diffed against page 6
// of the PDF line by line:
//   [ men non-smoker x5 ][ men smoker x5 ][ women non-smoker x5 ][ women smoker x5 ]
// and within each block of five, the BMI columns <20, 20-24, 25-29, 30-35, >=35.
export const WSSA_NON_LAB_CHART = {
  "70to74": {
    sbp180plus  : [23, 24, 26, 28, 30,  29, 31, 33, 36, 38,  20, 21, 21, 22, 23,  29, 30, 31, 32, 33],
    sbp160to179 : [19, 20, 21, 23, 25,  24, 26, 28, 30, 32,  17, 17, 18, 18, 19,  24, 25, 26, 27, 28],
    sbp140to159 : [15, 16, 17, 19, 20,  20, 21, 23, 24, 26,  14, 14, 15, 15, 16,  20, 21, 21, 22, 23],
    sbp120to139 : [12, 13, 14, 15, 16,  16, 17, 18, 20, 21,  11, 12, 12, 13, 13,  17, 17, 18, 18, 19],
    sbpUnder120 : [10, 11, 11, 12, 13,  13, 14, 15, 16, 17,   9, 10, 10, 10, 11,  14, 14, 15, 15, 16],
  },
  "65to69": {
    sbp180plus  : [17, 19, 21, 22, 24,  24, 26, 29, 31, 34,  15, 16, 17, 17, 18,  24, 25, 26, 27, 29],
    sbp160to179 : [14, 15, 16, 18, 20,  19, 21, 23, 25, 27,  12, 13, 13, 14, 15,  20, 21, 21, 22, 23],
    sbp140to159 : [11, 12, 13, 14, 16,  15, 17, 18, 20, 22,  10, 10, 11, 11, 12,  16, 17, 17, 18, 19],
    sbp120to139 : [ 9,  9, 10, 11, 12,  12, 13, 15, 16, 18,   8,  8,  9,  9,  9,  13, 13, 14, 15, 15],
    sbpUnder120 : [ 7,  7,  8,  9, 10,  10, 11, 12, 13, 14,   6,  7,  7,  7,  8,  10, 11, 11, 12, 12],
  },
  "60to64": {
    sbp180plus  : [13, 15, 16, 18, 20,  20, 22, 24, 27, 30,  12, 12, 13, 14, 14,  20, 21, 22, 24, 25],
    sbp160to179 : [10, 11, 13, 14, 16,  16, 17, 19, 21, 24,   9, 10, 10, 11, 11,  16, 17, 18, 19, 20],
    sbp140to159 : [ 8,  9, 10, 11, 12,  12, 13, 15, 17, 19,   7,  8,  8,  8,  9,  13, 13, 14, 15, 16],
    sbp120to139 : [ 6,  7,  7,  8,  9,   9, 10, 12, 13, 15,   6,  6,  6,  6,  7,  10, 11, 11, 12, 12],
    sbpUnder120 : [ 5,  5,  6,  6,  7,   7,  8,  9, 10, 11,   4,  5,  5,  5,  5,   8,  8,  9,  9, 10],
  },
  "55to59": {
    sbp180plus  : [10, 11, 13, 14, 16,  16, 18, 21, 23, 26,   9, 10, 10, 11, 11,  17, 18, 19, 20, 21],
    sbp160to179 : [ 8,  9, 10, 11, 12,  12, 14, 16, 18, 20,   7,  7,  8,  8,  8,  13, 14, 15, 16, 16],
    sbp140to159 : [ 6,  6,  7,  8,  9,   9, 11, 12, 14, 16,   5,  5,  6,  6,  6,  10, 11, 11, 12, 13],
    sbp120to139 : [ 4,  5,  5,  6,  7,   7,  8,  9, 10, 12,   4,  4,  4,  5,  5,   8,  8,  9,  9, 10],
    sbpUnder120 : [ 3,  4,  4,  5,  5,   5,  6,  7,  8,  9,   3,  3,  3,  3,  4,   6,  6,  7,  7,  7],
  },
  "50to54": {
    sbp180plus  : [ 8,  9, 10, 11, 13,  13, 15, 18, 20, 23,   7,  7,  8,  8,  9,  14, 15, 16, 17, 18],
    sbp160to179 : [ 6,  6,  7,  8, 10,  10, 11, 13, 15, 18,   5,  5,  6,  6,  6,  11, 11, 12, 13, 14],
    sbp140to159 : [ 4,  5,  5,  6,  7,   7,  8, 10, 11, 13,   4,  4,  4,  4,  5,   8,  9,  9, 10, 10],
    sbp120to139 : [ 3,  3,  4,  5,  5,   5,  6,  7,  8, 10,   3,  3,  3,  3,  3,   6,  6,  7,  7,  8],
    sbpUnder120 : [ 2,  2,  3,  3,  4,   4,  5,  5,  6,  7,   2,  2,  2,  2,  3,   4,  5,  5,  5,  6],
  },
  "45to49": {
    sbp180plus  : [ 6,  7,  8,  9, 11,  11, 13, 15, 17, 20,   5,  6,  6,  6,  7,  12, 13, 14, 15, 16],
    sbp160to179 : [ 4,  5,  6,  7,  8,   8,  9, 11, 13, 15,   4,  4,  4,  5,  5,   9,  9, 10, 11, 11],
    sbp140to159 : [ 3,  3,  4,  5,  5,   6,  7,  8,  9, 11,   3,  3,  3,  3,  3,   6,  7,  7,  8,  8],
    sbp120to139 : [ 2,  2,  3,  3,  4,   4,  5,  6,  7,  8,   2,  2,  2,  2,  2,   5,  5,  5,  6,  6],
    sbpUnder120 : [ 1,  2,  2,  2,  3,   3,  3,  4,  5,  6,   1,  1,  2,  2,  2,   3,  4,  4,  4,  4],
  },
  "40to44": {
    sbp180plus  : [ 5,  5,  6,  7,  9,   9, 11, 13, 15, 18,   4,  4,  5,  5,  5,  10, 11, 12, 12, 13],
    sbp160to179 : [ 3,  4,  4,  5,  6,   6,  7,  9, 11, 13,   3,  3,  3,  3,  4,   7,  8,  8,  9, 10],
    sbp140to159 : [ 2,  3,  3,  4,  4,   4,  5,  6,  8,  9,   2,  2,  2,  2,  3,   5,  5,  6,  6,  7],
    sbp120to139 : [ 1,  2,  2,  2,  3,   3,  4,  4,  5,  6,   1,  1,  2,  2,  2,   4,  4,  4,  4,  5],
    sbpUnder120 : [ 1,  1,  1,  2,  2,   2,  3,  3,  4,  5,   1,  1,  1,  1,  1,   2,  3,  3,  3,  3],
  },
};

export const RISK_BANDS = [
  { id: "under5", min: 0, max: 4.999, label: "Under 5%" },
  { id: "5to10", min: 5, max: 9.999, label: "5% to under 10%" },
  { id: "10to20", min: 10, max: 19.999, label: "10% to under 20%" },
  { id: "20to30", min: 20, max: 29.999, label: "20% to under 30%" },
  { id: "30plus", min: 30, max: Infinity, label: "30% or above" },
];

export function bandFor(percent) {
  return RISK_BANDS.find((b) => percent >= b.min && percent <= b.max) || RISK_BANDS[0];
}

/** The chart's age row for a given age in years, or null outside 40 to 74. */
export function ageKeyFor(years) {
  const n = Number(years);
  if (!(n >= 40) || n > 74) return null;
  return AGE_KEYS[Math.min(6, Math.floor((n - 40) / 5))];
}

/** The chart's SBP row key for a systolic reading in mmHg. */
export function sbpKeyFor(mmHg) {
  const n = Number(mmHg);
  if (n >= 180) return "sbp180plus";
  if (n >= 160) return "sbp160to179";
  if (n >= 140) return "sbp140to159";
  if (n >= 120) return "sbp120to139";
  return "sbpUnder120";
}

/** The chart's BMI column index: <20, 20-24, 25-29, 30-35, >=35. */
export function bmiIndexFor(bmi) {
  if (bmi < 20) return 0;
  if (bmi < 25) return 1;
  if (bmi < 30) return 2;
  if (bmi < 35) return 3;
  return 4;
}

/** BMI in kg/m2 from centimetres and kilograms. Null when either is unusable. */
export function bmiFrom(heightCm, weightKg) {
  const h = Number(heightCm);
  const w = Number(weightKg);
  if (!(h > 0) || !(w > 0)) return null;
  const m = h / 100;
  return w / (m * m);
}

/** Read one published cell. Every risk figure in this tool comes through here. */
export function chartRisk({ ageKey, sex, smoker, sbpKey, bmiIndex }) {
  const row = WSSA_NON_LAB_CHART[ageKey]?.[sbpKey];
  if (!row) return null;
  const block = (sex === "female" ? 10 : 0) + (smoker ? 5 : 0);
  return row[block + bmiIndex];
}

/**
 * Heart age, read off the same published table and nowhere else.
 *
 * The reference profile is the healthiest column the chart publishes: a
 * non-smoker of the same sex, systolic under 120 mmHg, BMI 20 to 24. Walking
 * that column down the age rows gives the risk band a reference person falls
 * into at each age. Heart age is the age band where that reference band first
 * equals the person's own band.
 *
 * The reference column tops out in the 10% to under 20% band at 70 to 74, so
 * anyone at 20% or above is beyond anything the chart publishes for a
 * reference person. That returns null rather than an extrapolated number.
 */
export function heartAgeFor({ sex, ageKey, band }) {
  const referenceBands = AGE_KEYS.map((key) => ({
    key,
    band: bandFor(
      chartRisk({ ageKey: key, sex, smoker: false, sbpKey: "sbpUnder120", bmiIndex: REFERENCE_BMI_INDEX }),
    ),
  }));

  const matches = referenceBands.filter((r) => r.band.id === band.id);
  if (matches.length === 0) {
    const highest = referenceBands[referenceBands.length - 1].band;
    return {
      ageKey: null,
      beyondChart: RISK_BANDS.findIndex((b) => b.id === band.id) > RISK_BANDS.findIndex((b) => b.id === highest.id)
        ? "older"
        : "younger",
    };
  }

  // Their own age band wins when it is one of the matches: the honest answer
  // there is that heart age and actual age agree.
  if (matches.some((m) => m.key === ageKey)) return { ageKey, beyondChart: null };

  const own = AGE_KEYS.indexOf(ageKey);
  const nearest = matches.reduce((best, m) =>
    Math.abs(AGE_KEYS.indexOf(m.key) - own) < Math.abs(AGE_KEYS.indexOf(best.key) - own) ? m : best,
  );
  return { ageKey: nearest.key, beyondChart: null };
}

// Labels for the "what is driving this" list. Each driver is the difference,
// in percentage points, between the person's own published cell and the cell
// they would land in if that one factor were at its reference value. Both
// numbers are printed values, so the difference is a comparison of two chart
// cells rather than a calculation of its own.
const DRIVER_LABELS = {
  smoking: "Smoking",
  systolic: "Your blood pressure",
  bmi: "Your BMI",
};

export const STEPS = [
  {
    id: "ageStep",
    kind: "number",
    text: "How old are you?",
    help: "WHO publishes this chart for ages 40 to 74 only. Outside that range there is nothing to read off it, and we will say so rather than guess.",
    field: { id: "age", label: "Age", unit: "years", min: 18, max: 100, placeholder: "52" },
  },
  {
    id: "sex",
    kind: "choice",
    text: "Which of the WHO charts should we read?",
    help: "WHO publishes the chart separately for men and for women, because the underlying models were fitted separately.",
    options: [
      { value: "male", label: "The chart for men" },
      { value: "female", label: "The chart for women" },
    ],
  },
  {
    id: "smoker",
    kind: "choice",
    text: "Do you smoke now?",
    help: "The chart has two columns, current smoker and non-smoker. Someone who has stopped reads the non-smoker column.",
    options: [
      { value: "no", label: "No" },
      { value: "yes", label: "Yes" },
    ],
  },
  {
    id: "systolicStep",
    kind: "number",
    text: "What is your systolic blood pressure?",
    help: "The top number on a blood pressure reading. If your last reading was 128/84, the systolic is 128.",
    field: { id: "systolic", label: "Systolic", unit: "mmHg", min: 70, max: 260, placeholder: "128" },
    unknownLabel: "I don't know my blood pressure",
    unknownNote:
      "That is the one number here you cannot estimate. A pharmacy or a clinic will take it in about two minutes, and a week of your own readings gives a steadier figure than a single visit does.",
    unknownLink: { to: "/guides/home-blood-pressure-guide", label: "Get the 7-day reading guide" },
  },
  {
    id: "body",
    kind: "measurements",
    text: "How tall are you, and what do you weigh?",
    help: "The chart uses BMI in place of a cholesterol result, which is what makes it work without a blood test.",
    fields: [
      { id: "heightCm", label: "Height", unit: "cm", min: 100, max: 250, placeholder: "170" },
      { id: "weightKg", label: "Weight", unit: "kg", min: 25, max: 300, placeholder: "72" },
    ],
  },
];

/**
 * Read the chart for one person.
 *
 * @param {{ age, sex, smoker, systolic, heightCm, weightKg }} input
 * @returns {{ kind: "risk" | "unknown" | "outOfRange", risk, band, heartAge, drivers, bmi, answers, healthInterest }}
 */
export function computeHeartAge(input) {
  const bmi = bmiFrom(input.heightCm, input.weightKg);
  const ageKey = ageKeyFor(input.age);
  const smoker = input.smoker === "yes";

  const base = {
    risk: null,
    band: null,
    heartAge: null,
    drivers: [],
    bmi,
    ageKey,
    age: Number(input.age) || null,
    sex: input.sex,
    smoker,
    healthInterest: "cardion",
    answers: {
      age: String(input.age ?? ""),
      sex: input.sex || "",
      smoker: smoker ? "yes" : "no",
      systolic: String(input.systolic ?? ""),
      bmi: bmi ? bmi.toFixed(1) : "",
    },
  };

  if (input.systolic === "unknown" || input.systolic === undefined || input.systolic === "") {
    return { ...base, kind: "unknown" };
  }
  if (!ageKey || bmi === null) {
    return { ...base, kind: "outOfRange" };
  }

  const sbpKey = sbpKeyFor(input.systolic);
  const bmiIndex = bmiIndexFor(bmi);
  const risk = chartRisk({ ageKey, sex: input.sex, smoker, sbpKey, bmiIndex });
  const band = bandFor(risk);

  // Each driver compares two published cells: the person's own, and the one
  // they would sit in with that single factor at its reference value.
  const drivers = [
    {
      id: "smoking",
      points: smoker
        ? risk - chartRisk({ ageKey, sex: input.sex, smoker: false, sbpKey, bmiIndex })
        : 0,
    },
    {
      id: "systolic",
      points:
        sbpKey === "sbpUnder120"
          ? 0
          : risk - chartRisk({ ageKey, sex: input.sex, smoker, sbpKey: "sbpUnder120", bmiIndex }),
    },
    {
      id: "bmi",
      points:
        bmiIndex === REFERENCE_BMI_INDEX
          ? 0
          : risk - chartRisk({ ageKey, sex: input.sex, smoker, sbpKey, bmiIndex: REFERENCE_BMI_INDEX }),
    },
  ]
    .map((d) => ({ ...d, label: DRIVER_LABELS[d.id] }))
    .filter((d) => d.points > 0)
    .sort((a, b) => b.points - a.points);

  const heartAge = heartAgeFor({ sex: input.sex, ageKey, band });

  return {
    ...base,
    kind: "risk",
    risk,
    band,
    drivers,
    heartAge,
    bmiIndex,
    sbpKey,
    answers: {
      ...base.answers,
      riskPercent: String(risk),
      riskBand: band.label,
      heartAge: heartAge.ageKey ? AGE_LABELS[heartAge.ageKey] : `beyond the chart (${heartAge.beyondChart})`,
    },
  };
}

export default {
  slug: "heart-age",
  title: "Heart Age Check",
  shortTitle: "Heart Age Check",
  eyebrow: "Free 2-minute calculator",
  promise:
    "Part 1 is five questions and no blood test: we read the WHO risk chart for Western Sub-Saharan Africa, the region Ghana sits in. Part 2 is seven taps about the habits the chart cannot see, from seasoning cubes to sleep. You get the cell your answers land in, what is pushing you there, the age at which someone with healthy numbers reaches the same cell, and a card you can share.",
  description:
    "Read your 10-year heart risk off the WHO chart for Western Sub-Saharan Africa. Five questions, no blood test, and it shows what is driving the number.",
  format: "5 chart questions, then 7 heart habits",
  bullets: [
    "The WHO 2019 chart for Western Sub-Saharan Africa, the region Ghana sits in",
    "No cholesterol result needed, because this chart uses BMI instead",
    "Part 2: salt, activity, drinks, sleep and family history, which the chart cannot see",
    "A result card you can share on WhatsApp",
  ],
  intro:
    "Two parts. Part 1 is five questions and no blood test: WHO publishes a version of its risk chart that uses BMI in place of a cholesterol result, and that is the chart we read. Part 2 logs the habits the chart has no line for, and never changes the reading.",
  sections: [
    {
      heading: "Which chart this is",
      paragraphs: [
        "WHO publishes cardiovascular risk charts for 21 world regions, in two versions each. One needs a cholesterol result and a glucose result. The other needs neither, and uses BMI in their place, so it can be used where a blood test is not to hand.",
        "This tool reads the non-laboratory chart for Western Sub-Saharan Africa, which is the region Ghana belongs to, alongside Nigeria, Senegal, Cote d'Ivoire and the rest of West Africa. Every percentage it shows you is a printed cell from that chart, not a number this tool worked out on its own.",
      ],
      callout:
        "The number the chart gives is the 10-year risk of a fatal or non-fatal cardiovascular event, for a person with your age, sex, smoking status, systolic blood pressure and BMI. It is an estimate drawn from population data, not a statement about you.",
    },
    {
      heading: "What the chart openly misses",
      paragraphs: [
        "The models behind these charts were built on cohorts that were about two-thirds European and a quarter North American. No African cohort contributed to them. The Sub-Saharan African numbers come from recalibrating those models to regional data, not from following people in West Africa.",
        "WHO states that the non-laboratory version substantially underestimates risk in people with diabetes, and positions it for referral and stratification rather than for treatment decisions. Its own guidance is that anyone reading 10% or above on this chart should be reassessed on the laboratory chart once cholesterol and glucose have been measured.",
        "It is published for ages 40 to 74. Below 40 and above 74 there are no cells, so this tool says so rather than filling the gap.",
      ],
    },
  ],
  sources: [
    {
      label:
        "WHO. Cardiovascular disease risk non-laboratory-based charts. Geneva: WHO; 2019 (Annex 3, HEARTS technical package). Western Sub-Saharan Africa chart.",
    },
    {
      label:
        "WHO. HEARTS technical package: risk-based CVD management. Geneva: WHO; 2020. ISBN 978-92-4-000136-7.",
    },
    {
      label:
        "WHO CVD Risk Chart Working Group. Revised models to estimate risk in 21 global regions. Lancet Glob Health 2019;7(10):e1332-45.",
    },
    { label: "WHO Global Hypertension Report 2023; AHA/ACC 2017 hypertension guideline" },
    { label: "High blood pressure in Ghana: the silent killer", url: "/blog/high-blood-pressure-silent-killer" },
    { label: "Lipid profile: how to read your cholesterol results", url: "/blog/lipid-profile-cholesterol-test" },
    { label: "Home blood pressure: the 7-day reading guide", url: "/guides/home-blood-pressure-guide" },
    ...HABIT_SOURCES,
  ],
  cta: {
    kind: "panel",
    panelSlug: "cardion",
    label: "Measure what the chart had to guess at",
    body:
      "WHO's own next step for a reading of 10% or above is the laboratory chart, which needs a cholesterol result and a glucose result. The Heart Health Check now includes a lipid profile alongside blood sugar, uric acid, CRP and a full blood count.",
  },
};
