// Patients-led biomarker explainer (cluster: "understand your biomarkers").
// Primary keyword: g6pd test (390/mo Ghana, LOW competition, DataForSEO 2026-07-12).
// Secondary: g6pd deficiency, favism, g6pd and malaria drugs, g6pd deficiency foods
// to avoid, g6pd test procedure (90/mo), g6pd test in pregnancy (10/mo), g6pd test
// result interpretation (50/mo). Market: pan-africa, written with continental
// framing; West Africa prevalence called out specifically per WHO/CDC guidance on
// G6PD testing before primaquine/tafenoquine.
// Voice: plain, human, no em dashes (bh-humanizer applied). Clinical caution kept:
// no specific drug/dose instructions, only "get tested first, ask your doctor."
export default {
  slug: "g6pd-deficiency-test",
  title: "G6PD Deficiency: Why This Test Matters Before Some Medications",
  description:
    "G6PD deficiency is an inherited enzyme condition that can cause dangerous red blood cell breakdown with certain malaria drugs, foods and infections. Learn what a G6PD test shows, who needs one before treatment, and how to read your result.",
  excerpt:
    "G6PD deficiency is common across malaria-endemic Africa, and it matters most at the exact moment someone is handed antimalarial drugs like primaquine or tafenoquine without being tested first. What the test shows, and why the timing of testing matters.",
  datePublished: "2026-07-12",
  dateModified: "2026-07-12",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt:
    "Illustration explaining the G6PD test: an inherited enzyme deficiency that matters before certain malaria drugs, foods and infections.",
  tags: [
    "G6PD",
    "G6PD deficiency",
    "favism",
    "malaria",
    "biomarkers",
  ],
  cluster: "biomarkers",
  primaryKeyword: "g6pd test",
  readingMinutes: 8,
  body: [
    {
      type: "image",
      src: "/blog/g6pd-hero.svg",
      alt: "G6PD deficiency explained: an inherited enzyme test that matters before primaquine or tafenoquine malaria treatment.",
    },
    {
      type: "p",
      text: "Most people who carry G6PD deficiency go their whole lives without a problem. Then one day they are handed a routine antimalarial prescription, or they eat a dish made with fava beans, and their red blood cells start breaking down faster than their body can replace them. A G6PD test is the one piece of information that prevents this from happening by surprise.",
    },
    {
      type: "p",
      text: "G6PD deficiency is one of the most common inherited enzyme conditions in the world, and it is especially common across malaria-endemic Africa. It rarely causes trouble on its own. The trouble starts when a specific trigger meets a person who does not yet know their status.",
    },
    {
      type: "h2",
      id: "what-it-is",
      text: "G6PD deficiency is an inherited, X-linked condition in which red blood cells lack enough of an enzyme that protects them from oxidative stress, making them prone to sudden breakdown when exposed to certain triggers.",
    },
    {
      type: "p",
      text: "G6PD stands for glucose-6-phosphate dehydrogenase, an enzyme found in every cell in the body, including red blood cells. Its job is to help red cells manage oxidative stress, a kind of internal chemical wear and tear that builds up from normal metabolism and gets worse under certain drugs, foods and infections.",
    },
    {
      type: "p",
      text: "People with G6PD deficiency have red blood cells that run low on this protective enzyme. Under normal daily life, that shortfall usually causes nothing noticeable. Under oxidative stress from a specific trigger, red cells can break down faster than the bone marrow can replace them, a process called haemolysis. That sudden drop in working red blood cells is what causes the fatigue, pale skin, dark urine, jaundice and, in severe cases, dangerously low haemoglobin that define a haemolytic episode.",
    },
    {
      type: "p",
      text: "The gene for G6PD sits on the X chromosome, which is why the condition is described as X-linked. Men have one X chromosome, so one affected copy is enough to cause deficiency. Women have two X chromosomes, so a woman can be a carrier with one affected copy and one normal copy, and her red cells end up as a mosaic, some working normally and some deficient, because one X chromosome is switched off at random in each cell. A woman who inherits two affected copies has full deficiency, similar to an affected man.",
    },
    {
      type: "callout",
      title: "Why it is so common in malaria-endemic Africa",
      text: "G6PD deficiency persists at high frequency in parts of Africa for the same reason sickle cell trait does: carrying it appears to give some protection against severe malaria, so the gene was not selected out over generations even though it carries its own risk. Estimates for G6PD deficiency in some West African populations commonly cited in the literature run in the range of roughly 10 to 20%, though the exact figure varies by country, region and which G6PD variant is being measured.",
    },
    {
      type: "h2",
      id: "triggers",
      text: "The classic triggers for a G6PD haemolytic reaction are the antimalarial drugs primaquine and tafenoquine, some sulfa-based medicines, fava beans, and the physical stress of certain infections.",
    },
    {
      type: "p",
      text: "Not every drug or food is a problem for someone with G6PD deficiency. The list of confirmed and suspected triggers is fairly specific, and it is worth knowing even if you have never been tested, because recognising a trigger situation is part of staying safe until you are.",
    },
    {
      type: "image",
      src: "/blog/g6pd-triggers.svg",
      alt: "Four common G6PD haemolysis triggers: antimalarial drugs (primaquine, tafenoquine), fava beans (favism), sulfa drugs and naphthalene, and certain infections.",
      caption: "Oxidative stress on red blood cells comes from a fairly specific list of drugs, foods and infections.",
    },
    {
      type: "list",
      items: [
        "Primaquine and tafenoquine: antimalarial drugs used for radical cure of P. vivax malaria and in some mass drug administration campaigns. These are the trigger with the most direct medical relevance across Africa.",
        "Some sulfa-based medicines, including certain antibiotics, and a handful of other oxidative drugs your prescriber can check against your G6PD status.",
        "Fava beans, also called broad beans, the trigger that gives the condition its older name, favism. Reactions have also been reported from inhaling pollen from fava plants in rare cases.",
        "Naphthalene, found in mothballs, which can trigger haemolysis through skin contact or inhalation, including in newborns exposed to naphthalene-treated clothing or bedding.",
        "Certain viral and bacterial infections, which can trigger a haemolytic episode on their own, independent of any medication or food.",
      ],
    },
    {
      type: "callout",
      title: "This is a list to flag, not to fear",
      text: "Nobody memorises a full drug list to stay safe. The practical habit is simpler: once you know your G6PD status, you tell every doctor, pharmacist and antenatal provider before they prescribe anything, and they check it against your status. That single habit does most of the protective work.",
    },
    {
      type: "h2",
      id: "malaria-treatment",
      text: "G6PD deficiency matters most urgently before primaquine or tafenoquine treatment for malaria, because giving these drugs to someone who is G6PD deficient without testing first can trigger dangerous haemolysis.",
    },
    {
      type: "p",
      text: "Most malaria treatment in Africa targets Plasmodium falciparum and does not involve primaquine or tafenoquine directly. But primaquine is also used for radical cure, clearing the dormant liver stage of P. vivax malaria, and both primaquine and tafenoquine are used at higher, single-dose levels in some mass drug administration and malaria elimination programmes. It is at these moments, and in P. vivax-endemic parts of the continent, that G6PD status becomes a direct treatment decision rather than background information.",
    },
    {
      type: "p",
      text: "Giving these drugs to someone with significant G6PD deficiency without checking status first can trigger acute haemolysis severe enough to require transfusion, and it has caused deaths in documented cases globally. This is exactly why WHO and national malaria treatment guidance call for G6PD testing before these specific drugs are given wherever testing is available, rather than treating on symptoms and drug availability alone.",
    },
    {
      type: "callout",
      title: "Never start or stop a malaria drug based on this article",
      text: "This article explains why G6PD testing matters before primaquine or tafenoquine. It is not a guide to dosing, and it does not tell you which drug is safe for your specific case. That decision belongs to a qualified clinician who knows your G6PD status, your malaria species, and your full medical history.",
    },
    {
      type: "link-internal",
      to: "/blog/malaria-test-explained",
      label: "Malaria testing explained: RDT vs blood film, and confirming the species before treatment",
    },
    {
      type: "h2",
      id: "how-the-test-works",
      text: "A G6PD test is a quantitative blood enzyme assay, and it is most accurate when done outside of an active or recent haemolytic episode, since enzyme levels can transiently look falsely normal right after red cells have already broken down.",
    },
    {
      type: "p",
      text: "The standard G6PD test measures the actual level of enzyme activity in a blood sample, reported as a quantitative result rather than a simple positive or negative. Some clinics also use a faster qualitative screening test, which flags deficiency but is less precise, particularly in women who may fall in an intermediate range.",
    },
    {
      type: "p",
      text: "One timing detail matters more with this test than with most others. During and shortly after an acute haemolytic episode, the oldest, most G6PD-deficient red cells have already broken down, leaving behind a population of younger cells that can temporarily test with a falsely normal or borderline enzyme level. For this reason, a clinician may want to test at a later, stable point, or interpret a result taken during illness with that caveat in mind, sometimes repeating the test once someone has recovered.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "A small blood sample is drawn, similar to most standard blood tests, with no special fasting required.",
        "The lab measures G6PD enzyme activity directly, or in some settings runs a qualitative screening test first.",
        "If the result is borderline, taken during acute illness, or a woman's result falls in an intermediate range, a repeat or confirmatory test at a stable time may be recommended.",
      ],
    },
    {
      type: "h2",
      id: "pregnancy",
      text: "G6PD testing is safe in pregnancy and is sometimes added to antenatal blood work, partly because a mother's and baby's G6PD status can affect the baby's jaundice risk after birth.",
    },
    {
      type: "p",
      text: "There is nothing about pregnancy that makes a G6PD test unsafe or inaccurate; it uses the same small blood sample as at any other time. Some antenatal programmes include it, particularly where malaria treatment decisions or a family history of G6PD deficiency make it relevant, though it is not yet a universal part of routine antenatal panels everywhere.",
    },
    {
      type: "p",
      text: "G6PD status is also relevant for a newborn, since babies with the deficiency have a higher risk of significant jaundice in the first days of life, which is why some newborn screening programmes test for it directly. If G6PD deficiency runs in your family, or if you are due for antimalarial treatment during pregnancy, it is a reasonable question to raise with your antenatal care provider.",
    },
    {
      type: "h2",
      id: "reading-your-result",
      text: "A G6PD-deficient result is not the same severity in every carrier, and the way it is reported differs between men, homozygous women, and heterozygous women because of how the X chromosome is inactivated.",
    },
    {
      type: "p",
      text: "A man with an affected G6PD gene will show clearly deficient enzyme activity, since he has only the one copy. A woman who inherited two affected copies will look similar. A woman who inherited one affected copy and one normal copy is a carrier, and because each of her cells randomly switches off one X chromosome, her red cells are a mixture of normal and deficient. Her overall enzyme result can land anywhere from clearly deficient to intermediate to appearing broadly normal, depending on the mix, which is why some carrier women are missed by simpler screening tests.",
    },
    {
      type: "list",
      items: [
        "Normal: enzyme activity in the expected range. No known G6PD-related restriction on drugs or foods.",
        "Deficient: enzyme activity clearly below normal. Avoidance of known trigger drugs and fava beans matters, and every prescriber should be told.",
        "Intermediate (most often in female carriers): enzyme activity falls between normal and clearly deficient. Ask a clinician how cautious to be with trigger drugs, since some intermediate results still carry meaningful risk.",
      ],
    },
    {
      type: "h2",
      id: "living-with-it",
      text: "G6PD deficiency is manageable, not a fixed disability, because avoiding known trigger drugs and fava beans, and telling every prescriber your status, prevents the overwhelming majority of reactions.",
    },
    {
      type: "p",
      text: "A confirmed G6PD-deficient result is not a diagnosis that limits daily life. Most people with G6PD deficiency eat a normal varied diet, work, exercise and travel without incident, as long as the specific triggers are avoided or checked before use.",
    },
    {
      type: "list",
      items: [
        "Fava beans (broad beans) are the one food worth avoiding if you are G6PD deficient. Other foods are not typically a concern from G6PD deficiency alone.",
        "Carry your G6PD status somewhere accessible, a note in your phone, a card in your wallet, or mentioned at the start of any medical visit, so a prescriber checks it before writing any new medication.",
        "Ask specifically about your G6PD status before any antimalarial treatment involving primaquine or tafenoquine, and before any new prescription if you already know you are deficient.",
        "Avoid mothball-treated clothing and bedding (naphthalene) if you are G6PD deficient, and be cautious with it around a G6PD-deficient newborn or infant.",
        "See a doctor promptly for dark urine, unusual paleness, fatigue or yellowing of the skin or eyes after a known trigger, since early treatment of a haemolytic episode is usually straightforward.",
      ],
    },
    {
      type: "link-internal",
      to: "/blog/sickle-cell-trait-testing",
      label: "Sickle cell trait explained: another inherited blood condition shaped by the same malaria-selection story",
    },
    {
      type: "h2",
      id: "what-to-do",
      text: "What to do with your G6PD result",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Get tested if you are due for primaquine or tafenoquine treatment, or if G6PD deficiency runs in your family, before treatment starts, not after a reaction.",
        "If your result is deficient, tell every doctor, pharmacist and antenatal provider before they prescribe anything new.",
        "If your result was taken during an acute illness or haemolytic episode, ask whether it needs to be repeated once you are stable, since levels can look falsely normal right after an episode.",
        "If you are a woman with an intermediate result, ask your clinician how it should change your precautions, since intermediate carriers are not automatically low risk.",
        "Keep a written or digital record of your G6PD status that you can share quickly in an emergency or a new clinical setting.",
      ],
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "See the blood health panel BetterHealth Africa tests",
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
          q: "What is G6PD deficiency?",
          a: "G6PD deficiency is an inherited, X-linked condition in which red blood cells lack enough of an enzyme, glucose-6-phosphate dehydrogenase, that protects them from oxidative stress. It usually causes no symptoms until red cells are exposed to a specific trigger, such as certain drugs, fava beans, or an infection, at which point they can break down faster than the body can replace them.",
        },
        {
          q: "Who should get a G6PD test before malaria treatment?",
          a: "Anyone being considered for primaquine or tafenoquine, the antimalarial drugs used for P. vivax radical cure and in some mass drug administration campaigns, should ideally be tested for G6PD deficiency first. Giving these drugs without testing carries a real risk of triggering dangerous haemolysis in someone who is deficient. Ask your prescriber about G6PD testing before starting either drug.",
        },
        {
          q: "Can a G6PD test be done during pregnancy?",
          a: "Yes. A G6PD test uses the same small blood sample at any stage of pregnancy and is not known to carry any pregnancy-specific risk. Some antenatal programmes include it, and it is also relevant to a newborn's jaundice risk after birth, so it is a reasonable question to raise with your antenatal care provider.",
        },
        {
          q: "What foods and drugs should someone with G6PD deficiency avoid?",
          a: "Fava beans (broad beans) are the classic food trigger, which is why the condition is sometimes called favism. On the drug side, primaquine, tafenoquine, and some sulfa-based medicines are the main known triggers. A confirmed G6PD-deficient person should tell every prescriber their status so specific drugs can be checked against it, rather than trying to memorise a full list themselves.",
        },
        {
          q: "How do I interpret my G6PD test result?",
          a: "A normal result means enzyme activity is in the expected range with no known restriction. A deficient result means enzyme activity is clearly below normal, and trigger drugs and fava beans should be avoided or checked with a doctor first. An intermediate result, seen most often in female carriers, falls in between and still deserves caution, since it does not always mean low risk. Ask your clinician to walk through what your specific number means.",
        },
        {
          q: "Is G6PD deficiency dangerous?",
          a: "On its own, day to day, G6PD deficiency usually causes no problems at all. It becomes dangerous specifically when a known trigger, such as primaquine, tafenoquine, certain other drugs, fava beans, or some infections, meets a person who has not been tested or whose status has not been checked before treatment. With known status and avoidance of triggers, most people with G6PD deficiency live a normal, unrestricted life.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis or treatment by a qualified healthcare professional. Never start, stop, or choose a malaria treatment based on this article. G6PD status, drug choice, and dosing must always be assessed by a qualified healthcare professional. Seek urgent medical care for dark urine, unusual paleness, fatigue, or jaundice after a known trigger.",
    },
  ],
};
