import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import {
  COUNTRIES,
  PRIORITY_ISO,
  flagEmoji,
  getCountry,
} from "../../data/country-dial-codes";
import { parseInternational, placeholderFor } from "../../lib/phone";

// Accent-insensitive, so "cote" finds Côte d'Ivoire and "turkiye" finds it
// under either spelling.
const fold = (text) =>
  String(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const SORTED = [...COUNTRIES]
  .map((c) => ({
    ...c,
    _name: fold(c.name),
    _alt: fold(c.alt || ""),
    _altWords: fold(c.alt || "").split(" ").filter(Boolean),
  }))
  .sort((a, b) => a.name.localeCompare(b.name, "en"));
const PRIORITY = PRIORITY_ISO.map((iso) => SORTED.find((c) => c.iso === iso)).filter(Boolean);
const PRIORITY_RANK = Object.fromEntries(PRIORITY_ISO.map((iso, i) => [iso, i]));

/**
 * Rank, lower is better. Four tiers: exact name, name prefix or ISO code,
 * alias, then anything else that contains the query — with the pinned markets
 * breaking every tie.
 *
 * The tie-break is the point. Typing "nig" used to surface Niger above Nigeria
 * purely on alphabetical order, so the country sending the second-most traffic
 * to this form sat under one that sends almost none.
 */
function rank(country, q, digits) {
  const name = country._name;
  let tier;
  if (name === q) tier = 0;
  else if (q && (name.startsWith(q) || country.iso.toLowerCase() === q)) tier = 1;
  // A whole alias word counts as strongly as a name prefix, so "uk" is the
  // United Kingdom rather than Ukraine, which merely starts with those letters.
  else if (q && country._altWords.includes(q)) tier = 1;
  else if (q && country._alt.includes(q)) tier = 2;
  else if (q && name.includes(q)) tier = 3;
  else if (digits && country.dial.startsWith(digits)) tier = 4;
  else return null; // no match
  return tier * 1000 + (PRIORITY_RANK[country.iso] ?? 500);
}

/**
 * Phone input with a country-code selector.
 *
 * Why not a native `<select>`: 213 options on a phone is a scroll wheel with no
 * way to jump, and the countries people here need are scattered through it. The
 * popover is searchable by name, ISO code or dial code, with the markets that
 * actually book calls pinned to the top, so Ghana is one tap and Nigeria two.
 *
 * Why not libphonenumber: it costs more gzipped than this site's entire JS
 * budget allows, to answer a question the form does not ask. See lib/phone.js.
 *
 * The number stays in the visitor's own local format in the box — a Ghanaian
 * types 024 123 4567 and sees that back. The international form is shown
 * underneath and is what gets submitted; see `composeE164`.
 *
 * Controlled on `{ iso, national }`. Pasting a number that already carries its
 * own code (+234…, 00234…) moves the selector instead of concatenating, which
 * is the single most common way these fields produce an undiallable number.
 */
export default function PhoneField({
  value,
  onChange,
  id,
  label = "WhatsApp number",
  hint,
  error,
  disabled = false,
  required = false,
  autoComplete = "tel-national",
  className = "",
  tone = "light",
  // Padding and type size for the number box, so the field can sit flush with
  // whatever the surrounding form already uses. The lead-capture forms run at
  // 16px on purpose: anything smaller makes iOS Safari zoom the page on focus.
  fieldClass = "px-3 py-3 text-[14px]",
}) {
  const reactId = useId();
  const fieldId = id || `phone-${reactId}`;
  const listId = `${fieldId}-country-list`;
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const wrapRef = useRef(null);
  const searchRef = useRef(null);
  const listRef = useRef(null);
  const numberRef = useRef(null);

  const country = getCountry(value.iso);
  const dark = tone === "dark";

  const options = useMemo(() => {
    const q = fold(query.trim());
    if (!q) {
      // Unsearched, the pinned markets come first and then everything else. The
      // duplicates are intentional: somebody scrolling to "Ghana" alphabetically
      // should still find it there.
      return [...PRIORITY, ...SORTED];
    }
    const digits = q.replace(/\D/g, "");
    return SORTED.map((c) => ({ c, r: rank(c, q, digits) }))
      .filter((x) => x.r !== null)
      .sort((a, b) => a.r - b.r || a.c.name.localeCompare(b.c.name, "en"))
      .map((x) => x.c);
  }, [query]);

  // Roughly what the popover occupies: search row, list, footer.
  const POPOVER_HEIGHT = 320;

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  // On a desktop the booking card sits in a short sidebar column, and a list
  // anchored below the field ran most of its length past the bottom of the
  // window with no way to scroll to it. Measured at the moment of opening,
  // because where the field sits depends on how far down the page the reader is.
  const openPicker = useCallback(() => {
    const box = wrapRef.current?.getBoundingClientRect();
    if (box) {
      const below = window.innerHeight - box.bottom;
      setDropUp(below < POPOVER_HEIGHT && box.top > below);
    }
    setOpen(true);
  }, []);

  // Pointerdown rather than click: a click listener fires after the button's own
  // handler has already toggled the popover back open.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) close();
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open, close]);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  // Keep the keyboard-highlighted row in view as it moves past the fold.
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active, open, options]);

  const pick = (iso) => {
    onChange({ ...value, iso });
    close();
    // Straight on to the number: choosing a country is never the last thing
    // somebody wants to do in this field.
    numberRef.current?.focus();
  };

  const onSearchKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (options[active]) pick(options[active].iso);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  const onNumberChange = (e) => {
    const raw = e.target.value;
    const parsed = parseInternational(raw);
    if (parsed) {
      // They pasted or typed a full international number. Take the country from
      // the number itself, not from whatever the selector happened to show.
      onChange({ iso: parsed.iso, national: parsed.national });
      return;
    }
    // Digits and the separators people actually type, nothing else.
    onChange({ ...value, national: raw.replace(/[^\d\s()+-]/g, "").slice(0, 24) });
  };

  const describedBy = [error ? `${fieldId}-error` : null, hint ? `${fieldId}-hint` : null]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label
        htmlFor={fieldId}
        className={`text-[13px] font-semibold ${dark ? "text-white/80" : "text-text-primary"}`}
      >
        {label}
      </label>

      <div ref={wrapRef} className="relative">
        <div
          className={`flex items-stretch overflow-hidden rounded-input border transition-shadow focus-within:ring-2 focus-within:ring-primary ${
            dark ? "bg-white/10" : "bg-section-alt"
          } ${
            error
              ? "border-danger"
              : dark
                ? "border-white/20"
                : "border-border"
          } ${disabled ? "opacity-70" : ""}`}
        >
          <button
            type="button"
            onClick={() => (open ? close() : openPicker())}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={open ? listId : undefined}
            aria-label={`Country code: ${country.name}, +${country.dial}`}
            className={`flex shrink-0 items-center gap-1.5 border-r px-3 text-[14px] font-semibold disabled:cursor-not-allowed cursor-pointer ${
              dark
                ? "border-white/20 text-white hover:bg-white/10"
                : "border-border text-text-primary hover:bg-card"
            }`}
          >
            <span aria-hidden="true" className="text-[16px] leading-none">
              {flagEmoji(country.iso)}
            </span>
            <span>+{country.dial}</span>
            <ChevronDown
              size={14}
              className={`transition-transform ${dark ? "text-white/60" : "text-text-muted"} ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          <input
            ref={numberRef}
            id={fieldId}
            type="tel"
            inputMode="tel"
            autoComplete={autoComplete}
            required={required}
            disabled={disabled}
            value={value.national}
            onChange={onNumberChange}
            placeholder={placeholderFor(value.iso)}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={describedBy}
            className={`w-full min-w-0 bg-transparent focus:outline-none ${fieldClass} ${
              dark ? "text-white placeholder:text-white/50" : "text-text-primary placeholder:text-text-muted"
            }`}
          />
        </div>

        {open && (
          <div
            className={`absolute left-0 z-40 w-[min(320px,calc(100vw-32px))] overflow-hidden rounded-input border border-border bg-card shadow-card ${
              dropUp ? "bottom-[calc(100%+4px)]" : "top-[calc(100%+4px)]"
            }`}
          >
            <div className="flex items-center gap-2 border-b border-border px-3 py-2">
              <Search size={14} className="shrink-0 text-text-muted" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  // Highlight follows the filter, so Enter always takes the
                  // first match rather than whatever row index survived.
                  setActive(0);
                }}
                onKeyDown={onSearchKeyDown}
                placeholder="Search country or code"
                aria-label="Search for a country"
                className="w-full bg-transparent text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none"
              />
            </div>

            <ul
              ref={listRef}
              id={listId}
              role="listbox"
              aria-label="Country code"
              className="max-h-[248px] overflow-y-auto overscroll-contain py-1"
            >
              {options.length === 0 && (
                <li className="px-3 py-3 text-[13px] text-text-secondary">
                  No country matches that.
                </li>
              )}
              {options.map((c, i) => {
                const selected = c.iso === value.iso;
                // Keys are index-prefixed because the pinned block repeats the
                // same country further down the alphabetical list.
                return (
                  <li key={`${i}-${c.iso}`} role="none">
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      data-active={i === active ? "true" : "false"}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => pick(c.iso)}
                      className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13.5px] cursor-pointer ${
                        i === active ? "bg-section-alt" : "bg-transparent"
                      } ${selected ? "font-bold text-primary" : "text-text-primary"}`}
                    >
                      <span aria-hidden="true" className="text-[16px] leading-none">
                        {flagEmoji(c.iso)}
                      </span>
                      <span className="min-w-0 flex-1 truncate">{c.name}</span>
                      <span className="shrink-0 text-[12.5px] font-semibold text-text-muted">
                        +{c.dial}
                      </span>
                      {selected && <Check size={14} className="shrink-0 text-primary" />}
                    </button>
                  </li>
                );
              })}
            </ul>

            {!query.trim() && (
              <p className="border-t border-border px-3 py-2 text-[11.5px] text-text-muted">
                Common countries first — type to search all {COUNTRIES.length}.
              </p>
            )}
          </div>
        )}
      </div>

      {error ? (
        <p
          id={`${fieldId}-error`}
          role="alert"
          className={`text-[12.5px] font-semibold ${dark ? "text-red-300" : "text-danger"}`}
        >
          {error}
        </p>
      ) : (
        hint && (
          <p
            id={`${fieldId}-hint`}
            className={`text-[12px] leading-snug ${dark ? "text-white/60" : "text-text-muted"}`}
          >
            {hint}
          </p>
        )
      )}
    </div>
  );
}
