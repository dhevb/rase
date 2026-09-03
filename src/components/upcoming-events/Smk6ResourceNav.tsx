"use client";

import BrochureDownloadLink from "@/components/analytics/BrochureDownloadLink";
import Smk6TrackedLink, { Smk6AboutLink } from "@/components/upcoming-events/Smk6TrackedLink";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { CANONICAL_ROUTES } from "@/constants/canonical-routes";
import { ABOUT_6TH_EDITION_HREF, SMK_6_ANALYTICS_SOURCE } from "@/data/smk-6-edition-hub";
import { committeePathForEdition } from "@/lib/committee/edition-slugs";
import { getBrochureDownloadUrl, getCommitteeBrochure } from "@/data/committee-brochures";

const chipClass =
  "inline-flex min-h-[40px] items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-brand-navy transition hover:border-brand-saffron/40 hover:bg-brand-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-saffron";

const aboutChipClass =
  "inline-flex min-h-[40px] items-center justify-center rounded-lg border border-brand-saffron/50 bg-brand-saffron/15 px-3 py-1.5 text-xs font-bold text-brand-navy transition hover:bg-brand-saffron hover:text-brand-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-saffron";

export default function Smk6ResourceNav({
  labelledBy,
}: {
  labelledBy?: string;
}) {
  const brochure = getCommitteeBrochure("6.0");
  const brochureHref = brochure
    ? getBrochureDownloadUrl(brochure)
    : `${CANONICAL_ROUTES.downloads}#edition-brochures`;

  return (
    <nav
      aria-label={labelledBy ? undefined : "Shiksha Mahakumbh 6.0 resources"}
      aria-labelledby={labelledBy}
      className="mt-4 flex flex-wrap gap-2"
    >
      <Smk6AboutLink href={ABOUT_6TH_EDITION_HREF} className={aboutChipClass}>
        About 6th Edition
      </Smk6AboutLink>
      {brochureHref ? (
        <BrochureDownloadLink href={brochureHref} plan={SMK_6_ANALYTICS_SOURCE} className={chipClass}>
          Edition 6.0 brochure
        </BrochureDownloadLink>
      ) : null}
      <Smk6TrackedLink
        href={committeePathForEdition("6.0")}
        className={chipClass}
        eventName={ANALYTICS_EVENTS.committeeClicked}
      >
        Organising committee
      </Smk6TrackedLink>
      <Smk6TrackedLink
        href={CANONICAL_ROUTES.departments.academicCouncil}
        className={chipClass}
        eventName={ANALYTICS_EVENTS.academicCouncilClicked}
      >
        Academic Council
      </Smk6TrackedLink>
    </nav>
  );
}
