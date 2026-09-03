// What goes on the shareable result card, per tool.
//
// Pure. The drawing happens in src/components/tools/ShareResult.jsx; this
// module only decides the words, so the tests can pin them. The card carries
// the person's result and nothing else personal: no name, no phone, no raw
// answers, and nothing from Part 2.

import { TOOL_DISCLAIMER } from "./index.js";
import { RISK_BANDS as FINDRISC_BANDS } from "./diabetes-risk.js";
import { RISK_BANDS as HEART_BANDS } from "./heart-age.js";
import { BMI_BANDS_ADJUSTED } from "./bmi-waist.js";

export const SHARE_HOST = "betterhealth.africa";

function base(slug, title) {
  return {
    slug,
    title,
    url: `${SHARE_HOST}/tools/${slug}`,
    href: `https://${SHARE_HOST}/tools/${slug}`,
    disclaimer: TOOL_DISCLAIMER,
    meter: null,
  };
}

function withText(spec) {
  const text = `My ${spec.title} result: ${spec.headline}, ${spec.band}. Try yours free at ${spec.href}`;
  return { ...spec, text, fileName: `betterhealth-${spec.slug}.png` };
}

export function diabetesShareSpec(result) {
  const { score, band } = result;
  return withText({
    ...base("diabetes-risk", "Diabetes Risk Score"),
    eyebrow: "FINDRISC score",
    headline: `${score} out of 26`,
    band: `${band.label} band`,
    meaning: "A questionnaire score, not a blood test. FINDRISC is a prompt to test, and the test that settles it is HbA1c.",
    meter: { count: FINDRISC_BANDS.length, active: FINDRISC_BANDS.findIndex((b) => b.id === band.id) },
  });
}

export function heartShareSpec(result) {
  const b = base("heart-age", "Heart Age Check");
  if (result.kind === "unknown") {
    return withText({
      ...b,
      eyebrow: "WHO chart, Western Sub-Saharan Africa",
      headline: "One number short",
      band: "No blood pressure reading yet",
      meaning: "Blood pressure is the one input on the chart you cannot estimate. A pharmacy takes it in two minutes.",
    });
  }
  if (result.kind === "outOfRange") {
    return withText({
      ...b,
      eyebrow: "WHO chart, Western Sub-Saharan Africa",
      headline: "Outside 40 to 74",
      band: "No published cell for this age",
      meaning: "WHO publishes the chart for ages 40 to 74 only, and this tool does not guess past its edge.",
    });
  }
  const { risk, band } = result;
  return withText({
    ...b,
    eyebrow: "WHO chart, Western Sub-Saharan Africa",
    headline: `${risk}%`,
    band: `${band.label} 10-year risk`,
    meaning: "A printed cell from the WHO 2019 chart for the region Ghana sits in: an estimate from population data, not a statement about one person.",
    meter: { count: HEART_BANDS.length, active: HEART_BANDS.findIndex((x) => x.id === band.id) },
  });
}

export function bmiShareSpec(result) {
  const { bmi, bmiBand, whtrApplies, whtrBand, waistBand } = result;
  const waistLine = whtrApplies && whtrBand
    ? `Waist to height: ${whtrBand.label.toLowerCase()}.`
    : `Waist: ${waistBand.label.toLowerCase()} on the WHO cut-points.`;
  return withText({
    ...base("bmi-waist", "BMI and Waist Calculator"),
    eyebrow: "BMI on NICE's thresholds",
    headline: `BMI ${bmi.toFixed(1)}`,
    band: bmiBand.label,
    meaning: `${waistLine} Read on the thresholds NICE sets for Black African backgrounds, with the waist measurement BMI leaves out.`,
    meter: { count: BMI_BANDS_ADJUSTED.length, active: BMI_BANDS_ADJUSTED.findIndex((x) => x.id === bmiBand.id) },
  });
}

export function genotypeShareSpec(result) {
  const b = base("genotype-compatibility", "Genotype Compatibility Calculator");
  if (result.kind === "unknown") {
    return withText({
      ...b,
      eyebrow: "Punnett square",
      headline: "Not yet",
      band: "One genotype still unconfirmed",
      meaning: "A Punnett square needs two confirmed results. Haemoglobin electrophoresis states a genotype outright.",
    });
  }
  const disease = result.groups.find((g) => g.id === "disease");
  const pct = disease ? disease.percent : 0;
  return withText({
    ...b,
    eyebrow: `${result.you} and ${result.partner}`,
    headline: `${pct}%`,
    band: pct > 0 ? "chance of a sickle cell condition, per pregnancy" : "no sickle cell condition possible from this pairing",
    meaning: "The same Punnett square a genetic counsellor draws on paper. A statement about probability, not a verdict on two people.",
  });
}

export function shareSpecFor(slug, result) {
  if (slug === "diabetes-risk") return diabetesShareSpec(result);
  if (slug === "heart-age") return heartShareSpec(result);
  if (slug === "bmi-waist") return bmiShareSpec(result);
  if (slug === "genotype-compatibility") return genotypeShareSpec(result);
  return null;
}
