import { Check, Activity } from "lucide-react";
import Phone from "./Phone";
import StoreButtons from "./StoreButtons";
import { FoodScreen } from "../app/AppScreenMockups";
import { Sky, ScanStage } from "./LaunchExtras";
import heroPerson from "../../assets/launch/hero-person.webp";

const COPY = {
  pill: "Made in Ghana",
  sub: "Log your food by photo, track your blood pressure and sugar, and book lab tests. Built for Ghana.",
  checks: ["Free to download", "480+ local foods", "iPhone and Android"],
};

function Title() {
  return (
    <>
      Your health.
      <br />
      <span className="text-l-accent">One app.</span>
    </>
  );
}

function Chip({ icon, title, sub, className = "", tint }) {
  return (
    <div className={`absolute z-30 flex items-center gap-2.5 bg-white rounded-2xl pl-2.5 pr-4 py-2.5 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.3)] ${className}`}>
      <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: tint.bg, color: tint.fg }}>
        {icon}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[13px] font-bold text-[#1E2A27] whitespace-nowrap">{title}</span>
        <span className="text-[11.5px] font-semibold text-[#5F6B67] whitespace-nowrap">{sub}</span>
      </span>
    </div>
  );
}

const BP_CHIP = { icon: <Activity size={18} strokeWidth={2.4} />, title: "124/80 mmHg", sub: "Blood pressure, 7:40 am", tint: { bg: "#F1E3EF", fg: "#8E4585" } };
const MED_CHIP = { icon: <Check size={18} strokeWidth={3} />, title: "Metformin 500 mg", sub: "Taken at 8:00 am", tint: { bg: "#E1EEE7", fg: "#1F5C48" } };

function Pill() {
  return (
    <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur rounded-full pl-2.5 pr-4 py-1.5 border border-l-line mb-7">
      <span className="text-base leading-none" aria-hidden="true">🇬🇭</span>
      <span className="text-[13px] font-semibold text-l-ink">{COPY.pill}</span>
    </div>
  );
}

function Checks({ className = "" }) {
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-semibold text-l-muted ${className}`}>
      {COPY.checks.map((t) => (
        <li key={t} className="flex items-center gap-1.5">
          <Check size={16} strokeWidth={3} className="text-l-accent" /> {t}
        </li>
      ))}
    </ul>
  );
}

/* Variant A: centred headline, one big phone with two more fanned behind it. */
function CentredHero() {
  return (
    <section className="relative overflow-hidden pt-[124px] md:pt-[150px] px-4 sm:px-6">
      <Sky />
      <div className="relative max-w-[860px] mx-auto text-center">
        <Pill />
        <h1 className="l-head text-l-ink leading-[0.96] text-[56px] sm:text-[84px] lg:text-[108px] mb-7"><Title /></h1>
        <p className="text-[18px] sm:text-[20px] leading-[1.55] text-l-muted font-medium max-w-[540px] mx-auto mb-9">{COPY.sub}</p>
        <StoreButtons size="lg" className="justify-center mb-6" />
        <Checks className="justify-center" />
      </div>

      <div className="relative mt-12 md:mt-16">
        <ScanStage />
        <div className="absolute inset-x-0 bottom-0 h-24 z-20 pointer-events-none" style={{ background: "linear-gradient(to top, var(--l-bg), transparent)" }} />
      </div>
    </section>
  );
}

/* Variant B: copy on the left, a photo of someone using the app on the right. */
function PhotoHero() {
  return (
    <section className="relative overflow-hidden pt-[104px] md:pt-[132px] pb-16 md:pb-24 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">
        <div className="text-center lg:text-left">
          <Pill />
          <h1 className="l-head text-l-ink leading-[0.98] text-[54px] sm:text-[74px] lg:text-[86px] mb-6"><Title /></h1>
          <p className="text-[18px] sm:text-[20px] leading-[1.55] text-l-muted font-medium max-w-[500px] mx-auto lg:mx-0 mb-9">{COPY.sub}</p>
          <StoreButtons size="lg" className="justify-center lg:justify-start mb-6" />
          <Checks className="justify-center lg:justify-start" />
        </div>

        <div className="relative mx-auto w-full max-w-[520px] pl-10 sm:pl-20 pb-12">
          <div className="relative rounded-[36px] overflow-hidden aspect-[4/5] bg-l-card">
            <img
              src={heroPerson}
              alt="A woman at her table checking her phone, with a plate of waakye and a glass of water in front of her"
              className="absolute inset-0 w-full h-full object-cover object-[center_88%]"
              width="900"
              height="1350"
              fetchPriority="high"
            />
          </div>
          <div className="absolute left-0 bottom-0 rotate-[-5deg] z-10">
            <Phone label="Food log with Ghanaian meals" scale={0.55} className="sm:hidden"><FoodScreen /></Phone>
            <Phone label="Food log with Ghanaian meals" scale={0.7} className="hidden sm:block"><FoodScreen /></Phone>
          </div>
          <Chip {...MED_CHIP} className="right-[-6px] sm:right-[-28px] top-[8%] animate-float" />
          <Chip {...BP_CHIP} className="right-[-6px] sm:right-[-28px] top-[44%] animate-float [animation-delay:2s] hidden sm:flex" />
        </div>
      </div>
    </section>
  );
}

export default function LaunchHero({ variant = "centred" }) {
  return variant === "photo" ? <PhotoHero /> : <CentredHero />;
}
