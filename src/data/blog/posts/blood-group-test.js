// Patients-led biomarker explainer (cluster: "read your results").
// Primary keyword: blood group test (260/mo Ghana, LOW competition, DataForSEO
// 2026-07-10). Secondary: blood group test kit, rhesus factor (1000/mo), blood
// group compatibility, what is rhesus negative.
// Facts (ABO/Rh system, universal donor/recipient framing for red cells, Rh
// sensitisation and anti-D prophylaxis, lower Rh-negative prevalence in African
// populations) checked against standard transfusion-medicine references on
// 2026-07-10.
// Voice: plain, human, no em dashes (bh-humanizer applied). Clinical caution kept.
export default {
  slug: "blood-group-test",
  title: "Blood Group and Rhesus Factor: What Your Blood Type Means",
  description:
    "A blood group test measures your ABO type and Rh factor in one draw. Learn what the eight blood types mean for transfusion, why Rh-negative matters in pregnancy, and how blood type distribution differs in Africa.",
  excerpt:
    "O negative. AB positive. Your blood type is two results in one: ABO type and Rh factor. Each one carries its own weight for transfusion, pregnancy, and why Rh-negative blood is harder to find in Africa.",
  datePublished: "2026-07-10",
  dateModified: "2026-07-10",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt:
    "Illustration explaining blood group testing: ABO type, Rh factor, and the eight possible blood types.",
  tags: ["blood group", "rhesus factor", "transfusion", "pregnancy", "biomarkers"],
  cluster: "biomarkers",
  primaryKeyword: "blood group test",
  readingMinutes: 7,
  body: [
    {
      type: "image",
      src: "/blog/blood-group-hero.svg",
      alt: "Blood group testing explained: ABO type (A, B, AB, O) combined with Rh factor (positive or negative).",
    },
    {
      type: "p",
      text: "A blood group test measures two separate things in one draw: your ABO type (A, B, AB, or O) and your Rh factor (positive or negative). Together they decide what blood you can safely receive, what blood you can safely donate, and, if you are planning a pregnancy, whether extra monitoring will be needed.",
    },
    {
      type: "h2",
      id: "what-it-measures",
      text: "What a blood group test measures: ABO and Rh",
    },
    {
      type: "p",
      text: "Your red blood cells carry marker proteins on their surface, and the ABO system classifies which markers you have: A, B, both (AB), or neither (O). The Rh system separately checks for one specific marker, the D antigen, and reports it as positive (present) or negative (absent). A lab runs both checks from the same small blood sample, and your full blood type is the combination, such as O positive or AB negative.",
    },
    {
      type: "h2",
      id: "reading-your-result",
      text: "Reading your result: the eight possible blood types",
    },
    {
      type: "p",
      text: "Combining ABO type and Rh factor gives eight possible results, from O negative to AB positive, and each carries different rules for who you can safely receive blood from. O positive and A positive tend to be the most common types in most populations, while AB negative is usually the rarest.",
    },
    {
      type: "list",
      items: [
        "O negative, O positive",
        "A negative, A positive",
        "B negative, B positive",
        "AB negative, AB positive",
      ],
    },
    {
      type: "h2",
      id: "transfusion-and-donation",
      text: "Why blood type matters for transfusion and donation",
    },
    {
      type: "p",
      text: "O negative is called the universal red-cell donor type because it can be given to patients of any blood type in an emergency, while AB positive is the universal recipient for red cells, able to receive from any ABO/Rh combination. Outside emergencies, transfusions are matched to your exact type wherever possible, since even compatible but non-identical blood carries a small additional risk. This is why blood banks track donor type closely and why O-negative donors in particular are always in high demand.",
    },
    {
      type: "callout",
      title: "Compatibility for plasma runs the other way",
      text: "The universal donor and recipient rule above is specifically for red blood cells. Plasma compatibility is reversed, with AB the universal plasma donor and O the universal plasma recipient. Transfusion teams handle this distinction; you do not need to track it yourself, just know your own type.",
    },
    {
      type: "h2",
      id: "rh-and-pregnancy",
      text: "Rh factor and pregnancy: what Rh-negative means for expecting mothers",
    },
    {
      type: "p",
      text: "An Rh-negative mother carrying an Rh-positive baby needs monitoring and, when indicated, an anti-D injection during pregnancy to prevent Rh sensitisation, a preventable complication that once caused serious harm in later pregnancies. Sensitisation happens when an Rh-negative mother's immune system is exposed to Rh-positive blood from the baby, usually around delivery, and starts producing antibodies against it. Those antibodies are not usually a problem for that pregnancy, but they can cross the placenta and attack the red blood cells of an Rh-positive baby in a future pregnancy. The anti-D injection, given at set points in pregnancy and again after delivery if the baby is Rh-positive, prevents that antibody response from ever starting.",
    },
    {
      type: "link-internal",
      to: "/blog/premarital-screening",
      label: "Why blood group is part of the standard premarital screening panel",
    },
    {
      type: "h2",
      id: "blood-type-in-africa",
      text: "Blood type in Africa: a regional note on Rh-negative rarity",
    },
    {
      type: "p",
      text: "Rh-negative blood is notably rarer in African populations, generally under 5 percent, than in European-descended populations, where it runs closer to 15 percent. That difference matters practically: it makes matched blood for Rh-negative patients harder to source locally during an emergency transfusion, and it is one more reason knowing your own type ahead of time, rather than discovering it during a crisis, is worth doing.",
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
        "Keep a record of your blood type, whether on a card, in your phone, or with your regular clinic, so it is available quickly in an emergency.",
        "If you are Rh-negative and planning a pregnancy, mention it at your first antenatal visit so monitoring and anti-D timing can be planned in advance.",
        "If you are O negative, consider registering as a blood donor. Your type is in constant demand for emergency transfusions.",
        "Share your blood type with your partner as part of premarital or preconception planning, alongside genotype testing.",
        "Blood type does not need repeat testing; once confirmed, it does not change over your lifetime.",
      ],
    },
    {
      type: "link-internal",
      to: "/blog/genotype-test-aa-as-ss",
      label: "Genotype test explained: the other result that matters for family planning",
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "See the blood group and premarital screening panel BetterHealth Africa offers",
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
          q: "What is the difference between blood group and Rh factor?",
          a: "Blood group (ABO type) classifies your red blood cells as A, B, AB, or O based on surface markers. Rh factor is a separate marker, reported as positive or negative. Your full blood type combines both, such as O positive or AB negative.",
        },
        {
          q: "What is the universal blood donor type?",
          a: "O negative is the universal red-cell donor type, meaning it can be given to a patient of any blood type in an emergency. AB positive is the universal recipient for red cells, able to receive from any type.",
        },
        {
          q: "Why does Rh factor matter in pregnancy?",
          a: "If an Rh-negative mother carries an Rh-positive baby, her immune system can develop antibodies against Rh-positive blood, usually around delivery. Those antibodies are not usually a problem for that pregnancy but can affect a future Rh-positive pregnancy. An anti-D injection during pregnancy prevents this sensitisation from starting.",
        },
        {
          q: "Is Rh-negative blood rare in Africa?",
          a: "Yes, relative to other regions. Rh-negative blood type generally makes up under 5% of African populations, compared with around 15% in European-descended populations, which can make matched blood for Rh-negative patients harder to source locally.",
        },
        {
          q: "Does my blood type ever change?",
          a: "No. Your ABO and Rh blood type is genetically fixed and does not change over your lifetime, so once it is confirmed by a lab test, you do not need to retest it.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis or care from a qualified healthcare professional. Transfusion decisions and pregnancy monitoring for Rh incompatibility depend on your specific medical circumstances. Always discuss your results with a doctor or a qualified healthcare professional.",
    },
  ],
};
