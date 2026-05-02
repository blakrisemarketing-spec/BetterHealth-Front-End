import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, MapPin } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";

const VALUES = [
  { title: "Mission first", body: "We are solving one of the most important health problems on the continent. Every decision is measured against the question: does this help more Ghanaians know their health?" },
  { title: "Small team, big impact", body: "We are a lean, high-output team. You will own your work, move fast, and see the direct results of what you build." },
  { title: "People over polish", body: "We care about real outcomes for real people. We would rather ship something useful than perfect something no one uses." },
];

const OPEN_ROLES = [
  // Intentionally empty for now — "no open positions" state rendered below
];

export default function CareersPage() {
  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Careers — BetterHealth Africa</title>
        <meta name="description" content="Join the BetterHealth Africa team. We're building the future of proactive healthcare in Ghana. See open roles and our company values." />
      </Helmet>
      <Nav />

      {/* Hero */}
      <section className="min-h-[50vh] flex items-center pt-[120px] pb-14 px-6 bg-base relative overflow-hidden">
        <GradientOrb color="green" size="540px" className="top-[-10%] right-[-8%]" />
        <div className="max-w-[720px] mx-auto text-center relative z-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-primary-bg border border-primary/25 text-primary text-xs font-bold font-heading tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
              Careers
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-[1.8rem] sm:text-[2.4rem] md:text-[3rem] font-extrabold font-heading leading-[1.08] text-text-primary mb-4">
              Build the future of{" "}
              <span className="text-primary italic tracking-normal">
                African healthcare.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-text-secondary font-body max-w-[560px] mx-auto">
              We are a small, ambitious team solving one of the most important problems on the continent. If you want to build something that genuinely matters — read on.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 bg-section-alt">
        <div className="max-w-[960px] mx-auto">
          <Reveal>
            <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-bold text-center mb-8">How we work</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="bg-white border border-border rounded-card p-7 hover:-translate-y-1 transition-all duration-300 hover:shadow-card">
                  <h3 className="text-[17px] font-bold text-text-primary font-heading mb-2">{v.title}</h3>
                  <p className="text-[14px] text-text-secondary leading-relaxed">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-20 px-6 bg-base">
        <div className="max-w-[760px] mx-auto">
          <Reveal>
            <h2 className="text-[1.7rem] font-extrabold text-text-primary font-heading text-center mb-8">Open Positions</h2>
          </Reveal>

          {OPEN_ROLES.length === 0 ? (
            <Reveal delay={0.1}>
              <div className="bg-section-alt border border-border rounded-card p-10 text-center">
                <div className="w-14 h-14 rounded-card bg-primary-bg border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Briefcase size={24} className="text-primary" />
                </div>
                <h3 className="text-[18px] font-bold text-text-primary font-heading mb-2">No open roles right now</h3>
                <p className="text-[14px] text-text-secondary leading-relaxed mb-6 max-w-[460px] mx-auto">
                  We are not actively hiring, but we are always interested in exceptional people. If BetterHealth excites you, send us a note.
                </p>
                <a
                  href="mailto:careers@betterhealth.africa"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-6 py-3.5 text-sm font-bold font-heading transition-all hover:-translate-y-0.5 no-underline"
                >
                  Send a note <ArrowRight size={15} />
                </a>
                <p className="text-[12px] text-text-muted mt-3">careers@betterhealth.africa</p>
              </div>
            </Reveal>
          ) : (
            <div className="flex flex-col gap-4">
              {OPEN_ROLES.map((role, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="bg-white border border-border rounded-card px-4 sm:px-6 py-5 flex items-center justify-between gap-4 hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer">
                    <div className="min-w-0">
                      <h3 className="text-[16px] font-bold text-text-primary font-heading">{role.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-[13px] text-text-muted flex-wrap">
                        <span className="flex items-center gap-1"><MapPin size={12} /> {role.location}</span>
                        <span className="bg-primary-bg text-primary px-2 py-0.5 rounded-full text-[11px] font-semibold">{role.type}</span>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-text-muted shrink-0" />
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 bg-primary relative overflow-hidden">
        <GradientOrb color="green" size="400px" className="top-[-20%] right-[-10%] opacity-30" />
        <div className="max-w-[520px] mx-auto text-center relative z-10">
          <Reveal>
            <h2 className="text-[2rem] md:text-[2.4rem] font-extrabold text-white font-heading tracking-tight mb-4">
              Interested in the mission?
            </h2>
            <p className="text-[16px] text-white/80 font-body mb-6">
              Even if we do not have a role that fits right now, we would love to hear from you.
            </p>
            <a
              href="mailto:careers@betterhealth.africa"
              className="inline-flex items-center gap-2 bg-white text-primary rounded-btn px-7 py-4 text-sm font-bold font-heading transition-all hover:-translate-y-0.5 hover:shadow-lg no-underline"
            >
              careers@betterhealth.africa <ArrowRight size={16} />
            </a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
