export const navLinks = ["How It Works", "About"];

// Each panel carries a branded `name` (shown as a small sub-heading) and a
// plain, searchable `displayName` (shown as the main heading). `why` holds the
// short, patient-facing description used on the cards and recommendation shelf.
export const testPanels = [
  {
    slug: "panorama",
    name: "Panorama",
    displayName: "Complete Health Check",
    subtitle: "Your complete head-to-toe snapshot",
    concern: "Check everything",
    why: "The most complete screening we offer. Panorama checks your blood sugar, heart, liver, kidneys, blood count, uric acid and more in a single visit. If you do only one lab test this year, make it this one.",
    internal: "Full Body Health Test",
    price: "GHS 1,100",
    popular: true,
    tests: [
      "Full Blood Count", "HbA1c", "Fasting/Random Blood Sugar", "Kidney Function",
      "Liver Function", "Urine R/E", "Lipid Profile", "Uric Acid",
    ],
    concerns: ["everything", "general", "full"],
  },
  {
    slug: "dialics",
    name: "Dialics",
    displayName: "Blood Sugar Check",
    subtitle: "Blood sugar & diabetes control",
    concern: "Worried about diabetes",
    why: "See how well your body is keeping sugar under control. Good for spotting diabetes early, and just as useful when you already have it and want to know your levels are holding steady.",
    internal: "Diabetes",
    price: "GHS 350",
    tests: ["HbA1c", "Fasting/Random Blood Sugar", "Urine R/E"],
    concerns: ["diabetes", "sugar"],
  },
  {
    slug: "cardion",
    name: "Cardion",
    displayName: "Heart Health Check",
    subtitle: "Heart & circulation",
    concern: "Check my heart health",
    why: "The key numbers behind your heart and circulation. Whether you're checking your risk or living with a heart condition, it shows where you stand.",
    internal: "Cardiovascular",
    price: "GHS 475",
    tests: ["Full Blood Count", "Fasting/Random Blood Sugar", "Uric Acid", "CRP"],
    concerns: ["heart", "cholesterol"],
  },
  {
    slug: "metabolix",
    name: "Metabolix",
    displayName: "Core Health Check",
    subtitle: "Everyday organ & metabolic health",
    concern: "Get a general check-up",
    why: "An everyday look at the organs doing the heavy lifting: your kidneys, liver, blood and sugar. A dependable routine check, and a simple way to keep tabs on a condition you're already managing.",
    internal: "Core Metabolic",
    price: "GHS 697",
    tests: ["Kidney Function", "Liver Function", "Full Blood Count", "HbA1c"],
    concerns: ["general", "liver", "kidney"],
  },
  {
    slug: "privara",
    name: "Privara",
    displayName: "Private STI Check",
    subtitle: "Confidential STI screen",
    concern: "Get a confidential STI check",
    why: "A confidential screen for common sexually transmitted infections. Get tested, or confirm you're clear after treatment. Private results, no judgment.",
    internal: "Sexual Health / STI",
    price: "GHS 897",
    tests: ["HIV", "Syphilis (VDRL)", "Hepatitis B (HBsAg)", "Hepatitis C", "Chlamydia", "Gonorrhoea"],
    concerns: ["sti", "sexual"],
  },
  {
    slug: "alpha",
    name: "Alpha",
    displayName: "Men's Health Check",
    subtitle: "Men's health markers",
    concern: "Check my health as a man",
    why: "A full men's screen across prostate, hormones, heart, and general wellbeing. Made to catch problems early and help you stay on top of anything you're already treating.",
    internal: "Men's Health",
    price: "GHS 995",
    tests: ["PSA", "Testosterone", "Lipid Profile", "Full Blood Count", "HbA1c", "Urine R/E", "ESR", "Calcium"],
    concerns: ["men"],
  },
  {
    slug: "empress",
    name: "Empress",
    displayName: "Women's Health Check",
    subtitle: "Women's health markers",
    concern: "Check my health as a woman",
    why: "A full women's screen across hormones, thyroid, blood health and general wellbeing, whether you're staying ahead of issues or managing ones you already know about.",
    internal: "Women's Health",
    price: "GHS 995",
    tests: ["Full Blood Count", "HbA1c", "Urine R/E", "Thyroid Function", "Calcium", "Lipid Profile"],
    concerns: ["women", "hormones"],
  },
  {
    slug: "spark",
    name: "Spark",
    displayName: "Him/Her Fertility Test",
    subtitle: "Fertility for couples",
    concern: "We're trying to conceive",
    why: "A fertility check for couples, covering the hormones and reproductive markers that matter when you're trying to conceive or tracking treatment along the way.",
    internal: "Fertility",
    price: "GHS 770",
    tests: ["Thyroid Function", "Progesterone", "Pelvic Ultrasound", "Sperm Analysis", "Testosterone"],
    concerns: ["fertility", "hormones"],
  },
  {
    slug: "shield",
    name: "Shield",
    displayName: "Wellness Check",
    subtitle: "Infection & fever screen",
    concern: "I have a fever that won't go",
    why: "A quick check for the common infections that leave you feeling unwell, like malaria and typhoid, along with your blood count and inflammation markers, so you know what's going on and get treated fast.",
    internal: "Malaria & Fever",
    price: "GHS 497",
    tests: ["Malaria RDT + Blood Film", "Typhoid Antibodies", "CRP", "Full Blood Count"],
    concerns: ["fever", "sick", "malaria"],
  },
];

export const singleTests = [
  { slug: "fbc", name: "Full Blood Count (FBC)", price: "GHS 80", concerns: ["tired", "blood", "general"] },
  { slug: "fasting-blood-sugar", name: "Fasting Blood Sugar", price: "GHS 50", concerns: ["diabetes", "sugar"] },
  { slug: "hba1c", name: "HbA1c (3-month sugar average)", price: "GHS 90", concerns: ["diabetes", "sugar"] },
  { slug: "lipid-panel", name: "Lipid / Cholesterol Panel", price: "GHS 120", concerns: ["heart", "cholesterol"] },
  { slug: "liver-function", name: "Liver Function Test", price: "GHS 150", concerns: ["liver"] },
  { slug: "kidney-function", name: "Kidney Function Test", price: "GHS 150", concerns: ["kidney"] },
  { slug: "thyroid-function", name: "Thyroid Function Test", price: "GHS 180", concerns: ["thyroid", "energy", "weight"] },
  { slug: "urine-re", name: "Urine Routine Examination", price: "GHS 60", concerns: ["kidney", "general"] },
  { slug: "malaria-rdt", name: "Malaria RDT", price: "GHS 30", concerns: ["fever", "malaria"] },
  { slug: "hiv", name: "HIV Screening", price: "GHS 80", concerns: ["sti", "sexual"] },
  { slug: "hepatitis-b", name: "Hepatitis B (HBsAg)", price: "GHS 80", concerns: ["sti", "liver"] },
  { slug: "uric-acid", name: "Uric Acid", price: "GHS 60", concerns: ["metabolic", "kidney"] },
];

export const heroStats = [
  { value: "127", label: "Health indicators" },
  { value: "Home", label: "Or lab collection" },
  { value: "48-72h", label: "Results" },
];

export const trustedPartners = ["Lab Access Ghana", "M&G Medical Lab", "Paystack"];

export const conditions = [
  "Diabetes", "Hypertension", "Sickle Cell Trait", "Hepatitis B", "Thyroid Disorders",
  "Kidney Disease", "Liver Disease", "Anemia", "PCOS", "Prostate Cancer",
  "High Cholesterol", "Vitamin D Deficiency", "Gout", "HIV Monitoring",
  "Iron Deficiency", "Malaria Aftermath", "Fatty Liver", "Insulin Resistance",
  "Hormonal Imbalance", "Chronic Inflammation", "Autoimmune Markers", "Celiac Disease",
];

export const conditions2 = [
  "Testosterone Levels", "Estrogen Levels", "B12 Deficiency", "Folate Deficiency",
  "Cortisol Imbalance", "Uric Acid", "Calcium Disorders", "Potassium Imbalance",
  "Hemochromatosis", "Lupus Markers", "Rheumatoid Markers", "Pancreatic Function",
  "Metabolic Syndrome", "Pre-eclampsia Risk", "Fertility Markers", "Bone Health",
];

export const howItWorksSteps = [
  { num: "01", icon: "FlaskConical", title: "Book a test", desc: "Choose a single test, a bundle, or a condition program. Pay with Mobile Money or card." },
  { num: "02", icon: "Home", title: "Get Tested", desc: "Visit a partner lab or book home sample collection anywhere in Ghana. It takes about 15 minutes." },
  { num: "03", icon: "BarChart3", title: "Understand Your Results", desc: "A doctor reviews your results and they land in your dashboard within 48 to 72 hours, with each health indicator explained in plain language." },
  { num: "04", icon: "HeartPulse", title: "Manage What Matters", desc: "Use your results to choose the right next step, from a Diabetes or Hypertension program to a follow-up conversation with your doctor." },
];

export const showcaseFeatures = [
  { title: "Organ System Health View", desc: "See your heart, liver, kidney, and metabolic health at a glance with clear scores." },
  { title: "Health Indicator Tracking", desc: "Watch how your key numbers change over months and years, so you can catch a worrying trend early." },
  { title: "Plain-Language Explanations", desc: "Every result comes with clear explanations." },
];

