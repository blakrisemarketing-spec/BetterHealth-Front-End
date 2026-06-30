import { testPanels } from "./content";

const details = {
  titan: {
    description:
      "A focused screening panel designed to catch diabetes and its early complications. It measures your current blood sugar, your 3-month average, and checks whether high sugar has started affecting your kidneys or cholesterol.",
    whoShouldTest: [
      "Family history of diabetes",
      "Overweight or inactive lifestyle",
      "Frequently thirsty or urinating often",
      "Over 35 years old",
    ],
    preparation: "Fast for 8–12 hours before the test. Water is fine — avoid food, juice, and coffee.",
    sampleType: "Blood + Urine",
    turnaround: "48–72 hours",
    testDetails: [
      { name: "Fasting Glucose", measures: "Your blood sugar level after an overnight fast", why: "Catches diabetes or pre-diabetes right now." },
      { name: "HbA1c", measures: "Your average blood sugar over the last 3 months", why: "Shows the bigger picture — one good reading can't hide 3 bad months." },
      { name: "Lipid Profile", measures: "Total cholesterol, LDL, HDL, and triglycerides", why: "Diabetes often brings cholesterol problems. This catches both at once." },
      { name: "Renal Function", measures: "Creatinine, urea, and electrolyte levels", why: "High blood sugar damages kidneys silently. This checks early." },
      { name: "Urine R/E", measures: "Sugar, protein, and other markers in your urine", why: "Protein in urine is one of the earliest signs of kidney stress from diabetes." },
    ],
    faqs: [
      { q: "What if my results are normal?", a: "Great news — but diabetes risk changes over time. We recommend retesting once a year, especially if you have family history." },
      { q: "Can I eat before this test?", a: "No — you need to fast for 8–12 hours beforehand. Drink water freely, but skip food, juice, and coffee." },
      { q: "What happens if diabetes is detected?", a: "Your results come with a clinician review. If anything needs attention, we'll recommend next steps — which may include our Diabetes Management Program." },
    ],
  },

  stallion: {
    description:
      "Heart disease is the leading cause of death in Ghana, yet it's almost entirely preventable when caught early. Stallion checks the markers that predict heart attacks and strokes — before symptoms appear.",
    whoShouldTest: [
      "Family history of heart disease or stroke",
      "High blood pressure or on BP medication",
      "Smoker or former smoker",
      "Overweight, high-stress lifestyle, or over 40",
    ],
    preparation: "Fast for 8–12 hours before the test. Water is fine.",
    sampleType: "Blood",
    turnaround: "48–72 hours",
    testDetails: [
      { name: "Lipid Profile", measures: "Total cholesterol, LDL, HDL, and triglycerides", why: "The core heart-risk markers — tells you if your arteries are clogging." },
      { name: "Fasting Glucose", measures: "Blood sugar after fasting", why: "High blood sugar damages blood vessels and increases heart attack risk." },
      { name: "HbA1c", measures: "3-month blood sugar average", why: "Catches insulin resistance before it becomes full diabetes — a major heart risk factor." },
      { name: "Uric Acid", measures: "Uric acid level in blood", why: "High uric acid is linked to gout, kidney stones, and increased cardiovascular risk." },
      { name: "CRP", measures: "C-reactive protein — a marker of inflammation", why: "Chronic inflammation is a hidden driver of heart disease. CRP catches it." },
    ],
    faqs: [
      { q: "I feel fine — do I still need this?", a: "Heart disease is called the 'silent killer' because it often has no symptoms until a heart attack or stroke. This panel catches risk factors early, while they're still reversible." },
      { q: "How often should I repeat this test?", a: "If your results are normal, once a year. If anything is elevated, your clinician may recommend retesting in 3–6 months." },
      { q: "What's the difference between Stallion and Panorama?", a: "Stallion focuses specifically on heart and circulation markers. Panorama covers your whole body including heart markers — choose Panorama if you want the full picture." },
    ],
  },

  engine: {
    description:
      "Engine is your foundational metabolic health check. It covers blood sugar, liver, kidneys, and cholesterol in one go — the full engine room that keeps your body running. Ideal as an annual baseline.",
    whoShouldTest: [
      "Anyone wanting a thorough annual check-up",
      "Taking medications that affect the liver or kidneys",
      "Unexplained weight changes or fatigue",
      "Over 30 and haven't tested in a while",
    ],
    preparation: "Fast for 8–12 hours before the test. Water is fine.",
    sampleType: "Blood",
    turnaround: "48–72 hours",
    testDetails: [
      { name: "Fasting Glucose", measures: "Blood sugar after fasting", why: "The first checkpoint for diabetes and pre-diabetes." },
      { name: "HbA1c", measures: "3-month blood sugar average", why: "One morning reading can't tell the whole story — this does." },
      { name: "Lipid Profile", measures: "Total cholesterol, LDL, HDL, and triglycerides", why: "Reveals whether your arteries are healthy or silently clogging." },
      { name: "Liver Function", measures: "ALT, AST, ALP, bilirubin, total protein, albumin", why: "Catches liver stress from alcohol, medications, fatty liver, or hepatitis." },
      { name: "Renal Function", measures: "Creatinine, urea, and electrolytes", why: "Your kidneys filter waste — this checks if they're keeping up." },
      { name: "Uric Acid", measures: "Uric acid level in blood", why: "High levels cause gout and indicate metabolic stress." },
    ],
    faqs: [
      { q: "How is Engine different from Panorama?", a: "Engine covers the metabolic essentials — blood sugar, liver, kidneys, and cholesterol. Panorama adds thyroid, inflammation markers, blood count, and urine analysis for a head-to-toe view." },
      { q: "I'm on medication — should I still fast?", a: "Take your medications as normal with a small sip of water. The fast is about food and drinks, not your prescribed medications." },
      { q: "Is this panel right for a first-time check-up?", a: "Yes — Engine is one of the best starting points if you haven't tested before. It covers the organs that silently deteriorate first." },
    ],
  },

  honour: {
    description:
      "Your liver and kidneys work silently every day — filtering toxins, balancing fluids, processing everything you eat and drink. By the time you feel symptoms, damage can be advanced. Honour catches problems early.",
    whoShouldTest: [
      "Regular alcohol consumption",
      "Taking long-term medications (painkillers, supplements, prescriptions)",
      "Family history of kidney or liver disease",
      "Frequent urinary tract issues or swelling",
    ],
    preparation: "No special fasting required, but morning collection is preferred.",
    sampleType: "Blood + Urine",
    turnaround: "48–72 hours",
    testDetails: [
      { name: "Liver Function", measures: "ALT, AST, ALP, bilirubin, total protein, albumin", why: "Detects liver inflammation, fatty liver, hepatitis damage, and alcohol-related stress." },
      { name: "Renal Function", measures: "Creatinine, urea, electrolytes (sodium, potassium, chloride)", why: "Shows how well your kidneys are filtering waste and balancing your body's chemistry." },
      { name: "Uric Acid", measures: "Uric acid level in blood", why: "High levels can cause gout and signal kidney overload." },
      { name: "Urine R/E", measures: "Protein, glucose, blood, bacteria, and casts in urine", why: "A simple urine sample reveals kidney infections, stones, or early kidney disease." },
    ],
    faqs: [
      { q: "I don't drink alcohol — do I still need this?", a: "Absolutely. Non-alcoholic fatty liver disease is increasingly common and has nothing to do with drinking. Medications, diet, and genetics all affect your liver." },
      { q: "Can kidney damage be reversed?", a: "Early-stage kidney problems can often be managed and even reversed with the right treatment. That's why catching it early matters so much." },
      { q: "What does protein in urine mean?", a: "Small amounts of protein in urine (microalbuminuria) are one of the earliest signs that your kidneys are under stress — often from diabetes or high blood pressure." },
    ],
  },

  prime: {
    description:
      "Your thyroid is a small gland in your neck that controls your metabolism, energy, mood, and weight. When it's off — even slightly — everything feels wrong. Prime measures the hormones that tell the full story.",
    whoShouldTest: [
      "Unexplained weight gain or weight loss",
      "Persistent fatigue, brain fog, or mood changes",
      "Family history of thyroid disorders",
      "Women planning pregnancy or with irregular periods",
    ],
    preparation: "No fasting required. Best done in the morning before taking thyroid medication (if applicable).",
    sampleType: "Blood",
    turnaround: "48–72 hours",
    testDetails: [
      { name: "Thyroid Function Test (TFT)", measures: "TSH, Free T3, and Free T4 hormone levels", why: "TSH tells your thyroid what to do. T3 and T4 are the hormones it produces. Together they reveal if your thyroid is overactive, underactive, or just right." },
    ],
    faqs: [
      { q: "What's the difference between hypothyroid and hyperthyroid?", a: "Hypothyroid means your thyroid is underactive — symptoms include fatigue, weight gain, and feeling cold. Hyperthyroid is overactive — causing weight loss, anxiety, and rapid heartbeat. This test detects both." },
      { q: "I'm already on thyroid medication — should I test?", a: "Yes — regular monitoring ensures your dosage is correct. Do the test before taking your morning dose for the most accurate reading." },
      { q: "Can thyroid problems cause hair loss?", a: "Yes. Both overactive and underactive thyroid can cause thinning hair. If thyroid is the cause, treatment usually brings it back." },
    ],
  },

  aura: {
    description:
      "A comprehensive, completely confidential sexual health screening. Results go straight to your private dashboard — no one else sees them. Covers the infections that are most common in Ghana and often show no symptoms.",
    whoShouldTest: [
      "Sexually active and haven't tested recently",
      "New relationship or multiple partners",
      "Planning to start a family",
      "Experiencing unusual symptoms (discharge, sores, pain)",
    ],
    preparation: "No fasting or special preparation needed. Walk in any time.",
    sampleType: "Blood + Swab",
    turnaround: "48–72 hours (HIV rapid result available same day)",
    testDetails: [
      { name: "HIV", measures: "HIV-1 and HIV-2 antibodies and antigens", why: "Early detection means early treatment — and with modern medicine, a normal life expectancy." },
      { name: "Syphilis (VDRL)", measures: "Antibodies to the syphilis bacterium", why: "Syphilis is easily treated with antibiotics when caught early, but dangerous if left untreated." },
      { name: "Hepatitis B (HBsAg)", measures: "Hepatitis B surface antigen", why: "Hep B is very common in Ghana and often has no symptoms. Knowing your status protects you and your partner." },
      { name: "Hepatitis C", measures: "Hepatitis C antibodies", why: "Hep C damages the liver silently over years. Modern treatments can cure it completely when found early." },
      { name: "Chlamydia", measures: "Chlamydia trachomatis DNA", why: "The most common STI worldwide — 70% of infected people have zero symptoms. Untreated, it causes infertility." },
      { name: "Gonorrhoea", measures: "Neisseria gonorrhoeae DNA", why: "Increasingly antibiotic-resistant. Early detection ensures effective treatment before complications." },
    ],
    faqs: [
      { q: "Is this really confidential?", a: "Completely. Your results appear only in your personal BetterHealth dashboard. We don't share results with anyone — not partners, not employers, not family. Your login is your key." },
      { q: "What if I test positive for something?", a: "Most STIs are treatable or manageable with modern medicine. Your clinician review will include clear next steps and treatment recommendations." },
      { q: "Can I do this test at home?", a: "Some components (blood tests) are available via home collection. Swab-based tests (chlamydia, gonorrhoea) are best done at a partner lab for accuracy." },
      { q: "How soon after exposure should I test?", a: "Most infections are detectable 2–4 weeks after exposure. For HIV, the window period can be up to 3 months for the most accurate result." },
    ],
  },

  alpha: {
    description:
      "A targeted health panel for men, covering the markers that matter most — prostate health, testosterone levels, heart risk, and blood count. Designed for men who want to stay on top of their health without guessing.",
    whoShouldTest: [
      "Men over 40 (prostate screening recommended)",
      "Low energy, reduced drive, or mood changes",
      "Family history of prostate cancer",
      "Haven't had a health check in over a year",
    ],
    preparation: "Fast for 8–12 hours before the test. Avoid vigorous exercise and ejaculation 24 hours before (affects PSA accuracy).",
    sampleType: "Blood",
    turnaround: "48–72 hours",
    testDetails: [
      { name: "PSA", measures: "Prostate-Specific Antigen level", why: "The standard screening marker for prostate health. Elevated PSA warrants further investigation — early detection saves lives." },
      { name: "Testosterone", measures: "Total testosterone level", why: "Controls energy, muscle mass, mood, and libido. Low testosterone is common after 40 and very treatable." },
      { name: "Lipid Profile", measures: "Total cholesterol, LDL, HDL, and triglycerides", why: "Heart disease is the #1 killer of men. This catches the risk factors." },
      { name: "Fasting Glucose", measures: "Blood sugar after fasting", why: "Diabetes risk increases with age — catching pre-diabetes means you can reverse it." },
      { name: "FBC", measures: "Full blood count — red cells, white cells, platelets, haemoglobin", why: "Reveals anaemia, infections, and blood disorders. The most fundamental blood test." },
    ],
    faqs: [
      { q: "At what age should men start PSA testing?", a: "Generally from age 40, or earlier if you have a family history of prostate cancer. Talk to your clinician about your individual risk." },
      { q: "What if my testosterone is low?", a: "Low testosterone is very common and treatable. Your clinician review will include recommendations — lifestyle changes are often enough, and hormone therapy is available if needed." },
      { q: "Is this panel only for older men?", a: "No — men of any age benefit from knowing their baseline. In fact, testing young gives you a reference point to compare against as you age." },
    ],
  },

  empress: {
    description:
      "A hormone panel designed specifically for women. Whether you're dealing with irregular periods, planning a pregnancy, or just want to understand your body better — Empress gives you clarity on the hormones that drive it all.",
    whoShouldTest: [
      "Irregular, painful, or absent periods",
      "Planning to conceive or struggling with fertility",
      "Unexplained mood swings, weight changes, or acne",
      "Approaching or going through perimenopause",
    ],
    preparation: "No fasting required. Best done on day 2–5 of your menstrual cycle for the most accurate results (your clinician can advise).",
    sampleType: "Blood",
    turnaround: "48–72 hours",
    testDetails: [
      { name: "FSH", measures: "Follicle-Stimulating Hormone level", why: "Controls egg development. High FSH can indicate low ovarian reserve or approaching menopause." },
      { name: "LH", measures: "Luteinising Hormone level", why: "Triggers ovulation. The FSH-to-LH ratio helps diagnose PCOS and other hormonal conditions." },
      { name: "Prolactin", measures: "Prolactin hormone level", why: "High prolactin can stop ovulation and cause irregular periods — and it's often easily treated." },
      { name: "Estradiol", measures: "The primary form of oestrogen", why: "Essential for bone health, fertility, and menstrual cycle regulation." },
      { name: "Progesterone", measures: "Progesterone hormone level", why: "Confirms whether ovulation occurred and supports early pregnancy. Low progesterone is a common cause of cycle irregularities." },
    ],
    faqs: [
      { q: "When in my cycle should I do this test?", a: "Day 2–5 of your period for FSH, LH, Prolactin, and Estradiol. Progesterone is ideally tested on day 21 (7 days after ovulation). Your clinician can guide you." },
      { q: "Can this test diagnose PCOS?", a: "It provides key markers used in PCOS diagnosis (FSH:LH ratio, testosterone if added). Combined with symptoms and possibly an ultrasound, your doctor can make a diagnosis." },
      { q: "I'm on birth control — will it affect my results?", a: "Yes — hormonal contraception suppresses your natural hormone levels. For the most accurate results, your clinician may recommend testing during a pill-free interval." },
    ],
  },

  vitality: {
    description:
      "Constant tiredness isn't normal. Vitality investigates the blood-level causes — anaemia, sickle cell trait, G6PD deficiency, and other conditions that are especially common in Ghana. If you're always tired, this panel finds out why.",
    whoShouldTest: [
      "Persistent fatigue or weakness",
      "Pale skin, dizziness, or shortness of breath",
      "Family history of sickle cell or blood disorders",
      "Heavy periods (a common cause of anaemia in women)",
    ],
    preparation: "No fasting required. Can be done at any time of day.",
    sampleType: "Blood",
    turnaround: "48–72 hours",
    testDetails: [
      { name: "FBC", measures: "Full blood count — red cells, white cells, platelets, haemoglobin, MCV, MCH", why: "The most comprehensive blood test. Reveals anaemia, infections, and blood cell abnormalities." },
      { name: "Haemoglobin Electrophoresis", measures: "Types of haemoglobin in your blood (AA, AS, SS, SC, etc.)", why: "Identifies sickle cell trait (AS) or sickle cell disease (SS) — critical knowledge for family planning in Ghana." },
      { name: "G6PD", measures: "Glucose-6-Phosphate Dehydrogenase enzyme level", why: "G6PD deficiency is common in West Africa. Certain foods and medications can trigger dangerous anaemia episodes if you have it." },
      { name: "Sickling Test", measures: "Whether your red blood cells sickle under low oxygen", why: "A quick confirmation alongside electrophoresis. Especially important before surgery or at high altitudes." },
    ],
    faqs: [
      { q: "What is sickle cell trait (AS)?", a: "If you carry the AS genotype, you have sickle cell trait — you're generally healthy, but if your partner also has AS, each child has a 25% chance of sickle cell disease (SS). Knowing your status is essential for family planning." },
      { q: "What is G6PD deficiency?", a: "It's a genetic condition common in Ghana where certain foods (like fava beans), medications (like some antimalarials), and infections can cause your red blood cells to break down. Knowing your G6PD status helps you avoid triggers." },
      { q: "Can anaemia be treated?", a: "In most cases, yes. Iron-deficiency anaemia responds well to supplements and diet changes. Other types may need different treatments — your results will guide the right approach." },
    ],
  },

  shield: {
    description:
      "Fever that won't go away? Shield checks for the most common causes in Ghana — malaria, typhoid, and infection markers — quickly and accurately. Stop guessing and start treating the right thing.",
    whoShouldTest: [
      "Fever lasting more than 2–3 days",
      "Recurring fevers or chills",
      "Recently travelled to a high-malaria area",
      "Feeling unwell with no clear cause",
    ],
    preparation: "No fasting required. Best done during or shortly after a fever episode for the most accurate results.",
    sampleType: "Blood",
    turnaround: "24–48 hours (malaria RDT result available same day)",
    testDetails: [
      { name: "Malaria RDT + Blood Film", measures: "Malaria parasites in your blood (rapid test + microscopy confirmation)", why: "The rapid test gives a quick answer. The blood film confirms it, identifies the species, and shows parasite load — critical for treatment decisions." },
      { name: "Typhoid Antibodies", measures: "Widal test for Salmonella typhi and paratyphi antibodies", why: "Typhoid is common in Ghana and shares symptoms with malaria. Testing both prevents wrong treatment." },
      { name: "FBC", measures: "Full blood count — white cells, platelets, haemoglobin", why: "High white cells suggest bacterial infection. Low platelets can indicate dengue or severe malaria. The FBC puts the picture together." },
      { name: "CRP", measures: "C-reactive protein — measures inflammation severity", why: "Tells your clinician how serious the infection is and helps monitor whether treatment is working." },
    ],
    faqs: [
      { q: "Can I test for malaria if I'm already on treatment?", a: "Yes, but results may be affected. A blood film can still detect parasites during treatment. Let your clinician know what medication you're taking." },
      { q: "Why test for typhoid and malaria together?", a: "Their symptoms overlap heavily — fever, headache, body aches. In Ghana, many people get treated for malaria when they actually have typhoid (or vice versa). Testing both ensures the right treatment." },
      { q: "How quickly can I get results?", a: "Malaria rapid test results are available the same day. Full blood film, typhoid, FBC, and CRP results come within 24–48 hours." },
    ],
  },

  panorama: {
    description:
      "The most comprehensive health screening panel we offer. Panorama checks your blood sugar, heart health, liver, kidneys, thyroid, blood count, and more — all in a single visit. If you only do one test this year, this is the one.",
    whoShouldTest: [
      "Anyone who wants a full health picture",
      "Haven't had a check-up in over a year",
      "Starting a new health or fitness goal",
      "Over 30 and want a baseline for the future",
    ],
    preparation: "Fast for 8–12 hours before the test. Water is fine. Best done as a morning appointment.",
    sampleType: "Blood + Urine",
    turnaround: "48–72 hours",
    testDetails: [
      { name: "Full Blood Count", measures: "Red cells, white cells, platelets, haemoglobin, and more", why: "The foundation of any health check — reveals anaemia, infections, and blood disorders." },
      { name: "HbA1c", measures: "3-month blood sugar average", why: "The gold standard for diabetes screening. One reading tells a 3-month story." },
      { name: "Fasting Glucose", measures: "Current blood sugar level", why: "Combines with HbA1c for the most complete diabetes picture." },
      { name: "Lipid Profile", measures: "Total cholesterol, LDL, HDL, triglycerides", why: "Checks whether your arteries are healthy and your heart risk is low." },
      { name: "Liver Function", measures: "ALT, AST, ALP, bilirubin, albumin, total protein", why: "Catches liver damage from alcohol, medications, fatty liver, or hepatitis — often with zero symptoms." },
      { name: "Renal Function", measures: "Creatinine, urea, electrolytes", why: "Your kidneys filter waste 24/7. This confirms they're keeping up." },
      { name: "Thyroid Function", measures: "TSH, Free T3, Free T4", why: "Controls metabolism, energy, mood, and weight. A small gland with a massive impact." },
      { name: "Uric Acid", measures: "Uric acid level", why: "High levels cause gout and indicate metabolic stress." },
      { name: "CRP", measures: "C-reactive protein — inflammation marker", why: "Chronic inflammation is a hidden driver of heart disease, diabetes, and cancer." },
      { name: "Urine R/E", measures: "Sugar, protein, blood, and bacteria in urine", why: "A simple sample that reveals kidney problems, UTIs, and diabetes spillover." },
    ],
    faqs: [
      { q: "Is Panorama worth the cost?", a: "Panorama costs less than booking the same tests individually. And catching one condition early can save you thousands in treatment costs — plus years of healthier living." },
      { q: "How often should I do Panorama?", a: "Once a year for most adults. If any results need monitoring, your clinician may recommend every 6 months." },
      { q: "Can I add extra tests to Panorama?", a: "Yes — you can add individual tests like PSA, testosterone, or specific hormones as add-ons during booking." },
      { q: "I'm young and feel healthy — do I need this?", a: "Many conditions — diabetes, high cholesterol, thyroid disorders — develop silently for years before symptoms appear. Testing young gives you a baseline and catches problems before they become serious." },
    ],
  },
};

export function getTestDetail(slug) {
  const panel = testPanels.find((p) => p.slug === slug);
  if (!panel) return null;
  const detail = details[slug];
  if (!detail) return null;
  return { ...panel, ...detail };
}

export function getAllTestSlugs() {
  return testPanels.map((p) => p.slug);
}
