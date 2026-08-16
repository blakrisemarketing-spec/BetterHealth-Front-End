import Reveal from "../ui/Reveal";

/**
 * Reveal, retuned for the paid-campaign pages.
 *
 * Two changes from the site default: a faster fade, and a hard cap on the
 * stagger. The site's 0.7s reveal with a quarter-second stagger reads as
 * considered on a marketing page somebody chose to visit; on a 12,000px landing
 * page that a reader flicks through at speed, the same settings mean whole
 * screens of blank cream where the copy that was paid for should be.
 *
 * Props pass through, so an individual caller can still opt out of the cap.
 */
export default function Fade({ delay = 0, ...rest }) {
  return <Reveal duration={0.45} delay={Math.min(delay, 0.16)} {...rest} />;
}
