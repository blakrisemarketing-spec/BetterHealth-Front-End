// Interactive tool 2: the Diabetes Risk Score (FINDRISC).
//
// Pure data + maths. No JSX and no browser globals: src/data/seo.js imports
// this module on the Node side at build time.
//
// SOURCE: the Finnish Diabetes Risk Score (FINDRISC), Lindstrom J, Tuomilehto J.
// "The diabetes risk score: a practical tool to predict type 2 diabetes risk."
// Diabetes Care 2003;26(3):725-731. Item scores implemented here, exactly:
//
//   Age                 under 45 = 0 | 45 to 54 = 2 | 55 to 64 = 3 | over 64 = 4
//   BMI                 under 25 = 0 | 25 to 30 = 1 | over 30 = 3
//   Waist (men)         under 94cm = 0 | 94 to 102 = 3 | over 102 = 4
//   Waist (women)       under 80cm = 0 | 80 to 88 = 3 | over 88 = 4
//   30 min activity     yes = 0 | no = 2
//   Vegetables/fruit    daily = 0 | not daily = 1
//   BP medication       no = 0 | yes = 2
//   High glucose found  no = 0 | yes = 5
//   Family history      none = 0 | grandparent/aunt/uncle/cousin = 3
//                                | parent/sibling/own child = 5
//
//   Total 0 to 26. Bands: under 7 low | 7 to 11 slightly elevated
//                       | 12 to 14 moderate | 15 to 20 high | over 20 very high
//
// Sex is collected but scores nothing. It is here only because the waist
// thresholds above are sex-specific; FINDRISC has no sex item of its own. It
// therefore shares the waist screen rather than taking one of its own, which
// keeps the tool at eight steps and eight scored items.
//
// HONESTY NOTE, carried into the result copy on purpose: FINDRISC was
// developed and validated in Finland and performs less consistently outside
// the populations it was built on. It is a prompt to test, not an answer.
// Diagnostic thresholds quoted in the copy come from the site's own vetted
// articles (src/data/blog/posts/hba1c-explained.js,
// prediabetes-warning-signs.js, diabetes-test-types-explained.js).

/** BMI in kg/m2 from centimetres and kilograms. Null when either is unusable. */
export function bmiFrom(heightCm, weightKg) {
  const h = Number(heightCm);
  const w = Number(weightKg);
  if (!(h > 0) || !(w > 0)) return null;
  const m = h / 100;
  return w / (m * m);
}

/** FINDRISC BMI item: under 25 = 0, 25 to 30 = 1, over 30 = 3. */
export function bmiPoints(bmi) {
  if (bmi === null || Number.isNaN(bmi)) return 0;
  if (bmi < 25) return 0;
  if (bmi <= 30) return 1;
  return 3;
}

/** FINDRISC waist item, in centimetres, by sex. */
export function waistPoints(waistCm, sex) {
  const w = Number(waistCm);
  if (!(w > 0)) return 0;
  if (sex === "female") {
    if (w < 80) return 0;
    if (w <= 88) return 3;
    return 4;
  }
  if (w < 94) return 0;
  if (w <= 102) return 3;
  return 4;
}

export const RISK_BANDS = [
  {
    id: "low",
    min: 0,
    max: 6,
    label: "Low",
    headline: "Your FINDRISC score is in the low band.",
  },
  {
    id: "slightly",
    min: 7,
    max: 11,
    label: "Slightly elevated",
    headline: "Your FINDRISC score is in the slightly elevated band.",
  },
  {
    id: "moderate",
    min: 12,
    max: 14,
    label: "Moderate",
    headline: "Your FINDRISC score is in the moderate band.",
  },
  {
    id: "high",
    min: 15,
    max: 20,
    label: "High",
    headline: "Your FINDRISC score is in the high band.",
  },
  {
    id: "veryHigh",
    min: 21,
    max: 26,
    label: "Very high",
    headline: "Your FINDRISC score is in the very high band.",
  },
];

export function bandFor(score) {
  return RISK_BANDS.find((b) => score >= b.min && score <= b.max) || RISK_BANDS[0];
}

