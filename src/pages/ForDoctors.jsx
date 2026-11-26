import { useState } from "react";
import Seo from "../components/Seo";
import {
  Stethoscope,
  Activity,
  Camera,
  Footprints,
  ArrowRight,
  CheckCircle2,
  Banknote,
  ClipboardList,
  ChevronDown,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PartnerHero from "../components/partners/PartnerHero";
import { CropShot } from "../components/partners/AppShot";
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
  "Hello, I'm a doctor interested in partnering with BetterHealth Africa.",
);
const WHATSAPP_NUMBER = "+233 268 596 410";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const BENEFITS = [
  {
    icon: Camera,
    title: "What they eat, meal by meal",
    shot: { src: "/partners/crop-meal-noted.webp", alt: "A partner's view of a patient's lunch, marked seen, with a note", ratio: "4 / 3", position: "center 70%" },
    body: "A patient with diabetes can set a low-carb or no-added-sugar goal and invite you. You see each meal they photograph and whether the day stayed within the goal.",
  },
  {
    icon: Footprints,
    title: "Movement and water",
    shot: { src: "/partners/crop-walks-feed.webp", alt: "A patient's morning walks as their partner sees them", ratio: "4 / 3" },
    body: "Steps and water goals work the same way. You see daily steps, the length and distance of each workout, or the water they drank against their target.",
  },
  {
    icon: ClipboardList,
    title: "Test panels you design",
    shot: { src: "/partners/web-doctor-panel-builder.webp", position: "left top", alt: "Building a test panel in the doctor dashboard", ratio: "4 / 3" },
    body: "Choose the tests, add your own fee, and bill once or every 1, 3, 6 or 12 months. Invite patients by email, and they pay through BetterHealth.",
  },
  {
    icon: Activity,
    title: "Results for patients on your panel",
    shot: { src: "/partners/web-doctor-results.webp", position: "left top", alt: "Released results for a patient on a doctor's panel", ratio: "4 / 3" },
    body: "Released results come to your dashboard in date order. Critical values are flagged for you to acknowledge, and you can add notes and sign off.",
  },
  {
    icon: Banknote,
    title: "Paid consultations",
    shot: { src: "/partners/web-doctor-consultations.webp", position: "left top", alt: "Consultations in the doctor dashboard", ratio: "4 / 3" },
    body: "Patients can add a doctor consultation when they book tests. We assign it to a partner doctor, you hold the call once results are in, and BetterHealth pays you for it.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Your patient tests wherever they are",
    shot: { src: "/partners/crop-book-test.webp", alt: "Choosing a test package in the BetterHealth app" },
    body: "Your patient books a lab test in the BetterHealth app, at a partner lab near them or with home collection. Their results are sent to you confidentially to review.",
  },
  {
    step: "02",
    title: "You monitor their compliance at home",
    shot: { src: "/partners/crop-clients-overview.webp", alt: "The patients a doctor follows, with what each has added to review" },
    body: "Your patient invites you in the BetterHealth app. You see whether they take their medication, the meals they eat, and their water and movement, as they log them.",
  },
  {
    step: "03",
    title: "You respond between visits",
    shot: { src: "/partners/crop-patient-note.webp", alt: "The patient sees that their doctor saw the meal, and reads the note" },
    body: "Mark each meal or workout as seen and add a short note. Your patient gets it on their phone before the next appointment.",
  },
];

const FAQS = [
  {
    q: "Do I need to install anything or pay a setup fee?",
    a: "There's no fee. Remote monitoring is completely free for you and your patients. To follow patients between visits, install the BetterHealth app on your phone.",
  },
  {
    q: "What can I see when a patient invites me?",
    a: "The goal they set, the meals they log, whether they take their medication, their steps, workouts and water, and the lab results they share with you.",
  },
  {
    q: "Can I see my patient's full history, not just the latest results?",
    a: "Yes. Patients can share their full results history with you. For patients on your panel, you see every released result in date order, plus the health history they gave when they joined.",
  },
  {
    q: "What happens if a result is critically abnormal?",
    a: "For patients on your panel, the result comes to your dashboard flagged as critical, and you're asked to acknowledge it.",
  },
  {
    q: "How do I get paid?",
    a: "BetterHealth pays you for the consultations you hold. If you add a fee to a test panel, it's part of what the patient pays.",
  },
];

