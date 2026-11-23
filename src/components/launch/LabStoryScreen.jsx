import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, FlaskConical, Home as HomeIcon, Building2, Activity } from "lucide-react";

/*
 * Coded copy of the app's booking → collection → result flow, drawn for the
 * 276px Phone screen. Colours are the mobile app's theme (src/ui/theme.ts).
 * `step` is driven by LabBand so the three cards and the phone stay in sync.
 */

const C = {
  ground: "#F5F1E8", ink: "#1E2A27", muted: "#5F6B67", faint: "#9BA39D", border: "#E6E0D4",
  brand: "#2F8F6B", deep: "#1F5C48", tint: "#E1EEE7", soft: "#C9E0D4",
  red: "#B3261E", amber: "#D99A1E",
};

const ease = [0.22, 1, 0.36, 1];

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3.5 pb-1 text-[12px] font-bold" style={{ color: C.ink }}>
      <span>09:41</span>
      <span className="flex items-center gap-1">
        <span className="flex items-end gap-[1.5px]">{[4, 6, 8, 10].map((h) => <span key={h} className="w-[2.5px] rounded-sm" style={{ height: h, background: C.ink }} />)}</span>
        <span className="ml-1 w-[20px] h-[10px] rounded-[3px] border p-[1px]" style={{ borderColor: C.ink }}><span className="block h-full w-[75%] rounded-[1.5px]" style={{ background: C.brand }} /></span>
      </span>
    </div>
  );
}

function Header({ title }) {
  return (
    <div className="relative flex items-center justify-center h-11 px-4">
      <span className="absolute left-3 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm"><ChevronLeft size={16} color={C.ink} /></span>
      <span className="text-[14px] font-bold" style={{ color: C.ink }}>{title}</span>
    </div>
  );
}

const fade = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.3, ease } },
};

/* ── 1. Book ── */

function BookScreen() {
  return (
    <motion.div key="book" {...fade} className="absolute inset-0 flex flex-col">
      <StatusBar />
      <Header title="Book a test" />
      <div className="px-4 pt-2 flex flex-col gap-2.5">
        <p className="text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: C.muted }}>Your test</p>
        <div className="rounded-2xl bg-white p-3 flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.tint }}><FlaskConical size={17} color={C.deep} /></span>
          <span className="flex-1 min-w-0">
            <span className="block text-[13px] font-bold" style={{ color: C.ink }}>HbA1c</span>
            <span className="block text-[11px] font-medium" style={{ color: C.muted }}>Average blood sugar, 3 months</span>
          </span>
          <span className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: C.brand }}><Check size={12} color="#fff" strokeWidth={3} /></span>
        </div>

        <p className="text-[11px] font-bold uppercase tracking-[0.08em] mt-2" style={{ color: C.muted }}>Where?</p>
        <div className="rounded-2xl bg-white p-3 flex items-center gap-3 border-2 border-transparent">
          <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.ground }}><Building2 size={17} color={C.muted} /></span>
          <span className="flex-1">
            <span className="block text-[13px] font-bold" style={{ color: C.ink }}>At a lab</span>
            <span className="block text-[11px] font-medium" style={{ color: C.muted }}>Walk in near you</span>
          </span>
        </div>
        <motion.div
          className="rounded-2xl bg-white p-3 flex items-center gap-3 border-2"
          initial={{ borderColor: "rgba(47,143,107,0)" }}
          animate={{ borderColor: C.brand }}
          transition={{ delay: 1.1, duration: 0.3 }}
        >
          <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.tint }}><HomeIcon size={17} color={C.deep} /></span>
          <span className="flex-1">
            <span className="block text-[13px] font-bold" style={{ color: C.ink }}>At home</span>
            <span className="block text-[11px] font-medium" style={{ color: C.muted }}>We send someone to you</span>
          </span>
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.15, type: "spring", stiffness: 500, damping: 22 }} className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: C.brand }}>
            <Check size={12} color="#fff" strokeWidth={3} />
          </motion.span>
        </motion.div>
      </div>

      <div className="mt-5 px-4">
        <motion.div
          className="rounded-full py-3.5 text-center text-[14px] font-bold text-white"
          style={{ background: C.deep }}
          animate={{ scale: [1, 1, 0.95, 1] }}
          transition={{ delay: 2, duration: 0.45, times: [0, 0.01, 0.4, 1] }}
        >
          Book test
        </motion.div>
        <p className="text-center text-[11px] font-medium mt-2.5" style={{ color: C.muted }}>Results in 48 to 72 hours</p>
      </div>

      {/* finger tap */}
      <motion.span
        aria-hidden="true"
        className="absolute w-9 h-9 rounded-full"
        style={{ background: "rgba(30,42,39,0.22)", border: "2px solid rgba(255,255,255,0.8)" }}
        initial={{ opacity: 0, left: 190, top: 420 }}
        animate={{ opacity: [0, 1, 1, 1, 1, 0], left: [190, 204, 204, 120, 120, 120], top: [420, 302, 302, 378, 378, 378], scale: [1, 1, 0.8, 1, 0.8, 1] }}
        transition={{ duration: 2.6, times: [0, 0.35, 0.42, 0.7, 0.78, 1], ease: "easeInOut" }}
      />
    </motion.div>
  );
}

