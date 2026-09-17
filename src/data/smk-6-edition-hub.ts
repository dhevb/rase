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
import { conclaves, SMK_6_PROGRAMME_LEADERSHIP, SMK_6_PROJECT_EXPO_OFFICIAL, SMK_6_SHODHANKUR_OFFICIAL, SMK_6_PANEL_DISCUSSIONS, SMK_6_PANEL_DISCUSSION_OFFICIAL } from "@/components/vibhag/academic/academic-content-data";
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

/** Official 2026 front-page artwork — keep aspect ratio; do not crop in UI. */
export const SMK_6_OFFICIAL_COVER = {
  src: "/branding/shiksha-mahakumbh-6-0-official-cover.png",
  alt:
    "Official Shiksha Mahakumbh 2026 (षष्ठम संस्करण / 6th Edition) front page — शिक्षा महाकुंभ 2026 at NIT Hamirpur, 9–11 October 2026. Theme: शिक्षा, प्रकृति और प्रगति / Education for Development and Harmony with Nature.",
  width: 545,
  height: 762,
} as const;

/**
 * Organising line from the official 2026 front page.
 * Roles are not invented beyond “Organizers … in collaboration with …”.
 */
export const SMK_6_ORGANISING_IDENTITY = {
  heading: "Organizers",
  statement:
    "Department of Holistic Education, A unit of Vidya Bharti Institute of Training and Research Trust in collaboration with NIT Hamirpur, IIT Mandi, CUHP, Dharamshala and Association of Indian Universities.",
  collaborators: [
    "Department of Holistic Education (DHE)",
    "Vidya Bharti Institute of Training and Research Trust",
    "NIT Hamirpur",
    "IIT Mandi",
    "CUHP, Dharamshala",
    "Association of Indian Universities",
  ],
} as const;

/** Campus notes printed on the official 2026 front page. */
export const SMK_6_FRONT_PAGE_CAMPUSES = [
  {
    id: "nit-hamirpur",
    label: "NIT Hamirpur",
    role: "Event venue",
    text:
      "National Institute of Technology Hamirpur (NIT Hamirpur), An Institute of National Importance, is one of Bharat’s leading institutions of higher technical education, located in the serene and picturesque landscape of Himachal Pradesh. Established in 1986 as a Regional Engineering College (REC), it was elevated to the status of a National Institute of Technology in 2002 and recognized as an Institute of National Importance by the Government of Bharat.",
  },
  {
    id: "iit-mandi",
    label: "IIT Mandi",
    role: "Collaborating institution (front page)",
    text:
      "The Indian Institute of Technology Mandi is one among the eight new second generation of IITs. IIT Mandi is a research university now located in Kamand Valley, Mandi city in Mandi district of Himachal Pradesh. IIT Mandi’s campus (about 14 km from Mandi) is on the left bank of the Uhl River at Kamand and Salgi villages. There is great variation in the climatic conditions of Himachal due to extreme variation in elevation.",
  },
  {
    id: "cuhp-dharamshala",
    label: "CUHP, Dharamshala",
    role: "Collaborating institution (front page)",
    text:
      "The Central University of Himachal Pradesh, Dharamshala is (CUHP, Dharamshala) established under the Central Universities Act 2009 (No. 25 of 2009) enacted by the Parliament. The University is funded and regulated by the University Grants Commission (UGC). The University became functional with the assumption of charge by the first Vice Chancellor on 20th January 2010.",
  },
] as const;

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
  "patrika",
  "projects",
  "olympiad",
  "awards",
  "exhibition",
] as const;

export function smk6ProgrammeCards() {
  return ACADEMIC_PROGRAMME_HUB.filter(
    (section) => section.id !== "conclaves" && section.id !== "panel-discussion"
  ).map((section) => ({
    id: section.id,
    title: section.titleEn,
    titleHi: section.titleHi,
    description: section.description,
    href: academicCouncilProgrammeUrl(section.tabId),
    tabId: section.tabId,
    items: section.items.slice(0, 4).map((item) => item.titleEn),
    footerNote: section.footerNote,
    poster:
      section.id === "patrika"
        ? SMK_6_SHODHANKUR_OFFICIAL.poster
        : section.id === "projects"
          ? SMK_6_PROJECT_EXPO_OFFICIAL.poster
          : undefined,
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
    id: conclave.id,
    title: conclave.title,
    participants: conclave.participants,
    focus: conclave.focus,
    output: conclave.output,
    theme: conclave.theme,
    coordinators: conclave.coordinators,
    poster: "poster" in conclave ? conclave.poster : undefined,
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
  const panel = SMK_6_PROGRAMME_LEADERSHIP.panelDiscussion;
  return [
    {
      id: "panel",
      title: "Panel Discussion",
      detail: `${panel.focus} ${SMK_6_PANEL_DISCUSSIONS.map((session) => `${session.title} (${session.date})`).join("; ")}.`,
      leadership: `समन्वयक: ${SMK_6_PANEL_DISCUSSION_OFFICIAL.coordinator.nameHi} ${SMK_6_PANEL_DISCUSSION_OFFICIAL.coordinator.phone}`,
      href: academicCouncilProgrammeUrl("PanelDiscussionPage"),
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
