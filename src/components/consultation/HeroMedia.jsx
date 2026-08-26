import { Play } from "lucide-react";
import { useState } from "react";

/**
 * Hero slot for the campaign pages: the promo video once there is one, the
 * poster frame on its own until then.
 *
 * The Vimeo iframe is NOT rendered until the visitor presses play — a facade of
 * poster + button sits there instead. This is the same reasoning that had the
 * self-hosted version on `preload="none"`, and it matters more with an embed,
 * not less: a mounted Vimeo iframe pulls ~700KB of player before anyone has
 * decided to watch, on a page opened from an ad on Ghanaian mobile data. It also
 * keeps Vimeo's cookies off the page for everyone who never plays.
 *
 * `dnt=1` asks Vimeo not to track the session at all. Keep it: the page carries
 * a GDPC certification claim and a privacy policy, and a silent third-party
 * tracker in the hero is exactly the kind of thing that makes both untrue.
 *
 * No caption card over or under the frame. The promo videos burn in their own
 * lower third and ticker, so anything the page adds there competes with the
 * video's own furniture. The written-plan promise lives in HERO_CHECKS instead.
 */
export default function HeroMedia({ vimeoId, poster, alt }) {
  const [playing, setPlaying] = useState(false);
  const hasVideo = Boolean(vimeoId);

  const src =
    `https://player.vimeo.com/video/${vimeoId}` +
    "?autoplay=1&title=0&byline=0&portrait=0&dnt=1&playsinline=1";

  return (
    <figure className="mt-2 lg:mt-0">
      <div className="relative aspect-video overflow-hidden rounded-card bg-text-primary shadow-[0_24px_70px_rgba(43,58,58,0.16)]">
        {hasVideo && playing ? (
          <iframe
            src={src}
            title={alt}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <>
            <img
              src={poster}
              alt={alt}
              width={1200}
              height={675}
              loading="eager"
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
            {hasVideo && (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play the video"
                className="group absolute inset-0 flex cursor-pointer items-center justify-center border-none bg-text-primary/20 transition-colors hover:bg-text-primary/30"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform group-hover:scale-105">
                  {/* Nudged right so the triangle looks centred in the circle. */}
                  <Play size={24} className="ml-1 fill-primary text-primary" />
                </span>
              </button>
            )}
          </>
        )}
      </div>
    </figure>
  );
}
