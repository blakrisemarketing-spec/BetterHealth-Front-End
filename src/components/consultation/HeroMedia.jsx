import { Play } from "lucide-react";
import { useState } from "react";

/**
 * Hero slot for the campaign pages: the promo video once there is one, the
 * poster frame on its own until then.
 *
 * `preload="none"` is deliberate and load-bearing. This page is opened from a
 * Meta ad on Ghanaian mobile data, and a hero video that starts buffering on
 * load spends the visitor's megabytes before they have decided anything — and
 * pushes out the LCP paint that decides whether they stay. Nothing is fetched
 * until the play button is pressed; the poster is an ordinary image and carries
 * the hero on its own.
 *
 * Autoplay is deliberately not used for the same reason, and because a promo
 * with a voiceover autoplays muted, which is the worst of both.
 */
export default function HeroMedia({ video, poster, alt, caption }) {
  const [playing, setPlaying] = useState(false);
  const hasVideo = Boolean(video?.src);

  return (
    <figure className="relative mt-2 lg:mt-0">
      <div className="relative overflow-hidden rounded-card shadow-[0_24px_70px_rgba(43,58,58,0.16)]">
        {hasVideo && playing ? (
          <video
            src={video.src}
            poster={poster}
            controls
            autoPlay
            playsInline
            preload="none"
            className="aspect-video w-full bg-text-primary object-cover"
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
              className="aspect-video w-full object-cover"
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

      {caption && (
        <figcaption className="absolute -bottom-4 left-4 right-4 rounded-card border border-border bg-card/95 px-4 py-3 shadow-card backdrop-blur sm:left-6 sm:right-auto sm:max-w-[300px]">
          <p className="text-[13px] leading-snug text-text-secondary">{caption}</p>
        </figcaption>
      )}
    </figure>
  );
}
