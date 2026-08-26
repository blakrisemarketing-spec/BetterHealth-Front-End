import { createContext, useContext } from "react";

// The context object and its hook live apart from the provider component on
// purpose. React Fast Refresh can only preserve state for a module that
// exports components exclusively; mixing a component and a hook in one file
// makes every edit to either remount the tree. Provider: WaitlistContext.jsx.
export const WaitlistContext = createContext(null);

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) throw new Error("useWaitlist must be used within WaitlistProvider");
  return ctx;
}
