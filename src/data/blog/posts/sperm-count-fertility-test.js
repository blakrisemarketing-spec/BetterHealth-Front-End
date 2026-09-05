// Patients-led biomarker explainer (cluster: "biomarkers"). Market: Nigeria.
// Intent: informational.
// Primary keyword: sperm count test (320/mo Nigeria, DataForSEO-confirmed
// 2026-07-16). Secondary: normal sperm count to get pregnant (590/mo), sperm
// count test kit, sperm count test price, sperm count test at home.
// Clinical grounding: parameters and terminology match BetterHealth's own
// "Sperm & Semen Health" catalogue panel (Total Count, Concentration,
// Progressive/Non-Progressive/Immotile/Total Motility, Vitality, Abnormal
// Forms, Volume/Appearance/Colour/Odour/Viscosity/pH/Liquefaction, Fructose,
// Pus Cells/Round Cells/Agglutination) in src/data/content.js. Reference
// figures given (concentration, total count, motility, vitality, morphology,
// volume, pH, liquefaction) reflect WHO's widely used lower reference limits
// (5th percentile) for semen parameters and are presented as floors, not
// targets or averages, since exact cutoffs can vary slightly by lab and by
// which WHO manual edition a lab still references. No price or turnaround
// time is stated, since neither was verifiable at draft time; the price
// keyword is served by pointing to the live pricing page instead. No named
// clinician byline used. Fertility is framed throughout as a couple-based
// issue, not a male-only or shame-based one. At-home test kits are described
// neutrally (screening tool, concentration-only, less thorough than a lab
// panel) without endorsing or naming a brand.
// Voice: plain, human, no em dashes (bh-humanizer applied). Clinical caution
// kept throughout; a low result is never framed as a diagnosis.
export default {
  slug: "sperm-count-fertility-test",
  title: "Sperm Count and Semen Analysis: What the Fertility Test Checks",
  description:
    "A sperm count test, formally called a semen analysis, measures sperm concentration, motility, shape, volume and more. Learn what counts as a normal sperm count to get pregnant, how to prepare, and whether an at-home kit is enough.",
  excerpt:
    "A semen analysis measures more than a single number. What it checks, what the reference ranges mean, and why one low result is a prompt to retest, not a diagnosis.",
  datePublished: "2026-07-16",
  dateModified: "2026-07-16",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt:
    "Illustration explaining what a sperm count test (semen analysis) checks, from concentration to motility and shape.",
  tags: [
    "sperm count test",
    "semen analysis",
    "male fertility",
    "fertility test",
    "biomarkers",
  ],
  cluster: "biomarkers",
  primaryKeyword: "sperm count test",
  readingMinutes: 8,
  body: [
    {
      type: "image",
      src: "/blog/sperm-count-hero.svg",
      alt: "Sperm count and semen analysis explained: count, motility, morphology, volume and pH.",
    },
    {
      type: "p",
      text: "A sperm count test is one of the first things a doctor orders when a couple has been trying to conceive without success. The name undersells what the test does. A proper sperm count test, known clinically as a semen analysis, counts sperm and also looks at how well they move, what shape they are in, and several properties of the fluid that carries them.",
    },
    {
      type: "p",
      text: "This guide walks through what each part of the test measures, what the reference ranges mean, how to prepare for the sample, and what a low result does and does not tell you. It also covers where at-home sperm count kits fit in, since they are increasingly easy to find but measure far less than a full lab analysis.",
    },
    {
      type: "h2",
      id: "what-it-checks",
      text: "What a sperm count test checks",
    },
    {
      type: "p",
      text: "A full semen analysis measures sperm count and concentration, motility, shape (morphology), vitality, and several properties of the semen itself, including volume, pH, and how quickly the sample liquefies.",
    },
    {
      type: "p",
      text: "Concentration and total count tell you how many sperm are present, per millilitre and across the whole sample. Motility is broken down further into progressive motility, sperm swimming forward in a reasonably straight line, non-progressive motility, sperm that move but do not travel far, and immotile sperm, which do not move at all. Vitality checks what proportion of the sperm are alive, which matters most when motility is low, since a dead sperm cannot move regardless of anything else. Morphology looks at shape under a microscope and flags what share of sperm have an atypical head, midpiece, or tail. Volume, appearance, colour, odour, viscosity, pH, and liquefaction time describe the semen fluid itself rather than the sperm, and a lab will usually also note pus cells, round cells, and any clumping (agglutination), which can point toward infection or inflammation. Some labs add a fructose measurement, since fructose is what nourishes sperm in the fluid and its absence can point toward a blockage.",
    },
    {
      type: "list",
      items: [
        "Count and concentration: how many sperm are present, per millilitre and in total",
        "Motility: progressive, non-progressive, and immotile sperm, plus total motility",
        "Vitality: the share of sperm that are alive",
        "Morphology: the share of sperm with a typical shape",
        "Volume, appearance, colour, odour, viscosity, pH, and liquefaction: properties of the semen fluid",
        "Fructose: a sugar that nourishes sperm, checked when volume or count looks unusual",
        "Pus cells, round cells, and agglutination: signs of possible infection or inflammation",
      ],
    },
    {
      type: "h2",
      id: "how-to-prepare",
      text: "How to prepare for a sperm count test",
    },
    {
      type: "p",
      text: "Most labs ask for a short abstinence period before the sample, commonly somewhere between two and seven days, since too little or too much time since the last ejaculation can both distort the count and motility results.",
    },
    {
      type: "p",
      text: "Your clinic or lab will give you the exact window they want, and it is worth sticking to it rather than guessing. The sample itself is usually collected by masturbation into a sterile container, either at the lab or, depending on the clinic, at home and delivered within a set time, since sperm quality starts to change once the sample leaves the body. In the days beforehand, it helps to avoid heavy alcohol, recreational drugs, and prolonged exposure to heat, such as saunas, hot tubs, or a laptop resting directly on the lap for long stretches, since heat around the testicles can temporarily lower sperm production. A recent fever or illness, certain medications, and high stress can also affect a single result, which is part of why doctors rarely treat one semen analysis as the final word.",
    },
    {
      type: "h2",
      id: "reading-your-result",
      text: "Reading your result: what counts as a normal sperm count to get pregnant",
    },
    {
      type: "p",
      text: "There is no single number that guarantees a pregnancy, but the World Health Organization publishes lower reference limits for semen parameters that labs use to flag results as below the typical fertile range.",
    },
    {
      type: "p",
      text: "Those figures are commonly cited as a concentration of roughly 15 million sperm per millilitre and a total count of roughly 39 million per ejaculate, alongside minimum thresholds for total motility, progressive motility, vitality, and normal morphology. These are lower reference limits, not averages and not a pass mark to beat. They mark the bottom of the range seen in men whose partners conceived within a defined time, so a result comfortably above them is reassuring, and a result below them is a flag to look at more closely rather than a fixed line between fertile and infertile. Exact cutoffs can differ slightly between labs depending on which WHO manual edition they reference, so always read your result against the range printed on your own report.",
    },
    {
      type: "image",
      src: "/blog/sperm-count-parameters.svg",
      alt: "Semen analysis reference values: volume, concentration, total count, motility, vitality, morphology, pH and liquefaction, based on WHO lower reference limits.",
      caption: "WHO's lower reference limits for semen parameters. These are floors seen in fertile men, not targets or averages.",
    },
    {
      type: "h2",
      id: "one-low-result",
      text: "One low result does not mean infertility",
    },
    {
      type: "p",
      text: "A single low sperm count or motility result is not a diagnosis of infertility on its own, since semen quality naturally varies from sample to sample and can be temporarily affected by illness, fever, heat exposure, alcohol, stress, or certain medications.",
    },
    {
      type: "p",
      text: "Sperm production takes around two to three months from start to finish, so a result reflects what was happening in your body roughly that far back, not necessarily how things stand today. Because of this, most doctors ask for a repeat semen analysis some weeks after a low first result before drawing any conclusion. It is also worth saying plainly that fertility is a shared, couple-based issue rather than something to place on one partner. Difficulty conceiving can involve either partner, both partners, or neither in any identifiable way, and a full fertility work-up usually looks at both people together rather than treating a semen analysis as the whole story. A low count is one input a doctor reads alongside the rest of the picture, including a partner's own testing, general health, and how long the couple has been trying.",
    },
    {
      type: "callout",
      title: "A low result is a starting point, not a verdict",
      text: "Sperm counts fluctuate. A result below the reference range is a reason to retest and talk to a doctor, not a conclusion to sit with alone. Many men with a low first result go on to have a normal repeat test, and many others still father children with the help of straightforward treatment.",
    },
    {
      type: "link-internal",
      to: "/blog/premarital-screening",
      label: "Premarital screening: where a basic fertility conversation sometimes starts",
    },
    {
      type: "h2",
      id: "at-home-kits",
      text: "At-home sperm count test kits versus a lab semen analysis",
    },
    {
      type: "p",
      text: "At-home sperm count test kits can give a rough screening indication of sperm concentration, but they are less thorough than a full lab semen analysis, since most only measure count and do not assess motility or morphology.",
    },
    {
      type: "p",
      text: "These kits typically use a small device or app-based reader to estimate how many sperm are in a sample, and they can be a reasonable first check if cost or privacy is a barrier to visiting a lab. What they cannot tell you is how well those sperm move or whether they are shaped normally, both of which matter as much as the raw count when it comes to fertility. A kit that reads normal on concentration alone does not rule out a motility or morphology problem, and a kit that reads low is worth following up with a proper lab test rather than treating as final. For anyone actively trying to understand a fertility concern, a full lab semen analysis remains the more complete option.",
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "See the sperm and semen health panel BetterHealth Africa offers",
    },
    {
      type: "h2",
      id: "test-cost",
      text: "What a sperm count test costs and where to get one done",
    },
    {
      type: "p",
      text: "Sperm count test pricing varies by lab and by how detailed the panel is, so it is best confirmed directly with a testing provider rather than assumed from a generic figure online.",
    },
    {
      type: "p",
      text: "A basic count-only check will usually cost less than a full semen analysis that also covers motility, morphology, vitality, and the fluid properties described earlier in this guide. If a doctor has recommended testing because a couple has been trying to conceive for some time, it is worth asking specifically for the full panel rather than a count-only version, since motility and morphology are often just as relevant to the picture as the raw number.",
    },
    {
      type: "link-internal",
      to: "/book-tests",
      label: "View current BetterHealth Africa test pricing",
    },
    {
      type: "h2",
      id: "what-to-do",
      text: "What to do with your sperm count test result",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Follow the abstinence window your lab gives you, usually between two and seven days, rather than guessing.",
        "Avoid heavy alcohol, recreational drugs, and prolonged heat exposure in the days before your sample.",
        "Read your result against the range printed on your own lab report, since exact cutoffs can vary slightly by lab.",
        "If your result is below the reference range, ask your doctor about a repeat test rather than treating one sample as final.",
        "Remember fertility involves both partners. A full work-up usually looks at both people, not just the one who tested low.",
        "Treat an at-home kit as a rough first check, not a substitute for a full lab semen analysis if you need a clear answer.",
        "If you and your partner have been trying to conceive for a year without success, or six months if the woman is over 35, speak to a doctor about a full fertility evaluation.",
      ],
    },
    {
      type: "link-internal",
      to: "/blog/genotype-test-aa-as-ss",
      label: "Genotype test (AA, AS, SS): what your result means for family planning",
    },
    {
      type: "faq",
      items: [
        {
          q: "What is a normal sperm count to get pregnant?",
          a: "There is no single guaranteed number, but WHO's lower reference limits, commonly cited as around 15 million sperm per millilitre and around 39 million total per ejaculate, mark the bottom of the range seen in men whose partners conceived within a defined time frame. These are floors, not averages, and a result above them is reassuring while a result below them is a flag to look at further, not an automatic diagnosis.",
        },
        {
          q: "How should I prepare for a sperm count test?",
          a: "Most labs ask for a short abstinence period before the sample, commonly two to seven days. Follow the exact window your lab gives you, avoid heavy alcohol and prolonged heat exposure beforehand, and mention any recent fever, illness, or new medication, since these can all temporarily affect the result.",
        },
        {
          q: "Does one low sperm count result mean I am infertile?",
          a: "No. Semen quality varies from sample to sample and can be affected by illness, fever, heat, alcohol, stress, or medication around the time of the test. A single low result is usually followed by a repeat test some weeks later. Fertility is also a couple-based issue, so a low count is one input a doctor considers alongside a partner's own testing and the full clinical picture, not a standalone diagnosis.",
        },
        {
          q: "Are at-home sperm count test kits accurate enough to rely on?",
          a: "At-home kits can give a rough screening indication of sperm concentration, but most only measure count and do not check motility or morphology, both of which affect fertility. They can be a reasonable first check, but a full lab semen analysis is the more complete option if you need a clear answer, especially if the kit result is low or a doctor has already recommended testing.",
        },
        {
          q: "How soon should I retest after a low sperm count result?",
          a: "Doctors generally wait several weeks before repeating a semen analysis, since sperm production takes around two to three months from start to finish and a very recent result reflects that earlier window. Your doctor will usually suggest a specific timeframe based on your first result and history.",
        },
        {
          q: "How much does a sperm count test cost?",
          a: "Pricing varies by lab and by whether you choose a basic count-only check or a full semen analysis covering motility, morphology, vitality, and fluid properties. Confirm current pricing directly with a testing provider rather than relying on a generic figure, and ask for the full panel if a doctor has recommended testing for a fertility concern.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis or treatment by a qualified healthcare professional. Semen analysis results depend on individual factors including collection technique, abstinence window, recent illness, and underlying health conditions, and reference ranges can vary slightly by lab. Always discuss your results with your doctor.",
    },
  ],
};
