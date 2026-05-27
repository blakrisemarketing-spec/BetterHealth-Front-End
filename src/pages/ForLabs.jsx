import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  FlaskConical,
  ClipboardCheck,
  Users,
  BarChart3,
  FileText,
  Network,
  ArrowRight,
  CheckCircle2,
  Cpu,
  AlertTriangle,
  ChevronDown,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";
import { submitPartnerSignup, HEARD_ABOUT_OPTIONS } from "../lib/partner-signup";

const WHATSAPP_URL = "https://wa.me/message/MJ3HXLS2NDQEJ1";
const WHATSAPP_NUMBER = "+233 268 596 410";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const PAIN_POINTS = [
  "Printing results and calling patients to come collect them",
  "Tracking samples with a notebook and hoping nothing gets lost",
  "Re-typing instrument readings into spreadsheets by hand",
  "Doctors calling you to ask where a result is",
  "Losing clients to labs that deliver results faster",
];

const BENEFITS = [
  {
    icon: FlaskConical,
    title: "Full LIMS. Zero cost.",
    body: "Sample intake, chain of custody, result entry, QC management, reporting, and digital delivery — complete lab management software at no charge. Labs elsewhere pay thousands per year for less.",
  },
  {
    icon: Cpu,
    title: "Connect your instruments directly.",
    body: "BetterHealth interfaces with your analysers over HL7 v2, ASTM E1394, and LIS CSV. Results flow from instrument to patient report without manual re-entry — eliminating transcription errors at the source.",
  },
  {
    icon: BarChart3,
    title: "Automated QC with Westgard rules.",
    body: "Every result run is checked against Westgard multi-rules before it can be released. Out-of-control QC flags surface to your team immediately — not after a patient complaint or a doctor query.",
  },
  {
    icon: AlertTriangle,
    title: "Critical value alerts, automatically.",
    body: "When a result crosses a critical threshold, BetterHealth flags it before release and notifies the referring clinician. Your lab is protected. Your patients are safe.",
  },
  {
    icon: FileText,
    title: "Results to doctors and patients in seconds.",
    body: "Professional PDF reports generated instantly and delivered digitally. No printing, no calling, no chasing. Patients get results on their phone. Referring doctors get them in their dashboard.",
  },
  {
    icon: Network,
    title: "Get found by BetterHealth patients.",
    body: "Partner labs are listed on BetterHealth.africa and eligible to receive home-service collection orders and referrals from doctors in the BetterHealth network — new revenue with zero marketing spend.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Register in minutes",
    body: "Fill in the form below. Our lab partnerships team sets up your account within 24 hours — no IT team, no migration project, no setup fee.",
  },
  {
    step: "02",
    title: "Process smarter from day one",
    body: "Samples are tracked from collection to sign-off. Instruments feed results directly into the system. QC checks run automatically. Reports generate instantly.",
  },
  {
    step: "03",
    title: "Grow your client base",
    body: "You're listed as a partner lab on BetterHealth.africa — accessed by patients and referring doctors across Ghana looking for a quality lab.",
  },
];

const FAQS = [
  {
    q: "Is this really free? What's the catch?",
    a: "Yes, permanently free. BetterHealth earns from patient subscriptions and test bookings — not from labs. Your LIMS access is free today and free forever. We grow when your lab grows.",
  },
  {
    q: "What if we already use a different LIMS?",
    a: "You can migrate your data or run both systems in parallel during a transition. Our team handles onboarding at no charge and stays with you until you're comfortable.",
  },
  {
    q: "Which instruments are supported?",
    a: "BetterHealth supports HL7 v2, ASTM E1394, and LIS CSV interfaces — covering the majority of haematology, chemistry, and immunoassay analysers used in Ghana. Contact us if you need to verify your specific model.",
  },
  {
    q: "Do you take a commission on BetterHealth referrals?",
    a: "No. Referral revenue flows to your lab. You set your pricing; we send you the patient.",
  },
  {
    q: "What support do we get after signing up?",
    a: "A dedicated lab partnerships manager, WhatsApp support, and free onboarding training for your team. You're not handed a manual and left alone.",
  },
];

const TRUST_STATS = [
  { value: "155+", label: "Biomarkers supported" },
  { value: "Free", label: "Forever — not a trial" },
  { value: "24 hrs", label: "To get your lab set up" },
  { value: "HL7 / ASTM", label: "Instrument interfaces" },
];

const STAFF_OPTIONS = ["1-5", "6-15", "16-50", "50+"];
const SYSTEM_OPTIONS = ["Paper / Manual", "Spreadsheets", "Another LIMS", "None"];

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

