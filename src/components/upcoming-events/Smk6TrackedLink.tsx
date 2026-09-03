"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  ANALYTICS_EVENTS,
  trackEvent,
  type AnalyticsEventName,
} from "@/lib/analytics/events";
import { SMK_6_ANALYTICS_SOURCE } from "@/data/smk-6-edition-hub";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  eventName: AnalyticsEventName;
  programme?: string;
  external?: boolean;
};

export default function Smk6TrackedLink({
  href,
  children,
  className,
  eventName,
  programme,
  external,
}: Props) {
  const payload = {
    source: SMK_6_ANALYTICS_SOURCE,
    ...(programme ? { programme } : {}),
  };

  if (external) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent(eventName, payload)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={() => trackEvent(eventName, payload)}>
      {children}
    </Link>
  );
}

export function Smk6AboutLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Smk6TrackedLink
      href={href}
      className={className}
      eventName={ANALYTICS_EVENTS.about6thEditionClicked}
    >
      {children}
    </Smk6TrackedLink>
  );
}
