import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import WaitlistForm from "../components/WaitlistForm";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";
import GDPCBadge from "../components/ui/GDPCBadge";
import { WaitlistProvider } from "../context/WaitlistContext";
import { diseasePrograms, trustedPartners } from "../data/content";

export default function Waitlist() {
  const [searchParams] = useSearchParams();
  const selectedSlug = searchParams.get("program");
  const programOptions = diseasePrograms.programs.map((program) => program.name);
  const selectedProgram =
    diseasePrograms.programs.find((program) => program.slug === selectedSlug)?.name || "";

  return (
    <WaitlistProvider>
      <div className="bg-base min-h-screen">
        <Helmet>
          <title>Join the Program Waitlist | BetterHealth Africa</title>
          <meta name="description" content="Join the BetterHealth condition program waitlist and tell us which program you want first: diabetes, hypertension, kidney, heart, liver, fertility, or PCOS." />
        </Helmet>
        <Nav />
        <main>
          {/* Hero section */}
          <section className="pt-[140px] pb-[80px] px-6 bg-base relative overflow-hidden">
            <GradientOrb color="green" size="600px" className="top-[-20%] right-[-15%]" />
            <GradientOrb color="blue" size="400px" className="bottom-[-15%] left-[-10%]" />

            <div className="max-w-[640px] mx-auto text-center relative z-10">
              <Reveal>
                <h1 className="text-[clamp(32px,5vw,52px)] font-extrabold text-text-primary font-heading leading-[1.1] mb-5">
                  Join the condition program <span className="text-primary italic">waitlist</span>.
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="text-lg leading-relaxed text-text-secondary mb-10 max-w-[480px] mx-auto font-body">
                  Tell us which program you want first. Each program will include doctor review, a personal nutritionist coach, and a wellness coach alongside the right tests for your condition.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <WaitlistForm
                  variant="light"
                  source="program-waitlist"
                  className="text-left"
                  interestOptions={programOptions}
                  interestLabel="Program interest"
                  interestPlaceholder="Select a program"
                  initialInterest={selectedProgram}
                  helperText="We will use this to decide which programs to launch first."
                />
              </Reveal>
            </div>
          </section>

          {/* Social proof + trust strip */}
          <section className="py-16 px-6 bg-section-alt border-t border-border">
            <div className="max-w-[640px] mx-auto text-center">
              <Reveal>
                <div className="flex items-center justify-center gap-3 mb-8">
                  <GDPCBadge />
                  <span className="text-[13px] text-text-muted font-body">Your health data is protected by law</span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="text-[11px] text-text-muted uppercase tracking-[0.12em] font-semibold mb-4">Our Partners</p>
                <div className="flex items-center justify-center gap-8 flex-wrap">
                  {trustedPartners.map((partner) => (
                    <span key={partner} className="text-sm font-bold text-text-muted font-heading tracking-tight">
                      {partner}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </WaitlistProvider>
  );
}
