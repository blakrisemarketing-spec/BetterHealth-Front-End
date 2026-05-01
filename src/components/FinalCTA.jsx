import Reveal from "./ui/Reveal";
import GradientOrb from "./ui/GradientOrb";
import WaitlistForm from "./WaitlistForm";

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
            The test your{" "}
            <span className="italic text-primary-light">family</span>{" "}
            needs you to take.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-lg leading-relaxed text-text-muted-dark mb-4 max-w-[480px] mx-auto font-body">
            Your body is speaking. BetterHealth Africa helps you listen — before it&apos;s too late.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-sm text-text-muted-dark mb-8 max-w-[400px] mx-auto font-body">
            Be the first to know when we launch. No spam, ever.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <WaitlistForm variant="dark" source="final-cta" className="max-w-[520px] mx-auto" />
        </Reveal>
      </div>
    </section>
  );
}
