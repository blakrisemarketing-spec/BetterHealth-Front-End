// Unit tests for the pure maths behind the /tools calculators.
//
// The repo has no test runner, so this is a standalone script:
//   node scripts/test-tools.mjs
// It exits non-zero on the first failing assertion count, so CI or a pre-push
// hook can call it directly.

import assert from "node:assert/strict";
import {
  canonicalPair,
  punnett,
  groupOutcomes,
  computeGenotype,
} from "../src/data/tools/genotype-compatibility.js";
import {
  bmiFrom,
  bmiPoints,
  waistPoints,
  bandFor,
  computeFindrisc,
  RISK_BANDS,
  STEPS as FINDRISC_STEPS,
} from "../src/data/tools/diabetes-risk.js";
import {
  bmiBandFor,
  bmiBandGeneralFor,
  waistBandFor,
  whtrFrom,
  whtrBandFor,
  whrFrom,
  whrBandFor,
  roundTo,
  computeBmiWaist,
  BMI_BANDS_ADJUSTED,
  BMI_BANDS_GENERAL,
  WAIST_THRESHOLDS,
  WHR_THRESHOLDS,
  WHTR_BMI_CEILING,
  STEPS as BMI_WAIST_STEPS,
} from "../src/data/tools/bmi-waist.js";
import {
  computeHeartAge,
  chartRisk,
  ageKeyFor,
  sbpKeyFor,
  bmiIndexFor,
  bandFor as heartBandFor,
  AGE_KEYS,
  WSSA_NON_LAB_CHART,
  HEART_AGE_IS_CALIBRATED,
  STEPS as HEART_STEPS,
} from "../src/data/tools/heart-age.js";
import {
  FOODS,
  SUGARY_DRINKS,
  PLATE_STEPS,
  PLATE_STEPS_SHORT,
  MAX_TIMES,
  countTotal,
  anyCapped,
  timesLabel,
  foodsFeedback,
  proportionFeedback,
  vegFeedback,
  proteinFeedback,
  proteinsFeedback,
  drinksFeedback,
  summarisePlate,
  packPlate,
  packPlateShort,
  parsePlate,
  SWAPS,
  NO_PUBLISHED_VALUE,
  PLATE_SOURCES,
  GUIDELINE_STAPLE_FRACTION,
} from "../src/data/tools/plate.js";
import {
  HABIT_STEPS,
  HABIT_SOURCES,
  CUBES_MAX,
  cubesFeedback,
  saltFoodsFeedback,
  summariseHabits,
  packHabits,
  parseHabits,
} from "../src/data/tools/heart-habits.js";
import {
  LIFESTYLE_STEPS,
  lifestyleNote,
  activityGuidance,
  summariseLifestyle,
  packLifestyle,
  parseLifestyle,
} from "../src/data/tools/lifestyle.js";
import {
  DIABETES_PARTS,
  HEART_PARTS,
  BMI_PARTS,
  INHERITANCE_PARTS,
  KIDNEY_PARTS,
  countQuestions,
  countVisibleQuestions,
  computeDiabetesFull,
  computeHeartFull,
  computeBmiFull,
  computeGenotypeFull,
  computeInheritanceFull,
  computeKidneyFull,
} from "../src/data/tools/compose.js";
import {
  ACR_RANGES,
  ACR_REFERRAL,
  ACR_REFERRAL_HIGH,
  ACR_TEST,
  ACR_UNITS,
  ACUTE_SIGNS,
  A_BOUNDARY_NOTE,
  A_STAGES,
  CKD_EPI_2021,
  CREATININE_RANGES,
  CREATININE_UNITS,
  EGFR_CAVEAT,
  EGFR_CAVEAT_LOW,
  EGFR_LOW_THRESHOLD,
  EGFR_REFERRAL,
  EKFC,
  EXCLUSIONS,
  GRID,
  GRID_CATEGORIES,
  GRID_MONITORING,
  G1_G2_FOOTNOTE,
  G_STAGES,
  KIDNEY_EVIDENCE_IS_FINAL,
  MAX_ANSWER_KEYS,
  MGG_PER_MGMMOL,
  MIN_EGFR_AGE,
  MISSING_HALF,
  NUMBERS_STEPS,
  PROVISIONAL,
  DIABETES_INTERVAL,
  NO_INTERVAL_NOTE,
  NO_SCORE_NOTE,
  RFT_TEST,
  RISK_FACTORS,
  RISK_FACTOR_PICKS,
  SCREENING_STEPS,
  SIGNS,
  UMOL_PER_MGDL,
  UNRELIABLE_CONDITIONS,
  URGENT_RULES,
  aStageFor,
  acrToMgg,
  acrToMgmmol,
  ckdEpiFrom,
  computeKidney,
  creatinineToMgdl,
  creatinineToUmol,
  egfrFrom,
  ekfcFrom,
  exclusionFor,
  gStageFor,
  gridCellFor,
  riskFactorOptions,
  kidneyCta,
  missingHalfFor,
  numbersFor,
  packKidney,
  screeningFor,
  signsFor,
  wants,
} from "../src/data/tools/kidney-check.js";
import {
  genotypeAdvice,
  FOLLOW_UP_NOTE,
  GENOTYPE_STEPS,
} from "../src/data/tools/genotype-compatibility.js";
import {
  ABO_ANY_GROUP_NOTE,
  ABO_DETERMINED,
  ABO_EXCEPTIONS_NOTE,
  ABO_GROUPS,
  ABO_HALF_CERTAIN_NOTE,
  ABO_OPTIONS,
  CANNOT_PREDICT,
  EXPECTED_CAVEAT,
  EXPECTED_LABEL,
  G6PD_FATHER_OPTIONS,
  G6PD_GHANA_NOTE,
  G6PD_MOTHER_OPTIONS,
  G6PD_READING,
  G6PD_TRIGGERS_NOTE,
  GHANA_ABO,
  GHANA_RH,
  RH_ANTI_D_NOTE,
  RH_GHANA_NOTE,
  RH_OPTIONS,
  RUNS_IN_FAMILIES,
  SEX_LINES,
  TRAITS,
  TRAIT_IDS,
  aboExpected,
  aboHiddenOShare,
  aboOutcomes,
  aboPhenotype,
  computeAbo,
  computeG6pd,
  computeRh,
  g6pdOutcomes,
  inheritanceCta,
  openQuestions,
  packInheritance,
  rhExpected,
  rhHiddenDShare,
  rhOutcomes,
  rhPregnancyFlag,
  selectedTraits,
} from "../src/data/tools/inheritance.js";
import { shareSpecFor, SHARE_HOST } from "../src/data/tools/share-card.js";
import { SINGLE_TEST_CODES } from "../src/data/app-catalogue.js";
import { TOOL_DISCLAIMER, TOOLS } from "../src/data/tools/index.js";

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed += 1;
    console.log(`  ok   ${name}`);
  } catch (err) {
    failed += 1;
    console.log(`  FAIL ${name}`);
    console.log(`       ${err.message.split("\n")[0]}`);
  }
}

/** Punnett output as a plain { genotype: percent } object, for readable asserts. */
const odds = (a, b) => Object.fromEntries(punnett(a, b).map((r) => [r.genotype, r.percent]));

console.log("\nPunnett square (genotype compatibility)");

test("canonical allele order is A, then S, then C", () => {
  assert.equal(canonicalPair("S", "A"), "AS");
  assert.equal(canonicalPair("A", "S"), "AS");
  assert.equal(canonicalPair("C", "A"), "AC");
  assert.equal(canonicalPair("C", "S"), "SC");
  assert.equal(canonicalPair("A", "A"), "AA");
});

test("AS + AS gives AA 25, AS 50, SS 25", () => {
  assert.deepEqual(odds("AS", "AS"), { AA: 25, AS: 50, SS: 25 });
});

test("AA + AS gives AA 50, AS 50", () => {
  assert.deepEqual(odds("AA", "AS"), { AA: 50, AS: 50 });
});

test("AS + SS gives AS 50, SS 50", () => {
  assert.deepEqual(odds("AS", "SS"), { AS: 50, SS: 50 });
});

test("AS + AC gives AA 25, AS 25, AC 25, SC 25", () => {
  assert.deepEqual(odds("AS", "AC"), { AA: 25, AS: 25, AC: 25, SC: 25 });
});

test("SS + SS gives SS 100", () => {
  assert.deepEqual(odds("SS", "SS"), { SS: 100 });
});

test("the square is symmetric: order of the two partners never matters", () => {
  const all = ["AA", "AS", "SS", "AC", "SC", "CC"];
  for (const a of all) {
    for (const b of all) {
      assert.deepEqual(odds(a, b), odds(b, a), `${a} x ${b}`);
    }
  }
});

test("every pairing's percentages sum to 100", () => {
  const all = ["AA", "AS", "SS", "AC", "SC", "CC"];
  for (const a of all) {
    for (const b of all) {
      const total = punnett(a, b).reduce((s, r) => s + r.percent, 0);
      assert.equal(total, 100, `${a} x ${b} summed to ${total}`);
    }
  }
});

test("outcome groups roll up correctly for AS + SC", () => {
  // AS x SC -> A-S=AS, A-C=AC, S-S=SS, S-C=SC : 25 each.
  const groups = Object.fromEntries(groupOutcomes(punnett("AS", "SC")).map((g) => [g.id, g.percent]));
  assert.deepEqual(groups, { trait: 50, disease: 50 });
});

test("CC + CC is 100% haemoglobin C disease", () => {
  const groups = Object.fromEntries(groupOutcomes(punnett("CC", "CC")).map((g) => [g.id, g.percent]));
  assert.deepEqual(groups, { hbc: 100 });
});

test("an unknown genotype returns the explainer branch, not fabricated odds", () => {
  assert.equal(computeGenotype({ you: "AS", partner: "unknown" }).kind, "unknown");
  assert.equal(computeGenotype({ you: "unknown", partner: "unknown" }).kind, "unknown");
  assert.equal(computeGenotype({ you: "AS", partner: "AS" }).kind, "odds");
});

test("AS + AS carries the article's own pairing line", () => {
  assert.match(computeGenotype({ you: "AS", partner: "AS" }).pairingLine, /25% chance of sickle cell disease/);
});

console.log("\nFINDRISC (diabetes risk score)");

test("BMI is computed from cm and kg", () => {
  assert.equal(Math.round(bmiFrom(170, 72) * 10) / 10, 24.9);
  assert.equal(bmiFrom(0, 72), null);
  assert.equal(bmiFrom(170, 0), null);
});

test("BMI item: under 25 = 0, 25 to 30 = 1, over 30 = 3", () => {
  assert.equal(bmiPoints(24.9), 0);
  assert.equal(bmiPoints(25), 1);
  assert.equal(bmiPoints(30), 1);
  assert.equal(bmiPoints(30.1), 3);
});

test("waist item for men: under 94 = 0, 94 to 102 = 3, over 102 = 4", () => {
  assert.equal(waistPoints(93, "male"), 0);
  assert.equal(waistPoints(94, "male"), 3);
  assert.equal(waistPoints(102, "male"), 3);
  assert.equal(waistPoints(103, "male"), 4);
});

test("waist item for women: under 80 = 0, 80 to 88 = 3, over 88 = 4", () => {
  assert.equal(waistPoints(79, "female"), 0);
  assert.equal(waistPoints(80, "female"), 3);
  assert.equal(waistPoints(88, "female"), 3);
  assert.equal(waistPoints(89, "female"), 4);
});

test("bands: under 7 low, 7-11 slightly elevated, 12-14 moderate, 15-20 high, over 20 very high", () => {
  const label = (n) => bandFor(n).label;
  assert.equal(label(0), "Low");
  assert.equal(label(6), "Low");
  assert.equal(label(7), "Slightly elevated");
  assert.equal(label(11), "Slightly elevated");
  assert.equal(label(12), "Moderate");
  assert.equal(label(14), "Moderate");
  assert.equal(label(15), "High");
  assert.equal(label(20), "High");
  assert.equal(label(21), "Very high");
  assert.equal(label(26), "Very high");
});

test("every score from 0 to 26 falls in exactly one band", () => {
  for (let n = 0; n <= 26; n += 1) {
    const hits = RISK_BANDS.filter((b) => n >= b.min && n <= b.max);
    assert.equal(hits.length, 1, `score ${n} matched ${hits.length} bands`);
  }
});

test("all-zero answers score 0 and land in the low band", () => {
  const r = computeFindrisc({
    age: "u45", sex: "male", heightCm: 175, weightKg: 70, waistCm: 85,
    activity: "yes", diet: "yes", bpMeds: "no", highGlucose: "no", family: "none",
  });
  assert.equal(r.score, 0);
  assert.equal(r.band.label, "Low");
  assert.equal(r.topItems.length, 0);
});

test("the maximum possible score is 26 and lands in very high", () => {
  const r = computeFindrisc({
    age: "o64", sex: "female", heightCm: 160, weightKg: 95, waistCm: 110,
    activity: "no", diet: "no", bpMeds: "yes", highGlucose: "yes", family: "close",
  });
  // 4 age + 3 BMI + 4 waist + 2 activity + 1 diet + 2 meds + 5 glucose + 5 family
  assert.equal(r.score, 26);
  assert.equal(r.band.label, "Very high");
});

test("a worked mid-range case adds up item by item", () => {
  const r = computeFindrisc({
    age: "55to64", sex: "male", heightCm: 175, weightKg: 95, waistCm: 105,
    activity: "no", diet: "no", bpMeds: "yes", highGlucose: "no", family: "close",
  });
  // 3 age + 3 BMI(31.0) + 4 waist + 2 activity + 1 diet + 2 meds + 0 glucose + 5 family = 20
  assert.equal(r.score, 20);
  assert.equal(r.band.label, "High");
  assert.equal(Math.round(r.bmi * 10) / 10, 31);
});

test("the top contributors are the highest-scoring items, at most three", () => {
  const r = computeFindrisc({
    age: "55to64", sex: "male", heightCm: 175, weightKg: 95, waistCm: 105,
    activity: "no", diet: "no", bpMeds: "yes", highGlucose: "no", family: "close",
  });
  assert.deepEqual(r.topItems.map((i) => i.id), ["family", "waist", "age"]);
  assert.deepEqual(r.topItems.map((i) => i.points), [5, 4, 3]);
});

test("the tool asks exactly eight questions, which is what the ads promise", () => {
  assert.equal(FINDRISC_STEPS.length, 8);
  assert.deepEqual(
    FINDRISC_STEPS.map((s) => s.id),
    ["age", "body", "waist", "activity", "diet", "bpMeds", "highGlucose", "family"],
  );
});

test("the unscored sex selector rides on the waist step rather than taking its own", () => {
  assert.equal(FINDRISC_STEPS.filter((s) => s.id === "sex").length, 0, "sex still has its own step");
  const waist = FINDRISC_STEPS.find((s) => s.id === "waist");
  assert.equal(waist.choice.id, "sex");
  assert.deepEqual(waist.choice.options.map((o) => o.value), ["male", "female"]);
  // It must stay unscored: FINDRISC has no sex item.
  for (const o of waist.choice.options) assert.equal(o.points, undefined);
});

test("eight scored items, and the selector still drives the waist cut-off", () => {
  const base = {
    age: "u45", heightCm: 175, weightKg: 70, waistCm: 92,
    activity: "yes", diet: "yes", bpMeds: "no", highGlucose: "no", family: "none",
  };
  assert.equal(computeFindrisc({ ...base, sex: "male" }).items.length, 8);
  // 92cm scores 0 on the men's range (<94) and 4 on the women's (>88).
  assert.equal(computeFindrisc({ ...base, sex: "male" }).score, 0);
  assert.equal(computeFindrisc({ ...base, sex: "female" }).score, 4);
});

test("answers sent with the lead stay inside the backend's key and length limits", () => {
  const r = computeFindrisc({
    age: "45to54", sex: "female", heightCm: 165, weightKg: 80, waistCm: 92,
    activity: "no", diet: "yes", bpMeds: "no", highGlucose: "yes", family: "extended",
  });
  const keys = Object.keys(r.answers);
  assert.ok(keys.length <= 16, `${keys.length} answer keys`);
  for (const k of keys) assert.match(k, /^[a-zA-Z][a-zA-Z0-9_]{0,39}$/);
  for (const v of Object.values(r.answers)) assert.ok(String(v).length <= 200);
});

console.log("\nHeart age (WHO 2019 non-lab chart, Western Sub-Saharan Africa)");

test("age maps to the chart's published rows, and to null outside 40 to 74", () => {
  assert.equal(ageKeyFor(39), null);
  assert.equal(ageKeyFor(40), "40to44");
  assert.equal(ageKeyFor(44), "40to44");
  assert.equal(ageKeyFor(45), "45to49");
  assert.equal(ageKeyFor(74), "70to74");
  assert.equal(ageKeyFor(75), null);
});

test("systolic maps to the chart's published SBP rows", () => {
  assert.equal(sbpKeyFor(119), "sbpUnder120");
  assert.equal(sbpKeyFor(120), "sbp120to139");
  assert.equal(sbpKeyFor(139), "sbp120to139");
  assert.equal(sbpKeyFor(140), "sbp140to159");
  assert.equal(sbpKeyFor(160), "sbp160to179");
  assert.equal(sbpKeyFor(180), "sbp180plus");
});

test("BMI maps to the chart's five published columns", () => {
  assert.equal(bmiIndexFor(19.9), 0);
  assert.equal(bmiIndexFor(20), 1);
  assert.equal(bmiIndexFor(24.9), 1);
  assert.equal(bmiIndexFor(25), 2);
  assert.equal(bmiIndexFor(30), 3);
  assert.equal(bmiIndexFor(34.9), 3);
  assert.equal(bmiIndexFor(35), 4);
});

test("the chart table has every published row and no gaps", () => {
  const sbpKeys = ["sbp180plus", "sbp160to179", "sbp140to159", "sbp120to139", "sbpUnder120"];
  assert.deepEqual(Object.keys(WSSA_NON_LAB_CHART).sort(), [...AGE_KEYS].sort());
  for (const age of AGE_KEYS) {
    assert.deepEqual(Object.keys(WSSA_NON_LAB_CHART[age]), sbpKeys, age);
    for (const k of sbpKeys) {
      const row = WSSA_NON_LAB_CHART[age][k];
      assert.equal(row.length, 20, `${age}/${k} has ${row.length} cells`);
      for (const v of row) assert.ok(Number.isInteger(v) && v >= 0 && v <= 100);
    }
  }
});

test("spot-checked cells match the printed WHO chart (page 6, Western SSA)", () => {
  // Printed row "70-74 / >=180": men non-smoker 23 24 26 28 30, men smoker 29 31
  // 33 36 38, women non-smoker 20 21 21 22 23, women smoker 29 30 31 32 33.
  const cell = (sex, smoker, bmiIndex) =>
    chartRisk({ ageKey: "70to74", sex, smoker, sbpKey: "sbp180plus", bmiIndex });
  assert.equal(cell("male", false, 0), 23);
  assert.equal(cell("male", false, 4), 30);
  assert.equal(cell("male", true, 0), 29);
  assert.equal(cell("male", true, 4), 38);
  assert.equal(cell("female", false, 0), 20);
  assert.equal(cell("female", false, 4), 23);
  assert.equal(cell("female", true, 0), 29);
  assert.equal(cell("female", true, 4), 33);
  // Printed row "40-44 / <120": men non-smoker 1 1 1 2 2, women smoker 2 3 3 3 3.
  assert.equal(chartRisk({ ageKey: "40to44", sex: "male", smoker: false, sbpKey: "sbpUnder120", bmiIndex: 0 }), 1);
  assert.equal(chartRisk({ ageKey: "40to44", sex: "male", smoker: false, sbpKey: "sbpUnder120", bmiIndex: 3 }), 2);
  assert.equal(chartRisk({ ageKey: "40to44", sex: "female", smoker: true, sbpKey: "sbpUnder120", bmiIndex: 1 }), 3);
});

test("risk bands are cut at the 2019 boundaries, not the 2007 ones", () => {
  assert.equal(heartBandFor(4).id, "under5");
  assert.equal(heartBandFor(5).id, "5to10");
  assert.equal(heartBandFor(9).id, "5to10");
  assert.equal(heartBandFor(10).id, "10to20");
  assert.equal(heartBandFor(19).id, "10to20");
  assert.equal(heartBandFor(20).id, "20to30");
  assert.equal(heartBandFor(29).id, "20to30");
  assert.equal(heartBandFor(30).id, "30plus");
});

test("a worked case reads the published cell, not a model", () => {
  // 55, male, smoker, SBP 150, 175cm / 95kg -> BMI 31.0.
  // Printed cell 55-59 / 140-159 / men smoker / 30-35 = 14.
  const r = computeHeartAge({ age: 55, sex: "male", smoker: "yes", systolic: 150, heightCm: 175, weightKg: 95 });
  assert.equal(r.kind, "risk");
  assert.equal(r.risk, 14);
  assert.equal(r.band.id, "10to20");
  assert.equal(r.heartAge.ageKey, "70to74");
});

test("a second worked case, at the healthy end", () => {
  // 41, female, non-smoker, SBP 110, 165cm / 60kg -> BMI 22.0.
  // Printed cell 40-44 / <120 / women non-smoker / 20-24 = 1.
  const r = computeHeartAge({ age: 41, sex: "female", smoker: "no", systolic: 110, heightCm: 165, weightKg: 60 });
  assert.equal(r.risk, 1);
  assert.equal(r.band.id, "under5");
  assert.equal(r.heartAge.ageKey, "40to44");
  assert.deepEqual(r.drivers, []);
});

test("drivers are differences between two printed cells, never a new model", () => {
  const r = computeHeartAge({ age: 42, sex: "male", smoker: "yes", systolic: 165, heightCm: 175, weightKg: 98 });
  // Own cell 40-44 / 160-179 / men smoker / 30-35 = 11.
  assert.equal(r.risk, 11);
  // Blood pressure: 11 minus 40-44 / <120 / men smoker / 30-35 (= 4) -> 7.
  const bp = r.drivers.find((d) => d.id === "systolic");
  assert.equal(bp.points, 11 - chartRisk({ ageKey: "40to44", sex: "male", smoker: true, sbpKey: "sbpUnder120", bmiIndex: 3 }));
  // Smoking: 11 minus the same cell for a non-smoker (= 5) -> 6.
  const smoke = r.drivers.find((d) => d.id === "smoking");
  assert.equal(smoke.points, 11 - chartRisk({ ageKey: "40to44", sex: "male", smoker: false, sbpKey: "sbp160to179", bmiIndex: 3 }));
  // Sorted heaviest first.
  assert.deepEqual([...r.drivers].sort((a, b) => b.points - a.points).map((d) => d.id), r.drivers.map((d) => d.id));
});

test("an unknown systolic reading returns the how-to-measure branch, not a guess", () => {
  const r = computeHeartAge({ age: 55, sex: "male", smoker: "yes", systolic: "unknown", heightCm: 175, weightKg: 95 });
  assert.equal(r.kind, "unknown");
  assert.equal(r.band, null);
  assert.equal(r.risk, null);
});

