import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./ui/Reveal";
import { faqs } from "../data/content";

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div
      className="border-b border-border cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex justify-between items-center py-5 gap-4">
        <span className="text-base font-semibold text-text-primary font-heading">
          {q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-primary shrink-0"
        >
          <ChevronDown size={20} />
        </motion.span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[15px] leading-relaxed text-text-secondary font-body m-0">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  // DEFECT 7: single-open behaviour
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 lg:py-[120px] px-6 bg-base">
      <div className="max-w-[720px] mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">
              FAQ
            </p>
            <h2 className="text-h2 font-extrabold text-text-primary font-heading tracking-tight">
              Questions?{" "}
              <span className="italic bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent tracking-normal">
                Answered.
              </span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
