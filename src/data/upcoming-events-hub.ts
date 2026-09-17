import { CANONICAL_ROUTES } from "@/constants/canonical-routes";
import { SITE_URL } from "@/config/site";
import { UPCOMING_EDITION } from "@/data/past-editions";
import { committeePathForEdition } from "@/lib/committee/edition-slugs";
import { CMT_SUBMISSION_URL } from "@/lib/registration/config";
import { ABOUT_6TH_EDITION_HREF } from "@/data/smk-6-edition-hub";
import { event } from "@/design/tokens";
import { REGISTRATION_DEADLINE } from "@/data/registration-hub";

export const UPCOMING_EVENTS_PATH = CANONICAL_ROUTES.upcomingEvents;

export const UPCOMING_EVENTS_HERO_IMAGE = "/branding/shiksha-mahakumbh-brand-hero.png";

export const UPCOMING_EVENTS_HERO_IMAGE_ALT =
  "Shiksha Mahakumbh 6.0 and 7.0 — upcoming national education summits on the DHE calendar";

export const UPCOMING_EVENTS_OG_IMAGE = `${SITE_URL}${UPCOMING_EVENTS_HERO_IMAGE}`;

export const UPCOMING_EVENTS_CANONICAL_URL = `${SITE_URL}${UPCOMING_EVENTS_PATH}`;

export type UpcomingEventCard = {
  id: string;
  edition: string;
  title: string;
  dates: string;
  venue: string;
  venueFull: string;
  status: "registration_open" | "announced";
  registrationHref: string;
  ctaLabel: string;
  description: string;
  highlight?: string;
};

/** Canonical upcoming programmes — not CMS-driven (avoids stale edition data). */
export const UPCOMING_EVENTS: UpcomingEventCard[] = [
  {
    id: "smk-6-0",
    edition: "6.0",
    title: "Shiksha Mahakumbh 6.0",
    dates: UPCOMING_EDITION.dates,
    venue: UPCOMING_EDITION.venue,
    venueFull: UPCOMING_EDITION.venueFull,
    status: "registration_open",
    registrationHref: UPCOMING_EDITION.registrationHref,
    ctaLabel: "Register Now",
    description:
      "Shiksha Mahakumbh 2026 (6th Edition) at NIT Hamirpur — शिक्षा, प्रकृति और प्रगति / Education for Development and Harmony with Nature.",
    highlight: UPCOMING_EDITION.theme,
  },
  {
    id: "smk-7-0",
    edition: "7.0",
    title: "Shiksha Mahakumbh 7.0",
    dates: "To Be Announced",
    venue: "TBA (To Be Announced)",
    venueFull: "TBA (To Be Announced)",
    status: "announced",
    registrationHref: `${CANONICAL_ROUTES.upcomingEvents}#smk-7-0`,
    ctaLabel: "Details forthcoming",
    description:
      "The next national edition of Shiksha Mahakumbh Abhiyan. Venue TBA (To Be Announced). Dates and registration will be announced soon.",
    highlight: "Edition 7.0 — programme details forthcoming",
  },
];

export const SMK_6_RESOURCE_LINKS = [
  { label: "About 6th Edition", href: ABOUT_6TH_EDITION_HREF },
  { label: "Edition 6.0 brochure", href: `${CANONICAL_ROUTES.downloads}#edition-brochures` },
  { label: "Organising committee", href: committeePathForEdition("6.0") },
  { label: "Academic Council", href: CANONICAL_ROUTES.departments.academicCouncil },
] as const;

export const UPCOMING_EVENTS_HERO = {
  eyebrow: "Conferences & Summits",
  title: "Upcoming Events",
  subtitle:
    "National and international education summits on the Shiksha Mahakumbh Abhiyan calendar — register for edition 6.0 or explore what's next.",
} as const;

export const UPCOMING_EVENTS_PAGE_HERO = {
  eyebrow: "Programmes · Global Education Movement",
  title: "Shiksha Mahakumbh 6.0 & Beyond",
  subtitle:
    "Register for Shiksha Mahakumbh 6.0 at NIT Hamirpur (9–11 October 2026). Future editions will be announced here.",
} as const;

export const UPCOMING_EVENTS_STATS = [
  { label: "Open registration", value: "6.0", hint: `Deadline ${REGISTRATION_DEADLINE}` },
  { label: "Next edition", value: "7.0", hint: "TBA (To Be Announced)" },
  { label: "States & UTs reached", value: "14+", hint: "National footprint across India" },
  { label: "Institutions", value: "500+", hint: "Engaged across editions" },
] as const;

