import { CANONICAL_ROUTES } from "@/constants/canonical-routes";
import { CMT_SUBMISSION_URL } from "@/lib/registration/config";
import {
  PROJECT_COLLEGE_STUDENT_FEE,
  PROJECT_SCHOOL_STUDENT_FEE,
} from "@/lib/registration/fees";

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
    label: "Conclave · Awards · Olympiad",
    fee: "Free",
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
    label: "Projects (School)",
    fee: `₹${PROJECT_SCHOOL_STUDENT_FEE}`,
    hint: "School level project display — online payment",
    href: CANONICAL_ROUTES.registration,
  },
  {
    label: "Projects (College / University)",
    fee: `₹${PROJECT_COLLEGE_STUDENT_FEE}`,
    hint: "Higher-ed project display — online payment",
    href: CANONICAL_ROUTES.registration,
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
