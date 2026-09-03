import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import SpeakerCard from "@/components/ui/SpeakerCard";
import BrochureDownloadLink from "@/components/analytics/BrochureDownloadLink";
import Smk6TrackedLink from "@/components/upcoming-events/Smk6TrackedLink";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { CANONICAL_ROUTES } from "@/constants/canonical-routes";
import { NIT_VENUE_CONTACT } from "@/config/organization";
import { NIT_HAMIRPUR_MAP_LINK } from "@/config/venue-maps";
import { UPCOMING_EVENTS_FAQ } from "@/data/upcoming-events-hub";
import { getBrochureViewUrl, getCommitteeBrochure } from "@/data/committee-brochures";
import { getCategoryFeeBadge, getCategoryMeta } from "@/lib/registration/categoryMeta";
import { CMT_SUBMIT_PATH } from "@/lib/registration/config";
import type { CmsSpeakerCard } from "@/lib/cms/types";
import {
  ABOUT_6TH_EDITION_HASH,
  SMK_6_ANALYTICS_SOURCE,
  SMK_6_EVENT_THEME,
  SMK_6_OVERVIEW,
  SMK_6_REGISTRATION_TYPES,
  SMK_6_RESEARCH_HREF,
  SMK_6_VENUE_PAGE_HREF,
  groupSmk6Dignitaries,
  smk6CommitteePreview,
  smk6ConclaveCards,
  smk6ConferenceTracks,
  smk6ProgrammeCards,
  smk6RelatedConferences,
} from "@/data/smk-6-edition-hub";
import { committeePathForEdition } from "@/lib/committee/edition-slugs";

const cardClass =
  "flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5";

const detailsClass =
  "mt-auto inline-flex min-h-[40px] items-center justify-center rounded-lg border border-brand-navy/15 bg-brand-surface px-3 py-2 text-xs font-bold text-brand-navy transition hover:border-brand-saffron/40 hover:bg-brand-surface-warm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-saffron";

type Props = {
  speakers: CmsSpeakerCard[];
};

