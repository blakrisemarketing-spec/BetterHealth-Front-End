// Interactive tool 5: the Kidney Check.
//
// Pure data + maths. No JSX and no browser globals: src/data/seo.js imports
// this module on the Node side at build time.
//
// ========================== THE POINT OF THE TOOL ===========================
//
// Kidney disease is staged on TWO numbers, and most people only ever get one.
// eGFR comes from a blood test. ACR comes from a urine test. Damage often
// shows in the urine before eGFR falls, so a perfectly normal creatinine can
// sit alongside real kidney disease and the person is told they are fine.
//
// This is not a rhetorical flourish. It is the definition, it is the grid, and
// in Ghana specifically it is where most of the disease actually is:
//   - KDIGO 2024 Table 1 is headed "either of the following", and lists
//     albuminuria (ACR >=30 mg/g, >=3 mg/mmol) as a free-standing marker of
//     kidney damage, independent of the decreased-GFR row.
//   - The footnote to KDIGO 2024 Table 2 reads "In the absence of evidence of
//     kidney damage, neither G1 nor G2 fulfills the criteria for CKD", which
//     is a conditional: in the PRESENCE of damage, G1 and G2 do.
//   - On the KDIGO risk grid, G1A3 and G2A3 are high risk. An eGFR of 100 with
//     an ACR of 400 mg/g sits in a high-risk cell.
//   - RODAM, a random community sample of 2,524 Ghanaians: eGFR under 60 was
//     3.7% in both rural and urban Ghana, while albuminuria was 8.4% rural and
//     10.9% urban. Most CKD in that sample was albuminuric with a preserved
//     eGFR.
// The evidence brief's conclusion, which this tool is built around: if the
// product asks for one number, it should arguably be the ACR, not the
// creatinine.
//
// ============================ SOURCE OF THE NUMBERS ==========================
//
// Every threshold, coefficient and band below is cited to the section of the
// sourced evidence brief it came from, and every figure is on the page's own
// Sources list. Nothing here is written from general knowledge.
//
// A. THE eGFR EQUATIONS. Two are computed, deliberately, and the span between
//    them is what the page presents as the honest uncertainty (brief 1.6,
//    preferred option 1).
//
//    CKD-EPI 2021 creatinine, race-free, is the number the tool reports.
//      Inker LA, Eneanya ND, Coresh J, et al. New creatinine- and cystatin
//      C-based equations to estimate GFR without race. N Engl J Med
//      2021;385(19):1737-49. PMCID PMC8822996.
//    It is chosen not because it is the most accurate equation for Ghanaians
//    (the ARK data below says plainly that it is not) but because of KDIGO
//    2024 Practice Point 1.2.4.1: use the same equation within a geographical
//    region, so that one person does not get conflicting eGFR values from
//    different sources. A tool that computed a different equation from the lab
//    that issued the creatinine would manufacture exactly that conflict.
//
//    EKFC creatinine, with the Black African Q values, is computed alongside.
//      Pottel H, Bjork J, Courbebaisse M, et al. Development and validation of
//      a modified full age spectrum creatinine-based equation. Ann Intern Med
//      2021;174(2):183-91. PMID 33166224.
//      Q values: Delanaye P, Vidal-Petiot E, Bjork J, et al. Performance of
//      creatinine-based equations to estimate GFR in White and Black
//      populations in Europe, Brazil and Africa. Nephrol Dial Transplant
//      2023;38(1):106-18. PMID 36002032.
//    KDIGO 2024 names it in the implementation guidance for Recommendation
//    1.2.4.1: "within African countries, to use the EKFC equations using the
//    Q-values". That is a steer in "considerations for implementation", not a
//    graded recommendation, which is why it sits beside the headline number
//    rather than replacing it.
//
//    THE RACE COEFFICIENT IS NOT IMPLEMENTED, ANYWHERE. The 2009 CKD-EPI
//    equation carried a 1.159 multiplier for anyone self-identifying as Black.
//    The NKF-ASN Task Force recommended dropping it on 23 September 2021
//    (Delgado C, Baweja M, Crews DC, et al. Am J Kidney Dis 2022;79(2):
//    268-88), and KDIGO 2024 Practice Point 1.2.4.2 states outright: "Use of
//    race in the computation of eGFR should be avoided." Every African dataset
//    agrees it inflates eGFR and hides disease: in the Zingano 2023
//    meta-analysis of 1,834 Black adults outside the USA, P30 accuracy was
//    61.9% with the coefficient and 72.9% without it (P = .03).
//
// B. THE CAVEAT THAT SITS BESIDE EVERY eGFR. Not optional and not a footer.
//    ARK Consortium, the largest measured-GFR study in Africa: Fabian J,
//    Kalyesubula R, Mkandawire J, et al. Measurement of kidney function in
//    Malawi, South Africa, and Uganda. Lancet Glob Health 2022;10(8):e1159-69.
//    PMID 35839814. 2,578 adults analysed against iohexol plasma clearance.
//    No equation reached the P30 >= 75% adequacy threshold. CKD-EPI 2021 was
//    60% (58-62) overall, and accuracy collapsed exactly where the stakes are
//    highest: 88% at measured GFR >= 90, 25% (17-36) at 45-59, and 14% (5-27)
//    below 45, where relative bias reached 123%. No eGFR equation has been
//    validated against measured kidney function in Ghanaian adults at all.
//
// C. THE G STAGES. KDIGO 2024 Table 2. The bands are unchanged from KDIGO
//    2012, which is what the site's own article cites, so the numbers in that
//    article are still right and only the citation was stale.
//      KDIGO CKD Work Group. KDIGO 2024 Clinical Practice Guideline for the
//      Evaluation and Management of Chronic Kidney Disease. Kidney Int
//      2024;105(4S):S117-S314. PMID 38490803.
//
// D. THE A STAGES. KDIGO 2024 Table 3. Banded IN THE UNIT THE RESULT WAS
//    REPORTED IN, never converted first: KDIGO labels its own mg/mmol and mg/g
//    columns "approximately equivalent", and the exact conversion (mg/g x
//    0.113) puts 30 mg/g at 3.39 mg/mmol rather than 3.
//
// E. THE COMBINED GRID. KDIGO 2024, the colour figure on p. S126, with its
//    legend carried through verbatim, including the footnote that a green cell
//    means "if no other markers of kidney disease, no CKD".
//
// F. WHEN THE TOOL MUST STOP COMPUTING, and when it must stop selling. KDIGO
//    2024 Practice Point 1.1.3.2, Practice Point 5.1.1 and Figure 48, plus
//    Table 9 and Table 14. See EXCLUSIONS, UNRELIABLE_CONDITIONS and
//    URGENT_RULES below, each of which names its own line of the guideline.
//
// G. GHANA. Prevalence and attribution figures are quoted with the caveats the
//    brief attaches to them. In particular:
//      - The Ghana Renal Registry 2017 figure for hypertensive kidney disease
//        is 37.8% (260 of 687), NOT the 39.9% quoted in its own abstract and
//        widely repeated. Table 1 of that paper settles it.
//      - "Most kidney disease in Ghana is caused by high blood pressure and
//        diabetes" overstates what the data supports. "The most commonly
//        recorded causes" is what this tool says instead.
//      - No Ghanaian prevalence study applied the three-month persistence
//        criterion, so every published prevalence figure measures a single
//        day's result rather than confirmed CKD. Nothing on this page quotes a
//        national prevalence number as a fact about the reader.
//
// THREE RULES THAT HOLD WHATEVER ELSE CHANGES:
//   1. A single result is never a diagnosis. KDIGO 2024 Practice Point
//      1.1.3.2: "Do not assume chronicity based upon a single abnormal level
//      for eGFR and ACR, as the finding could be the result of a recent acute
//      kidney injury (AKI) event or acute kidney disease (AKD)." The counter-
//      weight is Practice Point 1.1.3.3: a first abnormal result is still a
//      reason to be seen, and sometimes a reason to start treatment. Not
//      nothing, just not a diagnosis.
//   2. An eGFR computed from a number somebody typed in is an estimate of an
//      estimate. It gets a range and a caveat, and never a decimal place.
//   3. Anything the guideline flags for prompt clinical attention says so
//      plainly, and the page stops selling.

// ---------------------------------------------------------------------------
// Provenance. The result screen and the tests both read this, so the page can
// never claim a settled figure while a provisional one is in place.
// ---------------------------------------------------------------------------

/** Which parts of this module are still waiting on the sourced brief. */
export const PROVISIONAL = {
  egfrEquation: false,
  gStages: false,
  aStages: false,
  grid: false,
  urgentThresholds: false,
  // The one interval any source supports is the annual kidney check for people
  // with diabetes (ADA/KDIGO 2022, carried into KDIGO 2024). For everyone else
  // KDIGO states outright that "there are no current evidence-based
  // recommendations regarding the frequency of screening in people at risk of
  // CKD", so the tool prints no interval rather than inventing one.
  screeningIntervals: false,
};

/** True once nothing above is provisional. */
export const KIDNEY_EVIDENCE_IS_FINAL = !Object.values(PROVISIONAL).some(Boolean);

// ---------------------------------------------------------------------------
// Unit conversion. Physical constants, and KDIGO's own stated factor.
// ---------------------------------------------------------------------------

/**
 * micromol/L per mg/dL of creatinine. Fixed by KDIGO's own conversion table
 * (brief 1.2): creatinine mg/dL x 88.4 = micromol/L.
 */
export const UMOL_PER_MGDL = 88.4;

/**
 * mg/g per mg/mmol of albumin:creatinine ratio, from KDIGO's exact factor
 * mg/g x 0.113 = mg/mmol. Used only to show a person the other unit, NEVER to
 * band a result: KDIGO labels its own two ACR columns "approximately
 * equivalent", and 30 mg/g is strictly 3.39 mg/mmol rather than 3, so banding
 * a converted value would move people across a line the guideline does not
 * move them across (brief 2.4).
 */
export const MGG_PER_MGMMOL = 1 / 0.113;

export const CREATININE_UNITS = [
  { value: "umol", label: "micromol/L", hint: "Most Ghanaian labs report this." },
  { value: "mgdl", label: "mg/dL", hint: "Some labs and most US reports use this." },
];

export const ACR_UNITS = [
  { value: "mgmmol", label: "mg/mmol", hint: "The usual unit on a Ghanaian or UK report." },
  { value: "mgg", label: "mg/g", hint: "Common on US reports." },
];

/** Creatinine in mg/dL, whichever unit it was typed in. Null when unusable. */
export function creatinineToMgdl(value, unit) {
  const n = Number(value);
  if (!(n > 0)) return null;
  return unit === "mgdl" ? n : n / UMOL_PER_MGDL;
}

