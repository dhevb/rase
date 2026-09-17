/**
 * Canonical public SMK 6.0 programme contact directory.
 * Email routing and named coordinators below come from the official 6.0 contact list
 * supplied for website publication. Poster coordinators are additional public contacts
 * already printed on official 6.0 posters — not invented.
 */

import { CANONICAL_ROUTES } from "@/constants/canonical-routes";
import { academicCouncilProgrammeUrl } from "@/data/academic-council-hub";
import { CMT_SUBMIT_PATH } from "@/lib/registration/config";
import {
  SMK_6_CONCLAVE_REGISTRATION_HREF,
  SMK_6_EXTERNAL_REGISTRATIONS,
  type Smk6ConclaveFormId,
} from "@/data/smk-6-external-registrations";
import type { RegistrationType } from "@/types/registration";

export type OfficialContactGroupId =
  | "general"
  | "academic"
  | "student"
  | "conclave"
  | "participation"
  | "media"
  | "partnership";

export type OfficialContactPerson = {
  name: string;
  designation?: string;
  organisation?: string;
  phone?: string;
};

export type OfficialProgrammeContact = {
  id: string;
  programmeName: string;
  group: OfficialContactGroupId;
  people: readonly OfficialContactPerson[];
  email?: string;
  phone?: string;
  detailsUrl?: string;
  registrationUrl?: string;
  registrationExternal?: boolean;
  helpText?: string;
  registrationTypes?: readonly RegistrationType[];
  conclaveFormId?: Smk6ConclaveFormId;
  academicConclaveId?: string;
  source: string;
};

export const OFFICIAL_CONTACT_GROUPS: readonly { id: OfficialContactGroupId | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "general", label: "General" },
  { id: "academic", label: "Academic" },
  { id: "conclave", label: "Conclaves" },
  { id: "student", label: "Student" },
  { id: "participation", label: "Participation" },
  { id: "media", label: "Media" },
  { id: "partnership", label: "Partnership" },
] as const;

const ACADEMICS_EMAIL = "academics@shikshamahakumbh.com";
const CONCLAVES_EMAIL = "conclaves@shikshamahakumbh.com";
const INFO_EMAIL = "info@shikshamahakumbh.com";
const DIRECTOR_EMAIL = "director@shikshamahakumbh.com";

const SHAMSHER: OfficialContactPerson = {
  name: "Dr. Shamsher Singh",
  designation: "Convener, Shiksha Mahakumbh",
  phone: "+91 94632 31250",
};

const DIRECTORY_SOURCE =
  "Official SMK 6.0 public contact directory (programme email routing and named coordinators)";

