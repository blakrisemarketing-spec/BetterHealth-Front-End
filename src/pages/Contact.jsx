import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Mail, Phone, Camera, ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";
import GradientOrb from "../components/ui/GradientOrb";

const CHANNELS = [
  {
    icon: MessageCircle,
    label: "WhatsApp — Fastest Response",
    body: "Send us a message on WhatsApp for the fastest response. Our team typically replies within 1–2 hours during business hours. Available for general enquiries, account help, and booking support.",
    details: [
      { key: "Number", val: "+233 268 596 410" },
      { key: "Hours", val: "Mon–Sat, 7:00 AM – 8:00 PM GMT" },
      { key: "Avg. response", val: "Under 2 hours" },
    ],
    cta: "Chat on WhatsApp",
    href: "https://wa.me/message/MJ3HXLS2NDQEJ1",
    primary: true,
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Mail,
    label: "Email",
    body: "For detailed enquiries, partnership requests, media enquiries, or anything that needs a thorough response.",
    details: [
      { key: "General", val: "hello@betterhealth.africa" },
      { key: "Support", val: "support@betterhealth.africa" },
      { key: "Partnerships", val: "partners@betterhealth.africa" },
      { key: "Media", val: "press@betterhealth.africa" },
      { key: "Privacy", val: "privacy@betterhealth.africa" },
    ],
    cta: "Send an Email",
    href: "mailto:hello@betterhealth.africa",
    primary: false,
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: Phone,
    label: "Phone",
    body: "Prefer to speak to someone? Call us during business hours. If we cannot answer immediately, we will call you back within 4 hours.",
    details: [
      { key: "Number", val: "+233 268 596 410" },
      { key: "Hours", val: "Mon–Fri, 8:00 AM – 6:00 PM GMT" },
    ],
    cta: "Call Us",
    href: "tel:+233268596410",
    primary: false,
    color: "from-violet-400 to-purple-500",
  },
  {
    icon: Camera,
    label: "Follow Us",
    body: "Health tips, product updates, and community stories. DMs are open on all platforms.",
    details: [
      { key: "Facebook", val: "@betterhealth.africa" },
      { key: "Instagram", val: "@betterhealth.africa" },
      { key: "Twitter / X", val: "@BetterHealth Africa" },
      { key: "LinkedIn", val: "BetterHealth Africa" },
      { key: "TikTok", val: "@betterhealth.africa" },
    ],
    cta: null,
    href: null,
    primary: false,
    color: "from-pink-400 to-rose-500",
  },
];

const SUBJECT_OPTIONS = [
  "General enquiry",
  "I need help with my account",
  "I have a question about my results",
  "I am interested in subscribing",
  "I would like to book a collection",
  "Partnership or business enquiry",
  "Media or press enquiry",
  "Feedback or suggestion",
  "I would like to report an issue",
  "Other",
];

const ENQUIRY_TYPES = [
  {
    title: "Corporate & Group Screening",
    body: "Interested in BetterHealth for your team or organisation? We offer custom corporate screening packages for groups of 10+.",
    email: "partners@betterhealth.africa",
  },
  {
    title: "Healthcare Providers & Clinics",
    body: "Are you a doctor, clinic, or hospital interested in partnering with BetterHealth? We would love to explore how we can work together.",
    email: "partners@betterhealth.africa",
  },
  {
    title: "Media & Press",
    body: "For media enquiries, interview requests, or press-related questions.",
    email: "press@betterhealth.africa",
  },
  {
    title: "Data Privacy & Account Deletion",
    body: "For privacy-related requests including data export or account deletion. Response within 30 days per our privacy policy.",
    email: "privacy@betterhealth.africa",
  },
];