export const testCategories = [
  {
    name: "Heart & Blood Vessels", short: "Cardio", count: 2,
    insight: "Is your heart muscle healthy and your blood vessels intact?",
    markers: [
      { label: "Heart muscle damage", clinical: "Troponin I" },
      { label: "Blood vessel damage", clinical: "Homocysteine" },
    ],
  },
  {
    name: "Cholesterol & Lipids", short: "Cholesterol", count: 8,
    insight: "Are your arteries clogging? See the full cholesterol and lipid picture.",
    markers: [
      { label: "Cholesterol levels", clinical: "Total Cholesterol, LDL, HDL, VLDL" },
      { label: "Triglycerides", clinical: "Triglycerides" },
      { label: "Heart attack risk predictor", clinical: "ApoB" },
      { label: "Genetic heart risk", clinical: "Lp(a)" },
      { label: "Cholesterol ratio", clinical: "Total Cholesterol / HDL Ratio" },
    ],
  },
  {
    name: "Metabolic & Diabetes", short: "Metabolic", count: 5,
    insight: "Is your body managing blood sugar well, or moving toward diabetes without obvious symptoms?",
    markers: [
      { label: "Blood sugar right now", clinical: "Fasting Glucose, Random Glucose" },
      { label: "3-month sugar average", clinical: "HbA1c" },
      { label: "Insulin resistance", clinical: "Insulin" },
      { label: "Body composition", clinical: "BMI" },
    ],
  },
  {
    name: "Blood Health", short: "Blood", count: 29,
    insight: "Are your red cells, white cells, iron stores, and clotting power healthy?",
    markers: [
      { label: "Oxygen-carrying capacity", clinical: "Hemoglobin, Hematocrit, RBC Count" },
      { label: "Red cell quality", clinical: "MCV, MCH, MCHC, RDW" },
      { label: "Immune cell breakdown", clinical: "WBC, Neutrophils, Lymphocytes, Monocytes, Eosinophils, Basophils" },
      { label: "Clotting ability", clinical: "Platelet Count, MPV, Plateletocrit" },
      { label: "Clot risk screen", clinical: "D-Dimer" },
      { label: "Iron stores", clinical: "Iron, Ferritin, Transferrin, TIBC" },
      { label: "Sickle cell check", clinical: "Sickling Test (HbS)" },
      { label: "Blood type", clinical: "ABO, Rh Type" },
    ],
  },
  {
    name: "Liver Function", short: "Liver", count: 12,
    insight: "Is your liver under stress from diet, alcohol, or medication?",
    markers: [
      { label: "Liver enzymes", clinical: "ALT, AST" },
      { label: "Bile duct health", clinical: "ALP, GGT" },
      { label: "Waste processing", clinical: "Total, Direct & Indirect Bilirubin" },
      { label: "Protein production", clinical: "Albumin, Globulin, Total Protein, A/G Ratio" },
      { label: "Tissue damage marker", clinical: "LDH" },
    ],
  },
  {
    name: "Kidney Function", short: "Kidney", count: 7,
    insight: "How well are your kidneys filtering waste and toxins from your blood?",
    markers: [
      { label: "Kidney filtration", clinical: "Creatinine, BUN, eGFR, Cystatin C" },
      { label: "Filtration ratios", clinical: "BUN/Creatinine, Urea/Creatinine" },
      { label: "Joint & gout risk", clinical: "Uric Acid" },
    ],
  },
  {
    name: "Thyroid Function", short: "Thyroid", count: 4,
    insight: "Is your thyroid controlling your metabolism, weight, and energy properly?",
    markers: [
      { label: "Thyroid control signal", clinical: "TSH" },
      { label: "Active thyroid hormones", clinical: "Free T3, Free T4" },
      { label: "Total thyroid hormone", clinical: "T4 (Thyroxine)" },
    ],
  },
  {
    name: "Reproductive Hormones", short: "Reproductive", count: 10,
    insight: "Are your sex hormones balanced? Fertility, mood, and energy all depend on it.",
    markers: [
      { label: "Sex hormones", clinical: "Testosterone, Estradiol, Progesterone" },
      { label: "Fertility hormones", clinical: "FSH, LH, Prolactin" },
      { label: "Ovarian reserve", clinical: "AMH" },
      { label: "Adrenal hormone", clinical: "DHEA-Sulfate" },
      { label: "Prostate health", clinical: "PSA" },
      { label: "Pregnancy check", clinical: "hCG" },
    ],
  },
  {
    name: "Nutrients & Vitamins", short: "Nutrition", count: 4,
    insight: "Are you getting the nutrients your body needs to thrive?",
    markers: [
      { label: "Bone & immune vitamin", clinical: "Vitamin D (25-OH)" },
      { label: "Energy & nerve vitamins", clinical: "Vitamin B12, Folate" },
      { label: "Immune mineral", clinical: "Zinc" },
    ],
  },
  {
    name: "Electrolytes & Minerals", short: "Electrolytes", count: 7,
    insight: "Are the minerals that power your nerves, muscles, and heart in balance?",
    markers: [
      { label: "Salt & fluid balance", clinical: "Sodium, Potassium, Chloride" },
      { label: "Bone & muscle minerals", clinical: "Calcium, Magnesium, Phosphorus" },
      { label: "Acid-base balance", clinical: "Bicarbonate (HCO3)" },
    ],
  },
  {
    name: "Inflammation Markers", short: "Inflammation", count: 2,
    insight: "Is hidden inflammation adding strain inside your body?",
    markers: [
      { label: "Hidden inflammation", clinical: "hs-CRP" },
      { label: "Inflammation rate", clinical: "ESR" },
    ],
  },
  {
    name: "Infectious Diseases", short: "Infections", count: 14,
    insight: "Screen for the infections most common in Ghana: hepatitis, HIV, malaria, typhoid, and more.",
    markers: [
      { label: "Hepatitis B (full panel)", clinical: "HBsAg, Anti-HBs, Anti-HBc IgM, Anti-HBc Total, HBeAg, Anti-HBe" },
      { label: "Hepatitis C", clinical: "Hep C Antibody" },
      { label: "HIV", clinical: "HIV Retroscreen" },
      { label: "Syphilis", clinical: "VDRL" },
      { label: "Gonorrhea", clinical: "Gonorrhea Screen" },
      { label: "Malaria", clinical: "Malaria RDT" },
      { label: "Typhoid", clinical: "Typhoid IgG, IgM" },
      { label: "Stomach bacteria", clinical: "H. pylori Antibody" },
    ],
  },
  {
    name: "Urine Analysis", short: "Urine", count: 20,
    insight: "Your urine reveals kidney function, hidden infection, diabetes signs, and more.",
    markers: [
      { label: "Physical properties", clinical: "Appearance, Colour, Specific Gravity, pH" },
      { label: "Infection markers", clinical: "Leucocyte Esterase, Nitrite, Pus Cells, Bacteria" },
      { label: "Diabetes signs", clinical: "Glucose, Ketones" },
      { label: "Kidney damage signs", clinical: "Protein, Casts, Epithelial Cells" },
      { label: "Liver markers", clinical: "Bilirubin, Urobilinogen" },
      { label: "Bleeding", clinical: "Blood (Haemoglobin/Myoglobin), RBCs" },
      { label: "Crystals & stones", clinical: "Urine Crystals" },
      { label: "Yeast & STIs", clinical: "T. vaginalis, Yeast / Hyphae" },
    ],
  },
  {
    name: "Stool & Parasites", short: "Stool", count: 7,
    insight: "Are there parasites, infection, or hidden bleeding in your gut?",
    markers: [
      { label: "Parasites & worms", clinical: "Ova & Parasites, Larvae, Cysts, Protozoa, Intestinal Flagellates" },
      { label: "Gut inflammation", clinical: "Stool WBCs" },
      { label: "Hidden bleeding", clinical: "Stool RBCs" },
    ],
  },
  {
    name: "Sperm & Semen Health", short: "Sperm", count: 20,
    insight: "Is your fertility on track? See sperm count, movement, shape, and overall semen quality.",
    markers: [
      { label: "Sperm count", clinical: "Total Count, Concentration" },
      { label: "Sperm movement", clinical: "Progressive, Non-Progressive, Immotile, Total Motility" },
      { label: "Sperm health", clinical: "Vitality (Alive/Dead), Abnormal Forms" },
      { label: "Semen volume & properties", clinical: "Volume, Appearance, Colour, Odour, Viscosity, pH, Liquefaction" },
      { label: "Semen chemistry", clinical: "Fructose" },
      { label: "Semen infection check", clinical: "Pus Cells, Round Cells, Agglutination" },
    ],
  },
  {
    name: "Autoimmune Screening", short: "Autoimmune", count: 3,
    insight: "Is your immune system attacking your own body? Screen for lupus and rheumatoid arthritis.",
    markers: [
      { label: "Lupus & general autoimmune screen", clinical: "ANA" },
      { label: "Rheumatoid arthritis markers", clinical: "Anti-CCP, Rheumatoid Factor (RF)" },
    ],
  },
  {
    name: "Respiratory Health", short: "Lungs", count: 1,
    insight: "How well are your lungs delivering oxygen to your body?",
    markers: [
      { label: "Blood oxygen level", clinical: "SpO2" },
    ],
  },
];

export const comparisonRows = [
  { feature: "127 health indicators in one visit", bh: true, hosp: false },
  { feature: "Home sample collection", bh: true, hosp: false },
  { feature: "Plain-language explanations", bh: true, hosp: false },
  { feature: "Detect and prevent diseases", bh: true, hosp: false },
  { feature: "Track health indicators over time", bh: true, hosp: false },
  { feature: "Digital health dashboard", bh: true, hosp: false },
  { feature: "Personalized recommendations", bh: true, hosp: false },
  { feature: "No referral needed", bh: true, hosp: false },
  { feature: "Fixed transparent pricing", bh: true, hosp: false },
  { feature: "Own your health data in one place", bh: true, hosp: false },
  { feature: "Detailed nutritional plan", bh: true, hosp: false },
];

export const testimonials = [
  { name: "Ama K.", age: 34, location: "Accra", quote: "My doctor tested glucose. BetterHealth tested HbA1c and caught what she missed. I\u2019m glad I checked.", discovery: "Pre-diabetes" },
  { name: "Kofi A.", age: 45, location: "Tema", quote: "My father had a stroke before he turned 63. I was on the same path and didn\u2019t know it. The test caught me in time.", discovery: "Hypertension" },
  { name: "Maxwell A.", age: 34, location: "Cape Coast", quote: "My cholesterol number was fine. It just wasn\u2019t the right number to be looking at. ApoB caught what nobody had thought to check.", discovery: "Cardiovascular risk" },
];

