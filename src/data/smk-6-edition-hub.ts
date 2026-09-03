/**
 * Shiksha Mahakumbh 6.0 “About 6th Edition” hub — composes existing sources.
 * Do not treat this file as a second programme/speaker/committee database.
 */

import { CANONICAL_ROUTES } from "@/constants/canonical-routes";
import { event } from "@/design/tokens";
import { UPCOMING_EDITION } from "@/data/past-editions";
import { INTRODUCTION_HERO, INTRODUCTION_OBJECTIVES, INTRODUCTION_PARAGRAPHS } from "@/data/introduction-content";
import {
  ACADEMIC_PROGRAMME_HUB,
} from "@/data/academic-council-content";
import { ACADEMIC_CONFERENCE_TRACKS } from "@/data/academic-council-tracks";
import { academicCouncilProgrammeUrl } from "@/data/academic-council-hub";
import { UNIVERSITY_CONFERENCES } from "@/data/university-conferences-series";
import { COMMITTEE_EDITION_6_0 } from "@/data/committee-members/edition-6-0";
import { committeePathForEdition } from "@/lib/committee/edition-slugs";
import { conclaves, SMK_6_PROGRAMME_LEADERSHIP } from "@/components/vibhag/academic/academic-content-data";
import { CMT_SUBMIT_PATH } from "@/lib/registration/config";
import type { CmsSpeakerCard } from "@/lib/cms/types";
import type { RegistrationType } from "@/types/registration";

export const ABOUT_6TH_EDITION_HASH = "about-6th-edition";

export const ABOUT_6TH_EDITION_HREF = `${CANONICAL_ROUTES.upcomingEvents}#${ABOUT_6TH_EDITION_HASH}`;

export const SMK_6_ANALYTICS_SOURCE = "smk-6";

/** Event-wide theme from the official Shiksha Mahakumbh 6.0 brochure cover. */
export const SMK_6_EVENT_THEME = {
  status: "confirmed" as const,
  heading: "शिक्षा, प्रकृति और प्रगति",
  english: "Education for Development and Harmony with Nature",
  note:
    "Official event-wide theme of Shiksha Mahakumbh 6.0. Programme-specific themes (conclaves, exhibition, and cultural programme) remain listed with those programmes.",
} as const;

export const SMK_6_OVERVIEW = {
  title: UPCOMING_EDITION.title,
  dates: UPCOMING_EDITION.dates,
  venue: UPCOMING_EDITION.venue,
  venueFull: UPCOMING_EDITION.venueFull,
  location: event.location,
  tagline: INTRODUCTION_HERO.tagline,
  subtitle: INTRODUCTION_HERO.subtitle,
  paragraphs: INTRODUCTION_PARAGRAPHS.slice(0, 5),
  objectives: INTRODUCTION_OBJECTIVES.slice(0, 8),
} as const;

export const SMK_6_HOMEPAGE_PREVIEW_IDS = [
  "conference",
  "conclaves",
  "olympiad",
  "awards",
  "exhibition",
  "projects",
] as const;

export function smk6ProgrammeCards() {
  return ACADEMIC_PROGRAMME_HUB.filter((section) => section.id !== "conclaves").map((section) => ({
    id: section.id,
    title: section.titleEn,
    titleHi: section.titleHi,
    description: section.description,
    href: academicCouncilProgrammeUrl(section.tabId),
    tabId: section.tabId,
    items: section.items.slice(0, 4).map((item) => item.titleEn),
    footerNote: section.footerNote,
  }));
}

export function smk6HomepageProgrammeHighlights() {
  const byId = Object.fromEntries(ACADEMIC_PROGRAMME_HUB.map((s) => [s.id, s]));
  return SMK_6_HOMEPAGE_PREVIEW_IDS.map((id) => {
    const section = byId[id];
    if (!section) return null;
    return {
      id: section.id,
      title: section.titleEn,
      description: section.description,
      href: academicCouncilProgrammeUrl(section.tabId),
    };
  }).filter((item): item is NonNullable<typeof item> => item !== null);
}

export function smk6ConclaveCards() {
  return conclaves.map((conclave) => ({
    title: conclave.title,
    participants: conclave.participants,
    focus: conclave.focus,
    output: conclave.output,
    theme: conclave.theme,
    coordinators: conclave.coordinators,
    href: academicCouncilProgrammeUrl("ConclavePage"),
  }));
}

export function smk6ConferenceTracks() {
  return ACADEMIC_CONFERENCE_TRACKS.map((track) => ({
    title: track.titleEn,
    description: track.details,
    coordinators: track.coordinators,
    href: academicCouncilProgrammeUrl("ConferencePage"),
  }));
}

