// Lead magnet 6 (middle of funnel): a decoder for 22 terms that appear on
// Ghanaian lab reports. Every band is copied from the vetted biomarker
// articles; where an article gives no band (bilirubin, urea, uric acid) the
// row says so and points to the range on the person's own report.
export default {
  slug: "read-your-results",
  kind: "guide",
  title: "How to Read Your Lab Results",
  shortTitle: "Read Your Results",
  eyebrow: "Free guide",
  promise:
    "A plain-English decoder for 22 terms on a Ghanaian lab report, what an H or L flag does and does not mean, and five questions to ask your doctor.",
  description:
    "A plain-English decoder for 22 terms on a Ghanaian lab report, what an H or L flag does and does not mean, and five questions to ask your doctor. Free PDF.",
  stage: "middle",
  panelSlugs: ["panorama", "metabolix"],
  format: "3-page PDF",
  pdf: "/guides/read-your-results.pdf",
  bullets: [
    "22 terms decoded: FBC, blood sugar, cholesterol, liver, kidneys, urine, CRP, uric acid, thyroid, PSA",
    "The widely used bands, with their sources, where they exist",
    "What an H or L flag means, and what it does not",
    "Five questions to ask your doctor about a result",
  ],
  sections: [
    {
      heading: "How to use this decoder",
      paragraphs: [
        "A lab report lists tests, results, units and a reference range, often with an H or L flag next to anything outside it. This decoder explains, in plain English, what the most common terms on a Ghanaian report are a clue for, and gives the widely used bands where they exist. Where no single band applies, the range printed on your own report is the one to use, and your clinician is the one to ask.",
        "One result outside the reference range needs context before conclusions. Read it with symptoms, history, medicines and other tests where needed.",
      ],
    },
    {
      heading: "Blood count (FBC)",
      table: {
        caption: "Full blood count (WHO 2011; standard clinical reference intervals)",
        headers: ["Term", "What it is a clue for", "Widely used band"],
        rows: [
          [
            "Haemoglobin (Hb)",
            "How much oxygen your blood can carry. Low is anaemia, the most common FBC finding in Ghana",
            "Men 130 to 175 g/L; women 120 to 155 g/L. Below 80 g/L needs urgent review",
          ],
          [
            "WBC (white blood cells)",
            "Your immune response. Raised with infection or inflammation; low with some viral illnesses and medicines",
            "4.0 to 11.0 ×10⁹/L",
          ],
          [
            "Platelets",
            "Clotting. Low can mean bruising and bleeding risk; malaria is a common cause of a low count in Ghana",
            "150 to 400 ×10⁹/L",
          ],
          [
            "MCV",
            "The size of your red cells. Points toward the cause of anaemia",
            "80 to 100 fL. Below 80 often iron deficiency; above 100 often B12 or folate",
          ],
        ],
      },
    },
    {
      heading: "Blood sugar",
      table: {
        caption: "Blood sugar (WHO / ADA)",
        headers: ["Term", "What it is a clue for", "Widely used band"],
        rows: [
          [
            "HbA1c",
            "Your average blood sugar over roughly the past two to three months",
            "Below 5.7% normal; 5.7 to 6.4% prediabetes; 6.5% or above diabetes",
          ],
          [
            "Fasting glucose",
            "Blood sugar after at least eight hours without food",
            "Below 5.6 mmol/L normal; 5.6 to 6.9 prediabetes; 7.0 or above diabetes (ADA). WHO starts impaired fasting glucose at 6.1",
          ],
        ],
      },
      after: [
        "Sickle cell trait and iron-deficiency anaemia can make HbA1c read falsely high or low. A clinician who knows your blood picture should read it.",
      ],
    },
    {
      heading: "Cholesterol (lipid profile)",
      table: {
        caption: "Lipid profile (NCEP ATP III; ACC/AHA 2018)",
        headers: ["Term", "What it is a clue for", "Widely used band"],
        rows: [
          [
            "Total cholesterol",
            "All cholesterol-carrying particles added together",
            "Below 5.2 mmol/L desirable; 5.2 to 6.2 borderline high; 6.2 or above high",
          ],
          [
            "LDL",
            "The particle that deposits cholesterol in artery walls. The number clinicians watch most",
            "Below 2.6 mmol/L optimal; 2.6 to 3.3 near optimal; 3.4 to 4.1 borderline high; 4.1 or above high. Lower targets for higher-risk people",
          ],
          [
            "HDL",
            "The particle that carries cholesterol away. Higher is better",
            "Below 1.0 mmol/L (men) or 1.3 (women) counts as a risk factor; 1.6 or above is protective",
          ],
          [
            "Triglycerides",
            "Stored fat released between meals. Rises with refined carbohydrate, sugar and alcohol",
            "Below 1.7 mmol/L normal; 1.7 to 2.2 borderline; 2.3 to 5.6 high; 5.7 or above very high, review urgently",
          ],
        ],
      },
      after: [
        "The lipid profile needs a 9 to 12 hour fast. Some reports print a total-to-HDL ratio; below 4.0 generally means lower risk.",
      ],
    },
    {
      heading: "Liver",
      table: {
        caption: "Liver function (typical adult reference intervals; vary by lab)",
        headers: ["Term", "What it is a clue for", "Widely used band"],
        rows: [
          [
            "ALT",
            "An enzyme that leaks from injured liver cells. The more liver-specific of the two",
            "Roughly 7 to 56 U/L",
          ],
          [
            "AST",
            "Also released by muscle and heart, so it is read together with ALT",
            "Roughly 10 to 40 U/L",
          ],
          [
            "Bilirubin",
            "A waste product the liver clears. Reflects how well the liver is working rather than cell damage",
            "No single band in our sources. Use the range on your report and ask your clinician for the target that applies to you",
          ],
        ],
      },
      after: [
        "A mildly raised ALT or AST is common and often temporary after exercise, a viral illness, or a new medicine or supplement, so it is often repeated in a few weeks.",
      ],
    },
    {
      heading: "Kidneys",
      table: {
        caption: "Kidney function (KDIGO 2012; National Kidney Foundation)",
        headers: ["Term", "What it is a clue for", "Widely used band"],
        rows: [
          [
            "Creatinine",
            "A muscle waste product healthy kidneys filter out. Rises as filtering slows",
            "About 60 to 110 micromol/L (men), 45 to 90 (women); varies by lab and muscle mass",
          ],
          [
            "eGFR",
            "An estimate of how well your kidneys filter, from creatinine, age and sex",
            "90 or above normal; 60 to 89 mild decrease; 30 to 59 moderate; 15 to 29 severe; below 15 kidney failure. Under 60 is usually followed up",
          ],
          [
            "Urea",
            "Another waste product the kidneys clear. Read alongside creatinine",
            "No single band in our sources. Use the range on your report and ask your clinician for the target that applies to you",
          ],
        ],
      },
      after: [
        "Creatinine and eGFR move in opposite directions. Clinicians usually want the trend over at least two tests, generally three months apart, before concluding that kidney function has changed.",
      ],
    },
    {
      heading: "Urine",
      table: {
        caption: "Routine urine test (standard dipstick reference)",
        headers: ["Term", "What it is a clue for", "Widely used band"],
        rows: [
          [
            "Urine protein",
            "A possible early sign the kidneys' filters are leaking. A trace after exercise, fever or dehydration is usually harmless",
            "Negative or trace is normal. Persistent protein is followed up with a blood kidney test",
          ],
          [
            "Urine glucose",
            "Sugar spilling into urine, usually when blood sugar has risen past the kidneys' limit",
            "Negative is normal. A positive result is followed up with a blood sugar test",
          ],
        ],
      },
    },
    {
      heading: "Inflammation, uric acid, thyroid, prostate",
      table: {
        caption: "Other common markers",
        headers: ["Term", "What it is a clue for", "Widely used band"],
        rows: [
          [
            "CRP",
            "A protein the liver makes when anything is inflamed: infection, injury, an autoimmune flare. It says something is inflamed, not where or why",
            "Standard CRP below roughly 10 mg/L is normal; exact cutoffs vary by lab",
          ],
          [
            "Uric acid",
            "A waste product from purines. High levels can form crystals that cause gout and kidney stones",
            "No single universal number: ranges differ by lab and by sex. Use the range on your report",
          ],
          [
            "TSH",
            "The pituitary's signal to the thyroid. A high TSH means an underactive thyroid, not an overactive one",
            "Roughly 0.4 to 4.0 mIU/L; shifts in pregnancy and by lab",
          ],
          [
            "PSA",
            "A protein made by the prostate. A screening tool, not a cancer diagnosis. Enlargement, infection, recent ejaculation and exercise all raise it",
            "Most labs flag above roughly 4 ng/mL; the right threshold rises with age",
          ],
        ],
      },
    },
    {
      heading: "What a flag (H or L) means, and does not mean",
      list: [
        "It means: this result sits outside the reference range the lab uses for most people.",
        "It does not mean: you have a disease. Reference ranges describe most healthy people, and some healthy people fall just outside them.",
        "It does not mean: the result is wrong. But dehydration, a recent meal, exercise, illness and medicines can all move a number for a day or two.",
        "Muscle mass, sex, age and pregnancy shift several ranges, and labs differ. A result just over a line is not the same as a result far over it.",
        "A flag is a reason to read the result with your history, and often to repeat it. Don't panic. Seek clarity.",
      ],
    },
    {
      heading: "Five questions to ask your doctor about a result",
      ordered: true,
      list: [
        "Is this outside the range by a little or a lot, and does that change what we do?",
        "Could anything I did, ate or took in the days before the test explain it?",
        "Should we repeat it, and when?",
        "Which other results on this report should be read together with it?",
        "What is the target that applies to me, and what would move this number in the right direction?",
      ],
    },
    {
      heading: "Keep your reports",
      paragraphs: [
        "A single result is a snapshot. The trend across two or three reports tells a clinician far more. Keep every report, or let your BetterHealth dashboard keep them for you, so each new result has something to be compared against.",
      ],
    },
  ],
  sources: [
    { label: "WHO 2011 haemoglobin reference values; standard clinical reference intervals" },
    { label: "WHO / ADA HbA1c thresholds; ADA Standards of Care 2024; WHO 2006 criteria" },
    { label: "NCEP ATP III; ACC/AHA 2018 cholesterol guidelines" },
    { label: "KDIGO 2012 CKD staging; National Kidney Foundation eGFR bands" },
    { label: "American Thyroid Association guidance on TSH reference intervals" },
    { label: "AHA / CDC framework for hs-CRP (standard CRP bands are lab reference ranges)" },
    { label: "Full blood count (FBC)", url: "/blog/full-blood-count-explained" },
    { label: "What is HbA1c?", url: "/blog/hba1c-explained" },
    { label: "Diabetes tests explained", url: "/blog/diabetes-test-types-explained" },
    { label: "Lipid profile: how to read your results", url: "/blog/lipid-profile-cholesterol-test" },
    { label: "Liver function tests (ALT, AST)", url: "/blog/liver-function-tests-explained" },
    { label: "Creatinine and eGFR", url: "/blog/creatinine-egfr-kidney-function" },
    { label: "Urinalysis: how to read a routine urine test", url: "/blog/urinalysis-explained" },
    { label: "CRP and ESR: inflammation markers", url: "/blog/crp-inflammation-test" },
    { label: "Uric acid test and gout", url: "/blog/uric-acid-gout-test" },
    { label: "Thyroid function and TSH", url: "/blog/thyroid-tsh-test-explained" },
    { label: "PSA test: prostate screening for men", url: "/blog/psa-prostate-test" },
  ],
  cta: { panelSlug: "panorama", label: "Get results explained in plain English" },
};