/** Creatinine in micromol/L, whichever unit it was typed in. Null when unusable. */
export function creatinineToUmol(value, unit) {
  const n = Number(value);
  if (!(n > 0)) return null;
  return unit === "mgdl" ? n * UMOL_PER_MGDL : n;
}

// Zero albumin in the urine is a real, good result, unlike a zero creatinine,
// so an ACR of 0 has to survive where a blank has to not. Number("") is 0,
// which is exactly the trap.
const acrNumber = (value) => {
  if (value === null || value === undefined || String(value).trim() === "") return null;
  const n = Number(value);
  return n >= 0 ? n : null;
};

/** ACR in mg/g, for display only. Never fed to aStageFor. */
export function acrToMgg(value, unit) {
  const n = acrNumber(value);
  if (n === null) return null;
  return unit === "mgg" ? n : n * MGG_PER_MGMMOL;
}

/** ACR in mg/mmol, for display only. Never fed to aStageFor. */
export function acrToMgmmol(value, unit) {
  const n = acrNumber(value);
  if (n === null) return null;
  return unit === "mgg" ? n / MGG_PER_MGMMOL : n;
}

// ---------------------------------------------------------------------------
// The eGFR equations.
// ---------------------------------------------------------------------------

/**
 * CKD-EPI 2021 creatinine, race-free. Inker 2021, NEJM 385:1737-49.
 *
 * Written in the ratio form, which is the mg/dL form in the paper and is
 * mathematically identical to the four-branch SI form the National Kidney
 * Foundation prints in its laboratory implementation guidance (Table S3). The
 * ratio form is used here because it is continuous at the knee: the SI table
 * rounds its branch point to 61.9 and 79.6 while using 61.88 and 79.56 inside
 * the equation, which leaves a hairline discontinuity the ratio form does not.
 *
 * kappa is 0.7 mg/dL female and 0.9 mg/dL male, which is 61.88 and 79.56
 * micromol/L exactly at 88.4 per mg/dL.
 *
 * Derived and validated in adults 18 and over (KDIGO 2024, Table 14). Output
 * is mL/min/1.73m2, already body-surface-area indexed.
 */
export const CKD_EPI_2021 = {
  id: "ckd-epi-2021",
  name: "CKD-EPI 2021 creatinine",
  constant: 142,
  ageBase: 0.9938,
  upperExponent: -1.2,
  bySex: {
    female: { kappa: 0.7, alpha: -0.241, sexFactor: 1.012 },
    male: { kappa: 0.9, alpha: -0.302, sexFactor: 1 },
  },
  citation: "Inker LA, et al. N Engl J Med 2021;385(19):1737-49.",
};

/**
 * EKFC creatinine with the Black African Q values. Pottel 2021, Ann Intern Med
 * 174:183-91; Q values from Delanaye 2023, Nephrol Dial Transplant 38:106-18.
 *
 * Q is the median normal serum creatinine of the population, and it is the
 * only thing that changes between populations. The Q values used here are the
 * PUBLISHED mg/dL figures, applied to a creatinine converted to mg/dL, rather
 * than a conversion of Q into micromol/L. The ratio SCr/Q is identical either
 * way, and this way every number in the table is one that was published rather
 * than one derived here.
 *
 * PROVENANCE THAT MATTERS: these Q values come from 470 healthy individuals in
 * the Democratic Republic of the Congo plus a Cote d'Ivoire cohort. Not Ghana.
 */
export const EKFC = {
  id: "ekfc-african-q",
  name: "EKFC with the Black African reference values",
  constant: 107.3,
  lowerExponent: -0.322,
  upperExponent: -1.132,
  ageBase: 0.99,
  ageBaseFrom: 40,
  // mg/dL. Delanaye 2023, the Black Africans row.
  q: { male: 0.96, female: 0.72 },
  citation:
    "Pottel H, et al. Ann Intern Med 2021;174(2):183-91; Delanaye P, et al. Nephrol Dial Transplant 2023;38(1):106-18.",
};

/** The youngest age either equation was derived for. KDIGO 2024, Table 14. */
export const MIN_EGFR_AGE = 18;

const sexKey = (sex) => (sex === "female" ? "female" : "male");

/** CKD-EPI 2021 from a creatinine in mg/dL. Null when the inputs are unusable. */
export function ckdEpiFrom({ creatinineMgdl, age, sex }) {
  const scr = Number(creatinineMgdl);
  const years = Number(age);
  if (!(scr > 0) || !(years >= MIN_EGFR_AGE)) return null;
  const s = CKD_EPI_2021.bySex[sexKey(sex)];
  const ratio = scr / s.kappa;
  return (
    CKD_EPI_2021.constant *
    Math.min(ratio, 1) ** s.alpha *
    Math.max(ratio, 1) ** CKD_EPI_2021.upperExponent *
    CKD_EPI_2021.ageBase ** years *
    s.sexFactor
  );
}

/** EKFC with the African Q, from a creatinine in mg/dL. Null when unusable. */
export function ekfcFrom({ creatinineMgdl, age, sex }) {
  const scr = Number(creatinineMgdl);
  const years = Number(age);
  if (!(scr > 0) || !(years >= MIN_EGFR_AGE)) return null;
  const ratio = scr / EKFC.q[sexKey(sex)];
  const exponent = ratio < 1 ? EKFC.lowerExponent : EKFC.upperExponent;
  const ageFactor = years > EKFC.ageBaseFrom ? EKFC.ageBase ** (years - EKFC.ageBaseFrom) : 1;
  return EKFC.constant * ratio ** exponent * ageFactor;
}

/**
 * Both equations, and the span between them.
 *
 * `reported` is the CKD-EPI 2021 figure, which is the one the tool reports
 * (brief 1.6). `low` and `high` bracket the two estimates, and they are what
 * the result screen leads with, because a single figure claims a precision no
 * study in an African population supports. Both are integers: brief 5.2 says
 * never display a decimal place.
 */
export function egfrFrom({ creatinineMgdl, age, sex }) {
  const ckdEpi = ckdEpiFrom({ creatinineMgdl, age, sex });
  const ekfc = ekfcFrom({ creatinineMgdl, age, sex });
  if (ckdEpi === null) return null;
  const reported = Math.round(ckdEpi);
  const alternative = ekfc === null ? null : Math.round(ekfc);
  const values = alternative === null ? [reported] : [reported, alternative];
  return {
    reported,
    ckdEpi: reported,
    ekfc: alternative,
    low: Math.min(...values),
    high: Math.max(...values),
    // True when the two published equations do not even agree on the band,
    // which is the most honest thing this page can show someone.
    equationsDisagree: alternative !== null && gStageFor(reported)?.id !== gStageFor(alternative)?.id,
  };
}

/**
 * The caveat that has to sit next to every eGFR the tool prints, adjacent to
 * the figure and never buried in a footer (brief 1.7).
 */
export const EGFR_CAVEAT =
  "No eGFR equation has been validated against measured kidney function in Ghanaian adults. In the largest study that measured true kidney function in African populations, 2,578 adults in Malawi, South Africa and Uganda, no equation including this one got within 30% of the true value for even three-quarters of people. Treat this as a prompt to get tested properly, not as a measurement.";

/**
 * Below 60 the caveat gets stronger, because that is precisely the range where
 * the ARK study found accuracy of 14% to 25% (brief 1.7, 5.2).
 */
export const EGFR_CAVEAT_LOW =
  "Below 60 that caveat gets stronger rather than weaker. In the same study, accuracy in this range was 25% at a measured rate of 45 to 59 and 14% below 45, where the estimate ran on average more than double the true value. So this figure is at once the most worrying and the least trustworthy the page can produce. It is a reason to be seen, not a measurement to act on.";

/** The eGFR below which EGFR_CAVEAT_LOW applies. KDIGO 2024 Table 2, G3a. */
export const EGFR_LOW_THRESHOLD = 60;

// ---------------------------------------------------------------------------
// The G stages. KDIGO 2024, Table 2. Unchanged from KDIGO 2012.
// ---------------------------------------------------------------------------

export const G_STAGES = [
  {
    id: "G1",
    label: "G1",
    min: 90,
    max: Infinity,
    name: "Normal or high",
    meaning:
      "Filtering is not reduced. That is not a finding of kidney disease, and it is not a clean bill either. KDIGO's own footnote is that in the absence of evidence of kidney damage, neither G1 nor G2 meets the criteria for chronic kidney disease, and damage is what a urine test looks for.",
  },
  {
    id: "G2",
    label: "G2",
    min: 60,
    max: 89.999,
    name: "Mildly decreased",
    meaning:
      "Mildly decreased, and KDIGO means relative to a young adult rather than relative to a healthy person your age. Like G1, this band does not meet the criteria for chronic kidney disease unless there is evidence of kidney damage alongside it.",
  },
  {
    id: "G3a",
    label: "G3a",
    min: 45,
    max: 59.999,
    name: "Mildly to moderately decreased",
    meaning:
      "From here down, a filtering rate this low meets the criteria for chronic kidney disease on its own, if it persists. One result cannot show whether it does.",
  },
  {
    id: "G3b",
    label: "G3b",
    min: 30,
    max: 44.999,
    name: "Moderately to severely decreased",
    meaning:
      "A persistently reduced filtering rate in this band meets the criteria for chronic kidney disease, and it is the range where a clinician looks hardest for a cause.",
  },
  {
    id: "G4",
    label: "G4",
    min: 15,
    max: 29.999,
    name: "Severely decreased",
    meaning: "KDIGO lists an eGFR below 30 as a reason for referral to specialist kidney care in its own right.",
  },
  {
    id: "G5",
    label: "G5",
    min: 0,
    max: 14.999,
    name: "Kidney failure",
    meaning: "KDIGO's own term for this band is kidney failure, and it needs specialist care.",
  },
];

/** The G stage an eGFR falls in, or null when there is no eGFR. */
export function gStageFor(egfr) {
  if (egfr === null || egfr === undefined || Number.isNaN(Number(egfr))) return null;
  const n = Number(egfr);
  return G_STAGES.find((s) => n >= s.min && n <= s.max) || null;
}

/**
 * KDIGO 2024's footnote to Table 2, carried into the copy because dropping it
 * turns an ordinary eGFR into a disease finding.
 */
export const G1_G2_FOOTNOTE =
  "In the absence of evidence of kidney damage, neither G1 nor G2 fulfills the criteria for chronic kidney disease.";

