import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { phoneScreens } from "../../data/content";

export default function PhoneMockup() {
  const [activeScreen, setActiveScreen] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveScreen((p) => (p + 1) % 3), 3500);
    return () => clearInterval(timer);
  }, []);

  const s = phoneScreens[activeScreen];

  return (
    <div className="w-full max-w-[280px] aspect-[1/2] rounded-[36px] overflow-hidden bg-black p-3 shadow-[0_40px_80px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)] relative">
      {/* Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-b-2xl z-10" />

      <div className="w-full h-full rounded-[26px] overflow-hidden bg-gradient-to-b from-[#0F172A] to-[#1E293B] p-5 pb-3 flex flex-col">
        {/* Status bar */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-white text-[13px] font-semibold">9:41</span>
          <div className="flex gap-1 items-center">
            <div className="w-4 h-[10px] border border-white/50 rounded-sm relative">
              <div className="absolute top-[1px] left-[1px] right-[3px] bottom-[1px] bg-success rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* App header */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
            <span className="text-white text-sm font-extrabold">B</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={s.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-white text-base font-bold font-heading"
            >
              {s.title}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Screen content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col"
          >
            {s.score && (
              <div className="text-center mb-5">
                <div
                  className="w-[120px] h-[120px] rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{
                    background: `conic-gradient(#22c55e ${parseInt(s.score) * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
                  }}
                >
                  <div className="w-24 h-24 rounded-full bg-[#1E293B] flex flex-col items-center justify-center">
                    <span className="text-white text-[32px] font-extrabold font-heading">{s.score}</span>
                    <span className="text-text-muted text-[10px] uppercase tracking-widest">{s.label}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2 flex-1">
              {s.items.map((item, i) => (
                <div
                  key={i}
                  className="bg-white/5 rounded-xl px-3.5 py-3 flex justify-between items-center border border-white/[0.06]"
                >
                  <div>
                    <div className="text-white text-[13px] font-semibold">{item.name}</div>
                    {item.ref && <div className="text-text-muted text-[10px] mt-0.5">Ref: {item.ref}</div>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-bold font-body">{item.val}</span>
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  </div>
                </div>
              ))}

              {activeScreen === 2 && (
                <div className="flex-1 flex flex-col justify-center gap-3">
                  <div className="text-white/60 text-xs font-medium">HbA1c — Last 12 months</div>
                  <svg viewBox="0 0 220 80" className="w-full">
                    <defs>
                      <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10c98f" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#10c98f" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,60 Q30,55 55,50 T110,35 T165,40 T220,20" fill="none" stroke="#10c98f" strokeWidth="2.5" />
                    <path d="M0,60 Q30,55 55,50 T110,35 T165,40 T220,20 L220,80 L0,80Z" fill="url(#trendGrad)" />
                    {[0, 55, 110, 165, 220].map((x, i) => (
                      <circle key={i} cx={x} cy={[60, 50, 35, 40, 20][i]} r="4" fill="#10c98f" stroke="#1E293B" strokeWidth="2" />
                    ))}
                  </svg>
                  <div className="flex justify-between">
                    {["Mar", "May", "Jul", "Sep", "Nov"].map((m) => (
                      <span key={m} className="text-white/30 text-[10px]">{m}</span>
                    ))}
                  </div>
                  <div className="text-white/50 text-[11px] mt-1">
                    <span className="text-success font-bold">↓ 0.6%</span> improvement since March
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom nav */}
        <div className="flex justify-around pt-3 border-t border-white/[0.06] mt-auto">
          {["Home", "Results", "Trends"].map((tab, i) => (
            <div key={tab} className={`flex flex-col items-center gap-1 ${activeScreen === i ? "opacity-100" : "opacity-40"}`}>
              <div className={`w-5 h-5 rounded-md ${activeScreen === i ? "bg-primary" : "bg-transparent"}`} />
              <span className={`text-[9px] text-white ${activeScreen === i ? "font-bold" : "font-normal"}`}>{tab}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
