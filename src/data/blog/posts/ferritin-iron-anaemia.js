// Patients-led biomarker explainer (cluster: "understand your biomarkers").
// Primary keyword: ferritin test (50/mo Ghana, LOW competition, DataForSEO 2026-06-28).
// Secondary: iron deficiency anaemia symptoms, anaemia symptoms, serum ferritin high,
// normal ferritin levels by age, low ferritin treatment, ferritin test normal range.
// Ranges cite British Society for Haematology guidelines and WHO reference values.
// Ghana context: malaria, fibroid-related blood loss, sickle cell disease caveats.
// Voice: plain, human, no em dashes (bh-humanizer applied). Clinical caution maintained.
export default {
  slug: "ferritin-iron-anaemia",
  title: "Ferritin and Iron: How to Read Your Anaemia Blood Tests",
  description:
    "Ferritin is the earliest sign of iron deficiency, falling before haemoglobin drops. Learn the normal ranges for men and women, what low and high ferritin mean, and why malaria and sickle cell make the picture more complex in Ghana.",
  excerpt:
    "Ferritin is the protein your body uses to store iron. It falls long before haemoglobin drops, making it the earliest detectable sign of iron deficiency. The normal ranges, what low and high results mean, and a Ghana-specific caveat on malaria and sickle cell disease.",
  datePublished: "2026-06-28",
  dateModified: "2026-06-28",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt:
    "Illustration showing ferritin as the iron storage protein and its role in diagnosing anaemia.",
  tags: ["ferritin", "iron deficiency", "anaemia", "biomarkers", "blood test"],
  cluster: "biomarkers",
  primaryKeyword: "ferritin test",
  readingMinutes: 8,
  body: [
    {
      type: "image",
      src: "/blog/ferritin-iron-hero.svg",
      alt: "Ferritin and iron explained: how to read your anaemia blood tests. Shows key concepts: low ferritin, iron deficiency, and anaemia.",
    },
    {
      type: "p",
      text: "Ferritin is the protein that stores iron inside your cells. When your ferritin result is low, your iron reserves are depleting. This typically shows up in the blood months before haemoglobin falls, which makes it the most sensitive early warning sign of iron deficiency available on a standard blood panel.",
    },
    {
      type: "p",
      text: "Iron deficiency is the most common nutritional deficiency worldwide. In Ghana, it disproportionately affects women of reproductive age, children under five, and pregnant women. Understanding what your ferritin result means, and what the rest of the iron panel is telling you, is the first step toward acting on it.",
    },
    {
      type: "h2",
      id: "what-ferritin-measures",
      text: "What ferritin measures",
    },
    {
      type: "p",
      text: "Ferritin is the protein your body uses to store iron inside cells. A ferritin blood test measures how much iron you have in reserve, not just what is circulating right now.",
    },
    {
      type: "p",
      text: "Your body needs iron for hundreds of functions. Its most critical role is in haemoglobin, the protein in red blood cells that carries oxygen from your lungs to every tissue. When iron reserves run low, haemoglobin production falters and cells start receiving less oxygen. That is when fatigue, pallor, and breathlessness appear.",
    },
    {
      type: "p",
      text: "Ferritin acts like a fuel gauge rather than a reading of the fuel currently in the engine. Serum iron, which is the other iron measurement on a blood test, shows the iron circulating in your blood at the moment the sample is taken. That number fluctuates hour to hour depending on recent meals and activity. Ferritin reflects the reserve: how much iron your body has stored and available for future use. A low serum iron can be a one-off blip; a low ferritin is a sign that the reserves are depleted.",
    },
    {
      type: "h2",
      id: "normal-ferritin-levels",
      text: "Normal ferritin levels: the reference ranges",
    },
    {
      type: "p",
      text: "Standard clinical reference intervals are 30 to 300 µg/L in men and 12 to 150 µg/L in women. A ferritin below 12 µg/L is consistently classified as deficient across all major guidelines, including the World Health Organization and the British Society for Haematology.",
    },
    {
      type: "p",
      text: "Ferritin is reported in micrograms per litre (µg/L), which is numerically the same as nanograms per millilitre (ng/mL). Different labs print slightly different reference intervals depending on the assay used, so always read your result against the range printed on your own report.",
    },
    {
      type: "list",
      items: [
        "Men: 30 to 300 µg/L",
        "Women: 12 to 150 µg/L",
        "Children: varies by age and sex; the reference interval is set by the testing laboratory",
        "Below 12 µg/L: deficient across all groups by WHO criteria",
      ],
    },
    {
      type: "image",
      src: "/blog/ferritin-ranges.svg",
      alt: "Iron panel reference ranges: ferritin 30 to 300 µg/L for men, 12 to 150 µg/L for women; serum iron 10.7 to 26.9 µmol/L; transferrin saturation 20 to 45%.",
      caption:
        "Standard iron panel reference ranges. Ferritin reference intervals differ between men and women. Confirm any result with a clinician.",
    },
    {
      type: "callout",
      title: "Low-normal ferritin is worth discussing",
      text: "A ferritin result that technically sits within the reference interval can still reflect functional iron deficiency. Many clinicians treat a ferritin under 30 µg/L as functionally low, especially in women with fatigue, hair loss, or heavy periods. If your ferritin is in the 12 to 30 µg/L range and you have symptoms, it is worth raising with your doctor.",
    },
    {
      type: "h2",
      id: "low-ferritin",
      text: "Low ferritin: iron deficiency before the anaemia",
    },
    {
      type: "p",
      text: "Iron deficiency develops in stages. Ferritin falls first, often while haemoglobin still reads normal, making it the earliest detectable sign of iron depletion.",
    },
    {
      type: "p",
      text: "This distinction matters clinically. Many people with low ferritin already feel the symptoms of iron deficiency: persistent fatigue, poor concentration, cold intolerance, hair loss. Yet a full blood count taken at the same time might show a haemoglobin still within the normal range. Relying on a blood count alone misses this earlier stage. A ferritin test catches the problem while it is still easier to correct.",
    },
    {
      type: "p",
      text: "Common reasons for a low ferritin:",
    },
    {
      type: "list",
      items: [
        "Ongoing blood loss. Heavy menstrual periods are the most frequent cause in women of reproductive age. Fibroids, which are more prevalent in women of West African ancestry, are a common underlying driver.",
        "Inadequate dietary iron. Iron from plant sources (legumes, grains, dark leafy vegetables) is absorbed at 2 to 10% efficiency. Iron from meat and organ meat is absorbed at 15 to 35% efficiency. Diets low in meat and high in refined grains can fall short of daily requirements.",
        "Poor absorption. Coeliac disease, inflammatory bowel disease, and certain gut surgeries reduce the intestine's ability to absorb iron even when dietary intake is adequate.",
        "Increased demand. Pregnancy substantially raises iron requirements. Adolescents going through rapid growth spurts can also deplete stores faster than diet replaces them.",
      ],
    },
    {
      type: "h2",
      id: "iron-deficiency-symptoms",
      text: "Symptoms of iron deficiency anaemia",
    },
    {
      type: "p",
      text: "Iron deficiency anaemia produces fatigue, pallor, breathlessness, brittle nails, hair loss, and in some people pica: cravings to eat ice, chalk, or clay. These symptoms develop gradually and are often attributed to stress or overwork before a blood test reveals the cause.",
    },
    {
      type: "list",
      items: [
        "Persistent fatigue and low energy, even after adequate sleep",
        "Pallor: pale inner eyelids, pale nail beds, pale gums",
        "Breathlessness on mild exertion such as climbing stairs",
        "Rapid heart rate or palpitations",
        "Brittle nails that break easily, or nails that curve inward (koilonychia in severe cases)",
        "Hair shedding or diffuse hair loss",
        "Restless legs, particularly at night",
        "Cold hands and feet beyond what the weather explains",
        "Difficulty concentrating, mental fog, or impaired work performance",
        "Pica: cravings to eat ice, chalk, clay, or other non-food items. This is a well-recognised sign of iron deficiency, not a psychological quirk.",
        "Headaches that do not respond to usual remedies",
      ],
    },
    {
      type: "callout",
      title: "Symptoms alone cannot confirm iron deficiency",
      text: "Fatigue, pallor, and breathlessness occur in many conditions, including thyroid disease, B12 deficiency, and viral illness. A blood test that includes ferritin, a full blood count, and ideally the full iron panel is the only way to confirm the cause and choose the right treatment. Iron supplements are not appropriate for all types of anaemia.",
    },
    {
      type: "h2",
      id: "high-ferritin",
      text: "High ferritin: what raised storage iron can signal",
    },
    {
      type: "p",
      text: "A raised ferritin does not always mean iron overload. Ferritin is also an acute-phase reactant, meaning the liver produces more of it during infection, inflammation, and liver disease, regardless of actual iron stores.",
    },
    {
      type: "p",
      text: "Common reasons for a high ferritin result:",
    },
    {
      type: "list",
      items: [
        "Active infection or systemic inflammation, including malaria, viral infections, and COVID-19. Ferritin can rise substantially during an acute illness and return to normal once it resolves.",
        "Liver disease, including fatty liver (NAFLD/MASLD) and hepatitis. Liver damage releases ferritin into the bloodstream.",
        "Haemochromatosis and related iron overload conditions. Classic hereditary haemochromatosis (caused by HFE gene mutations) is uncommon in West Africa; however, iron overload from other causes, including African iron overload associated with certain traditional practices, does occur and warrants investigation when ferritin is persistently elevated without an inflammatory cause.",
        "Excess alcohol intake, which raises ferritin even without obvious liver damage.",
        "Rheumatoid arthritis and other autoimmune or inflammatory conditions.",
        "Some blood disorders where red cells are destroyed faster than normal (haemolytic conditions), including sickle cell disease.",
      ],
    },
    {
      type: "p",
      text: "A high ferritin during or shortly after an acute illness is usually an inflammatory response and does not indicate iron overload. Retesting four to six weeks after recovery gives a more accurate reading of true iron stores.",
    },
    {
      type: "link-internal",
      to: "/blog/fatty-liver-disease-explained",
      label: "Fatty liver disease: how liver damage raises ferritin and which liver tests detect it",
    },
    {
      type: "h2",
      id: "iron-panel",
      text: "The full iron panel: tests doctors order together",
    },
    {
      type: "p",
      text: "The ferritin test is most informative alongside serum iron, total iron binding capacity (TIBC), and transferrin saturation, which together distinguish iron deficiency from anaemia of chronic disease.",
    },
    {
      type: "list",
      items: [
        "Ferritin: iron stores in cells. Low in true iron deficiency; can be normal or high in anaemia of chronic disease.",
        "Serum iron: iron circulating in the blood right now. Fluctuates with meals; less reliable on its own than ferritin.",
        "Total iron binding capacity (TIBC): how much iron the blood proteins could carry if fully loaded. Rises when iron is low (the body upregulates binding capacity to capture any available iron) and falls during inflammation.",
        "Transferrin saturation: serum iron divided by TIBC, expressed as a percentage. Below 20% suggests iron deficiency; above 45% can point to iron overload or haemochromatosis.",
        "Full blood count (FBC): shows haemoglobin, MCV (red cell size), and red cell morphology. In iron deficiency, MCV and haemoglobin fall together, producing small, pale red cells (microcytic hypochromic anaemia). A normal MCV alongside a low ferritin suggests early deficiency before the blood count is yet affected.",
      ],
    },
    {
      type: "p",
      text: "Interpreting these together avoids misclassification. Iron deficiency and anaemia of chronic disease (which occurs in long-term infections, inflammatory diseases, and kidney disease) can look similar on a blood count but require completely different management. The iron panel separates them.",
    },
    {
      type: "link-internal",
      to: "/blog/full-blood-count-explained",
      label: "Full blood count explained: haemoglobin, MCV, and what the numbers mean",
    },
    {
      type: "h2",
      id: "ghana-context",
      text: "Ghana context: why iron deficiency anaemia is common",
    },
    {
      type: "p",
      text: "Iron deficiency anaemia disproportionately affects women of reproductive age, children under five, and pregnant women in Ghana, driven by malaria, heavy menstrual bleeding, and dietary patterns low in haem iron.",
    },
    {
      type: "p",
      text: "Malaria is a major contributor. It destroys red blood cells directly, causing haemolytic anaemia, and the resulting inflammatory response raises ferritin even when iron stores are simultaneously depleted. This can produce a misleadingly normal or high ferritin in someone who has both active malaria and underlying iron deficiency. In areas of high malaria transmission, the full iron panel (particularly transferrin saturation and TIBC) gives a more complete picture than ferritin alone.",
    },
    {
      type: "p",
      text: "Heavy menstrual bleeding is a leading cause of iron deficiency in women across Ghana, and fibroids are an important underlying driver. Uterine fibroids are more common in women of West African ancestry than in most other populations. Women with heavy periods and low ferritin should be asked about fibroid symptoms and offered a gynaecological assessment alongside iron treatment.",
    },
    {
      type: "p",
      text: "Dietary iron intake is often below daily requirements in Ghanaian diets that rely heavily on plant foods. Non-haem iron from grains, legumes, and vegetables is absorbed at only 2 to 10%. Vitamin C consumed in the same meal roughly doubles non-haem iron absorption. Cooking in cast-iron pots has been shown in controlled studies to increase dietary iron content and is a practical, low-cost strategy.",
    },
    {
      type: "p",
      text: "Sickle cell disease causes a different type of anaemia to iron deficiency. It is haemolytic: red blood cells are destroyed faster than they are produced. Iron supplements are not the correct treatment for sickle cell anaemia and can cause harm if iron stores are already adequate. Anyone with known sickle cell disease or trait should have the type of anaemia properly confirmed before any supplementation is started.",
    },
    {
      type: "h2",
      id: "what-to-do",
      text: "What to do with your ferritin result",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Read your result against the reference interval on your own report. Lab reference ranges vary by method and sex. Do not compare your number against a generic figure from the internet.",
        "If your ferritin is below 30 µg/L and you have fatigue, hair loss, or heavy periods, discuss this with a doctor even if the result sits technically within the printed range. Functional iron deficiency at this level is real and treatable.",
        "Ask for the full iron panel alongside ferritin: serum iron, TIBC, and transferrin saturation. These distinguish iron deficiency from anaemia of chronic disease and avoid inappropriate supplementation.",
        "If your ferritin is below normal, also request a full blood count to check whether haemoglobin and MCV have already fallen. If they have, anaemia is established and will typically need a longer course of treatment.",
        "If your ferritin is unexpectedly high and you have no recent infection, ask about liver function tests and whether screening for haemochromatosis or another cause of iron overload is warranted.",
        "If you are low in iron, increase dietary sources: red meat, organ meat (especially liver), legumes, and dark leafy vegetables. Take iron supplements with orange juice or another vitamin C source to improve absorption. Avoid tea or coffee within an hour of taking iron tablets, as tannins reduce absorption.",
        "Retest ferritin eight to twelve weeks after starting supplementation to confirm stores are recovering.",
      ],
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "See the iron and anaemia panel BetterHealth Africa offers",
    },
    {
      type: "link-internal",
      to: "/book-tests",
      label: "View BetterHealth Africa test pricing",
    },
    {
      type: "faq",
      items: [
        {
          q: "What is a ferritin test and what does it measure?",
          a: "A ferritin test measures the level of ferritin, the iron-storage protein, in your blood. Because ferritin directly reflects how much iron your body has in reserve, a low result is the earliest sign of iron deficiency, appearing before haemoglobin starts to fall. It is more reliable than serum iron alone, which fluctuates with recent meals.",
        },
        {
          q: "What are normal ferritin levels?",
          a: "Standard clinical reference intervals are 30 to 300 µg/L for men and 12 to 150 µg/L for women. A result below 12 µg/L is classified as deficient across all major guidelines. Reference ranges differ slightly between labs, so always check the interval printed on your own report. Many clinicians treat a ferritin below 30 µg/L as functionally low in women with symptoms, even if it is within the printed range.",
        },
        {
          q: "What are the symptoms of iron deficiency anaemia?",
          a: "The most common symptoms are persistent fatigue, pallor (pale eyelids, gums, and nail beds), breathlessness on mild exertion, rapid heart rate, brittle or spoon-shaped nails, hair loss, restless legs, cold hands and feet, and difficulty concentrating. Some people develop pica: cravings to eat ice, chalk, or clay. Symptoms alone cannot confirm iron deficiency; a blood test is needed.",
        },
        {
          q: "What does a high ferritin mean?",
          a: "A high ferritin does not always mean too much iron. Ferritin is an acute-phase protein and rises during infection, inflammation, liver disease, and alcohol excess, regardless of iron stores. A raised ferritin during or shortly after an illness is usually an inflammatory response. If ferritin is high and there is no recent illness to explain it, a clinician should investigate liver function and consider haemochromatosis screening.",
        },
        {
          q: "What is the difference between a ferritin test and an iron test?",
          a: "Serum iron measures the iron circulating in the blood right now, which changes with recent meals. Ferritin measures stored iron, which changes slowly over weeks. Ferritin is more stable and more clinically useful for diagnosing iron deficiency. The two are often ordered together along with TIBC (total iron binding capacity) and transferrin saturation to give a complete picture of iron status.",
        },
        {
          q: "How do I treat low ferritin?",
          a: "Low ferritin from iron deficiency is treated by addressing the underlying cause (such as heavy periods or dietary insufficiency) and replenishing iron stores. Oral iron supplements are the standard treatment and are taken with vitamin C to improve absorption. Avoid tea, coffee, and calcium-rich foods within an hour of taking iron tablets. Recheck ferritin after eight to twelve weeks to confirm recovery. Do not self-prescribe iron supplements without a confirmed test result, as iron overload is harmful.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis or treatment by a qualified healthcare professional. Iron deficiency and anaemia have multiple causes that require proper testing and clinical assessment. Always discuss your blood test results with your doctor before starting any treatment.",
    },
  ],
};