export const plans = [
  {
    name: "Essential",
    price: "61",
    annual: "730",
    daily: "2",
    popular: false,
    categories: [
      {
        name: "Physical Health",
        tests: [
          "Height",
          "Weight",
          "Body Mass Index (BMI)",
          "Waist-to-height ratio",
          "Blood Pressure",
        ],
      },
      {
        name: "Biological Health",
        tests: [
          "Full blood count",
          "Blood sugar",
          "Kidney function test",
          "Liver function test",
          "Urine routine examination",
          "Heart health test",
          "Biological Age*",
        ],
      },
    ],
  },
  {
    name: "Complete",
    price: "163",
    annual: "1,953",
    daily: "5",
    popular: true,
    categories: [
      {
        name: "Physical Health",
        tests: [
          "Height",
          "Weight",
          "Body Mass Index (BMI)",
          "Waist-to-height ratio",
          "Blood Pressure",
        ],
      },
      {
        name: "Biological Health",
        tests: [
          "Full blood count",
          "Blood sugar",
          "Kidney function test",
          "Liver function test",
          "Urine routine examination",
          "Heart health test",
          "Uric acid",
          "Biological Age*",
          "Doctor's written report",
          "Standard nutritional plan",
        ],
      },
    ],
  },
  {
    name: "Premium",
    price: "414",
    annual: "4,957",
    daily: "19",
    popular: false,
    categories: [
      {
        name: "Physical Health",
        tests: [
          "Height",
          "Weight",
          "Body Mass Index (BMI)",
          "Waist-to-height ratio",
          "Blood Pressure",
        ],
      },
      {
        name: "Biological Health",
        tests: [
          "Full blood count",
          "Blood sugar",
          "Kidney function test",
          "Liver Function Test",
          "Urine routine examination",
          "Heart health test",
          "Uric acid",
          "Cardiac troponins I & T",
          "C-Reactive Protein",
          "Additional tests worth GHC 300",
          "Free home or office sample collection",
          "Biological Age*",
          "Virtual Dr. Consultation",
          "Customised nutritional plan",
        ],
      },
    ],
  },
];

export const screeningBundles = {
  eyebrow: "Popular packages",
  headline: "Screening bundles that cost less than booking one by one",
  body: "Combinations that give you a full picture in a single visit, at a bundle price. One booking, one sample collection.",
  bundles: [
    {
      slug: "panorama",
      name: "Full Body Checkup",
      tagline: "A complete snapshot of your core health.",
      price: "from GHS 450",
      popular: true,
      includes: [
        "Full blood count",
        "Blood sugar (Fasting / HbA1c)",
        "Lipid / cholesterol panel",
        "Kidney function",
        "Liver function",
        "Urinalysis",
      ],
    },
    {
      slug: "alpha",
      name: "Men\u2019s Health",
      tagline: "Heart, metabolic, and prostate essentials for men.",
      price: "from GHS 400",
      includes: [
        "Lipid / cholesterol panel",
        "Blood sugar (HbA1c)",
        "Liver & kidney function",
        "PSA (prostate)",
        "Testosterone",
      ],
    },
    {
      slug: "empress",
      name: "Women\u2019s Health",
      tagline: "Hormone, iron, and metabolic essentials for women.",
      price: "from GHS 400",
      includes: [
        "Full blood count + ferritin (iron)",
        "Blood sugar (HbA1c)",
        "Lipid / cholesterol panel",
        "Thyroid panel",
        "Vitamin D",
      ],
    },
  ],
  note: "Prices exclude VAT and vary by location. You\u2019ll see the exact price for your area before you pay. Home collection is available as an add-on from GHS 150.",
  cta: "Book a bundle",
};

export const diseasePrograms = {
  eyebrow: "Condition programs",
  headline: "Monitor the condition risk you cannot afford to guess about",
  body: "Living with a chronic condition, or worried because of family history? Each program will combine the right tests, simple home monitoring, doctor review, a personal nutritionist coach, and a wellness coach.",
  programs: [
    {
      slug: "diabetes",
      icon: "Droplet",
      name: "Diabetes Program",
      tagline: "Know and control your blood sugar.",
      forWho: "Diabetes, prediabetes, or family history.",
      price: "Coming soon",
      includes: [
        "HbA1c + fasting glucose",
        "Kidney function (early damage)",
        "Lipid / cholesterol panel",
        "Home blood-sugar logging",
        "Doctor review of every result",
        "Personal nutritionist coach",
        "Wellness coach",
      ],
      available: false,
    },
    {
      slug: "hypertension",
      icon: "Activity",
      name: "Hypertension Program",
      tagline: "Keep your blood pressure in a safe range.",
      forWho: "High blood pressure or family history.",
      price: "Coming soon",
      includes: [
        "Blood pressure tracking",
        "Kidney function",
        "Lipid / cholesterol panel",
        "Electrolytes",
        "Doctor review + alerts",
        "Personal nutritionist coach",
        "Wellness coach",
      ],
      available: false,
    },
    {
      slug: "kidney",
      icon: "Droplets",
      name: "Kidney Health Program",
      tagline: "Catch kidney strain before it’s serious.",
      forWho: "Diabetes, hypertension, or family history.",
      price: "Coming soon",
      includes: [
        "Creatinine + eGFR",
        "Urea & electrolytes",
        "Urinalysis (protein)",
        "Blood pressure tracking",
        "Doctor review",
        "Personal nutritionist coach",
        "Wellness coach",
      ],
      available: false,
    },
    {
      slug: "heart",
      icon: "HeartPulse",
      name: "Heart Health Program",
      tagline: "Stay ahead of cardiovascular risk.",
      forWho: "High cholesterol, family history, or over 40.",
      price: "Coming soon",
      includes: [
        "Full lipid panel (incl. ApoB)",
        "Blood sugar (HbA1c)",
        "Blood pressure tracking",
        "hs-CRP (inflammation)",
        "Doctor review",
        "Personal nutritionist coach",
        "Wellness coach",
      ],
      available: false,
    },
    {
      slug: "liver",
      icon: "Shield",
      name: "Liver Health Program",
      tagline: "Monitor and protect your liver.",
      forWho: "Fatty liver, hepatitis, or alcohol concerns.",
      price: "Coming soon",
      includes: [
        "Liver function tests (ALT / AST)",
        "Hepatitis B screening",
        "Lipid panel",
        "Doctor review",
        "Personal nutritionist coach",
        "Wellness coach",
      ],
      available: false,
    },
    {
      slug: "fertility",
      icon: "Baby",
      name: "Fertility Program",
      tagline: "Understand your reproductive health.",
      forWho: "Planning a family or tracking fertility.",
      price: "Coming soon",
      includes: [
        "Fertility and hormone testing",
        "Doctor review",
        "Personal nutritionist coach",
        "Wellness coach",
      ],
      available: false,
    },
    {
      slug: "pcos",
      icon: "Venus",
      name: "PCOS Program",
      tagline: "Track and manage PCOS markers.",
      forWho: "PCOS symptoms or diagnosis.",
      price: "Coming soon",
      includes: [
        "Hormone and metabolic testing",
        "Doctor review",
        "Personal nutritionist coach",
        "Wellness coach",
      ],
      available: false,
    },
  ],
  note: "Programs are coming soon. Join the waitlist and tell us which condition program you want first.",
  cta: "Join the program waitlist",
};

export const faqs = [
  { q: "How does home sample collection work?", a: "A certified phlebotomist from our partner Lab Access Ghana comes to your home at your scheduled time. The process takes about 15 minutes. You\u2019ll receive a confirmation SMS with your collector\u2019s name and estimated arrival time." },
  { q: "How do I pay?", a: "We accept Mobile Money (MTN MoMo, Vodafone Cash, AirtelTigo Money), debit/credit cards, and bank transfers. All payments are processed securely through Paystack, Ghana\u2019s leading payment platform." },
  { q: "How long until I get my results?", a: "Most results are available within 48 to 72 hours after your sample is collected. You\u2019ll receive an SMS and email notification when your results are ready to view in your health dashboard." },
  { q: "Is my health data private and secure?", a: "Yes. BetterHealth Africa is certified by the Ghana Data Protection Commission (GDPC) under the Data Protection Act, 2012 (Act 843). You can verify our certification at https://app.dataprotection.org.gh/company/dpdZwcRth19j7oQFxmwoDj1ELCOABE. Your data is encrypted at rest and in transit. Only you and the healthcare providers you authorize can access your results. We never sell your data." },
  { q: "Do I need a doctor\u2019s referral?", a: "No referral needed. BetterHealth Africa is a direct-to-consumer health platform. You can choose a single test, a focused panel, or a condition program and book independently." },
  { q: "What if my results show something concerning?", a: "Our platform flags results outside the normal range. For critical findings, you\u2019ll receive an immediate notification. We recommend discussing concerning results with a healthcare provider, and our Premium plan includes a doctor consultation." },
];

export const founderQuote = "After watching diabetes and kidney disease take so many beloved aunties and uncles, then come for my parents, I knew things had to change.";

export const founderStory = [
  "In Ghana, comprehensive health screening has mostly been a privilege for the few who can afford it. It is expensive, fragmented, and available in limited facilities. Most people only see a doctor when something is already wrong. We\u2019re changing that.",
  "BetterHealth Africa makes lab testing, result explanations, and health tracking easier to access and understand. Your health should not be a mystery. The things you do not know about your body are often the ones that hurt you, so it pays to find out early.",
];

export const footerColumns = [
  { title: "Product", links: ["Tests", "How It Works", "What We Test", "Stories", "Download App"] },
  { title: "Partners", links: ["For Doctors", "For Nutritionists", "For Labs", "Foundation"] },
  { title: "Company", links: ["About Us", "Careers", "FAQ", "Contact", "WhatsApp", "Privacy Policy", "Terms of Service"] },
];

export const phoneScreens = [
  {
    title: "Health Score",
    score: "87",
    label: "Overall Health",
    items: [
      { name: "Heart", val: "92", color: "#22c55e" },
      { name: "Liver", val: "88", color: "#22c55e" },
      { name: "Kidney", val: "76", color: "#f59e0b" },
      { name: "Metabolic", val: "84", color: "#22c55e" },
    ],
  },
  {
    title: "Lab Results",
    score: null,
    label: null,
    items: [
      { name: "HbA1c", val: "5.2%", color: "#22c55e", ref: "< 5.7%" },
      { name: "Total Cholesterol", val: "198", color: "#22c55e", ref: "< 200 mg/dL" },
      { name: "Vitamin D", val: "18 ng/mL", color: "#ef4444", ref: "> 30 ng/mL" },
      { name: "TSH", val: "2.4", color: "#22c55e", ref: "0.4 - 4.0 mIU/L" },
    ],
  },
  {
    title: "Health Trends",
    score: null,
    label: null,
    items: [],
  },
];

