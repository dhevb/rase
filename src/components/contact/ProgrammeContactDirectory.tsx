"use client";

import { useMemo, useState } from "react";
import ProgrammeContactCard from "@/components/contact/ProgrammeContactCard";
import {
  OFFICIAL_CONTACT_GROUPS,
  SMK_6_PROGRAMME_CONTACTS_HASH,
  searchOfficialContacts,
  type OfficialContactGroupId,
} from "@/data/smk-6-official-contacts";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics/events";

const chip =
  "inline-flex min-h-[40px] shrink-0 items-center justify-center rounded-full border px-3 py-2 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-saffron";

export default function ProgrammeContactDirectory() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<OfficialContactGroupId | "all">("all");

  const items = useMemo(() => searchOfficialContacts(query, group), [query, group]);

  return (
    <section
      id={SMK_6_PROGRAMME_CONTACTS_HASH}
      aria-labelledby="programme-contacts-heading"
      className="scroll-mt-28"
    >
      <h2 id="programme-contacts-heading" className="text-lg font-bold text-brand-navy md:text-xl">
        Need help with a specific programme?
      </h2>
      <p className="mt-2 max-w-3xl text-sm text-slate-600">
        Select a programme to see the official public contact for that enquiry. Empty fields are
        omitted — they were not provided in the official 6.0 contact list.
      </p>

      <label className="mt-5 block">
        <span className="sr-only">Search programme contacts</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search programme, person, or email"
          className="min-h-[48px] w-full rounded-xl border border-slate-200 px-4 text-sm focus:border-brand-saffron focus:outline-none focus:ring-1 focus:ring-brand-saffron"
        />
      </label>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Contact categories">
        {OFFICIAL_CONTACT_GROUPS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`${chip} ${
              group === item.id
                ? "border-brand-navy bg-brand-navy text-white"
                : "border-slate-200 bg-white text-brand-navy"
            }`}
            aria-pressed={group === item.id}
            onClick={() => {
              setGroup(item.id);
              trackEvent(ANALYTICS_EVENTS.programmeContactOpened, {
                source: "smk-6-contacts",
                filter: item.id,
              });
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <p className="mt-2 text-sm text-slate-600" aria-live="polite">
        {items.length} contact{items.length === 1 ? "" : "s"}
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {items.map((contact) => (
          <ProgrammeContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </section>
  );
}