test("an age outside 40 to 74 refuses to answer rather than extrapolating", () => {
  for (const age of [30, 39, 75, 88]) {
    const r = computeHeartAge({ age, sex: "male", smoker: "no", systolic: 120, heightCm: 175, weightKg: 70 });
    assert.equal(r.kind, "outOfRange", `age ${age}`);
    assert.equal(r.risk, null);
  }
});

test("a band above the reference column's ceiling returns no heart age", () => {
  // 70, male, smoker, SBP 185, BMI 36 -> printed cell 38, the >=30% band. The
  // reference column (non-smoker, <120, BMI 20-24) tops out in 10% to <20%.
  const r = computeHeartAge({ age: 70, sex: "male", smoker: "yes", systolic: 185, heightCm: 170, weightKg: 105 });
  assert.equal(r.risk, 38);
  assert.equal(r.band.id, "30plus");
  assert.equal(r.heartAge.ageKey, null);
  assert.equal(r.heartAge.beyondChart, "older");
});

test("heart age is only ever reported when the chart is calibrated", () => {
  assert.equal(HEART_AGE_IS_CALIBRATED, true);
  const r = computeHeartAge({ age: 55, sex: "male", smoker: "yes", systolic: 150, heightCm: 175, weightKg: 95 });
  if (!HEART_AGE_IS_CALIBRATED) {
    assert.equal(r.heartAge, null, "heart age returned without a calibrated chart");
  }
});

test("answers sent with the lead stay inside the backend's key and length limits", () => {
  const r = computeHeartAge({ age: 47, sex: "female", smoker: "no", systolic: 128, heightCm: 162, weightKg: 68 });
  const keys = Object.keys(r.answers);
  assert.ok(keys.length <= 16, `${keys.length} answer keys`);
  for (const k of keys) assert.match(k, /^[a-zA-Z][a-zA-Z0-9_]{0,39}$/);
  for (const v of Object.values(r.answers)) assert.ok(String(v).length <= 200);
});

console.log("\nBMI and waist (NICE adjusted BMI bands, WHO waist cut-points, WHtR 0.5, Ghanaian WHR)");

test("the waist cut-points are the FINDRISC ones, read from one place", () => {
  assert.deepEqual(WAIST_THRESHOLDS, {
    male: { increased: 94, substantial: 102 },
    female: { increased: 80, substantial: 88 },
  });
  // The FINDRISC item still scores exactly as published off the same numbers.
  assert.equal(waistPoints(93, "male"), 0);
  assert.equal(waistPoints(94, "male"), 3);
  assert.equal(waistPoints(103, "male"), 4);
});

test("the leading BMI bands are NICE's 23 and 27.5, not the general 25 and 30", () => {
  const id = (n) => bmiBandFor(n).id;
  assert.equal(id(18.4), "underweight");
  assert.equal(id(18.5), "healthy");
  assert.equal(id(22.9), "healthy");
  assert.equal(id(23.0), "overweight");
  assert.equal(id(27.4), "overweight");
  assert.equal(id(27.5), "obese");
  assert.equal(id(45), "obese");
  assert.equal(bmiBandFor(null), null);
});

test("the general-population bands are still available, cut at 18.5, 25.0 and 30.0", () => {
  const id = (n) => bmiBandGeneralFor(n).id;
  assert.equal(id(18.4), "underweight");
  assert.equal(id(18.5), "healthy");
  assert.equal(id(24.9), "healthy");
  assert.equal(id(25.0), "overweight");
  assert.equal(id(29.9), "overweight");
  assert.equal(id(30.0), "obese");
});

test("a BMI between 23 and 25 is overweight on NICE and healthy on the general bands", () => {
  // This gap is the whole reason the tool leads with the adjusted thresholds.
  for (const n of [23.0, 23.5, 24.9]) {
    assert.equal(bmiBandFor(n).id, "overweight", `${n} on NICE`);
    assert.equal(bmiBandGeneralFor(n).id, "healthy", `${n} on general`);
  }
});

test("only the healthy band is marked healthy, in both sets", () => {
  for (const bands of [BMI_BANDS_ADJUSTED, BMI_BANDS_GENERAL]) {
    assert.deepEqual(bands.filter((b) => b.healthy).map((b) => b.id), ["healthy"]);
    assert.deepEqual(bands.map((b) => b.id), ["underweight", "healthy", "overweight", "obese"]);
  }
});

test("men's waist bands break at 94 and 102, on WHO's 'or more' boundary", () => {
  const id = (n) => waistBandFor(n, "male").id;
  assert.equal(id(93), "below");
  assert.equal(id(94), "increased");
  assert.equal(id(101), "increased");
  assert.equal(id(102), "substantial");
  assert.equal(id(120), "substantial");
  assert.equal(waistBandFor(94, "male").healthy, false);
  assert.equal(waistBandFor(93, "male").healthy, true);
});

test("women's waist bands break at 80 and 88, on the same boundary", () => {
  const id = (n) => waistBandFor(n, "female").id;
  assert.equal(id(79), "below");
  assert.equal(id(80), "increased");
  assert.equal(id(87), "increased");
  assert.equal(id(88), "substantial");
  assert.equal(id(110), "substantial");
  assert.equal(waistBandFor(0, "female"), null);
});

test("the band carries the two cut-points it was read against", () => {
  const men = waistBandFor(96, "male");
  assert.equal(men.increased, 94);
  assert.equal(men.substantial, 102);
  const women = waistBandFor(96, "female");
  assert.equal(women.increased, 80);
  assert.equal(women.substantial, 88);
});

test("waist-to-height is waist over height, banded on NICE's three bands", () => {
  assert.equal(whtrFrom(85, 170), 0.5);
  assert.equal(whtrFrom(84, 170), 84 / 170);
  assert.equal(whtrFrom(85, 0), null);
  assert.equal(whtrBandFor(0.49).id, "healthy");
  assert.equal(whtrBandFor(0.5).id, "increased");
  assert.equal(whtrBandFor(0.59).id, "increased");
  assert.equal(whtrBandFor(0.6).id, "high");
  assert.equal(whtrBandFor(0.49).healthy, true);
  assert.equal(whtrBandFor(0.5).healthy, false);
  assert.equal(whtrBandFor(0.6).healthy, false);
});

test("exactly half your height is on the raised side, not the healthy one", () => {
  // 170cm tall, 85cm waist: the ratio is 0.50 exactly.
  const r = computeBmiWaist({ heightCm: 170, weightKg: 65, waistCm: 85, sex: "male" });
  assert.equal(r.whtr, 0.5);
  assert.equal(r.whtrBand.id, "increased");
  assert.equal(r.halfHeightCm, 85);
  assert.equal(r.raised, true);
});

test("one centimetre less puts the same person back inside the rule", () => {
  const r = computeBmiWaist({ heightCm: 170, weightKg: 65, waistCm: 84, sex: "male" });
  assert.equal(r.whtr, 0.49);
  assert.equal(r.whtrBand.id, "healthy");
  assert.equal(r.bmiBand.id, "healthy");
  assert.equal(r.waistBand.id, "below");
  assert.equal(r.raised, false);
});

test("waist-to-hip uses the Ghanaian study cut-offs, 0.90 for men and 0.88 for women", () => {
  assert.deepEqual(WHR_THRESHOLDS, { male: 0.9, female: 0.88 });
  assert.equal(whrFrom(90, 100), 0.9);
  assert.equal(whrFrom(90, 0), null);
  assert.equal(whrBandFor(0.89, "male").id, "under");
  assert.equal(whrBandFor(0.9, "male").id, "over");
  assert.equal(whrBandFor(0.87, "female").id, "under");
  assert.equal(whrBandFor(0.88, "female").id, "over");
  // The same ratio reads differently for the two sexes, and only that changes.
  assert.equal(whrBandFor(0.89, "male").healthy, true);
  assert.equal(whrBandFor(0.89, "female").healthy, false);
  assert.equal(whrBandFor(null, "male"), null);
  assert.equal(whrBandFor(0.9, "male").cut, 0.9);
});

test("hip is optional: skipping it still returns the other three numbers", () => {
  const skipped = computeBmiWaist({ heightCm: 175, weightKg: 70, waistCm: 82, sex: "male", hipCm: "unknown" });
  assert.equal(skipped.whr, null);
  assert.equal(skipped.whrBand, null);
  assert.equal(skipped.hipCm, null);
  assert.equal(skipped.answers.hipCm, "skipped");
  // The other three are all present and the result is still complete.
  assert.ok(skipped.bmi > 0);
  assert.equal(skipped.bmiBand.id, "healthy");
  assert.equal(skipped.waistBand.id, "below");
  assert.equal(skipped.whtrBand.id, "healthy");
  assert.equal(skipped.raised, false);
  // Omitting the field entirely behaves the same way as taking the skip path.
  const omitted = computeBmiWaist({ heightCm: 175, weightKg: 70, waistCm: 82, sex: "male" });
  assert.equal(omitted.whr, null);
  assert.equal(omitted.raised, false);
});

test("a raised waist-to-hip alone is enough to make the result a raised one", () => {
  // BMI 22.5, waist 88 under the men's 94, ratio 0.50 exactly... so use a case
  // where only the hip ratio moves: waist 92 over hips 100 is 0.92, over 0.90.
  const withHip = computeBmiWaist({ heightCm: 190, weightKg: 79, waistCm: 92, sex: "male", hipCm: 100 });
  assert.equal(withHip.bmiBand.id, "healthy");
  assert.equal(withHip.waistBand.id, "below");
  assert.equal(withHip.whtrBand.id, "healthy");
  assert.equal(withHip.whr, 0.92);
  assert.equal(withHip.whrBand.id, "over");
  assert.equal(withHip.raised, true);
  assert.equal(withHip.healthInterest, "panorama");
  // The same person who skips the hip step never sees that, and is not pitched.
  const without = computeBmiWaist({ heightCm: 190, weightKg: 79, waistCm: 92, sex: "male", hipCm: "unknown" });
  assert.equal(without.raised, false);
  assert.equal(without.healthInterest, "bmi-waist");
});

test("NICE scopes waist-to-height to a BMI under 35, so above that nothing is printed", () => {
  assert.equal(WHTR_BMI_CEILING, 35);
  const over = computeBmiWaist({ heightCm: 165, weightKg: 100, waistCm: 110, sex: "female" });
  assert.equal(over.bmi, 36.7);
  assert.equal(over.whtrApplies, false);
  assert.equal(over.whtr, null);
  assert.equal(over.whtrBand, null);
  // It is still a raised result, on BMI and waist alone.
  assert.equal(over.raised, true);
  // Just under the ceiling it is printed as normal.
  const under = computeBmiWaist({ heightCm: 165, weightKg: 92, waistCm: 105, sex: "female" });
  assert.ok(under.bmi < 35);
  assert.equal(under.whtrApplies, true);
  assert.ok(under.whtr > 0);
});

test("every figure is banded at the precision it is printed at", () => {
  assert.equal(roundTo(22.96, 1), 23);
  assert.equal(roundTo(0.4999, 2), 0.5);
  assert.equal(roundTo(null, 2), null);
  // 165cm / 62.6kg is BMI 22.99, which prints as 23.0. It must not print as
  // 23.0 and be called the healthy range at the same time.
  const r = computeBmiWaist({ heightCm: 165, weightKg: 62.6, waistCm: 70, sex: "female" });
  assert.equal(r.bmi, 23);
  assert.equal(r.bmiBand.id, "overweight");
  // 98cm waist over 111.4cm hips is 0.8797, which prints as 0.88.
  const w = computeBmiWaist({ heightCm: 175, weightKg: 70, waistCm: 98, sex: "female", hipCm: 111.4 });
  assert.equal(w.whr, 0.88);
  assert.equal(w.whrBand.id, "over");
});

test("all four inside their healthy bands returns a healthy result and no panel", () => {
  const r = computeBmiWaist({ heightCm: 175, weightKg: 68, waistCm: 82, sex: "male", hipCm: 98 });
  assert.equal(r.bmi, 22.2);
  assert.equal(r.bmiBand.id, "healthy");
  assert.equal(r.bmiBandGeneral.id, "healthy");
  assert.equal(r.waistBand.id, "below");
  assert.equal(r.whtrBand.id, "healthy");
  assert.equal(r.whrBand.id, "under");
  assert.equal(r.raised, false);
  assert.equal(r.healthInterest, "bmi-waist");
  assert.equal(r.answers.outcome, "healthy");
});

test("a healthy BMI with a raised waist is still a raised result, which is the point", () => {
  // 178cm / 72kg -> BMI 22.7, healthy on NICE's 23 as well as on 25. Waist 82cm
  // is over the women's 80cm cut-point, so the waist alone carries the result.
  const r = computeBmiWaist({ heightCm: 178, weightKg: 72, waistCm: 82, sex: "female" });
  assert.equal(r.bmi, 22.7);
  assert.equal(r.bmiBand.id, "healthy");
  assert.equal(r.bmiBand.healthy, true);
  assert.equal(r.bmiBandGeneral.id, "healthy");
  assert.equal(r.waistBand.id, "increased");
  assert.equal(r.whtrBand.id, "healthy", "waist-to-height is fine, so only the waist is raised");
  assert.equal(r.raised, true);
  assert.equal(r.healthInterest, "panorama");
  assert.equal(r.answers.outcome, "raised");
});

test("the adjusted thresholds catch someone the general ones would wave through", () => {
  // 165cm / 65kg -> BMI 23.9. Overweight on NICE, healthy on 25 and 30, and
  // every other measure is fine. Without the adjustment this reads as clear.
  const r = computeBmiWaist({ heightCm: 165, weightKg: 65, waistCm: 76, sex: "female", hipCm: 96 });
  assert.equal(r.bmi, 23.9);
  assert.equal(r.bmiBand.id, "overweight");
  assert.equal(r.bmiBandGeneral.id, "healthy");
  assert.equal(r.waistBand.id, "below");
  assert.equal(r.whtrBand.id, "healthy");
  assert.equal(r.whrBand.id, "under");
  assert.equal(r.raised, true);
  assert.equal(r.healthInterest, "panorama");
});

test("the same waist on the men's cut-points reads differently, and only that changes", () => {
  const base = { heightCm: 178, weightKg: 72, waistCm: 86 };
  const asMan = computeBmiWaist({ ...base, sex: "male" });
  const asWoman = computeBmiWaist({ ...base, sex: "female" });
  assert.equal(asMan.bmi, asWoman.bmi);
  assert.equal(asMan.whtr, asWoman.whtr);
  assert.equal(asMan.waistBand.id, "below");
  assert.equal(asWoman.waistBand.id, "increased");
  assert.equal(asMan.raised, false);
  assert.equal(asWoman.raised, true);
});

test("an underweight BMI is a raised result too, not a pass", () => {
  // 175cm / 55kg -> BMI 18.0, under 18.5. Waist and ratio are both fine.
  const r = computeBmiWaist({ heightCm: 175, weightKg: 55, waistCm: 70, sex: "male" });
  assert.equal(r.bmi, 18);
  assert.equal(r.bmiBand.id, "underweight");
  assert.equal(r.waistBand.id, "below");
  assert.equal(r.whtrBand.id, "healthy");
  assert.equal(r.raised, true);
  assert.equal(r.healthInterest, "panorama");
});

test("a substantially increased waist reads that band and recommends the panel", () => {
  const r = computeBmiWaist({ heightCm: 172, weightKg: 96, waistCm: 108, sex: "male", hipCm: 110 });
  assert.equal(r.bmiBand.id, "obese");
  assert.equal(r.waistBand.id, "substantial");
  // 108/172 = 0.63, which is NICE's top waist-to-height band rather than the middle one.
  assert.equal(r.whtr, 0.63);
  assert.equal(r.whtrBand.id, "high");
  assert.equal(r.whrBand.id, "over");
  assert.equal(r.raised, true);
  assert.equal(r.healthInterest, "panorama");
});

test("the tool asks three screens, the hip one is skippable, and sex rides the waist screen", () => {
  assert.equal(BMI_WAIST_STEPS.length, 3);
  assert.deepEqual(BMI_WAIST_STEPS.map((s) => s.id), ["body", "waist", "hip"]);
  assert.equal(BMI_WAIST_STEPS.filter((s) => s.id === "sex").length, 0, "sex still has its own step");
  const waist = BMI_WAIST_STEPS.find((s) => s.id === "waist");
  assert.equal(waist.choice.id, "sex");
  assert.deepEqual(waist.choice.options.map((o) => o.value), ["male", "female"]);
  for (const o of waist.choice.options) assert.equal(o.points, undefined);
  // The hip step is the only one carrying a skip path, and it needs one.
  const skippable = BMI_WAIST_STEPS.filter((s) => s.unknownLabel);
  assert.deepEqual(skippable.map((s) => s.id), ["hip"]);
  assert.equal(skippable[0].field.id, "hipCm");
});

test("answers sent with the lead stay inside the backend's key and length limits", () => {
  // The fullest case: every optional field present, plus the optIn the form adds.
  const r = computeBmiWaist({ heightCm: 165, weightKg: 63, waistCm: 86, sex: "female", hipCm: 98 });
  const keys = [...Object.keys(r.answers), "optIn"];
  assert.ok(keys.length <= 16, `${keys.length} answer keys`);
  for (const k of keys) assert.match(k, /^[a-zA-Z][a-zA-Z0-9_]{0,39}$/);
  for (const v of Object.values(r.answers)) assert.ok(String(v).length <= 200);
  assert.equal(r.answers.bmi, "23.1");
  assert.equal(r.answers.whtr, "0.52");
  assert.equal(r.answers.whr, "0.88");
});

// ---------------------------------------------------------------------------
// Part 2 sections. None of these score anything, so none of these tests can
// change a number above. They pin the mechanics: totals, packing, the
// separation from the instrument, and the words on the share card.
// ---------------------------------------------------------------------------

const ANSWER_KEY_RE = /^[a-zA-Z][a-zA-Z0-9_]{0,39}$/;

/** The backend takes 16 keys; the form adds optIn, so a tool may send 15. */
function assertAnswerLimits(answers, label) {
  const keys = Object.keys(answers);
  assert.ok(keys.length <= 15, `${label}: ${keys.length} answer keys, leaving no room for optIn`);
  for (const k of keys) assert.match(k, ANSWER_KEY_RE, `${label}: key ${k}`);
  for (const [k, v] of Object.entries(answers)) assert.ok(String(v).length <= 200, `${label}: ${k} is ${String(v).length} chars`);
}

const everyFoodMaxed = Object.fromEntries(FOODS.map((f) => [f.code, MAX_TIMES]));
const everyDrinkMaxed = Object.fromEntries(SUGARY_DRINKS.map((d) => [d.code, MAX_TIMES]));
const fullPlate = {
  foods: everyFoodMaxed,
  proportion: "quarter",
  veg: "never",
  protein: "every",
  proteins: ["fish", "beans", "eggs", "chicken", "meat", "groundnut"],
  drinks: everyDrinkMaxed,
  fried: MAX_TIMES,
};

console.log("\nWeek on a plate (Part 2 of the diabetes tool, short form on the BMI tool)");

test("counters run 0 to 7, and 7 prints as 7+", () => {
  assert.equal(timesLabel(0), "0");
  assert.equal(timesLabel(6), "6");
  assert.equal(timesLabel(7), "7+");
  assert.equal(timesLabel(12), "7+");
});

test("the running total sums the tiles, clamps each to seven, and knows when a tile is capped", () => {
  assert.equal(countTotal({ kk: 3, bk: 2 }), 5);
  assert.equal(countTotal({ kk: 9, bk: -2 }), 7);
  assert.equal(countTotal({}), 0);
  assert.equal(countTotal(undefined), 0);
  assert.equal(anyCapped({ kk: 3 }), false);
  assert.equal(anyCapped({ kk: 7 }), true);
  assert.equal(countTotal(everyFoodMaxed), FOODS.length * MAX_TIMES);
});

test("the working food list is the seventeen the brief names, each with a unique two-letter code", () => {
  assert.equal(FOODS.length, 17);
  const codes = FOODS.map((f) => f.code);
  assert.equal(new Set(codes).size, 17);
  for (const c of codes) assert.match(c, /^[a-z]{2}$/);
  for (const name of ["Kenkey", "Banku", "Fufu", "Waakye", "Jollof rice", "Plain rice", "Gari or eba", "Boiled yam", "Fried yam", "Boiled plantain", "Hausa koko", "Tom brown", "Bread", "Tuo zaafi", "Kokonte", "Red red"]) {
    assert.ok(FOODS.some((f) => f.label === name), name);
  }
  assert.ok(FOODS.some((f) => f.label.startsWith("Fried plantain")));
});

test("the foods feedback is arithmetic: it states the total and the per-day reading", () => {
  assert.match(foodsFeedback({}), /Nothing logged yet/);
  assert.match(foodsFeedback({ kk: 3 }), /^3 starchy meals a week so far, under one a day/);
  assert.match(foodsFeedback({ kk: 1 }), /^1 starchy meal a week/);
  assert.match(foodsFeedback({ kk: 7 }), /^At least 7 starchy meals a week, about one a day/);
  assert.match(foodsFeedback({ kk: 6, bk: 6 }), /about two a day/);
  assert.match(foodsFeedback({ kk: 6, bk: 6, ff: 6, wk: 3 }), /about three a day/);
  assert.match(foodsFeedback({ kk: 6, bk: 6, ff: 6, wk: 6, jr: 6 }), /more than three a day/);
  // The plate proportion question is trailed once the week is a real one.
  assert.match(foodsFeedback({ kk: 6, bk: 6 }), /plate proportion/);
});

test("every one-line observation is non-empty for every option, and empty for an unknown one", () => {
  for (const v of ["quarter", "third", "half", "most"]) assert.ok(proportionFeedback(v).length > 20, v);
  for (const v of ["never", "some", "most", "every"]) {
    assert.ok(vegFeedback(v).length > 10, `veg ${v}`);
    assert.ok(proteinFeedback(v).length > 10, `protein ${v}`);
  }
  assert.equal(proportionFeedback("banana"), "");
  assert.equal(vegFeedback(undefined), "");
  assert.match(proteinsFeedback([]), /None picked/);
  assert.match(proteinsFeedback(["fish"]), /^Fish logged/);
  assert.match(proteinsFeedback(["fish", "beans", "eggs"]), /^Fish, beans and eggs logged/);
  assert.match(drinksFeedback({}), /No sugary drinks/);
  assert.match(drinksFeedback({ ml: 2, fz: 1 }), /^3 sugary drinks a week, about 0\.4 a day/);
  assert.match(drinksFeedback({ ml: 7 }), /^At least 7 sugary drinks a week, about 1 a day/);
});

test("no observation names a health outcome, because that copy waits for its sources", () => {
  const lines = [
    foodsFeedback({ kk: 6, bk: 6, ff: 6, wk: 6, jr: 6 }),
    ...["quarter", "third", "half", "most"].map(proportionFeedback),
    ...["never", "some", "most", "every"].map(vegFeedback),
    ...["never", "some", "most", "every"].map(proteinFeedback),
    drinksFeedback({ ml: 7, fz: 7 }),
    cubesFeedback(5),
  ];
  for (const line of lines) {
    assert.doesNotMatch(line, /diabetes|risk|unhealthy|bad|danger|too much|should/i, line);
  }
});

