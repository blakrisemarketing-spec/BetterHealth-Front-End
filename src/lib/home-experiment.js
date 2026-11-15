// The launch homepage A/B test: three looks (colour + type) and two heroes.
//
// A visitor is assigned at random once and keeps the same design on later
// visits (localStorage). `?look=` and `?hero=` override the assignment so a
// variant can be shared or reviewed, and `?preview` shows a switcher.

import { trackExperimentView } from "./analytics";

export const LOOKS = ["white", "dark", "bright"];
export const HEROES = ["centred", "photo"];
const KEY = "bh_home_exp_v1";

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function readStored() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "null");
  } catch {
    return null;
  }
}

export function getHomeVariant(search) {
  const params = new URLSearchParams(search);
  const stored = readStored();
  let look = stored && LOOKS.includes(stored.look) ? stored.look : pick(LOOKS);
  let hero = stored && HEROES.includes(stored.hero) ? stored.hero : pick(HEROES);
  if (!stored) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ look, hero }));
    } catch {
      // Private mode: the visitor gets a design for this page view only.
    }
  }
  const qLook = params.get("look");
  const qHero = params.get("hero");
  const forced = (qLook && LOOKS.includes(qLook)) || (qHero && HEROES.includes(qHero));
  if (qLook && LOOKS.includes(qLook)) look = qLook;
  if (qHero && HEROES.includes(qHero)) hero = qHero;
  return { look, hero, forced, preview: params.has("preview") };
}

let reported = false;
export function reportHomeVariant({ look, hero, forced }) {
  // A forced variant is someone reviewing a design, not a test visitor.
  if (reported || forced) return;
  reported = true;
  trackExperimentView({ experiment: "home_launch_v1", variant: `${look}_${hero}` });
}
