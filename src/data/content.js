export const navLinks = ["How It Works", "What We Test", "Pricing", "About", "Stories"];

export const heroStats = [
  { value: "127", label: "Biomarkers" },
  { value: "Home", label: "Collection" },
  { value: "GHS 2", label: "Per day" },
];

export const trustedPartners = ["Lab Access Ghana", "Banita Laboratory", "Paystack"];

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
  { num: "01", icon: "Smartphone", title: "Sign Up", desc: "Create your account, choose your package, and pay with Mobile Money or card." },
  { num: "02", icon: "Home", title: "Book Collection", desc: "Choose in-lab visit or book home collection and get tested in the comfort of your home." },
  { num: "03", icon: "FlaskConical", title: "Get Results", desc: "Comprehensive results in your health dashboard within 48\u201372 hours. Every biomarker explained." },
  { num: "04", icon: "BarChart3", title: "Take Action", desc: "Personalized insights and recommendations. Track changes over time." },
];

export const showcaseFeatures = [
  { title: "Organ System Health View", desc: "See your heart, liver, kidney, and metabolic health at a glance with intuitive scores." },
  { title: "Biomarker Trend Tracking", desc: "Watch how your markers change over months and years. Spot patterns before problems emerge." },
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
    insight: "Is your body managing blood sugar properly \u2014 or heading toward diabetes?",
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
    insight: "Is hidden inflammation silently driving disease in your body?",
    markers: [
      { label: "Hidden inflammation", clinical: "hs-CRP" },
      { label: "Inflammation rate", clinical: "ESR" },
    ],
  },
  {
    name: "Infectious Diseases", short: "Infections", count: 14,
    insight: "Screen for the infections most common in Ghana \u2014 hepatitis, HIV, malaria, typhoid, and more.",
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
  { feature: "127 biomarkers in one visit", bh: true, hosp: false },
  { feature: "Home sample collection", bh: true, hosp: false },
  { feature: "Plain-language explanations", bh: true, hosp: false },
  { feature: "Detect and prevent diseases", bh: true, hosp: false },
  { feature: "Track biomarkers over your life time", bh: true, hosp: false },
  { feature: "Digital health dashboard", bh: true, hosp: false },
  { feature: "Personalized recommendations", bh: true, hosp: false },
  { feature: "No referral needed", bh: true, hosp: false },
  { feature: "Fixed transparent pricing", bh: true, hosp: false },
  { feature: "Own your health data in one place", bh: true, hosp: false },
  { feature: "Detailed nutritional plan", bh: true, hosp: false },
];

export const testimonials = [
  { name: "Ama K.", age: 34, location: "Accra", quote: "My doctor tested glucose. BetterHealth tested HbA1c \u2014 and caught what she missed. I\u2019m not angry. I\u2019m just glad I checked.", discovery: "Pre-diabetes" },
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

export const faqs = [
  { q: "How does home sample collection work?", a: "A certified phlebotomist from our partner Lab Access Ghana comes to your home at your scheduled time. The entire process takes about 15 minutes. You\u2019ll receive a confirmation SMS with your collector\u2019s name and estimated arrival time." },
  { q: "How do I pay?", a: "We accept Mobile Money (MTN MoMo, Vodafone Cash, AirtelTigo Money), debit/credit cards, and bank transfers. All payments are processed securely through Paystack, Ghana\u2019s leading payment platform." },
  { q: "How long until I get my results?", a: "Most results are available within 48\u201372 hours after your sample is collected. You\u2019ll receive an SMS and email notification when your results are ready to view in your health dashboard." },
  { q: "Is my health data private and secure?", a: "Absolutely. BetterHealth Africa is certified by the Ghana Data Protection Commission (GDPC) under the Data Protection Act, 2012 (Act 843). You can verify our certification at https://app.dataprotection.org.gh/company/dpdZwcRth19j7oQFxmwoDj1ELCOABE. Your data is encrypted at rest and in transit. Only you and your authorized healthcare providers can access your results. We never sell your data." },
  { q: "Do I need a doctor\u2019s referral?", a: "No referral needed. BetterHealth Africa is a direct-to-consumer health platform. You can sign up, choose your package, and book your collection independently." },
  { q: "What if my results show something concerning?", a: "Our platform flags any results outside the normal range. For critical findings, you\u2019ll receive immediate notification. We recommend discussing any concerning results with a healthcare provider, and our Premium plan includes a doctor consultation." },
];

export const founderQuote = "After watching diabetes and kidney disease kill all my beloved Aunties and Uncles, when it finally came for my parents - I knew things needed to change";

export const founderStory = [
  "In Ghana, comprehensive health screening has been a privilege of the rich few; it\u2019s expensive, fragmented, and available only in a few facilities. Most people only see a doctor when something is already wrong. We\u2019re changing that.",
  "BetterHealth Africa makes proactive health monitoring accessible, affordable, and beautifully simple. Because your health shouldn\u2019t be a mystery. What you don\u2019t know about your health can kill you, so start knowing.",
];

export const footerColumns = [
  { title: "Product", links: ["How It Works", "What We Test", "Pricing", "Download App"] },
  { title: "Partners", links: ["For Doctors", "For Nutritionists", "For Labs", "Foundation", "About Us", "Careers"] },
  { title: "Support", links: ["FAQ", "Contact", "WhatsApp", "Privacy Policy", "Terms of Service"] },
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
    title: "Biomarker Trends",
    score: null,
    label: null,
    items: [],
  },
];

// ─── How It Works Page ───────────────────────────────────────────────────────

