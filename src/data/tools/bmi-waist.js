// Interactive tool 4: the BMI and Waist Calculator.
//
// Pure data + maths. No JSX and no browser globals: src/data/seo.js imports
// this module on the Node side at build time.
//
// ============================ SOURCE OF THE NUMBERS ==========================
//
// 1. BMI, weight in kilograms divided by height in metres squared, read
//    against the WHO international adult classification:
//      under 18.5     underweight
//      18.5 to 24.9   healthy range (WHO prints this as "normal range")
//      25.0 to 29.9   overweight (WHO's "pre-obese")
//      30.0 and above obese
//    WHO. Obesity: preventing and managing the global epidemic. Report of a
//    WHO Consultation. WHO Technical Report Series 894. Geneva: WHO; 2000.
//    Table 2.1. Restated in WHO's Obesity and overweight fact sheet, 2024.
//    https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight
//
// 2. Waist circumference, read against the WHO cut-points for increased and
//    substantially increased risk of metabolic complications:
//      men     94cm or more = increased    102cm or more = substantially increased
//      women   80cm or more = increased     88cm or more = substantially increased
//    WHO. Waist circumference and waist-hip ratio: report of a WHO expert
//    consultation, Geneva, 8-11 December 2008. Geneva: WHO; 2011.
//    ISBN 978 92 4 150149 1. https://iris.who.int/handle/10665/44583
//    PROVENANCE, which matters and is rarely stated. Annex A1 of that report
//    traces the four numbers to two European studies published in 1995:
//      Lean ME, Han TS, Morrison CE. Waist circumference as a measure for
//      indicating need for weight management. BMJ 1995;311(6998):158-61.
//      (North Glasgow.)
//      Han TS, van Leer EM, Seidell JC, Lean ME. Waist circumference action
//      levels in the identification of cardiovascular risk factors: prevalence
//      study in a random sample. BMJ 1995;311(7017):1401-5. (2183 men and 2698
//      women aged 20-59, Amsterdam and Maastricht.)
//    Annex A1 also notes that the sex-specific cut-off points printed in the
//    WHO 2000 obesity report "were an example only and not WHO
//    recommendations", so "the WHO cut-points" is looser usage than it sounds.
//    The same 94/80cm pair are the Europid values in the IDF worldwide
//    definition of the metabolic syndrome (IDF, 2006).
//    These four numbers are NOT retyped here. They are imported from
//    src/data/tools/diabetes-risk.js, which already carries them for the
//    FINDRISC waist item, so the site holds one copy of each.
//
// 3. Waist-to-height ratio, waist divided by height in the same unit, with the
//    boundary at 0.5: keep your waist to less than half your height.
//    NICE. Overweight and obesity management. NICE guideline NG246. London:
//    NICE; published 14 January 2025 (it replaces CG189, 2014). NG246 classifies
//    central adiposity by waist-to-height ratio in adults with a BMI under
//    35 kg/m2, "of both sexes and all ethnicities": 0.4 to 0.49 healthy,
//    0.5 to 0.59 increased, 0.6 or more high. It also tells adults under that
//    BMI to measure their own ratio.
//    https://www.nice.org.uk/guidance/ng246 (recommendations 1.9.8, 1.9.14 and
//    1.9.15; last updated 8 January 2026). Rec 1.9.15 is the source of the
//    plain-English wording this tool leads on: clinicians are told to explain
//    that a person "should try and keep their waist to less than half their
//    height (so a waist-to-height ratio of under 0.5)".
//    Underlying evidence: Ashwell M, Gunn P, Gibson S. Waist-to-height ratio
//    is a better screening tool than waist circumference and BMI for adult
//    cardiometabolic risk factors: systematic review and meta-analysis.
//    Obes Rev 2012;13(3):275-86. doi:10.1111/j.1467-789X.2011.00952.x
//    That meta-analysis shows WHtR discriminates cardiometabolic risk better
//    than BMI and waist circumference. It does NOT establish 0.5 as a
//    validated boundary in every ethnic group. Do not conflate the two.
//    DO NOT WRITE "WHO recommends keeping your waist under half your height."
//    WHO does not. Section 5.1 of the 2011 waist report says there was
//    "insufficient data on other proxy measures (e.g. waist-height ratio), to
//    suggest giving other measures any priority at present". The 0.5 rule on
//    this page is NICE's, and NICE is a UK body.
//    The one piece of prospective African evidence for 0.5 found:
//      Ware LJ, Rennie KL, Kruger HS, et al. Evaluation of waist-to-height
//      ratio to predict 5 year cardiometabolic risk in sub-Saharan African
//      adults. Nutr Metab Cardiovasc Dis 2014;24(8):900-7. 577 men and 942
//      women, North West Province, South Africa. One country, one cohort.
//
// 4. Waist-to-hip ratio, waist divided by hip. OPTIONAL, and the only number
//    on this page whose cut-points were derived in Ghanaians.
//      men    0.90 or more
//      women  0.88 or more
//    Frank LK, Heraclides A, Danquah I, Bedu-Addo G, Mockenhaupt FP,
//    Schulze MB. Measures of general and central obesity and risk of type 2
//    diabetes in a Ghanaian population. Trop Med Int Health 2013;18(2):141-51.
//    doi:10.1111/tmi.12024. A case-control study in urban Ghana (1221 adults)
//    against a TYPE 2 DIABETES outcome. It found waist-to-hip ratio
//    outperformed both BMI and waist circumference, and that "recommended
//    cut-off points for body mass index and waist circumference had a poor
//    predictive ability" in this population.
//    Corroborated on the ordering of the indices, though not on the numbers:
//      Darko SN, Meeks KAC, Owiredu WKBA, et al. Anthropometric indices and
//      their cut-off points in relation to type 2 diabetes among Ghanaian
//      migrants and non-migrants: the RODAM study. Diabetes Res Clin Pract
//      2021;173:108687. doi:10.1016/j.diabres.2021.108687. Also found
//      waist-to-hip ratio outperformed BMI and waist circumference.
//    IMPORTANT: 0.90 and 0.88 are STUDY-DERIVED optima against one outcome in
//    one Ghanaian sample. They are not a guideline threshold, no body has
//    adopted them, and the copy must say so. They are on this page because
//    they are the only cut-points here derived in Ghanaians at all, which is
//    more than the waist thresholds can claim.
//    Hip is optional so that someone without a tape measure to hand still gets
//    a complete result from the other three numbers.
//
// ===================== POPULATION VARIATION IN THE CUT-POINTS =================
//
// Carried into the result copy on purpose, because it is the thing most BMI
// calculators leave out.
//
//   - WHO has formally examined whether the BMI cut-points should differ by
//     population once, for Asian populations. The WHO expert consultation
//     (Lancet 2004;363(9403):157-63, doi:10.1016/S0140-6736(03)15268-3)
//     concluded that Asian populations have a higher percentage of body fat
//     and higher cardiovascular risk at a lower BMI than European populations
//     do. It did NOT replace the international classification. It kept 18.5,
//     25 and 30 as the international cut-points and added additional "public
//     health action points" at 23, 27.5, 32.5 and 37.5 kg/m2 for Asian
//     populations, for countries choosing to define their own action points.
//   - No equivalent WHO consultation has been held for African populations,
//     and WHO has not published African-specific BMI or waist cut-points.
//   - NICE does. NG246 recommendation 1.9.11 tells UK clinicians to use LOWER
//     BMI thresholds for people of South Asian, Chinese, other Asian, Middle
//     Eastern, Black African or African-Caribbean background, because these
//     groups "are prone to central adiposity and their cardiometabolic risk
//     occurs at lower BMI": overweight 23 to 27.4 kg/m2, obesity 27.5 or
//     above. That is a UK guideline position rather than a WHO one, and it
//     applies directly to this tool's readers, so the result copy carries it.
//     The BMI bands this tool computes stay WHO's, and the copy says which is
//     which. Note the contrast with rec 1.9.14, which applies the SAME
//     waist-to-height bands to "both sexes and all ethnicities": NICE adjusts
//     BMI for ethnicity and does not adjust waist-to-height ratio.
//   - The WHO 2008 waist consultation asked whether action levels should differ
//     by sex, age, ethnicity, country or region, and set no new numbers:
//     "Making definitive decisions on actual cut-off points was outside the
//     scope of the consultation" (section 5). On sub-Saharan Africa it is
//     explicit (section 4.4): only one analysis had reported waist cut-off
//     points in Africans, recommending 75.6cm and 80.5cm for men and 71.5cm
//     and 81.5cm for women of Nigerian and Cameroonian origin for identifying
//     hypertension (Okosun et al., 2000), and "given that no other studies
//     have investigated cut-offs in this population group, there is
//     insufficient evidence for recommending specific cut-offs for
//     sub-Saharan Africans".
//   - Section 3.5 of that report points the OPPOSITE way from the Asian case:
//     "African populations and, possibly, Pacific Islanders have less visceral
//     adipose tissue or percentage of body fat at any given waist
//     circumference", which it gives as a possible indication of a need for
//     HIGHER cut-offs than the European reference. Do not write that African
//     cut-offs should be lower. Do not write that they should be higher
//     either. Neither is established.
//     Overview paper: Nishida C, Ko GT, Kumanyika S. Body fat distribution and
//     noncommunicable diseases in populations: overview of the 2008 WHO Expert
//     Consultation on Waist Circumference and Waist-Hip Ratio. Eur J Clin Nutr
//     2010;64(1):2-5.
//   - IDF (2006) gives the 94/80cm figures as Europid values, and instructs
//     that for sub-Saharan African populations the European data should be
//     used until specific data are available. That is an explicit placeholder,
//     not a finding.
//   - African studies have proposed their own waist cut-offs and do not agree
//     with one another, in both directions:
//       Ekoru K, Murphy GAV, Young EH, et al. Deriving an optimal threshold of
//       waist circumference for detecting cardiometabolic risk in sub-Saharan
//       Africa. Int J Obes 2018;42(3):487-94. doi:10.1038/ijo.2017.240
//       Pooled 24,181 adults, 17 studies, 8 countries (Benin, Nigeria, DR
//       Congo, Uganda, Kenya, Tanzania, South Africa, Seychelles). Optimal
//       81.2cm men (well BELOW the 94cm in use) and 81.0cm women (close to the
//       80cm in use).
//       Crowther NJ, Norris SA. The current waist circumference cut point used
//       for the diagnosis of metabolic syndrome in sub-Saharan African women is
//       not appropriate. PLoS One 2012;7(11):e48883.
//       doi:10.1371/journal.pone.0048883. Optimal 91.5cm for South African
//       women, well ABOVE the 80cm in use; Motala et al. had found 92cm.
//       Okosun IS, Rotimi CN, Forrester TE, et al. Predictive value of
//       abdominal obesity cut-off points for hypertension in blacks from west
//       African and Caribbean island nations. Int J Obes Relat Metab Disord
//       2000;24(2):180-6. 71.5cm and 81.5cm for women, well BELOW.
//     Across those studies the published optima for women run from roughly
//     72cm to roughly 92cm, which is the spread the copy describes. No expert
//     body has adopted any of them.
//     No waist cut-off study specific to Ghana was found, so the copy does not
//     claim one. Ghanaian evidence that does exist (Frank et al., Trop Med Int
//     Health 2013;18(2):141-51; Darko et al., Diabetes Res Clin Pract
//     2021;173:108687) points to waist-based measures beating BMI for
//     predicting type 2 diabetes, not to a particular cut-point.
//   - The waist-to-height boundary of 0.5 has been examined across a wider
//     range of populations than the BMI cut-points, and 0.5 has held up
//     reasonably consistently, which is part of why NICE recommends it.
//     It is still not an African-derived boundary.
//
// Screening intervals quoted in the copy come from the site's own vetted
// article, src/data/blog/posts/preventive-health-screening-ghana.js.

