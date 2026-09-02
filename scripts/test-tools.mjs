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

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed === 0 ? 0 : 1);
