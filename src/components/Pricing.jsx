import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "./ui/Reveal";
import { testPanels } from "../data/content";
import { usePricingCatalogue, withBackendPanelPrice } from "../lib/pricing-catalogue";

const comparisonPoints = [
  "Full-body BetterHealth check in one booking",
  "Doctor-reviewed results in your dashboard",
  "Plain explanations for each key health indicator",
  "Clear price before you pay",
];

export default function Pricing() {
  const backendPrices = usePricingCatalogue();
  const panorama = withBackendPanelPrice(
    testPanels.find((panel) => panel.slug === "panorama"),
    backendPrices,
  );

  return (
    <section id="pricing" className="py-20 lg:py-[120px] px-6 bg-base relative overflow-hidden">
      <div className="max-w-[980px] mx-auto relative z-10">
        <Reveal>
          <div className="text-center mb-10 max-w-[680px] mx-auto">
            <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">
              Pricing
            </p>
            <h2 className="text-h2 font-extrabold text-text-primary font-heading tracking-tight">
              Start with the test you need.
            </h2>
            <p className="text-[16px] text-text-secondary leading-relaxed mt-4">
              Book once, get doctor-reviewed results, and decide what to track next after you understand what is happening inside your body.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] rounded-card border border-border bg-card overflow-hidden shadow-card">
            <div className="p-7 sm:p-9 bg-primary text-white flex flex-col justify-between">
              <div>
                <span className="inline-flex rounded-pill bg-white/15 border border-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] mb-5">
                  Popular benchmark
                </span>
                <h3 className="text-[28px] sm:text-[34px] font-extrabold font-heading leading-tight mb-3">
                  {panorama?.name || "Panorama"}
                </h3>
                <p className="text-white/82 text-[15px] leading-relaxed mb-7">
                  {panorama?.why || "Our most complete full-body check for adults who want a clear baseline."}
                </p>
              </div>

              <div>
                <p className="text-[13px] text-white/70 mb-1">Current panel price</p>
                <p className="text-[34px] sm:text-[42px] font-extrabold font-heading leading-none">
                  {panorama?.price || "GHS 1,100"}
                </p>
                <p className="text-[12px] text-white/70 mt-2">Prices exclude VAT. Final price is shown before payment.</p>
              </div>
            </div>

            <div className="p-7 sm:p-9 flex flex-col">
              <h3 className="text-[22px] font-extrabold text-text-primary font-heading mb-3">
                Use Panorama as your full-body comparison point.
              </h3>
              <p className="text-[15px] text-text-secondary leading-relaxed mb-6">
                Compare it with a broad private-hospital checkup, or choose a smaller focused panel if you already know the concern you want to check.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {comparisonPoints.map((point) => (
                  <li key={point} className="flex gap-2.5 text-[14px] text-text-secondary leading-relaxed">
                    <Check size={16} className="text-primary shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col sm:flex-row gap-3">
                <Link
                  to="/book-tests/panorama"
                  className="inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3.5 text-[15px] font-bold font-heading bg-primary hover:bg-primary-dark text-white hover:-translate-y-0.5 hover:shadow-glow-green transition-all no-underline"
                >
                  Book Panorama <ArrowRight size={18} />
                </Link>
                <Link
                  to="/book-tests"
                  className="inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3.5 text-[15px] font-bold font-heading bg-section-alt border border-border text-text-primary hover:text-primary hover:-translate-y-0.5 hover:shadow-md transition-all no-underline"
                >
                  Browse tests
                </Link>
              </div>

              <div className="mt-6 flex items-center gap-2 text-[13px] text-text-muted">
                <ShieldCheck size={16} className="text-primary shrink-0" />
                Mobile Money and Paystack payments are supported.
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
