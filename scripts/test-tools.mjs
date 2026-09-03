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
  countQuestions,
  computeDiabetesFull,
  computeHeartFull,
  computeBmiFull,
  computeGenotypeFull,
} from "../src/data/tools/compose.js";
import { genotypeAdvice, FOLLOW_UP_NOTE } from "../src/data/tools/genotype-compatibility.js";
import { shareSpecFor, SHARE_HOST } from "../src/data/tools/share-card.js";
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

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed === 0 ? 0 : 1);
