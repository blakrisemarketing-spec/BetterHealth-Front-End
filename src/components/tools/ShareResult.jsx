import { useEffect, useRef, useState } from "react";
import { Download, Loader2, MessageCircle, Share2 } from "lucide-react";
import logoUrl from "../../assets/logo.png";

/**
 * "Share my result": a branded 1080 x 1350 card drawn on a canvas, on the
 * device, from the words src/data/tools/share-card.js chose. Shared through
 * the Web Share API with the PNG attached where the browser allows files;
 * otherwise a download plus a WhatsApp link with the text prefilled.
 *
 * The card holds the result and nothing else personal. No name, no phone, no
 * raw answers, nothing from Part 2. The spec is the only input.
 */

const CARD_W = 1080;
const CARD_H = 1350;

const C = {
  cream: "#F5F3EE",
  card: "#FFFFFF",
  border: "#E0DCD5",
  alt: "#EBE9E3",
  sage: "#6B8E7F",
  sageTint: "rgba(107,142,127,0.3)",
  ink: "#2B3A3A",
  body: "#6B7979",
  muted: "#9CA3AF",
};
const FONT = "Quicksand, system-ui, -apple-system, sans-serif";

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapLines(ctx, text, maxWidth) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const trial = line ? `${line} ${word}` : word;
    if (ctx.measureText(trial).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = trial;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** The largest size, from `start` down to `min`, at which `text` fits on one line. */
function fitFont(ctx, text, maxWidth, start, min, weight) {
  let size = start;
  while (size > min) {
    ctx.font = `${weight} ${size}px ${FONT}`;
    if (ctx.measureText(text).width <= maxWidth) break;
    size -= 4;
  }
  return size;
}

/** Draw the whole card onto `canvas` at CARD_W x CARD_H. */
function drawShareCard(canvas, spec, logo) {
  const ctx = canvas.getContext("2d");
  canvas.width = CARD_W;
  canvas.height = CARD_H;

  ctx.fillStyle = C.cream;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  const orb = ctx.createRadialGradient(CARD_W - 120, 160, 10, CARD_W - 120, 160, 460);
  orb.addColorStop(0, "rgba(107,142,127,0.20)");
  orb.addColorStop(1, "rgba(107,142,127,0)");
  ctx.fillStyle = orb;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  if (logo) {
    const h = 96;
    const w = (h * logo.width) / logo.height;
    ctx.drawImage(logo, 72, 76, w, h);
  }

  // The result card.
  const cardX = 72;
  const cardY = 232;
  const cardW = CARD_W - 144;
  const cardH = 880;
  ctx.save();
  ctx.shadowColor = "rgba(43,58,58,0.08)";
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 12;
  roundRect(ctx, cardX, cardY, cardW, cardH, 40);
  ctx.fillStyle = C.card;
  ctx.fill();
  ctx.restore();
  roundRect(ctx, cardX, cardY, cardW, cardH, 40);
  ctx.strokeStyle = C.border;
  ctx.lineWidth = 2;
  ctx.stroke();

  const left = cardX + 64;
  const width = cardW - 128;
  ctx.textBaseline = "alphabetic";

  // Eyebrow.
  ctx.fillStyle = C.sage;
  ctx.font = `700 27px ${FONT}`;
  if ("letterSpacing" in ctx) ctx.letterSpacing = "3px";
  ctx.fillText(String(spec.eyebrow || spec.title).toUpperCase(), left, cardY + 92);
  if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";

  // Headline, shrunk to fit one line.
  const size = fitFont(ctx, spec.headline, width, 150, 64, 800);
  ctx.fillStyle = C.ink;
  ctx.font = `800 ${size}px ${FONT}`;
  let y = cardY + 150 + size;
  ctx.fillText(spec.headline, left, y);
  y += 72;

  // Band.
  ctx.fillStyle = C.sage;
  ctx.font = `700 46px ${FONT}`;
  for (const line of wrapLines(ctx, spec.band, width)) {
    ctx.fillText(line, left, y);
    y += 56;
  }
  y += 18;

  // Band meter.
  if (spec.meter && spec.meter.count > 0) {
    const gap = 10;
    const segW = (width - gap * (spec.meter.count - 1)) / spec.meter.count;
    for (let i = 0; i < spec.meter.count; i += 1) {
      roundRect(ctx, left + i * (segW + gap), y, segW, 16, 8);
      ctx.fillStyle = i === spec.meter.active ? C.sage : i < spec.meter.active ? C.sageTint : C.alt;
      ctx.fill();
    }
    y += 62;
  }

  // Extra trait rows, for a result that answered more than one question. Each
  // is a labelled outcome on a tinted strip so the two read as a pair rather
  // than as a headline with an afterthought under it.
  const rows = Array.isArray(spec.rows) ? spec.rows.slice(0, 2) : [];
  for (const row of rows) {
    y += 20;
    const rowH = row.note ? 150 : 104;
    roundRect(ctx, left, y, width, rowH, 24);
    ctx.fillStyle = C.alt;
    ctx.fill();
    ctx.fillStyle = C.sage;
    ctx.font = `700 26px ${FONT}`;
    if ("letterSpacing" in ctx) ctx.letterSpacing = "2px";
    ctx.fillText(String(row.label).toUpperCase(), left + 32, y + 46);
    if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";
    ctx.fillStyle = C.ink;
    const rowSize = fitFont(ctx, row.value, width - 64, 44, 26, 800);
    ctx.font = `800 ${rowSize}px ${FONT}`;
    ctx.fillText(row.value, left + 32, y + 88);
    if (row.note) {
      ctx.fillStyle = C.body;
      ctx.font = `500 27px ${FONT}`;
      ctx.fillText(wrapLines(ctx, row.note, width - 64)[0], left + 32, y + 128);
    }
    y += rowH;
  }

  if (spec.more) {
    y += 46;
    ctx.fillStyle = C.muted;
    ctx.font = `600 27px ${FONT}`;
    ctx.fillText(wrapLines(ctx, spec.more, width)[0], left, y);
  }

  // Meaning, filling whatever vertical room the rows above left behind. The
  // last line the card can hold is the last one drawn, so a sentence is never
  // cut off halfway.
  const urlY = cardY + cardH - 56;
  const meaningFloor = urlY - 56;
  ctx.fillStyle = C.body;
  ctx.font = `500 34px ${FONT}`;
  for (const line of wrapLines(ctx, spec.meaning, width)) {
    if (y + 48 > meaningFloor) break;
    y += 40;
    ctx.fillText(line, left, y);
    y += 8;
  }

  // URL, pinned to the bottom of the card. The badge beside it is dropped
  // rather than allowed to overlap a long URL.
  const badge = "Free, no sign-up";
  ctx.font = `600 24px ${FONT}`;
  const badgeW = ctx.measureText(badge).width + 32;
  const urlSize = fitFont(ctx, spec.url, width - badgeW, 32, 22, 700);
  const urlFits = ctx.measureText(spec.url).width <= width - badgeW;
  ctx.fillStyle = C.sage;
  ctx.font = `700 ${urlSize}px ${FONT}`;
  ctx.fillText(spec.url, left, urlY);
  if (urlFits) {
    ctx.fillStyle = C.muted;
    ctx.font = `600 24px ${FONT}`;
    ctx.textAlign = "right";
    ctx.fillText(badge, cardX + cardW - 64, urlY);
    ctx.textAlign = "left";
  }

  // Disclaimer under the card.
  ctx.fillStyle = C.body;
  ctx.font = `500 26px ${FONT}`;
  let dy = cardY + cardH + 64;
  for (const line of wrapLines(ctx, spec.disclaimer, cardW)) {
    ctx.fillText(line, cardX, dy);
    dy += 36;
  }
  ctx.fillStyle = C.muted;
  ctx.font = `600 23px ${FONT}`;
  ctx.fillText("Worked out on my own device. Free health tools from BetterHealth Africa.", cardX, CARD_H - 60);
}

async function ensureFonts() {
  if (typeof document === "undefined" || !document.fonts) return;
  try {
    await Promise.all(
      ["800 150px", "700 46px", "500 34px", "700 27px", "600 24px"].map((f) => document.fonts.load(`${f} Quicksand`)),
    );
  } catch {
    // Fall back to the system face. The card still renders.
  }
}

function loadLogo() {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = logoUrl;
  });
}

