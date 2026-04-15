import { Helmet } from "react-helmet-async";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using the BetterHealth Africa platform at betterhealth.africa or any associated mobile applications, you agree to be bound by these Terms of Service. If you do not agree, do not use the platform. These terms constitute a legally binding agreement between you and BetterHealth Africa.",
  },
  {
    title: "2. Eligibility",
    body: "You must be at least 18 years old to use BetterHealth. By using the platform, you confirm that you meet this requirement. BetterHealth is currently available to residents of Ghana only.",
  },
  {
    title: "3. Our Service",
    body: `BetterHealth Africa provides:

- Comprehensive blood screening with 100+ biomarkers via accredited partner laboratories
- A personal health dashboard showing your results, trends, and AI-assisted insights
- Home sample collection scheduling and logistics
- Health education content and personalised recommendations

**Important:** BetterHealth is a health monitoring service, not a medical provider. Our platform does not provide diagnoses, medical advice, or treatment recommendations. Always consult a qualified healthcare professional for medical decisions.`,
  },
  {
    title: "4. Account Registration",
    body: `To use BetterHealth, you must create an account with accurate, current information. You are responsible for:

- Maintaining the confidentiality of your login credentials
- All activity that occurs under your account
- Notifying us immediately of any unauthorised access at hello@betterhealth.africa

We reserve the right to suspend accounts that provide false information or violate these terms.`,
  },
  {
    title: "5. Payments & Subscriptions",
    body: `All payments are processed securely by Paystack. By subscribing, you authorise Paystack to charge your selected payment method on a recurring basis for the plan you have chosen.

**Refunds:** If your sample cannot be processed due to a fault on our end, you are entitled to a full refund or a repeat test at no charge. Refunds for change-of-mind after sample collection are not available.

**Cancellation:** You may cancel your subscription at any time. Your access continues until the end of the current billing period.`,
  },
  {
    title: "6. Sample Collection & Lab Results",
    body: "Results are typically delivered to your dashboard within 48–72 hours of sample collection. We partner with accredited laboratories in Ghana. In the event of a failed sample, we will reschedule collection at no charge. BetterHealth is not liable for delays caused by force majeure or laboratory processing issues outside our control.",
  },
  {
    title: "7. Health Data & Disclaimers",
    body: `Your biomarker results are for informational purposes only. BetterHealth does not:

- Diagnose any disease or medical condition
- Recommend specific treatments or medications
- Replace consultation with a qualified doctor

**Always consult a licensed healthcare professional** before making any health decisions based on your results. If you experience a medical emergency, contact emergency services immediately.`,
  },
  {
    title: "8. Intellectual Property",
    body: "All content on the BetterHealth platform — including the dashboard design, text, graphics, and software — is owned by or licensed to BetterHealth Africa. You may not reproduce, distribute, or create derivative works without our written permission.",
  },
  {
    title: "9. Prohibited Use",
    body: `You agree not to:

- Use the platform for any unlawful purpose
- Attempt to access another user's account or data
- Reverse-engineer, scrape, or copy any part of the platform
- Upload malicious code or attempt to disrupt the service
- Use the platform to harass or harm others

Violation of these terms may result in immediate account termination.`,
  },
  {
    title: "10. Limitation of Liability",
    body: "To the maximum extent permitted by Ghanaian law, BetterHealth Africa is not liable for any indirect, incidental, or consequential damages arising from your use of the platform. Our total liability for any claim is limited to the amount you paid for the subscription in the 3 months preceding the claim.",
  },
  {
    title: "11. Changes to These Terms",
    body: "We may update these terms as the service evolves. We will notify you of material changes via email at least 14 days before they take effect. Continued use of the platform after changes take effect constitutes acceptance of the new terms.",
  },
  {
    title: "12. Governing Law",
    body: "These terms are governed by the laws of the Republic of Ghana. Any disputes shall be subject to the exclusive jurisdiction of the courts of Ghana.",
  },
  {
    title: "13. Contact",
    body: "For any questions about these terms: hello@betterhealth.africa\n\nBetterHealth Africa\nAccra, Ghana",
  },
];

export default function TermsPage() {
  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Terms of Service — BetterHealth Africa</title>
        <meta name="description" content="Read BetterHealth Africa's Terms of Service. Understand your rights, our service commitments, and how we operate." />
      </Helmet>
      <Nav />

      <section className="pt-[120px] pb-8 px-6">
        <div className="max-w-[760px] mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-primary-bg border border-primary/25 text-primary text-xs font-bold font-heading tracking-wider uppercase mb-6">
              Legal
            </span>
            <h1 className="text-[1.8rem] sm:text-[2.4rem] md:text-[3rem] font-extrabold font-heading leading-[1.08] text-text-primary mb-3">
              Terms of Service
            </h1>
            <p className="text-[14px] text-text-muted mb-8">Last updated: April 2026</p>
            <p className="text-[15px] text-text-secondary leading-relaxed mb-2">
              These terms govern your use of BetterHealth Africa. We have written them in plain language. Please read them before using our platform.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-[760px] mx-auto flex flex-col gap-10">
          {SECTIONS.map((s, i) => (
            <Reveal key={i} delay={i * 0.03}>
              <div className="border-l-4 border-primary/20 pl-6">
                <h2 className="text-[18px] font-bold text-text-primary font-heading mb-3">{s.title}</h2>
                <div className="text-[14px] text-text-secondary leading-relaxed whitespace-pre-line break-words [overflow-wrap:anywhere]">
                  {s.body.split("**").map((part, pi) =>
                    pi % 2 === 1
                      ? <strong key={pi} className="text-text-primary font-semibold">{part}</strong>
                      : <span key={pi}>{part}</span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
