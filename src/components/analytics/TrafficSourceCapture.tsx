"use client";

import { useEffect } from "react";
import { captureTrafficSource } from "@/lib/analytics/events";
import { captureAttribution } from "@/lib/analytics/attribution";
import {
  COOKIE_ACCEPTED_EVENT,
  COOKIE_WITHDRAWN_EVENT,
  hasAnalyticsConsent,
} from "@/lib/cookie-consent";

export default function TrafficSourceCapture() {
  useEffect(() => {
    // First-party attribution for registration ops — not gated on marketing consent.
    captureAttribution();

    const runMarketing = () => {
      if (!hasAnalyticsConsent()) return;
      captureTrafficSource();
      captureAttribution();
    };

    runMarketing();
    window.addEventListener(COOKIE_ACCEPTED_EVENT, runMarketing);
    window.addEventListener(COOKIE_WITHDRAWN_EVENT, runMarketing);
    return () => {
      window.removeEventListener(COOKIE_ACCEPTED_EVENT, runMarketing);
      window.removeEventListener(COOKIE_WITHDRAWN_EVENT, runMarketing);
    };
  }, []);
  return null;
}
