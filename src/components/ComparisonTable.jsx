import { Check, X } from "lucide-react";
import Reveal from "./ui/Reveal";
import { comparisonRows } from "../data/content";

export default function ComparisonTable() {
  return (
    <section className="py-20 lg:py-[120px] px-6 bg-base">
      <div className="max-w-[800px] mx-auto">
        <Reveal>
          <div className="text-center mb-8">
            <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">
              Why BetterHealth Africa
            </p>
            <h2 className="text-h2 font-extrabold text-text-primary font-heading tracking-tight">
              Not your average{" "}
              <span className="italic bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent tracking-normal">
                hospital checkup
              </span>
            </h2>
          </div>
        </Reveal>

        {/* Value Anchor — DEFECT 5 */}
        <Reveal delay={0.05}>
          <div className="text-center mb-10 px-4 py-5 rounded-2xl bg-primary-bg border border-primary/20">
            <p className="text-[17px] md:text-[20px] font-semibold text-text-primary leading-snug font-heading">
              What would cost{" "}
              <span className="text-primary font-extrabold">GHS 15,000+</span> at a private hospital is{" "}
              <span className="text-primary font-extrabold">GHS 247/month</span> with BetterHealth Africa
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
          <div className="rounded-card overflow-hidden border border-border shadow-card min-w-[340px]">
            {/* Header */}
            <div className="grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_120px_120px] bg-section-alt">
              <div className="p-3 sm:p-4" />
              <div className="p-3 sm:p-4 text-center">
                <span className="text-text-muted text-[11px] sm:text-[13px] font-semibold">Hospital Lab</span>
              </div>
              <div className="p-3 sm:p-4 text-center bg-gradient-to-b from-primary to-primary-dark">
                <span className="text-white text-[11px] sm:text-[13px] font-bold font-heading">BetterHealth Africa</span>
              </div>
            </div>

            {/* Rows */}
            {comparisonRows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_120px_120px] border-t border-border ${
                  i % 2 === 0 ? "bg-card" : "bg-section-alt"
                }`}
              >
                <div className="p-3 px-4 sm:p-3.5 sm:px-6 text-xs sm:text-sm font-medium text-text-primary font-body">
                  {row.feature}
                </div>
                <div className="p-3.5 flex justify-center items-center">
                  {row.hosp ? (
                    <div className="w-[18px] h-[18px] rounded-full bg-primary flex items-center justify-center">
                      <Check size={12} className="text-white" strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="w-[18px] h-[18px] rounded-full bg-section-alt border border-border flex items-center justify-center">
                      <X size={12} className="text-text-muted" strokeWidth={2} />
                    </div>
                  )}
                </div>
                <div className="p-3.5 flex justify-center items-center">
                  {row.bh ? (
                    <div className="w-[18px] h-[18px] rounded-full bg-primary flex items-center justify-center">
                      <Check size={12} className="text-white" strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="w-[18px] h-[18px] rounded-full bg-section-alt border border-border flex items-center justify-center">
                      <X size={12} className="text-text-muted" strokeWidth={2} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
