"use client";

import {
  ACPage,
  ACHero,
  ACSection,
  ACCard,
  ACGlassPanel,
  ACFooterStatement,
} from "../AcademicCouncilUI";
import {
  SMK_6_PANEL_DISCUSSION_OFFICIAL,
  SMK_6_PANEL_DISCUSSIONS,
} from "../academic-content-data";
import ConclavePosterPreview from "../ConclavePosterPreview";

export default function PanelDiscussionPage() {
  const coordinator = SMK_6_PANEL_DISCUSSION_OFFICIAL.coordinator;

  return (
    <ACPage>
      <ACHero
        title="Panel Discussion – Shiksha Mahakumbh 6.0"
        subtitle={
          <p>
            {SMK_6_PANEL_DISCUSSION_OFFICIAL.editionLine}. Three official sessions at{" "}
            {SMK_6_PANEL_DISCUSSION_OFFICIAL.venue}, each {SMK_6_PANEL_DISCUSSION_OFFICIAL.time}.
          </p>
        }
      />

      <ACSection title="Overview">
        <ACGlassPanel>
          <p className="text-base leading-relaxed text-gray-700 md:text-lg md:leading-8">
            Official Panel Discussion posters for Shiksha Mahakumbh 2026 list three morning
            sessions at NIT Hamirpur. Each poster names the session topic, date, time, venue,
            esteemed panelists, moderator, and coordinator.
          </p>
          <p className="mt-4 text-sm text-gray-700 md:text-base">
            <span className="font-semibold text-brand-navy">Venue:</span>{" "}
            {SMK_6_PANEL_DISCUSSION_OFFICIAL.venue}
          </p>
          <p className="mt-1 text-sm text-gray-700 md:text-base">
            <span className="font-semibold text-brand-navy">Time (each session):</span>{" "}
            {SMK_6_PANEL_DISCUSSION_OFFICIAL.time}
          </p>
          <p className="mt-1 text-sm text-gray-700 md:text-base">
            <span className="font-semibold text-brand-navy">समन्वयक:</span> {coordinator.nameHi}{" "}
            {coordinator.phone}
          </p>
        </ACGlassPanel>
      </ACSection>

      <ACSection title="Official sessions">
        <div className="space-y-4">
          {SMK_6_PANEL_DISCUSSIONS.map((session) => (
            <ACCard key={session.id}>
              <h3 className="font-devanagari mb-2 text-lg font-bold text-brand-navy md:text-xl">
                {session.title}
              </h3>
              <p className="text-sm text-gray-700 md:text-base">
                <span className="font-semibold text-brand-navy">Date:</span> {session.date}
              </p>
              <p className="mt-1 text-sm text-gray-700 md:text-base">
                <span className="font-semibold text-brand-navy">Time:</span> {session.time}
              </p>
              <p className="mt-1 text-sm text-gray-700 md:text-base">
                <span className="font-semibold text-brand-navy">Venue:</span> {session.venue}
              </p>
              <p className="mt-2 text-sm text-gray-700 md:text-base">
                <span className="font-semibold text-brand-navy">Moderator:</span>{" "}
                {session.moderator.name}, {session.moderator.designation}
              </p>
              <div className="mt-3">
                <p className="text-sm font-semibold text-brand-navy">Esteemed panelists</p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-gray-700">
                  {session.panelists.map((panelist) => (
                    <li key={panelist.name}>
                      {panelist.name} — {panelist.designation}
                    </li>
                  ))}
                </ul>
              </div>
              <ConclavePosterPreview poster={session.poster} title={session.title} />
            </ACCard>
          ))}
        </div>
      </ACSection>

      <ACFooterStatement title="Panel Discussion">
        Panel Discussion is a distinct Shiksha Mahakumbh 6.0 programme. It is not a conclave,
        multi-track conference track, or a separate registration category on the official posters.
      </ACFooterStatement>
    </ACPage>
  );
}