import { WAIST_THRESHOLDS } from "./diabetes-risk.js";
// Part 2 of this tool lives in lifestyle.js and never touches the bands. Its
// sources are spread into this tool's list below so they render on the page.
import { LIFESTYLE_SOURCES } from "./lifestyle.js";

export { WAIST_THRESHOLDS };

/**
 * Round to the precision the band is published at, so the figure the reader
 * sees and the band it is put in can never contradict each other. NICE prints
 * its BMI thresholds to one decimal (23.0, 27.4, 27.5) and its waist-to-height
 * bands to two (0.49, 0.5, 0.59), and the Ghanaian waist-to-hip optima are
 * published to two (0.90, 0.88), so each number is banded at its own published
 * precision rather than at full floating-point precision. Without this a BMI
 * of 22.96 would print as 23.0 and still be called the healthy range.
 */
export function roundTo(value, places) {
  if (value === null || value === undefined || Number.isNaN(value)) return null;
  const f = 10 ** places;
  return Math.round(value * f) / f;
}

/** BMI in kg/m2 from centimetres and kilograms. Null when either is unusable. */
export function bmiFrom(heightCm, weightKg) {
  const h = Number(heightCm);
  const w = Number(weightKg);
  if (!(h > 0) || !(w > 0)) return null;
  const m = h / 100;
  return w / (m * m);
}

