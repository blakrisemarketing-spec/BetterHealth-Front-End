import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronDown, Lightbulb,
  Heart, Activity, Droplets, Gauge, Waves, Sun, Droplet, Radio,
  Check,
} from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";
import { whatWeTestPage } from "../data/content";

const SYSTEM_ICONS = { Heart, Activity, Droplets, Gauge, Waves, Sun, Droplet, Radio };

const SYSTEM_COLORS = [
  "from-red-400/20 to-rose-400/10 border-red-200",
  "from-amber-400/20 to-yellow-400/10 border-amber-200",
  "from-blue-400/20 to-cyan-400/10 border-blue-200",
  "from-orange-400/20 to-amber-400/10 border-orange-200",
  "from-purple-400/20 to-violet-400/10 border-purple-200",
  "from-yellow-400/20 to-lime-400/10 border-yellow-200",
  "from-rose-400/20 to-pink-400/10 border-rose-200",
  "from-teal-400/20 to-emerald-400/10 border-teal-200",
];

const ICON_COLORS = [
  "bg-red-50 text-red-500",
  "bg-amber-50 text-amber-600",
  "bg-blue-50 text-blue-500",
  "bg-orange-50 text-orange-500",
  "bg-purple-50 text-purple-500",
  "bg-yellow-50 text-yellow-600",
  "bg-rose-50 text-rose-500",
  "bg-teal-50 text-teal-600",
];