export const SMK_6_OFFICIAL_CONTACTS: readonly OfficialProgrammeContact[] = [
  {
    id: "general-enquiry",
    programmeName: "General Enquiries",
    group: "general",
    people: [SHAMSHER],
    email: INFO_EMAIL,
    phone: SHAMSHER.phone,
    detailsUrl: CANONICAL_ROUTES.contact,
    registrationUrl: CANONICAL_ROUTES.registration,
    helpText: "For general Shiksha Mahakumbh information and overall coordination.",
    registrationTypes: ["Delegate Registration"],
    source: DIRECTORY_SOURCE,
  },
  {
    id: "multi-track-conference",
    programmeName: "Multi-Track Conference",
    group: "academic",
    people: [],
    email: ACADEMICS_EMAIL,
    detailsUrl: academicCouncilProgrammeUrl("ConferencePage"),
    registrationUrl: CMT_SUBMIT_PATH,
    helpText: "For conference track, paper, presentation, or CMT submission queries.",
    registrationTypes: ["Multi Track Conference"],
    source: DIRECTORY_SOURCE,
  },
  {
    id: "conference-series",
    programmeName: "Conference",
    group: "academic",
    people: [],
    email: ACADEMICS_EMAIL,
    detailsUrl: academicCouncilProgrammeUrl("UniversityConferencesPage"),
    helpText: "For the university and college conference series under Shiksha Mahakumbh Abhiyan.",
    source: DIRECTORY_SOURCE,
  },
  {
    id: "shodhankur",
    programmeName: "Shodhankur",
    group: "student",
    people: [
      {
        name: "डॉ शिक्षा शर्मा",
        designation: "Programme coordinator (official poster)",
        phone: "+91 98788 90303",
      },
    ],
    email: ACADEMICS_EMAIL,
    detailsUrl: academicCouncilProgrammeUrl("PatrikaPage"),
    registrationUrl: SMK_6_EXTERNAL_REGISTRATIONS.shodhankur.url,
    registrationExternal: true,
    helpText: "For Shodhankur student research journal queries.",
    registrationTypes: ["Shodhankur"],
    source: `${DIRECTORY_SOURCE}; Shodhankur official poster`,
  },
  {
    id: "student-projects",
    programmeName: "Student Projects",
    group: "student",
    people: [
      { name: "Dr. Ashwini Rana", designation: "Coordinator (official poster)", phone: "+91 70186 54566" },
      { name: "Mr. Bikash Kumar", designation: "Coordinator (official poster)", phone: "+91 74910 14167" },
      { name: "Dr. Gaurav, DST, Delhi", designation: "Coordinator (official poster)", phone: "90339 25400" },
      { name: "Dr. Rahul", designation: "Coordinator (official poster)", phone: "+91 97360 33342" },
    ],
    email: ACADEMICS_EMAIL,
    detailsUrl: academicCouncilProgrammeUrl("ProjectsPage"),
    registrationUrl: SMK_6_EXTERNAL_REGISTRATIONS.studentProjects.url,
    registrationExternal: true,
    helpText: "For Student Projects / Project Expo registration queries.",
    registrationTypes: ["Projects"],
    source: `${DIRECTORY_SOURCE}; Project Expo official poster`,
  },
  {
    id: "conclaves",
    programmeName: "Conclaves",
    group: "conclave",
    people: [],
    email: CONCLAVES_EMAIL,
    detailsUrl: academicCouncilProgrammeUrl("ConclavePage"),
    registrationUrl: SMK_6_CONCLAVE_REGISTRATION_HREF,
    helpText: "For conclave participation and registration queries.",
    registrationTypes: ["Conclave"],
    source: DIRECTORY_SOURCE,
  },
  {
    id: "conclave-vcs-directors",
    programmeName: "VCs & Directors Conclave",
    group: "conclave",
    people: [
      { name: "Dr. Samsher Singh", designation: "Poster contact", phone: "+91 94632 31250" },
      { name: "Dr. Jatinder Garg", designation: "Poster contact", phone: "+91 95019 56000" },
    ],
    email: DIRECTOR_EMAIL,
    detailsUrl: academicCouncilProgrammeUrl("ConclavePage"),
    academicConclaveId: "vcs-directors",
    helpText: "For Vice-Chancellors & Directors’ Conclave queries.",
    source: `${DIRECTORY_SOURCE}; VCs & Directors Conclave official poster`,
  },
  {
    id: "conclave-principals",
    programmeName: "Principal and Outstanding Teacher Conclave",
    group: "conclave",
    people: [
      { name: "Prof. Anju Batta Sehgal", designation: "Poster contact", phone: "+91 94184 87009" },
      { name: "Dr Kuldeep Sharma", designation: "Poster contact", phone: "+91 94187 80275" },
      { name: "Dr Raman Sharma", designation: "Poster contact", phone: "+91 88943 77363" },
    ],
    email: CONCLAVES_EMAIL,
    detailsUrl: academicCouncilProgrammeUrl("ConclavePage"),
    registrationUrl: SMK_6_EXTERNAL_REGISTRATIONS.conclaves.principalsTeachers.url,
    registrationExternal: true,
    conclaveFormId: "principalsTeachers",
    academicConclaveId: "principal-outstanding-teacher",
    source: `${DIRECTORY_SOURCE}; Principal and Outstanding Teacher Conclave official poster`,
  },
  {
    id: "conclave-scientists",
    programmeName: "Scientists & Research Scholars Conclave",
    group: "conclave",
    people: [{ name: "डॉ सुजीत ठाकुर", designation: "Poster contact", phone: "+91 9310339103" }],
    email: CONCLAVES_EMAIL,
    detailsUrl: academicCouncilProgrammeUrl("ConclavePage"),
    registrationUrl: SMK_6_EXTERNAL_REGISTRATIONS.conclaves.scientistsResearch.url,
    registrationExternal: true,
    conclaveFormId: "scientistsResearch",
    academicConclaveId: "scientists-research-scholars",
    source: `${DIRECTORY_SOURCE}; Scientists & Research Scholars Conclave official poster`,
  },
  {
    id: "conclave-startup",
    programmeName: "Startup Leaders / Entrepreneurs Conclave",
    group: "conclave",
    people: [{ name: "Dr. M. S. Bedi", designation: "Poster contact", phone: "+91 94780 98076" }],
    email: CONCLAVES_EMAIL,
    detailsUrl: academicCouncilProgrammeUrl("ConclavePage"),
    registrationUrl: SMK_6_EXTERNAL_REGISTRATIONS.conclaves.startupEntrepreneurs.url,
    registrationExternal: true,
    conclaveFormId: "startupEntrepreneurs",
    academicConclaveId: "startup-leaders-entrepreneurs",
    source: `${DIRECTORY_SOURCE}; Startup Leaders / Entrepreneurs Conclave official poster`,
  },
  {
    id: "conclave-csr",
    programmeName: "CSR & NGO Conclave",
    group: "conclave",
    people: [{ name: "डॉ. प्रवीण कुमार शर्मा", designation: "Poster contact", phone: "+91 62902 60756" }],
    email: CONCLAVES_EMAIL,
    detailsUrl: academicCouncilProgrammeUrl("ConclavePage"),
    academicConclaveId: "csr-ngo",
    source: `${DIRECTORY_SOURCE}; CSR & NGO Conclave official poster`,
  },
  {
    id: "conclave-media",
    programmeName: "Media Conclave",
    group: "conclave",
    people: [
      { name: "प्रो बाला लखेंद्र", designation: "Poster contact", phone: "+91 79857 35729" },
      { name: "अधिवक्ता आरती शर्मा", designation: "Poster contact", phone: "+91 85279 33391" },
    ],
    email: CONCLAVES_EMAIL,
    detailsUrl: academicCouncilProgrammeUrl("ConclavePage"),
    registrationUrl: SMK_6_EXTERNAL_REGISTRATIONS.conclaves.media.url,
    registrationExternal: true,
    conclaveFormId: "media",
    academicConclaveId: "media",
    source: `${DIRECTORY_SOURCE}; Media Conclave official poster`,
  },
  {
    id: "conclave-talent",
    programmeName: "Talented Students Conclave",
    group: "conclave",
    people: [
      { name: "Dr. Jyoti Khanna", designation: "Poster contact", phone: "+91 95010 20568" },
      { name: "Dr. Pradeep", designation: "Poster contact", phone: "+91 89981 05390" },
    ],
    email: CONCLAVES_EMAIL,
    detailsUrl: academicCouncilProgrammeUrl("ConclavePage"),
    registrationUrl: SMK_6_EXTERNAL_REGISTRATIONS.conclaves.talent.url,
    registrationExternal: true,
    conclaveFormId: "talent",
    academicConclaveId: "talented-students",
    source: `${DIRECTORY_SOURCE}; Talented Students Conclave official poster`,
  },
  {
    id: "conclave-defence",
    programmeName: "Defence and Security Conclave",
    group: "conclave",
    people: [],
    email: CONCLAVES_EMAIL,
    detailsUrl: academicCouncilProgrammeUrl("ConclavePage"),
    academicConclaveId: "defence-security",
    helpText: "No separate phone is printed on the current public Defence and Security Conclave listing.",
    source: DIRECTORY_SOURCE,
  },
  {
    id: "accommodation",
    programmeName: "आवास व्यवस्था / Accommodation",
    group: "participation",
    people: [
      {
        name: "Wing Commander Sanjeev Sharma",
        designation: "DHE",
        phone: "+91 85660 60808",
      },
    ],
    phone: "+91 85660 60808",
    detailsUrl: CANONICAL_ROUTES.registration,
    helpText: "For accommodation enquiries. On-site accommodation registration opens from September 2026.",
    registrationTypes: ["Accommodation"],
    source: DIRECTORY_SOURCE,
  },
  {
    id: "media-press",
    programmeName: "Media / Press Coordination",
    group: "media",
    people: [
      {
        name: "Adv Aarti",
        designation: "Member, DHE",
        phone: "+91 85279 33391",
      },
    ],
    phone: "+91 85279 33391",
    detailsUrl: CANONICAL_ROUTES.press,
    helpText: "For media and press coordination.",
    source: DIRECTORY_SOURCE,
  },
  {
    id: "sponsorship-partnership",
    programmeName: "Sponsorship & Academic Partnership",
    group: "partnership",
    people: [],
    email: DIRECTOR_EMAIL,
    detailsUrl: CANONICAL_ROUTES.departments.sampark,
    helpText: "For sponsorship and academic partnership enquiries, including VCs & Directors’ Conclave coordination.",
    source: DIRECTORY_SOURCE,
  },
  {
    id: "panel-discussion",
    programmeName: "Panel Discussion",
    group: "academic",
    people: [
      {
        name: "प्रो. अवनीश वर्मा",
        designation: "Coordinator (official poster)",
        phone: "+91 94164 81652",
      },
    ],
    phone: "+91 94164 81652",
    detailsUrl: academicCouncilProgrammeUrl("PanelDiscussionPage"),
    helpText: "The official posters do not print a separate programme email.",
    source: "Official Panel Discussion posters",
  },
  {
    id: "olympiad",
    programmeName: "Olympiads",
    group: "student",
    people: [],
    detailsUrl: academicCouncilProgrammeUrl("OlympiadPage"),
    registrationUrl: `${CANONICAL_ROUTES.registration}?category=${encodeURIComponent("Olympiad")}`,
    helpText:
      "A dedicated Olympiad email is not listed in the official 6.0 contact directory. Use General Enquiries.",
    registrationTypes: ["Olympiad"],
    source: "Programme page only — no dedicated email in the official 6.0 contact list",
  },
  {
    id: "awards",
    programmeName: "Awards",
    group: "participation",
    people: [],
    detailsUrl: academicCouncilProgrammeUrl("AwardsPage"),
    registrationUrl: `${CANONICAL_ROUTES.registration}?category=${encodeURIComponent("Awards")}`,
    helpText:
      "A dedicated Awards email is not listed in the official 6.0 contact directory. Use General Enquiries.",
    registrationTypes: ["Awards"],
    source: "Programme page only — no dedicated email in the official 6.0 contact list",
  },
  {
    id: "exhibition",
    programmeName: "Exhibition",
    group: "participation",
    people: [],
    detailsUrl: academicCouncilProgrammeUrl("ExhibitionPage"),
    registrationUrl: `${CANONICAL_ROUTES.registration}?category=${encodeURIComponent("Exhibition")}`,
    helpText:
      "A dedicated Exhibition email is not listed in the official 6.0 contact directory. Use General Enquiries.",
    registrationTypes: ["Exhibition"],
    source: "Programme page only — no dedicated email in the official 6.0 contact list",
  },
  {
    id: "best-practices",
    programmeName: "Best Practices",
    group: "participation",
    people: [],
    detailsUrl: academicCouncilProgrammeUrl("BestPracticesPage"),
    registrationUrl: `${CANONICAL_ROUTES.registration}?category=${encodeURIComponent("Best Practices")}`,
    helpText:
      "A dedicated Best Practices email is not listed in the official 6.0 contact directory. Use General Enquiries.",
    registrationTypes: ["Best Practices"],
    source: "Programme page only — no dedicated email in the official 6.0 contact list",
  },
  {
    id: "cultural",
    programmeName: "Cultural Programme",
    group: "participation",
    people: [],
    detailsUrl: academicCouncilProgrammeUrl("CulturalPage"),
    registrationUrl: `${CANONICAL_ROUTES.registration}?category=${encodeURIComponent("Cultural Program")}`,
    helpText:
      "A dedicated Cultural Programme email is not listed in the official 6.0 contact directory. Use General Enquiries.",
    registrationTypes: ["Cultural Program"],
    source: "Programme page only — no dedicated email in the official 6.0 contact list",
  },
];

