"use client";

import { useState } from "react";
import { ACCard } from "./AcademicCouncilUI";
import type { ProjectExpoDivision, ProjectExpoTheme } from "@/data/student-projects-expo";

function ThemeAccordion({ theme }: { theme: ProjectExpoTheme }) {
  const [open, setOpen] = useState(false);

  return (
    <ACCard hover={false} className="!p-0 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-saffron md:px-5 md:py-4"
        aria-expanded={open}
      >
        <span>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-saffron-dark">
            {theme.code}
          </span>
          <span className="mt-0.5 block text-sm font-semibold text-brand-navy md:text-base">
            {theme.name}
          </span>
          <span className="mt-1 block text-xs text-slate-600">{theme.focusArea}</span>
        </span>
        <span className="mt-1 shrink-0 text-brand-navy" aria-hidden>
          {open ? "−" : "+"}
        </span>
      </button>
      {open ? (
        <div className="border-t border-slate-100 px-4 pb-4 pt-3 md:px-5">
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-brand-navy">Expectations: </span>
            {theme.expectations}
          </p>
          <p className="mb-2 mt-3 text-xs font-bold uppercase tracking-wide text-slate-500">
            Suggested problem statements
          </p>
          <ol className="list-decimal space-y-1 pl-5 text-sm text-gray-700">
            {theme.problemStatements.map((statement) => (
              <li key={statement}>{statement}</li>
            ))}
          </ol>
        </div>
      ) : null}
    </ACCard>
  );
}

export function ProjectExpoDivisionBlock({ division }: { division: ProjectExpoDivision }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-brand-navy/10 bg-gradient-to-br from-brand-surface to-white p-4 md:p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-brand-saffron-dark">
          {division.id}
        </p>
        <h3 className="text-lg font-bold text-brand-navy md:text-xl">{division.title}</h3>
        <p className="mt-1 text-sm text-slate-600">{division.eligibility}</p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">{division.scope}</p>
      </div>
      <div className="space-y-2">
        {division.themes.map((theme) => (
          <ThemeAccordion key={theme.code} theme={theme} />
        ))}
      </div>
    </div>
  );
}