export const howItWorksPage = {
  hero: {
    eyebrow: "How It Works",
    headline: "From sign-up to results in 72 hours.",
    subheadline: "No referrals. No long queues. No confusing lab reports. BetterHealth makes comprehensive health testing as simple as ordering a ride — and just as convenient.",
    cta: "Get Started",
  },
  steps: [
    {
      num: "01",
      heading: "Sign up in under 3 minutes",
      body: "Create your BetterHealth account with your email or phone number. Tell us a few basics — age, sex, and any health concerns you would like to focus on. Then choose the plan that fits your needs.",
      expects: [
        "Account creation takes less than 3 minutes",
        "Choose from Essential, Complete, or Premium packages",
        "Pay securely with Mobile Money (MTN MoMo, Vodafone Cash, AirtelTigo Money), debit/credit card, or bank transfer via Paystack",
        "You will receive a confirmation email and SMS immediately",
      ],
    },
    {
      num: "02",
      heading: "Choose how and where you test",
      body: "You decide what works for you. Visit one of our accredited partner labs across Ghana, or book home collection and get tested in the comfort of your home. Either way, the blood draw takes about 10 minutes.",
      expects: [
        "In-lab option: Walk into any BetterHealth partner lab during opening hours. No appointment needed for Essential plans.",
        "Home collection: Pick a date and time that works for you, and our phlebotomist will be at your doorstep.",
        "You will receive an SMS confirmation with your collector's name and expected arrival time",
        "The blood draw takes 5–10 minutes",
        "Fasting required for some tests — such tests will be pre-informed when booking",
      ],
      subSection: {
        heading: "Home collection — how it works",
        body: "Our home collection service is provided through our partnership with Lab Access Ghana, one of the most established phlebotomy networks in the country. Every collector is certified, trained in venipuncture, and follows strict sample handling protocols.",
        details: [
          "Available in Greater Accra, Kumasi, and Tema (expanding to more cities)",
          "Collection window: Monday–Saturday, 6:00 AM – 12:00 PM (fasting-friendly morning slots)",
          "The collector brings everything — tubes, labels, cold chain packaging",
          "Your sample is transported to the lab within 2 hours of collection",
          "Home collection is included free with Premium plans",
          "Available as an add-on for Essential and Complete plan members",
        ],
      },
    },
    {
      num: "03",
      heading: "Clear, visual results in 48–72 hours",
      body: "No more waiting weeks. No more illegible printouts. Your results appear in your personal health dashboard — organised by organ system, colour-coded for clarity, and explained in language you actually understand.",
      expects: [
        "Results are typically available within 48–72 hours (Priority members: 48 hours)",
        "You will receive an SMS and email notification the moment your results are ready",
        "Log into your dashboard to see results organised by: Heart, Liver, Kidneys, Thyroid, Metabolic, Hormones, Blood Health, and Nutrients",
        "Every biomarker shows: your value, the reference range, a colour-coded status (green/amber/red), and a plain-language explanation",
        "Download a complete PDF report for your records or to share with your doctor",
        "Standard and Premium members receive a doctor's written report interpreting your results",
      ],
      subSection: {
        heading: "Your results, explained like a human",
        body: "Most lab reports give you a wall of numbers and abbreviations. BetterHealth translates every result into something you can actually understand and act on. Here is what you will see:",
        details: [
          "Organ System Scores — an at-a-glance view of how each body system is performing",
          "Colour-Coded Indicators — green (healthy), amber (watch), red (needs attention)",
          "Trend Charts — see how each biomarker has changed since your last test",
          "Personalised Insights — specific recommendations based on your results, age, sex, and health goals",
          "Critical Alerts — immediate notification if any result requires urgent attention",
        ],
      },
    },
    {
      num: "04",
      heading: "Know what to do next",
      body: "Results without guidance are just numbers. BetterHealth gives you clear, actionable recommendations — what to change, what to monitor, and when to test again. Track your progress over time and watch your health improve.",
      expects: [
        "Personalized recommendations based on your specific results",
        "Dietary and lifestyle suggestions tailored to your biomarker profile",
        "Alerts for any markers that need medical attention",
        "Premium members: schedule a consultation call with a doctor or nutritionist to discuss your results",
        "Set a reminder for your next screening (recommended every 6 months)",
        "Compare results across screenings to see improvement over time",
      ],
    },
  ],
  safetyCards: [
    { icon: "FlaskConical", title: "Accredited Partner Labs", body: "Every sample is processed at labs that meet Ghana Health Service standards. We do not run our own labs — we partner with established, accredited facilities so you get the same quality as a hospital without the hospital experience." },
    { icon: "UserCheck", title: "Certified Phlebotomists", body: "Every home collector is trained, certified, and background-checked through our partnership with Lab Access Ghana. They follow strict venipuncture and cold-chain protocols to ensure sample integrity." },
    { icon: "ShieldCheck", title: "Data Encryption & Privacy", body: "Your health data is encrypted at rest and in transit using industry-standard protocols. We never sell your data. Only you and healthcare providers you explicitly authorize can access your results." },
    { icon: "PackageCheck", title: "Chain of Custody", body: "Every sample is tracked from collection to result — timestamped, labelled with a unique accession number, and transported in temperature-controlled packaging. You can see the status of your sample in your dashboard." },
  ],
  faqs: [
    { q: "Do I need to fast before my blood test?", a: "Some biomarkers require fasting (no food or drink except water for 8–12 hours before collection). When you book your collection, we will tell you exactly which tests require fasting and give you clear preparation instructions via SMS." },
    { q: "How much blood is taken?", a: "A comprehensive panel typically requires 3–5 tubes of blood, totalling about 15–25 mL. That is roughly 1–2 tablespoons. Most people feel no effects afterward." },
    { q: "What if I am afraid of needles?", a: "Our phlebotomists are experienced and gentle — many patients tell us it is the most comfortable blood draw they have had. If you are particularly anxious, let us know when you book and we will pair you with a collector experienced in working with needle-shy patients." },
    { q: "Can I use my results to visit my doctor?", a: "Absolutely. You can download a complete PDF report with all your results, reference ranges, and interpretations. Many of our members share their BetterHealth reports with their doctors as part of their ongoing care." },
    { q: "What happens if a result is critically abnormal?", a: "If any result falls into a critical range, you will receive an immediate notification via SMS and in-app alert. Our system flags these results for priority review, and we recommend you consult a healthcare provider promptly. Premium members can use their included doctor consultation for this." },
  ],
  bottomCta: {
    headline: "Ready to know your health?",
    body: "The process takes less than 3 minutes to start. Choose your plan, book your collection, and get results in 48–72 hours.",
    cta: "Start Your Health Check",
  },
};

// ─── What We Test Page ────────────────────────────────────────────────────────