test("the summary sorts foods by times, counts the week, and restates each pick", () => {
  const s = summarisePlate({
    foods: { kk: 3, bk: 5, br: 7, tz: 0 },
    proportion: "half",
    veg: "most",
    protein: "some",
    proteins: ["beans", "fish"],
    drinks: { sk: 7, ml: 1 },
    fried: 2,
  });
  assert.deepEqual(s.foods.map((f) => [f.code, f.times]), [["br", 7], ["bk", 5], ["kk", 3]]);
  assert.equal(s.starchyPerWeek, 15);
  assert.equal(s.starchyPerDay, "2.1");
  assert.equal(s.starchyAtLeast, true);
  assert.equal(s.proportion.value, "half");
  assert.equal(s.veg.label, "Most meals");
  assert.equal(s.protein.label, "Some meals");
  assert.deepEqual(s.proteins.map((p) => p.value), ["fish", "beans"]);
  assert.deepEqual(s.drinks.map((d) => [d.code, d.times]), [["sk", 7], ["ml", 1]]);
  assert.equal(s.drinksPerWeek, 8);
  assert.equal(s.fried, 2);
});

test("an empty Part 2 still summarises, with nulls rather than throws", () => {
  const s = summarisePlate({});
  assert.equal(s.starchyPerWeek, 0);
  assert.equal(s.starchyPerDay, "0");
  assert.deepEqual(s.foods, []);
  assert.equal(s.proportion, null);
  assert.equal(s.veg, null);
  assert.equal(s.fried, null);
  assert.deepEqual(s.swaps, []);
});

test("every food has a sourced swap, and the swaps come back most-eaten first", () => {
  for (const f of FOODS) {
    const s = SWAPS[f.code];
    assert.ok(s, `no swap for ${f.label}`);
    assert.ok(s.text.length > 80, `${f.label} swap is thin`);
    assert.ok(s.cite && s.cite.length > 5, `${f.label} swap has no citation`);
    assert.doesNotMatch(s.text, /—/, `${f.label}: no em dashes`);
  }
  const s = summarisePlate({ foods: { kk: 2, br: 7, fy: 4 } });
  assert.deepEqual(s.swaps.map((x) => x.code), ["br", "fy", "kk"]);
  assert.equal(s.swaps[0].label, "Bread");
  assert.equal(s.swaps[0].times, 7);
  assert.deepEqual(summarisePlate({}).swaps, []);
});

test("foods with no published value say so, and no swap invents a number for them", () => {
  assert.deepEqual(NO_PUBLISHED_VALUE.sort(), ["br", "fp", "hk", "jr", "rr", "tb", "wk"].sort());
  for (const code of NO_PUBLISHED_VALUE) {
    assert.match(SWAPS[code].text, /No (Ghanaian )?(study|value|test)/i, `${code} must say no study has measured it`);
  }
  // Kokonte's published figure is not quoted; brown bread is not called low GI.
  assert.doesNotMatch(SWAPS.kn.text, /\b7\b|\b18\b/);
  assert.match(SWAPS.kn.text, /not quoting the number/);
  assert.doesNotMatch(SWAPS.br.text, /low GI|low glycaemic/i);
  assert.match(SWAPS.br.text, /fibre and fullness/);
  // Kelewele and Hausa koko never borrow a figure.
  assert.match(SWAPS.fp.text, /^No study has measured kelewele/);
  assert.match(SWAPS.hk.text, /^No Ghanaian study has measured Hausa koko/);
  assert.doesNotMatch(SWAPS.hk.text, /\b59\b/);
  assert.doesNotMatch(SWAPS.tb.text, /\b42\b/);
});

test("the Ghanaian GI findings are introduced as small studies and never as a personal figure", () => {
  for (const code of ["bk", "ff", "by", "fy", "tz", "kn"]) {
    assert.match(SWAPS[code].text, /ten people|ten adults|Ghanaian (study|tests?)/i, code);
  }
  assert.match(SWAPS.ff.text, /with light soup and fish/);
  assert.match(SWAPS.ff.text, /91/);
  assert.match(SWAPS.by.text, /white yam/);
  const all = Object.values(SWAPS).map((s) => s.text).join(" ");
  assert.doesNotMatch(all, /your (personal )?(GI|glycaemic index|glycaemic load)/i);
  assert.doesNotMatch(all, /validated/i);
  assert.doesNotMatch(all, /diabetes-friendly|superfood|causing (your )?diabetes/i);
});

test("the guidance lines read the week against Ghana's guidelines and never convert counts to grams", () => {
  const s = summarisePlate({ foods: { kk: 3 }, proportion: "most", veg: "some", protein: "some", proteins: ["fish"], drinks: { ml: 2, sk: 7 }, fried: 3 });
  const ids = s.guidance.map((g) => g.id);
  assert.deepEqual(ids, ["accompaniment", "bowl", "veg", "protein", "drinks", "fried"]);
  for (const g of s.guidance) {
    assert.ok(g.cite, `${g.id} has no citation`);
    assert.doesNotMatch(g.text, /—/);
  }
  const drinks = s.guidance.find((g) => g.id === "drinks");
  assert.match(drinks.text, /We do not turn your 9\+ a week into grams/);
  assert.match(drinks.text, /malt drinks count/);
  assert.match(drinks.text, /four tablespoons, about 50 g/);
  const veg = s.guidance.find((g) => g.id === "veg");
  assert.match(veg.text, /at least five servings of vegetables a day/);
  assert.match(veg.text, /one level soup ladle/);
  assert.match(veg.text, /Three in four Ghanaian adults/);
  const protein = s.guidance.find((g) => g.id === "protein");
  assert.match(protein.text, /three and a half matchboxes/);
  // No drinks, no fried food: the lines say so rather than vanish or nag.
  const quiet = summarisePlate({ foods: { kk: 3 }, proportion: "half", veg: "every", protein: "every", proteins: ["fish", "beans"], drinks: {}, fried: 0 });
  assert.match(quiet.guidance.find((g) => g.id === "drinks").text, /^No sugary drinks logged/);
  assert.equal(quiet.guidance.find((g) => g.id === "fried"), undefined);
  assert.match(quiet.guidance.find((g) => g.id === "protein").text, /Beans and groundnut count/);
  assert.match(quiet.guidance.find((g) => g.id === "bowl").text, /close to that picture/);
});

test("the guideline bowl fraction is FAO's 45.6% and the serving sizes are the guideline's own", () => {
  assert.equal(GUIDELINE_STAPLE_FRACTION, 0.456);
  const byCode = Object.fromEntries(FOODS.map((f) => [f.code, f.serving]));
  assert.equal(byCode.pr, "four heaped tablespoons");
  assert.equal(byCode.kk, "one 125 g sardine tin (Ga kenkey)");
  assert.equal(byCode.by, "one sardine can");
  assert.equal(byCode.ff, "one medium orange");
  assert.equal(byCode.bp, "one and a half fingers of apem");
  assert.equal(byCode.wk, undefined, "waakye has no guideline serving");
  assert.match(proportionFeedback("most"), /a little under half by weight/);
  assert.match(PLATE_STEPS.find((s) => s.id === "proportion").help, /asanka/);
});

test("every study the plate lines cite is on the Sources list, and the guideline is first", () => {
  const labels = PLATE_SOURCES.map((s) => s.label).join("\n");
  assert.match(PLATE_SOURCES[0].label, /Food-Based Dietary Guidelines/);
  for (const name of ["Eli-Cophie", "Brakohiapa", "Otoo", "Adu-Gyamfi", "Yeboah", "Ampofo", "Dapuliga", "Kouamé", "Ogbuji", "Thompson", "Moghaddam", "Atkinson", "Okareh", "Nwaliowe", "Annor", "Kushitor", "Abdulai", "STEPS", "sugars intake", "physical activity"]) {
    assert.ok(labels.includes(name), `Sources list is missing ${name}`);
  }
  assert.doesNotMatch(labels, /—/);
});

test("the full plate packs into two keys that survive a round trip", () => {
  const values = {
    foods: { kk: 3, bk: 2, br: 7 },
    proportion: "half",
    veg: "most",
    protein: "some",
    proteins: ["fish", "beans"],
    drinks: { ml: 2, fz: 1 },
    fried: 3,
  };
  const packed = packPlate(values);
  assert.deepEqual(Object.keys(packed), ["plate", "habits"]);
  assert.equal(packed.plate, "f:kk3.bk2.br7|p:half");
  assert.equal(packed.habits, "v:most|pr:some|px:fish.beans|sd:ml2.fz1|fr:3");
  assert.deepEqual(parsePlate(packed.plate, packed.habits), values);
});

test("the packed plate stays under 200 characters even with every counter at the cap", () => {
  const packed = packPlate(fullPlate);
  assert.ok(packed.plate.length < 200, `plate is ${packed.plate.length}`);
  assert.ok(packed.habits.length < 200, `habits is ${packed.habits.length}`);
  assert.ok(packPlateShort(fullPlate).length < 200);
  // Zero counters and unknown proteins are dropped rather than written.
  assert.equal(packPlate({ foods: { kk: 0, zz: 4 }, proteins: ["fish", "tofu"] }).plate, "f:|p:");
  assert.equal(packPlate({ proteins: ["fish", "tofu"] }).habits, "v:|pr:|px:fish|sd:|fr:");
});

test("the plate steps carry unique ids that never collide with the FINDRISC ones", () => {
  const ids = PLATE_STEPS.map((s) => s.id);
  assert.deepEqual(ids, ["foods", "proportion", "veg", "protein", "proteins", "drinks", "fried"]);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.ok(!FINDRISC_STEPS.some((s) => s.id === id), `${id} clashes with FINDRISC`);
  assert.deepEqual(PLATE_STEPS_SHORT.map((s) => s.id), ["foods", "proportion", "drinks"]);
  // No plate step scores anything: no option anywhere carries points.
  for (const s of PLATE_STEPS) for (const o of s.options || []) assert.equal(o.points, undefined);
});

test("the which-proteins step drops out when protein is never", () => {
  const step = PLATE_STEPS.find((s) => s.id === "proteins");
  assert.equal(step.skipIf({ protein: "never" }), true);
  assert.equal(step.skipIf({ protein: "some" }), false);
});

console.log("\nHeart habits (Part 2 of the heart age tool)");

test("the habit steps never collide with the chart steps, and none carries points", () => {
  const ids = HABIT_STEPS.map((s) => s.id);
  assert.deepEqual(ids, ["cubes", "saltFoods", "tableSalt", "minutes", "alcohol", "sleep", "familyCvd"]);
  for (const id of ids) assert.ok(!HEART_STEPS.some((s) => s.id === id), `${id} clashes with the chart`);
  for (const s of HABIT_STEPS) for (const o of s.options || []) assert.equal(o.points, undefined);
  assert.equal(CUBES_MAX, 5);
});

test("the cube feedback does the weekly arithmetic and nothing more", () => {
  assert.match(cubesFeedback(0), /No seasoning cubes/);
  assert.match(cubesFeedback(2), /^2 cubes a day is about 14 a week/);
  assert.match(cubesFeedback(5), /^At least 5 cubes a day is about 35 a week/);
  assert.match(saltFoodsFeedback({ shito: "most", saltedFish: "some" }), /^Shito most days, salted or smoked fish some days/);
  assert.equal(saltFoodsFeedback({ shito: "most" }), "");
});

test("the habits summary restates every answer and reads each against its published guidance", () => {
  const s = summariseHabits({
    cubes: 2,
    saltFoods: { shito: "most", saltedFish: "some" },
    tableSalt: "never",
    minutes: "150to299",
    alcohol: "1to2",
    sleep: "7to9",
    familyCvd: "no",
  });
  assert.equal(s.rows.length, 8);
  assert.equal(s.rows.find((r) => r.id === "cubes").value, "2 a day");
  assert.equal(s.rows.find((r) => r.id === "minutes").value, "150 to 299 minutes");
  assert.equal(s.rows.find((r) => r.id === "sleep").value, "7 to 9 hours");
  for (const r of s.rows) {
    assert.ok(r.threshold && r.threshold.length > 40, `${r.id} has no guidance text`);
    assert.doesNotMatch(r.threshold, /—/);
    if (r.id !== "familyCvd") assert.ok(r.cite, `${r.id} has no citation`);
  }
  // Unanswered habits are left out rather than printed as blanks.
  assert.equal(summariseHabits({ cubes: 5 }).rows.length, 1);
  assert.equal(summariseHabits({ cubes: 5 }).rows[0].value, "5+ a day");
});

test("activity and sleep get a within-or-outside reading; salt and alcohol get context, never grams", () => {
  const within = summariseHabits({ minutes: "150to299", sleep: "7to9" }).rows;
  assert.equal(within.find((r) => r.id === "minutes").status, "within");
  assert.equal(within.find((r) => r.id === "sleep").status, "within");
  const outside = summariseHabits({ minutes: "under30", sleep: "under6" }).rows;
  assert.equal(outside.find((r) => r.id === "minutes").status, "outside");
  assert.equal(outside.find((r) => r.id === "sleep").status, "outside");
  assert.equal(summariseHabits({ minutes: "300plus" }).rows[0].status, "within");
  // Salt rows carry no status and say plainly that the count is not converted.
  const salt = summariseHabits({ cubes: 3, saltFoods: { shito: "daily", saltedFish: "daily" }, tableSalt: "most" }).rows;
  for (const r of salt) assert.equal(r.status, null, r.id);
  const cubes = salt.find((r) => r.id === "cubes");
  assert.match(cubes.threshold, /roughly half salt by weight/);
  assert.match(cubes.threshold, /We do not turn your 3 a day into grams/);
  assert.match(cubes.threshold, /8\.3 g a day, 78% above the limit/);
  assert.doesNotMatch(cubes.threshold, /\d+(\.\d+)? g of salt per cube|one cube (is|equals)/i);
  assert.match(salt.find((r) => r.id === "saltedFish").threshold, /Momoni is about 30% salt/);
  assert.match(salt.find((r) => r.id === "shito").threshold, /No published sodium figure/);
  assert.match(salt.find((r) => r.id === "tableSalt").threshold, /one in ten/);
  // Sleep is labelled AHA and not WHO; alcohol carries WHO's no-safe-level position.
  const sleep = outside.find((r) => r.id === "sleep");
  assert.match(sleep.threshold, /American Heart Association/);
  assert.match(sleep.threshold, /WHO publishes no sleep guideline/);
  assert.doesNotMatch(sleep.threshold, /WHO (recommends|says) 7/);
  const alcohol = summariseHabits({ alcohol: "3to7" }).rows[0];
  assert.match(alcohol.threshold, /no level of alcohol is safe/);
  assert.match(summariseHabits({ alcohol: "none" }).rows[0].threshold, /^None logged/);
});

test("every study the habit lines cite is on the Sources list", () => {
  const labels = HABIT_SOURCES.map((s) => s.label).join("\n");
  assert.match(HABIT_SOURCES[0].label, /Food-Based Dietary Guidelines/);
  for (const name of ["Menyanu", "STEPS", "Archer", "Davis", "Sanni", "Cappuccio", "Safianu", "sodium intake", "physical activity", "No level of alcohol", "Life's Essential 8"]) {
    assert.ok(labels.includes(name), `Sources list is missing ${name}`);
  }
  assert.doesNotMatch(labels, /—/);
});

test("the habits pack into one short key and round-trip", () => {
  const values = {
    cubes: 2,
    saltFoods: { shito: "most", saltedFish: "some" },
    tableSalt: "never",
    minutes: "150to299",
    alcohol: "1to2",
    sleep: "7to9",
    familyCvd: "no",
  };
  const packed = packHabits(values);
  assert.equal(packed.habits, "cb:2|sh:most|sf:some|ts:never|mn:150to299|al:1to2|sl:7to9|fh:no");
  assert.ok(packed.habits.length < 200);
  assert.deepEqual(parseHabits(packed.habits), values);
  assert.equal(parseHabits(packHabits({}).habits).cubes, null);
});

console.log("\nLifestyle (Part 2 of the BMI and waist tool)");

test("the BMI lifestyle part is activity, weight change and the short plate", () => {
  assert.deepEqual(LIFESTYLE_STEPS.map((s) => s.id), ["activityLevel", "weightChange", "foods", "proportion", "drinks"]);
  for (const id of ["activityLevel", "weightChange"]) assert.ok(!BMI_WAIST_STEPS.some((s) => s.id === id));
  for (const s of LIFESTYLE_STEPS) for (const o of s.options || []) assert.equal(o.points, undefined);
});

test("the lifestyle answers pack into a single key, leaving the BMI lead room for optIn", () => {
  const values = { activityLevel: "sitting", weightChange: "gainedLot", foods: { kk: 3, bk: 2 }, proportion: "half", drinks: { ml: 2 } };
  const packed = packLifestyle(values);
  assert.deepEqual(Object.keys(packed), ["lifestyle"]);
  assert.equal(packed.lifestyle, "act:sitting|wt:gainedLot|f:kk3.bk2|p:half|sd:ml2");
  assert.deepEqual(parseLifestyle(packed.lifestyle), values);
  const worst = packLifestyle({ activityLevel: "exercise", weightChange: "gainedLittle", ...fullPlate });
  assert.ok(worst.lifestyle.length < 200, `lifestyle is ${worst.lifestyle.length}`);
});

test("the lifestyle summary restates the picks, reads activity against the guideline, and reuses the plate summary", () => {
  const s = summariseLifestyle({ activityLevel: "feet", weightChange: "stable", foods: { wk: 4 }, proportion: "third", drinks: {} });
  assert.equal(s.activity.label, "On my feet");
  assert.match(s.activityGuidance.text, /150 to 300 minutes a week/);
  assert.ok(s.activityGuidance.cite);
  assert.equal(s.weightChange.label, "About the same");
  assert.match(s.weightChangeNote, /does not score it/);
  assert.equal(s.plate.starchyPerWeek, 4);
  assert.equal(s.plate.proportion.value, "third");
  assert.match(s.plate.swaps[0].text, /^No study has measured waakye/);
  for (const v of ["sitting", "physical", "exercise"]) assert.ok(activityGuidance(v).text.length > 60, v);
  assert.match(activityGuidance("sitting").text, /limit the time they spend sitting/);
  assert.equal(activityGuidance("nope"), null);
  assert.equal(summariseLifestyle({}).activityGuidance, null);
  assert.equal(summariseLifestyle({}).weightChangeNote, null);
});

test("each tool's own Sources list carries its Part 2 studies", () => {
  const diabetes = TOOLS.find((t) => t.slug === "diabetes-risk");
  const heart = TOOLS.find((t) => t.slug === "heart-age");
  const bmi = TOOLS.find((t) => t.slug === "bmi-waist");
  const has = (tool, text) => tool.sources.some((s) => s.label.includes(text));
  assert.ok(has(diabetes, "Lindstrom"), "FINDRISC source still first");
  assert.ok(has(diabetes, "Eli-Cophie"));
  assert.ok(has(diabetes, "Food-Based Dietary Guidelines"));
  assert.ok(has(heart, "Menyanu"));
  assert.ok(has(heart, "Life's Essential 8"));
  assert.ok(has(bmi, "NICE guideline NG246"), "NICE source still present");
  assert.ok(has(bmi, "Thompson"));
  for (const t of [diabetes, heart, bmi]) {
    for (const s of t.sources) assert.ok(s.label && s.label.length > 10);
  }
});

test("the one-sentence note says the section is guidance and not part of the score", () => {
  const note = lifestyleNote("FINDRISC score");
  assert.match(note, /guidance drawn from dietary and activity recommendations/);
  assert.match(note, /not part of your FINDRISC score/);
  assert.match(note, /Part 1 alone/);
  assert.equal(note.split(". ").length, 1, "one sentence");
  assert.doesNotMatch(note, /—/, "no em dashes");
});

console.log("\nComposition: Part 2 never changes a Part 1 result");

const findriscCases = [
  { age: "u45", sex: "male", heightCm: 175, weightKg: 70, waistCm: 85, activity: "yes", diet: "yes", bpMeds: "no", highGlucose: "no", family: "none" },
  { age: "o64", sex: "female", heightCm: 160, weightKg: 95, waistCm: 110, activity: "no", diet: "no", bpMeds: "yes", highGlucose: "yes", family: "close" },
  { age: "55to64", sex: "male", heightCm: 175, weightKg: 95, waistCm: 105, activity: "no", diet: "no", bpMeds: "yes", highGlucose: "no", family: "close" },
  { age: "45to54", sex: "female", heightCm: 165, weightKg: 80, waistCm: 92, activity: "no", diet: "yes", bpMeds: "no", highGlucose: "yes", family: "extended" },
];

test("the two-part flows keep the instrument's own steps as Part 1, by reference", () => {
  assert.equal(DIABETES_PARTS[0].steps, FINDRISC_STEPS);
  assert.equal(HEART_PARTS[0].steps, HEART_STEPS);
  assert.equal(BMI_PARTS[0].steps, BMI_WAIST_STEPS);
  assert.equal(DIABETES_PARTS[1].steps, PLATE_STEPS);
  assert.equal(HEART_PARTS[1].steps, HABIT_STEPS);
  assert.equal(BMI_PARTS[1].steps, LIFESTYLE_STEPS);
});

test("step counts: diabetes 8 + 7, heart 5 + 7, BMI 3 + 5", () => {
  assert.equal(countQuestions(DIABETES_PARTS), 15);
  assert.equal(countQuestions(HEART_PARTS), 12);
  assert.equal(countQuestions(BMI_PARTS), 8);
  for (const parts of [DIABETES_PARTS, HEART_PARTS, BMI_PARTS]) {
    assert.equal(parts.length, 2);
    assert.equal(parts[1].number, 2);
    assert.ok(parts[1].intro.length > 40);
    assert.doesNotMatch(parts[1].intro, /—/);
    const ids = parts.flatMap((p) => p.steps.map((s) => s.id));
    assert.equal(new Set(ids).size, ids.length, "ids unique across both parts");
  }
});

test("FINDRISC: the same Part 1 answers give the same score, band and items with or without Part 2", () => {
  for (const c of findriscCases) {
    const alone = computeFindrisc(c);
    const full = computeDiabetesFull({ ...c, ...fullPlate });
    const empty = computeDiabetesFull(c);
    for (const r of [full, empty]) {
      assert.equal(r.score, alone.score);
      assert.equal(r.band.id, alone.band.id);
      assert.deepEqual(r.items, alone.items);
      assert.deepEqual(r.topItems, alone.topItems);
      assert.equal(r.bmi, alone.bmi);
      assert.equal(r.healthInterest, alone.healthInterest);
      for (const [k, v] of Object.entries(alone.answers)) assert.equal(r.answers[k], v, `answers.${k}`);
    }
    assert.equal(full.plate.starchyPerWeek, FOODS.length * MAX_TIMES);
    assert.equal(empty.plate.starchyPerWeek, 0);
  }
});

test("FINDRISC lead answers: the original keys plus plate and habits, inside the limits", () => {
  const r = computeDiabetesFull({ ...findriscCases[3], ...fullPlate });
  assert.deepEqual(
    Object.keys(r.answers),
    ["age", "sex", "bmi", "waistCm", "activity", "diet", "bpMeds", "highGlucose", "family", "score", "band", "plate", "habits"],
  );
  assertAnswerLimits(r.answers, "diabetes");
});

