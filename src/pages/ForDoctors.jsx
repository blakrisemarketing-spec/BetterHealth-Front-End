import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Stethoscope,
  Activity,
  TestTubes,
  Home,
  ShieldCheck,
  BrainCircuit,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Banknote,
  ClipboardList,
  ChevronDown,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";
import { submitPartnerSignup } from "../lib/partner-signup";

const WHATSAPP_URL = "https://wa.me/message/MJ3HXLS2NDQEJ1";
const WHATSAPP_NUMBER = "+233 268 596 410";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const BENEFITS = [
  {
    icon: Activity,
    title: "Stop chasing results.",
    body: "Lab results land in your dashboard the moment they're clinically validated — no WhatsApp threads, no phone calls, no paper slips. Out-of-range values are automatically flagged so nothing slips through.",
  },
  {
    icon: TrendingUp,
    title: "See trends, not snapshots.",
    body: "Every result is stored chronologically against the patient's profile. Watch HbA1c, kidney function, or lipid panels move over months or years — the kind of longitudinal context that changes clinical decisions.",
  },
  {
    icon: BrainCircuit,
    title: "AI-generated clinical notes.",
    body: "BetterHealth drafts structured clinical notes from each result set automatically. Review, edit, and sign off in seconds — not minutes. Spend your time on the patient, not the paperwork.",
  },
  {
    icon: Banknote,
    title: "Earn from every referral.",
    body: "A transparent commission on every test your patient books through BetterHealth. No invoicing, no chasing, no awkward conversations. Monthly payouts, automatically.",
  },
  {
    icon: Home,
    title: "Patients actually get tested.",
    body: "Home or office sample collection means your patients follow through on your diagnostic plan — not just promise to. Compliance goes up. Gaps in your clinical picture go down.",
  },
  {
    icon: ShieldCheck,
    title: "Results reviewed before they reach you.",
    body: "Every result set goes through a four-eyes clinical review before release. You receive validated, quality-checked results — not raw lab output. Critical values are flagged and escalated automatically.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Refer your patient",
    body: "Prescribe a test from BetterHealth's 155+ biomarker menu. Your patient books sample collection from home, office, or clinic — no paper form, no lab visit required.",
  },
  {
    step: "02",
    title: "We handle everything in between",
    body: "A phlebotomist collects the sample, the lab processes it, and a clinician reviews it before sign-off. Quality-controlled end to end.",
  },
  {
    step: "03",
    title: "Results in your dashboard",
    body: "Structured, flagged, and linked to the patient's full history. Add a note, track trends, and act — all without leaving BetterHealth.",
  },
];

const FAQS = [
  {
    q: "Do I need to install anything or pay a setup fee?",
    a: "No. Your BetterHealth partner dashboard is fully web-based. Partnering is free — you earn commission on every patient referral. We never charge you.",
  },
  {
    q: "What happens if a result is critically abnormal?",
    a: "Critical values are automatically flagged by the system before a result is released. The reviewing clinician is notified, and the flag is visible to you in your dashboard the moment the result lands.",
  },
  {
    q: "Can I see my patient's full history — not just the latest results?",
    a: "Yes. Every result ever run on a BetterHealth patient is stored chronologically. You can view trends across any biomarker over any time period, alongside their medications and allergies.",
  },
  {
    q: "How long does it take to get results back?",
    a: "Most routine panels are turned around within 24 hours of sample collection. You're notified as soon as results are released.",
  },
];

const TRUST_STATS = [
  { value: "155+", label: "Biomarkers available" },
  { value: "4-eyes", label: "Clinical review on every result" },
  { value: "24 hrs", label: "Average turnaround" },
  { value: "Free", label: "To partner, forever" },
];

const SPECIALTY_OPTIONS = [
  "General Practice",
  "Internal Medicine",
  "Obstetrics & Gynaecology",
  "Paediatrics",
  "Cardiology",
  "Endocrinology",
  "Dermatology",
  "Other",
];