// ---------------------------------------------------------------------------
// The A stages. KDIGO 2024, Table 3.
//
// Banded in the unit the result was reported in. KDIGO prints its mg/mmol and
// mg/g columns as "approximately equivalent", so converting first and banding
// second would move people across a line the guideline does not move them
// across.
//
// KDIGO's printed boundaries are half-open in an ambiguous way: A2 reads
// "30-300" and A3 reads ">300". The convention taken here is the one a figure
// reproduced from the ADA/KDIGO consensus report inside the same guideline
// uses, A2 = 30 to 299 and A3 = 300 or above, applied consistently in both
// units. A value landing exactly on the line is a clinician's call, and the
// result screen says so.
// ---------------------------------------------------------------------------

export const A_STAGES = [
  {
    id: "A1",
    label: "A1",
    name: "Normal to mildly increased",
    bands: { mgmmol: { min: 0, below: 3 }, mgg: { min: 0, below: 30 } },
    meaning:
      "Below the level KDIGO counts as a marker of kidney damage. Albuminuria is one of the two things that define chronic kidney disease, and this result is not it.",
  },
  {
    id: "A2",
    label: "A2",
    name: "Moderately increased",
    bands: { mgmmol: { min: 3, below: 30 }, mgg: { min: 30, below: 300 } },
    meaning:
      "At or above 3 mg/mmol, which is 30 mg/g, albuminuria is a marker of kidney damage in KDIGO's definition. Persisting beyond three months, that is chronic kidney disease even where the eGFR is entirely normal. Moderately increased is measured against a young adult, not against nothing.",
  },
  {
    id: "A3",
    label: "A3",
    name: "Severely increased",
    bands: { mgmmol: { min: 30, below: Infinity }, mgg: { min: 300, below: Infinity } },
    meaning:
      "KDIGO lists a consistent ACR at or above 300 mg/g, which is 30 mg/mmol, as a reason for referral to specialist kidney care, and above 700 mg/g, which is 70 mg/mmol, as a referral criterion in its own right.",
  },
];

export const A_BOUNDARY_NOTE =
  "KDIGO prints its two unit columns as approximately equivalent rather than exact, which is why this is read in the unit your report used rather than converted first. A result sitting exactly on a boundary is a clinician's call rather than a calculator's.";

/**
 * The A stage for a result, in the unit it was reported in.
 *
 * @param {number} value as printed on the report
 * @param {"mgmmol"|"mgg"} unit as printed on the report
 */
export function aStageFor(value, unit) {
  const n = acrNumber(value);
  if (n === null) return null;
  const key = unit === "mgg" ? "mgg" : "mgmmol";
  return A_STAGES.find((s) => n >= s.bands[key].min && n < s.bands[key].below) || null;
}

// ---------------------------------------------------------------------------
// The combined grid. KDIGO 2024, the colour figure on p. S126.
//
// Legend, verbatim: "Green: low risk (if no other markers of kidney disease,
// no CKD); Yellow: moderately increased risk; Orange: high risk; Red: very
// high risk."
// ---------------------------------------------------------------------------

export const GRID_CATEGORIES = [
  {
    id: "low",
    label: "Low risk",
    meaning:
      "KDIGO's own legend attaches a condition to this cell that has to travel with it: low risk, and if there are no other markers of kidney disease, not chronic kidney disease at all.",
  },
  {
    id: "moderate",
    label: "Moderately increased risk",
    meaning: "One of the two numbers is outside the range KDIGO treats as unremarkable.",
  },
  {
    id: "high",
    label: "High risk",
    meaning:
      "This combination sits in KDIGO's high-risk band, whichever of the two numbers got it there.",
  },
  {
    id: "veryHigh",
    label: "Very high risk",
    meaning: "The highest of KDIGO's four bands.",
  },
];

export const GRID = {
  G1: { A1: "low", A2: "moderate", A3: "high" },
  G2: { A1: "low", A2: "moderate", A3: "high" },
  G3a: { A1: "moderate", A2: "high", A3: "veryHigh" },
  G3b: { A1: "high", A2: "veryHigh", A3: "veryHigh" },
  G4: { A1: "veryHigh", A2: "veryHigh", A3: "veryHigh" },
  G5: { A1: "veryHigh", A2: "veryHigh", A3: "veryHigh" },
};

/**
 * Suggested tests per year, from the same grid in KDIGO 2024 Figure 13.
 *
 * Carried because it answers "when do I check again", and labelled on the page
 * for what it is: guidance for people already in care, not a screening
 * interval for the general public.
 */
export const GRID_MONITORING = {
  G1: { A1: "1", A2: "1", A3: "3" },
  G2: { A1: "1", A2: "1", A3: "3" },
  G3a: { A1: "1", A2: "2", A3: "3" },
  G3b: { A1: "2", A2: "3", A3: "3" },
  G4: { A1: "3", A2: "3", A3: "4 or more" },
  G5: { A1: "4 or more", A2: "4 or more", A3: "4 or more" },
};

/** The grid cell for a (G, A) pair, or null when either half is missing. */
export function gridCellFor(gId, aId) {
  if (!gId || !aId) return null;
  const categoryId = GRID?.[gId]?.[aId];
  if (!categoryId) return null;
  const category = GRID_CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return null;
  return { ...category, testsPerYear: GRID_MONITORING[gId][aId] };
}

// ---------------------------------------------------------------------------
// When the tool must not compute at all.
//
// Each of these is a hard stop rather than a caveat, and each names the line
// of the guideline or the paper it comes from.
// ---------------------------------------------------------------------------

export const EXCLUSIONS = [
  {
    id: "under18",
    headline: "This calculator is for adults, and the equations behind it were not built for you.",
    body:
      "Both equations it uses were derived and validated in adults of 18 and over, and KDIGO sends estimation in children to different equations entirely, with a different threshold for flagging a low result. Running an adult formula on your number without telling you would be worse than running nothing. Take any report you have to a doctor, who can read it against paediatric references.",
    source: "KDIGO 2024, Table 14 and Practice Point 1.2.4.3",
  },
  {
    id: "pregnant",
    headline: "Kidney numbers read differently in pregnancy, so this page will not compute one.",
    body:
      "Pregnancy raises the filtering rate on purpose, which pushes creatinine down, so an eGFR equation reads wrong in both directions and no guideline supplies one for pregnancy. Protein in the urine in the second half of pregnancy is also something antenatal care reads alongside blood pressure rather than on its own. Take any result you have to your antenatal appointment.",
    source: "Ahn K, et al. Sci Rep 2024;14:7229; KDIGO scope",
  },
  {
    id: "nephrology",
    headline: "A kidney specialist already has more than this page can give you.",
    body:
      "Someone under nephrology care has results over time, a known cause and a plan, and possibly a measured rather than an estimated filtering rate. A one-off estimate from a page that may not even use the same equation as their clinic can only muddy that, which is the exact confusion KDIGO's guidance on using one equation per region is written to prevent. Everything else on this page is still yours to read. The calculator is the part to skip.",
    source: "KDIGO 2024, Practice Point 1.2.4.1",
  },
];

export const exclusionById = (id) => EXCLUSIONS.find((e) => e.id === id) || null;

/** The first hard stop that applies, or null. */
export function exclusionFor(values = {}) {
  const age = Number(values.age);
  if (age > 0 && age < MIN_EGFR_AGE) return exclusionById("under18");
  if (values.pregnant === "yes") return exclusionById("pregnant");
  if (values.nephrologyCare === "yes") return exclusionById("nephrology");
  return null;
}

/**
 * Conditions in which KDIGO states an eGFR from creatinine is less accurate
 * (KDIGO 2024, Table 9). Ticking any of these suppresses the number rather
 * than printing one beside a warning nobody reads.
 */
export const UNRELIABLE_CONDITIONS = [
  { id: "muscleLow", label: "Very little muscle: an amputation above the knee, or paralysis", short: "low muscle" },
  { id: "muscleHigh", label: "A lot of muscle: bodybuilding or heavy training", short: "high muscle" },
  { id: "creatine", label: "Creatine supplements", short: "creatine" },
  { id: "diet", label: "A low-protein, high-protein, keto or vegetarian diet", short: "diet" },
  { id: "malnutrition", label: "Malnutrition or an eating disorder", short: "malnutrition" },
  { id: "obesity", label: "Class III obesity", short: "class III obesity" },
  { id: "illness", label: "Cancer, heart failure or cirrhosis", short: "serious illness" },
];

export const UNRELIABLE_NOTE =
  "For malnutrition, heart failure and cirrhosis, KDIGO's own advice is that even a laboratory eGFR is not adequate for treatment decisions and that filtering should be measured directly. A page like this one is further from that, not closer.";

/** Which of the reliability conditions were ticked. */
export const unreliableFor = (values = {}) =>
  (Array.isArray(values.egfrReliability) ? values.egfrReliability : [])
    .map((id) => UNRELIABLE_CONDITIONS.find((c) => c.id === id))
    .filter(Boolean);

// ---------------------------------------------------------------------------
// Part 1: who should have their kidneys checked.
//
// A guideline RISK-FACTOR LIST, not a score. Nothing here adds points and
// nothing here produces a percentage: section 3 of the evidence brief, on
// whether any no-laboratory kidney risk score is validated for this
// population, was still pending when this shipped, so the tool reflects the
// risk-factor list rather than pretending to a score.
// ---------------------------------------------------------------------------

/**
 * The risk factors, from KDIGO 2024 Table 5, "Risk factors for CKD", with the
 * two local additions KDIGO's own note invites ("This list is not exhaustive
 * and may be modified by local epidemiological considerations").
 *
 * `tier: "priority"` marks the three conditions KDIGO names as the highest
 * priority for detection (p. S170): "The highest priority conditions for CKD
 * detection are hypertension, diabetes, and CVD, including heart failure."
 *
 * THREE THINGS THAT ARE NOT ON THIS LIST, and the reason each is absent.
 * Obesity, hepatitis and NSAID use are all commonly assumed into Table 5 and
 * none of them is in it. Obesity appears in the ISN-KDIGO screening booklet
 * rather than the guideline; hepatitis appears nowhere in Table 5, though HIV
 * does; and nephrotoxic drugs appear only as the broad "drug-induced
 * nephrotoxicity". Long-term herbal medicine is here on Ghanaian evidence
 * rather than on Table 5, and it says so.
 *
 * The wording of the Ghana attribution matters and is the brief's own
 * editorial judgement: "most kidney disease in Ghana is caused by high blood
 * pressure and diabetes" overstates a registry that recorded 29% of causes as
 * uncertain, while "the most commonly recorded causes" is defensible.
 */