test("heart age: the same Part 1 answers give the same cell, band and heart age with or without Part 2", () => {
  const habits = { cubes: 5, saltFoods: { shito: "daily", saltedFish: "daily" }, tableSalt: "most", minutes: "under30", alcohol: "15plus", sleep: "under6", familyCvd: "yes" };
  const cases = [
    { age: 55, sex: "male", smoker: "yes", systolic: 150, heightCm: 175, weightKg: 95 },
    { age: 41, sex: "female", smoker: "no", systolic: 110, heightCm: 165, weightKg: 60 },
    { age: 70, sex: "male", smoker: "yes", systolic: 185, heightCm: 170, weightKg: 105 },
    { age: 55, sex: "male", smoker: "yes", systolic: "unknown", heightCm: 175, weightKg: 95 },
    { age: 30, sex: "male", smoker: "no", systolic: 120, heightCm: 175, weightKg: 70 },
  ];
  for (const c of cases) {
    const alone = computeHeartAge(c);
    const full = computeHeartFull({ ...c, ...habits });
    assert.equal(full.kind, alone.kind);
    assert.equal(full.risk, alone.risk);
    assert.deepEqual(full.band, alone.band);
    assert.deepEqual(full.heartAge, alone.heartAge);
    assert.deepEqual(full.drivers, alone.drivers);
    for (const [k, v] of Object.entries(alone.answers)) assert.equal(full.answers[k], v, `answers.${k}`);
    assert.equal(full.habits.rows.length, 8);
    assertAnswerLimits(full.answers, `heart ${c.age}`);
  }
});

test("BMI and waist: the same measurements give the same four bands with or without Part 2", () => {
  const lifestyle = { activityLevel: "sitting", weightChange: "gainedLot", ...fullPlate };
  const cases = [
    { heightCm: 170, weightKg: 65, waistCm: 85, sex: "male" },
    { heightCm: 178, weightKg: 72, waistCm: 82, sex: "female" },
    { heightCm: 165, weightKg: 100, waistCm: 110, sex: "female" },
    { heightCm: 172, weightKg: 96, waistCm: 108, sex: "male", hipCm: 110 },
    { heightCm: 175, weightKg: 68, waistCm: 82, sex: "male", hipCm: 98 },
  ];
  for (const c of cases) {
    const alone = computeBmiWaist(c);
    const full = computeBmiFull({ ...c, ...lifestyle });
    assert.equal(full.bmi, alone.bmi);
    assert.deepEqual(full.bmiBand, alone.bmiBand);
    assert.deepEqual(full.waistBand, alone.waistBand);
    assert.deepEqual(full.whtrBand, alone.whtrBand);
    assert.deepEqual(full.whrBand, alone.whrBand);
    assert.equal(full.raised, alone.raised);
    assert.equal(full.healthInterest, alone.healthInterest);
    for (const [k, v] of Object.entries(alone.answers)) assert.equal(full.answers[k], v, `answers.${k}`);
    assert.equal(Object.keys(full.answers).length, Object.keys(alone.answers).length + 1);
    assertAnswerLimits(full.answers, `bmi ${c.waistCm}`);
  }
});

test("genotype: the two follow-ups change the advice and the answers, never the square", () => {
  const alone = computeGenotype({ you: "AS", partner: "AS" });
  const full = computeGenotypeFull({ you: "AS", partner: "AS", basis: "sickling", familyScd: "yes" });
  assert.deepEqual(full.rows, alone.rows);
  assert.deepEqual(full.groups, alone.groups);
  assert.equal(full.pairingLine, alone.pairingLine);
  assert.equal(full.kind, "odds");
  assert.deepEqual(Object.keys(full.answers), ["yourGenotype", "partnerGenotype", "outcomes", "basis", "familyScd"]);
  assertAnswerLimits(full.answers, "genotype");
  // Without the follow-ups the square and its answers are untouched.
  const bare = computeGenotypeFull({ you: "AS", partner: "AS" });
  assert.deepEqual(bare.rows, alone.rows);
  assert.equal(bare.answers.basis, "");
});

test("a sickling-only, clinic-only or guessed genotype gets the electrophoresis recommendation more strongly", () => {
  const strong = ["sickling", "clinic", "guess"];
  for (const basis of strong) {
    const a = genotypeAdvice({ you: "AS", partner: "AA", basis, familyScd: "no" });
    assert.equal(a.strength, "strong", basis);
    assert.match(a.body, /electrophoresis or HPLC/i, basis);
    assert.ok(a.ctaLabel.length > 10, basis);
  }
  const confirmed = genotypeAdvice({ you: "AS", partner: "AA", basis: "electrophoresis", familyScd: "no" });
  assert.equal(confirmed.strength, "standard");
  assert.match(confirmed.headline, /states them outright/);
  // An unknown genotype is always the strong path, whatever the basis says.
  const unknown = genotypeAdvice({ you: "unknown", partner: "AS", basis: "electrophoresis", familyScd: "no" });
  assert.equal(unknown.strength, "strong");
  assert.equal(unknown.id, "unknown");
});

test("the family-history line answers all three options and the note says the odds did not move", () => {
  for (const familyScd of ["yes", "no", "unsure"]) {
    const a = genotypeAdvice({ you: "AS", partner: "AS", basis: "electrophoresis", familyScd });
    assert.ok(a.familyLine && a.familyLine.length > 30, familyScd);
    assert.doesNotMatch(a.familyLine, /—/);
  }
  assert.equal(genotypeAdvice({ you: "AS", partner: "AS", basis: "electrophoresis" }).familyLine, null);
  assert.match(FOLLOW_UP_NOTE, /do not change the odds/);
});

console.log("\nShare card");

const shareCases = [
  ["diabetes-risk", computeDiabetesFull({ ...findriscCases[3], ...fullPlate }), "17 out of 26", "High band"],
  ["heart-age", computeHeartFull({ age: 55, sex: "male", smoker: "yes", systolic: 150, heightCm: 175, weightKg: 95 }), "14%", "10% to under 20% 10-year risk"],
  ["heart-age", computeHeartFull({ age: 55, sex: "male", smoker: "yes", systolic: "unknown", heightCm: 175, weightKg: 95 }), "One number short", "No blood pressure reading yet"],
  ["heart-age", computeHeartFull({ age: 30, sex: "male", smoker: "no", systolic: 120, heightCm: 175, weightKg: 70 }), "Outside 40 to 74", "No published cell for this age"],
  ["bmi-waist", computeBmiFull({ heightCm: 165, weightKg: 63, waistCm: 86, sex: "female", hipCm: 98 }), "BMI 23.1", "Overweight"],
  ["genotype-compatibility", computeGenotypeFull({ you: "AS", partner: "AS", basis: "guess", familyScd: "unsure" }), "25%", "chance of a sickle cell condition, per pregnancy"],
  ["genotype-compatibility", computeGenotypeFull({ you: "AA", partner: "AS", basis: "guess", familyScd: "unsure" }), "0%", "no sickle cell condition possible from this pairing"],
  ["genotype-compatibility", computeGenotypeFull({ you: "AS", partner: "unknown" }), "Not yet", "One genotype still unconfirmed"],
];

test("every result has a card with the headline, the band, the URL and the disclaimer", () => {
  for (const [slug, result, headline, band] of shareCases) {
    const spec = shareSpecFor(slug, result);
    assert.equal(spec.slug, slug);
    assert.equal(spec.headline, headline, slug);
    assert.equal(spec.band, band, slug);
    assert.equal(spec.url, `${SHARE_HOST}/tools/${slug}`);
    assert.equal(spec.href, `https://${SHARE_HOST}/tools/${slug}`);
    assert.equal(spec.disclaimer, TOOL_DISCLAIMER);
    assert.ok(spec.meaning.length > 40 && spec.meaning.length < 200, `${slug} meaning ${spec.meaning.length}`);
    assert.equal(spec.fileName, `betterhealth-${slug}.png`);
    assert.doesNotMatch(JSON.stringify(spec), /—/);
  }
  assert.equal(shareSpecFor("nope", {}), null);
});

test("the share text carries the result and the link, and nothing personal", () => {
  for (const [slug, result] of shareCases) {
    const spec = shareSpecFor(slug, result);
    assert.match(spec.text, new RegExp(`Try yours free at https://${SHARE_HOST}/tools/${slug}$`));
    assert.match(spec.text, /^My .+ result: /);
    const blob = JSON.stringify(spec);
    // Raw answers never reach the card: no packed plate, no waist in cm, no phone shape.
    assert.doesNotMatch(blob, /f:[a-z]{2}\d|cb:\d|act:/, slug);
    assert.doesNotMatch(blob, /\b(86|92|110)\s?cm\b/, slug);
    assert.doesNotMatch(blob, /\b0\d{2}\s?\d{3}\s?\d{4}\b/, slug);
  }
});

test("the band meter on the card points at the band the instrument chose", () => {
  const d = shareSpecFor("diabetes-risk", shareCases[0][1]);
  assert.deepEqual(d.meter, { count: 5, active: 3 });
  const h = shareSpecFor("heart-age", shareCases[1][1]);
  assert.deepEqual(h.meter, { count: 5, active: 2 });
  const b = shareSpecFor("bmi-waist", shareCases[4][1]);
  assert.deepEqual(b.meter, { count: 4, active: 2 });
  assert.equal(shareSpecFor("heart-age", shareCases[2][1]).meter, null);
  assert.equal(shareSpecFor("genotype-compatibility", shareCases[5][1]).meter, null);
});

// ---------------------------------------------------------------------------
// The other three traits: ABO, Rh and G6PD.
//
// Every expected row below is worked out by hand from the published rule, not
// read back out of the implementation, so a change to the counting fails here.
// ---------------------------------------------------------------------------

console.log("\nABO blood group");

/** Possible groups for a pair, as a sorted string, for readable asserts. */
const aboPossible = (a, b) => aboOutcomes(a, b).possible.join(",");
const aboImpossible = (a, b) => aboOutcomes(a, b).impossible.join(",");

test("a two-allele pair reads to the right group, with O hiding behind A and B", () => {
  assert.equal(aboPhenotype("AA"), "A");
  assert.equal(aboPhenotype("AO"), "A");
  assert.equal(aboPhenotype("OA"), "A");
  assert.equal(aboPhenotype("BB"), "B");
  assert.equal(aboPhenotype("BO"), "B");
  assert.equal(aboPhenotype("AB"), "AB");
  assert.equal(aboPhenotype("BA"), "AB");
  assert.equal(aboPhenotype("OO"), "O");
});

test("the full ABO phenotype matrix: which child groups each pairing can produce", () => {
  // Worked out from the three alleles: A and B co-dominant, O recessive.
  const expected = {
    "A+A": "A,O",
    "A+B": "A,B,AB,O",
    "A+AB": "A,B,AB",
    "A+O": "A,O",
    "B+B": "B,O",
    "B+AB": "A,B,AB",
    "B+O": "B,O",
    "AB+AB": "A,B,AB",
    "AB+O": "A,B",
    "O+O": "O",
  };
  for (const [key, possible] of Object.entries(expected)) {
    const [a, b] = key.split("+");
    assert.equal(aboPossible(a, b), possible, key);
    assert.equal(aboPossible(b, a), possible, `${b}+${a} (order must not matter)`);
  }
});

test("the impossible list is the useful half, and it is exact for every pairing", () => {
  const expected = {
    "A+A": "B,AB",
    "A+B": "",
    "A+AB": "O",
    "A+O": "B,AB",
    "B+B": "A,AB",
    "B+AB": "O",
    "B+O": "A,AB",
    "AB+AB": "O",
    "AB+O": "AB,O",
    "O+O": "A,B,AB",
  };
  for (const [key, impossible] of Object.entries(expected)) {
    const [a, b] = key.split("+");
    assert.equal(aboImpossible(a, b), impossible, key);
    assert.equal(aboImpossible(b, a), impossible, `${b}+${a}`);
  }
  // The two everyone gets wrong, stated outright.
  assert.ok(aboOutcomes("AB", "O").impossible.includes("O"), "an AB and an O cannot have an O child");
  assert.ok(aboOutcomes("AB", "O").impossible.includes("AB"), "an AB and an O cannot have an AB child");
  assert.deepEqual(aboOutcomes("A", "B").impossible, [], "an A and a B rule nothing out");
});

test("possible and impossible always partition the four groups, with no overlap", () => {
  for (const a of ABO_GROUPS) {
    for (const b of ABO_GROUPS) {
      const { possible, impossible } = aboOutcomes(a, b);
      assert.equal(possible.length + impossible.length, 4, `${a} x ${b}`);
      assert.equal(possible.filter((g) => impossible.includes(g)).length, 0, `${a} x ${b} overlap`);
      assert.ok(possible.length > 0, `${a} x ${b} must allow something`);
    }
  }
});

test("only AB and O settle a genotype, so only three pairings get an exact percentage", () => {
  const determinable = [];
  for (const a of ABO_GROUPS) {
    for (const b of ABO_GROUPS) {
      const out = aboOutcomes(a, b);
      if (out.determinable) determinable.push(`${a}+${b}`);
      // The invariant the whole section rests on: a figure exists only when
      // the phenotypes fix the genotypes, and is null otherwise.
      assert.equal(out.determinable, out.percentages !== null, `${a} x ${b}`);
    }
  }
  assert.deepEqual(determinable.sort(), ["AB+AB", "AB+O", "O+AB", "O+O"]);
  assert.deepEqual(ABO_DETERMINED, ["AB", "O"]);
});

test("the three exact pairings give the exact splits, summing to 100", () => {
  const pct = (a, b) => Object.fromEntries(aboOutcomes(a, b).percentages.map((r) => [r.group, r.percent]));
  assert.deepEqual(pct("O", "O"), { O: 100 });
  assert.deepEqual(pct("AB", "O"), { A: 50, B: 50 });
  assert.deepEqual(pct("AB", "AB"), { A: 25, B: 25, AB: 50 });
  for (const [a, b] of [["O", "O"], ["AB", "O"], ["AB", "AB"]]) {
    const total = aboOutcomes(a, b).percentages.reduce((s, r) => s + r.percent, 0);
    assert.equal(total, 100, `${a} x ${b}`);
  }
});

test("a pairing with a hidden allele names which side is hiding it and prints no full split", () => {
  const aO = aboOutcomes("A", "O");
  assert.equal(aO.percentages, null);
  assert.deepEqual(aO.hiddenIn, ["A"]);
  const aB = aboOutcomes("A", "B");
  assert.deepEqual(aB.hiddenIn, ["A", "B"]);
  assert.equal(aboOutcomes("AB", "O").hiddenIn.length, 0);
});

// The row a developer gets wrong by default. Evidence brief §1.2 row 7: if the
// group A parent is AA the children are 1/2 A and 1/2 AB; if AO they are 1/2 A,
// 1/4 AB and 1/4 B. P(group A) is 50% either way, and only the other half moves.
test("group A with group AB gives exactly 50% group A, whichever allele the A parent hides", () => {
  const out = aboOutcomes("A", "AB");
  assert.deepEqual(out.certain, [{ group: "A", percent: 50 }]);
  assert.equal(out.certainTotal, 50);
  assert.equal(out.determinable, false, "the other half is not settled, so this is not a full split");
  assert.equal(out.percentages, null, "a half answer must never be printed as a whole one");
  assert.deepEqual(out.undecided, ["B", "AB"], "AB and B are the half that moves");
  assert.deepEqual(out.impossible, ["O"], "an AB parent cannot have a group O child");
  // Worked by hand from the two consistent parental genotypes.
  //   AA x AB -> 1/2 A, 1/2 AB          AO x AB -> 1/2 A, 1/4 AB, 1/4 B
  assert.deepEqual(aboOutcomes("AB", "A").certain, [{ group: "A", percent: 50 }], "order must not matter");
  // The mirror row, 9: a group B parent with a group AB parent.
  const mirror = aboOutcomes("B", "AB");
  assert.deepEqual(mirror.certain, [{ group: "B", percent: 50 }]);
  assert.deepEqual(mirror.undecided, ["A", "AB"]);
  assert.deepEqual(mirror.impossible, ["O"]);
});

test("exactly five ABO pairings carry an exact figure: three whole splits and two halves", () => {
  const whole = [];
  const half = [];
  const none = [];
  for (const a of ABO_GROUPS) {
    for (const b of ABO_GROUPS) {
      const out = aboOutcomes(a, b);
      const key = `${a}+${b}`;
      if (out.determinable) whole.push(key);
      else if (out.certainTotal > 0) half.push(key);
      else none.push(key);
      // Whatever the pairing, a certain figure never contradicts the possible list.
      for (const row of out.certain) assert.ok(out.possible.includes(row.group), `${key} ${row.group}`);
    }
  }
  assert.deepEqual(whole.sort(), ["AB+AB", "AB+O", "O+AB", "O+O"]);
  assert.deepEqual(half.sort(), ["A+AB", "AB+A", "AB+B", "B+AB"]);
  assert.equal(none.length, 8, "the remaining five unordered pairings turn entirely on hidden alleles");
});

// Evidence brief §1.2 row 6, and the most useful thing this section can say.
test("a group A parent and a group B parent rule nothing out, including a group neither of them has", () => {
  const out = aboOutcomes("A", "B");
  assert.deepEqual(out.impossible, []);
  assert.deepEqual(out.possible, ["A", "B", "AB", "O"]);
  assert.deepEqual(out.certain, []);
  assert.equal(out.percentages, null);
  // The copy leads on that rather than reporting an empty list of exclusions.
  assert.match(ABO_ANY_GROUP_NOTE, /rules nothing out/);
  assert.match(ABO_ANY_GROUP_NOTE, /a group the two of you do not have between you/);
  assert.match(ABO_ANY_GROUP_NOTE, /matches neither parent/);
});

console.log("\nExpected probabilities, which are a different kind of answer");

// Nkansah et al. 2024, 134,227 Ghanaians. The derived table is evidence brief
// §1.5, and every figure below is checked against it to one decimal place.
test("the Ghanaian frequencies are the published ones and nothing is rounded into them", () => {
  assert.equal(GHANA_ABO.n, 134227);
  assert.deepEqual(GHANA_ABO.phenotype, { O: 54.72, B: 21.74, A: 19.65, AB: 3.89 });
  assert.deepEqual(GHANA_ABO.allele, { A: 0.1227, B: 0.1376, O: 0.7397 });
  assert.equal(GHANA_RH.negative, 7.72);
  assert.equal(GHANA_RH.positive, 92.28);
  assert.deepEqual(GHANA_RH.allele, { D: 0.7222, d: 0.2778 });
  // Roughly nine in ten Ghanaian group A or group B people carry a hidden O.
  assert.equal(aboHiddenOShare("A").toFixed(1), "92.3");
  assert.equal(aboHiddenOShare("B").toFixed(1), "91.5");
  assert.equal(aboHiddenOShare("AB"), 0);
  assert.equal(rhHiddenDShare().toFixed(1), "43.5");
});

test("every expected distribution reproduces the published table, to a decimal place", () => {
  const table = {
    "O+O": { O: "100.0" },
    "O+A": { A: "53.8", O: "46.2" },
    "O+B": { B: "54.3", O: "45.7" },
    "O+AB": { A: "50.0", B: "50.0" },
    "A+A": { A: "78.7", O: "21.3" },
    "A+B": { A: "24.6", B: "25.0", AB: "29.2", O: "21.1" },
    "A+AB": { A: "50.0", B: "23.1", AB: "26.9" },
    "B+B": { B: "79.1", O: "20.9" },
    "B+AB": { A: "22.9", B: "50.0", AB: "27.1" },
    "AB+AB": { A: "25.0", B: "25.0", AB: "50.0" },
  };
  for (const [key, want] of Object.entries(table)) {
    const [a, b] = key.split("+");
    const got = Object.fromEntries(aboExpected(a, b).map((r) => [r.group, r.percent.toFixed(1)]));
    assert.deepEqual(got, want, key);
    // Order-independent, and always a complete distribution.
    assert.deepEqual(Object.fromEntries(aboExpected(b, a).map((r) => [r.group, r.percent.toFixed(1)])), want, key);
    const total = aboExpected(a, b).reduce((s, r) => s + r.percent, 0);
    assert.ok(Math.abs(total - 100) < 1e-9, `${key} sums to ${total}`);
  }
  // Two Rh positive Ghanaian parents: an expected 4.7% chance of an Rh negative child.
  const rhPos = Object.fromEntries(rhExpected("pos", "pos").map((r) => [r.value, r.percent.toFixed(1)]));
  assert.deepEqual(rhPos, { pos: "95.3", neg: "4.7" });
  assert.deepEqual(
    Object.fromEntries(rhExpected("neg", "neg").map((r) => [r.value, r.percent])),
    { neg: 100 },
  );
});

test("an expected figure never contradicts an impossible one, and never becomes the exact answer", () => {
  for (const a of ABO_GROUPS) {
    for (const b of ABO_GROUPS) {
      const out = aboOutcomes(a, b);
      const expected = Object.fromEntries(out.expected.map((r) => [r.group, r.percent]));
      // The zeroes come from the impossibility rules, so they are real.
      for (const group of out.impossible) assert.equal(expected[group], undefined, `${a} x ${b} ${group}`);
      for (const group of out.possible) assert.ok(expected[group] > 0, `${a} x ${b} ${group}`);
      // Where a share IS exact, the population average agrees with it exactly.
      for (const row of out.certain) {
        assert.ok(Math.abs(expected[row.group] - row.percent) < 1e-9, `${a} x ${b} ${row.group}`);
      }
      // And an expected figure is never promoted into the exact split.
      if (!out.determinable) assert.equal(out.percentages, null, `${a} x ${b}`);
    }
  }
});

test("the expected block is labelled as a population average, in the interface and not a footnote", () => {
  assert.match(EXPECTED_LABEL, /Ghanaian couples/);
  assert.match(EXPECTED_CAVEAT, /It is not your figure/);
  assert.match(EXPECTED_CAVEAT, /134,227/);
  assert.match(EXPECTED_CAVEAT, /approximate/);
  assert.doesNotMatch(EXPECTED_CAVEAT, /—/);
});

console.log("\nRh factor");

test("two Rh negatives can have only Rh negative children, and that is exact", () => {
  const out = rhOutcomes("neg", "neg");
  assert.equal(out.determinable, true);
  assert.deepEqual(out.possible, ["neg"]);
  assert.deepEqual(out.impossible, ["pos"]);
  assert.deepEqual(out.percentages, [{ value: "neg", percent: 100 }]);
});

test("every other Rh pairing leaves both results possible and gives no figure", () => {
  for (const [a, b] of [["pos", "pos"], ["pos", "neg"], ["neg", "pos"]]) {
    const out = rhOutcomes(a, b);
    assert.equal(out.determinable, false, `${a} x ${b}`);
    assert.deepEqual(out.possible, ["pos", "neg"], `${a} x ${b}`);
    assert.deepEqual(out.impossible, [], `${a} x ${b}`);
    assert.equal(out.percentages, null, `${a} x ${b}`);
  }
  // Two Rh positives can have an Rh negative child, which is the surprise.
  assert.ok(rhOutcomes("pos", "pos").possible.includes("neg"));
});

