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
} from "../src/data/tools/heart-age.js";

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

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed === 0 ? 0 : 1);
