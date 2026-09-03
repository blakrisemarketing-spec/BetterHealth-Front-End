// "Your week on a plate": the shared Part 2 of the diabetes tool (in full) and
// of the BMI and waist tool (a short form).
//
// Pure data + arithmetic. No JSX and no browser globals: src/data/seo.js
// imports the tool registry on the Node side at build time, and
// scripts/test-tools.mjs imports this file directly.
//
// ============================== NOTHING HERE SCORES ==========================
//
// FINDRISC (diabetes-risk.js) and the NICE / WHO bands (bmi-waist.js) are
// computed from Part 1 alone and this module never touches them. It only
// describes what someone logged, in their own foods, and packs that
// description into the lead record. The result screen labels it as guidance
// drawn from dietary and activity recommendations and says, in one sentence,
// that it is not part of the score.
//
// ============================ SOURCE OF THE WORDS ============================
//
// Every food-specific line below comes from the evidence brief of 3 September
// 2026 (scratchpad/ghana-food-evidence.md) and cites the study it rests on.
// The rules that brief sets, and this file follows:
//   - Ghana's own Food-Based Dietary Guidelines (Ministry of Food and
//     Agriculture and University of Ghana, January 2023) are the primary
//     reference, ahead of WHO. Their food guide is a mashing bowl (asanka)
//     rather than a plate, with staples about 46% by weight (FAO's
//     description of the graphic). Serving sizes are given in local utensils
//     and are quoted as printed.
//   - Ghanaian glycaemic index values come from studies of ten adults each and
//     are always introduced as such. They are described ("raised blood sugar
//     less than"), never turned into a personal figure.
//   - Foods with NO published value say so: Fante kenkey, waakye, Ghanaian
//     jollof, kelewele, red red, Hausa koko, tom brown, local versus imported
//     rice, Ghanaian bread. The "Hausa koko 59" and "tom brown 42" figures
//     online have no traceable source and are not used.
//   - Kokonte has a published value (7) that is implausible against every
//     other cassava product; the study is cited, the number is not.
//   - Brown bread sits within one GI point of white in the international
//     tables, so the case for it is fibre and fullness, not GI.
//   - Weekly counts are never converted into grams of sugar or salt.
//   - Nothing here is called validated, and nothing diagnoses.
//
// Every counter runs 0 to 7, where 7 is shown as "7+" and means "every day or
// more". Totals treat a 7+ as seven and say "at least" when any tile is capped.

export const MAX_TIMES = 7;

/**
 * The share of Ghana's guideline bowl that is staples, by weight, as FAO
 * describes the graphic: cereals, roots and tubers 45.6%, vegetables 15.4%,
 * fruits 15.3%, legumes, pulses and nuts 13.4%, animal-source foods 9.8%,
 * oils 0.4%. Only the plate graphic uses this number.
 */
export const GUIDELINE_STAPLE_FRACTION = 0.456;

/** "7+" at the cap, the plain number below it. */
export function timesLabel(n) {
  const v = Number(n) || 0;
  return v >= MAX_TIMES ? "7+" : String(v);
}

// The working food list. Two-letter codes are what the packed answer carries,
// so the whole week fits inside the backend's 200-character value limit.
// `serving` is the guideline serving in the utensil Ghana's FBDG prints it
// in (pages 43 to 44 and the staples recommendation); foods the guideline
// gives no serving for carry none.
export const FOODS = [
  { code: "kk", id: "kenkey", label: "Kenkey", group: "maize", serving: "one 125 g sardine tin (Ga kenkey)" },
  { code: "bk", id: "banku", label: "Banku", group: "maize", serving: "about three and a half large eggs' worth" },
  { code: "ff", id: "fufu", label: "Fufu", group: "maize", serving: "one medium orange" },
  { code: "gr", id: "gari", label: "Gari or eba", group: "maize" },
  { code: "kn", id: "kokonte", label: "Kokonte", group: "maize" },
  { code: "tz", id: "tuoZaafi", label: "Tuo zaafi", group: "maize" },
  { code: "wk", id: "waakye", label: "Waakye", group: "rice" },
  { code: "jr", id: "jollof", label: "Jollof rice", group: "rice" },
  { code: "pr", id: "plainRice", label: "Plain rice", group: "rice", serving: "four heaped tablespoons" },
  { code: "rr", id: "redRed", label: "Red red", group: "rice" },
  { code: "by", id: "boiledYam", label: "Boiled yam", group: "yam", serving: "one sardine can" },
  { code: "fy", id: "friedYam", label: "Fried yam", group: "yam" },
  { code: "bp", id: "boiledPlantain", label: "Boiled plantain", group: "yam", serving: "one and a half fingers of apem" },
  { code: "fp", id: "friedPlantain", label: "Fried plantain or kelewele", group: "yam", serving: "about 90 g" },
  { code: "hk", id: "hausaKoko", label: "Hausa koko", group: "breakfast" },
  { code: "tb", id: "tomBrown", label: "Tom brown", group: "breakfast" },
  { code: "br", id: "bread", label: "Bread", group: "breakfast", serving: "one 77 g roll" },
];