// ─── How It Works Page ───────────────────────────────────────────────────────

export const howItWorksPage = {
  hero: {
    eyebrow: "Ghana's first health intelligence platform",
    headline: "Turn a health worry into a clear next step.",
    highlight: "No guessing.",
    subheadline: "Book the right test, get results reviewed by a doctor, and see what your numbers mean in plain language, so you can move with confidence instead of carrying quiet questions around.",
    cta: "Book your first test",
    proofPoints: [
      "Partner labs",
      "Doctor-reviewed results",
      "Results in 48 to 72 hours",
      "GDPC data protection",
    ],
  },
  steps: [
    {
      num: "01",
      heading: "Tell us what you want answers on",
      body: "Maybe diabetes runs in your family. Maybe your blood pressure has been creeping up. Maybe something feels off and you want to stop wondering. Start with the concern on your mind, and BetterHealth points you toward the tests that can give you a clearer picture.",
      expects: [
        "Choose the concern closest to what you want clarity on",
        "See the exact tests inside each panel before you book",
        "Know the price upfront, with no subscription required",
        "Book without needing a doctor's referral",
        "Pay securely with Mobile Money, card, or bank transfer",
        "Get confirmation and preparation instructions by email and SMS",
      ],
    },
    {
      num: "02",
      heading: "Get tested without the hospital runaround",
      body: "Choose a partner lab visit or home sample collection where available. We tell you how to prepare, where to go, who to expect, and whether you need to fast, so the test feels calm before it even happens.",
      expects: [
        "Pick a lab visit or home collection when available",
        "Know exactly whether fasting is needed",
        "Receive your appointment or collector details by SMS",
        "Complete a simple blood draw in about 5 to 10 minutes",
        "Your sample moves through BetterHealth partner lab workflows",
      ],
      subSection: {
        heading: "Home collection, handled properly",
        body: "When home collection is available, a trained collector comes with the supplies needed to take, label, and package your sample properly. You do not have to improvise your way through the process.",
        details: [
          "Choose an available date and time during booking",
          "The collector brings tubes, labels, and sample packaging",
          "Your sample is labelled and moved through a documented handling process",
          "Morning slots are used when fasting is required",
          "Availability depends on your location and selected test",
        ],
      },
    },
    {
      num: "03",
      heading: "See what your numbers mean",
      body: "Your dashboard does more than show a lab report. It explains your numbers, highlights what may need attention, and gives you doctor-reviewed context so you can understand what is happening inside your body.",
      expects: [
        "Results are usually ready within 48 to 72 hours",
        "Get notified the moment your dashboard is ready",
        "See your health indicators grouped by body system where relevant",
        "Understand your value, reference range, status, and explanation",
        "Download a PDF report to keep or share with your doctor",
      ],
      subSection: {
        heading: "This is the health intelligence layer",
        body: "A raw result can leave you with more questions than answers. BetterHealth turns those numbers into something you can understand, track, and discuss with a qualified healthcare provider when needed.",
        details: [
          "Plain explanations that translate medical terms into everyday language",
          "Body-system views for heart, liver, kidney, metabolic, hormone, blood, and nutrient health",
          "Trend charts when you test again over time",
          "Doctor-reviewed notes where available",
          "Clear prompts when a result should be discussed with a healthcare provider",
        ],
      },
    },
    {
      num: "04",
      heading: "Leave with a next move",
      body: "The point is not to collect numbers. It is to know what deserves attention, what can be watched, and what you may need to discuss with a doctor. From there, you can recheck, track trends, or join a focused condition program when ongoing monitoring matters.",
      expects: [
        "Know which indicators deserve attention",
        "Track changes across future tests",
        "Use condition programs for diabetes, hypertension, kidney, liver, or heart risk",
        "Share your report with a healthcare provider",
        "Set reminders so important checks do not disappear from your life",
      ],
    },
  ],
  safetyCards: [
    { icon: "FlaskConical", title: "Partner lab processing", body: "Real samples, real lab workflows, and a clearer customer experience around the test." },
    { icon: "UserCheck", title: "Doctor-reviewed results", body: "Your result is reviewed before it reaches your dashboard, so you are not left alone with confusing numbers." },
    { icon: "ShieldCheck", title: "GDPC and data protection", body: "Your health data is handled with privacy in mind, with secure systems and access controls around your results." },
    { icon: "PackageCheck", title: "Documented sample handling", body: "Samples are labelled and tracked through the testing process so each result connects back to the right booking." },
  ],
  faqs: [
    { q: "Do I need to fast before my blood test?", a: "Some tests need fasting, meaning no food or drink except water for 8 to 12 hours before collection. When you book, we will tell you exactly which tests need fasting and send you clear preparation instructions by SMS." },
    { q: "How much blood is taken?", a: "A full panel usually needs 3 to 5 tubes of blood, about 15 to 25 mL in total. That is roughly one to two tablespoons. Most people feel no effects afterward." },
    { q: "Can I book just one test?", a: "Yes. The first step can be a single test or a focused panel. You can come back later when you want to keep tracking specific health indicators over time." },
    { q: "What makes this different from collecting a lab report?", a: "A normal lab report gives you numbers. BetterHealth adds the health intelligence layer: plain explanations, body-system grouping, doctor review, and trend tracking when you test again." },
    { q: "Can I use my results with my doctor?", a: "Yes. You can download a PDF report with your results, reference ranges, and explanations. Many people use this when speaking with their doctor or another healthcare provider." },
    { q: "What happens if a result looks concerning?", a: "Your dashboard makes concerning results easier to spot, and doctor-reviewed notes may guide what to discuss next. If a result worries you or symptoms are present, speak with a qualified healthcare provider promptly." },
  ],
  bottomCta: {
    headline: "Get the clarity your body has been asking for.",
    body: "Book the test that matches your concern, understand the result, and take the next step with more confidence.",
    cta: "Book your first test",
  },
};

// ─── What We Test Page ────────────────────────────────────────────────────────

