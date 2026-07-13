import { useState } from "react";
import Seo from "../components/Seo";
import {
  Apple,
  Activity,
  TrendingUp,
  ClipboardList,
  Users,
  ShieldCheck,
  HeadphonesIcon,
  ArrowRight,
  CheckCircle2,
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

const BENEFITS = [
  {
    icon: Activity,
    title: "Client lab results, delivered digitally",
    body: "You see your clients' health indicator results the moment they're released. No more chasing PDFs or waiting on clients to forward an attachment.",
  },
  {
    icon: TrendingUp,
    title: "Earn from every referral",
    body: "You earn a clear commission for every client you refer for lab work, paid out monthly. Your income grows alongside your practice.",
  },
  {
    icon: ClipboardList,
    title: "Build meal plans on real data",
    body: "Stop guessing. Use real health data, from vitamin D and iron stores to the lipid panel and HbA1c, to design plans that hold up.",
  },
  {
    icon: Users,
    title: "Get new client referrals",
    body: "Get listed in the BetterHealth nutritionist directory. Clients whose results call for dietary guidance come straight to you.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted, certified lab partners",
    body: "CLIA/CAP compliant partner laboratories process every sample under strict quality controls, so you get results you can stand behind.",
  },
  {
    icon: HeadphonesIcon,
    title: "Priority partner support",
    body: "Nutrition partners get a dedicated WhatsApp line. We answer result questions, client onboarding, and pricing queries the same day.",
  },
];

const QUALIFICATION_OPTIONS = [
  "Registered Dietician",
  "Clinical Nutritionist",
  "Sports / Performance Nutritionist",
  "Paediatric Nutritionist",
  "Holistic / Wellness Nutritionist",
  "Other",
];

const EXPERIENCE_OPTIONS = ["0-2 years", "3-5 years", "6-10 years", "10+ years"];

const PARTNERSHIP_OPTIONS = [
  "Refer clients for lab work",
  "Receive client results from BetterHealth users",
  "Both",
  "Other",
];

/* ------------------------------------------------------------------ */
/*  Registration Form                                                  */
/* ------------------------------------------------------------------ */

const INITIAL_FORM = {
  name: "",
  qualification: "",
  practice: "",
  email: "",
  whatsapp: "",
  license: "",
  experience: "",
  partnership: "",
  heardAbout: "",
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
      partnerType: "nutritionist",
      name: form.name.trim(),
      qualification: form.qualification,
      practice: form.practice.trim(),
      email: form.email.trim().toLowerCase(),
      whatsapp: form.whatsapp.trim(),
      license: form.license.trim(),
      experience: form.experience,
      partnership: form.partnership,
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
          Application submitted!
        </h3>
        <p className="text-[14px] text-text-secondary leading-relaxed">
          Thanks for your interest in partnering with BetterHealth Africa. Our
          partnerships team will review your application and get back to you
          within 48 hours. For urgent matters, WhatsApp us at{" "}
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
      {/* Row 1: Name + Qualification */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nut-name" className={labelCls}>
            Full Name *
          </label>
          <input
            id="nut-name"
            name="name"
            required
            type="text"
            placeholder="Akosua Boateng, RD"
            value={form.name}
            onChange={set("name")}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="nut-qualification" className={labelCls}>
            Qualification *
          </label>
          <select
            id="nut-qualification"
            name="qualification"
            required
            value={form.qualification}
            onChange={set("qualification")}
            className={selectCls}
          >
            <option value="">Select your qualification</option>
            {QUALIFICATION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 2: Practice */}
      <div>
        <label htmlFor="nut-practice" className={labelCls}>
          Practice / Clinic Name *
        </label>
        <input
          id="nut-practice"
          name="practice"
          required
          type="text"
          placeholder="e.g. Accra Nutrition Clinic"
          value={form.practice}
          onChange={set("practice")}
          className={inputCls}
        />
      </div>

      {/* Row 3: Email + WhatsApp */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nut-email" className={labelCls}>
            Email *
          </label>
          <input
            id="nut-email"
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
          <label htmlFor="nut-whatsapp" className={labelCls}>
            WhatsApp Number *
          </label>
          <input
            id="nut-whatsapp"
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

      {/* Row 4: License + Experience */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nut-license" className={labelCls}>
            Registration / License #{" "}
            <span className="text-text-muted font-normal">(optional)</span>
          </label>
          <input
            id="nut-license"
            name="license"
            type="text"
            placeholder="e.g. AHPC-RD-XXXX"
            value={form.license}
            onChange={set("license")}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="nut-experience" className={labelCls}>
            Years of Experience{" "}
            <span className="text-text-muted font-normal">(optional)</span>
          </label>
          <select
            id="nut-experience"
            name="experience"
            value={form.experience}
            onChange={set("experience")}
            className={selectCls}
          >
            <option value="">Select range</option>
            {EXPERIENCE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 5: Partnership */}
      <div>
        <label htmlFor="nut-partnership" className={labelCls}>
          How would you like to partner? *
        </label>
        <select
          id="nut-partnership"
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

      {/* Row 6: How did you hear about us */}
      <div>
        <label htmlFor="nut-heard-about" className={labelCls}>
          How did you hear about us?{" "}
          <span className="text-text-muted font-normal">(optional)</span>
        </label>
        <select
          id="nut-heard-about"
          name="heardAbout"
          value={form.heardAbout}
          onChange={set("heardAbout")}
          className={selectCls}
        >
          <option value="">Select an option</option>
          {HEARD_ABOUT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Row 7: Notes */}
      <div>
        <label htmlFor="nut-notes" className={labelCls}>
          Additional Notes{" "}
          <span className="text-text-muted font-normal">(optional)</span>
        </label>
        <textarea
          id="nut-notes"
          name="notes"
          rows={4}
          placeholder="Tell us about your practice, the conditions you specialise in, or anything else we should know."
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

      {/* Submit */}
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

export default function ForNutritionistsPage() {
  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Seo route="for-nutritionists" />

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
                <Apple size={14} />
                For Nutritionists &amp; Dieticians
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-[1.8rem] sm:text-[2.6rem] md:text-[3.2rem] font-extrabold font-heading leading-[1.15] text-text-primary mb-4">
                Grow your nutrition practice with{" "}
                <span className="text-primary italic tracking-normal pb-2 inline-block">
                  BetterHealth Africa
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-text-secondary font-body max-w-[540px] mx-auto">
                Get your clients&rsquo; lab results digitally, design plans
                backed by real health data, earn from every referral, and
                grow your client list, all without leaving your practice.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ──────────── Benefits ──────────── */}
        <section className="py-16 px-6 bg-section-alt">
          <div className="max-w-[1100px] mx-auto">
            <Reveal>
              <h2 className="text-[1.6rem] font-extrabold text-text-primary font-heading mb-2 text-center">
                Why nutritionists partner with us
              </h2>
              <p className="text-[14px] text-text-muted mb-10 text-center max-w-[520px] mx-auto">
                The tools to move from guesswork to data, and to grow your
                practice while you&rsquo;re at it.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BENEFITS.map((b, i) => {
                const Icon = b.icon;
                return (
                  <Reveal key={i} delay={i * 0.07}>
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

        {/* ──────────── Registration Form ──────────── */}
        <section className="py-20 px-6 bg-base">
          <div className="max-w-[760px] mx-auto">
            <Reveal>
              <h2 className="text-[1.8rem] font-extrabold text-text-primary font-heading tracking-tight mb-2">
                Apply as a nutrition partner
              </h2>
              <p className="text-[14px] text-text-muted mb-8">
                Fill in your details and our partnerships team will be in touch
                within 48 hours.
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
                Dieticians and nutritionists across Africa use BetterHealth to
                give their clients care grounded in real data. You can join
                them.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <a
                href="#nut-name"
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