export const whatWeTestPage = {
  hero: {
    eyebrow: "What We Test",
    headline: "127 biomarkers. 17 body systems. One clear picture.",
    subheadline: "A typical hospital checkup tests 10–15 markers. BetterHealth tests 127 — covering your heart, liver, kidneys, thyroid, metabolism, hormones, blood health, nutrition, fertility, urine, stool, and more. Every result is explained in plain language and tracked over time.",
    cta: "Start Testing",
    intro: "Below you will find every body system we test, why it matters for your health, and the specific biomarkers included. Each plan covers a different depth — see the plan comparison at the bottom to understand which markers are included in your package.",
  },
  systems: [
    {
      icon: "Heart",
      name: "Heart & Cardiovascular",
      count: 12,
      why: "Heart disease is the leading cause of death in Ghana — and it is almost entirely preventable when caught early. Most people do not know their cardiovascular risk until they are in a hospital bed. These 12 markers give you the complete picture of your heart health, far beyond the basic cholesterol test you might get at a hospital.",
      markers: [
        { name: "Total Cholesterol", note: "the headline number, but not the full story" },
        { name: "LDL Cholesterol", note: "the 'bad' cholesterol — the one that clogs arteries" },
        { name: "HDL Cholesterol", note: "the 'good' cholesterol — the one that protects them" },
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
      callout: "Fatty liver disease affects an estimated 25% of adults globally, often without any symptoms. The ALT/AST ratio can detect it early — before irreversible scarring begins.",
    },
    {
      icon: "Droplets",
      name: "Kidney Function",
      count: 8,
      why: "Your kidneys filter 200 litres of blood every day, removing waste and regulating fluid balance. Chronic kidney disease develops silently over years — most people lose 50% of kidney function before they notice anything. In Ghana, where hypertension and diabetes are rising, kidney screening is critical. Early detection means early intervention.",
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
      callout: "High blood pressure — affecting 1 in 3 Ghanaian adults — is the leading cause of kidney disease. If you have hypertension, regular kidney monitoring is not optional. It is essential.",
    },
    {
      icon: "Gauge",
      name: "Metabolic & Diabetes",
      count: 6,
      why: "Ghana's diabetes prevalence has tripled in the last 20 years, and an estimated 70% of people with diabetes in Africa are undiagnosed. Pre-diabetes is completely reversible with lifestyle changes — but only if you know you have it. A standard fasting glucose test misses most cases of pre-diabetes. Our panel catches what standard tests miss.",
      markers: [
        { name: "Fasting Glucose", note: "your blood sugar level after overnight fasting" },
        { name: "HbA1c", note: "your average blood sugar over the past 2–3 months; the most reliable diabetes marker" },
        { name: "Insulin", note: "elevated levels signal insulin resistance years before blood sugar rises" },
        { name: "HOMA-IR", note: "the best measure of insulin resistance" },
        { name: "C-Peptide", note: "indicates how much insulin your pancreas is actually producing" },
        { name: "Fructosamine", note: "blood sugar average over the past 2–3 weeks; useful for tracking short-term changes" },
      ],
      callout: "Most doctors only test fasting glucose. But insulin resistance — the precursor to diabetes — shows up in insulin and HOMA-IR years before glucose rises. BetterHealth catches this window when lifestyle changes are most effective.",
    },
    {
      icon: "Waves",
      name: "Hormones",
      count: 10,
      why: "Hormones regulate energy, mood, sleep, weight, fertility, and muscle mass. Imbalances cause fatigue, weight changes, low mood, hair loss, irregular periods, reduced libido, and dozens of other symptoms that are frequently dismissed as 'just stress.' A full hormone panel reveals what is actually happening inside — and whether your symptoms have a treatable cause.",
      markers: [
        { name: "Testosterone (Total & Free)", note: "essential for both men and women; affects energy, mood, and muscle" },
        { name: "Estradiol", note: "the primary estrogen; critical for female reproductive health and bone density" },
        { name: "Progesterone", note: "regulates menstrual cycle and supports pregnancy" },
        { name: "DHEA-S", note: "a precursor hormone; low levels are associated with fatigue and ageing" },
        { name: "Cortisol", note: "the stress hormone; chronically elevated levels damage nearly every system" },
        { name: "FSH", note: "essential for fertility in both sexes" },
        { name: "LH", note: "works with FSH to regulate reproduction" },
        { name: "Prolactin", note: "elevated levels can indicate pituitary issues or affect fertility" },
        { name: "SHBG", note: "determines how much of your hormones are actually available for use" },
        { name: "Anti-Müllerian Hormone (AMH)", note: "the best marker of ovarian reserve (female fertility potential)" },
      ],
      callout: "Testosterone levels in men begin declining from age 30 at roughly 1% per year. Many symptoms blamed on 'getting older' — fatigue, weight gain, low mood — are actually treatable hormonal imbalances.",
    },
    {
      icon: "Sun",
      name: "Nutrients & Vitamins",
      count: 8,
      why: "Nutrient deficiencies are the silent saboteurs of health. They cause fatigue, weak immunity, poor concentration, hair loss, muscle cramps, and depression — symptoms that are often treated with medications when the real fix is nutritional. In West Africa, Vitamin D deficiency, iron deficiency, and B12 deficiency are more common than most people realize.",
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
      why: "Your blood is a living tissue that carries oxygen, fights infection, and heals wounds. A full blood count reveals anaemia, infection, blood disorders, and immune system function — all from a single tube. In Ghana, where sickle cell trait affects approximately 25% of the population, a complete blood analysis is essential baseline knowledge.",
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
      why: "Your thyroid controls your metabolism — the speed at which every cell in your body operates. An underactive thyroid causes weight gain, fatigue, depression, and cold intolerance. An overactive thyroid causes weight loss, anxiety, rapid heartbeat, and insomnia. Thyroid dysfunction is frequently undiagnosed in Africa because many doctors only test TSH. Our full panel tests five markers to catch what TSH alone misses.",
      markers: [
        { name: "TSH", note: "the first-line screening test; but it is not enough on its own" },
        { name: "Free T3 (Triiodothyronine)", note: "the active thyroid hormone; low levels cause symptoms even when TSH is normal" },
        { name: "Free T4 (Thyroxine)", note: "the storage form of thyroid hormone; converted to T3 in the body" },
        { name: "TPO Antibodies", note: "detects Hashimoto's thyroiditis, the most common autoimmune thyroid disease" },
        { name: "Thyroglobulin Antibodies", note: "another autoimmune marker; helps diagnose chronic thyroid inflammation" },
      ],
      callout: "Up to 15% of people with thyroid symptoms have a 'normal' TSH. Free T3, Free T4, and antibody tests reveal the full picture — which is why BetterHealth tests all five, not just TSH.",
    },
  ],
  planTable: {
    headline: "Which biomarkers are included in each plan?",
    subheadline: "Every plan gives you meaningful insight. Higher tiers go deeper.",
    rows: [
      { system: "Hematology", essential: "All 29", complete: "All 29", premium: "All 29" },
      { system: "Urinalysis", essential: "All 20", complete: "All 20", premium: "All 20" },
      { system: "Liver Function", essential: "All 12", complete: "All 12", premium: "All 12" },
      { system: "Lipids", essential: "All 8", complete: "All 8", premium: "All 8" },
      { system: "Renal Function", essential: "All 8", complete: "All 8", premium: "All 8" },
      { system: "Metabolic", essential: "1", complete: "1", premium: "1" },
      { system: "Uric Acid", essential: "—", complete: "✓", premium: "✓" },
      { system: "Cardiovascular", essential: "—", complete: "—", premium: "All 3" },
    ],
    cta: "Choose Your Plan",
  },
  bottomCta: {
    headline: "See the full picture. Not just a glimpse.",
    body: "A hospital checkup tests 10–15 markers and calls it comprehensive. BetterHealth tests 127 because your body deserves better than a sample.",
    cta: "Start Your Health Check",
  },
};

// ─── Stories Page ──────────────────────────────────────────────────────────────────

export const storiesPage = {
  hero: {
    eyebrow: "BetterHealth Stories",
    headline: "The tests their doctors never ordered.",
    subheadline: "Real people. Real results. These are Ghanaians who tested early — and found something worth catching while there was still time to do something about it.",
  },
  stories: [
    {
      tag: "Pre-diabetes",
      tagColor: "amber",
      name: "Ama",
      age: 34,
      city: "Accra",
      headline: "“I felt completely fine. My HbA1c said otherwise.”",
      narrative: [
        "Ama is 34, runs a small marketing agency out of East Legon, and has the kind of relationship with her doctor where she only shows up when something hurts. She didn’t sign up for BetterHealth — her older sister did, then nagged her about it at a family lunch until she gave in.",
        "Her sister had run her own panel and was on a self-improvement kick. “She kept saying — you have nothing to lose, you’ll see your numbers, it’s a few hundred cedis.” Ama agreed mostly to end the argument. She booked a Saturday morning collection and forgot about it for nearly two weeks until the email landed in her inbox.",
        "The dashboard was mostly green. Then she got to the metabolic section. Her HbA1c was 6.1% — flagged amber, labelled pre-diabetic. She’d had a fasting glucose at the polyclinic six months earlier; it came back 5.4, which her doctor had called normal. “I remember thinking — wait, what is HbA1c? Why didn’t anyone test this?” She googled it that night, then again the next morning.",
        "What hit her wasn’t the result itself but the timeline. HbA1c is a three-month average. So for at least three months — probably longer — her body had been quietly struggling with sugar and she hadn’t felt a thing. Her grandmother had died of complications from Type 2. Her uncle was on insulin. “I always thought I’d get tested in my forties. Not now.”",
        "Ama didn’t go scorched-earth. She cut sugary drinks, started walking after dinner — mostly with her sister on FaceTime — and got bored of strict diet tracking after about a week. Six months later, on a follow-up panel, her HbA1c was 5.6%. Just inside normal range. Her insulin was still something her doctor wanted to keep watching. “I’m not ‘cured.’ I’m paying attention. That’s the difference.”",
      ],
      numbers: [
        { label: "HbA1c", before: "6.1%", after: "5.6%", status: "pre-diabetic → normal range" },
        { label: "Fasting Glucose", before: "5.4 mmol/L", after: null, status: "“normal” — missed the signal entirely" },
        { label: "Insulin", before: "14.2 mIU/L", after: null, status: "elevated — still being monitored" },
        { label: "HOMA-IR", before: "3.4", after: null, status: "insulin resistant" },
      ],
      quote: "“My doctor tested glucose. That’s what she’d been taught to test. I’m not angry at her. I’m just glad I tested the other thing.”",
    },
    {
      tag: "Hypertension",
      tagColor: "orange",
      name: "Kofi",
      age: 45,
      city: "Tema",
      headline: "“My blood pressure had been at stroke level for years. I felt nothing.”",
      narrative: [
        "Kofi is 45, teaches mathematics at a secondary school in Tema, and is the kind of man who eats well by Ghanaian standards — not too much red meat, no smoking, a beer maybe twice a month. His father collapsed at 62 from a stroke and spent his final two years unable to speak. That sat somewhere in the back of Kofi’s mind. Not urgently. Just there.",
        "He’d had his blood pressure checked at a pharmacy kiosk a few years back. The reading was 138/88. The pharmacist said it was a bit high and told him to ease up on salt. Kofi cut saltfish from his diet for about three weeks and considered the matter resolved.",
        "His wife signed them both up for BetterHealth as a shared resolution after the new year. Kofi agreed without much enthusiasm. When the results arrived, the first thing the dashboard flagged was his blood pressure: 162/98 mmHg. Stage 2 hypertension. The plain-language explanation used the phrase ‘significantly elevated stroke risk’ and listed his father’s profile — male, age 60s, family history — as exactly the pattern that should not go unmanaged.",
        "He went to a doctor he hadn’t seen in four years. The doctor confirmed the reading on two separate visits and started him on a low-dose antihypertensive. She also ordered a kidney function panel — hypertension and kidneys are linked in ways Kofi hadn’t known about. His creatinine came back at the upper edge of normal. “She said my kidneys were compensating. That I’d probably had this for years without knowing.”",
        "Three months in, his BP was 126/80. Six months in, it was 122/78. He takes a small white tablet every morning with his tea. He jokes that it is the most important thing he does before 7 a.m. His father never had the option. “I think about that every time I take it. He didn’t have a test. He had a stroke. That’s the only difference between us.”",
      ],
      numbers: [
        { label: "Systolic BP", before: "162 mmHg", after: "122 mmHg", status: "Stage 2 hypertension → normal" },
        { label: "Diastolic BP", before: "98 mmHg", after: "78 mmHg", status: "elevated → normal" },
        { label: "Creatinine", before: "106 µmol/L", after: null, status: "upper normal — kidneys under pressure" },
      ],
      quote: "“My father had a stroke before he turned 63. I was on the same path and didn’t know it. The test caught me in time.”",
    },
    {
      tag: "Cardiovascular risk",
      tagColor: "red",
      name: "Maxwell",
      age: 34,
      city: "Cape Coast",
      headline: "“My cholesterol was ‘fine.’ My real risk was hiding underneath.”",
      narrative: [
        "Maxwell is 34, works in procurement for a state corporation in Cape Coast, and has two kids under six. He’d never thought much about heart disease until his cousin Yaw collapsed at a wedding in December. Yaw was 38. He survived, but barely. The cardiologist told the family it had been building silently for years.",
        "Maxwell booked a panel the following week. He half-expected to be told he was fine — he wasn’t overweight, his blood pressure had been normal at his last check-up, and his cholesterol had always come back inside the lines on the standard tests. “I went in to get reassured,” he says. “That’s not what happened.”",
        "His total cholesterol was 5.1 mmol/L — borderline-but-okay by GP standards. His ApoB, though, was 1.12 g/L. Elevated. His Lp(a) was 78 nmol/L. High. The dashboard explained that ApoB counts the actual number of harmful particles in his blood — and that you can have ‘normal’ cholesterol while ApoB is high, because the particles are smaller and more numerous than a basic test can see. Lp(a) was the one that scared him most: genetic, set for life, not changeable by diet.",
        "His doctor was sceptical at first. “She said — your cholesterol is fine, why are you here.” Maxwell brought the dashboard printout, asked her to look at ApoB specifically, asked about Yaw. She referred him to a cardiologist. The cardiologist started him on a low-dose statin and walked him through Mediterranean-style eating — more fish, more vegetables, less red meat, less alcohol on the weekends with his old schoolmates.",
        "Six months in, his ApoB had dropped to 0.78 — well inside healthy. His Lp(a) didn’t budge; it can’t, that’s the point. But knowing his number means his cardiologist now monitors him closely, and his kids will get tested earlier than he ever was. “I think about Yaw every time I take that pill,” he says. “I’m here because he wasn’t.”",
      ],
      numbers: [
        { label: "Total Cholesterol", before: "5.1 mmol/L", after: null, status: "borderline — missed the real issue" },
        { label: "ApoB", before: "1.12 g/L", after: "0.78 g/L", status: "elevated → healthy" },
        { label: "Lp(a)", before: "78 nmol/L", after: null, status: "high — genetic, lifelong monitoring" },
        { label: "LDL Cholesterol", before: "3.2 mmol/L", after: "2.1 mmol/L", status: "borderline → optimal" },
      ],
      quote: "“My cholesterol number was fine. It just wasn’t the right number to be looking at.”",
    },
    {
      tag: "Fatty liver",
      tagColor: "yellow",
      name: "Nana",
      age: 42,
      city: "Accra",
      headline: "“I don’t drink. My liver was still in trouble.”",
      narrative: [
        "Nana runs a small import business out of Spintex, has three kids, and just turned 42. He doesn’t drink — never has, not even socially — and stays active because he plays five-a-side football most Sundays. When he signed up for BetterHealth, he genuinely expected nothing useful to come of it. “I thought of it like a yearly car service. I take care of myself; I just wanted the printout to confirm it.”",
        "His ALT came back at 68 U/L. His GGT was 85. Both flagged amber. The dashboard pointed him toward non-alcoholic fatty liver — which he laughed at, briefly, then stopped laughing when he read that around a quarter of adults globally have it and most don’t know.",
        "His doctor sent him for an ultrasound. The radiologist confirmed mild fatty infiltration. “Nobody used the word ‘cirrhosis’ or anything frightening,” Nana says, “but he was clear: if I ignored it for ten years it could get worse.” The driver, the doctor said, was almost certainly his diet — heavy on starches, takeaways three or four times a week, plenty of fruit juice he’d been telling himself was healthy.",
        "Nana didn’t go on a punishing diet. He cut fruit juice entirely — that was the single biggest change — switched white rice for brown most days, and started bringing lunch to work instead of buying it. He still has waakye on Saturdays because he refuses to give that up. His football kept going.",
        "After about eight months his ALT was at 34, GGT at 41. Both inside normal. His liver isn’t perfect — the ultrasound still shows mild fat — but the inflammation is gone and the trajectory is the right way. “The thing that stays with me is that I felt nothing. No pain, no symptom, no warning. If I’d waited for my body to tell me something was wrong, it would have been too late.”",
      ],
      numbers: [
        { label: "ALT", before: "68 U/L", after: "34 U/L", status: "elevated → normal" },
        { label: "GGT", before: "85 U/L", after: "41 U/L", status: "elevated → normal" },
        { label: "AST", before: "42 U/L", after: "27 U/L", status: "elevated → normal" },
        { label: "Triglycerides", before: "2.4 mmol/L", after: "1.5 mmol/L", status: "high → normal" },
      ],
      quote: "“I assumed liver problems meant alcohol. The dashboard taught me they often mean rice and fruit juice.”",
    },
    {
      tag: "Stroke risk",
      tagColor: "red",
      name: "Abena",
      age: 50,
      city: "Kumasi",
      headline: "“My doctor said I was fine. My arteries told a different story.”",
      narrative: [
        "Abena is 50, works as a senior administrator at a polytechnic in Kumasi, and has spent thirty years looking after everyone else’s paperwork and almost none of her own health. She is the person colleagues call when something needs organising. She is not the person who books her own appointments.",
        "She had a brief dizzy spell at her desk in February — not dramatic, just a moment where the room tilted slightly and then righted itself. A colleague made her go to the clinic. The nurse took her BP: 148/94. She was told to rest and come back if symptoms returned. She rested. She didn’t go back.",
        "Her daughter, a nurse herself, signed Abena up for a BetterHealth panel in April and told her not to argue about it. The results arrived on a Tuesday. Her blood pressure reading on the panel was 156/96. Her C-Reactive Protein — a marker of arterial inflammation — was 8.4 mg/L, nearly triple the upper safe limit. Her fibrinogen, a clotting protein that raises stroke risk when elevated, was at 5.1 g/L. Her total cholesterol was 6.4 mmol/L. The dashboard laid it out in plain language: she had three independent risk factors for stroke, and they were all elevated at the same time.",
        "Her daughter took her to a specialist. The cardiologist ordered a carotid ultrasound. It found early plaque formation in the left carotid artery — the artery that feeds the brain. “That dizzy spell wasn’t nothing,” the cardiologist told her. “That was your body sending a message.” Abena went on antihypertensives, a statin, and low-dose aspirin. She came back to the clinic every six weeks for the first three months.",
        "At six months, her BP was 128/82. Her CRP had dropped to 2.1. Her cholesterol was 4.8. The plaque has not progressed. “My daughter saved my life by nagging me,” Abena says. “She knew what the numbers meant. I didn’t. Now I do. And I will not stop checking them.”",
      ],
      numbers: [
        { label: "Systolic BP", before: "156 mmHg", after: "128 mmHg", status: "hypertensive → controlled" },
        { label: "C-Reactive Protein", before: "8.4 mg/L", after: "2.1 mg/L", status: "high inflammation → normal" },
        { label: "Fibrinogen", before: "5.1 g/L", after: null, status: "elevated — clot risk marker" },
        { label: "Total Cholesterol", before: "6.4 mmol/L", after: "4.8 mmol/L", status: "high → healthy" },
      ],
      quote: "“I had a dizzy spell and dismissed it. The scan found plaque in my carotid artery. That dizzy spell was a warning I nearly ignored.”",
    },
    {
      tag: "H. pylori infection",
      tagColor: "green",
      name: "Akua",
      age: 36,
      city: "Accra",
      headline: "“I’d been treating stomach pain for five years. The cause was bacterial.”",
      narrative: [
        "Akua is 36, works as a branch manager at a bank in Accra, and had been buying antacids in bulk for nearly five years. She’d see a doctor once a year, sometimes less. They’d press on her stomach, ask about stress, prescribe omeprazole. It would work for a few weeks, then the burning would come back.",
        "Her mother had died of stomach cancer at 58, but no one in the family had connected the dots. “My mother had stomach problems for years too. I just thought it was stress, like everyone said.” Her younger brother eventually persuaded her to do a BetterHealth panel. He’d done one. He kept calling her about it. She agreed, mostly to make him stop calling.",
        "Her H. pylori antibody came back positive. The dashboard explained — clearly, in plain language — that this was a bacterium that infects the stomach lining, causes ulcers, and if left untreated for decades can dramatically raise stomach cancer risk. It also said, in the same paragraph, that treatment was a 14-day course of antibiotics, and that most patients are clear after one course.",
        "She took the result to her doctor, who confirmed with a follow-up test and started her on the triple-therapy course. Two of the antibiotics made her nauseous for the first three days. She finished the course anyway. The burning, which she’d taken as a normal part of her life, was gone within a month.",
        "A retest at three months confirmed she was clear. Her mother’s diagnosis still haunts her — there’s no way to know if the same infection had been quietly working on her mother’s stomach for years before the cancer appeared. “My brothers are all testing now. We grew up in the same house, eating from the same pot. If one of us has it, we probably all do.”",
      ],
      numbers: [
        { label: "H. pylori Antibody", before: "Positive", after: "Negative", status: "active infection → cleared" },
        { label: "Stomach pain", before: "Weekly", after: "None", status: "5 years → resolved" },
      ],
      quote: "“Five years of antacids didn’t fix it. Two weeks of antibiotics did. I wish my mother had known.”",
    },
  ],
  callForStories: {
    headline: "Have a BetterHealth story?",
    body: "If BetterHealth revealed something important about your health, we\u2019d love to hear about it. Your story could help someone else take the step to get tested. All stories are shared with your explicit consent, and you can choose to remain anonymous.",
    cta: "Share Your Story",
  },
  bottomCta: {
    headline: "Your story starts with a test.",
    body: "Every discovery above started the same way — someone decided to check. Don\u2019t wait for symptoms. Don\u2019t assume you\u2019re fine. Know for sure.",
    cta: "Start Your Health Check",
  },
};

// ─── About Page ───────────────────────────────────────────────────────────────────────

export const aboutPage = {
  hero: {
    eyebrow: "About BetterHealth",
    headline: "We believe Africans deserve to know their health — not after illness strikes, but before.",
    subheadline: "BetterHealth Africa is a health technology company on a mission to make proactive health monitoring accessible, affordable, and beautifully simple for every African.",
  },
  problem: {
    headline: "Healthcare in Africa is built for treatment. We\u2019re building it for prevention.",
    body: [
      "In Ghana, most people only see a doctor when something is wrong. A headache that will not go away, unexplained weight loss, fatigue that does not lift. By then, conditions that were treatable have often progressed. Prevention is not part of the culture \u2014 not because Africans do not value their health, but because the infrastructure for proactive screening barely exists.",
      "Comprehensive health screening has been a privilege reserved for the wealthy few who can afford private hospitals charging GHS 6,250 or more. For everyone else, healthcare means waiting until you\u2019re sick, queuing at an overcrowded facility, and hoping for the best.",
      "We\u2019re changing that equation.",
    ],
    stats: [
      { value: "70%", label: "of diabetes cases in Africa are undiagnosed" },
      { value: "1 in 3", label: "Ghanaian adults has hypertension" },
      { value: "1 in 4", label: "Ghanaians carries the sickle cell trait" },
      { value: "25%", label: "of adults globally have fatty liver disease \u2014 most don\u2019t know" },
      { value: "12x", label: "the cost of managing diabetes vs. preventing it" },
    ],
  },
  founder: {
    sectionLabel: "Why I Built This",
    narrative: [
      "I was raised in a small town in Ghana, where life was modest but rich in ways money couldn\u2019t buy, except for one constant shadow. All through my childhood, I watched my family lose people to diabetes and the diseases that travel with it: cardiovascular disease, kidney failure, amputations. First it took my grandparents. Then, one after another, my uncles and aunts.",
      "It happened so consistently that it shaped how we thought about aging. Subconsciously, an unspoken tradition formed in my extended family: once any of us began approaching 50, we braced ourselves for the long, drawn-out battle. We knew how it would end. We just didn\u2019t know how long the goodbye would take. It was a grim inheritance no one named out loud, but everyone carried.",
      "In 2019, the disease finally came for my father. He fought for two years. He lost his leg. But, against every precedent in our family, he kept his life \u2014 becoming the only man in my extended family to survive what had killed all his brothers. The relief was short-lived. After 2020, we began to notice something far more frightening: the disease was no longer waiting for 50. It was reaching the younger generation. Cousins in their thirties. Relatives barely into their forties. The pattern was accelerating.",
      "In 2022, I moved to the UK. A year later, in 2023, the disease came for me. I spent two weeks in hospital, fighting for my life against diabetic ketoacidosis. The NHS pulled me back from the edge. And then something happened that no one in my family had ever seen: within 18 months of my diagnosis, my doctors told me my diabetes was in reversal.",
      "I was the first. Not just to survive \u2014 but to defeat it.",
      "That lit a fire in me I haven\u2019t been able to put out since. Through the NHS, I learned what my family had never been told: diabetes can be prevented through regular health testing, and reversed when caught early. The science wasn\u2019t missing. The infrastructure was. The knowledge that saved my life simply had not reached the people I came from.",
      "I founded BetterHealth Africa to change that. We are building a platform that makes preventive health testing and tracking accessible and affordable for Africa\u2019s 1.2 billion people \u2014 the population most at risk of developing these diseases, and the least equipped to detect them early.",
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
        title: "Prevention Over Treatment",
        body: "The healthcare system waits for you to get sick. We do not. BetterHealth exists to shift the paradigm from reactive treatment to proactive prevention \u2014 giving you the information to act before symptoms appear.",
      },
      {
        icon: "Eye",
        title: "Transparency Over Complexity",
        body: "No confusing lab reports. No hidden fees. Everything we do is designed to be understood \u2014 from your biomarker results to your subscription price. If it is not clear, we have not done our job.",
      },
      {
        icon: "Globe",
        title: "Access Over Exclusivity",
        body: "Comprehensive health screening should not cost GHS 6,250 and require a referral. We have built a platform that makes world-class lab testing accessible to every Ghanaian \u2014 not just the privileged few.",
      },
    ],
  },
  howWeWork: {
    headline: "We are a health technology company \u2014 not a lab.",
    body: [
      "BetterHealth does not run laboratories. We partner with accredited, established labs across Ghana to process your samples. Our role is the technology, the experience, and the intelligence layer on top.",
      "We build the dashboard that organises your results by organ system. We write the explanations that make your numbers meaningful. We track your biomarkers over time so you can see trends. And we connect you with doctors and nutritionists who can help you act on what the data reveals.",
      "Think of us as the bridge between the lab and your understanding.",
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
        description: "All payments \u2014 Mobile Money, cards, and bank transfers \u2014 are processed through Paystack, Ghana\u2019s leading payment infrastructure provider. Your financial data never touches our servers.",
      },
      {
        name: "Supabase",
        description: "Our data infrastructure is built on Supabase, providing enterprise-grade database security, row-level access control, and encrypted data storage that meets international healthcare data standards.",
      },
    ],
  },
  roadmap: {
    headline: "Where we\u2019re headed",
    intro: "BetterHealth launched in Ghana in 2026 , and this is just the beginning. Here is what we are building toward:",
    milestones: [
      { year: "2026", text: "Launch in Greater Accra, Ashanti Region, Eastern & Central Regions" },
      { year: "2026", text: "Expand home collection to all major Ghanaian cities" },
      { year: "2027", text: "Launch mobile app (iOS & Android)" },
      { year: "2027", text: "Expand to Nigeria and Kenya" },
      { year: "2027", text: "Introduce AI-powered health insights" },
      { year: "2028", text: "Pan-African availability across 10+ countries" },
    ],
    closing: "Our goal is to make BetterHealth the default health screening platform for Africa \u2014 the way Africans take control of their own health data and their own health outcomes.",
  },
  joinUs: {
    headline: "Help us build the future of African healthcare",
    body: "We\u2019re a small, ambitious team solving one of the most important problems on the continent. We don\u2019t have a fixed list of open roles \u2014 but if you believe in what we\u2019re building and know how you\u2019d contribute, we want to hear from you. Tell us the role you\u2019d love to own.",
    cta: "Pitch Your Role",
    fallback: "Email us at careers@betterhealth.africa with your CV and the position you\u2019d love to fill.",
  },
  bottomCta: {
    headline: "We started BetterHealth for the people who never get tested.",
    body: "If that\u2019s you \u2014 or someone you love \u2014 start here.",
    cta: "Start Your Health Check",
  },
};