export default function Smk6EditionDetail({ speakers }: Props) {
  const programmes = smk6ProgrammeCards();
  const conclaveCards = smk6ConclaveCards();
  const tracks = smk6ConferenceTracks();
  const related = smk6RelatedConferences();
  const committee = smk6CommitteePreview();
  const dignitaries = groupSmk6Dignitaries(speakers);
  const brochure = getCommitteeBrochure("6.0");
  const brochureHref = brochure
    ? getBrochureViewUrl(brochure)
    : `${CANONICAL_ROUTES.downloads}#edition-brochures`;
  const academicHref = CANONICAL_ROUTES.departments.academicCouncil;
  const registerHref = CANONICAL_ROUTES.registration;

  return (
    <div
      id={ABOUT_6TH_EDITION_HASH}
      className="scroll-mt-28 border-t border-brand-saffron/20 bg-brand-surface-warm/40"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <header className="rounded-2xl border border-brand-saffron/30 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-saffron-dark">
            About 6th Edition
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-brand-navy md:text-4xl">
            {SMK_6_OVERVIEW.title}
          </h2>
          <p className="mt-2 text-base font-semibold text-brand-navy md:text-lg">
            {SMK_6_OVERVIEW.dates} · {SMK_6_OVERVIEW.venueFull}
          </p>
          <p className="mt-1 text-sm text-slate-600">{SMK_6_OVERVIEW.location}</p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-700 md:text-base">
            {SMK_6_OVERVIEW.tagline}. {SMK_6_OVERVIEW.subtitle}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Smk6TrackedLink
              href={registerHref}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-brand-saffron px-6 py-3 text-sm font-bold text-brand-navy shadow-md transition hover:bg-brand-saffron-dark hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-saffron"
              eventName={ANALYTICS_EVENTS.registrationStarted}
            >
              Register Now
            </Smk6TrackedLink>
            <Smk6TrackedLink
              href={academicHref}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-brand-navy px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-brand-navy-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-saffron"
              eventName={ANALYTICS_EVENTS.academicCouncilClicked}
            >
              Explore All Programmes
            </Smk6TrackedLink>
            <BrochureDownloadLink
              href={brochureHref}
              plan={SMK_6_ANALYTICS_SOURCE}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-brand-navy/20 bg-white px-6 py-3 text-sm font-bold text-brand-navy transition hover:border-brand-saffron focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-saffron"
            >
              Download 6.0 Brochure
            </BrochureDownloadLink>
          </div>
        </header>

        <section className="mt-12" aria-labelledby="smk6-overview-heading">
          <SectionHeader
            align="left"
            eyebrow="Event overview"
            title="A national academic movement"
            description="Shiksha Mahakumbh Abhiyan brings together academicians, scientists, innovators, industry leaders, policymakers, teachers, students, researchers, social organisations, and community institutions."
          />
          <div className="space-y-4 text-sm leading-relaxed text-slate-700 md:text-base">
            {SMK_6_OVERVIEW.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {SMK_6_OVERVIEW.objectives.map((objective) => (
              <li
                key={objective.number}
                className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700"
              >
                <span className="font-bold text-brand-navy">{objective.title}.</span>{" "}
                {objective.desc}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <SectionHeader
            align="left"
            eyebrow="Edition theme"
            title={SMK_6_EVENT_THEME.heading}
            description={SMK_6_EVENT_THEME.note}
          />
        </section>

        <section className="mt-12" aria-labelledby="smk6-programmes-heading">
          <SectionHeader
            align="left"
            eyebrow="What’s happening"
            title="What’s Happening at Shiksha Mahakumbh 6.0"
            description="Programme names and routes come from the Academic Council hub — tap For More Details for the live programme page."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {programmes.map((programme) => (
              <article key={programme.id} className={cardClass}>
                <h3 className="text-base font-bold text-brand-navy md:text-lg">{programme.title}</h3>
                {programme.titleHi ? (
                  <p className="mt-0.5 font-devanagari text-sm text-slate-500">{programme.titleHi}</p>
                ) : null}
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {programme.description}
                </p>
                {programme.items.length > 0 ? (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-slate-600">
                    {programme.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                <Smk6TrackedLink
                  href={programme.href}
                  className={`${detailsClass} mt-4`}
                  eventName={ANALYTICS_EVENTS.programmeDetailsClicked}
                  programme={programme.id}
                >
                  For More Details
                </Smk6TrackedLink>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="smk6-conclaves-heading">
          <SectionHeader
            align="left"
            eyebrow="Dialogue platforms"
            title="Conclaves"
            description="Thematic high-impact sessions as published on the Academic Council conclave programme."
          />
          <div className="grid gap-4">
            {conclaveCards.map((conclave) => (
              <article key={conclave.title} className={cardClass}>
                <h3 className="text-base font-bold text-brand-navy md:text-lg">{conclave.title}</h3>
                <dl className="mt-3 space-y-2 text-sm text-slate-700">
                  <div>
                    <dt className="font-semibold text-brand-navy">Participants</dt>
                    <dd>{conclave.participants}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-brand-navy">Focus</dt>
                    <dd>{conclave.focus}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-brand-navy">Output</dt>
                    <dd>{conclave.output}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-brand-navy">Conclave theme</dt>
                    <dd>{conclave.theme}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-brand-navy">Coordinators</dt>
                    <dd>{conclave.coordinators}</dd>
                  </div>
                </dl>
                <Smk6TrackedLink
                  href={conclave.href}
                  className={`${detailsClass} mt-4 self-start`}
                  eventName={ANALYTICS_EVENTS.programmeDetailsClicked}
                  programme="conclave"
                >
                  For More Details
                </Smk6TrackedLink>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="smk6-tracks-heading">
          <SectionHeader
            align="left"
            eyebrow="Research"
            title="Multi-Track Conference"
            description="The live Academic Council roster lists 15 peer-reviewed tracks at NIT Hamirpur. Paper submission uses the existing CMT pathway."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {tracks.map((track) => (
              <article key={track.title} className={cardClass}>
                <h3 className="text-base font-bold text-brand-navy">{track.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{track.description}</p>
                <p className="mt-3 text-xs text-slate-600">
                  <span className="font-semibold text-brand-navy">Chair:</span> {track.chair}
                </p>
                <p className="text-xs text-slate-600">
                  <span className="font-semibold text-brand-navy">Co-chair:</span> {track.coChair}
                </p>
                <p className="text-xs text-slate-600">
                  <span className="font-semibold text-brand-navy">Convenor:</span> {track.convenor}
                </p>
                <Smk6TrackedLink
                  href={track.href}
                  className={`${detailsClass} mt-4`}
                  eventName={ANALYTICS_EVENTS.programmeDetailsClicked}
                  programme="multi-track-conference"
                >
                  For More Details
                </Smk6TrackedLink>
              </article>
            ))}
          </div>
          <Smk6TrackedLink
            href={SMK_6_RESEARCH_HREF}
            className="mt-4 inline-flex min-h-[44px] items-center text-sm font-bold text-brand-navy underline decoration-brand-saffron/40 underline-offset-2"
            eventName={ANALYTICS_EVENTS.programmeDetailsClicked}
            programme="cmt"
          >
            Submit a paper (CMT) →
          </Smk6TrackedLink>
        </section>

        <section className="mt-12" aria-labelledby="smk6-related-heading">
          <SectionHeader
            align="left"
            eyebrow="Related conferences"
            title="International / special conferences"
            description="Partner-institution conferences under the Shiksha Mahakumbh Abhiyan umbrella. They are not held at NIT Hamirpur."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {related.map((conf) => (
              <article key={conf.id} className={cardClass}>
                <h3 className="text-base font-bold text-brand-navy">{conf.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{conf.description}</p>
                <dl className="mt-3 space-y-1 text-sm text-slate-700">
                  <div>
                    <dt className="inline font-semibold text-brand-navy">Dates: </dt>
                    <dd className="inline">{conf.dates}</dd>
                  </div>
                  <div>
                    <dt className="inline font-semibold text-brand-navy">Mode: </dt>
                    <dd className="inline">{conf.mode}</dd>
                  </div>
                  <div>
                    <dt className="inline font-semibold text-brand-navy">Host: </dt>
                    <dd className="inline">{conf.host}</dd>
                  </div>
                </dl>
                <Smk6TrackedLink
                  href={conf.href}
                  className={`${detailsClass} mt-4`}
                  eventName={ANALYTICS_EVENTS.programmeDetailsClicked}
                  programme={conf.id}
                >
                  For More Details
                </Smk6TrackedLink>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="smk6-dignitaries-heading">
          <SectionHeader
            align="left"
            eyebrow="Dignitaries"
            title="Chief Guest, guests, and keynotes"
            description="Only published CMS SpeakerProfile records for edition 6.0 are shown. Past-edition speakers are not listed here."
          />
          <div className="space-y-8">
            {dignitaries.map((group) => (
              <div key={group.id}>
                <h3 className="text-lg font-bold text-brand-navy">{group.heading}</h3>
                {group.speakers.length === 0 ? (
                  <p className="mt-2 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm text-slate-600">
                    {group.emptyLabel}
                  </p>
                ) : (
                  <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {group.speakers.map((speaker) => (
                      <li key={speaker.id}>
                        <SpeakerCard
                          name={speaker.fullName}
                          role={[speaker.designation, speaker.institution].filter(Boolean).join(" · ")}
                          imageSrc={speaker.photoUrl ?? undefined}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="smk6-committee-heading">
          <SectionHeader
            align="left"
            eyebrow="Leadership"
            title="Organising Committee & Secretariat"
            description="Preview from the existing edition 6.0 committee record. Full membership remains on the committee page."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {committee.sections.map((section) => (
              <article key={section.title} className={cardClass}>
                <h3 className="text-sm font-bold uppercase tracking-wide text-brand-saffron-dark">
                  {section.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {section.members.map((member) => (
                    <li key={`${member.name}-${member.designation}`}>
                      <p className="font-semibold text-brand-navy">{member.name}</p>
                      <p className="text-xs text-slate-600">{member.designation}</p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <Smk6TrackedLink
            href={committee.href}
            className="mt-5 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-brand-navy px-6 py-3 text-sm font-bold text-white"
            eventName={ANALYTICS_EVENTS.committeeClicked}
          >
            View Complete Organising Committee
          </Smk6TrackedLink>
        </section>

        <section className="mt-12" aria-labelledby="smk6-registration-heading">
          <SectionHeader
            align="left"
            eyebrow="Participate"
            title="Registration"
            description="All categories use the existing unified registration portal. Fees below are the live category badges from the registration system."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SMK_6_REGISTRATION_TYPES.map((type) => {
              const badge = getCategoryFeeBadge(type);
              const meta = getCategoryMeta(type);
              const href =
                type === "Multi Track Conference" ? CMT_SUBMIT_PATH : registerHref;
              return (
                <Smk6TrackedLink
                  key={type}
                  href={href}
                  className={cardClass}
                  eventName={ANALYTICS_EVENTS.registrationStarted}
                  programme={type}
                >
                  <span className="flex items-start justify-between gap-2">
                    <span className="text-sm font-bold text-brand-navy">{type}</span>
                    <span className="shrink-0 rounded-full bg-brand-saffron/15 px-2 py-0.5 text-[10px] font-bold text-brand-saffron-dark">
                      {badge.label}
                    </span>
                  </span>
                  <span className="mt-2 text-xs leading-relaxed text-slate-600">
                    {meta.description}
                  </span>
                </Smk6TrackedLink>
              );
            })}
          </div>
          <Smk6TrackedLink
            href={registerHref}
            className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-brand-saffron px-6 py-3 text-sm font-bold text-brand-navy shadow-md sm:w-auto"
            eventName={ANALYTICS_EVENTS.registrationStarted}
          >
            Register Now
          </Smk6TrackedLink>
        </section>

        <section className="mt-12" aria-labelledby="smk6-venue-heading">
          <SectionHeader
            align="left"
            eyebrow="Campus"
            title="Venue"
            description={`${NIT_VENUE_CONTACT.venue} · ${NIT_VENUE_CONTACT.eventDates}`}
          />
          <p className="text-sm text-slate-700">
            {NIT_VENUE_CONTACT.label}. Email{" "}
            <a className="font-semibold text-brand-navy underline" href={`mailto:${NIT_VENUE_CONTACT.email}`}>
              {NIT_VENUE_CONTACT.email}
            </a>
            {NIT_VENUE_CONTACT.phones[0] ? (
              <>
                {" "}
                · {NIT_VENUE_CONTACT.phones[0]}
              </>
            ) : null}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={SMK_6_VENUE_PAGE_HREF}
              className="inline-flex min-h-[44px] items-center rounded-xl border border-brand-navy/20 bg-white px-4 py-2 text-sm font-bold text-brand-navy"
            >
              About NIT Hamirpur
            </Link>
            <a
              href={NIT_HAMIRPUR_MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-xl border border-brand-navy/20 bg-white px-4 py-2 text-sm font-bold text-brand-navy"
            >
              Open map
            </a>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="smk6-faq-heading">
          <SectionHeader align="left" eyebrow="FAQ" title="Frequently asked questions" />
          <dl className="space-y-3">
            {UPCOMING_EVENTS_FAQ.map((item) => (
              <div key={item.question} className="rounded-xl border border-slate-200 bg-white p-4">
                <dt className="font-bold text-brand-navy">{item.question}</dt>
                <dd className="mt-2 text-sm text-slate-600">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          className="mt-12 rounded-2xl border border-brand-navy/10 bg-gradient-to-r from-slate-50 to-amber-50/50 p-6 md:p-8"
          aria-labelledby="smk6-final-cta"
        >
          <h2 id="smk6-final-cta" className="text-lg font-bold text-brand-navy md:text-xl">
            Join Shiksha Mahakumbh 6.0
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 md:text-base">
            Register on the official portal, explore Academic Council programmes, or download the
            edition brochure.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Smk6TrackedLink
              href={registerHref}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-brand-saffron px-6 py-3 text-sm font-bold text-brand-navy"
              eventName={ANALYTICS_EVENTS.registrationStarted}
            >
              Register Now
            </Smk6TrackedLink>
            <Smk6TrackedLink
              href={academicHref}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-brand-navy px-6 py-3 text-sm font-bold text-white"
              eventName={ANALYTICS_EVENTS.academicCouncilClicked}
            >
              Explore All Programmes
            </Smk6TrackedLink>
            <Smk6TrackedLink
              href={committeePathForEdition("6.0")}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-brand-navy/20 bg-white px-6 py-3 text-sm font-bold text-brand-navy"
              eventName={ANALYTICS_EVENTS.committeeClicked}
            >
              Organising Committee
            </Smk6TrackedLink>
          </div>
        </section>
      </div>
    </div>
  );
}