export const whatWeTestPage = {
  hero: {
    eyebrow: "Health intelligence starts with the right health indicators",
    headline: "127 health indicators. 17 body systems. One clear picture.",
    subheadline: "BetterHealth tests the markers behind blood sugar, heart risk, liver, kidneys, hormones, fertility, nutrition, blood health, urine, stool, and more. Every result is explained in plain language and can be tracked over time.",
    cta: "Book a test",
    intro: "Start with the concern on your mind, then choose the test or panel that fits. If a number needs ongoing attention, you can book another check when it is time to follow the trend.",
  },
  systems: [
    {
      icon: "Heart",
      name: "Heart & Cardiovascular",
      count: 12,
      why: "Heart disease is the leading cause of death in Ghana, and it is mostly preventable when you catch it early. Most people do not know their heart risk until they are in a hospital bed. These 12 markers give you the full picture of your heart health, far beyond the basic cholesterol test you might get at a hospital.",
      markers: [
        { name: "Total Cholesterol", note: "the headline number, but not the full story" },
        { name: "LDL Cholesterol", note: "the 'bad' cholesterol, the one that clogs arteries" },
        { name: "HDL Cholesterol", note: "the 'good' cholesterol, the one that protects them" },
        { name: "Triglycerides", note: "fat in your blood, often elevated by diet and lifestyle" },
        { name: "ApoB", note: "the single best predictor of heart attack risk (most hospitals do not test this)" },
        { name: "Lp(a)", note: "a genetic risk marker that does not change with diet or exercise" },
        { name: "hs-CRP", note: "measures inflammation, a hidden driver of heart disease" },
        { name: "Homocysteine", note: "elevated levels damage blood vessel walls" },
        { name: "Total Cholesterol / HDL Ratio", note: "more predictive than cholesterol alone" },
        { name: "LDL / HDL Ratio", note: "helps assess the balance of protective vs. harmful cholesterol" },
        { name: "Non-HDL Cholesterol", note: "captures all the cholesterol types that contribute to plaque" },
        { name: "ApoB / ApoA1 Ratio", note: "the most advanced cardiovascular risk ratio available" },
      ],
      callout: "ApoB is considered a more accurate predictor of heart disease than LDL cholesterol, yet most hospitals in Ghana do not test for it. Every BetterHealth panel includes it.",
    },
    {
      icon: "Activity",
      name: "Liver Function",
      count: 6,
      why: "Your liver filters toxins, processes medications, produces bile, stores energy, and performs over 500 functions. Liver disease is often called the 'silent killer' because it can progress to advanced stages without any symptoms. By the time you feel something, significant damage may already be done. Regular monitoring catches problems when they are still reversible.",
      markers: [
        { name: "ALT", note: "the most specific marker of liver cell damage" },
        { name: "AST", note: "elevated in liver damage, also indicates heart or muscle injury" },
        { name: "ALP", note: "signals bile duct problems or bone disorders" },
        { name: "GGT", note: "sensitive to alcohol use, fatty liver, and bile flow issues" },
        { name: "Bilirubin (Total)", note: "a waste product from red blood cell breakdown; elevated levels cause jaundice" },
        { name: "Albumin", note: "produced by the liver; low levels indicate chronic liver disease or malnutrition" },
      ],
      callout: "Fatty liver disease affects an estimated 25% of adults globally, often without any symptoms. The ALT/AST ratio can pick it up early, before irreversible scarring begins.",
    },
    {
      icon: "Droplets",
      name: "Kidney Function",
      count: 8,
      why: "Your kidneys filter 200 litres of blood every day, clearing waste and keeping your fluid balance steady. Chronic kidney disease builds quietly over years, and most people lose 50% of kidney function before they notice anything. In Ghana, where hypertension and diabetes are rising, kidney screening matters. The earlier you catch a problem, the more you can do about it.",
      markers: [
        { name: "Creatinine", note: "waste product filtered by kidneys; elevated levels signal impaired function" },
        { name: "BUN (Blood Urea Nitrogen)", note: "another kidney filtration marker" },
        { name: "eGFR", note: "the gold standard measure of how well your kidneys are working" },
        { name: "Uric Acid", note: "high levels cause gout and can indicate kidney stress" },
        { name: "Electrolytes: Sodium, Potassium, Chloride", note: "imbalances can signal kidney problems" },
        { name: "Calcium", note: "regulated by kidneys; abnormalities affect bones, muscles, and nerves" },
        { name: "Phosphate", note: "managed by kidneys; important for bone health" },
        { name: "CO2 (Bicarbonate)", note: "measures acid-base balance, regulated by kidneys" },
      ],
      callout: "High blood pressure, which affects 1 in 3 Ghanaian adults, is the leading cause of kidney disease. If you have hypertension, regular kidney checks are worth taking seriously.",
    },
    {
      icon: "Gauge",
      name: "Metabolic & Diabetes",
      count: 6,
      why: "Ghana's diabetes prevalence has tripled in the last 20 years, and an estimated 70% of people with diabetes in Africa are undiagnosed. Pre-diabetes can often be reversed with lifestyle changes, but only if you know you have it. A standard fasting glucose test misses most cases of pre-diabetes. Our panel looks for what those tests leave out.",
      markers: [
        { name: "Fasting Glucose", note: "your blood sugar level after overnight fasting" },
        { name: "HbA1c", note: "your average blood sugar over the past 2 to 3 months; the most reliable diabetes marker" },
        { name: "Insulin", note: "elevated levels signal insulin resistance years before blood sugar rises" },
        { name: "HOMA-IR", note: "the best measure of insulin resistance" },
        { name: "C-Peptide", note: "shows how much insulin your pancreas is producing" },
        { name: "Fructosamine", note: "blood sugar average over the past 2 to 3 weeks; useful for tracking short-term changes" },
      ],
      callout: "Most doctors only test fasting glucose. But insulin resistance, the stage that comes before diabetes, shows up in insulin and HOMA-IR years before glucose rises. BetterHealth catches that window, when lifestyle changes do the most good.",
    },
    {
      icon: "Waves",
      name: "Hormones",
      count: 10,
      why: "Hormones regulate energy, mood, sleep, weight, fertility, and muscle mass. When they fall out of balance you can get fatigue, weight changes, low mood, hair loss, irregular periods, reduced libido, and dozens of other symptoms that often get waved away as 'just stress.' A full hormone panel shows what is going on inside, and whether your symptoms have a treatable cause.",
      markers: [
        { name: "Testosterone (Total & Free)", note: "essential for both men and women; affects energy, mood, and muscle" },
        { name: "Estradiol", note: "the primary estrogen; critical for female reproductive health and bone density" },
        { name: "Progesterone", note: "regulates menstrual cycle and supports pregnancy" },
        { name: "DHEA-S", note: "a precursor hormone; low levels are associated with fatigue and ageing" },
        { name: "Cortisol", note: "the stress hormone; chronically elevated levels damage nearly every system" },
        { name: "FSH", note: "essential for fertility in both sexes" },
        { name: "LH", note: "works with FSH to regulate reproduction" },
        { name: "Prolactin", note: "elevated levels can indicate pituitary issues or affect fertility" },
        { name: "SHBG", note: "determines how much of your hormones are available for use" },
        { name: "Anti-Müllerian Hormone (AMH)", note: "the best marker of ovarian reserve (female fertility potential)" },
      ],
      callout: "Testosterone levels in men start to fall from age 30, at roughly 1% per year. Many of the symptoms people blame on 'getting older', like fatigue, weight gain, and low mood, are treatable hormonal imbalances.",
    },
    {
      icon: "Sun",
      name: "Nutrients & Vitamins",
      count: 8,
      why: "Nutrient deficiencies do their damage quietly. They cause fatigue, weak immunity, poor concentration, hair loss, muscle cramps, and low mood, and people often reach for medication when the real fix is nutritional. In West Africa, low vitamin D, low iron, and low B12 are more common than most people realise.",
      markers: [
        { name: "Vitamin D", note: "critical for immune function, bone health, and mood; deficiency is widespread even in sunny climates" },
        { name: "Vitamin B12", note: "essential for nerve function and red blood cell production; deficiency causes fatigue and neurological symptoms" },
        { name: "Folate (Vitamin B9)", note: "crucial for cell division; especially important for women of childbearing age" },
        { name: "Iron", note: "carries oxygen in your blood; deficiency is the world's most common nutritional disorder" },
        { name: "Ferritin", note: "your body's iron reserves; low ferritin causes fatigue even when haemoglobin is normal" },
        { name: "TIBC", note: "helps differentiate types of anaemia" },
        { name: "Zinc", note: "supports immune function, wound healing, and taste/smell" },
        { name: "Magnesium", note: "involved in over 300 enzyme reactions; deficiency causes muscle cramps, anxiety, and poor sleep" },
      ],
      callout: "Ferritin can be critically low even when your haemoglobin (the standard anaemia test) is normal. If you have been told 'you are not anaemic' but still feel exhausted, ferritin is the test that reveals the real picture.",
    },
    {
      icon: "Droplet",
      name: "Blood Health",
      count: 14,
      why: "Your blood is a living tissue that carries oxygen, fights infection, and heals wounds. A full blood count shows up anaemia, infection, blood disorders, and how your immune system is doing, all from a single tube. In Ghana, where sickle cell trait affects about 25% of the population, a complete blood analysis is baseline knowledge worth having.",
      markers: [
        { name: "CBC (Full Blood Count)", note: "the most comprehensive single blood test" },
        { name: "Haemoglobin", note: "oxygen-carrying protein; low levels indicate anaemia" },
        { name: "Haematocrit", note: "percentage of blood volume occupied by red cells" },
        { name: "WBC (White Blood Cell Count)", note: "your immune army; high or low counts signal infection or immune issues" },
        { name: "WBC Differential", note: "breaks down white blood cells by type" },
        { name: "Platelet Count", note: "essential for blood clotting" },
        { name: "MCV, MCH, MCHC", note: "red blood cell size and haemoglobin content; helps classify types of anaemia" },
        { name: "RDW", note: "variation in red blood cell size; elevated in iron deficiency and other conditions" },
        { name: "ESR", note: "a general marker of inflammation in the body" },
        { name: "Reticulocyte Count", note: "measures new red blood cell production; helps diagnose bone marrow function" },
        { name: "Sickle Cell Screen", note: "tests for sickle cell trait and sickle cell disease" },
      ],
      callout: "Approximately 1 in 4 Ghanaians carries the sickle cell trait. Most do not know. If two carriers have children together, each child has a 25% chance of sickle cell disease. Knowing your status is one of the most impactful health decisions you can make.",
    },
    {
      icon: "Radio",
      name: "Thyroid",
      count: 5,
      why: "Your thyroid controls your metabolism, the speed at which every cell in your body works. An underactive thyroid brings weight gain, fatigue, low mood, and feeling cold all the time. An overactive one brings weight loss, anxiety, a racing heart, and trouble sleeping. Thyroid problems often go undiagnosed in Africa because many doctors only test TSH. Our full panel tests five markers to catch what TSH alone misses.",
      markers: [
        { name: "TSH", note: "the first-line screening test; but it is not enough on its own" },
        { name: "Free T3 (Triiodothyronine)", note: "the active thyroid hormone; low levels cause symptoms even when TSH is normal" },
        { name: "Free T4 (Thyroxine)", note: "the storage form of thyroid hormone; converted to T3 in the body" },
        { name: "TPO Antibodies", note: "detects Hashimoto's thyroiditis, the most common autoimmune thyroid disease" },
        { name: "Thyroglobulin Antibodies", note: "another autoimmune marker; helps diagnose chronic thyroid inflammation" },
      ],
      callout: "Up to 15% of people with thyroid symptoms have a 'normal' TSH. Free T3, Free T4, and antibody tests show the full picture, which is why BetterHealth tests all five, not just TSH.",
    },
  ],
  bottomCta: {
    headline: "Start with the markers that match your concern.",
    body: "Book a single test or a focused panel, get doctor-reviewed results, then decide what to do next.",
    cta: "Book a test",
  },
};

// ─── Stories Page ──────────────────────────────────────────────────────────────────

