import {
  Clock3,
  CreditCard,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import Reveal from "./ui/Reveal";

const proofPoints = [
  {
    icon: FlaskConical,
    title: "Accredited partner labs",
    body: "Your samples are processed by established laboratories in Ghana.",
  },
  {
    icon: Stethoscope,
    title: "Doctor-reviewed results",
    body: "A qualified doctor reviews your results before they reach your dashboard.",
  },
  {
    icon: Clock3,
    title: "Results in 48 to 72 hours",
    body: "Most results are ready within 48 to 72 hours after sample collection.",
  },
  {
    icon: ShieldCheck,
    title: "GDPC data protection",
    body: "Your health data is encrypted and protected under Ghana's Data Protection Act.",
  },
  {
    icon: CreditCard,
    title: "Mobile Money and card",
    body: "Pay with Mobile Money, card, or bank transfer through Paystack.",
  },
];

export default function HealthProofStrip() {
  return (
    <section className="py-10 px-6 bg-section-alt border-y border-border">
      <div className="max-w-[1280px] mx-auto">
        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {proofPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div key={point.title} className="rounded-card border border-border bg-card p-5 h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-9 h-9 rounded-card bg-primary-bg flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-primary" />
                    </span>
                    <h3 className="text-[14px] font-extrabold text-text-primary font-heading leading-snug">
                      {point.title}
                    </h3>
                  </div>
                  <p className="text-[12px] leading-relaxed text-text-secondary">
                    {point.body}
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
