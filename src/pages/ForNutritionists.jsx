import { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import {
  Apple,
  Activity,
  Camera,
  MessageSquareText,
  Users,
  Bell,
  Footprints,
  Trophy,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PagePhoto from "../components/ui/PagePhoto";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";
import { submitPartnerSignup, HEARD_ABOUT_OPTIONS } from "../lib/partner-signup";
import PhoneField from "../components/ui/PhoneField";
import {
  composeE164,
  defaultPhoneValue,
  formatE164ForDisplay,
  validatePhone,
} from "../lib/phone";
import { whatsappUrl } from "../lib/whatsapp";

const WHATSAPP_URL = whatsappUrl(
  "Hello, I'm a nutritionist interested in partnering with BetterHealth Africa.",
);
const WHATSAPP_NUMBER = "+233 268 596 410";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const COACHING_STEPS = [
  {
    step: "01",
    title: "You and your clients get the app",
    body: "Download BetterHealth on Android or iPhone and make a free account. Ask your clients to do the same.",
  },
  {
    step: "02",
    title: "Your client invites you",
    body: "Your client sets a goal, such as no sugary drinks or vegetables every day, and sends you an invite to be their accountability partner. They decide who can watch and can remove you at any time.",
  },
  {
    step: "03",
    title: "You review what they eat",
    body: "Each meal they photograph reaches you with the foods the app found in it and whether the day stayed within their goal. Mark it as seen and leave a short note, which they get on their phone.",
  },
];

const BENEFITS = [
  {
    icon: Camera,
    title: "Meal photos as they're logged",
    body: "You see the photo, the foods in it, and whether the day met the goal. If a client went over a carbohydrate limit, the app tells you so.",
  },
  {
    icon: MessageSquareText,
    title: "Feedback on the meal itself",
    body: "Mark a meal as seen and add a note of up to 280 characters. Your client reads it next to the photo.",
  },
  {
    icon: Users,
    title: "All your clients on one screen",
    body: "The app lists each client you follow, with a count of meals waiting for your review. There's no cap on how many clients you follow.",
  },
  {
    icon: Bell,
    title: "Alerts on your terms",
    body: "Get each meal as it comes, one summary at 7 pm, or no alerts. Anything logged overnight waits until 7 am.",
  },
  {
    icon: Footprints,
    title: "Water and movement goals too",
    body: "Clients can set a daily water target or a steps goal instead. You follow those the same way, workouts included.",
  },
  {
    icon: Activity,
    title: "Lab results for patients doctors send you",
    body: "When a patient on a doctor's BetterHealth panel needs nutrition advice, we can assign them to you. You see their released results and add your nutrition note.",
  },
];

const GROUP_POINTS = [
  "Up to 50 people in one challenge, for up to 92 days",
  "Ready-made food rules: no added sugar, no sugary drinks, no fried food, low carb, vegetables every day, or a rule you write",
  "Steps and water challenges as well",
  "A leaderboard with gold, silver and bronze, and photos members add as proof",
];

const FAQS = [
  {
    q: "What does it cost?",
    a: "Nothing. Partnering is free, and so is the app for you and your clients.",
  },
  {
    q: "What exactly can I see?",
    a: "The goal your client set, their meal photos with the foods the app found, and each day kept or missed with the reason. In a water or steps challenge you see their water or their steps and workouts. You don't see their calorie and nutrient figures, lab results, weight or other health readings.",
  },
  {
    q: "Do meals my clients type in show up?",
    a: "No. Photos are what reach you, so ask clients to photograph their meals.",
  },
  {
    q: "Do I need special software?",
    a: "No. You use the same BetterHealth app on your phone. Alerts come to the phone, so install the app rather than relying on the website.",
  },
  {
    q: "How many clients can I follow?",
    a: "As many as invite you. A group challenge holds up to 50 people, you included.",
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
  "Coach clients one-to-one in the app",
  "Run group challenges",
  "Advise patients sent by doctors",
  "All of these",
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
  qualification: "",
  practice: "",
  email: "",
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

  const [phone, setPhone] = useState(() => defaultPhoneValue());
  const [phoneError, setPhoneError] = useState("");

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;

    const phoneCheck = validatePhone(phone);
    if (!phoneCheck.ok) {
      setPhoneError(phoneCheck.message);
      return;
    }
    setPhoneError("");

    setStatus("loading");
    setErrorMessage("");

    const result = await submitPartnerSignup({
      partnerType: "nutritionist",
      name: form.name.trim(),
      qualification: form.qualification,
      practice: form.practice.trim(),
      email: form.email.trim().toLowerCase(),
      whatsapp: composeE164(phone),
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
        <PhoneField
          id="nut-whatsapp"
          label="WhatsApp Number *"
          fieldClass="px-4 py-3 text-[14px]"
          value={phone}
          onChange={(next) => {
            setPhoneError("");
            setPhone(next);
          }}
          error={phoneError}
          hint={composeE164(phone) ? `We'll save this as ${formatE164ForDisplay(phone)}` : undefined}
          required
        />
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
        <section className="flex items-center pt-[120px] pb-10 px-6 bg-base relative overflow-hidden">
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
                See what your clients eat{" "}
                <span className="text-primary tracking-normal pb-2 inline-block">
                  between appointments
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-text-secondary font-body max-w-[560px] mx-auto mb-8">
                Your clients photograph their meals in the BetterHealth app and
                invite you as their accountability partner. You review each
                meal, send a note, and run group challenges for the people you
                coach.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="#nut-name"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-7 py-3.5 text-sm font-bold font-heading transition-all hover:-translate-y-0.5 no-underline"
                >
                  Apply to partner <ArrowRight size={16} />
                </a>
                <Link
                  to="/download-app"
                  className="inline-flex items-center gap-2 border border-primary/30 text-primary rounded-btn px-7 py-3.5 text-sm font-bold font-heading transition-all hover:bg-primary-bg no-underline"
                >
                  Get the app
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
        <PagePhoto src="/photos/page-nutritionists.webp" alt="A nutritionist talking a client through a plate of waakye" className="pb-6" />

        {/* ──────────── One-to-one coaching ──────────── */}
        <section className="py-16 px-6 bg-base">
          <div className="max-w-[1000px] mx-auto">
            <Reveal>
              <h2 className="text-[1.6rem] font-extrabold text-text-primary font-heading mb-2 text-center">
                One-to-one coaching in the app
              </h2>
              <p className="text-[14px] text-text-muted mb-12 text-center max-w-[520px] mx-auto">
                Your client photographs a meal, and you can see it and reply
                the same day.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {COACHING_STEPS.map((step, i) => (
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
                What you get as a partner
              </h2>
              <p className="text-[14px] text-text-muted mb-10 text-center max-w-[520px] mx-auto">
                Your clients choose who can watch, and they can remove a
                partner at any time.
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

        {/* ──────────── Group coaching ──────────── */}
        <section className="py-16 px-6 bg-base">
          <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-primary text-xs font-bold font-heading tracking-wider uppercase mb-3">
                <Trophy size={14} />
                Group coaching
              </span>
              <h2 className="text-[1.6rem] font-extrabold text-text-primary font-heading mb-3">
                Run a group as a challenge
              </h2>
              <p className="text-[14px] text-text-secondary leading-relaxed">
                Create a challenge in the app and share its link or code with
                your clients. Use it for a sugar-free month or a 12-week
                programme.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="bg-section-alt border border-border rounded-card p-6 flex flex-col gap-3 list-none m-0">
                {GROUP_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[14px] text-text-secondary leading-relaxed">
                    <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ──────────── FAQ ──────────── */}
        <section className="py-16 px-6 bg-section-alt">
          <div className="max-w-[680px] mx-auto">
            <Reveal>
              <h2 className="text-[1.5rem] font-extrabold text-text-primary font-heading mb-8 text-center">
                Common questions
              </h2>
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
                Coach your clients between appointments
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[16px] text-white/80 font-body mb-8">
                Apply below, then ask your first client to send you an invite
                from the BetterHealth app.
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
