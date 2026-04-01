import Reveal from "./ui/Reveal";
import { founderQuote, founderStory } from "../data/content";

export default function FounderStory() {
  return (
    <section id="about" className="py-20 lg:py-[120px] px-6 bg-section-alt">
      <div className="max-w-[900px] mx-auto flex flex-wrap items-center gap-12">
        {/* Founder avatar */}
        <Reveal direction="left" className="flex-shrink-0 flex justify-center" style={{ flexBasis: "280px" }}>
          <div className="w-[260px] h-[320px] rounded-card bg-gradient-to-b from-section-alt to-card border border-border flex flex-col items-center justify-center relative overflow-hidden shadow-card">
            <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center relative z-10 mb-6">
              <span className="text-white text-5xl font-extrabold font-heading">D</span>
            </div>

            <div className="text-center relative z-10">
              <div className="text-text-primary text-base font-bold font-heading">Damzi</div>
              <div className="text-text-muted text-xs">Founder & CEO</div>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="flex-1 min-w-[280px]" style={{ flexBasis: "400px" }}>
          <Reveal>
            <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">
              Our Mission
            </p>
            <h2 className="text-[clamp(24px,3.5vw,34px)] font-extrabold text-text-primary font-heading tracking-tight mb-5 leading-[1.2]">
              &ldquo;{founderQuote.split("Africans deserve to know their health")[0]}
              <span className="text-primary">Africans deserve to know their health</span>
              {founderQuote.split("Africans deserve to know their health")[1]}&rdquo;
            </h2>

            {founderStory.map((p, i) => (
              <p key={i} className="text-base leading-[1.8] text-text-secondary font-body mb-4">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
