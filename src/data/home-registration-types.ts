import { CANONICAL_ROUTES } from "@/constants/canonical-routes";
import { CMT_SUBMISSION_URL } from "@/lib/registration/config";
import { SMK_6_CONCLAVE_REGISTRATION_HREF, SMK_6_EXTERNAL_REGISTRATIONS } from "@/data/smk-6-external-registrations";

export type HomeRegistrationTypeCard = {
  label: string;
  fee: string;
  hint: string;
  href: string;
  external?: boolean;
};

/** Homepage registration overview — links to the unified hub. */
export const HOME_REGISTRATION_TYPES: HomeRegistrationTypeCard[] = [
  {
    label: "Conclave",
    fee: "Google Form",
    hint: "Choose one of four official 6.0 conclave forms",
    href: SMK_6_CONCLAVE_REGISTRATION_HREF,
  },
  {
    label: "Awards · Olympiad",
    fee: "See hub",
    hint: "On-site programme forms at the summit",
    href: CANONICAL_ROUTES.registration,
  },
  {
    label: "Exhibition · Best Practices · Cultural",
    fee: "Free",
    hint: "Institutional and student showcases",
    href: CANONICAL_ROUTES.registration,
  },
  {
    label: "Student Projects",
    fee: "Google Form",
    hint: "Official Student Projects registration form",
    href: SMK_6_EXTERNAL_REGISTRATIONS.studentProjects.url,
    external: true,
  },
  {
    label: "Shodhankur – छात्र शोध पत्रिका",
    fee: "Google Form",
    hint: "Official Shodhankur student research journal form",
    href: SMK_6_EXTERNAL_REGISTRATIONS.shodhankur.url,
    external: true,
  },
  {
    label: "Delegate registration",
    fee: "Varies",
    hint: "Faculty and institutional delegates",
    href: CANONICAL_ROUTES.registration,
  },
  {
    label: "Multi Track Conference",
    fee: "CMT portal",
    hint: "Research papers and abstracts",
    href: CMT_SUBMISSION_URL,
    external: true,
  },
];
