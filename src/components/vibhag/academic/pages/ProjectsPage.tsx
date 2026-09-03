"use client";

import { useState } from "react";
import {
  ACPage,
  ACHero,
  ACSection,
  ACCard,
  ACGlassPanel,
  ACTimelineStep,
  SectionCTA,
  ACFooterStatement,
  REG_LINKS,
} from "../AcademicCouncilUI";
import { ProjectExpoDivisionBlock } from "../ProjectExpoThemeList";
import {
  COMPETITION_STAGES,
  EVALUATION_CRITERIA,
  MENTORSHIP_STRUCTURE,
  PRE_EVENT_SELECTION,
  PROJECT_EXPO_DIVISIONS,
  PROJECT_EXPO_PDF,
  PROJECT_EXPO_SUBTITLE,
  PROJECT_EXPO_TITLE,
  PROJECT_EXPO_VISION,
  SUBMISSION_REQUIREMENTS,
  TEAM_COMPOSITION,
  type ProjectExpoDivisionId,
} from "@/data/student-projects-expo";

const DIVISION_TABS: { id: ProjectExpoDivisionId; label: string }[] = [
  { id: "A", label: "Division A (VI–VIII)" },
  { id: "B", label: "Division B (IX–XII)" },
  { id: "C", label: "Division C (UG)" },
  { id: "D", label: "Division D (PG / Ph.D.)" },
];

