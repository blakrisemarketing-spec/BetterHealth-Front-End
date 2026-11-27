import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PhoneShot, BrowserShot } from "./AppShot";

// The hero of a partner page (/for-doctors, /for-nutritionists, /for-labs).
// Copy comes from the page; this only lays it out next to the app it describes.
//
//   badge    { icon, label }
//   title    { lead, highlight }
//   body     array of paragraphs (strings or nodes)
//   actions  array of { label, href | to, primary }
//   shots    array of { src, alt } or { placeholder } app screens, first = main
//   device   "phone" (the app) | "browser" (a staff dashboard; shots[0] only)
//
// A deep green stage with the app rising from its bottom edge (Damzi chose this
// over a photo-beside-app layout, 2026-11-26, and dropped the photo under it,
// 2026-11-27). Only the main screen loads with the page: the side phones are
// hidden below 640px and lazy, so a phone on 3G never fetches them.

function Actions({ actions }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
      {actions.map((a) => {
        const cls = a.primary
          ? "bg-white text-forest hover:bg-mint"
          : "border border-white/35 text-white hover:bg-white/10";
        const inner = (
          <>
            {a.label} {a.primary && <ArrowRight size={17} />}
          </>
        );
        const base = `inline-flex items-center gap-2 rounded-btn px-7 py-3.5 text-[15px] font-bold font-heading transition-all hover:-translate-y-0.5 no-underline ${cls}`;
        return a.to ? (
          <Link key={a.label} to={a.to} className={base}>{inner}</Link>
        ) : (
          <a key={a.label} href={a.href} className={base}>{inner}</a>
        );
      })}
    </div>
  );
}

function Badge({ badge }) {
  const Icon = badge.icon;
  return (
    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill text-[12px] font-bold font-heading tracking-wider uppercase bg-white/10 text-mint border border-white/20">
      <Icon size={14} />
      {badge.label}
    </span>
  );
}

export default function PartnerHero({ badge, title, body, actions, shots, device = "phone" }) {
  const [main, left, right] = shots;
  return (
    <>
      <section className="px-3 sm:px-4 pt-[84px]">
        <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[32px] bg-forest px-5 sm:px-10 pt-14 sm:pt-20">
          <div aria-hidden="true" className="absolute left-1/2 top-[55%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#2E7D62] opacity-60 blur-[90px]" />
          <div className="ph-rise relative mx-auto max-w-[760px] text-center">
            <Badge badge={badge} />
            <h1 className="mt-6 mb-5 text-[2.1rem] sm:text-[2.9rem] lg:text-[3.5rem] font-extrabold font-heading leading-[1.08] tracking-[-0.02em] text-white">
              {title.lead} <span className="text-[#A8D5BF]">{title.highlight}</span>
            </h1>
            {body.map((p, i) => (
              <p key={i} className="mx-auto mb-4 max-w-[580px] text-[17px] leading-relaxed text-white/80">
                {p}
              </p>
            ))}
            <div className="mt-8">
              <Actions actions={actions} />
            </div>
          </div>

          {device === "browser" ? (
            <div className="ph-rise-late relative mx-auto mt-12 sm:mt-16 h-[220px] sm:h-[400px] max-w-[880px] overflow-hidden">
              <BrowserShot {...main} eager className="rounded-b-none" />
            </div>
          ) : (
          <div className="relative mx-auto mt-12 sm:mt-16 flex h-[300px] sm:h-[400px] max-w-[760px] items-start justify-center">
            {left && (
              <PhoneShot
                {...left}
                width={200}
                className="absolute top-14 left-1/2 -translate-x-[125%] -rotate-[7deg] hidden sm:block"
              />
            )}
            {right && (
              <PhoneShot
                {...right}
                width={200}
                className="absolute top-14 left-1/2 translate-x-[25%] rotate-[7deg] hidden sm:block"
              />
            )}
            <PhoneShot {...main} eager width={240} className="ph-rise-late relative z-10" />
          </div>
          )}
        </div>
      </section>
    </>
  );
}
