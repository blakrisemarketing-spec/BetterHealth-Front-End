import { motion } from "framer-motion";

const BASE = import.meta.env.BASE_URL;

const trustedBy = [
  { name: "vire.agency", logo: `${BASE}logos/vire.png` },
  { name: "SavingGrains", logo: `${BASE}logos/savinggrains.svg` },
  { name: "Skillitgh", logo: `${BASE}logos/skillitgh.png` },
  { name: "Dexwin", logo: `${BASE}logos/dexwin.svg` },
  { name: "Diya Impact Foundation", logo: `${BASE}logos/diya-impact-foundation.png` },
  {
    name: "Methodist Church Ghana",
    logo: `${BASE}logos/methodist-church-ghana.png`,
    className: "max-h-12 max-w-[170px]",
  },
  { name: "Project Management Institute Ghana", logo: `${BASE}logos/pmi-ghana.png` },
  {
    name: "Wesley Girls Senior High School",
    logo: `${BASE}logos/wesley-girls.png`,
    className: "max-h-12 max-w-[180px]",
  },
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
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {trustedBy.map(({ name, logo, className }) =>
            logo ? (
              <img
                key={name}
                src={logo}
                alt={name}
                title={name}
                className={`w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-200 ${
                  className || "max-h-8 max-w-[150px]"
                }`}
              />
            ) : (
              <span
                key={name}
                className="text-center text-[13px] font-semibold text-text-muted tracking-wide opacity-60 hover:opacity-100 transition-all duration-200"
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