/**
 * The BMI bands this tool leads with. NICE guideline NG246 recommendation
 * 1.9.11 tells clinicians to use LOWER thresholds for people of South Asian,
 * Chinese, other Asian, Middle Eastern, Black African or African-Caribbean
 * background, "because they are prone to central adiposity and their
 * cardiometabolic risk occurs at lower BMI": overweight 23 to 27.4, obesity
 * 27.5 or above. This site's readers are overwhelmingly in one of those
 * groups, so applying the 25 and 30 figures here would under-flag exactly the
 * people the tool exists for. NICE does not move the 18.5 underweight
 * threshold, so it stays.
 *
 * `max` is exclusive, so 22.9 is in the healthy range and 23.0 is overweight.
 */
export const BMI_BANDS_ADJUSTED = [
  { id: "underweight", max: 18.5, label: "Underweight", range: "Under 18.5", healthy: false },
  { id: "healthy", max: 23, label: "Healthy range", range: "18.5 to 22.9", healthy: true },
  { id: "overweight", max: 27.5, label: "Overweight", range: "23.0 to 27.4", healthy: false },
  { id: "obese", max: Infinity, label: "Obesity", range: "27.5 and above", healthy: false },
];

/**
 * The WHO international adult classification, shown alongside as the
 * general-population comparison rather than as this tool's default.
 * WHO. Obesity: preventing and managing the global epidemic. WHO Technical
 * Report Series 894. Geneva: WHO; 2000, Table 2.1.
 */
