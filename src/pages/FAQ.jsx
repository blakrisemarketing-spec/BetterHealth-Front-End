import Seo from "../components/Seo";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, Mail, Phone, ArrowRight } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";
import { faqSections as FAQ_SECTIONS } from "../data/content";


function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left bg-white hover:bg-section-alt transition-colors"
      >
        <span className="text-[15px] font-semibold text-text-primary leading-snug">{item.q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0"
        >
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
            <p className="px-6 py-5 text-[14px] text-text-secondary leading-relaxed border-t border-border/50 bg-section-alt whitespace-pre-line">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(null);

  const filtered = activeCategory
    ? FAQ_SECTIONS.filter((s) => s.category === activeCategory)
    : FAQ_SECTIONS;

  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Seo route="faq" />
      <Nav />
      <main>

      {/* Hero */}
      <section className="min-h-[46vh] flex items-center pt-[120px] pb-14 px-6 bg-base relative overflow-hidden">
        <GradientOrb color="green" size="540px" className="top-[-10%] right-[-8%]" />
        <GradientOrb color="blue" size="320px" className="bottom-[-15%] left-[-5%]" />
        <div className="max-w-[680px] mx-auto text-center relative z-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-primary-bg border border-primary/25 text-primary text-xs font-bold font-heading tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
              FAQ
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-[1.8rem] sm:text-[2.6rem] md:text-[3.2rem] font-extrabold font-heading leading-[1.08] text-text-primary mb-4">
              Everything you{" "}
              <span className="text-primary italic tracking-normal">
                need to know.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-text-secondary font-body max-w-[520px] mx-auto">
              Cannot find your answer here?{" "}
              <a href="https://wa.me/message/MJ3HXLS2NDQEJ1" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline underline-offset-2 no-underline">
                WhatsApp us
              </a>{" "}
              or email{" "}
              <a href="mailto:hello@betterhealth.africa" className="text-primary font-semibold hover:underline underline-offset-2 no-underline">
                hello@betterhealth.africa
              </a>{" "}
              — we respond within 24 hours.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Category filter pills */}
      <section className="py-4 sm:py-6 px-4 sm:px-6 bg-section-alt border-y border-border sticky top-[64px] z-20">
        <div className="max-w-[860px] mx-auto flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 sm:px-4 py-1.5 rounded-pill text-[12px] sm:text-[13px] font-semibold transition-all border ${!activeCategory ? "bg-primary text-white border-primary" : "bg-white text-text-secondary border-border hover:border-primary/30 hover:text-primary"}`}
          >
            All
          </button>
          {FAQ_SECTIONS.map((s) => (
            <button
              key={s.category}
              onClick={() => setActiveCategory(activeCategory === s.category ? null : s.category)}
              className={`px-3 sm:px-4 py-1.5 rounded-pill text-[12px] sm:text-[13px] font-semibold transition-all border ${activeCategory === s.category ? "bg-primary text-white border-primary" : "bg-white text-text-secondary border-border hover:border-primary/30 hover:text-primary"}`}
            >
              {s.category}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ content */}
      <section className="py-16 px-6 bg-base">
        <div className="max-w-[860px] mx-auto flex flex-col gap-12">
          {filtered.map((section, si) => (
            <Reveal key={section.category} delay={si * 0.04}>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[12px] text-primary uppercase tracking-[0.14em] font-bold font-heading">
                    {section.category}
                  </span>
                  <span className="text-[11px] text-text-muted bg-section-alt border border-border px-2 py-0.5 rounded-full">
                    {section.items.length} questions
                  </span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {section.items.map((item, i) => (
                    <FaqItem key={i} item={item} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-20 px-6 bg-section-alt border-t border-border">
        <div className="max-w-[680px] mx-auto text-center">
          <Reveal>
            <h2 className="text-[1.8rem] font-extrabold text-text-primary font-heading mb-3">
              Did not find your answer?
            </h2>
            <p className="text-[15px] text-text-secondary mb-8">
              We are here to help. Reach out through any of these channels and we will respond within 24 hours.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  sub: "Fastest response",
                  href: "https://wa.me/message/MJ3HXLS2NDQEJ1",
                  cta: "Chat now",
                  primary: true,
                },
                {
                  icon: Mail,
                  label: "Email",
                  sub: "hello@betterhealth.africa",
                  href: "mailto:hello@betterhealth.africa",
                  cta: "Send email",
                  primary: false,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  sub: "Mon–Fri, 8 AM – 6 PM",
                  href: "tel:+233XXXXXXXXX",
                  cta: "Call us",
                  primary: false,
                },
              ].map((c, i) => {
                const Icon = c.icon;
                return (
                  <a
                    key={i}
                    href={c.href}
                    className={`flex flex-col items-center gap-2 rounded-card p-5 border transition-all hover:-translate-y-1 no-underline ${c.primary ? "bg-primary border-primary text-white hover:bg-primary-dark" : "bg-white border-border text-text-primary hover:border-primary/30 hover:shadow-card"}`}
                  >
                    <Icon size={20} className={c.primary ? "text-white" : "text-primary"} />
                    <span className={`text-[14px] font-bold font-heading ${c.primary ? "text-white" : "text-text-primary"}`}>{c.label}</span>
                    <span className={`text-[12px] ${c.primary ? "text-white/75" : "text-text-muted"}`}>{c.sub}</span>
                    <span className={`text-[12px] font-semibold flex items-center gap-1 mt-1 ${c.primary ? "text-white" : "text-primary"}`}>
                      {c.cta} <ArrowRight size={11} />
                    </span>
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 bg-primary relative overflow-hidden">
        <GradientOrb color="green" size="400px" className="top-[-20%] right-[-10%] opacity-30" />
        <div className="max-w-[520px] mx-auto text-center relative z-10">
          <Reveal>
            <h2 className="text-[1.6rem] sm:text-[2rem] md:text-[2.4rem] font-extrabold text-white font-heading tracking-tight mb-4">
              Ready to check your health?
            </h2>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 bg-white text-primary rounded-btn px-7 py-4 text-sm font-bold font-heading transition-all hover:-translate-y-0.5 hover:shadow-lg no-underline"
            >
              View Plans <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
