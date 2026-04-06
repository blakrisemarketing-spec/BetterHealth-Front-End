import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function PhoneFrame({ src, alt, screens, interval = 3500, className = "" }) {
  const [active, setActive] = useState(0);
  const isMulti = Array.isArray(screens) && screens.length > 1;

  useEffect(() => {
    if (!isMulti) return;
    const timer = setInterval(() => setActive((p) => (p + 1) % screens.length), interval);
    return () => clearInterval(timer);
  }, [isMulti, screens, interval]);

  const currentSrc = isMulti ? screens[active].src : src;
  const currentAlt = isMulti ? screens[active].alt : alt;

  return (
    <div className={`w-full max-w-[280px] rounded-[36px] overflow-hidden bg-[#E8E8E8] p-2 shadow-[0_40px_80px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06)] relative ${className}`}>
      {/* Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[24px] bg-[#E8E8E8] rounded-b-2xl z-10" />
      {/* Screen */}
      <div className="w-full rounded-[28px] overflow-hidden bg-white relative">
        {isMulti ? (
          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={currentSrc}
              alt={currentAlt}
              className="w-full h-auto block"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              loading="lazy"
            />
          </AnimatePresence>
        ) : (
          <img
            src={currentSrc}
            alt={currentAlt}
            className="w-full h-auto block"
            loading="lazy"
          />
        )}
      </div>
      {/* Dots */}
      {isMulti && (
        <div className="flex justify-center gap-1.5 mt-1.5 pb-0.5">
          {screens.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "bg-primary scale-125" : "bg-gray-400/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