export const storiesPage = {
  hero: {
    eyebrow: "Member stories",
    headline: "Confidence starts when the guessing",
    highlight: "stops.",
    subheadline: "Most people delay testing because they are afraid of what the results might say. These stories show what changes when a concern becomes a clear result, a doctor-reviewed explanation, and a next step.",
    disclaimer: "To protect privacy, these stories have been anonymised. Names, identifying details, and some circumstances have been changed while preserving the health journey behind each story.",
  },
  stories: [
    {
      tag: "Pre-diabetes",
      tagColor: "amber",
      name: "Ama",
      age: 34,
      city: "Accra",
      headline: "“I was scared of the result. Then it gave me something to work with.”",
      narrative: [
        "Ama had a family history of diabetes, but she kept putting off a proper blood sugar check. She told herself she felt fine. Underneath that, she was afraid the test would confirm what she had been quietly worrying about.",
        "She booked BetterHealth after her sister pushed her to stop guessing. The sample collection was simple, but waiting for the result made her nervous. “I almost did not open the email,” she said. “I thought once I saw the number, my life would change.”",
        "Her dashboard showed an HbA1c of 6.1%, in the pre-diabetic range. It was not the answer she wanted, but the explanation helped. BetterHealth showed what HbA1c measures, why it can reveal a longer blood sugar pattern than a one-off fasting glucose, and what to discuss with a doctor.",
        "That turned the result from a scare into a plan. Ama spoke to a clinician, reduced sugary drinks, started walking after dinner, and decided to retest instead of pretending nothing had happened.",
        "Six months later, her HbA1c had moved to 5.6%. Her doctor still wanted her to monitor her insulin and blood sugar, but Ama no longer felt helpless. “It was not the number that gave me confidence,” she said. “It was finally knowing what the number meant.”",
      ],
      numbers: [
        { label: "HbA1c", before: "6.1%", after: "5.6%", status: "pre-diabetic → normal range" },
        { label: "Fasting Glucose", before: "5.4 mmol/L", after: null, status: "normal on a single-day reading" },
        { label: "Insulin", before: "14.2 mIU/L", after: null, status: "worth discussing and monitoring" },
        { label: "HOMA-IR", before: "3.4", after: null, status: "suggested insulin resistance" },
      ],
      quote: "“I thought the result would make me panic. Instead, it helped me know where to start.”",
    },
    {
      tag: "Hypertension",
      tagColor: "orange",
      name: "Kofi",
      age: 45,
      city: "Tema",
      headline: "“I stopped treating my blood pressure like a guess.”",
      narrative: [
        "Kofi knew high blood pressure ran in his family, but he had never treated it as urgent. A pharmacy reading years earlier was “a bit high,” so he reduced salt for a few weeks and moved on.",
        "His wife booked them both for a BetterHealth check after a family conversation about health. Kofi agreed, mostly because he wanted peace at home. He expected the results to be ordinary.",
        "The dashboard showed a blood pressure reading of 162/98 mmHg and explained why that deserved medical attention. It also connected the reading to kidney checks, cholesterol, and family history in plain language. For the first time, Kofi understood that blood pressure was not just one number at a kiosk.",
        "He took the report to a doctor, who confirmed the reading across follow-up visits and helped him start treatment. The kidney panel gave them a baseline to keep watching, which made the whole conversation feel more complete.",
        "Within months, his blood pressure was controlled. The biggest change was emotional: Kofi no longer felt like he was waiting for something bad to happen. He had a number, a doctor, and a routine he could follow.",
      ],
      numbers: [
        { label: "Systolic BP", before: "162 mmHg", after: "122 mmHg", status: "Stage 2 hypertension → normal" },
        { label: "Diastolic BP", before: "98 mmHg", after: "78 mmHg", status: "elevated → normal" },
        { label: "Creatinine", before: "106 µmol/L", after: null, status: "baseline for kidney monitoring" },
      ],
      quote: "“Before, I only had fear because of my family history. Now I have a reading, a doctor, and a plan.”",
    },
    {
      tag: "Cardiovascular risk",
      tagColor: "red",
      name: "Maxwell",
      age: 34,
      city: "Cape Coast",
      headline: "“I wanted reassurance. I got a clearer picture.”",
      narrative: [
        "Maxwell booked a heart-risk panel after a younger relative had a serious cardiac event. He was not looking for drama. He wanted someone to tell him he was fine so he could stop thinking about it.",
        "His basic cholesterol numbers did not look alarming on their own. But the BetterHealth dashboard also showed ApoB and Lp(a), then explained why those markers can give a more detailed view of cardiovascular risk than total cholesterol alone.",
        "That context mattered. Instead of staring at unfamiliar abbreviations, Maxwell could see what each marker measured, what was outside range, and which questions to ask his doctor.",
        "He brought the report to a clinician, who referred him for a more focused review. Together they discussed medication, food changes, alcohol, exercise, and what to monitor next. The plan was practical, not dramatic.",
        "On a later check, his ApoB had improved. His Lp(a), a largely genetic marker, became something to watch over time rather than something to panic about. “I did not leave with a perfect result,” he said. “I left knowing what mattered.”",
      ],
      numbers: [
        { label: "Total Cholesterol", before: "5.1 mmol/L", after: null, status: "borderline" },
        { label: "ApoB", before: "1.12 g/L", after: "0.78 g/L", status: "elevated → healthy" },
        { label: "Lp(a)", before: "78 nmol/L", after: null, status: "high, useful for long-term monitoring" },
        { label: "LDL Cholesterol", before: "3.2 mmol/L", after: "2.1 mmol/L", status: "borderline → optimal" },
      ],
      quote: "“The dashboard helped me ask better questions. That was the confidence I needed.”",
    },
    {
      tag: "Fatty liver",
      tagColor: "yellow",
      name: "Nana",
      age: 42,
      city: "Accra",
      headline: "“The test helped me take my liver seriously without panicking.”",
      narrative: [
        "Nana did not drink, played football on Sundays, and thought of himself as reasonably healthy. When he booked a BetterHealth panel, he expected the results to confirm what he already believed.",
        "His liver enzymes came back elevated. At first, that confused him. BetterHealth’s explanation helped him understand that liver strain can be connected to many things, including diet, weight, metabolic health, and medication history, not only alcohol.",
        "That distinction lowered the fear. He took the report to a doctor, who recommended an ultrasound and walked him through possible causes. The result gave the conversation a starting point.",
        "Nana made changes he could live with: less fruit juice, fewer takeaways, more home-packed lunches, and regular follow-up. He did not try to become a different person overnight.",
        "Months later, his liver markers had moved back into range. He still checks because he wants to keep the trend moving in the right direction. “The test did not shame me,” he said. “It showed me what to pay attention to.”",
      ],
      numbers: [
        { label: "ALT", before: "68 U/L", after: "34 U/L", status: "elevated → normal" },
        { label: "GGT", before: "85 U/L", after: "41 U/L", status: "elevated → normal" },
        { label: "AST", before: "42 U/L", after: "27 U/L", status: "elevated → normal" },
        { label: "Triglycerides", before: "2.4 mmol/L", after: "1.5 mmol/L", status: "high → normal" },
      ],
      quote: "“I thought liver results would be frightening. The explanation made them useful.”",
    },
    {
      tag: "Stroke risk",
      tagColor: "red",
      name: "Abena",
      age: 50,
      city: "Kumasi",
      headline: "“My daughter was worried. BetterHealth helped us have the right conversation.”",
      narrative: [
        "Abena had been meaning to check her blood pressure for months. A brief dizzy spell made her daughter worry, but Abena did what many busy parents do: she rested, felt better, and carried on.",
        "Her daughter booked a BetterHealth panel so they could stop arguing from fear and start talking from facts. When the results arrived, the dashboard showed elevated blood pressure and several heart-risk markers that deserved clinical review.",
        "The value was not just the flags. It was the way the results were grouped and explained. Abena could see how blood pressure, cholesterol, inflammation, and clotting markers might relate to each other, then take that full picture to a specialist.",
        "Her doctor reviewed the report, ordered follow-up checks, and helped her start a plan. Instead of one vague warning to “take it easy,” Abena had a set of numbers to track.",
        "Six months later, her blood pressure and cholesterol had improved. She still sees her clinician, but now she understands why each check matters. “My daughter was worried for me,” Abena said. “BetterHealth gave us language for the worry.”",
      ],
      numbers: [
        { label: "Systolic BP", before: "156 mmHg", after: "128 mmHg", status: "hypertensive → controlled" },
        { label: "C-Reactive Protein", before: "8.4 mg/L", after: "2.1 mg/L", status: "high inflammation → normal" },
        { label: "Fibrinogen", before: "5.1 g/L", after: null, status: "elevated, discussed with clinician" },
        { label: "Total Cholesterol", before: "6.4 mmol/L", after: "4.8 mmol/L", status: "high → healthy" },
      ],
      quote: "“I did not need more fear. I needed to understand what to do next.”",
    },
    {
      tag: "H. pylori infection",
      tagColor: "green",
      name: "Akua",
      age: 36,
      city: "Accra",
      headline: "“For years I called it stress. The test gave it a name.”",
      narrative: [
        "Akua had lived with recurring stomach burning for years. She blamed stress, late meals, and long workdays. Antacids helped for a while, then the discomfort came back.",
        "She avoided deeper testing because she was afraid of discovering something serious. A BetterHealth panel felt easier because it gave her a private place to start before deciding what to discuss with a doctor.",
        "Her result suggested H. pylori exposure. The dashboard explained, in plain language, that H. pylori is a bacterium linked to ulcers and stomach irritation, and that a clinician should confirm and treat it appropriately.",
        "Akua took the result to her doctor, who confirmed the infection and started treatment. The process was not glamorous, but it was clear: finish the medication, retest, and watch the symptoms.",
        "When her follow-up test came back negative, Akua felt relief she had not felt in years. “I kept calling it stress because stress was easier to understand,” she said. “Now I know what was actually going on.”",
      ],
      numbers: [
        { label: "H. pylori Antibody", before: "Positive", after: "Negative", status: "active infection → cleared" },
        { label: "Stomach pain", before: "Weekly", after: "None", status: "5 years → resolved" },
      ],
      quote: "“The relief was not only that treatment worked. It was finally having an explanation.”",
    },
  ],
  callForStories: {
    headline: "Have a BetterHealth story?",
    body: "If BetterHealth helped you move from worry to clarity, we would love to hear about it. Your story could help someone else take the step to get tested. Stories are only shared with consent, and identifying details can be changed to protect your privacy.",
    cta: "Share Your Story",
  },
  bottomCta: {
    headline: "The first step is not bravery. It is clarity.",
    body: "If a symptom, family history, or quiet worry is sitting at the back of your mind, start with the test that helps you understand what is happening inside your body.",
    cta: "Book a test",
  },
};

// ─── About Page ───────────────────────────────────────────────────────────────────────

