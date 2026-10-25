// "Heart habits": Part 2 of the heart age tool.
//
// Pure data + description. No JSX and no browser globals.
//
// ============================== NOTHING HERE SCORES ==========================
//
// The WHO chart in heart-age.js reads five things (age, sex, smoking, systolic
// blood pressure, BMI) and this module never touches that reading. It logs
// the habits the chart has no line for, so the result screen can show them
// back and say plainly that they sit outside the chart.
//
// ============================ SOURCE OF THE WORDS ============================
//
// Each habit is read against published guidance, and every figure below
// comes from the evidence brief of 3 September 2026
// (scratchpad/ghana-food-evidence.md), with the study named. The rules it
// sets, followed here:
//   - Salt: WHO's limit is under 5 g of salt (2 g sodium) a day; Ghana's
//     guidelines say one teaspoon (about 5 g). Median Ghanaian adult intake
//     by 24-hour urine is 8.3 g a day, 78% above the limit (Menyanu 2020,
//     n=839). About nine in ten add salt in cooking and one in ten at the
//     table (Ghana STEPS 2023; WHO-SAGE). Seasoning cubes are roughly half
//     salt by weight in West African brand analyses (Archer 2022; no Ghanaian
//     lab value) and supplied about a quarter of household salt in one
//     Northern Region study (Davis 2024). Momoni is about 30% salt (Sanni
//     2002). Koobi and shito have no published sodium figure.
//   - Activity: 150 to 300 minutes of moderate activity a week, or 30
//     minutes on at least five days (Ghana FBDG 2023; WHO 2020).
//   - Alcohol: WHO's position is that no level is safe (WHO 2023); Ghana's
//     guidelines say limit it.
//   - Sleep: 7 to 9 hours is the American Heart Association's ideal range
//     (AHA Life's Essential 8, 2022). It is labelled AHA, never WHO, because
//     WHO publishes no sleep guideline.
//   - A weekly or daily count is never converted into grams of salt.

export const CUBES_MAX = 5;

export const HABIT_SOURCES = [
  {
    label:
      "Ministry of Food and Agriculture and University of Ghana School of Public Health. Food-Based Dietary Guidelines. Accra; January 2023 (one teaspoon of salt a day, limit salted seasoning, add salt at the end of cooking if at all, 150 to 300 minutes of moderate activity a week, limit alcohol).",
    url: "https://mofa.gov.gh/site/images/pdf/Ghana_Food_Based_Dietary_Guidelines_2023.pdf",
  },
  {
    label:
      "Menyanu et al. (2020). Salt intake by 24-hour urine in 839 Ghanaian adults, WHO-SAGE Wave 3: median 8.3 g a day; 77.7% above 5 g. BMC Nutr 2020;6:54, doi:10.1186/s40795-020-00379-y.",
  },
  {
    label:
      "Ministry of Health and WHO. Ghana STEPS Report 2023. September 2024 (90.5% add salt while cooking; 13.0% always or often add salt or salty sauces at the table; 5,438 adults).",
    url: "https://www.afro.who.int/sites/default/files/2024-11/GHANA%20STEPS%20REPORT%202023.pdf",
  },
  {
    label:
      "Menyanu et al. (2017). Salt behaviours in 6,746 Ghanaians, WHO-SAGE Wave 2: 96.3% add salt in cooking, 9.9% at the table. Nutrients 2017;9(9):939, doi:10.3390/nu9090939.",
  },
  {
    label:
      "Archer et al. (2022). Bouillon cubes in West Africa: 40 to 60% salt by weight in Senegal and Togo laboratory analyses; no Ghanaian laboratory value. Front Nutr 2022;9:746018, doi:10.3389/fnut.2022.746018.",
  },
  {
    label:
      "Davis et al. (2024). Discretionary salt and bouillon in Tolon and Kumbungu, Northern Region: bouillon supplied about 23% of household salt; 369 households. Curr Dev Nutr 2024;8(3):102088, doi:10.1016/j.cdnut.2024.102088.",
  },
  {
    label:
      "Sanni, Asiedu and Ayernor (2002). Momoni, the Ghanaian fermented fish condiment: 294 to 310 g salt per kg. J Food Compos Anal 2002;15(5):577-583, doi:10.1006/jfca.2002.1063.",
  },
  {
    label:
      "Cappuccio et al. (2006). Salt reduction in 12 Ashanti villages, 1,013 adults: salted fish and salted meat named as salt sources, with the advice to limit them or soak them overnight. BMC Public Health 2006;6:13, doi:10.1186/1471-2458-6-13.",
  },
  {
    label:
      "Safianu and Plange-Rhule (2020). Sodium intake in 67 normotensive adults in Kumasi: about 9 g salt a day, all of it added in cooking. Int J Hypertens 2020;2020:7053654, doi:10.1155/2020/7053654.",
  },
  {
    label: "WHO. Guideline: sodium intake for adults and children. Geneva; 2012 (under 2 g sodium, 5 g salt, a day).",
  },
  {
    label:
      "WHO. Guidelines on physical activity and sedentary behaviour. Geneva; 2020 (150 to 300 minutes of moderate activity a week, or 75 to 150 vigorous; muscle-strengthening on two or more days).",
  },
  {
    label:
      "WHO Regional Office for Europe. No level of alcohol consumption is safe for our health. 4 January 2023 (summarising the WHO statement in The Lancet Public Health).",
    url: "https://www.who.int/europe/news/item/04-01-2023-no-level-of-alcohol-consumption-is-safe-for-our-health",
  },
  {
    label:
      "Lloyd-Jones et al. (2022). Life's Essential 8, American Heart Association Presidential Advisory, Circulation, 29 June 2022 (7 to 9 hours of sleep a night as the ideal level; an AHA metric, not a WHO recommendation).",
  },
];