test("the pregnancy flag fires on an Rh negative mother and on nothing else", () => {
  assert.equal(rhPregnancyFlag("neg", "pos"), "plan");
  assert.equal(rhPregnancyFlag("neg", "neg"), "cleared");
  assert.equal(rhPregnancyFlag("neg", "unknown"), "unknown");
  assert.equal(rhPregnancyFlag("pos", "pos"), null);
  assert.equal(rhPregnancyFlag("pos", "neg"), null);
  assert.equal(rhPregnancyFlag("unknown", "neg"), null);
});

test("who is the mother decides the Rh pregnancy flag, and the possible list ignores it", () => {
  const base = { traits: ["rh"], rhYou: "neg", rhPartner: "pos" };
  const youAreMother = computeRh({ ...base, motherIs: "you" });
  const partnerIsMother = computeRh({ ...base, motherIs: "partner" });
  assert.equal(youAreMother.pregnancy, "plan");
  assert.equal(partnerIsMother.pregnancy, null);
  assert.deepEqual(youAreMother.possible, partnerIsMother.possible);
});

console.log("\nG6PD, split by the sex of the child");

const g6 = (m, f) => {
  const out = g6pdOutcomes(m, f);
  const row = (rows) => Object.fromEntries(rows.map((r) => [r.status, r.percent]));
  return { sons: row(out.sons), daughters: row(out.daughters) };
};

test("the full G6PD table, worked out by hand from the X-linked rule", () => {
  // A son takes his one X from his mother; a daughter takes one X from each.
  assert.deepEqual(g6("normal", "normal"), { sons: { normal: 100 }, daughters: { normal: 100 } });
  assert.deepEqual(g6("normal", "deficient"), { sons: { normal: 100 }, daughters: { carrier: 100 } });
  assert.deepEqual(g6("carrier", "normal"), {
    sons: { normal: 50, deficient: 50 },
    daughters: { normal: 50, carrier: 50 },
  });
  assert.deepEqual(g6("carrier", "deficient"), {
    sons: { normal: 50, deficient: 50 },
    daughters: { carrier: 50, deficient: 50 },
  });
  assert.deepEqual(g6("deficient", "normal"), { sons: { deficient: 100 }, daughters: { carrier: 100 } });
  assert.deepEqual(g6("deficient", "deficient"), { sons: { deficient: 100 }, daughters: { deficient: 100 } });
});

test("a father's G6PD status never reaches a son, in any of the six combinations", () => {
  for (const mother of ["normal", "carrier", "deficient"]) {
    assert.deepEqual(
      g6pdOutcomes(mother, "normal").sons,
      g6pdOutcomes(mother, "deficient").sons,
      `sons must not move with the father (mother ${mother})`,
    );
  }
  assert.equal(g6pdOutcomes("carrier", "normal").fatherReachesSons, false);
});

test("a deficient father makes every daughter a carrier at least, whatever the mother is", () => {
  for (const mother of ["normal", "carrier", "deficient"]) {
    const daughters = g6pdOutcomes(mother, "deficient").daughters;
    assert.equal(daughters.some((r) => r.status === "normal"), false, `mother ${mother}`);
    assert.equal(daughters.reduce((s, r) => s + r.percent, 0), 100, `mother ${mother}`);
  }
});

test("both halves of every G6PD table sum to 100 within their own sex", () => {
  for (const mother of ["normal", "carrier", "deficient"]) {
    for (const father of ["normal", "deficient"]) {
      const out = g6pdOutcomes(mother, father);
      assert.equal(out.sons.reduce((s, r) => s + r.percent, 0), 100, `${mother} x ${father} sons`);
      assert.equal(out.daughters.reduce((s, r) => s + r.percent, 0), 100, `${mother} x ${father} daughters`);
    }
  }
});

test("a woman's normal or deficient reading carries the caveat; an intermediate one does not need it", () => {
  assert.match(G6PD_READING.normal, /does not rule out carrying one affected copy/);
  // Errigo et al.: enzyme activity in a heterozygote runs on a continuum, and
  // StatPearls: the fluorescent spot test may miss heterozygous women.
  assert.match(G6PD_READING.normal, /clearly deficient to fully normal/);
  assert.match(G6PD_READING.normal, /fluorescent spot test may miss/);
  assert.match(G6PD_READING.normal, /quantitative assay is the one recommended for women/);
  assert.match(G6PD_READING.deficient, /can also read deficient/);
  assert.equal(G6PD_READING.carrier, null);
  for (const key of ["normal", "deficient"]) assert.doesNotMatch(G6PD_READING[key], /—/, key);
  // The mother's option list has the intermediate reading; the father's does not,
  // because a man has one X and there is nothing in between.
  assert.deepEqual(G6PD_MOTHER_OPTIONS.map((o) => o.value), ["normal", "carrier", "deficient", "unknown"]);
  assert.deepEqual(G6PD_FATHER_OPTIONS.map((o) => o.value), ["normal", "deficient", "unknown"]);
});

test("the G6PD section reads the mother's answer from whichever side she is on", () => {
  const a = computeG6pd({ motherIs: "you", g6pdYouMother: "carrier", g6pdPartnerFather: "normal" });
  const b = computeG6pd({ motherIs: "partner", g6pdPartnerMother: "carrier", g6pdYouFather: "normal" });
  assert.deepEqual(a.sons, b.sons);
  assert.deepEqual(a.daughters, b.daughters);
  assert.equal(a.mother, "carrier");
  assert.equal(a.father, "normal");
});

console.log("\nNo section prints a figure it cannot stand behind");

/** Every numeric percent anywhere in a section, however deeply nested. */
function percentsIn(value) {
  if (Array.isArray(value)) return value.flatMap(percentsIn);
  if (value && typeof value === "object")
    return Object.entries(value).flatMap(([k, v]) => (k === "percent" ? [v] : percentsIn(v)));
  return [];
}

/** The same, minus the population-average layer, which is labelled separately. */
function exactPercentsIn(section) {
  const { expected, ...rest } = section;
  return percentsIn(rest);
}

test("a pairing with no exact figure carries none outside the labelled expected block", () => {
  for (const you of ABO_GROUPS) {
    for (const partner of ABO_GROUPS) {
      const section = computeAbo({ traits: ["abo"], aboYou: you, aboPartner: partner });
      const found = exactPercentsIn(section);
      const key = `${you} x ${partner}`;
      if (section.determinable) {
        // A full split appears twice, once in `certain` and once in `percentages`.
        assert.equal(found.reduce((s, n) => s + n, 0), 200, key);
      } else if (section.certainTotal > 0) {
        // The half-exact rows: one figure, and only one.
        assert.deepEqual(found, [50], `${key} must print its exact half and nothing more`);
      } else {
        assert.deepEqual(found, [], `${key} must print no exact figure`);
      }
      // The expected layer exists for every pairing and is always complete.
      const total = section.expected.reduce((s, r) => s + r.percent, 0);
      assert.ok(Math.abs(total - 100) < 1e-9, `${key} expected sums to ${total}`);
    }
  }
  for (const you of ["pos", "neg"]) {
    for (const partner of ["pos", "neg"]) {
      const section = computeRh({ traits: ["rh"], rhYou: you, rhPartner: partner });
      const found = exactPercentsIn(section);
      if (section.determinable) assert.deepEqual(found, [100, 100], `${you} x ${partner}`);
      else assert.deepEqual(found, [], `${you} x ${partner} must print no exact figure`);
    }
  }
});

test("an unknown answer returns the explainer branch rather than a fabricated one", () => {
  for (const pair of [["A", "unknown"], ["unknown", "O"], ["unknown", "unknown"]]) {
    const s = computeAbo({ traits: ["abo"], aboYou: pair[0], aboPartner: pair[1] });
    assert.equal(s.kind, "unknown", pair.join("+"));
    assert.deepEqual(percentsIn(s), [], pair.join("+"));
  }
  assert.equal(computeRh({ traits: ["rh"], rhYou: "unknown", rhPartner: "neg" }).kind, "unknown");
  assert.equal(
    computeG6pd({ motherIs: "you", g6pdYouMother: "unknown", g6pdPartnerFather: "normal" }).kind,
    "unknown",
  );
  // Nothing answered yet is not the same as answered "unknown": no section at all.
  assert.equal(computeAbo({ traits: ["abo"] }), null);
  assert.equal(computeRh({ traits: ["rh"] }), null);
  assert.equal(computeG6pd({ traits: ["g6pd"] }), null);
});

console.log("\nThe family inheritance flow");

const GENOTYPE_ONLY = { traits: ["genotype"], you: "AS", partner: "AS", basis: "electrophoresis", familyScd: "no" };
const ALL_TRAITS = {
  traits: ["genotype", "abo", "rh", "g6pd", "sex"],
  motherIs: "you",
  you: "AS",
  partner: "AS",
  basis: "sickling",
  familyScd: "yes",
  aboYou: "A",
  aboPartner: "B",
  rhYou: "neg",
  rhPartner: "pos",
  g6pdYouMother: "carrier",
  g6pdPartnerFather: "normal",
};

test("the flow is five parts, and genotype is always the first one with questions", () => {
  assert.equal(INHERITANCE_PARTS.length, 5);
  assert.deepEqual(INHERITANCE_PARTS.map((p) => p.id), ["pick", "genotype", "abo", "rh", "g6pd"]);
  // Fourteen steps are defined; the G6PD part carries a mother-side and a
  // father-side version of each question and only ever shows one of each pair.
  assert.equal(countQuestions(INHERITANCE_PARTS), 14);
  assert.equal(INHERITANCE_PARTS[4].steps.length, 4);
  // The genotype part asks the instrument's own four questions, in its own order.
  assert.deepEqual(
    INHERITANCE_PARTS[1].steps.map((s) => s.id),
    GENOTYPE_STEPS.map((s) => s.id),
  );
  assert.deepEqual(GENOTYPE_STEPS.map((s) => s.id), ["you", "partner", "basis", "familyScd"]);
  const ids = INHERITANCE_PARTS.flatMap((p) => p.steps.map((s) => s.id));
  assert.equal(new Set(ids).size, ids.length, "step ids unique across the whole flow");
  for (const p of INHERITANCE_PARTS.slice(1)) {
    assert.ok(p.intro.length > 40, p.id);
    assert.doesNotMatch(p.intro, /—/, p.id);
  }
});

test("step counts: genotype alone is 5 screens, every trait is 12, and sex adds none", () => {
  assert.equal(countVisibleQuestions(INHERITANCE_PARTS, GENOTYPE_ONLY), 5);
  assert.equal(countVisibleQuestions(INHERITANCE_PARTS, ALL_TRAITS), 12);
  // Sex is answered by the picker and asks nothing of its own.
  assert.equal(
    countVisibleQuestions(INHERITANCE_PARTS, { ...GENOTYPE_ONLY, traits: ["genotype", "sex"] }),
    5,
  );
  // The mother question appears only when Rh or G6PD is on.
  assert.equal(countVisibleQuestions(INHERITANCE_PARTS, { traits: ["abo"] }), 3);
  assert.equal(countVisibleQuestions(INHERITANCE_PARTS, { traits: ["rh"] }), 4);
  assert.equal(countVisibleQuestions(INHERITANCE_PARTS, { traits: ["g6pd"], motherIs: "you" }), 4);
  assert.equal(TRAITS.reduce((n, t) => n + t.questions, 0), 10);
});

test("only the inheritance flow has parts that drop out, so the other three still number the same way", () => {
  // The Stepper hides a part's chapter screen when every question in it has
  // skipped out, and numbers the remaining parts by what is shown. For the
  // three older tools no part can empty, so their headers are unchanged.
  const emptyable = (parts, values) =>
    parts.filter((p) => p.steps.every((s) => typeof s.skipIf === "function" && s.skipIf(values)));
  const probes = [{}, { protein: "never", ...GENOTYPE_ONLY }, ALL_TRAITS, { traits: ["abo"] }];
  for (const values of probes) {
    for (const [name, parts] of [["diabetes", DIABETES_PARTS], ["heart", HEART_PARTS], ["bmi", BMI_PARTS]]) {
      assert.deepEqual(emptyable(parts, values), [], `${name} must never lose a whole part`);
    }
  }
  // The inheritance flow is the one that does, which is the point of it.
  assert.deepEqual(
    emptyable(INHERITANCE_PARTS, GENOTYPE_ONLY).map((p) => p.id),
    ["abo", "rh", "g6pd"],
  );
  assert.deepEqual(emptyable(INHERITANCE_PARTS, ALL_TRAITS), []);
});

test("the picker defaults to genotype and can never come back empty", () => {
  assert.deepEqual(selectedTraits({}), ["genotype"]);
  assert.deepEqual(selectedTraits({ traits: [] }), ["genotype"]);
  // Always returned in TRAITS order, whatever order they were tapped in.
  assert.deepEqual(selectedTraits({ traits: ["sex", "abo", "genotype"] }), ["genotype", "abo", "sex"]);
  assert.deepEqual(selectedTraits({ traits: ["nonsense"] }), ["genotype"]);
  assert.deepEqual(TRAIT_IDS, ["genotype", "abo", "rh", "g6pd", "sex"]);
});

test("the combined result prints exactly the Punnett square the genotype tool always printed", () => {
  for (const values of [GENOTYPE_ONLY, ALL_TRAITS]) {
    const alone = computeGenotypeFull(values);
    const full = computeInheritanceFull(values);
    assert.deepEqual(full.genotype.rows, alone.rows);
    assert.deepEqual(full.genotype.groups, alone.groups);
    assert.equal(full.genotype.pairingLine, alone.pairingLine);
    assert.deepEqual(full.genotype.advice, alone.advice);
    assert.equal(full.genotype.kind, alone.kind);
    for (const [k, v] of Object.entries(alone.answers)) assert.equal(full.answers[k], v, `answers.${k}`);
  }
  // AS + AS is still 25 / 50 / 25, alongside four other traits.
  const rows = Object.fromEntries(computeInheritanceFull(ALL_TRAITS).genotype.rows.map((r) => [r.genotype, r.percent]));
  assert.deepEqual(rows, { AA: 25, AS: 50, SS: 25 });
});

test("a result carries a section for every picked trait and for no other", () => {
  const full = computeInheritanceFull(ALL_TRAITS);
  assert.deepEqual(full.traits, ["genotype", "abo", "rh", "g6pd", "sex"]);
  for (const id of full.traits) assert.ok(full[id], `missing section ${id}`);
  const only = computeInheritanceFull(GENOTYPE_ONLY);
  assert.deepEqual(only.traits, ["genotype"]);
  for (const id of ["abo", "rh", "g6pd", "sex"]) assert.equal(only[id], undefined, id);
});

test("the sex of the child is a fixed 50, framed as the setup for G6PD rather than a finding", () => {
  const sex = computeInheritanceFull({ ...ALL_TRAITS }).sex;
  assert.equal(sex.percent, 50);
  assert.equal(sex.kind, "fixed");
  assert.match(SEX_LINES.headline, /50 and 50/);
  assert.match(SEX_LINES.whyItMatters, /X chromosome/);
  assert.match(SEX_LINES.perPregnancy, /resets with every pregnancy/);
  for (const line of Object.values(SEX_LINES)) assert.doesNotMatch(line, /—/);
});

test("lead answers pack one key per trait and stay inside the backend's limits", () => {
  const full = computeInheritanceFull(ALL_TRAITS);
  assert.deepEqual(
    Object.keys(full.answers),
    ["traits", "motherIs", "abo", "rh", "g6pd", "yourGenotype", "partnerGenotype", "outcomes", "basis", "familyScd"],
  );
  assertAnswerLimits(full.answers, "inheritance all traits");
  assert.equal(full.answers.traits, "genotype,abo,rh,g6pd,sex");
  assert.equal(full.answers.abo, "A+B|no:none");
  assert.equal(full.answers.rh, "neg+pos|pos.neg");
  assert.match(full.answers.g6pd, /^m:carrier\|f:normal\|s:/);
  // Genotype alone packs only the genotype keys plus the trait list.
  const only = computeInheritanceFull(GENOTYPE_ONLY);
  assert.deepEqual(Object.keys(only.answers), ["traits", "yourGenotype", "partnerGenotype", "outcomes", "basis", "familyScd"]);
  assertAnswerLimits(only.answers, "inheritance genotype only");
  // Ten keys leaves room for the form's own optIn inside the 16-key limit.
  assert.ok(Object.keys(full.answers).length <= 14, `${Object.keys(full.answers).length} keys`);
  assert.deepEqual(Object.keys(packInheritance({ traits: ["genotype"] }, {})), ["traits"]);
});

console.log("\nWhat the result recommends, and when it recommends nothing");

test("one unconfirmed answer leans on the one test that settles it, at the catalogue price", () => {
  const cases = [
    [{ ...GENOTYPE_ONLY, you: "unknown" }, "HB_ELECTRO", "GHS 170"],
    [{ ...GENOTYPE_ONLY, basis: "sickling" }, "HB_ELECTRO", "GHS 170"],
    [{ traits: ["abo"], aboYou: "unknown", aboPartner: "O" }, "BLOOD_GROUP", "GHS 75"],
    [{ traits: ["rh"], motherIs: "you", rhYou: "unknown", rhPartner: "neg" }, "BLOOD_GROUP", "GHS 75"],
    [
      { traits: ["g6pd"], motherIs: "you", g6pdYouMother: "unknown", g6pdPartnerFather: "normal" },
      "G6PD",
      "GHS 150",
    ],
  ];
  for (const [values, testCode, price] of cases) {
    const cta = computeInheritanceFull(values).cta;
    assert.equal(cta.kind, "test", testCode);
    assert.equal(cta.testCode, testCode);
    assert.equal(cta.price, price, testCode);
    assert.ok(cta.label.length > 8 && cta.body.length > 20, testCode);
  }
});

test("blood group and Rh share one test, so two unknowns there are still one recommendation", () => {
  const cta = computeInheritanceFull({
    traits: ["abo", "rh"],
    motherIs: "you",
    aboYou: "unknown",
    aboPartner: "unknown",
    rhYou: "unknown",
    rhPartner: "unknown",
  }).cta;
  assert.equal(cta.kind, "test");
  assert.equal(cta.testCode, "BLOOD_GROUP");
});

test("more than one open question names all three tests and their individual prices", () => {
  const cta = computeInheritanceFull({
    ...ALL_TRAITS,
    you: "unknown",
    aboYou: "unknown",
    g6pdYouMother: "unknown",
  }).cta;
  assert.equal(cta.kind, "tests");
  assert.deepEqual(cta.items.map((t) => t.testCode), ["HB_ELECTRO", "BLOOD_GROUP", "G6PD"]);
  assert.deepEqual(cta.items.map((t) => t.price), ["GHS 170", "GHS 75", "GHS 150"]);
  assert.deepEqual(cta.items.map((t) => t.slug), ["hb-electrophoresis", "blood-group", "g6pd"]);
  assert.match(cta.body, /premarital/i);
});

test("when everything is confirmed, the result does not push a test", () => {
  const settled = {
    traits: ["genotype", "abo", "rh", "g6pd", "sex"],
    motherIs: "you",
    you: "AA",
    partner: "AS",
    basis: "electrophoresis",
    familyScd: "no",
    aboYou: "O",
    aboPartner: "O",
    rhYou: "pos",
    rhPartner: "pos",
    g6pdYouMother: "normal",
    g6pdPartnerFather: "normal",
  };
  const full = computeInheritanceFull(settled);
  assert.deepEqual(openQuestions(full), []);
  assert.equal(full.cta.kind, "none");
  assert.equal(full.healthInterest, "HB_ELECTRO");
  assert.equal(full.cta.testCode, undefined, "no test is attached");
  assert.equal(full.cta.items, undefined, "no basket of tests either");
  assert.doesNotMatch(full.cta.body, /GHS/, "no price is quoted");
  assert.match(full.cta.body, /nothing to book today/);
});

test("a clinic-said-so or guessed genotype counts as an open question, an electrophoresis report does not", () => {
  const open = (basis) => openQuestions(computeInheritanceFull({ ...GENOTYPE_ONLY, basis })).map((o) => o.id);
  for (const basis of ["sickling", "clinic", "guess"]) assert.deepEqual(open(basis), ["genotype"], basis);
  assert.deepEqual(open("electrophoresis"), []);
  assert.deepEqual(inheritanceCta({}).kind, "none");
});

console.log("\nThe closing sections, and the share card with more than one trait");

test("the polygenic section explains why there is no square, and hands off to the tools that do score it", () => {
  assert.match(RUNS_IN_FAMILIES.intro, /polygenic/);
  assert.match(RUNS_IN_FAMILIES.intro, /no percentage to hand a couple/);
  // Suzuki et al. 2024 and Keaton et al. 2024, so "polygenic" is a number.
  assert.match(RUNS_IN_FAMILIES.intro, /1,289 independent signals across 611/);
  assert.match(RUNS_IN_FAMILIES.intro, /2,103 signals/);
  // Framingham, as odds across families and never a per-child figure.
  assert.match(RUNS_IN_FAMILIES.handoff, /roughly tripled the odds/);
  assert.match(RUNS_IN_FAMILIES.handoff, /roughly sextupled/);
  assert.match(RUNS_IN_FAMILIES.handoff, /describes thousands of families rather than yours/);
  // The FINDRISC family-history item, quoted at the weight the instrument gives it.
  assert.match(RUNS_IN_FAMILIES.scored, /5 points of a possible 26/);
  assert.match(RUNS_IN_FAMILIES.scored, /further out in the family is 3/);
  assert.deepEqual(RUNS_IN_FAMILIES.links.map((l) => l.to), [
    "/tools/diabetes-risk",
    "/tools/heart-age",
    "/guides/family-health-map",
  ]);
  for (const v of [RUNS_IN_FAMILIES.intro, RUNS_IN_FAMILIES.handoff, RUNS_IN_FAMILIES.scored, RUNS_IN_FAMILIES.mody])
    assert.doesNotMatch(v, /—/);
});

// GeneReviews: monogenic, autosomal dominant, 50% per child, at least 1% to 3%
// of all diabetes. Mentioned because it is the real exception, and kept to two
// sentences because the Exeter calculator over-calls badly outside white
// European cohorts and GCK-MODY needs no medication: a reader who
// self-diagnosed and eased off treating real type 2 diabetes would be harmed.
test("MODY gets a mention and nothing the reader can score themselves against", () => {
  const mody = RUNS_IN_FAMILIES.mody;
  assert.match(mody, /1% to 3%/);
  assert.match(mody, /50% chance per child/);
  assert.match(mody, /mistaken for type 1 or type 2 diabetes/);
  assert.match(mody, /[Oo]nly a genetic test can confirm it/);
  assert.match(mody, /a question for a doctor/);
  // Two sentences, and no feature list to tick off.
  assert.ok(mody.split(". ").length <= 2, `${mody.split(". ").length} sentences`);
  assert.doesNotMatch(mody, /under 25|under 35|age 25|age 35/, "no onset age, because that is a feature to tick");
  assert.doesNotMatch(mody, /autoantibod|C-peptide|obesity|three generation/i, "no diagnostic criteria");
  assert.doesNotMatch(mody, /calculator|probability of MODY|score yourself|check whether you/i);
  // No prevalence figure, because every published one is from a UK or US cohort
  // and none has been measured in West Africa.
  assert.doesNotMatch(mody, /per million|1\.2%|108/);
});

