// Lead magnet 3 (top of funnel). Test mappings use only what the vetted
// articles say clinicians check first for each condition, and only the panels
// / tests listed in content.js. Prevalence figures (one in four Ghanaians
// with sickle cell trait) are the ones the FBC and HbA1c articles state.
export default {
  slug: "family-health-map",
  kind: "guide",
  title: "Your Family Health Map",
  shortTitle: "Family Health Map",
  eyebrow: "Free guide",
  promise:
    "A worksheet to map what runs in your family, the tests clinicians usually start with for each condition, and five questions to ask an older relative this weekend.",
  description:
    "A worksheet to map what runs in your family, the tests clinicians usually start with for each condition, and five questions to ask a relative. Free PDF.",
  stage: "top",
  panelSlugs: ["panorama", "cardion", "dialics"],
  format: "2-page PDF",
  pdf: "/guides/family-health-map.pdf",
  bullets: [
    "Why family history changes when you should test, not whether you are well",
    "A fill-in grid: relatives down the side, conditions across the top",
    "For each condition, the tests clinicians usually start with",
    "Five questions to ask an older relative",
  ],
  sections: [
    {
      heading: "Why family history matters",
      paragraphs: [
        "Many of the conditions that are common in Ghana run in families: high blood pressure, diabetes, kidney disease, heart disease and stroke, sickle cell, gout, thyroid trouble and prostate cancer. Sharing a family does not mean sharing a diagnosis. It means some numbers are worth checking earlier and more often, while there is still plenty of time to act.",
        "Knowing what runs in your family turns a vague worry into a short, specific list of tests, and a conversation with a clinician about when to start.",
      ],
      callout:
        "A family history raises the chance of a condition. It does not decide it. It does change the timing: screen earlier and more often, guided by a doctor, and use the results to make a better health decision.",
    },
    {
      heading: "Your family map",
      paragraphs: [
        "Tick, or write a word, for what you know. 'Not sure' is a fine answer; it tells you who to ask.",
      ],
      table: {
        fillIn: true,
        caption: "What runs in my family",
        headers: [
          "Relative",
          "High blood pressure",
          "Diabetes",
          "Stroke",
          "Heart disease",
          "Kidney disease",
          "Sickle cell",
          "Other",
        ],
        rows: [
          ["Mother", "", "", "", "", "", "", ""],
          ["Father", "", "", "", "", "", "", ""],
          ["Brothers and sisters", "", "", "", "", "", "", ""],
          ["Grandparents (mother's side)", "", "", "", "", "", "", ""],
          ["Grandparents (father's side)", "", "", "", "", "", "", ""],
          ["Aunts and uncles", "", "", "", "", "", "", ""],
        ],
      },
    },
    {
      heading: "If this runs in your family, these are the tests clinicians usually start with",
      table: {
        caption: "Family history and the first tests",
        headers: ["Runs in the family", "Usually checked first", "BetterHealth panel"],
        rows: [
          [
            "High blood pressure",
            "A blood pressure reading (at least once a year for every adult), kidney function (creatinine and eGFR), blood sugar",
            "Complete Health Check (Panorama); Heart Health Check (Cardion) for a focused look",
          ],
          [
            "Diabetes",
            "HbA1c and fasting blood sugar, earlier and more often than the general guide",
            "Blood Sugar Check (Dialics)",
          ],
          [
            "Stroke or heart disease",
            "Lipid profile (cholesterol), blood pressure, blood sugar, and often CRP",
            "Complete Health Check (Panorama) for the lipid profile; Heart Health Check (Cardion)",
          ],
          [
            "Kidney disease",
            "Creatinine and eGFR, plus a urine test for protein",
            "Core Health Check (Metabolix) or Complete Health Check (Panorama)",
          ],
          [
            "Sickle cell",
            "A full blood count, and a haemoglobin electrophoresis test to identify your genotype",
            "Full Blood Count (single test); ask about electrophoresis",
          ],
          [
            "Gout or kidney stones",
            "Uric acid, read with kidney function",
            "Complete Health Check (Panorama) or Heart Health Check (Cardion)",
          ],
          [
            "Thyroid problems",
            "TSH, usually with free T4",
            "Women's Health Check (Empress) includes thyroid function",
          ],
          [
            "Prostate cancer (a father or brother)",
            "A PSA conversation with a doctor from around age 40 to 45",
            "Men's Health Check (Alpha)",
          ],
        ],
      },
      after: [
        "As a general guide: ages 18 to 39 with no risk factors, a baseline screen then every two to three years; 40 and above, every one to two years; with a family history of diabetes, high blood pressure, kidney or heart disease, earlier and more often, guided by a doctor.",
      ],
    },
    {
      heading: "Why the same conditions keep appearing together",
      paragraphs: [
        "High blood pressure and diabetes are the two leading causes of kidney damage in Ghana. High blood sugar tends to raise triglycerides and lower HDL cholesterol. Gout shares risk factors with fatty liver and kidney trouble. So if one column on your map fills up, the tests in the neighbouring columns are usually worth doing at the same time. They share roots, and one panel often covers several.",
      ],
    },
    {
      heading: "One caveat if sickle cell is on your map",
      paragraphs: [
        "Around one in four Ghanaians carries the sickle cell trait, and it can make the HbA1c blood sugar test read falsely high or low. If sickle cell is on your map, tell the clinician reading your results. A fasting glucose test or an oral glucose tolerance test can stand in.",
      ],
    },
    {
      heading: "Five questions to ask an older relative this weekend",
      ordered: true,
      list: [
        "Has anyone in our family been told they have pressure (high blood pressure), sugar (diabetes) or kidney trouble? Who, and at roughly what age?",
        "Did anyone have a stroke or a heart problem before 60?",
        "Does anyone carry the sickle cell trait, or has anyone had sickle cell disease?",
        "Has anyone had gout, thyroid trouble, or, for the men, prostate problems?",
        "What did our grandparents pass away from, if you know?",
      ],
      after: [
        "Write the answers straight onto the map. You do not need the exact medical names. 'She was on tablets for pressure' is useful information.",
      ],
    },
    {
      heading: "What to do with a full map",
      list: [
        "Bring the map to a clinician. It opens the conversation and shortens the visit.",
        "Book the tests in the table that match your fullest columns. One panel often covers several.",
        "Keep the map. Update it as you learn more, and share a copy with your brothers and sisters.",
      ],
    },
  ],
  sources: [
    { label: "Ghana Health Service national surveys" },
    { label: "WHO Global Hypertension Report 2023; AHA/ACC 2017" },
    { label: "ADA Standards of Care 2024" },
    { label: "NCEP ATP III; ACC/AHA 2018 cholesterol guidelines" },
    { label: "KDIGO 2012 CKD staging" },
    { label: "WHO 2011 haemoglobin reference values" },
    { label: "Preventive health screening in Ghana", url: "/blog/preventive-health-screening-ghana" },
    { label: "High blood pressure in Ghana", url: "/blog/high-blood-pressure-silent-killer" },
    { label: "Prediabetes: the warning window", url: "/blog/prediabetes-warning-signs" },
    { label: "Creatinine and eGFR", url: "/blog/creatinine-egfr-kidney-function" },
    { label: "Full blood count (FBC)", url: "/blog/full-blood-count-explained" },
    { label: "Uric acid test and gout", url: "/blog/uric-acid-gout-test" },
    { label: "Thyroid function and TSH", url: "/blog/thyroid-tsh-test-explained" },
    { label: "PSA test: prostate screening for men", url: "/blog/psa-prostate-test" },
  ],
  cta: { panelSlug: "panorama", label: "Book the check that covers the map" },
};
