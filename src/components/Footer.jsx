import { footerColumns } from "../data/content";
import { Camera, Bird, Briefcase, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 px-6 bg-bg-dark text-text-muted-dark">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <span className="text-white text-base font-extrabold">B</span>
              </div>
              <span className="text-base font-bold text-text-on-dark font-heading">BetterHealth Africa</span>
            </div>
            <p className="text-sm leading-relaxed max-w-[260px] font-body">
              Comprehensive health screening, made accessible for Africa. Know your health before symptoms appear.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" aria-label="Instagram" className="text-text-muted-dark hover:text-primary transition-colors">
                <Camera size={20} />
              </a>
              <a href="#" aria-label="Twitter / X" className="text-text-muted-dark hover:text-primary transition-colors">
                <Bird size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-text-muted-dark hover:text-primary transition-colors">
                <Briefcase size={20} />
              </a>
              <a href="#" aria-label="WhatsApp" className="text-text-muted-dark hover:text-primary transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[13px] font-bold text-text-on-dark uppercase tracking-wider mb-4 font-heading">
                {col.title}
              </h4>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-sm text-text-muted-dark no-underline py-1.5 hover:text-primary-light transition-colors font-body"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
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
                className="px-2.5 py-1 rounded text-[11px] bg-white/[0.06] text-text-muted-dark/60 font-semibold"
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
