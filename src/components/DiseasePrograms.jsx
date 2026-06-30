import {
  Check, ArrowRight,
  Droplet, Droplets, Activity, HeartPulse, Shield, Baby, Venus,
} from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "./ui/Reveal";
import { diseasePrograms } from "../data/content";

const ICONS = { Droplet, Droplets, Activity, HeartPulse, Shield, Baby, Venus };

export default function DiseasePrograms({ showHeader = true, compact = false }) {
  const { eyebrow, headline, body, programs, note, cta } = diseasePrograms;
  const list = compact ? programs.filter((p) => p.available) : programs;

  return (
    <section id="programs" className="py-16 lg:py-20 px-6 bg-base border-t border-border">
      <div className="max-w-[1100px] mx-auto">
        {showHeader && (
          <Reveal>
            <div className="text-center mb-10 max-w-[660px] mx-auto">
              <span className="inline-block text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-2">
                {eyebrow}
              </span>
              <h2 className="text-[1.7rem] md:text-[2rem] font-extrabold text-text-primary font-heading tracking-tight mb-2">
                {headline}
              </h2>
              <p className="text-[15px] text-text-secondary">{body}</p>
            </div>
          </Reveal>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 items-stretch">
          {list.map((p, i) => {
            const Icon = ICONS[p.icon] || Activity;
            return (
              <Reveal key={p.slug} delay={i * 0.06}>
                <div
                  className={`relative flex flex-col h-full rounded-card bg-card p-6 border transition-all duration-300 ${
                    p.available
                      ? "border-border hover:border-primary/30 hover:-translate-y-1 shadow-card"
                      : "border-border/60 opacity-75"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-card bg-primary-bg flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-primary" />
                    </span>
                    <h3 className="text-[18px] font-extrabold text-text-primary font-heading leading-tight">{p.name}</h3>
                  </div>

                  <p className="text-[13px] text-text-secondary mb-1">{p.tagline}</p>
                  <p className="text-[12px] text-text-muted mb-3">{p.forWho}</p>
                  <p className={`text-[18px] font-extrabold font-heading mb-4 ${p.available ? "text-primary" : "text-text-muted"}`}>
                    {p.price}
                  </p>

                  {p.includes.length > 0 && (
                    <ul className="flex flex-col gap-2 flex-1 mb-5">
                      {p.includes.map((it, ii) => (
                        <li key={ii} className="flex items-start gap-2 text-[13px] text-text-secondary">
                          <Check size={14} className="shrink-0 mt-0.5 text-primary" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {p.available ? (
                    <Link
                      to="/book"
                      className="mt-auto w-full py-3 rounded-btn text-[14px] font-bold font-heading text-center no-underline bg-primary hover:bg-primary-dark text-white transition-all hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
                    >
                      {cta} <ArrowRight size={15} />
                    </Link>
                  ) : (
                    <span className="mt-auto w-full py-3 rounded-btn text-[13px] font-bold font-heading text-center bg-section-alt text-text-muted border border-border">
                      Coming soon
                    </span>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="text-center text-[11px] text-text-muted mt-6 max-w-[640px] mx-auto">{note}</p>
      </div>
    </section>
  );
}
