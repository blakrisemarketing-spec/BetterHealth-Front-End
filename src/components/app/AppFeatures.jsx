import { Link } from "react-router-dom";
import {
  Activity, ArrowRight, BookOpen, CalendarHeart, ChefHat, Circle, Droplets, FlaskConical,
  Footprints, Pill, Smile, Trophy, Users, UtensilsCrossed,
} from "lucide-react";
import Reveal from "../ui/Reveal";
import { appFeatures } from "../../data/app";

// Grid of what the app does. `limit` trims it for the homepage, which then
// links through to the full list on /download-app.
const ICONS = {
  Activity, BookOpen, CalendarHeart, ChefHat, Droplets, FlaskConical,
  Footprints, Pill, Smile, Trophy, Users, UtensilsCrossed,
};
export default function AppFeatures({ limit, eyebrow = "Inside the app", heading, intro }) {
  const items = limit ? appFeatures.slice(0, limit) : appFeatures;
  return (
    <section className="py-20 lg:py-[120px] px-6 bg-bg-alt">
      <div className="max-w-[1180px] mx-auto">
        <Reveal>
          <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3 text-center">
            {eyebrow}
          </p>
          <h2 className="text-h2 font-extrabold text-text-primary font-heading tracking-tight mb-5 text-center">
            {heading || (
              <>
                Everything that happens{" "}
                <span className="italic text-primary tracking-normal">between your tests</span>
              </>
            )}
          </h2>
          <p className="text-[17px] leading-[1.7] text-text-secondary font-body text-center max-w-[640px] mx-auto mb-14">
            {intro ||
              "What you eat, how much you move and whether you take your medicines shape your numbers between tests. The app keeps all of it in one place, next to your lab results."}
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((f, i) => {
            const Icon = ICONS[f.icon] || Circle;
            return (
              <Reveal key={f.title} delay={(i % 4) * 0.06}>
                <div className="h-full p-6 rounded-card border border-border bg-white hover:shadow-md hover:border-primary/30 transition-all">
                  <div
                    className="w-11 h-11 rounded-[12px] flex items-center justify-center mb-4"
                    style={{ background: `${f.color}1A`, color: f.color }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="font-bold font-heading text-[17px] text-text-primary mb-2">{f.title}</h3>
                  <p className="text-text-secondary text-[14px] leading-relaxed font-body m-0">{f.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {limit && limit < appFeatures.length && (
          <Reveal>
            <div className="text-center mt-10">
              <Link
                to="/download-app"
                className="inline-flex items-center gap-2 text-primary font-bold font-heading no-underline hover:text-primary-dark transition-colors"
              >
                See everything the app does <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
