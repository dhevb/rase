import { CANONICAL_ROUTES } from "@/constants/canonical-routes";

export type SiteQuickLink = {
  label: string;
  href: string;
  icon: string;
  external?: boolean;
};

/** Site-wide programme shortcuts — shown before Related programmes & resources. */
export const SITE_QUICK_LINKS: readonly SiteQuickLink[] = [
  { label: "Register for SMK 6.0", href: CANONICAL_ROUTES.registration, icon: "✅" },
  { label: "Past Editions", href: CANONICAL_ROUTES.pastEvents, icon: "🗓️" },
  { label: "Abhiyan Photo Frame", href: "/abhiyaninphotoframe", icon: "📜" },
  {
    label: "Academic Council",
    href: CANONICAL_ROUTES.departments.academicCouncil,
    icon: "🎓",
  },
  { label: "Speaker Directory", href: CANONICAL_ROUTES.speakers, icon: "🎤" },
  {
    label: "All Brochures (PDF)",
    href: `${CANONICAL_ROUTES.downloads}#edition-brochures`,
    icon: "📄",
  },
];
