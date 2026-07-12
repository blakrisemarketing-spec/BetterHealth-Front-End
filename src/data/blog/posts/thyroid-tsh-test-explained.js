// Patients-led biomarker explainer (cluster: "understand your biomarkers").
// Primary keyword: thyroid test (260/mo Ghana, LOW competition, DataForSEO 2026-07-03).
// Retargeted from the seed "TSH test meaning" (10/mo) to the stronger, still-LOW
// terms "thyroid test" and "TSH" (210/mo), which cover the same search intent.
// Ranges cite typical adult TSH/free T4 reference intervals (American Thyroid
// Association guidance); exact cutoffs vary by lab and by pregnancy trimester.
// Ghana/West Africa context: universal salt iodisation and residual iodine-deficiency
// disorders.
// Voice: plain, human, no em dashes (bh-humanizer applied). Clinical caution maintained.
export default {
  slug: "thyroid-tsh-test-explained",
  title: "Thyroid Function and TSH: What Your Result Is Telling You",
  description:
    "TSH is usually the first thyroid test you get, and a high result means an underactive thyroid, not an overactive one. Learn the normal range, hypothyroid and hyperthyroid symptoms, and the West African iodine context.",
  excerpt:
    "A high TSH sounds like it should mean an overactive thyroid. It is the opposite. What TSH measures, the normal range, and how to read hypothyroid and hyperthyroid symptoms apart.",
  datePublished: "2026-07-03",
  dateModified: "2026-07-03",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt:
    "Illustration explaining the TSH thyroid test and what a high or low result means.",
  tags: ["thyroid", "TSH", "biomarkers", "blood test", "hypothyroidism"],
  cluster: "biomarkers",
  primaryKeyword: "thyroid test",
  readingMinutes: 7,
  body: [
    {
      type: "image",
      src: "/blog/thyroid-tsh-hero.svg",
      alt: "Thyroid function and TSH explained: what a high or low result means.",
    },
    {
      type: "p",
      text: "TSH is usually the first test a doctor orders when checking your thyroid, and it trips up almost everyone the first time they read it. A high TSH does not mean your thyroid is overactive. It means the opposite: your thyroid is underactive, and your pituitary gland is shouting louder to try to wake it up.",
    },
    {
      type: "p",
      text: "Once that direction clicks, the rest of a thyroid panel is easy to follow. Here is what TSH measures, what counts as normal, and how to tell an underactive thyroid apart from an overactive one.",
    },
    {
      type: "h2",
      id: "what-tsh-measures",
      text: "What TSH measures, and why a high result means an underactive thyroid",
    },
    {
      type: "p",
      text: "TSH is the pituitary's signal to the thyroid, so a raised TSH usually means the thyroid is underactive, not overactive.",
    },
    {
      type: "p",
      text: "TSH stands for thyroid-stimulating hormone, and despite its name it is not made by the thyroid at all. It comes from the pituitary gland, a small structure at the base of the brain that monitors how much thyroid hormone is circulating and adjusts its output to compensate. When thyroid hormone runs low, the pituitary raises TSH to push the thyroid harder. When thyroid hormone runs high, the pituitary drops TSH to ease off.",
    },
    {
      type: "p",
      text: "That feedback loop is why the numbers read backwards from what most people expect. A high TSH points to a tired thyroid that needs more prodding, which is hypothyroidism. A low TSH points to an overactive thyroid the pituitary is trying to rein in, which is hyperthyroidism.",
    },
    {
      type: "h2",
      id: "normal-range",
      text: "TSH normal range, and how it is read alongside free T4",
    },
    {
      type: "p",
      text: "A typical adult TSH reference range runs about 0.4 to 4.0 mIU/L, though pregnancy and lab-specific ranges shift the cutoffs.",
    },
    {
      type: "list",
      items: [
        "Normal: TSH roughly 0.4 to 4.0 mIU/L, with free T4 also in the lab's normal range",
        "Subclinical hypothyroidism: TSH mildly raised above the upper cutoff, but free T4 still normal",
        "Overt hypothyroidism: TSH raised and free T4 below the normal range",
        "Subclinical hyperthyroidism: TSH below the lower cutoff, but free T4 still normal",
        "Overt hyperthyroidism: TSH suppressed and free T4 above the normal range",
      ],
    },
    {
      type: "image",
      src: "/blog/thyroid-tsh-ranges.svg",
      alt: "TSH and free T4 combinations: how the two tests together separate normal thyroid function from subclinical and overt hypothyroidism or hyperthyroidism.",
      caption:
        "TSH moves opposite to thyroid hormone level. Reference ranges vary by lab and by pregnancy trimester; check the interval on your own report.",
    },
    {
      type: "callout",
      title: "TSH alone is a screen, not the full picture",
      text: "TSH is usually the first test ordered because it is the most sensitive early signal, but a clinician reads it alongside free T4, and sometimes free T3, before making a diagnosis. A single mildly abnormal TSH is often repeated before any treatment decision.",
    },
    {
      type: "h2",
      id: "hypothyroidism",
      text: "Hypothyroidism: symptoms and the most common cause",
    },
    {
      type: "p",
      text: "Hashimoto's thyroiditis, an autoimmune condition where the immune system gradually attacks the thyroid, is the most common cause of hypothyroidism worldwide.",
    },
    {
      type: "p",
      text: "An underactive thyroid slows down processes throughout the body, and the symptoms build gradually enough that many people attribute them to stress, ageing, or a busy schedule.",
    },
    {
      type: "list",
      items: [
        "Persistent fatigue and low energy that rest does not fix",
        "Weight gain despite no real change in diet or activity",
        "Feeling unusually cold, especially in the hands and feet",
        "Constipation and dry skin",
        "Slower thinking, low mood, or a hoarser voice",
        "Heavier or irregular menstrual periods",
      ],
    },
    {
      type: "h2",
      id: "hyperthyroidism",
      text: "Hyperthyroidism: symptoms and the most common cause",
    },
    {
      type: "p",
      text: "Graves' disease, also an autoimmune condition, is the most common cause of hyperthyroidism.",
    },
    {
      type: "p",
      text: "An overactive thyroid speeds the body up, and the symptoms tend to appear faster and feel more alarming than hypothyroidism's slow drift.",
    },
    {
      type: "list",
      items: [
        "Unintentional weight loss despite a normal or increased appetite",
        "A racing or irregular heartbeat, and a feeling of anxiety or jitteriness",
        "Heat intolerance and excessive sweating",
        "Hand tremor",
        "Difficulty sleeping",
        "Bulging eyes or a visibly enlarged thyroid (goitre), in some people with Graves' disease",
      ],
    },
    {
      type: "h2",
      id: "why-women",
      text: "Why thyroid problems are more common in women",
    },
    {
      type: "p",
      text: "Thyroid disorders are diagnosed roughly five to eight times more often in women than men.",
    },
    {
      type: "p",
      text: "The exact reason is not fully settled, but the leading explanation involves the immune system. Most thyroid disease is autoimmune in origin, and autoimmune conditions in general are more common in women, likely tied to differences in immune regulation influenced by the X chromosome and by hormonal shifts across puberty, pregnancy, and menopause. Whatever the underlying mechanism, the practical takeaway is that women, particularly after childbirth or around menopause, are the group most often flagged for thyroid testing.",
    },
    {
      type: "link-internal",
      to: "/blog/hba1c-explained",
      label: "What is HbA1c? Another biomarker that needs a reference range to make sense",
    },
    {
      type: "h2",
      id: "iodine-pregnancy-context",
      text: "Iodine, pregnancy, and the West African context",
    },
    {
      type: "p",
      text: "Iodine deficiency was historically a major driver of goitre in Ghana and the region, and universal salt iodisation has cut but not eliminated it.",
    },
    {
      type: "p",
      text: "The thyroid needs iodine to make its hormones, and before Ghana's universal salt iodisation programme, iodine deficiency was a leading cause of goitre and hypothyroidism in parts of the country. Iodised salt has sharply reduced severe deficiency, but pockets of mild-to-moderate deficiency still turn up in surveys, particularly in populations that rely on non-iodised salt or locally produced salt outside the regulated supply.",
    },
    {
      type: "p",
      text: "Thyroid testing also matters more than usual during pregnancy. Untreated hypothyroidism in pregnancy is linked to a higher risk of miscarriage and to developmental effects on the baby, since the fetus depends entirely on the mother's thyroid hormone in the first trimester. Reference ranges for TSH shift lower in pregnancy, which is why pregnant women are usually screened against trimester-specific ranges rather than the standard adult range.",
    },
    {
      type: "callout",
      title: "Untreated thyroid disease in pregnancy is not something to guess at",
      text: "If you are pregnant or planning to be and have any thyroid symptoms, or a personal or family history of thyroid disease, ask your antenatal clinic about TSH screening rather than waiting for symptoms to become obvious.",
    },
    {
      type: "h2",
      id: "what-to-do",
      text: "What to do with your thyroid result",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Read your TSH against your lab's own reference range, not a number you saw online, since ranges vary by lab and by pregnancy trimester.",
        "If TSH is abnormal, ask whether free T4 (and sometimes free T3) was tested alongside it, since TSH alone rarely confirms a diagnosis.",
        "A single mildly abnormal TSH is often repeated in 6 to 12 weeks before starting treatment, unless symptoms are significant.",
        "If you are pregnant or planning pregnancy and have thyroid symptoms or a family history of thyroid disease, ask about screening.",
        "Keep a record of your results over time. Thyroid hormone replacement, when needed, is usually adjusted based on trend, not a single reading.",
        "See a doctor for any of the symptoms above, especially a racing heartbeat, unexplained weight change, or a visibly enlarged thyroid.",
      ],
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "See the thyroid panel BetterHealth Africa tests",
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
          q: "Does a high TSH mean hypothyroidism or hyperthyroidism?",
          a: "A high TSH points to hypothyroidism, an underactive thyroid. The pituitary raises TSH to push a sluggish thyroid to work harder, so the direction is opposite to what the name suggests. A low TSH points the other way, toward hyperthyroidism.",
        },
        {
          q: "Do I need to fast before a TSH test?",
          a: "No. TSH does not require fasting. Some labs prefer morning samples because TSH has a mild daily rhythm, but this is a convenience for comparing results over time rather than a strict requirement.",
        },
        {
          q: "What does a slightly high TSH with normal T4 mean?",
          a: "This pattern is called subclinical hypothyroidism, a mild, early-stage thyroid underactivity where the pituitary has started compensating but thyroid hormone levels are still within range. It does not automatically need treatment. A clinician weighs your symptoms, your TSH level, and other risk factors before deciding whether to treat now or recheck later.",
        },
        {
          q: "Can thyroid problems be cured?",
          a: "It depends on the cause. Hypothyroidism from Hashimoto's thyroiditis is usually lifelong but well managed with daily thyroid hormone replacement. Some causes of hyperthyroidism, including some cases of Graves' disease, can go into long-term remission with treatment, while others need ongoing medication or a procedure. A doctor determines the cause before discussing outlook.",
        },
        {
          q: "Is thyroid testing only for people with symptoms?",
          a: "Not always. Because early thyroid disease can be silent, doctors often test people with a family history of thyroid disease, women who are pregnant or planning pregnancy, and people with other autoimmune conditions, even without obvious symptoms.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis or treatment by a qualified healthcare professional. Thyroid reference ranges vary by lab, age, and pregnancy status. Always discuss your own results with your doctor.",
    },
  ],
};
