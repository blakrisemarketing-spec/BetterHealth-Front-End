import { Helmet } from "react-helmet-async";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import { Mail } from "lucide-react";

const STEPS = [
  {
    title: "Send a deletion request",
    body: "Email privacy@betterhealth.africa from the email address on your BetterHealth account. Use the subject line “Delete my account” so we can route it correctly.",
  },
  {
    title: "Confirm your identity",
    body: "We will reply within 2 business days asking you to confirm a few account details. This protects you from someone else attempting to delete your data without permission.",
  },
  {
    title: "We process the deletion",
    body: "Once your identity is confirmed, we deactivate your account immediately and queue your personal and health data for permanent deletion. You will receive a written confirmation when this is complete.",
  },
];

const SECTIONS = [
  {
    title: "What gets deleted",
    body: `When you request account deletion, we remove:

- Your account profile (name, email, phone number, date of birth)
- Your health dashboard data, including all biomarker results and notes
- Any uploaded documents or health records linked to your account
- Saved preferences, notifications, and session data

After deletion, your data cannot be recovered. Please export anything you want to keep (PDF or JSON via your dashboard, or by request to privacy@betterhealth.africa) before submitting your request.`,
  },
  {
    title: "What we are required to retain",
    body: `Some records must be kept after account deletion to comply with Ghanaian law:

- **Payment and transaction records** are retained for 7 years as required by Ghanaian financial regulations.
- **Anonymised aggregate data** that can no longer identify you (e.g. statistical reporting) may be retained.

These retained records cannot be used to re-identify you and are not shared with third parties for any purpose other than legal compliance.`,
  },
  {
    title: "Timeline",
    body: `**Acknowledgement:** within 2 business days of your request.

**Identity confirmation:** within 5 business days of your reply.

**Account deactivation:** immediately after identity confirmation. You will no longer be able to log in.

**Permanent deletion:** within 30 days. A 30-day grace period exists so that accidental deletions can be reversed on written request from the original account holder.

**Written confirmation:** sent by email once permanent deletion is complete.`,
  },
  {
    title: "Deletion via the mobile app",
    body: "You can also request account deletion from within the BetterHealth mobile app: Settings → Account → Delete my account. In-app requests follow the same identity-confirmation process described above.",
  },
  {
    title: "Your rights under Ghanaian law",
    body: "BetterHealth Africa is certified by the Ghana Data Protection Commission under the Data Protection Act, 2012 (Act 843). You have the right to request deletion of your personal data at any time, and we are required to honour that request within a reasonable timeframe. If you believe your request has not been handled correctly, you may contact the Ghana Data Protection Commission directly.",
  },
  {
    title: "Questions",
    body: "Email privacy@betterhealth.africa. We respond within 14 days to all privacy-related queries.",
  },
];

export default function DeleteMePage() {
  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Delete My Account | BetterHealth Africa</title>
        <meta name="description" content="How to request deletion of your BetterHealth Africa account and personal health data." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Nav />
      <main>

      <section className="pt-[120px] pb-8 px-6">
        <div className="max-w-[760px] mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-primary-bg border border-primary/25 text-primary text-xs font-bold font-heading tracking-wider uppercase mb-6">
              Account
            </span>
            <h1 className="text-[1.8rem] sm:text-[2.4rem] md:text-[3rem] font-extrabold font-heading leading-[1.08] text-text-primary mb-3">
              Delete My Account
            </h1>
            <p className="text-[14px] text-text-muted mb-8">Last updated: May 2026</p>
            <p className="text-[15px] text-text-secondary leading-relaxed mb-2">
              You can request deletion of your BetterHealth Africa account and all associated personal and health data at any time. This page explains how the process works, what gets removed, and how long it takes.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-8">
        <div className="max-w-[760px] mx-auto">
          <Reveal delay={0.05}>
            <div className="flex items-start gap-4 p-6 rounded-card bg-primary-bg border border-primary/20">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                <Mail size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-[16px] font-bold text-text-primary font-heading mb-1">
                  Email us to begin
                </p>
                <p className="text-[14px] text-text-secondary leading-relaxed font-body">
                  Send your deletion request to <strong className="text-text-primary font-semibold">privacy@betterhealth.africa</strong> from the email on your account, with the subject line &ldquo;Delete my account&rdquo;.
                </p>
                <a
                  href="mailto:privacy@betterhealth.africa?subject=Delete%20my%20account"
                  className="inline-flex items-center gap-1.5 text-[13px] text-primary hover:text-primary-dark font-semibold font-heading mt-2 no-underline transition-colors"
                >
                  Open email →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="max-w-[760px] mx-auto">
          <Reveal delay={0.05}>
            <h2 className="text-[20px] font-bold text-text-primary font-heading mb-6">How it works</h2>
          </Reveal>
          <div className="flex flex-col gap-4">
            {STEPS.map((s, i) => (
              <Reveal key={i} delay={0.05 + i * 0.04}>
                <div className="flex items-start gap-4 p-5 rounded-card bg-white border border-border">
                  <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold font-heading text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-text-primary font-heading mb-1">{s.title}</p>
                    <p className="text-[14px] text-text-secondary leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
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
