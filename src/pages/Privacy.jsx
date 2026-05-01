import { Helmet } from "react-helmet-async";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import { ShieldCheck } from "lucide-react";

const SECTIONS = [
  {
    title: "1. Who We Are",
    body: "BetterHealth Africa is a health technology company registered in Ghana. We operate the platform at betterhealth.africa and any associated mobile applications. References to \"we\", \"us\", or \"BetterHealth\" in this policy mean BetterHealth Africa. Our contact email is privacy@betterhealth.africa.",
  },
  {
    title: "2. What Data We Collect",
    body: `We collect the following categories of personal data:

**Account data:** Your name, email address, phone number, and date of birth when you register.

**Health data:** Biomarker results from your laboratory tests, including blood test values, organ health scores, and any health notes you add to your dashboard. This is sensitive personal data and is treated with the highest level of protection.

**Payment data:** Transaction records processed via Paystack. We do not store your card or Mobile Money details — these are handled entirely by Paystack.

**Usage data:** How you interact with our platform (pages visited, features used, device type, browser, IP address). This helps us improve the product.

**Communication data:** Messages you send us via email or WhatsApp support.`,
  },
  {
    title: "3. How We Use Your Data",
    body: `We use your personal data to:

- Deliver your health screening results and dashboard
- Process your payments via Paystack
- Send you results notifications (email and SMS)
- Respond to your support enquiries
- Improve and personalise the platform
- Send important account updates (not marketing, unless you opt in)

We do not sell your data. We do not use your health data for advertising. We do not share your data with third parties except as described in Section 4.`,
  },
  {
    title: "4. Who We Share Data With",
    body: `We share data only with the following partners, and only as necessary to deliver the service:

**Lab Access Ghana:** Your name, contact details, and test order are shared with our laboratory partner to process your sample and return results.

**Paystack:** Transaction data is processed by Paystack under their own privacy policy. We receive only a payment confirmation.

**Supabase:** Our database infrastructure provider. Your data is stored on Supabase with row-level security and encryption at rest.

We do not share your health data with insurers, employers, government agencies, or any third party without your explicit written consent.`,
  },
  {
    title: "5. Data Security",
    body: "Your health data is encrypted at rest and in transit. Access is restricted to authenticated users via row-level security. Our infrastructure (Supabase) meets international healthcare data standards. We conduct regular security reviews and access audits. No system is 100% secure — if you suspect your account has been compromised, contact us immediately at privacy@betterhealth.africa.",
  },
  {
    title: "6. Your Rights",
    body: `You have the right to:

- **Access** your personal data at any time via your dashboard or by emailing us
- **Correct** inaccurate data
- **Delete** your account and all associated data (request via privacy@betterhealth.africa)
- **Export** your health data in a portable format (PDF or JSON)
- **Object** to how we process your data
- **Withdraw consent** for optional communications at any time

To exercise any right, email privacy@betterhealth.africa. We will respond within 14 days.`,
  },
  {
    title: "7. Data Retention",
    body: "We retain your account data and health results for as long as your account is active, plus a 90-day grace period after account deletion (to allow for accidental deletion recovery). After 90 days, all personal data is permanently deleted. Payment transaction records are retained for 7 years as required by Ghanaian financial regulations.",
  },
  {
    title: "8. Cookies",
    body: "We use essential cookies to keep you logged in and secure your session. We use analytics cookies (with your consent) to understand how the platform is used. You can manage cookie preferences through your browser settings. We do not use advertising or tracking cookies.",
  },
  {
    title: "9. Children's Privacy",
    body: "BetterHealth is intended for users aged 18 and over. We do not knowingly collect personal data from anyone under 18. If you believe we have inadvertently collected data from a minor, contact us immediately at privacy@betterhealth.africa.",
  },
  {
    title: "10. Changes to This Policy",
    body: "We may update this policy as our service evolves. We will notify you of material changes via email and with a banner on the platform at least 14 days before the change takes effect. The current version will always be available at betterhealth.africa/privacy.",
  },
  {
    title: "11. Contact",
    body: "For any privacy-related questions, requests, or concerns: privacy@betterhealth.africa\n\nBetterHealth Africa\nAccra, Ghana",
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Privacy Policy — BetterHealth Africa</title>
        <meta name="description" content="How BetterHealth Africa collects, uses, and protects your personal and health data. Written in plain language, no legal jargon." />
        <link rel="canonical" href="https://www.betterhealth.africa/privacy" />
        <meta property="og:url" content="https://www.betterhealth.africa/privacy" />
        <meta property="og:title" content="Privacy Policy — BetterHealth Africa" />
        <meta property="og:description" content="How BetterHealth Africa collects, uses, and protects your personal and health data. Written in plain language, no legal jargon." />
      </Helmet>
      <Nav />
      <main>

      <section className="pt-[120px] pb-8 px-6">
        <div className="max-w-[760px] mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-primary-bg border border-primary/25 text-primary text-xs font-bold font-heading tracking-wider uppercase mb-6">
              Legal
            </span>
            <h1 className="text-[1.8rem] sm:text-[2.4rem] md:text-[3rem] font-extrabold font-heading leading-[1.08] text-text-primary mb-3">
              Privacy Policy
            </h1>
            <p className="text-[14px] text-text-muted mb-8">Last updated: April 2026</p>
            <p className="text-[15px] text-text-secondary leading-relaxed mb-2">
              BetterHealth Africa takes your privacy seriously. This policy explains what data we collect, why we collect it, how we protect it, and what rights you have. We have written it in plain language — no legal jargon.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-8">
        <div className="max-w-[760px] mx-auto">
          <Reveal delay={0.05}>
            <div className="flex items-start gap-4 p-6 rounded-card bg-primary-bg border border-primary/20">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-[16px] font-bold text-text-primary font-heading mb-1">
                  Certified by the Ghana Data Protection Commission
                </p>
                <p className="text-[14px] text-text-secondary leading-relaxed font-body">
                  BetterHealth Africa is registered and certified under the Ghana Data Protection Act, 2012 (Act 843). This means your personal and health data is handled in compliance with Ghana&apos;s highest data protection standards.
                </p>
                <a
                  href="https://app.dataprotection.org.gh/company/dpdZwcRth19j7oQFxmwoDj1ELCOABE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] text-primary hover:text-primary-dark font-semibold font-heading mt-2 no-underline transition-colors"
                >
                  Verify our certification →
                </a>
              </div>
            </div>
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

      </main>
      <Footer />
    </div>
  );
}
