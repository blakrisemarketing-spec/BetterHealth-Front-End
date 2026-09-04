// Patients-led biomarker explainer (cluster: "understand your biomarkers").
// Primary keyword: blood group test (260/mo Ghana, LOW competition, DataForSEO 2026-07-09).
// Secondary: rhesus factor (1000/mo), blood group compatibility (320/mo),
// blood type test (10/mo), what is rhesus negative (10/mo), blood type (4400/mo).
// Claims are standard transfusion-medicine and obstetric knowledge: ABO/Rh
// antigen basics, universal donor/recipient concept, Rh-incompatibility risk
// in pregnancy (anti-D prophylaxis referenced generically, no protocol given),
// and sickle cell transfusion dependency. No African-specific statistics are
// invented; blood-shortage context is described qualitatively.
// Voice: plain, human, no em dashes (bh-humanizer applied). Clinical caution kept.
export default {
  slug: "blood-group-test",
  title: "Blood Group and Rhesus Factor: What Your Blood Type Means",
  description:
    "A blood group test shows your ABO type (A, B, AB or O) and your Rh factor (positive or negative). Learn how they're determined, why they matter for transfusion and pregnancy, and how to find out yours.",
  excerpt:
    "Your blood type is two separate results in one: an ABO group and an Rh factor. What each one means, why O-negative and AB-positive are called the universal types, and why Rh status gets checked early in pregnancy.",
  datePublished: "2026-07-09",
  dateModified: "2026-07-09",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt:
    "Illustration explaining the ABO blood group system and the Rh factor, shown as A, B, AB and O badges alongside a positive or negative Rh marker.",
  tags: ["blood group", "rhesus factor", "blood type", "transfusion", "biomarkers"],
  cluster: "biomarkers",
  primaryKeyword: "blood group test",
  readingMinutes: 8,
  body: [
    {
      type: "image",
      src: "/blog/blood-group-hero.svg",
      alt: "Blood group and Rh factor explained: the four ABO groups, A, B, AB and O, alongside the Rh positive or negative marker.",
    },
    {
      type: "p",
      text: "A blood group test actually gives you two results at once: your ABO type and your Rh factor. Together they make up the letter-and-symbol result you see on a donor card or lab report, something like O+ or AB-. Neither half tells the whole story on its own, and both matter for different reasons.",
    },
    {
      type: "p",
      text: "This matters more than most people assume. Blood type decides who can safely receive your blood in a transfusion, it changes how a pregnancy is monitored when a mother and baby have different Rh status, and it is one of the simplest tests you can have done before surgery, before donating blood, or as part of premarital screening.",
    },
    {
      type: "h2",
      id: "abo-system",
      text: "The ABO system: A, B, AB and O",
    },
    {
      type: "p",
      text: "Every person's blood falls into one of four ABO groups, A, B, AB or O, based on which sugar-based markers, called antigens, sit on the surface of their red blood cells.",
    },
    {
      type: "p",
      text: "People with type A blood carry the A antigen. People with type B carry the B antigen. Type AB carries both, and type O carries neither. Your immune system treats any antigen it does not recognise as foreign, which is the entire reason ABO typing matters for transfusion: give someone blood with an antigen their body does not have, and their immune system attacks it.",
    },
    {
      type: "list",
      items: [
        "Type A: carries the A antigen on red blood cells",
        "Type B: carries the B antigen on red blood cells",
        "Type AB: carries both A and B antigens",
        "Type O: carries neither antigen",
      ],
    },
    {
      type: "h2",
      id: "how-determined",
      text: "How your ABO group is determined",
    },
    {
      type: "p",
      text: "Your ABO blood group is set by genes inherited from both parents, fixed before birth, and it does not change during your lifetime under normal circumstances.",
    },
    {
      type: "p",
      text: "Each parent passes on one ABO gene variant, and the combination decides your type. Because the process is genetic rather than something diet, illness or lifestyle can shift, a blood group result from childhood still holds decades later. A lab confirms it directly by testing how your red cells react to known anti-A and anti-B reagents, a method called ABO typing, which is quick and does not require fasting or special preparation.",
    },
    {
      type: "h2",
      id: "rh-factor",
      text: "The Rh factor: positive or negative",
    },
    {
      type: "p",
      text: "The Rh factor is a separate marker, the D antigen, that is either present, making you Rh-positive, or absent, making you Rh-negative, and it is reported alongside your ABO group as the plus or minus sign in a result like O+ or B-.",
    },
    {
      type: "p",
      text: "Rh-positive is far more common worldwide, and most people who ask what is rhesus negative are surprised to learn it is not a medical problem in itself. Being Rh-negative causes no symptoms and needs no treatment on its own. It only becomes clinically relevant in two situations: transfusion matching and pregnancy, both covered below.",
    },
    {
      type: "h2",
      id: "why-it-matters-transfusion",
      text: "Why blood type matters for transfusion",
    },
    {
      type: "p",
      text: "Mixing incompatible blood types in a transfusion causes the immune system to attack the donor red cells, a reaction that can range from mild to life-threatening, which is why every unit of donated blood is matched to a recipient's ABO and Rh type before use.",
    },
    {
      type: "p",
      text: "This is called blood group compatibility, and it runs in one direction, not both. Type A blood can go to a person with type A or AB, because neither has antibodies against the A antigen. Type B can go to type B or AB. Type AB blood can only go to another AB recipient, because AB is the only group without antibodies against either A or B. Type O can go to anyone, for the reason explained below.",
    },
    {
      type: "p",
      text: "Rh status follows a simpler rule for transfusion: an Rh-negative person should generally receive Rh-negative blood, since exposure to the Rh(D) antigen can trigger antibody formation. An Rh-positive person can usually receive either Rh-positive or Rh-negative blood. In practice, hospital blood banks always cross-match a specific donor unit against a specific recipient's blood before transfusion, regardless of the stated ABO and Rh type on record, as a final safety check.",
    },
    {
      type: "h2",
      id: "universal-donor-recipient",
      text: "Universal donor and universal recipient",
    },
    {
      type: "p",
      text: "O-negative blood carries no A, B or Rh(D) markers for a recipient's immune system to react against, which is why it is called the universal donor type and is the blood most often kept on hand for emergencies where there is no time to type-match a patient.",
    },
    {
      type: "p",
      text: "AB-positive works the other way. Because AB-positive people already carry the A antigen, the B antigen and the Rh(D) antigen, their own immune system does not treat any ABO or Rh combination as foreign, so they can receive blood from a donor of any type. That makes AB-positive the universal recipient.",
    },
    {
      type: "image",
      src: "/blog/blood-group-compatibility.svg",
      alt: "Compatibility chart showing O-negative as the universal blood donor and AB-positive as the universal recipient, with a summary of which ABO groups can donate to which.",
      caption: "A simplified view of ABO and Rh transfusion compatibility. Hospitals still cross-match every unit before use.",
    },
    {
      type: "callout",
      title: "Universal does not mean unlimited",
      text: "O-negative is valuable precisely because it fits so many patients, which also means it is one of the more frequently requested types at blood banks. Being O-negative yourself is a good reason to donate regularly if you are eligible, not a guarantee that supply will always be available when you or a family member needs it.",
    },
    {
      type: "h2",
      id: "rh-and-pregnancy",
      text: "Rh factor and pregnancy",
    },
    {
      type: "p",
      text: "An Rh-negative mother carrying an Rh-positive baby can develop antibodies against the baby's blood type, a situation called Rh incompatibility, which is why Rh status is checked as part of the first antenatal blood test.",
    },
    {
      type: "p",
      text: "The baby's Rh-positive blood cells can cross into the mother's bloodstream, most often around delivery, a miscarriage, or certain procedures during pregnancy. If that happens, an Rh-negative mother's immune system may start producing antibodies against the Rh(D) antigen. This first exposure usually does not harm that pregnancy, but the antibodies remain afterward and can cross the placenta in a later pregnancy, where they may attack the red blood cells of a subsequent Rh-positive baby.",
    },
    {
      type: "callout",
      title: "Prophylaxis exists, but talk to your clinician about your own plan",
      text: "Anti-D prophylaxis, a treatment that stops an Rh-negative mother's immune system from forming antibodies in the first place, is a well-established part of antenatal care in many health systems. The right timing and whether it applies to you depends on your Rh status, your baby's status where known, and your individual pregnancy history. This is a conversation to have directly with your antenatal care provider, not something to plan from an article.",
    },
    {
      type: "h2",
      id: "blood-donation-africa",
      text: "Blood donation in an African health-system context",
    },
    {
      type: "p",
      text: "Many African blood banks, including those in Ghana, report chronic shortages against demand, and patients with sickle cell disease are among the most frequent recipients of transfusion because their condition can require repeated transfusions over a lifetime.",
    },
    {
      type: "p",
      text: "Sickle cell disease causes red blood cells to break down faster than the body can replace them, and transfusion is one of the standard treatments used to manage severe complications and support patients during crises. Because sickle cell disease is relatively common across West Africa, the demand for compatible, safe blood is a recurring pressure on local blood banks rather than an occasional emergency need.",
    },
    {
      type: "p",
      text: "Knowing your own blood type and Rh factor is useful well beyond a personal health record. It is one less thing to determine in an emergency, and it is a practical first step if you are considering becoming a regular blood donor.",
    },
    {
      type: "link-internal",
      to: "/blog/sickle-cell-trait-testing",
      label: "Sickle cell trait testing: why it matters before you start a family",
    },
    {
      type: "h2",
      id: "how-to-find-out",
      text: "How to find out your blood group",
    },
    {
      type: "p",
      text: "A blood group test is a simple blood draw that most labs can process the same day, and it is commonly done before surgery, during antenatal care, or as part of premarital and pre-donation screening.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "No fasting or special preparation is required before a blood group test.",
        "A small blood sample is drawn, usually from a vein in the arm, similar to any routine blood test.",
        "The lab tests how your red cells react with known anti-A, anti-B and anti-D reagents to determine your ABO group and Rh factor.",
        "If you have never had your blood typed, ask for it alongside routine bloodwork, before any planned surgery, during pregnancy, or when you next donate blood.",
        "Keep a record of your result. It does not change over your lifetime, so you only need to establish it once.",
      ],
    },
    {
      type: "link-internal",
      to: "/blog/full-blood-count-explained",
      label: "Full blood count explained: another routine test worth pairing with a blood group check",
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "See the blood group and Rh panel BetterHealth Africa offers",
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
          q: "What is the rarest blood type?",
          a: "AB-negative is generally the rarest of the eight main ABO/Rh combinations in most studied populations, since it requires both the less common AB group and a negative Rh factor together. Exact rarity varies by population and region, and there is no single global figure that applies everywhere. Rarity is not a health risk in itself; it can make it harder to source a matching unit in an emergency, which is part of why blood banks encourage regular donation across all types.",
        },
        {
          q: "Can your blood type change?",
          a: "No, not under normal circumstances. Your ABO group and Rh factor are set by genes inherited from your parents and stay fixed for life. The rare exceptions involve major medical interventions such as a bone marrow transplant, which can change the blood type your body produces going forward, but this is not something that happens through diet, illness, or ageing.",
        },
        {
          q: "Why does Rh factor matter in pregnancy?",
          a: "If an Rh-negative mother is carrying an Rh-positive baby, her immune system can form antibodies against the Rh(D) antigen after the baby's blood cells cross into her bloodstream, usually around delivery. Those antibodies do not typically harm the pregnancy where they formed, but they can cross the placenta and affect a later Rh-positive pregnancy. This is why Rh status is checked at the first antenatal visit, and why prophylaxis to prevent antibody formation is a standard part of antenatal care in many health systems. Talk to your antenatal care provider about what applies to your own pregnancy.",
        },
        {
          q: "How do I find out my blood group?",
          a: "A blood group test is a simple blood draw that most labs process the same day, with no fasting required. It is commonly done before surgery, during antenatal care, when you first donate blood, or as part of premarital screening. If you have never had it checked, you can request it alongside any routine blood test.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis, antenatal care, or treatment by a qualified healthcare professional. Transfusion decisions, cross-matching, and Rh-incompatibility management in pregnancy depend on your specific results and clinical history. Always discuss your blood type and any related care plan with your doctor or antenatal provider.",
    },
  ],
};
