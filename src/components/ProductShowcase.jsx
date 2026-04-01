import { CheckCircle } from "lucide-react";
import Reveal from "./ui/Reveal";
import PhoneMockup from "./ui/PhoneMockup";
import { showcaseFeatures } from "../data/content";

export default function ProductShowcase() {
  return (
    <section className="py-20 lg:py-[120px] px-6 bg-base relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto flex flex-wrap items-center gap-16 relative z-10">
        {/* Phone left */}
        <Reveal direction="left" className="flex-shrink-0 flex justify-center" style={{ flexBasis: "320px" }}>
          <PhoneMockup />
        </Reveal>

        {/* Copy right */}
        <div className="flex-1 min-w-[300px]" style={{ flexBasis: "400px" }}>
          <Reveal>
            <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">
              Your Health Dashboard
            </p>
            <h2 className="text-h2 font-extrabold text-text-primary font-heading tracking-tight mb-4">
              Your health,{" "}
              <span className="italic bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                in one place
              </span>
            </h2>
            <p className="text-[17px] leading-relaxed text-text-secondary font-body mb-8">
              Track every biomarker. Understand every result. See how your body changes over time with color-coded insights and personalized recommendations.
            </p>
          </Reveal>

          <div className="flex flex-col gap-4">
            {showcaseFeatures.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex gap-3.5 p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-200">
                  <div className="w-9 h-9 rounded-[10px] bg-primary-bg flex items-center justify-center shrink-0">
                    <CheckCircle size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-text-primary font-heading mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[13px] leading-relaxed text-text-secondary font-body m-0">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
