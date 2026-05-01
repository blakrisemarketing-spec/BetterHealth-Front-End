import { createContext, useContext, useState, useCallback } from "react";

const WaitlistContext = createContext();

export function WaitlistProvider({ children }) {
  const [submitted, setSubmitted] = useState(false);

  const markSubmitted = useCallback(() => setSubmitted(true), []);

  return (
    <WaitlistContext.Provider value={{ submitted, markSubmitted }}>
      {children}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) throw new Error("useWaitlist must be used within WaitlistProvider");
  return ctx;
}
