// The launch homepage designs: three looks (colour + type) and two heroes.
// `?preview` shows a switcher.

import { trackExperimentView } from "./analytics";

export const LOOKS = ["white", "dark", "bright"];
export const HEROES = ["centred", "photo"];

export function getHomeVariant(search) {
  // The test ended in Nov 2026: white + centred is the homepage. `?look=` and
  // `?hero=` still show the other designs for review.
  const params = new URLSearchParams(search);
  const qLook = params.get("look");
  const qHero = params.get("hero");
  const look = qLook && LOOKS.includes(qLook) ? qLook : "white";
  const hero = qHero && HEROES.includes(qHero) ? qHero : "centred";
  return { look, hero, forced: true, preview: params.has("preview") };
}

let reported = false;
export function reportHomeVariant({ look, hero, forced }) {
  // A forced variant is someone reviewing a design, not a test visitor.
  if (reported || forced) return;
  reported = true;
  trackExperimentView({ experiment: "home_launch_v1", variant: `${look}_${hero}` });
}