const PARTNERSHIP_OPTIONS = [
  "Refer patients for lab work",
  "Integrate lab results into my practice",
  "Both",
  "Other",
];

/* ------------------------------------------------------------------ */
/*  FAQ Item                                                           */
/* ------------------------------------------------------------------ */

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-section-alt transition-colors"
      >
        <span className="text-[14px] font-semibold text-text-primary font-heading">
          {q}
        </span>
        <ChevronDown
          size={16}
          className={`text-text-muted flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-4 bg-white">
          <p className="text-[13px] text-text-secondary leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Registration Form                                                  */
/* ------------------------------------------------------------------ */

const INITIAL_FORM = {
  name: "",
  specialty: "",
  clinic: "",
  email: "",
  whatsapp: "",
  license: "",
  partnership: "",
  notes: "",
};

function RegistrationForm() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState(INITIAL_FORM);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    const result = await submitPartnerSignup({
      partnerType: "doctor",
      name: form.name.trim(),
      specialty: form.specialty,
      clinic: form.clinic.trim(),
      email: form.email.trim().toLowerCase(),
      whatsapp: form.whatsapp.trim(),
      license: form.license.trim(),
      partnership: form.partnership,
      notes: form.notes.trim(),
    });

    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Submission failed.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-card p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={24} className="text-green-600" />
        </div>
        <h3 className="text-[18px] font-bold text-text-primary font-heading mb-2">
          Application received.
        </h3>
        <p className="text-[14px] text-text-secondary leading-relaxed">
          Our partnerships team will review your application and be in touch
          within 48 hours. For anything urgent, WhatsApp us directly at{" "}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold underline-offset-2 hover:underline no-underline"
          >
            {WHATSAPP_NUMBER}
          </a>
          .
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full border border-border rounded-btn px-4 py-3 text-[14px] text-text-primary bg-section-alt focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all";
  const labelCls = "block text-[13px] font-semibold text-text-primary mb-1.5";
  const selectCls = `${inputCls} appearance-none`;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-border rounded-card p-4 sm:p-8 shadow-sm flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="doc-name" className={labelCls}>
            Full Name *
          </label>
          <input
            id="doc-name"
            name="name"
            required
            type="text"
            placeholder="Dr. Ama Mensah"
            value={form.name}
            onChange={set("name")}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="doc-specialty" className={labelCls}>
            Medical Specialty *
          </label>
          <select
            id="doc-specialty"
            name="specialty"
            required
            value={form.specialty}
            onChange={set("specialty")}
            className={selectCls}
          >
            <option value="">Select your specialty</option>
            {SPECIALTY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="doc-clinic" className={labelCls}>
          Hospital / Clinic Name *
        </label>
        <input
          id="doc-clinic"
          name="clinic"
          required
          type="text"
          placeholder="e.g. Korle-Bu Teaching Hospital"
          value={form.clinic}
          onChange={set("clinic")}
          className={inputCls}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="doc-email" className={labelCls}>
            Email *
          </label>
          <input
            id="doc-email"
            name="email"
            required
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={set("email")}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="doc-whatsapp" className={labelCls}>
            WhatsApp Number *
          </label>
          <input
            id="doc-whatsapp"
            name="whatsapp"
            required
            type="tel"
            placeholder="+233 XX XXX XXXX"
            value={form.whatsapp}
            onChange={set("whatsapp")}
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="doc-license" className={labelCls}>
            Medical License Number{" "}
            <span className="text-text-muted font-normal">(optional)</span>
          </label>
          <input
            id="doc-license"
            name="license"
            type="text"
            placeholder="MC-XXXXX"
            value={form.license}
            onChange={set("license")}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="doc-partnership" className={labelCls}>
            How would you like to partner? *
          </label>
          <select
            id="doc-partnership"
            name="partnership"
            required
            value={form.partnership}
            onChange={set("partnership")}
            className={selectCls}
          >
            <option value="">Select an option</option>
            {PARTNERSHIP_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="doc-notes" className={labelCls}>
          Additional Notes{" "}
          <span className="text-text-muted font-normal">(optional)</span>
        </label>
        <textarea
          id="doc-notes"
          name="notes"
          rows={4}
          placeholder="Tell us anything else — patient volume, current lab setup, questions, etc."
          value={form.notes}
          onChange={set("notes")}
          className={`${inputCls} resize-none`}
        />
      </div>

      {/* Error banner */}
      {status === "error" && (
        <div className="flex items-start gap-3 rounded-btn border border-red-200 bg-red-50 px-4 py-3">
          <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
          <p className="text-[13px] text-red-700 leading-relaxed">
            We couldn&rsquo;t submit your application
            {errorMessage ? ` (${errorMessage})` : ""}. Please try again, or
            WhatsApp us directly at{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-2"
            >
              {WHATSAPP_NUMBER}
            </a>{" "}
            and we&rsquo;ll get you onboarded.
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={status === "loading"}
          className="self-start inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-7 py-3.5 text-sm font-bold font-heading transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={15} className="animate-spin" /> Submitting&hellip;
            </>
          ) : (
            <>
              Submit Application <ArrowRight size={15} />
            </>
          )}
        </button>
        <p className="text-[13px] text-text-muted">
          Prefer to chat?{" "}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:underline no-underline"
          >
            WhatsApp us
          </a>
          .
        </p>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ForDoctorsPage() {
  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Helmet>
        <title>For Doctors — Partner with BetterHealth Africa</title>
        <meta
          name="description"
          content="Stop chasing lab results. BetterHealth delivers validated results directly to your dashboard, with full patient history, AI clinical notes, and referral income. Free to partner."
        />
        <link
          rel="canonical"
          href="https://www.betterhealth.africa/for-doctors"
        />
        <meta
          property="og:url"
          content="https://www.betterhealth.africa/for-doctors"
        />
        <meta
          property="og:title"
          content="For Doctors — Partner with BetterHealth Africa"
        />
        <meta
          property="og:description"
          content="Stop chasing lab results. BetterHealth delivers validated results directly to your dashboard, with full patient history, AI clinical notes, and referral income. Free to partner."
        />
      </Helmet>

      <Nav />

      <main>
        {/* ──────────── Hero ──────────── */}
        <section className="min-h-[52vh] flex items-center pt-[120px] pb-14 px-6 bg-base relative overflow-hidden">
          <GradientOrb
            color="green"
            size="560px"
            className="top-[-10%] right-[-8%]"
          />
          <GradientOrb
            color="blue"
            size="340px"
            className="bottom-[-10%] left-[-5%]"
          />

          <div className="max-w-[700px] mx-auto text-center relative z-10">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-primary-bg border border-primary/25 text-primary text-xs font-bold font-heading tracking-wider uppercase mb-6">
                <Stethoscope size={14} />
                For Doctors
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-[1.8rem] sm:text-[2.6rem] md:text-[3.2rem] font-extrabold font-heading leading-[1.15] text-text-primary mb-5">
                Your patients' results.{" "}
                <span className="text-primary italic tracking-normal pb-2 inline-block">
                  In your hands.
                </span>{" "}
                Not on a paper slip.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-text-secondary font-body max-w-[560px] mx-auto mb-8">
                BetterHealth gives you a structured, longitudinal view of every
                patient's lab history — while we handle sample collection,
                processing, and clinical review. You get to be the doctor.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <a
                href="#doc-name"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-8 py-4 text-base font-bold font-heading transition-all hover:-translate-y-0.5 hover:shadow-lg no-underline"
              >
                Apply to partner <ArrowRight size={18} />
              </a>
            </Reveal>
          </div>
        </section>

        {/* ──────────── Trust strip ──────────── */}
        <section className="py-8 px-6 border-y border-border bg-white">
          <div className="max-w-[900px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
            {TRUST_STATS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-[1.6rem] font-extrabold text-primary font-heading">
                  {s.value}
                </div>
                <div className="text-[12px] text-text-muted font-body mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ──────────── How it works ──────────── */}
        <section className="py-16 px-6 bg-base">
          <div className="max-w-[1000px] mx-auto">
            <Reveal>
              <h2 className="text-[1.6rem] font-extrabold text-text-primary font-heading mb-2 text-center">
                How it works
              </h2>
              <p className="text-[14px] text-text-muted mb-12 text-center max-w-[480px] mx-auto">
                From referral to results in your dashboard — here's what the
                experience looks like for you and your patients.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HOW_IT_WORKS.map((step, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="relative bg-section-alt border border-border rounded-card p-6 h-full">
                    <span className="text-[2.2rem] font-extrabold text-primary/15 font-heading leading-none block mb-3">
                      {step.step}
                    </span>
                    <h3 className="text-[15px] font-bold text-text-primary font-heading mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[13px] text-text-secondary leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────── Benefits ──────────── */}
        <section className="py-16 px-6 bg-section-alt">
          <div className="max-w-[1100px] mx-auto">
            <Reveal>
              <h2 className="text-[1.6rem] font-extrabold text-text-primary font-heading mb-2 text-center">
                Built around how you actually practise
              </h2>
              <p className="text-[14px] text-text-muted mb-10 text-center max-w-[520px] mx-auto">
                Every feature in BetterHealth exists to close the gap between
                ordering a test and acting confidently on the result.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BENEFITS.map((b, i) => {
                const Icon = b.icon;
                return (
                  <Reveal key={i} delay={i * 0.07}>
                    <div className="bg-white border border-border rounded-card p-5 hover:border-primary/25 hover:shadow-sm transition-all h-full">
                      <div className="w-10 h-10 rounded-card bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center mb-4">
                        <Icon size={18} className="text-white" />
                      </div>
                      <h3 className="text-[15px] font-bold text-text-primary font-heading mb-1.5">
                        {b.title}
                      </h3>
                      <p className="text-[13px] text-text-secondary leading-relaxed">
                        {b.body}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ──────────── FAQ ──────────── */}
        <section className="py-16 px-6 bg-base">
          <div className="max-w-[680px] mx-auto">
            <Reveal>
              <h2 className="text-[1.5rem] font-extrabold text-text-primary font-heading mb-2 text-center">
                Common questions
              </h2>
              <p className="text-[14px] text-text-muted mb-8 text-center">
                Everything you need to know before applying.
              </p>
            </Reveal>
            <div className="flex flex-col gap-3">
              {FAQS.map((faq, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <FaqItem q={faq.q} a={faq.a} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────── Registration Form ──────────── */}
        <section className="py-20 px-6 bg-section-alt">
          <div className="max-w-[760px] mx-auto">
            <Reveal>
              <h2 className="text-[1.8rem] font-extrabold text-text-primary font-heading tracking-tight mb-2">
                Apply to partner
              </h2>
              <p className="text-[14px] text-text-muted mb-8">
                Fill in your details and our partnerships team will be in touch
                within 48 hours to get you set up.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <RegistrationForm />
            </Reveal>
          </div>
        </section>

        {/* ──────────── Bottom CTA ──────────── */}
        <section className="py-20 lg:py-[100px] px-6 bg-primary relative overflow-hidden">
          <GradientOrb
            color="green"
            size="500px"
            className="top-[-20%] right-[-10%] opacity-30"
          />
          <div className="max-w-[580px] mx-auto text-center relative z-10">
            <Reveal>
              <h2 className="text-[1.7rem] sm:text-[2.2rem] md:text-[2.6rem] font-extrabold text-white font-heading tracking-tight mb-4">
                Your patients deserve results that reach you — not a filing
                cabinet.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[16px] text-white/80 font-body mb-8">
                Join doctors across Ghana who use BetterHealth to close the loop
                between ordering a test and acting on the result.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <a
                href="#doc-name"
                className="inline-flex items-center gap-2 bg-white text-primary rounded-btn px-8 py-4 text-base font-bold font-heading transition-all hover:-translate-y-0.5 hover:shadow-lg no-underline"
              >
                Apply Now <ArrowRight size={18} />
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
