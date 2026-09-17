"use client";

import Link from "next/link";
import {
  CMT_SUBMISSION_URL,
  cmtSubmissionDateLabel,
} from "@/lib/registration/config";
import { CtaButton } from "@/components/ui";
import {
  ACADEMIC_ACCEPTANCE_NOTIFICATION,
  ACADEMIC_FINAL_MANUSCRIPT_DEADLINE,
  ACADEMIC_PUBLICATION_NOTE,
} from "@/data/academic-council-tracks";
import { academicCouncilProgrammeUrl } from "@/data/academic-council-hub";
import { REGISTRATION_DEADLINE } from "@/data/registration-hub";
import ProgrammeSupportPanel from "@/components/contact/ProgrammeSupportPanel";

const CONFERENCE_DETAILS_HREF = academicCouncilProgrammeUrl("ConferencePage");

export default function CmtSubmitInterstitial() {
  const statusLabel = cmtSubmissionDateLabel();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:py-14">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
        <div className="bg-gradient-to-r from-brand-navy to-brand-navy-light px-6 py-8 text-white md:px-10">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-saffron">
            Research submission
          </p>
          <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">
            Multi Track Conference — Microsoft CMT
          </h2>
          <p className="mt-2 text-sm text-white/85">
            Shiksha Mahakumbh 6.0 · SMK2026 · {statusLabel}
          </p>
        </div>

        <div className="space-y-5 p-6 md:p-10 text-sm text-slate-700">
          <p>
            Paper and abstract submissions for the Shiksha Mahakumbh 6.0 Multi Track
            International Conference are managed on{" "}
            <strong>Microsoft Conference Management Toolkit (CMT)</strong> — an external
            platform operated by Microsoft Research, not on rase.co.in.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Abstracts undergo double-blind peer review before acceptance.</li>
            <li>Submit a PDF through the CMT portal. Similarity index must stay within acceptable limits.</li>
            <li>You will sign in with a Microsoft or CMT account on the next screen.</li>
            <li>Review the 16 tracks and formatting notes on the Academic Council Multi-Track Conference page first.</li>
            <li>Delegate registration for Shiksha Mahakumbh 6.0 is separate from paper submission.</li>
          </ul>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-bold text-brand-navy">Important dates</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Conference registration deadline: {REGISTRATION_DEADLINE}</li>
              <li>Acceptance notification: {ACADEMIC_ACCEPTANCE_NOTIFICATION}</li>
              <li>Final manuscript deadline: {ACADEMIC_FINAL_MANUSCRIPT_DEADLINE}</li>
              <li>CMT portal: {statusLabel}</li>
            </ul>
          </div>

          <p>{ACADEMIC_PUBLICATION_NOTE}</p>

          <div className="flex flex-wrap gap-3 pt-2">
            <CtaButton href={CMT_SUBMISSION_URL} variant="primary" external>
              Continue to Microsoft CMT →
            </CtaButton>
            <CtaButton href={CONFERENCE_DETAILS_HREF} variant="secondary">
              Conference details
            </CtaButton>
            <Link
              href="/proceedings"
              className="inline-flex min-h-[44px] items-center px-4 text-sm font-semibold text-brand-navy underline"
            >
              Past proceedings
            </Link>
          </div>

          <ProgrammeSupportPanel
            contactId="multi-track-conference"
            title="Need help with Multi-Track Conference?"
          />

          <p className="text-xs text-slate-500">
            Destination:{" "}
            <a
              href={CMT_SUBMISSION_URL}
              className="break-all underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {CMT_SUBMISSION_URL}
            </a>
            {" · "}
            Returning from CMT?{" "}
            <Link href="/" className="font-semibold text-brand-navy underline">
              Back to rase.co.in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
