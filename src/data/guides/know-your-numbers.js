// Lead magnet 1 (top of funnel). Thresholds and intervals are taken verbatim
// from: high-blood-pressure-silent-killer.js, prediabetes-warning-signs.js,
// hba1c-explained.js, lipid-profile-cholesterol-test.js,
// creatinine-egfr-kidney-function.js, liver-function-tests-explained.js,
// full-blood-count-explained.js, preventive-health-screening-ghana.js.
// BMI / waist have no threshold in those articles, so none is given here.
export default {
  slug: "know-your-numbers",
  kind: "guide",
  title: "The 8 Numbers Every Adult in Ghana Should Know",
  shortTitle: "Know Your Numbers",
  eyebrow: "Free guide",
  promise:
    "Eight health numbers, what each one is a clue for, the reference bands behind them, and a table to keep your own results in one place.",
  description:
    "The eight health numbers worth knowing, the reference bands behind them, how often to check by age, and a fill-in table to keep. Free 3-page PDF.",
  stage: "top",
  panelSlugs: ["panorama", "metabolix"],
  format: "3-page PDF",
  pdf: "/guides/know-your-numbers.pdf",
  bullets: [
    "The eight numbers, explained in plain English",
    "The widely used reference bands, with their sources",
    "How often to check, by age",
    "A one-page 'my numbers' table to fill in",
  ],
  sections: [
    {
      heading: "Why these eight",
      paragraphs: [
        "Many of the most common serious conditions in Ghana, like high blood pressure, diabetes, kidney disease and liver disease, build up quietly for years before anything feels wrong. A short list of routine numbers can pick them up while they are still easy to manage.",
        "Each number below is a clue, not a verdict. One result outside the reference range needs context before conclusions: your symptoms, your history, your medicines, and often a repeat test. Use the numbers to make a better health decision with your clinician, not to diagnose yourself.",
        "Reference bands vary a little between labs. Where your report prints its own range, that range applies to you.",
      ],
    },
    {
      heading: "1. Blood pressure",
      paragraphs: [
        "Blood pressure is the force of blood against your artery walls. The top number (systolic) is the pressure during a heartbeat; the bottom number (diastolic) is the pressure between beats. High blood pressure rarely causes symptoms, which is why it is worth measuring rather than guessing.",
      ],
      table: {
        caption: "Blood pressure categories (AHA/ACC 2017; WHO Global Hypertension Report 2023)",
        headers: ["Category", "Reading (mmHg)"],
        rows: [
          ["Normal", "Below 120/80"],
          ["Elevated", "Systolic 120 to 129 and diastolic below 80"],
          ["Stage 1 hypertension", "Systolic 130 to 139 or diastolic 80 to 89"],
          ["Stage 2 hypertension", "Systolic 140 or above, or diastolic 90 or above"],
          ["Hypertensive crisis", "Above 180/120: seek emergency care immediately"],
        ],
      },
      after: [
        "How often: at least once a year for every adult. With a reading in the elevated or stage 1 range, a check every three to six months is reasonable.",
      ],
      callout:
        "One raised reading is not a diagnosis. Blood pressure moves with stress, caffeine, activity and even sitting in a clinic. A diagnosis rests on the average of at least two readings taken on two separate occasions. If a reading is high, ask for a repeat at rest.",
    },
    {
      heading: "2. Fasting blood sugar",
      paragraphs: [
        "Fasting blood sugar measures the glucose in your blood after at least eight hours without food. It is the test most often used for a first diabetes check in Ghana. Eating raises blood sugar for a while, so the fast gives a cleaner baseline.",
      ],
      table: {
        caption: "Fasting blood glucose (ADA Standards of Care 2024)",
        headers: ["Band", "Result"],
        rows: [
          ["Normal", "Below 5.6 mmol/L"],
          ["Prediabetes", "5.6 to 6.9 mmol/L"],
          ["Diabetes", "7.0 mmol/L or above, usually confirmed on a second test"],
        ],
      },
      after: [
        "WHO sets the start of impaired fasting glucose at 6.1 mmol/L rather than 5.6. If your report uses different categories, ask which criteria the lab applied.",
        "How often: every one to three years when the result is normal and you have no risk factors. With a family history of diabetes, excess weight, or a previous result in the prediabetes range, your clinician may suggest yearly testing.",
      ],
    },
    {
      heading: "3. HbA1c",
      paragraphs: [
        "HbA1c shows how much glucose has attached to the haemoglobin in your red blood cells. Red cells live for about three to four months, so it reflects your average blood sugar over roughly the past two to three months, not just this morning. You do not need to fast for it.",
      ],
      table: {
        caption: "HbA1c bands (WHO / ADA)",
        headers: ["Band", "Result"],
        rows: [
          ["Normal", "Below 5.7%"],
          ["Prediabetes", "5.7% to 6.4%"],
          ["Diabetes", "6.5% or higher, usually confirmed on a second test"],
        ],
      },
      after: [
        "How often: every one to three years with a normal result and no risk factors; every three to six months for people living with prediabetes or diabetes, on the interval the clinician sets.",
      ],
      callout:
        "A Ghana caveat: sickle cell trait, sickle cell disease, other haemoglobin variants and iron-deficiency anaemia change how long red cells survive, which can make HbA1c read falsely high or low. A clinician who knows your blood picture should read the result. Where HbA1c is unreliable, a fasting glucose test or an oral glucose tolerance test can stand in.",
    },
    {
      heading: "4. Total and LDL cholesterol",
      paragraphs: [
        "Cholesterol travels in the blood packaged in particles. LDL carries it toward artery walls, where it can build up; HDL carries it away. Total cholesterol adds all of it up. LDL is usually the number a clinician watches most, because it is the one most closely tied to plaque in the arteries.",
      ],
      table: {
        caption: "Total cholesterol and LDL (NCEP ATP III; ACC/AHA 2018)",
        headers: ["Measure", "Band", "mmol/L"],
        rows: [
          ["Total cholesterol", "Desirable", "Below 5.2"],
          ["Total cholesterol", "Borderline high", "5.2 to 6.2"],
          ["Total cholesterol", "High", "6.2 or above"],
          ["LDL", "Optimal", "Below 2.6"],
          ["LDL", "Near optimal", "2.6 to 3.3"],
          ["LDL", "Borderline high", "3.4 to 4.1"],
          ["LDL", "High", "4.1 or above"],
        ],
      },
      after: [
        "People with existing heart disease, diabetes or a higher calculated risk are often given lower LDL targets, sometimes below 1.8 mmol/L. Ask your clinician for the target that applies to you. A single raised LDL is not an automatic prescription; it is read alongside HDL, blood pressure, blood sugar, age, smoking and family history.",
        "How often: every four to five years with normal results and no major risk factors. With diabetes, high blood pressure, a family history of heart disease, or an abnormal previous result, yearly or more often. The test needs a 9 to 12 hour fast; water is fine.",
      ],
    },
    {
      heading: "5. Creatinine and eGFR (kidneys)",
      paragraphs: [
        "Creatinine is a waste product from normal muscle activity that healthy kidneys filter out. eGFR uses your creatinine, age and sex to estimate how well your kidneys are filtering. The two move in opposite directions: as filtering slows, creatinine rises and eGFR falls. eGFR is usually the more useful number to track.",
      ],
      table: {
        caption: "eGFR stages (KDIGO 2012; National Kidney Foundation)",
        headers: ["Stage", "eGFR"],
        rows: [
          ["Normal", "90 or above"],
          ["Mild decrease", "60 to 89"],
          ["Moderate decrease", "30 to 59"],
          ["Severe decrease", "15 to 29"],
          ["Kidney failure", "Below 15"],
        ],
      },
      after: [
        "Typical creatinine reference ranges run about 60 to 110 micromol/L for men and 45 to 90 micromol/L for women, though they vary by lab and by muscle mass, so read yours against the range on your own report. Most labs flag an eGFR under 60 for follow-up. A single result outside the range is not a diagnosis; clinicians usually want to see the trend over at least two tests, generally three months apart.",
        "How often: as part of a routine screen every one to three years, and more often if you are managing high blood pressure or diabetes, the two leading causes of kidney damage in Ghana.",
      ],
    },
    {
      heading: "6. ALT (liver)",
      paragraphs: [
        "ALT is an enzyme that lives almost entirely inside liver cells. When those cells are inflamed or injured, ALT leaks into the blood, so a raised level is a clue that something is straining the liver. It does not say what. Fatty liver, hepatitis B, alcohol, some medicines and some herbal remedies are common causes across the region.",
      ],
      table: {
        caption: "Typical adult reference ranges (exact cutoffs vary by lab)",
        headers: ["Enzyme", "Range"],
        rows: [
          ["ALT", "Roughly 7 to 56 U/L"],
          ["AST", "Roughly 10 to 40 U/L"],
        ],
      },
      after: [
        "A mildly raised result is common and often temporary: intense exercise, a viral illness, or a new medicine or supplement can lift it for a while, so a single mild rise is often repeated in a few weeks. A raised result with yellow eyes or skin, dark urine or abdominal pain needs prompt care.",
        "How often: with your routine screen every one to three years, and after any raised result, on the schedule your clinician sets.",
      ],
    },
    {
      heading: "7. BMI and waist circumference",
      paragraphs: [
        "Body weight and waist measurement are simple markers of metabolic risk. BMI is your weight in kilograms divided by your height in metres, squared. Waist circumference is measured around your middle with the tape level, snug but not tight.",
        "Cut-offs for BMI and waist differ by sex and by population, and the articles this guide draws on do not set a single figure. Ask your clinician for the target that applies to you. Every BetterHealth visit records weight, height, waist and BMI alongside the blood tests, so you have a baseline to compare against.",
        "How often: at every check-up, and any time you are working toward a health goal.",
      ],
    },
    {
      heading: "8. Haemoglobin",
      paragraphs: [
        "Haemoglobin is the protein in red blood cells that carries oxygen. A low level is anaemia, the most common abnormality on a full blood count in Ghana, where iron deficiency, malaria and sickle cell disease are all common. Mild anaemia often develops slowly enough that you feel normal, which is why the test picks it up before symptoms do.",
      ],
      table: {
        caption: "Haemoglobin (WHO 2011 reference values)",
        headers: ["Band", "Result"],
        rows: [
          ["Men: normal", "130 to 175 g/L"],
          ["Women: normal", "120 to 155 g/L"],
          ["Anaemia", "Below 130 g/L (men) or below 120 g/L (women)"],
          ["Severe anaemia", "Below 80 g/L: needs urgent clinical review"],
        ],
      },
      after: [
        "Some labs report haemoglobin in g/dL; 130 g/L is 13 g/dL. If it is low, the MCV (the size of your red cells) on the same report helps point to a cause: below 80 fL most often points to iron deficiency, above 100 fL to B12 or folate deficiency.",
        "How often: many adults in Ghana benefit from a yearly full blood count. People with known anaemia or sickle cell disease may be checked every three to six months.",
      ],
    },
    {
      heading: "How often to check, by age",
      paragraphs: [
        "A general guide. Family history, weight and existing conditions all move the schedule, so treat it as the start of a conversation with a clinician rather than a fixed prescription.",
      ],
      table: {
        caption: "Screening frequency by age (BetterHealth Africa, preventive screening in Ghana)",
        headers: ["Who", "How often"],
        rows: [
          ["Ages 18 to 39, no risk factors", "A baseline screen, then every two to three years"],
          ["Ages 40 and above", "A fuller screen every one to two years"],
          [
            "Family history of diabetes, high blood pressure, kidney or heart disease",
            "Earlier and more often, guided by a doctor",
          ],
          ["Every adult", "Blood pressure at least once a year"],
        ],
      },
      after: [
        "Fasting glucose and the lipid profile are most accurate after an overnight fast of 8 to 12 hours. HbA1c, blood pressure, kidney, liver and blood count checks do not need fasting. Your provider will tell you which tests in your panel need it.",
      ],
    },
    {
      heading: "My numbers",
      paragraphs: [
        "Write your results here each time you test. Trends over time tell a clinician more than any single value.",
      ],
      table: {
        fillIn: true,
        caption: "My numbers",
        headers: ["Number", "Date", "My result", "Range on my report", "Next check due"],
        rows: [
          ["Blood pressure", "", "", "", ""],
          ["Fasting blood sugar", "", "", "", ""],
          ["HbA1c", "", "", "", ""],
          ["Total / LDL cholesterol", "", "", "", ""],
          ["Creatinine / eGFR", "", "", "", ""],
          ["ALT", "", "", "", ""],
          ["BMI / waist", "", "", "", ""],
          ["Haemoglobin", "", "", "", ""],
        ],
      },
    },
    {
      heading: "What to do with a number outside the range",
      list: [
        "Don't panic. Seek clarity.",
        "Ask for a repeat where one is usual: blood pressure, HbA1c, a mildly raised ALT.",
        "Bring the full report, not one line, to a clinician who can read it with your symptoms, history and medicines.",
        "Book the tests that travel together. High blood sugar, raised cholesterol and high blood pressure often share the same roots, so one panel can cover several numbers in a single visit.",
      ],
    },
  ],
  sources: [
    { label: "WHO Global Hypertension Report 2023" },
    { label: "AHA/ACC 2017 hypertension guideline" },
    { label: "ADA Standards of Care 2024; WHO 2006 diabetes criteria" },
    { label: "NCEP ATP III; ACC/AHA 2018 cholesterol guidelines" },
    { label: "KDIGO 2012 CKD staging; National Kidney Foundation eGFR bands" },
    { label: "WHO 2011 haemoglobin reference values" },
    { label: "Ghana Health Service national surveys" },
    { label: "High blood pressure in Ghana: the silent killer", url: "/blog/high-blood-pressure-silent-killer" },
    { label: "Prediabetes: the warning window", url: "/blog/prediabetes-warning-signs" },
    { label: "What is HbA1c?", url: "/blog/hba1c-explained" },
    { label: "Lipid profile: how to read your results", url: "/blog/lipid-profile-cholesterol-test" },
    { label: "Creatinine and eGFR", url: "/blog/creatinine-egfr-kidney-function" },
    { label: "Liver function tests (ALT, AST)", url: "/blog/liver-function-tests-explained" },
    { label: "Full blood count (FBC)", url: "/blog/full-blood-count-explained" },
    { label: "Preventive health screening in Ghana", url: "/blog/preventive-health-screening-ghana" },
  ],
  cta: { panelSlug: "panorama", label: "Check all eight in one visit" },
};
