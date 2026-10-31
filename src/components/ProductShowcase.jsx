import { CheckCircle } from "lucide-react";
import Reveal from "./ui/Reveal";
import PhoneFrame from "./ui/PhoneFrame";
import { showcaseFeatures } from "../data/content";
import { APP_SCREENS } from "./app/screens";

const phoneScreens = [APP_SCREENS.results];

export default function ProductShowcase() {
  return (
    <section className="py-20 lg:py-[120px] px-6 bg-base relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto flex flex-wrap items-center gap-16 relative z-10">
        {/* Phone left */}
        <Reveal direction="left" className="w-full sm:w-[320px] sm:flex-shrink-0 flex justify-center">
          <PhoneFrame screens={phoneScreens} interval={3500} />
        </Reveal>

        {/* Copy right */}
        <div className="flex-1 w-full sm:w-auto min-w-0 sm:min-w-[300px] sm:basis-[400px]">
          <Reveal>
            <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">
              Lab tests, in the same app
            </p>
            <h2 className="text-h2 font-extrabold text-text-primary font-heading tracking-tight mb-5 leading-[1.1]">
              Lab results in{" "}
              <span className="italic text-primary tracking-normal pr-[0.12em]">
                plain words
              </span>
            </h2>
            <p className="text-[17px] leading-[1.7] text-text-secondary font-body mb-8">
              Book a test in the app, give your sample at home or at a partner lab, and get your results in 48 to 72 hours. A clinician reads every result before you see it. Each one sits next to its normal range with a plain explanation, and next to the readings and habits you track every day.
            </p>
          </Reveal>

          <div className="flex flex-col gap-4">
            {showcaseFeatures.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex gap-3.5 p-4 rounded-card bg-card border border-border hover:border-primary/30 transition-all duration-200">
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
