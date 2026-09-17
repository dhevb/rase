"use client";

import {
  ACPage,
  ACHero,
  ACSection,
  ACCard,
  ACGlassPanel,
  SectionCTA,
  ACFooterStatement,
  ACContactBlock,
} from "../AcademicCouncilUI";
import {
  ACADEMIC_ACCEPTANCE_NOTIFICATION,
  ACADEMIC_BEST_PAPER_NOTE,
  ACADEMIC_CONFERENCE_LEADERSHIP,
  ACADEMIC_FINAL_MANUSCRIPT_DEADLINE,
  ACADEMIC_PAPER_SUBMISSION_WEBSITE,
  ACADEMIC_PUBLICATION_NOTE,
} from "@/data/academic-council-tracks";
import { CMT_SUBMIT_PATH, CMT_SUBMISSION_URL, cmtSubmissionDateLabel } from "@/lib/registration/config";
import { REGISTRATION_DEADLINE } from "@/data/registration-hub";
import { tracks } from "../tracks-data";

export default function ConferencePage() {
  return (
    <ACPage>
      <ACHero title="Multi-Track Conference – Shiksha Mahakumbh 6.0" />

      <ACSection title="Overview">
        <ACGlassPanel>
          <p className="text-base leading-relaxed text-gray-700 md:text-lg md:leading-8">
            Shiksha Mahakumbh 6.0 (6th Edition) will host a Hybrid Multi-Track International
            Conference, bringing together researchers, academicians, industry experts, and scholars
            to present original research, participate in plenary talks, workshops, and engage in
            cross-disciplinary dialogue aligned with Viksit Bharat 2047.
          </p>
        </ACGlassPanel>
      </ACSection>

      <ACSection title="Overall Conference Coordination">
        <ACGlassPanel>
          <p className="mb-4 text-sm leading-relaxed text-gray-600 md:text-base">
            The leadership below coordinates the conference as a whole. Each of the 16 tracks has
            its own Track Coordinators — listed in the Conference Tracks section.
          </p>
          <div className="space-y-6 text-sm text-gray-700 md:text-base">
            <div>
              <h3 className="mb-2 text-lg font-bold text-brand-navy md:text-xl">Chair</h3>
              <p>{ACADEMIC_CONFERENCE_LEADERSHIP.chair}</p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-bold text-brand-navy md:text-xl">Co-Chairs</h3>
              <ul className="list-disc space-y-1 pl-5">
                {ACADEMIC_CONFERENCE_LEADERSHIP.coChairs.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-bold text-brand-navy md:text-xl">Conveners</h3>
              <ul className="list-disc space-y-1 pl-5">
                {ACADEMIC_CONFERENCE_LEADERSHIP.conveners.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          </div>
        </ACGlassPanel>
      </ACSection>

      <ACSection title="Submission via Microsoft CMT">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <ACCard>
            <p className="mb-2 text-sm text-gray-500">Review</p>
            <p className="text-lg font-bold md:text-xl">Abstract · double-blind peer review</p>
          </ACCard>
          <ACCard>
            <p className="mb-2 text-sm text-gray-500">Similarity Index</p>
            <p className="text-lg font-bold md:text-xl">Within acceptable limits</p>
          </ACCard>
          <ACCard>
            <p className="mb-2 text-sm text-gray-500">Format</p>
            <p className="text-lg font-bold md:text-xl">PDF submission via CMT Portal</p>
          </ACCard>
        </div>
        <p className="mt-4 text-sm text-brand-navy">
          All abstracts and full-length papers are submitted through the{" "}
          <a
            href={CMT_SUBMISSION_URL}
            className="font-semibold underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Multi Track Conference (CMT) portal
          </a>
          .
        </p>
      </ACSection>

      <ACSection title="Important Dates">
        <div className="grid gap-3 md:grid-cols-2">
          <ACCard>CMT submissions: {cmtSubmissionDateLabel()}</ACCard>
          <ACCard>Acceptance Notification: {ACADEMIC_ACCEPTANCE_NOTIFICATION}</ACCard>
          <ACCard>Final manuscript deadline: {ACADEMIC_FINAL_MANUSCRIPT_DEADLINE}</ACCard>
          <ACCard>Conference registration deadline: {REGISTRATION_DEADLINE}</ACCard>
        </div>
      </ACSection>

      <ACSection title="Conference Tracks">
        <div className="space-y-4">
          {tracks.map((track, index) => (
            <ACCard key={index}>
              <h3 className="mb-1 text-lg font-bold text-brand-navy md:text-xl">
                {index + 1}. {track.title}
              </h3>
              <p className="mb-3 font-devanagari text-sm text-gray-600 md:text-base">
                {track.titleHi}
              </p>
              <ul className="mb-4 list-disc space-y-1 pl-5 text-sm leading-relaxed text-gray-700 md:text-base">
                {track.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
              <div className="space-y-1 text-sm text-gray-700 md:text-base">
                <p className="font-semibold">Track Coordinators</p>
                <ul className="list-disc space-y-1 pl-5 break-words">
                  {track.coordinators.map((name, coordIndex) => (
                    <li key={`${track.title}-${coordIndex}`}>{name}</li>
                  ))}
                </ul>
              </div>
            </ACCard>
          ))}
        </div>
      </ACSection>

      <ACSection title="Registration Fees">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <ACCard>Students (UG/PG/PhD): ₹500</ACCard>
          <ACCard>Research Scholars: ₹1,000</ACCard>
          <ACCard>Academia & R&D: ₹2,100</ACCard>
          <ACCard>Industry: ₹5,000</ACCard>
          <ACCard>International Delegates: Free (with DHE Membership)</ACCard>
        </div>
        <div className="mt-4 space-y-2 text-sm text-gray-700 md:text-base">
          <p>Includes Lunch, Kit & Certificate (one author)</p>
          <p>Additional Author: ₹500</p>
        </div>
      </ACSection>

      <ACSection title="Publication & Review">
        <ACGlassPanel className="border-brand-navy/10 bg-gradient-to-br from-brand-navy/5 to-white">
          <div className="space-y-3 text-base text-gray-700 md:text-lg">
            <p>{ACADEMIC_PUBLICATION_NOTE}</p>
          </div>
        </ACGlassPanel>
      </ACSection>

      <ACSection title="Awards">
        <ACCard
          hover={false}
          className="border-brand-saffron/30 bg-gradient-to-r from-brand-saffron to-brand-saffron-dark text-center text-brand-navy"
        >
          <p className="text-xl font-bold md:text-2xl">{ACADEMIC_BEST_PAPER_NOTE}</p>
        </ACCard>
      </ACSection>

      <ACSection title="Submission">
        <div className="space-y-2 text-base text-gray-700 md:text-lg">
          <p>
            Paper submission website: {ACADEMIC_PAPER_SUBMISSION_WEBSITE} — abstracts and
            full-length papers are submitted through the{" "}
            <a
              href={CMT_SUBMISSION_URL}
              className="font-semibold underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft CMT portal
            </a>
            .
          </p>
          <p>Delegate registration for Shiksha Mahakumbh 6.0 is separate from paper submission.</p>
        </div>
      </ACSection>

      <ACSection title="Need help?">
        <ACContactBlock programmeId="multi-track-conference" />
      </ACSection>

      <ACFooterStatement title="Advancing Research to Impact">
        This conference aims to transform ideas into innovation and research into real-world
        impact, fostering collaboration across disciplines for a future-ready Bharat.
      </ACFooterStatement>

      <SectionCTA
        title="Submit your research paper"
        buttonText="Submit via CMT"
        href={CMT_SUBMIT_PATH}
      />
    </ACPage>
  );
}
