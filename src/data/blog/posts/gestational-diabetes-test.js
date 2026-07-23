// Patients-led screening explainer (cluster: "screening"). South Africa market:
// medical aid / antenatal clinic context, general and hedged, not Ghana-specific.
// Primary keyword: gestational diabetes (2,400/mo South Africa, DataForSEO
// confirmed 2026-07-17, high volume). Secondary: gestational diabetes symptoms
// (480/mo), gestational diabetes diet (140/mo), gestational diabetes test
// (90/mo), gestational diabetes range (20/mo). Diagnostic thresholds follow
// the WHO 2013 / IADPSG consensus criteria. HbA1c-in-pregnancy caveat is the
// deliberate differentiator from hba1c-explained and fasting-blood-sugar-explained,
// not duplicate content. Voice: plain, human, no em dashes (bh-humanizer applied).
export default {
  slug: "gestational-diabetes-test",
  title: "Gestational Diabetes: Screening, Testing, and What a Result Means",
  description:
    "Gestational diabetes screening usually happens between 24 and 28 weeks of pregnancy using an oral glucose tolerance test. This guide covers what the WHO diagnostic numbers mean, why most women have no symptoms, and what a result means for you and your baby.",
  excerpt:
    "Most women who develop gestational diabetes feel nothing unusual, which is why screening at 24 to 28 weeks matters more than any symptom. What the test involves, what the numbers on your result mean, and what tends to happen after birth.",
  datePublished: "2026-07-17",
  dateModified: "2026-07-17",
  author: { name: "BetterHealth Africa Editorial Team", url: "/about" },
  image: "/og-image.png",
  imageAlt:
    "Illustration explaining gestational diabetes screening: the 75g oral glucose tolerance test, the WHO diagnostic thresholds, and what a result means during and after pregnancy.",
  tags: ["gestational diabetes", "pregnancy", "screening", "blood sugar", "antenatal care"],
  cluster: "screening",
  primaryKeyword: "gestational diabetes",
  readingMinutes: 8,
  body: [
    {
      type: "image",
      src: "/blog/gestational-diabetes-test-hero.svg",
      alt: "Gestational diabetes screening explained: the 75g oral glucose tolerance test, done between 24 and 28 weeks of pregnancy.",
    },
    {
      type: "p",
      text: "Gestational diabetes is diabetes that first appears during pregnancy, and it is common enough that most antenatal programmes screen every pregnant woman for it rather than only those who seem at risk. A diagnosis can feel unsettling when it arrives, but for most women it is a manageable, well-understood condition with a clear testing and care pathway. This guide covers what causes it, when South African antenatal care typically screens for it, what the WHO diagnostic numbers mean, and what tends to happen once the baby is born.",
    },
    {
      type: "h2",
      id: "what-it-is",
      text: "Gestational diabetes is diabetes first diagnosed during pregnancy, caused by placental hormones that make the body more resistant to insulin.",
    },
    {
      type: "p",
      text: "During pregnancy, the placenta produces hormones that help the baby grow, and several of these hormones also work against insulin, the hormone that normally moves sugar out of the blood and into cells for energy. As the placenta grows through the second and third trimester, this insulin resistance builds. For some women the pancreas cannot produce enough extra insulin to keep pace, and blood sugar starts running higher than it should. Doctors call that pattern gestational diabetes.",
    },
    {
      type: "p",
      text: "This differs from type 1 or type 2 diabetes, which exist independently of pregnancy. Gestational diabetes is tied specifically to the hormonal environment of pregnancy, so it usually develops in the second or third trimester rather than the first, once the placenta is producing hormones at scale. It also usually resolves after birth, once the placenta and the hormones it was producing are gone. That resolution is not guaranteed for every woman, and it is one reason a follow-up test after delivery matters, covered further down in this guide.",
    },
    {
      type: "h2",
      id: "risk-factors-early-screening",
      text: "Women with certain risk factors may be screened for diabetes as early as the first trimester, to rule out diabetes that predates the pregnancy.",
    },
    {
      type: "p",
      text: "Most pregnant women are screened for gestational diabetes for the first time between 24 and 28 weeks, but a smaller group is tested earlier, sometimes at the very first antenatal visit. The reason is not gestational diabetes itself, since that condition typically has not developed yet in the first trimester. The concern instead is type 2 diabetes that was already present before the pregnancy began and went undiagnosed.",
    },
    {
      type: "list",
      items: [
        "Obesity or a higher body mass index",
        "Older maternal age",
        "A family history of diabetes",
        "A previous pregnancy with gestational diabetes",
        "A previous baby born large for gestational age",
        "Certain ethnic backgrounds associated with higher diabetes risk",
      ],
    },
    {
      type: "p",
      text: "If early testing comes back normal, the standard screening at 24 to 28 weeks still goes ahead, because gestational diabetes can develop later in pregnancy even when an earlier result was clear. Whether early testing applies to you is a decision for your antenatal team, based on your individual history rather than a fixed rule.",
    },
    {
      type: "link-internal",
      to: "/blog/antenatal-blood-tests",
      label: "See where gestational diabetes screening fits in the full antenatal blood test panel",
    },
    {
      type: "h2",
      id: "when-how-screening",
      text: "Most guidelines recommend screening for gestational diabetes between 24 and 28 weeks of pregnancy using a 75g oral glucose tolerance test.",
    },
    {
      type: "p",
      text: "The World Health Organization, the American Diabetes Association, and most national antenatal protocols, including the antenatal care pathways commonly followed in South Africa, recommend screening in this window. It is late enough for placental insulin resistance to have built up to a measurable level, and early enough to leave time to manage the condition for the rest of the pregnancy if it is found.",
    },
    {
      type: "p",
      text: "The oral glucose tolerance test, usually built around a 75g glucose load, works in three steps. Blood is drawn after an overnight fast, you then drink a measured glucose solution within a few minutes, and blood is drawn again at one hour and again at two hours after the drink. The three readings together show not just where your blood sugar sits on an empty stomach, but how efficiently your body clears sugar once it is given a defined load, which is the part that specifically reveals gestational diabetes.",
    },
    {
      type: "callout",
      title: "Fasting matters for this test",
      text: "The oral glucose tolerance test depends on an accurate fasting sample, so eating or drinking anything other than water in the hours before your appointment can distort the result. Confirm the exact fasting instructions with your antenatal clinic or the lab doing the draw before the day of the test.",
    },
    {
      type: "h2",
      id: "diagnostic-numbers",
      text: "Gestational diabetes is diagnosed on the 75g OGTT if any one of three values, fasting, 1-hour, or 2-hour, meets or exceeds the WHO and IADPSG threshold.",
    },
    {
      type: "p",
      text: "The World Health Organization's 2013 criteria, developed with the International Association of Diabetes and Pregnancy Study Groups and now widely adopted, set three separate cut-offs. Only one of the three needs to be met for a diagnosis. The other two do not also need to be abnormal.",
    },
    {
      type: "list",
      items: [
        "Fasting plasma glucose: 5.1 to 6.9 mmol/L",
        "1-hour value: 10.0 mmol/L or higher",
        "2-hour value: 8.5 to 11.0 mmol/L",
      ],
    },
    {
      type: "image",
      src: "/blog/gestational-diabetes-test-data.svg",
      alt: "OGTT diagnostic thresholds for gestational diabetes: fasting 5.1 to 6.9 mmol/L, 1-hour 10.0 mmol/L or higher, 2-hour 8.5 to 11.0 mmol/L.",
      caption: "The three OGTT diagnostic thresholds, based on WHO 2013 / IADPSG criteria. Any one value alone is enough for a diagnosis.",
    },
    {
      type: "p",
      text: "These numbers are widely used but not universal. Some countries and some labs apply slightly different cut-offs, or use a two-step approach built around a different glucose load, so the exact figure printed on your lab report should be read against the reference range that lab provides rather than assumed to match the numbers above automatically. Your antenatal team is best placed to interpret your specific result.",
    },
    {
      type: "link-internal",
      to: "/blog/fasting-blood-sugar-explained",
      label: "See how a fasting glucose number is interpreted outside of pregnancy",
    },
    {
      type: "h2",
      id: "symptoms",
      text: "Gestational diabetes usually causes no noticeable symptoms, which is why screening rather than waiting for symptoms is how most cases are found.",
    },
    {
      type: "p",
      text: "Most women with gestational diabetes feel entirely normal. Blood sugar can run above the diagnostic threshold without producing any sensation a woman would notice on her own, which is why every pregnant woman is offered screening at 24 to 28 weeks rather than only those who report a problem.",
    },
    {
      type: "p",
      text: "When symptoms do appear, they can include increased thirst, needing to urinate more often than the usual pregnancy increase, and fatigue. All three overlap heavily with ordinary pregnancy symptoms, so noticing them is not a reliable way to rule gestational diabetes in or out on your own. A pregnancy that feels completely normal can still carry an abnormal OGTT result, and an uncomfortable one does not necessarily mean anything is wrong with blood sugar. The test, not how you feel, is what confirms or rules out the diagnosis.",
    },
    {
      type: "h2",
      id: "hba1c-not-used",
      text: "HbA1c is not typically used to diagnose gestational diabetes, because pregnancy changes red blood cell turnover in ways that can make the result unreliable.",
    },
    {
      type: "p",
      text: "HbA1c measures the percentage of haemoglobin coated with sugar, and it is a common way to track average blood sugar outside of pregnancy. In pregnancy, red blood cells turn over faster and blood volume expands, and both of these shift an HbA1c reading in ways unrelated to actual glucose control. That makes HbA1c a poor tool for catching gestational diabetes specifically, which is why the oral glucose tolerance test, not a single blood draw, remains the standard diagnostic route for this condition.",
    },
    {
      type: "h2",
      id: "diet-activity-treatment",
      text: "Diet and physical activity changes, guided by a dietitian or antenatal team, control blood sugar for most women diagnosed with gestational diabetes.",
    },
    {
      type: "p",
      text: "The first step after a gestational diabetes diagnosis is almost always dietary and activity-based rather than medication-based. A registered dietitian or your antenatal team will typically guide a lower-glycaemic-index eating pattern, regular and evenly spaced meals, and physical activity suited to pregnancy. Many women bring their blood sugar into target range this way alone, tracked through regular self-monitoring with a glucose meter over the following weeks.",
    },
    {
      type: "p",
      text: "If diet and activity changes are not enough to keep blood sugar in range, the antenatal care team may add medication, most often insulin, and in some settings metformin. That decision, along with the specific dose and monitoring schedule, is made individually with your antenatal team based on your readings and history. A general article like this one is not the place to set out a diet plan or a medication dose, because what works safely depends on your own numbers, your pregnancy, and your clinician's judgement.",
    },
    {
      type: "list",
      items: [
        "Regular self-monitoring of blood sugar, often several times a day, using a glucose meter at home",
        "More frequent antenatal visits, to track blood sugar trends and the baby's growth",
        "Extra growth scans in some cases, since poorly controlled blood sugar can affect the baby's size",
        "A discussion with your antenatal team about labour and delivery, since gestational diabetes can affect delivery timing in some cases",
      ],
    },
    {
      type: "h2",
      id: "after-birth",
      text: "Gestational diabetes typically resolves once the placenta is delivered, but a follow-up glucose test around 6 to 12 weeks postpartum is recommended.",
    },
    {
      type: "p",
      text: "Delivery removes the placenta and, with it, the hormones driving the insulin resistance, so blood sugar usually returns to normal fairly quickly after birth for most women who had gestational diabetes. That is not the end of the story, though. A follow-up oral glucose tolerance test, commonly done around 6 to 12 weeks after delivery, is recommended to confirm blood sugar has returned to normal and to rule out that the diabetes was pre-existing type 2 diabetes that pregnancy revealed.",
    },
    {
      type: "p",
      text: "Gestational diabetes is also worth tracking over the years that follow, not only at the postpartum test. It raises the likelihood of developing type 2 diabetes later in life for the mother, and research points to a smaller, still-debated increase in longer-term metabolic risk for the child. Neither outcome is a certainty. Both are reasons to keep blood sugar on the agenda at routine check-ups going forward, rather than to assume the story ends once the postpartum test comes back clear.",
    },
    {
      type: "link-internal",
      to: "/blog/prediabetes-warning-signs",
      label: "Read what the prediabetes range means and how it is tracked over time",
    },
    {
      type: "p",
      text: "If you are pregnant, ask your antenatal clinic when your gestational diabetes screening is scheduled and confirm the fasting instructions ahead of time. If you had gestational diabetes in a previous pregnancy or are planning one, mention that history early, since it changes how and when screening happens next time.",
    },
    {
      type: "link-internal",
      to: "/what-we-test",
      label: "See the pregnancy and blood sugar tests BetterHealth Africa offers",
    },
    {
      type: "faq",
      items: [
        {
          q: "Does gestational diabetes go away after birth?",
          a: "Yes, in most cases. Delivering the placenta removes the hormones driving the insulin resistance, so blood sugar typically returns to normal fairly soon after birth. A follow-up glucose test around 6 to 12 weeks postpartum is still recommended to confirm this and to check that the diabetes was not, in fact, pre-existing type 2 diabetes.",
        },
        {
          q: "What are the diagnostic numbers for gestational diabetes?",
          a: "Using the WHO 2013 / IADPSG criteria on a 75g oral glucose tolerance test, gestational diabetes is diagnosed if any one of the following is met or exceeded: fasting plasma glucose of 5.1 to 6.9 mmol/L, a 1-hour value of 10.0 mmol/L or higher, or a 2-hour value of 8.5 to 11.0 mmol/L. Exact cut-offs can vary slightly by country and lab, so read your result against the reference range on your own report.",
        },
        {
          q: "Can you have gestational diabetes with no symptoms?",
          a: "Yes, this is the norm rather than the exception. Most women with gestational diabetes notice nothing unusual, which is exactly why screening at 24 to 28 weeks is offered to every pregnant woman rather than only those with symptoms.",
        },
        {
          q: "What should I eat if I have gestational diabetes?",
          a: "There is no single meal plan that fits everyone. A registered dietitian or your antenatal team will typically guide a lower-glycaemic-index eating pattern with regular, evenly spaced meals, tailored to your own readings and needs. Ask your antenatal team for a plan specific to you rather than following a generic diet.",
        },
        {
          q: "Will gestational diabetes happen again in a future pregnancy?",
          a: "It can. Women who have had gestational diabetes once have a higher chance of it recurring in a later pregnancy, which is why a previous diagnosis is one of the risk factors that can trigger earlier screening, sometimes in the first trimester, next time around.",
        },
        {
          q: "Does gestational diabetes mean the baby will have diabetes?",
          a: "No, a gestational diabetes diagnosis does not mean the baby will have diabetes. Research suggests a smaller, still-debated increase in longer-term metabolic risk for the child, alongside a clearer increase in the mother's own future type 2 diabetes risk, but neither is a certainty, and good blood sugar control during pregnancy is the main lever available to reduce risk for both.",
        },
      ],
    },
    {
      type: "disclaimer",
      text: "This article is general health education, not medical advice. It is not a substitute for diagnosis, antenatal care, or treatment by a qualified healthcare professional. Gestational diabetes screening schedules, diagnostic thresholds, and treatment decisions depend on your specific results and pregnancy history. Always discuss your own antenatal test results and care plan with your antenatal care provider or doctor.",
    },
  ],
};