// ─── Pricing Page ───────────────────────────────────────────────────────────────────

export const pricingPage = {
  hero: {
    eyebrow: "Transparent Pricing",
    headline: "Invest in knowing \u2014 not in guessing.",
    subheadline: "What would cost GHS 6,250+ at a private hospital is a fraction of that with BetterHealth. No referrals, no hidden fees, no surprises. All plans include your health dashboard, results, and intelligent health insights.",
  },
  valueAnchor: "A comprehensive health screen at a private hospital in Ghana costs between GHS 2,970 and GHS 6,250 - if they even offer all the tests. BetterHealth starts at GHS 2 per day.",
  plans: [
    {
      name: "Essential",
      tagline: "For individuals who want to know where their health stands.",
      monthly: "GHS 61",
      annual: "GHS 730",
      daily: "GHS 2",
      popular: false,
      includes: [
        "Physical Health:",
        "Height",
        "Weight",
        "Body Mass Index (BMI)",
        "Waist-to-height ratio",
        "Blood Pressure",
        "Biological Health:",
        "Full blood count",
        "Blood sugar",
        "Kidney function test",
        "Liver function test",
        "Urine routine examination",
        "Heart health test",
        "Biological Age*",
      ],
      excludes: [],
      cta: "Get Started \u2014 Essential",
    },
    {
      name: "Complete",
      badge: "MOST POPULAR",
      tagline: "For individuals who want clear medical guidance alongside their results.",
      monthly: "GHS 163",
      annual: "GHS 1,953",
      daily: "GHS 5",
      popular: true,
      includes: [
        "Physical Health:",
        "Height",
        "Weight",
        "Body Mass Index (BMI)",
        "Waist-to-height ratio",
        "Blood Pressure",
        "Biological Health:",
        "Full blood count",
        "Blood sugar",
        "Kidney function test",
        "Liver function test",
        "Urine routine examination",
        "Heart health test",
        "Uric acid",
        "Biological Age*",
        "Doctor\u2019s written report",
        "Standard nutritional plan",
      ],
      excludes: [],
      cta: "Get Started \u2014 Complete",
    },
    {
      name: "Premium",
      tagline: "For individuals with elevated risk, a family history of chronic disease, or who want the most comprehensive monitoring available.",
      monthly: "GHS 414",
      annual: "GHS 4,957",
      daily: "GHS 19",
      popular: false,
      includes: [
        "Physical Health:",
        "Height",
        "Weight",
        "Body Mass Index (BMI)",
        "Waist-to-height ratio",
        "Blood Pressure",
        "Biological Health:",
        "Full blood count",
        "Blood sugar",
        "Kidney function test",
        "Liver function test",
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
      excludes: [],
      cta: "Get Started \u2014 Premium",
    },
  ],
  trustBadges: [
    "Mobile Money Accepted (MTN MoMo, Vodafone Cash, AirtelTigo)",
    "Card Payments via Paystack (Visa, Mastercard)",
    "14-Day Satisfaction Guarantee",
    "Cancel Anytime Before Renewal",
  ],
  finePrint: "All plans are billed annually. Your subscription begins the day you sign up and renews automatically after 12 months. You can cancel at any time before renewal \u2014 no penalties, no questions. If you\u2019re not satisfied within the first 14 days (before your first test), we\u2019ll refund you in full.",
  comparison: {
    headline: "Compare plans at a glance",
    rows: [
      { feature: "Biomarkers tested", essential: "67+", complete: "100+", premium: "127" },
      { feature: "Screenings per year", essential: "2", complete: "2", premium: "3" },
      { feature: "Home collection", essential: "Add-on", complete: "Add-on", premium: "Included" },
      { feature: "Organ system dashboard", essential: true, complete: true, premium: true },
      { feature: "Plain-language explanations", essential: true, complete: true, premium: true },
      { feature: "PDF report", essential: true, complete: true, premium: true },
      { feature: "Biomarker trend tracking", essential: false, complete: true, premium: true },
      { feature: "Personalized recommendations", essential: false, complete: true, premium: true },
      { feature: "Doctor\u2019s written report", essential: false, complete: true, premium: true },
      { feature: "Priority results (48hr)", essential: false, complete: true, premium: true },
      { feature: "Advanced cardio markers (ApoB, Lp(a))", essential: false, complete: true, premium: true },
      { feature: "Doctor consultation call", essential: false, complete: false, premium: true },
      { feature: "Nutritionist consultation", essential: false, complete: false, premium: true },
      { feature: "Customised screening", essential: false, complete: false, premium: "1/year" },
      { feature: "Family discount", essential: false, complete: false, premium: "20% off" },
      { feature: "Support level", essential: "Standard", complete: "Standard", premium: "Priority + dedicated" },
    ],
  },
  hospitalComparison: {
    headline: "What this would cost you elsewhere",
    body: "We surveyed private hospitals and diagnostic centres across Accra. Here\u2019s a comparative analyses on the costs of blood testing in a typical Hospital and with BetterHealth (BH):",
    rows: [
      { test: "Full Blood Count (CBC)", hospital: "GHS 200\u2013300", bh: "Offered twice" },
      { test: "Lipid Panel (Cholesterol)", hospital: "GHS 200\u2013400", bh: "Offered twice" },
      { test: "Liver Function Tests", hospital: "GHS 250\u2013500", bh: "Offered twice" },
      { test: "Kidney Function Tests", hospital: "GHS 200\u2013450", bh: "Offered twice" },
      { test: "HbA1c + Fasting Glucose", hospital: "GHS 150\u2013350", bh: "Offered twice" },
      { test: "Urine routine examination", hospital: "GHS 170\u2013250", bh: "Offered twice" },
      { test: "Biological Age*", hospital: "Not Offered", bh: "Offered twice" },
      { test: "Body Mass Index (BMI)", hospital: "Not Offered", bh: "Offered twice" },
      { test: "Waist-to-height ratio", hospital: "Not Offered", bh: "Offered twice" },
      { test: "Personalised health insights", hospital: "Not Offered", bh: "Offered twice" },
      { test: "Doctor\u2019s result review", hospital: "GHS 300\u2013500", bh: "Offered twice" },
      { test: "Nutritional plan", hospital: "GHS 1,500\u20133,500", bh: "Offered twice" },
      { test: "Estimated total", hospital: "GHS 2,970\u20136,250", bh: "GHS 1,953/year", isTotals: true },
    ],
    footnote: "BetterHealth gives you more health insights for a fraction of the cost from traditional hospitals.",
  },
  singleTests: {
    headline: "Not ready for a subscription? Start with a disease panel.",
    body: "Track a specific organ system and your chances of getting a disease. This package is built for those with a family history of a specific disease and want to prevent it or monitor it. No subscription required. Pay for only what you need to track.",
    examples: [
      { name: "Kidney Disease Tracker", price: "GHS 250" },
      { name: "Diabetes Tracker", price: "from GHS 250" },
      { name: "Liver Disease Tracker", price: "GHS 200" },
      { name: "Cardiovascular Disease Tracker", price: "GHS 300" },
      { name: "Fertility Tracker", price: "Coming soon" },
      { name: "PCOS Tracker", price: "Coming soon" },
    ],
    cta: "Browse All Tests",
    note: "Individual test prices vary by location. Home collection is available as an add-on from GHS 150.",
  },
  faqs: [
    {
      q: "Can I pay with Mobile Money?",
      a: "Yes. We accept MTN MoMo, Vodafone Cash, and AirtelTigo Money. You can also pay with Visa, Mastercard, or bank transfer. All payments are processed securely through Paystack.",
    },
    {
      q: "Can I switch plans later?",
      a: "Yes. You can upgrade to a higher plan at any time \u2014 you\u2019ll only pay the difference for the remainder of your billing cycle. Downgrades take effect at your next renewal.",
    },
    {
      q: "What\u2019s the 14-day satisfaction guarantee?",
      a: "If you sign up and decide BetterHealth isn\u2019t right for you within the first 14 days, we\u2019ll refund your payment in full \u2014 no questions asked. This applies to your first subscription only.",
    },
    {
      q: "Do you offer family or group pricing?",
      a: "Premium plan members receive 20% off for each additional family member they add. For corporate or group enquiries (10+ people), contact us at hello@betterhealth.africa for custom pricing.",
    },
    {
      q: "Is this a recurring charge?",
      a: "Yes. All plans are billed annually and renew automatically. You\u2019ll receive a reminder email 14 days before renewal. You can cancel at any time through your account settings \u2014 no penalties, no questions.",
    },
    {
      q: "Are there any hidden fees?",
      a: "None. Your subscription price covers everything listed in your plan. The only optional add-on is home collection for Essential and Complete plan members. Premium plan includes home collection at no extra charge.",
    },
  ],
  bottomCta: {
    headline: "Your health is worth more than the price of a test.",
    body: "Choose the plan that fits your life. Every plan gives you more insight in one visit than most people get in a decade of doctor visits.",
    cta: "Get Started",
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
        a: "BetterHealth is a health technology platform that gives you access to comprehensive blood testing (127 biomarkers), organized by body system, with plain-language explanations and trend tracking over time. We partner with accredited labs across Ghana to process your samples and deliver your results to a personal health dashboard within 48–72 hours.",
      },
      {
        q: "Who is BetterHealth for?",
        a: "Any adult (18+) in Ghana who wants to understand their health proactively — not just when something goes wrong. Our members include young professionals monitoring their baseline health, couples planning families, people with family histories of chronic disease, fitness enthusiasts tracking performance, and anyone who is tired of guessing about their health.",
      },
      {
        q: "Do I need a doctor's referral to use BetterHealth?",
        a: "No. BetterHealth is a direct-to-consumer platform. You sign up, choose your plan, book your collection, and receive your results — all without a referral. If you would like to discuss your results with a doctor, our Premium plan includes a consultation, or you can share your downloadable PDF report with any healthcare provider.",
      },
      {
        q: "Is BetterHealth a hospital or laboratory?",
        a: "No. BetterHealth is a health technology company. We do not run labs — we partner with established, accredited laboratories in Ghana to process your samples. Our role is the technology platform, the health dashboard, the explanations, the tracking, and the experience.",
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
        a: "After you sign up and choose your plan, you book a collection — either at one of our partner labs or via home collection. A certified phlebotomist draws a small blood sample (about 15–25 mL across 3–5 tubes). The sample is transported to the lab, processed, and your results appear in your dashboard within 48–72 hours.",
      },
      {
        q: "Can I get my blood drawn at home?",
        a: "Yes. Home collection is included free with Complete and Premium plans. Essential plan members can add home collection for GHS 50 per visit. A certified phlebotomist from Lab Access Ghana comes to your home at your scheduled time. Available Monday–Saturday, 6:00 AM – 12:00 PM.",
      },
      {
        q: "Where are the partner labs located?",
        a: "Our partner labs are located across Greater Accra, Kumasi, and Tema. When you book an in-lab collection, we will show you the nearest locations with available appointment slots. All partner labs are accredited and follow Ghana Health Service standards.",
      },
      {
        q: "Do I need to fast before my test?",
        a: "Some biomarkers require fasting — no food or drink (except water) for 8–12 hours before collection. When you book, we will tell you exactly which tests require fasting and send you preparation instructions via SMS. If your plan includes fasting markers, we recommend booking a morning slot.",
      },
      {
        q: "How much blood is taken?",
        a: "A comprehensive panel requires about 15–25 mL of blood across 3–5 tubes. That is roughly 1–2 tablespoons. Most people feel no effects afterward. If you are prone to dizziness, let your phlebotomist know — they will have you sit or lie down during and after the draw.",
      },
      {
        q: "What if I am afraid of needles?",
        a: "You are not alone — many people are. Our phlebotomists are experienced and trained to make the process as comfortable as possible. The draw takes about 60 seconds. If you are particularly anxious, let us know when you book and we will pair you with a collector experienced in working with needle-shy patients. Some members find that the home collection option feels less clinical and more comfortable than visiting a lab.",
      },
      {
        q: "How are my samples handled after collection?",
        a: "Every sample is labelled with a unique accession number, stored in temperature-controlled packaging, and transported to the lab within 2 hours of collection. We maintain a full chain of custody — from the moment the tube is drawn to the moment the result is reported. You can track your sample's status in your dashboard.",
      },
    ],
  },
  {
    category: "Results & Dashboard",
    items: [
      {
        q: "How long until I get my results?",
        a: "Most results are available within 48–72 hours after your sample is collected. Priority members (Complete and Premium plans) typically receive results within 48 hours. You will get an SMS and email notification the moment your results are ready.",
      },
      {
        q: "How do I access my results?",
        a: "Log into your BetterHealth dashboard at app.betterhealth.africa using the same email and password you signed up with. Your results are organized by body system (Heart, Liver, Kidneys, Thyroid, Metabolic, Hormones, Blood, Nutrients) with colour-coded indicators and plain-language explanations.",
      },
      {
        q: "What do the colours in my dashboard mean?",
        a: "Green = healthy/optimal range. Your biomarker is where it should be.\nAmber = watch zone. Your biomarker is outside the optimal range but not yet critical. Monitor and consider lifestyle changes.\nRed = needs attention. Your biomarker is significantly outside the normal range. We recommend discussing this with a healthcare provider.",
      },
      {
        q: "Can I download my results?",
        a: "Yes. Every member can download a complete PDF report with all biomarker values, reference ranges, and status indicators. You can share this PDF with your doctor, keep it for your records, or print it.",
      },
      {
        q: "What is the difference between \"normal\" and \"optimal\" ranges?",
        a: "\"Normal\" ranges are based on population averages — they tell you whether you are within the range of what is common, not necessarily what is healthy. \"Optimal\" ranges are tighter and based on the latest research on disease prevention. BetterHealth shows you both, because being \"normal\" and being \"optimal\" are often two different things.",
      },
      {
        q: "Can I share my results with my doctor?",
        a: "Absolutely. Download your PDF report and bring it to any appointment. Many of our members use their BetterHealth reports as a starting point for conversations with their doctors. The report includes all biomarker values, reference ranges, and explanations — everything a doctor needs to review your results.",
      },
      {
        q: "What if a result is critically abnormal?",
        a: "If any result falls into a critical range, you will receive an immediate notification via SMS and in-app alert. Our system flags these for priority review. We strongly recommend consulting a healthcare provider promptly. Premium members can use their included doctor consultation for this purpose.",
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
        a: "All plans are billed annually (once per year). When you sign up, you pay for the full year upfront. Your subscription renews automatically after 12 months. We will send you a reminder email 14 days before renewal.",
      },
      {
        q: "Can I cancel my subscription?",
        a: "Yes. You can cancel at any time through your account settings. Cancellation takes effect at the end of your current billing period — you will retain access to your dashboard and results until then. No penalties, no cancellation fees.",
      },
      {
        q: "Is there a satisfaction guarantee?",
        a: "Yes. If you sign up and decide BetterHealth is not right for you within the first 14 days, we will refund your payment in full — no questions asked. This applies to your first subscription only.",
      },
      {
        q: "Can I upgrade or downgrade my plan?",
        a: "Yes. You can upgrade at any time — you will only pay the difference for the remainder of your billing cycle. Downgrades take effect at your next renewal date.",
      },
      {
        q: "Do you offer family or group pricing?",
        a: "Premium plan members receive 20% off for each additional family member they add. For corporate or group enquiries (10+ people), contact us at hello@betterhealth.africa for custom pricing.",
      },
      {
        q: "Can I buy a single test without subscribing?",
        a: "Yes. BetterHealth also offers individual tests and disease-specific panels (e.g., Diabetes Panel, Thyroid Panel) as one-time purchases — no subscription required. Visit the Tests page to browse available options.",
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
        a: "Only you can see your results. No one at BetterHealth — including our staff — can access your individual health data without your explicit authorization. If you choose to share your results (e.g., with a doctor), you control that process.",
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
        a: "No. BetterHealth provides health screening and monitoring — not diagnosis or treatment. If your results show something concerning, we recommend consulting a healthcare provider. Our Premium plan includes a doctor consultation call, and your downloadable PDF report can be shared with any doctor.",
      },
      {
        q: "Are your tests accurate?",
        a: "Yes. All samples are processed at accredited laboratories using the same equipment and methodologies as hospitals. Our partner labs follow quality control protocols including daily calibration, control sample testing, and proficiency testing programmes.",
      },
      {
        q: "Can BetterHealth diagnose diseases?",
        a: "BetterHealth screens for early indicators and risk factors — it does not provide medical diagnoses. If your results flag potential concerns, a healthcare provider can use your BetterHealth data alongside clinical examination to make a diagnosis. Think of us as the early warning system, not the emergency room.",
      },
      {
        q: "Can I use BetterHealth while pregnant?",
        a: "Yes, with your doctor's knowledge. Many biomarkers change during pregnancy, and our reference ranges may not reflect pregnancy-specific norms. We recommend discussing your results with your obstetrician or midwife, who can interpret them in the context of your pregnancy.",
      },
    ],
  },
];
