import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import Smk6ResourceNav from "@/components/upcoming-events/Smk6ResourceNav";
import Smk6TrackedLink, { Smk6AboutLink } from "@/components/upcoming-events/Smk6TrackedLink";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { CANONICAL_ROUTES } from "@/constants/canonical-routes";
import { UPCOMING_EDITION } from "@/data/past-editions";
import {
  ABOUT_6TH_EDITION_HREF,
  SMK_6_EVENT_THEME,
  SMK_6_ORGANISING_IDENTITY,
  smk6HomepageProgrammeHighlights,
} from "@/data/smk-6-edition-hub";
import {
  SMK_6_CONCLAVE_REGISTRATION_HREF,
  SMK_6_EXTERNAL_REGISTRATIONS,
} from "@/data/smk-6-external-registrations";
import Smk6OfficialCover from "@/components/upcoming-events/Smk6OfficialCover";

export default function Smk6HomepagePreview() {
  const highlights = smk6HomepageProgrammeHighlights();

  return (
    <section
      id="about-6th-edition-preview"
      className="border-y border-brand-saffron/15 bg-brand-surface-warm/50 px-4 py-10 md:px-8 md:py-14"
      aria-labelledby="smk6-home-preview-heading"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          headingId="smk6-home-preview-heading"
          align="left"
          eyebrow="Shiksha Mahakumbh 6.0"
          title={`${UPCOMING_EDITION.title}`}
          description={`${UPCOMING_EDITION.dates} · ${UPCOMING_EDITION.venueFull}. ${SMK_6_EVENT_THEME.heading} — ${SMK_6_EVENT_THEME.english}. ${SMK_6_ORGANISING_IDENTITY.statement}`}
        />
        <div className="mb-8 max-w-sm">
          <Smk6OfficialCover />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <h3 className="text-sm font-bold text-brand-navy">{item.title}</h3>
              <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-slate-600">
                {item.description}
              </p>
              <Smk6TrackedLink
                href={item.href}
                className="mt-3 text-xs font-bold text-brand-navy underline decoration-brand-saffron/40 underline-offset-2"
                eventName={ANALYTICS_EVENTS.programmeDetailsClicked}
                programme={item.id}
              >
                For More Details
              </Smk6TrackedLink>
              {item.id === "conclaves" ? (
                <Smk6TrackedLink
                  href={SMK_6_CONCLAVE_REGISTRATION_HREF}
                  className="mt-2 text-xs font-bold text-brand-navy underline decoration-brand-saffron/40 underline-offset-2"
                  eventName={ANALYTICS_EVENTS.smk6ConclaveRegistrationClicked}
                  programme="conclave"
                >
                  Register for a conclave
                </Smk6TrackedLink>
              ) : null}
              {item.id === "patrika" ? (
                <Smk6TrackedLink
                  href={SMK_6_EXTERNAL_REGISTRATIONS.shodhankur.url}
                  className="mt-2 text-xs font-bold text-brand-navy underline decoration-brand-saffron/40 underline-offset-2"
                  eventName={ANALYTICS_EVENTS.smk6ShodhankurRegistrationClicked}
                  programme="patrika"
                  external
                >
                  Register Now
                </Smk6TrackedLink>
              ) : null}
              {item.id === "projects" ? (
                <Smk6TrackedLink
                  href={SMK_6_EXTERNAL_REGISTRATIONS.studentProjects.url}
                  className="mt-2 text-xs font-bold text-brand-navy underline decoration-brand-saffron/40 underline-offset-2"
                  eventName={ANALYTICS_EVENTS.smk6StudentProjectsRegistrationClicked}
                  programme="projects"
                  external
                >
                  Register Now
                </Smk6TrackedLink>
              ) : null}
            </article>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Smk6AboutLink
            href={ABOUT_6TH_EDITION_HREF}
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-brand-navy px-5 py-3 text-sm font-bold text-white"
          >
            Explore 6th Edition
          </Smk6AboutLink>
          <Smk6TrackedLink
            href={CANONICAL_ROUTES.registration}
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-brand-saffron px-5 py-3 text-sm font-bold text-brand-navy"
            eventName={ANALYTICS_EVENTS.registrationStarted}
          >
            Register Now
          </Smk6TrackedLink>
          <Smk6TrackedLink
            href={CANONICAL_ROUTES.departments.academicCouncil}
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-brand-navy/20 bg-white px-5 py-3 text-sm font-bold text-brand-navy"
            eventName={ANALYTICS_EVENTS.academicCouncilClicked}
          >
            Explore Programmes
          </Smk6TrackedLink>
        </div>
        <div className="mt-2">
          <p id="smk6-home-card-resources" className="sr-only">
            Edition 6.0 resources
          </p>
          <Smk6ResourceNav labelledBy="smk6-home-card-resources" />
        </div>
        <p className="mt-4 text-center text-sm text-slate-600">
          <Link href={CANONICAL_ROUTES.upcomingEvents} className="font-semibold text-brand-navy hover:underline">
            View all upcoming events →
          </Link>
        </p>
      </div>
    </section>
  );
}