export function smk6BrochureInitiatives() {
  const other = SMK_6_PROGRAMME_LEADERSHIP.otherProgrammes;
  return [
    {
      id: "panel",
      title: "Panel Discussion",
      detail: SMK_6_PROGRAMME_LEADERSHIP.panelDiscussion.focus,
      leadership: `Chair: ${SMK_6_PROGRAMME_LEADERSHIP.panelDiscussion.chair}`,
    },
    {
      id: "other",
      title: "Other programmes",
      detail: other.items.join(" · "),
      leadership: `Chair: ${other.chair}. Co-Chair: ${other.coChair}.`,
    },
  ];
}

export function smk6RelatedConferences() {
  return UNIVERSITY_CONFERENCES.filter((entry) => entry.status !== "coming_soon").map((entry) => ({
    id: entry.id,
    title: entry.acronym ? `${entry.acronym} — ${entry.title}` : entry.title,
    dates: entry.dates,
    venue: entry.location,
    host: entry.hostInstitution,
    mode: entry.mode,
    description: entry.description,
    href: academicCouncilProgrammeUrl("UniversityConferencesPage"),
  }));
}

const COMMITTEE_PREVIEW_TITLES = new Set([
  "Chief Patron",
  "Patrons",
  "Co-Patrons",
  "Director",
  "Conveners",
  "Secretaries",
  "Joint Secretaries",
]);

export function smk6CommitteePreview() {
  return {
    href: committeePathForEdition("6.0"),
    venue: COMMITTEE_EDITION_6_0.venue,
    dates: COMMITTEE_EDITION_6_0.dates,
    sections: COMMITTEE_EDITION_6_0.sections.filter((section) =>
      COMMITTEE_PREVIEW_TITLES.has(section.title)
    ),
  };
}

export const SMK_6_REGISTRATION_TYPES: RegistrationType[] = [
  "Delegate Registration",
  "Multi Track Conference",
  "Conclave",
  "Awards",
  "Olympiad",
  "Exhibition",
  "Projects",
  "Best Practices",
  "Shodhankur",
  "Cultural Program",
  "Accommodation",
];

export const SMK_6_RESEARCH_HREF = CMT_SUBMIT_PATH;

export const SMK_6_VENUE_PAGE_HREF = CANONICAL_ROUTES.about.nitHamirpur;

export type Smk6DignitaryGroupId =
  | "chiefGuest"
  | "guestOfHonour"
  | "keynote"
  | "special";

export type Smk6DignitaryGroup = {
  id: Smk6DignitaryGroupId;
  heading: string;
  speakers: CmsSpeakerCard[];
  emptyLabel: string;
};

function hasTag(speaker: CmsSpeakerCard, needle: string): boolean {
  return (speaker.tags ?? []).some((tag) => tag.toLowerCase().replace(/\s+/g, "-") === needle);
}

/** Groups published CMS speakers for edition 6.0 only — never mixes 1.0–5.0 archives. */
export function groupSmk6Dignitaries(speakers: CmsSpeakerCard[]): Smk6DignitaryGroup[] {
  const edition6 = speakers.filter((s) => s.edition === "6.0");
  const used = new Set<string>();

  const take = (predicate: (s: CmsSpeakerCard) => boolean) => {
    const matched = edition6.filter((s) => !used.has(s.id) && predicate(s));
    matched.forEach((s) => used.add(s.id));
    return matched;
  };

  return [
    {
      id: "chiefGuest",
      heading: "Chief Guest",
      speakers: take((s) => hasTag(s, "chief-guest")),
      emptyLabel: "Chief Guest — To Be Announced",
    },
    {
      id: "guestOfHonour",
      heading: "Guest of Honour",
      speakers: take((s) => hasTag(s, "guest-of-honour")),
      emptyLabel: "Guest of Honour — To Be Announced",
    },
    {
      id: "keynote",
      heading: "Keynote Speakers",
      speakers: take((s) => s.category === "keynote"),
      emptyLabel: "Keynote Speakers — To Be Announced",
    },
    {
      id: "special",
      heading: "Special / Business / Industry Guests",
      speakers: take(
        (s) =>
          s.category === "guest" ||
          s.category === "panelist" ||
          s.category === "plenary" ||
          hasTag(s, "industry") ||
          hasTag(s, "special-guest")
      ),
      emptyLabel: "Special guests — To Be Announced",
    },
  ];
}
