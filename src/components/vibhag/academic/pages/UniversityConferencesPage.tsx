"use client";

import {
  ACPage,
  ACHero,
  ACSection,
  ACCard,
  ACGlassPanel,
  ACFooterStatement,
  SectionCTA,
  ACContactBlock,
} from "../AcademicCouncilUI";
import {
  UNIVERSITY_CONFERENCES,
  UNIVERSITY_CONFERENCES_INTRO,
  type UniversityConferenceEntry,
} from "@/data/university-conferences-series";

function StatusBadge({ status }: { status: UniversityConferenceEntry["status"] }) {
  if (status === "open") {
    return (
      <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-emerald-800">
        Registration open
      </span>
    );
  }
  return (
    <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-amber-900">
      Coming soon
    </span>
  );
}

function ConferenceCard({ entry }: { entry: UniversityConferenceEntry }) {
  const isOpen = entry.status === "open";

  return (
    <ACCard
      className={`${isOpen ? "border-brand-saffron/30 ring-1 ring-brand-saffron/15" : "border-slate-200 opacity-95"}`}
      hover={isOpen}
    >
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div>
          {entry.acronym ? (
            <p className="text-xs font-bold uppercase tracking-wider text-brand-saffron-dark">
              {entry.acronym}
            </p>
          ) : null}
          <h3 className="text-lg font-bold text-brand-navy md:text-xl">{entry.title}</h3>
        </div>
        <StatusBadge status={entry.status} />
      </div>

      <dl className="mb-4 grid gap-2 text-sm text-gray-700 md:grid-cols-2">
        <div>
          <dt className="font-semibold text-brand-navy">Host</dt>
          <dd>{entry.hostInstitution}</dd>
        </div>
        <div>
          <dt className="font-semibold text-brand-navy">Venue</dt>
          <dd>{entry.location}</dd>
        </div>
        <div>
          <dt className="font-semibold text-brand-navy">Dates</dt>
          <dd>{entry.dates}</dd>
        </div>
        <div>
          <dt className="font-semibold text-brand-navy">Mode</dt>
          <dd>{entry.mode}</dd>
        </div>
      </dl>

      <p className="text-sm leading-relaxed text-gray-700 md:text-base">{entry.description}</p>

      {entry.topics && entry.topics.length > 0 ? (
        <div className="mt-4">
          <p className="mb-2 text-sm font-semibold text-brand-navy">Topics include</p>
          <ul className="grid gap-1 sm:grid-cols-2">
            {entry.topics.slice(0, 10).map((topic) => (
              <li key={topic} className="text-sm text-gray-600 before:mr-2 before:text-brand-saffron before:content-['•']">
                {topic}
              </li>
            ))}
          </ul>
          {entry.topics.length > 10 ? (
            <p className="mt-0.5 text-xs text-gray-500">+ {entry.topics.length - 10} more themes in brochure</p>
          ) : null}
        </div>
      ) : null}

      {entry.deadlines && entry.deadlines.length > 0 ? (
        <div className="mt-4 rounded-xl border border-brand-navy/10 bg-brand-surface/80 p-3">
          <p className="mb-2 text-sm font-semibold text-brand-navy">Important dates</p>
          <ul className="space-y-1 text-sm text-gray-700">
            {entry.deadlines.map((d) => (
              <li key={d.label} className="flex justify-between gap-2">
                <span>{d.label}</span>
                <span className="font-medium text-brand-navy">{d.date}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {entry.fees && entry.fees.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {entry.fees.map((fee) => (
            <span
              key={fee.category}
              className="rounded-lg border border-brand-saffron/20 bg-white px-3 py-1.5 text-xs font-medium text-gray-700"
            >
              {fee.category}: <strong className="text-brand-navy">{fee.amount}</strong>
            </span>
          ))}
        </div>
      ) : null}

      {entry.organizers && entry.organizers.length > 0 ? (
        <div className="mt-4 text-sm text-gray-600">
          <p className="font-semibold text-brand-navy">Organizing team</p>
          <ul className="mt-1 list-inside list-disc">
            {entry.organizers.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {(entry.contactEmail || entry.contactPhone) && (
        <p className="mt-4 text-sm text-gray-700">
          {entry.contactEmail ? (
            <>
              Email:{" "}
              <a
                href={`mailto:${entry.contactEmail}`}
                className="font-semibold text-brand-blue underline-offset-2 hover:underline"
              >
                {entry.contactEmail}
              </a>
            </>
          ) : null}
          {entry.contactPhone ? (
            <span className={entry.contactEmail ? " ml-3" : ""}>
              Phone: {entry.contactPhone}
            </span>
          ) : null}
        </p>
      )}

      {isOpen && (entry.brochureHref || entry.registrationHref || entry.websiteHref) ? (
        <div className="mt-5 flex flex-wrap gap-3">
          {entry.brochureHref ? (
            <a
              href={entry.brochureHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-xl bg-brand-navy px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-navy-light"
            >
              Download brochure (PDF)
            </a>
          ) : null}
          {entry.registrationHref ? (
            <a
              href={entry.registrationHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-xl bg-brand-saffron px-4 py-2 text-sm font-bold text-brand-navy transition hover:bg-brand-saffron-dark hover:text-white"
            >
              Register / submit abstract
            </a>
          ) : null}
          {entry.websiteHref ? (
            <a
              href={entry.websiteHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-xl border-2 border-brand-navy/20 px-4 py-2 text-sm font-bold text-brand-navy transition hover:border-brand-saffron/40"
            >
              Host institution website
            </a>
          ) : null}
        </div>
      ) : null}
    </ACCard>
  );
}

export default function UniversityConferencesPage() {
  const openConferences = UNIVERSITY_CONFERENCES.filter((c) => c.status === "open");
  const upcoming = UNIVERSITY_CONFERENCES.filter((c) => c.status === "coming_soon");

  return (
    <ACPage>
      <ACHero
        title={UNIVERSITY_CONFERENCES_INTRO.titleEn}
        subtitle={
          <>
            <span className="block font-devanagari text-brand-navy/80">
              {UNIVERSITY_CONFERENCES_INTRO.titleHi}
            </span>
            {UNIVERSITY_CONFERENCES_INTRO.subtitle}
          </>
        }
      />

      <ACSection title="About this programme">
        <ACGlassPanel>
          <p className="text-base leading-relaxed text-gray-700 md:text-lg md:leading-8">
            {UNIVERSITY_CONFERENCES_INTRO.note}
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-700 md:text-lg md:leading-8">
            Before and between Shiksha Mahakumbh main editions, DHE collaborates with state
            universities, deemed universities, and colleges across India to host conferences on
            diverse academic themes — building year-round research dialogue and institutional
            partnerships.
          </p>
        </ACGlassPanel>
      </ACSection>

      {openConferences.length > 0 ? (
        <ACSection title="Confirmed conferences">
          <div className="space-y-6">
            {openConferences.map((entry) => (
              <ConferenceCard key={entry.id} entry={entry} />
            ))}
          </div>
        </ACSection>
      ) : null}

      {upcoming.length > 0 ? (
        <ACSection title="Coming soon in this series">
          <p className="mb-4 text-sm text-gray-600 md:text-base">
            Additional partner-institution conferences are being finalised. Brochures and
            registration links will appear here as they are announced.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {upcoming.map((entry) => (
              <ConferenceCard key={entry.id} entry={entry} />
            ))}
          </div>
        </ACSection>
      ) : null}

      <ACSection title="Need help?">
        <ACContactBlock programmeId="conference-series" />
      </ACSection>

      <ACFooterStatement title="Academic umbrella of Shiksha Mahakumbh">
        Each conference in this series is independently organized at the host institution, with
        academic coordination and branding support from the Department of Holistic Education under
        Shiksha Mahakumbh Abhiyan.
      </ACFooterStatement>

      <SectionCTA
        title="Looking for the main Mahakumbh research conference?"
        buttonText="Multi-Track Conference (SMK 6.0)"
        href="/departments/academic-council#multi-track-conference"
      />
    </ACPage>
  );
}
