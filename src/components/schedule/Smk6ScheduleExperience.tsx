"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics/events";
import { CANONICAL_ROUTES } from "@/constants/canonical-routes";
import Smk6OfficialCover from "@/components/upcoming-events/Smk6OfficialCover";
import {
  SMK_6_SCHEDULE_CATEGORY_LABEL,
  SMK_6_SCHEDULE_CHIEF_GUESTS,
  SMK_6_SCHEDULE_DAYS,
  SMK_6_SCHEDULE_DOWNLOAD_HREF,
  SMK_6_SCHEDULE_FILTERS,
  SMK_6_SCHEDULE_GUESTS_OF_HONOUR,
  SMK_6_SCHEDULE_META,
  flattenOfficialSchedule,
  type ScheduleCategory,
  type ScheduleDay,
  type ScheduleItem,
  type ScheduleSlot,
} from "@/data/smk-6-official-schedule";

type DayFilter = "all" | ScheduleDay["id"];

const chipBase =
  "inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full border px-4 py-2 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-saffron";

function categoryAccent(category: ScheduleCategory): string {
  switch (category) {
    case "conclave":
      return "border-l-brand-navy";
    case "panel-discussion":
      return "border-l-brand-saffron";
    case "paper-presentations":
      return "border-l-brand-navy-light";
    case "exhibition":
      return "border-l-emerald-700";
    case "cultural":
      return "border-l-rose-700";
    case "student-projects":
    case "shodhankur":
      return "border-l-amber-700";
    case "ceremony":
      return "border-l-brand-saffron-dark";
    default:
      return "border-l-slate-400";
  }
}

function DownloadScheduleLink({ className, children }: { className: string; children: string }) {
  return (
    <a
      href={SMK_6_SCHEDULE_DOWNLOAD_HREF}
      download
      className={className}
      onClick={() =>
        trackEvent(ANALYTICS_EVENTS.scheduleDownloaded, { source: "smk-6-schedule" })
      }
    >
      {children}
    </a>
  );
}

function SessionCard({ item, timeLabel }: { item: ScheduleItem; timeLabel: string }) {
  return (
    <details
      className={`h-full rounded-2xl border border-slate-200 border-l-4 bg-white p-4 shadow-sm ${categoryAccent(item.category)}`}
      onToggle={(event) => {
        if ((event.target as HTMLDetailsElement).open) {
          trackEvent(ANALYTICS_EVENTS.scheduleSessionExpanded, {
            source: "smk-6-schedule",
            programme: item.id,
          });
        }
      }}
    >
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{timeLabel}</p>
        <h4 className="mt-1 text-base font-bold text-brand-navy">{item.title}</h4>
        <p className="mt-1 text-xs font-semibold text-brand-saffron-dark">
          {SMK_6_SCHEDULE_CATEGORY_LABEL[item.category]}
        </p>
        <p className="mt-2 text-xs text-slate-600">{SMK_6_SCHEDULE_META.venue}</p>
        {item.sessions?.length ? (
          <ul className="mt-3 space-y-1 text-xs text-slate-700">
            {item.sessions.map((part) => (
              <li key={`${item.id}-${part.label}`}>
                <span className="font-semibold">{part.label}:</span> {part.time}
              </li>
            ))}
          </ul>
        ) : null}
        <p className="mt-3 text-xs font-bold text-brand-navy">Session details</p>
      </summary>
      <div className="mt-3 border-t border-slate-100 pt-3 text-sm text-slate-700">
        <p>
          <span className="font-semibold">Campus: </span>
          {SMK_6_SCHEDULE_META.venue}, {SMK_6_SCHEDULE_META.location}
        </p>
        {item.detailsUrl ? (
          <Link
            href={item.detailsUrl}
            className="mt-2 inline-flex min-h-[40px] items-center text-sm font-bold text-brand-navy underline decoration-brand-saffron/50 underline-offset-2"
            onClick={() =>
              trackEvent(ANALYTICS_EVENTS.programmeDetailsClicked, {
                source: "smk-6-schedule",
                programme: item.id,
              })
            }
          >
            Programme details
          </Link>
        ) : null}
      </div>
    </details>
  );
}

