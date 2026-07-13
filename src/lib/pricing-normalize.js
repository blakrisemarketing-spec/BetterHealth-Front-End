// Pure price-normalisation helpers shared by the runtime catalogue store
// (src/lib/pricing-catalogue.js) and the nightly snapshot builder
// (scripts/build-pricing-snapshot.mjs). No React / browser deps, so this module
// runs unchanged under Node during the price-refresh job.

export function normalisePanelPrices(data) {
  return Object.fromEntries(
    (data?.panels || [])
      .map((panel) => [
        String(panel.panelCode || "").toLowerCase(),
        normalisePrice(panel.price, panel.currency),
      ])
      .filter(([code, price]) => code && price),
  );
}

export function normaliseTestPrices(data) {
  return Object.fromEntries(
    (data?.categories || [])
      .flatMap((category) => category.tests || [])
      .map((test) => [
        String(test.code || "").toUpperCase(),
        normalisePrice(test.price, test.currency),
      ])
      .filter(([code, price]) => code && price),
  );
}

export function normalisePrice(value, currency = "GHS") {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount <= 0) return null;

  return {
    amount,
    currency,
    formatted: formatPrice(amount, currency),
  };
}

export function formatPrice(amount, currency = "GHS") {
  const hasPesewas = !Number.isInteger(amount);
  const formattedAmount = new Intl.NumberFormat("en-GH", {
    minimumFractionDigits: hasPesewas ? 2 : 0,
    maximumFractionDigits: hasPesewas ? 2 : 0,
  }).format(amount);

  return `${currency} ${formattedAmount}`;
}