export const FOOD_GROUPS = [
  { id: "maize", label: "Maize, cassava and millet" },
  { id: "rice", label: "Rice and beans" },
  { id: "yam", label: "Yam and plantain" },
  { id: "breakfast", label: "Breakfast and bread" },
];

const FOOD_BY_CODE = Object.fromEntries(FOODS.map((f) => [f.code, f]));

// How much of a typical plate the starch takes up. `fraction` only drives the
// plate graphic; it is not used in any arithmetic.
export const PLATE_PROPORTIONS = [
  { value: "quarter", label: "A quarter", fraction: 0.25 },
  { value: "third", label: "About a third", fraction: 0.34 },
  { value: "half", label: "Half", fraction: 0.5 },
  { value: "most", label: "Most of it", fraction: 0.78 },
];

// How often vegetables, and how often protein, come with a meal.
export const FREQUENCY = [
  { value: "never", label: "Never", short: "Never" },
  { value: "some", label: "Some meals", short: "Some" },
  { value: "most", label: "Most meals", short: "Most" },
  { value: "every", label: "Every meal", short: "Every" },
];

export const PROTEINS = [
  { value: "fish", label: "Fish" },
  { value: "beans", label: "Beans" },
  { value: "eggs", label: "Eggs" },
  { value: "chicken", label: "Chicken" },
  { value: "meat", label: "Meat" },
  { value: "groundnut", label: "Groundnut" },
];

export const SUGARY_DRINKS = [
  { code: "ml", id: "malt", label: "Malta and malt drinks" },
  { code: "fz", id: "fizzy", label: "Fizzy drinks" },
  { code: "jc", id: "juice", label: "Packaged juice" },
  { code: "sb", id: "sobolo", label: "Sweetened sobolo" },
  { code: "sk", id: "sugar", label: "Sugar in koko or tea" },
];

const DRINK_BY_CODE = Object.fromEntries(SUGARY_DRINKS.map((d) => [d.code, d]));