// Steps, one per screen. `kind` tells the component what to render.
export const STEPS = [
  {
    id: "age",
    kind: "choice",
    text: "How old are you?",
    options: [
      { value: "u45", label: "Under 45", points: 0 },
      { value: "45to54", label: "45 to 54", points: 2 },
      { value: "55to64", label: "55 to 64", points: 3 },
      { value: "o64", label: "Over 64", points: 4 },
    ],
  },
  {
    id: "body",
    kind: "measurements",
    text: "How tall are you, and what do you weigh?",
    help: "We work out your BMI from these two. Nothing is stored on our side until you ask for the result.",
    fields: [
      { id: "heightCm", label: "Height", unit: "cm", min: 100, max: 250, placeholder: "170" },
      { id: "weightKg", label: "Weight", unit: "kg", min: 25, max: 300, placeholder: "72" },
    ],
  },
  {
    id: "waist",
    kind: "number",
    text: "What is your waist measurement?",
    help: "Measure around the middle, level with the belly button, standing and breathing out normally. Keep the tape snug, not tight.",
    // The selector is unscored. It only picks which published waist cut-off to
    // read the number against, so it belongs on this screen rather than on one
    // of its own.
    choice: {
      id: "sex",
      label: "Which waist range should we use?",
      help: "FINDRISC sets the cut-off differently for men and for women, and this is the only thing it changes.",
      options: [
        { value: "male", label: "The men's range" },
        { value: "female", label: "The women's range" },
      ],
    },
    field: { id: "waistCm", label: "Waist", unit: "cm", min: 40, max: 200, placeholder: "88" },
  },
  {
    id: "activity",
    kind: "choice",
    text: "Do you get at least 30 minutes of physical activity on most days?",
    help: "Count work and housework as well as sport and walking.",
    options: [
      { value: "yes", label: "Yes, most days", points: 0 },
      { value: "no", label: "No", points: 2 },
    ],
  },
  {
    id: "diet",
    kind: "choice",
    text: "Do you eat vegetables or fruit every day?",
    options: [
      { value: "yes", label: "Yes, every day", points: 0 },
      { value: "no", label: "Not every day", points: 1 },
    ],
  },
  {
    id: "bpMeds",
    kind: "choice",
    text: "Have you ever taken blood pressure medication regularly?",
    options: [
      { value: "no", label: "No", points: 0 },
      { value: "yes", label: "Yes", points: 2 },
    ],
  },
  {
    id: "highGlucose",
    kind: "choice",
    text: "Have you ever been found to have a high blood glucose reading?",
    help: "For example at a health screening, during an illness, or in pregnancy.",
    options: [
      { value: "no", label: "No", points: 0 },
      { value: "yes", label: "Yes", points: 5 },
    ],
  },
  {
    id: "family",
    kind: "choice",
    text: "Has anyone in your family been diagnosed with diabetes?",
    options: [
      { value: "none", label: "No", points: 0 },
      { value: "extended", label: "Yes: grandparent, aunt, uncle or cousin", points: 3 },
      { value: "close", label: "Yes: parent, brother, sister or my own child", points: 5 },
    ],
  },
];

// Labels for the "what is driving your score" list, plus whether the item is
// one a person can act on. Age and family history score points and cannot be
// changed, so the result says so rather than implying otherwise.
const ITEM_LABELS = {
  age: { label: "Your age", movable: false },
  bmi: { label: "Your BMI", movable: true },
  waist: { label: "Your waist measurement", movable: true },
  activity: { label: "Physical activity", movable: true },
  diet: { label: "Vegetables and fruit", movable: true },
  bpMeds: { label: "Blood pressure medication", movable: false },
  highGlucose: { label: "A past high blood glucose reading", movable: false },
  family: { label: "Family history of diabetes", movable: false },
};

/**
 * Score a completed set of answers.
 *
 * @param {{ age, sex, heightCm, weightKg, waistCm, activity, diet, bpMeds, highGlucose, family }} input
 * @returns {{ score, band, bmi, items, topItems, answers, healthInterest }}
 */
