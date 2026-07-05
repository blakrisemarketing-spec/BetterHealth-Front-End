import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets the scroll position whenever the route changes, so every new page
 * opens at the top instead of inheriting the scroll position of the page the
 * user navigated from.
 *
 * If the destination URL carries a hash (e.g. a deep link to /page#section),
 * we scroll to that element instead of the top. Same-page anchor links
 * (<a href="#...">) don't change the pathname, so they keep their native
 * browser behaviour and are unaffected.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    // `behavior: "instant"` overrides the global `scroll-behavior: smooth`, so a
    // new page snaps to the top instead of visibly scrolling up from the old
    // page's position.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
