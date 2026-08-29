import { useCallback } from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  FileText,
  FlaskConical,
  Gift,
  Microscope,
  PhoneCall,
  ShieldCheck,
  X,
} from "lucide-react";
import Seo from "../components/Seo";
import Footer from "../components/Footer";
import Fade from "../components/consultation/Fade";
import GradientOrb from "../components/ui/GradientOrb";
import ConsultationBooking from "../components/consultation/ConsultationBooking";
import CampaignNav from "../components/consultation/CampaignNav";
import StickyCTA from "../components/consultation/StickyCTA";
import QualifyChecklist from "../components/consultation/QualifyChecklist";
import ProofWall from "../components/consultation/ProofWall";
import HeroMedia from "../components/consultation/HeroMedia";
import LazyMount from "../components/consultation/LazyMount";
import {
  CONSULT_MINUTES,
  DISCLAIMER,
  FAQ,
  HERO_CHECKS,
  HERO_CTA_NOTE,
  OFFER_STACK,
  PROMISE,
  SCOPE,
  SESSION_SHEET,
  SHARED_IMAGES,
  TRUST_POINTS,
  VARIANTS,
} from "../data/wellness-consultation";

const TRUST_ICONS = {
  flask: FlaskConical,
  badge: BadgeCheck,
  shield: ShieldCheck,
  science: Microscope,
};

const OFFER_ICONS = {
  phone: PhoneCall,
  file: FileText,
  gift: Gift,
};

/** Both booking anchors, nearest-first from wherever the reader currently is. */
const BOOKING_ANCHORS = ["#book", "#book-2"];

/**
 * One page shell driving all four A/B/C/D landing variants. The cells differ by
 * AUDIENCE (diabetes / blood pressure / general wellness / fertility), not by
 * layout — holding structure, proof, team and FAQ constant is what makes a
 * difference in results attributable to the audience rather than the furniture.
 *
 * ── The 2026-08-29 redesign ──────────────────────────────────────────────────
 *
 * The page it replaced was 12,565px on a 375px screen — fifteen and a half
 * screens — and put its only booking form 3,039px down, behind the hero, a
 * trust strip, a full cost-of-inaction argument and a six-item checklist. Nearly
 * four screens of scrolling before a visitor could find out whether a time
 * existed that suited them, on a page selling a free twenty-minute call. That is
 * the page architecture of a high-ticket offer, and this is not one: the ask is
 * small, the audience arrives warm off a Meta ad, and the thing standing between
 * them and a booking was distance rather than doubt.
 *
 * So the picker moved into the hero and the argument stayed where it was. Two
 * changes, and they are independent of each other:
 *
 *   1. The hero now carries the conversion. Headline, one line of lede, then the
 *      live picker — real availability inside the first screen on a phone. The
 *      hero is dark so the white picker card is the brightest object on it and
 *      the eye lands on the booking rather than hunting for it.
 *   2. Everything below the hero is for the reader who did not book on sight.
 *      Nothing was deleted to make room; the argument was resequenced so it
 *      builds toward a second picker rather than trailing off after the first.
 *
 * Section order, and the job each section is doing:
 *
 *   hero        headline, offer, and a bookable time, in one screen
 *   trust       institutional credibility, immediately after the ask
 *   agitate     cost of inaction, the emotional engine of the page
 *   checklist   the reader decides the page is about them
 *   belief      kill the false belief that stops the booking
 *   mechanism   why the problem persists, and what we'd actually look at
 *   promise     what they walk away with, and the twenty minutes minute by minute
 *   book-2      the second conversion point, at the end of the argument
 *   proof       borrow trust from members who tested
 *   scope       the boundaries of the call
 *   faq         last objections
 *   close       one more ask
 *
 * Two pickers, not one. A reader who scrolls the whole argument should not have
 * to scroll back up to act on it, and `scrollToBooking` sends them to whichever
 * of the two is nearer. The second is wrapped in LazyMount so it costs no
 * request until it is nearly on screen.
 *
 * Variant copy: src/data/wellness-consultation.js
 * Audience briefs: artifacts/wellness-consultation/ABCD_TEST.md
 */
