import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { captureReferralFromUrl } from "../lib/partner-signup";

/**
 * Vanity referral route: /ref/:code
 *
 * Captures the referral code from the URL path, stores it in sessionStorage
 * (via captureReferralFromUrl), then redirects to the homepage.
 *
 * This lets doctors share clean links like:
 *   betterhealth.africa/ref/DR-AMA-001
 *   betterhealth.africa/ref/Miracle
 *
 * The code persists for the session — if the visitor later navigates to
 * /for-doctors or /for-labs and submits the partner form, the referral
 * code is silently included in the submission.
 */
export default function ReferralRedirect() {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      // Synthesise a query string so captureReferralFromUrl can parse it
      captureReferralFromUrl(`?ref=${encodeURIComponent(code)}`);
    }
    navigate("/", { replace: true });
  }, [code, navigate]);

  return null;
}
