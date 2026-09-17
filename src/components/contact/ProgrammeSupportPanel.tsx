"use client";

import { useEffect } from "react";
import ProgrammeContactCard from "@/components/contact/ProgrammeContactCard";
import { getOfficialContactById, type OfficialProgrammeContact } from "@/data/smk-6-official-contacts";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics/events";

export default function ProgrammeSupportPanel({
  contactId,
  contact,
  title = "Need help?",
}: {
  contactId?: string;
  contact?: OfficialProgrammeContact;
  title?: string;
}) {
  const resolved = contact ?? (contactId ? getOfficialContactById(contactId) : undefined);
  const item = resolved ?? getOfficialContactById("general-enquiry");

  useEffect(() => {
    if (!item) return;
    trackEvent(ANALYTICS_EVENTS.programmeContactOpened, {
      source: "smk-6-contacts",
      programme: item.id,
    });
  }, [item]);

  if (!item) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold uppercase tracking-wider text-brand-navy">{title}</h3>
      <ProgrammeContactCard contact={item} compact />
    </div>
  );
}
