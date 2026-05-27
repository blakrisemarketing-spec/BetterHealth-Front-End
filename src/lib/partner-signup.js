const ENDPOINT = import.meta.env.VITE_PARTNER_API_URL;

export async function submitPartnerSignup({ partnerType, ...payload }) {
  if (!ENDPOINT) {
    return { ok: false, error: "Partner signup endpoint is not configured." };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ partnerType, ...payload }),
    });

    if (!res.ok) {
      return { ok: false, error: `Request failed (HTTP ${res.status}).` };
    }

    return { ok: true };
  } catch (err) {
    return { ok: false, error: err?.message || "Network error" };
  }
}