export const BMI_BANDS_GENERAL = [
  { id: "underweight", max: 18.5, label: "Underweight", range: "Under 18.5", healthy: false },
  { id: "healthy", max: 25, label: "Healthy range", range: "18.5 to 24.9", healthy: true },
  { id: "overweight", max: 30, label: "Overweight", range: "25.0 to 29.9", healthy: false },
  { id: "obese", max: Infinity, label: "Obesity", range: "30.0 and above", healthy: false },
];

/** NICE scopes waist-to-height ratio to adults with a BMI under this figure. */
export const WHTR_BMI_CEILING = 35;

function bandIn(bands, bmi) {
  if (bmi === null || bmi === undefined || Number.isNaN(bmi)) return null;
  return bands.find((b) => bmi < b.max) || bands[bands.length - 1];
}

/** The band this tool leads with: NICE's adjusted thresholds. */
export function bmiBandFor(bmi) {
  return bandIn(BMI_BANDS_ADJUSTED, bmi);
}

/** The same BMI read against the WHO general-population bands. */
export function bmiBandGeneralFor(bmi) {
  return bandIn(BMI_BANDS_GENERAL, bmi);
}

/** The waist cut-points that apply to one sex, defaulting to the men's set. */
export function waistThresholdsFor(sex) {
  return WAIST_THRESHOLDS[sex === "female" ? "female" : "male"];
}

/**
 * The WHO waist band, using WHO's own "or more" boundaries.
 *
 * @param {number} waistCm
 * @param {"male"|"female"} sex
 * @returns {{ id, label, healthy, increased, substantial } | null}
 */
export function waistBandFor(waistCm, sex) {
  const w = Number(waistCm);
  if (!(w > 0)) return null;
  const t = waistThresholdsFor(sex);
  const base = { increased: t.increased, substantial: t.substantial };
  if (w >= t.substantial) {
    return { ...base, id: "substantial", label: "Substantially increased risk", healthy: false };
  }
  if (w >= t.increased) {
    return { ...base, id: "increased", label: "Increased risk", healthy: false };
  }
  return { ...base, id: "below", label: "Below both cut-points", healthy: true };
}

/**
 * Waist-to-hip cut-points derived in a Ghanaian sample against a type 2
 * diabetes outcome (Frank et al. 2013, see the header). Study-derived, not a
 * guideline threshold, and the copy says so wherever these are shown.
 */
export const WHR_THRESHOLDS = { male: 0.9, female: 0.88 };

/** Waist divided by hip, both in centimetres. Null when either is unusable. */
export function whrFrom(waistCm, hipCm) {
  const w = Number(waistCm);
  const h = Number(hipCm);
  if (!(w > 0) || !(h > 0)) return null;
  return w / h;
}