export const aboutPage = {
  hero: {
    eyebrow: "About BetterHealth",
    headline: "Africans deserve to know what is happening inside their bodies before illness strikes.",
    subheadline: "BetterHealth Africa is Ghana's first health intelligence platform. We combine lab testing, doctor-reviewed results, simple explanations, and trend tracking so people can make earlier health decisions.",
  },
  problem: {
    headline: "Healthcare in Africa is built for treatment. We are building the layer that helps people test earlier.",
    body: [
      "In Ghana, most people only see a doctor when something is wrong: a headache that will not go away, unexplained weight loss, fatigue that does not lift. By then, conditions that were once treatable have often progressed. Prevention is not part of the culture, and it is not because Africans do not value their health. The infrastructure for routine screening barely exists.",
      "Comprehensive health screening has been a privilege reserved for the wealthy few who can afford private hospitals charging GHS 6,250 or more. For everyone else, healthcare means waiting until you are sick, queuing at an overcrowded facility, and hoping for the best.",
      "BetterHealth changes the starting point: choose a test, understand the result, and decide what to monitor next.",
    ],
    stats: [
      { value: "70%", label: "of diabetes cases in Africa are undiagnosed" },
      { value: "1 in 3", label: "Ghanaian adults has hypertension" },
      { value: "1 in 4", label: "Ghanaians carries the sickle cell trait" },
      { value: "25%", label: "of adults globally have fatty liver disease, and most don\u2019t know" },
      { value: "12x", label: "the cost of managing diabetes vs. preventing it" },
    ],
  },
  founder: {
    sectionLabel: "Why I Built This",
    narrative: [
      "I was raised in a small town in Ghana, where life was modest but rich in ways money couldn\u2019t buy, except for one constant shadow. All through my childhood, I watched my family lose people to diabetes and the diseases that travel with it: cardiovascular disease, kidney failure, amputations. First it took my grandparents. Then, one after another, my uncles and aunts.",
      "It happened so consistently that it shaped how we thought about aging. Subconsciously, an unspoken tradition formed in my extended family: once any of us began approaching 50, we braced ourselves for the long, drawn-out battle. We knew how it would end. We just didn\u2019t know how long the goodbye would take. It was a grim inheritance no one named out loud, but everyone carried.",
      "In 2019, the disease finally came for my father. He fought for two years. He lost his leg. But, against every precedent in our family, he kept his life, becoming the only man in my extended family to survive what had killed all his brothers. The relief was short-lived. After 2020, we began to notice something far more frightening: the disease was no longer waiting for 50. It was reaching the younger generation. Cousins in their thirties. Relatives barely into their forties. The pattern was accelerating.",
      "In 2022, I moved to the UK. A year later, in 2023, the disease came for me. I spent two weeks in hospital, fighting for my life against diabetic ketoacidosis. The NHS pulled me back from the edge. And then something happened that no one in my family had ever seen: within 18 months of my diagnosis, my doctors told me my diabetes was in reversal.",
      "I was the first. Not just to survive it, but to defeat it.",
      "That lit a fire in me I haven\u2019t been able to put out since. Through the NHS, I learned what my family had never been told: diabetes can be prevented through regular health testing, and reversed when caught early. The science wasn\u2019t missing. The infrastructure was. The knowledge that saved my life had not reached the people I came from.",
      "I founded BetterHealth Africa to change that. We are building a platform that makes preventive health testing and tracking accessible and affordable for Africa\u2019s 1.2 billion people, the population most at risk of developing these diseases and the least equipped to detect them early.",
      "The scale of the problem is staggering. Over 70% of diabetic patients across Africa are currently undiagnosed. Non-communicable diseases have overtaken infectious diseases as the leading cause of death across the continent. Entire families like mine are being quietly decimated by conditions the world already knows how to prevent.",
      "BetterHealth Africa exists so that no other child has to grow up watching their family disappear, generation by generation, to a disease we already know how to stop.",
    ],
    attribution: "Damzi",
    title: "Founder & CEO, BetterHealth Africa",
  },
  values: {
    headline: "What we stand for",
    items: [
      {
        icon: "ShieldCheck",
        title: "Earlier testing over guesswork",
        body: "The healthcare system often meets people after symptoms appear. BetterHealth helps you check the markers behind a concern before it becomes harder to manage.",
      },
      {
        icon: "Eye",
        title: "Clarity over lab-report confusion",
        body: "Your results should make sense. We explain key health indicators in plain language, show ranges clearly, and keep pricing visible before you pay.",
      },
      {
        icon: "Globe",
        title: "Access over exclusivity",
        body: "A useful health test should not need a referral or a private-hospital budget. We make quality lab testing easier to book and easier to understand.",
      },
    ],
  },
  howWeWork: {
    headline: "We are a health technology company, not a lab.",
    body: [
      "BetterHealth does not run laboratories. We partner with accredited, established labs across Ghana to process your samples. Our role is the technology, the experience, and the intelligence layer on top.",
      "We build the dashboard that organises your results by organ system. We write the explanations that make your numbers meaningful. We track your health indicators over time so you can see trends. And we connect you with doctors and nutritionists who can help you act on what the data reveals.",
      "We sit between the lab and you, turning raw results into health intelligence you can understand and discuss with a doctor.",
    ],
  },
  partners: {
    headline: "Built on trusted partnerships",
    items: [
      {
        name: "Lab Access Ghana",
        description: "Our sample collection and laboratory processing partner. Lab Access Ghana operates one of the most established phlebotomy and diagnostic networks in the country, with certified collectors and accredited labs.",
      },
      {
        name: "Paystack",
        description: "All payments, whether Mobile Money, cards, or bank transfers, go through Paystack, Ghana\u2019s leading payment infrastructure provider. Your financial data never touches our servers.",
      },
      {
        name: "Supabase",
        description: "Our data infrastructure is built on Supabase, providing enterprise-grade database security, row-level access control, and encrypted data storage that meets international healthcare data standards.",
      },
    ],
  },
  roadmap: {
    headline: "Where we\u2019re headed",
    intro: "BetterHealth launched in Ghana in 2026, and we are only getting started. Here is what we are building toward:",
    milestones: [
      { year: "2026", text: "Launch in Greater Accra, Ashanti Region, Eastern & Central Regions" },
      { year: "2026", text: "Expand home collection to all major Ghanaian cities" },
      { year: "2027", text: "Launch mobile app (iOS & Android)" },
      { year: "2027", text: "Expand to Nigeria and Kenya" },
      { year: "2027", text: "Introduce AI-powered health insights" },
      { year: "2028", text: "Pan-African availability across 10+ countries" },
    ],
    closing: "Our goal is to make BetterHealth the health intelligence layer for Africa, the place people use to test early, understand their data, and track the markers that matter.",
  },
  joinUs: {
    headline: "Help us build the future of African healthcare",
    body: "We\u2019re a small, ambitious team working on one of the most important problems on the continent. We don\u2019t keep a fixed list of open roles, but if you believe in what we\u2019re building and know how you\u2019d contribute, we want to hear from you. Tell us the role you\u2019d love to own.",
    cta: "Pitch Your Role",
    fallback: "Email us at careers@betterhealth.africa with your CV and the position you\u2019d love to fill.",
  },
  bottomCta: {
    headline: "We started BetterHealth for the people who keep postponing the test.",
    body: "If that is you, or someone you love, start with the concern on your mind.",
    cta: "Book a test",
  },
};

// ─── Pricing Page ───────────────────────────────────────────────────────────────────

export const pricingPage = {
  hero: {
    eyebrow: "Transparent Pricing",
    headline: "Start with the test you need.",
    subheadline: "Book a single test or a focused panel, get doctor-reviewed results, and see clear explanations in the app. No referrals, no hidden fees, no surprises.",
  },
  valueAnchor: "Panorama is the BetterHealth full-body check. Use it as the benchmark when comparing the cost of a broad private-hospital checkup. Prices exclude VAT.",
  hospitalComparison: {
    headline: "Compare Panorama with a broad hospital checkup",
    body: "A broad private-hospital checkup can cost several thousand cedis once the individual tests, review, and nutrition support are added. Panorama gives you a full-body BetterHealth check in one booking.",
    rows: [
      { test: "Full Blood Count (CBC)", hospital: "GHS 200-300", bh: "Offered twice" },
      { test: "Lipid Panel (Cholesterol)", hospital: "GHS 200-400", bh: "Offered twice" },
      { test: "Liver Function Tests", hospital: "GHS 250-500", bh: "Offered twice" },
      { test: "Kidney Function Tests", hospital: "GHS 200-450", bh: "Offered twice" },
      { test: "HbA1c + Fasting Glucose", hospital: "GHS 150-350", bh: "Offered twice" },
      { test: "Urine routine examination", hospital: "GHS 170-250", bh: "Offered twice" },
      { test: "Biological Age*", hospital: "Not Offered", bh: "Offered twice" },
      { test: "Body Mass Index (BMI)", hospital: "Not Offered", bh: "Offered twice" },
      { test: "Waist-to-height ratio", hospital: "Not Offered", bh: "Offered twice" },
      { test: "Personalised health insights", hospital: "Not Offered", bh: "Offered twice" },
      { test: "Doctor\u2019s result review", hospital: "GHS 300-500", bh: "Offered twice" },
      { test: "Nutritional plan", hospital: "GHS 1,500-3,500", bh: "Offered twice" },
      { test: "BetterHealth Panorama", hospital: "GHS 2,970-6,250", bh: "Panorama price", isTotals: true },
    ],
    footnote: "Panorama pricing updates from the live catalogue where available. BetterHealth prices exclude VAT.",
  },
  singleTests: {
    headline: "Pay only for what you need.",
    body: "Book a single test or a focused panel, get doctor-reviewed results, and decide your next step from there.",
    examples: [
      { slug: "fbc", name: "Full Blood Count (FBC)", price: "from GHS 80" },
      { slug: "fasting-blood-sugar", name: "Blood Sugar (Fasting / HbA1c)", price: "from GHS 90" },
      { slug: "lipid-panel", name: "Lipid / Cholesterol Panel", price: "from GHS 120" },
      { slug: "kidney-function", name: "Kidney Function Panel", price: "from GHS 150" },
      { slug: "liver-function", name: "Liver Function Panel", price: "from GHS 150" },
      { slug: "thyroid-function", name: "Thyroid Panel", price: "from GHS 180" },
    ],
    cta: "Browse all tests & book",
    note: "Prices exclude VAT and vary by location. You’ll see the exact price for your area before you pay. Home collection may be available as an add-on.",
  },
  faqs: [
    {
      q: "Can I pay with Mobile Money?",
      a: "Yes. We accept MTN MoMo, Vodafone Cash, and AirtelTigo Money. You can also pay with Visa, Mastercard, or bank transfer. All payments are processed securely through Paystack.",
    },
    {
      q: "Can I book another test later?",
      a: "Yes. You can book another test or panel whenever you need one. Your results stay in your BetterHealth dashboard so you can compare changes over time.",
    },
    {
      q: "Do I pay before booking?",
      a: "Yes. You choose the test, see the price, and pay securely before your booking is confirmed.",
    },
    {
      q: "Do you offer family or group pricing?",
      a: "Premium plan members receive 20% off for each additional family member they add. For corporate or group enquiries (10+ people), contact us at hello@betterhealth.africa for custom pricing.",
    },
    {
      q: "Is this a recurring charge?",
      a: "No. Single tests and panels are one-time purchases. If BetterHealth introduces a recurring product later, the billing terms will be shown before you pay.",
    },
    {
      q: "Are there any hidden fees?",
      a: "None. You see the test price before you pay. The only optional add-on is home collection where it is available.",
    },
  ],
  bottomCta: {
    headline: "Your health is worth more than the price of a test.",
    body: "Start with the test that matches the concern on your mind.",
    cta: "Book a test",
  },
};

