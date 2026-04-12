import Reveal from "./ui/Reveal";
import { founderQuote, founderStory } from "../data/content";
import founderPhoto from "../assets/founder.png";

export default function FounderStory() {
  return (
    <section id="about" className="py-20 lg:py-[120px] px-6 bg-section-alt">
      <div className="max-w-[900px] mx-auto flex flex-wrap items-center gap-12">
        {/* Founder avatar */}
        <Reveal direction="left" className="w-full sm:w-[280px] sm:flex-shrink-0 flex justify-center">
          <div className="w-[260px] h-[320px] rounded-card overflow-hidden shadow-card relative">
            <img
              src={founderPhoto}
              alt="Damzi — Founder & CEO, BetterHealth Africa"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/60 to-transparent text-center">
              <div className="text-white text-base font-bold font-heading">Damzi</div>
              <div className="text-white/70 text-xs">Founder & CEO</div>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="flex-1 w-full sm:w-auto min-w-0 sm:min-w-[280px] sm:basis-[400px]">
          <Reveal>
            <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">
              Our Mission
            </p>
            <h2 className="text-[clamp(24px,3.5vw,34px)] font-extrabold text-text-primary font-heading tracking-tight mb-5 leading-[1.2]">
              &ldquo;{founderQuote.split("I knew things needed to change")[0]}
              <span className="text-primary">I knew things needed to change</span>
              {founderQuote.split("I knew things needed to change")[1]}&rdquo;
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