/** The waist-to-hip band for one sex. Null when there is no hip measurement. */
export function whrBandFor(ratio, sex) {
  if (ratio === null || ratio === undefined || Number.isNaN(ratio)) return null;
  const cut = WHR_THRESHOLDS[sex === "female" ? "female" : "male"];
  if (ratio >= cut) {
    return { id: "over", label: "At or above the Ghanaian study cut-off", healthy: false, cut };
  }
  return { id: "under", label: "Below the Ghanaian study cut-off", healthy: true, cut };
}

/** Waist divided by height, both in centimetres. Null when either is unusable. */
export function whtrFrom(waistCm, heightCm) {
  const w = Number(waistCm);
  const h = Number(heightCm);
  if (!(w > 0) || !(h > 0)) return null;
  return w / h;
}

/**
 * The waist-to-height band. NICE NG246 recommendation 1.9.14 gives three:
 * 0.4 to 0.49 healthy, 0.5 to 0.59 increased, 0.6 or more high. Above the
 * healthy band this tool keeps the plain-English wording of rec 1.9.15, which
 * is the memorable half.
 */
export function whtrBandFor(ratio) {
  if (ratio === null || ratio === undefined || Number.isNaN(ratio)) return null;
  if (ratio < 0.5) {
    return { id: "healthy", label: "Less than half your height", healthy: true };
  }
  if (ratio < 0.6) {
    return { id: "increased", label: "Half your height or more", healthy: false };
  }
  return { id: "high", label: "Six tenths of your height or more", healthy: false };
}

// Two screens. Sex is unscored on its own: it only picks which published waist
// cut-off the number is read against, so it rides the waist screen the way it
// does in the FINDRISC tool rather than taking a screen of its own.
export const STEPS = [
  {
    id: "body",
    kind: "measurements",
    text: "How tall are you, and what do you weigh?",
    help: "These two give your BMI, and your height is also what your waist gets compared against. Nothing is stored on our side until you ask for the result.",
    fields: [
      { id: "heightCm", label: "Height", unit: "cm", min: 100, max: 250, placeholder: "170" },
      { id: "weightKg", label: "Weight", unit: "kg", min: 25, max: 300, placeholder: "72" },
    ],
  },
  {
    id: "waist",
    kind: "number",
    text: "What is your waist measurement?",
    help: "Measure around the middle, level with the belly button, standing and breathing out normally. Keep the tape snug, not tight. This is the measurement BMI cannot give you.",
    choice: {
      id: "sex",
      label: "Which waist cut-points should we use?",
      help: "WHO publishes a different pair of waist figures for men and for women, and that is the only thing this changes.",
      options: [
        { value: "male", label: "The men's cut-points" },
        { value: "female", label: "The women's cut-points" },
      ],
    },
    field: { id: "waistCm", label: "Waist", unit: "cm", min: 40, max: 200, placeholder: "88" },
  },
  {
    id: "hip",
    kind: "number",
    text: "And your hips, if you have the tape out?",
    help: "Measure around the widest part of your hips and buttocks. This one is optional, and skipping it still gives you the other three numbers.",
    field: { id: "hipCm", label: "Hips", unit: "cm", min: 50, max: 220, placeholder: "100" },
    unknownLabel: "Skip this one",
    unknownNote:
      "Worth coming back for. Waist-to-hip is the only number on this page whose cut-off was worked out in Ghanaians rather than borrowed from Europe.",
  },
];

/**
 * Work out all three numbers from a completed set of answers.
 *
 * @param {{ heightCm, weightKg, waistCm, sex, hipCm? }} input
 * @returns {{ bmi, bmiBand, bmiBandGeneral, waistCm, waistBand, whtr, whtrBand,
 *             whtrApplies, hipCm, whr, whrBand, halfHeightCm, raised, answers,
 *             healthInterest }}
 *   `whr` and `whrBand` are null when the hip step is skipped; `whtr` and
 *   `whtrBand` are null at a BMI of 35 or above, which NICE puts out of scope.
 */
