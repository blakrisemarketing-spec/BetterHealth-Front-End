import { motion } from "framer-motion";

const BASE = import.meta.env.BASE_URL;

const trustedBy = [
  { name: "vire.agency", logo: `${BASE}logos/vire.png` },
  { name: "Blakrise", logo: null },
  { name: "Elevate", logo: `${BASE}logos/elevate.png` },
  { name: "SavingGrains", logo: `${BASE}logos/savinggrains.svg` },
  { name: "Skillitgh", logo: `${BASE}logos/skillitgh.png` },
  { name: "Dexwin", logo: `${BASE}logos/dexwin.svg` },
];

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
          Trusted By
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {trustedBy.map(({ name, logo }) =>
            logo ? (
              <img
                key={name}
                src={logo}
                alt={name}
                title={name}
                className="h-7 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-200"
              />
            ) : (
              <span
                key={name}
                className="text-[13px] font-semibold text-text-muted tracking-wide opacity-60 hover:opacity-100 transition-all duration-200"
              >
                {name}
              </span>
            )
          )}
        </div>
      </div>
    </motion.section>
  );
}
