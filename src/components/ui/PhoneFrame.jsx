import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * PhoneFrame — Premium iPhone 15 Pro-style mockup component.
 *
 * Props:
 *  src       — single image src (if not using screens[])
 *  alt       — alt text for single image
 *  screens[] — array of { src, alt } for auto-cycling carousel
 *  interval  — ms between slides (default 3500)
 *  className — outer wrapper className
 */
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
    <div
      className={`relative select-none ${className}`}
      style={{ width: "300px" }}
      aria-label="Phone mockup"
    >
      {/* ── Left hardware buttons ── */}
      {/* Silent / mute switch */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-4px",
          top: "88px",
          width: "4px",
          height: "22px",
          borderRadius: "2px 0 0 2px",
          background: "linear-gradient(180deg, #3A3A3C 0%, #2A2A2C 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), -1px 0 0 rgba(0,0,0,0.5)",
        }}
      />
      {/* Volume up */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-4px",
          top: "124px",
          width: "4px",
          height: "36px",
          borderRadius: "2px 0 0 2px",
          background: "linear-gradient(180deg, #3A3A3C 0%, #2A2A2C 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), -1px 0 0 rgba(0,0,0,0.5)",
        }}
      />
      {/* Volume down */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-4px",
          top: "172px",
          width: "4px",
          height: "36px",
          borderRadius: "2px 0 0 2px",
          background: "linear-gradient(180deg, #3A3A3C 0%, #2A2A2C 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), -1px 0 0 rgba(0,0,0,0.5)",
        }}
      />

      {/* ── Right hardware button (power) ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-4px",
          top: "140px",
          width: "4px",
          height: "48px",
          borderRadius: "0 2px 2px 0",
          background: "linear-gradient(180deg, #3A3A3C 0%, #2A2A2C 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 1px 0 0 rgba(0,0,0,0.5)",
        }}
      />

      {/* ── Phone body ── */}
      <div
        style={{
          position: "relative",
          borderRadius: "52px",
          background: "linear-gradient(145deg, #2C2C2E 0%, #1C1C1E 60%, #141416 100%)",
          padding: "12px",
          boxShadow: [
            /* Key lift shadow */
            "0 60px 120px rgba(0,0,0,0.55)",
            "0 30px 60px rgba(0,0,0,0.35)",
            "0 8px 20px rgba(0,0,0,0.25)",
            /* Edge highlight */
            "0 0 0 1.5px rgba(255,255,255,0.12)",
            /* Inner rim */
            "inset 0 0 0 1px rgba(255,255,255,0.05)",
            /* Top-left specular */
            "inset 2px 2px 4px rgba(255,255,255,0.06)",
          ].join(", "),
        }}
      >
        {/* Top edge specular highlight (titanium-style) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "20%",
            right: "20%",
            height: "1px",
            borderRadius: "50%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
          }}
        />

        {/* ── Dynamic Island ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            width: "108px",
            height: "30px",
            background: "#000",
            borderRadius: "9999px",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 2px 6px rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: "18px",
          }}
        >
          {/* Front camera */}
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #1A1A2E, #0D0D0D)",
              border: "1.5px solid #2A2A2A",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.04)",
            }}
          />
        </div>

        {/* ── Screen ── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            borderRadius: "42px",
            background: "#000",
            /* Very subtle inner shadow to add depth at screen edges */
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.5)",
          }}
        >
          {isMulti ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={currentSrc}
                alt={currentAlt}
                className="w-full h-auto block"
                style={{ display: "block", maxWidth: "100%" }}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                loading="lazy"
              />
            </AnimatePresence>
          ) : (
            <img
              src={currentSrc}
              alt={currentAlt}
              className="w-full h-auto block"
              style={{ display: "block", maxWidth: "100%" }}
              loading="lazy"
            />
          )}

          {/* Screen glare overlay — subtle top-left reflection */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "42px",
              pointerEvents: "none",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
            }}
          />
        </div>

        {/* ── Bottom speaker grill ── */}
        <div
          aria-hidden="true"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            marginTop: "8px",
            marginBottom: "2px",
          }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: "3px",
                height: "3px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                boxShadow: "0 1px 0 rgba(0,0,0,0.5)",
              }}
            />
          ))}
        </div>

        {/* ── Home indicator bar ── */}
        {isMulti && (
          <div style={{ display: "flex", justifyContent: "center", paddingBottom: "4px" }}>
            <div
              style={{
                width: "88px",
                height: "4px",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.2)",
              }}
            />
          </div>
        )}
      </div>

      {/* ── Screen carousel dots ── */}
      {isMulti && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "6px",
            marginTop: "16px",
          }}
        >
          {screens.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View screen ${i + 1}`}
              style={{
                width: i === active ? "20px" : "6px",
                height: "6px",
                borderRadius: "9999px",
                background: i === active ? "#0D9488" : "rgba(0,0,0,0.2)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