// What would move it, one entry per food, keyed by code. Each names the food
// as logged, leans on the accompaniment message and the guideline serving,
// and says plainly where no Ghanaian study has measured the food. `cite`
// names the studies in short form; the full references are in PLATE_SOURCES.
export const SWAPS = {
  kk: {
    text: "Kenkey is the staple to keep. In Ghanaian tests, Ga kenkey raised blood sugar less than banku, gari and yam, and the researchers credit the fermentation. No study has measured Fante kenkey, so that finding is for the Ga kind. Ghana's guideline serving is one 125 g sardine tin.",
    cite: "Eli-Cophie 2017 (10 adults); Brakohiapa 1997 (10 men); Ghana FBDG 2023",
  },
  bk: {
    text: "Banku scored high on the glycaemic index in one Ghanaian study of ten people: 73, against 41 for Ga kenkey in the same study. The two changes the evidence points to are swapping some banku meals for kenkey, and keeping the okro, soup and fish generous next to a smaller ball, because protein and fat eaten with a starch lower the rise in blood sugar.",
    cite: "Eli-Cophie 2017 (10 adults); Moghaddam 2006 (20 adults)",
  },
  ff: {
    text: "Fufu eaten with light soup and fish scored low to moderate in three Ghanaian tests, 46 to 55. The same kind of fufu eaten plain, with water, scored 91 in an Ivorian study. Part of that gap is the soup and the fish, and part is the recipe, so keep the soup and fish generous, and keep the fufu ball about the size of a medium orange, which is Ghana's guideline serving.",
    cite: "Eli-Cophie 2017, Otoo 2024, Adu-Gyamfi 2022 (10 adults each); Kouamé 2015 (Côte d'Ivoire); Ghana FBDG 2023",
  },
  gr: {
    text: "Only Nigerian studies have measured gari, and they put it high, 84 to 92. The one Ghanaian study that tested gari published no number, but found Ga kenkey raised blood sugar less than gari. Beans, fish or a vegetable soup with the gari is the change with evidence behind it.",
    cite: "Nwaliowe 2023 (23 adults, Nigeria); Ogbuji and David-Chukwu (Nigeria); Brakohiapa 1997 (10 men); Moghaddam 2006",
  },
  kn: {
    text: "One Ghanaian study of ten people measured kokonte, and its result sits so far below every other cassava food tested anywhere that we are not quoting the number. Treat kokonte like the other cassava staples: the soup and the protein eaten with it are what the evidence supports.",
    cite: "Yeboah 2019 (10 adults); Moghaddam 2006",
  },
  tz: {
    text: "Tuo zaafi scored 68 in one Ghanaian study of ten people, where it was made from maize flour rather than millet. Other work shows that protein and fat eaten with a starch lower the rise in blood sugar, so the ayoyo or soup with it earns its place.",
    cite: "Eli-Cophie 2017 (10 adults); Moghaddam 2006",
  },
  wk: {
    text: "No study has measured waakye itself yet. Beans with rice lowered the blood sugar rise by about a sixth compared with rice alone, in a US study of 17 adults with type 2 diabetes, so the beans in waakye lower the rise the rice would cause on its own. Ask for more beans in the mix and less of the rice.",
    cite: "Thompson 2012 (17 adults, USA)",
  },
  jr: {
    text: "No Ghanaian study has measured jollof. A Nigerian study of ten people put Nigerian jollof near the top of the scale, and a Ghanaian lab analysis found about 500 mg of sodium in every 100 g of jollof, so it counts for salt as well as starch. Fish, chicken, eggs or beans alongside, and vegetables on the plate, lower the rise from any rice.",
    cite: "Okareh 2021 (10 adults, Nigeria); Annor 2016 (Ghanaian lab analysis); Moghaddam 2006",
  },
  pr: {
    text: "No Ghanaian test of local against imported rice exists. The international tables put plain boiled white rice at 73 and brown rice at 68. Ghana's guidelines say to prefer parboiled or unpolished rice over polished white, and give a serving as four heaped tablespoons. Beans, fish or a vegetable stew with it lower the rise.",
    cite: "Atkinson 2008 (international tables); Ghana FBDG 2023; Thompson 2012",
  },
  rr: {
    text: "No study has measured red red as a dish. Its beans help: beans eaten with a starch lowered the blood sugar rise in a US study, and beans are one of the six food groups Ghana's guidelines want every day. The fried plantain half counts as deep-fried, which the guidelines say to limit.",
    cite: "Thompson 2012 (17 adults, USA); Ghana FBDG 2023",
  },
  by: {
    text: "Boiled white yam scored 44 in a Ghanaian study of ten people, lower than the same yam fried, at 59. Yellow yam did not follow that pattern, so this is a white yam finding, and the spread between people was wide. Ghana's guideline serving is one sardine can.",
    cite: "Ampofo 2021 (10 adults); Ghana FBDG 2023",
  },
  fy: {
    text: "Fried white yam scored 59 against 44 for the same yam boiled, in a Ghanaian study of ten people. Boiling instead of frying is the swap that study supports, and Ghana's guidelines say to limit deep-frying whichever food it is.",
    cite: "Ampofo 2021 (10 adults); Ghana FBDG 2023",
  },
  bp: {
    text: "Unripe plantain raised blood sugar less than ripe, 44 to 46 against 54 to 56, in one study of 30 people, so green apem is the boiled plantain to choose. Ghana's guideline serving is one and a half fingers of apem.",
    cite: "Ogbuji 2013 (30 adults); Atkinson 2008; Ghana FBDG 2023",
  },
  fp: {
    text: "No study has measured kelewele. Ripe plantain deep-fried in palm oil scored 39 in an Ivorian study, against 88 for the same fruit roasted over charcoal, because the oil slows the sugar. The oil adds fat and energy with it, and Ghana's guidelines say to limit deep-frying. Boiled unripe plantain is the swap with evidence.",
    cite: "Kouamé 2017 (30 adults, Côte d'Ivoire); Ghana FBDG 2023",
  },
  hk: {
    text: "No Ghanaian study has measured Hausa koko yet, and the figure that circulates online has no traceable source. The part with guidance behind it is the sugar: Ghana's guidelines cap added table sugar at four tablespoons, about 50 g, a day.",
    cite: "Ghana FBDG 2023",
  },
  tb: {
    text: "No Ghanaian study has measured tom brown yet. If sugar goes in, it counts towards Ghana's guideline cap on added table sugar of four tablespoons, about 50 g, a day.",
    cite: "Ghana FBDG 2023",
  },
  br: {
    text: "No Ghanaian study has published a value for bread. The international tables put white bread at 75 and brown at 74, one point apart, so the case for brown or bran bread is fibre and fullness rather than blood sugar. In a 2026 KNUST study of 33 adults, sugar bread raised blood sugar more than tea bread. Ghana's guidelines prefer whole-grain bread, and give a serving as one 77 g roll.",
    cite: "Atkinson 2008; Dapuliga 2026 (33 adults, KNUST); Ghana FBDG 2023",
  },
};

/** The foods the page says have no published value, so a test can hold it to that. */
export const NO_PUBLISHED_VALUE = ["wk", "jr", "rr", "fp", "hk", "tb", "br"];

