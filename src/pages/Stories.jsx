import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Quote, MapPin, ChevronDown, TrendingUp, TrendingDown, Minus } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";
import { storiesPage } from "../data/content";

const TAG_STYLES = {
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
  red: "bg-red-50 text-red-700 border-red-200",
  yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  green: "bg-green-50 text-green-700 border-green-200",
};

const AVATAR_COLORS = [
  "from-teal-400 to-emerald-500",
  "from-blue-400 to-cyan-500",
  "from-purple-400 to-violet-500",
  "from-amber-400 to-orange-500",
  "from-rose-400 to-pink-500",
];

function NumberRow({ item }) {
  const hasImproved = item.after !== null;
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border/40 last:border-0">
      <div className="shrink-0 mt-0.5">
        {hasImproved ? (
          <TrendingDown size={15} className="text-green-500" />
        ) : (
          <Minus size={15} className="text-text-muted" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[13px] font-bold text-text-primary">{item.label}: </span>
        <span className="text-[13px] text-text-secondary font-mono">{item.before}</span>
        {item.after && (
          <>
            <span className="text-[13px] text-text-muted mx-1">→</span>
            <span className="text-[13px] text-green-600 font-mono font-bold">{item.after}</span>
          </>
        )}
        <span className="text-[12px] text-text-muted ml-1.5">({item.status})</span>
      </div>
    </div>
  );
}

function StoryCard({ story, index }) {
  const [expanded, setExpanded] = useState(false);
  const tagStyle = TAG_STYLES[story.tagColor] || TAG_STYLES.blue;
  const avatarGrad = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const initials = story.name.split(" ").map(n => n[0]).join("").slice(0, 2);

  return (
    <Reveal delay={index * 0.06}>
      <article className="bg-white border border-border rounded-card shadow-sm hover:shadow-card transition-all duration-300 overflow-hidden">
        {/* Card header */}
        <div className="p-4 sm:p-6 pb-4">
          <div className="flex items-start gap-3 sm:gap-4 mb-4">
            {/* Avatar */}
            <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${avatarGrad} flex items-center justify-center shrink-0`}>
              <span className="text-white font-bold text-base sm:text-lg font-heading">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-pill border ${tagStyle}`}>
                  {story.tag}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[12px] sm:text-[13px] text-text-muted flex-wrap">
                <span className="font-semibold text-text-secondary">{story.name}</span>
                {story.age && <span>· {story.age}</span>}
                <MapPin size={11} className="ml-0.5" />
                <span>{story.city}</span>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h3 className="text-[17px] font-bold text-text-primary font-heading leading-snug mb-3">
            {story.headline}
          </h3>

          {/* First paragraph always visible */}
          <p className="text-[14px] text-text-secondary leading-relaxed">
            {story.narrative[0]}
          </p>
        </div>

        {/* Expandable content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-4 sm:px-6 pb-2 flex flex-col gap-3">
                {story.narrative.slice(1).map((para, i) => (
                  <p key={i} className="text-[14px] text-text-secondary leading-relaxed">{para}</p>
                ))}

                {/* The numbers */}
                <div className="bg-section-alt rounded-xl p-4 mt-1">
                  <p className="text-[11px] font-bold text-text-muted uppercase tracking-[0.12em] mb-2">The numbers</p>
                  {story.numbers.map((n, i) => <NumberRow key={i} item={n} />)}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quote + toggle */}
        <div className="px-4 sm:px-6 py-4 border-t border-border/60">
          <div className="flex gap-2 mb-3">
            <Quote size={16} className="text-primary shrink-0 mt-0.5" />
            <p className="text-[14px] italic text-text-primary font-medium leading-snug">{story.quote}</p>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:text-primary-dark transition-colors bg-transparent border-none cursor-pointer p-0"
          >
            {expanded ? "Show less" : "Read full story"}
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown size={14} />
            </motion.span>
          </button>
        </div>
      </article>
    </Reveal>
  );
}

export default function StoriesPage() {
  const { hero, stories, callForStories, bottomCta } = storiesPage;

  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Nav />

      {/* ── Hero ── */}
      <section className="min-h-[52vh] flex items-center pt-[120px] pb-16 px-6 bg-base relative overflow-hidden">
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
            <h1 className="text-[1.8rem] sm:text-[2.6rem] md:text-[3.4rem] font-extrabold font-heading leading-[1.08] tracking-[-0.03em] text-text-primary mb-5">
              The tests their doctors{" "}
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent italic pr-[0.25em]">
                never ordered.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-text-secondary max-w-[600px] mx-auto font-body">
              {hero.subheadline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Stories Grid ── */}
      <section className="py-16 lg:py-20 px-6 bg-section-alt">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story, i) => (
              <StoryCard key={story.name} story={story} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Call for Stories ── */}
      <Reveal>
        <section className="py-16 px-6 bg-base">
          <div className="max-w-[640px] mx-auto text-center">
            <div className="bg-white/70 backdrop-blur-sm border border-border rounded-card p-10 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-primary-bg border border-primary/20 flex items-center justify-center mx-auto mb-4">
                <Quote size={22} className="text-primary" />
              </div>
              <h2 className="text-[1.6rem] font-extrabold text-text-primary font-heading mb-3">
                {callForStories.headline}
              </h2>
              <p className="text-[15px] text-text-secondary leading-relaxed mb-6 font-body">
                {callForStories.body}
              </p>
              <a
                href="mailto:stories@betterhealth.africa"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-7 py-3.5 text-sm font-bold font-heading transition-all hover:-translate-y-0.5 no-underline"
              >
                {callForStories.cta} <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Bottom CTA ── */}
      <section className="py-20 lg:py-[100px] px-6 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
        <GradientOrb color="green" size="500px" className="top-[-20%] right-[-10%] opacity-30" />
        <div className="max-w-[600px] mx-auto text-center relative z-10">
          <Reveal>
            <h2 className="text-[1.7rem] sm:text-[2.2rem] md:text-[2.8rem] font-extrabold text-white font-heading tracking-tight mb-4">
              {bottomCta.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[17px] text-white/80 leading-relaxed font-body mb-8">
              {bottomCta.body}
            </p>
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
