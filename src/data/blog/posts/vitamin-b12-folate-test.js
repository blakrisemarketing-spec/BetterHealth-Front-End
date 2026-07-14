// Patients-led biomarker explainer (cluster: "understand your biomarkers").
// Primary keyword: vitamin b12 test (10/mo Ghana direct match, DataForSEO). Secondary:
// vitamin b12 (2900/mo), vitamin b12 deficiency (720/mo, strongest specific secondary),
// vitamin b12 foods (480/mo), vitamin b12 tablets (320/mo), vitamin b12 injection (110/mo),
// vitamin b12 dosage for adults (90/mo). Roadmap secondary: b12 deficiency symptoms,
// folate test, megaloblastic anaemia, low b12 treatment.
// Market: pan-Africa, not Ghana-only. Companion piece to ferritin-iron-anaemia.js: together
// they cover the two anaemia patterns patients search for (microcytic iron vs macrocytic
// B12/folate). Voice: plain, human, no em dashes (bh-humanizer applied).
export default {
  slug: "vitamin-b12-folate-test",
  title: "Vitamin B12 and Folate: Testing for the Other Anaemias",
  description:
    "A vitamin B12 test checks the nutrient your nerves and red blood cells depend on. Learn the symptoms of B12 deficiency, what causes it, how it differs from folate deficiency, and how it is treated.",
  excerpt:
    "Not every anaemia is about iron. Vitamin B12 and folate deficiency produce a different pattern on a blood test and a different set of symptoms, including nerve problems that iron deficiency does not cause. What a B12 and folate test checks, and what to do with a low result.",
  datePublished: "2026-07-11",
  dateModified: "2026-07-11",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt:
    "Illustration explaining what a vitamin B12 and folate test checks and how B12 deficiency anaemia differs from iron deficiency anaemia.",
  tags: [
    "vitamin B12",
    "folate",
    "anaemia",
    "biomarkers",
    "blood test",
    "megaloblastic anaemia",
  ],
  cluster: "biomarkers",
  primaryKeyword: "vitamin b12 test",
  readingMinutes: 8,
  body: [
    {
      type: "image",
      src: "/blog/vitamin-b12-hero.svg",
      alt: "Vitamin B12 and folate explained: testing for the other anaemias, covering low B12, nerve symptoms, and megaloblastic anaemia.",
    },
    {
      type: "p",
      text: "Most conversations about anaemia jump straight to iron. But a fair share of anaemia cases trace back to two other nutrients: vitamin B12 and folate. They produce a different pattern on a blood test, a different set of symptoms, and in the case of B12, a set of nerve symptoms that iron deficiency never causes.",
    },
    {
      type: "p",
      text: "This matters across Africa for a simple reason: diets vary enormously. Some populations eat little animal-source food, the only natural source of B12, which raises the risk of low B12. Folate deficiency runs on a different track, tied more to low intake of leafy greens, legumes and fortified foods, alcohol use, or pregnancy's higher demand, and absorption problems such as pernicious anaemia or H. pylori gastritis can affect anyone regardless of what they eat. Either way, a B12 or folate test is one of the more useful, and more overlooked, checks in a full anaemia work-up.",
    },
    {
      type: "h2",
      id: "what-b12-test-measures",
      text: "What a vitamin B12 test measures",
    },
    {
      type: "p",
      text: "A B12 test measures how much vitamin B12 is circulating in your blood, the nutrient your nerves and your red blood cells both depend on to function properly. Vitamin B12 is needed for two jobs at once: building healthy red blood cells and maintaining the protective coating around your nerves. That dual role is why a shortage can show up as anaemia, as nerve symptoms, or as both together.",
    },
    {
      type: "p",
      text: "The standard test reports serum B12 in picograms per millilitre (pg/mL) or picomoles per litre (pmol/L), depending on the lab. When a result comes back low or borderline, doctors sometimes add a methylmalonic acid (MMA) or homocysteine test, since these two markers rise even before serum B12 clearly falls, giving an earlier and more precise picture of true deficiency at the tissue level.",
    },
    {
      type: "h2",
      id: "b12-deficiency-symptoms",
      text: "Symptoms of B12 deficiency",
    },
    {
      type: "p",
      text: "B12 deficiency causes fatigue and pale skin at first, then nerve symptoms such as tingling hands and feet, poor balance, and memory trouble as it progresses. Because B12 builds red blood cells, an early shortage looks a lot like any other anaemia: tiredness, breathlessness, pallor, a fast heartbeat. What sets it apart is what happens if the deficiency continues.",
    },
    {
      type: "list",
      items: [
        "Persistent fatigue and low energy",
        "Pale or slightly yellow-tinged skin",
        "Numbness or tingling in the hands and feet (pins and needles)",
        "Unsteady balance or difficulty walking in a straight line",
        "Memory lapses, confusion, or difficulty concentrating",
        "A sore, smooth, or unusually red tongue",
        "Mood changes, including low mood or irritability",
        "Breathlessness and a rapid heartbeat on exertion",
      ],
    },
    {
      type: "callout",
      title: "Nerve symptoms deserve prompt attention, without panic",
      text: "If B12 deficiency is severe and left untreated for a long time, the nerve damage it causes can become permanent in some cases. This is a real reason to take tingling, numbness, or balance changes seriously and get tested rather than wait. It is also worth keeping in perspective: B12 deficiency is easy to detect on a simple blood test and, when caught and treated, most people recover well. The point is to act on the symptoms, not to fear them.",
    },
    {
      type: "h2",
      id: "causes-of-b12-deficiency",
      text: "What causes vitamin B12 deficiency",
    },
    {
      type: "p",
      text: "B12 deficiency comes from eating too little of it, absorbing too little of it, or both, and the balance between those two causes varies widely across African diets and health conditions. Vitamin B12 occurs naturally only in animal-source foods, so intake alone can explain a deficiency in someone eating little meat, fish, eggs, or dairy. But even people who eat plenty of B12 can become deficient if their gut cannot absorb it.",
    },
    {
      type: "list",
      items: [
        "Low dietary intake. Vegans, and anyone eating little meat, fish, eggs, or dairy for cultural, economic, or personal reasons, can run short over time, since plant foods do not naturally contain B12.",
        "Pernicious anaemia. An autoimmune condition where the stomach stops producing intrinsic factor, the protein B12 needs in order to be absorbed in the gut. This is a recognised, treatable cause of B12 deficiency, not a rare curiosity.",
        "Chronic H. pylori infection. Long-standing H. pylori gastritis can damage the stomach lining over years, reducing intrinsic factor and stomach acid, both of which are needed to release and absorb B12 from food.",
        "Metformin use. Metformin, one of the most widely prescribed medicines for type 2 diabetes across Africa, is a well-documented cause of reduced B12 absorption with long-term use. Anyone on metformin for several years is a reasonable candidate for periodic B12 checks.",
        "Other malabsorption conditions. Coeliac disease, Crohn's disease, and previous stomach or intestinal surgery can all reduce B12 absorption even when intake is adequate.",
        "Increased demand. Pregnancy and breastfeeding raise B12 requirements, and older adults absorb B12 less efficiently as stomach acid production naturally declines with age.",
      ],
    },
    {
      type: "link-internal",
      to: "/blog/h-pylori-test",
      label: "H. pylori test: how a stomach infection can quietly affect nutrient absorption",
    },
    {
      type: "h2",
      id: "folate-and-megaloblastic-anaemia",
      text: "Folate and megaloblastic anaemia",
    },
    {
      type: "p",
      text: "Folate deficiency produces the same enlarged, under-formed red blood cells as B12 deficiency, so a folate test is usually ordered alongside a B12 test, not instead of it. Folate, also called vitamin B9, works alongside B12 in the same red-cell-building process. When either one runs short, red blood cell production stalls partway, leaving fewer cells in circulation and the ones that do form abnormally large. This pattern is called megaloblastic anaemia.",
    },
    {
      type: "p",
      text: "Folate is found in leafy green vegetables, legumes, and fortified foods, and unlike B12 it is present in plenty of plant sources, so dietary folate deficiency is less about avoiding a whole food group and more about overall diet quality, alcohol use, or increased demand such as pregnancy. Folate stores are also smaller than B12 stores, so a shortfall in intake shows up faster, typically over weeks rather than years.",
    },
    {
      type: "p",
      text: "Because B12 and folate deficiency look alike on a blood count, a doctor will normally check both together rather than assume which one is responsible. Treating a folate deficiency without checking B12 first can sometimes mask a B12 problem, which is one reason self-treating with folic acid supplements alone is not recommended without a blood test first.",
    },
    {
      type: "h2",
      id: "b12-vs-iron-deficiency-anaemia",
      text: "B12/folate anaemia vs iron-deficiency anaemia",
    },
    {
      type: "p",
      text: "B12 and folate deficiency shrink your red cell count but make each remaining cell abnormally large, the opposite pattern to the small cells of iron deficiency, and the mean corpuscular volume (MCV) on a full blood count is what tells the two apart. Iron deficiency produces small, pale cells (a low MCV, called microcytic anaemia). B12 and folate deficiency produce large cells (a high MCV, called macrocytic anaemia). Same complaint of fatigue and breathlessness on the surface, different mechanism underneath, and different treatment.",
    },
    {
      type: "image",
      src: "/blog/vitamin-b12-anaemia-causes.svg",
      alt: "Comparison of macrocytic anaemia from B12 or folate deficiency, with fewer larger red cells and a high MCV, against microcytic iron-deficiency anaemia, with smaller paler red cells and a low MCV.",
      caption:
        "Macrocytic anaemia (B12 or folate deficiency) versus microcytic anaemia (iron deficiency). MCV on a routine full blood count is usually what first flags the difference.",
    },
    {
      type: "p",
      text: "This is why a full blood count is often the first clue that sends a doctor looking for B12 or folate deficiency rather than iron. It is also why the two conditions are best understood as a pair: if you have looked into iron-deficiency anaemia, B12 and folate deficiency are the other half of the same story.",
    },
    {
      type: "link-internal",
      to: "/blog/ferritin-iron-anaemia",
      label: "Ferritin and iron: the microcytic anaemia work-up, and how it differs from this one",
    },
    {
      type: "link-internal",
      to: "/blog/full-blood-count-explained",
      label: "Full blood count explained: what MCV and the rest of your FBC numbers mean",
    },
    {
      type: "h2",
      id: "vitamin-b12-foods",
      text: "Vitamin B12 foods: where B12 comes from",
    },
    {
      type: "p",
      text: "Vitamin B12 occurs naturally only in animal-source foods, which is why diets built mainly around plant staples need a deliberate plan to cover it. No plant food reliably contains meaningful, naturally occurring B12. That single fact explains most dietary B12 deficiency worldwide.",
    },
    {
      type: "list",
      items: [
        "Meat, particularly organ meat such as liver, which is very high in B12",
        "Fish and seafood",
        "Eggs",
        "Milk, yoghurt, and other dairy products",
        "Fortified foods, where available, such as certain cereals or plant-based milk alternatives with added B12",
      ],
    },
    {
      type: "p",
      text: "Anyone eating little or no animal-source food, whether by choice, cost, or availability, should either include a reliably fortified food source or discuss B12 supplementation with a doctor rather than wait for symptoms to appear. Because B12 is stored in the liver, a shortfall in intake can take a few years to become a measurable deficiency, which is part of why it is often missed until symptoms are already present.",
    },
    {
      type: "h2",
      id: "treatment-tablets-injections",
      text: "Treatment: B12 tablets and B12 injections",
    },
    {
      type: "p",
      text: "Low B12 is treated with oral tablets or injections depending on the cause and how low the level is, and a doctor decides which one and for how long. As a general pattern, dietary deficiency in someone who can absorb B12 normally is often corrected with oral tablets. Deficiency caused by an absorption problem, such as pernicious anaemia, chronic H. pylori damage, or gut surgery, usually needs injections instead, since the gut cannot reliably absorb an oral dose regardless of how much is taken.",
    },
    {
      type: "p",
      text: "This article will not give a dosing guide, because the right dose, formulation, and length of treatment depend on the cause, how low the level is, and whether nerve symptoms are already present, all of which a doctor needs to assess directly. What matters for a patient is recognising that both tablets and injections are legitimate, well-established treatments, and that the choice between them is a clinical decision, not a personal preference.",
    },
    {
      type: "callout",
      title: "Metformin and B12: a check worth building into routine care",
      text: "Metformin is one of the most widely used medicines for type 2 diabetes across Africa, and long-term use is a recognised cause of reduced B12 absorption. If you have been on metformin for several years, ask your doctor whether a periodic B12 check makes sense as part of your regular diabetes follow-up, alongside your usual blood sugar monitoring.",
    },
    {
      type: "h2",
      id: "what-to-do",
      text: "What to do with your B12 or folate result",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "If you have persistent fatigue, tingling in your hands or feet, or balance problems, ask for a B12 and folate test alongside a full blood count rather than assuming it is only about iron.",
        "If you are on long-term metformin, over 60, follow a diet with little or no animal-source food, or have a known digestive condition, mention this to your doctor when discussing testing, since each raises the likelihood of B12 deficiency.",
        "If your B12 or folate comes back low, let your doctor investigate the cause rather than starting supplements on your own. Pernicious anaemia and H. pylori infection both need their own follow-up, beyond replacing the vitamin.",
        "If you are prescribed tablets or injections, complete the course your doctor sets and expect blood tests to be repeated to confirm the level has recovered.",
        "If nerve symptoms such as numbness or balance problems are present, treat the test as reasonably urgent. Earlier treatment gives a better chance of full recovery.",
      ],
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "See the anaemia and vitamin panel BetterHealth Africa offers",
    },
    {
      type: "faq",
      items: [
        {
          q: "What does a vitamin B12 test check?",
          a: "A vitamin B12 test measures how much B12 is circulating in your blood. B12 is essential for building healthy red blood cells and maintaining the protective coating around your nerves, so a low result can point to anaemia, nerve symptoms, or both. When a result is low or borderline, a doctor may add a methylmalonic acid (MMA) or homocysteine test for a more precise picture.",
        },
        {
          q: "What are the symptoms of B12 deficiency?",
          a: "Early symptoms are fatigue, pale skin, and breathlessness, similar to other forms of anaemia. As deficiency progresses it can also cause tingling or numbness in the hands and feet, poor balance, memory trouble, and a sore or smooth tongue. If severe deficiency goes untreated for a long time, some nerve damage can become permanent, so nerve symptoms are worth getting checked promptly. The condition is straightforward to detect on a blood test and, once caught, treatable.",
        },
        {
          q: "What causes vitamin B12 deficiency?",
          a: "The two broad causes are low intake and poor absorption. Low intake happens when a diet has little or no animal-source food, since B12 occurs naturally only in meat, fish, eggs, and dairy. Poor absorption can come from pernicious anaemia (an autoimmune condition affecting the stomach), chronic H. pylori infection, long-term metformin use, coeliac or Crohn's disease, or previous gut surgery. Pregnancy, breastfeeding, and older age also raise the risk.",
        },
        {
          q: "What is the difference between B12 deficiency and folate deficiency?",
          a: "Both produce the same pattern of anaemia, called megaloblastic anaemia, with fewer, abnormally large red blood cells. The difference is in cause and timing. B12 is stored in the liver for years, so deficiency builds up slowly and can include nerve symptoms. Folate stores are much smaller, so a shortfall shows up faster, typically over weeks, and folate deficiency does not cause the nerve damage that B12 deficiency can. Doctors usually test both together rather than assume which one is responsible.",
        },
        {
          q: "How is a B12 or folate deficiency anaemia different from iron-deficiency anaemia?",
          a: "They look similar in symptoms but opposite in what happens to the red blood cells. Iron deficiency produces small, pale cells (a low MCV on a full blood count, called microcytic anaemia). B12 and folate deficiency produce fewer but abnormally large cells (a high MCV, called macrocytic anaemia). The MCV value on a routine blood count is usually what first points a doctor toward one cause or the other.",
        },
        {
          q: "How is low B12 treated?",
          a: "Treatment is either oral B12 tablets or B12 injections, and the choice depends on the cause and severity. Dietary deficiency in someone with normal absorption is often corrected with tablets. Deficiency caused by an absorption problem, such as pernicious anaemia or chronic H. pylori damage, usually needs injections, since the gut cannot reliably absorb an oral dose. A doctor decides the dose, formulation, and length of treatment based on your specific situation, and blood tests are typically repeated to confirm recovery.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis or treatment by a qualified healthcare professional. B12 and folate deficiency have several possible causes that require proper testing and clinical assessment. Always discuss your blood test results and any symptoms, especially nerve symptoms, with your doctor.",
    },
  ],
};