const RESPONSE_TIMES = [
  { channel: "WhatsApp", time: "Within 2 hours (business hours)" },
  { channel: "Email", time: "Within 24 hours" },
  { channel: "Phone", time: "Immediate or callback within 4 hours" },
  { channel: "Contact form", time: "Within 24 hours" },
  { channel: "Social media DMs", time: "Within 24 hours" },
];

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Hi BetterHealth Africa! 👋\n\nName: ${form.name}\nEmail: ${form.email}${form.phone ? `\nPhone: ${form.phone}` : ""}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/message/MJ3HXLS2NDQEJ1?text=${encoded}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-card p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={24} className="text-green-600" />
        </div>
        <h3 className="text-[18px] font-bold text-text-primary font-heading mb-2">Message sent!</h3>
        <p className="text-[14px] text-text-secondary leading-relaxed">
          Thanks for reaching out! We have received your message and will get back to you within 24 hours.
          If your matter is urgent, WhatsApp us at{" "}
          <a href="https://wa.me/233303960000" rel="noopener noreferrer" className="text-primary font-semibold underline-offset-2 hover:underline no-underline">
            +233 30 396 0000
          </a>{" "}
          for the fastest response.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-border rounded-card p-4 sm:p-8 shadow-sm flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[13px] font-semibold text-text-primary mb-1.5">Full Name *</label>
          <input
            required
            type="text"
            placeholder="Your full name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full border border-border rounded-btn px-4 py-3 text-[14px] text-text-primary bg-section-alt focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
          />
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-text-primary mb-1.5">Email *</label>
          <input
            required
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full border border-border rounded-btn px-4 py-3 text-[14px] text-text-primary bg-section-alt focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
          />
        </div>
      </div>
      <div>
        <label className="block text-[13px] font-semibold text-text-primary mb-1.5">Phone <span className="text-text-muted font-normal">(optional)</span></label>
        <input
          type="tel"
          placeholder="+233 30 396 0000"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          className="w-full border border-border rounded-btn px-4 py-3 text-[14px] text-text-primary bg-section-alt focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
        />
      </div>
      <div>
        <label className="block text-[13px] font-semibold text-text-primary mb-1.5">Subject *</label>
        <select
          required
          value={form.subject}
          onChange={e => setForm({ ...form, subject: e.target.value })}
          className="w-full border border-border rounded-btn px-4 py-3 text-[14px] text-text-primary bg-section-alt focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all appearance-none"
        >
          <option value="">Select a topic</option>
          {SUBJECT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-[13px] font-semibold text-text-primary mb-1.5">Message *</label>
        <textarea
          required
          rows={5}
          placeholder="Tell us how we can help..."
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          className="w-full border border-border rounded-btn px-4 py-3 text-[14px] text-text-primary bg-section-alt focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all resize-none"
        />
      </div>
      <button
        type="submit"
        className="self-start inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-7 py-3.5 text-sm font-bold font-heading transition-all hover:-translate-y-0.5"
      >
        Send Message <ArrowRight size={15} />
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div className="bg-base min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Contact Us — BetterHealth Africa</title>
        <meta name="description" content="Get in touch with BetterHealth Africa via WhatsApp, email, or phone. We respond to most enquiries within 24 hours." />
      </Helmet>
      <Nav />

      {/* Hero */}
      <section className="min-h-[48vh] flex items-center pt-[120px] pb-14 px-6 bg-base relative overflow-hidden">
        <GradientOrb color="green" size="560px" className="top-[-10%] right-[-8%]" />
        <GradientOrb color="blue" size="340px" className="bottom-[-10%] left-[-5%]" />
        <div className="max-w-[680px] mx-auto text-center relative z-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-primary-bg border border-primary/25 text-primary text-xs font-bold font-heading tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
              Get in Touch
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-[1.8rem] sm:text-[2.6rem] md:text-[3.2rem] font-extrabold font-heading leading-[1.15] text-text-primary mb-4">
              We are here when{" "}
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent italic tracking-normal pb-2 inline-block">
                you need us.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-text-secondary font-body max-w-[540px] mx-auto">
              Whether you have a question about your results, need help with your account, or just want to learn more about BetterHealth — we would love to hear from you. Most enquiries are answered within 24 hours.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Channel Cards */}
      <section className="py-16 px-6 bg-section-alt">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CHANNELS.map((ch, i) => {
              const Icon = ch.icon;
              return (
                <Reveal key={i} delay={i * 0.07}>
                  <div className={`relative flex flex-col bg-white border rounded-card p-4 sm:p-6 h-full transition-all duration-300 hover:-translate-y-1 ${ch.primary ? "border-primary shadow-[0_0_0_2px_#0D9488,0_8px_24px_rgba(13,148,136,0.12)]" : "border-border hover:shadow-card hover:border-primary/20"}`}>
                    {ch.primary && (
                      <span className="absolute -top-3 left-5 bg-primary text-white text-[10px] font-extrabold tracking-[0.12em] px-3 py-0.5 rounded-pill font-heading">
                        FASTEST
                      </span>
                    )}
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ch.color} flex items-center justify-center mb-4`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <h3 className="text-[15px] font-bold text-text-primary font-heading mb-2">{ch.label}</h3>
                    <p className="text-[13px] text-text-secondary leading-relaxed mb-4 flex-1">{ch.body}</p>
                    <div className="flex flex-col gap-1.5 mb-4">
                      {ch.details.map((d, di) => (
                        <div key={di} className="flex gap-1.5 text-[12px]">
                          <span className="text-text-muted shrink-0">{d.key}:</span>
                          <span className="text-text-secondary font-medium">{d.val}</span>
                        </div>
                      ))}
                    </div>
                    {ch.cta && ch.href && (
                      <a
                        href={ch.href}
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 text-[13px] font-bold rounded-btn px-4 py-3 min-h-[44px] transition-all hover:-translate-y-0.5 no-underline justify-center ${ch.primary ? "bg-primary hover:bg-primary-dark text-white" : "bg-section-alt hover:bg-primary-bg text-primary border border-border hover:border-primary/30"}`}
                      >
                        {ch.cta} <ArrowRight size={13} />
                      </a>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6 bg-base">
        <div className="max-w-[760px] mx-auto">
          <Reveal>
            <h2 className="text-[1.8rem] font-extrabold text-text-primary font-heading tracking-tight mb-2">Send us a message</h2>
            <p className="text-[14px] text-text-muted mb-8">Prefer a form? We will get back to you within 24 hours.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Specific Enquiry Types */}
      <section className="py-16 px-6 bg-section-alt">
        <div className="max-w-[1000px] mx-auto">
          <Reveal>
            <h2 className="text-[1.6rem] font-extrabold text-text-primary font-heading mb-6">Specific enquiries</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ENQUIRY_TYPES.map((e, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="bg-white/70 backdrop-blur-sm border border-border rounded-xl p-5 hover:border-primary/25 hover:shadow-sm transition-all">
                  <h3 className="text-[15px] font-bold text-text-primary font-heading mb-1.5">{e.title}</h3>
                  <p className="text-[13px] text-text-secondary leading-relaxed mb-2">{e.body}</p>
                  <a href={`mailto:${e.email}`} className="text-[13px] text-primary font-semibold hover:underline underline-offset-2 no-underline">
                    {e.email}
                  </a>
                </div>
              </Reveal>
            ))}
            {/* Careers card */}
            <Reveal delay={0.24}>
              <div className="bg-white/70 backdrop-blur-sm border border-border rounded-xl p-5 hover:border-primary/25 hover:shadow-sm transition-all">
                <h3 className="text-[15px] font-bold text-text-primary font-heading mb-1.5">Careers</h3>
                <p className="text-[13px] text-text-secondary leading-relaxed mb-2">
                  Want to join the team building the future of African healthcare?
                </p>
                <div className="flex flex-col gap-1">
                  <Link to="/careers" className="text-[13px] text-primary font-semibold hover:underline underline-offset-2 no-underline">
                    See open positions →
                  </Link>
                  <a href="mailto:careers@betterhealth.africa" className="text-[13px] text-text-muted hover:text-primary transition-colors no-underline">
                    careers@betterhealth.africa
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Response time table */}
      <section className="py-16 px-6 bg-base">
        <div className="max-w-[700px] mx-auto">
          <Reveal>
            <div className="flex items-center gap-2 mb-5">
              <Clock size={18} className="text-primary" />
              <h2 className="text-[17px] font-bold text-text-primary font-heading">Response Time Commitments</h2>
            </div>
            <div className="rounded-card border border-border overflow-hidden">
              {RESPONSE_TIMES.map((r, i) => (
                <div key={i} className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 px-4 sm:px-5 py-3 sm:py-3.5 text-[14px] border-b border-border/50 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-section-alt/60"}`}>
                  <span className="font-semibold text-text-primary">{r.channel}</span>
                  <span className="text-text-secondary text-[13px] sm:text-[14px]">{r.time}</span>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-text-muted mt-3 leading-relaxed">
              We read every message. If something is urgent — especially if it relates to a critical health result — please WhatsApp or call us directly rather than using email or the contact form.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Digital-first note */}
      <Reveal>
        <section className="py-10 px-6 bg-section-alt border-y border-border">
          <div className="max-w-[700px] mx-auto text-center">
            <p className="text-[14px] text-text-secondary leading-relaxed">
              <span className="font-semibold text-text-primary">BetterHealth Africa is a digital-first company.</span> We do not have a walk-in office, but our team is available via WhatsApp, email, and phone throughout business hours.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Bottom CTA */}
      <section className="py-20 lg:py-[100px] px-6 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
        <GradientOrb color="green" size="500px" className="top-[-20%] right-[-10%] opacity-30" />
        <div className="max-w-[560px] mx-auto text-center relative z-10">
          <Reveal>
            <h2 className="text-[1.7rem] sm:text-[2.2rem] md:text-[2.6rem] font-extrabold text-white font-heading tracking-tight mb-4">
              Ready to take the first step?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[16px] text-white/80 font-body mb-8">
              You do not need to contact us to get started. Sign up, choose your plan, and book your collection — all in under 3 minutes.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="https://app.betterhealth.africa/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-primary rounded-btn px-8 py-4 text-base font-bold font-heading transition-all hover:-translate-y-0.5 hover:shadow-lg no-underline"
            >
              Start Your Health Check <ArrowRight size={18} />
            </a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
