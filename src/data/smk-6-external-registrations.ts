import { CANONICAL_ROUTES } from "@/constants/canonical-routes";
import type { RegistrationType } from "@/types/registration";
import { ANALYTICS_EVENTS, type AnalyticsEventName } from "@/lib/analytics/events";

/** Official Shiksha Mahakumbh 6.0 Google Forms — single source of truth. */
export const SMK_6_EXTERNAL_REGISTRATIONS = {
  conclaves: {
    principalsTeachers: {
      id: "principalsTeachers",
      title: "Principals & Outstanding Teachers Conclave",
      url: "https://docs.google.com/forms/d/e/1FAIpQLSeKk_clbh5fzAQ5AHOH462TRlyGNmn5tN_Cig9Ho6VwGkzelg/viewform?usp=header",
      analyticsEvent: "smk6_principals_teachers_registration_clicked",
    },
    scientistsResearch: {
      id: "scientistsResearch",
      title: "Scientists & Research Scholars Conclave",
      url: "https://docs.google.com/forms/d/e/1FAIpQLSc474B45I3o3kTfBYt9GjGKN2F5Bkv8XZjWXcO0uDuAbCiy7Q/viewform?usp=header",
      analyticsEvent: "smk6_scientists_research_registration_clicked",
    },
    startupEntrepreneurs: {
      id: "startupEntrepreneurs",
      title: "Startup Leaders / Entrepreneurs Conclave",
      url: "https://docs.google.com/forms/d/e/1FAIpQLSeipr5-D3f8NK6s060GHlpTcrgBOsvDec8XsUgtHFHxv_w23g/viewform?usp=header",
      analyticsEvent: "smk6_startup_entrepreneurs_registration_clicked",
    },
    talent: {
      id: "talent",
      title: "Talent Conclave",
      url: "https://docs.google.com/forms/d/e/1FAIpQLScxQCWA5rCRMWqUvTM3rqHz_obAduHfUOzHmboP6HByfkaoAg/viewform?usp=header",
      analyticsEvent: "smk6_talent_conclave_registration_clicked",
    },
  },
  shodhankur: {
    title: "Shodhankur – छात्र शोध पत्रिका",
    url: "https://forms.gle/VJvWjT9kDkxtniv48",
    analyticsEvent: "smk6_shodhankur_registration_clicked",
  },
  studentProjects: {
    title: "Student Projects",
    url: "https://forms.gle/octRMFkzfrZt9dAF9",
    analyticsEvent: "smk6_student_projects_registration_clicked",
  },
} as const;

export type Smk6ConclaveFormId = keyof typeof SMK_6_EXTERNAL_REGISTRATIONS.conclaves;

export const SMK_6_CONCLAVE_FORMS = [
  SMK_6_EXTERNAL_REGISTRATIONS.conclaves.principalsTeachers,
  SMK_6_EXTERNAL_REGISTRATIONS.conclaves.scientistsResearch,
  SMK_6_EXTERNAL_REGISTRATIONS.conclaves.startupEntrepreneurs,
  SMK_6_EXTERNAL_REGISTRATIONS.conclaves.talent,
] as const;

export const SMK_6_CONCLAVE_REGISTRATION_HREF = `${CANONICAL_ROUTES.registration}?category=Conclave`;

export const SMK_6_PROJECTS_REGISTRATION_HREF = `${CANONICAL_ROUTES.registration}?category=Projects`;

export const SMK_6_SHODHANKUR_REGISTRATION_HREF = `${CANONICAL_ROUTES.registration}?category=Shodhankur`;

export function isSmk6GoogleFormRegistrationType(
  type: RegistrationType
): type is "Projects" | "Shodhankur" {
  return type === "Projects" || type === "Shodhankur";
}

export function isSmk6ConclaveSelectorType(type: RegistrationType): boolean {
  return type === "Conclave";
}

export function smk6GoogleFormForRegistrationType(type: RegistrationType): {
  title: string;
  url: string;
  analyticsEvent: typeof SMK_6_EXTERNAL_REGISTRATIONS.shodhankur.analyticsEvent | typeof SMK_6_EXTERNAL_REGISTRATIONS.studentProjects.analyticsEvent;
} | null {
  if (type === "Projects") return SMK_6_EXTERNAL_REGISTRATIONS.studentProjects;
  if (type === "Shodhankur") return SMK_6_EXTERNAL_REGISTRATIONS.shodhankur;
  return null;
}

export function smk6RegistrationEntryForType(type: RegistrationType): {
  href: string;
  external: boolean;
} {
  if (type === "Multi Track Conference") {
    return { href: "/research/submit", external: false };
  }
  if (type === "Conclave") {
    return { href: SMK_6_CONCLAVE_REGISTRATION_HREF, external: false };
  }
  if (type === "Projects") {
    return { href: SMK_6_EXTERNAL_REGISTRATIONS.studentProjects.url, external: true };
  }
  if (type === "Shodhankur") {
    return { href: SMK_6_EXTERNAL_REGISTRATIONS.shodhankur.url, external: true };
  }
  return { href: CANONICAL_ROUTES.registration, external: false };
}

export function conclaveFormByProgrammeTitle(title: string) {
  const normalized = title.toLowerCase();
  return (
    SMK_6_CONCLAVE_FORMS.find((form) => normalized.startsWith(form.title.toLowerCase())) ?? null
  );
}

const CONCLAVE_FORM_EVENTS: Record<Smk6ConclaveFormId, AnalyticsEventName> = {
  principalsTeachers: ANALYTICS_EVENTS.smk6PrincipalsTeachersRegistrationClicked,
  scientistsResearch: ANALYTICS_EVENTS.smk6ScientistsResearchRegistrationClicked,
  startupEntrepreneurs: ANALYTICS_EVENTS.smk6StartupEntrepreneursRegistrationClicked,
  talent: ANALYTICS_EVENTS.smk6TalentConclaveRegistrationClicked,
};

export function conclaveFormAnalyticsEvent(id: Smk6ConclaveFormId): AnalyticsEventName {
  return CONCLAVE_FORM_EVENTS[id];
}