const SALT_CONTEXT =
  "WHO's limit is under 5 g of salt a day and Ghana's guidelines say one teaspoon. Ghanaian adults measured by 24-hour urine had a median of 8.3 g a day, 78% above the limit.";

/** "5+" at the cap, the plain number below it. */
export function cubesLabel(n) {
  const v = Number(n) || 0;
  return v >= CUBES_MAX ? "5+" : String(v);
}

// How often something comes with a meal, in days rather than meals.
export const DAYS_SCALE = [
  { value: "never", label: "Never", short: "Never" },
  { value: "some", label: "Some days", short: "Some" },
  { value: "most", label: "Most days", short: "Most" },
  { value: "daily", label: "Every day", short: "Daily" },
];

export const TABLE_SALT = [
  { value: "never", label: "Never" },
  { value: "sometimes", label: "Sometimes" },
  { value: "most", label: "At most meals" },
];

// Bands chosen so the published activity guidance, whatever figure the brief
// supplies, can be read against them without re-asking.
export const ACTIVITY_MINUTES = [
  { value: "under30", label: "Under 30 minutes", minutes: 15 },
  { value: "30to74", label: "30 to 74 minutes", minutes: 50 },
  { value: "75to149", label: "75 to 149 minutes", minutes: 110 },
  { value: "150to299", label: "150 to 299 minutes", minutes: 220 },
  { value: "300plus", label: "300 minutes or more", minutes: 300 },
];

export const ALCOHOL = [
  { value: "none", label: "None" },
  { value: "1to2", label: "1 to 2" },
  { value: "3to7", label: "3 to 7" },
  { value: "8to14", label: "8 to 14" },
  { value: "15plus", label: "15 or more" },
];

export const SLEEP = [
  { value: "under6", label: "Under 6" },
  { value: "6to7", label: "6 to 7" },
  { value: "7to9", label: "7 to 9" },
  { value: "over9", label: "Over 9" },
];

export const FAMILY_CVD = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "I am not sure" },
];

const SALT_ROWS = [
  { id: "shito", label: "Shito" },
  { id: "saltedFish", label: "Salted or smoked fish", hint: "Koobi, momoni, smoked tilapia or herring" },
];

// ------------------------------ micro-feedback -------------------------------

export function cubesFeedback(n) {
  const v = Math.min(Math.max(Number(n) || 0, 0), CUBES_MAX);
  if (v === 0) return "No seasoning cubes logged. Shito and salted fish next.";
  const atLeast = v >= CUBES_MAX ? "at least " : "";
  const week = v * 7;
  const line = `${atLeast}${v} cube${v === 1 ? "" : "s"} a day is about ${week} a week. Shito and salted fish next.`;
  return `${line[0].toUpperCase()}${line.slice(1)}`;
}

export function saltFoodsFeedback(value = {}) {
  const shito = DAYS_SCALE.find((d) => d.value === value.shito);
  const fish = DAYS_SCALE.find((d) => d.value === value.saltedFish);
  if (!shito || !fish) return "";
  return `Shito ${shito.label.toLowerCase()}, salted or smoked fish ${fish.label.toLowerCase()}. Salt at the table next.`;
}

export function minutesFeedback(value) {
  const opt = ACTIVITY_MINUTES.find((o) => o.value === value);
  if (!opt) return "";
  return `${opt.label} of activity a week logged. Drinks next.`;
}

export function sleepFeedback(value) {
  const opt = SLEEP.find((o) => o.value === value);
  if (!opt) return "";
  return `${opt.label} hours on a typical night. One more question.`;
}