function SlotBlock({
  day,
  slotRow,
  query,
  category,
}: {
  day: ScheduleDay;
  slotRow: ScheduleSlot;
  query: string;
  category: ScheduleCategory | "all";
}) {
  const q = query.trim().toLowerCase();
  const visible = slotRow.items.filter((entry) => {
    if (category !== "all" && entry.category !== category) return false;
    if (!q) return true;
    const blob = [
      entry.title,
      SMK_6_SCHEDULE_CATEGORY_LABEL[entry.category],
      slotRow.timeLabel,
      day.themeHi,
      day.dateLabel,
    ]
      .join(" ")
      .toLowerCase();
    return blob.includes(q);
  });
  if (visible.length === 0) return null;

  const gridClass =
    slotRow.layout === "parallel"
      ? "grid gap-3 md:grid-cols-2 xl:grid-cols-3"
      : slotRow.layout === "paired"
        ? "grid gap-3 md:grid-cols-2"
        : "grid gap-3";

  return (
    <li className="relative pl-4 md:pl-8">
      <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-brand-saffron md:left-[3px]" aria-hidden />
      <div className="mb-3 flex flex-wrap items-baseline gap-2">
        <p className="font-mono text-sm font-bold text-brand-navy">{slotRow.timeLabel}</p>
        {slotRow.groupLabel ? (
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-saffron-dark">
            {slotRow.groupLabel}
          </p>
        ) : null}
      </div>
      <div className={gridClass}>
        {visible.map((entry) => (
          <SessionCard key={entry.id} item={entry} timeLabel={slotRow.timeLabel} />
        ))}
      </div>
    </li>
  );
}

