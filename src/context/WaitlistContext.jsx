import { useState, useCallback } from "react";
import { WaitlistContext } from "./waitlist-context";

// Exports exactly one component, and nothing else, so Fast Refresh can hot-swap
// it without remounting. The context object and the useWaitlist hook live in
// waitlist-context.js.
export function WaitlistProvider({ children }) {
  const [submitted, setSubmitted] = useState(false);

  const markSubmitted = useCallback(() => setSubmitted(true), []);

  return (
    <WaitlistContext.Provider value={{ submitted, markSubmitted }}>
      {children}
    </WaitlistContext.Provider>
  );
}