test("the cannot-predict section makes the Ghanaian point about eye colour without overstating the record", () => {
  const eye = CANNOT_PREDICT.items.find((i) => i.label === "Eye colour");
  assert.match(eye.text, /many genes/);
  assert.match(eye.text, /brown against black/);
  assert.match(eye.text, /melanin/);
  assert.match(eye.text, /no percentage to give/);
  // Beleza et al.: the claim that survives is that the derived allele is absent
  // from African populations, NOT that OCA2/HERC2 says nothing about brown.
  assert.match(eye.text, /absent from African populations/);
  assert.match(eye.text, /shifts the shade of brown in mixed-ancestry populations/);
  assert.doesNotMatch(eye.text, /nothing about (the )?shades? of brown/i);
  // No study has measured iris pigmentation in an unadmixed African population,
  // so melanin density is the current understanding rather than a finding.
  assert.match(eye.text, /As best anyone can currently tell/);
  assert.match(eye.text, /nobody has yet measured/);
  assert.doesNotMatch(eye.text, /studies have shown|research shows|it is known that/i);
  // Simcoe et al. scored dark brown as the darkest category; black is not one.
  assert.match(eye.text, /no genetic basis for that distinction has been established/);
  // Still no eye-colour probability anywhere.
  assert.doesNotMatch(JSON.stringify(eye), /\d+\s?%/);
});

test("the school myths split into the four with evidence against them and the two never demonstrated", () => {
  assert.equal(CANNOT_PREDICT.items.length, 5);
  const disproven = CANNOT_PREDICT.items.find((i) => /tongue rolling/i.test(i.text) && /earlobes/i.test(i.label));
  const unsupported = CANNOT_PREDICT.items.find((i) => /dimples/i.test(i.label));
  assert.ok(disproven && unsupported, "the two groups must be two separate items");
  assert.notEqual(disproven.label, unsupported.label);

  // Group 1: real disconfirming data, named study by named study.
  assert.match(disproven.text, /49 genetic regions across 74,660/);
  assert.match(disproven.text, /No evidence for a genetic basis of tongue rolling/);
  assert.match(disproven.text, /7 of 33 identical twin pairs/);
  assert.match(disproven.text, /smooth range of angles/);
  assert.match(disproven.text, /two smooth-chinned parents/);
  // NOT in the evidence: that two non-rollers can have a tongue-rolling child.
  assert.doesNotMatch(disproven.text, /parents both cannot|neither parent can roll|cannot do it/i);
  assert.doesNotMatch(JSON.stringify(CANNOT_PREDICT), /Adhikari/i, "Adhikari 2016 does not cover cleft chin");

  // Group 2: the weaker and more defensible charge.
  assert.match(unsupported.text, /never disproven/);
  assert.match(unsupported.text, /no study ever supported them/);
  assert.match(unsupported.text, /no genetic evidence published/);
  assert.match(unsupported.text, /3 and 81 in every hundred/);
  assert.doesNotMatch(unsupported.text, /debunk/i, "these two were never demonstrated, not debunked");

  for (const item of CANNOT_PREDICT.items) {
    assert.ok(item.text.length > 80, item.label);
    assert.doesNotMatch(item.text, /—/, item.label);
  }
});

test("the G6PD prevalence figure is worded as a genotype prevalence and never as a deficiency rate", () => {
  // Amoah et al. 2021: 1,225 of 6,108 across all ten regions, counting
  // hemizygous deficient men, homozygous deficient women and carrier women.
  assert.match(G6PD_GHANA_NOTE, /20\.06%/);
  assert.match(G6PD_GHANA_NOTE, /1,225 of 6,108/);
  assert.match(G6PD_GHANA_NOTE, /all ten regions/);
  assert.match(G6PD_GHANA_NOTE, /carries a G6PD A-minus variant/);
  assert.match(G6PD_GHANA_NOTE, /carriers rather than cases/);
  // The one sentence it must contain, and only as the thing it is denying.
  assert.match(G6PD_GHANA_NOTE, /not the same as saying one in five Ghanaians is G6PD deficient/);
  assert.equal(
    (G6PD_GHANA_NOTE.match(/one in five Ghanaians is G6PD deficient/g) || []).length,
    1,
    "the wrong phrasing appears once, inside its own correction",
  );
  // StatPearls' named triggers, with the two that make this Ghana-specific.
  assert.match(G6PD_TRIGGERS_NOTE, /primaquine/);
  assert.match(G6PD_TRIGGERS_NOTE, /tafenoquine/);
  assert.match(G6PD_TRIGGERS_NOTE, /antimalarials/);
});

test("the Rh copy carries the Ghanaian prevalence and the BCSH anti-D figures, in the right direction", () => {
  assert.match(RH_GHANA_NOTE, /7\.72%/);
  assert.match(RH_GHANA_NOTE, /134,227/);
  assert.match(RH_ANTI_D_NOTE, /16%/);
  assert.match(RH_ANTI_D_NOTE, /about 2%/);
  assert.match(RH_ANTI_D_NOTE, /0\.17% and 0\.28%/);
  assert.match(RH_ANTI_D_NOTE, /BCSH/);
  assert.match(RH_ANTI_D_NOTE, /second Rh positive baby/);
  // The UK's 40% unnecessary-prophylaxis figure does not transfer to Ghana.
  assert.doesNotMatch(RH_ANTI_D_NOTE, /40%/);
  for (const v of [RH_GHANA_NOTE, RH_ANTI_D_NOTE, ABO_EXCEPTIONS_NOTE, ABO_HALF_CERTAIN_NOTE])
    assert.doesNotMatch(v, /—/);
});

test("the blood group section says once that no table of this kind settles parentage", () => {
  assert.match(ABO_EXCEPTIONS_NOTE, /Bombay/);
  assert.match(ABO_EXCEPTIONS_NOTE, /Weak A subgroups/);
  assert.match(ABO_EXCEPTIONS_NOTE, /cis-AB/);
  assert.match(ABO_EXCEPTIONS_NOTE, /never settle a question about parentage/);
});

test("the card carries the two most consequential traits and says the rest are on the page", () => {
  const spec = shareSpecFor("genotype-compatibility", computeInheritanceFull(ALL_TRAITS));
  // AS + AS puts a sickle cell condition on the table, so genotype leads.
  assert.equal(spec.headline, "25%");
  assert.match(spec.band, /^Genotype: chance of a sickle cell condition/);
  assert.equal(spec.rows.length, 1);
  assert.equal(spec.rows[0].label, "G6PD");
  assert.equal(spec.rows[0].value, "50% of sons");
  assert.match(spec.more, /^Plus .+ on the page\.$/);
  assert.equal(spec.slug, "genotype-compatibility");
  assert.equal(spec.disclaimer, TOOL_DISCLAIMER);
  assert.doesNotMatch(JSON.stringify(spec), /—/);
});

test("a card for one trait keeps the single-result shape, with no extra rows", () => {
  const spec = shareSpecFor("genotype-compatibility", computeInheritanceFull(GENOTYPE_ONLY));
  assert.equal(spec.headline, "25%");
  assert.equal(spec.eyebrow, "AS and AS");
  assert.deepEqual(spec.rows, []);
  assert.equal(spec.more, null);
});

test("the card leads with whichever trait changes a decision, not with whichever was picked first", () => {
  // No sickle cell condition possible, so the Rh planning line outranks it.
  const spec = shareSpecFor(
    "genotype-compatibility",
    computeInheritanceFull({
      traits: ["genotype", "rh"],
      motherIs: "you",
      you: "AA",
      partner: "AA",
      basis: "electrophoresis",
      familyScd: "no",
      rhYou: "neg",
      rhPartner: "pos",
    }),
  );
  assert.equal(spec.headline, "Worth planning for");
  assert.match(spec.band, /^Rh factor: an Rh negative mother/);
  assert.equal(spec.rows[0].label, "Genotype");
  assert.equal(spec.rows[0].value, "0%");
});

test("the card carries no result of either partner's, only what a child could inherit", () => {
  for (const values of [ALL_TRAITS, GENOTYPE_ONLY]) {
    const spec = shareSpecFor("genotype-compatibility", computeInheritanceFull(values));
    const blob = JSON.stringify(spec);
    assert.doesNotMatch(blob, /motherIs|g6pdYou|aboYou|rhYou/, "no raw answer keys");
    assert.doesNotMatch(blob, /\b0\d{2}\s?\d{3}\s?\d{4}\b/, "no phone shape");
    assert.match(spec.text, /Try yours free at https:\/\/betterhealth\.africa\/tools\/genotype-compatibility$/);
  }
});

test("no blood group percentage reaches the card unless the pairing settles one", () => {
  const vague = shareSpecFor(
    "genotype-compatibility",
    computeInheritanceFull({ traits: ["abo"], aboYou: "A", aboPartner: "O" }),
  );
  assert.equal(vague.headline, "B and AB ruled out");
  assert.doesNotMatch(`${vague.headline} ${vague.band}`, /\d+\s?%/);
  const exact = shareSpecFor(
    "genotype-compatibility",
    computeInheritanceFull({ traits: ["abo"], aboYou: "AB", aboPartner: "O" }),
  );
  assert.equal(exact.headline, "A 50%, B 50%");
});

test("the exact half from an A with AB pairing reaches the card, and a vague pairing still does not", () => {
  const half = shareSpecFor(
    "genotype-compatibility",
    computeInheritanceFull({ traits: ["abo"], aboYou: "A", aboPartner: "AB" }),
  );
  assert.equal(half.headline, "Group A exactly 50%");
  assert.match(half.band, /whichever gene is hidden, and O ruled out/);
  // The mirror row.
  const mirror = shareSpecFor(
    "genotype-compatibility",
    computeInheritanceFull({ traits: ["abo"], aboYou: "AB", aboPartner: "B" }),
  );
  assert.equal(mirror.headline, "Group B exactly 50%");
  // A x B settles nothing, and the card must not imply otherwise.
  const anyGroup = shareSpecFor(
    "genotype-compatibility",
    computeInheritanceFull({ traits: ["abo"], aboYou: "A", aboPartner: "B" }),
  );
  assert.equal(anyGroup.headline, "All four possible");
  assert.doesNotMatch(`${anyGroup.headline} ${anyGroup.band}`, /\d+\s?%/);
  // No population average ever reaches the card.
  for (const spec of [half, mirror, anyGroup]) {
    assert.doesNotMatch(JSON.stringify(spec), /21\.3|92\.3|4\.7%/);
  }
});

console.log("\nMessage match with the paid campaign, and the sourced Sources list");

test("the H1 keeps the phrase the ads promise, and the breadth rides underneath it", () => {
  const tool = TOOLS.find((t) => t.slug === "genotype-compatibility");
  // The creatives read "Genotype Compatibility Calculator" and "Genotype
  // compatibility, free", so the ad's promise is the H1 near verbatim.
  assert.equal(tool.title, "Genotype Compatibility Calculator");
  assert.equal(tool.subtitle, "Now also blood group, Rh factor and G6PD.");
  for (const word of ["blood group", "Rh factor", "G6PD"]) assert.ok(tool.subtitle.includes(word), word);
  // The <title> mechanism added in Phase 1 stays, carrying both phrases.
  assert.equal(tool.seoTitle, "Genotype Compatibility Calculator | Family Inheritance | BetterHealth Africa");
  assert.match(tool.description, /^Genotype compatibility/);
  assert.match(tool.intro, /^Genotype compatibility/);
  assert.equal(tool.slug, "genotype-compatibility", "the URL the campaign points at does not move");
});

test("every inheritance rule and figure on the page has a source on the page's Sources list", () => {
  const tool = TOOLS.find((t) => t.slug === "genotype-compatibility");
  const has = (text) => tool.sources.some((s) => s.label.includes(text));
  for (const cited of [
    "Dean L", // ABO alleles, the Rh mechanisms, and HDN
    "StatPearls", // the O allele, weak A, and G6PD
    "Nkansah", // the Ghanaian ABO and Rh frequencies
    "Qureshi", // BCSH: the anti-D figures and schedule
    "Amoah", // 20.06% of 6,108 across all ten regions
    "Errigo", // X-inactivation and the carrier continuum
    "Suzuki", // 611 loci for type 2 diabetes
    "Keaton", // 2,103 signals for blood pressure
    "Meigs", // Framingham parental odds ratios
    "Naylor", // GeneReviews on MODY
    "Simcoe", // 124 eye-colour associations
    "Beleza", // the derived HERC2 allele is absent from African populations
    "Yengo", // 12,111 height variants
    "Crawford", // skin pigmentation in African populations
    "Shaffer", // 49 loci for earlobe attachment
    "Martin NG", // no evidence for a genetic basis of tongue rolling
    "McDonald", // the compilation, named as a compilation
  ]) {
    assert.ok(has(cited), `missing source: ${cited}`);
  }
  // McDonald is an educational compilation, and the list says so rather than
  // passing it off as a peer-reviewed paper.
  const mcdonald = tool.sources.find((s) => s.label.includes("McDonald"));
  assert.match(mcdonald.label, /educational compilation rather than a peer-reviewed paper/);
  // Nothing from the brief's "could not verify" list is quoted as a figure.
  const blob = JSON.stringify(tool.sources);
  assert.doesNotMatch(blob, /Green-top Guideline No\. 22\b(?!.*archived)/);
  assert.doesNotMatch(blob, /Adhikari/i, "not a source on cleft chin");
  assert.doesNotMatch(blob, /Evangelou|901 loci/i);
  for (const s of tool.sources) {
    assert.ok(s.label && s.label.length > 10, s.label);
    assert.ok(s.url, `${s.label} needs a link`);
    assert.doesNotMatch(s.label, /—/, s.label);
  }
});

test("the option lists are all taps, and every one offers an honest way out", () => {
  for (const options of [ABO_OPTIONS, RH_OPTIONS, G6PD_MOTHER_OPTIONS, G6PD_FATHER_OPTIONS]) {
    assert.ok(options.some((o) => o.value === "unknown"), "every list needs an I-don't-know");
    for (const o of options) assert.ok(o.label.length > 0);
  }
  // Nothing in the flow asks anyone to type.
  for (const part of INHERITANCE_PARTS) {
    for (const step of part.steps) {
      assert.ok(["choice", "multi"].includes(step.kind), `${step.id} is ${step.kind}`);
    }
  }
});


// ---------------------------------------------------------------------------
// Tool 5: the Kidney Check.
//
// The point of the tool is that kidney disease is staged on two numbers and
// most people only get one, so the tests that matter most are the ones that
// pin what the page says when only half of it is there.
//
// Every figure asserted below is traced to the sourced evidence brief and to
// the guideline or paper behind it. Where the brief left something open, the
// provenance test is what stops the gap being quietly filled in later.
// ---------------------------------------------------------------------------

// A complete, ordinary answer map, so each test can vary one thing.
const kidneyAnswers = (over = {}) => ({
  age: 52,
  sex: "female",
  pregnant: "no",
  nephrologyCare: "no",
  diabetes: "no",
  bloodPressure: "no",
  familyKidney: "no",
  riskFactors: [],
  signs: [],
  acute: [],
  haveNumbers: "no",
  ...over,
});

const withCreatinine = (value, unit = "umol", over = {}) =>
  kidneyAnswers({
    haveNumbers: "yes",
    whichNumbers: ["creatinine"],
    creatinine: value,
    creatinineUnit: unit,
    egfrReliability: [],
    ...over,
  });

const withAcr = (value, unit = "mgmmol", over = {}) =>
  kidneyAnswers({ haveNumbers: "yes", whichNumbers: ["acr"], acr: value, acrUnit: unit, ...over });

test("the kidney tool is registered and keeps the URL the campaign will point at", () => {
  const tool = TOOLS.find((t) => t.slug === "kidney-check");
  assert.ok(tool, "kidney-check is not in TOOLS");
  assert.equal(TOOLS.length, 5);
  assert.equal(tool.title, "Kidney Check");
  // The search terms people actually use have to survive into the <title>.
  assert.match(tool.seoTitle, /kidney function/i);
  assert.match(tool.seoTitle, /eGFR/);
  assert.ok(tool.description.length <= 155, `meta description is ${tool.description.length} chars`);
});

test("the provenance flags and the tables they describe cannot drift apart", () => {
  // Everything the brief settled is in place.
  assert.equal(PROVISIONAL.egfrEquation, false);
  assert.ok(CKD_EPI_2021.constant === 142 && EKFC.constant === 107.3);
  assert.equal(PROVISIONAL.gStages, false);
  assert.equal(G_STAGES.length, 6);
  assert.equal(PROVISIONAL.aStages, false);
  assert.equal(A_STAGES.length, 3);
  assert.equal(PROVISIONAL.grid, false);
  assert.equal(Object.keys(GRID).length, 6);
  assert.equal(PROVISIONAL.urgentThresholds, false);
  assert.ok(URGENT_RULES.length > 0);
  assert.equal(PROVISIONAL.screeningIntervals, false);
  assert.equal(KIDNEY_EVIDENCE_IS_FINAL, true);
  // Part 1 never produces a number of any kind.
  const screening = screeningFor(kidneyAnswers({ diabetes: "yes", bloodPressure: "treated" }));
  assert.equal(typeof screening.score, "undefined", "part 1 must not produce a score");
  assert.equal(typeof screening.percent, "undefined", "part 1 must not produce a percentage");
});

// ---------------------------------------------------------------------------
// Units.
// ---------------------------------------------------------------------------

test("creatinine converts both ways, and 1 mg/dL is 88.4 micromol/L", () => {
  // KDIGO's own conversion table: creatinine mg/dL x 88.4 = micromol/L.
  assert.equal(UMOL_PER_MGDL, 88.4);
  assert.equal(creatinineToUmol(88.4, "umol"), 88.4);
  assert.ok(Math.abs(creatinineToMgdl(88.4, "umol") - 1) < 1e-9);
  assert.equal(creatinineToMgdl(1, "mgdl"), 1);
  assert.ok(Math.abs(creatinineToUmol(1, "mgdl") - 88.4) < 1e-9);
  for (const umol of [45, 62, 88, 106, 140, 265, 620]) {
    const mgdl = creatinineToMgdl(umol, "umol");
    assert.ok(Math.abs(creatinineToUmol(mgdl, "mgdl") - umol) < 1e-9, `${umol}`);
  }
  // Nothing usable in, null out. No zero, no negative, no blank.
  for (const bad of [0, -1, "", null, undefined, "abc"]) {
    assert.equal(creatinineToMgdl(bad, "umol"), null, String(bad));
    assert.equal(creatinineToUmol(bad, "mgdl"), null, String(bad));
  }
});

test("the same creatinine reaches the same eGFR whichever unit it was typed in", () => {
  const a = numbersFor(withCreatinine(88.4, "umol"));
  const b = numbersFor(withCreatinine(1, "mgdl"));
  assert.ok(Math.abs(a.creatinine.mgdl - b.creatinine.mgdl) < 1e-9);
  assert.ok(Math.abs(a.creatinine.umol - b.creatinine.umol) < 1e-9);
  assert.deepEqual(a.egfr, b.egfr);
  assert.equal(a.g.id, b.g.id);
  // The unit typed is remembered, so the result screen can show the other one.
  assert.equal(a.creatinine.unit, "umol");
  assert.equal(b.creatinine.unit, "mgdl");
});

test("ACR converts both ways on KDIGO's exact factor, mg/g x 0.113 = mg/mmol", () => {
  assert.ok(Math.abs(MGG_PER_MGMMOL - 1 / 0.113) < 1e-12);
  assert.ok(Math.abs(acrToMgg(1, "mgmmol") - 8.8496) < 1e-3);
  // KDIGO's own "approximately equivalent" columns are not exact: 30 mg/g is
  // strictly 3.39 mg/mmol, which is the whole reason banding happens in the
  // reported unit rather than after a conversion.
  assert.ok(Math.abs(acrToMgmmol(30, "mgg") - 3.39) < 0.01);
  for (const mgmmol of [0, 0.5, 3, 12.5, 30, 100, 340]) {
    const mgg = acrToMgg(mgmmol, "mgmmol");
    assert.ok(Math.abs(acrToMgmmol(mgg, "mgg") - mgmmol) < 1e-9, `${mgmmol}`);
  }
  // Zero albumin is a real, good result, unlike a zero creatinine.
  assert.equal(acrToMgg(0, "mgmmol"), 0);
  assert.equal(acrToMgmmol(0, "mgg"), 0);
  for (const bad of [-1, "", null, undefined, "abc"]) assert.equal(acrToMgg(bad, "mgmmol"), null, String(bad));
});

test("an ACR is banded in the unit it was reported in, never after a conversion", () => {
  // This is KDIGO's instruction and it changes answers. 3 mg/mmol is A2 on the
  // mg/mmol row. Convert it first and it becomes 26.5 mg/g, which is A1. The
  // guideline does not move that person across the line, so neither does this.
  assert.equal(aStageFor(3, "mgmmol").id, "A2");
  assert.equal(aStageFor(acrToMgg(3, "mgmmol"), "mgg").id, "A1", "converting first would change the band");
  assert.equal(aStageFor(30, "mgg").id, "A2");
  // Both boundary rows are read off KDIGO 2024 Table 3 as printed.
  assert.equal(A_STAGES[1].bands.mgmmol.min, 3);
  assert.equal(A_STAGES[1].bands.mgg.min, 30);
  assert.match(A_BOUNDARY_NOTE, /approximately equivalent/);
});

// ---------------------------------------------------------------------------
// The staging tables.
// ---------------------------------------------------------------------------

test("every G band boundary lands where KDIGO 2024 Table 2 puts it", () => {
  // G1 >=90, G2 60-89, G3a 45-59, G3b 30-44, G4 15-29, G5 <15. Unchanged from
  // KDIGO 2012, which is what the site's own article cites.
  const cases = [
    [200, "G1"], [90, "G1"],
    [89.9, "G2"], [89, "G2"], [60, "G2"],
    [59.9, "G3a"], [59, "G3a"], [45, "G3a"],
    [44.9, "G3b"], [44, "G3b"], [30, "G3b"],
    [29.9, "G4"], [29, "G4"], [15, "G4"],
    [14.9, "G5"], [14, "G5"], [0, "G5"],
  ];
  for (const [egfr, id] of cases) assert.equal(gStageFor(egfr)?.id, id, `eGFR ${egfr}`);
  for (const none of [null, undefined, NaN, "abc"]) assert.equal(gStageFor(none), null, String(none));
  // Ordered best to worst, with no gap and no overlap.
  assert.deepEqual(G_STAGES.map((g) => g.id), ["G1", "G2", "G3a", "G3b", "G4", "G5"]);
  for (let i = 1; i < G_STAGES.length; i += 1) {
    assert.ok(G_STAGES[i].max < G_STAGES[i - 1].min, `${G_STAGES[i].id} overlaps ${G_STAGES[i - 1].id}`);
    assert.ok(G_STAGES[i - 1].min - G_STAGES[i].max < 0.01, `gap under ${G_STAGES[i - 1].id}`);
    assert.ok(G_STAGES[i].name && G_STAGES[i].meaning, G_STAGES[i].id);
  }
  // The footnote that stops an ordinary eGFR reading as a disease finding.
  assert.match(G1_G2_FOOTNOTE, /neither G1 nor G2 fulfills the criteria/);
  assert.match(G_STAGES[0].meaning, /neither G1 nor G2/);
  assert.match(G_STAGES[1].meaning, /unless there is evidence of kidney damage/);
});

