import { ArrowRight, FlaskConical, Stethoscope, Clock, ShieldCheck } from "lucide-react";
import Reveal from "./ui/Reveal";

const APP_URL = "https://app.betterhealth.africa";
const APP_JOIN_URL = "https://app.betterhealth.africa/join";

const valueProps = [
  {
    icon: FlaskConical,
    title: "Real lab results",
    desc: "Tests are processed by accredited partner laboratories — not estimates or guesses.",
  },
  {
    icon: Stethoscope,
    title: "Reviewed by clinicians",
    desc: "Every result is reviewed by a qualified clinician before it reaches you.",
  },
  {
    icon: Clock,
    title: "Results in 48–72 hours",
    desc: "Your full results land in your dashboard within 48–72 hours of collection.",
  },
  {
    icon: ShieldCheck,
    title: "Private & confidential",
    desc: "Your health data is encrypted and protected under Ghana's Data Protection Act.",
  },
];

// "About / purpose" section placed directly below the hero so a logged-out
// visitor (and Google's OAuth branding reviewer) can tell, without scrolling far
// and without any login wall, exactly what BetterHealth Africa does and that it's
// the same product behind the "Continue with Google" button in the app.
export default function PurposeIntro() {
  return (
    <section id="about" className="py-20 lg:py-[120px] px-6 bg-base">
      <div className="max-w-[900px] mx-auto text-center">
        <Reveal>
          <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">
            About BetterHealth Africa
          </p>
          <h2 className="text-h2 font-extrabold text-text-primary font-heading tracking-tight mb-6">
            Better health, made{" "}
            <span className="italic text-primary tracking-normal">accessible</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-lg leading-[1.75] text-text-secondary font-body max-w-[760px] mx-auto mb-4">
            BetterHealth Africa is a digital health platform that makes quality diagnostic
            testing and clinical guidance accessible across Africa. Patients can book lab
            tests, securely receive results reviewed by qualified clinicians, and get
            personalized guidance to understand and act on their health — all from their phone.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-[15px] leading-[1.7] text-text-muted font-body max-w-[680px] mx-auto mb-10">
            Create an account or sign in with email, phone, or Google to book a test and
            access your results at{" "}
            <a
              href={APP_URL}
              className="text-primary font-semibold no-underline hover:text-primary-dark transition-colors"
            >
              app.betterhealth.africa
            </a>
            .
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
            <a
              href={APP_JOIN_URL}
              className="inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3.5 text-[15px] font-bold font-heading bg-primary hover:bg-primary-dark text-white hover:-translate-y-0.5 hover:shadow-glow-green transition-all no-underline"
            >
              Create your account <ArrowRight size={18} />
            </a>
            <a
              href={APP_URL}
              className="inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3.5 text-[15px] font-bold font-heading bg-white border border-border text-text-primary hover:-translate-y-0.5 hover:shadow-md transition-all no-underline"
            >
              Sign in
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {valueProps.map((vp, i) => {
            const Icon = vp.icon;
            return (
              <Reveal key={vp.title} delay={0.25 + i * 0.08}>
                <div className="p-6 rounded-card bg-card border border-border h-full">
                  <div className="w-11 h-11 rounded-card bg-primary-bg flex items-center justify-center mb-4">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <h3 className="text-[16px] font-bold text-text-primary font-heading mb-2">
                    {vp.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-text-secondary font-body">
                    {vp.desc}
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
