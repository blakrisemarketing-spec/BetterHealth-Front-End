import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { footerColumns } from "../data/content";
import logo from "../assets/logo.png";

// Map footer link labels to internal routes
const ROUTE_MAP = {
  "How It Works": "/how-it-works",
  "What We Test": "/what-we-test",
  "Pricing": "/pricing",
  "About Us": "/about",
  "Stories": "/stories",
  "Blog": "/blog",
  "Careers": "/careers",
  "FAQ": "/faq",
  "Contact": "/contact",
  "Privacy Policy": "/privacy",
  "Terms of Service": "/terms",
  "For Labs": "/for-labs",
  "For Doctors": "/for-doctors",
};

// External links — open in a new tab
const EXTERNAL_MAP = {
  "Download App": "https://app.betterhealth.africa/join",
  "WhatsApp": "https://wa.me/message/MJ3HXLS2NDQEJ1",
};

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 px-6 bg-bg-dark text-text-muted-dark">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <div className="inline-block bg-white rounded-card px-3 py-1.5">
                <img
                  src={logo}
                  alt="BetterHealth Africa"
                  className="h-8 w-auto object-contain max-w-[160px]"
                />
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-[260px] font-body">
              Comprehensive health screening, made accessible for Africa. Know your health before symptoms appear.
            </p>
            <div className="flex gap-4 mt-4">
              {/* Gmail */}
              <a href="mailto:hello@betterhealth.africa" aria-label="Gmail" className="text-text-muted-dark hover:text-primary transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/betterhealth.africa" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-text-muted-dark hover:text-primary transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/betterhealth.africa" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-text-muted-dark hover:text-primary transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.265.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.265.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.516 2.497 5.783 2.226 7.15 2.163 8.415 2.105 8.795 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038C23.986 15.668 24 15.259 24 12s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              {/* X (Twitter) */}
              <a href="https://www.x.com/BetterHealthAfrica" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-text-muted-dark hover:text-primary transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* TikTok */}
              <a href="https://www.tiktok.com/@betterhealth.africa" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-text-muted-dark hover:text-primary transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[13px] font-bold text-text-on-dark uppercase tracking-wider mb-4 font-heading">
                {col.title}
              </h4>
              {col.links.map((link) => {
                const route = ROUTE_MAP[link];
                const external = EXTERNAL_MAP[link];
                if (route) {
                  return (
                    <Link
                      key={link}
                      to={route}
                      className="block text-sm text-text-muted-dark no-underline py-1.5 hover:text-primary-light transition-colors font-body"
                    >
                      {link}
                    </Link>
                  );
                }
                if (external) {
                  return (
                    <a
                      key={link}
                      href={external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-text-muted-dark no-underline py-1.5 hover:text-primary-light transition-colors font-body"
                    >
                      {link}
                    </a>
                  );
                }
                return (
                  <a
                    key={link}
                    href="#"
                    className="block text-sm text-text-muted-dark no-underline py-1.5 hover:text-primary-light transition-colors font-body"
                  >
                    {link}
                  </a>
                );
              })}
            </div>
          ))}
        </div>

        {/* Compliance */}
        <div className="border-t border-border-dark pt-6 pb-6 flex items-center gap-3 flex-wrap">
          <ShieldCheck size={16} className="text-primary-light shrink-0" />
          <span className="text-[13px] text-text-muted-dark font-body">
            Certified by the Ghana Data Protection Commission under Act 843
          </span>
          <a
            href="https://app.dataprotection.org.gh/company/dpdZwcRth19j7oQFxmwoDj1ELCOABE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-primary-light hover:text-white font-semibold no-underline transition-colors"
          >
            Verify →
          </a>
        </div>

        {/* Bottom */}
        <div className="border-t border-border-dark pt-6 flex justify-between items-center flex-wrap gap-4">
          <span className="text-[13px] text-text-muted-dark/60">
            &copy; 2026 BetterHealth Africa. All rights reserved. Made in Ghana 🇬🇭
          </span>
          <div className="flex gap-2">
            {["MTN MoMo", "Vodafone Cash", "AirtelTigo", "Visa", "Mastercard"].map((m) => (
              <span
                key={m}
                className="px-2.5 py-1 rounded text-xs bg-white/[0.06] text-text-muted-dark/60 font-semibold"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