export default function WellnessConsultationPage() {
  const { variant: slug } = useParams();
  const v = VARIANTS[slug];

  // Send the reader to the closer of the two pickers. Scrolling nine screens
  // back to the hero to act on an argument they just finished reading is the
  // failure this avoids; so is jumping a reader in the hero down past the whole
  // page. Distance from the current viewport centre decides it.
  const scrollToBooking = useCallback((e) => {
    e.preventDefault();
    const middle = window.scrollY + window.innerHeight / 2;
    const target = BOOKING_ANCHORS.map((sel) => document.querySelector(sel))
      .filter(Boolean)
      .sort(
        (a, b) =>
          Math.abs(a.getBoundingClientRect().top + window.scrollY - middle) -
          Math.abs(b.getBoundingClientRect().top + window.scrollY - middle),
      )[0];
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Unknown slug — send to the general-wellness cell rather than a 404. A
  // mistyped URL in a live ad should still land somewhere that converts.
  if (!v) return <Navigate to="/wellness-consultation/wellness" replace />;

  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Seo route={`wellness-consultation/${slug}`} />
      <CampaignNav onCta={scrollToBooking} />
      <main>
        {/* ── Hero ──
            `id="book"` is on the hero itself, because the hero IS the booking
            section now. The nav CTA, the checklist CTA and the sticky bar all
            resolve here when the reader is nearer the top of the page.

            No Fade on anything above the fold. Everything lower fades in on
            scroll, but the LCP element of an ad landing page cannot spend its
            first second at opacity 0 — on a Ghanaian 3G connection that is a
            blank screen at exactly the moment the click is regretted. */}
        <section
          id="book"
          className="relative overflow-hidden bg-bg-dark px-5 pb-14 pt-[104px] sm:px-6 lg:pb-20"
        >
          <GradientOrb color="green" size="680px" className="right-[-14%] top-[-18%] opacity-70" />
          <GradientOrb color="gold" size="420px" className="bottom-[-14%] left-[-10%] opacity-50" />

          {/* Explicit row/column placement rather than source order, because the
              two orders differ. On a phone the reader gets headline → picker →
              video → offer, so a real bookable time is on the first screen. On a
              desktop the picker moves into its own column beside all three. */}
          <div className="relative z-10 mx-auto grid max-w-[1160px] gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-start lg:gap-x-14 lg:gap-y-10">
            {/* 1 · Headline */}
            <div className="lg:col-start-1 lg:row-start-1">
              <span className="mb-4 inline-flex items-center gap-2 rounded-pill border border-white/20 bg-white/10 px-4 py-1.5 font-heading text-[11.5px] font-bold uppercase tracking-wider text-primary-light">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-primary-light" />
                {v.eyebrow}
              </span>

              <h1 className="mb-4 font-heading text-[2.15rem] font-extrabold leading-[1.04] tracking-tight text-white sm:text-[2.7rem] lg:text-[3.15rem]">
                {v.h1}
              </h1>

              {/* One paragraph, and it carries this cell's sharpest sentence
                  rather than the shared "take back control within 90 days"
                  abstraction the old hero ran on all four pages. */}
              <p className="max-w-[560px] font-body text-[17px] leading-relaxed text-white/75 sm:text-[18px]">
                {v.lede}
              </p>
            </div>

            {/* 2 · The picker — the conversion point, above the fold on a phone */}
            <div className="min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-3">
              <ConsultationBooking variant={v.variant} concern={v.concern} />
              <p className="mt-3 text-center text-[12.5px] font-semibold text-white/55">
                {HERO_CTA_NOTE}
              </p>
            </div>

            {/* 3 · The film */}
            <div className="lg:col-start-1 lg:row-start-2">
              <HeroMedia vimeoId={v.hero.vimeoId} poster={v.hero.poster} alt={v.hero.alt} />
            </div>

            {/* 4 · What you actually receive, stated rather than argued for */}
            <ul className="flex flex-col gap-3 lg:col-start-1 lg:row-start-3">
              {OFFER_STACK.map((item) => {
                const Icon = OFFER_ICONS[item.icon];
                return (
                  <li
                    key={item.title}
                    className="flex gap-3.5 rounded-card border border-white/10 bg-white/[0.06] p-4"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/25">
                      <Icon size={15} className="text-primary-light" />
                    </span>
                    <div>
                      <p className="mb-0.5 font-heading text-[15px] font-bold text-white">
                        {item.title}
                      </p>
                      <p className="text-[14.5px] leading-relaxed text-white/65">{item.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ── Trust strip ── */}
        <section className="border-b border-border bg-section-alt px-5 py-5 sm:px-6">
          <ul className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {TRUST_POINTS.map((point) => {
              const Icon = TRUST_ICONS[point.icon];
              return (
                <li key={point.label} className="flex items-center gap-2">
                  <Icon size={16} className="shrink-0 text-primary" />
                  <span className="text-[13px] font-semibold text-text-secondary">
                    {point.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        {/* ── Cost of inaction ── */}
        <section className="bg-base px-5 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-[720px]">
            <Fade>
              <h2 className="mb-5 font-heading text-[1.75rem] font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-[2.35rem]">
                {v.agitate.heading}
              </h2>
            </Fade>
            {/* Readable weight, not bold. The lead is long — it describes the
                fear — and setting it heavy makes a wall the reader skips. The
                short `turn` lines below are what get the emphasis. */}
            <Fade delay={0.06}>
              <p className="mb-7 font-body text-[17px] font-medium leading-relaxed text-text-primary sm:text-[18px]">
                {v.agitate.lead}
              </p>
            </Fade>

            {/* The photograph that used to be the hero. It sits at the pivot on
                purpose — the argument turns from fear to "it needn't be your
                reality" right here, and a human face carries that better than
                another paragraph. */}
            <Fade delay={0.1}>
              <img
                src={v.photo.src}
                alt={v.photo.alt}
                width={1200}
                height={800}
                loading="lazy"
                className="mb-7 aspect-[3/2] w-full rounded-card object-cover shadow-card"
              />
            </Fade>

            {v.agitate.turn && (
              <Fade delay={0.12}>
                <div className="mb-7 border-l-[3px] border-primary pl-5">
                  {v.agitate.turn.map((line, i) => (
                    <p
                      key={i}
                      className="font-heading text-[17px] font-bold leading-relaxed text-text-primary sm:text-[19px]"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </Fade>
            )}

            <div className="mb-8 flex flex-col gap-3.5">
              {v.agitate.paras.map((p, i) => (
                <Fade key={i} delay={0.1 + i * 0.06}>
                  <p className="text-[17px] leading-relaxed text-text-secondary">{p}</p>
                </Fade>
              ))}
            </div>

            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              {v.agitate.stats.map((stat, i) => (
                <Fade key={stat.label} delay={0.14 + i * 0.06}>
                  <div className="h-full rounded-card border border-accent-soft bg-accent-bg p-5">
                    <p className="font-heading text-[1.9rem] font-extrabold leading-none tracking-tight text-accent-ink">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-[14px] leading-snug text-text-secondary">
                      {stat.label}
                    </p>
                  </div>
                </Fade>
              ))}
            </div>

            <Fade delay={0.2}>
              <p className="border-l-[3px] border-accent-dark pl-5 font-heading text-[17px] font-bold leading-relaxed text-text-primary sm:text-[19px]">
                {v.agitate.cost}
              </p>
            </Fade>
          </div>
        </section>

        {/* ── Self-qualification ── */}
        <section className="bg-base px-5 pb-14 sm:px-6 lg:pb-20">
          <QualifyChecklist
            heading={v.checklist.heading}
            items={v.checklist.items}
            onCta={scrollToBooking}
          />
        </section>

        {/* ── False belief ── */}
        <section className="border-t border-border bg-section-alt px-5 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-[720px]">
            <Fade>
              <p className="mb-3 font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-text-muted">
                What most people fear
              </p>
            </Fade>
            <Fade delay={0.06}>
              <p className="mb-6 font-heading text-[1.35rem] font-extrabold leading-snug text-text-primary sm:text-[1.7rem]">
                {v.belief.myth}
              </p>
            </Fade>
            <Fade delay={0.12}>
              <div className="rounded-card border-l-[3px] border-primary bg-card p-6 shadow-card sm:p-7">
                <p className="mb-2 font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                  What&apos;s actually true
                </p>
                <p className="text-[17px] leading-relaxed text-text-secondary">
                  {v.belief.truth}
                </p>
              </div>
            </Fade>
          </div>
        </section>

        {/* ── Mechanism · why it persists, what we'd look at ── */}
        <section className="bg-section-alt px-5 pb-14 sm:px-6 lg:pb-20">
          <div className="mx-auto flex max-w-[720px] flex-col gap-9">
            {v.body.map((block, i) => (
              <Fade key={block.heading} delay={i * 0.06}>
                <div>
                  <h2 className="mb-3 font-heading text-[1.3rem] font-extrabold tracking-tight text-text-primary sm:text-[1.6rem]">
                    {block.heading}
                  </h2>
                  <div className="flex flex-col gap-3">
                    {block.paras.map((p, j) => (
                      <p key={j} className="text-[17px] leading-relaxed text-text-secondary">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </Fade>
            ))}

            <Fade>
              <div className="rounded-card border border-border bg-card p-5 shadow-card sm:p-6">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                  Often the baseline
                </p>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-heading text-[19px] font-extrabold text-text-primary">
                    {v.panel.displayName}
                  </h3>
                  <span className="font-heading text-[17px] font-bold text-primary">
                    {v.panel.price}
                  </span>
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">
                  Your consultant will tell you whether this is the right baseline for you, and say
                  so plainly if something smaller would answer your question. You decide after the
                  call, in your own time.
                </p>
              </div>
            </Fade>
          </div>
        </section>

        {/* ── The product · what you walk away with, and the twenty minutes ──
            These were two sections. They are one now because they are two views
            of the same thing — the call and the plan are deliberately the same
            shape, where you stand → what to work on → when to re-check — and
            printing that shape twice under separate headings read as repetition
            rather than as the reassurance it was meant to be. */}
        <section className="border-t border-border bg-base px-5 py-14 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-[1120px]">
            <div className="mx-auto mb-9 max-w-[720px]">
              <Fade>
                <h2 className="mb-3 font-heading text-[1.75rem] font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-[2.35rem]">
                  What you&apos;ll walk away with
                </h2>
              </Fade>
              <Fade delay={0.06}>
                <p className="text-[16.5px] leading-relaxed text-text-secondary">
                  Three things, in writing, within 24 hours of your call.
                </p>
              </Fade>
            </div>

            <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
              <div className="flex flex-col gap-4">
                {PROMISE.map((item, i) => (
                  <Fade key={item.title} delay={0.1 + i * 0.06}>
                    <div className="flex gap-3.5 rounded-card border border-border bg-card p-4 shadow-card sm:p-5">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary">
                        <Check size={14} className="text-white" />
                      </span>
                      <div>
                        <p className="mb-1 text-[15px] font-bold text-text-primary">{item.title}</p>
                        <p className="text-[15px] leading-relaxed text-text-secondary">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </Fade>
                ))}
              </div>

              {/* The objection this answers is not "what do I do" but "how long
                  am I committing to, and to what". A visitor who cannot picture
                  the twenty minutes assumes the worst about them. */}
              <Fade delay={0.12}>
                <div className="rounded-card border border-border bg-section-alt p-6 sm:p-7">
                  <p className="mb-1 font-heading text-[1.2rem] font-extrabold tracking-tight text-text-primary sm:text-[1.4rem]">
                    Inside the {CONSULT_MINUTES} minutes
                  </p>
                  <p className="mb-5 text-[15px] leading-relaxed text-text-secondary">
                    So you know what you&apos;re agreeing to, and when it ends.
                  </p>
                  <ol className="flex flex-col gap-4">
                    {SESSION_SHEET.map((block) => (
                      <li key={block.when} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                        <span className="shrink-0 self-start rounded-pill bg-primary-bg px-3 py-1 font-heading text-[12.5px] font-bold tabular-nums text-primary sm:w-[94px] sm:text-center">
                          {block.when}
                        </span>
                        <div>
                          <p className="text-[15px] font-bold text-text-primary">{block.title}</p>
                          <p className="text-[14.5px] leading-relaxed text-text-secondary">
                            {block.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </Fade>
            </div>
          </div>
        </section>

        {/* ── Second booking point ──
            The reader who got this far read the whole argument. Making them
            scroll nine screens back to the hero to act on it is the single
            cheapest booking to lose. LazyMount keeps it from costing a slots
            request until it is nearly on screen. */}
        <section
          id="book-2"
          className="scroll-mt-[76px] border-t border-border bg-section-alt px-5 py-14 sm:px-6 lg:py-20"
        >
          {/* [&>*]:min-w-0 is load-bearing: a grid item's automatic minimum size
              is min-content, and the picker's 14-day strip is ~970px wide before
              it's allowed to scroll. Without this the strip forces its column
              open and crushes the column beside it to a few characters wide. */}
          <div className="mx-auto grid max-w-[1120px] items-start gap-8 [&>*]:min-w-0 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <div>
              <Fade>
                <h2 className="mb-3 font-heading text-[1.85rem] font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-[2.45rem]">
                  Pick a time that suits you
                </h2>
              </Fade>
              <Fade delay={0.06}>
                <p className="mb-6 text-[17px] leading-relaxed text-text-secondary">
                  {CONSULT_MINUTES} minutes with a BetterHealth Wellness Consultant, on Google Meet
                  or an ordinary phone call. The call and your written plan are free.
                </p>
              </Fade>
              <Fade delay={0.1}>
                <ul className="mb-7 flex flex-col gap-2.5">
                  {HERO_CHECKS.map((check) => (
                    <li key={check} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full bg-primary">
                        <Check size={12} strokeWidth={3.5} className="text-white" />
                      </span>
                      <span className="text-[14.5px] font-semibold leading-snug text-text-primary">
                        {check}
                      </span>
                    </li>
                  ))}
                </ul>
              </Fade>
              <Fade delay={0.14}>
                <img
                  src={SHARED_IMAGES.consult.src}
                  alt={SHARED_IMAGES.consult.alt}
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="hidden aspect-[3/2] w-full rounded-card object-cover shadow-card lg:block"
                />
              </Fade>
            </div>
            <LazyMount placeholderClassName="min-h-[480px]">
              <ConsultationBooking variant={v.variant} concern={v.concern} />
            </LazyMount>
          </div>
        </section>

        {/* ── Proof ── */}
        <section className="border-t border-border bg-base px-5 py-14 sm:px-6 lg:py-20">
          <ProofWall />
        </section>

        {/* ── What this is, and what it isn't ──
            A safety surface as much as a conversion one: every cell targets
            people who already carry a diagnosis, so the limits of a
            non-clinical call are worth stating in full sight rather than in the
            disclaimer at the foot of the page. */}
        <section className="bg-base px-5 pb-14 sm:px-6 lg:pb-20">
          <div className="mx-auto max-w-[900px]">
            <Fade>
              <h2 className="mb-8 text-center font-heading text-[1.75rem] font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-[2.35rem]">
                What this is, and what it isn&apos;t
              </h2>
            </Fade>
            <div className="grid gap-4 lg:grid-cols-2">
              <Fade>
                <div className="h-full rounded-card border border-border bg-card p-6 shadow-card">
                  <p className="mb-4 font-heading text-[16px] font-bold text-text-primary">
                    What it is
                  </p>
                  <ul className="flex flex-col gap-3">
                    {SCOPE.is.map((line) => (
                      <li key={line} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full bg-primary">
                          <Check size={12} strokeWidth={3.5} className="text-white" />
                        </span>
                        <span className="text-[14.5px] leading-relaxed text-text-secondary">
                          {line}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Fade>
              <Fade delay={0.08}>
                <div className="h-full rounded-card border border-border bg-section-alt p-6">
                  <p className="mb-4 font-heading text-[16px] font-bold text-text-primary">
                    What it isn&apos;t
                  </p>
                  <ul className="flex flex-col gap-3">
                    {SCOPE.isnt.map((line) => (
                      <li key={line} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full border border-border bg-card">
                          <X size={11} strokeWidth={3} className="text-text-muted" />
                        </span>
                        <span className="text-[14.5px] leading-relaxed text-text-secondary">
                          {line}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Fade>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-base px-5 pb-14 sm:px-6 lg:pb-20">
          <div className="mx-auto max-w-[720px]">
            <Fade>
              <h2 className="mb-8 font-heading text-[1.75rem] font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-[2.35rem]">
                Before you book
              </h2>
            </Fade>
            <div className="flex flex-col gap-3">
              {FAQ.map((item, i) => (
                <Fade key={item.q} delay={i * 0.04}>
                  <details className="group rounded-card border border-border bg-card p-5">
                    <summary className="cursor-pointer list-none text-[15px] font-bold text-text-primary marker:hidden">
                      {item.q}
                    </summary>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-text-secondary">
                      {item.a}
                    </p>
                  </details>
                </Fade>
              ))}
            </div>
          </div>
        </section>

        {/* ── Closing CTA ── */}
        <section className="relative overflow-hidden bg-primary px-5 py-16 sm:px-6 lg:py-20">
          <GradientOrb color="green" size="520px" className="right-[-10%] top-[-20%] opacity-30" />
          <div className="relative z-10 mx-auto max-w-[560px] text-center">
            <Fade>
              <h2 className="mb-4 font-heading text-[1.85rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-[2.45rem]">
                You don&apos;t need another warning. You need a plan.
              </h2>
            </Fade>
            <Fade delay={0.08}>
              <p className="mb-7 font-body text-[16px] leading-relaxed text-white/85">
                Paid for by the BetterHealth Foundation. The written plan is yours to keep
                either way.
              </p>
            </Fade>
            <Fade delay={0.16}>
              <a
                href="#book-2"
                onClick={scrollToBooking}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-btn bg-white px-8 py-4 font-heading text-[16px] font-bold text-primary no-underline transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Book your free call <ArrowRight size={17} />
              </a>
            </Fade>
          </div>
        </section>

        {/* ── Disclaimer ── */}
        <section className="bg-base px-5 py-8 pb-24 sm:px-6 lg:pb-8">
          <div className="mx-auto flex max-w-[720px] items-start gap-2.5">
            <ShieldCheck size={15} className="mt-0.5 shrink-0 text-text-muted" />
            <p className="text-[12.5px] leading-relaxed text-text-muted">{DISCLAIMER}</p>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA onCta={scrollToBooking} hideOver={STICKY_HIDE_OVER} />
    </div>
  );
}

// Module scope, so the array identity is stable and StickyCTA's observer effect
// does not tear down and rebuild on every render.
const STICKY_HIDE_OVER = ["#book", "#book-2", "footer"];
