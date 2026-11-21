import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Apple, HeartPulse, Smartphone, CreditCard } from "lucide-react";
import Reveal from "../ui/Reveal";
import Phone from "./Phone";
import { HomeScreen, FoodScreen, WaterScreen, ExerciseScreen } from "../app/AppScreenMockups";

/* A soft morning sky behind the hero: warm sun, mint and blue light that
   drift slowly, fading to the page colour at the bottom. Pure CSS. */
export function Sky() {
  return (
    <div aria-hidden="true" className="l-sky absolute inset-x-0 top-0 h-[1100px] overflow-hidden pointer-events-none">
      <div className="absolute -top-[10%] left-[8%] w-[46vw] h-[46vw] max-w-[720px] max-h-[720px] rounded-full blur-[90px] opacity-70 animate-[skyA_18s_ease-in-out_infinite]" style={{ background: "#FFD8B5" }} />
      <div className="absolute top-[4%] right-[4%] w-[42vw] h-[42vw] max-w-[660px] max-h-[660px] rounded-full blur-[90px] opacity-70 animate-[skyB_22s_ease-in-out_infinite]" style={{ background: "#C9F0DA" }} />
      <div className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] max-w-[620px] max-h-[620px] rounded-full blur-[100px] opacity-60 animate-[skyA_26s_ease-in-out_infinite_reverse]" style={{ background: "#D6E6FF" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 0%, transparent 45%, var(--l-bg) 92%)" }} />
    </div>
  );
}

/* What the app connects to and how people pay. Plain words, no logos. */
export function WorksWith() {
  const items = [
    { icon: Apple, label: "Apple Health" },
    { icon: HeartPulse, label: "Health Connect" },
    { icon: Smartphone, label: "Mobile Money" },
    { icon: CreditCard, label: "Visa and Mastercard" },
  ];
  return (
    <section className="px-4 sm:px-6 pt-6 pb-4">
      <p className="text-center text-[14px] font-semibold text-l-muted mb-5">Works with</p>
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
        {items.map((it) => (
          <span key={it.label} className="inline-flex items-center gap-2 text-[17px] sm:text-[19px] font-bold text-l-ink opacity-75 tracking-[-0.01em]">
            <it.icon size={20} strokeWidth={2.2} /> {it.label}
          </span>
        ))}
      </div>
    </section>
  );
}

/* A statement that lights up word by word as it scrolls into view. */
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  );
}

export function Statement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const text =
    "Most people only see a doctor when something is already wrong. BetterHealth puts your food, your readings and your lab results on your phone, so you can see changes early.";
  const words = text.split(" ");
  return (
    <section ref={ref} className="px-5 sm:px-6 py-28 md:py-40">
      <p className="l-head text-l-ink text-center max-w-[1000px] mx-auto text-[30px] sm:text-[44px] lg:text-[54px] leading-[1.18] !tracking-[-0.03em]">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </p>
    </section>
  );
}

/* Photo to food log: the phone camera on a plate of ampesi, then the app's
   real result for that photo. The kcal labels are the values the app
   returned for this exact photo (staging, 21 Nov 2026); keep them in step
   with food-meal-v1.webp if either changes. The plate photo is AI-made. */
const SCAN_LABELS = [
  { name: "Boiled plantain", kcal: 272, className: "left-[318px] top-[96px] [animation-delay:0s]" },
  { name: "Kontomire stew", kcal: 505, className: "left-[586px] top-[58px] [animation-delay:1.2s]" },
  { name: "Boiled yam", kcal: 586, className: "left-[292px] top-[180px] [animation-delay:2.4s]" },
  { name: "Egg", kcal: 72, className: "left-[640px] top-[204px] [animation-delay:0.6s]" },
];

function CameraView() {
  const corner = "absolute w-12 h-12 border-white border-[3px]";
  return (
    <div className="absolute inset-0">
      <img src="/app-screens/ampesi-camera-v1.webp" alt="" className="absolute inset-0 w-full h-full object-cover" width="552" height="1208" />
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute left-[14%] right-[14%] top-[28%] bottom-[30%]">
        <span className={`${corner} left-0 top-0 border-r-0 border-b-0 rounded-tl-2xl`} />
        <span className={`${corner} right-0 top-0 border-l-0 border-b-0 rounded-tr-2xl`} />
        <span className={`${corner} left-0 bottom-0 border-r-0 border-t-0 rounded-bl-2xl`} />
        <span className={`${corner} right-0 bottom-0 border-l-0 border-t-0 rounded-br-2xl`} />
      </div>
      <div className="absolute bottom-[34px] left-1/2 -translate-x-1/2 w-[66px] h-[66px] rounded-full border-[4px] border-white flex items-center justify-center">
        <span className="w-[52px] h-[52px] rounded-full bg-white" />
      </div>
    </div>
  );
}

/* The hero visual: camera on the plate, then the app's result. A fixed
   760x700 stage scaled down per breakpoint so every label stays in place. */
const STAGE_SIZES = {
  full: { box: "h-[318px] sm:h-[560px] lg:h-[700px]", stage: "scale-[0.45] sm:scale-[0.8] lg:scale-100" },
  // Half of a two-column hero: the column is about 570px wide at lg.
  column: { box: "h-[318px] sm:h-[560px] lg:h-[520px]", stage: "scale-[0.45] sm:scale-[0.8] lg:scale-[0.74]" },
};

