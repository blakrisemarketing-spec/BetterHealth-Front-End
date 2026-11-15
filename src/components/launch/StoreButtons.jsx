import { APP_STORE_URL, PLAY_STORE_URL, APP_BETA_URL } from "../../data/app";

const APPLE_PATH =
  "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z";

function PlayIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.6 1.8 13.4 12l-9.8 10.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1z" fill="#00D7FE" />
      <path d="m16.8 8.6-3.4 3.4-9.8-10.2c.1-.1.3-.1.4-.1.3 0 .5.1.8.2l12 6.7z" fill="#00F076" />
      <path d="m16.8 15.4-12 6.7c-.3.1-.5.2-.8.2-.1 0-.3 0-.4-.1l9.8-10.2 3.4 3.4z" fill="#F7364C" />
      <path d="m20.9 12-4.1 3.4-3.4-3.4 3.4-3.4 4.1 2.3c.7.4.7.7 0 1.1z" fill="#FFC900" />
    </svg>
  );
}

/**
 * The App Store and Google Play buttons, drawn like the stores' own badges.
 * A store with no URL yet in src/data/app.js sends people to the beta sign-up
 * form and says so on the badge, so nobody expects a store page.
 */
export default function StoreButtons({ size = "md", className = "", tone = "dark" }) {
  const big = size === "lg";
  const sm = size === "sm";
  const badges = [
    {
      name: "App Store",
      href: APP_STORE_URL || APP_BETA_URL,
      top: APP_STORE_URL ? "Download on the" : "Join the beta on",
      icon: (
        <svg width={big ? 26 : sm ? 18 : 22} height={big ? 26 : sm ? 18 : 22} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d={APPLE_PATH} />
        </svg>
      ),
    },
    {
      name: "Google Play",
      href: PLAY_STORE_URL || APP_BETA_URL,
      top: PLAY_STORE_URL ? "Get it on" : "Join the beta on",
      icon: <PlayIcon size={big ? 24 : sm ? 16 : 20} />,
    },
  ];
  const colours =
    tone === "light"
      ? "bg-white text-[#0A0A0A] hover:bg-white/90"
      : "bg-l-btn text-l-btn-fg hover:opacity-90";
  const pad = big ? "h-[50px] px-3.5 gap-2 rounded-[12px] sm:h-[60px] sm:px-5 sm:gap-3 sm:rounded-[14px]" : sm ? "h-[40px] px-3 gap-2 rounded-[10px]" : "h-[52px] px-4 gap-2.5 rounded-[12px]";
  return (
    <div className={`flex flex-wrap gap-2.5 sm:gap-3 ${className}`}>
      {badges.map((b) => (
        <a
          key={b.name}
          href={b.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center no-underline transition-all duration-200 hover:-translate-y-0.5 ${pad} ${colours}`}
        >
          {b.icon}
          <span className="flex flex-col leading-none text-left">
            <span className={`${big ? "text-[9.5px] sm:text-[11px]" : sm ? "text-[8.5px]" : "text-[10px]"} font-semibold opacity-80 mb-[3px]`}>{b.top}</span>
            <span className={`${big ? "text-[17px] sm:text-[21px]" : sm ? "text-[14px]" : "text-[18px]"} font-bold tracking-[-0.01em]`}>{b.name}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
