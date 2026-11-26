// A real screen of the BetterHealth app (phone) or of a staff dashboard
// (browser), framed in plain CSS so it costs no script and no extra image.
// `placeholder` stands in for a screen that is not built yet: a labelled
// panel the same size, so the layout does not move when the shot arrives.

export function PhoneShot({ src, alt, width = 260, eager = false, placeholder, className = "", style }) {
  return (
    <div
      className={`shrink-0 rounded-[2.4rem] bg-ink p-[7px] shadow-[0_30px_60px_-20px_rgba(30,42,39,0.45),0_12px_24px_-12px_rgba(30,42,39,0.3)] ${className}`}
      style={{ width, ...style }}
    >
      <div className="relative overflow-hidden rounded-[2rem] bg-cream" style={{ aspectRatio: "390 / 844" }}>
        {placeholder ? (
          <Placeholder label={placeholder} />
        ) : (
          <img
            src={src}
            alt={alt}
            width="390"
            height="844"
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : undefined}
            decoding="async"
            draggable="false"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        )}
      </div>
    </div>
  );
}

export function BrowserShot({ src, alt, eager = false, placeholder, ratio = "16 / 10", className = "" }) {
  return (
    <div className={`overflow-hidden rounded-[18px] border border-border bg-white shadow-[0_30px_60px_-24px_rgba(30,42,39,0.35)] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-border bg-section-alt px-4 py-2.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E8E8E6]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E8E8E6]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E8E8E6]" />
        <span className="ml-3 h-5 flex-1 max-w-[240px] rounded-full bg-white border border-border" />
      </div>
      <div className="relative bg-cream" style={{ aspectRatio: ratio }}>
        {placeholder ? (
          <Placeholder label={placeholder} />
        ) : (
          <img
            src={src}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            draggable="false"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        )}
      </div>
    </div>
  );
}

// The part of a screen a card is about, cropped, on a soft panel. Below the
// hero, so it loads lazily. `ratio` is the crop's shape; `position` picks the
// part of a taller screen to show.
export function CropShot({ src, alt, placeholder, ratio = "1 / 1", position = "top", className = "" }) {
  return (
    <div className={`rounded-[18px] bg-gradient-to-br from-mint to-cream p-3 sm:p-4 ${className}`}>
      <div
        className="relative overflow-hidden rounded-[12px] border border-black/5 bg-cream shadow-[0_12px_28px_-16px_rgba(30,42,39,0.35)]"
        style={{ aspectRatio: ratio }}
      >
        {placeholder ? (
          <Placeholder label={placeholder} />
        ) : (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            draggable="false"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: position }}
          />
        )}
      </div>
    </div>
  );
}

function Placeholder({ label }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-mint p-6 text-center">
      <span className="text-[13px] font-semibold text-forest">{label}</span>
    </div>
  );
}
