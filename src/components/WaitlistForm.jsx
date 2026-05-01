import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { waitlist } from "../data/content";
import { useWaitlist } from "../context/WaitlistContext";

const HEALTH_INTERESTS = [
  "Diabetes & Blood Sugar",
  "Heart Health & Cholesterol",
  "Kidney Function",
  "Liver Health",
  "Hormones & Fertility",
  "Thyroid",
  "Vitamins & Nutrients",
  "General Full Body Check",
];

export default function WaitlistForm({ variant = "light", source = "hero", className = "" }) {
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", healthInterest: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | duplicate | error
  const { submitted, markSubmitted } = useWaitlist();

  const apiUrl = import.meta.env.VITE_WAITLIST_API_URL;

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          whatsapp: form.whatsapp.trim(),
          healthInterest: form.healthInterest,
          source,
        }),
      });

      const data = await res.json();

      if (data.result === "duplicate") {
        setStatus("duplicate");
        markSubmitted();
      } else if (data.result === "success") {
        setStatus("success");
        markSubmitted();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const isDark = variant === "dark";

  const inputClass = `w-full rounded-btn px-4 py-3.5 text-[14px] transition-all focus:outline-none focus:ring-2 focus:ring-teal-600 ${
    isDark
      ? "bg-white/10 border border-white/20 text-white placeholder:text-white/50"
      : "bg-section-alt border border-border text-text-primary placeholder:text-text-muted"
  } ${status === "loading" ? "opacity-60" : ""}`;

  const labelClass = `block text-[13px] font-semibold mb-1.5 ${isDark ? "text-white/80" : "text-text-primary"}`;

  if (status === "success" || status === "duplicate" || submitted) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isDark ? "bg-white/10" : "bg-green-100"}`}>
          <CheckCircle2 size={22} className={isDark ? "text-primary-light" : "text-green-600"} />
        </div>
        <p className={`text-[15px] font-medium leading-snug ${isDark ? "text-white" : "text-text-primary"}`}>
          {status === "success" ? waitlist.successMessage : waitlist.duplicateMessage}
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-4 rounded-card p-5 sm:p-7 ${
          isDark
            ? "bg-white/5 border border-white/10"
            : "bg-white border border-border shadow-sm"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Full Name *</label>
            <input
              type="text"
              required
              placeholder="Your full name"
              value={form.name}
              onChange={update("name")}
              disabled={status === "loading"}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email *</label>
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={form.email}
              onChange={update("email")}
              disabled={status === "loading"}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>WhatsApp Number *</label>
            <input
              type="tel"
              inputMode="tel"
              required
              placeholder="+233 XX XXX XXXX"
              value={form.whatsapp}
              onChange={update("whatsapp")}
              disabled={status === "loading"}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Health Interest *</label>
            <select
              required
              value={form.healthInterest}
              onChange={update("healthInterest")}
              disabled={status === "loading"}
              className={`${inputClass} appearance-none`}
            >
              <option value="">Select a health area</option>
              {HEALTH_INTERESTS.map((interest) => (
                <option key={interest} value={interest}>{interest}</option>
              ))}
            </select>
          </div>
        </div>

        <p className={`text-[14px] font-medium ${isDark ? "text-white/70" : "text-text-secondary"}`}>
          Join 200+ Ghanaians on the waitlist
        </p>

        <p className={`text-[13px] ${isDark ? "text-white/50" : "text-text-muted"}`}>
          {waitlist.privacyNote}
        </p>

        <button
          type="submit"
          disabled={status === "loading"}
          className={`w-full sm:w-auto self-start rounded-btn px-8 py-4 text-[15px] font-bold font-heading transition-all cursor-pointer flex items-center justify-center gap-2 ${
            isDark
              ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-[0_4px_30px_rgba(13,148,136,0.35)] hover:shadow-[0_8px_40px_rgba(13,148,136,0.5)] hover:-translate-y-1 hover:scale-[1.02]"
              : "bg-primary hover:bg-primary-dark text-white hover:-translate-y-0.5 hover:shadow-glow-green"
          } ${status === "loading" ? "opacity-80 cursor-not-allowed" : ""}`}
        >
          {status === "loading" ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Joining...
            </>
          ) : (
            <>
              {waitlist.buttonText} <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      {status === "error" && (
        <p className={`mt-2 text-sm ${isDark ? "text-red-300" : "text-red-500"}`}>
          {waitlist.errorMessage}
        </p>
      )}

    </div>
  );
}
