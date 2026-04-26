import { ShieldCheck } from "lucide-react";

export default function GDPCBadge({ variant = "inline", className = "" }) {
  if (variant === "banner") {
    return (
      <div className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-center sm:text-left ${className}`}>
        <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
          <ShieldCheck size={22} className="text-primary-light" />
        </div>
        <div>
          <p className="text-[17px] sm:text-[19px] font-bold text-text-on-dark font-heading leading-snug mb-1">
            Your health data is protected by Ghana&apos;s Data Protection Commission
          </p>
          <p className="text-[13px] sm:text-[14px] text-text-muted-dark leading-relaxed font-body">
            BetterHealth Africa is certified under the Data Protection Act, 2012 (Act 843). Your results are encrypted, never sold, and only accessible to you.
          </p>
        </div>
      </div>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-pill border border-primary/25 bg-primary-bg text-primary text-xs font-semibold font-heading tracking-wide ${className}`}>
      <ShieldCheck size={14} />
      GDPC Certified
    </span>
  );
}
