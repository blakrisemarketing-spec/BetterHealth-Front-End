import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FlaskConical, ClipboardCheck, Users, BarChart3, FileText, Network, ArrowRight, CheckCircle2 } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";

const BENEFITS = [
  {
    icon: FlaskConical,
    title: "Free Lab Management Software",
    body: "Full-featured LIMS with no license fees, no hidden costs, and no usage limits. Free today, free forever.",
  },
  {
    icon: ClipboardCheck,
    title: "Sample Tracking & Chain of Custody",
    body: "Track every sample from collection to reporting with a complete, auditable chain of custody log.",
  },
  {
    icon: BarChart3,
    title: "Automated Result Validation",
    body: "Built-in Westgard rules and QC flags catch out-of-range results before they reach patients.",
  },
  {
    icon: Users,
    title: "Client & Patient Management",
    body: "Manage referring doctors, corporate clients, and individual patients from a single dashboard.",
  },
  {
    icon: FileText,
    title: "Digital Reporting & Result Delivery",
    body: "Generate professional PDF reports and deliver results to patients and clinicians digitally in seconds.",
  },
  {
    icon: Network,
    title: "Join the BetterHealth Network",
    body: "Get listed as a partner lab on BetterHealth and receive referrals from thousands of BetterHealth patients across Ghana.",
  },
];

const STAFF_OPTIONS = ["1-5", "6-15", "16-50", "50+"];
const SYSTEM_OPTIONS = ["Paper / Manual", "Spreadsheets", "Another LIMS", "None"];