export function computeBmiWaist(input) {
  const heightCm = Number(input.heightCm);
  const waistCm = Number(input.waistCm);
  const sex = input.sex === "female" ? "female" : "male";

  // Hip is optional. The Stepper hands back the string "unknown" when someone
  // takes the skip path, and Number("unknown") is NaN, so both the skip and a
  // missing value fall through to a null ratio rather than a fabricated one.
  const hipCm = Number(input.hipCm);
  const hasHip = hipCm > 0;

  const bmi = roundTo(bmiFrom(input.heightCm, input.weightKg), 1);
  const bmiBand = bmiBandFor(bmi);
  const bmiBandGeneral = bmiBandGeneralFor(bmi);
  const waistBand = waistBandFor(waistCm, sex);

  // NICE scopes waist-to-height ratio to adults with a BMI under 35, on the
  // reasoning that above that it adds nothing. Rather than print a ratio that
  // carries no information, this says so.
  const whtrApplies = bmi !== null && bmi < WHTR_BMI_CEILING;
  const whtr = whtrApplies ? roundTo(whtrFrom(waistCm, heightCm), 2) : null;
  const whtrBand = whtrBandFor(whtr);
  const whr = hasHip ? roundTo(whrFrom(waistCm, hipCm), 2) : null;
  const whrBand = whrBandFor(whr, sex);

  // A result is "raised" when any one of the three sits outside its healthy
  // band. That is the point of measuring three things: a healthy BMI with a
  // raised waist is a real combination, and it is not a reassuring result.
  const raised = [bmiBand, waistBand, whtrBand, whrBand].some((b) => b && !b.healthy);

  return {
    bmi,
    bmiBand,
    sex,
    waistCm,
    waistBand,
    bmiBandGeneral,
    whtr,
    whtrBand,
    whtrApplies,
    hipCm: hasHip ? hipCm : null,
    whr,
    whrBand,
    halfHeightCm: heightCm > 0 ? heightCm / 2 : null,
    raised,
    healthInterest: raised ? "panorama" : "bmi-waist",
    answers: {
      heightCm: String(input.heightCm || ""),
      weightKg: String(input.weightKg || ""),
      waistCm: String(input.waistCm || ""),
      sex,
      bmi: bmi ? bmi.toFixed(1) : "",
      bmiBand: bmiBand ? bmiBand.label : "",
      waistBand: waistBand ? waistBand.label : "",
      whtr: whtr ? whtr.toFixed(2) : "",
      whtrBand: whtrBand ? whtrBand.label : "",
      hipCm: hasHip ? String(hipCm) : "skipped",
      whr: whr ? whr.toFixed(2) : "",
      whrBand: whrBand ? whrBand.label : "",
      outcome: raised ? "raised" : "healthy",
    },
  };
}