export const SMK_6_PROGRAMME_CONTACTS_HASH = "programme-contacts";
export const SMK_6_PROGRAMME_CONTACTS_HREF = `${CANONICAL_ROUTES.contact}#${SMK_6_PROGRAMME_CONTACTS_HASH}`;

export function getOfficialContactById(id: string): OfficialProgrammeContact | undefined {
  return SMK_6_OFFICIAL_CONTACTS.find((item) => item.id === id);
}

export function getOfficialContactByRegistrationType(
  type: string | null | undefined
): OfficialProgrammeContact {
  if (!type) return getOfficialContactById("general-enquiry")!;
  const match = SMK_6_OFFICIAL_CONTACTS.find((item) => item.registrationTypes?.includes(type as RegistrationType));
  return match ?? getOfficialContactById("general-enquiry")!;
}

export function getOfficialContactByConclaveFormId(
  formId: Smk6ConclaveFormId
): OfficialProgrammeContact | undefined {
  return SMK_6_OFFICIAL_CONTACTS.find((item) => item.conclaveFormId === formId);
}

export function getOfficialContactByAcademicConclaveId(
  conclaveId: string
): OfficialProgrammeContact | undefined {
  return SMK_6_OFFICIAL_CONTACTS.find((item) => item.academicConclaveId === conclaveId);
}

export function searchOfficialContacts(
  query: string,
  group: OfficialContactGroupId | "all" = "all"
): OfficialProgrammeContact[] {
  const q = query.trim().toLowerCase();
  return SMK_6_OFFICIAL_CONTACTS.filter((item) => {
    if (group !== "all" && item.group !== group) return false;
    if (!q) return true;
    const haystack = [
      item.programmeName,
      item.email ?? "",
      item.phone ?? "",
      item.helpText ?? "",
      ...item.people.map((person) => `${person.name} ${person.designation ?? ""} ${person.phone ?? ""}`),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `tel:+91${digits}`;
  if (digits.startsWith("91")) return `tel:+${digits}`;
  return `tel:+${digits}`;
}