test("every A band boundary lands where KDIGO 2024 Table 3 puts it, in both units", () => {
  // A1 <3 mg/mmol (<30 mg/g), A2 3 to 30 (30 to 300), A3 above.
  const mgmmol = [
    [0, "A1"], [1, "A1"], [2.9, "A1"], [2.99, "A1"],
    [3, "A2"], [10, "A2"], [29.9, "A2"],
    [30, "A3"], [70, "A3"], [500, "A3"],
  ];
  for (const [value, id] of mgmmol) assert.equal(aStageFor(value, "mgmmol")?.id, id, `${value} mg/mmol`);
  const mgg = [
    [0, "A1"], [10, "A1"], [29, "A1"], [29.9, "A1"],
    [30, "A2"], [100, "A2"], [299, "A2"], [299.9, "A2"],
    [300, "A3"], [700, "A3"], [5000, "A3"],
  ];
  for (const [value, id] of mgg) assert.equal(aStageFor(value, "mgg")?.id, id, `${value} mg/g`);
  // An unrecognised unit falls back to mg/mmol, the default on the form, and
  // never to no band at all.
  assert.equal(aStageFor(5, "nonsense")?.id, "A2");
  for (const none of [null, undefined, "", "abc", -1]) assert.equal(aStageFor(none, "mgmmol"), null, String(none));
  // Contiguous in both units, starting at zero and ending open.
  for (const unit of ["mgmmol", "mgg"]) {
    assert.equal(A_STAGES[0].bands[unit].min, 0);
    assert.equal(A_STAGES[A_STAGES.length - 1].bands[unit].below, Infinity);
    for (let i = 1; i < A_STAGES.length; i += 1) {
      assert.equal(A_STAGES[i].bands[unit].min, A_STAGES[i - 1].bands[unit].below, `${unit} gap at ${A_STAGES[i].id}`);
    }
  }
  for (const a of A_STAGES) assert.ok(a.name && a.meaning, a.id);
  // A2 is where albuminuria becomes a marker of kidney damage in the
  // definition, so it has to say so.
  assert.match(A_STAGES[1].meaning, /marker of kidney damage/);
  assert.match(A_STAGES[1].meaning, /even where the eGFR is entirely normal/);
});

test("the combined grid is KDIGO's own, cell for cell", () => {
  // Read off the colour figure on p. S126 of the KDIGO 2024 guideline.
  const expected = {
    G1: { A1: "low", A2: "moderate", A3: "high" },
    G2: { A1: "low", A2: "moderate", A3: "high" },
    G3a: { A1: "moderate", A2: "high", A3: "veryHigh" },
    G3b: { A1: "high", A2: "veryHigh", A3: "veryHigh" },
    G4: { A1: "veryHigh", A2: "veryHigh", A3: "veryHigh" },
    G5: { A1: "veryHigh", A2: "veryHigh", A3: "veryHigh" },
  };
  assert.deepEqual(GRID, expected);
  // Every G stage has a row, every row a cell per A stage, every cell a
  // category that exists, and every cell a monitoring frequency.
  const ids = GRID_CATEGORIES.map((c) => c.id);
  for (const g of G_STAGES) {
    for (const a of A_STAGES) {
      const cell = gridCellFor(g.id, a.id);
      assert.ok(cell && cell.label, `${g.id} ${a.id} does not resolve`);
      assert.ok(ids.includes(GRID[g.id][a.id]), `${g.id} ${a.id} names an unknown category`);
      assert.ok(GRID_MONITORING[g.id][a.id], `${g.id} ${a.id} has no monitoring frequency`);
      assert.equal(cell.testsPerYear, GRID_MONITORING[g.id][a.id]);
    }
  }
  // The whole point of the tool, on the grid: a normal eGFR with heavy
  // albuminuria is a high-risk cell, not a green one.
  assert.equal(gridCellFor("G1", "A3").id, "high");
  assert.equal(gridCellFor("G2", "A3").id, "high");
  assert.equal(gridCellFor("G1", "A2").id, "moderate");
  // KDIGO's legend footnote on the green cells has to travel with them.
  assert.match(GRID_CATEGORIES.find((c) => c.id === "low").meaning, /not chronic kidney disease at all/);
  // One letter is never enough for a cell.
  assert.equal(gridCellFor("G1", null), null);
  assert.equal(gridCellFor(null, "A1"), null);
  assert.equal(gridCellFor("G9", "A1"), null);
});

// ---------------------------------------------------------------------------
// The equations.
// ---------------------------------------------------------------------------

test("CKD-EPI 2021 reproduces its published reference points", () => {
  // At a creatinine equal to kappa both power terms collapse to 1, which makes
  // these two the cleanest published anchors the equation has.
  //   female, 50: 142 x 0.9938^50 x 1.012 = 105
  //   male,   50: 142 x 0.9938^50         = 104
  assert.equal(Math.round(ckdEpiFrom({ creatinineMgdl: 0.7, age: 50, sex: "female" })), 105);
  assert.equal(Math.round(ckdEpiFrom({ creatinineMgdl: 0.9, age: 50, sex: "male" })), 104);
  // The upper branch, above kappa, where the -1.200 exponent takes over.
  assert.equal(Math.round(ckdEpiFrom({ creatinineMgdl: 1.5, age: 60, sex: "male" })), 53);
  assert.equal(Math.round(ckdEpiFrom({ creatinineMgdl: 1.9, age: 65, sex: "female" })), 29);
  // The coefficients are the published ones and no others.
  assert.equal(CKD_EPI_2021.constant, 142);
  assert.equal(CKD_EPI_2021.ageBase, 0.9938);
  assert.equal(CKD_EPI_2021.upperExponent, -1.2);
  assert.deepEqual(CKD_EPI_2021.bySex.female, { kappa: 0.7, alpha: -0.241, sexFactor: 1.012 });
  assert.deepEqual(CKD_EPI_2021.bySex.male, { kappa: 0.9, alpha: -0.302, sexFactor: 1 });
  // Continuous at the knee. The exponent changes there, so the slope kinks,
  // but the value does not jump. That is the property the ratio form has and
  // the SI table's rounded branch points (61.9 against a kappa of 61.88) do
  // not, which is why the ratio form is the one implemented.
  const below = ckdEpiFrom({ creatinineMgdl: 0.8999, age: 50, sex: "male" });
  const at = ckdEpiFrom({ creatinineMgdl: 0.9, age: 50, sex: "male" });
  const above = ckdEpiFrom({ creatinineMgdl: 0.9001, age: 50, sex: "male" });
  assert.ok(below > at && at > above, "the equation has to fall monotonically through the knee");
  assert.ok(Math.abs(below - above) < 0.05, `discontinuity at kappa: ${below} vs ${above}`);
  // Moves the right way with creatinine and with age.
  assert.ok(
    ckdEpiFrom({ creatinineMgdl: 2.4, age: 50, sex: "female" }) <
      ckdEpiFrom({ creatinineMgdl: 0.8, age: 50, sex: "female" }),
    "a higher creatinine has to give a lower eGFR",
  );
  assert.ok(
    ckdEpiFrom({ creatinineMgdl: 1, age: 70, sex: "male" }) < ckdEpiFrom({ creatinineMgdl: 1, age: 30, sex: "male" }),
    "the same creatinine has to give a lower eGFR at a greater age",
  );
});

test("EKFC uses the published Black African reference values and its own definition point", () => {
  // At SCr = Q and age 40 or under, EKFC is its constant exactly.
  assert.ok(Math.abs(ekfcFrom({ creatinineMgdl: 0.96, age: 30, sex: "male" }) - 107.3) < 1e-9);
  assert.ok(Math.abs(ekfcFrom({ creatinineMgdl: 0.72, age: 30, sex: "female" }) - 107.3) < 1e-9);
  // Above 40 the age factor is 0.990 per year past 40, and nothing before it.
  assert.ok(Math.abs(ekfcFrom({ creatinineMgdl: 0.96, age: 40, sex: "male" }) - 107.3) < 1e-9);
  assert.ok(Math.abs(ekfcFrom({ creatinineMgdl: 0.96, age: 50, sex: "male" }) - 107.3 * 0.99 ** 10) < 1e-9);
  // The Q values are the published mg/dL figures for Black Africans, from 470
  // healthy individuals in the DR Congo plus a Cote d'Ivoire cohort.
  assert.deepEqual(EKFC.q, { male: 0.96, female: 0.72 });
  assert.equal(EKFC.constant, 107.3);
  assert.equal(EKFC.lowerExponent, -0.322);
  assert.equal(EKFC.upperExponent, -1.132);
  assert.equal(EKFC.ageBase, 0.99);
  assert.match(EKFC.citation, /Pottel/);
  assert.match(EKFC.citation, /Delanaye/);
});

test("the race coefficient is not implemented anywhere, in any form", () => {
  // The 2009 equation multiplied by 1.159 for anyone recorded as Black. KDIGO
  // 2024 Practice Point 1.2.4.2: race should not be used in computing an eGFR.
  const source = JSON.stringify([CKD_EPI_2021, EKFC]);
  assert.doesNotMatch(source, /1\.159/, "the race coefficient must not appear");
  assert.doesNotMatch(source, /\brace\b/i);
  assert.doesNotMatch(source, /ethnic/i);
  // No input to either equation can carry it: the only inputs are creatinine,
  // age and sex.
  const args = { creatinineMgdl: 1.2, age: 50, sex: "male" };
  assert.equal(ckdEpiFrom({ ...args, race: "black" }), ckdEpiFrom(args));
  assert.equal(ekfcFrom({ ...args, race: "black" }), ekfcFrom(args));
  // And no question in the flow asks for it.
  const questions = JSON.stringify([...SCREENING_STEPS, ...NUMBERS_STEPS].map((s) => [s.text, s.help, s.options]));
  assert.doesNotMatch(questions, /\brace\b/i);
  assert.doesNotMatch(questions, /ethnic/i);
});

test("an eGFR is a range of whole numbers, never one confident decimal", () => {
  const { egfr } = numbersFor(withCreatinine(106, "umol", { age: 60, sex: "male" }));
  // Both figures are integers: the brief's rule is never to display a decimal.
  for (const key of ["reported", "ckdEpi", "ekfc", "low", "high"]) {
    assert.equal(egfr[key], Math.round(egfr[key]), `${key} is not a whole number`);
  }
  assert.ok(egfr.low <= egfr.reported && egfr.reported <= egfr.high);
  // The reported figure is CKD-EPI 2021, because that is what a lab reports
  // and therefore the number least likely to conflict with the person's own.
  assert.equal(egfr.reported, egfr.ckdEpi);
  // Where the two published equations land in different bands, the result says
  // so. Male, 52, creatinine 91 micromol/L: CKD-EPI 89 is G2, EKFC 90 is G1.
  const split = numbersFor(withCreatinine(91, "umol", { age: 50, sex: "male" }));
  assert.equal(split.egfr.ckdEpi, 89);
  assert.equal(split.egfr.ekfc, 90);
  assert.equal(split.egfr.equationsDisagree, true);
  assert.equal(split.g.id, "G2", "the band follows the reported equation");
  // And where they agree, it does not manufacture a disagreement.
  const agreed = numbersFor(withCreatinine(133, "umol", { age: 60, sex: "male" }));
  assert.equal(agreed.egfr.equationsDisagree, false);
  assert.equal(agreed.egfr.low, agreed.egfr.high);
});

test("every eGFR carries its caveat, and below 60 the caveat gets stronger", () => {
  // The ARK figures, which are the reason the caveat exists at all.
  assert.match(EGFR_CAVEAT, /has been validated against measured kidney function in Ghanaian adults/);
  assert.match(EGFR_CAVEAT, /2,578 adults/);
  assert.match(EGFR_CAVEAT, /30%/);
  assert.match(EGFR_CAVEAT_LOW, /25%/);
  assert.match(EGFR_CAVEAT_LOW, /14%/);
  assert.equal(EGFR_LOW_THRESHOLD, 60);
  // The flag the result screen reads to decide which caveat to print.
  assert.equal(numbersFor(withCreatinine(62, "umol", { age: 50, sex: "female" })).egfrLow, false);
  assert.equal(numbersFor(withCreatinine(133, "umol", { age: 60, sex: "male" })).egfrLow, true);
});

test("the tool refuses to estimate for anyone under 18", () => {
  // Both equations were derived and validated in adults of 18 and over.
  assert.equal(MIN_EGFR_AGE, 18);
  assert.equal(ckdEpiFrom({ creatinineMgdl: 1, age: 17, sex: "male" }), null);
  assert.equal(ekfcFrom({ creatinineMgdl: 1, age: 17, sex: "male" }), null);
  assert.equal(egfrFrom({ creatinineMgdl: 1, age: 17, sex: "male" }), null);
  assert.equal(ckdEpiFrom({ creatinineMgdl: 1, age: 18, sex: "male" }) > 0, true);
  // And nothing usable in, null out.
  assert.equal(egfrFrom({ creatinineMgdl: 0, age: 50, sex: "male" }), null);
  assert.equal(egfrFrom({ creatinineMgdl: 1, age: 0, sex: "male" }), null);
});

// ---------------------------------------------------------------------------
// When the tool must not compute at all.
// ---------------------------------------------------------------------------

test("under 18, pregnancy and nephrology care each stop the calculator dead", () => {
  assert.deepEqual(EXCLUSIONS.map((e) => e.id), ["under18", "pregnant", "nephrology"]);
  for (const e of EXCLUSIONS) {
    assert.ok(e.headline && e.body.length > 80 && e.source, e.id);
  }
  assert.equal(exclusionFor(kidneyAnswers({ age: 15 })).id, "under18");
  assert.equal(exclusionFor(kidneyAnswers({ pregnant: "yes" })).id, "pregnant");
  assert.equal(exclusionFor(kidneyAnswers({ nephrologyCare: "yes" })).id, "nephrology");
  assert.equal(exclusionFor(kidneyAnswers()), null);

  for (const over of [{ age: 15 }, { pregnant: "yes" }, { nephrologyCare: "yes" }]) {
    const values = withCreatinine(140, "umol", over);
    const result = computeKidney(values);
    assert.ok(result.exclusion, JSON.stringify(over));
    // Nothing is computed from the numbers, even though a number was typed.
    assert.equal(result.numbers.have, "none");
    assert.equal(result.numbers.egfr, null);
    assert.equal(result.numbers.g, null);
    // Nothing is sold either.
    assert.equal(result.cta.kind, "none");
    assert.equal(result.missingHalf, null);
    // And the whole of part 2 drops out of the flow rather than being asked
    // and then ignored.
    const visible = NUMBERS_STEPS.filter((s) => typeof s.skipIf !== "function" || !s.skipIf(values));
    assert.deepEqual(visible, [], JSON.stringify(over));
  }
  // Pregnancy is only asked of anyone whose lab reference is the female one.
  const pregnantStep = SCREENING_STEPS.find((s) => s.id === "pregnant");
  assert.equal(pregnantStep.skipIf({ sex: "male" }), true);
  assert.equal(pregnantStep.skipIf({ sex: "female" }), false);
});

test("the conditions KDIGO says make an eGFR less accurate suppress the number", () => {
  assert.equal(UNRELIABLE_CONDITIONS.length, 7);
  for (const c of UNRELIABLE_CONDITIONS) assert.ok(c.id && c.label && c.short, c.id);
  const flagged = computeKidney(withCreatinine(106, "umol", { egfrReliability: ["muscleHigh"] }));
  assert.deepEqual(flagged.numbers.unreliable.map((c) => c.id), ["muscleHigh"]);
  assert.equal(flagged.numbers.egfr, null, "no number where the estimate is known to be unreliable");
  assert.equal(flagged.numbers.g, null);
  // The creatinine itself still survives, because converting the unit is real
  // help and does not depend on any equation.
  assert.equal(flagged.numbers.creatinine.typed, 106);
  assert.equal(flagged.numbers.have, "creatinine");
  assert.equal(flagged.numbers.missing, "acr");
  // With nothing ticked, the number comes back.
  assert.ok(computeKidney(withCreatinine(106, "umol")).numbers.egfr);
});

// ---------------------------------------------------------------------------
// The branch, which is the point of the tool.
// ---------------------------------------------------------------------------

test("the no-numbers path is the ordinary one, and it says which half is missing", () => {
  const r = computeKidney(kidneyAnswers({ diabetes: "yes" }));
  assert.equal(r.numbers.have, "none");
  assert.equal(r.numbers.missing, "both");
  assert.equal(r.numbers.creatinine, null);
  assert.equal(r.numbers.acr, null);
  assert.equal(r.numbers.egfr, null);
  assert.equal(r.numbers.g, null);
  assert.equal(r.numbers.a, null);
  assert.equal(r.missingHalf, MISSING_HALF.both);
  // Both tests are offered, not one.
  assert.equal(r.cta.kind, "tests");
  assert.deepEqual(r.cta.items.map((t) => t.testCode), ["RFT", "ACR"]);
  // Saying no ends part 2, so nothing after the gate is asked.
  const values = kidneyAnswers({ haveNumbers: "no" });
  const visible = NUMBERS_STEPS.filter((s) => typeof s.skipIf !== "function" || !s.skipIf(values));
  assert.deepEqual(visible.map((s) => s.id), ["haveNumbers"]);
});

test("one number only is the case the tool exists for, and it names the missing half", () => {
  // Blood only: the urine half is what is missing, and the copy carries the
  // Ghanaian figures that make the argument.
  const blood = computeKidney(withCreatinine(88, "umol"));
  assert.equal(blood.numbers.have, "creatinine");
  assert.equal(blood.numbers.missing, "acr");
  assert.equal(blood.missingHalf, MISSING_HALF.acr);
  assert.match(blood.missingHalf.heading, /urine half is missing/i);
  assert.match(blood.missingHalf.body, /3\.7%/);
  assert.match(blood.missingHalf.body, /8\.4%/);
  assert.match(blood.missingHalf.body, /10\.9%/);
  assert.equal(blood.cta.kind, "test");
  assert.equal(blood.cta.testCode, "ACR");
  assert.equal(blood.numbers.g.id, "G2");
  // A perfectly normal eGFR still gets told the picture is half done, which is
  // the failure mode the whole tool is built against. Female, 52, creatinine
  // 62 micromol/L reads 104, squarely in G1.
  const normal = computeKidney(withCreatinine(62, "umol"));
  assert.equal(normal.numbers.g.id, "G1");
  assert.equal(normal.numbers.missing, "acr");
  assert.equal(normal.missingHalf, MISSING_HALF.acr, "a normal eGFR must still be told what is missing");
  assert.equal(normal.cta.testCode, "ACR");

  // Urine only: the blood half is what is missing.
  const urine = computeKidney(withAcr(2, "mgmmol"));
  assert.equal(urine.numbers.have, "acr");
  assert.equal(urine.numbers.missing, "creatinine");
  assert.equal(urine.missingHalf, MISSING_HALF.creatinine);
  assert.match(urine.missingHalf.heading, /blood half is missing/i);
  assert.equal(urine.cta.kind, "test");
  assert.equal(urine.cta.testCode, "RFT");
  // One letter does not place anyone on the grid.
  assert.equal(urine.numbers.grid, null);
  assert.equal(blood.numbers.grid, null);

  // Both: nothing is missing, there is nothing to sell, and the grid answers.
  const both = computeKidney(
    kidneyAnswers({
      haveNumbers: "yes",
      whichNumbers: ["creatinine", "acr"],
      creatinine: 88,
      creatinineUnit: "umol",
      egfrReliability: [],
      acr: 2,
      acrUnit: "mgmmol",
    }),
  );
  assert.equal(both.numbers.have, "both");
  assert.equal(both.numbers.missing, null);
  assert.equal(both.missingHalf, null);
  assert.ok(both.numbers.grid);
  assert.equal(both.cta.kind, "none");
  assert.match(both.cta.body, /three months/);

  // Every missing-half text makes the tool's central claim.
  for (const half of Object.values(MISSING_HALF)) {
    assert.ok(half.heading.length > 10 && half.body.length > 80);
  }
  assert.match(MISSING_HALF.acr.body, /free-standing marker of kidney damage/);
  assert.match(`${MISSING_HALF.both.heading} ${MISSING_HALF.both.body}`, /two numbers/);
});

test("a half-answered part 2 does not invent the half that was not asked for", () => {
  const picked = kidneyAnswers({ haveNumbers: "yes", whichNumbers: ["creatinine"] });
  assert.equal(wants(picked, "creatinine"), true);
  assert.equal(wants(picked, "acr"), false);
  // Before the pick is made, neither is ruled out, so the chapter screen can
  // count the questions honestly.
  const undecided = kidneyAnswers({ haveNumbers: "yes" });
  assert.equal(wants(undecided, "creatinine"), true);
  assert.equal(wants(undecided, "acr"), true);
  const no = kidneyAnswers({ haveNumbers: "no" });
  assert.equal(wants(no, "creatinine"), false);
  assert.equal(wants(no, "acr"), false);
  // A stray typed value from a back-then-change is not read.
  const stray = numbersFor(kidneyAnswers({ haveNumbers: "no", creatinine: 88, creatinineUnit: "umol", acr: 5 }));
  assert.equal(stray.have, "none");
  assert.equal(stray.creatinine, null);
  assert.equal(stray.acr, null);
});

// ---------------------------------------------------------------------------
// Part 1.
// ---------------------------------------------------------------------------

