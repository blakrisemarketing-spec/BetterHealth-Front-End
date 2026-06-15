import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, AlertCircle, HandHeart, Stethoscope, Building2 } from "lucide-react";
import { submitPartnerSignup } from "../../lib/partner-signup";

const FALLBACK_EMAIL = "hello@betterhealth.africa";

const inputClass =
  "w-full rounded-input px-4 py-3 text-[14px] font-inter bg-section-alt border border-border text-text-primary placeholder:text-text-muted transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent";
const labelClass = "block text-[13px] font-semibold text-text-primary mb-1.5 font-inter";

function SubmitButton({ status, children }) {
  return (
    <button
      type="submit"
      disabled={status === "loading"}
      className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark disabled:opacity-60 text-text-primary rounded-btn px-6 py-3.5 text-[15px] font-bold font-heading transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
    >
      {status === "loading" ? (
        <>
          <Loader2 size={17} className="animate-spin" /> Sending
        </>
      ) : (
        <>
          {children} <ArrowRight size={16} />
        </>
      )}
    </button>
  );
}

function SuccessNote({ children }) {
  return (
    <div className="flex items-start gap-3 rounded-card bg-primary-bg border border-primary/20 p-5">
      <CheckCircle2 size={22} className="text-primary shrink-0 mt-0.5" />
      <p className="text-[15px] font-medium leading-relaxed text-text-primary font-inter">{children}</p>
    </div>
  );
}

function ErrorNote() {
  return (
    <p className="flex items-start gap-2 text-[13px] text-danger font-inter">
      <AlertCircle size={16} className="shrink-0 mt-0.5" />
      <span>
        Sorry, something went wrong sending that. Please try again, or email us directly at{" "}
        <a href={`mailto:${FALLBACK_EMAIL}`} className="font-semibold underline">{FALLBACK_EMAIL}</a>.
      </span>
    </p>
  );
}

export function VolunteerForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", profession: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    const res = await submitPartnerSignup({
      partnerType: "foundation_volunteer",
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      profession: form.profession.trim(),
      notes: form.message.trim(),
    });
    setStatus(res.ok ? "success" : "error");
  };

  if (status === "success") {
    return (
      <SuccessNote>
        Thank you for stepping up. We have your details and someone from our team will reach out
        about the next screening day.
      </SuccessNote>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <p className="text-[14px] text-text-secondary leading-relaxed font-inter -mt-1">
        Doctors, nurses, and health workers welcome. Tell us a little about you.
      </p>
      <div>
        <label htmlFor="vol-name" className={labelClass}>Full name</label>
        <input id="vol-name" type="text" required value={form.name} onChange={update("name")} className={inputClass} placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="vol-email" className={labelClass}>Email</label>
        <input id="vol-email" type="email" required value={form.email} onChange={update("email")} className={inputClass} placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="vol-phone" className={labelClass}>Phone number</label>
        <input id="vol-phone" type="tel" required value={form.phone} onChange={update("phone")} className={inputClass} placeholder="+233 20 000 0000" />
      </div>
      <div>
        <label htmlFor="vol-profession" className={labelClass}>Profession</label>
        <input id="vol-profession" type="text" required value={form.profession} onChange={update("profession")} className={inputClass} placeholder="Doctor, nurse, health worker" />
      </div>
      <div>
        <label htmlFor="vol-message" className={labelClass}>Anything you want us to know <span className="font-normal text-text-muted">(optional)</span></label>
        <textarea id="vol-message" rows={3} value={form.message} onChange={update("message")} className={`${inputClass} resize-none`} placeholder="Your city, availability, or how you would like to help" />
      </div>
      {status === "error" && <ErrorNote />}
      <SubmitButton status={status}>Volunteer with us</SubmitButton>
    </form>
  );
}

export function PartnerForm() {
  const [form, setForm] = useState({ name: "", email: "", organisation: "", message: "" });
  const [status, setStatus] = useState("idle");
  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    const res = await submitPartnerSignup({
      partnerType: "foundation_partner",
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      organisation: form.organisation.trim(),
      notes: form.message.trim(),
    });
    setStatus(res.ok ? "success" : "error");
  };

  if (status === "success") {
    return (
      <SuccessNote>
        Thank you for reaching out. We will be in touch to explore how we can work together and
        reach more communities.
      </SuccessNote>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <p className="text-[14px] text-text-secondary leading-relaxed font-inter -mt-1">
        Foundations, companies, and institutions. Let us tell you what prevention can do at scale.
      </p>
      <div>
        <label htmlFor="par-name" className={labelClass}>Your name</label>
        <input id="par-name" type="text" required value={form.name} onChange={update("name")} className={inputClass} placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="par-email" className={labelClass}>Email</label>
        <input id="par-email" type="email" required value={form.email} onChange={update("email")} className={inputClass} placeholder="you@organisation.com" />
      </div>
      <div>
        <label htmlFor="par-org" className={labelClass}>Organisation</label>
        <input id="par-org" type="text" required value={form.organisation} onChange={update("organisation")} className={inputClass} placeholder="Your organisation" />
      </div>
      <div>
        <label htmlFor="par-message" className={labelClass}>How would you like to help?</label>
        <textarea id="par-message" rows={3} value={form.message} onChange={update("message")} className={`${inputClass} resize-none`} placeholder="Tell us what you have in mind" />
      </div>
      {status === "error" && <ErrorNote />}
      <SubmitButton status={status}>Partner with us</SubmitButton>
    </form>
  );
}