// The Sources entries the swaps and guidance lines rest on, spread into each
// tool's own list so they render on the page.
export const PLATE_SOURCES = [
  {
    label:
      "Ministry of Food and Agriculture and University of Ghana School of Public Health. Food-Based Dietary Guidelines. Accra; January 2023 (the mashing-bowl food guide, serving sizes in local utensils, and the limits on salt, sugar, sweetened drinks and deep-frying).",
    url: "https://mofa.gov.gh/site/images/pdf/Ghana_Food_Based_Dietary_Guidelines_2023.pdf",
  },
  {
    label:
      "FAO. Food-based dietary guidelines: Ghana (the country page that describes the mashing-bowl graphic and its proportions by weight: cereals, roots and tubers 45.6%, vegetables 15.4%, fruits 15.3%, legumes 13.4%, animal-source foods 9.8%).",
    url: "https://www.fao.org/nutrition/education/food-dietary-guidelines/regions/countries/ghana/en/",
  },
  {
    label:
      "Eli-Cophie, Agbenorhevi and Annan (2017). Glycaemic index of Ghanaian staples eaten with light soup and fish: Ga kenkey 41, banku 73, pounded fufu 55, processed fufu powder 31, tuo zaafi 68; ten adults. Food Sci Nutr 2017;5(1):131-138, doi:10.1002/fsn3.372.",
  },
  {
    label:
      "Brakohiapa et al. (1997). Five Ghanaian staples as mixed meals in ten healthy men: Ga kenkey gave the smallest glucose response and yam the largest; kenkey differed significantly from yam and from gari; no numeric GI published. West Afr J Med 1997;16(3):170-173.",
  },
  {
    label:
      "Otoo, Tandoh and Mills-Robertson (2024). Cassava, plantain and cassava-plantain fufu with light soup and smoked salmon: 47 to 53; ten adults. Curr Dev Nutr 2024;8(2):102076, doi:10.1016/j.cdnut.2024.102076.",
  },
  {
    label:
      "Adu-Gyamfi (2022). Composite fufu in Wenchi: cassava-plantain 53; ten adults; a small, recently launched journal. Universal Journal of Food Science and Technology 2022;1(1):12-32, doi:10.31586/ujfst.2022.528.",
  },
  {
    label:
      "Yeboah, Agbenorhevi and Sampson (2019). Kokonte, kafa, abolo and akple; ten adults. The kokonte figure sits far below every other cassava product tested anywhere and is not quoted on this page. J Food Nutr Res 2019;7(9):624-631, doi:10.12691/jfnr-7-9-1.",
  },
  {
    label:
      "Ampofo, Agbenorhevi, Firempong and Adu-Kwarteng (2021). White, yellow and water yam, boiled, fried and roasted: boiled white yam 44, fried white yam 59, with wide spreads; ten adults. Food Sci Nutr 2021;9(2):1106-1111, doi:10.1002/fsn3.2087.",
  },
  {
    label:
      "Dapuliga et al. (2026). Sugar bread and tea bread with high-quality cassava flour: sugar bread raised blood sugar significantly more than tea bread; 33 adults, KNUST. J Food Meas Charact 2026, doi:10.1007/s11694-026-04152-w.",
  },
  {
    label:
      "Kouamé et al. (2015). Ivorian staples eaten plain with water: pounded cassava-plantain fufu 91, pounded yam 85. Nutrients 2015;7(2):1267-1281, doi:10.3390/nu7021267.",
  },
  {
    label:
      "Kouamé et al. (2017). Ripe plantain by cooking method: deep-fried in palm oil 39, charcoal-roasted 88; 30 adults, Côte d'Ivoire. Foods 2017;6(9):83, doi:10.3390/foods6090083.",
  },
  {
    label:
      "Ogbuji (2013). Ripe and unripe plantain by processing method: unripe 44 to 46, ripe 54 to 56; 30 adults. Eur J Biol Med Sci Res 2013;1(3).",
  },
  {
    label:
      "Thompson et al. (2012). Pinto or black beans with white rice lowered the glucose rise by about 16 to 19% against rice alone; 17 adults with type 2 diabetes, USA. Nutr J 2012;11:23, doi:10.1186/1475-2891-11-23.",
  },
  {
    label:
      "Moghaddam, Vogt and Wolever (2006). Fat and protein taken with 50 g glucose each lowered the glucose response, protein about three times as much as fat gram for gram; 20 adults. J Nutr 2006;136(10):2506-2511, doi:10.1093/jn/136.10.2506.",
  },
  {
    label:
      "Atkinson et al. (2008). International tables of glycemic index and glycemic load values: white rice 73, brown rice 68, white bread 75, wholemeal bread 74, plantain 55. Diabetes Care 2008;31(12):2281-2283.",
  },
  {
    label:
      "Okareh et al. (2021). Nigerian jollof rice, 98.9; ten adults. No Ghanaian jollof value exists. Nigerian J Nutr Sci 2021;42(2):180-186.",
  },
  {
    label:
      "Nwaliowe et al. (2023). Eba from four cassava cultivars, 84 to 89; 23 adults, Nigeria. CyTA J Food 2023;21(1), doi:10.1080/19476337.2022.2152873. Also Ogbuji and David-Chukwu, gari 92 (Nigeria; abstract only).",
  },
  {
    label:
      "Annor, Debrah and Essen (2016). Sodium in 20 prepared Ghanaian dishes: jollof 507 mg, waakye with stew 523 mg, kenkey with fried fish and pepper 498 mg, per 100 g. SpringerPlus 2016;5:581, doi:10.1186/s40064-016-2202-9.",
  },
  {
    label:
      "Kushitor et al. (2025). Previous-day diet in three low-income Accra communities: 20.3% had a soft drink or malt drink, 21.2% Milo or sweetened tea. BMC Public Health 2025;25:2556, doi:10.1186/s12889-025-23751-8.",
  },
  {
    label:
      "Abdulai et al. (2026). Sugar-sweetened beverages in Cape Coast, and Ghana's 20% excise tax under the Excise Duty (Amendment) Act 2023 (Act 1108). Front Nutr 2026;13:1847802, doi:10.3389/fnut.2026.1847802.",
  },
  {
    label:
      "Ministry of Health and WHO. Ghana STEPS Report 2023. September 2024 (76.0% of adults eat fewer than five servings of fruit and vegetables a day; 5,438 adults aged 18 to 69).",
    url: "https://www.afro.who.int/sites/default/files/2024-11/GHANA%20STEPS%20REPORT%202023.pdf",
  },
  {
    label:
      "WHO. Guideline: sugars intake for adults and children. Geneva; 2015 (free sugars under 10% of energy, about 50 g a day; a further reduction to under 5% suggested).",
  },
  {
    label:
      "WHO. Guidelines on physical activity and sedentary behaviour. Geneva; 2020 (150 to 300 minutes of moderate activity a week; limit time spent sitting).",
  },
];

