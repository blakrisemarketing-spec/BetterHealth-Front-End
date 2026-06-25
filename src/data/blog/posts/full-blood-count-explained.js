// Patients-led biomarker explainer (cluster: "understand your biomarkers").
// Primary keyword: fbc test (1,000/mo Ghana, LOW competition, DataForSEO 2026-06).
// Co-primary: full blood picture test (1,000/mo). Secondary: full blood count (720/mo),
// full blood count interpretation (210/mo), what is tested in a full blood count (170/mo),
// complete blood count, fbc blood test pregnancy (50/mo), fbc hb normal range (20/mo).
// Voice: plain, human, no em dashes. Ranges cite WHO 2011 haemoglobin reference values
// and standard clinical reference intervals (BSH / widely adopted).
export default {
  slug: "full-blood-count-explained",
  title: "Full Blood Count (FBC): A Plain-Language Guide to Your Results",
  description:
    "A full blood count (FBC) measures your red cells, white cells, platelets, and haemoglobin in a single blood draw. This guide explains every number on your results sheet and what it means for your health.",
  excerpt:
    "An FBC report lands in your hands with ten or more numbers on it. Most people have no idea which to focus on. This guide explains what each one measures, what the normal ranges are, and when a result is worth following up.",
  datePublished: "2026-06-25",
  dateModified: "2026-06-25",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt:
    "Full blood count (FBC) test explained: red cells, white cells, platelets, and haemoglobin on your results sheet.",
  tags: [
    "FBC",
    "full blood count",
    "haemoglobin",
    "anaemia",
    "white blood cells",
    "platelets",
    "biomarkers",
  ],
  cluster: "biomarkers",
  primaryKeyword: "fbc test",
  readingMinutes: 9,
  body: [
    {
      type: "image",
      src: "/blog/fbc-hero.svg",
      alt: "Full blood count (FBC) explained: red cells, white cells, and platelets measured in one blood draw.",
    },
    {
      type: "p",
      text: "An FBC is the most commonly ordered blood test in Ghana and worldwide. It comes back with ten or more numbers, and most people have no idea which ones matter. This guide walks through every figure on a standard FBC report, explains what each one measures, and tells you when a result is worth following up.",
    },
    {
      type: "h2",
      id: "what-fbc-tests",
      text: "What the FBC tests",
    },
    {
      type: "p",
      text: "A full blood count (FBC) is a single blood test that measures three main cell types: red blood cells, white blood cells, and platelets. Each type is reported as several sub-figures. Together they screen for anaemia, infection, bleeding disorders, and some bone marrow problems with just one blood draw.",
    },
    {
      type: "p",
      text: "Red blood cells carry oxygen from your lungs to every tissue in your body. White blood cells are the soldiers of your immune system. Platelets seal wounds when you bleed. An FBC tells you whether each of these populations is the right size and whether the cells themselves look normal.",
    },
    {
      type: "image",
      src: "/blog/fbc-components.svg",
      alt: "FBC reference ranges: normal values for haemoglobin, white blood cells, platelets, and MCV.",
      caption: "Key FBC reference ranges, using WHO and standard clinical thresholds.",
    },
    {
      type: "h2",
      id: "haemoglobin-red-cells",
      text: "Haemoglobin and red cells: your oxygen-carrying capacity",
    },
    {
      type: "p",
      text: "The WHO defines anaemia as haemoglobin below 130 g/L (13 g/dL) in men and below 120 g/L (12 g/dL) in women. Low haemoglobin is the most common FBC abnormality in Ghana, where iron-deficiency anaemia, malaria, and sickle cell disease are all prevalent.",
    },
    {
      type: "list",
      items: [
        "Men: haemoglobin 130 to 175 g/L is normal",
        "Women: haemoglobin 120 to 155 g/L is normal",
        "Below 80 g/L in either sex is severe anaemia and warrants urgent clinical review",
      ],
    },
    {
      type: "p",
      text: "The red cell count (RBC) and haematocrit (also called PCV, or packed cell volume) both reflect how many red cells you have. They usually tell the same story as haemoglobin, so if haemoglobin is low, these two figures will also be low. Haematocrit is expressed as a fraction of total blood volume: a normal value is roughly 0.40 to 0.52 for men and 0.36 to 0.48 for women.",
    },
    {
      type: "callout",
      title: "Symptoms can lag behind the numbers",
      text: "Mild to moderate anaemia often develops slowly enough that the body adapts to it and you feel normal. Fatigue, breathlessness on exertion, dizziness, and pallor under the eyelids or on the palms are the classic signs, but many people report none of these until their haemoglobin has been low for months. That is why an FBC picks up anaemia earlier than symptoms usually do.",
    },
    {
      type: "h2",
      id: "mcv-red-cell-size",
      text: "MCV: what the size of your red cells tells you",
    },
    {
      type: "p",
      text: "MCV below 80 fL (microcytic) most often points to iron deficiency; MCV above 100 fL (macrocytic) suggests B12 or folate deficiency. This single figure helps a clinician narrow down the cause of anaemia before ordering further tests. Normal MCV is 80 to 100 fL.",
    },
    {
      type: "list",
      items: [
        "Microcytic (MCV below 80 fL): most often iron deficiency or thalassaemia",
        "Normocytic (MCV 80 to 100 fL): acute blood loss, chronic disease, or early iron deficiency",
        "Macrocytic (MCV above 100 fL): vitamin B12 or folate deficiency, alcohol excess, liver disease, or certain medications",
      ],
    },
    {
      type: "p",
      text: "MCH (mean corpuscular haemoglobin) measures how much haemoglobin is in each red cell. MCHC (mean corpuscular haemoglobin concentration) measures how concentrated that haemoglobin is. Both are low in iron deficiency and usually normal or high in B12 and folate deficiency. These two figures move in the same direction as MCV in most clinical situations, so they rarely change the story on their own.",
    },
    {
      type: "h2",
      id: "white-cells",
      text: "White blood cells: infection and immunity",
    },
    {
      type: "p",
      text: "A WBC count above 11.0 ×10⁹/L (leukocytosis) usually signals an acute infection or inflammation; below 4.0 ×10⁹/L (leukopenia) can indicate a viral illness, certain medications, or a bone marrow problem. The total WBC is just one number on the report. The differential, which breaks down the count by cell type, tells a more detailed story.",
    },
    {
      type: "list",
      items: [
        "Normal WBC: 4.0 to 11.0 ×10⁹/L",
        "Neutrophils (50 to 70% of total): rise in bacterial infection; fall in viral illness or with some medications",
        "Lymphocytes (20 to 40% of total): elevated in viral infections such as EBV and HIV; low in some immune-deficiency states",
        "Monocytes (2 to 8% of total): raised in chronic infections such as tuberculosis",
        "Eosinophils (1 to 4% of total): elevated in allergic conditions and parasitic infections, which are common in Ghana",
      ],
    },
    {
      type: "p",
      text: "A very high WBC, above 30.0 ×10⁹/L, or a very low count below 2.0 ×10⁹/L, needs urgent clinical review. In between those extremes, the differential often tells the story more clearly than the total count alone.",
    },
    {
      type: "h2",
      id: "platelets",
      text: "Platelets: clotting and bleeding risk",
    },
    {
      type: "p",
      text: "A platelet count below 150 ×10⁹/L (thrombocytopenia) can cause bruising and slow wound healing; levels above 400 ×10⁹/L (thrombocytosis) may indicate inflammation, iron deficiency, or a bone marrow condition. The normal platelet range is 150 to 400 ×10⁹/L.",
    },
    {
      type: "p",
      text: "Platelets below 50 ×10⁹/L significantly raise the risk of spontaneous bleeding and require prompt medical assessment. Malaria is an important cause of low platelets in Ghana: the parasite destroys platelets along with red cells, which is why an FBC is standard in any malaria workup.",
    },
    {
      type: "h2",
      id: "ghana-context",
      text: "Ghana-specific context: sickle cell, malaria, and iron deficiency",
    },
    {
      type: "p",
      text: "About one in four Ghanaians carries sickle cell trait (HbAS), and roughly two in every hundred have sickle cell disease (HbSS). Sickle cell affects the shape and survival time of red cells, so haemoglobin and MCV readings can look abnormal without reflecting a treatable cause such as iron deficiency. A haemoglobin electrophoresis test identifies which genotype you carry, and a clinician who knows your genotype will read your FBC results differently.",
    },
    {
      type: "p",
      text: "Malaria remains endemic across Ghana and is one of the most common causes of anaemia in children and adults. The Plasmodium parasite destroys red cells from the inside, lowering haemoglobin and sometimes the platelet count at the same time. During or after a malaria episode, an FBC result can look alarming but will often recover once the infection is treated. A malaria rapid test or blood film is usually ordered alongside the FBC rather than as an afterthought.",
    },
    {
      type: "p",
      text: "Iron-deficiency anaemia is the most common nutritional cause of low haemoglobin in Ghana, particularly in women of reproductive age and young children. It shows up on the FBC as low haemoglobin with a low MCV and low MCH. A serum ferritin test confirms iron stores and is the standard follow-up when the FBC points toward iron deficiency.",
    },
    {
      type: "link-internal",
      to: "/blog/hba1c-explained",
      label: "HbA1c: often ordered alongside an FBC when screening for diabetes",
    },
    {
      type: "h2",
      id: "what-to-do",
      text: "What to do with your FBC result",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Check haemoglobin first. It is the number most likely to be abnormal and the one that most directly affects how you feel.",
        "Read MCV alongside haemoglobin. If haemoglobin is low, MCV tells you which direction the investigation should go: iron deficiency, B12 or folate, or haemoglobin genotype.",
        "Look at the WBC and differential if you have been unwell. A raised neutrophil count points toward bacterial infection; a raised lymphocyte count points toward viral illness.",
        "If platelets are below 150 or above 400, take the result to a clinician, especially if you have been bruising easily or have had malaria recently.",
        "Pair the FBC with a fasting blood sugar and HbA1c if those have not been done recently. Diabetes raises infection risk and can cause anaemia through kidney involvement.",
        "Keep your results. A trend over time tells more than any single snapshot.",
      ],
    },
    {
      type: "link-internal",
      to: "/blog/fasting-blood-sugar-explained",
      label: "Fasting blood sugar: another core metabolic check to pair with your FBC",
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "See the full blood count panel BetterHealth Africa offers",
    },
    {
      type: "link-internal",
      to: "/pricing",
      label: "View BetterHealth Africa test pricing",
    },
    {
      type: "faq",
      items: [
        {
          q: "Do I need to fast before an FBC test?",
          a: "No. Unlike a lipid profile or fasting glucose test, a full blood count does not require fasting. You can eat and drink normally before the blood draw. Your results will not be affected by a recent meal.",
        },
        {
          q: "What does a low haemoglobin result mean?",
          a: "Haemoglobin below 130 g/L in men or below 120 g/L in women means you have anaemia. The most common causes in Ghana are iron deficiency, malaria, and sickle cell disease. Your doctor will look at MCV, MCH, and possibly a serum ferritin or haemoglobin electrophoresis to identify the cause before deciding on treatment.",
        },
        {
          q: "What causes a high white blood cell count?",
          a: "A WBC above 11.0 ×10⁹/L usually means the body is fighting something, most often a bacterial or viral infection. Other causes include inflammation, physical or emotional stress, certain medications such as steroids, and rarely a blood disorder. The differential breakdown, which lists neutrophils, lymphocytes, and the other subtypes, helps narrow down the cause.",
        },
        {
          q: "Can an FBC detect cancer?",
          a: "An FBC cannot diagnose cancer, but it can flag something worth investigating. Leukaemia often shows as an abnormal WBC count with unusual cells on the differential. Lymphoma can lower all counts if it crowds out normal cells in the bone marrow. If your FBC is significantly abnormal with no clear infectious or nutritional cause, your doctor may refer you to a haematologist for a blood film and further tests.",
        },
        {
          q: "How often should I have an FBC test?",
          a: "Many adults in Ghana benefit from an annual FBC as part of a general health screen, given the prevalence of anaemia and infectious disease. People with known anaemia, sickle cell disease, chronic kidney disease, or HIV may need a check every three to six months. Your clinician will advise the right schedule based on your history.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis or treatment by a qualified healthcare professional. Always discuss your own results with your doctor or a registered clinician.",
    },
  ],
};