/* ── 2. Collection ── */

const TRACK = [
  { t: "Booked", d: "HbA1c, at home" },
  { t: "Collector on the way", d: "Arriving 8:30 to 9:00" },
  { t: "Sample taken", d: "Off to the lab" },
  { t: "Results ready", d: "After a clinician reads them" },
];

function CollectScreen() {
  return (
    <motion.div key="collect" {...fade} className="absolute inset-0 flex flex-col">
      <StatusBar />
      <Header title="Your booking" />
      <div className="px-4 pt-2">
        <div className="rounded-2xl bg-white p-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.tint }}><HomeIcon size={17} color={C.deep} /></span>
            <span>
              <span className="block text-[13px] font-bold" style={{ color: C.ink }}>Home collection</span>
              <span className="block text-[11px] font-medium" style={{ color: C.muted }}>Tomorrow morning</span>
            </span>
          </div>
          <div className="relative">
            {TRACK.map((s, i) => {
              const done = i < 3;
              const delay = 0.3 + i * 0.75;
              return (
                <div key={s.t} className="relative flex gap-3 pb-4 last:pb-0">
                  {i < TRACK.length - 1 && (
                    <span className="absolute left-[9px] top-5 bottom-0 w-[2px]" style={{ background: C.border }}>
                      {done && i < 2 && (
                        <motion.span className="absolute inset-x-0 top-0 block" style={{ background: C.brand }} initial={{ height: 0 }} animate={{ height: "100%" }} transition={{ delay: delay + 0.3, duration: 0.45 }} />
                      )}
                    </span>
                  )}
                  <motion.span
                    className="relative z-10 w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2"
                    initial={{ background: "#fff", borderColor: C.border }}
                    animate={done ? { background: C.brand, borderColor: C.brand } : {}}
                    transition={{ delay, duration: 0.25 }}
                  >
                    {done && (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: delay + 0.05, type: "spring", stiffness: 500, damping: 20 }}>
                        <Check size={11} color="#fff" strokeWidth={3} />
                      </motion.span>
                    )}
                  </motion.span>
                  <motion.span initial={{ opacity: 0.45 }} animate={{ opacity: done ? 1 : 0.45 }} transition={{ delay }}>
                    <span className="block text-[12.5px] font-bold leading-tight" style={{ color: C.ink }}>{s.t}</span>
                    <span className="block text-[11px] font-medium" style={{ color: C.muted }}>{s.d}</span>
                  </motion.span>
                </div>
              );
            })}
          </div>
        </div>
        <motion.div
          className="mt-3 rounded-2xl p-3 flex items-center gap-3"
          style={{ background: C.tint }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.4 }}
        >
          <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0"><FlaskConical size={15} color={C.deep} /></span>
          <span className="text-[11.5px] font-semibold leading-snug" style={{ color: C.deep }}>No fasting needed for HbA1c. Eat and drink as normal.</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── 3. Result + trend ── */