export default function Smk6ScheduleExperience() {
  const [dayFilter, setDayFilter] = useState<DayFilter>("all");
  const [category, setCategory] = useState<ScheduleCategory | "all">("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.scheduleOpened, { source: "smk-6-schedule" });
  }, []);

  const days = useMemo(() => {
    if (dayFilter === "all") return SMK_6_SCHEDULE_DAYS;
    return SMK_6_SCHEDULE_DAYS.filter((day) => day.id === dayFilter);
  }, [dayFilter]);

  const matchCount = useMemo(() => {
    return flattenOfficialSchedule(days).filter(({ day, slot, item }) => {
      if (category !== "all" && item.category !== category) return false;
      if (!query.trim()) return true;
      const blob = [
        item.title,
        SMK_6_SCHEDULE_CATEGORY_LABEL[item.category],
        slot.timeLabel,
        day.themeHi,
        day.dateLabel,
      ]
        .join(" ")
        .toLowerCase();
      return blob.includes(query.trim().toLowerCase());
    }).length;
  }, [days, category, query]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
      <header className="overflow-hidden rounded-3xl border border-brand-saffron/30 bg-white shadow-sm">
        <div className="grid items-start gap-8 p-6 md:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(12rem,18rem)]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-saffron-dark">
              {SMK_6_SCHEDULE_META.tableTitle}
            </p>
            <h1 className="mt-2 font-devanagari text-3xl font-extrabold text-brand-navy md:text-5xl">
              {SMK_6_SCHEDULE_META.hindiTitle}
            </h1>
            <p className="mt-2 text-xl font-bold text-brand-navy md:text-2xl">
              {SMK_6_SCHEDULE_META.englishTitle}
            </p>
            <p className="mt-3 text-base font-semibold text-slate-700">
              {SMK_6_SCHEDULE_META.datesLabel}
              <span aria-hidden> · </span>
              {SMK_6_SCHEDULE_META.venue}, {SMK_6_SCHEDULE_META.location}
            </p>
            <p className="mt-4 font-devanagari text-lg font-bold text-brand-navy">
              {SMK_6_SCHEDULE_META.themeHi}
            </p>
            <p className="text-sm font-semibold text-slate-700">{SMK_6_SCHEDULE_META.themeEn}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="#day-1"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-brand-saffron px-5 py-3 text-sm font-bold text-brand-navy"
                onClick={() =>
                  trackEvent(ANALYTICS_EVENTS.scheduleDaySelected, { source: "smk-6-schedule", day: "day-1" })
                }
              >
                View Day 1
              </Link>
              <DownloadScheduleLink className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-brand-navy/20 bg-white px-5 py-3 text-sm font-bold text-brand-navy">
                Download Official Schedule
              </DownloadScheduleLink>
              <Link
                href={CANONICAL_ROUTES.upcomingEvents}
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-brand-navy px-5 py-3 text-sm font-bold text-white"
              >
                About 6th Edition
              </Link>
            </div>
          </div>
          <Smk6OfficialCover className="lg:sticky lg:top-28" priority />
        </div>
      </header>

      <nav
        aria-label="Schedule quick navigation"
        className="sticky top-16 z-20 -mx-4 mt-8 overflow-x-auto border-y border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:mx-0 md:rounded-2xl md:border"
      >
        <div className="flex gap-2">
          {(
            [
              { id: "all", label: "All Sessions" },
              { id: "day-1", label: "Day 1" },
              { id: "day-2", label: "Day 2" },
              { id: "day-3", label: "Day 3" },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${chipBase} ${
                dayFilter === item.id
                  ? "border-brand-navy bg-brand-navy text-white"
                  : "border-slate-200 bg-white text-brand-navy"
              }`}
              aria-pressed={dayFilter === item.id}
              onClick={() => {
                setDayFilter(item.id);
                trackEvent(ANALYTICS_EVENTS.scheduleDaySelected, {
                  source: "smk-6-schedule",
                  day: item.id,
                });
              }}
            >
              {item.label}
            </button>
          ))}
          <a href="#venues" className={`${chipBase} border-slate-200 bg-white text-brand-navy`}>
            Venue
          </a>
          <a href="#key-programmes" className={`${chipBase} border-slate-200 bg-white text-brand-navy`}>
            Key Programmes
          </a>
        </div>
      </nav>

      <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_16rem]">
        <label className="block">
          <span className="sr-only">Search the official schedule</span>
          <input
            type="search"
            value={query}
            onBlur={() => {
              if (query.trim().length > 1) {
                trackEvent(ANALYTICS_EVENTS.scheduleSearch, { source: "smk-6-schedule" });
              }
            }}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search title, track, or day theme"
            className="min-h-[48px] w-full rounded-xl border border-slate-200 px-4 text-sm focus:border-brand-saffron focus:outline-none focus:ring-1 focus:ring-brand-saffron"
          />
        </label>
        <p className="self-center text-sm text-slate-600" aria-live="polite">
          {matchCount} session{matchCount === 1 ? "" : "s"} shown
        </p>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Programme category filters">
        {SMK_6_SCHEDULE_FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={`${chipBase} ${
              category === filter.id
                ? "border-brand-saffron bg-brand-saffron/15 text-brand-navy"
                : "border-slate-200 bg-white text-slate-700"
            }`}
            aria-pressed={category === filter.id}
            onClick={() => {
              setCategory(filter.id);
              trackEvent(ANALYTICS_EVENTS.scheduleFilterUsed, {
                source: "smk-6-schedule",
                filter: filter.id,
              });
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="mt-10 space-y-14">
        {days.map((day) => (
          <section key={day.id} id={day.id} aria-labelledby={`${day.id}-heading`} className="scroll-mt-28">
            <div className="mb-6 border-b border-brand-saffron/30 pb-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-saffron-dark">
                DAY {String(day.dayNumber).padStart(2, "0")}
              </p>
              <h2 id={`${day.id}-heading`} className="mt-1 text-2xl font-extrabold text-brand-navy md:text-3xl">
                {day.dateLabel}
              </h2>
              <p className="mt-1 font-devanagari text-base font-semibold text-slate-700">{day.themeHi}</p>
            </div>
            <ol className="relative space-y-8 border-l border-brand-saffron/40">
              {day.slots.map((slotRow) => (
                <SlotBlock
                  key={slotRow.id}
                  day={day}
                  slotRow={slotRow}
                  query={query}
                  category={category}
                />
              ))}
            </ol>
          </section>
        ))}
      </div>

      <section id="key-programmes" className="mt-16 scroll-mt-28" aria-labelledby="key-programmes-heading">
        <h2 id="key-programmes-heading" className="text-2xl font-bold text-brand-navy">
          Chief Guests
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {SMK_6_SCHEDULE_CHIEF_GUESTS.map((guest) => (
            <article key={guest.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-saffron-dark">{guest.dateLabel}</p>
              <p className="mt-2 font-bold text-brand-navy">{guest.name}</p>
              <p className="text-sm text-slate-600">{guest.designation}</p>
            </article>
          ))}
        </div>
        <h3 className="mt-10 text-xl font-bold text-brand-navy">Guest of honour</h3>
        <p className="mt-1 text-sm text-slate-600">
          Listed in the official schedule after Day 2. The document does not assign a date to these names.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {SMK_6_SCHEDULE_GUESTS_OF_HONOUR.map((guest) => (
            <article key={guest.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="font-bold text-brand-navy">{guest.name}</p>
              <p className="text-sm text-slate-600">{guest.designation}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="venues" className="mt-16 scroll-mt-28" aria-labelledby="venues-heading">
        <h2 id="venues-heading" className="text-2xl font-bold text-brand-navy">
          Venue
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-700">
          {SMK_6_SCHEDULE_META.venue}, {SMK_6_SCHEDULE_META.location}. The official main programme table does
          not list separate halls for each session.
        </p>
      </section>

      <footer className="mt-12 rounded-2xl border border-slate-200 bg-brand-surface-warm/50 p-6">
        <p className="text-sm text-slate-700">{SMK_6_SCHEDULE_META.changeNote}</p>
        <p className="mt-4 text-sm font-semibold text-brand-navy">{SMK_6_SCHEDULE_META.petitionerLabel}</p>
        <p className="font-devanagari text-lg font-bold text-brand-navy">{SMK_6_SCHEDULE_META.contactName}</p>
        <a href="tel:+919463231250" className="mt-1 inline-block text-sm font-semibold text-brand-navy underline">
          {SMK_6_SCHEDULE_META.contactPhone}
        </a>
        <p className="mt-2 text-sm text-slate-600">
          {SMK_6_SCHEDULE_META.venue}
          <br />
          {SMK_6_SCHEDULE_META.location}
        </p>
      </footer>
    </div>
  );
}