export const waitlist = {
  placeholder: "Enter your email address",
  buttonText: "Join the Waitlist",
  successMessage: "You\u2019re on the list! We\u2019ll notify you when BetterHealth Africa launches.",
  duplicateMessage: "You\u2019re already on the list! We\u2019ll be in touch soon.",
  errorMessage: "Something went wrong. Please try again.",
  privacyNote: "We\u2019ll only email you about launch updates. No spam, ever.",
};

export const faqSections = [
  {
    category: "Getting Started",
    items: [
      {
        q: "What is BetterHealth?",
        a: "BetterHealth is Ghana's first health intelligence platform. You can book lab tests, get doctor-reviewed results, understand your health indicators in plain language, and track the numbers that matter over time. We partner with accredited labs across Ghana to process samples and deliver results to your dashboard within 48 to 72 hours.",
      },
      {
        q: "Who is BetterHealth for?",
        a: "Any adult (18+) in Ghana who wants to understand their health early, not just when something goes wrong. Our members include young professionals monitoring their baseline health, couples planning families, people with family histories of chronic disease, fitness enthusiasts tracking performance, and anyone who is tired of guessing about their health.",
      },
      {
        q: "Do I need a doctor's referral to use BetterHealth?",
        a: "No. BetterHealth is a direct-to-consumer platform. You can choose a single test, a focused panel, or a condition program without a referral. If you want to discuss your results with a doctor, you can share your downloadable PDF report with any healthcare provider.",
      },
      {
        q: "Is BetterHealth a hospital or laboratory?",
        a: "No. BetterHealth is a health technology company. We do not run labs. We partner with established, accredited laboratories in Ghana to process your samples. Our role is the technology platform, the health dashboard, the explanations, the tracking, and the experience.",
      },
      {
        q: "Where is BetterHealth available?",
        a: "We currently serve Greater Accra, Kumasi, and Tema. We are expanding to more Ghanaian cities throughout 2026 and plan to launch in Nigeria and Kenya in 2027.",
      },
    ],
  },
  {
    category: "Testing & Collection",
    items: [
      {
        q: "How does the blood test work?",
        a: "After you choose a test or panel, you book collection at one of our partner labs or at home where available. A certified phlebotomist draws a small blood sample, usually about 15 to 25 mL across 3 to 5 tubes. The sample goes to the lab, gets processed, and your results appear in your dashboard within 48 to 72 hours.",
      },
      {
        q: "Can I get my blood drawn at home?",
        a: "Home collection may be available depending on your area and selected test. If it is available for your booking, you will see it before you pay and a certified phlebotomist from Lab Access Ghana will come to your home at the scheduled time.",
      },
      {
        q: "Where are the partner labs located?",
        a: "Our partner labs are located across Greater Accra, Kumasi, and Tema. When you book an in-lab collection, we will show you the nearest locations with available appointment slots. All partner labs are accredited and follow Ghana Health Service standards.",
      },
      {
        q: "Do I need to fast before my test?",
        a: "Some tests need fasting, which means no food or drink except water for 8 to 12 hours before collection. When you book, we will tell you exactly which tests need fasting and send you preparation instructions by SMS. If your test includes fasting checks, we recommend booking a morning slot.",
      },
      {
        q: "How much blood is taken?",
        a: "A full panel needs about 15 to 25 mL of blood across 3 to 5 tubes. That is roughly one to two tablespoons. Most people feel no effects afterward. If you are prone to dizziness, let your phlebotomist know and they will have you sit or lie down during and after the draw.",
      },
      {
        q: "What if I am afraid of needles?",
        a: "You are not alone in this; plenty of people are. Our phlebotomists are experienced and trained to make the process as comfortable as possible. The draw takes about 60 seconds. If you are anxious about it, let us know when you book and we will pair you with a collector who is used to working with needle-shy patients. Some members find home collection feels less clinical and more comfortable than visiting a lab.",
      },
      {
        q: "How are my samples handled after collection?",
        a: "Every sample is labelled with a unique accession number, stored in temperature-controlled packaging, and transported to the lab within 2 hours of collection. We keep a full chain of custody, from the moment the tube is drawn to the moment the result is reported. You can track your sample's status in your dashboard.",
      },
    ],
  },
  {
    category: "Results & Dashboard",
    items: [
      {
        q: "How long until I get my results?",
        a: "Most results are available within 48 to 72 hours after your sample is collected. You will get an SMS and email notification when your results are ready.",
      },
      {
        q: "How do I access my results?",
        a: "Log into your BetterHealth dashboard at app.betterhealth.africa using the same email and password you signed up with. Your results are organized by body system (Heart, Liver, Kidneys, Thyroid, Metabolic, Hormones, Blood, Nutrients) with colour-coded indicators and plain-language explanations.",
      },
      {
        q: "What do the colours in my dashboard mean?",
        a: "Green = healthy or optimal range. The health indicator is where it should be.\nAmber = watch zone. The number is outside the optimal range but not yet critical. Monitor it and consider lifestyle changes.\nRed = needs attention. The number is significantly outside the normal range. We recommend discussing this with a healthcare provider.",
      },
      {
        q: "Can I download my results?",
        a: "Yes. Every member can download a complete PDF report with all health indicator values, reference ranges, and status indicators. You can share this PDF with your doctor, keep it for your records, or print it.",
      },
      {
        q: "What is the difference between \"normal\" and \"optimal\" ranges?",
        a: "\"Normal\" ranges are based on population averages. They tell you whether you are within the range of what is common, not necessarily what is healthy. \"Optimal\" ranges are tighter and based on the latest research on disease prevention. BetterHealth shows you both, because being \"normal\" and being \"optimal\" are often two different things.",
      },
      {
        q: "Can I share my results with my doctor?",
        a: "Yes. Download your PDF report and bring it to any appointment. Many of our members use their BetterHealth reports as a starting point for conversations with their doctors. The report includes your values, reference ranges, and explanations, so a doctor has what they need to review your results.",
      },
      {
        q: "What if a result is critically abnormal?",
        a: "If any result falls into a critical range, you will receive an immediate notification via SMS and in-app alert. Our system flags these for priority review. We strongly recommend consulting a healthcare provider promptly.",
      },
    ],
  },
  {
    category: "Payment & Billing",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept Mobile Money (MTN MoMo, Vodafone Cash, AirtelTigo Money), debit and credit cards (Visa, Mastercard), and bank transfers. All payments are processed securely through Paystack, Ghana's leading payment platform.",
      },
      {
        q: "How is billing structured?",
        a: "Single tests and focused panels are paid for once at booking. You choose the test, see the price, and pay securely before your booking is confirmed.",
      },
      {
        q: "Is this a recurring charge?",
        a: "No. Single tests and focused panels are one-time purchases. If BetterHealth introduces a recurring product later, the billing terms will be shown clearly before you pay.",
      },
      {
        q: "Is there a satisfaction guarantee?",
        a: "If something goes wrong with your booking or collection, contact us and we will help resolve it. Any refund eligibility will be handled according to the payment and booking terms shown at checkout.",
      },
      {
        q: "Can I book another test later?",
        a: "Yes. You can book another test or panel whenever you need one. Your results stay in your BetterHealth dashboard so you can compare changes over time.",
      },
      {
        q: "Do you offer family or group pricing?",
        a: "For corporate or group enquiries of 10 or more people, contact us at hello@betterhealth.africa for custom pricing.",
      },
      {
        q: "Can I buy a single test?",
        a: "Yes. BetterHealth offers individual tests and focused panels as one-time purchases. Visit the Tests page to browse available options.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    items: [
      {
        q: "Is my health data secure?",
        a: "Yes. Your health data is encrypted at rest and in transit using industry-standard protocols. We use Supabase for our data infrastructure, which provides enterprise-grade security, row-level access control, and encrypted storage.",
      },
      {
        q: "Who can see my results?",
        a: "Only you can see your results. No one at BetterHealth, including our staff, can access your individual health data without your explicit authorization. If you choose to share your results (e.g., with a doctor), you control that process.",
      },
      {
        q: "Do you sell my data?",
        a: "No. We will never sell, share, or monetize your personal health data. Your information is used solely to deliver your results and improve your experience on the platform.",
      },
      {
        q: "What happens to my data if I cancel?",
        a: "Your data remains in your account and is accessible to you even after cancellation. If you want your data permanently deleted, contact us at privacy@betterhealth.africa and we will process your request within 30 days.",
      },
    ],
  },
  {
    category: "Medical Questions",
    items: [
      {
        q: "Is BetterHealth a substitute for seeing a doctor?",
        a: "No. BetterHealth provides testing, results explanations, and monitoring support, not diagnosis or treatment. If your results show something concerning, we recommend consulting a healthcare provider. Your downloadable PDF report can be shared with any doctor.",
      },
      {
        q: "Are your tests accurate?",
        a: "Yes. All samples are processed at accredited laboratories using the same equipment and methodologies as hospitals. Our partner labs follow quality control protocols including daily calibration, control sample testing, and proficiency testing programmes.",
      },
      {
        q: "Can BetterHealth diagnose diseases?",
        a: "BetterHealth screens for early indicators and risk factors. It does not provide medical diagnoses. If your results flag potential concerns, a healthcare provider can use your BetterHealth data alongside a clinical examination and any follow-up tests needed.",
      },
      {
        q: "Can I use BetterHealth while pregnant?",
        a: "Yes, with your doctor's knowledge. Many health indicators change during pregnancy, and our reference ranges may not reflect pregnancy-specific norms. We recommend discussing your results with your obstetrician or midwife, who can interpret them in the context of your pregnancy.",
      },
    ],
  },
];
