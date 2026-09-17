"use client";

import { ANALYTICS_EVENTS, trackEvent, type AnalyticsEventName } from "@/lib/analytics/events";
import { conclaves } from "@/components/vibhag/academic/academic-content-data";
import {
  SMK_6_CONCLAVE_FORMS,
  SMK_6_EXTERNAL_REGISTRATIONS,
  conclaveFormAnalyticsEvent,
} from "@/data/smk-6-external-registrations";
import ProgrammeSupportPanel from "@/components/contact/ProgrammeSupportPanel";
import { getOfficialContactByConclaveFormId } from "@/data/smk-6-official-contacts";
import { SMK_6_ANALYTICS_SOURCE } from "@/data/smk-6-edition-hub";

function conclaveDescription(title: string): string | undefined {
  const needle = title.toLowerCase();
  const match = conclaves.find((item) => {
    const name = item.title.toLowerCase();
    return name === needle || name.includes(needle) || needle.includes(name.split(" conclave")[0]);
  });
  return match?.focus;
}

export function Smk6ExternalFormButton({
  href,
  eventName,
  children,
  className,
}: {
  href: string;
  eventName: AnalyticsEventName;
  children: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-brand-saffron px-5 py-3 text-sm font-bold text-brand-navy shadow-md transition hover:bg-brand-saffron-dark hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy sm:w-auto"
      }
      onClick={() =>
        trackEvent(eventName, {
          source: SMK_6_ANALYTICS_SOURCE,
        })
      }
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function ConclaveExternalSelector() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-brand-navy md:text-xl">
          Conclave Registration
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Select the conclave you wish to participate in. Each Register Now button
          opens that conclave&apos;s official Google Form in a new tab.
        </p>
      </div>
      <div className="grid gap-4">
        {SMK_6_CONCLAVE_FORMS.map((form) => {
          const description = conclaveDescription(form.title);
          return (
            <article
              key={form.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5"
            >
              <h3 className="text-base font-bold text-brand-navy">{form.title}</h3>
              {description ? (
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
              ) : null}
              <div className="mt-4">
                <Smk6ExternalFormButton
                  href={form.url}
                  eventName={conclaveFormAnalyticsEvent(form.id)}
                >
                  Register Now
                </Smk6ExternalFormButton>
              </div>
              <div className="mt-4">
                <ProgrammeSupportPanel
                  contact={getOfficialContactByConclaveFormId(form.id)}
                  title="Need help with this conclave?"
                />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function GoogleFormRegistrationPanel({
  type,
}: {
  type: "Projects" | "Shodhankur";
}) {
  const entry =
    type === "Projects"
      ? SMK_6_EXTERNAL_REGISTRATIONS.studentProjects
      : SMK_6_EXTERNAL_REGISTRATIONS.shodhankur;
  const eventName =
    type === "Projects"
      ? ANALYTICS_EVENTS.smk6StudentProjectsRegistrationClicked
      : ANALYTICS_EVENTS.smk6ShodhankurRegistrationClicked;

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-brand-navy">{entry.title}</h2>
      <p className="text-sm text-slate-600">
        Applications for this Shiksha Mahakumbh 6.0 programme use the official Google Form. The
        form opens in a new tab.
      </p>
      <Smk6ExternalFormButton href={entry.url} eventName={eventName}>
        Register Now
      </Smk6ExternalFormButton>
    </div>
  );
}
