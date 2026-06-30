import { testPanels } from "./content";

const details = {
  titan: {
    description:
      "A focused panel for diabetes and its early complications. It checks your blood sugar now, your average over the past three months, and whether high sugar has started to affect your kidneys or cholesterol.",
    whoShouldTest: [
      "Family history of diabetes",
      "Overweight or inactive lifestyle",
      "Often thirsty or passing urine more than usual",
      "Over 35 years old",
    ],
    preparation: "Fast for 8 to 12 hours before the test. Water is fine. Skip food, juice, and coffee.",
    sampleType: "Blood + Urine",
    turnaround: "48-72 hours",
    testDetails: [
      { name: "Fasting Glucose", measures: "Your blood sugar level after an overnight fast", why: "Catches diabetes or pre-diabetes right now." },
      { name: "HbA1c", measures: "Your average blood sugar over the last 3 months", why: "Shows the bigger picture. One good reading can't hide three bad months." },
      { name: "Lipid Profile", measures: "Total cholesterol, LDL, HDL, and triglycerides", why: "Diabetes often brings cholesterol problems along with it. This checks both at once." },
      { name: "Renal Function", measures: "Creatinine, urea, and electrolyte levels", why: "High blood sugar damages the kidneys quietly. This checks them early." },
      { name: "Urine R/E", measures: "Sugar, protein, and other markers in your urine", why: "Protein in the urine is one of the earliest signs that diabetes is stressing your kidneys." },
    ],
    faqs: [
      { q: "What if my results are normal?", a: "That's good to hear. Diabetes risk still changes over time, so we suggest you test once a year, especially if it runs in your family." },
      { q: "Can I eat before this test?", a: "No. You need to fast for 8 to 12 hours beforehand. Drink as much water as you like, but skip food, juice, and coffee." },
      { q: "What happens if diabetes is detected?", a: "A clinician reviews your results. If something needs attention, we'll talk you through the next steps, which may include our Diabetes Management Program." },
    ],
  },

  stallion: {
    description:
      "Heart disease is the leading cause of death in Ghana, and most of it can be prevented when it's caught early. Stallion checks the markers that warn of heart attacks and strokes before any symptoms show up.",
    whoShouldTest: [
      "Family history of heart disease or stroke",
      "High blood pressure or on BP medication",
      "Smoker or former smoker",
      "Overweight, under a lot of stress, or over 40",
    ],
    preparation: "Fast for 8 to 12 hours before the test. Water is fine.",
    sampleType: "Blood",
    turnaround: "48-72 hours",
    testDetails: [
      { name: "Lipid Profile", measures: "Total cholesterol, LDL, HDL, and triglycerides", why: "The core heart-risk markers. They show whether your arteries are clogging." },
      { name: "Fasting Glucose", measures: "Blood sugar after fasting", why: "High blood sugar damages blood vessels and raises your heart attack risk." },
      { name: "HbA1c", measures: "3-month blood sugar average", why: "Catches insulin resistance before it turns into full diabetes, which is a major heart risk factor." },
      { name: "Uric Acid", measures: "Uric acid level in blood", why: "High uric acid is linked to gout, kidney stones, and higher cardiovascular risk." },
      { name: "CRP", measures: "C-reactive protein, a marker of inflammation", why: "Chronic inflammation quietly drives heart disease. CRP catches it." },
    ],
    faqs: [
      { q: "I feel fine. Do I still need this?", a: "Heart disease is called the silent killer because it often has no symptoms until a heart attack or stroke. This panel catches risk factors early, while you can still turn them around." },
      { q: "How often should I repeat this test?", a: "Once a year if your results are normal. If anything is raised, your clinician may ask you to retest in three to six months." },
      { q: "What's the difference between Stallion and Panorama?", a: "Stallion focuses on heart and circulation markers. Panorama covers your whole body, heart markers included. Pick Panorama if you want the full picture." },
    ],
  },

  engine: {
    description:
      "Engine is your basic metabolic health check. It covers blood sugar, liver, kidneys, and cholesterol in one go, the engine room that keeps your body running. It works well as a yearly baseline.",
    whoShouldTest: [
      "Anyone wanting a thorough annual check-up",
      "Taking medications that affect the liver or kidneys",
      "Unexplained weight changes or fatigue",
      "Over 30 and haven't tested in a while",
    ],
    preparation: "Fast for 8 to 12 hours before the test. Water is fine.",
    sampleType: "Blood",
    turnaround: "48-72 hours",
    testDetails: [
      { name: "Fasting Glucose", measures: "Blood sugar after fasting", why: "The first checkpoint for diabetes and pre-diabetes." },
      { name: "HbA1c", measures: "3-month blood sugar average", why: "One morning reading can't tell the whole story. This one can." },
      { name: "Lipid Profile", measures: "Total cholesterol, LDL, HDL, and triglycerides", why: "Shows whether your arteries are healthy or quietly clogging." },
      { name: "Liver Function", measures: "ALT, AST, ALP, bilirubin, total protein, albumin", why: "Catches liver stress from alcohol, medications, fatty liver, or hepatitis." },
      { name: "Renal Function", measures: "Creatinine, urea, and electrolytes", why: "Your kidneys filter waste day and night. This checks whether they're keeping up." },
      { name: "Uric Acid", measures: "Uric acid level in blood", why: "High levels cause gout and point to metabolic stress." },
    ],
    faqs: [
      { q: "How is Engine different from Panorama?", a: "Engine covers the metabolic essentials: blood sugar, liver, kidneys, and cholesterol. Panorama adds thyroid, inflammation markers, blood count, and urine analysis for a head-to-toe view." },
      { q: "I'm on medication. Should I still fast?", a: "Take your medications as normal with a small sip of water. The fast is about food and drinks, not your prescribed medicines." },
      { q: "Is this panel right for a first-time check-up?", a: "Yes. Engine is one of the best places to start if you haven't tested before. It covers the organs that tend to fail quietly first." },
    ],
  },

  honour: {
    description:
      "Your liver and kidneys work quietly all day, filtering toxins, balancing fluids, and processing everything you eat and drink. By the time you feel symptoms, the damage can already be far along. Honour catches problems early.",
    whoShouldTest: [
      "Regular alcohol consumption",
      "Taking long-term medications (painkillers, supplements, prescriptions)",
      "Family history of kidney or liver disease",
      "Frequent urinary tract issues or swelling",
    ],
    preparation: "No special fasting required, but a morning sample is best.",
    sampleType: "Blood + Urine",
    turnaround: "48-72 hours",
    testDetails: [
      { name: "Liver Function", measures: "ALT, AST, ALP, bilirubin, total protein, albumin", why: "Picks up liver inflammation, fatty liver, hepatitis damage, and alcohol-related stress." },
      { name: "Renal Function", measures: "Creatinine, urea, electrolytes (sodium, potassium, chloride)", why: "Shows how well your kidneys filter waste and keep your body's chemistry balanced." },
      { name: "Uric Acid", measures: "Uric acid level in blood", why: "High levels can cause gout and point to kidney overload." },
      { name: "Urine R/E", measures: "Protein, glucose, blood, bacteria, and casts in urine", why: "A simple urine sample can reveal kidney infections, stones, or early kidney disease." },
    ],
    faqs: [
      { q: "I don't drink alcohol. Do I still need this?", a: "Yes. Non-alcoholic fatty liver disease is becoming common and has nothing to do with drinking. Medications, diet, and your genes all affect your liver." },
      { q: "Can kidney damage be reversed?", a: "Early kidney problems can often be managed and sometimes reversed with the right treatment. That's why catching them early matters so much." },
      { q: "What does protein in urine mean?", a: "Small amounts of protein in urine, called microalbuminuria, can be one of the earliest signs your kidneys are under stress, often from diabetes or high blood pressure." },
    ],
  },

  prime: {
    description:
      "Your thyroid is a small gland in your neck that controls your metabolism, energy, mood, and weight. When it's even a little off, everything can feel wrong. Prime measures the hormones that tell the full story.",
    whoShouldTest: [
      "Unexplained weight gain or weight loss",
      "Lasting fatigue, brain fog, or mood changes",
      "Family history of thyroid disorders",
      "Women planning pregnancy or with irregular periods",
    ],
    preparation: "No fasting required. Best done in the morning before you take thyroid medication, if you take any.",
    sampleType: "Blood",
    turnaround: "48-72 hours",
    testDetails: [
      { name: "Thyroid Function Test (TFT)", measures: "TSH, Free T3, and Free T4 hormone levels", why: "TSH tells your thyroid what to do. T3 and T4 are the hormones it produces. Together they show whether your thyroid is overactive, underactive, or just right." },
    ],
    faqs: [
      { q: "What's the difference between hypothyroid and hyperthyroid?", a: "Hypothyroid means your thyroid is underactive. You may feel tired, gain weight, and feel cold. Hyperthyroid means it's overactive, which can cause weight loss, anxiety, and a fast heartbeat. This test picks up both." },
      { q: "I'm already on thyroid medication. Should I test?", a: "Yes. Regular monitoring keeps your dose right. Do the test before your morning dose for the most accurate reading." },
      { q: "Can thyroid problems cause hair loss?", a: "Yes. Both overactive and underactive thyroid can thin your hair. When the thyroid is the cause, treatment usually brings it back." },
    ],
  },

  aura: {
    description:
      "A thorough, fully confidential sexual health screening. Results go straight to your private dashboard, where no one else sees them. It covers the infections that are most common in Ghana and that often show no symptoms.",
    whoShouldTest: [
      "Sexually active and haven't tested recently",
      "New relationship or multiple partners",
      "Planning to start a family",
      "Experiencing unusual symptoms (discharge, sores, pain)",
    ],
    preparation: "No fasting or special preparation needed. Walk in any time.",
    sampleType: "Blood + Swab",
    turnaround: "48-72 hours (HIV rapid result available same day)",
    testDetails: [
      { name: "HIV", measures: "HIV-1 and HIV-2 antibodies and antigens", why: "Finding it early means starting treatment early, and with today's medicine, a normal life expectancy." },
      { name: "Syphilis (VDRL)", measures: "Antibodies to the syphilis bacterium", why: "Syphilis treats easily with antibiotics when caught early, but it's dangerous if left alone." },
      { name: "Hepatitis B (HBsAg)", measures: "Hepatitis B surface antigen", why: "Hep B is very common in Ghana and often has no symptoms. Knowing your status protects you and your partner." },
      { name: "Hepatitis C", measures: "Hepatitis C antibodies", why: "Hep C damages the liver quietly over years. Today's treatments can cure it when it's found early." },
      { name: "Chlamydia", measures: "Chlamydia trachomatis DNA", why: "The most common STI worldwide. About 70% of infected people have no symptoms, and left untreated it can cause infertility." },
      { name: "Gonorrhoea", measures: "Neisseria gonorrhoeae DNA", why: "Harder to treat as it grows more antibiotic-resistant. Finding it early means treatment can work before complications set in." },
    ],
    faqs: [
      { q: "Is this really confidential?", a: "Yes, completely. Your results show only in your personal BetterHealth dashboard. We don't share them with anyone: not partners, not employers, not family. Your login is your key." },
      { q: "What if I test positive for something?", a: "Most STIs can be treated or managed with today's medicine. Your clinician review will lay out clear next steps and treatment recommendations." },
      { q: "Can I do this test at home?", a: "Some parts, the blood tests, can be done with home collection. The swab tests for chlamydia and gonorrhoea are best done at a partner lab for accuracy." },
      { q: "How soon after exposure should I test?", a: "Most infections can be picked up 2 to 4 weeks after exposure. For HIV, the window can be up to three months for the most accurate result." },
    ],
  },

  alpha: {
    description:
      "A focused health panel for men, covering the markers that matter most: prostate health, testosterone, heart risk, and blood count. It's for men who want to stay on top of their health instead of guessing.",
    whoShouldTest: [
      "Men over 40 (prostate screening recommended)",
      "Low energy, reduced drive, or mood changes",
      "Family history of prostate cancer",
      "Haven't had a health check in over a year",
    ],
    preparation: "Fast for 8 to 12 hours before the test. Avoid hard exercise and ejaculation for 24 hours before, since both affect PSA accuracy.",
    sampleType: "Blood",
    turnaround: "48-72 hours",
    testDetails: [
      { name: "PSA", measures: "Prostate-Specific Antigen level", why: "The standard screening marker for prostate health. A raised PSA calls for a closer look, and catching trouble early saves lives." },
      { name: "Testosterone", measures: "Total testosterone level", why: "Drives energy, muscle, mood, and libido. Low testosterone is common after 40 and very treatable." },
      { name: "Lipid Profile", measures: "Total cholesterol, LDL, HDL, and triglycerides", why: "Heart disease is the number one killer of men. This catches the risk factors." },
      { name: "Fasting Glucose", measures: "Blood sugar after fasting", why: "Diabetes risk climbs with age. Catching pre-diabetes means you can still turn it around." },
      { name: "FBC", measures: "Full blood count: red cells, white cells, platelets, haemoglobin", why: "Picks up anaemia, infections, and blood disorders. The most basic blood test there is." },
    ],
    faqs: [
      { q: "At what age should men start PSA testing?", a: "Usually from age 40, or earlier if prostate cancer runs in your family. Talk to your clinician about your own risk." },
      { q: "What if my testosterone is low?", a: "Low testosterone is common and treatable. Your clinician review will suggest what to do. Lifestyle changes are often enough, and hormone therapy is there if you need it." },
      { q: "Is this panel only for older men?", a: "No. Men of any age gain from knowing their baseline. Testing young gives you a reference point to compare against as you get older." },
    ],
  },

  empress: {
    description:
      "A hormone panel made for women. Whether you're dealing with irregular periods, planning a pregnancy, or you simply want to understand your body better, Empress gives you a clear read on the hormones behind it all.",
    whoShouldTest: [
      "Irregular, painful, or absent periods",
      "Planning to conceive or struggling with fertility",
      "Unexplained mood swings, weight changes, or acne",
      "Approaching or going through perimenopause",
    ],
    preparation: "No fasting required. It's best done on day 2 to 5 of your menstrual cycle for the most accurate results. Your clinician can advise.",
    sampleType: "Blood",
    turnaround: "48-72 hours",
    testDetails: [
      { name: "FSH", measures: "Follicle-Stimulating Hormone level", why: "Controls egg development. High FSH can point to low ovarian reserve or approaching menopause." },
      { name: "LH", measures: "Luteinising Hormone level", why: "Triggers ovulation. The FSH-to-LH ratio helps diagnose PCOS and other hormonal conditions." },
      { name: "Prolactin", measures: "Prolactin hormone level", why: "High prolactin can stop ovulation and cause irregular periods, and it's often easy to treat." },
      { name: "Estradiol", measures: "The primary form of oestrogen", why: "Important for bone health, fertility, and a regular menstrual cycle." },
      { name: "Progesterone", measures: "Progesterone hormone level", why: "Confirms whether ovulation happened and supports early pregnancy. Low progesterone is a common cause of cycle problems." },
    ],
    faqs: [
      { q: "When in my cycle should I do this test?", a: "Day 2 to 5 of your period for FSH, LH, Prolactin, and Estradiol. Progesterone is best tested on day 21, about seven days after ovulation. Your clinician can guide you." },
      { q: "Can this test diagnose PCOS?", a: "It gives key markers used in PCOS diagnosis, like the FSH:LH ratio and testosterone if you add it. Together with your symptoms and possibly an ultrasound, your doctor can make a diagnosis." },
      { q: "I'm on birth control. Will it affect my results?", a: "Yes. Hormonal contraception lowers your natural hormone levels. For the most accurate results, your clinician may suggest testing during a pill-free interval." },
    ],
  },

  vitality: {
    description:
      "Being tired all the time isn't normal. Vitality looks at the blood-level causes: anaemia, sickle cell trait, G6PD deficiency, and other conditions that are common in Ghana. If you're always tired, this panel helps find out why.",
    whoShouldTest: [
      "Persistent fatigue or weakness",
      "Pale skin, dizziness, or shortness of breath",
      "Family history of sickle cell or blood disorders",
      "Heavy periods (a common cause of anaemia in women)",
    ],
    preparation: "No fasting required. Can be done at any time of day.",
    sampleType: "Blood",
    turnaround: "48-72 hours",
    testDetails: [
      { name: "FBC", measures: "Full blood count: red cells, white cells, platelets, haemoglobin, MCV, MCH", why: "The most thorough blood test. Picks up anaemia, infections, and blood cell abnormalities." },
      { name: "Haemoglobin Electrophoresis", measures: "Types of haemoglobin in your blood (AA, AS, SS, SC, etc.)", why: "Identifies sickle cell trait (AS) or sickle cell disease (SS), which is important to know for family planning in Ghana." },
      { name: "G6PD", measures: "Glucose-6-Phosphate Dehydrogenase enzyme level", why: "G6PD deficiency is common in West Africa. If you have it, certain foods and medications can trigger dangerous anaemia episodes." },
      { name: "Sickling Test", measures: "Whether your red blood cells sickle under low oxygen", why: "A quick check alongside electrophoresis. It matters most before surgery or at high altitudes." },
    ],
    faqs: [
      { q: "What is sickle cell trait (AS)?", a: "If you carry the AS genotype, you have sickle cell trait. You're usually healthy, but if your partner also has AS, each child has a 25% chance of sickle cell disease (SS). Knowing your status matters for family planning." },
      { q: "What is G6PD deficiency?", a: "It's a genetic condition common in Ghana. Certain foods like fava beans, some medications like a few antimalarials, and infections can make your red blood cells break down. Knowing your G6PD status helps you avoid the triggers." },
      { q: "Can anaemia be treated?", a: "In most cases, yes. Iron-deficiency anaemia responds well to supplements and diet changes. Other types may need different treatment, and your results will point to the right approach." },
    ],
  },

  shield: {
    description:
      "Fever that won't go away? Shield checks quickly and accurately for the most common causes in Ghana: malaria, typhoid, and infection markers. Stop guessing and start treating the right thing.",
    whoShouldTest: [
      "Fever lasting more than two or three days",
      "Recurring fevers or chills",
      "Recently travelled to a high-malaria area",
      "Feeling unwell with no clear cause",
    ],
    preparation: "No fasting required. Best done during or soon after a fever episode for the most accurate results.",
    sampleType: "Blood",
    turnaround: "24-48 hours (malaria RDT result available same day)",
    testDetails: [
      { name: "Malaria RDT + Blood Film", measures: "Malaria parasites in your blood (rapid test + microscopy confirmation)", why: "The rapid test gives a quick answer. The blood film confirms it, identifies the species, and shows how heavy the infection is, which guides treatment." },
      { name: "Typhoid Antibodies", measures: "Widal test for Salmonella typhi and paratyphi antibodies", why: "Typhoid is common in Ghana and shares symptoms with malaria. Testing both keeps you from getting the wrong treatment." },
      { name: "FBC", measures: "Full blood count: white cells, platelets, haemoglobin", why: "High white cells suggest a bacterial infection. Low platelets can point to dengue or severe malaria. The FBC ties the picture together." },
      { name: "CRP", measures: "C-reactive protein, a measure of how severe inflammation is", why: "Shows your clinician how serious the infection is and helps track whether treatment is working." },
    ],
    faqs: [
      { q: "Can I test for malaria if I'm already on treatment?", a: "Yes, though the results may be affected. A blood film can still pick up parasites during treatment. Let your clinician know what medication you're taking." },
      { q: "Why test for typhoid and malaria together?", a: "Their symptoms overlap a lot: fever, headache, body aches. In Ghana, many people get treated for malaria when they actually have typhoid, or the other way around. Testing both points to the right treatment." },
      { q: "How quickly can I get results?", a: "Malaria rapid test results are ready the same day. The full blood film, typhoid, FBC, and CRP results come within 24-48 hours." },
    ],
  },

  panorama: {
    description:
      "The most complete health screening panel we offer. Panorama checks your blood sugar, heart health, liver, kidneys, thyroid, blood count, and more in a single visit. If you do only one test this year, make it this one.",
    whoShouldTest: [
      "Anyone who wants a full health picture",
      "Haven't had a check-up in over a year",
      "Starting a new health or fitness goal",
      "Over 30 and want a baseline for the future",
    ],
    preparation: "Fast for 8 to 12 hours before the test. Water is fine. A morning appointment works best.",
    sampleType: "Blood + Urine",
    turnaround: "48-72 hours",
    testDetails: [
      { name: "Full Blood Count", measures: "Red cells, white cells, platelets, haemoglobin, and more", why: "The base of any health check. Picks up anaemia, infections, and blood disorders." },
      { name: "HbA1c", measures: "3-month blood sugar average", why: "The standard for diabetes screening. One reading tells a three-month story." },
      { name: "Fasting Glucose", measures: "Current blood sugar level", why: "Pairs with HbA1c for the most complete diabetes picture." },
      { name: "Lipid Profile", measures: "Total cholesterol, LDL, HDL, triglycerides", why: "Checks whether your arteries are healthy and your heart risk is low." },
      { name: "Liver Function", measures: "ALT, AST, ALP, bilirubin, albumin, total protein", why: "Catches liver damage from alcohol, medications, fatty liver, or hepatitis, often with no symptoms at all." },
      { name: "Renal Function", measures: "Creatinine, urea, electrolytes", why: "Your kidneys filter waste around the clock. This confirms they're keeping up." },
      { name: "Thyroid Function", measures: "TSH, Free T3, Free T4", why: "Controls metabolism, energy, mood, and weight. A small gland with a big impact." },
      { name: "Uric Acid", measures: "Uric acid level", why: "High levels cause gout and point to metabolic stress." },
      { name: "CRP", measures: "C-reactive protein, an inflammation marker", why: "Chronic inflammation quietly drives heart disease, diabetes, and cancer." },
      { name: "Urine R/E", measures: "Sugar, protein, blood, and bacteria in urine", why: "A simple sample that can reveal kidney problems, UTIs, and diabetes spilling into the urine." },
    ],
    faqs: [
      { q: "Is Panorama worth the cost?", a: "Panorama costs less than booking the same tests one by one. Catching one condition early can also save you a lot in treatment costs, and years of healthier living." },
      { q: "How often should I do Panorama?", a: "Once a year for most adults. If any results need watching, your clinician may suggest every six months." },
      { q: "Can I add extra tests to Panorama?", a: "Yes. You can add individual tests like PSA, testosterone, or specific hormones during booking." },
      { q: "I'm young and feel healthy. Do I need this?", a: "Many conditions, like diabetes, high cholesterol, and thyroid disorders, build up quietly for years before any symptoms show. Testing young gives you a baseline and catches problems before they get serious." },
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