test("part 1 counts guideline risk factors and never scores them", () => {
  const none = screeningFor(kidneyAnswers());
  assert.equal(none.indicated, false);
  assert.equal(none.tier, "none");
  assert.deepEqual(none.reasons, []);

  // KDIGO names three highest-priority conditions for detection: hypertension,
  // diabetes, and cardiovascular disease including heart failure.
  const both = screeningFor(kidneyAnswers({ diabetes: "yes", bloodPressure: "untreated" }));
  assert.equal(both.indicated, true);
  assert.equal(both.tier, "priority");
  assert.deepEqual(both.priority.map((r) => r.id), ["diabetes", "hypertension"]);
  assert.equal(screeningFor(kidneyAnswers({ riskFactors: ["cardiovascular"] })).tier, "priority");
  assert.deepEqual(
    RISK_FACTORS.filter((f) => f.tier === "priority").map((f) => f.id),
    ["diabetes", "hypertension", "cardiovascular"],
  );
  // Treated hypertension still counts: the treatment is why it is known about.
  assert.equal(screeningFor(kidneyAnswers({ bloodPressure: "treated" })).tier, "priority");

  // Prediabetes is on the list, but it is not one of the two.
  const pre = screeningFor(kidneyAnswers({ diabetes: "prediabetes" }));
  assert.equal(pre.indicated, true);
  assert.equal(pre.tier, "listed");
  assert.equal(pre.reasons[0].label, "Prediabetes");

  // "Not sure" is a gap, not a risk factor. It never counts against anyone.
  const unsure = screeningFor(kidneyAnswers({ diabetes: "unsure", bloodPressure: "unsure", familyKidney: "unsure" }));
  assert.equal(unsure.indicated, false);
  assert.deepEqual(unsure.unknowns, ["bloodPressure", "diabetes", "familyKidney"]);

  const many = screeningFor(
    kidneyAnswers({ diabetes: "yes", bloodPressure: "treated", familyKidney: "yes", riskFactors: ["ancestry", "cystic"] }),
  );
  assert.equal(many.reasons.length, 5);

  // The only re-check interval any source supports is the annual one for
  // diabetes. KDIGO says outright that there are no evidence-based
  // recommendations on how often to screen anyone else, so nobody else gets a
  // date and the page says why rather than going quiet.
  assert.equal(screeningFor(kidneyAnswers({ diabetes: "yes" })).interval, DIABETES_INTERVAL);
  assert.match(DIABETES_INTERVAL.text, /Once a year/);
  assert.match(DIABETES_INTERVAL.text, /type 2/);
  assert.match(DIABETES_INTERVAL.text, /five years/);
  assert.match(DIABETES_INTERVAL.source, /ADA[/]KDIGO/);
  for (const over of [{}, { bloodPressure: "treated" }, { diabetes: "prediabetes" }, { familyKidney: "yes" }]) {
    assert.equal(screeningFor(kidneyAnswers(over)).interval, null, JSON.stringify(over));
  }
  assert.match(NO_INTERVAL_NOTE, /no evidence-based recommendations/);
  // No score either, with the reason on the page rather than in a comment.
  assert.match(NO_SCORE_NOTE, /not a score/);
  assert.match(NO_SCORE_NOTE, /93%/);
  assert.match(NO_SCORE_NOTE, /0[.]64/);
  assert.match(NO_SCORE_NOTE, /0[.]75/);
  // The registry figures the copy leans on, quoted from Table 1 rather than
  // from the paper's own abstract.
  const hypertension = RISK_FACTORS.find((f) => f.id === "hypertension");
  assert.match(hypertension.why, /260 of 687/);
  assert.match(hypertension.why, /37\.8%/);
  assert.doesNotMatch(JSON.stringify(RISK_FACTORS), /39\.9/, "the abstract's figure does not match its own table");
  // And the framing the brief called for: recorded causes, not "caused by".
  const page = JSON.stringify(TOOLS.find((t) => t.slug === "kidney-check"));
  assert.match(page, /most commonly recorded cause/);
  assert.doesNotMatch(page, /most kidney disease in Ghana is caused by/i);

  // KDIGO Table 5, and the three things routinely assumed into it that are not
  // in it: obesity, hepatitis and NSAID use. Herbal medicine IS on this list,
  // on Ghanaian evidence, and it says so rather than borrowing KDIGO's name.
  const ids = RISK_FACTORS.map((f) => f.id);
  for (const required of [
    "cardiovascular", "aki", "hiv", "autoimmune", "obstruction", "cystic",
    "occupational", "pregnancyHistory", "ancestry",
  ]) {
    assert.ok(ids.includes(required), `KDIGO Table 5 factor missing: ${required}`);
  }
  const factors = JSON.stringify(RISK_FACTORS);
  assert.doesNotMatch(factors, /obesity/i, "obesity is not in KDIGO Table 5");
  assert.doesNotMatch(factors, /hepatitis/i, "hepatitis is not in KDIGO Table 5; HIV is");
  const herbal = RISK_FACTORS.find((f) => f.id === "herbal");
  assert.doesNotMatch(herbal.source, /KDIGO/, "herbal medicine is a local addition, not a Table 5 entry");
  assert.match(herbal.why, /1[.]39/);
  assert.match(herbal.why, /2,781/);
  // KDIGO's gestational row only reaches whoever could have been pregnant.
  assert.ok(riskFactorOptions({ sex: "female" }).some((o) => o.value === "pregnancyHistory"));
  assert.ok(!riskFactorOptions({ sex: "male" }).some((o) => o.value === "pregnancyHistory"));
  assert.equal(riskFactorOptions({ sex: "female" }).length, riskFactorOptions({ sex: "male" }).length + 1);
});

test("the signs list separates the slow kind from the sudden kind", () => {
  const s = signsFor(kidneyAnswers({ signs: ["foamy", "blood"], acute: ["vomiting"] }));
  assert.deepEqual(s.picked.map((x) => x.id), ["foamy", "blood"]);
  assert.deepEqual(s.redFlags.map((x) => x.id), ["blood"]);
  assert.deepEqual(s.acute.map((x) => x.id), ["vomiting"]);
  const empty = signsFor(kidneyAnswers());
  assert.deepEqual(empty.picked, []);
  assert.deepEqual(empty.acute, []);
  for (const x of [...SIGNS, ...ACUTE_SIGNS]) assert.ok(x.label.length > 5 && x.short.length > 2, x.id);
  // Exactly one sign is a referral criterion on its own.
  assert.deepEqual(SIGNS.filter((x) => x.redFlag).map((x) => x.id), ["blood"]);
});

// ---------------------------------------------------------------------------
// Rule 3: prompt clinical attention, and the selling stops.
// ---------------------------------------------------------------------------

test("every KDIGO referral circumstance the tool can see fires, and stops the selling", () => {
  for (const rule of URGENT_RULES) {
    assert.ok(rule.id && rule.headline && rule.body.length > 80 && rule.source, rule.id);
    assert.equal(typeof rule.applies, "function");
  }
  const fires = (over) => computeKidney(over).urgent?.id || null;

  // eGFR below 30. Male, 70, creatinine 3.5 mg/dL is 18.
  assert.equal(EGFR_REFERRAL, 30);
  assert.equal(fires(withCreatinine(3.5, "mgdl", { age: 70, sex: "male" })), "egfrLow");
  // The line is strict: male, 45, creatinine 2.6 mg/dL reads exactly 30 and
  // does not fire, while female, 65, 1.9 mg/dL reads 29 and does.
  assert.equal(fires(withCreatinine(2.6, "mgdl", { age: 45, sex: "male" })), null);
  assert.equal(fires(withCreatinine(1.9, "mgdl", { age: 65, sex: "female" })), "egfrLow");

  // A3, at or above 300 mg/g or 30 mg/mmol.
  assert.deepEqual(ACR_REFERRAL, { mgmmol: 30, mgg: 300 });
  assert.equal(fires(withAcr(35, "mgmmol")), "acrHigh");
  assert.equal(fires(withAcr(350, "mgg")), "acrHigh");
  assert.equal(fires(withAcr(29, "mgmmol")), null);

  // Above 700 mg/g or 70 mg/mmol, which KDIGO names on its own, and which
  // outranks the plain A3 rule.
  assert.deepEqual(ACR_REFERRAL_HIGH, { mgmmol: 70, mgg: 700 });
  assert.equal(fires(withAcr(80, "mgmmol")), "acrVeryHigh");
  assert.equal(fires(withAcr(800, "mgg")), "acrVeryHigh");
  assert.equal(fires(withAcr(70, "mgmmol")), "acrHigh", "the referral-in-its-own-right rule is strictly above");

  // The two that must be reachable with no lab result at all.
  assert.equal(fires(kidneyAnswers({ signs: ["blood"] })), "haematuria");
  assert.equal(fires(kidneyAnswers({ acute: ["contrast"] })), "acute");
  assert.equal(fires(kidneyAnswers({ acute: ["lessUrine", "vomiting"] })), "acute");
  // Sudden injury outranks everything, because it is a different timescale.
  assert.equal(fires(withCreatinine(3.5, "mgdl", { age: 70, sex: "male", acute: ["nsaids"] })), "acute");

  // Nothing fires on an ordinary run.
  assert.equal(fires(kidneyAnswers()), null);
  assert.equal(fires(withCreatinine(88, "umol")), null);

  // And whichever fires, the page stops selling.
  for (const values of [
    kidneyAnswers({ signs: ["blood"] }),
    kidneyAnswers({ acute: ["vomiting"] }),
    withAcr(80, "mgmmol"),
    withCreatinine(3.5, "mgdl", { age: 70, sex: "male" }),
  ]) {
    const r = computeKidney(values);
    assert.ok(r.urgent);
    assert.equal(r.cta.kind, "none", r.urgent.id);
    assert.match(r.cta.label, /clinician/i);
  }
});

// ---------------------------------------------------------------------------
// The plumbing.
// ---------------------------------------------------------------------------

test("the lead payload stays inside the endpoint's limits, even fully loaded", () => {
  // Backend contract, restated in src/lib/leads.js: at most 16 keys, keys
  // ^[a-zA-Z][a-zA-Z0-9_]{0,39}$, values up to 200 characters. ToolLeadForm
  // adds optIn on top, so this tool gets 15 and uses at most 14.
  const KEY_RE = /^[a-zA-Z][a-zA-Z0-9_]{0,39}$/;
  const worst = kidneyAnswers({
    diabetes: "yes",
    bloodPressure: "untreated",
    familyKidney: "yes",
    riskFactors: RISK_FACTOR_PICKS.map((f) => f.id),
    signs: SIGNS.map((s) => s.id),
    acute: ACUTE_SIGNS.map((s) => s.id),
    haveNumbers: "yes",
    whichNumbers: ["creatinine", "acr"],
    creatinine: 265,
    creatinineUnit: "umol",
    egfrReliability: UNRELIABLE_CONDITIONS.map((c) => c.id),
    acr: 45.5,
    acrUnit: "mgmmol",
  });
  const runs = [
    kidneyAnswers(),
    worst,
    withAcr(0, "mgg"),
    withCreatinine(106, "umol"),
    kidneyAnswers({ pregnant: "yes" }),
    kidneyAnswers({
      haveNumbers: "yes",
      whichNumbers: ["creatinine", "acr"],
      creatinine: 133,
      creatinineUnit: "umol",
      egfrReliability: [],
      acr: 12,
      acrUnit: "mgmmol",
      age: 60,
      sex: "male",
    }),
  ];
  for (const values of runs) {
    const result = computeKidney(values);
    const keys = Object.keys(result.answers);
    assert.ok(keys.length <= MAX_ANSWER_KEYS, `${keys.length} keys, cap is ${MAX_ANSWER_KEYS}`);
    assert.ok(MAX_ANSWER_KEYS + 1 <= 16, "optIn has to fit alongside");
    for (const [k, v] of Object.entries(result.answers)) {
      assert.match(k, KEY_RE, k);
      assert.equal(typeof v, "string", k);
      assert.ok(v.length <= 200, `${k} is ${v.length} chars: ${v}`);
    }
  }
  // Nothing identifying rides along in the answers.
  const blob = JSON.stringify(computeKidney(worst).answers).toLowerCase();
  for (const forbidden of ["whatsapp", "phone", "firstname", "email"]) {
    assert.ok(!blob.includes(forbidden), forbidden);
  }
  // packKidney survives being handed nothing at all.
  assert.ok(Object.keys(packKidney()).length <= MAX_ANSWER_KEYS);
  // The staged pair is what ops actually needs to see.
  const staged = computeKidney(runs[runs.length - 1]).answers;
  assert.match(staged.egfr, /CKD-EPI 2021/);
  assert.match(staged.egfr, /EKFC/);
  assert.match(staged.kdigo, /G3a A2/);
});

test("the flow is two parts, and the branch is the second one's first question", () => {
  assert.equal(KIDNEY_PARTS.length, 2);
  assert.equal(KIDNEY_PARTS[0].id, "screening");
  assert.equal(KIDNEY_PARTS[1].id, "numbers");
  assert.equal(SCREENING_STEPS.length, 10);
  assert.equal(NUMBERS_STEPS.length, 5);
  assert.equal(countQuestions(KIDNEY_PARTS), 15);
  // The branch is explicit, and it is asked before anything is typed.
  assert.equal(NUMBERS_STEPS[0].id, "haveNumbers");
  for (const step of NUMBERS_STEPS.slice(1)) assert.equal(typeof step.skipIf, "function", step.id);

  // What people actually answer. A man skips the pregnancy question.
  const man = kidneyAnswers({ sex: "male", haveNumbers: "no" });
  assert.equal(countVisibleQuestions(KIDNEY_PARTS, man), 10);
  const woman = kidneyAnswers({ sex: "female", haveNumbers: "no" });
  assert.equal(countVisibleQuestions(KIDNEY_PARTS, woman), 11);
  assert.equal(countVisibleQuestions(KIDNEY_PARTS, withCreatinine(88, "umol", { sex: "male" })), 13);
  assert.equal(
    countVisibleQuestions(
      KIDNEY_PARTS,
      kidneyAnswers({ sex: "male", haveNumbers: "yes", whichNumbers: ["creatinine", "acr"] }),
    ),
    14,
  );
  // An exclusion drops the whole of part 2, so the run is part 1 alone.
  assert.equal(countVisibleQuestions(KIDNEY_PARTS, kidneyAnswers({ sex: "male", nephrologyCare: "yes" })), 9);

  // Every step is answerable: a tap list, or a number box with a unit beside it.
  for (const step of [...SCREENING_STEPS, ...NUMBERS_STEPS]) {
    assert.ok(["choice", "multi", "number"].includes(step.kind), `${step.id} is ${step.kind}`);
    assert.ok(step.text && step.text.length > 5, step.id);
    if (step.kind === "choice") assert.ok(step.options.length >= 2, step.id);
  }
  // Only three screens ask anyone to type, and each one is a lab value.
  const typed = [...SCREENING_STEPS, ...NUMBERS_STEPS].filter((s) => s.kind === "number");
  assert.deepEqual(typed.map((s) => s.id), ["ageStep", "creatinineStep", "acrStep"]);
});

test("both number boxes carry a unit selector, and the range follows the unit", () => {
  const creat = NUMBERS_STEPS.find((s) => s.id === "creatinineStep");
  const acr = NUMBERS_STEPS.find((s) => s.id === "acrStep");
  assert.equal(creat.choice.id, "creatinineUnit");
  assert.equal(acr.choice.id, "acrUnit");
  assert.deepEqual(CREATININE_UNITS.map((u) => u.value), ["umol", "mgdl"]);
  assert.deepEqual(ACR_UNITS.map((u) => u.value), ["mgmmol", "mgg"]);
  // A creatinine of 90 is ordinary in micromol/L and impossible in mg/dL, so
  // the box has to move with the unit rather than accept both.
  const umol = creat.fieldFor({ creatinineUnit: "umol" });
  const mgdl = creat.fieldFor({ creatinineUnit: "mgdl" });
  assert.equal(umol.unit, "micromol/L");
  assert.equal(mgdl.unit, "mg/dL");
  assert.ok(90 >= umol.min && 90 <= umol.max, "90 micromol/L must be accepted");
  assert.ok(90 > mgdl.max, "90 mg/dL must be rejected");
  assert.ok(1 >= mgdl.min && 1 <= mgdl.max, "1 mg/dL must be accepted");
  assert.ok(1 < umol.min, "1 micromol/L must be rejected");
  // And the error says which way to fix it.
  assert.match(CREATININE_RANGES.umol.error, /mg\/dL/);
  assert.match(CREATININE_RANGES.mgdl.error, /micromol\/L/);
  // Zero albumin is a real result, so the ACR box has to start at zero.
  assert.equal(ACR_RANGES.mgmmol.min, 0);
  assert.equal(ACR_RANGES.mgg.min, 0);
  assert.equal(acr.fieldFor({ acrUnit: "mgg" }).unit, "mg/g");
  assert.equal(acr.fieldFor({}).unit, "mg/mmol");
  // Decimals survive: a creatinine of 1.02 mg/dL is not 1.
  assert.equal(creat.field.step, "any");
  assert.equal(acr.field.step, "any");
  assert.equal(numbersFor(withCreatinine(1.02, "mgdl")).creatinine.typed, 1.02);
});

test("the next step follows what is missing, and the codes deep-link", () => {
  assert.equal(RFT_TEST.testCode, "RFT");
  assert.equal(RFT_TEST.slug, "renal-function");
  assert.equal(ACR_TEST.testCode, "ACR");
  assert.equal(ACR_TEST.slug, "acr");
  // Both slugs have to resolve, or ToolCta prices them at the static fallback
  // for ever and joinUrl sends nobody anywhere.
  assert.equal(SINGLE_TEST_CODES[RFT_TEST.slug], "RFT");
  assert.equal(SINGLE_TEST_CODES[ACR_TEST.slug], "ACR");
  // Static fallback prices, verified against the Ghana catalogue 2026-09-05.
  assert.equal(RFT_TEST.price, "GHS 195");
  assert.equal(ACR_TEST.price, "GHS 150");
  // healthInterest carries the code the result is pointing at, and defaults to
  // the urine test, which is the one the evidence says matters most.
  assert.equal(computeKidney(withCreatinine(88, "umol")).healthInterest, "ACR");
  assert.equal(computeKidney(withAcr(2, "mgmmol")).healthInterest, "RFT");
  assert.equal(computeKidney(kidneyAnswers()).healthInterest, "ACR");
  // An exclusion sells nothing, and says why rather than going silent.
  const blocked = kidneyCta({
    screening: screeningFor(kidneyAnswers()),
    numbers: numbersFor(kidneyAnswers({ pregnant: "yes" })),
    urgent: null,
    exclusion: { id: "pregnant", body: "Take any result you have to your antenatal appointment." },
  });
  assert.equal(blocked.kind, "none");
  assert.match(blocked.body, /antenatal/);
});

test("the kidney share card carries the result and the point, and nothing personal", () => {
  const cases = [
    kidneyAnswers({ diabetes: "yes" }),
    withCreatinine(88, "umol"),
    withAcr(12, "mgmmol"),
    kidneyAnswers({
      haveNumbers: "yes",
      whichNumbers: ["creatinine", "acr"],
      creatinine: 140,
      creatinineUnit: "umol",
      egfrReliability: [],
      acr: 12,
      acrUnit: "mgmmol",
      age: 60,
      sex: "male",
    }),
    kidneyAnswers({ pregnant: "yes" }),
    kidneyAnswers({ signs: ["blood"] }),
    withCreatinine(106, "umol", { egfrReliability: ["creatine"] }),
  ];
  for (const values of cases) {
    const result = computeKidney(values);
    const spec = shareSpecFor("kidney-check", result);
    assert.ok(spec, "no share spec");
    assert.equal(spec.slug, "kidney-check");
    assert.equal(spec.url, `${SHARE_HOST}/tools/kidney-check`);
    assert.equal(spec.disclaimer, TOOL_DISCLAIMER);
    assert.equal(spec.fileName, "betterhealth-kidney-check.png");
    assert.ok(spec.headline && spec.band && spec.meaning);
    assert.ok(spec.text.includes(spec.headline) && spec.text.includes(spec.href));
    // Nothing from part 1 reaches the card: no risk factor, no symptom, no age.
    const blob = JSON.stringify(spec).toLowerCase();
    for (const leaked of ["diabetes", "family", "swelling", "foamy", "pregnan"]) {
      assert.ok(!blob.includes(leaked), `${leaked} leaked onto the card`);
    }
  }
  // The card with one number says which half is still missing, on the card.
  for (const values of [withCreatinine(88, "umol"), withAcr(12, "mgmmol")]) {
    const spec = shareSpecFor("kidney-check", computeKidney(values));
    assert.match(JSON.stringify(spec), /Still missing/, "the one-number card has to name the gap");
  }
  // An eGFR on a card is a range, never one confident figure.
  const banded = shareSpecFor("kidney-check", computeKidney(withCreatinine(91, "umol", { age: 50, sex: "male" })));
  assert.match(banded.headline, /^eGFR \d+ to \d+$/, banded.headline);
});

test("every kidney claim on the page traces to a source on the page's own list", () => {
  const tool = TOOLS.find((t) => t.slug === "kidney-check");
  const labels = tool.sources.map((s) => s.label).join(" ");
  for (const cited of [
    "KDIGO 2024", // the stages, the grid, the three-month rule, the referrals
    "Inker", // CKD-EPI 2021
    "Pottel", // EKFC
    "Delanaye", // the Black African Q values
    "Fabian", // ARK, the accuracy figures behind every caveat
    "Zingano", // 61.9% with the race coefficient, 72.9% without
    "Delgado", // the NKF-ASN task force
    "Adjei", // RODAM, the Ghanaian eGFR and albuminuria split
    "Boima", // the Ghana Renal Registry
    "Gbadegesin", // APOL1 in West Africans
    "Tannor", // dialysis capacity in Ghana, and the herbal-medicine odds ratio
    "Ahn", // why nothing is computed in pregnancy
    "Standard Treatment Guidelines", // Ghana's own detection paragraph
    "de Boer", // the ADA/KDIGO annual interval for diabetes
    "Vosters", // HELIUS, including 1,417 Ghanaian women and 896 Ghanaian men
    "Aparcana-Granda", // why there is no score
    "Moyer", // USPSTF, the counterweight for the no-risk-factor group
    "Matsushita", // the outcome data the grid is built on
  ]) {
    assert.ok(labels.includes(cited), `missing source: ${cited}`);
  }
  for (const cited of [
    "/blog/creatinine-egfr-kidney-function",
    "/blog/urinalysis-explained",
    "/blog/high-blood-pressure-silent-killer",
    "/blog/prediabetes-warning-signs",
  ]) {
    assert.ok(tool.sources.some((s) => s.url === cited), `missing source: ${cited}`);
  }
  for (const s of tool.sources) {
    assert.ok(s.label && s.label.length > 10, s.label);
    assert.ok(s.url, `${s.label} needs a link`);
    assert.doesNotMatch(s.label, /—/, s.label);
  }
  // Every risk factor names where it came from.
  for (const f of RISK_FACTORS) assert.ok(f.source, `${f.id} has no source`);

  const page = JSON.stringify([tool.intro, tool.promise, tool.sections, tool.bullets]);
  // The three rules that hold whatever else changes have to be on the page.
  assert.match(page, /not a diagnosis/i);
  assert.match(page, /three months/);
  assert.match(page, /estimate/i);
  // The tool's whole point.
  assert.match(page, /two numbers/i);
  // KDIGO's detection practice point asks for BOTH tests, which is the tool's
  // whole argument, so it has to be on the page in the guideline's own words.
  assert.match(page, /both urine albumin measurement and assessment of glomerular filtration rate/);
  // The prevalence figures the brief warned about are not quoted as facts
  // about the reader: no national prevalence percentage appears at all.
  assert.doesNotMatch(page, /19% of Ghanaians|one in five Ghanaians/i);
  // Nothing the brief listed as overreach appears anywhere on the page.
  for (const overreach of [
    /you have chronic kidney disease/i,
    /CKD detected/i,
    /kidney age/i,
    /retest in 12 months/i,
    /rules out kidney disease/i,
  ]) {
    assert.doesNotMatch(page, overreach, String(overreach));
  }
  // Copy guardrails: nothing claims a test diagnoses or proves anything.
  for (const banned of [/\bwill reveal\b/i, /\bproves\b/i, /\bdiagnoses\b/i, /rules out everything/i]) {
    assert.doesNotMatch(page, banned, String(banned));
  }
});

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed === 0 ? 0 : 1);
