import { Link } from "react-router-dom";
import {
  ArrowRight,
  Baby,
  Droplet,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import Reveal from "./ui/Reveal";

const concernCards = [
  {
    icon: Droplet,
    title: "Diabetes or blood sugar",
    body: "Check HbA1c, fasting sugar, kidney strain, and the numbers that show how your body handles glucose.",
    route: "/book-tests/dialics",
  },
  {
    icon: HeartPulse,
    title: "Blood pressure or heart risk",
    body: "Check heart strain, inflammation, uric acid, blood count, and sugar signals linked to circulation risk.",
    route: "/book-tests/cardion",
  },
  {
    icon: Stethoscope,
    title: "Kidney, liver, or cholesterol",
    body: "Check kidney function, liver enzymes, blood count, HbA1c, and the core numbers behind everyday organ health.",
    route: "/book-tests/metabolix",
  },
  {
    icon: ShieldCheck,
    title: "Private STI concern",
    body: "Check HIV, syphilis, hepatitis B, hepatitis C, chlamydia, and gonorrhoea with private results.",
    route: "/book-tests/privara",
  },
  {
    icon: Baby,
    title: "Fertility or hormones",
    body: "Check reproductive hormones and fertility indicators when planning, tracking, or investigating symptoms.",
    route: "/book-tests/spark",
  },
];

export default function HealthConcernChooser() {
  return (
    <section className="py-16 lg:py-20 px-6 bg-base border-t border-border">
      <div className="max-w-[1180px] mx-auto">
        <Reveal>
          <div className="max-w-[720px] mb-10">
            <p className="text-[13px] text-primary uppercase tracking-[0.12em] font-semibold mb-3">
              Start with what is on your mind
            </p>
            <h2 className="text-h2 font-extrabold text-text-primary font-heading tracking-tight mb-4">
              Pick the health risk you want to understand first.
            </h2>
            <p className="text-[16px] leading-relaxed text-text-secondary font-body">
              BetterHealth points you to a relevant test, then explains each result so you know what to track, discuss, or change next.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {concernCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={0.06 * i}>
                <Link
                  to={card.route}
                  className="group h-full min-h-[230px] rounded-card border border-border bg-card p-5 no-underline flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-card"
                >
                  <span className="w-11 h-11 rounded-card bg-primary-bg flex items-center justify-center mb-4">
                    <Icon size={22} className="text-primary" />
                  </span>
                  <h3 className="text-[17px] font-extrabold text-text-primary font-heading leading-snug mb-2">
                    {card.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-text-secondary flex-1">
                    {card.body}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-bold text-primary">
                    Learn more
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between rounded-card border border-primary/20 bg-primary-bg p-5">
            <p className="text-[14px] leading-relaxed text-text-primary font-medium">
              Already managing diabetes, hypertension, kidney, heart, or liver risk?
            </p>
            <Link
              to="/programs"
              className="inline-flex items-center justify-center gap-2 rounded-btn bg-primary px-5 py-3 text-[13px] font-bold text-white no-underline transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              See condition programs <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
