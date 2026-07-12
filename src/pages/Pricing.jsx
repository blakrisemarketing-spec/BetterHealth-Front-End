import Seo from "../components/Seo";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronDown,
} from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ScreeningBundles from "../components/ScreeningBundles";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";
import { pricingPage, testPanels } from "../data/content";
import { usePricingCatalogue, withBackendPanelPrice, withBackendPricingPage } from "../lib/pricing-catalogue";

function FaqItem({ item, index, open, onToggle }) {
  return (
    <Reveal delay={index * 0.04}>
      <div className="border border-border rounded-card overflow-hidden">
        <button
          onClick={onToggle}
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

function FaqSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section className="py-20 px-6 bg-section-alt">
      <div className="max-w-[720px] mx-auto">
        <Reveal>
          <h2 className="text-[1.7rem] md:text-[2rem] font-extrabold text-text-primary font-heading tracking-tight text-center mb-8">
            Common questions
          </h2>
        </Reveal>
        <div className="flex flex-col gap-3">
          {faqs.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PricingPage() {
  const backendPrices = usePricingCatalogue();
  const { hero, valueAnchor, hospitalComparison, singleTests, faqs, bottomCta } = withBackendPricingPage(pricingPage, backendPrices);
  const panorama = withBackendPanelPrice(
    testPanels.find((panel) => panel.slug === "panorama"),
    backendPrices,
  );

  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Seo route="pricing" />
      <Nav />
      <main>

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
              {hero.headline}{" "}
              <span className="text-primary italic tracking-normal">
                Pay once.
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
            <div className="bg-primary-bg border border-primary/20 rounded-card px-4 sm:px-6 py-4 text-[13px] sm:text-[14px] text-text-primary font-medium break-words">
              {valueAnchor}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Single Tests (à la carte — the front door) ── */}
      <section className="py-16 lg:py-20 px-6 bg-base border-t border-border">
        <div className="max-w-[760px] mx-auto text-center">
          <Reveal>
            <span className="inline-block text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-2">Start here</span>
            <h2 className="text-[1.7rem] md:text-[2rem] font-extrabold text-text-primary font-heading tracking-tight mb-2">
              {singleTests.headline}
            </h2>
            <p className="text-[15px] text-text-secondary mb-8 max-w-[560px] mx-auto">{singleTests.body}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {singleTests.examples.map((test, i) => (
                <div key={i} className="flex items-center justify-between bg-section-alt border border-border rounded-card px-4 py-3">
                  <span className="text-[13px] text-text-secondary text-left">{test.name}</span>
                  <span className="text-[13px] font-bold text-primary shrink-0 ml-3">{test.price}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              to="/book-tests"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-7 py-3.5 text-sm font-bold font-heading transition-all hover:-translate-y-0.5 no-underline"
            >
              {singleTests.cta} <ArrowRight size={16} />
            </Link>
            <p className="text-[11px] text-text-muted mt-3">{singleTests.note}</p>
          </Reveal>
        </div>
      </section>

      {/* ── Screening Bundles (offer-ladder bridge: single test → bundle → program) ── */}
      <ScreeningBundles />

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
                    <th className="text-center px-3 sm:px-4 py-4 text-[13px] font-bold text-text-secondary">Hospitals/ Session</th>
                    <th className="text-center px-3 sm:px-4 py-4 text-[13px] font-bold text-primary bg-primary-bg/50">BH Complete/ Year</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitalComparison.rows.map((row, i) => (
                    <tr key={i} className={`border-b border-border/50 last:border-0 ${row.isTotals ? "bg-primary-bg/30 font-bold" : i % 2 === 0 ? "bg-white" : "bg-section-alt/40"}`}>
                      <td className={`px-5 py-3 text-[13px] ${row.isTotals ? "font-bold text-text-primary" : "text-text-secondary"}`}>{row.test}</td>
                      <td className={`px-4 py-3 text-center text-[13px] ${row.isTotals ? "font-bold text-red-600" : "text-text-secondary"}`}>{row.hospital}</td>
                      <td className={`px-4 py-3 text-center text-[13px] bg-primary-bg/20 ${row.isTotals ? "font-bold text-primary" : "text-green-600 font-medium"}`}>
                        {row.isTotals ? panorama?.price || row.bh : row.bh}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-text-muted mt-3 leading-relaxed text-center">{hospitalComparison.footnote}</p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FaqSection faqs={faqs} />

      {/* ── Bottom CTA ── */}
      <section className="py-20 lg:py-[100px] px-6 bg-primary relative overflow-hidden">
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
              to="/book-tests"
              className="inline-flex items-center gap-2 bg-white text-primary rounded-btn px-8 py-4 text-base font-bold font-heading transition-all hover:-translate-y-0.5 hover:shadow-lg no-underline"
            >
              {bottomCta.cta} <ArrowRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