function SystemCard({ system, index }) {
  const [open, setOpen] = useState(false);
  const Icon = SYSTEM_ICONS[system.icon] || Heart;

  return (
    <Reveal delay={index * 0.05}>
      <div className={`rounded-card border bg-primary-bg ${SYSTEM_COLORS[index % SYSTEM_COLORS.length]} overflow-hidden`}>
        {/* Header — always visible */}
        <button
          className="w-full text-left p-6 flex items-start gap-4 cursor-pointer bg-transparent border-none"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          <div className={`w-12 h-12 rounded-card flex items-center justify-center shrink-0 mt-0.5 ${ICON_COLORS[index % ICON_COLORS.length]}`}>
            <Icon size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[18px] font-bold text-text-primary font-heading">{system.name}</h3>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-bold text-primary bg-primary-bg border border-primary/20 rounded-pill px-3 py-1">
                  {system.count} markers
                </span>
                <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-text-muted"
                >
                  <ChevronDown size={18} />
                </motion.span>
              </div>
            </div>
            <p className="text-[14px] text-text-secondary mt-1.5 leading-relaxed line-clamp-2">{system.why}</p>
          </div>
        </button>

        {/* Expanded content */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 flex flex-col gap-5">
                {/* Why it matters — full */}
                <p className="text-[14px] text-text-secondary leading-relaxed">{system.why}</p>

                {/* Markers list */}
                <div>
                  <p className="text-[11px] font-bold text-text-muted uppercase tracking-[0.12em] mb-3">Biomarkers tested</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {system.markers.map((m, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center mt-0.5 shrink-0">
                          <Check size={10} className="text-white" strokeWidth={3} />
                        </div>
                        <div>
                          <span className="text-[13px] font-semibold text-text-primary">{m.name}</span>
                          {m.note && (
                            <span className="text-[12px] text-text-muted ml-1">— {m.note}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Callout */}
                {system.callout && (
                  <div className="bg-white border border-primary/15 rounded-card p-4 flex gap-3">
                    <Lightbulb size={18} className="text-primary shrink-0 mt-0.5" />
                    <p className="text-[13px] text-text-secondary leading-relaxed m-0">{system.callout}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export default function WhatWeTestPage() {
  const { hero, systems, planTable, bottomCta } = whatWeTestPage;

  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Helmet>
        <title>What We Test — BetterHealth Africa</title>
        <meta name="description" content="Explore 100+ biomarkers across 8 body systems — heart, liver, kidneys, hormones, blood, immunity, metabolism, and more. Know your full health picture." />
        <link rel="canonical" href="https://www.betterhealth.africa/what-we-test" />
        <meta property="og:url" content="https://www.betterhealth.africa/what-we-test" />
        <meta property="og:title" content="What We Test — BetterHealth Africa" />
        <meta property="og:description" content="Explore 100+ biomarkers across 8 body systems — heart, liver, kidneys, hormones, blood, immunity, metabolism, and more. Know your full health picture." />
      </Helmet>
      <Nav />
      <main>

      {/* ── Hero ── */}
      <section className="min-h-[60vh] flex items-center pt-[80px] md:pt-[120px] pb-16 px-6 bg-base relative overflow-hidden">
        <GradientOrb color="green" size="600px" className="top-[-10%] right-[-10%]" />
        <GradientOrb color="blue" size="400px" className="bottom-[-10%] left-[-5%]" />
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-primary-bg border border-primary/25 text-primary text-xs font-bold font-heading tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
              {hero.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-[2.6rem] md:text-[3.4rem] font-extrabold font-heading leading-[1.08] text-text-primary mb-5">
              <span className="text-primary">
                127+ biomarkers.
              </span>{" "}
              8 body systems.{" "}
              <span className="italic">One clear picture.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-text-secondary max-w-[660px] mx-auto mb-4 font-body">
              {hero.subheadline}
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="text-[14px] text-text-muted max-w-[580px] mx-auto mb-8 font-body">
              {hero.intro}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <a
              href="https://app.betterhealth.africa/join"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-8 py-4 text-base font-bold font-heading transition-all hover:-translate-y-0.5 no-underline"
            >
              {hero.cta} <ArrowRight size={18} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── Systems Grid ── */}
      <section className="py-16 lg:py-20 px-6 bg-section-alt">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-2">8 Body Systems</p>
              <h2 className="text-[1.8rem] md:text-[2.2rem] font-extrabold text-text-primary font-heading tracking-tight">
                Click any system to see every biomarker
              </h2>
            </div>
          </Reveal>
          <div className="flex flex-col gap-4">
            {systems.map((system, i) => (
              <SystemCard key={system.name} system={system} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Plan Comparison Table ── */}
      <section className="py-20 lg:py-[100px] px-6 bg-base">
        <div className="max-w-[900px] mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-2">Plan Comparison</p>
              <h2 className="text-[1.8rem] md:text-[2.2rem] font-extrabold text-text-primary font-heading tracking-tight mb-2">
                {planTable.headline}
              </h2>
              <p className="text-[15px] text-text-secondary">{planTable.subheadline}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-x-auto rounded-card border border-border shadow-sm">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-section-alt">
                    <th className="text-left px-5 py-4 font-bold text-text-primary font-heading border-b border-border">Body System</th>
                    <th className="text-center px-4 py-4 font-bold text-text-primary font-heading border-b border-border">
                      <div className="text-[11px] text-text-muted font-normal mb-0.5">FROM</div>
                      Essential
                      <div className="text-[11px] text-text-muted font-normal mt-0.5">1× per year</div>
                    </th>
                    <th className="text-center px-4 py-4 font-bold text-white font-heading border-b border-border bg-primary">
                      <div className="text-[11px] text-white/80 font-normal mb-0.5">MOST POPULAR</div>
                      Complete
                      <div className="text-[11px] text-white/80 font-normal mt-0.5">2× per year</div>
                    </th>
                    <th className="text-center px-4 py-4 font-bold text-text-primary font-heading border-b border-border">
                      <div className="text-[11px] text-text-muted font-normal mb-0.5">DEEPEST</div>
                      Premium
                      <div className="text-[11px] text-text-muted font-normal mt-0.5">2× per year</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {planTable.rows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-section-alt/50"}>
                      <td className="px-5 py-3.5 font-semibold text-text-primary border-b border-border/60">{row.system}</td>
                      <td className="px-4 py-3.5 text-center text-text-secondary border-b border-border/60">{row.essential}</td>
                      <td className="px-4 py-3.5 text-center font-semibold text-primary border-b border-border/60">{row.complete}</td>
                      <td className="px-4 py-3.5 text-center text-text-secondary border-b border-border/60">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="text-center mt-8">
              <a
                href="https://app.betterhealth.africa/join"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-7 py-3.5 text-sm font-bold font-heading transition-all hover:-translate-y-0.5 no-underline"
              >
                {planTable.cta} <ArrowRight size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 lg:py-[100px] px-6 bg-primary relative overflow-hidden">
        <GradientOrb color="green" size="500px" className="top-[-20%] right-[-10%] opacity-30" />
        <div className="max-w-[640px] mx-auto text-center relative z-10">
          <Reveal>
            <h2 className="text-[2.2rem] md:text-[2.8rem] font-extrabold text-white font-heading tracking-tight mb-4">
              {bottomCta.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[17px] text-white/80 leading-relaxed font-body mb-8">
              {bottomCta.body}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="https://app.betterhealth.africa/join"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-primary rounded-btn px-8 py-4 text-base font-bold font-heading transition-all hover:-translate-y-0.5 hover:shadow-lg no-underline"
            >
              {bottomCta.cta} <ArrowRight size={18} />
            </a>
          </Reveal>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