const TRUST_STATS = [
  { value: "Free", label: "To partner" },
  { value: "No cap", label: "On patients you can follow" },
  { value: "1–12 mo", label: "Panel billing you choose" },
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
  "Follow patients between visits in the app",
  "Build test panels for my patients",
  "Hold paid consultations",
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
  specialty: "",
  clinic: "",
  email: "",
  license: "",
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
      partnerType: "doctor",
      name: form.name.trim(),
      specialty: form.specialty,
      clinic: form.clinic.trim(),
      email: form.email.trim().toLowerCase(),
      whatsapp: composeE164(phone),
      license: form.license.trim(),
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
          Application received.
        </h3>
        <p className="text-[14px] text-text-secondary leading-relaxed">
          Our partnerships team will review your application and be in touch
          within 48 hours. For anything urgent, WhatsApp us at{" "}
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
        <PhoneField
          id="doc-whatsapp"
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
        <label htmlFor="doc-heard-about" className={labelCls}>
          How did you hear about us?{" "}
          <span className="text-text-muted font-normal">(optional)</span>
        </label>
        <select
          id="doc-heard-about"
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

      <div>
        <label htmlFor="doc-notes" className={labelCls}>
          Additional Notes{" "}
          <span className="text-text-muted font-normal">(optional)</span>
        </label>
        <textarea
          id="doc-notes"
          name="notes"
          rows={4}
          placeholder="Anything else we should know: patient volume, current lab setup, questions."
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
      <Seo route="for-doctors" />

      <Nav />

      <main>
        {/* ──────────── Hero ──────────── */}
        <PartnerHero
          badge={{ icon: Stethoscope, label: "For Doctors" }}
          title={{ lead: "Monitor your patients", highlight: "between visits" }}
          body={[
            <>
              Patient care should not end when the patient leaves the
              hospital. Monitor your patient&rsquo;s compliance from their
              home, track their prescription intake, meals they eat, sleep,
              water and more.
            </>,
          ]}
          actions={[{ label: "Apply to partner", href: "#doc-name", primary: true }]}
          photo={{ src: "/photos/page-doctors.webp", alt: "A doctor reviewing a patient's results at his desk" }}
          shots={[
            { src: "/partners/phone-meal-noted.webp", alt: "A doctor's view of a patient's lunch in the BetterHealth app, marked seen with a note" },
            { src: "/partners/phone-walks-feed.webp", alt: "A patient's morning walks as their doctor sees them" },
            { src: "/partners/phone-water-days.webp", alt: "A patient's water each day against a 2 litre goal" },
          ]}
        />

        {/* ──────────── Trust strip ──────────── */}
        <section className="py-8 px-6 border-y border-border bg-white">
          <div className="max-w-[700px] mx-auto grid grid-cols-3 gap-6">
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
                How remote monitoring between visits works
              </h2>
              <div className="mb-12" />
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HOW_IT_WORKS.map((step, i) => (
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
                Built to give you the level of patient care you&rsquo;ve always
                wished you had.
              </h2>
              <p className="text-[14px] text-text-muted mb-10 text-center max-w-[620px] mx-auto">
                Doctors across the country are faced with a difficult
                challenge, you have to see as many patients as possible in the
                hospital in a limited time and when they go home, you have no
                idea if they are staying compliant with your health
                recommendations. BetterHealth Africa changes that. Now you can
                deliver care to your patients both in the hospital and from the
                comfort of their homes with ease.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BENEFITS.map((b, i) => {
                const Icon = b.icon;
                return (
                  <Reveal key={i} delay={i * 0.07}>
                    <div className="bg-white border border-border rounded-card p-4 sm:p-5 hover:border-primary/25 hover:shadow-sm transition-all h-full">
                      <CropShot {...b.shot} className="mb-5" />
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
                What other doctors asked before applying.
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
                Stay with your patients between visits
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[16px] text-white/80 font-body mb-8">
                Apply below, then ask your first patient to invite you from the
                BetterHealth app.
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
