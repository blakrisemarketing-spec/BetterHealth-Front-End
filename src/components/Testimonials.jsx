import { Star } from "lucide-react";
import Reveal from "./ui/Reveal";
import Badge from "./ui/Badge";
import { testimonials } from "../data/content";

export default function Testimonials() {
  return (
    <section id="stories" className="py-20 lg:py-[120px] px-6 bg-section-alt">
      <div className="max-w-[1280px] mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">
              Real Stories
            </p>
            <h2 className="text-h2 font-extrabold text-text-primary font-heading tracking-tight">
              Discoveries that{" "}
              <span className="italic bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent tracking-normal">
                changed lives
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div className="p-5 sm:p-8 rounded-card bg-card border border-border hover:border-primary/30 hover:-translate-y-1 hover:shadow-glow-green transition-all duration-300 flex flex-col gap-5 h-full shadow-card">
                <Badge variant="danger">
                  Discovered: {t.discovery}
                </Badge>

                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} fill="#f59e0b" className="text-warning" />
                  ))}
                </div>

                <p className="text-[15px] leading-relaxed text-text-primary italic font-body flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-base font-heading">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-text-primary font-heading">
                      {t.name}
                    </div>
                    <div className="text-[13px] text-text-muted">
                      {t.age ? `Age ${t.age} · ` : ""}{t.location}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
