import { APP_STORE_URL, PLAY_STORE_URL, APP_BETA_URL } from "../../data/app";

const APPLE_PATH = "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z";
const PLAY_PATH = "M3.18 23.76c.3.17.64.22.98.14l11.65-11.65L12.1 9.54 3.18 23.76zm16.4-12.37L16.8 9.83 4.34.55C4.01.34 3.6.3 3.22.5L14.93 12.21l4.65-4.65c.35.2.6.55.6.98v.02c0 .43-.24.78-.6.83zM3.22.5C2.84.7 2.6 1.1 2.6 1.55v20.9c0 .45.24.85.62 1.05L14.93 12.21 3.22.5zm13.58 7.33l2.79 1.56c.79.44.79 1.16 0 1.6l-2.79 1.56-3.13-3.13 3.13-1.59z";

// App Store and Google Play buttons. Until a store URL is set in
// src/data/app.js, its button opens the beta sign-up form instead.
export default function StoreBadges({ dark = true, className = "" }) {
  const badges = [
    { href: APP_STORE_URL || APP_BETA_URL, path: APPLE_PATH, top: APP_STORE_URL ? "Download on the" : "Beta on", name: "App Store" },
    { href: PLAY_STORE_URL || APP_BETA_URL, path: PLAY_PATH, top: PLAY_STORE_URL ? "Get it on" : "Beta on", name: "Google Play" },
  ];
  const tone = dark
    ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
    : "bg-text-primary border-text-primary text-white hover:opacity-90";
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {badges.map((b) => (
        <a
          key={b.name}
          href={b.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-3 px-5 py-3 rounded-card border font-semibold text-sm transition-colors no-underline ${tone}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d={b.path} />
          </svg>
          <span className="flex flex-col leading-tight text-left">
            <span className="text-xs font-normal opacity-80">{b.top}</span>
            <span className="text-base font-bold">{b.name}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
