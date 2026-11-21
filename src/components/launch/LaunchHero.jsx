import { Check } from "lucide-react";
import StoreButtons from "./StoreButtons";
import { Sky, ScanStage } from "./LaunchExtras";

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

/* Variant B: copy on the left, the photo scan on the right. */
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

        <ScanStage size="column" />
      </div>
    </section>
  );
}

export default function LaunchHero({ variant = "centred" }) {
  return variant === "photo" ? <PhotoHero /> : <CentredHero />;
}
