import { ArrowRight } from "lucide-react";
import Reveal from "./ui/Reveal";
import GradientOrb from "./ui/GradientOrb";

export default function FinalCTA() {
  return (
    <section className="py-[120px] px-6 bg-bg-dark relative overflow-hidden text-center">
      {/* Orb */}
      <GradientOrb color="green" size="800px" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-[700px] mx-auto relative z-10">
        <Reveal>
          <h2 className="text-[clamp(32px,5vw,52px)] font-extrabold text-text-on-dark font-heading leading-[1.15] mb-5">
            Preventable doesn&apos;t mean{" "}
            <span className="italic text-primary-light">inevitable.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-lg leading-relaxed text-text-muted-dark mb-10 max-w-[480px] mx-auto font-body">
            Your body is speaking. BetterHealth Africa helps you listen — before it&apos;s too late.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <button className="bg-gradient-to-r from-primary to-primary-light text-white border-none rounded-[14px] px-10 py-[18px] min-h-[44px] text-[17px] font-bold font-heading cursor-pointer shadow-[0_4px_30px_rgba(13,148,136,0.35)] hover:shadow-[0_8px_40px_rgba(13,148,136,0.5)] transition-all hover:-translate-y-1 hover:scale-[1.02] inline-flex items-center gap-2.5">
            Start Your Health Check <ArrowRight size={20} />
          </button>
          <p className="mt-4 text-sm text-text-muted-dark">
            Results in 48 hours. Cancel anytime. Mobile Money accepted.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