/** Clamp one counter into 0..MAX_TIMES. */
function clampTimes(n) {
  const v = Math.floor(Number(n) || 0);
  if (v < 0) return 0;
  return Math.min(v, MAX_TIMES);
}

/** Sum a { code: times } map, with every entry clamped. */
export function countTotal(map) {
  if (!map || typeof map !== "object") return 0;
  return Object.values(map).reduce((sum, n) => sum + clampTimes(n), 0);
}

/** True when any counter sits at the cap, so the total is "at least". */
export function anyCapped(map) {
  if (!map || typeof map !== "object") return false;
  return Object.values(map).some((n) => clampTimes(n) >= MAX_TIMES);
}

/** One decimal, printed without a trailing .0. */
function perDay(total) {
  const v = Math.round((total / 7) * 10) / 10;
  return Number.isInteger(v) ? String(v) : v.toFixed(1);
}

// ------------------------------ micro-feedback -------------------------------
//
// One line after each answer. Arithmetic and description only: nothing below
// says whether a number is good or bad, because that copy is Phase 2 and needs
// its sources.

export function foodsFeedback(foods) {
  const total = countTotal(foods);
  if (total === 0) {
    return "Nothing logged yet. Tap a tile once for each time you eat it in a typical week.";
  }
  const atLeast = anyCapped(foods) ? "at least " : "";
  const a = `${atLeast}${total} starchy meal${total === 1 ? "" : "s"} a week`;
  if (total < 7) return `${a[0].toUpperCase()}${a.slice(1)} so far, under one a day. Keep going until the week looks like yours.`;
  if (total <= 10) return `${a[0].toUpperCase()}${a.slice(1)}, about one a day. The plate question next asks how big that one is.`;
  if (total <= 17) return `${a[0].toUpperCase()}${a.slice(1)}, about two a day. The plate proportion question next is where it gets interesting.`;
  if (total <= 24) {
    return `${a[0].toUpperCase()}${a.slice(1)}, about three a day, which is a common pattern in Ghana. The plate proportion question next is where it gets interesting.`;
  }
  return `${a[0].toUpperCase()}${a.slice(1)}, more than three a day. The plate proportion question next is where it gets interesting.`;
}

// Ghana's guideline bowl, as FAO describes the graphic: staples a little
// under half by weight, the rest vegetables, fruit, legumes and animal foods.
const BOWL = "Ghana's guideline bowl puts staples at a little under half by weight, with vegetables, fruit, legumes and animal foods sharing the rest.";

export function proportionFeedback(value) {
  switch (value) {
    case "quarter":
      return `A quarter is starch. ${BOWL} The next two questions ask what fills your other three quarters.`;
    case "third":
      return `About a third is starch, a little under the guideline bowl, which has staples at just under half by weight. The next two questions ask what fills the rest.`;
    case "half":
      return `Half and half, which is close to Ghana's guideline bowl: staples a little under half by weight, the rest vegetables, fruit, legumes and animal foods. The next two questions ask what is on your other half.`;
    case "most":
      return `Mostly starch. ${BOWL} The next two questions ask what shares the bowl with it.`;
    default:
      return "";
  }
}

export function vegFeedback(value) {
  switch (value) {
    case "never":
      return "No vegetables with meals as things stand. Protein next.";
    case "some":
      return "Vegetables at some meals. Protein next.";
    case "most":
      return "Vegetables at most meals. Protein next.";
    case "every":
      return "Vegetables at every meal. Protein next.";
    default:
      return "";
  }
}