const COMMUNITY_TYPES = ["Church", "School", "Workplace", "Community or neighbourhood", "Other"];

export function ScreeningRequestForm() {
  const [form, setForm] = useState({
    name: "", group: "", type: "", location: "", email: "", phone: "", people: "", message: "",
  });
  const [status, setStatus] = useState("idle");
  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    const res = await submitPartnerSignup({
      partnerType: "foundation_screening_request",
      name: form.name.trim(),
      group: form.group.trim(),
      communityType: form.type,
      location: form.location.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      estimatedPeople: form.people.trim(),
      notes: form.message.trim(),
    });
    setStatus(res.ok ? "success" : "error");
  };

  if (status === "success") {
    return (
      <SuccessNote>
        Thank you. We have your request and our team will be in touch to plan a free screening for
        your community.
      </SuccessNote>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <p className="text-[14px] text-text-secondary leading-relaxed font-inter -mt-1">
        Churches, schools, workplaces, and neighbourhoods all welcome. Tell us about your community
        and we will plan a free screening with you.
      </p>
      <div>
        <label htmlFor="req-name" className={labelClass}>Your name</label>
        <input id="req-name" type="text" required value={form.name} onChange={update("name")} className={inputClass} placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="req-group" className={labelClass}>Church, school, or group name</label>
        <input id="req-group" type="text" required value={form.group} onChange={update("group")} className={inputClass} placeholder="The community you represent" />
      </div>
      <div>
        <label htmlFor="req-type" className={labelClass}>Type of community</label>
        <select id="req-type" required value={form.type} onChange={update("type")} className={inputClass}>
          <option value="" disabled>Select one</option>
          {COMMUNITY_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="req-location" className={labelClass}>Town or area</label>
        <input id="req-location" type="text" required value={form.location} onChange={update("location")} className={inputClass} placeholder="Where you are based" />
      </div>
      <div>
        <label htmlFor="req-email" className={labelClass}>Email</label>
        <input id="req-email" type="email" required value={form.email} onChange={update("email")} className={inputClass} placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="req-phone" className={labelClass}>Phone number</label>
        <input id="req-phone" type="tel" required value={form.phone} onChange={update("phone")} className={inputClass} placeholder="+233 20 000 0000" />
      </div>
      <div>
        <label htmlFor="req-people" className={labelClass}>Roughly how many people? <span className="font-normal text-text-muted">(optional)</span></label>
        <input id="req-people" type="text" value={form.people} onChange={update("people")} className={inputClass} placeholder="e.g. 150" />
      </div>
      <div>
        <label htmlFor="req-message" className={labelClass}>Anything else? <span className="font-normal text-text-muted">(optional)</span></label>
        <textarea id="req-message" rows={3} value={form.message} onChange={update("message")} className={`${inputClass} resize-none`} placeholder="Dates you have in mind, the people you serve, anything that helps us plan" />
      </div>
      {status === "error" && <ErrorNote />}
      <SubmitButton status={status}>Request a screening</SubmitButton>
    </form>
  );
}

export function ScreeningPartnerForm() {
  const [form, setForm] = useState({
    name: "", organisation: "", date: "", location: "", email: "", phone: "", people: "", message: "",
  });
  const [status, setStatus] = useState("idle");
  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    const res = await submitPartnerSignup({
      partnerType: "foundation_screening_partner",
      name: form.name.trim(),
      organisation: form.organisation.trim(),
      screeningDate: form.date,
      location: form.location.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      expectedPeople: form.people.trim(),
      notes: form.message.trim(),
    });
    setStatus(res.ok ? "success" : "error");
  };

  if (status === "success") {
    return (
      <SuccessNote>
        Thank you. We will reach out to set up our platform for your screening, so everyone you screen
        gets their results and a clear next step.
      </SuccessNote>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <p className="text-[14px] text-text-secondary leading-relaxed font-inter -mt-1">
        Already planning a screening? Tell us about it and we will bring our platform so everyone you
        screen gets clear results and a path to follow-up.
      </p>
      <div>
        <label htmlFor="sp-name" className={labelClass}>Your name</label>
        <input id="sp-name" type="text" required value={form.name} onChange={update("name")} className={inputClass} placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="sp-org" className={labelClass}>Organisation</label>
        <input id="sp-org" type="text" required value={form.organisation} onChange={update("organisation")} className={inputClass} placeholder="Who is running the screening" />
      </div>
      <div>
        <label htmlFor="sp-date" className={labelClass}>When is the screening?</label>
        <input id="sp-date" type="date" required value={form.date} onChange={update("date")} className={inputClass} />
      </div>
      <div>
        <label htmlFor="sp-location" className={labelClass}>Location</label>
        <input id="sp-location" type="text" required value={form.location} onChange={update("location")} className={inputClass} placeholder="Town or area" />
      </div>
      <div>
        <label htmlFor="sp-email" className={labelClass}>Email</label>
        <input id="sp-email" type="email" required value={form.email} onChange={update("email")} className={inputClass} placeholder="you@organisation.com" />
      </div>
      <div>
        <label htmlFor="sp-phone" className={labelClass}>Phone number</label>
        <input id="sp-phone" type="tel" required value={form.phone} onChange={update("phone")} className={inputClass} placeholder="+233 20 000 0000" />
      </div>
      <div>
        <label htmlFor="sp-people" className={labelClass}>Expected number of people <span className="font-normal text-text-muted">(optional)</span></label>
        <input id="sp-people" type="text" value={form.people} onChange={update("people")} className={inputClass} placeholder="e.g. 300" />
      </div>
      <div>
        <label htmlFor="sp-message" className={labelClass}>Anything else? <span className="font-normal text-text-muted">(optional)</span></label>
        <textarea id="sp-message" rows={3} value={form.message} onChange={update("message")} className={`${inputClass} resize-none`} placeholder="Tell us about your screening and what you need" />
      </div>
      {status === "error" && <ErrorNote />}
      <SubmitButton status={status}>Partner on a screening</SubmitButton>
    </form>
  );
}

export function NewsletterForm({ variant = "light" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const isDark = variant === "dark";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    const res = await submitPartnerSignup({
      partnerType: "foundation_newsletter",
      email: email.trim().toLowerCase(),
    });
    setStatus(res.ok ? "success" : "error");
  };

  if (status === "success") {
    return (
      <p className={`flex items-center gap-2 text-[15px] font-medium font-inter ${isDark ? "text-white" : "text-text-primary"}`}>
        <CheckCircle2 size={20} className="text-primary shrink-0" />
        You are on the list. We will let you know where we are screening next.
      </p>
    );
  }

  return (
    <div className="w-full max-w-[520px]">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" noValidate>
        <label htmlFor="news-email" className="sr-only">Email address</label>
        <input
          id="news-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={`flex-1 rounded-input px-4 py-3.5 text-[14px] font-inter transition-all focus:outline-none focus:ring-2 focus:ring-accent ${
            isDark
              ? "bg-white/10 border border-white/20 text-white placeholder:text-white/50"
              : "bg-white border border-border text-text-primary placeholder:text-text-muted"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark disabled:opacity-60 text-text-primary rounded-btn px-6 py-3.5 text-[15px] font-bold font-heading transition-all hover:-translate-y-0.5 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        >
          {status === "loading" ? <Loader2 size={17} className="animate-spin" /> : "Keep me posted"}
        </button>
      </form>
      {status === "error" && (
        <p className={`flex items-center justify-center gap-2 text-[13px] mt-3 font-inter ${isDark ? "text-white/90" : "text-danger"}`}>
          <AlertCircle size={15} className="shrink-0" />
          Something went wrong. Please try again, or email {FALLBACK_EMAIL}.
        </p>
      )}
    </div>
  );
}

/** Contents of the Support modal. Donation provider is not wired yet. */
export function SupportContent({ onVolunteer, onPartner }) {
  const [noted, setNoted] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <p className="text-[15px] text-text-secondary leading-relaxed font-inter">
        Every contribution puts another screening day in another community. Online giving is opening
        soon. In the meantime, here is how you can help right now.
      </p>

      <button
        type="button"
        onClick={() => setNoted(true)}
        className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-text-primary rounded-btn px-6 py-3.5 text-[15px] font-bold font-heading transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        <HandHeart size={18} /> Donate
      </button>
      {/* TODO: connect donation provider (Paystack, already used by BetterHealth). */}
      {noted && (
        <p className="flex items-start gap-2 text-[14px] text-text-secondary font-inter">
          <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
          Online donations open soon. To give now or set up a partnership, please get in touch and we
          will make it simple.
        </p>
      )}

      <div className="border-t border-border pt-5 flex flex-col gap-3">
        <p className="text-[13px] font-semibold text-text-primary font-inter">Other ways to help</p>
        <button
          type="button"
          onClick={onVolunteer}
          className="flex items-center gap-3 text-left rounded-card border border-border hover:border-accent/40 hover:bg-section-alt px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <span className="w-9 h-9 rounded-card bg-accent-bg flex items-center justify-center shrink-0">
            <Stethoscope size={18} className="text-accent-ink" />
          </span>
          <span className="text-[14px] font-medium text-text-primary font-inter">Volunteer at a screening</span>
        </button>
        <button
          type="button"
          onClick={onPartner}
          className="flex items-center gap-3 text-left rounded-card border border-border hover:border-accent/40 hover:bg-section-alt px-4 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <span className="w-9 h-9 rounded-card bg-accent-bg flex items-center justify-center shrink-0">
            <Building2 size={18} className="text-accent-ink" />
          </span>
          <span className="text-[14px] font-medium text-text-primary font-inter">Partner with us</span>
        </button>
      </div>
    </div>
  );
}
