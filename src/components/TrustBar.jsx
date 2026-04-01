import { motion } from "framer-motion";

const partners = ["Lab Access Ghana", "Paystack", "Ghana Health Service"];

export default function TrustBar() {
  return (
    <motion.section
      className="py-6 px-6 bg-[#F3F4F6] border-y border-border"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-4">
        <p className="text-[11px] font-semibold text-text-muted uppercase tracking-[0.14em]">
          In partnership with
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {partners.map((partner) => (
            <span
              key={partner}
              className="px-5 py-2 rounded-pill border border-border bg-white text-[13px] font-semibold text-text-muted tracking-wide grayscale hover:grayscale-0 hover:border-primary/30 hover:text-text-primary transition-all duration-200"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
