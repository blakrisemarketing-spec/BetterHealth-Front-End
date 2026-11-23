import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Camera, Activity, Pill, FlaskConical, Home as HomeIcon, ShieldCheck, Stethoscope, Soup,
  Footprints, ChefHat, Wallet, CalendarHeart, Smile, Trophy, Users, Droplets, BookOpen, Plus, Smartphone, Truck, Clock, Check, Quote,
} from "lucide-react";
import Reveal from "../ui/Reveal";
import Phone from "./Phone";
import LabStoryScreen, { LAB_STEP_MS } from "./LabStoryScreen";
import StoreButtons from "./StoreButtons";
import { HomeScreen, FoodScreen, ReadingsScreen, ResultsScreen, MedicinesScreen } from "../app/AppScreenMockups";
import { appDisclaimer } from "../../data/app";
import { screeningBundles, testPanels } from "../../data/content";
import { usePricingCatalogue, withBackendPanelPrices } from "../../lib/pricing-catalogue";
import founderPhoto from "../../assets/founder.webp";
import panoramaPhoto from "../../assets/screening-bundles/panorama-bundle.webp";
import alphaPhoto from "../../assets/screening-bundles/alpha-bundle.webp";
import empressPhoto from "../../assets/screening-bundles/empress-bundle.webp";

function Title({ eyebrow, title, sub, className = "" }) {
  return (
    <div className={`text-center max-w-[720px] mx-auto ${className}`}>
      {eyebrow && <p className="text-[13px] font-bold uppercase tracking-[0.14em] mb-4 text-l-accent">{eyebrow}</p>}
      <h2 className="l-head leading-[1.04] text-[38px] sm:text-[52px] lg:text-[60px] text-l-ink">{title}</h2>
      {sub && <p className="mt-5 text-[17px] sm:text-[19px] leading-[1.55] font-medium text-l-muted">{sub}</p>}
    </div>
  );
}

/* ── Feature tour: pick a card, the phone shows that screen ── */

const TOUR = [
  { icon: HomeIcon, tint: "#E1EEE7", fg: "#1F5C48", title: "Three small things a day", desc: "Move, eat, drink water. Tick them off and keep your streak.", screen: <HomeScreen />, label: "Home screen with food, water and exercise rings" },
  { icon: Camera, tint: "#F8E8DA", fg: "#D9772B", title: "Log food with a photo", desc: "Snap it, describe it or scan it. Over 480 local foods, even TZ and gob3.", screen: <FoodScreen />, label: "Food log with Ghanaian meals" },
  { icon: Activity, tint: "#F1E3EF", fg: "#8E4585", title: "Blood pressure and sugar", desc: "Record a reading in seconds and see your week at a glance.", screen: <ReadingsScreen />, label: "Blood pressure readings over a week" },
  { icon: Pill, tint: "#F7E3EB", fg: "#C8527E", title: "Medicine reminders", desc: "A reminder at the exact time. Mark each dose taken or skipped.", screen: <MedicinesScreen />, label: "Medicine reminders with doses marked taken" },
  { icon: FlaskConical, tint: "#E0ECF7", fg: "#3B86C8", title: "Lab results in plain words", desc: "A clinician reads every result before it reaches you.", screen: <ResultsScreen />, label: "Lab results each shown against its range" },
];

