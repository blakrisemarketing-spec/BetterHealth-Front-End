import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Check, X, Minus, ChevronDown,
  Smartphone, CreditCard, ShieldCheck, RotateCcw, Building2,
} from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";
import { pricingPage } from "../data/content";

const TRUST_ICONS = [Smartphone, CreditCard, ShieldCheck, RotateCcw, Building2];

function CellValue({ val }) {
  if (val === true) return <Check size={16} className="text-green-500 mx-auto" />;
  if (val === false) return <Minus size={14} className="text-text-muted mx-auto" />;
  return <span className="text-[12px] text-text-secondary font-medium">{val}</span>;
}

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={index * 0.04}>
      <div className="border border-border rounded-xl overflow-hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-section-alt transition-colors"
        >
          <span className="text-[15px] font-semibold text-text-primary">{item.q}</span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
            <ChevronDown size={16} className="text-text-muted" />
          </motion.span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="px-5 py-4 text-[14px] text-text-secondary leading-relaxed border-t border-border/50 bg-section-alt">
                {item.a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

function PlanCard({ plan, index }) {
  return (
    <Reveal delay={index * 0.08}>
      <div className={`relative flex flex-col rounded-card border h-full transition-all duration-300 hover:-translate-y-1 ${
        plan.popular
          ? "border-primary shadow-[0_0_0_2px_#0D9488,0_8px_32px_rgba(13,148,136,0.18)] bg-white"
          : "border-border bg-white/60 backdrop-blur-sm hover:shadow-card hover:border-primary/20"
      }`}>
        {plan.popular && (
          <div className="absolute -top-3.5 left-0 right-0 flex justify-center">
            <span className="bg-primary text-white text-[10px] font-extrabold tracking-[0.14em] px-4 py-1 rounded-pill font-heading">
              {plan.badge}
            </span>
          </div>
        )}

        <div className="p-7 pb-5 flex-1 flex flex-col">
          {/* Plan header */}
          <div className="mb-5">
            <h3 className="text-[18px] font-extrabold text-text-primary font-heading mb-1">{plan.name}</h3>
            <p className="text-[13px] text-text-muted leading-snug">{plan.tagline}</p>
          </div>

          {/* Price */}
          <div className="mb-6 pb-6 border-b border-border/60">
            <div className="flex items-end gap-2 mb-1">
              <span className="text-[2.4rem] font-extrabold text-text-primary font-heading leading-none">{plan.monthly}</span>
              <span className="text-[14px] text-text-muted mb-1">/month</span>
            </div>
            <p className="text-[12px] text-text-muted">Billed at {plan.annual}/year</p>
            <p className={`text-[12px] font-semibold mt-0.5 ${plan.popular ? "text-primary" : "text-text-secondary"}`}>
              That's just {plan.daily}/day
            </p>
          </div>

          {/* Includes */}
          <ul className="flex flex-col gap-2.5 flex-1">
            {plan.includes.map((item, i) => (
              <li key={i} className={`flex items-start gap-2.5 text-[13px] ${item.endsWith(":") || item.endsWith("plus:") ? "font-bold text-text-primary mt-1" : "text-text-secondary"}`}>
                {!(item.endsWith(":") || item.endsWith("plus:")) && (
                  <Check size={14} className={`shrink-0 mt-0.5 ${plan.popular ? "text-primary" : "text-green-500"}`} />
                )}
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Excludes */}
          {plan.excludes.length > 0 && (
            <ul className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/50">
              {plan.excludes.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] text-text-muted">
                  <X size={13} className="shrink-0 mt-0.5 text-text-muted/60" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CTA */}
        <div className="p-5 pt-0">
          <button className={`w-full py-3.5 rounded-btn text-[14px] font-bold font-heading transition-all hover:-translate-y-0.5 ${
            plan.popular
              ? "bg-primary hover:bg-primary-dark text-white shadow-md"
              : "bg-section-alt hover:bg-primary-bg border border-border hover:border-primary/30 text-text-primary hover:text-primary"
          }`}>
            {plan.cta}
          </button>
        </div>
      </div>
    </Reveal>
  );
}

export default function PricingPage() {
  const { hero, valueAnchor, plans, trustBadges, finePrint, comparison, hospitalComparison, singleTests, faqs, bottomCta } = pricingPage;

  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Nav />

      {/* ── Hero ── */}
      <section className="min-h-[50vh] flex items-center pt-[120px] pb-16 px-6 bg-base relative overflow-hidden">
        <GradientOrb color="green" size="560px" className="top-[-10%] right-[-8%]" />
        <GradientOrb color="blue" size="360px" className="bottom-[-10%] left-[-5%]" />
        <div className="max-w-[720px] mx-auto text-center relative z-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-primary-bg border border-primary/25 text-primary text-xs font-bold font-heading tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
              {hero.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-[1.8rem] sm:text-[2.6rem] md:text-[3.4rem] font-extrabold font-heading leading-[1.08] text-text-primary mb-5">
              Invest in knowing —{" "}
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent italic tracking-normal">
                not in guessing.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-text-secondary max-w-[600px] mx-auto font-body mb-8">
              {hero.subheadline}
            </p>
          </Reveal>
          {/* Value anchor banner */}
          <Reveal delay={0.3}>
            <div className="bg-primary-bg border border-primary/20 rounded-xl px-4 sm:px-6 py-4 text-[13px] sm:text-[14px] text-text-primary font-medium break-words">
              💡 {valueAnchor}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Pricing Cards ── */}
      <section className="py-16 lg:py-20 px-6 bg-section-alt">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan, i) => <PlanCard key={plan.name} plan={plan} index={i} />)}
          </div>

          {/* Trust badges */}
          <Reveal delay={0.2}>
            <div className="mt-10 bg-white/60 backdrop-blur-sm border border-border rounded-xl px-6 py-5">
              <div className="flex flex-wrap justify-center gap-4 mb-4">
                {trustBadges.map((badge, i) => {
                  const Icon = TRUST_ICONS[i];
                  return (
                    <div key={i} className="flex items-center gap-2 text-[13px] text-text-secondary">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <Icon size={12} className="text-green-600" />
                      </div>
                      {badge}
                    </div>
                  );
                })}
              </div>
              <p className="text-center text-[11px] text-text-muted leading-relaxed max-w-[700px] mx-auto">{finePrint}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="py-20 px-6 bg-base">
        <div className="max-w-[900px] mx-auto">
          <Reveal>
            <h2 className="text-[1.5rem] sm:text-[1.9rem] md:text-[2.2rem] font-extrabold text-text-primary font-heading tracking-tight text-center mb-8">
              {comparison.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-card border border-border overflow-x-auto">
              <table className="w-full text-sm min-w-[480px]">
                <thead>
                  <tr className="bg-section-alt border-b border-border">
                    <th className="text-left px-5 py-4 text-[13px] font-bold text-text-primary w-[40%]">Feature</th>
                    <th className="text-center px-3 py-4 text-[13px] font-bold text-text-secondary">Essential</th>
                    <th className="text-center px-3 py-4 text-[13px] font-bold text-primary bg-primary-bg/50">Complete</th>
                    <th className="text-center px-3 py-4 text-[13px] font-bold text-text-secondary">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.rows.map((row, i) => (
                    <tr key={i} className={`border-b border-border/50 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-section-alt/40"}`}>
                      <td className="px-5 py-3 text-[13px] text-text-secondary">{row.feature}</td>
                      <td className="px-3 py-3 text-center"><CellValue val={row.essential} /></td>
                      <td className="px-3 py-3 text-center bg-primary-bg/20"><CellValue val={row.complete} /></td>
                      <td className="px-3 py-3 text-center"><CellValue val={row.premium} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Hospital Comparison ── */}
      <section className="py-20 px-6 bg-section-alt">
        <div className="max-w-[860px] mx-auto">
          <Reveal>
            <div className="text-center mb-8">
              <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-2">Value vs Hospital</p>
              <h2 className="text-[1.5rem] sm:text-[1.9rem] md:text-[2.2rem] font-extrabold text-text-primary font-heading tracking-tight mb-3">
                {hospitalComparison.headline}
              </h2>
              <p className="text-[14px] text-text-secondary">{hospitalComparison.body}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-card border border-border overflow-x-auto">
              <table className="w-full text-sm min-w-[420px]">
                <thead>
                  <tr className="bg-section-alt border-b border-border">
                    <th className="text-left px-4 sm:px-5 py-4 text-[13px] font-bold text-text-primary">Test Group</th>
                    <th className="text-center px-3 sm:px-4 py-4 text-[13px] font-bold text-text-secondary">Typical Hospital</th>
                    <th className="text-center px-3 sm:px-4 py-4 text-[13px] font-bold text-primary bg-primary-bg/50">BetterHealth Complete</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitalComparison.rows.map((row, i) => (
                    <tr key={i} className={`border-b border-border/50 last:border-0 ${row.isTotals ? "bg-primary-bg/30 font-bold" : i % 2 === 0 ? "bg-white" : "bg-section-alt/40"}`}>
                      <td className={`px-5 py-3 text-[13px] ${row.isTotals ? "font-bold text-text-primary" : "text-text-secondary"}`}>{row.test}</td>
                      <td className={`px-4 py-3 text-center text-[13px] ${row.isTotals ? "font-bold text-red-600" : "text-text-secondary"}`}>{row.hospital}</td>
                      <td className={`px-4 py-3 text-center text-[13px] bg-primary-bg/20 ${row.isTotals ? "font-bold text-primary" : "text-green-600 font-medium"}`}>{row.bh}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-text-muted mt-3 leading-relaxed text-center">{hospitalComparison.footnote}</p>
          </Reveal>
        </div>
      </section>

      {/* ── Single Tests ── */}
      <section className="py-20 px-6 bg-base">
        <div className="max-w-[760px] mx-auto text-center">
          <Reveal>
            <h2 className="text-[1.7rem] md:text-[2rem] font-extrabold text-text-primary font-heading tracking-tight mb-2">
              {singleTests.headline}
            </h2>
            <p className="text-[15px] text-text-secondary mb-8">{singleTests.body}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {singleTests.examples.map((test, i) => (
                <div key={i} className="flex items-center justify-between bg-section-alt border border-border rounded-xl px-4 py-3">
                  <span className="text-[13px] text-text-secondary text-left">{test.name}</span>
                  <span className="text-[13px] font-bold text-primary shrink-0 ml-3">{test.price}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-7 py-3.5 text-sm font-bold font-heading transition-all hover:-translate-y-0.5">
              {singleTests.cta} <ArrowRight size={16} />
            </button>
            <p className="text-[11px] text-text-muted mt-3">{singleTests.note}</p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 bg-section-alt">
        <div className="max-w-[720px] mx-auto">
          <Reveal>
            <h2 className="text-[1.7rem] md:text-[2rem] font-extrabold text-text-primary font-heading tracking-tight text-center mb-8">
              Common questions
            </h2>
          </Reveal>
          <div className="flex flex-col gap-3">
            {faqs.map((item, i) => <FaqItem key={i} item={item} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 lg:py-[100px] px-6 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
        <GradientOrb color="green" size="500px" className="top-[-20%] right-[-10%] opacity-30" />
        <div className="max-w-[580px] mx-auto text-center relative z-10">
          <Reveal>
            <h2 className="text-[1.7rem] sm:text-[2.2rem] md:text-[2.8rem] font-extrabold text-white font-heading tracking-tight mb-4">
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
