/**
 * Shiksha Mahakumbh Abhiyan — university & college conference series
 * held at partner institutions between Mahakumbh editions (under DHE umbrella).
 */

export type UniversityConferenceStatus = "open" | "coming_soon";

export interface UniversityConferenceEntry {
  id: string;
  title: string;
  acronym?: string;
  hostInstitution: string;
  location: string;
  dates: string;
  mode: string;
  status: UniversityConferenceStatus;
  description: string;
  topics?: string[];
  brochureHref?: string;
  registrationHref?: string;
  websiteHref?: string;
  contactEmail?: string;
  contactPhone?: string;
  deadlines?: { label: string; date: string }[];
  fees?: { category: string; amount: string }[];
  organizers?: string[];
}

export const UNIVERSITY_CONFERENCES_INTRO = {
  titleEn: "Conference",
  titleHi: "सम्मेलन",
  subtitle:
    "National and state-level conferences at partner universities and colleges — held throughout the year under the academic umbrella of Shiksha Mahakumbh Abhiyan, in collaboration with the Department of Holistic Education (DHE).",
  note:
    "These are distinct from the Multi-Track Conference at Shiksha Mahakumbh 6.0 (NIT Hamirpur, 9–11 October 2026). Each entry below is an independent conference at a host institution on a dedicated theme.",
} as const;

export const UNIVERSITY_CONFERENCES: UniversityConferenceEntry[] = [
  {
    id: "aist-2026-sliet",
    title: "National Conference on Artificial Intelligence in Science and Technology",
    acronym: "AIST-2026",
    hostInstitution:
      "Sant Longowal Institute of Engineering and Technology (SLIET), Longowal — Deemed University under MoE, Govt. of India",
    location: "Longowal, Distt. Sangrur, Punjab — 148106",
    dates: "21–22 August 2026",
    mode: "Hybrid",
    status: "open",
    description:
      "AIST-2026 brings together researchers, academicians, scientists, industry professionals, innovators, and students to exchange knowledge on advances in Artificial Intelligence and its role in science and technology. Organized by the Institute Innovation Cell, SLIET Longowal, in collaboration with the Department of Holistic Education (DHE), under the academic umbrella of Shiksha Mahakumbh Abhiyan.",
    topics: [
      "Artificial Intelligence and Machine Learning",
      "Deep Learning and Neural Networks",
      "Generative AI and Large Language Models",
      "Computer Vision and Image Processing",
      "Natural Language Processing",
      "Robotics and Intelligent Systems",
      "IoT and Smart Systems",
      "Edge AI and TinyML",
      "Big Data Analytics",
      "Cybersecurity and AI-based Security",
      "Intelligent Healthcare Technologies",
      "Smart Agriculture and Environmental Monitoring",
      "AI in Education and Learning Systems",
      "Explainable and Trustworthy AI",
      "Industry 4.0 and Smart Manufacturing",
    ],
    brochureHref: "/conferences/aist-2026-sliet-longowal.pdf",
    registrationHref: "https://forms.gle/uxr6zQXg89pQE7qw6",
    websiteHref: "https://www.sliet.ac.in",
    contactEmail: "aist2026@sliet.ac.in",
    contactPhone: "+91 98159 80279",
    deadlines: [
      { label: "Abstract submission", date: "15 July 2026" },
      { label: "Acceptance notification", date: "25 July 2026" },
      { label: "Registration deadline", date: "1 August 2026" },
      { label: "Full paper submission", date: "10 August 2026" },
    ],
    fees: [
      { category: "Research Scholars", amount: "₹500" },
      { category: "Faculty / Scientist", amount: "₹1,000" },
      { category: "Industry", amount: "₹1,200" },
    ],
    organizers: [
      "Dr. Charanjiv Gupta (Organizing Secretary, EIE, SLIET)",
      "Dr. Jagdeep Singh (Organizing Secretary, CSE, SLIET)",
      "Prof. A S Arora (Chairman, IIC, SLIET Longowal)",
    ],
  },
  {
    id: "series-2026-02",
    title: "State University Conference — Theme to be announced",
    hostInstitution: "Partner state university (India)",
    location: "To be announced",
    dates: "2026",
    mode: "Hybrid / Offline",
    status: "coming_soon",
    description:
      "A thematic national conference at a partner state university, coordinated under Shiksha Mahakumbh Abhiyan. Brochure and registration details will be published here.",
  },
  {
    id: "series-2026-03",
    title: "State College Conference — Theme to be announced",
    hostInstitution: "Partner state college (India)",
    location: "To be announced",
    dates: "2026",
    mode: "Hybrid / Offline",
    status: "coming_soon",
    description:
      "A focused academic conference at a partner state college on an emerging education or research theme. Details coming soon.",
  },
  {
    id: "series-2026-04",
    title: "Inter-University Conference — Theme to be announced",
    hostInstitution: "Collaborating universities (India)",
    location: "To be announced",
    dates: "2026",
    mode: "Hybrid",
    status: "coming_soon",
    description:
      "A multi-institutional conference series event under the DHE academic umbrella. Brochure and dates will be announced shortly.",
  },
  {
    id: "series-2026-05",
    title: "Regional Conference — Theme to be announced",
    hostInstitution: "Partner institution (India)",
    location: "To be announced",
    dates: "2026",
    mode: "To be announced",
    status: "coming_soon",
    description:
      "Another conference in the Shiksha Mahakumbh pre-edition series. Watch this page for the official announcement.",
  },
];
