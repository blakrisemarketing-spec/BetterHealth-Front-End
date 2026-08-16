import { motion } from "framer-motion";

/**
 * `duration` defaults to the site-wide 0.7s. Long paid-campaign pages pass
 * something shorter: a reader flicking down a 12,000px landing page can outrun a
 * 0.7s fade and meet a screen of blank cream, which on a page bought by the
 * click is a bounce rather than a missed animation.
 */
export default function Reveal({ children, delay = 0, direction = "up", className = "", duration = 0.7 }) {
  const offsets = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
