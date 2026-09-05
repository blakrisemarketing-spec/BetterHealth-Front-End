import Reveal from "./ui/Reveal";
import { founderQuote, founderStory } from "../data/content";
import founderPhoto from "../assets/founder.webp";

// The clause we tint sage inside the mission quote. It must appear verbatim in
// `founderQuote`; if the copy is reworded and this is not updated, we fall back
// to rendering the quote untinted rather than emitting the phrase twice, which
// is what happened when the quote changed to "had to change" and this string
// still said "needed to change".
const HIGHLIGHT = "I knew things had to change";

function splitQuote(quote) {
  const at = quote.indexOf(HIGHLIGHT);
  if (at === -1) return { before: quote, highlight: null, after: "" };
  return {
    before: quote.slice(0, at),
    highlight: HIGHLIGHT,
    after: quote.slice(at + HIGHLIGHT.length),
  };
}

export default function FounderStory() {
  const { before, highlight, after } = splitQuote(founderQuote);
  return (
    <section id="about" className="py-20 lg:py-[120px] px-6 bg-section-alt">
      <div className="max-w-[900px] mx-auto flex flex-wrap items-center gap-12">
        {/* Founder avatar */}
        <Reveal direction="left" className="w-full sm:w-[280px] sm:flex-shrink-0 flex justify-center">
          <div className="w-[260px] h-[320px] rounded-card overflow-hidden shadow-card relative">
            <img
              src={founderPhoto}
              alt="Damzi, Founder and CEO, BetterHealth Africa"
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
              &ldquo;{before}
              {highlight && <span className="text-primary">{highlight}</span>}
              {after}&rdquo;
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
