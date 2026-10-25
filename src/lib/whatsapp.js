// The business WhatsApp number, in the digits-only form wa.me expects.
export const WHATSAPP_NUMBER = "233268596410";

// Always build prefilled links against the number. The wa.me/message/<code>
// short link redirects to api.whatsapp.com and drops any ?text=, replacing it
// with the short link's own preset greeting, so whatever the visitor typed
// never reaches the draft.
export function whatsappUrl(text) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
