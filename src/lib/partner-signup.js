// Falls back to the production endpoint on the app host when VITE_PARTNER_API_URL is not
// provided at build time (e.g. CI without the env var set), so partner and
// foundation forms still submit. Override via env for staging/local.
import { trackLead } from "./analytics";

const ENDPOINT =
  import.meta.env.VITE_PARTNER_API_URL || "https://app.betterhealth.africa/api/partner-signup";
const REF_STORAGE_KEY = "bh_referral_code";
const REF_PARAM = "ref";

/**
 * Marketing attribution options used by all three partner signup forms.
 * Keep these in sync with the backend if you start filtering / categorising.
 */
export const HEARD_ABOUT_OPTIONS = [
  "Friend or colleague",
  "Doctor referral",
  "WhatsApp / community group",
  "Social media (Facebook, Instagram, X, LinkedIn, TikTok)",
  "Google search",
  "News article or media",
  "Conference or event",
  "Other",
];

/**
 * Read ?ref=<code> from the given search string (or window.location.search)
 * and persist it to sessionStorage so it survives in-site navigation.
 * No-op if the search string has no ref, or if sessionStorage is unavailable
 * (private browsing on some browsers, embedded contexts, etc.).
 */
export function captureReferralFromUrl(search) {
  try {
    const params = new URLSearchParams(
      typeof search === "string" ? search : window.location.search,
    );
    const ref = params.get(REF_PARAM);
    if (ref && ref.trim()) {
      sessionStorage.setItem(REF_STORAGE_KEY, ref.trim());
    }
  } catch {
    /* sessionStorage unavailable or window not defined — silently ignore */
  }
}

export function getStoredReferralCode() {
  try {
    const value = sessionStorage.getItem(REF_STORAGE_KEY);
    return value && value.trim() ? value.trim() : null;
  } catch {
    return null;
  }
}

export async function submitPartnerSignup({ partnerType, ...payload }) {
  if (!ENDPOINT) {
    return { ok: false, error: "Partner signup endpoint is not configured." };
  }

  const referralCode = getStoredReferralCode();

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        partnerType,
        ...payload,
        ...(referralCode ? { referralCode } : {}),
      }),
    });

    if (!res.ok) {
      return { ok: false, error: `Request failed (HTTP ${res.status}).` };
    }

    trackLead({ source: `partner:${partnerType}` });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err?.message || "Network error" };
  }
}
