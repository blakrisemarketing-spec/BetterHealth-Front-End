import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "./ui/Reveal";
import { screeningBundles } from "../data/content";

export default function ScreeningBundles() {
  const { eyebrow, headline, body, bundles, note, cta } = screeningBundles;

  return (
    <section id="bundles" className="py-16 lg:py-20 px-6 bg-section-alt border-t border-border">
      <div className="max-w-[1100px] mx-auto">
        <Reveal>
          <div className="text-center mb-10 max-w-[640px] mx-auto">
            <span className="inline-block text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-2">
              {eyebrow}
            </span>
            <h2 className="text-[1.7rem] md:text-[2rem] font-extrabold text-text-primary font-heading tracking-tight mb-2">
              {headline}
            </h2>
            <p className="text-[15px] text-text-secondary">{body}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 items-stretch">
          {bundles.map((b, i) => (
            <Reveal key={b.name} delay={i * 0.08}>
              <div
                className={`relative flex flex-col h-full rounded-card bg-card p-6 transition-all duration-300 hover:-translate-y-1 ${
                  b.popular
                    ? "border-2 border-primary shadow-[0_20px_60px_rgba(13,148,136,0.12)]"
                    : "border border-border hover:border-primary/20 shadow-card"
                }`}
              >
                {b.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-extrabold tracking-[0.14em] px-4 py-1 rounded-pill font-heading">
                    MOST POPULAR
                  </div>
                )}

                <h3 className="text-[19px] font-extrabold text-text-primary font-heading mb-1">{b.name}</h3>
                <p className="text-[13px] text-text-muted leading-snug mb-3">{b.tagline}</p>
                <p className="text-[22px] font-extrabold text-primary font-heading mb-4">{b.price}</p>

                <ul className="flex flex-col gap-2 flex-1 mb-5">
                  {b.includes.map((it, ii) => (
                    <li key={ii} className="flex items-start gap-2 text-[13px] text-text-secondary">
                      <Check size={14} className="shrink-0 mt-0.5 text-primary" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/book"
                  className={`w-full py-3 rounded-btn text-[14px] font-bold font-heading text-center no-underline transition-all hover:-translate-y-0.5 block ${
                    b.popular
                      ? "bg-primary hover:bg-primary-dark text-white"
                      : "bg-section-alt border border-border hover:border-primary/30 text-text-primary hover:text-primary"
                  }`}
                >
                  {cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="text-center text-[11px] text-text-muted mt-6">{note}</p>
      </div>
    </section>
  );
}
