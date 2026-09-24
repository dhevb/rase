"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { RegistrationType } from "@/types/registration";
import {
  CMT_SUBMIT_PATH,
  isExternalRedirectType,
} from "@/lib/registration/config";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics/events";
import {
  SMK_6_DELEGATE_REGISTRATION_HREF,
  SMK_6_EXTERNAL_REGISTRATIONS,
  SMK_6_PROGRAMME_TRACKS_HREF,
  isSmk6ConclaveSelectorType,
  isSmk6GoogleFormRegistrationType,
} from "@/data/smk-6-external-registrations";
import {
  getCategoryFeeBadge,
  type FeeBadgeTone,
} from "@/lib/registration/categoryMeta";
import {
  ConclaveExternalSelector,
  Smk6ExternalFormButton,
} from "@/components/registration/Smk6ExternalRegistrationPanels";
import ProgrammeSupportPanel from "@/components/contact/ProgrammeSupportPanel";
import { REGISTRATION_DEADLINE } from "@/data/registration-hub";

const BADGE_STYLES: Record<FeeBadgeTone, string> = {
  free: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  paid: "bg-amber-50 text-amber-900 ring-amber-200",
  external: "bg-violet-50 text-violet-800 ring-violet-200",
  variable: "bg-slate-100 text-slate-700 ring-slate-200",
};

interface CategoryStepProps {
  value: RegistrationType;
  detailsSelected: boolean;
  onContinue: () => void;
}

function Badge({ type }: { type: RegistrationType }) {
  const badge = getCategoryFeeBadge(type);
  return (
    <span
      className={`inline-flex shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1 ${BADGE_STYLES[badge.tone]}`}
    >
      {badge.label}
    </span>
  );
}

function OptionFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export default function CategoryStep({
  value,
  detailsSelected,
  onContinue,
}: CategoryStepProps) {
  const showDetailsContinue =
    detailsSelected &&
    !isExternalRedirectType(value) &&
    !isSmk6GoogleFormRegistrationType(value) &&
    !isSmk6ConclaveSelectorType(value);

  return (
    <div className="space-y-8">
      <p className="text-sm text-slate-600">
        Choose a registration path below. Research authors use the{" "}
        <a
          href={CMT_SUBMIT_PATH}
          className="font-semibold text-brand-saffron underline"
        >
          paper submission (CMT)
        </a>{" "}
        notice. Shodhankur, Student Projects, and each conclave open their official
        Google Form directly. Applicable registrations close on {REGISTRATION_DEADLINE}.
      </p>

      <section
        id="registered-participant-accommodation"
        className="scroll-mt-24"
        aria-labelledby="reg-group-accommodation"
      >
        <div className="mb-3">
          <h3 id="reg-group-accommodation" className="text-sm font-bold text-brand-navy">
            Registered Participant Accommodation
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            For participants who have completed (or will complete) SMK 6.0 registration
          </p>
        </div>
        <OptionFrame className="border-brand-saffron/35 bg-gradient-to-br from-brand-saffron/5 to-white">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <span className="text-sm font-bold text-brand-navy">
              {SMK_6_EXTERNAL_REGISTRATIONS.accommodation.shortTitle}
            </span>
            <Badge type="Accommodation" />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Accommodation arrangements are available for{" "}
            <strong className="font-semibold text-brand-navy">registered participants</strong>{" "}
            subject to the applicable event accommodation process. Complete your Shiksha
            Mahakumbh 6.0 registration by{" "}
            <strong className="font-semibold text-brand-navy">{REGISTRATION_DEADLINE}</strong>{" "}
            to be considered for accommodation, then submit the official form.
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-brand-saffron-dark">
            Important deadline: {REGISTRATION_DEADLINE}
          </p>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-slate-700">
            <li>Complete Shiksha Mahakumbh 6.0 registration.</li>
            <li>
              Submit the{" "}
              <span className="font-semibold">
                {SMK_6_EXTERNAL_REGISTRATIONS.accommodation.title}
              </span>
              .
            </li>
            <li>
              Accommodation arrangements are processed according to the official event
              accommodation process.
            </li>
          </ol>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={SMK_6_DELEGATE_REGISTRATION_HREF}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border-2 border-brand-navy/20 bg-white px-5 py-3 text-sm font-bold text-brand-navy transition hover:border-brand-saffron/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
            >
              Register for Shiksha Mahakumbh 6.0
            </Link>
            <Smk6ExternalFormButton
              href={SMK_6_EXTERNAL_REGISTRATIONS.accommodation.url}
              eventName={ANALYTICS_EVENTS.smk6AccommodationFormClicked}
            >
              Apply for Registered Participant Accommodation
            </Smk6ExternalFormButton>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Form label: {SMK_6_EXTERNAL_REGISTRATIONS.accommodation.title}. Opens in a new
            tab. Accommodation is not guaranteed unless confirmed under the official process.
          </p>
          <div className="mt-4">
            <ProgrammeSupportPanel
              contactId="accommodation"
              title="Accommodation support"
            />
          </div>
        </OptionFrame>
      </section>

      <section aria-labelledby="reg-group-research">
        <div className="mb-3">
          <h3 id="reg-group-research" className="text-sm font-bold text-brand-navy">
            Research papers
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Multi Track Conference — on-site notice, then Microsoft CMT
          </p>
        </div>
        <Link
          href={CMT_SUBMIT_PATH}
          className="block w-full min-h-[44px] rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-brand-navy/30 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <span className="text-sm font-bold text-brand-navy">
              Multi Track Conference
            </span>
            <Badge type="Multi Track Conference" />
          </div>
          <span className="mt-1 block text-xs text-slate-500">
            Opens Microsoft CMT submission portal
          </span>
          <span className="mt-1 block text-xs font-semibold text-brand-saffron">
            → External submission (on-site notice first)
          </span>
        </Link>
        <div className="mt-3">
          <ProgrammeSupportPanel
            contactId="multi-track-conference"
            title="Need help with Multi-Track Conference?"
          />
        </div>
      </section>

      <section aria-labelledby="reg-group-programme-tracks">
        <div className="mb-3">
          <h3
            id="reg-group-programme-tracks"
            className="text-sm font-bold text-brand-navy"
          >
            Programme tracks
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Academic Council programmes — not paper submission and not conclave forms
          </p>
        </div>
        <Link
          href={SMK_6_PROGRAMME_TRACKS_HREF}
          className="block min-h-[44px] rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-brand-navy/30 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
          onClick={() =>
            trackEvent(ANALYTICS_EVENTS.programmeDetailsClicked, {
              source: "smk-6",
              programme: "programme-tracks",
            })
          }
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <span className="text-sm font-bold text-brand-navy">Programme tracks</span>
            <span className="inline-flex shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-700 ring-1 ring-slate-200">
              Academic Council
            </span>
          </div>
          <span className="mt-1 block text-xs text-slate-500">
            Explore the existing Academic Council programme architecture
          </span>
        </Link>
      </section>

      <section aria-labelledby="reg-group-shodhankur">
        <div className="mb-3">
          <h3 id="reg-group-shodhankur" className="text-sm font-bold text-brand-navy">
            Shodhankur – छात्र शोध पत्रिका
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Official Google Form — opens in a new tab
          </p>
        </div>
        <OptionFrame>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <span className="text-sm font-bold text-brand-navy">
              {SMK_6_EXTERNAL_REGISTRATIONS.shodhankur.title}
            </span>
            <Badge type="Shodhankur" />
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Official Shodhankur student research journal form
          </p>
          <div className="mt-4">
            <Smk6ExternalFormButton
              href={SMK_6_EXTERNAL_REGISTRATIONS.shodhankur.url}
              eventName={ANALYTICS_EVENTS.smk6ShodhankurRegistrationClicked}
            >
              Register / Apply Now
            </Smk6ExternalFormButton>
          </div>
          <div className="mt-4">
            <ProgrammeSupportPanel contactId="shodhankur" title="Need help with Shodhankur?" />
          </div>
        </OptionFrame>
      </section>

      <section aria-labelledby="reg-group-projects">
        <div className="mb-3">
          <h3 id="reg-group-projects" className="text-sm font-bold text-brand-navy">
            Student Projects
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Official Google Form — opens in a new tab
          </p>
        </div>
        <OptionFrame>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <span className="text-sm font-bold text-brand-navy">Student Projects</span>
            <Badge type="Projects" />
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Official Google Form for school, college, and university student projects
          </p>
          <div className="mt-4">
            <Smk6ExternalFormButton
              href={SMK_6_EXTERNAL_REGISTRATIONS.studentProjects.url}
              eventName={ANALYTICS_EVENTS.smk6StudentProjectsRegistrationClicked}
            >
              Register / Apply Now
            </Smk6ExternalFormButton>
          </div>
          <div className="mt-4">
            <ProgrammeSupportPanel contactId="student-projects" title="Need help with Student Projects?" />
          </div>
        </OptionFrame>
      </section>

      <section
        id="conclave-registration"
        className="scroll-mt-24"
        aria-labelledby="reg-group-conclaves"
      >
        <ConclaveExternalSelector />
      </section>

      <section
        id="delegate-registration"
        className="scroll-mt-24"
        aria-labelledby="reg-group-delegate"
      >
        <div className="mb-3">
          <h3 id="reg-group-delegate" className="text-sm font-bold text-brand-navy">
            Delegate Registration
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Faculty, researchers, and institutional delegates — on-site form and payment
          </p>
        </div>
        <Link
          href={SMK_6_DELEGATE_REGISTRATION_HREF}
          className="block w-full min-h-[44px] rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-brand-navy/30 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <span className="text-sm font-bold text-brand-navy">
              Delegate Registration
            </span>
            <Badge type="Delegate Registration" />
          </div>
          <span className="mt-1 block text-xs text-slate-500">
            Faculty, researchers, and institutional delegates
          </span>
          <span className="mt-2 block text-xs font-semibold text-brand-saffron">
            Continue to the on-site registration form
          </span>
        </Link>
      </section>

      {showDetailsContinue ? (
        <button
          type="button"
          onClick={onContinue}
          className="w-full min-h-[48px] rounded-xl bg-brand-saffron font-bold text-brand-navy shadow-lg transition hover:bg-brand-saffron-dark hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy sm:w-auto sm:px-10"
        >
          Continue to details →
        </button>
      ) : null}
    </div>
  );
}
