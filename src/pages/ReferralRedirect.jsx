import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { captureReferralFromUrl } from "../lib/partner-signup";

/**
 * Vanity referral routes:
 *   /ref/:code           → captures code, redirects to /for-doctors (default)
 *   /ref/:code/doctors   → captures code, redirects to /for-doctors
 *   /ref/:code/labs      → captures code, redirects to /for-labs
 *   /ref/:code/nutritionists → captures code, redirects to /for-nutritionists
 *
 * Examples:
 *   betterhealth.africa/ref/DR-AMA-001
 *   betterhealth.africa/ref/Miracle/labs
 */

const TARGETS = {
  doctors: "/for-doctors",
  labs: "/for-labs",
  nutritionists: "/for-nutritionists",
};

export default function ReferralRedirect() {
  const { code, partnerType } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      captureReferralFromUrl(`?ref=${encodeURIComponent(code)}`);
    }
    const target = TARGETS[partnerType] || "/for-doctors";
    navigate(target, { replace: true });
  }, [code, partnerType, navigate]);

  return null;
}
