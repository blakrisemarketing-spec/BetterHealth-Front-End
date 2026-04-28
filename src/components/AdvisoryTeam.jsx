import Reveal from "./ui/Reveal";

const team = [
  {
    initials: "JS",
    name: "Dr. Jumana Sfarjilani",
    role: "Physician Specialist, Chronic Kidney Disease",
    org: "Trust Specialist Hospital",
  },
  {
    initials: "DG",
    name: "Dr. Delasy Gbekor",
    role: "Founder, Twelve in Twelve Foundation",
    org: "LuccaHealth Medical Specialty Center",
  },
  {
    initials: "AA",
    name: "Dr. Afia Agyinsam Amponsah",
    role: "MBBS, MSc (International Public Health), Dip. Aesthetic Medicine",
    org: "Founder, Doctor Next Door Network",
  },
];

export default function AdvisoryTeam() {
  return (
    <section className="py-20 lg:py-[120px] px-6 bg-base">
      <div className="max-w-[1100px] mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">
              Backed by Medical Experts
            </p>
            <h2 className="text-h2 font-extrabold text-text-primary font-heading tracking-tight">
              Meet our{" "}
              <span className="italic bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent tracking-normal">
                Medical Advisory Board
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="flex flex-col items-center text-center p-5 sm:p-8 rounded-card bg-card border border-border hover:border-primary/30 hover:-translate-y-1 hover:shadow-glow-green transition-all duration-300 shadow-card">
                {/* Circular avatar with teal ring */}
                <div className="w-[96px] h-[96px] rounded-full ring-4 ring-primary/40 ring-offset-2 ring-offset-card bg-primary-bg flex items-center justify-center mb-5">
                  <span className="text-primary text-2xl font-extrabold font-heading">
                    {member.initials}
                  </span>
                </div>

                <h3 className="text-[17px] font-bold text-text-primary font-heading mb-1">
                  {member.name}
                </h3>
                <p className="text-[14px] font-semibold text-primary mb-1">
                  {member.role}
                </p>
                <p className="text-[13px] text-text-muted font-body">
                  {member.org}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
