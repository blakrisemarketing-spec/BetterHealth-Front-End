import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Stethoscope,
  Activity,
  TestTubes,
  Home,
  ShieldCheck,
  HeadphonesIcon,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const BENEFITS = [
  {
    icon: Activity,
    title: "Digital Lab Results",
    body: "Receive your patients' lab results directly in your dashboard — securely, instantly, and in a format you can act on.",
  },
  {
    icon: Stethoscope,
    title: "Referral Income",
    body: "Earn from every patient you refer for lab work. A simple, transparent commission structure with monthly payouts.",
  },
  {
    icon: TestTubes,
    title: "Comprehensive Test Menu",
    body: "127+ biomarkers across all major organ systems — from routine panels to advanced endocrine and metabolic markers.",
  },
  {
    icon: Home,
    title: "Home Collection for Your Patients",
    body: "No need to send patients to a lab. We collect samples from their home or office at a time that suits them.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted & Certified Labs",
    body: "All samples are processed by CLIA/CAP compliant partner laboratories with rigorous quality controls.",
  },
  {
    icon: HeadphonesIcon,
    title: "Priority Support",
    body: "Dedicated partner support line. Your queries are fast-tracked so you can focus on patient care.",
  },
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
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const lines = [
      "Hi BetterHealth Africa! I would like to register as a medical partner.",
      "",
      `Name: ${form.name}`,
      `Specialty: ${form.specialty}`,
      `Hospital / Clinic: ${form.clinic}`,
      `Email: ${form.email}`,
      `WhatsApp: ${form.whatsapp}`,
      form.license ? `License #: ${form.license}` : null,
      `Partnership type: ${form.partnership}`,
      form.notes ? `\nAdditional notes:\n${form.notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const encoded = encodeURIComponent(lines);
    window.open(
      `https://wa.me/message/MJ3HXLS2NDQEJ1?text=${encoded}`,
      "_blank",
    );
    setSubmitted(true);
  };

  /* ---- Success state ---- */
  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-card p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={24} className="text-green-600" />
        </div>
        <h3 className="text-[18px] font-bold text-text-primary font-heading mb-2">
          Registration submitted!
        </h3>
        <p className="text-[14px] text-text-secondary leading-relaxed">
          Thank you for your interest in partnering with BetterHealth Africa. A
          member of our partnerships team will review your application and get
          back to you within 48 hours. For urgent matters, WhatsApp us at{" "}
          <a
            href="https://wa.me/message/MJ3HXLS2NDQEJ1"
            rel="noopener noreferrer"
            className="text-primary font-semibold underline-offset-2 hover:underline no-underline"
          >
            +233 268 596 410
          </a>
          .
        </p>
      </div>
    );
  }

  /* ---- Form ---- */
  const inputCls =
    "w-full border border-border rounded-btn px-4 py-3 text-[14px] text-text-primary bg-section-alt focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all";
  const labelCls = "block text-[13px] font-semibold text-text-primary mb-1.5";
  const selectCls = `${inputCls} appearance-none`;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-border rounded-card p-4 sm:p-8 shadow-sm flex flex-col gap-5"
    >
      {/* Row 1: Name + Specialty */}
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

      {/* Row 2: Clinic */}
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

      {/* Row 3: Email + WhatsApp */}
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

      {/* Row 4: License + Partnership */}
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

      {/* Row 5: Notes */}
      <div>
        <label htmlFor="doc-notes" className={labelCls}>
          Additional Notes{" "}
          <span className="text-text-muted font-normal">(optional)</span>
        </label>
        <textarea
          id="doc-notes"
          name="notes"
          rows={4}
          placeholder="Tell us anything else we should know — patient volume, current lab setup, questions, etc."
          value={form.notes}
          onChange={set("notes")}
          className={`${inputCls} resize-none`}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="self-start inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-7 py-3.5 text-sm font-bold font-heading transition-all hover:-translate-y-0.5"
      >
        Submit Application <ArrowRight size={15} />
      </button>
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
          content="Register as a BetterHealth Africa medical partner. Refer patients for lab work, receive digital results, earn from referrals, and grow your practice."
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
          content="Register as a BetterHealth Africa medical partner. Refer patients for lab work, receive digital results, earn from referrals, and grow your practice."
        />
      </Helmet>

      <Nav />

      <main>
        {/* ──────────── Hero ──────────── */}
        <section className="min-h-[48vh] flex items-center pt-[120px] pb-14 px-6 bg-base relative overflow-hidden">
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

          <div className="max-w-[680px] mx-auto text-center relative z-10">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-primary-bg border border-primary/25 text-primary text-xs font-bold font-heading tracking-wider uppercase mb-6">
                <Stethoscope size={14} />
                For Doctors
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-[1.8rem] sm:text-[2.6rem] md:text-[3.2rem] font-extrabold font-heading leading-[1.15] text-text-primary mb-4">
                Partner with{" "}
                <span className="text-primary italic tracking-normal pb-2 inline-block">
                  BetterHealth Africa
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-text-secondary font-body max-w-[540px] mx-auto">
                Refer patients for lab work, receive results digitally, earn
                from every referral, and grow your practice — all without
                leaving your clinic.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ──────────── Benefits ──────────── */}
        <section className="py-16 px-6 bg-section-alt">
          <div className="max-w-[1100px] mx-auto">
            <Reveal>
              <h2 className="text-[1.6rem] font-extrabold text-text-primary font-heading mb-2 text-center">
                Why doctors partner with us
              </h2>
              <p className="text-[14px] text-text-muted mb-10 text-center max-w-[520px] mx-auto">
                Everything you need to offer world-class diagnostics without the
                overhead of running your own lab.
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

        {/* ──────────── Registration Form ──────────── */}
        <section className="py-20 px-6 bg-base">
          <div className="max-w-[760px] mx-auto">
            <Reveal>
              <h2 className="text-[1.8rem] font-extrabold text-text-primary font-heading tracking-tight mb-2">
                Register as a partner
              </h2>
              <p className="text-[14px] text-text-muted mb-8">
                Fill in your details below and our partnerships team will be in
                touch within 48 hours.
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
          <div className="max-w-[560px] mx-auto text-center relative z-10">
            <Reveal>
              <h2 className="text-[1.7rem] sm:text-[2.2rem] md:text-[2.6rem] font-extrabold text-white font-heading tracking-tight mb-4">
                Ready to grow your practice?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[16px] text-white/80 font-body mb-8">
                Join a growing network of doctors across Africa who trust
                BetterHealth for fast, reliable, and affordable diagnostics for
                their patients.
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