export function proteinFeedback(value) {
  switch (value) {
    case "never":
      return "No protein with meals as things stand. We will skip the question about which ones.";
    case "some":
      return "Protein at some meals. Which ones is next.";
    case "most":
      return "Protein at most meals. Which ones is next.";
    case "every":
      return "Protein at every meal. Which ones is next.";
    default:
      return "";
  }
}

export function proteinsFeedback(list) {
  const picked = PROTEINS.filter((p) => Array.isArray(list) && list.includes(p.value)).map((p) => p.label.toLowerCase());
  if (picked.length === 0) return "None picked. Sugary drinks next.";
  if (picked.length === 1) return `${picked[0][0].toUpperCase()}${picked[0].slice(1)} logged. Sugary drinks next.`;
  const last = picked.pop();
  const head = picked.join(", ");
  return `${head[0].toUpperCase()}${head.slice(1)} and ${last} logged. Sugary drinks next.`;
}

export function drinksFeedback(drinks) {
  const total = countTotal(drinks);
  if (total === 0) return "No sugary drinks logged. One more question.";
  const atLeast = anyCapped(drinks) ? "at least " : "";
  const line = `${atLeast}${total} sugary drink${total === 1 ? "" : "s"} a week, about ${perDay(total)} a day.`;
  return `${line[0].toUpperCase()}${line.slice(1)} One more question.`;
}

// ------------------------------------ steps ----------------------------------
//
// Same step shapes as the Stepper reads for Part 1, plus four new kinds:
//   tiles     a grid of food tiles, each a tap-to-increment counter
//   plate     four plates to tap, one per proportion
//   multi     pick any number of chips
//   counters  a list of labelled counters
//   counter   one counter
// `feedback(value, allValues)` returns the one-line observation shown before
// the next question. `skipIf(values)` hides a step that no longer applies.

const FOODS_STEP = {
  id: "foods",
  kind: "tiles",
  text: "In a typical week, how many times do you eat each of these?",
  help: "Tap a tile once for each time. 7+ covers every day or more. Leave anything you do not eat at zero.",
  note: "A serving, in Ghana's own dietary guidelines, is measured with kitchen things: boiled rice is four heaped tablespoons, Ga kenkey one 125 g sardine tin, boiled yam one sardine can, fufu one medium orange, boiled plantain one and a half fingers of apem.",
  foods: FOODS,
  groups: FOOD_GROUPS,
  feedback: (v) => foodsFeedback(v),
};

const PROPORTION_STEP = {
  id: "proportion",
  kind: "plate",
  text: "On a typical plate or bowl, how much is the starch?",
  help: "The kenkey, rice, fufu, yam or bread part, before the soup, stew or protein goes on. Ghana's own dietary guidelines picture the day's food in a mashing bowl, an asanka, with staples a little under half of it by weight. Tap the bowl that looks most like yours.",
  options: PLATE_PROPORTIONS,
  feedback: (v) => proportionFeedback(v),
};

const DRINKS_STEP = {
  id: "drinks",
  kind: "counters",
  text: "Sugary drinks in a typical week?",
  help: "One tap per drink. 7+ covers every day or more.",
  options: SUGARY_DRINKS,
  feedback: (v) => drinksFeedback(v),
};

export const PLATE_STEPS = [
  FOODS_STEP,
  PROPORTION_STEP,
  {
    id: "veg",
    kind: "choice",
    layout: "grid",
    text: "How often do vegetables come with a meal?",
    help: "Kontomire, garden eggs, okro, cabbage, carrots, cucumber and salad all count.",
    options: FREQUENCY,
    feedback: (v) => vegFeedback(v),
  },
  {
    id: "protein",
    kind: "choice",
    layout: "grid",
    text: "How often does a meal come with protein?",
    help: "Fish, meat, chicken, eggs, beans or groundnut.",
    options: FREQUENCY,
    feedback: (v) => proteinFeedback(v),
  },
  {
    id: "proteins",
    kind: "multi",
    text: "Which proteins, most weeks?",
    help: "Pick as many as apply.",
    options: PROTEINS,
    skipIf: (values) => values.protein === "never",
    feedback: (v) => proteinsFeedback(v),
  },
  DRINKS_STEP,
  {
    id: "fried",
    kind: "counter",
    text: "How many meals a week include something fried?",
    help: "Fried fish, fried yam, kelewele, fried rice, fried chicken, fried plantain. One tap per meal.",
    unit: "meals a week",
    max: MAX_TIMES,
  },
];

/** The BMI tool's short form: starchy meals, plate proportion, sugary drinks. */
export const PLATE_STEPS_SHORT = [FOODS_STEP, PROPORTION_STEP, DRINKS_STEP];

// ----------------------------------- summary ---------------------------------

/**
 * Describe what was logged, for the result screen. Every field is a plain
 * restatement of an answer; nothing is scored or judged.
 *
 * @param {{ foods?, proportion?, veg?, protein?, proteins?, drinks?, fried? }} values
 */
