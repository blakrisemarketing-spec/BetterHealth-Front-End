// Patients-led screening hub article (cluster: "screening"). Pan-African market,
// continental framing: covers the antenatal blood panel as practiced broadly
// across African antenatal care, with Ghana noted as one example rather than the
// frame. Primary keyword: antenatal blood tests (10/mo Ghana, DataForSEO
// 2026-07-12, low volume but strong AI-citation and topical-authority value).
// Secondary: pregnancy blood tests, antenatal profile test, antenatal test,
// booking bloods (UK-ism, low priority), tests during pregnancy.
// This is the "pregnancy screening" front door: it summarizes the standard
// first-visit panel (blood group/Rh, full blood count, HIV, hepatitis B,
// genotype, gestational diabetes) and cross-links to the deeper single-test
// articles rather than duplicating them. Claims follow WHO antenatal care
// guidance; Rh/anti-D and gestational diabetes management are kept general and
// routed to "your antenatal care provider," with no specific drug/protocol
// recommendation. Voice: plain, human, no em dashes (bh-humanizer applied).
export default {
  slug: "antenatal-blood-tests",
  title: "Antenatal Blood Tests: The Pregnancy Screening Panel Explained",
  description:
    "Antenatal blood tests check blood group, anaemia, HIV, hepatitis B, genotype and blood sugar. A plain-language guide to what each test finds, why it matters for mother and baby, and when it happens.",
  excerpt:
    "The blood test order handed to you at your first antenatal visit is checking for several things at once. Here is what each test in the panel looks for, why it matters, and roughly when it happens.",
  datePublished: "2026-07-12",
  dateModified: "2026-07-12",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt:
    "Illustration explaining the antenatal blood test panel: blood group, anaemia screening, HIV, hepatitis B, genotype and blood sugar testing in pregnancy.",
  tags: ["antenatal care", "pregnancy", "screening", "prenatal tests"],
  cluster: "screening",
  primaryKeyword: "antenatal blood tests",
  readingMinutes: 8,
  body: [
    {
      type: "image",
      src: "/blog/antenatal-hero.svg",
      alt: "The antenatal blood test panel explained: blood group, anaemia, HIV and hepatitis B, genotype, and blood sugar screening.",
    },
    {
      type: "p",
      text: "The first antenatal visit almost always comes with a blood test order, sometimes called booking bloods or an antenatal profile, and it can feel like a lot to have drawn in one sitting. Each test on that order is looking for something specific: a condition that either you or your baby could carry without any symptoms, and that can be managed better if it is found early rather than discovered later in the pregnancy.",
    },
    {
      type: "p",
      text: "This is not a single country's checklist. Across antenatal care programmes on the continent, from Ghana to Kenya to South Africa, the core panel looks broadly similar, built around the same handful of conditions that are common, mostly silent, and worth catching in the first trimester if possible.",
    },
    {
      type: "h2",
      id: "why-it-matters",
      text: "Antenatal blood tests exist to catch conditions with no symptoms early enough to act on them",
    },
    {
      type: "p",
      text: "Pregnancy does not cause most of the conditions this panel screens for. Anaemia, HIV, hepatitis B, a sickle cell gene, or an Rh-negative blood type can all be present long before pregnancy and go unnoticed because none of them reliably cause symptoms on their own. What changes during pregnancy is the stakes: some of these conditions can affect how the pregnancy progresses or can pass from mother to baby, so finding them at the first visit, while there is still time to plan or start treatment, is the entire point of screening.",
    },
    {
      type: "p",
      text: "The World Health Organization's antenatal care guidance recommends this kind of early, structured blood screening as a routine part of a woman's first contact with antenatal care, precisely because waiting for symptoms would mean waiting too long for several of these conditions.",
    },
    {
      type: "h2",
      id: "blood-group-rhesus",
      text: "A blood group and Rhesus factor test flags Rh-negative mothers who may need extra monitoring",
    },
    {
      type: "p",
      text: "Every antenatal panel includes an ABO blood group and Rhesus (Rh) factor test. Knowing your blood group matters in case a transfusion is ever needed during delivery, and it is a quick, permanent result once established. The Rh factor matters for a more specific reason: if an Rh-negative mother is carrying an Rh-positive baby, her immune system can form antibodies against the baby's blood cells, usually after the two blood supplies mix around delivery, a miscarriage, or certain procedures.",
    },
    {
      type: "p",
      text: "That first exposure rarely causes a problem in the same pregnancy, but the antibodies it creates can remain afterward and affect a later Rh-positive pregnancy. This is why Rh status is checked at the very first antenatal visit rather than later, and why an Rh-negative result usually leads to a conversation with your antenatal care provider about monitoring and, where appropriate, preventive treatment during this and future pregnancies. The exact approach depends on your individual history, so it is a plan to build with your own provider rather than from an article.",
    },
    {
      type: "link-internal",
      to: "/blog/blood-group-test",
      label: "Blood group and Rhesus factor: what your result means, in full",
    },
    {
      type: "h2",
      id: "fbc-anaemia",
      text: "A full blood count at booking screens for anaemia, one of the most common and most treatable conditions in pregnancy",
    },
    {
      type: "p",
      text: "Pregnancy increases a woman's blood volume and her body's demand for iron and folate to support the baby's growth, which is exactly why anaemia is so common in pregnancy and why a full blood count is part of the booking panel rather than an optional extra. The test measures haemoglobin and red blood cell counts, and a result below the expected range flags anaemia that can otherwise cause fatigue, shortness of breath, and, if left unaddressed, complications for both mother and baby.",
    },
    {
      type: "p",
      text: "Mild anaemia in pregnancy is common across the continent and usually responds well to iron and folate supplementation once identified, which is one reason the full blood count is often repeated later in pregnancy rather than checked only once. A related test, ferritin, gives a more direct read on the body's iron stores and is sometimes ordered alongside or after a full blood count if anaemia needs a closer look.",
    },
    {
      type: "h2",
      id: "hiv-hepatitis-b",
      text: "HIV and hepatitis B screening at the first antenatal visit let treatment or prevention of mother-to-child transmission start as early as possible",
    },
    {
      type: "p",
      text: "Both HIV and hepatitis B can pass from a mother to her baby, most often around the time of delivery, and both are far easier to prevent from spreading to the baby when they are caught before delivery rather than after. This is why HIV and hepatitis B (HBsAg) testing sit alongside each other on almost every antenatal panel across the region, often together with a syphilis screen.",
    },
    {
      type: "p",
      text: "A positive HIV result at booking allows antiretroviral treatment to start early in the pregnancy, which sharply lowers the chance the virus passes to the baby. A positive hepatitis B result flags the need for the newborn to receive a birth-dose vaccine as close to delivery as possible, one of the most effective interventions available for breaking that chain of transmission. Neither result is a reason to panic; both are a reason to follow your antenatal provider's plan for the rest of the pregnancy and delivery.",
    },
    {
      type: "list",
      items: [
        "HIV screening: allows early antiretroviral treatment, which lowers mother-to-child transmission risk substantially.",
        "Hepatitis B (HBsAg) screening: flags the need for a timely newborn birth-dose vaccine.",
        "Syphilis screening: often bundled into the same panel, since untreated syphilis in pregnancy can also affect the baby.",
      ],
    },
    {
      type: "link-internal",
      to: "/blog/hiv-test-explained",
      label: "HIV testing explained: window periods, test types and reading your result",
    },
    {
      type: "h2",
      id: "genotype-sickle-cell",
      text: "Genotype or sickle cell screening in pregnancy matters most in West and Central Africa, where a large share of the population carries the sickle cell trait",
    },
    {
      type: "p",
      text: "A genotype test identifies the haemoglobin genes a person carries, reported as a short code such as AA, AS or SS. In much of West and Central Africa, roughly one in four people carries the sickle cell trait (AS), a rate high enough that genotype screening in pregnancy is treated as routine rather than exceptional in many antenatal programmes across the region.",
    },
    {
      type: "p",
      text: "If a pregnant woman's genotype has not already been confirmed, testing it during antenatal care matters for two reasons. First, if she carries the sickle cell trait or sickle cell disease herself, and her partner's genotype is known or can be tested too, the couple can understand the odds their baby could inherit sickle cell disease. Second, a mother with sickle cell disease (SS) herself needs a pregnancy managed as higher risk, with closer monitoring by a team experienced in the condition. Either way, genotype testing in pregnancy is about information and planning, not a verdict on the pregnancy itself.",
    },
    {
      type: "link-internal",
      to: "/blog/genotype-test-aa-as-ss",
      label: "Genotype test (AA, AS, SS): what your result means for family planning",
    },
    {
      type: "h2",
      id: "gestational-diabetes",
      text: "Gestational diabetes screening is usually done around 24 to 28 weeks of pregnancy, later than most of the other booking bloods",
    },
    {
      type: "p",
      text: "Unlike blood group, full blood count, HIV, hepatitis B and genotype, which are typically drawn once at the first visit, blood sugar screening for gestational diabetes usually happens later, around the second trimester, because the hormonal changes that can push blood sugar up build gradually as the placenta grows. An oral glucose tolerance test is the method most antenatal programmes use: a fasting blood draw, a sugary drink, then one or two further blood draws over the next couple of hours to see how the body clears the sugar.",
    },
    {
      type: "p",
      text: "Gestational diabetes that goes undetected can lead to a larger than average baby, a harder delivery, and a higher chance of the mother developing type 2 diabetes later in life. Caught through screening, it is generally managed well with dietary changes, monitoring and, if needed, medication that your antenatal care provider will guide you through directly. A gestational diabetes diagnosis is common, treatable, and not a sign that anything was done wrong in the pregnancy.",
    },
    {
      type: "image",
      src: "/blog/antenatal-panel-timeline.svg",
      alt: "Timeline of the antenatal blood test panel: blood group, full blood count, HIV, hepatitis B and genotype tested at the first booking visit, blood sugar screening for gestational diabetes around 24 to 28 weeks, and repeat tests or extra monitoring later as needed.",
      caption: "A typical timing pattern across antenatal care. Your own provider may adjust it to your history.",
    },
    {
      type: "h2",
      id: "timing",
      text: "Most of the core antenatal panel is drawn once at booking, though a few tests are commonly repeated later in pregnancy",
    },
    {
      type: "p",
      text: "Blood group, Rhesus factor, HIV, hepatitis B and genotype are usually established once, since none of them change during pregnancy and a confirmed result from early on still applies later. Full blood count is different: because anaemia can develop or worsen as the pregnancy progresses and the baby's demand for iron grows, it is often rechecked in the third trimester even if the booking result was normal. Blood sugar screening for gestational diabetes happens on its own later timeline, around 24 to 28 weeks, and an Rh-negative mother's antibody status may also be monitored again later in pregnancy at her provider's discretion.",
    },
    {
      type: "callout",
      title: "Timing varies by clinic and by risk",
      text: "The pattern above is typical, not universal. Some antenatal programmes screen earlier or later, and anyone with a higher-risk history, a previous complicated pregnancy, or symptoms in between visits may be tested more often. Your antenatal care provider sets the schedule that fits you.",
    },
    {
      type: "h2",
      id: "what-to-do",
      text: "A normal antenatal panel is reassuring, and an abnormal result is a starting point for a plan, not a crisis",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Ask for the full antenatal panel at your first visit if it has not already been offered, ideally as early in the pregnancy as possible.",
        "If any result is abnormal, ask your antenatal care provider to walk you through what it means specifically for you and your baby, and what monitoring or next steps follow.",
        "Keep a copy of your results. Blood group, Rh factor and genotype do not change, so you will not need to repeat those tests in a future pregnancy once confirmed.",
        "Expect a repeat full blood count later in pregnancy, and a separate glucose screening around 24 to 28 weeks, even if your booking results were normal.",
        "If you are planning a pregnancy and have not had a genotype or blood group test before, consider getting both done ahead of time alongside your partner's.",
      ],
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "See BetterHealth Africa's pregnancy and antenatal screening panel",
    },
    {
      type: "faq",
      items: [
        {
          q: "What tests are done at the first antenatal visit?",
          a: "A typical first-visit panel includes a blood group and Rhesus factor test, a full blood count to screen for anaemia, HIV testing, hepatitis B (HBsAg) testing, often a syphilis screen, and genotype or sickle cell screening. Blood sugar screening for gestational diabetes is usually done later, around 24 to 28 weeks, rather than at this first visit.",
        },
        {
          q: "Why does blood group and Rhesus factor matter for pregnancy?",
          a: "Blood group matters in case a transfusion is ever needed at delivery. Rhesus factor matters more specifically because an Rh-negative mother carrying an Rh-positive baby can develop antibodies against the baby's blood cells, usually after their blood supplies mix around delivery. Those antibodies rarely affect the same pregnancy but can affect a later one, which is why Rh status is checked as early as possible and monitored by your antenatal care provider.",
        },
        {
          q: "Why does genotype testing matter in pregnancy?",
          a: "A genotype test shows which haemoglobin genes you carry, reported as AA, AS, SS or related codes. In West and Central Africa, where the sickle cell trait is common, knowing your genotype and your partner's helps you understand the odds your baby could inherit sickle cell disease, and it flags whether a mother with sickle cell disease herself needs a pregnancy managed as higher risk.",
        },
        {
          q: "When does gestational diabetes screening happen in pregnancy?",
          a: "Blood sugar screening for gestational diabetes is usually done around 24 to 28 weeks of pregnancy, later than the rest of the booking panel, because the hormonal changes that can raise blood sugar build up gradually as the pregnancy progresses. An oral glucose tolerance test is the method most antenatal programmes use.",
        },
        {
          q: "Can antenatal blood tests be repeated later in pregnancy?",
          a: "Yes, some of them. Blood group, Rhesus factor, HIV, hepatitis B and genotype are usually established once and do not need repeating, since the results do not change. A full blood count is commonly rechecked in the third trimester because anaemia can develop as pregnancy progresses, and blood sugar screening happens on its own separate schedule around 24 to 28 weeks.",
        },
        {
          q: "Do I need to fast before antenatal blood tests?",
          a: "It depends on the test. Blood group, full blood count, HIV, hepatitis B and genotype testing do not require fasting. The oral glucose tolerance test used for gestational diabetes screening usually does require a fasting blood draw beforehand, so confirm the specific instructions with your antenatal care provider before that appointment.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis, antenatal care, or treatment by a qualified healthcare professional. Antenatal screening schedules, Rh-incompatibility monitoring, and gestational diabetes management depend on your specific results and pregnancy history. Always discuss your own antenatal test results and care plan with your antenatal care provider or doctor.",
    },
  ],
};
