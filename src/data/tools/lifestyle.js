// Part 2 of the BMI and waist tool, plus the one sentence every tool's Part 2
// carries.
//
// Pure data + description. No JSX and no browser globals.
//
// NOTHING HERE SCORES. The BMI, waist, waist-to-height and waist-to-hip bands
// come from bmi-waist.js and Part 1 alone. This module logs activity level,
// weight change over the last twelve months and a short form of the plate
// builder, and packs the three into a single answer key so the BMI lead stays
// inside the endpoint's 16-key limit (Part 1 already uses 13, and the form
// adds optIn).

import { PLATE_SOURCES, PLATE_STEPS_SHORT, packPlateShort, parsePlate, summarisePlate } from "./plate.js";

// The short plate reuses the plate swaps and guidance, so it cites the same
// studies. The activity line rests on Ghana's guidelines and WHO 2020, both
// already in that list.
export const LIFESTYLE_SOURCES = PLATE_SOURCES;

/**
 * What Ghana's guidelines and WHO say about a normal day, read against the
 * activity level picked. Descriptive; nothing here scores.
 */
export function activityGuidance(value) {
  switch (value) {
    case "sitting":
      return {
        text: "Mostly sitting. WHO's guidance says adults should limit the time they spend sitting, and Ghana's guidelines ask for 30 minutes of moderate activity on at least five days a week, 150 to 300 minutes in all, plus muscle-strengthening on two or more days.",
        cite: "WHO 2020; Ghana FBDG 2023",
      };
    case "feet":
      return {
        text: "On your feet most of the day. Ghana's guidelines still ask for 150 to 300 minutes a week of activity that raises the heart rate, on top of the standing, plus muscle-strengthening on two or more days.",
        cite: "Ghana FBDG 2023; WHO 2020",
      };
    case "physical":
      return {
        text: "Physical work most days. Ghana's guidelines and WHO count moderate activity at 150 to 300 minutes a week, and heavy work often meets that on its own; WHO adds muscle-strengthening on two or more days.",
        cite: "Ghana FBDG 2023; WHO 2020",
      };
    case "exercise":
      return {
        text: "Regular exercise. Ghana's guidelines and WHO ask for 150 to 300 minutes of moderate activity a week, or 75 to 150 minutes of vigorous activity, plus muscle-strengthening on two or more days.",
        cite: "Ghana FBDG 2023; WHO 2020",
      };
    default:
      return null;
  }
}

export const WEIGHT_CHANGE_NOTE =
  "Weight change over a year is context a clinician reads alongside the waist measurement. The tool does not score it, and a change in either direction over twelve months that you were not aiming for is worth mentioning at a check-up.";

/**
 * The one plain sentence every result screen with a Part 2 must carry.
 * `scoreName` is what Part 1 produced: "FINDRISC score", "heart age reading",
 * "BMI and waist bands".
 */
export function lifestyleNote(scoreName) {
  return `This section is guidance drawn from dietary and activity recommendations, and it is not part of your ${scoreName}, which was worked out from Part 1 alone.`;
}

export const ACTIVITY_LEVELS = [
  { value: "sitting", label: "Mostly sitting", hint: "Desk, driving, trading from a seat" },
  { value: "feet", label: "On my feet", hint: "Teaching, nursing, selling, housework" },
  { value: "physical", label: "Physical work", hint: "Farming, construction, carrying loads" },
  { value: "exercise", label: "Regular exercise", hint: "Sport or a workout most weeks, whatever the job" },
];

export const WEIGHT_CHANGE = [
  { value: "lost", label: "Lost weight" },
  { value: "stable", label: "About the same" },
  { value: "gainedLittle", label: "Gained a little" },
  { value: "gainedLot", label: "Gained a lot" },
];

export function activityFeedback(value) {
  const opt = ACTIVITY_LEVELS.find((o) => o.value === value);
  if (!opt) return "";
  return `${opt.label} most days. Weight change next.`;
}

export function weightChangeFeedback(value) {
  switch (value) {
    case "lost":
      return "Lost weight over the year. Noted. Your week on a plate next.";
    case "stable":
      return "About the same over the year. Your week on a plate next.";
    case "gainedLittle":
      return "Gained a little over the year. Your week on a plate next.";
    case "gainedLot":
      return "Gained a lot over the year. Your week on a plate next.";
    default:
      return "";
  }
}

export const LIFESTYLE_STEPS = [
  {
    id: "activityLevel",
    kind: "choice",
    text: "Which is closest to a normal day for you?",
    options: ACTIVITY_LEVELS,
    feedback: (v) => activityFeedback(v),
  },
  {
    id: "weightChange",
    kind: "choice",
    layout: "grid",
    text: "Over the last twelve months, has your weight changed?",
    help: "Your own sense of it is fine. Clothes fitting differently counts.",
    options: WEIGHT_CHANGE,
    feedback: (v) => weightChangeFeedback(v),
  },
  ...PLATE_STEPS_SHORT,
];

/** Restate the answers for the result screen. */
export function summariseLifestyle(values = {}) {
  return {
    activity: ACTIVITY_LEVELS.find((o) => o.value === values.activityLevel) || null,
    activityGuidance: activityGuidance(values.activityLevel),
    weightChange: WEIGHT_CHANGE.find((o) => o.value === values.weightChange) || null,
    weightChangeNote: values.weightChange ? WEIGHT_CHANGE_NOTE : null,
    plate: summarisePlate(values),
  };
}

// One answer key:  act:sitting|wt:gainedLot|f:kk3.bk2|p:half|sd:ml2
export function packLifestyle(values = {}) {
  return {
    lifestyle: [`act:${values.activityLevel || ""}`, `wt:${values.weightChange || ""}`, packPlateShort(values)].join("|"),
  };
}

export function parseLifestyle(str) {
  const f = {};
  for (const part of String(str || "").split("|")) {
    const i = part.indexOf(":");
    if (i > 0) f[part.slice(0, i)] = part.slice(i + 1);
  }
  const plate = parsePlate(str);
  return {
    activityLevel: f.act || undefined,
    weightChange: f.wt || undefined,
    foods: plate.foods,
    proportion: plate.proportion,
    drinks: plate.drinks || {},
  };
}
