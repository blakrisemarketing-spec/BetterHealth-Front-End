// Patients-led conditions explainer (cluster: "understand your conditions").
// Primary keyword: genotype test (880/mo Nigeria, LOW competition, DataForSEO
// 2026-07-08). Secondary: genotype compatibility (1,000/mo), what is my genotype
// (210/mo), AA AS SS genotype (50/mo), genotype test kit (140/mo), genotype test
// price (70/mo). Market: Nigeria, per roadmap.yml.
// Distinct from sickle-cell-trait-testing.js: that article is Ghana-framed and goes
// deep on the AS trait and malaria-selection story; this one leads with the
// couple-compatibility framing and Nigeria's sickle cell disease burden.
// Voice: plain, human, no em dashes (bh-humanizer applied). Clinical caution kept.
export default {
  slug: "genotype-test-aa-as-ss",
  title: "Genotype Test (AA, AS, SS): What Your Result Means for Family Planning",
  description:
    "A genotype test shows which haemoglobin genes you inherited, reported as AA, AS, SS, SC or AC. Learn what genotype compatibility means for a couple's future children, how the test works, and what to do with your result.",
  excerpt:
    "In Nigeria, asking someone's genotype has become a normal early-relationship question. This explains what the test measures, what AA, AS and SS mean, and why genotype compatibility matters before two people plan a family together.",
  datePublished: "2026-07-08",
  dateModified: "2026-07-08",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt:
    "Illustration explaining the genotype test: AA, AS and SS results and what genotype compatibility means for couples.",
  tags: [
    "genotype test",
    "sickle cell",
    "premarital screening",
    "family planning",
    "Nigeria",
  ],
  cluster: "conditions",
  primaryKeyword: "genotype test",
  readingMinutes: 7,
  body: [
    {
      type: "image",
      src: "/blog/genotype-test-hero.svg",
      alt: "Genotype test explained: AA, AS, SS, SC and AC results, and what genotype compatibility means before starting a family.",
    },
    {
      type: "p",
      text: "In Nigeria, \"what's your genotype?\" has become a normal question to ask early in a relationship, right alongside age and profession. That is not a strange habit. It is a practical response to a real genetic risk, and a genotype test is the only reliable way to answer it.",
    },
    {
      type: "p",
      text: "A genotype test tells you which haemoglobin genes you inherited from your parents, reported as a short code such as AA, AS, or SS. On its own, your genotype rarely changes how you feel day to day. Matched against a partner's genotype, it can tell you the odds that your children could inherit sickle cell disease.",
    },
    {
      type: "h2",
      id: "what-it-measures",
      text: "What a genotype test measures",
    },
    {
      type: "p",
      text: "A genotype test identifies which haemoglobin genes you inherited from each parent and reports the result as a two-letter code. Haemoglobin is the protein in red blood cells that carries oxygen, and everyone inherits one haemoglobin gene from their mother and one from their father.",
    },
    {
      type: "list",
      items: [
        "AA: two normal haemoglobin genes. The most common result, and no sickle cell risk to pass on.",
        "AS: sickle cell trait. One normal gene, one sickle gene (HbS). Usually causes no symptoms on its own.",
        "SS: sickle cell disease, also called sickle cell anaemia. Two sickle genes. A serious, lifelong condition.",
        "SC: a form of sickle cell disease. One sickle gene, one haemoglobin C gene.",
        "AC: haemoglobin C trait. Generally harmless alone, but relevant if a partner carries AS or SC.",
        "CC: haemoglobin C disease, a milder condition than SS but still worth a specialist's review.",
      ],
    },
    {
      type: "callout",
      title: "Genotype is not the same as blood group",
      text: "A genotype test and a blood group test (A, B, AB, O plus Rhesus factor) are two different results from two different tests. Couples often need both before marriage, but one cannot substitute for the other.",
    },
    {
      type: "h2",
      id: "how-the-test-works",
      text: "How the test is done",
    },
    {
      type: "p",
      text: "A genotype test only needs a small blood sample, drawn once at a lab or hospital, with no fasting or special preparation required. The sample is analysed by haemoglobin electrophoresis or HPLC (high-performance liquid chromatography), both of which separate haemoglobin types to identify the exact genotype.",
    },
    {
      type: "p",
      text: "Results are typically ready within a day or two. Some clinics offer a faster sickling test (solubility test) as a screen, but it only shows whether any sickle haemoglobin is present. It cannot tell AS apart from SS, so a positive sickling result always needs electrophoresis or HPLC to confirm the actual genotype.",
    },
    {
      type: "callout",
      title: "Be careful with informal \"genotype test kits\"",
      text: "Self-testing card kits and informal blood-typing stalls are sometimes marketed as a shortcut, but they are not a substitute for a certified lab result. A decision this important, whether to marry, whether to plan a pregnancy, deserves a result from an accredited laboratory using electrophoresis or HPLC.",
    },
    {
      type: "h2",
      id: "genotype-compatibility",
      text: "Genotype compatibility: what it means for a couple",
    },
    {
      type: "p",
      text: "Genotype compatibility describes the chance a couple's future children could inherit sickle cell disease, calculated from both partners' confirmed genotypes. It is a statement about probability, not a verdict on whether two people should be together.",
    },
    {
      type: "image",
      src: "/blog/genotype-compatibility-chart.svg",
      alt: "Genotype compatibility chart for couples: AA plus AA or AA plus AS carry no risk of sickle cell disease in a child. AS plus AS carries a 25 percent chance per pregnancy. AS plus SS means every child inherits at least one sickle gene, and 50 percent will have the disease. SS plus SS means every child has the disease.",
      caption: "Simplified for haemoglobin S. A confirmed genotype test and a genetic counsellor should confirm the exact odds for your specific combination, including C and other variants.",
    },
    {
      type: "list",
      items: [
        "AA + AA: no risk of sickle cell disease in any child.",
        "AA + AS: no child can have sickle cell disease from this pairing, though half may inherit the trait.",
        "AS + AS: each pregnancy carries a 25% chance of sickle cell disease (SS), independently, every time.",
        "AS + SS: every child inherits at least one sickle gene; about half will have the disease.",
        "SS + SS: every child inherits sickle cell disease.",
        "Any pairing involving AC or SC: haemoglobin C changes the picture and needs the same electrophoresis-confirmed review before drawing conclusions.",
      ],
    },
    {
      type: "callout",
      title: "\"Incompatible\" is a risk statement, not a life sentence",
      text: "Two AS carriers are sometimes told they are \"not compatible.\" That phrase describes a 1 in 4 chance per pregnancy, not a guarantee, and it does not mean a couple cannot build a life together. It means the decision deserves informed input from a genetic counsellor or a doctor experienced in sickle cell disease, who can lay out the real odds and the options, including early prenatal testing.",
    },
    {
      type: "h2",
      id: "why-it-matters-nigeria",
      text: "Why this matters so much in Nigeria",
    },
    {
      type: "p",
      text: "Nigeria has more children born with sickle cell disease each year than any other country in the world, a burden tied directly to how common the sickle gene is across the population. Roughly 1 in 4 Nigerians carries the sickle cell trait, a rate similar to much of West Africa, because the trait offers partial natural protection against severe malaria.",
    },
    {
      type: "p",
      text: "That single fact, repeated across generations, is why genotype testing has become a normal, expected step before marriage in many Nigerian families and churches, rather than an optional extra. Awareness has grown, but testing is still not universal, and some couples still marry or start families without ever confirming either partner's genotype.",
    },
    {
      type: "link-internal",
      to: "/blog/sickle-cell-trait-testing",
      label: "Read more: sickle cell trait explained, including the malaria connection and full inheritance odds",
    },
    {
      type: "link-internal",
      to: "/blog/premarital-screening",
      label: "Premarital screening: the tests every couple should do before marriage",
    },
    {
      type: "h2",
      id: "what-to-do",
      text: "What to do with your result",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Get a lab-confirmed genotype test using haemoglobin electrophoresis or HPLC, not a sickling test alone and not an informal kit.",
        "Share your result with a serious partner before marriage or pregnancy. It is a sensitive conversation, but an honest one protects both of you.",
        "If you are both AS, or either of you has SS, SC, or another risk combination, see a genetic counsellor or a doctor experienced in sickle cell disease before or early in pregnancy.",
        "If you are already pregnant and have not been tested, ask your antenatal care provider for a genotype test. It is a standard, low-cost addition to routine antenatal blood work.",
        "If your result is AA, you are not personally at risk from sickle cell disease, but your genotype still matters for what your partner's result means for your children.",
      ],
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "See the genotype and Blood Health panel BetterHealth Africa offers",
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
          q: "What is a genotype test used for?",
          a: "A genotype test identifies which haemoglobin genes you inherited from your parents, most often to check for sickle cell trait or disease. It is most commonly used before marriage or pregnancy, so a couple can understand the odds of passing sickle cell disease to their children.",
        },
        {
          q: "What do AA, AS, and SS mean on a genotype test result?",
          a: "AA means no sickle gene. AS means sickle cell trait, one sickle gene and one normal gene, which usually causes no symptoms. SS means sickle cell disease, two sickle genes, a serious lifelong condition. SC and AC involve a related haemoglobin C variant.",
        },
        {
          q: "Can I do a genotype test at home?",
          a: "A confirmed genotype needs haemoglobin electrophoresis or HPLC, laboratory methods that are not available in informal home kits or card tests. For a decision as important as marriage or family planning, get your result from an accredited laboratory.",
        },
        {
          q: "What happens if two partners have \"incompatible\" genotypes?",
          a: "If both partners are AS, each pregnancy carries a 25% chance of sickle cell disease, independent of previous pregnancies. This is a risk to plan around, not an automatic reason to separate. A genetic counsellor or a doctor experienced in sickle cell disease can explain the specific odds and the options available, including early prenatal testing.",
        },
        {
          q: "Do I need to fast before a genotype test?",
          a: "No. A genotype test needs a small blood sample and no fasting or special preparation. Results are usually ready within a day or two from an accredited lab.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis, genetic counselling, or treatment by a qualified healthcare professional. Sickle cell inheritance and its management depend on your specific confirmed genotype and family circumstances. Always discuss your test results and family-planning questions with your doctor or a qualified genetic counsellor.",
    },
  ],
};