export const RISK_FACTORS = [
  {
    id: "diabetes",
    label: "Diabetes",
    short: "diabetes",
    tier: "priority",
    why: "One of the three conditions KDIGO names as the highest priority for kidney testing. Diabetic nephropathy was recorded as the cause for 63 of the 687 people on Ghana's renal registry in 2017, and diabetes is the one of the three commonly named Ghanaian causes whose share has a usable confidence interval: 19%, 95% CI 13 to 25.",
    source: "KDIGO 2024 Table 5; Ghana Renal Registry 2017; Afrifa 2026",
  },
  {
    id: "hypertension",
    label: "High blood pressure",
    short: "high BP",
    tier: "priority",
    why: "Another of KDIGO's three highest-priority conditions, and the most commonly recorded cause on Ghana's renal registry, for 260 of 687 people, 37.8%. Around one in three Ghanaian adults has high blood pressure and most have never been told, because it rarely causes a symptom until something goes wrong.",
    source: "KDIGO 2024 Table 5; Ghana Renal Registry 2017; high-blood-pressure-silent-killer",
  },
  {
    id: "cardiovascular",
    label: "Heart disease, a stroke, or heart failure",
    short: "heart disease",
    tier: "priority",
    why: "The third of KDIGO's highest-priority conditions for kidney testing, heart failure included. The small blood vessels damaged in one organ are the same kind damaged in the other.",
    source: "KDIGO 2024 Table 5",
  },
  {
    id: "familyKidney",
    label: "Kidney disease in the family",
    short: "family history",
    tier: "listed",
    why: "KDIGO lists kidney failure in the family, whatever its cause, as a risk factor in its own right, alongside inherited kidney conditions.",
    source: "KDIGO 2024 Table 5; creatinine-egfr-kidney-function",
  },
  {
    id: "ancestry",
    label: "West African ancestry",
    short: "ancestry",
    tier: "listed",
    why: "KDIGO lists areas with a high prevalence of APOL1 genetic variants as a risk factor. Among 8,355 West Africans across 13 sites, two of them in Ghana, 29.7% carried two of those variants and 43.0% carried one; two raised the odds of chronic kidney disease by 1.25 (95% CI 1.11 to 1.40) and one by 1.18 (1.04 to 1.33). Modest effects on a very common exposure, and a reason to test rather than a reason to seek genetic testing.",
    source: "KDIGO 2024 Table 5; Gbadegesin 2025 NEJM",
  },
  {
    id: "glomerulonephritis",
    label: "A past kidney inflammation or nephritis",
    short: "nephritis",
    tier: "listed",
    why: "Ghana's own Standard Treatment Guidelines name a past history of glomerulonephritis, alongside hypertension and diabetes, as a reason to screen. It is far more prominent here than in high-income patterns: the leading cause at 33% in a pooled analysis of Ghanaian studies, and 210 of 1,426 people, 20.8%, in the largest single-centre series.",
    source: "Ghana STG 2017 Section 137; Afrifa 2026; Okyere 2020",
  },
  {
    id: "herbal",
    label: "Herbal or local medicines taken regularly",
    short: "herbal medicine",
    tier: "listed",
    why: "Not on KDIGO's list, and on this one because of Ghanaian evidence: among 2,781 Ghanaian patients with hypertension or diabetes, herbal medication use was independently associated with chronic kidney disease, adjusted odds ratio 1.39 (95% CI 1.10 to 1.75). Ghana's Standard Treatment Guidelines open their kidney advice with avoiding nephrotoxins, naming NSAIDs and herbal medication.",
    source: "Tannor 2019; Ghana STG 2017",
  },
  {
    id: "aki",
    label: "A past episode of sudden kidney injury",
    short: "past AKI",
    tier: "listed",
    why: "KDIGO lists prior acute kidney injury as a risk factor, and names people with recent or repeated episodes as a detection priority second only to the three conditions above.",
    source: "KDIGO 2024 Table 5, p. S170",
  },
  {
    id: "hiv",
    label: "HIV",
    short: "HIV",
    tier: "listed",
    why: "KDIGO lists HIV among the multisystem conditions that carry kidney risk. It was recorded as the cause of kidney failure for 26 of the 687 people on Ghana's renal registry, 4%.",
    source: "KDIGO 2024 Table 5; Ghana Renal Registry 2017",
  },
  {
    id: "autoimmune",
    label: "Lupus or another autoimmune condition",
    short: "autoimmune",
    tier: "listed",
    why: "KDIGO lists systemic lupus erythematosus and vasculitis among the multisystem and chronic inflammatory conditions that carry kidney risk.",
    source: "KDIGO 2024 Table 5",
  },
  {
    id: "obstruction",
    label: "Repeated kidney stones, or trouble passing urine",
    short: "stones or obstruction",
    tier: "listed",
    why: "KDIGO lists structural urinary tract disease and recurrent kidney stones. Obstruction and reflux were recorded as the cause for 7 of the 687 people on Ghana's renal registry.",
    source: "KDIGO 2024 Table 5; Ghana Renal Registry 2017",
  },
  {
    id: "cystic",
    label: "Polycystic kidney disease in the family",
    short: "polycystic",
    tier: "listed",
    why: "KDIGO lists inherited kidney conditions, polycystic kidney disease among them. It was recorded as the cause for 5 of the 687 people on the registry, and for 42 of 1,426 at Komfo Anokye, 4.2%.",
    source: "KDIGO 2024 Table 5; Ghana Renal Registry 2017; Okyere 2020",
  },
  {
    id: "pregnancyHistory",
    label: "A pregnancy with pre-eclampsia, or a baby born early or very small",
    femaleOnly: true,
    short: "pregnancy history",
    tier: "listed",
    why: "KDIGO lists pre-eclampsia and eclampsia, preterm birth and small size for gestational age among the gestational conditions that carry later kidney risk.",
    source: "KDIGO 2024 Table 5",
  },
  {
    id: "occupational",
    label: "Work with lead, mercury, cadmium or pesticides",
    short: "occupational exposure",
    tier: "listed",
    why: "KDIGO lists occupational exposure to cadmium, lead and mercury, to polycyclic hydrocarbons and to pesticides as a risk factor in its own right.",
    source: "KDIGO 2024 Table 5",
  },
];

/**
 * The one screening interval any source supports.
 *
 * KDIGO 2024, p. S169, verbatim: "There are no current evidence-based
 * recommendations regarding the frequency of screening in people at risk of
 * CKD." Its one exception is diabetes, through the ADA/KDIGO consensus report.
 * So the tool prints an interval for diabetes and for nobody else, and says
 * why rather than going quiet.
 */
export const DIABETES_INTERVAL = {
  text: "Once a year, and for type 2 diabetes that starts at diagnosis rather than some years later, because kidney damage is often already there by then. For type 1 it starts five years after diagnosis.",
  source: "ADA/KDIGO consensus report 2022, carried into KDIGO 2024",
};

export const NO_INTERVAL_NOTE =
  "How often to re-check is a question for whoever manages the condition that put you on this list. KDIGO says outright that there are no evidence-based recommendations on how often to screen people at risk, so a page that told you to come back in twelve months would be asserting something the guideline withholds.";

/**
 * The counterweight, for anyone the list does not name. The US Preventive
 * Services Task Force graded routine screening of asymptomatic adults I,
 * insufficient evidence, in 2012, and the topic is still open. Its scope
 * explicitly excluded testing people with diabetes or hypertension, so it does
 * not contradict KDIGO's risk-based case-finding: it applies to exactly the
 * group with no risk factors, which is this one.
 */
export const NO_RISK_FACTORS_NOTE =
  "The US Preventive Services Task Force looked at routine kidney screening for adults with no symptoms and graded the evidence insufficient either way, a position it has not revised. Its review deliberately left out people being monitored for diabetes or high blood pressure, so it is about this group and not about them.";

/**
 * KDIGO's own detection practice point, which is the tool's spine in one line.
 * A creatinine-only check is not implementing it.
 */
export const BOTH_TESTS_PRACTICE_POINT =
  "Test people at risk for and with chronic kidney disease (CKD) using both urine albumin measurement and assessment of glomerular filtration rate (GFR).";

/** Ghana's own guidance, which says the same thing in local words. */
export const GHANA_STG_QUOTE =
  "The early stage of CKD is usually asymptomatic but can be detected through laboratory tests of serum creatinine and estimation of Glomerular Filtration Rate (eGFR), measurement of urine albumin creatinine ratio and screening of individuals at increased risk such as those with hypertension, diabetes mellitus or a past history of glomerulonephritis.";

/**
 * Why this tool counts risk factors instead of scoring them.
 *
 * No no-laboratory kidney risk score has been developed or validated in
 * Ghanaian adults, in West Africa outside HIV clinics, or in any Black African
 * general population.
 */
export const NO_SCORE_NOTE =
  "This is a list of risk factors, counted, and not a score. No questionnaire-only kidney risk score has been validated in Ghanaian adults or in any Black African general population, and every model tested on African data has come out miscalibrated, the worst of them by 93%. A systematic review of such models across low- and middle-income countries found no strong evidence to support using any of them. Even the risk factors themselves separate people only weakly here: tested on a cohort including 1,417 Ghanaian women and 896 Ghanaian men, KDIGO's own criteria reached an area under the curve of 0.64 in women and 0.75 in men. A checklist that says which of these apply to you is honest. A number built on the same answers would hide that weakness behind a decimal point.";

export const riskFactorById = (id) => RISK_FACTORS.find((f) => f.id === id) || null;

/**
 * The factors offered as a multi-select. Diabetes, blood pressure and family
 * history get their own screens, because each needs an "I don't know" that a
 * tick box cannot express.
 */
export const RISK_FACTOR_PICKS = RISK_FACTORS.filter(
  (f) => !["diabetes", "hypertension", "familyKidney"].includes(f.id),
);

/** The tick list for one person: KDIGO's gestational row only for women. */
export const riskFactorOptions = (values = {}) =>
  RISK_FACTOR_PICKS.filter((f) => !f.femaleOnly || values.sex === "female").map((f) => ({
    value: f.id,
    label: f.label,
  }));

/**
 * Signs the site's own vetted article lists, with the caveat it prints beside
 * them: early kidney function loss usually causes no symptoms at all.
 *
 * `redFlag` marks visible blood in the urine, which KDIGO lists as a reason
 * for referral in its own right and which has to be reachable without the
 * person having any lab result (brief 5.7).
 */
export const SIGNS = [
  { id: "swelling", short: "swelling", label: "Swelling in the ankles, feet or around the eyes" },
  { id: "foamy", short: "foamy urine", label: "Foamy urine" },
  { id: "nightUrine", short: "night urine", label: "Urinating more at night" },
  { id: "itching", short: "itching or nausea", label: "Persistent itching, nausea or loss of appetite" },
  { id: "bpHarder", short: "BP harder to control", label: "Blood pressure getting harder to control" },
  { id: "blood", short: "blood in urine", label: "Blood in the urine", redFlag: true },
];

export const signById = (id) => SIGNS.find((s) => s.id === id) || null;