export function computeFindrisc(input) {
  const pointsFor = (stepId) => {
    const step = STEPS.find((s) => s.id === stepId);
    const opt = step?.options?.find((o) => o.value === input[stepId]);
    return opt ? opt.points : 0;
  };

  const bmi = bmiFrom(input.heightCm, input.weightKg);
  const items = [
    { id: "age", points: pointsFor("age") },
    { id: "bmi", points: bmiPoints(bmi) },
    { id: "waist", points: waistPoints(input.waistCm, input.sex) },
    { id: "activity", points: pointsFor("activity") },
    { id: "diet", points: pointsFor("diet") },
    { id: "bpMeds", points: pointsFor("bpMeds") },
    { id: "highGlucose", points: pointsFor("highGlucose") },
    { id: "family", points: pointsFor("family") },
  ].map((i) => ({ ...i, ...ITEM_LABELS[i.id] }));

  const score = items.reduce((sum, i) => sum + i.points, 0);
  const band = bandFor(score);

  // The two or three items carrying the most weight for this person. Ties
  // resolve in the fixed item order above so the list is stable.
  const topItems = items
    .filter((i) => i.points > 0)
    .sort((a, b) => b.points - a.points)
    .slice(0, 3);

  return {
    score,
    band,
    bmi,
    items,
    topItems,
    healthInterest: "dialics",
    answers: {
      age: input.age,
      sex: input.sex,
      bmi: bmi ? bmi.toFixed(1) : "",
      waistCm: String(input.waistCm || ""),
      activity: input.activity,
      diet: input.diet,
      bpMeds: input.bpMeds,
      highGlucose: input.highGlucose,
      family: input.family,
      score: String(score),
      band: band.label,
    },
  };
}

export default {
  slug: "diabetes-risk",
  title: "Diabetes Risk Score",
  shortTitle: "Diabetes Risk Score",
  eyebrow: "Free 2-minute calculator",
  promise:
    "Eight questions about your age, your body, what you eat and what runs in your family. At the end: your FINDRISC score out of 26, the band it sits in, and the two or three answers doing the most work.",
  description:
    "Score your type 2 diabetes risk out of 26 with the FINDRISC questionnaire. Free, 2 minutes, and it shows which of your answers weigh most. No sign-up.",
  format: "8 questions, instant score",
  bullets: [
    "The FINDRISC questionnaire, scored exactly as published",
    "Your score out of 26 and the band it falls in",
    "The two or three answers driving your score",
    "Where the score is reliable, and where it is not",
  ],
  intro:
    "Eight questions, one screen at a time. Have a tape measure nearby if you have one; if not, an estimate of your waist is better than skipping it.",
  sections: [
    {
      heading: "What FINDRISC is",
      paragraphs: [
        "FINDRISC is a questionnaire, not a blood test. It scores eight things that are already known about you, out of a possible 26. It needs no needle, no laboratory and no fasting.",
        "It was built in Finland in the early 2000s to find adults who should be sent for a glucose test, and it is still used that way in screening programmes around the world. It was designed as a filter that costs nothing to administer.",
      ],
    },
    {
      heading: "What it cannot do",
      paragraphs: [
        "A questionnaire cannot measure your blood sugar. FINDRISC estimates the chance that a test would find something, which is a different question from what your blood sugar is today.",
        "The score was developed and validated in Finland, and it performs less consistently in populations it was not built on. Treat a score from it as a reason to test, not as a result.",
      ],
      callout:
        "The test that settles the question is HbA1c, which shows your average blood sugar over the past two to three months. Normal is below 5.7%, prediabetes is 5.7% to 6.4%, and 6.5% or above is in the diabetes range, usually confirmed on a second test.",
    },
  ],
  sources: [
    { label: "Lindstrom J, Tuomilehto J. The diabetes risk score. Diabetes Care 2003;26(3):725-731 (FINDRISC)" },
    { label: "ADA Standards of Care 2024; WHO 2006 diabetes criteria (HbA1c and fasting glucose bands)" },
    { label: "What is HbA1c? Your 3-month blood sugar average", url: "/blog/hba1c-explained" },
    { label: "Prediabetes: the warning window before diabetes develops", url: "/blog/prediabetes-warning-signs" },
    { label: "Diabetes tests explained: fasting glucose, HbA1c and OGTT compared", url: "/blog/diabetes-test-types-explained" },
  ],
  cta: {
    kind: "panel",
    panelSlug: "dialics",
    label: "Find out where your blood sugar actually is",
    body:
      "The Blood Sugar Check covers HbA1c for the three-month average, a fasting or random glucose for today, and a urine test that shows whether sugar or protein is spilling through.",
  },
};
