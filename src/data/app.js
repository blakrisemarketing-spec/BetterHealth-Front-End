// The BetterHealth mobile app (iOS + Android, bundle id africa.betterhealth.app).
//
// Every claim here was checked against the app's code and live feature
// switches on 2026-10-30. Keep it to what the store build does today. Not
// claimed on purpose: reading blood pressure / sugar / weight from Health
// Connect (the store build leaves those permissions out), money challenges
// (switched off 2026-10-28), and "we never use your data for advertising".

// Neither store listing is public yet. Until they are, every "Get the app"
// button sends people to the beta testing sign-up form. At launch, fill in the
// two store URLs and the buttons switch to them.
export const APP_BETA_URL = "https://forms.gle/KQSuVVHgv2wgt5nJ6";
export const APP_STORE_URL = null;
export const PLAY_STORE_URL = null;

export const appIsLive = Boolean(APP_STORE_URL || PLAY_STORE_URL);

// Where a generic "Get the app" button goes right now.
export const GET_APP_URL = APP_STORE_URL || PLAY_STORE_URL || APP_BETA_URL;

export const appHeroStats = [
  { value: "Free", label: "To download and use" },
  { value: "480+", label: "Local foods to log" },
  { value: "48-72h", label: "Lab results" },
];

// From the app's own onboarding (mobile/src/onboarding/copy.ts).
export const appLoop = [
  {
    num: "01",
    title: "Choose your own aim",
    desc: "Tell the app what brought you: diabetes, blood pressure, weight, eating better, or simply knowing your numbers. It builds your plan around that.",
  },
  {
    num: "02",
    title: "Three small things a day",
    desc: "Move, eat your meals, drink your water. Tick them off on the home screen and keep your streak going.",
  },
  {
    num: "03",
    title: "See your numbers move",
    desc: "Your readings, your food and your lab results sit side by side, so you can see what your effort is changing.",
  },
];

// Icon names are lucide-react exports, resolved in the components.
export const appFeatures = [
  {
    icon: "UtensilsCrossed",
    color: "#E07A2E",
    title: "Log the food you eat",
    desc: "Search over 480 Ghanaian, Nigerian and West African foods, even by local names like TZ or gob3. Snap a photo of your plate, describe it (\"2 balls of kenkey and fried fish\"), or scan a barcode.",
  },
  {
    icon: "Activity",
    color: "#C2410C",
    title: "Blood sugar, blood pressure and weight",
    desc: "Record your home readings in seconds, see them by day, week or month, and get a reminder when it is time to check.",
  },
  {
    icon: "Pill",
    color: "#1F5C4A",
    title: "Medicine reminders",
    desc: "Add your medicines with a photo, get a reminder at the exact time, and mark each dose taken or skipped.",
  },
  {
    icon: "Footprints",
    color: "#7B5CC8",
    title: "Steps, workouts and sleep",
    desc: "Bring in steps, sleep and resting heart rate from Apple Health or Health Connect. Record a walk or run with its route, or follow a guided workout at home.",
  },
  {
    icon: "FlaskConical",
    color: "#0F766E",
    title: "Lab tests and results",
    desc: "Book a test or package, choose home collection or a partner lab, and pay with Mobile Money or card. A clinician reads your result before it reaches you, explained in plain words.",
  },
  {
    icon: "ChefHat",
    color: "#B45309",
    title: "Meal plans and local recipes",
    desc: "Plan a week or a month of Ghanaian or continental meals that respect your allergies, with healthier swaps like cabbage banku.",
  },
  {
    icon: "CalendarHeart",
    color: "#BE185D",
    title: "Period tracking",
    desc: "A cycle calendar with a daily log, late and irregular notes, a pregnancy mode, and an estimate of your fertile window (never a form of birth control).",
  },
  {
    icon: "Smile",
    color: "#2563EB",
    title: "Mood and wellbeing",
    desc: "Quick check-ins on how you feel, a private journal, and breathing exercises, with your trends over time.",
  },
  {
    icon: "Trophy",
    color: "#15803D",
    title: "Challenges and events",
    desc: "Start a step, food or water challenge with friends and follow the league table. Find group walks, runs and health events near you.",
  },
  {
    icon: "Users",
    color: "#0E7490",
    title: "Family and your consultant",
    desc: "Create a family and choose what each person shares. Share your food, activity and readings with your wellness consultant, and stop whenever you like.",
  },
  {
    icon: "Droplets",
    color: "#3B82C4",
    title: "Water",
    desc: "A daily water ring counted in sachets, with reminders to drink.",
  },
  {
    icon: "BookOpen",
    color: "#4D7C0F",
    title: "Learn",
    desc: "Health articles you can search with everyday words, with reading picked for what you are working on.",
  },
];

// Shown wherever we describe the app. Matches the store listing's disclaimer.
export const appDisclaimer =
  "BetterHealth is not a substitute for a doctor. Calories, food advice and figures from your phone or watch are estimates for your own tracking. If you feel unwell, contact a doctor or go to the nearest hospital.";