/**
 * Things that raise acute kidney injury rather than chronic disease. KDIGO
 * 2024 Practice Point 1.1.3.2 in operational form: a chronic-staging tool will
 * actively mislabel these, and they are a same-week problem, so they escalate
 * whether or not the person has a lab result at all.
 */
export const ACUTE_SIGNS = [
  { id: "lessUrine", short: "much less urine", label: "Much less urine than usual" },
  { id: "vomiting", short: "vomiting or diarrhoea", label: "Vomiting, or severe diarrhoea" },
  { id: "nsaids", short: "painkillers", label: "Several days of anti-inflammatory painkillers" },
  { id: "herbal", short: "herbal remedy", label: "A herbal or local remedy taken for several days" },
  { id: "contrast", short: "contrast scan", label: "A scan with contrast dye" },
];

export const acuteById = (id) => ACUTE_SIGNS.find((s) => s.id === id) || null;

// ---------------------------------------------------------------------------
// When the honest output is "see a clinician promptly" rather than a number.
//
// KDIGO 2024 Practice Point 5.1.1 and Figure 48, the circumstances for
// referral to specialist kidney care, plus Practice Point 1.1.3.2 for the
// acute branch. Every rule names its own criterion.
//
// Order matters: the two rules that fire without any lab result come first, so
// somebody with visible blood in the urine and no creatinine still reaches the
// escalation (brief 5.7, "the escalation paths should be reachable without the
// user having a lab result at all").
// ---------------------------------------------------------------------------

/** KDIGO referral: a consistent ACR at or above this, in the reported unit. */
export const ACR_REFERRAL = { mgmmol: 30, mgg: 300 };
/** KDIGO referral criterion in its own right, in the reported unit. */
export const ACR_REFERRAL_HIGH = { mgmmol: 70, mgg: 700 };
/** KDIGO referral: an eGFR below this. */
export const EGFR_REFERRAL = 30;

export const URGENT_RULES = [
  {
    id: "acute",
    applies: (numbers, values) => (Array.isArray(values.acute) ? values.acute : []).length > 0,
    headline: "What you described is a this-week question, and it is not a staging one.",
    body:
      "Much less urine than usual, vomiting or severe diarrhoea, several days of anti-inflammatory painkillers or a herbal remedy, or a scan with contrast dye all raise sudden kidney injury rather than the slow kind this page is about. KDIGO's guidance is explicit that a single abnormal result must not be read as long-standing, because it may be a recent injury instead. Please see a clinician in the next few days rather than working from anything here.",
    source: "KDIGO 2024, Practice Point 1.1.3.2 and Figure 48",
  },
  {
    id: "haematuria",
    applies: (numbers, values) => (Array.isArray(values.signs) ? values.signs : []).includes("blood"),
    headline: "Blood you can see in the urine is a reason to be seen, whatever any number says.",
    body:
      "KDIGO lists visible blood in the urine as a circumstance for referral to specialist kidney care on its own. It can point to inflammation in the kidney's filters or to something in the urinary tract, and neither is a thing a calculator has any business scoring. This one does not wait for a test result.",
    source: "KDIGO 2024, Figure 48",
  },
  {
    id: "acrVeryHigh",
    applies: (numbers) => numbers.acrOverReferralHigh,
    headline: "That albumin result is above the level KDIGO names as a referral criterion in its own right.",
    body:
      "An albumin:creatinine ratio above 700 mg/g, which is above 70 mg/mmol, is listed by KDIGO as a reason for referral to specialist kidney care. One result is still not a diagnosis and a repeat is still what confirms it, but this is a number to take to a doctor rather than to sit on.",
    source: "KDIGO 2024, Figure 48",
  },
  {
    id: "egfrLow",
    applies: (numbers) => numbers.egfr !== null && numbers.egfr.reported < EGFR_REFERRAL,
    headline: "An eGFR under 30 is a referral circumstance, and it is where this estimate is least trustworthy.",
    body:
      "KDIGO lists an eGFR below 30 as a reason for referral to specialist kidney care in its own right. It is also the range where the largest African study found these equations at their worst: 14% accuracy below a measured rate of 45, running on average more than double the true value. So the figure is at once alarming and unreliable, which is a reason to have filtering measured properly rather than to dwell on the number here.",
    source: "KDIGO 2024, Figure 48; Fabian 2022 Lancet Glob Health",
  },
  {
    id: "acrHigh",
    applies: (numbers) => numbers.a?.id === "A3",
    headline: "A consistent albumin result in the A3 band is a KDIGO referral criterion.",
    body:
      "An albumin:creatinine ratio at or above 300 mg/g, which is 30 mg/mmol, is listed by KDIGO as a circumstance for referral when it is a consistent finding, and more so alongside blood in the urine. A repeat test is what shows whether it is consistent, and that is a conversation with a clinician rather than a purchase.",
    source: "KDIGO 2024, Figure 48",
  },
];

/** The first urgent rule that fires, or null. */
export function urgentFor(numbers, values) {
  for (const rule of URGENT_RULES) {
    if (rule.applies(numbers, values)) return rule;
  }
  return null;
}

// ---------------------------------------------------------------------------
// The questions.
// ---------------------------------------------------------------------------

export const SEX_OPTIONS = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
];

export const PREGNANT_OPTIONS = [
  { value: "no", label: "No" },
  { value: "yes", label: "Yes, or I might be" },
];

export const NEPHROLOGY_OPTIONS = [
  { value: "no", label: "No" },
  { value: "yes", label: "Yes" },
];

export const DIABETES_OPTIONS = [
  { value: "no", label: "No" },
  { value: "yes", label: "Yes, diagnosed" },
  { value: "prediabetes", label: "Prediabetes or borderline" },
  { value: "unsure", label: "I'm not sure" },
];

export const BP_OPTIONS = [
  { value: "no", label: "No" },
  { value: "treated", label: "Yes, on medication" },
  { value: "untreated", label: "Yes, not on medication" },
  { value: "unsure", label: "I don't know my blood pressure" },
];

export const FAMILY_OPTIONS = [
  { value: "no", label: "No" },
  { value: "yes", label: "Yes" },
  { value: "unsure", label: "Not sure" },
];

export const HAVE_NUMBERS_OPTIONS = [
  { value: "yes", label: "Yes, I have a report", hint: "A lab result you can read a number off" },
  { value: "no", label: "No, not yet", hint: "Which is the usual answer, and not a problem" },
];

export const WHICH_NUMBERS_OPTIONS = [
  {
    value: "creatinine",
    label: "A blood creatinine result",
    hint: "On a renal function test or a kidney panel, often printed next to an eGFR.",
  },
  {
    value: "acr",
    label: "A urine albumin result",
    hint: "ACR, albumin:creatinine ratio, or urine microalbumin.",
  },
];

/** True when the person said they have a report and nothing blocks Part 2. */
export const hasNumbers = (v = {}) => v.haveNumbers === "yes" && exclusionFor(v) === null;

/**
 * True when the person ticked this kind of number, or has not yet been asked.
 *
 * The "not yet asked" case matters: before the pick is made neither is ruled
 * out, so the chapter screen can count the questions honestly rather than
 * announcing one and then producing three.
 */
export function wants(values = {}, id) {
  if (values.haveNumbers === "no") return false;
  if (exclusionFor(values) !== null) return false;
  const picked = values.whichNumbers;
  if (!Array.isArray(picked)) return true;
  return picked.includes(id);
}

// What the input box will accept, per unit. Not a clinical threshold: these
// are the limits of what a lab could plausibly print, wide enough to take any
// real result and narrow enough to catch a number typed under the wrong unit
// before it becomes an eGFR. Brief 5.2: "a value entered as 0.9 when micromol
// per litre is selected is almost certainly mg/dL".
export const CREATININE_RANGES = {
  umol: {
    min: 10,
    max: 3000,
    placeholder: "88",
    error: "Enter a creatinine between 10 and 3000 micromol/L. A figure near 1 is in mg/dL, so switch the unit above.",
  },
  mgdl: {
    min: 0.1,
    max: 34,
    placeholder: "1.0",
    error: "Enter a creatinine between 0.1 and 34 mg/dL. A figure near 90 is in micromol/L, so switch the unit above.",
  },
};

export const ACR_RANGES = {
  mgmmol: {
    min: 0,
    max: 2500,
    placeholder: "2.5",
    error: "Enter an albumin:creatinine ratio between 0 and 2500 mg/mmol.",
  },
  mgg: {
    min: 0,
    max: 22000,
    placeholder: "22",
    error: "Enter an albumin:creatinine ratio between 0 and 22000 mg/g.",
  },
};

export const SCREENING_STEPS = [
  {
    id: "ageStep",
    kind: "number",
    text: "How old are you?",
    help: "Age is one of the three things an eGFR is worked out from, so if you have a creatinine result later we will already have this. Both equations behind it were built for adults of 18 and over.",
    field: { id: "age", label: "Age", unit: "years", min: 12, max: 110, placeholder: "44" },
  },
  {
    id: "sex",
    kind: "choice",
    text: "Which reference does your lab report use?",
    help: "Creatinine reference ranges and the eGFR equations are published separately for men and women, because muscle mass differs and muscle is where creatinine comes from.",
    options: SEX_OPTIONS,
  },
  {
    id: "pregnant",
    kind: "choice",
    text: "Are you pregnant?",
    help: "Pregnancy raises the filtering rate on purpose, which pushes creatinine down, so an eGFR equation reads wrong in both directions. No guideline supplies one for pregnancy, and neither will this page.",
    options: PREGNANT_OPTIONS,
    skipIf: (v) => v.sex !== "female",
  },
  {
    id: "nephrologyCare",
    kind: "choice",
    text: "Is a kidney specialist already looking after this?",
    help: "If a nephrologist has your results over time, they already have more than any single estimate can add, and a second number worked out a different way would only muddy it.",
    options: NEPHROLOGY_OPTIONS,
  },
  {
    id: "diabetes",
    kind: "choice",
    text: "Do you have diabetes?",
    help: "High blood pressure and diabetes are the two most commonly recorded causes of kidney failure in Ghana, and damage from either often builds for years without a symptom.",
    options: DIABETES_OPTIONS,
    feedback: (v) =>
      v === "yes"
        ? "Noted. That is one of the two conditions this check exists for."
        : v === "prediabetes"
          ? "Noted. Blood pressure next."
          : "",
  },
  {
    id: "bloodPressure",
    kind: "choice",
    text: "Do you have high blood pressure?",
    help: "Around one in three Ghanaian adults does, and most have never been told. Hypertension is a resting reading of 140/90 mmHg or above on two separate occasions.",
    options: BP_OPTIONS,
    feedback: (v) =>
      v === "unsure"
        ? "Worth knowing either way. A pharmacy takes it in about two minutes."
        : v === "treated" || v === "untreated"
          ? "Noted. That is the other one."
          : "",
  },
  {
    id: "familyKidney",
    kind: "choice",
    text: "Has a close relative had kidney disease?",
    help: "A parent, brother, sister or child who was told their kidneys were failing, or who needed dialysis.",
    options: FAMILY_OPTIONS,
  },
  {
    id: "riskFactors",
    kind: "multi",
    layout: "cards",
    text: "Do any of these apply to you?",
    help: "Tap any that apply. If none do, just tap Continue.",
    options: riskFactorOptions(),
    optionsFor: riskFactorOptions,
  },
  {
    id: "signs",
    kind: "multi",
    layout: "cards",
    text: "Have you noticed any of these?",
    help: "Early kidney trouble usually causes nothing at all, which is why the test rather than the feeling is what catches it. Tap any that apply, or just tap Continue.",
    options: SIGNS.map((s) => ({ value: s.id, label: s.label })),
  },
  {
    id: "acute",
    kind: "multi",
    layout: "cards",
    text: "And in the last two weeks, has any of this happened?",
    help: "These point at sudden kidney trouble rather than the slow kind, and the two need different answers on different timescales. Tap any that apply, or just tap Continue.",
    options: ACUTE_SIGNS.map((s) => ({ value: s.id, label: s.label })),
  },
];

