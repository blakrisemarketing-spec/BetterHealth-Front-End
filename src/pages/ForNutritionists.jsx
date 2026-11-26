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
import PartnerHero from "../components/partners/PartnerHero";
import { CropShot, PhoneShot } from "../components/partners/AppShot";
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
    shot: { src: "/app-screens/home-v2.webp", alt: "Home in the BetterHealth app: food, water and exercise for the day" },
    body: "Download BetterHealth on Android or iPhone and make a free account. Ask your clients to do the same.",
  },
  {
    step: "02",
    title: "One-on-one coaching",
    shot: { src: "/partners/crop-meal-feed.webp", alt: "A client's lunch as their nutritionist sees it, with Mark as seen and Leave a note" },
    body: "Your client creates a challenge, such as no sugary drinks or vegetables every day, and invites you to coach them one-on-one. Each meal they log reaches you, and you can leave a note on it.",
  },
  {
    step: "03",
    title: "Group coaching",
    shot: { src: "/partners/crop-group-challenge.webp", alt: "A group challenge for clients: no sugary drinks for 30 days" },
    body: "Create a group challenge for several clients and share its link or code. You can follow each person's meals and see who is keeping to the goal.",
  },
];

const BENEFITS = [
  {
    icon: Camera,
    title: "Log every meal",
    shot: { src: "/app-screens/food-meal-v2.webp", alt: "A meal in the app with its calories and nutrients", position: "center 18%" },
    body: "Your clients simply take a picture of each meal, our custom AI model identifies the meal and shows its total calories and nutrient breakdown.",
  },
  {
    icon: MessageSquareText,
    title: "Feedback on the meal itself",
    shot: { src: "/partners/crop-meal-noted.webp", alt: "A meal marked seen with the nutritionist's note" },
    body: "You can comment on each meal and give your clients direct feedback on how to improve each meal.",
  },
  {
    icon: Users,
    title: "All your clients on one screen",
    shot: { src: "/partners/crop-clients-overview.webp", alt: "The clients a nutritionist watches, with what each has added to review" },
    body: "You can accurately monitor all your clients in group challenges or one-on-one coaching. Keeping track of each client's activities has never been easier.",
  },
  {
    icon: Bell,
    title: "Receive client alerts",
    shot: { src: "/partners/crop-lockscreen.webp", alt: "Notices on a phone's lock screen when clients add a meal or a walk" },
    body: "You can turn on alerts and will be notified each time a client uploads a meal that you need to review. You can also customise each alert to fit your preference.",
  },
  {
    icon: Footprints,
    title: "Comprehensive care",
    shot: { src: "/partners/crop-water-days.webp", alt: "A client's water each day against a 2 litre goal" },
    body: "You can also monitor daily water intake and workouts your clients log. Go beyond just diets and offer a level of care you've always wished was possible.",
  },
  {
    icon: Activity,
    title: "Track lab results",
    shot: { src: "/app-screens/hba1c-trend-v1.webp", alt: "HbA1c results over time in the app" },
    body: "You can also recommend lab tests your clients can book in the app and you can track the evidence of their progress on their health data.",
  },
];

const GROUP_POINTS = [
  "Ready-made food rules: no added sugar, no sugary drinks, no fried food, low carb, vegetables every day, or you can make your own.",
  "Set the stakes - you can decide what the winner of a challenge gets which will keep the participants motivated.",
  "A leaderboard with gold, silver and bronze, and photos members add as proof",
];

