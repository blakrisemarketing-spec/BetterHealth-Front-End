import { Check, ShieldCheck } from "lucide-react";
import Reveal from "./ui/Reveal";
import { plans } from "../data/content";

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-[120px] px-6 bg-base relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto relative z-10">
        <Reveal>
          <div className="text-center mb-4">
            <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">
              Pricing
            </p>
            <h2 className="text-h2 font-extrabold text-text-primary font-heading tracking-tight">
              Plans for every Ghanaian
            </h2>
          </div>
        </Reveal>

        {/* Value anchor — DEFECT 6 */}
        <Reveal delay={0.05}>
          <div className="text-center mb-8 px-4 py-5 rounded-2xl bg-primary-bg border border-primary/20 max-w-[640px] mx-auto">
            <p className="text-[16px] md:text-[18px] font-semibold text-text-primary leading-snug font-heading">
              What would cost{" "}
              <span className="text-primary font-extrabold">GHS 15,000+</span> at a private hospital is{" "}
              <span className="text-primary font-extrabold">GHS 61/month</span> with BetterHealth Africa
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-center text-[17px] text-text-secondary font-body mb-12 max-w-[560px] mx-auto">
            Your health shouldn&apos;t depend on how much you can afford at a hospital. Choose the plan that works for you.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {plans.map((plan, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                className={`p-5 sm:p-8 rounded-card flex flex-col h-full transition-all duration-300 relative ${
                  plan.popular
                    ? "bg-card border-2 border-primary shadow-[0_20px_60px_rgba(13,148,136,0.12)] scale-[1.02]"
                    : "bg-card border border-border hover:-translate-y-1 hover:shadow-card hover:border-primary/20 shadow-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-primary-light px-5 py-1 rounded-pill text-xs font-bold text-white tracking-wider">
                    MOST POPULAR
                  </div>
                )}

                <h3 className="text-[22px] font-bold text-text-primary font-heading mb-1">
                  {plan.name}
                </h3>

                <div className="mb-2">
                  <span className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold text-text-primary font-heading tracking-tight">
                    GHS {plan.price}
                  </span>
                  <span className="text-[15px] text-text-muted">/month</span>
                </div>

                {/* Per-day equivalent — DEFECT 6 */}
                <div className="mb-1 flex flex-col gap-0.5">
                  <span className="text-[15px] font-semibold text-primary">
                    GHS {plan.daily}/day
                  </span>
                  <div className="text-[13px] text-text-muted">
                    GHS {plan.annual}/year
                  </div>
                </div>

                <div className="mb-4">
                  <span className="inline-block text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-pill">
                    Billed annually
                  </span>
                </div>

                {plan.categories ? (
                  <div className="flex flex-col gap-4 mb-7 flex-1">
                    {plan.categories.map((cat, ci) => (
                      <div key={ci}>
                        <p className="text-[11px] font-bold text-primary uppercase tracking-[0.1em] mb-2">{cat.name}</p>
                        <div className="flex flex-col gap-2">
                          {cat.tests.map((test, ti) => (
                            <div key={ti} className="flex gap-2.5 items-start">
                              <div className="w-[18px] h-[18px] rounded-full bg-primary flex items-center justify-center mt-0.5 shrink-0">
                                <Check size={12} className="text-white" strokeWidth={3} />
                              </div>
                              <span className="text-sm text-text-secondary leading-relaxed">{test}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 mb-7 flex-1">
                    {plan.features.map((f, fi) => (
                      <div key={fi} className="flex gap-2.5 items-start">
                        <div className="w-[18px] h-[18px] rounded-full bg-primary flex items-center justify-center mt-0.5 shrink-0">
                          <Check size={12} className="text-white" strokeWidth={3} />
                        </div>
                        <span className="text-sm text-text-secondary leading-relaxed">{f}</span>
                      </div>
                    ))}
                  </div>
                )}

                <a
                  href="#waitlist"
                  onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`w-full py-4 rounded-btn text-[15px] font-bold font-heading cursor-pointer transition-all hover:-translate-y-0.5 no-underline text-center block ${
                    plan.popular
                      ? "bg-gradient-to-r from-primary to-primary-light text-white"
                      : "bg-section-alt text-text-primary hover:bg-primary-bg hover:text-primary border border-border"
                  }`}
                >
                  Join Waitlist
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Trust badges — DEFECT 6 */}
        <Reveal delay={0.3}>
          <div className="text-center mt-10 flex justify-center gap-6 flex-wrap">
            {[
              { icon: "📱", label: "Mobile Money Accepted" },
              { icon: "🔒", label: "Paystack Secured" },
              { icon: "✓", label: "Cancel Anytime" },
            ].map((badge) => (
              <span key={badge.label} className="text-[14px] text-text-secondary font-medium flex items-center gap-2 px-4 py-2 rounded-pill border border-border bg-card">
                <span>{badge.icon}</span>
                {badge.label}
              </span>
            ))}
            <span className="text-[14px] text-primary font-medium flex items-center gap-2 px-4 py-2 rounded-pill border border-primary/25 bg-primary-bg">
              <ShieldCheck size={16} />
              GDPC Certified
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