function RegistrationForm() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    labName: "",
    contactPerson: "",
    email: "",
    whatsapp: "",
    location: "",
    staffCount: "",
    currentSystem: "",
    heardAbout: "",
    notes: "",
  });

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    const result = await submitPartnerSignup({
      partnerType: "lab",
      labName: form.labName.trim(),
      contactPerson: form.contactPerson.trim(),
      email: form.email.trim().toLowerCase(),
      whatsapp: form.whatsapp.trim(),
      location: form.location.trim(),
      staffCount: form.staffCount,
      currentSystem: form.currentSystem,
      heardAbout: form.heardAbout,
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
          Registration received.
        </h3>
        <p className="text-[14px] text-text-secondary leading-relaxed">
          Our lab partnerships team will review your details and be in touch
          within 24 hours to get you set up. For anything urgent, WhatsApp us
          directly at{" "}
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

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-border rounded-card p-4 sm:p-8 shadow-sm flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="lab-name" className={labelCls}>
            Lab Name *
          </label>
          <input
            id="lab-name"
            name="labName"
            required
            type="text"
            placeholder="e.g. MedLab Diagnostics"
            value={form.labName}
            onChange={set("labName")}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="lab-contact" className={labelCls}>
            Contact Person *
          </label>
          <input
            id="lab-contact"
            name="contactPerson"
            required
            type="text"
            placeholder="Full name"
            value={form.contactPerson}
            onChange={set("contactPerson")}
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="lab-email" className={labelCls}>
            Email *
          </label>
          <input
            id="lab-email"
            name="email"
            required
            type="email"
            placeholder="lab@example.com"
            value={form.email}
            onChange={set("email")}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="lab-whatsapp" className={labelCls}>
            WhatsApp Number *
          </label>
          <input
            id="lab-whatsapp"
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

      <div>
        <label htmlFor="lab-location" className={labelCls}>
          Lab Location *
        </label>
        <input
          id="lab-location"
          name="location"
          required
          type="text"
          placeholder="City, Region"
          value={form.location}
          onChange={set("location")}
          className={inputCls}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="lab-staff" className={labelCls}>
            Number of Staff{" "}
            <span className="text-text-muted font-normal">(optional)</span>
          </label>
          <select
            id="lab-staff"
            name="staffCount"
            value={form.staffCount}
            onChange={set("staffCount")}
            className={`${inputCls} appearance-none`}
          >
            <option value="">Select range</option>
            {STAFF_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="lab-system" className={labelCls}>
            Current Lab System{" "}
            <span className="text-text-muted font-normal">(optional)</span>
          </label>
          <select
            id="lab-system"
            name="currentSystem"
            value={form.currentSystem}
            onChange={set("currentSystem")}
            className={`${inputCls} appearance-none`}
          >
            <option value="">Select current system</option>
            {SYSTEM_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="lab-heard-about" className={labelCls}>
          How did you hear about us?{" "}
          <span className="text-text-muted font-normal">(optional)</span>
        </label>
        <select
          id="lab-heard-about"
          name="heardAbout"
          value={form.heardAbout}
          onChange={set("heardAbout")}
          className={`${inputCls} appearance-none`}
        >
          <option value="">Select an option</option>
          {HEARD_ABOUT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="lab-notes" className={labelCls}>
          Additional Notes{" "}
          <span className="text-text-muted font-normal">(optional)</span>
        </label>
        <textarea
          id="lab-notes"
          name="notes"
          rows={4}
          placeholder="Tell us about your lab, your current challenges, or anything else we should know..."
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
            and we&rsquo;ll get your lab onboarded.
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
              Register My Lab <ArrowRight size={15} />
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

export default function ForLabsPage() {
  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Helmet>
        <title>For Labs — Free Lab Management Software | BetterHealth Africa</title>
        <meta
          name="description"
          content="Replace your paper logs and spreadsheets with a full LIMS — free, forever. Instrument interfaces, automated QC, digital reporting, and access to the BetterHealth patient network."
        />
        <link rel="canonical" href="https://www.betterhealth.africa/for-labs" />
        <meta property="og:url" content="https://www.betterhealth.africa/for-labs" />
        <meta
          property="og:title"
          content="For Labs — Free Lab Management Software | BetterHealth Africa"
        />
        <meta
          property="og:description"
          content="Replace your paper logs and spreadsheets with a full LIMS — free, forever. Instrument interfaces, automated QC, digital reporting, and access to the BetterHealth patient network."
        />
      </Helmet>
      <Nav />
      <main>

        {/* ──────────── Hero ──────────── */}
        <section className="min-h-[52vh] flex items-center pt-[120px] pb-14 px-6 bg-base relative overflow-hidden">
          <GradientOrb color="green" size="560px" className="top-[-10%] right-[-8%]" />
          <GradientOrb color="blue" size="340px" className="bottom-[-10%] left-[-5%]" />
          <div className="max-w-[700px] mx-auto text-center relative z-10">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-primary-bg border border-primary/25 text-primary text-xs font-bold font-heading tracking-wider uppercase mb-6">
                <FlaskConical size={13} />
                For Lab Owners
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-[1.8rem] sm:text-[2.6rem] md:text-[3.2rem] font-extrabold font-heading leading-[1.15] text-text-primary mb-5">
                Your lab, finally running on{" "}
                <span className="text-primary italic tracking-normal pb-2 inline-block">
                  software built for it.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-text-secondary font-body max-w-[560px] mx-auto mb-8">
                BetterHealth LIMS replaces the spreadsheets, WhatsApp threads,
                and paper logs that are quietly costing your lab time, accuracy,
                and clients. Full-featured. Completely free.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <a
                href="#lab-name"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-8 py-4 text-base font-bold font-heading transition-all hover:-translate-y-0.5 hover:shadow-lg no-underline"
              >
                Register your lab <ArrowRight size={18} />
              </a>
            </Reveal>
          </div>
        </section>

        {/* ──────────── Trust strip ──────────── */}
        <section className="py-8 px-6 border-y border-border bg-white">
          <div className="max-w-[900px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
            {TRUST_STATS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-[1.5rem] font-extrabold text-primary font-heading">
                  {s.value}
                </div>
                <div className="text-[12px] text-text-muted font-body mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ──────────── Pain points ──────────── */}
        <section className="py-16 px-6 bg-base">
          <div className="max-w-[680px] mx-auto">
            <Reveal>
              <h2 className="text-[1.5rem] font-extrabold text-text-primary font-heading mb-2 text-center">
                Sound familiar?
              </h2>
              <p className="text-[14px] text-text-muted mb-10 text-center">
                Most labs in Ghana are running on systems that weren't built for
                them. Here's what BetterHealth replaces.
              </p>
            </Reveal>
            <div className="flex flex-col gap-3">
              {PAIN_POINTS.map((pain, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-card px-4 py-3.5">
                    <X size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-[13px] text-text-secondary leading-relaxed">
                      {pain}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────── How it works ──────────── */}
        <section className="py-16 px-6 bg-section-alt">
          <div className="max-w-[1000px] mx-auto">
            <Reveal>
              <h2 className="text-[1.6rem] font-extrabold text-text-primary font-heading mb-2 text-center">
                How it works
              </h2>
              <p className="text-[14px] text-text-muted mb-12 text-center max-w-[480px] mx-auto">
                Getting your lab onto BetterHealth is straightforward. No
                lengthy contracts, no IT project, no disruption.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HOW_IT_WORKS.map((step, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="relative bg-white border border-border rounded-card p-6 h-full">
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
        <section className="py-16 px-6 bg-base">
          <div className="max-w-[1100px] mx-auto">
            <Reveal>
              <h2 className="text-[1.6rem] sm:text-[2rem] font-extrabold text-text-primary font-heading tracking-tight mb-3 text-center">
                Everything your lab needs — free
              </h2>
              <p className="text-[15px] text-text-secondary font-body max-w-[520px] mx-auto mb-10 text-center">
                BetterHealth LIMS gives you the tools that large labs pay
                thousands for, at absolutely no cost to you.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BENEFITS.map((b, i) => {
                const Icon = b.icon;
                return (
                  <Reveal key={i} delay={i * 0.06}>
                    <div className="bg-white border border-border rounded-card p-5 hover:border-primary/25 hover:shadow-sm transition-all h-full">
                      <div className="w-10 h-10 rounded-card bg-primary-bg flex items-center justify-center mb-4">
                        <Icon size={20} className="text-primary" />
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
        <section className="py-16 px-6 bg-section-alt">
          <div className="max-w-[680px] mx-auto">
            <Reveal>
              <h2 className="text-[1.5rem] font-extrabold text-text-primary font-heading mb-2 text-center">
                Common questions
              </h2>
              <p className="text-[14px] text-text-muted mb-8 text-center">
                The things every lab manager asks before signing up.
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
        <section className="py-20 px-6 bg-base">
          <div className="max-w-[760px] mx-auto">
            <Reveal>
              <h2 className="text-[1.8rem] font-extrabold text-text-primary font-heading tracking-tight mb-2">
                Register your lab
              </h2>
              <p className="text-[14px] text-text-muted mb-8">
                Fill in the details below and our lab partnerships team will be
                in touch within 24 hours to get you set up.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <RegistrationForm />
            </Reveal>
          </div>
        </section>

        {/* ──────────── Bottom CTA ──────────── */}
        <section className="py-20 lg:py-[100px] px-6 bg-primary relative overflow-hidden">
          <GradientOrb color="green" size="500px" className="top-[-20%] right-[-10%] opacity-30" />
          <div className="max-w-[580px] mx-auto text-center relative z-10">
            <Reveal>
              <h2 className="text-[1.7rem] sm:text-[2.2rem] md:text-[2.6rem] font-extrabold text-white font-heading tracking-tight mb-4">
                Your lab's biggest competitor already runs software like this.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[16px] text-white/80 font-body mb-8">
                Don't let manual processes slow you down. Join Ghana's growing
                network of labs delivering faster, more reliable results with
                BetterHealth.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <a
                href="#lab-name"
                className="inline-flex items-center gap-2 bg-white text-primary rounded-btn px-8 py-4 text-base font-bold font-heading transition-all hover:-translate-y-0.5 hover:shadow-lg no-underline"
              >
                Register Your Lab <ArrowRight size={18} />
              </a>
            </Reveal>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
