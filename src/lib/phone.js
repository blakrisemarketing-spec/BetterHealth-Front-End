// Phone number handling for the public forms.
//
// The problem this solves: visitors from Nigeria, Kenya and the UK were typing
// their numbers in local form — 0801..., 07..., 071... — into a field that was
// stored as typed. A consultant looking at "0801 234 5678" in Accra has no way
// to dial it, and three countries all use 07 for mobiles, so the number cannot
// even be guessed at. Everything here exists to turn whatever somebody types
// into one unambiguous +<dial><national> string.

import {
  COUNTRIES,
  DEFAULT_ISO,
  GENERIC_LEN,
  PRIMARY_FOR_DIAL,
  getCountry,
} from "../data/country-dial-codes";

// Longest dial code first, so +1876 resolves to Jamaica before +1 claims it,
// and the designated primary ahead of its co-tenants, so +1415 is American
// rather than Canadian.
const BY_DIAL_DESC = [...COUNTRIES].sort(
  (a, b) =>
    b.dial.length - a.dial.length ||
    Number(PRIMARY_FOR_DIAL[b.dial] === b.iso) - Number(PRIMARY_FOR_DIAL[a.dial] === a.iso),
);

export function digitsOnly(value) {
  return String(value ?? "").replace(/\D/g, "");
}

export function defaultPhoneValue(iso = DEFAULT_ISO) {
  return { iso, national: "" };
}

/**
 * The national significant number: digits with the trunk prefix removed.
 *
 * Dropping the leading 0 is the whole point — a Ghanaian types 024 123 4567 and
 * means +233 24 123 4567, never +233 024…. Italy is the exception, where the
 * leading 0 of a landline is part of the number itself.
 */
export function nationalSignificant(national, iso) {
  const country = getCountry(iso);
  const digits = digitsOnly(national);
  if (country.keepLeadingZero) return digits;
  return digits.replace(/^0+/, "");
}

/** `+233241234567`, or "" when there is nothing to send. */
export function composeE164({ iso, national }) {
  const nsn = nationalSignificant(national, iso);
  if (!nsn) return "";
  return `+${getCountry(iso).dial}${nsn}`;
}

/** `+233 24 123 4567` — the same number, grouped for a human to read back. */
export function formatE164ForDisplay({ iso, national }) {
  const nsn = nationalSignificant(national, iso);
  if (!nsn) return "";
  const dial = getCountry(iso).dial;
  // Grouping from the left in 2–3–4 suits the 9-digit plans that cover most of
  // this traffic and stays readable for everything else.
  const groups = nsn.length === 9 ? [2, 3, 4] : nsn.length === 10 ? [3, 3, 4] : [3, 3, 3, 3];
  const parts = [];
  let i = 0;
  for (const size of groups) {
    if (i >= nsn.length) break;
    parts.push(nsn.slice(i, i + size));
    i += size;
  }
  if (i < nsn.length) parts.push(nsn.slice(i));
  return `+${dial} ${parts.join(" ")}`;
}

/**
 * Pull a country out of a number that already carries its own code.
 *
 * People paste +233 24 123 4567 and 00233241234567 into these fields constantly,
 * and both used to end up concatenated behind whatever the selector said. Only
 * an explicit international prefix counts: a bare "233..." is left alone,
 * because a Ghanaian mobile can legitimately start with those digits.
 *
 * @returns {{iso: string, national: string} | null}
 */
export function parseInternational(raw) {
  const trimmed = String(raw ?? "").trim();
  const international = /^\+/.test(trimmed)
    ? digitsOnly(trimmed)
    : /^00\d/.test(digitsOnly(trimmed))
      ? digitsOnly(trimmed).slice(2)
      : null;
  if (!international) return null;

  const match = BY_DIAL_DESC.find(
    (c) => international.startsWith(c.dial) && international.length > c.dial.length,
  );
  if (!match) return null;
  return { iso: match.iso, national: international.slice(match.dial.length) };
}

/**
 * Is this reachable? Length only — nothing here claims to know which prefixes a
 * network has actually issued.
 *
 * @returns {{ok: boolean, message?: string}}
 */
export function validatePhone({ iso, national }) {
  const country = getCountry(iso);
  const nsn = nationalSignificant(national, iso);

  if (!nsn) {
    return { ok: false, message: "Enter the number we should reach you on." };
  }

  const [min, max] = country.len || GENERIC_LEN;
  if (nsn.length < min || nsn.length > max) {
    const expected =
      min === max
        ? `${min} digits`
        : `${min}–${max} digits`;
    return {
      ok: false,
      // Naming the country matters: somebody who left the selector on Ghana and
      // typed a Nigerian number needs to see which country is being checked.
      message: `That doesn't look like a complete ${country.name} number — we expect ${expected} after +${country.dial}.`,
    };
  }

  return { ok: true };
}

/**
 * A placeholder in the local form the visitor is used to typing.
 *
 * Real sample numbers where we have them. The generated fallback deliberately
 * shows no leading 0: plenty of plans have no trunk prefix at all, and a hint
 * that invents one teaches people to type a digit we then have to strip.
 */
export function placeholderFor(iso) {
  const country = getCountry(iso);
  if (country.ex) return country.ex;

  const [min, max] = country.len || GENERIC_LEN;
  const length = Math.min(Math.max(min, 8), max);
  const body = "X".repeat(length);
  const parts = [];
  for (let i = 0; i < body.length; i += 3) parts.push(body.slice(i, i + 3));
  return parts.join(" ");
}