// ------------------------------------ steps ----------------------------------

export const HABIT_STEPS = [
  {
    id: "cubes",
    kind: "counter",
    text: "How many seasoning cubes go into a day's cooking?",
    help: "Maggi, Onga, Royco and the rest. Count the pot you eat from, whether or not you cooked it. Round halves up.",
    unit: "cubes a day",
    max: CUBES_MAX,
    feedback: (v) => cubesFeedback(v),
  },
  {
    id: "saltFoods",
    kind: "scales",
    text: "How often do these come with a meal?",
    rows: SALT_ROWS,
    options: DAYS_SCALE,
    feedback: (v) => saltFoodsFeedback(v),
  },
  {
    id: "tableSalt",
    kind: "choice",
    text: "Do you add salt at the table?",
    help: "Salt shaken on after the food is served, not salt in the cooking.",
    options: TABLE_SALT,
    feedback: () => "Noted. Physical activity next.",
  },
  {
    id: "minutes",
    kind: "choice",
    text: "In a typical week, how many minutes of activity leave you slightly out of breath?",
    help: "Brisk walking, cycling, football, farm work, carrying loads at the market. Add it all up across the week.",
    options: ACTIVITY_MINUTES,
    feedback: (v) => minutesFeedback(v),
  },
  {
    id: "alcohol",
    kind: "choice",
    text: "Drinks in a typical week?",
    help: "Count a bottle of beer, a glass of wine or a tot of spirits as one each.",
    options: ALCOHOL,
    feedback: () => "Noted. Sleep next.",
  },
  {
    id: "sleep",
    kind: "choice",
    layout: "grid",
    text: "Hours of sleep on a typical night?",
    options: SLEEP,
    feedback: (v) => sleepFeedback(v),
  },
  {
    id: "familyCvd",
    kind: "choice",
    text: "Has a parent, brother or sister had a heart attack or stroke before the age of 60?",
    help: "Blood relatives only. If you are not sure, say so; it is a common answer.",
    options: FAMILY_CVD,
  },
];

// ----------------------------------- summary ---------------------------------

const label = (list, value) => list.find((o) => o.value === value)?.label || null;

/**
 * The published guidance one habit is read against, with its source and,
 * where the guidance is a range the answer can sit inside or outside, a
 * status. Salt sources carry no status on purpose: a count of cubes or of
 * days is never turned into grams, so there is no figure to compare.
 */
export function thresholdFor(id, values = {}) {
  switch (id) {
    case "cubes": {
      const n = Math.min(Math.max(Number(values.cubes) || 0, 0), CUBES_MAX);
      if (n === 0) {
        return {
          text: `None logged. Salt in cooking is where most Ghanaian salt goes: about nine in ten adults add it while cooking. ${SALT_CONTEXT}`,
          cite: "Ghana STEPS 2023; Menyanu 2020 (839 adults); WHO 2012; Ghana FBDG 2023",
          status: null,
        };
      }
      return {
        text: `Seasoning cubes are roughly half salt by weight in West African brand analyses; no Ghanaian laboratory has measured them. In one Northern Region study they supplied about a quarter of household salt. ${SALT_CONTEXT} We do not turn your ${cubesLabel(n)} a day into grams.`,
        cite: "Archer 2022 (Senegal and Togo analyses); Davis 2024 (Northern Region, 369 households); Menyanu 2020 (839 adults); WHO 2012; Ghana FBDG 2023",
        status: null,
      };
    }
    case "shito":
      return {
        text: "No published sodium figure exists for shito. It is a recognised salt source, and Ghana's guidelines say to limit salted seasoning.",
        cite: "Ghana FBDG 2023",
        status: null,
      };
    case "saltedFish":
      return {
        text: "Momoni is about 30% salt by weight in a Ghanaian analysis. Koobi and kako have no published figure, but two Ghanaian studies name salted fish and salted meat as salt sources and advised soaking them overnight before cooking. Ghana's guidelines name salted tilapia as a highly salted food.",
        cite: "Sanni 2002; Cappuccio 2006 (1,013 adults, Ashanti); Safianu 2020 (67 adults, Kumasi); Ghana FBDG 2023",
        status: null,
      };
    case "tableSalt":
      return {
        text: "Only about one in ten Ghanaian adults add salt at the table, 13% in the 2023 STEPS survey; nine in ten add it in cooking, which is where most of it goes. Ghana's guidelines say to add salt at the end of cooking, if at all.",
        cite: "Ghana STEPS 2023 (5,438 adults); Menyanu 2017; Ghana FBDG 2023",
        status: null,
      };
    case "minutes": {
      const v = values.minutes;
      const status = v === "150to299" || v === "300plus" ? "within" : v ? "outside" : null;
      return {
        text: "Ghana's guidelines and WHO both ask for 150 to 300 minutes of moderate activity a week, or 30 minutes on at least five days, plus muscle-strengthening on two or more days.",
        cite: "Ghana FBDG 2023; WHO 2020",
        status,
      };
    }
    case "alcohol":
      return {
        text:
          values.alcohol === "none"
            ? "None logged. WHO's position is that no level of alcohol is safe for health, so there is nothing to move here."
            : "WHO's position is that no level of alcohol is safe for health, and that any heart benefit from light drinking does not outweigh the cancer risk. Ghana's guidelines say to limit it.",
        cite: "WHO 2023; Ghana FBDG 2023",
        status: null,
      };
    case "sleep": {
      const v = values.sleep;
      const status = v === "7to9" ? "within" : v ? "outside" : null;
      return {
        text: "The American Heart Association counts 7 to 9 hours a night as the ideal for heart health. That is an AHA scoring metric; WHO publishes no sleep guideline.",
        cite: "AHA Life's Essential 8, 2022",
        status,
      };
    }
    case "familyCvd":
      return {
        text: "The chart has no line for family history, so this did not move the reading. It is worth telling a clinician at your next check, alongside your blood pressure and a lipid profile.",
        cite: null,
        status: null,
      };
    default:
      return { text: null, cite: null, status: null };
  }
}