function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    labName: "",
    contactPerson: "",
    email: "",
    whatsapp: "",
    location: "",
    staffCount: "",
    currentSystem: "",
    notes: "",
  });

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const lines = [
      "Hi BetterHealth Africa! We would like to register our lab on your LIMS platform.",
      "",
      `Lab Name: ${form.labName}`,
      `Contact Person: ${form.contactPerson}`,
      `Email: ${form.email}`,
      `WhatsApp: ${form.whatsapp}`,
      `Location: ${form.location}`,
    ];
    if (form.staffCount) lines.push(`Number of Staff: ${form.staffCount}`);
    if (form.currentSystem) lines.push(`Current System: ${form.currentSystem}`);
    if (form.notes) {
      lines.push("");
      lines.push(`Additional Notes:\n${form.notes}`);
    }
    const encoded = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/message/MJ3HXLS2NDQEJ1?text=${encoded}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-card p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={24} className="text-green-600" />
        </div>
        <h3 className="text-[18px] font-bold text-text-primary font-heading mb-2">Registration submitted!</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed">
          Thanks for your interest! Our lab partnerships team will review your details and get back to you within 24 hours.
          If you need an immediate response, WhatsApp us at{" "}
          <a
            href="https://wa.me/message/MJ3HXLS2NDQEJ1"
            rel="noopener noreferrer"
            className="text-primary font-semibold underline-offset-2 hover:underline no-underline"
          >
            +233 268 596 410
          </a>{" "}
          directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-border rounded-card p-4 sm:p-8 shadow-sm flex flex-col gap-5">
      {/* Lab Name + Contact Person */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="lab-name" className="block text-[13px] font-semibold text-text-primary mb-1.5">Lab Name *</label>
          <input
            id="lab-name"
            name="labName"
            required
            type="text"
            placeholder="e.g. MedLab Diagnostics"
            value={form.labName}
            onChange={set("labName")}
            className="w-full border border-border rounded-btn px-4 py-3 text-[14px] text-text-primary bg-section-alt focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
          />
        </div>
        <div>
          <label htmlFor="lab-contact" className="block text-[13px] font-semibold text-text-primary mb-1.5">Contact Person *</label>
          <input
            id="lab-contact"
            name="contactPerson"
            required
            type="text"
            placeholder="Full name"
            value={form.contactPerson}
            onChange={set("contactPerson")}
            className="w-full border border-border rounded-btn px-4 py-3 text-[14px] text-text-primary bg-section-alt focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
          />
        </div>
      </div>

      {/* Email + WhatsApp */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="lab-email" className="block text-[13px] font-semibold text-text-primary mb-1.5">Email *</label>
          <input
            id="lab-email"
            name="email"
            required
            type="email"
            placeholder="lab@example.com"
            value={form.email}
            onChange={set("email")}
            className="w-full border border-border rounded-btn px-4 py-3 text-[14px] text-text-primary bg-section-alt focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
          />
        </div>
        <div>
          <label htmlFor="lab-whatsapp" className="block text-[13px] font-semibold text-text-primary mb-1.5">WhatsApp Number *</label>
          <input
            id="lab-whatsapp"
            name="whatsapp"
            required
            type="tel"
            placeholder="+233 XX XXX XXXX"
            value={form.whatsapp}
            onChange={set("whatsapp")}
            className="w-full border border-border rounded-btn px-4 py-3 text-[14px] text-text-primary bg-section-alt focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label htmlFor="lab-location" className="block text-[13px] font-semibold text-text-primary mb-1.5">Lab Location *</label>
        <input
          id="lab-location"
          name="location"
          required
          type="text"
          placeholder="City, Region"
          value={form.location}
          onChange={set("location")}
          className="w-full border border-border rounded-btn px-4 py-3 text-[14px] text-text-primary bg-section-alt focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
        />
      </div>

      {/* Staff Count + Current System */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="lab-staff" className="block text-[13px] font-semibold text-text-primary mb-1.5">
            Number of Staff <span className="text-text-muted font-normal">(optional)</span>
          </label>
          <select
            id="lab-staff"
            name="staffCount"
            value={form.staffCount}
            onChange={set("staffCount")}
            className="w-full border border-border rounded-btn px-4 py-3 text-[14px] text-text-primary bg-section-alt focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all appearance-none"
          >
            <option value="">Select range</option>
            {STAFF_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="lab-system" className="block text-[13px] font-semibold text-text-primary mb-1.5">
            Current Lab System <span className="text-text-muted font-normal">(optional)</span>
          </label>
          <select
            id="lab-system"
            name="currentSystem"
            value={form.currentSystem}
            onChange={set("currentSystem")}
            className="w-full border border-border rounded-btn px-4 py-3 text-[14px] text-text-primary bg-section-alt focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all appearance-none"
          >
            <option value="">Select current system</option>
            {SYSTEM_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="lab-notes" className="block text-[13px] font-semibold text-text-primary mb-1.5">
          Additional Notes <span className="text-text-muted font-normal">(optional)</span>
        </label>
        <textarea
          id="lab-notes"
          name="notes"
          rows={4}
          placeholder="Tell us about your lab, your current challenges, or anything else we should know..."
          value={form.notes}
          onChange={set("notes")}
          className="w-full border border-border rounded-btn px-4 py-3 text-[14px] text-text-primary bg-section-alt focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all resize-none"
        />
      </div>

      <button
        type="submit"
        className="self-start inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-7 py-3.5 text-sm font-bold font-heading transition-all hover:-translate-y-0.5"
      >
        Register My Lab <ArrowRight size={15} />
      </button>
    </form>
  );
}

export default function ForLabsPage() {
  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Helmet>
        <title>For Labs — Free Lab Management Software | BetterHealth Africa</title>
        <meta
          name="description"
          content="Register your lab on BetterHealth and get free lab management software (LIMS). Track samples, validate results, generate reports, and grow your lab — all at zero cost."
        />
        <link rel="canonical" href="https://www.betterhealth.africa/for-labs" />
        <meta property="og:url" content="https://www.betterhealth.africa/for-labs" />
        <meta property="og:title" content="For Labs — Free Lab Management Software | BetterHealth Africa" />
        <meta
          property="og:description"
          content="Register your lab on BetterHealth and get free lab management software (LIMS). Track samples, validate results, generate reports, and grow your lab — all at zero cost."
        />
      </Helmet>
      <Nav />
      <main>

      {/* Hero */}
      <section className="min-h-[48vh] flex items-center pt-[120px] pb-14 px-6 bg-base relative overflow-hidden">
        <GradientOrb color="green" size="560px" className="top-[-10%] right-[-8%]" />
        <GradientOrb color="blue" size="340px" className="bottom-[-10%] left-[-5%]" />
        <div className="max-w-[680px] mx-auto text-center relative z-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-primary-bg border border-primary/25 text-primary text-xs font-bold font-heading tracking-wider uppercase mb-6">
              <FlaskConical size={13} />
              For Lab Owners
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-[1.8rem] sm:text-[2.6rem] md:text-[3.2rem] font-extrabold font-heading leading-[1.15] text-text-primary mb-4">
              Run your lab smarter with{" "}
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent italic tracking-normal pb-2 inline-block">
                BetterHealth.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-text-secondary font-body max-w-[540px] mx-auto">
              Manage samples, track results, generate professional reports, and grow your client base — all with our free, cloud-based lab management software. No license fees, no limits, no catch.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6 bg-section-alt">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-[1.6rem] sm:text-[2rem] font-extrabold text-text-primary font-heading tracking-tight mb-3">
                Everything your lab needs — free
              </h2>
              <p className="text-[15px] text-text-secondary font-body max-w-[520px] mx-auto">
                BetterHealth LIMS gives you the tools that large labs pay thousands for, at absolutely no cost to you.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="bg-white/70 backdrop-blur-sm border border-border rounded-xl p-5 hover:border-primary/25 hover:shadow-sm transition-all h-full">
                    <div className="w-10 h-10 rounded-xl bg-primary-bg flex items-center justify-center mb-4">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <h3 className="text-[15px] font-bold text-text-primary font-heading mb-1.5">{b.title}</h3>
                    <p className="text-[13px] text-text-secondary leading-relaxed">{b.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20 px-6 bg-base">
        <div className="max-w-[760px] mx-auto">
          <Reveal>
            <h2 className="text-[1.8rem] font-extrabold text-text-primary font-heading tracking-tight mb-2">Register your lab</h2>
            <p className="text-[14px] text-text-muted mb-8">
              Fill in the details below and our lab partnerships team will be in touch within 24 hours to get you set up.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <RegistrationForm />
          </Reveal>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 lg:py-[100px] px-6 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
        <GradientOrb color="green" size="500px" className="top-[-20%] right-[-10%] opacity-30" />
        <div className="max-w-[560px] mx-auto text-center relative z-10">
          <Reveal>
            <h2 className="text-[1.7rem] sm:text-[2.2rem] md:text-[2.6rem] font-extrabold text-white font-heading tracking-tight mb-4">
              Your lab deserves better software.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[16px] text-white/80 font-body mb-8">
              Join the growing network of labs across Ghana using BetterHealth LIMS to deliver faster, more accurate results — completely free.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="#register"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#lab-name")?.closest("section")?.scrollIntoView({ behavior: "smooth" });
              }}
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
