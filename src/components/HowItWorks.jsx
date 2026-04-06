import { Smartphone, Home, FlaskConical, BarChart3 } from "lucide-react";
import Reveal from "./ui/Reveal";
import { howItWorksSteps } from "../data/content";

const iconMap = {
  Smartphone: Smartphone,
  Home: Home,
  FlaskConical: FlaskConical,
  BarChart3: BarChart3,
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-[120px] px-6 bg-section-alt">
      <div className="max-w-[1280px] mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">
              How It Works
            </p>
            <h2 className="text-h2 font-extrabold text-text-primary font-heading tracking-tight">
              Four simple steps to{" "}
              <span className="italic bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent pr-[0.1em]">
                knowing your health
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorksSteps.map((step, i) => {
            const Icon = iconMap[step.icon];
            return (
              <Reveal key={i} delay={i * 0.12}>
                <div className="p-5 sm:p-8 rounded-card bg-card border border-border hover:border-primary/30 hover:shadow-glow-green hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group cursor-default h-full">
                  <span className="absolute top-4 right-5 text-[64px] font-extrabold text-text-primary/[0.04] font-heading leading-none">
                    {step.num}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-primary-bg flex items-center justify-center mb-4">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary font-heading mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-text-secondary font-body">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