function toBlob(canvas) {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}

// GA4's recommended `share` event, gated the same way src/lib/analytics.js
// gates everything: index.html sets the flag on production only.
function trackShare(method, slug) {
  if (typeof window === "undefined" || window.__BH_TRACKING_ENABLED__ !== true) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "share", method, content_type: "tool_result", item_id: slug });
}

export default function ShareResult({ spec }) {
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [state, setState] = useState("idle"); // idle | busy | shared | fallback | error
  const [blobUrl, setBlobUrl] = useState(null);

  // Draw as soon as the result is on screen, so the card is visible before
  // anyone taps share, and so the share tap itself is fast.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      await ensureFonts();
      const logo = await loadLogo();
      if (cancelled || !canvasRef.current) return;
      drawShareCard(canvasRef.current, spec, logo);
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [spec]);

  useEffect(() => () => {
    if (blobUrl) URL.revokeObjectURL(blobUrl);
  }, [blobUrl]);

  const share = async () => {
    if (state === "busy" || !canvasRef.current) return;
    setState("busy");
    try {
      const blob = await toBlob(canvasRef.current);
      if (!blob) throw new Error("no blob");
      const file = new File([blob], spec.fileName, { type: "image/png" });
      const canShareFiles =
        typeof navigator !== "undefined" &&
        typeof navigator.share === "function" &&
        typeof navigator.canShare === "function" &&
        navigator.canShare({ files: [file] });
      if (canShareFiles) {
        try {
          await navigator.share({ files: [file], title: spec.title, text: spec.text });
          trackShare("web_share", spec.slug);
          setState("shared");
          return;
        } catch (err) {
          // The person closed the sheet, or the browser refused the file.
          // Either way the fallback below still gives them the card.
          if (err && err.name === "AbortError") {
            setState("idle");
            return;
          }
        }
      }
      const url = URL.createObjectURL(blob);
      setBlobUrl(url);
      setState("fallback");
    } catch {
      setState("error");
    }
  };

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(spec.text)}`;

  return (
    <div className="rounded-card border border-border bg-card shadow-sm p-5 sm:p-6 mb-4" data-testid="share-result">
      <div className="flex gap-4 items-start">
        <div className="w-[104px] sm:w-[128px] shrink-0">
          <canvas
            ref={canvasRef}
            width={CARD_W}
            height={CARD_H}
            role="img"
            aria-label={`${spec.title} result card: ${spec.headline}, ${spec.band}`}
            className={`w-full h-auto rounded-[10px] border border-border bg-base transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-bold text-primary uppercase tracking-[0.12em] mb-1">Your result card</p>
          <p className="text-[14px] text-text-secondary leading-relaxed mb-3">
            {spec.headline}, {spec.band}. The card carries the result, the tool and the link, and nothing else about you.
          </p>
          <button
            type="button"
            onClick={share}
            disabled={!ready || state === "busy"}
            className={`w-full inline-flex items-center justify-center gap-2 rounded-btn px-5 py-3.5 text-[15px] font-bold font-heading transition-all ${
              ready && state !== "busy"
                ? "bg-primary hover:bg-primary-dark text-white cursor-pointer hover:-translate-y-0.5"
                : "bg-section-alt text-text-muted cursor-not-allowed"
            }`}
          >
            {state === "busy" ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Preparing the card
              </>
            ) : (
              <>
                <Share2 size={18} /> Share my result
              </>
            )}
          </button>
        </div>
      </div>

      {state === "shared" && (
        <p className="mt-3 text-[13px] text-text-secondary leading-relaxed" role="status">
          Sent. Anyone who taps the link gets the same tool, free.
        </p>
      )}

      {state === "fallback" && (
        <div className="mt-4 pt-4 border-t border-border" role="status">
          <p className="text-[13px] text-text-secondary leading-relaxed mb-3">
            This browser cannot hand the image straight to another app, so it takes two taps: download the card, then
            open WhatsApp with the text ready and attach the image.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href={blobUrl || "#"}
              download={spec.fileName}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-btn border border-primary bg-card text-primary hover:bg-primary-bg px-4 py-3 text-[14px] font-bold font-heading no-underline transition-all"
            >
              <Download size={16} /> Download the card
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-btn bg-primary hover:bg-primary-dark text-white px-4 py-3 text-[14px] font-bold font-heading no-underline transition-all"
            >
              <MessageCircle size={16} /> Send on WhatsApp
            </a>
          </div>
        </div>
      )}

      {state === "error" && (
        <p className="mt-3 text-[13px] text-red-600 leading-relaxed" role="alert">
          The card could not be prepared just now. A screenshot of this page works too.
        </p>
      )}
    </div>
  );
}
