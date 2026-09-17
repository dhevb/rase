import Link from "next/link";
import Image from "next/image";
import BrochureDownloadLink from "@/components/analytics/BrochureDownloadLink";
import type { CommitteeEditionData } from "@/data/committee-members";
import { countCommitteeMembers } from "@/data/committee-members";
import { COMMITTEE_EDITION_6_0_ORGANIZERS } from "@/data/committee-members/edition-6-0";
import {
  getBrochureDownloadUrl,
  getCommitteeBrochure,
} from "@/data/committee-brochures";

interface CommitteeEditionHeaderProps {
  edition: CommitteeEditionData;
}

export default function CommitteeEditionHeader({ edition }: CommitteeEditionHeaderProps) {
  const memberCount = countCommitteeMembers(edition);
  const brochure = getCommitteeBrochure(edition.edition);
  const isEdition6 = edition.edition === "6.0";

  return (
    <>
    <header className="mb-10 overflow-hidden rounded-2xl border border-brand-saffron/20 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy text-white shadow-lg print:mb-4 print:rounded-none print:border-slate-300 print:shadow-none">
      <div className="p-5 md:p-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-saffron md:text-xs">
          Edition {edition.edition} · {edition.year}
        </p>
        <h1 className="mt-2 text-xl font-bold md:text-2xl">{edition.pageTitle}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/85 md:text-base">
          {edition.theme}
        </p>
        {isEdition6 ? (
          <p className="mt-3 max-w-3xl text-xs leading-relaxed text-white/75 md:text-sm">
            {COMMITTEE_EDITION_6_0_ORGANIZERS}
          </p>
        ) : null}
        <dl className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-white/70">
              Venue
            </dt>
            <dd className="mt-1 text-sm font-bold">{edition.venue}</dd>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-white/70">
              Dates
            </dt>
            <dd className="mt-1 text-sm font-bold">{edition.dates}</dd>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-white/70">
              Committee Members
            </dt>
            <dd className="mt-1 text-sm font-bold">{memberCount}+ leaders</dd>
          </div>
        </dl>
        <div className="mt-5 flex flex-wrap gap-3 print:hidden">
          {brochure ? (
            <BrochureDownloadLink
              href={getBrochureDownloadUrl(brochure)}
              plan={`committee-header-brochure-${edition.edition}`}
              className="inline-flex min-h-[44px] items-center rounded-xl bg-brand-saffron px-5 py-2.5 text-sm font-semibold text-brand-navy transition hover:bg-brand-saffron-dark hover:text-white"
            >
              Download Brochure
              <span className="ml-1 text-xs font-normal opacity-80">({brochure.fileSize})</span>
            </BrochureDownloadLink>
          ) : null}
          <Link
            href={edition.eventHref}
            className="inline-flex min-h-[44px] items-center rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            View Edition Details
          </Link>
          <Link
            href="/committees"
            className="inline-flex min-h-[44px] items-center rounded-xl border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            All Editions
          </Link>
        </div>
      </div>
    </header>
    {edition.posterSrc ? (
      <figure className="-mt-4 mb-10 overflow-hidden rounded-2xl border border-brand-saffron/20 bg-white shadow-md print:mt-4">
        <Image
          src={edition.posterSrc}
          alt={edition.posterAlt ?? `${edition.pageTitle} organising committee`}
          width={1600}
          height={1200}
          className="h-auto w-full"
          sizes="(max-width: 1024px) 100vw, 960px"
          priority={isEdition6}
        />
        <figcaption className="sr-only">
          {edition.posterAlt ?? `${edition.pageTitle} organising committee`}
        </figcaption>
      </figure>
    ) : null}
    </>
  );
}