export default {
  slug: "bmi-waist",
  title: "BMI and Waist Calculator",
  shortTitle: "BMI and Waist",
  eyebrow: "Free 1-minute calculator",
  promise:
    "Part 1 is your measurements: BMI read against the thresholds NICE sets for Black African backgrounds rather than the general-population ones, your waist against the WHO cut-points, and whether your waist measures less than half your height. Part 2 is five taps about a normal day, the last year, and a week on your plate. Then a card you can share.",
  description:
    "Your BMI on the thresholds NICE uses for Black African backgrounds, your waist against the WHO cut-points, and your waist-to-height ratio. No sign-up.",
  format: "3 measurements, then 5 lifestyle taps",
  bullets: [
    "BMI read on NICE's lower thresholds, with the general-population figures alongside",
    "Your waist against the published cut-points, and whether it is under half your height",
    "Part 2: activity, weight change and a short week on a plate",
    "A result card you can share on WhatsApp",
  ],
  intro:
    "Two parts. Part 1 is three screens of measurements, and the third is optional. Part 2 is five quick taps that never change the bands. Have a tape measure to hand if you can, because the waist measurement is the part your phone's BMI calculator leaves out, and the part that carries most of the information.",
  sections: [
    {
      heading: "Why your BMI thresholds are lower here",
      paragraphs: [
        "Most calculators band BMI at 25 for overweight and 30 for obesity. Those are the WHO figures for the general population, and this page shows them to you, but it does not lead with them.",
        "NICE, which writes clinical guidance for the NHS, tells clinicians to use lower thresholds for people of Black African or African-Caribbean background, alongside South Asian, Chinese, other Asian and Middle Eastern backgrounds: overweight from 23.0, obesity from 27.5. Its stated reason is that these groups are prone to central adiposity and reach cardiometabolic risk at a lower BMI. Applying 25 and 30 to a Ghanaian readership would quietly under-flag the people this tool exists for, so the band you see is read on 23 and 27.5.",
      ],
      after: [
        "This is not a Ghana-specific finding, and it is not presented as one. It is a threshold NICE applies to several backgrounds, Black African among them.",
      ],
    },
    {
      heading: "Why this asks for your waist as well",
      paragraphs: [
        "BMI is your weight divided by your height squared. Height and weight are the only two things that go into it, so it cannot tell muscle from fat, and a heavily built person can read as overweight while carrying very little fat. It also says nothing about where on your body that fat sits.",
        "Fat around the middle, packed in around the liver and the other organs, behaves differently from fat under the skin of the hips and thighs. Two people can share a BMI and carry very different amounts of it, and a tape measure around the waist is the cheapest way to tell them apart.",
      ],
      callout:
        "WHO's own technical report on obesity says BMI does not distinguish between weight associated with muscle and weight associated with fat, and does not account for the wide variation in body fat distribution. That is the gap the waist measurement fills.",
    },
    {
      heading: "The rule worth remembering",
      paragraphs: [
        "Your waist should measure less than half your height. It needs no chart and no calculator once you know your own two numbers, and it works in centimetres, inches or any other unit, because it is a ratio.",
        "Here is the contrast worth carrying away. NICE moves the BMI thresholds for Black African and several other backgrounds, and it does not move this one: it applies the same waist-to-height bands, 0.4 to 0.49 healthy, 0.5 to 0.59 increased and 0.6 or above high, to both sexes and all ethnicities, including people with high muscle mass. The number that gets adjusted for your background is the weaker one.",
      ],
      after: [
        "Two honest limits. NICE scopes waist-to-height ratio to adults with a BMI under 35, on the reasoning that above that it adds nothing, so this tool stops showing it there rather than printing a number that carries no information. And NICE has an open research recommendation, made in 2025, asking what actually works for identifying overweight, obesity and central adiposity in people from ethnic minority backgrounds, which is an admission that the evidence is thinner than anyone would like. WHO has not endorsed waist-to-height ratio at all: its 2011 waist report said there was not enough data on it to give it any priority.",
      ],
    },
    {
      heading: "Where these cut-points came from",
      paragraphs: [
        "The waist figures have a traceable origin. WHO's 2011 report follows the 94cm, 102cm, 80cm and 88cm thresholds back to two studies published in 1995, one in Glasgow and one in Amsterdam and Maastricht. On sub-Saharan Africa the same report is blunt: only one analysis had ever reported waist cut-off points in Africans, and there is, in its words, insufficient evidence for recommending specific cut-offs for sub-Saharan Africans. IDF lists 94cm for men and 80cm for women as Europid values and tells sub-Saharan African populations to use the European data until specific data are available, which is a placeholder rather than a finding.",
        "African studies have not landed in the same place either. A pooled analysis of 24,181 adults across eight sub-Saharan African countries put the best threshold for men near 81cm, well below the 94cm in use, and Ghana was not among those eight. Published optima for women run from roughly 72cm to roughly 92cm depending on the population and on what was being predicted. No expert body has adopted any of them, and WHO has noted body-composition data pointing the other way, towards African populations possibly needing higher waist cut-offs rather than lower ones. Nobody knows, and saying so is more useful than picking a side.",
        "For BMI, WHO has formally revisited the question once, for Asian populations. Its 2004 expert consultation kept 18.5, 25 and 30 as the international cut-points and added public health action points at 23 and 27.5 for countries that wanted them. No equivalent consultation has been held for African populations, and WHO has published no African-specific BMI or waist figures. The 23 and 27.5 this page uses are NICE's, not WHO's.",
      ],
      after: [
        "So the numbers here are a reasonable starting point for an adult in Ghana, and only one of them was worked out in Ghanaians. Read them as useful clues that need context, which is how the bodies that publish them describe them too.",
      ],
    },
    {
      heading: "The optional fourth number",
      paragraphs: [
        "If you have the tape out, measuring your hips as well gives you a waist-to-hip ratio, and it is the only number on this page whose cut-off was worked out in Ghanaians rather than borrowed from Europe.",
        "A case-control study of 1,221 adults in urban Ghana, looking at type 2 diabetes, found waist-to-hip ratio outperformed both BMI and waist circumference, and reported that the recommended cut-off points for BMI and waist circumference had poor predictive ability in that population. Its own optimal values were 0.90 for men and 0.88 for women. The RODAM study of Ghanaian migrants and non-migrants reached the same conclusion about which index works best.",
      ],
      callout:
        "Those two figures are study-derived optima against one outcome in one Ghanaian sample. No guideline body has adopted them, and this page does not present them as a threshold. They are here because they are the only cut-off on this page derived in Ghanaians at all, which is more than the waist figures can claim.",
    },
  ],
  sources: [
    {
      label:
        "NICE. Overweight and obesity management. NICE guideline NG246. London: NICE; published 14 January 2025 (recommendations 1.9.8, 1.9.11, 1.9.14 and 1.9.15: lower BMI thresholds by background, and waist-to-height ratio for adults with a BMI under 35).",
    },
    {
      label:
        "WHO. Obesity: preventing and managing the global epidemic. WHO Technical Report Series 894. Geneva: WHO; 2000 (the general-population BMI classification, and BMI's inability to separate muscle from fat).",
    },
    {
      label:
        "WHO. Waist circumference and waist-hip ratio: report of a WHO expert consultation, Geneva, 8-11 December 2008. Geneva: WHO; 2011. ISBN 978 92 4 150149 1 (sections 3.5, 4.4, 5.1 and Annex A1).",
    },
    {
      label:
        "Lean ME, Han TS, Morrison CE. Waist circumference as a measure for indicating need for weight management. BMJ 1995;311(6998):158-61; and Han TS, van Leer EM, Seidell JC, Lean ME. Waist circumference action levels in the identification of cardiovascular risk factors. BMJ 1995;311(7017):1401-5 (the two European studies the waist thresholds come from).",
    },
    {
      label:
        "WHO Expert Consultation. Appropriate body-mass index for Asian populations and its implications for policy and intervention strategies. Lancet 2004;363(9403):157-63.",
    },
    {
      label:
        "Alberti KGMM, Zimmet P, Shaw J, for the IDF Epidemiology Task Force. The metabolic syndrome: a new worldwide definition. Lancet 2005;366(9491):1059-62; IDF consensus worldwide definition of the metabolic syndrome, 2006 (ethnic-specific waist values, and the sub-Saharan African instruction to use European data).",
    },
    {
      label:
        "Nishida C, Ko GT, Kumanyika S. Body fat distribution and noncommunicable diseases in populations: overview of the 2008 WHO Expert Consultation on Waist Circumference and Waist-Hip Ratio. Eur J Clin Nutr 2010;64(1):2-5.",
    },
    {
      label:
        "Ashwell M, Gunn P, Gibson S. Waist-to-height ratio is a better screening tool than waist circumference and BMI for adult cardiometabolic risk factors: systematic review and meta-analysis. Obes Rev 2012;13(3):275-86.",
    },
    {
      label:
        "Ekoru K, Murphy GAV, Young EH, et al. Deriving an optimal threshold of waist circumference for detecting cardiometabolic risk in sub-Saharan Africa. Int J Obes 2018;42(3):487-94.",
    },
    {
      label:
        "Crowther NJ, Norris SA. The current waist circumference cut point used for the diagnosis of metabolic syndrome in sub-Saharan African women is not appropriate. PLoS One 2012;7(11):e48883.",
    },
    {
      label:
        "Okosun IS, Rotimi CN, Forrester TE, et al. Predictive value of abdominal obesity cut-off points for hypertension in blacks from west African and Caribbean island nations. Int J Obes Relat Metab Disord 2000;24(2):180-6.",
    },
    {
      label:
        "Ware LJ, Rennie KL, Kruger HS, et al. Evaluation of waist-to-height ratio to predict 5 year cardiometabolic risk in sub-Saharan African adults. Nutr Metab Cardiovasc Dis 2014;24(8):900-7.",
    },
    {
      label:
        "Frank LK, Heraclides A, Danquah I, Bedu-Addo G, Mockenhaupt FP, Schulze MB. Measures of general and central obesity and risk of type 2 diabetes in a Ghanaian population. Trop Med Int Health 2013;18(2):141-51 (the 0.90 and 0.88 waist-to-hip values).",
    },
    {
      label:
        "Darko SN, Meeks KAC, Owiredu WKBA, et al. Anthropometric indices and their cut-off points in relation to type 2 diabetes among Ghanaian migrants and non-migrants: the RODAM study. Diabetes Res Clin Pract 2021;173:108687.",
    },
    { label: "Preventive health screening in Ghana: what to test and how often", url: "/blog/preventive-health-screening-ghana" },
    { label: "Prediabetes: the warning window before diabetes develops", url: "/blog/prediabetes-warning-signs" },
    { label: "Lipid profile: how to read your cholesterol results", url: "/blog/lipid-profile-cholesterol-test" },
    ...LIFESTYLE_SOURCES,
  ],
  cta: {
    kind: "panel",
    panelSlug: "panorama",
    label: "Look at the numbers underneath",
    body:
      "A raised waist is a clue about what is happening to your blood sugar, your cholesterol, your liver and your kidneys, and the Complete Health Check is the only panel that covers all four in one visit.",
  },
};