export function ScanStage({ size = "full", className = "" }) {
  const sz = STAGE_SIZES[size];
  return (
    <div className={`relative mx-auto w-full ${sz.box} ${className}`}>
      <div className={`absolute left-1/2 top-0 w-[760px] h-[700px] -translate-x-1/2 origin-top ${sz.stage}`}>
        <div className="absolute left-[10px] top-[60px] rotate-[-7deg]">
          <Phone label="The phone camera pointed at a plate of ampesi and kontomire stew"><CameraView /></Phone>
        </div>
        <svg aria-hidden="true" className="absolute left-[292px] top-[330px] w-[120px] h-[90px] text-l-ink" viewBox="0 0 120 90" fill="none">
          <path d="M4 60 C 30 70, 52 64, 58 40 C 63 20, 44 14, 40 32 C 36 52, 70 66, 108 52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M96 44 L 110 51 L 98 62" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="absolute left-[420px] top-0 rotate-[5deg]">
          <Phone label="BetterHealth meal page: ampesi and kontomire stew, 1,591 kcal, with protein, carbs, fat and fibre">
            <img src="/app-screens/food-meal-v1.webp" alt="" className="absolute inset-0 w-full h-full object-cover object-top" width="600" height="1304" />
          </Phone>
        </div>
        {SCAN_LABELS.map((l) => (
          <div key={l.name} aria-hidden="true" className={`absolute z-10 bg-white rounded-[20px] px-5 py-3 text-center shadow-[0_18px_40px_-12px_rgba(0,0,0,0.3)] animate-float ${l.className}`}>
            <div className="text-[19px] font-bold text-[#1E2A27] whitespace-nowrap leading-tight">{l.name}</div>
            <div className="text-[24px] font-extrabold text-[#1E2A27] leading-tight">{l.kcal} <span className="text-[16px] font-bold text-[#5F6B67]">kcal</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Feature cards in a bento grid, each with a phone rising from the bottom. */
const CARDS = [
  { title: "Log food with a photo", desc: "Snap it, describe it or scan it. Over 480 local foods, even TZ and gob3.", from: "#FFEBDC", to: "#FFD9BF", screen: <FoodScreen />, label: "Food log with Ghanaian meals" },
  { title: "Drink enough water", desc: "Tap a sachet each time you drink. See how close you are to the day's amount.", from: "#E3EEFB", to: "#CFE1F7", screen: <WaterScreen />, label: "Water log showing four sachets today" },
  { title: "Move every day", desc: "Record a walk or start a workout. Watch your minutes add up.", from: "#EFE8FA", to: "#DFD3F3", screen: <ExerciseScreen />, label: "Workouts screen with 22 minutes of exercise today" },
];

function BentoPhone({ children, label }) {
  return (
    <div className="mt-auto pt-8 flex justify-center h-[332px] sm:h-[372px] overflow-hidden">
      <div className="translate-y-0 transition-transform duration-500 group-hover:-translate-y-3">
        <Phone label={label} scale={0.78}>{children}</Phone>
      </div>
    </div>
  );
}

export function Bento() {
  return (
    <section id="features" className="py-24 md:py-32 px-3 sm:px-6 scroll-mt-24">
      <Reveal>
        <div className="text-center max-w-[720px] mx-auto px-2">
          <h2 className="l-head leading-[1.04] text-[38px] sm:text-[52px] lg:text-[60px] text-l-ink">Everything in one place.</h2>
          <p className="mt-5 text-[17px] sm:text-[19px] leading-[1.55] font-medium text-l-muted">Daily tracking for Ghanaian life, with lab tests in the same app.</p>
        </div>
      </Reveal>
      <div className="max-w-[1180px] mx-auto mt-14 grid md:grid-cols-3 gap-4">
        {CARDS.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08} className="h-full">
            <div className="bento group h-full flex flex-col rounded-[32px] overflow-hidden px-7 sm:px-8 pt-8 sm:pt-9" style={{ background: `linear-gradient(180deg, ${c.from}, ${c.to})` }}>
              <h3 className="l-head text-[#0A0A0A] text-[26px] sm:text-[28px] leading-[1.1] !tracking-[-0.025em] mb-2">{c.title}</h3>
              <p className="text-[15.5px] leading-[1.55] text-[#0A0A0A]/60 font-medium">{c.desc}</p>
              <BentoPhone label={c.label}>{c.screen}</BentoPhone>
            </div>
          </Reveal>
        ))}
        <Reveal className="md:col-span-3">
          <div className="bento group rounded-[32px] overflow-hidden grid md:grid-cols-2 items-end gap-6 px-7 sm:px-12 pt-10 md:pt-0" style={{ background: "linear-gradient(135deg, #E3F4EA, #CDEBDB)" }}>
            <div className="md:py-14">
              <h3 className="l-head text-[#0A0A0A] text-[30px] sm:text-[40px] leading-[1.06] !tracking-[-0.03em] mb-3">Three small things a day.</h3>
              <p className="text-[16px] sm:text-[17px] leading-[1.55] text-[#0A0A0A]/60 font-medium max-w-[420px]">
                Move, eat your meals, drink your water. Tick them off on your home screen and keep your streak going.
              </p>
            </div>
            <div className="flex justify-center md:justify-end h-[320px] sm:h-[380px] overflow-hidden md:pt-10">
              <div className="transition-transform duration-500 group-hover:-translate-y-3">
                <Phone label="Home screen with a full week of healthy days and food, water and exercise rings" scale={0.82}><HomeScreen /></Phone>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
