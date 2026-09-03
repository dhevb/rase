import { RegistrationType } from "@/types/registration";
import { DELEGATE_FEES } from "@/lib/registration/delegate-categories";
import { CMT_SUBMISSION_URL } from "@/lib/registration/config";

export type CategoryMeta = {
  description: string;
  instructions: string[];
  eligibility: string[];
  fee: string;
  documentsRequired: string[];
  importantNotes: string[];
};

const META: Record<RegistrationType, CategoryMeta> = {
  "Delegate Registration": {
    description: "Register as a delegate for Shiksha Mahakumbh 6.0 sessions and networking.",
    instructions: [
      "Select your delegate category based on role.",
      "Student delegates register free; paid categories proceed to Razorpay.",
      "Complete all participant details before payment.",
    ],
    eligibility: ["Faculty", "Students", "Principals", "Researchers", "Industry professionals"],
    fee: `Student: Free · Teacher/Principal: ₹${DELEGATE_FEES["Teacher (₹1100)"]} · Research Scholar: ₹${DELEGATE_FEES["Research Scholar (₹251)"]} · Director/VC: ₹${DELEGATE_FEES["Director / VC / Chairperson (₹2100)"]} · Industry: ₹${DELEGATE_FEES["Industry Delegate (₹5100)"]}`,
    documentsRequired: [
      "Student ID card for free student category",
      "Payment receipt for paid categories",
      "PAN (if fee ≥ ₹2000)",
    ],
    importantNotes: ["Keep your registration ID for check-in", "Fee varies by category"],
  },
  "Multi Track Conference": {
    description: "Submit research papers and abstracts via Microsoft CMT.",
    instructions: ["You will be redirected to the official CMT portal", "Use the same email for CMT and registration"],
    eligibility: ["Researchers", "Faculty", "Doctoral scholars", "Practitioners"],
    fee: "As per CMT submission guidelines",
    documentsRequired: ["Submission materials as per CMT guidelines"],
    importantNotes: [`Portal: ${CMT_SUBMISSION_URL}`],
  },
  Conclave: {
    description: "Participate in thematic 6.0 conclaves. Each listed conclave has its own official Google Form.",
    instructions: [
      "Select Conclave, then choose the specific conclave.",
      "Register on the official Google Form (opens in a new tab).",
    ],
    eligibility: ["Principals and outstanding teachers", "Scientists and research scholars", "Startup leaders and entrepreneurs", "Talent Conclave participants"],
    fee: "Official Google Form — no payment on this portal",
    documentsRequired: ["As requested on the official form"],
    importantNotes: ["Only four 6.0 conclaves currently have published Google Forms"],
  },
  "Best Practices": {
    description: "Share institutional best practices (500+ words).",
    instructions: ["Prepare a detailed description", "Upload supporting PDF/photos if available"],
    eligibility: ["Institutions", "NGOs", "Practitioners"],
    fee: "Free",
    documentsRequired: ["Supporting PDF (optional)", "Photos (optional)"],
    importantNotes: ["Minimum 500 words for description"],
  },
  Olympiad: {
    description: "Register schools for DHE Olympiad programmes.",
    instructions: ["Upload student list Excel", "Fee calculated per student"],
    eligibility: ["Schools", "Coordinators"],
    fee: "₹200 per student",
    documentsRequired: ["Student list file", "Payment proof if applicable"],
    importantNotes: ["Verify student count matches upload"],
  },
  Awards: {
    description: "Nominate individuals or institutions for excellence awards.",
    instructions: ["Select award category", "Describe achievements clearly"],
    eligibility: ["Teachers", "Principals", "Institutions", "Innovators"],
    fee: "Free",
    documentsRequired: ["Supporting documents (optional)"],
    importantNotes: ["Nomination subject to jury review"],
  },
  Exhibition: {
    description: "Showcase innovations and projects at the exhibition.",
    instructions: ["Provide title and description of exhibit"],
    eligibility: ["Students", "Institutions", "Innovators"],
    fee: "Free",
    documentsRequired: ["None"],
    importantNotes: ["Space allocation subject to availability"],
  },
  Projects: {
    description: "Register school, college, or university student projects for Shiksha Mahakumbh 6.0 via the official Google Form.",
    instructions: [
      "Open the official Student Projects Google Form.",
      "Complete the form in a new tab — responses are not collected on this website.",
    ],
    eligibility: ["School students", "College students", "University students"],
    fee: "As specified on the official Google Form",
    documentsRequired: ["As requested on the official form"],
    importantNotes: ["Student Projects is separate from Shodhankur"],
  },
  Shodhankur: {
    description: "Shodhankur – छात्र शोध पत्रिका. Apply through the official Google Form.",
    instructions: [
      "Open the official Shodhankur Google Form.",
      "Complete the form in a new tab — responses are not collected on this website.",
    ],
    eligibility: ["School students (Classes 9–12)", "Teachers guiding submissions"],
    fee: "Official Google Form — no payment on this portal",
    documentsRequired: ["As requested on the official form"],
    importantNotes: ["Shodhankur is separate from Student Projects"],
  },
  "Cultural Program": {
    description: "Register for cultural programme participation.",
    instructions: ["Describe your performance or contribution"],
    eligibility: ["Students", "Institutions", "Cultural groups"],
    fee: "Free",
    documentsRequired: ["None"],
    importantNotes: ["Schedule shared after curation"],
  },
  Accommodation: {
    description: "Accommodation registration is not open yet.",
    instructions: [
      "Accommodation registration will open from the beginning of September.",
      "Further details will be shared on the registration page and by email.",
    ],
    eligibility: ["Registered SMK 6.0 participants"],
    fee: "Opens September 2026",
    documentsRequired: ["None at this time"],
    importantNotes: ["Complete your programme registration first"],
  },
};

export function getCategoryMeta(type: RegistrationType): CategoryMeta {
  return META[type];
}

export type FeeBadgeTone = "free" | "paid" | "external" | "variable";

const FEE_BADGES: Record<RegistrationType, { label: string; tone: FeeBadgeTone }> = {
  "Delegate Registration": { label: "₹0–₹5100", tone: "variable" },
  "Multi Track Conference": { label: "External · CMT", tone: "external" },
  Conclave: { label: "External form", tone: "external" },
  "Best Practices": { label: "Free", tone: "free" },
  Olympiad: { label: "₹200 / student", tone: "paid" },
  Awards: { label: "Free", tone: "free" },
  Exhibition: { label: "Free", tone: "free" },
  Projects: { label: "External form", tone: "external" },
  Shodhankur: { label: "External form", tone: "external" },
  "Cultural Program": { label: "Free", tone: "free" },
  Accommodation: { label: "Opens Sep", tone: "free" },
};

export function getCategoryFeeBadge(type: RegistrationType): {
  label: string;
  tone: FeeBadgeTone;
} {
  return FEE_BADGES[type];
}