export function summarisePlate(values = {}) {
  const foodsMap = values.foods || {};
  const foods = FOODS.map((f) => ({ ...f, times: clampTimes(foodsMap[f.code]) }))
    .filter((f) => f.times > 0)
    .sort((a, b) => b.times - a.times || FOODS.indexOf(a) - FOODS.indexOf(b));
  const starchyPerWeek = countTotal(foodsMap);

  const drinksMap = values.drinks || {};
  const drinks = SUGARY_DRINKS.map((d) => ({ ...d, times: clampTimes(drinksMap[d.code]) }))
    .filter((d) => d.times > 0)
    .sort((a, b) => b.times - a.times || SUGARY_DRINKS.indexOf(a) - SUGARY_DRINKS.indexOf(b));

  const proteinList = Array.isArray(values.proteins) ? values.proteins : [];

  const summary = {
    foods,
    starchyPerWeek,
    starchyPerDay: perDay(starchyPerWeek),
    starchyAtLeast: anyCapped(foodsMap),
    proportion: PLATE_PROPORTIONS.find((p) => p.value === values.proportion) || null,
    veg: FREQUENCY.find((f) => f.value === values.veg) || null,
    protein: FREQUENCY.find((f) => f.value === values.protein) || null,
    proteins: PROTEINS.filter((p) => proteinList.includes(p.value)),
    drinks,
    drinksPerWeek: countTotal(drinksMap),
    drinksAtLeast: anyCapped(drinksMap),
    fried: values.fried === undefined || values.fried === null ? null : clampTimes(values.fried),
    swaps: swapsFor(foods),
  };
  return { ...summary, guidance: guidanceFor(summary) };
}

/** The sourced swap for each food someone logged, most-eaten first. */
export function swapsFor(foods) {
  return (foods || [])
    .map((f) => (SWAPS[f.code] ? { code: f.code, label: f.label, times: f.times, ...SWAPS[f.code] } : null))
    .filter(Boolean);
}

/**
 * The lines that read the week against Ghana's guidelines and WHO. Each is
 * a general statement with its source; none converts a count into grams.
 *
 * @param {ReturnType<typeof summarisePlate>} s
 * @returns {Array<{ id, text, cite }>}
 */
export function guidanceFor(s) {
  const lines = [];

  lines.push({
    id: "accompaniment",
    text: "Eating a starchy food with protein, fat, fibre or beans lowers the rise in blood sugar, and that has stronger evidence behind it than any single GI figure on this page. In a study of 20 adults, both protein and fat cut the glucose response, and gram for gram protein did about three times as much as fat. The Ghanaian fufu studies with low to moderate results all served the fufu with soup and fish.",
    cite: "Moghaddam 2006 (20 adults); Thompson 2012 (17 adults); Eli-Cophie 2017; Otoo 2024",
  });

  if (s.proportion) {
    const close = s.proportion.value === "half" || s.proportion.value === "third";
    lines.push({
      id: "bowl",
      text: close
        ? `You put starch at ${s.proportion.label.toLowerCase()} of the plate. ${BOWL} Yours is close to that picture; the question is what fills the rest.`
        : s.proportion.value === "most"
          ? `You put starch at most of the plate. ${BOWL} The guideline asks for foods from at least four of its six groups in every meal.`
          : `You put starch at a quarter of the plate. ${BOWL} A quarter is less starch than the guideline pictures, so the rest of the bowl is carrying more than usual.`,
      cite: "Ghana FBDG 2023; FAO description of the food guide",
    });
  }

  if (s.veg) {
    const low = s.veg.value === "never" || s.veg.value === "some";
    lines.push({
      id: "veg",
      text: low
        ? `You logged vegetables at ${s.veg.value === "never" ? "no meals" : "some meals"}. Ghana's guidelines ask for at least five servings of vegetables a day, and a serving of boiled kontomire is one level soup ladle, boiled garden eggs two level 70 g tomato-paste cans. Three in four Ghanaian adults eat fewer than five servings of fruit and vegetables a day, so this is the common pattern rather than an unusual one.`
        : `Vegetables at ${s.veg.label.toLowerCase()}. Ghana's guidelines ask for at least five servings a day; a serving of boiled kontomire is one level soup ladle, boiled garden eggs two level 70 g tomato-paste cans, cut carrots three small tomato-paste cans.`,
      cite: "Ghana FBDG 2023; Ghana STEPS 2023",
    });
  }

  if (s.protein) {
    const low = s.protein.value === "never" || s.protein.value === "some";
    const legumes = s.proteins.some((p) => p.value === "beans" || p.value === "groundnut");
    lines.push({
      id: "protein",
      text: low
        ? "Ghana's guidelines ask for one and a half servings of animal-source foods every day, where boiled chicken is three and a half matchboxes, smoked fish two small tomato-paste cans, or two medium eggs, and two and a half servings of beans, nuts and legumes, where boiled beans is one and a half small tomato-paste cans. Fish first, especially oily fish from the sea."
        : `Protein at ${s.protein.label.toLowerCase()}. Ghana's guidelines put fish first, especially oily fish from the sea, and prefer grilled, boiled or steamed over fried or smoked.${legumes ? " Beans and groundnut count towards the two and a half servings of legumes and nuts the guidelines ask for each day." : " Beans, nuts and legumes are their own group in the guidelines, two and a half servings a day, and were not among the proteins you picked."}`,
      cite: "Ghana FBDG 2023",
    });
  }

  if (s.drinksPerWeek > 0) {
    lines.push({
      id: "drinks",
      text: `Ghana's guidelines say to limit sugar-sweetened drinks, and malt drinks count: they sit under Ghana's 20% excise tax on sweetened drinks and under WHO's definition of free sugars. WHO puts free sugars under 10% of energy, about 50 g a day, and Ghana's guidelines cap added table sugar at four tablespoons, about 50 g. We do not turn your ${s.drinksPerWeek}${s.drinksAtLeast ? "+" : ""} a week into grams, because no Ghanaian study has measured what goes into a cup of koko or tea, and a weekly count is not that measurement. In three low-income Accra communities, about one in five adults had a soft drink or malt drink the day before, in a 2025 study.`,
      cite: "Ghana FBDG 2023; WHO 2015; Act 1108 (Abdulai 2026); Kushitor 2025",
    });
  } else {
    lines.push({
      id: "drinks",
      text: "No sugary drinks logged. Ghana's guidelines say to limit them, so there is nothing to move here.",
      cite: "Ghana FBDG 2023",
    });
  }

  if (s.fried !== null && s.fried > 0) {
    lines.push({
      id: "fried",
      text: `Fried food at ${timesLabel(s.fried)} meals a week. Ghana's guidelines say to limit deep-frying and choose boiling, grilling, baking or smoking where you can, not to reuse frying oil, and to skim the fat off stews and soups before serving.`,
      cite: "Ghana FBDG 2023",
    });
  }

  return lines;
}