export default function ProjectsPage() {
  const [activeDivision, setActiveDivision] = useState<ProjectExpoDivisionId>("A");
  const division = PROJECT_EXPO_DIVISIONS.find((d) => d.id === activeDivision)!;

  return (
    <ACPage>
      <ACHero
        title={PROJECT_EXPO_TITLE}
        subtitle={
          <p>
            {PROJECT_EXPO_SUBTITLE} Aligned with{" "}
            <span className="font-semibold">NEP 2020</span> and{" "}
            <span className="font-semibold">Viksit Bharat 2047</span>.
          </p>
        }
      />

      <ACSection title="Overview">
        <ACGlassPanel>
          {PROJECT_EXPO_VISION.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="mb-4 text-base leading-relaxed text-gray-700 last:mb-0 md:text-lg md:leading-8"
            >
              {paragraph}
            </p>
          ))}
          <p className="mt-4 text-sm text-gray-700 md:text-base">
            <span className="font-semibold text-brand-navy">Chair:</span> Dr. Narinder Singh Jassal,
            CSIR-CSIO, Chandigarh
          </p>
          <p className="mt-1 text-sm text-gray-700 md:text-base">
            <span className="font-semibold text-brand-navy">Co-Chairs:</span> Dr. Krishna Pandey,
            Kurukshetra University; Sh. Bikash Kumar, COO, SavantX Technology
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={PROJECT_EXPO_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-xl bg-brand-navy px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-navy-light"
            >
              Download full framework (PDF)
            </a>
            <a
              href={REG_LINKS.general}
              className="inline-flex min-h-[44px] items-center rounded-xl bg-brand-saffron px-5 py-2.5 text-sm font-bold text-brand-navy transition hover:bg-brand-saffron-dark hover:text-white"
            >
              Register for Projects
            </a>
          </div>
        </ACGlassPanel>
      </ACSection>

      <ACSection title="Participation divisions">
        <div className="grid gap-4 md:grid-cols-2">
          {PROJECT_EXPO_DIVISIONS.map((d) => (
            <ACCard key={d.id} className="border-l-4 border-l-brand-saffron">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-saffron-dark">
                Division {d.id}
              </p>
              <h3 className="text-base font-bold text-brand-navy md:text-lg">{d.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{d.eligibility}</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">{d.scope}</p>
              <p className="mt-2 text-xs font-medium text-brand-navy">
                {d.themes.length} themes · Team size: {TEAM_COMPOSITION[d.id].teamSize}
              </p>
            </ACCard>
          ))}
        </div>
      </ACSection>

      <ACSection title="Themes & problem statements" id="themes">
        <p className="-mt-2 mb-4 text-sm text-gray-600 md:text-base">
          Select a division to browse theme codes, focus areas, expectations, and ten suggested
          problem statements per theme.
        </p>
        <div
          className="mb-4 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Project expo divisions"
        >
          {DIVISION_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeDivision === tab.id}
              onClick={() => setActiveDivision(tab.id)}
              className={`min-h-[44px] rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-saffron ${
                activeDivision === tab.id
                  ? "bg-brand-saffron text-brand-navy shadow-md"
                  : "bg-brand-navy/5 text-brand-navy hover:bg-brand-navy/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <ProjectExpoDivisionBlock division={division} />
      </ACSection>

      <ACSection title="Team composition">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Object.values(TEAM_COMPOSITION).map((row) => (
            <ACCard key={row.division} className="text-center">
              <p className="text-sm font-bold text-brand-navy">{row.division}</p>
              <p className="mt-1 text-sm text-gray-700">{row.teamSize}</p>
            </ACCard>
          ))}
        </div>
      </ACSection>

      <ACSection title="Mentorship structure">
        <div className="space-y-3">
          {MENTORSHIP_STRUCTURE.map((row) => (
            <ACCard key={row.participantCategory} hover={false}>
              <p className="text-sm font-semibold text-brand-navy">{row.participantCategory}</p>
              <p className="mt-1 text-sm text-gray-700">{row.assignedMentors}</p>
            </ACCard>
          ))}
        </div>
      </ACSection>

      <ACSection title="Competition structure">
        <div className="grid gap-4 md:grid-cols-3">
          {COMPETITION_STAGES.map((stage, index) => (
            <ACTimelineStep key={stage.stage} step={index + 1}>
              <p className="font-semibold text-brand-navy">{stage.stage}</p>
              <p className="mt-1 text-xs text-brand-saffron-dark">{stage.level}</p>
              <p className="mt-2 text-sm text-gray-700">{stage.description}</p>
            </ACTimelineStep>
          ))}
        </div>
      </ACSection>

      <ACSection title="Selection from pre-event">
        <ACGlassPanel>
          <ul className="space-y-3 text-sm text-gray-700 md:text-base">
            <li>
              <span className="font-semibold text-brand-navy">Theme-wise selection: </span>
              {PRE_EVENT_SELECTION.themeWiseSelection}
            </li>
            <li>
              <span className="font-semibold text-brand-navy">Evaluation basis: </span>
              {PRE_EVENT_SELECTION.evaluationBasis}
            </li>
            <li>
              <span className="font-semibold text-brand-navy">Screening committee: </span>
              {PRE_EVENT_SELECTION.screeningCommittee}
            </li>
            <li>
              <span className="font-semibold text-brand-navy">Qualification: </span>
              {PRE_EVENT_SELECTION.qualification}
            </li>
          </ul>
          <h3 className="mb-3 mt-6 text-base font-bold text-brand-navy md:text-lg">
            General pre-event criteria
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {PRE_EVENT_SELECTION.generalCriteria.map((c) => (
              <ACCard key={c.criterion} hover={false} className="!py-3">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="text-gray-800">{c.criterion}</span>
                  <span className="font-bold text-brand-saffron">{c.weightage}</span>
                </div>
              </ACCard>
            ))}
          </div>
        </ACGlassPanel>
      </ACSection>

      <ACSection title="Evaluation parameters">
        <div className="space-y-6">
          {(Object.keys(EVALUATION_CRITERIA) as ProjectExpoDivisionId[]).map((divId) => {
            const criteria = EVALUATION_CRITERIA[divId];
            if (!criteria.length) return null;
            const label = PROJECT_EXPO_DIVISIONS.find((d) => d.id === divId)?.title ?? divId;
            return (
              <div key={divId}>
                <h3 className="mb-3 text-base font-bold text-brand-navy md:text-lg">{label}</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {criteria.map((c) => (
                    <ACCard key={c.criterion} hover={false} className="!py-3">
                      <div className="flex items-center justify-between gap-2 text-sm">
                        <span className="text-gray-800">{c.criterion}</span>
                        <span className="font-bold text-brand-saffron">{c.weightage}</span>
                      </div>
                    </ACCard>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ACSection>

      <ACSection title="Submission requirements">
        <div className="space-y-6">
          {(Object.keys(SUBMISSION_REQUIREMENTS) as ProjectExpoDivisionId[]).map((divId) => {
            const reqs = SUBMISSION_REQUIREMENTS[divId];
            const label = PROJECT_EXPO_DIVISIONS.find((d) => d.id === divId)?.title ?? divId;
            return (
              <div key={divId}>
                <h3 className="mb-3 text-base font-bold text-brand-navy md:text-lg">{label}</h3>
                <div className="space-y-2">
                  {reqs.map((r) => (
                    <ACCard key={r.material} hover={false} className="!py-3">
                      <p className="text-sm font-semibold text-brand-navy">{r.material}</p>
                      <p className="mt-1 text-sm text-gray-700">{r.description}</p>
                    </ACCard>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ACSection>

      <ACFooterStatement title="Innovate for Himachal, contribute to Viksit Bharat">
        District-level pre-events across Himachal Pradesh lead to the state-level grand finale at
        National Institute of Technology Hamirpur during Shiksha Mahakumbh 6.0 (9–11 October 2026).
      </ACFooterStatement>

      <SectionCTA
        title="Register your project team"
        buttonText="Register & Submit"
        href={REG_LINKS.general}
      />
    </ACPage>
  );
}
