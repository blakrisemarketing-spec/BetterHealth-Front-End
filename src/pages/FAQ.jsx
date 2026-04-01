import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, Mail, Phone, ArrowRight } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";

const FAQ_SECTIONS = [
  {
    category: "Getting Started",
    items: [
      {
        q: "What is BetterHealth?",
        a: "BetterHealth is a health technology platform that gives you access to comprehensive blood testing (100+ biomarkers), organized by body system, with plain-language explanations and trend tracking over time. We partner with accredited labs across Ghana to process your samples and deliver your results to a personal health dashboard within 48–72 hours.",
      },
      {
        q: "Who is BetterHealth for?",
        a: "Any adult (18+) in Ghana who wants to understand their health proactively — not just when something goes wrong. Our members include young professionals monitoring their baseline health, couples planning families, people with family histories of chronic disease, fitness enthusiasts tracking performance, and anyone who's tired of guessing about their health.",
      },
      {
        q: "Do I need a doctor's referral to use BetterHealth?",
        a: "No. BetterHealth is a direct-to-consumer platform. You sign up, choose your plan, book your collection, and receive your results — all without a referral. If you'd like to discuss your results with a doctor, our Premium plan includes a consultation, or you can share your downloadable PDF report with any healthcare provider.",
      },
      {
        q: "Is BetterHealth a hospital or laboratory?",
        a: "No. BetterHealth is a health technology company. We don't run labs — we partner with established, accredited laboratories in Ghana to process your samples. Our role is the technology platform, the health dashboard, the explanations, the tracking, and the experience.",
      },
      {
        q: "Where is BetterHealth available?",
        a: "We currently serve Greater Accra, Kumasi, and Tema. We're expanding to more Ghanaian cities throughout 2026 and plan to launch in Nigeria and Kenya in 2027.",
      },
    ],
  },
  {
    category: "Testing & Collection",
    items: [
      {
        q: "How does the blood test work?",
        a: "After you sign up and choose your plan, you book a collection — either at one of our partner labs or via home collection. A certified phlebotomist draws a small blood sample (about 15–25 mL across 3–5 tubes). The sample is transported to the lab, processed, and your results appear in your dashboard within 48–72 hours.",
      },
      {
        q: "Can I get my blood drawn at home?",
        a: "Yes. Home collection is included free with Complete and Premium plans. Essential plan members can add home collection for GHS 50 per visit. A certified phlebotomist from Lab Access Ghana comes to your home at your scheduled time. Available Monday–Saturday, 6:00 AM – 12:00 PM.",
      },
      {
        q: "Where are the partner labs located?",
        a: "Our partner labs are located across Greater Accra, Kumasi, and Tema. When you book an in-lab collection, we'll show you the nearest locations with available appointment slots. All partner labs are accredited and follow Ghana Health Service standards.",
      },
      {
        q: "Do I need to fast before my test?",
        a: "Some biomarkers require fasting — no food or drink (except water) for 8–12 hours before collection. When you book, we'll tell you exactly which tests require fasting and send you preparation instructions via SMS. If your plan includes fasting markers, we recommend booking a morning slot.",
      },
      {
        q: "How much blood is taken?",
        a: "A comprehensive panel requires about 15–25 mL of blood across 3–5 tubes. That's roughly 1–2 tablespoons. Most people feel no effects afterward. If you're prone to dizziness, let your phlebotomist know — they'll have you sit or lie down during and after the draw.",
      },
      {
        q: "What if I'm afraid of needles?",
        a: "You're not alone — many people are. Our phlebotomists are experienced and trained to make the process as comfortable as possible. The draw itself takes about 60 seconds. If you're particularly anxious, let us know when you book and we'll pair you with a collector experienced in working with needle-shy patients. Some members find that the home collection option feels less clinical and more comfortable than visiting a lab.",
      },
      {
        q: "How are my samples handled after collection?",
        a: "Every sample is labelled with a unique accession number, stored in temperature-controlled packaging, and transported to the lab within 2 hours of collection. We maintain a full chain of custody — from the moment the tube is drawn to the moment the result is reported. You can track your sample's status in your dashboard.",
      },
    ],
  },
  {
    category: "Results & Dashboard",
    items: [
      {
        q: "How long until I get my results?",
        a: "Most results are available within 48–72 hours after your sample is collected. Priority members (Complete and Premium plans) typically receive results within 48 hours. You'll get an SMS and email notification the moment your results are ready.",
      },
      {
        q: "How do I access my results?",
        a: "Log into your BetterHealth dashboard at app.betterhealth.africa using the same email and password you signed up with. Your results are organized by body system (Heart, Liver, Kidneys, Thyroid, Metabolic, Hormones, Blood, Nutrients) with colour-coded indicators and plain-language explanations.",
      },
      {
        q: "What do the colours in my dashboard mean?",
        a: "Green = healthy/optimal range. Your biomarker is where it should be.\nAmber = watch zone. Your biomarker is outside the optimal range but not yet critical. Monitor and consider lifestyle changes.\nRed = needs attention. Your biomarker is significantly outside the normal range. We recommend discussing this with a healthcare provider.",
      },
      {
        q: "Can I download my results?",
        a: "Yes. Every member can download a complete PDF report with all biomarker values, reference ranges, and status indicators. You can share this PDF with your doctor, keep it for your records, or print it.",
      },
      {
        q: "What's the difference between \"normal\" and \"optimal\" ranges?",
        a: "\"Normal\" ranges are based on population averages — they tell you whether you're within the range of what's common, not necessarily what's healthy. \"Optimal\" ranges are tighter and based on the latest research on disease prevention. BetterHealth shows you both, because being \"normal\" and being \"optimal\" are often two different things.",
      },
      {
        q: "Can I share my results with my doctor?",
        a: "Absolutely. Download your PDF report and bring it to any appointment. Many of our members use their BetterHealth reports as a starting point for conversations with their doctors. The report includes all biomarker values, reference ranges, and explanations — everything a doctor needs to review your results.",
      },
      {
        q: "What if a result is critically abnormal?",
        a: "If any result falls into a critical range, you'll receive an immediate notification via SMS and in-app alert. Our system flags these for priority review. We strongly recommend consulting a healthcare provider promptly. Premium members can use their included doctor consultation for this purpose.",
      },
    ],
  },
  {
    category: "Payment & Billing",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept Mobile Money (MTN MoMo, Vodafone Cash, AirtelTigo Money), debit and credit cards (Visa, Mastercard), and bank transfers. All payments are processed securely through Paystack, Ghana's leading payment platform.",
      },
      {
        q: "How is billing structured?",
        a: "All plans are billed annually (once per year). When you sign up, you pay for the full year upfront. Your subscription renews automatically after 12 months. We'll send you a reminder email 14 days before renewal.",
      },
      {
        q: "Can I cancel my subscription?",
        a: "Yes. You can cancel at any time through your account settings. Cancellation takes effect at the end of your current billing period — you'll retain access to your dashboard and results until then. No penalties, no cancellation fees.",
      },
      {
        q: "Is there a satisfaction guarantee?",
        a: "Yes. If you sign up and decide BetterHealth isn't right for you within the first 14 days, we'll refund your payment in full — no questions asked. This applies to your first subscription only.",
      },
      {
        q: "Can I upgrade or downgrade my plan?",
        a: "Yes. You can upgrade at any time — you'll only pay the difference for the remainder of your billing cycle. Downgrades take effect at your next renewal date.",
      },
      {
        q: "Do you offer family or group pricing?",
        a: "Premium plan members receive 20% off for each additional family member they add. For corporate or group enquiries (10+ people), contact us at hello@betterhealth.africa for custom pricing.",
      },
      {
        q: "Can I buy a single test without subscribing?",
        a: "Yes. BetterHealth also offers individual tests and disease-specific panels (e.g., Diabetes Panel, Thyroid Panel) as one-time purchases — no subscription required. Visit the Tests page to browse available options.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    items: [
      {
        q: "Is my health data secure?",
        a: "Yes. Your health data is encrypted at rest and in transit using industry-standard protocols. We use Supabase for our data infrastructure, which provides enterprise-grade security, row-level access control, and encrypted storage.",
      },
      {
        q: "Who can see my results?",
        a: "Only you can see your results. No one at BetterHealth — including our staff — can access your individual health data without your explicit authorization. If you choose to share your results (e.g., with a doctor), you control that process.",
      },
      {
        q: "Do you sell my data?",
        a: "No. We will never sell, share, or monetize your personal health data. Your information is used solely to deliver your results and improve your experience on the platform.",
      },
      {
        q: "What happens to my data if I cancel?",
        a: "Your data remains in your account and is accessible to you even after cancellation. If you want your data permanently deleted, contact us at privacy@betterhealth.africa and we'll process your request within 30 days.",
      },
    ],
  },
  {
    category: "Medical Questions",
    items: [
      {
        q: "Is BetterHealth a substitute for seeing a doctor?",
        a: "No. BetterHealth provides health screening and monitoring — not diagnosis or treatment. If your results show something concerning, we recommend consulting a healthcare provider. Our Premium plan includes a doctor consultation call, and your downloadable PDF report can be shared with any doctor.",
      },
      {
        q: "Are your tests accurate?",
        a: "Yes. All samples are processed at accredited laboratories using the same equipment and methodologies as hospitals. Our partner labs follow quality control protocols including daily calibration, control sample testing, and proficiency testing programmes.",
      },
      {
        q: "Can BetterHealth diagnose diseases?",
        a: "BetterHealth screens for early indicators and risk factors — it does not provide medical diagnoses. If your results flag potential concerns, a healthcare provider can use your BetterHealth data alongside clinical examination to make a diagnosis. Think of us as the early warning system, not the emergency room.",
      },
      {
        q: "Can I use BetterHealth while pregnant?",
        a: "Yes, with your doctor's knowledge. Many biomarkers change during pregnancy, and our reference ranges may not reflect pregnancy-specific norms. We recommend discussing your results with your obstetrician or midwife, who can interpret them in the context of your pregnancy.",
      },
    ],
  },
];

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left bg-white hover:bg-section-alt transition-colors"
      >
        <span className="text-[15px] font-semibold text-text-primary leading-snug">{item.q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0"
        >
          <ChevronDown size={16} className="text-text-muted" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 py-5 text-[14px] text-text-secondary leading-relaxed border-t border-border/50 bg-section-alt whitespace-pre-line">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(null);

  const filtered = activeCategory
    ? FAQ_SECTIONS.filter((s) => s.category === activeCategory)
    : FAQ_SECTIONS;

  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Nav />

      {/* Hero */}
      <section className="min-h-[46vh] flex items-center pt-[120px] pb-14 px-6 bg-base relative overflow-hidden">
        <GradientOrb color="green" size="540px" className="top-[-10%] right-[-8%]" />
        <GradientOrb color="blue" size="320px" className="bottom-[-15%] left-[-5%]" />
        <div className="max-w-[680px] mx-auto text-center relative z-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-primary-bg border border-primary/25 text-primary text-xs font-bold font-heading tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
              FAQ
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-[2.6rem] md:text-[3.2rem] font-extrabold font-heading leading-[1.08] tracking-[-0.03em] text-text-primary mb-4">
              Everything you{" "}
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent italic">
                need to know.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-text-secondary font-body max-w-[520px] mx-auto">
              Can't find your answer here? WhatsApp us or email{" "}
              <a href="mailto:hello@betterhealth.africa" className="text-primary font-semibold hover:underline underline-offset-2 no-underline">
                hello@betterhealth.africa
              </a>{" "}
              — we respond within 24 hours.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Category filter pills */}
      <section className="py-6 px-6 bg-section-alt border-y border-border sticky top-[64px] z-20 backdrop-blur-md bg-section-alt/90">
        <div className="max-w-[860px] mx-auto flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-1.5 rounded-pill text-[13px] font-semibold transition-all border ${!activeCategory ? "bg-primary text-white border-primary" : "bg-white text-text-secondary border-border hover:border-primary/30 hover:text-primary"}`}
          >
            All
          </button>
          {FAQ_SECTIONS.map((s) => (
            <button
              key={s.category}
              onClick={() => setActiveCategory(activeCategory === s.category ? null : s.category)}
              className={`px-4 py-1.5 rounded-pill text-[13px] font-semibold transition-all border ${activeCategory === s.category ? "bg-primary text-white border-primary" : "bg-white text-text-secondary border-border hover:border-primary/30 hover:text-primary"}`}
            >
              {s.category}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ content */}
      <section className="py-16 px-6 bg-base">
        <div className="max-w-[860px] mx-auto flex flex-col gap-12">
          {filtered.map((section, si) => (
            <Reveal key={section.category} delay={si * 0.04}>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[12px] text-primary uppercase tracking-[0.14em] font-bold font-heading">
                    {section.category}
                  </span>
                  <span className="text-[11px] text-text-muted bg-section-alt border border-border px-2 py-0.5 rounded-full">
                    {section.items.length} questions
                  </span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {section.items.map((item, i) => (
                    <FaqItem key={i} item={item} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-20 px-6 bg-section-alt border-t border-border">
        <div className="max-w-[680px] mx-auto text-center">
          <Reveal>
            <h2 className="text-[1.8rem] font-extrabold text-text-primary font-heading mb-3">
              Didn't find your answer?
            </h2>
            <p className="text-[15px] text-text-secondary mb-8">
              We're here to help. Reach out through any of these channels and we'll respond within 24 hours.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  sub: "Fastest response",
                  href: "https://wa.me/233XXXXXXXXX",
                  cta: "Chat now",
                  primary: true,
                },
                {
                  icon: Mail,
                  label: "Email",
                  sub: "hello@betterhealth.africa",
                  href: "mailto:hello@betterhealth.africa",
                  cta: "Send email",
                  primary: false,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  sub: "Mon–Fri, 8 AM – 6 PM",
                  href: "tel:+233XXXXXXXXX",
                  cta: "Call us",
                  primary: false,
                },
              ].map((c, i) => {
                const Icon = c.icon;
                return (
                  <a
                    key={i}
                    href={c.href}
                    className={`flex flex-col items-center gap-2 rounded-card p-5 border transition-all hover:-translate-y-1 no-underline ${c.primary ? "bg-primary border-primary text-white hover:bg-primary-dark" : "bg-white border-border text-text-primary hover:border-primary/30 hover:shadow-card"}`}
                  >
                    <Icon size={20} className={c.primary ? "text-white" : "text-primary"} />
                    <span className={`text-[14px] font-bold font-heading ${c.primary ? "text-white" : "text-text-primary"}`}>{c.label}</span>
                    <span className={`text-[12px] ${c.primary ? "text-white/75" : "text-text-muted"}`}>{c.sub}</span>
                    <span className={`text-[12px] font-semibold flex items-center gap-1 mt-1 ${c.primary ? "text-white" : "text-primary"}`}>
                      {c.cta} <ArrowRight size={11} />
                    </span>
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
        <GradientOrb color="green" size="400px" className="top-[-20%] right-[-10%] opacity-30" />
        <div className="max-w-[520px] mx-auto text-center relative z-10">
          <Reveal>
            <h2 className="text-[2rem] md:text-[2.4rem] font-extrabold text-white font-heading tracking-tight mb-4">
              Ready to check your health?
            </h2>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 bg-white text-primary rounded-btn px-7 py-4 text-sm font-bold font-heading transition-all hover:-translate-y-0.5 hover:shadow-lg no-underline"
            >
              View Plans <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