export const NUMBERS_STEPS = [
  {
    id: "haveNumbers",
    kind: "choice",
    text: "Do you have a recent kidney result?",
    help: "A blood creatinine, an eGFR, or a urine albumin figure from a lab report. If you have never had one, say so and the rest of this part is skipped.",
    options: HAVE_NUMBERS_OPTIONS,
    skipIf: (v) => exclusionFor(v) !== null,
    feedback: (v) =>
      v === "no"
        ? "That is the usual answer. The result will tell you which tests would give you the picture."
        : "Good. Have the report to hand.",
  },
  {
    id: "whichNumbers",
    kind: "multi",
    layout: "cards",
    min: 1,
    text: "Which of these is on the report?",
    help: "Most reports carry one or the other. Having both is what makes the picture complete, and that is rarer than it should be.",
    options: WHICH_NUMBERS_OPTIONS,
    skipIf: (v) => v.haveNumbers === "no" || exclusionFor(v) !== null,
  },
  {
    id: "creatinineStep",
    kind: "number",
    text: "What is your creatinine result?",
    help: "The number printed next to Creatinine on the report. Check the unit at the top of the column: the two in use differ by a factor of about 88, so reading the wrong one turns a normal result into an alarming one.",
    choice: {
      id: "creatinineUnit",
      label: "Which unit does the report use?",
      help: "Most Ghanaian labs report micromol/L. A report showing a figure around 1 rather than around 90 is in mg/dL.",
      options: CREATININE_UNITS.map((u) => ({ value: u.value, label: u.label })),
    },
    // Static shape, so a step definition still reads on its own. `fieldFor`
    // narrows it once the unit is picked, because 90 is an ordinary creatinine
    // in micromol/L and an impossible one in mg/dL.
    field: {
      id: "creatinine",
      label: "Creatinine",
      unit: "micromol/L",
      ...CREATININE_RANGES.umol,
      step: "any",
    },
    fieldFor: (v) =>
      v.creatinineUnit === "mgdl"
        ? { unit: "mg/dL", ...CREATININE_RANGES.mgdl }
        : { unit: "micromol/L", ...CREATININE_RANGES.umol },
    skipIf: (v) => !wants(v, "creatinine"),
  },
  {
    id: "egfrReliability",
    kind: "multi",
    layout: "cards",
    text: "Before we work it out, do any of these apply?",
    help: "KDIGO names these as situations where an eGFR from creatinine is less accurate, mostly because creatinine comes from muscle. Where one applies we will say so rather than print a number. Tap any that apply, or just tap Continue.",
    options: UNRELIABLE_CONDITIONS.map((c) => ({ value: c.id, label: c.label })),
    skipIf: (v) => !wants(v, "creatinine"),
  },
  {
    id: "acrStep",
    kind: "number",
    text: "What is your urine albumin result?",
    help: "The albumin:creatinine ratio, sometimes printed as ACR or as urine microalbumin. Check the unit here too.",
    choice: {
      id: "acrUnit",
      label: "Which unit does the report use?",
      help: "mg/mmol is usual on a Ghanaian or UK report. The same result in mg/g is nearly nine times larger.",
      options: ACR_UNITS.map((u) => ({ value: u.value, label: u.label })),
    },
    field: {
      id: "acr",
      label: "Albumin:creatinine",
      unit: "mg/mmol",
      ...ACR_RANGES.mgmmol,
      step: "any",
    },
    fieldFor: (v) =>
      v.acrUnit === "mgg" ? { unit: "mg/g", ...ACR_RANGES.mgg } : { unit: "mg/mmol", ...ACR_RANGES.mgmmol },
    skipIf: (v) => !wants(v, "acr"),
  },
];

// ---------------------------------------------------------------------------
// The maths.
// ---------------------------------------------------------------------------

/**
 * Part 1: whether a check is indicated, and why.
 *
 * Counts factors from the guideline list. It does not score them, does not
 * weight them and does not produce a percentage.
 */
export function screeningFor(values = {}) {
  const reasons = [];
  const add = (id, extra) => {
    const f = riskFactorById(id);
    if (f) reasons.push({ ...f, ...extra });
  };

  if (values.diabetes === "yes") add("diabetes");
  else if (values.diabetes === "prediabetes")
    add("diabetes", {
      tier: "listed",
      label: "Prediabetes",
      short: "prediabetes",
      why: "Prediabetes is the stage before type 2 diabetes, and the one stage where the trajectory still turns around.",
      source: "prediabetes-warning-signs",
    });

  if (values.bloodPressure === "treated" || values.bloodPressure === "untreated") add("hypertension");
  if (values.familyKidney === "yes") add("familyKidney");

  for (const id of Array.isArray(values.riskFactors) ? values.riskFactors : []) add(id);

  const priority = reasons.filter((r) => r.tier === "priority");
  const tier = priority.length > 0 ? "priority" : reasons.length > 0 ? "listed" : "none";

  // Things the person does not know are not risk factors, but they are gaps,
  // and a gap you can close in two minutes is worth naming.
  const unknowns = [];
  if (values.bloodPressure === "unsure") unknowns.push("bloodPressure");
  if (values.diabetes === "unsure") unknowns.push("diabetes");
  if (values.familyKidney === "unsure") unknowns.push("familyKidney");

  return {
    indicated: reasons.length > 0,
    tier,
    reasons,
    priority,
    unknowns,
    // The only interval any source supports. Everyone else gets NO_INTERVAL_NOTE.
    interval: values.diabetes === "yes" ? DIABETES_INTERVAL : null,
  };
}

/** The signs the person ticked, split into the slow kind and the sudden kind. */
export function signsFor(values = {}) {
  const picked = (Array.isArray(values.signs) ? values.signs : []).map(signById).filter(Boolean);
  const acute = (Array.isArray(values.acute) ? values.acute : []).map(acuteById).filter(Boolean);
  return { picked, acute, redFlags: picked.filter((s) => s.redFlag) };
}

/**
 * Part 2: whatever numbers the person actually has, staged where the tables
 * allow it, and an explicit statement of which half of the picture is missing.
 *
 * `have` is the honest summary of what came in: "none", "creatinine", "acr" or
 * "both". `missing` is what would complete it. Those two are what the whole
 * tool is for.
 */
export function numbersFor(values = {}) {
  const wantsCreatinine = hasNumbers(values) && wants(values, "creatinine");
  const wantsAcr = hasNumbers(values) && wants(values, "acr");

  const creatMgdl = wantsCreatinine ? creatinineToMgdl(values.creatinine, values.creatinineUnit) : null;
  const creatUmol = wantsCreatinine ? creatinineToUmol(values.creatinine, values.creatinineUnit) : null;

  const acrUnit = values.acrUnit === "mgg" ? "mgg" : "mgmmol";
  const acrTyped = wantsAcr ? acrNumber(values.acr) : null;
  const acrMgg = wantsAcr ? acrToMgg(values.acr, values.acrUnit) : null;
  const acrMgmmol = wantsAcr ? acrToMgmmol(values.acr, values.acrUnit) : null;

  // KDIGO Table 9: where creatinine is a poor proxy for muscle, the honest
  // output is the flag rather than a number beside a warning nobody reads.
  const unreliable = unreliableFor(values);
  const egfr =
    creatMgdl === null || unreliable.length > 0
      ? null
      : egfrFrom({ creatinineMgdl: creatMgdl, age: values.age, sex: values.sex });
  const g = egfr === null ? null : gStageFor(egfr.reported);
  const a = acrTyped === null ? null : aStageFor(acrTyped, acrUnit);

  const haveCreatinine = creatMgdl !== null;
  const haveAcr = acrTyped !== null;
  const have = haveCreatinine && haveAcr ? "both" : haveCreatinine ? "creatinine" : haveAcr ? "acr" : "none";
  const missing = have === "both" ? null : have === "creatinine" ? "acr" : have === "acr" ? "creatinine" : "both";

  return {
    have,
    missing,
    creatinine: haveCreatinine
      ? { mgdl: creatMgdl, umol: creatUmol, typed: Number(values.creatinine), unit: values.creatinineUnit }
      : null,
    unreliable,
    egfr,
    egfrLow: egfr !== null && egfr.reported < EGFR_LOW_THRESHOLD,
    g,
    acr: haveAcr ? { mgg: acrMgg, mgmmol: acrMgmmol, typed: acrTyped, unit: acrUnit } : null,
    // Compared in the unit it was reported in, which is why this reads the raw
    // figure rather than a converted one.
    acrOverReferralHigh: acrTyped !== null && acrTyped > ACR_REFERRAL_HIGH[acrUnit],
    a,
    grid: gridCellFor(g?.id, a?.id),
  };
}

