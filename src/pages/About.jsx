import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Eye, Globe, ExternalLink } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";
import { aboutPage } from "../data/content";

const VALUE_ICONS = { ShieldCheck, Eye, Globe };

const YEAR_COLORS = {
  "2026": "bg-primary text-white",
  "2027": "bg-primary/70 text-white",
  "2028": "bg-primary/40 text-white",
};

// Initials avatar for advisors (no photos yet)
function AdvisorCard({ advisor, index }) {
  const initials = advisor.name.replace(/Dr\.|PhD|BSc|MSc|MBChB|FWACP|,/g, "").trim().split(" ").filter(Boolean).map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const colors = ["from-teal-400 to-emerald-500", "from-blue-400 to-cyan-500", "from-purple-400 to-violet-500"];
  return (
    <Reveal delay={index * 0.08}>
      <div className="bg-white/60 backdrop-blur-sm border border-border rounded-card p-6 text-center hover:-translate-y-1 transition-all duration-300 hover:shadow-card">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors[index % colors.length]} flex items-center justify-center mx-auto mb-4`}>
          <span className="text-white font-bold text-xl font-heading">{initials || "?"}</span>
        </div>
        <p className="text-[15px] font-bold text-text-primary font-heading">{advisor.name}</p>
        <p className="text-[13px] text-primary font-semibold mt-0.5">{advisor.title}</p>
        <p className="text-[12px] text-text-muted mt-0.5">{advisor.institution}</p>
        <p className="text-[13px] text-text-secondary mt-2 leading-relaxed">{advisor.bio}</p>
      </div>
    </Reveal>
  );
}

export default function AboutPage() {
  const { hero, problem, founder, values, howWeWork, partners, advisory, roadmap, joinUs, bottomCta } = aboutPage;

  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Nav />

      {/* ── Hero ── */}
      <section className="min-h-[60vh] flex items-center pt-[80px] md:pt-[120px] pb-16 px-6 bg-base relative overflow-hidden">
        <GradientOrb color="green" size="600px" className="top-[-10%] right-[-8%]" />
        <GradientOrb color="blue" size="360px" className="bottom-[-10%] left-[-5%]" />
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-primary-bg border border-primary/25 text-primary text-xs font-bold font-heading tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
              {hero.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-[2.4rem] md:text-[3.2rem] font-extrabold font-heading leading-[1.1] text-text-primary mb-5">
              We believe Africans deserve to know their health —{" "}
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent italic tracking-normal">
                not after illness strikes, but before.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-text-secondary max-w-[640px] mx-auto font-body">
              {hero.subheadline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── The Problem ── */}
      <section className="py-20 lg:py-[100px] px-6 bg-section-alt">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <Reveal>
              <div>
                <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">The Problem</p>
                <h2 className="text-[1.9rem] md:text-[2.3rem] font-extrabold text-text-primary font-heading tracking-tight leading-[1.1] mb-6">
                  {problem.headline}
                </h2>
                {problem.body.map((para, i) => (
                  <p key={i} className="text-[15px] text-text-secondary leading-relaxed mb-4 font-body last:mb-0 last:font-semibold last:text-text-primary">
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 gap-3">
                {problem.stats.map((stat, i) => (
                  <div key={i} className="bg-white/70 backdrop-blur-sm border border-border rounded-xl px-5 py-4 flex items-center gap-4">
                    <span className="text-[1.6rem] font-extrabold text-primary font-heading shrink-0 min-w-[56px]">{stat.value}</span>
                    <span className="text-[14px] text-text-secondary leading-snug">{stat.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Founder Story ── */}
      <section className="py-20 lg:py-[100px] px-6 bg-base">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Photo side */}
            <Reveal className="lg:col-span-2">
              <div className="sticky top-[100px]">
                <div className="w-full aspect-square max-w-[340px] mx-auto lg:mx-0 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/15 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                    <span className="text-white font-extrabold text-4xl font-heading">D</span>
                  </div>
                  <div className="text-center px-6">
                    <p className="text-[17px] font-bold text-text-primary font-heading">{founder.attribution}</p>
                    <p className="text-[13px] text-text-muted mt-1">{founder.title}</p>
                  </div>
                  {/* Decorative orb */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-primary/8 blur-2xl" />
                </div>
              </div>
            </Reveal>

            {/* Narrative side */}
            <div className="lg:col-span-3">
              <Reveal>
                <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">{founder.sectionLabel}</p>
              </Reveal>
              {founder.narrative.map((para, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className={`leading-relaxed mb-5 font-body ${para === "BetterHealth was born from that gap." || para === "We're just getting started." ? "text-[17px] font-bold text-text-primary italic" : "text-[16px] text-text-secondary"}`}>
                    {para}
                  </p>
                </Reveal>
              ))}
              <Reveal delay={0.3}>
                <div className="border-l-4 border-primary pl-5 mt-6">
                  <p className="text-[15px] font-bold text-text-primary">— {founder.attribution}</p>
                  <p className="text-[13px] text-text-muted">{founder.title}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 lg:py-[100px] px-6 bg-section-alt">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">Our Values</p>
              <h2 className="text-[1.9rem] md:text-[2.3rem] font-extrabold text-text-primary font-heading tracking-tight">
                {values.headline}
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {values.items.map((v, i) => {
              const Icon = VALUE_ICONS[v.icon] || ShieldCheck;
              return (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="bg-white/60 backdrop-blur-sm border border-border rounded-card p-7 hover:-translate-y-1 transition-all duration-300 hover:shadow-card hover:border-primary/20">
                    <div className="w-11 h-11 rounded-xl bg-primary-bg border border-primary/20 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-primary" />
                    </div>
                    <h3 className="text-[17px] font-bold text-text-primary font-heading mb-2">{v.title}</h3>
                    <p className="text-[14px] text-text-secondary leading-relaxed font-body">{v.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How We Work ── */}
      <section className="py-20 lg:py-[100px] px-6 bg-base">
        <div className="max-w-[760px] mx-auto text-center">
          <Reveal>
            <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">How We Work</p>
            <h2 className="text-[1.9rem] md:text-[2.3rem] font-extrabold text-text-primary font-heading tracking-tight mb-8">
              {howWeWork.headline}
            </h2>
          </Reveal>
          {howWeWork.body.map((para, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p className={`text-[16px] leading-relaxed font-body mb-4 ${i === howWeWork.body.length - 1 ? "font-semibold text-text-primary italic" : "text-text-secondary"}`}>
                {para}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Partners ── */}
      <section className="py-20 px-6 bg-section-alt">
        <div className="max-w-[1000px] mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">Our Partners</p>
              <h2 className="text-[1.9rem] md:text-[2.3rem] font-extrabold text-text-primary font-heading tracking-tight">
                {partners.headline}
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {partners.items.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="bg-white/70 backdrop-blur-sm border border-border rounded-card p-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-card">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-bg border border-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold text-sm font-heading">{p.name[0]}</span>
                    </div>
                    <span className="text-[15px] font-bold text-text-primary font-heading">{p.name}</span>
                  </div>
                  <p className="text-[13px] text-text-secondary leading-relaxed">{p.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Medical Advisory ── */}
      <section className="py-20 lg:py-[100px] px-6 bg-base">
        <div className="max-w-[1000px] mx-auto">
          <Reveal>
            <div className="text-center mb-4">
              <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">Medical Advisory</p>
              <h2 className="text-[1.9rem] md:text-[2.3rem] font-extrabold text-text-primary font-heading tracking-tight mb-3">
                {advisory.headline}
              </h2>
              <p className="text-[15px] text-text-secondary max-w-[600px] mx-auto">{advisory.body}</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
            {advisory.advisors.map((a, i) => <AdvisorCard key={i} advisor={a} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── Roadmap ── */}
      <section className="py-20 lg:py-[100px] px-6 bg-bg-dark">
        <div className="max-w-[760px] mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">Roadmap</p>
              <h2 className="text-[1.9rem] md:text-[2.3rem] font-extrabold text-white font-heading tracking-tight mb-3">
                {roadmap.headline}
              </h2>
              <p className="text-[15px] text-text-muted-dark">{roadmap.intro}</p>
            </div>
          </Reveal>
          <div className="flex flex-col gap-3 mb-8">
            {roadmap.milestones.map((m, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-3.5">
                  <span className={`text-[12px] font-bold px-2.5 py-1 rounded-lg shrink-0 ${YEAR_COLORS[m.year] || "bg-primary/30 text-white"}`}>
                    {m.year}
                  </span>
                  <span className="text-[14px] text-white/80">{m.text}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="text-center text-[15px] text-white/70 italic leading-relaxed font-body">{roadmap.closing}</p>
          </Reveal>
        </div>
      </section>

      {/* ── Join Us ── */}
      <Reveal>
        <section className="py-16 px-6 bg-base">
          <div className="max-w-[640px] mx-auto text-center">
            <div className="bg-white/70 backdrop-blur-sm border border-border rounded-card p-10 shadow-sm">
              <h2 className="text-[1.6rem] font-extrabold text-text-primary font-heading mb-3">{joinUs.headline}</h2>
              <p className="text-[15px] text-text-secondary leading-relaxed mb-6 font-body">{joinUs.body}</p>
              <a
                href="mailto:careers@betterhealth.africa"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-7 py-3.5 text-sm font-bold font-heading transition-all hover:-translate-y-0.5 no-underline"
              >
                {joinUs.cta} <ExternalLink size={15} />
              </a>
              <p className="text-[12px] text-text-muted mt-4">{joinUs.fallback}</p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Bottom CTA ── */}
      <section className="py-20 lg:py-[100px] px-6 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
        <GradientOrb color="green" size="500px" className="top-[-20%] right-[-10%] opacity-30" />
        <div className="max-w-[560px] mx-auto text-center relative z-10">
          <Reveal>
            <h2 className="text-[2.2rem] md:text-[2.8rem] font-extrabold text-white font-heading tracking-tight mb-4">
              {bottomCta.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[17px] text-white/80 leading-relaxed font-body mb-8">{bottomCta.body}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              to="/#pricing"
              className="inline-flex items-center gap-2 bg-white text-primary rounded-btn px-8 py-4 text-base font-bold font-heading transition-all hover:-translate-y-0.5 hover:shadow-lg no-underline"
            >
              {bottomCta.cta} <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
