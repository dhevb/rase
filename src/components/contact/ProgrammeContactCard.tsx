"use client";

import Link from "next/link";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics/events";
import { phoneToWhatsAppHref } from "@/data/contact-hub";
import {
  telHref,
  type OfficialProgrammeContact,
} from "@/data/smk-6-official-contacts";

const actionClass =
  "inline-flex min-h-[40px] items-center justify-center rounded-lg border border-brand-navy/15 bg-white px-3 py-2 text-xs font-bold text-brand-navy transition hover:border-brand-saffron/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-saffron";

export default function ProgrammeContactCard({
  contact,
  compact = false,
}: {
  contact: OfficialProgrammeContact;
  compact?: boolean;
}) {
  const track = (eventName: (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS], extra?: string) => {
    trackEvent(eventName, { source: "smk-6-contacts", programme: contact.id, extra });
  };

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <h3 className="text-base font-bold text-brand-navy">{contact.programmeName}</h3>
      {contact.helpText ? <p className="mt-2 text-sm leading-relaxed text-slate-600">{contact.helpText}</p> : null}

      {contact.people.length > 0 ? (
        <ul className={`mt-3 space-y-2 ${compact ? "text-sm" : "text-sm"}`}>
          {contact.people.map((person) => (
            <li key={`${contact.id}-${person.name}-${person.phone ?? ""}`}>
              <p className="font-semibold text-brand-navy">{person.name}</p>
              {person.designation ? <p className="text-xs text-slate-600">{person.designation}</p> : null}
              {person.organisation ? <p className="text-xs text-slate-600">{person.organisation}</p> : null}
              {person.phone ? (
                <p className="mt-1 flex flex-wrap gap-2">
                  <a
                    href={telHref(person.phone)}
                    className="font-medium text-brand-navy underline"
                    onClick={() => track(ANALYTICS_EVENTS.programmeContactPhoneClicked, person.phone)}
                  >
                    {person.phone}
                  </a>
                  <a
                    href={phoneToWhatsAppHref(person.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-800 underline"
                    onClick={() => track(ANALYTICS_EVENTS.programmeContactWhatsappClicked, person.phone)}
                  >
                    WhatsApp
                    <span className="sr-only"> {person.name}</span>
                  </a>
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}

      {contact.email ? (
        <p className="mt-3 text-sm">
          <span className="sr-only">Email: </span>
          <a
            href={`mailto:${contact.email}`}
            className="font-semibold text-brand-navy underline"
            onClick={() => track(ANALYTICS_EVENTS.programmeContactEmailClicked, contact.email)}
          >
            {contact.email}
          </a>
        </p>
      ) : null}

      {contact.phone && !contact.people.some((person) => person.phone === contact.phone) ? (
        <p className="mt-2 flex flex-wrap gap-2 text-sm">
          <a
            href={telHref(contact.phone)}
            className="font-semibold text-brand-navy underline"
            onClick={() => track(ANALYTICS_EVENTS.programmeContactPhoneClicked, contact.phone)}
          >
            {contact.phone}
          </a>
          <a
            href={phoneToWhatsAppHref(contact.phone)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-emerald-800 underline"
            onClick={() => track(ANALYTICS_EVENTS.programmeContactWhatsappClicked, contact.phone)}
          >
            WhatsApp
          </a>
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        {contact.detailsUrl ? (
          <Link
            href={contact.detailsUrl}
            className={actionClass}
            onClick={() => track(ANALYTICS_EVENTS.programmeDetailsClicked)}
          >
            View programme details
          </Link>
        ) : null}
        {contact.registrationUrl ? (
          contact.registrationExternal ? (
            <a
              href={contact.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={actionClass}
            >
              Registration
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <Link href={contact.registrationUrl} className={actionClass}>
              Registration
            </Link>
          )
        ) : null}
      </div>
    </article>
  );
}
