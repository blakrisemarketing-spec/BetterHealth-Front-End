import { MapPin, Mail, Phone } from "lucide-react";
import logoFoundation from "../../assets/foundation/logo-foundation.png";

// Contact details mirror the main BetterHealth Africa site.
const EMAIL = "hello@betterhealth.africa";
const PHONE_DISPLAY = "+233 26 859 6410";
const PHONE_HREF = "+233268596410";
const WHATSAPP = "https://wa.me/message/MJ3HXLS2NDQEJ1";

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/betterhealth.africa",
    path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/betterhealth.africa",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.265.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.265.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.516 2.497 5.783 2.226 7.15 2.163 8.415 2.105 8.795 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038C23.986 15.668 24 15.259 24 12s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
  {
    label: "X",
    href: "https://www.x.com/BetterHealthAfrica",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@betterhealth.africa",
    path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z",
  },
];

export default function FoundationFooter({ onVolunteer, onPartner, onSupport }) {
  const linkClass =
    "text-[14px] text-text-secondary hover:text-accent-ink transition-colors font-inter no-underline bg-transparent border-none p-0 cursor-pointer text-left";

  return (
    <footer className="bg-base border-t border-border px-6 pt-16 pb-10">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logoFoundation} alt="BetterHealth Africa Foundation" className="h-9 w-auto object-contain" />
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent-ink font-heading border-l border-border pl-2.5">
                Foundation
              </span>
            </div>
            <p className="text-[14px] text-text-secondary leading-relaxed font-inter max-w-[300px]">
              We want everyday people, not only those who can afford it, to catch health problems early.
            </p>
            <p className="flex items-center gap-2 text-[13px] text-text-muted font-inter mt-4">
              <MapPin size={15} className="text-primary" /> Registered in Ghana. Accra, Ghana.
            </p>
            {/* Social — same channels as BetterHealth Africa */}
            <div className="flex gap-3 mt-5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-section-alt border border-border flex items-center justify-center text-text-secondary hover:text-accent-ink hover:border-accent/40 transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Get involved links */}
          <div>
            <h4 className="text-[13px] font-bold text-text-primary uppercase tracking-wider mb-4 font-heading">Get involved</h4>
            <div className="flex flex-col gap-2.5 items-start">
              <button type="button" onClick={onVolunteer} className={linkClass}>Volunteer</button>
              <button type="button" onClick={onPartner} className={linkClass}>Partner</button>
              <button type="button" onClick={onSupport} className={linkClass}>Donate</button>
              <a href={`mailto:${EMAIL}`} className={`${linkClass} no-underline`}>Get in touch</a>
            </div>
          </div>

          {/* Contact — same details as BetterHealth Africa */}
          <div>
            <h4 className="text-[13px] font-bold text-text-primary uppercase tracking-wider mb-4 font-heading">Contact</h4>
            <div className="flex flex-col gap-2.5 items-start">
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2.5 text-[14px] text-text-secondary hover:text-accent-ink transition-colors font-inter no-underline">
                <Mail size={16} className="text-primary shrink-0" /> {EMAIL}
              </a>
              <a href={`tel:${PHONE_HREF}`} className="flex items-center gap-2.5 text-[14px] text-text-secondary hover:text-accent-ink transition-colors font-inter no-underline">
                <Phone size={16} className="text-primary shrink-0" /> {PHONE_DISPLAY}
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-[14px] text-text-secondary hover:text-accent-ink transition-colors font-inter no-underline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-primary shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <p className="text-[13px] text-text-muted font-inter">
            &copy; 2026 100 Healthy Years Foundation, a BetterHealth Africa Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
