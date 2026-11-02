import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2, MessageCircle } from "lucide-react";
import { submitLead, writeGuideUnlock } from "../../lib/leads";
import { trackLead } from "../../lib/analytics";
import PhoneField from "../ui/PhoneField";
import {
  composeE164,
  defaultPhoneValue,
  formatE164ForDisplay,
  validatePhone,
} from "../../lib/phone";

const WHATSAPP_NUMBER = "233268596410";

function whatsappFallbackUrl(title) {
  const text = `Hi, I used the ${title} and I'd like my result.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * The gate between a finished calculation and its result. Mirrors
 * components/guides/LeadForm.jsx: same fields, same phone rule, same
 * single-fire `trackLead`, same localStorage unlock key, and the same
 * WhatsApp fallback when the endpoint is unreachable. What differs is the
 * `source` (`tool:<slug>` rather than `guide:<slug>`) and the button label.
 *
 * @param {{ tool: object, healthInterest?: string, answers?: Record<string,string>, onUnlocked: (name: string) => void }} props
 */
export default function ToolLeadForm({ tool, healthInterest, answers, onUnlocked }) {
  const [form, setForm] = useState({ firstName: "", email: "", optIn: false });
  const [phone, setPhone] = useState(() => defaultPhoneValue());
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [fieldError, setFieldError] = useState("");
  const firedRef = useRef(false);

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;

    const firstName = form.firstName.trim();
    const check = validatePhone(phone);
    if (!check.ok) {
      setFieldError(check.message);
      return;
    }
    setFieldError("");
    const whatsapp = composeE164(phone);
    setStatus("loading");

    try {
      await submitLead({
        leadMagnet: tool.slug,
        fullName: firstName,
        whatsapp,
        email: form.email.trim().toLowerCase() || undefined,
        healthInterest,
        answers: { ...(answers || {}), optIn: form.optIn ? "yes" : "no" },
        source: `tool:${tool.slug}`,
      });
      if (!firedRef.current) {
        firedRef.current = true;
        trackLead({ source: `tool:${tool.slug}` });
      }
      writeGuideUnlock(tool.slug, firstName);
      setStatus("idle");
      onUnlocked(firstName);
    } catch {
      setStatus("error");
    }
  };

  const inputClass = `w-full rounded-btn px-4 py-3.5 text-[16px] transition-all focus:outline-none focus:ring-2 focus:ring-primary bg-section-alt border border-border text-text-primary placeholder:text-text-muted ${
    status === "loading" ? "opacity-60" : ""
  }`;
  const labelClass = "block text-[13px] font-semibold mb-1.5 text-text-primary";

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-card p-5 sm:p-7 bg-card border border-border shadow-sm"
        noValidate
      >
        <div>
          <label className={labelClass} htmlFor="tool-first-name">First name *</label>
          <input
            id="tool-first-name"
            type="text"
            name="firstName"
            autoComplete="given-name"
            required
            placeholder="Ama"
            value={form.firstName}
            onChange={update("firstName")}
            disabled={status === "loading"}
            className={inputClass}
          />
        </div>
        <PhoneField
          id="tool-whatsapp"
          label="WhatsApp number *"
          fieldClass="px-4 py-3.5 text-[16px]"
          value={phone}
          onChange={(next) => {
            setFieldError("");
            setPhone(next);
          }}
          error={fieldError}
          hint={composeE164(phone) ? `We'll save this as ${formatE164ForDisplay(phone)}` : undefined}
          disabled={status === "loading"}
          required
        />
        <div>
          <label className={labelClass} htmlFor="tool-email">
            Email <span className="font-normal text-text-muted">(optional)</span>
          </label>
          <input
            id="tool-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={update("email")}
            disabled={status === "loading"}
            className={inputClass}
          />
        </div>
        <label className="flex items-start gap-3 text-[14px] text-text-secondary leading-snug cursor-pointer">
          <input
            type="checkbox"
            name="optIn"
            checked={form.optIn}
            onChange={update("optIn")}
            disabled={status === "loading"}
            className="mt-0.5 w-5 h-5 shrink-0 accent-[#6B8E7F]"
          />
          <span>Send me occasional health education on WhatsApp (optional)</span>
        </label>

        <button
          type="submit"
          disabled={status === "loading"}
          className={`w-full rounded-btn px-8 py-4 text-[16px] font-bold font-heading transition-all cursor-pointer flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white hover:-translate-y-0.5 ${
            status === "loading" ? "opacity-80 cursor-not-allowed" : ""
          }`}
        >
          {status === "loading" ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Sending...
            </>
          ) : (
            <>
              Show me my result <ArrowRight size={18} />
            </>
          )}
        </button>

        <p className="text-[12px] text-text-muted leading-relaxed">
          We use your number to send the result, and nothing else unless you tick the box.{" "}
          <Link to="/privacy" className="text-primary font-semibold">Privacy policy</Link>
        </p>
      </form>

      {status === "error" && (
        <div
          role="alert"
          className="mt-3 rounded-card border border-border bg-card p-4 text-[14px] text-text-primary leading-relaxed"
        >
          <p className="font-semibold mb-1">We could not send that just now.</p>
          <p className="text-text-secondary mb-3">
            Please try again. If it keeps failing, message us on WhatsApp and we will send the result by hand.
          </p>
          <a
            href={whatsappFallbackUrl(tool.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-bold no-underline hover:text-primary-dark"
          >
            <MessageCircle size={16} /> Get it on WhatsApp instead
          </a>
        </div>
      )}
    </div>
  );
}