/**
 * Restate the habits for the result screen, each with the published
 * guidance it is read against.
 *
 * @param {{ cubes?, saltFoods?, tableSalt?, minutes?, alcohol?, sleep?, familyCvd? }} values
 * @returns {{ rows: Array<{ id, label, value, threshold, cite, status }>, familyCvd }}
 */
export function summariseHabits(values = {}) {
  const cubes = values.cubes === undefined || values.cubes === null ? null : Math.min(Math.max(Number(values.cubes) || 0, 0), CUBES_MAX);
  const salt = values.saltFoods || {};
  const rows = [
    { id: "cubes", label: "Seasoning cubes", value: cubes === null ? null : `${cubesLabel(cubes)} a day` },
    { id: "shito", label: "Shito", value: label(DAYS_SCALE, salt.shito) },
    { id: "saltedFish", label: "Salted or smoked fish", value: label(DAYS_SCALE, salt.saltedFish) },
    { id: "tableSalt", label: "Salt at the table", value: label(TABLE_SALT, values.tableSalt) },
    { id: "minutes", label: "Activity a week", value: label(ACTIVITY_MINUTES, values.minutes) },
    { id: "alcohol", label: "Drinks a week", value: label(ALCOHOL, values.alcohol) },
    { id: "sleep", label: "Sleep a night", value: values.sleep ? `${label(SLEEP, values.sleep)} hours` : null },
    {
      id: "familyCvd",
      label: "Heart attack or stroke before 60 in a parent or sibling",
      value: label(FAMILY_CVD, values.familyCvd),
    },
  ]
    .filter((r) => r.value !== null)
    .map((r) => {
      const t = thresholdFor(r.id, values);
      return { ...r, threshold: t.text, cite: t.cite, status: t.status };
    });
  return { rows, familyCvd: values.familyCvd || null };
}

// ------------------------------------ packing --------------------------------
//
// One answer key:  cb:2|sh:most|sf:some|ts:never|mn:150to299|al:1to2|sl:7to9|fh:no

export function packHabits(values = {}) {
  const salt = values.saltFoods || {};
  const cubes = values.cubes === undefined || values.cubes === null ? "" : Math.min(Math.max(Number(values.cubes) || 0, 0), CUBES_MAX);
  return {
    habits: [
      `cb:${cubes}`,
      `sh:${salt.shito || ""}`,
      `sf:${salt.saltedFish || ""}`,
      `ts:${values.tableSalt || ""}`,
      `mn:${values.minutes || ""}`,
      `al:${values.alcohol || ""}`,
      `sl:${values.sleep || ""}`,
      `fh:${values.familyCvd || ""}`,
    ].join("|"),
  };
}

export function parseHabits(str) {
  const f = {};
  for (const part of String(str || "").split("|")) {
    const i = part.indexOf(":");
    if (i > 0) f[part.slice(0, i)] = part.slice(i + 1);
  }
  return {
    cubes: f.cb === "" || f.cb === undefined ? null : Number(f.cb),
    saltFoods: { shito: f.sh || undefined, saltedFish: f.sf || undefined },
    tableSalt: f.ts || undefined,
    minutes: f.mn || undefined,
    alcohol: f.al || undefined,
    sleep: f.sl || undefined,
    familyCvd: f.fh || undefined,
  };
}
