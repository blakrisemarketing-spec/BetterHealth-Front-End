// Patients-led conditions explainer (cluster: "understand your conditions").
// Primary keyword: genotype test (880/mo Nigeria, LOW competition, DataForSEO 2026-07-10).
// Secondary: genotype test kit (140/mo), how to do genotype test in the lab (170/mo),
// genotype test price (70/mo), genotype test for marriage (20/mo), genotype
// compatibility (1000/mo).
// Facts (electrophoresis/HPLC method, AA/AS/SS/AC/SC nomenclature, per-pregnancy
// inheritance odds) checked against standard haematology/WHO sickle cell references
// on 2026-07-10; mirrors the inheritance framing already used in
// sickle-cell-trait-testing.js.
// Voice: plain, human, no em dashes (bh-humanizer applied). Clinical caution kept.
export default {
  slug: "genotype-test-aa-as-ss",
  title: "Genotype Test (AA, AS, SS): What Your Result Means for Family Planning",
  description:
    "A genotype test in Nigeria and West Africa checks which haemoglobin variants you carry, not your full DNA. Learn how the test works, what AA, AS, SS, AC, and SC mean, and what genotype compatibility means for couples.",
  excerpt:
    "AA, AS, SS. Three letters that shape a major decision for couples across Nigeria and West Africa. This is what a genotype test checks, and what the compatibility odds mean for your children.",
  datePublished: "2026-07-10",
  dateModified: "2026-07-10",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt:
    "Illustration explaining genotype testing: AA, AS, and SS haemoglobin results and what they mean before marriage.",
  tags: ["genotype test", "sickle cell", "family planning", "Nigeria", "premarital screening"],
  cluster: "conditions",
  primaryKeyword: "genotype test",
  readingMinutes: 8,
  body: [
    {
      type: "image",
      src: "/blog/genotype-test-hero.svg",
      alt: "Genotype testing explained: AA is the common safe pattern, AS is a healthy carrier, and testing before marriage matters.",
    },
    {
      type: "p",
      text: "In Nigeria and across much of West Africa, a \"genotype test\" almost always means a haemoglobin variant test, the one that reports back AA, AS, or SS. It is not a full DNA or ancestry test, and clearing up that naming confusion first makes the rest of the result far easier to understand.",
    },
    {
      type: "p",
      text: "This test matters most for one reason: it tells you and a future partner whether your children could inherit sickle cell disease, and it does that with far more precision than guesswork or family history alone.",
    },
    {
      type: "h2",
      id: "what-it-checks",
      text: "What a \"genotype test\" checks",
    },
    {
      type: "p",
      text: "A genotype test, in the way it is commonly used and requested across Nigeria and West Africa, checks which haemoglobin variants you carry, not your full genetic makeup. Haemoglobin is the protein in red blood cells that carries oxygen, and everyone inherits one haemoglobin gene from each parent. The test reads which version of that gene, normal (A), sickle (S), or one of the less common variants (C, among others), you inherited from each side.",
    },
    {
      type: "h2",
      id: "how-the-test-is-done",
      text: "How the test is done: electrophoresis and HPLC vs the older sickling test",
    },
    {
      type: "p",
      text: "Haemoglobin electrophoresis or HPLC (high-performance liquid chromatography) separates haemoglobin types directly and is more accurate than the older sickling solubility test, which only shows presence or absence of HbS without distinguishing a healthy carrier (AS) from someone with sickle cell disease (SS). A sickling test can come back \"positive\" for both AS and SS, which is exactly the distinction that matters most, so a lab-based electrophoresis or HPLC result is what you want before making a decision about marriage or children.",
    },
    {
      type: "callout",
      title: "A quick sickling test is a screen, not a final answer",
      text: "If a rapid sickling test comes back positive, ask for haemoglobin electrophoresis or HPLC to confirm whether the result is AS (carrier) or SS (sickle cell disease). The two carry very different implications and should never be assumed from a sickling test alone.",
    },
    {
      type: "h2",
      id: "reading-your-result",
      text: "Reading your result: AA, AS, SS, AC, SC",
    },
    {
      type: "p",
      text: "The letters on a genotype result describe which haemoglobin genes you inherited from each parent, with AA being the most common pattern and free of sickle-related risk. AS means you carry one sickle gene and one normal gene, you are healthy and usually have no symptoms, but you can pass the sickle gene to your children. SS means both genes are the sickle variant, which is sickle cell disease itself, a lifelong condition needing ongoing medical care. AC and SC are less common combinations involving haemoglobin C, and both are worth discussing with a doctor or genetic counsellor, since SC in particular carries its own set of health considerations.",
    },
    {
      type: "list",
      items: [
        "AA: the most common result, no sickle haemoglobin gene, no related risk to pass on.",
        "AS: a healthy carrier of one sickle gene, usually no symptoms, can pass the gene to children.",
        "SS: sickle cell disease, both haemoglobin genes are the sickle variant, requires lifelong medical management.",
        "AC: carrier of one haemoglobin C gene, usually no symptoms on its own.",
        "SC: sickle cell disease of a different type from SS, with its own pattern of complications, worth a specialist conversation.",
      ],
    },
    {
      type: "link-internal",
      to: "/blog/sickle-cell-trait-testing",
      label: "Sickle cell trait in depth: inheritance mechanics and why it is so common in West Africa",
    },
    {
      type: "h2",
      id: "compatibility-for-couples",
      text: "Genotype compatibility for couples, and what the percentages mean",
    },
    {
      type: "p",
      text: "When both partners carry the sickle cell gene (AS and AS), each pregnancy carries roughly a 25 percent chance of a child with sickle cell disease (SS), a 50 percent chance of a healthy carrier (AS), and a 25 percent chance of AA, and that ratio resets with every pregnancy rather than guaranteeing one affected child in four. A couple could have four children who are all AS, or one who is SS on the very first pregnancy. The odds apply to each pregnancy independently, the same way a coin does not \"remember\" its last flip.",
    },
    {
      type: "image",
      src: "/blog/genotype-compatibility.svg",
      alt: "Genotype compatibility chart: AA plus AA is fully safe, AA plus AS carries no SS risk, AS plus AS carries a 25 percent SS chance per pregnancy, and AS plus SS is high-risk.",
      caption: "Compatibility odds by genotype pairing. Each pregnancy carries the same independent odds.",
    },
    {
      type: "list",
      items: [
        "AA + AA: no risk of a child with sickle cell disease or trait.",
        "AA + AS: no risk of sickle cell disease in children, about 50% chance a child is AS.",
        "AS + AS: about 25% chance per pregnancy of SS, 50% chance of AS, 25% chance of AA.",
        "AS + SS or SS + SS: high risk, every child will carry at least one sickle gene, with a substantial chance of SS.",
      ],
    },
    {
      type: "h2",
      id: "why-it-matters-before-marriage",
      text: "Why this matters most before marriage or starting a family",
    },
    {
      type: "p",
      text: "Knowing both partners' genotype before marriage or conception gives couples time for genetic counselling and informed decisions, which is why genotype testing is now a routine part of premarital screening across much of West Africa. Neither AS nor SS is a reason to view a partner differently as a person. The purpose of testing early is planning, not judgement, whether that means understanding the odds, discussing family planning options, or going in with clear information rather than a surprise later.",
    },
    {
      type: "link-internal",
      to: "/blog/premarital-screening",
      label: "The full premarital screening panel: genotype, blood group, and infectious disease testing",
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
        "Get your genotype confirmed by haemoglobin electrophoresis or HPLC at a lab, not a rapid sickling test alone.",
        "Share your result with your partner and ask them to test too, ideally before you are both deeply committed to marriage plans.",
        "If both partners are AS, or if either is SS or SC, ask for a referral to genetic counselling to talk through the real odds and your options.",
        "If you are AS and already have children, there is no need to test them urgently for social reasons, but their genotype can be checked at a routine visit if you want to know.",
        "Remember that AS is a normal, healthy variant carried by a large share of the population in genotype-testing regions. It is common, not a diagnosis to fear.",
      ],
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "See the genotype and haematology panel BetterHealth Africa offers",
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
          q: "What is the difference between genotype AA, AS, and SS?",
          a: "AA means you carry no sickle haemoglobin gene. AS means you carry one sickle gene and one normal gene, making you a healthy carrier who can pass the gene on. SS means both genes are the sickle variant, which is sickle cell disease itself and needs lifelong medical care.",
        },
        {
          q: "Can two AS parents have a healthy child?",
          a: "Yes. Each pregnancy from two AS parents carries roughly a 25% chance of AA, a 50% chance of AS, and a 25% chance of SS, and these odds apply independently to every pregnancy. Most children of two AS parents are not SS.",
        },
        {
          q: "Is a genotype test the same as a blood group test?",
          a: "No. A genotype test checks your haemoglobin variant (AA, AS, SS, and related types). A blood group test checks your ABO type and Rh factor. They are done from separate panels and answer different questions, though both are commonly included in premarital screening.",
        },
        {
          q: "Should I avoid marrying someone who is AS if I am also AS?",
          a: "That is a personal decision best made after genetic counselling, not a rule. Two AS partners can still have healthy children, since the sickle cell chance is 25% per pregnancy, not guaranteed. Counselling helps couples understand the real odds and their options.",
        },
        {
          q: "How is a genotype test done?",
          a: "The most accurate methods are haemoglobin electrophoresis or HPLC, both lab-based techniques that separate and identify haemoglobin types directly. A rapid sickling test can screen for the presence of sickle haemoglobin but cannot reliably distinguish AS from SS on its own.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis, genetic counselling, or care from a qualified healthcare professional. Family planning decisions involving genotype results are personal and depend on your specific circumstances. Always discuss your results with a doctor or a qualified genetic counsellor.",
    },
  ],
};
