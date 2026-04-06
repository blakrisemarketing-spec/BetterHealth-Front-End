import { useState } from "react";
import { Heart, FlaskConical, Shield, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./ui/Reveal";
import { testCategories } from "../data/content";

const iconMap = {
  "Heart & Cardiovascular": Heart,
  "Liver Function": FlaskConical,
  "Kidney Function": Shield,
  "Metabolic & Diabetes": BarChart3,
  "Hormones": Heart,
  "Nutrients & Vitamins": FlaskConical,
  "Blood Health": Heart,
  "Thyroid": Shield,
};

export default function WhatWeTest() {
  const [active, setActive] = useState(0);
  const cat = testCategories[active];
  const Icon = iconMap[cat.name] || Heart;

  return (
    <section id="what-we-test" className="py-20 lg:py-[120px] px-6 bg-section-alt">
      <div className="max-w-[1280px] mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">
              What We Test
            </p>
            <h2 className="text-h2 font-extrabold text-text-primary font-heading tracking-tight">
              127+ biomarkers across{" "}
              <span className="italic bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent tracking-normal">
                8 body systems
              </span>
            </h2>
          </div>
        </Reveal>

        {/* Category tabs */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {testCategories.map((c, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`px-4 py-3 rounded-btn border-none cursor-pointer text-[13px] font-semibold font-heading transition-all duration-250 ${
                  active === i
                    ? "bg-primary text-white"
                    : "bg-card text-text-secondary border border-border hover:border-primary hover:text-primary"
                }`}
              >
                {c.short} <span className="opacity-70 ml-1">({c.count})</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Active panel */}
        <Reveal>
          <div className="bg-card rounded-card p-5 sm:p-8 border border-border shadow-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary-bg flex items-center justify-center">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <h3 className="text-[22px] font-bold text-text-primary font-heading">
                    {cat.name}
                  </h3>
                  <span className="bg-primary-bg text-primary px-3 py-1 rounded-pill text-[13px] font-semibold">
                    {cat.count} biomarkers
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.markers.map((marker, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-section-alt border border-border text-text-primary font-mono hover:border-primary/30 transition-colors"
                    >
                      {marker}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