const RESULTS = [
  { date: "12 Nov 2025", v: 6.8, tag: "Needs attention", c: C.red },
  { date: "11 Feb 2026", v: 5.6, tag: "Normal", c: C.brand },
  { date: "13 May 2026", v: 5.4, tag: "Normal", c: C.brand },
  { date: "12 Aug 2026", v: 5.3, tag: "Normal", c: C.brand },
  { date: "10 Nov 2026", v: 5.2, tag: "Normal", c: C.brand },
];

const W = 228, H = 96, MIN = 4.6, MAX = 7.2;
const px = (i) => 6 + (i * (W - 12)) / (RESULTS.length - 1);
const py = (v) => 6 + ((MAX - v) / (MAX - MIN)) * (H - 12);
const LINE = RESULTS.map((r, i) => `${i ? "L" : "M"}${px(i)},${py(r.v)}`).join(" ");

function TrendScreen() {
  return (
    <motion.div key="trend" {...fade} className="absolute inset-0 flex flex-col">
      <StatusBar />
      <Header title="Hemoglobin A1c" />

      <div className="px-3 pt-1 flex flex-col gap-3">
        <div className="rounded-2xl bg-white p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: C.tint }}><Activity size={12} color={C.deep} /></span>
            <span className="text-[12px] font-bold" style={{ color: C.ink }}>Over time, in %</span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="block overflow-visible">
            <rect x="0" y={py(5.7)} width={W} height={H - py(5.7) - 2} rx="6" fill={C.tint} />
            <motion.path d={LINE} fill="none" stroke={C.faint} strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 1.4, ease: "easeInOut" }} />
            {RESULTS.map((r, i) => (
              <motion.circle key={r.date} cx={px(i)} cy={py(r.v)} r="3.6" fill={r.c} stroke="#fff" strokeWidth="1.5"
                initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ transformOrigin: `${px(i)}px ${py(r.v)}px` }}
                transition={{ delay: 0.3 + i * 0.32, type: "spring", stiffness: 500, damping: 18 }} />
            ))}
            <motion.text x={px(4) - 4} y={py(5.2) - 8} textAnchor="end" fontSize="9" fontWeight="700" fill={C.ink} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>5.2</motion.text>
          </svg>
          <div className="flex justify-between text-[8.5px] font-medium mt-1.5" style={{ color: C.muted }}>
            <span>Nov 2025</span><span>Shaded: usual range</span><span>Nov 2026</span>
          </div>
        </div>

        <p className="text-[12.5px] font-bold px-1" style={{ color: C.ink }}>Your results</p>
        <div className="rounded-2xl bg-white overflow-hidden">
          {[...RESULTS].reverse().map((r, i) => (
            <motion.div key={r.date} className="flex items-center justify-between px-3 py-2 border-b last:border-0" style={{ borderColor: C.ground }}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 + i * 0.1, duration: 0.35 }}>
              <span className="text-[11.5px] font-medium" style={{ color: C.ink }}>{r.date}</span>
              <span className="text-right">
                <span className="block text-[11.5px] font-bold" style={{ color: C.ink }}>{r.v} %</span>
                <span className="block text-[9.5px] font-semibold" style={{ color: r.c }}>{r.tag}</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const SCREENS = [BookScreen, CollectScreen, TrendScreen];

export default function LabStoryScreen({ step }) {
  const Screen = SCREENS[step];
  return (
    <div className="absolute inset-0" style={{ background: C.ground, fontFamily: "Quicksand, var(--font-sans, ui-sans-serif), system-ui, sans-serif" }}>
      <AnimatePresence initial={false}>
        <Screen key={step} />
      </AnimatePresence>
    </div>
  );
}

/* How long each step stays on screen, in ms. */
export const LAB_STEP_MS = [3400, 3800, 5000];
