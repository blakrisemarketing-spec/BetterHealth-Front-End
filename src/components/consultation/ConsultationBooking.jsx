import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarDays, Check, Loader2, MessageCircle } from "lucide-react";
import {
  bookConsultation,
  captureAttribution,
  fetchSlots,
  formatSlot,
  toDateParam,
  upcomingDates,
} from "../../lib/consultation-api";
import { trackConsultationBooked } from "../../lib/analytics";
import { CONSULT_MINUTES, PRE_QUESTIONS, WHATSAPP_URL } from "../../data/wellness-consultation";
import IntakeQuestions from "./IntakeQuestions";
import IntakeFields from "./IntakeFields";
import { flattenAnswers, missingRequired } from "./intake-answers";

const DAYS = upcomingDates(14);
// How many days forward the picker will look for availability before it stops
// and shows the visitor an empty day. Six covers a normal week of a thin diary;
// beyond that the honest answer is "nothing this week, message us".
const PROBE_LIMIT = 6;
const TODAY = new Date().toDateString();
const DAY_LABEL = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABEL = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Risk reversal shown at the point of commitment. Every line is a promise the
// business has to keep operationally — the cancel line in particular assumes a
// consultant actually acts on a WhatsApp reply.
const REASSURANCE = [
  "Paid for by the BetterHealth Foundation, not by you",
  "No card, no payment",
  "Cancel or move it by replying to the WhatsApp reminder",
  // Deliberately not "no app to download" — the Meet link may ask some phones to
  // install something. What is promised is that the technology is never the
  // visitor's problem to solve, which is the fear underneath the question.
  "Rather not use video? We'll ring your phone instead",
  "Your details are protected under Ghana's Data Protection Act",
];

/**
 * First-party date + time picker for the wellness consultation.
 *
 * Order is availability first: day, then time, and only then the three
 * qualifying questions plus name and number, all revealed together once a slot
 * is chosen. Nothing is asked of a visitor who has not yet seen that a time
 * exists that suits them.
 *
 * The questions used to sit above the picker. Moving them below it changes
 * nothing about how they are stored: they still ride along in the booking POST
 * rather than going up separately, because the requirement is that answering
 * them is never wasted — the moment a slot is taken, the answers are saved with
 * it. A second request could fail on its own and leave a booking with no answers
 * attached. Screen order and payload order are independent here, which is what
 * makes the move free.
 *
 * They remain one-tap only and carry no typing. They are still ahead of the
 * conversion, just no longer ahead of the availability.
 *
 * `trackConsultationBooked` fires exactly once, on the 201 — never on render,
 * never on a failed submit. A duplicate or premature event would teach Meta to
 * optimise toward the wrong people.
 */
