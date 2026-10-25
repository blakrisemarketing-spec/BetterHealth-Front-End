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
import { A_STAGES, G_STAGES } from "./kidney-check.js";

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

// --------------------------------------------------------------------------
// The kidney card.
//
// The one line worth carrying to somebody else's phone is the tool's own
// point: kidney disease is staged on two numbers and most people only ever get
// one. So `meaning` says that on every variant of this card, and the headline
// is whatever the person actually walked away with.
//
// Nothing personal goes on it: no name, no phone, no risk factor, and no
// symptom anyone ticked.
// --------------------------------------------------------------------------

// Two lengths, because the card's meaning text is drawn into whatever vertical
// room the rows above it left behind and is cut rather than overflowed. A
// variant carrying a stage row and a meter has room for about two lines; one
// carrying neither has room for four. Both say the same thing.
const KIDNEY_MEANING =
  "Kidney disease is staged on two numbers: one from blood, one from urine.";

const KIDNEY_MEANING_ROOMY =
  "Kidney disease is staged on two numbers, one from blood and one from urine. Damage can show in the urine before filtering falls, so one number on its own leaves half the picture out.";

export function kidneyShareSpec(result) {
  const b = { ...base("kidney-check", "Kidney Check"), meaning: KIDNEY_MEANING };
  const roomy = { ...b, meaning: KIDNEY_MEANING_ROOMY };
  const { numbers, screening, urgent, exclusion } = result;

  // Rule 3: nothing that needs prompt clinical attention gets dressed up as a
  // number on a card somebody forwards.
  if (urgent) {
    return withText({
      ...b,
      eyebrow: "Kidney check",
      headline: "One for a clinician",
      band: urgent.headline,
      meaning:
        "A single result is not a diagnosis, and this one is not a thing to sit on either. Chronic kidney disease needs the abnormality to persist beyond three months, which only a repeat can show.",
    });
  }

  if (exclusion) {
    return withText({
      ...b,
      eyebrow: "Kidney check",
      headline: "Not a number to compute",
      band: "This page will not estimate one here",
      meaning:
        "Some situations make an eGFR from creatinine read wrong in both directions, and printing one anyway would be worse than printing nothing.",
    });
  }

  // Both numbers staged: the full picture, which is the rarest card.
  if (numbers.g && numbers.a) {
    return withText({
      ...b,
      eyebrow: "Both halves, staged",
      headline: `${numbers.g.label} ${numbers.a.label}`,
      band: numbers.grid ? numbers.grid.label : `${numbers.g.name}, ${numbers.a.name.toLowerCase()}`,
      meter: { count: G_STAGES.length, active: G_STAGES.findIndex((x) => x.id === numbers.g.id) },
      rows: [{ label: "Urine albumin", value: numbers.a.label, note: numbers.a.name }],
    });
  }

  // An eGFR and a stage, but no urine result: the card that says so.
  if (numbers.g) {
    return withText({
      ...b,
      eyebrow: "Kidney function, half the picture",
      headline: `eGFR ${numbers.egfr.low} to ${numbers.egfr.high}`,
      band: `Stage ${numbers.g.label}, ${numbers.g.name.toLowerCase()}`,
      meter: { count: G_STAGES.length, active: G_STAGES.findIndex((x) => x.id === numbers.g.id) },
      rows: [{ label: "Still missing", value: "The urine half", note: "A urine albumin:creatinine ratio" }],
    });
  }

  // A urine result and no blood result.
  if (numbers.a) {
    return withText({
      ...b,
      eyebrow: "Urine albumin, half the picture",
      headline: `Stage ${numbers.a.label}`,
      band: numbers.a.name,
      meter: { count: A_STAGES.length, active: A_STAGES.findIndex((x) => x.id === numbers.a.id) },
      rows: [{ label: "Still missing", value: "The blood half", note: "A creatinine, for an eGFR" }],
    });
  }

  // A creatinine typed in but no eGFR to put it on, because the person ticked
  // one of the conditions in which KDIGO says the estimate is less accurate.
  if (numbers.creatinine) {
    const unit = numbers.creatinine.unit === "mgdl" ? "mg/dL" : "micromol/L";
    return withText({
      ...roomy,
      eyebrow: "Kidney check",
      headline: `Creatinine ${numbers.creatinine.typed}`,
      band: `${unit}, and no eGFR estimated from it`,
    });
  }

  // No numbers at all, which is what most people will share.
  return withText({
    ...roomy,
    eyebrow: "Kidney check",
    headline: screening.indicated ? "Worth checking" : "Not on the list today",
    band: screening.indicated
      ? `${screening.reasons.length} reason${screening.reasons.length === 1 ? "" : "s"} to test, and no result yet`
      : "No risk factor from the guideline list",
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

// --------------------------------------------------------------------------
// The family inheritance card.
//
// The card has room for two outcomes and no more, so when a couple picks three
// or four traits it carries the two that change a decision and says the rest
// are on the page. Nothing personal goes on it: no name, no phone, no raw
// answers, and no test result of either partner's, only what the pairing means
// for a future child.
// --------------------------------------------------------------------------

/** "a, b and c" for the line naming what did not fit on the card. */
function listOf(items) {
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** How much a section changes what a couple does. Highest goes on the headline. */
function consequence(section) {
  if (!section) return -1;
  switch (section.id || "genotype") {
    case "genotype": {
      if (section.kind === "unknown") return 65;
      const disease = section.groups?.find((g) => g.id === "disease");
      return disease && disease.percent > 0 ? 100 : 30;
    }
    case "g6pd":
      if (section.kind === "unknown") return 60;
      return section.sons.some((r) => r.status !== "normal") || section.daughters.some((r) => r.status !== "normal")
        ? 80
        : 25;
    case "rh":
      if (section.kind === "unknown") return 45;
      return section.pregnancy === "plan" ? 70 : 40;
    case "abo":
      if (section.kind === "unknown") return 44;
      return section.impossible.length > 0 ? 50 : 35;
    case "sex":
      return 5;
    default:
      return 0;
  }
}

/** One trait's outcome, compressed to a value and a line under it. */
function traitLine(id, section) {
  if (id === "genotype") {
    if (section.kind === "unknown") return { label: "Genotype", value: "Not yet", band: "One genotype still unconfirmed" };
    const disease = section.groups.find((g) => g.id === "disease");
    const pct = disease ? disease.percent : 0;
    return {
      label: "Genotype",
      value: `${pct}%`,
      band: pct > 0 ? "chance of a sickle cell condition, per pregnancy" : "no sickle cell condition possible from this pairing",
    };
  }
  if (id === "abo") {
    if (section.kind === "unknown") return { label: "Blood group", value: "Not known yet", band: "One blood group still untested" };
    if (section.determinable)
      return {
        label: "Blood group",
        value: section.percentages.map((p) => `${p.group} ${p.percent}%`).join(", "),
        band: "the only groups possible from this pairing",
      };
    // A x AB and B x AB: one share holds whichever allele the A or B parent
    // hides, so the card carries that exact figure rather than only the
    // exclusion. See aboOutcomes in src/data/tools/inheritance.js.
    if (section.certain?.length > 0)
      return {
        label: "Blood group",
        value: `Group ${section.certain[0].group} exactly ${section.certain[0].percent}%`,
        band: `whichever gene is hidden, and ${section.impossible.join(" and ")} ruled out`,
      };
    if (section.impossible.length > 0)
      return {
        label: "Blood group",
        value: `${section.impossible.join(" and ")} ruled out`,
        band: `${section.possible.join(", ")} all still possible`,
      };
    return { label: "Blood group", value: "All four possible", band: "A, B, AB and O all stay on the table" };
  }
  if (id === "rh") {
    if (section.kind === "unknown") return { label: "Rh factor", value: "Not known yet", band: "One Rh status still untested" };
    if (section.determinable) return { label: "Rh factor", value: "Rh negative", band: "the only result two Rh negatives can have" };
    if (section.pregnancy === "plan")
      return { label: "Rh factor", value: "Worth planning for", band: "an Rh negative mother, so antenatal care plans for it" };
    return { label: "Rh factor", value: "Either is possible", band: "positive and negative both stay on the table" };
  }
  if (id === "g6pd") {
    if (section.kind === "unknown") return { label: "G6PD", value: "Not tested yet", band: "The result splits by sons and daughters" };
    const sonsDeficient = section.sons.find((r) => r.status === "deficient")?.percent || 0;
    const daughtersAffected = section.daughters
      .filter((r) => r.status !== "normal")
      .reduce((sum, r) => sum + r.percent, 0);
    if (sonsDeficient > 0) return { label: "G6PD", value: `${sonsDeficient}% of sons`, band: "would be G6PD deficient" };
    if (daughtersAffected > 0)
      return { label: "G6PD", value: `${daughtersAffected}% of daughters`, band: "would carry a copy, and no son is affected" };
    return { label: "G6PD", value: "No child affected", band: "on the G6PD table for this pairing" };
  }
  return { label: "Boy or girl", value: "50 / 50", band: "every pregnancy, whatever came before" };
}

export function inheritanceShareSpec(result) {
  const b = base("genotype-compatibility", "Family Inheritance Calculator");
  const ranked = result.traits
    .map((id) => ({ id, section: result[id] }))
    .filter((t) => t.section)
    .map((t) => ({ ...t, line: traitLine(t.id, t.section), rank: consequence(t.section) }))
    .sort((a, b2) => b2.rank - a.rank);

  const [top, second] = ranked;
  const rest = ranked.slice(2).map((t) => t.line.label.toLowerCase());

  const single = ranked.length === 1;
  const meaning = single
    ? "Counted, not modelled: the same square a genetic counsellor draws on paper. A statement about probability, not a verdict on two people."
    : "Every line is counted from a published rule. Where there is no exact figure, the page says so.";

  return withText({
    ...b,
    eyebrow: single && result.genotype ? `${result.genotype.you} and ${result.genotype.partner}` : "What a child could inherit",
    headline: top.line.value,
    band: `${top.line.label}: ${top.line.band}`,
    rows: second ? [{ label: second.line.label, value: second.line.value, note: second.line.band }] : [],
    more: rest.length > 0 ? `Plus ${listOf(rest)} on the page.` : null,
    meaning,
  });
}

export function shareSpecFor(slug, result) {
  if (slug === "diabetes-risk") return diabetesShareSpec(result);
  if (slug === "heart-age") return heartShareSpec(result);
  if (slug === "bmi-waist") return bmiShareSpec(result);
  if (slug === "kidney-check") return kidneyShareSpec(result);
  // The multi-trait result carries a `traits` list; the genotype-only result
  // that computeGenotypeFull returns does not, and keeps its original card.
  if (slug === "genotype-compatibility") return result?.traits ? inheritanceShareSpec(result) : genotypeShareSpec(result);
  return null;
}