export function FeatureTour() {
  const [active, setActive] = useState(0);
  return (
    <section id="features" className="py-24 md:py-32 px-4 sm:px-6 scroll-mt-20">
      <Reveal>
        <Title title="Everything in one place." sub="Daily tracking for Ghanaian life, with lab tests in the same app." />
      </Reveal>
      <div className="max-w-[1100px] mx-auto mt-14 md:mt-20 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-10 md:gap-16 items-center">
        <div className="flex justify-center md:sticky md:top-28">
          <div className="relative">
            <div aria-hidden="true" className="absolute inset-[-14%] rounded-full blur-3xl opacity-60 transition-colors duration-500" style={{ background: TOUR[active].tint }} />
            <div className="relative">
              {TOUR.map((t, i) => (
                <div key={t.title} className={`transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"}`} aria-hidden={i !== active}>
                  <Phone label={t.label} scale={0.95} className="hidden md:block">{t.screen}</Phone>
                  <Phone label={t.label} scale={0.7} className="md:hidden">{t.screen}</Phone>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3" role="tablist" aria-label="App features">
          {TOUR.map((t, i) => {
            const on = i === active;
            return (
              <button
                key={t.title}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={`text-left rounded-[22px] p-5 sm:p-6 border transition-all duration-300 cursor-pointer flex items-center gap-4 ${
                  on ? "bg-l-card border-transparent shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)]" : "bg-transparent border-l-line"
                }`}
              >
                <span className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: t.tint, color: t.fg }}>
                  <t.icon size={21} strokeWidth={2.3} />
                </span>
                <span>
                  <span className="block l-head text-l-ink text-[19px] sm:text-[20px] !tracking-[-0.015em]">{t.title}</span>
                  <span className="block text-[15px] leading-[1.55] text-l-muted font-medium mt-1">{t.desc}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Why BetterHealth ── */

const WHY = [
  { icon: Soup, title: "Built for our food", desc: "Local dishes, local names, local portions. Understand and track the nutrients in the food you eat every day." },
  { icon: Wallet, title: "Pay your way", desc: "Pay for tests with Mobile Money or card, right in the app." },
  {
    icon: ShieldCheck,
    title: "Protected by law",
    desc: "Certified by the Ghana Data Protection Commission under Act 843. You choose who sees what.",
    link: { href: "https://app.dataprotection.org.gh/company/dpdZwcRth19j7oQFxmwoDj1ELCOABE", label: "Verify our certificate" },
  },
];

export function WhyCards() {
  return (
    <section className="py-24 md:py-32 px-4 sm:px-6">
      <Reveal>
        <Title title="Why BetterHealth?" />
      </Reveal>
      <div className="max-w-[1100px] mx-auto mt-14 grid md:grid-cols-3 gap-4">
        {WHY.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.08}>
            <div className="h-full bg-l-card rounded-[28px] p-8 border border-l-line">
              <span className="w-14 h-14 rounded-2xl bg-l-tint text-l-accent flex items-center justify-center mb-8">
                <w.icon size={26} strokeWidth={2.1} />
              </span>
              <h3 className="l-head text-l-ink text-[24px] !tracking-[-0.02em] mb-3">{w.title}</h3>
              <p className="text-[16px] leading-[1.6] text-l-muted font-medium">{w.desc}</p>
              {w.link && (
                <a href={w.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-5 text-[14px] font-bold text-l-accent no-underline hover:gap-2 transition-all">
                  {w.link.label} <ArrowRight size={15} />
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Lab tests band ── */

export function LabBand() {
  const points = [
    { icon: Smartphone, title: "Book in the app", desc: "Single tests or packages" },
    { icon: Truck, title: "Home or partner lab", desc: "We come to you, or walk in" },
    { icon: Clock, title: "Results in 48 to 72 hours", desc: "Read by a clinician first" },
  ];
  const reduce = useReducedMotion();
  const phoneRef = useRef(null);
  const inView = useInView(phoneRef, { amount: 0.4 });
  const [step, setStep] = useState(reduce ? 2 : 0);
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    if (reduce || !inView) return undefined;
    const t = setTimeout(() => setStep((s) => (s + 1) % 3), LAB_STEP_MS[step]);
    return () => clearTimeout(t);
  }, [step, inView, reduce, cycle]);
  const pick = (i) => { setStep(i); setCycle((c) => c + 1); };
  const label = "BetterHealth app: book an HbA1c test at home, track the sample collection, then see the result and a year of HbA1c falling from 8.4% to 5.2%";
  return (
    <section className="px-3 sm:px-6 pt-24 md:pt-32">
      <div className="max-w-[1240px] mx-auto rounded-[36px] bg-l-band overflow-hidden relative">
        <div aria-hidden="true" className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(50% 60% at 85% 30%, var(--l-band-soft), transparent 70%)" }} />
        <div className="relative grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center px-6 sm:px-12 lg:px-16 pt-16 lg:pt-20">
          <div className="text-center lg:text-left lg:pb-20">
            <Reveal>
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] mb-4 text-l-band-soft">Lab tests</p>
              <h2 className="l-head text-white leading-[1.04] text-[38px] sm:text-[52px] mb-5">Need a test? Book it in the app.</h2>
              <p className="text-[17px] leading-[1.6] text-white/75 font-medium max-w-[480px] mx-auto lg:mx-0 mb-9">
                With hundreds of partner labs across the country, we will send a lab to your home or office, wherever you are. Your results come straight to the app, where you can track how your health changes over time.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="grid sm:grid-cols-3 gap-3 mb-9 text-left">
                {points.map((p, i) => {
                  const on = i === step;
                  return (
                    <button
                      type="button"
                      key={p.title}
                      onClick={() => pick(i)}
                      aria-pressed={on}
                      className={`relative overflow-hidden rounded-2xl p-4 text-left transition-colors duration-300 ${on ? "bg-white/[0.16]" : "bg-white/[0.06] hover:bg-white/[0.1]"}`}
                    >
                      <p.icon size={20} className={`mb-3 transition-colors ${on ? "text-white" : "text-l-band-soft"}`} />
                      <p className="text-white font-bold text-[15px] leading-tight">{p.title}</p>
                      <p className="text-white/60 text-[13px] font-medium mt-1">{p.desc}</p>
                      {on && !reduce && (
                        <span
                          key={`${step}-${cycle}`}
                          aria-hidden="true"
                          className="absolute left-0 bottom-0 h-[3px] bg-l-band-soft origin-left"
                          style={{ width: "100%", animation: inView ? `labProgress ${LAB_STEP_MS[step]}ms linear forwards` : "none" }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              <Link to="/book-tests" className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] rounded-full px-7 py-4 text-[16px] font-bold no-underline hover:gap-3 transition-all">
                See tests and prices <ArrowRight size={18} />
              </Link>
            </Reveal>
          </div>
          <div ref={phoneRef} className="flex justify-center lg:justify-end self-end h-[330px] sm:h-[420px] lg:h-[520px] overflow-hidden">
            <div>
              <Phone label={label} scale={0.95} className="hidden sm:block"><LabStoryScreen step={step} /></Phone>
              <Phone label={label} scale={0.8} className="sm:hidden"><LabStoryScreen step={step} /></Phone>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Screening bundles ── */

const BUNDLE_NOTE = "Prices include VAT. Home collection is available as an add-on from GHS 150.";
const BUNDLE_PHOTOS = { panorama: panoramaPhoto, alpha: alphaPhoto, empress: empressPhoto };

export function Bundles() {
  const prices = usePricingCatalogue();
  const bundles = withBackendPanelPrices(screeningBundles.bundles, prices);
  const panels = new Map(testPanels.map((p) => [p.slug, p]));
  return (
    <section className="py-24 md:py-32 px-4 sm:px-6">
      <Reveal>
        <Title eyebrow="Popular packages" title="Check everything at once." sub="Check everything in your body for a fraction of the price." />
      </Reveal>
      <div className="max-w-[1100px] mx-auto mt-14 grid md:grid-cols-3 gap-4">
        {bundles.map((b, i) => {
          const panel = panels.get(b.slug);
          const tests = panel?.tests || [];
          return (
            <Reveal key={b.slug} delay={i * 0.08}>
              <Link to={`/book-tests/${b.slug}`} className="group h-full flex flex-col bg-l-card rounded-[28px] overflow-hidden no-underline border border-l-line transition-transform duration-300 hover:-translate-y-1">
                <div className="relative h-[200px] overflow-hidden">
                  <img src={BUNDLE_PHOTOS[b.slug] || panoramaPhoto} alt={`${b.name} health test`} loading="lazy" className="w-full h-full object-cover object-[center_35%] transition-transform duration-500 group-hover:scale-105" />
                  {b.popular && (
                    <span className="absolute top-4 left-4 bg-white text-[#0A0A0A] text-[11px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full">Most popular</span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="l-head text-l-ink text-[22px] !tracking-[-0.02em]">{panel?.displayName || b.name}</h3>
                  <p className="text-[14.5px] text-l-muted font-medium mt-1 mb-4">{panel?.subtitle || b.tagline}</p>
                  <ul className="flex flex-col gap-1.5 mb-6 flex-1">
                    {tests.slice(0, 4).map((t) => (
                      <li key={t} className="flex items-start gap-2 text-[14px] text-l-muted font-medium">
                        <Check size={15} strokeWidth={3} className="text-l-accent shrink-0 mt-0.5" /> {t}
                      </li>
                    ))}
                    {tests.length > 4 && <li className="text-[13.5px] text-l-muted font-semibold pl-6">and {tests.length - 4} more</li>}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="l-head text-l-ink text-[22px] !tracking-[-0.02em]">{b.price}</span>
                    <span className="w-11 h-11 rounded-full bg-l-btn text-l-btn-fg flex items-center justify-center transition-transform group-hover:translate-x-1">
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
      <p className="text-center text-[12.5px] text-l-muted mt-6 max-w-[640px] mx-auto">{BUNDLE_NOTE}</p>
    </section>
  );
}

/* ── Testimonials ── */

// Homepage-only quotes (the older ones in data/content.js still serve other pages).
const HOME_TESTIMONIALS = [
  { name: "Ama K.", age: 34, location: "Accra", discovery: "Diabetes", quote: "I got diagnosed with diabetes in 2019 and have struggled to manage my meals and blood sugar levels since. After joining the BetterHealth 90 Days Program, my sugar levels are now under control. Thank you BetterHealth!" },
  { name: "Andy A.", age: 35, location: "Tema", discovery: "Hypertension & Diabetes", quote: "My father had a stroke before he turned 44. So when I got diagnosed with diabetes and hypertension at 35 I got really scared. Fortunately, I saw BetterHealth on TikTok and signed up, now I am confident that this disease won\u2019t kill me like it killed my dad. God bless the BetterHealth team." },
  { name: "Naa D.", age: 28, location: "Kumasi", discovery: "Diabetes", quote: "I was diagnosed with gestational diabetes during my pregnancy and told it will go away after giving birth, it didn\u2019t. It\u2019s been 2 years now and I have struggled to control my blood sugar level since. But within 2 months of joining the BetterHealth 90 Days Program my blood levels are back to a healthy range. Now I can\u2019t wait to get pregnant again!" },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 bg-l-alt">
      <Reveal>
        <Title title="What people say about us." sub="From people who have used the app." />
      </Reveal>
      <div className="max-w-[1100px] mx-auto mt-14 grid md:grid-cols-3 gap-4">
        {HOME_TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <figure className="h-full bg-l-bg rounded-[28px] p-8 border border-l-line flex flex-col">
              <Quote size={28} className="text-l-accent mb-5" />
              <blockquote className="text-[17px] leading-[1.55] text-l-ink font-semibold flex-1">{t.quote}</blockquote>
              <figcaption className="mt-7 flex items-center justify-between gap-3">
                <span>
                  <span className="block font-bold text-l-ink text-[15px]">{t.name}</span>
                  <span className="block text-[13.5px] text-l-muted font-medium">{t.age}, {t.location}</span>
                </span>
                <span className="text-[12px] font-bold text-l-accent bg-l-tint rounded-full px-3 py-1.5 whitespace-nowrap">{t.discovery}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Founder ── */

const FOUNDER_QUOTE = "After watching diabetes and hypertension take so many beloved aunties, uncles, and in 2019, my father, I knew things had to change. But it was not until I also got diagnosed with diabetes at 27 that I finally decided to fight back. I built BetterHealth to put an end to diabetes and hypertension for good.";

export function Founder() {
  return (
    <section className="py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-[1000px] mx-auto grid md:grid-cols-[320px_1fr] gap-10 md:gap-16 items-center">
        <Reveal>
          <div className="relative w-[260px] md:w-full mx-auto aspect-[4/5] rounded-[32px] overflow-hidden">
            <img src={founderPhoto} alt="Great Damzi, Founder and CEO of BetterHealth Africa" loading="lazy" className="w-full h-full object-cover object-top" />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="text-center md:text-left">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] mb-5 text-l-accent">Why we built this</p>
            <blockquote className="l-head text-l-ink text-[21px] sm:text-[28px] leading-[1.3] !tracking-[-0.025em] mb-7">&ldquo;{FOUNDER_QUOTE}&rdquo;</blockquote>
            <p className="font-bold text-l-ink text-[16px]">Great Damzi</p>
            <p className="text-l-muted text-[14.5px] font-medium mb-6">Founder and CEO, BetterHealth Africa</p>
            <Link to="/about" className="inline-flex items-center gap-1 text-[15px] font-bold text-l-accent no-underline hover:gap-2 transition-all">
              Read our story <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Everything else ── */

const MORE = [
  { icon: Footprints, c: "#2F8F6B", title: "Steps, workouts, sleep", desc: "From Apple Health or Health Connect." },
  { icon: ChefHat, c: "#B45309", title: "Meal plans", desc: "Ghanaian or continental, by the week." },
  { icon: Droplets, c: "#3B86C8", title: "Water", desc: "A daily ring, counted in sachets." },
  { icon: CalendarHeart, c: "#B9476F", title: "Period tracking", desc: "Calendar, daily log, pregnancy mode." },
  { icon: Smile, c: "#D99A1E", title: "Mood", desc: "Check-ins, a journal, breathing." },
  { icon: Trophy, c: "#C8961E", title: "Challenges", desc: "Steps, food and water, with friends." },
  { icon: Users, c: "#0E7490", title: "Family", desc: "Choose what each person sees." },
  { icon: BookOpen, c: "#4D7C0F", title: "Learn", desc: "Health articles in everyday words." },
];

export function MoreGrid() {
  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 bg-l-alt">
      <Reveal>
        <Title title="And there's more." />
      </Reveal>
      <div className="max-w-[1100px] mx-auto mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {MORE.map((m, i) => (
          <Reveal key={m.title} delay={(i % 4) * 0.05}>
            <div className="h-full bg-l-bg rounded-[22px] p-5 sm:p-6 border border-l-line">
              <m.icon size={24} strokeWidth={2.2} style={{ color: m.c }} className="mb-4" />
              <p className="font-bold text-l-ink text-[16px] sm:text-[17px] leading-tight mb-1.5">{m.title}</p>
              <p className="text-[13.5px] sm:text-[14px] leading-[1.5] text-l-muted font-medium">{m.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── FAQ ── */

const QA = [
  { q: "Is the app free?", a: "Yes, it is free to download and use. You only pay when you book a lab test, by Mobile Money or card." },
  { q: "Which phones does it work on?", a: "iPhone and Android. Steps, sleep and resting heart rate can come in from Apple Health or Health Connect." },
  { q: "Will it understand my food?", a: "Yes. Search over 480 Ghanaian, Nigerian and West African foods by the names you use, such as TZ or gob3. Or snap a photo, describe your plate, or scan a barcode." },
  { q: "How do lab tests work?", a: "Choose a test in the app, pick home collection or a partner lab, and pay. A clinician reads your result before it reaches you, usually within 48 to 72 hours." },
  { q: "Who can see my health data?", a: "You decide. We are certified by the Ghana Data Protection Commission under Act 843, and you choose what each family member or your wellness consultant can see." },
  { q: "Does the app replace my doctor?", a: appDisclaimer },
];

export function LaunchFAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 px-4 sm:px-6 scroll-mt-20">
      <Reveal>
        <Title title="Questions?" />
      </Reveal>
      <div className="max-w-[760px] mx-auto mt-12 flex flex-col gap-3">
        {QA.map((item) => (
          <details key={item.q} className="group rounded-[20px] bg-l-card border border-l-line px-6 open:pb-6">
            <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer flex items-center justify-between gap-4 py-5 font-bold text-l-ink text-[17px]">
              {item.q}
              <span className="w-8 h-8 rounded-full bg-l-tint text-l-accent flex items-center justify-center shrink-0 transition-transform duration-300 group-open:rotate-45">
                <Plus size={16} strokeWidth={2.6} />
              </span>
            </summary>
            <p className="text-[15.5px] leading-[1.65] text-l-muted font-medium pr-10">{item.a}</p>
          </details>
        ))}
      </div>
      <p className="text-center mt-8">
        <Link to="/faq" className="text-[15px] font-bold text-l-accent no-underline inline-flex items-center gap-1 hover:gap-2 transition-all">
          More answers <ArrowRight size={16} />
        </Link>
      </p>
    </section>
  );
}

/* ── Final call to action ── */

export function LaunchCTA() {
  return (
    <section className="relative overflow-hidden px-4 sm:px-6 pt-24 md:pt-32 bg-l-alt">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(60% 70% at 50% 100%, var(--l-tint), transparent 70%)" }} />
      <Reveal>
        <div className="relative text-center max-w-[720px] mx-auto">
          <img src="/favicon-192x192.png" alt="" width="72" height="72" className="w-[72px] h-[72px] rounded-[20px] mx-auto mb-8 bg-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.3)]" />
          <h2 className="l-head text-l-ink leading-[1] text-[48px] sm:text-[68px] lg:text-[80px] mb-5">
            Start today.
            <br />
            <span className="text-l-accent">It's free.</span>
          </h2>
          <p className="text-[18px] sm:text-[20px] leading-[1.55] text-l-muted font-medium mb-9">Download it and log your first meal today.</p>
          <StoreButtons size="lg" className="justify-center" />
        </div>
      </Reveal>
      <div className="relative flex justify-center gap-4 sm:gap-8 mt-16 h-[230px] sm:h-[300px] overflow-hidden">
        <div className="translate-y-10 hidden sm:block"><Phone label="Blood pressure readings" scale={0.82}><ReadingsScreen /></Phone></div>
        <div><Phone label="Home screen" scale={0.82}><HomeScreen /></Phone></div>
        <div className="translate-y-10 hidden sm:block"><Phone label="Medicine reminders" scale={0.82}><MedicinesScreen /></Phone></div>
      </div>
    </section>
  );
}