export default function ConsultationBooking({ variant, concern, compact = false }) {
  const [dayIndex, setDayIndex] = useState(0);
  const [slots, setSlots] = useState([]);
  const [slotsState, setSlotsState] = useState("loading"); // loading | ready | error
  const [time, setTime] = useState(null);
  const [form, setForm] = useState({ fullName: "", whatsapp: "" });
  const [preAnswers, setPreAnswers] = useState({});
  const [status, setStatus] = useState("idle"); // idle | saving | done | error
  const [message, setMessage] = useState("");
  const [booking, setBooking] = useState(null);

  const [autoAdvanced, setAutoAdvanced] = useState(false);

  const tracked = useRef(false);
  // Set the moment we stop hunting for a day with availability — either because
  // we found one, because the visitor picked a day themselves, or because the
  // probe ran out of days. Never unset.
  const settled = useRef(false);
  const date = DAYS[dayIndex];
  const dateParam = toDateParam(date);

  // State lands in the async callback rather than synchronously in the effect
  // body. The `cancelled` flag matters: tapping through days quickly fires
  // overlapping requests, and without it a slower earlier response can land
  // last and paint the wrong day's availability.
  const loadSlots = useCallback(
    (param, index) => {
      let cancelled = false;
      fetchSlots(param)
        .then((next) => {
          if (cancelled) return;

          // Walk forward to the first day that actually has a time on it.
          //
          // The picker now sits in the hero, which means whatever it shows is
          // the first thing a visitor sees after the headline. Opening on today
          // is only right if today has something left on it; by mid-afternoon it
          // usually does not, and a consultant roster that is thin or unseeded
          // makes several days in a row empty. Either way the reader is shown a
          // closed shop above the fold and leaves — the most expensive failure
          // on the page, because it happens before a single argument is read.
          //
          // So an empty response is not painted; it advances the day and asks
          // again, up to PROBE_LIMIT days out. `settled` stops the hunt the
          // moment it succeeds, and any manual tap sets it too, so the visitor
          // is never dragged off a day they chose themselves.
          const free = next.filter((slot) => slot.available).length;
          if (!settled.current && free === 0 && index + 1 < PROBE_LIMIT && index + 1 < DAYS.length) {
            setDayIndex(index + 1);
            setAutoAdvanced(true);
            return;
          }

          settled.current = true;
          setSlots(next);
          setSlotsState("ready");
        })
        .catch(() => {
          if (cancelled) return;
          settled.current = true;
          setSlots([]);
          setSlotsState("error");
        });
      return () => {
        cancelled = true;
      };
    },
    [],
  );

  useEffect(() => loadSlots(dateParam, dayIndex), [dateParam, dayIndex, loadSlots]);

  // Clearing the chosen time belongs with the day change that invalidates it,
  // not in an effect — a selected 10:00 on Tuesday means nothing on Wednesday.
  const pickDay = (i) => {
    settled.current = true;
    setAutoAdvanced(false);
    setDayIndex(i);
    setTime(null);
    setSlotsState("loading");
  };

  const retry = () => {
    setSlotsState("loading");
    loadSlots(dateParam, dayIndex);
  };

  const available = slots.filter((s) => s.available);

  // Whether to hide the taken times rather than strike them through.
  //
  // Showing the whole diary is the right default: a short list of free times
  // with nothing to measure it against tells the visitor nothing, and struck-out
  // slots are honest about how much of the day has gone. That reasoning inverts
  // once most of the day is gone. On a day with 3 free times out of 15, the grid
  // opens with six dead buttons, and on the hero picker those six land above the
  // fold while the bookable ones do not — so the first thing a visitor sees of
  // the diary is a wall of unavailability.
  //
  // Below the halfway mark the grid drops to what can actually be booked. The
  // scarcity signal is not lost: the count beside "Pick a time" still says how
  // little is left, which is the same information without the discouragement.
  const dense = available.length > 0 && available.length < slots.length / 2;
  const shownSlots = dense ? available : slots;

  const submit = async (e) => {
    e.preventDefault();
    if (status === "saving" || !time) return;

    setStatus("saving");
    setMessage("");

    try {
      const result = await bookConsultation({
        fullName: form.fullName.trim(),
        whatsapp: form.whatsapp.trim(),
        healthConcern: concern,
        date: dateParam,
        time,
        landingVariant: variant,
        // Saved with the slot, not after it.
        intake: flattenAnswers(PRE_QUESTIONS, preAnswers),
        ...captureAttribution(),
      });

      setBooking(result);
      setStatus("done");

      if (!tracked.current) {
        tracked.current = true;
        trackConsultationBooked({ channel: "picker", concern });
      }
    } catch (err) {
      setStatus("error");
      if (err.code === "slot_unavailable") {
        // Somebody took it while this form was open. Refresh the grid and clear
        // the selection so the next tap is on something that actually exists.
        setMessage("Sorry — that time has just been taken. Here are the times still free.");
        setTime(null);
        retry();
      } else {
        setMessage(err.message || "Something went wrong. Please try again.");
      }
    }
  };

  if (status === "done" && booking) {
    return <Confirmation booking={booking} />;
  }

  return (
    <div
      className={`rounded-card border border-border bg-card shadow-card ${
        compact ? "p-5" : "p-5 sm:p-7"
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <CalendarDays size={17} className="text-primary shrink-0" />
        <h3 className="text-[17px] font-extrabold font-heading text-text-primary">
          Book your free call
        </h3>
      </div>
      <p className="text-[13px] text-text-secondary mb-5">
        {CONSULT_MINUTES} minutes · Google Meet or a phone call · nothing to pay
      </p>

      {/* ── Day ── */}
      <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-text-muted mb-2">
        Pick a day
      </p>
      <div className="-mx-1 mb-5 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {DAYS.map((d, i) => {
          const selected = i === dayIndex;
          return (
            <button
              key={d.toISOString()}
              type="button"
              onClick={() => pickDay(i)}
              aria-pressed={selected}
              className={`flex min-w-[62px] shrink-0 flex-col items-center rounded-btn border px-3 py-2.5 transition-all cursor-pointer ${
                selected
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-card text-text-primary hover:border-primary/40 hover:bg-section-alt"
              }`}
            >
              <span className={`text-[11px] font-semibold ${selected ? "text-white/80" : "text-text-muted"}`}>
                {/* Compare dates, not indexes. Sundays are skipped, so on a
                    Sunday the first chip is tomorrow — labelling it "Today"
                    would book people onto the wrong day. */}
                {d.toDateString() === TODAY ? "Today" : DAY_LABEL[d.getDay()]}
              </span>
              <span className="text-[16px] font-extrabold leading-tight font-heading">{d.getDate()}</span>
              <span className={`text-[10px] ${selected ? "text-white/70" : "text-text-muted"}`}>
                {MONTH_LABEL[d.getMonth()]}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Time ── */}
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-text-muted">
          Pick a time
        </p>
        {/* Scarcity, but only ever the real count off the slots response. A
            countdown or an invented "2 spots left!" would convert today and
            cost more than it earns the first time somebody reloads. */}
        {slotsState === "ready" && available.length > 0 && (available.length <= 4 || dense) && (
          <p className="text-[12px] font-bold text-accent-ink">
            {available.length === 1
              ? "1 time left this day"
              : `Only ${available.length} times left this day`}
          </p>
        )}
      </div>

      {/* The probe moves the visitor off the day they expected to see, so it
          says so. An unexplained jump to Thursday reads as a broken picker. */}
      {autoAdvanced && slotsState === "ready" && available.length > 0 && (
        <p className="mb-2 text-[12.5px] leading-snug text-text-secondary">
          Fully booked until{" "}
          <strong className="text-text-primary">
            {DAY_LABEL[date.getDay()]} {date.getDate()} {MONTH_LABEL[date.getMonth()]}
          </strong>
          . These are the next free times.
        </p>
      )}

      {slotsState === "loading" && (
        <div className="flex items-center gap-2 py-6 text-[14px] text-text-secondary">
          <Loader2 size={16} className="animate-spin text-primary" />
          Loading available times…
        </div>
      )}

      {slotsState === "error" && (
        <div className="rounded-btn border border-border bg-section-alt px-4 py-4 text-[14px] text-text-secondary">
          We couldn&apos;t load the times just now.{" "}
          <button
            type="button"
            onClick={retry}
            className="font-semibold text-primary underline underline-offset-2 cursor-pointer"
          >
            Try again
          </button>
          , or{" "}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary">
            book on WhatsApp
          </a>
          .
        </div>
      )}

      {/* An empty day is a dead end unless it comes with a way out of it. The
          probe above has already looked several days forward, so by the time
          this renders the honest message is "the diary is thin", not "pick
          another date" — and the WhatsApp line is the only remaining path to a
          booking, so it is a button here rather than a footnote. */}
      {slotsState === "ready" && available.length === 0 && (
        <div className="rounded-btn border border-border bg-section-alt px-4 py-4">
          <p className="mb-3 text-[14px] leading-relaxed text-text-secondary">
            Nothing free on this day. Try another date above, or send us a message and we&apos;ll
            find you a time.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (!tracked.current) {
                tracked.current = true;
                trackConsultationBooked({ channel: "whatsapp", concern });
              }
            }}
            className="inline-flex items-center gap-2 rounded-btn bg-primary px-5 py-3 font-heading text-[14px] font-bold text-white no-underline transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
          >
            <MessageCircle size={15} />
            Get a time on WhatsApp
          </a>
        </div>
      )}

      {/* The whole day is rendered, taken times included, so a visitor can see
          what is left rather than a short list with nothing to measure it
          against. Taken slots are struck through and disabled: the server will
          not accept them either, so this is a picture of the diary and not a
          decoration over it. */}
      {slotsState === "ready" && available.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {shownSlots.map((slot) => {
            const selected = slot.time === time;
            if (!slot.available) {
              return (
                <span
                  key={slot.time}
                  aria-label={`${formatSlot(slot.time)}, taken`}
                  className="cursor-not-allowed select-none rounded-btn border border-border bg-section-alt px-2 py-2.5 text-center text-[13px] font-semibold text-text-muted line-through decoration-text-muted/60"
                >
                  {formatSlot(slot.time)}
                </span>
              );
            }
            return (
              <button
                key={slot.time}
                type="button"
                onClick={() => setTime(slot.time)}
                aria-pressed={selected}
                className={`rounded-btn border px-2 py-2.5 text-[13px] font-semibold transition-all cursor-pointer ${
                  selected
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-card text-text-primary hover:border-primary/40 hover:bg-section-alt"
                }`}
              >
                {formatSlot(slot.time)}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Details, revealed only once a time is chosen ── */}
      {time && (
        <form onSubmit={submit} className="mt-6 flex flex-col gap-3 border-t border-border pt-5">
          <p className="text-[13px] text-text-secondary">
            Booking{" "}
            <strong className="text-text-primary">
              {DAY_LABEL[date.getDay()]} {date.getDate()} {MONTH_LABEL[date.getMonth()]} at {formatSlot(time)}
            </strong>
          </p>

          {/* The three qualifying questions, now that a time is actually held.
              Tap-only, and placed above the typing rather than below it so the
              visitor keeps moving through chips before reaching a keyboard. */}
          <div className="border-b border-border pb-4">
            <IntakeFields
              questions={PRE_QUESTIONS}
              answers={preAnswers}
              onChange={setPreAnswers}
              disabled={status === "saving"}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-[13px] font-semibold text-text-primary">Your name</span>
              <input
                type="text"
                required
                maxLength={200}
                placeholder="Full name"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                disabled={status === "saving"}
                className="w-full rounded-input border border-border bg-section-alt px-4 py-3 text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[13px] font-semibold text-text-primary">WhatsApp number</span>
              <input
                type="tel"
                inputMode="tel"
                required
                maxLength={40}
                placeholder="0XX XXX XXXX"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                disabled={status === "saving"}
                className="w-full rounded-input border border-border bg-section-alt px-4 py-3 text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={status === "saving" || missingRequired(PRE_QUESTIONS, preAnswers).length > 0}
            className="inline-flex w-full items-center justify-center gap-2 rounded-btn bg-primary px-7 py-3.5 text-[15px] font-bold font-heading text-white transition-all hover:-translate-y-0.5 hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:self-start cursor-pointer"
          >
            {status === "saving" ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Booking…
              </>
            ) : (
              <>
                Confirm my free call <ArrowRight size={17} />
              </>
            )}
          </button>

          {missingRequired(PRE_QUESTIONS, preAnswers).length > 0 && (
            <p className="text-[12.5px] font-semibold text-accent-ink">
              Please pick an age bracket above before confirming.
            </p>
          )}

          <p className="text-[12px] leading-relaxed text-text-muted">
            We&apos;ll send a reminder on WhatsApp. No payment, and nothing is booked for you beyond
            this call.
          </p>
        </form>
      )}

      {status === "error" && message && (
        <p className="mt-3 rounded-btn border border-border bg-section-alt px-4 py-3 text-[13px] text-text-secondary">
          {message}
        </p>
      )}

      {/* Risk reversal, at the point of commitment rather than only in the FAQ.
          These are the three things somebody hesitates over with a finger on the
          button, and they cost nothing to answer here. */}
      <ul className="mt-5 flex flex-col gap-2 border-t border-border pt-4">
        {REASSURANCE.map((item) => (
          <li key={item} className="flex items-start gap-2 text-[12.5px] leading-snug text-text-secondary">
            <Check size={13} strokeWidth={3} className="mt-0.5 shrink-0 text-primary" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-4 border-t border-border pt-4">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            // Separate path, same conversion. Some people will never use a
            // picker, and this fires cleanly on click-out.
            if (!tracked.current) {
              tracked.current = true;
              trackConsultationBooked({ channel: "whatsapp", concern });
            }
          }}
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-primary no-underline hover:text-primary-dark"
        >
          <MessageCircle size={15} />
          Rather book on WhatsApp?
        </a>
      </div>
    </div>
  );
}

function Confirmation({ booking }) {
  const when = new Date(booking.scheduledAt);
  return (
    <div className="rounded-card border-2 border-primary bg-card p-6 shadow-card sm:p-7">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary-bg">
        <Check size={22} className="text-primary" />
      </div>
      <h3 className="mb-2 text-[20px] font-extrabold font-heading leading-snug text-text-primary">
        You&apos;re booked.
      </h3>
      <p className="mb-4 text-[15px] leading-relaxed text-text-secondary">
        {DAY_LABEL[when.getDay()]} {when.getDate()} {MONTH_LABEL[when.getMonth()]} at{" "}
        <strong className="text-text-primary">
          {formatSlot(`${String(when.getHours()).padStart(2, "0")}:${String(when.getMinutes()).padStart(2, "0")}`)}
        </strong>
        . One of our Wellness Consultants will reach you on WhatsApp to confirm whether you&apos;d
        prefer Google Meet or a phone call.
      </p>

      <div className="mb-4 rounded-btn border border-border bg-section-alt px-4 py-3">
        <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-text-muted">
          Your reference
        </p>
        <p className="font-mono text-[19px] font-bold text-primary">{booking.refCode}</p>
      </div>

      <p className="text-[13px] leading-relaxed text-text-secondary">
        Quote it any time and we&apos;ll pick up where we left off. Your written plan follows on
        WhatsApp within a day of the call.
      </p>

      {/* Qualifying questions live here, after the slot is secured, never before
          the button. See INTAKE_QUESTIONS for the reasoning. */}
      <IntakeQuestions refCode={booking.refCode} />
    </div>
  );
}