// The half of the picture that is missing, in the words the result screen
// uses. This is the tool's central claim, so it lives here where the tests can
// pin it.
export const MISSING_HALF = {
  acr: {
    test: "ACR",
    heading: "You have the blood half. The urine half is missing.",
    body:
      "eGFR describes how fast the kidneys are filtering. It says nothing about whether they are leaking. Albumin in the urine is a free-standing marker of kidney damage in KDIGO's definition, which means albuminuria persisting beyond three months is chronic kidney disease even where the eGFR is entirely normal. In a random community sample of 2,524 Ghanaians, an eGFR under 60 was found in 3.7%, while albuminuria was found in 8.4% of rural and 10.9% of urban participants. Most of the kidney disease in that sample was in the urine, not the blood.",
  },
  creatinine: {
    test: "RFT",
    heading: "You have the urine half. The blood half is missing.",
    body:
      "An albumin:creatinine ratio describes leaking, and it is the half most people never get, so you are ahead of most of them. It does not describe how fast the kidneys are filtering, which is what eGFR estimates and what the G half of a KDIGO stage is set by. The two are read together on a grid, and one letter does not place you on it. The test that fills the gap is a blood creatinine, on a renal function test.",
  },
  both: {
    test: "BOTH",
    heading: "Kidney disease is staged on two numbers.",
    body:
      "One comes from blood and one from urine, and most people only ever get the first. A blood creatinine gives an eGFR, which estimates how fast the kidneys are filtering. A urine albumin:creatinine ratio shows whether they are leaking. Leaking often appears first: in a community sample of 2,524 Ghanaians, albuminuria was two to three times as common as a reduced eGFR. If you were only ever going to get one of the two, the evidence says it should arguably be the urine one.",
  },
};

/** The line the result screen leads with about what is missing, or null. */
export function missingHalfFor(numbers) {
  if (!numbers.missing) return null;
  return MISSING_HALF[numbers.missing];
}

// ---------------------------------------------------------------------------
// The next step.
//
// Prices are the static fallbacks. Every one is read live through
// singleTestPrice() in ToolCta, the same way the other tools do it, so these
// figures only ever show when the catalogue call has failed. Verified against
// the Ghana catalogue on 2026-09-05.
// ---------------------------------------------------------------------------

export const RFT_TEST = {
  testCode: "RFT",
  slug: "renal-function",
  name: "Renal Function Test",
  price: "GHS 195",
};

export const ACR_TEST = {
  testCode: "ACR",
  slug: "acr",
  name: "Albumin:Creatinine Ratio",
  price: "GHS 150",
};

/**
 * What to do next, given what came back.
 *
 * Rule 3: when something needs prompt clinical attention, or when the tool has
 * refused to compute at all, the page stops selling. Both return
 * `kind: "none"` and the result screen renders words in place of a card.
 */
export function kidneyCta({ screening, numbers, urgent, exclusion }) {
  if (urgent) {
    return {
      kind: "none",
      label: "This one is for a clinician, not a booking form.",
      body: urgent.body,
    };
  }

  if (exclusion) {
    return {
      kind: "none",
      label: "Nothing to book from this page today.",
      body: exclusion.body,
    };
  }

  if (numbers.missing === "acr") {
    return {
      kind: "test",
      ...ACR_TEST,
      label: "Get the half you are missing",
      body: "A urine albumin:creatinine ratio is the other number a KDIGO stage is read from, and it is the one that usually moves first.",
    };
  }

  if (numbers.missing === "creatinine") {
    return {
      kind: "test",
      ...RFT_TEST,
      label: "Get the half you are missing",
      body: "A renal function test measures the blood creatinine an eGFR is worked out from, alongside urea and electrolytes.",
    };
  }

  if (numbers.missing === "both") {
    return {
      kind: "tests",
      label: screening.indicated ? "Both numbers, so no half is left out" : "The pair that gives the whole picture",
      body: screening.indicated
        ? "The two together are what a KDIGO stage is read from. They can be booked as a pair or one at a time, and neither needs fasting."
        : "Nothing you told us puts you on the list today. If you want a baseline anyway, these are the two numbers to start from.",
      items: [RFT_TEST, ACR_TEST],
    };
  }

  // Both numbers already in hand.
  return {
    kind: "none",
    label: "You already have both numbers.",
    body:
      "That is more than most people arrive with. What turns a pair of results into an answer is repeating them: KDIGO defines chronic kidney disease by an abnormality present for a minimum of three months, and its own guidance is not to assume chronicity from a single set, because the finding could be a recent acute injury instead. Keep the report and take it to your next appointment.",
  };
}

/**
 * The whole tool.
 *
 * @param {object} values the flat answer map the Stepper hands back
 */
export function computeKidney(values = {}) {
  const exclusion = exclusionFor(values);
  const screening = screeningFor(values);
  const signs = signsFor(values);
  const numbers = numbersFor(values);
  const urgent = urgentFor(numbers, values);
  const cta = kidneyCta({ screening, numbers, urgent, exclusion });

  return {
    slug: "kidney-check",
    age: Number(values.age) || null,
    sex: values.sex || "",
    exclusion,
    screening,
    signs,
    numbers,
    missingHalf: exclusion ? null : missingHalfFor(numbers),
    urgent,
    cta,
    healthInterest: cta.kind === "test" ? cta.testCode : "ACR",
    answers: packKidney(values, { screening, signs, numbers, urgent, exclusion }),
  };
}

// ---------------------------------------------------------------------------
// The lead payload.
//
// src/lib/leads.js caps `answers` at 16 keys, and ToolLeadForm adds `optIn`,
// so this returns at most 14. Values are trimmed to 200 characters there; the
// short labels above are what keep every line well inside that.
// ---------------------------------------------------------------------------

const listOf = (items) => (items.length === 0 ? "none" : items.join(", "));

export function packKidney(values = {}, { screening, signs, numbers, urgent, exclusion } = {}) {
  const flags = [];
  if (exclusion) flags.push(exclusion.id);
  if (urgent) flags.push(`urgent:${urgent.id}`);
  for (const c of numbers?.unreliable || []) flags.push(`unreliable:${c.short}`);

  const out = {
    age: String(values.age ?? ""),
    sex: values.sex || "",
    diabetes: values.diabetes || "",
    bloodPressure: values.bloodPressure || "",
    familyKidney: values.familyKidney || "",
    riskFactors: listOf(
      (Array.isArray(values.riskFactors) ? values.riskFactors : [])
        .map((id) => riskFactorById(id)?.short)
        .filter(Boolean),
    ),
    signs: listOf([...(signs?.picked || []), ...(signs?.acute || [])].map((s) => s.short)),
    screening: screening
      ? `${screening.indicated ? `indicated: ${screening.tier}` : "not indicated"}${screening.interval ? ", annual (diabetes)" : ""}`
      : "",
    flags: listOf(flags),
    haveNumbers: numbers?.have || "none",
  };

  if (numbers?.creatinine) {
    const u = numbers.creatinine.unit === "mgdl" ? "mg/dL" : "micromol/L";
    out.creatinine = `${numbers.creatinine.typed} ${u}`;
  }
  if (numbers?.egfr) {
    out.egfr = `${numbers.egfr.reported} CKD-EPI 2021, ${numbers.egfr.ekfc} EKFC${numbers.g ? `, ${numbers.g.label}` : ""}`;
  }
  if (numbers?.acr) {
    const u = numbers.acr.unit === "mgg" ? "mg/g" : "mg/mmol";
    out.acr = `${numbers.acr.typed} ${u}${numbers.a ? `, ${numbers.a.label}` : ""}`;
  }
  if (numbers?.grid && numbers.g && numbers.a) {
    out.kdigo = `${numbers.g.label} ${numbers.a.label}, ${numbers.grid.label}`;
  } else if (numbers?.missing) {
    out.kdigo = `half missing: ${numbers.missing}`;
  }

  return out;
}

/** How many keys packKidney can return at most. Pinned by the tests. */
export const MAX_ANSWER_KEYS = 14;

// ---------------------------------------------------------------------------
// The page.
// ---------------------------------------------------------------------------

