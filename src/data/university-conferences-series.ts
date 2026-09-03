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
    "The official 6.0 brochure proposes 16 multi-track conferences at leading institutions. Three are confirmed on these dates and are not held at NIT Hamirpur: AIST-2026 (SLIET Longowal, 21–22 August 2026, hybrid), the International Conference on Indian Knowledge Systems (Arni University, 11–12 September 2026, hybrid), and ICESED-2026 (Sri Sai University, Palampur, 26–27 September 2026, hybrid). These remain distinct from the Multi-Track Conference at Shiksha Mahakumbh 6.0 (NIT Hamirpur, 9–11 October 2026).",
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
    id: "iks-viksit-bharat-2026-arni",
    title:
      "International Conference on Indian Knowledge Systems for Viksit Bharat 2047",
    acronym: "IKS @2047",
    hostInstitution:
      "Arni University, Kathgarh — in collaboration with the Department of Holistic Education (DHE), Central University of Himachal Pradesh, Institute of Civilizational Studies (USA), and Kavya Garima Hindi Sahitya Manch (Regd.)",
    location: "Arni University, Kathgarh, Indora, Kangra, Himachal Pradesh — 176401",
    dates: "11–12 September 2026",
    mode: "Hybrid (online and in-person)",
    status: "open",
    description:
      "International conference under the academic umbrella of Shiksha Mahakumbh Abhiyan exploring Indian Knowledge Systems for a developed, self-reliant Bharat @2047. Theme: Bridging Traditions & Transforming Futures — interdisciplinary dialogue on indigenous wisdom for education, science, governance, culture, and economic transformation, aligned with NEP 2020. Accepted papers may be considered for Viksit Bharat Journal (ISSN 2278-1757), SATYYA SANDHAN (ISSN 3139-1311), and the International Journal of Arni University (ISSN 2278-4241).",
    topics: [
      "IKS in Science and Engineering (scientific heritage, AI for IKS, metallurgy, astronomy, green tech, agriculture)",
      "Arts and Humanities (Himalayan heritage, yoga/meditation, holistic education, Jyotisha, teerth traditions)",
      "Constitution and Governance (Dharma & Rajdharma, social justice, gender equality, cultural heritage protection)",
      "Business Management (Indian business ethics, leadership, sustainable indigenous practices)",
      "Ancient wisdom for contemporary challenges",
      "Holistic and sustainable development rooted in Bharatiya traditions",
      "Interdisciplinary collaboration and global dialogue",
      "Innovation rooted in tradition",
      "IKS for Viksit Bharat 2047 outcomes",
    ],
    brochureHref: "/conferences/iks-viksit-bharat-2026-arni-university.pdf",
    websiteHref: "https://www.arniuniversity.edu.in",
    contactEmail: "conference@arniuniversity.edu.in",
    contactPhone: "+91 98053 84555 / +91 94632 31250",
    deadlines: [
      { label: "Abstract submission", date: "27 August 2026" },
      { label: "Acceptance notification", date: "1 September 2026" },
      { label: "Full-length paper submission", date: "5 September 2026" },
      { label: "Registration deadline", date: "8 September 2026" },
    ],
    fees: [
      { category: "Students / Research Scholars", amount: "₹700" },
      { category: "Faculty / Academicians", amount: "₹1,000" },
      { category: "Industry Professionals", amount: "₹1,500" },
      { category: "Attendees (without paper)", amount: "₹500" },
      { category: "International Delegates", amount: "USD 25" },
    ],
    organizers: [
      "Chief Patron: Dr. Vivek Singh (Chancellor, Arni University)",
      "Chief Co-Patron: Dr. Thakur SKR (Director, DHE)",
      "Patron: Prof. (Dr.) R.K. Pandey (Vice Chancellor, Arni University)",
      "Convener: Dr. Ashish Kumar Sharma (Dean R&D, Arni University)",
      "Coordinator: Dr. Shamsher Singh (Manager, DHE)",
      "Coordinator: Dr. Pawan Sharma (NIT Hamirpur)",
      "Organizing Secretary: Dr. Jatinder Garg (Central University of Himachal Pradesh)",
    ],
  },
  {
    id: "icesed-2026-sri-sai",
    title:
      "International Conference on Society, Education and Social Development: Emerging Issues and Alternatives",
    acronym: "ICESED-2026",
    hostInstitution:
      "Sri Sai University, Palampur (H.P.) — NAAC Accredited, established under Act No. 3 of 2011 of the Himachal Pradesh State Legislature, UGC notified under Section 22 — in collaboration with Chaudhary Bansi Lal University (CBLU), Bhiwani, Haryana and the Department of Holistic Education (DHE)",
    location: "Sri Sai University, Palampur, Himachal Pradesh",
    dates: "26–27 September 2026",
    mode: "Hybrid",
    status: "open",
    description:
      "International conference under the academic umbrella of Shiksha Mahakumbh 6.0 and DHE, jointly organised by Sri Sai University Palampur and Chaudhary Bansi Lal University (CBLU) Bhiwani. The conference brings together researchers, educators, policymakers, and practitioners to examine contemporary challenges linking society, education, and social development — exploring emerging educational policies, inclusive and equitable education, the role of technology and AI, and interdisciplinary dialogue on sustainable development and social justice. Accepted and peer-reviewed papers will be published in Viksit India / Viksit Bharat Journal (ISSN 2278-1757) and IHRDI Journal of Sustainable Development (ISSN 3049-2750).",
    topics: [
      "Education, Social Transformation and Inclusive Development",
      "Educational Reforms, Governance and Future Ready Learning",
      "Digital Transformation, Innovation and the Future of Work",
      "Sustainable Communities, Urban-Rural Development and Human Well-being",
      "Public Policy, Governance and Research for Social Development",
      "NEP 2020 and Higher Education",
      "Sustainable Development Goals and Universities",
      "Women Empowerment and Inclusive Development",
      "Youth, Innovation and Entrepreneurship",
      "Digital Inclusion",
      "Indigenous Knowledge Systems",
      "International Perspectives on Educational Reforms",
      "AI and Nanotechnology in Education",
      "Climate Change, Environment and Social Justice",
      "Disaster Management, Rehabilitation and Adaptability",
    ],
    brochureHref: "/conferences/sri-sai-university-palampur-icesed-2026.pdf",
    registrationHref: "https://forms.gle/LULLCtMPQUPT1ogJ7",
    websiteHref: "https://www.srisaiuniversity.org",
    contactEmail: "journalsformahakumbh2026@gmail.com",
    contactPhone: "82838 25534 / 9418447541 / 8219393854",
    deadlines: [
      { label: "Last date for abstract submission", date: "15 September 2026" },
      { label: "Notification of acceptance", date: "20 September 2026" },
      { label: "Last date for full paper submission", date: "22 September 2026" },
      { label: "Last date for registration", date: "22 September 2026" },
    ],
    fees: [
      { category: "UG/PG Students", amount: "₹500 (₹1,500 with stay)" },
      { category: "Research Scholars", amount: "₹700 (₹2,100 with stay)" },
      { category: "Faculty / Academicians", amount: "₹1,000 (₹3,000 with stay)" },
      { category: "Industry Professionals", amount: "₹1,500 (₹4,500 with stay)" },
      { category: "Attendees (without paper)", amount: "₹700 (₹2,100 with stay)" },
      { category: "International Delegates", amount: "USD 25 (USD 75 with stay)" },
    ],
    organizers: [
      "Chief Patron: Er. S K Punj (Chancellor, Sri Sai University, Palampur)",
      "Chief Co-Patron: Dr. SKR Thakur (Department of Holistic Education, VB Institute of Training and Research)",
      "Patron: Er. Kanwar Tushar Punj (Vice President, Sri Sai University, Palampur)",
      "Co-Patron: Mrs. Tripta Punj (MD, SSGI); Shri Vijay Nadda (Kshetriya Sangathan Mantri, Vidya Bharati)",
      "Co-Patron: Prof. V.P. Patial (Dean Academics, SSU Palampur)",
      "Coordinator: Mrs. Riya Punj (Coordinator, Shiksha Mahakumbha, DHE)",
      "Convener: Dr. Manoj Kumar Teotia (Chairperson, Dept of Sociology and Social Work, CBLU; President, NWISA)",
      "Convener: Dr. Neempiya Nag",
      "Convener: Er. Adit Rana (HOD, Mechanical Engineering, SSU Palampur)",
    ],
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