const FAQS = [
  {
    q: "What does it cost?",
    a: "Nothing. Partnering is free, and so is the app for you and your clients.",
  },
  {
    q: "What exactly can I see?",
    a: "The goal your client set, their meal photos they log with the detailed nutrient breakdown, and a way to track compliance on a daily basis. In a water or steps challenge you see their water or their steps and workouts. If they share their lab results with you, you can also see their results and how your coaching is directly impacting their health.",
  },
  {
    q: "Do meals my clients type in show up?",
    a: "Yes. Every meal your client logs reaches you, whether they photograph it or type it in.",
  },
  {
    q: "Do I need special software?",
    a: "No. You use the same BetterHealth app on your phone.",
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
        <PartnerHero
          badge={{ icon: Apple, label: "For Nutritionists & Dieticians" }}
          title={{ lead: "Remote diet monitoring for", highlight: "effective client compliance" }}
          body={[
            <>
              The BetterHealth App helps you monitor your client&rsquo;s diet
              remotely so you can better guide them in achieving their health
              goals.
            </>,
            <>
              Your clients photograph their meals in the app and invite you as
              their accountability partner. You can review each meal they
              upload and leave a note.
            </>,
          ]}
          actions={[
            { label: "Apply to partner", href: "#nut-name", primary: true },
            { label: "Get the app", to: "/download-app" },
          ]}
          photo={{ src: "/photos/page-nutritionists.webp", alt: "A nutritionist talking a client through a plate of waakye" }}
          shots={[
            { src: "/partners/phone-meal-feed.webp", alt: "A client's lunch as their nutritionist sees it in the BetterHealth app" },
            { src: "/partners/phone-clients-overview.webp", alt: "The clients a nutritionist watches, with what each has added to review" },
            { src: "/partners/phone-leaderboard.webp", alt: "A group challenge's league table" },
          ]}
        />

        {/* ──────────── One-to-one coaching ──────────── */}
        <section className="py-16 px-6 bg-base">
          <div className="max-w-[1000px] mx-auto">
            <Reveal>
              <h2 className="text-[1.6rem] font-extrabold text-text-primary font-heading mb-2 text-center">
                One-to-one and group coaching options
              </h2>
              <p className="text-[14px] text-text-muted mb-12 text-center max-w-[520px] mx-auto">
                The app enables you to monitor your clients either on a
                one-on-one basis or as a group. No more WhatsApp groups, now you
                can see what each client eats in one place.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {COACHING_STEPS.map((step, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="relative bg-section-alt border border-border rounded-card p-4 sm:p-5 h-full">
                    <CropShot {...step.shot} className="mb-5" />
                    <span className="text-[2.2rem] font-extrabold text-primary/15 font-heading leading-none block mb-3 px-1">
                      {step.step}
                    </span>
                    <h3 className="text-[15px] font-bold text-text-primary font-heading mb-2 px-1">
                      {step.title}
                    </h3>
                    <p className="text-[13px] text-text-secondary leading-relaxed px-1 pb-1">
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
                How it works
              </h2>
              <p className="text-[14px] text-text-muted mb-10 text-center max-w-[520px] mx-auto">
                Remote diet compliance. You can see everything your clients eat
                on a daily basis and give them direct feedback in the app. Your
                clients are 2.5 times more likely to stick to their diets with
                you keeping them accountable.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BENEFITS.map((b, i) => {
                const Icon = b.icon;
                return (
                  <Reveal key={i} delay={i * 0.07}>
                    <div className="bg-white border border-border rounded-card p-4 sm:p-5 hover:border-primary/25 hover:shadow-sm transition-all h-full">
                      <CropShot {...b.shot} className="mb-5" />
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
        <section className="py-16 lg:py-20 px-6 bg-base overflow-hidden">
          <div className="max-w-[1040px] mx-auto grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-12 items-center">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 text-primary text-xs font-bold font-heading tracking-wider uppercase mb-3">
                  <Trophy size={14} />
                  Group coaching
                </span>
                <h2 className="text-[1.6rem] font-extrabold text-text-primary font-heading mb-3">
                  Run a group as a challenge
                </h2>
                <p className="text-[14px] text-text-secondary leading-relaxed mb-6">
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
            <Reveal delay={0.15}>
              <div className="relative mx-auto h-[470px] w-full max-w-[400px] sm:h-[520px]">
                <div aria-hidden="true" className="absolute inset-x-4 bottom-0 top-16 rounded-[32px] bg-gradient-to-br from-mint to-cream" />
                <PhoneShot
                  src="/partners/phone-group-challenge.webp"
                  alt="A group challenge for clients: no sugary drinks for 30 days"
                  width={200}
                  className="absolute left-2 top-0 -rotate-[5deg] sm:left-4"
                />
                <PhoneShot
                  src="/partners/phone-leaderboard.webp"
                  alt="The challenge's league table with gold, silver and bronze"
                  width={210}
                  className="absolute right-2 top-10 rotate-[4deg] sm:right-4"
                />
              </div>
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
                Coach your clients and track compliance with ease
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[16px] text-white/80 font-body mb-8">
                Remote coaching and compliance monitoring made easy with
                BetterHealth Africa.
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