export const UPCOMING_EVENTS_BREADCRUMBS = [
  { name: "Home", path: "/" },
  { name: "Upcoming Events", path: UPCOMING_EVENTS_PATH },
] as const;

export const UPCOMING_EVENTS_QUICK_LINKS = [
  { label: "Official Schedule", href: CANONICAL_ROUTES.schedule, icon: "🗓️" },
  { label: "Register for 6.0", href: CANONICAL_ROUTES.registration, icon: "✅" },
  { label: "Edition Brochures", href: `${CANONICAL_ROUTES.downloads}#edition-brochures`, icon: "📄" },
  { label: "Organising Committee", href: committeePathForEdition("6.0"), icon: "👥" },
  { label: "Academic Council", href: CANONICAL_ROUTES.departments.academicCouncil, icon: "🎓" },
  { label: "Past Editions", href: CANONICAL_ROUTES.pastEvents, icon: "📚" },
  { label: "Submit Paper (CMT)", href: CMT_SUBMISSION_URL, icon: "📝", external: true },
] as const;

export const UPCOMING_EVENTS_KEYWORDS = [
  "Shiksha Mahakumbh 6.0",
  "Shiksha Mahakumbh 2026",
  "शिक्षा महाकुंभ 2026",
  "शिक्षा, प्रकृति और प्रगति",
  "Education for Development and Harmony with Nature",
  "Shiksha Mahakumbh 7.0",
  "upcoming education summit India",
  "NIT Hamirpur conference 2026",
  "Shiksha Mahakumbh 7.0 TBA",
  "NEP 2020 conference registration",
  "national education summit India",
  "international education conference India",
] as const;

export function upcomingEventsMetaDescription(): string {
  return "Shiksha Mahakumbh 6.0 / Shiksha Mahakumbh 2026 at NIT Hamirpur, 9–11 October 2026. Theme: शिक्षा, प्रकृति और प्रगति — Education for Development and Harmony with Nature. Programmes, conclaves, registration, organising committee, and brochure. Edition 7.0 venue is TBA.";
}

export const UPCOMING_EVENTS_FAQ = [
  {
    question: "Where is the official programme schedule?",
    answer: `The official मुख्य कार्यक्रम सारणी for Shiksha Mahakumbh 6.0 is at ${SITE_URL}${CANONICAL_ROUTES.schedule}.`,
  },
  {
    question: "When is Shiksha Mahakumbh 6.0?",
    answer: "9–11 October 2026.",
  },
  {
    question: "Where is Shiksha Mahakumbh 6.0?",
    answer: "National Institute of Technology, Hamirpur, Himachal Pradesh.",
  },
  {
    question: "What is the official theme of Shiksha Mahakumbh 6.0?",
    answer:
      "शिक्षा, प्रकृति और प्रगति — Education for Development and Harmony with Nature.",
  },
  {
    question: "How do I register for Shiksha Mahakumbh 6.0?",
    answer: `Complete official registration at ${SITE_URL}${CANONICAL_ROUTES.registration} for delegates, conclaves, olympiad, awards, and related programmes. Applicable registrations have been extended until ${REGISTRATION_DEADLINE}.`,
  },
  {
    question: "When is Shiksha Mahakumbh 7.0?",
    answer: "Edition 7.0 venue is TBA (To Be Announced). Dates and registration will be announced on this page.",
  },
  {
    question: "Where can I download the edition 6.0 brochure?",
    answer: `Official PDF brochures are available at ${SITE_URL}${CANONICAL_ROUTES.downloads}#edition-brochures.`,
  },
  {
    question: "How do I submit a research paper?",
    answer: `Authors submit via the official Microsoft CMT portal at ${CMT_SUBMISSION_URL}.`,
  },
] as const;

/** ISO dates for JSON-LD (edition 6.0) — from global event tokens */
export const SMK_6_EVENT_DATES = {
  startDate: event.startDate,
  endDate: event.endDate,
} as const;

export const UPCOMING_EVENTS_CTA = {
  registerLabel: "Register for 6.0",
  registerHref: CANONICAL_ROUTES.registration,
  pastEditionsLabel: "View Past Editions",
  pastEditionsHref: CANONICAL_ROUTES.pastEvents,
} as const;