export default {
  slug: "kidney-check",
  title: "Kidney Check",
  subtitle: "Kidney function, eGFR, and the urine test most people never get.",
  shortTitle: "Kidney Check",
  seoTitle: "Kidney Function and eGFR Calculator | Kidney Check | BetterHealth Africa",
  eyebrow: "Free 3-minute calculator",
  promise:
    "Part 1 asks who should have their kidneys checked and needs no test at all. Part 2 runs only if you have a lab report: a creatinine in either unit gives an eGFR and a KDIGO G stage, a urine albumin result gives the A stage, and both together place you on the grid. Where you have only one of the two, the page says which half is missing and what fills it.",
  description:
    "Check whether your kidneys should be tested, and read a creatinine or eGFR against the KDIGO stages. Kidney disease is staged on two numbers, not one.",
  format: "9 or 10 questions, then your numbers if you have them",
  bullets: [
    "Part 1 needs no test: the risk factors, including the ones from Ghana's own registry",
    "Creatinine in micromol/L or mg/dL, urine albumin in mg/mmol or mg/g",
    "Two published equations side by side, because one eGFR claims more than the evidence supports",
    "Says which half of the picture you are missing, and what fills it",
  ],
  intro:
    "Kidney disease is staged on two numbers. One comes from blood and one from urine, and most people only ever get the first. In a random community sample of 2,524 Ghanaians, albuminuria was two to three times as common as a reduced eGFR, so the urine half is where most of the disease was. Part 1 works out whether yours should be checked. Part 2 runs only if you already have a result.",
  sections: [
    {
      heading: "Why two numbers and not one",
      paragraphs: [
        "A kidney function test reports creatinine, a waste product from muscle that healthy kidneys clear from the blood, and eGFR, which feeds that creatinine along with age and sex into an equation to estimate how fast the kidneys are filtering. As filtering declines creatinine rises and eGFR falls, so the two describe one trend from opposite directions.",
        "Neither describes leaking. KDIGO defines chronic kidney disease by either of two things: a filtering rate below 60, or a marker of kidney damage, of which albumin in the urine at 3 mg/mmol or above is the first one listed. They are independent criteria. Someone with an eGFR of 100 and an albumin:creatinine ratio of 400 mg/g sits in a high-risk cell of KDIGO's own grid, and a creatinine-only test would have called them fine.",
        "So the guideline asks for both. Its detection practice point reads: test people at risk for and with chronic kidney disease using both urine albumin measurement and assessment of glomerular filtration rate. Ghana's own Standard Treatment Guidelines say the same thing in local words, naming a serum creatinine with an eGFR and a urine albumin:creatinine ratio for people with hypertension, diabetes or a past history of glomerulonephritis. A kidney check that measures only creatinine is not doing what either document asks.",
        "KDIGO's footnote to its own eGFR table says it outright: in the absence of evidence of kidney damage, neither G1 nor G2 fulfils the criteria for chronic kidney disease. Read the other way round, in the presence of damage, they do. The urine test is what looks for damage.",
      ],
      callout:
        "A single result is not a diagnosis. KDIGO defines chronic kidney disease by an abnormality present for a minimum of three months, and says chronicity must not be assumed from one abnormal result, because it could be a recent acute kidney injury instead. A first abnormal result is still a reason to be seen, but it is not an answer.",
    },
    {
      heading: "Why the eGFR here is a range and not a number",
      paragraphs: [
        "No eGFR equation has been validated against measured kidney function in Ghanaian adults. The largest study that measured it anywhere in Africa followed 2,578 adults in Malawi, South Africa and Uganda using iohexol clearance, and no equation reached the accepted threshold of getting within 30% of the true value for three-quarters of people. The race-free CKD-EPI 2021 equation managed 60%, and its accuracy fell to 25% where the measured rate was 45 to 59, and to 14% below 45.",
        "So this page computes two published equations rather than one: CKD-EPI 2021, which is what most laboratories report and therefore the number least likely to conflict with your own lab, and the EKFC equation using the Black African reference values, which KDIGO's implementation guidance names for use within African countries. You get the span between them. Where they disagree about which band you are in, the page says so, because a gap between two published equations tells you more about the number than either one alone.",
        "One equation is not on offer at all. The older CKD-EPI equation multiplied the result by 1.159 for anyone recorded as Black. Across eleven studies of 1,834 Black adults outside the United States, that coefficient cut accuracy from 72.9% to 61.9%. It inflates the estimate and hides disease. The task force that examined it recommended dropping it in 2021, and KDIGO's practice point is that race should not be used in computing an eGFR.",
      ],
    },
    {
      heading: "Who should be tested, and how often",
      paragraphs: [
        "KDIGO names three conditions as the highest priority for kidney testing: high blood pressure, diabetes, and cardiovascular disease including heart failure. Around those sit the rest of its risk-factor list, from a family history of kidney failure and a past episode of sudden kidney injury to lupus, HIV, recurrent stones and occupational exposure to lead, mercury or pesticides. Ghana adds one of its own: among 2,781 Ghanaian patients with hypertension or diabetes, regular herbal medication use was independently associated with kidney disease, with an adjusted odds ratio of 1.39 (95% CI 1.10 to 1.75).",
        "How often is a harder question, and the guideline declines to answer it. KDIGO states that there are no current evidence-based recommendations on how often to screen people at risk. The single exception is diabetes, where the consensus with the American Diabetes Association is a yearly check, starting at diagnosis for type 2 because kidney damage is often already present by then, and five years after diagnosis for type 1.",
        "If none of the risk factors applies to you, the honest answer is that testing has not been shown to help. The US Preventive Services Task Force reviewed routine screening of adults with no symptoms and graded the evidence insufficient either way. Its review deliberately excluded people being monitored for diabetes or high blood pressure, so it speaks to the no-risk-factor group and not to the rest.",
      ],
    },
    {
      heading: "Why this matters in Ghana",
      paragraphs: [
        "High blood pressure and diabetes are the two most commonly recorded causes of kidney failure in Ghana. On the national renal registry's first report, covering 687 people on dialysis in 2017, hypertensive kidney disease accounted for 260 of them and diabetic nephropathy for 63. Both damage the kidneys the same way, through the small blood vessels inside the filtering units, and both do it without symptoms for years.",
        "Recorded is the careful word. The registry notes that almost all its patients presented late and very few had a biopsy, so the cause was the attending physician's clinical judgement. Chronic glomerulonephritis, an inflammation of those same filtering units, is far more prominent in Ghana than in high-income patterns, and 29% of the registry's cases had no stated cause at all.",
        "Kidney replacement therapy exists here, and it is concentrated. There are 40 functioning haemodialysis centres, 33 of them in Greater Accra and Ashanti, 15 nephrologists for the country, and seven regions covering 5.7 million people with no service at all. Dialysis entered the national insurance benefit package in December 2024. That is a fact about the health system rather than a warning about your body, and it is a reason to have the two numbers early.",
      ],
    },
  ],
  sources: [
    {
      label:
        "KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. Kidney Int 2024;105(4S):S117-S314. The G and A stages, the risk grid, the three-month criterion and the referral circumstances.",
      url: "https://kdigo.org/guidelines/ckd-evaluation-and-management/",
    },
    {
      label:
        "Inker LA, et al. New creatinine- and cystatin C-based equations to estimate GFR without race. N Engl J Med 2021;385(19):1737-49. The CKD-EPI 2021 equation this page reports.",
      url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2102953",
    },
    {
      label:
        "Pottel H, et al. Development and validation of a modified full age spectrum creatinine-based equation. Ann Intern Med 2021;174(2):183-91, with the Black African reference values from Delanaye P, et al. Nephrol Dial Transplant 2023;38(1):106-18. The EKFC equation shown alongside.",
      url: "https://www.acpjournals.org/doi/10.7326/M20-4366",
    },
    {
      label:
        "Fabian J, et al; ARK Consortium. Measurement of kidney function in Malawi, South Africa, and Uganda: a multicentre cohort study. Lancet Glob Health 2022;10(8):e1159-69. The accuracy figures behind the caveat on every eGFR.",
      url: "https://www.thelancet.com/journals/langlo/article/PIIS2214-109X(22)00239-X/fulltext",
    },
    {
      label:
        "Zingano CP, et al. 2009 CKD-EPI GFR estimation in Black individuals outside the United States: a systematic review and meta-analysis. Clin Kidney J 2023;16(2):322-30. P30 accuracy 61.9% with the race coefficient and 72.9% without it.",
      url: "https://academic.oup.com/ckj/article/16/2/322/6873464",
    },
    {
      label:
        "Delgado C, et al. A unifying approach for GFR estimation: recommendations of the NKF-ASN Task Force on Reassessing the Inclusion of Race in Diagnosing Kidney Disease. Am J Kidney Dis 2022;79(2):268-88.",
      url: "https://www.ajkd.org/article/S0272-6386(21)00828-3/fulltext",
    },
    {
      label:
        "Adjei DN, et al. Chronic kidney disease burden among African migrants in three European countries and in urban and rural Ghana: the RODAM cross-sectional study. Nephrol Dial Transplant 2018;33(10):1812-22, with Adjei DN, et al. BMJ Open 2019;9(5):e022610 for the eGFR and albuminuria split.",
      url: "https://academic.oup.com/ndt/article/33/10/1812/4810912",
    },
    {
      label:
        "Boima V, et al. The Ghana Renal Registry: a first annual report. Afr J Nephrol 2021;24(1):19-24. The 2017 causes of kidney failure, read from Table 1 rather than from the abstract.",
      url: "https://www.journals.ac.za/index.php/ajn/article/view/4545",
    },
    {
      label:
        "Gbadegesin RA, et al. APOL1 bi- and monoallelic variants and chronic kidney disease in West Africans. N Engl J Med 2025;392(3):228-38.",
      url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2404211",
    },
    {
      label:
        "Tannor EK, et al. Fifty years of hemodialysis in Ghana: current status, utilization and cost of dialysis services. BMC Health Serv Res 2023;23:1170.",
      url: "https://bmchealthservres.biomedcentral.com/articles/10.1186/s12913-023-10154-x",
    },
    {
      label:
        "Ahn K, et al. Development of a formula for estimated glomerular filtration rate in pregnant women from physiological hyperfiltration of serum creatinine. Sci Rep 2024;14:7229. Why this page computes nothing in pregnancy.",
      url: "https://www.nature.com/articles/s41598-024-57737-0",
    },
    {
      label:
        "Ghana Ministry of Health. Standard Treatment Guidelines, 7th edition, 2017, Section 137. The only Ghanaian clinical document found that addresses detecting kidney disease early, and it names both tests.",
      url: "https://www.moh.gov.gh/wp-content/uploads/2020/07/GHANA-STG-2017-1.pdf",
    },
    {
      label:
        "de Boer IH, Khunti K, Sadusky T, et al. Diabetes management in chronic kidney disease: a consensus report by the American Diabetes Association and KDIGO. Kidney Int 2022;102:974-89. The one screening interval any source supports.",
      url: "https://www.kidney-international.org/article/S0085-2538(22)00695-0/fulltext",
    },
    {
      label:
        "Tannor EK, Sarfo FS, Mobula LM, et al. Prevalence and predictors of chronic kidney disease among Ghanaian patients with hypertension and diabetes mellitus. J Clin Hypertens 2019. Herbal medication use, adjusted odds ratio 1.39 (95% CI 1.10 to 1.75) in 2,781 patients.",
      url: "https://onlinelibrary.wiley.com/doi/10.1111/jch.13697",
    },
    {
      label:
        "Vosters TG, Stel VS, Jager KJ, et al. Performance of current chronic kidney disease screening criteria in women and men across ethnic groups: the HELIUS study. Mayo Clin Proc Innov Qual Outcomes 2025;9(3):100613. Includes 1,417 Ghanaian women and 896 Ghanaian men.",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12033983/",
    },
    {
      label:
        "Aparcana-Granda DJ, Ascencio EJ, Carrillo Larco RM. Systematic review of diagnostic and prognostic models of chronic kidney disease in low-income and middle-income countries. BMJ Open 2022;12(3):e058921. Why this tool counts risk factors rather than scoring them.",
      url: "https://bmjopen.bmj.com/content/12/3/e058921",
    },
    {
      label:
        "Moyer VA; US Preventive Services Task Force. Screening for chronic kidney disease: recommendation statement. Ann Intern Med 2012;157(8):567-70. Grade I, insufficient evidence, for routine screening of asymptomatic adults with no risk factors.",
      url: "https://www.acpjournals.org/doi/10.7326/0003-4819-157-8-201210160-00533",
    },
    {
      label:
        "Chronic Kidney Disease Prognosis Consortium; Matsushita K, van der Velde M, Astor BC, et al. Association of estimated glomerular filtration rate and albuminuria with all-cause and cardiovascular mortality. Lancet 2010;375(9731):2073-81. The outcome data the risk grid is built on.",
      url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(10)60674-5/fulltext",
    },
    {
      label: "Creatinine and eGFR: how to read your kidney function test",
      url: "/blog/creatinine-egfr-kidney-function",
    },
    { label: "Urinalysis explained: what a routine urine test checks", url: "/blog/urinalysis-explained" },
    { label: "High blood pressure in Ghana: the silent killer", url: "/blog/high-blood-pressure-silent-killer" },
    { label: "Prediabetes: the warning window before type 2 diabetes", url: "/blog/prediabetes-warning-signs" },
  ],
  // The dynamic next step lives on the result (`result.cta`), because it
  // depends on which half of the picture the person turned up with. This
  // static one is the secondary card, and it is what Tool.jsx resolves the
  // live panel price from.
  cta: {
    kind: "panel",
    panelSlug: "metabolix",
    label: "The conditions that damage kidneys travel together",
    body:
      "High blood pressure and diabetes are the two most commonly recorded causes of kidney failure in Ghana, and the panel that covers kidney function also covers blood sugar, liver and a full blood count.",
  },
};