// ------------------------------------ packing --------------------------------
//
// The lead endpoint takes at most 16 answer keys, each value under 200
// characters. A whole week packs into two short strings:
//   plate    f:kk3.bk2.br7|p:half
//   habits   v:most|pr:some|px:fish.beans|sd:ml2.fz1|fr:3
// Only non-zero counters are written, so a typical value is far shorter than
// the worst case the tests check.

function packMap(map, order) {
  return order
    .map((item) => ({ code: item.code, n: clampTimes(map?.[item.code]) }))
    .filter((x) => x.n > 0)
    .map((x) => `${x.code}${x.n}`)
    .join(".");
}

function parseMap(str, byCode) {
  const out = {};
  if (!str) return out;
  for (const token of str.split(".")) {
    const code = token.slice(0, 2);
    const n = Number(token.slice(2));
    if (byCode[code] && n > 0) out[code] = clampTimes(n);
  }
  return out;
}

function fields(str) {
  const out = {};
  for (const part of String(str || "").split("|")) {
    const i = part.indexOf(":");
    if (i > 0) out[part.slice(0, i)] = part.slice(i + 1);
  }
  return out;
}

/** The full plate (diabetes tool) as two answer keys. */
export function packPlate(values = {}) {
  const plate = [`f:${packMap(values.foods, FOODS)}`, `p:${values.proportion || ""}`].join("|");
  const habits = [
    `v:${values.veg || ""}`,
    `pr:${values.protein || ""}`,
    `px:${(Array.isArray(values.proteins) ? values.proteins : []).filter((p) => PROTEINS.some((o) => o.value === p)).join(".")}`,
    `sd:${packMap(values.drinks, SUGARY_DRINKS)}`,
    `fr:${values.fried === undefined || values.fried === null ? "" : clampTimes(values.fried)}`,
  ].join("|");
  return { plate, habits };
}

/** The short plate (BMI tool) as one string, to be joined into a single key. */
export function packPlateShort(values = {}) {
  return [
    `f:${packMap(values.foods, FOODS)}`,
    `p:${values.proportion || ""}`,
    `sd:${packMap(values.drinks, SUGARY_DRINKS)}`,
  ].join("|");
}

/** Inverse of packPlate / packPlateShort, for tests and for reading a lead back. */
export function parsePlate(plateStr, habitsStr) {
  const a = fields(plateStr);
  const b = fields(habitsStr);
  const out = {
    foods: parseMap(a.f, FOOD_BY_CODE),
    proportion: a.p || undefined,
  };
  if (a.sd !== undefined) out.drinks = parseMap(a.sd, DRINK_BY_CODE);
  if (b.v !== undefined) out.veg = b.v || undefined;
  if (b.pr !== undefined) out.protein = b.pr || undefined;
  if (b.px !== undefined) out.proteins = b.px ? b.px.split(".") : [];
  if (b.sd !== undefined) out.drinks = parseMap(b.sd, DRINK_BY_CODE);
  if (b.fr !== undefined) out.fried = b.fr === "" ? null : Number(b.fr);
  return out;
}
