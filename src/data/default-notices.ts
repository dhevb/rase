import type { CmsNotice } from "@/lib/cms/types";
import { event } from "@/design/tokens";
import { ACADEMIC_PUBLICATION_NOTE } from "@/data/academic-council-tracks";
import { CMT_SUBMISSION_URL } from "@/lib/registration/config";
import { academicCouncilProgrammeUrl } from "@/data/academic-council-hub";
import {
  conclaveFormByProgrammeTitle,
  SMK_6_EXTERNAL_REGISTRATIONS,
} from "@/data/smk-6-external-registrations";
import {
  conclaves,
  SMK_6_PROJECT_EXPO_OFFICIAL,
  SMK_6_SHODHANKUR_OFFICIAL,
  SMK_6_PANEL_DISCUSSIONS,
  SMK_6_PANEL_DISCUSSION_OFFICIAL,
} from "@/components/vibhag/academic/academic-content-data";
import {
  officialScheduleAnnouncementCopy,
  SMK_6_SCHEDULE_DOWNLOAD_FILENAME,
  SMK_6_SCHEDULE_DOWNLOAD_HREF,
  SMK_6_SCHEDULE_DOWNLOAD_MIME,
  SMK_6_SCHEDULE_META,
  SMK_6_SCHEDULE_NOTICE_SLUG,
  SMK_6_SCHEDULE_NOTICE_SLUG_HI,
} from "@/data/smk-6-official-schedule";
import { SMK_6_PROGRAMME_CONTACTS_HREF } from "@/data/smk-6-official-contacts";
import { REGISTRATION_DEADLINE, REGISTRATION_PATH } from "@/data/registration-hub";

function buildOfficialScheduleNotice(locale: "en" | "hi"): CmsNotice {
  const hi = locale === "hi";
  const copy = officialScheduleAnnouncementCopy();
  return {
    id: hi ? "default-smk6-official-schedule-hi" : "default-smk6-official-schedule",
    title: hi ? "आधिकारिक कार्यक्रम सारणी — शिक्षा महाकुंभ 6.0" : "Official Schedule — Shiksha Mahakumbh 6.0",
    slug: hi ? SMK_6_SCHEDULE_NOTICE_SLUG_HI : SMK_6_SCHEDULE_NOTICE_SLUG,
    description: hi
      ? `${SMK_6_SCHEDULE_META.tableTitle} अब उपलब्ध है। ${SMK_6_SCHEDULE_META.datesLabel} · ${SMK_6_SCHEDULE_META.venue}. ${SMK_6_SCHEDULE_META.themeHi} — ${SMK_6_SCHEDULE_META.themeEn}. पूर्ण सारणी: ${copy.href}. आधिकारिक दस्तावेज़: ${SMK_6_SCHEDULE_DOWNLOAD_HREF}`
      : `The complete official programme schedule for Shiksha Mahakumbh 6.0 at NIT Hamirpur is now available. ${SMK_6_SCHEDULE_META.datesLabel}. ${SMK_6_SCHEDULE_META.tableTitle}. Theme: ${SMK_6_SCHEDULE_META.themeHi} — ${SMK_6_SCHEDULE_META.themeEn}. View: ${copy.href}. Official document: ${SMK_6_SCHEDULE_DOWNLOAD_HREF}`,
    priority: 13,
    isPinned: true,
    publishAt: "2026-09-17T00:00:00.000Z",
    expireAt: null,
    category: hi
      ? { name: "कार्यक्रम", slug: "programmes" }
      : { name: "Programmes", slug: "programmes" },
    attachments: [
      {
        id: hi ? "att-smk6-official-schedule-hi" : "att-smk6-official-schedule",
        fileName: SMK_6_SCHEDULE_DOWNLOAD_FILENAME,
        fileUrl: SMK_6_SCHEDULE_DOWNLOAD_HREF,
        mimeType: SMK_6_SCHEDULE_DOWNLOAD_MIME,
      },
    ],
  };
}

const SMK6_CONCLAVE_DETAILS_HREF = academicCouncilProgrammeUrl("ConclavePage");

function buildSmk6PanelDiscussionNotices(locale: "en" | "hi"): CmsNotice[] {
  const hi = locale === "hi";
  const detailsHref = academicCouncilProgrammeUrl("PanelDiscussionPage");
  const coordinator = `${SMK_6_PANEL_DISCUSSION_OFFICIAL.coordinator.nameHi} ${SMK_6_PANEL_DISCUSSION_OFFICIAL.coordinator.phone}`;
  return SMK_6_PANEL_DISCUSSIONS.map((session) => {
    const panelists = session.panelists.map((person) => `${person.name}, ${person.designation}`).join("; ");
    return {
      id: hi ? `default-smk6-panel-${session.id}-hi` : `default-smk6-panel-${session.id}`,
      title: hi
        ? `शिक्षा महाकुंभ 6.0 — पैनल परिचर्चा: ${session.title}`
        : `Shiksha Mahakumbh 6.0 — Panel Discussion: ${session.title}`,
      slug: hi ? `smk-6-panel-discussion-${session.id}-hi` : `smk-6-panel-discussion-${session.id}`,
      description: hi
        ? `Panel Discussion, ${session.date} · ${session.time} · ${session.venue}. विषय: ${session.title}. Moderator: ${session.moderator.name}, ${session.moderator.designation}. Esteemed panelists: ${panelists}. समन्वयक: ${coordinator}. विवरण: ${detailsHref}`
        : `Panel Discussion, ${session.date} · ${session.time} · ${session.venue}. Topic: ${session.title}. Moderator: ${session.moderator.name}, ${session.moderator.designation}. Esteemed panelists: ${panelists}. Coordinator: ${coordinator}. Details: ${detailsHref}`,
      priority: 8,
      isPinned: false,
      publishAt: "2026-09-17T00:00:00.000Z",
      expireAt: null,
      category: hi
        ? { name: "कार्यक्रम", slug: "programmes" }
        : { name: "Programmes", slug: "programmes" },
      attachments: [
        {
          id: hi ? `att-smk6-panel-${session.id}-hi` : `att-smk6-panel-${session.id}`,
          fileName: session.poster.src.split("/").pop() ?? `${session.id}.webp`,
          fileUrl: session.poster.src,
          mimeType: "image/webp",
        },
      ],
    } satisfies CmsNotice;
  });
}

function buildSmk6ProgrammePosterNotices(locale: "en" | "hi"): CmsNotice[] {
  const hi = locale === "hi";
  const shodhankurHref = academicCouncilProgrammeUrl("PatrikaPage");
  const projectsHref = academicCouncilProgrammeUrl("ProjectsPage");
  const shodhankurForm = SMK_6_EXTERNAL_REGISTRATIONS.shodhankur.url;
  const projectsForm = SMK_6_EXTERNAL_REGISTRATIONS.studentProjects.url;
  return [
    {
      id: hi ? "default-smk6-shodhankur-hi" : "default-smk6-shodhankur",
      title: hi
        ? "शिक्षा महाकुंभ 6.0 — शोधांकुर (छात्र शोध पत्रिका)"
        : "Shiksha Mahakumbh 6.0 — Shodhankur (Chhatra Shodh Patrika)",
      slug: hi ? "smk-6-shodhankur-hi" : "smk-6-shodhankur",
      description: hi
        ? `शोधांकुर, ${SMK_6_SHODHANKUR_OFFICIAL.date} · ${SMK_6_SHODHANKUR_OFFICIAL.time} · ${SMK_6_SHODHANKUR_OFFICIAL.venue}. पात्रता: ${SMK_6_SHODHANKUR_OFFICIAL.eligibility}. लेख जमा अंतिम तिथि: ${SMK_6_SHODHANKUR_OFFICIAL.submissionDeadline}. ${SMK_6_SHODHANKUR_OFFICIAL.sessionNote} समन्वयक: ${SMK_6_SHODHANKUR_OFFICIAL.contact}. विवरण: ${shodhankurHref}. पंजीकरण: ${shodhankurForm}`
        : `Shodhankur, ${SMK_6_SHODHANKUR_OFFICIAL.date} · ${SMK_6_SHODHANKUR_OFFICIAL.time} · ${SMK_6_SHODHANKUR_OFFICIAL.venue}. Eligibility: ${SMK_6_SHODHANKUR_OFFICIAL.eligibility}. Paper/article submission deadline: ${SMK_6_SHODHANKUR_OFFICIAL.submissionDeadline}. ${SMK_6_SHODHANKUR_OFFICIAL.sessionNote} Coordinator: ${SMK_6_SHODHANKUR_OFFICIAL.contact}. Details: ${shodhankurHref}. Registration: ${shodhankurForm}`,
      priority: 8,
      isPinned: false,
      publishAt: "2026-09-16T00:00:00.000Z",
      expireAt: null,
      category: hi
        ? { name: "कार्यक्रम", slug: "programmes" }
        : { name: "Programmes", slug: "programmes" },
      attachments: [
        {
          id: hi ? "att-smk6-shodhankur-hi" : "att-smk6-shodhankur",
          fileName: "smk-6-shodhankur.webp",
          fileUrl: SMK_6_SHODHANKUR_OFFICIAL.poster.src,
          mimeType: "image/webp",
        },
      ],
    },
    {
      id: hi ? "default-smk6-project-expo-hi" : "default-smk6-project-expo",
      title: hi
        ? "शिक्षा महाकुंभ 6.0 — प्रोजेक्ट एक्सपो 2026"
        : "Shiksha Mahakumbh 6.0 — Project Expo 2026",
      slug: hi ? "smk-6-project-expo-hi" : "smk-6-project-expo",
      description: hi
        ? `Project Expo 2026, ${SMK_6_PROJECT_EXPO_OFFICIAL.dates} · ${SMK_6_PROJECT_EXPO_OFFICIAL.time} · ${SMK_6_PROJECT_EXPO_OFFICIAL.venue}. ${SMK_6_PROJECT_EXPO_OFFICIAL.tagline}. ${SMK_6_PROJECT_EXPO_OFFICIAL.mentorshipNote} समन्वयक: ${SMK_6_PROJECT_EXPO_OFFICIAL.coordinators.join(" | ")}. विवरण: ${projectsHref}. पंजीकरण: ${projectsForm}`
        : `Project Expo 2026, ${SMK_6_PROJECT_EXPO_OFFICIAL.dates} · ${SMK_6_PROJECT_EXPO_OFFICIAL.time} · ${SMK_6_PROJECT_EXPO_OFFICIAL.venue}. ${SMK_6_PROJECT_EXPO_OFFICIAL.tagline}. ${SMK_6_PROJECT_EXPO_OFFICIAL.mentorshipNote} Coordinators: ${SMK_6_PROJECT_EXPO_OFFICIAL.coordinators.join(" | ")}. Details: ${projectsHref}. Registration: ${projectsForm}`,
      priority: 8,
      isPinned: false,
      publishAt: "2026-09-16T00:00:00.000Z",
      expireAt: null,
      category: hi
        ? { name: "कार्यक्रम", slug: "programmes" }
        : { name: "Programmes", slug: "programmes" },
      attachments: [
        {
          id: hi ? "att-smk6-project-expo-hi" : "att-smk6-project-expo",
          fileName: "smk-6-project-expo.webp",
          fileUrl: SMK_6_PROJECT_EXPO_OFFICIAL.poster.src,
          mimeType: "image/webp",
        },
      ],
    },
  ];
}

function buildSmk6ConclaveNotices(locale: "en" | "hi"): CmsNotice[] {
  return conclaves.flatMap((conclave) => {
    if (!("poster" in conclave) || !conclave.poster) return [];
    const form = conclaveFormByProgrammeTitle(conclave.title);
    const hi = locale === "hi";
    const title = hi
      ? `शिक्षा महाकुंभ 6.0 — ${"titleHi" in conclave && conclave.titleHi ? conclave.titleHi : conclave.title}`
      : `Shiksha Mahakumbh 6.0 — ${conclave.title}`;
    const when = [conclave.date, conclave.time, conclave.venue].filter(Boolean).join(" · ");
    const registerLine = form
      ? hi
        ? `पंजीकरण: ${form.url}`
        : `Registration: ${form.url}`
      : hi
        ? "पोस्टर पर पंजीकरण QR है; पोस्टर पर कोई वेब पता मुद्रित नहीं है।"
        : "The official poster shows a registration QR code; no registration URL is printed on the poster.";
    const description = hi
      ? `${conclave.title}. ${when}. विषय: ${conclave.theme}. विवरण: ${SMK6_CONCLAVE_DETAILS_HREF}. ${registerLine}`
      : `${conclave.title}. ${when}. Theme: ${conclave.theme}. Details: ${SMK6_CONCLAVE_DETAILS_HREF}. ${registerLine}`;
    return [
      {
        id: hi ? `default-smk6-conclave-${conclave.id}-hi` : `default-smk6-conclave-${conclave.id}`,
        title,
        slug: hi ? `smk-6-conclave-${conclave.id}-hi` : `smk-6-conclave-${conclave.id}`,
        description,
        priority: 8,
        isPinned: false,
        publishAt: "2026-09-16T00:00:00.000Z",
        expireAt: null,
        category: hi
          ? { name: "कार्यक्रम", slug: "programmes" }
          : { name: "Programmes", slug: "programmes" },
        attachments: [
          {
            id: hi ? `att-smk6-conclave-${conclave.id}-hi` : `att-smk6-conclave-${conclave.id}`,
            fileName: conclave.poster.src.split("/").pop() ?? `${conclave.id}.webp`,
            fileUrl: conclave.poster.src,
            mimeType: "image/webp",
          },
        ],
      } satisfies CmsNotice,
    ];
  });
}

/** Published fallback notices when CMS / database has none (English). */
export const DEFAULT_NOTICES_EN: CmsNotice[] = [
  buildOfficialScheduleNotice("en"),
  {
    id: "default-aist-2026-sliet",
    title: "AIST-2026 — National Conference on AI in Science & Technology (SLIET Longowal)",
    slug: "aist-2026-sliet-longowal",
    description:
      "National Conference on Artificial Intelligence in Science and Technology (AIST-2026) will be held at SLIET Longowal (Punjab) on 21–22 August 2026 in hybrid mode, under the academic umbrella of Shiksha Mahakumbh Abhiyan with the Department of Holistic Education (DHE). Key dates: abstract submission 15 July 2026; acceptance 25 July 2026; registration 1 August 2026; full paper 10 August 2026. Fees from ₹500 (research scholars). Download the official brochure and register via the Academic Council → Conference tab.",
    priority: 12,
    isPinned: true,
    publishAt: "2026-07-01T00:00:00.000Z",
    expireAt: null,
    category: { name: "Programmes", slug: "programmes" },
    attachments: [
      {
        id: "att-aist-2026-pdf",
        fileName: "AIST-2026-SLIET-Longowal-brochure.pdf",
        fileUrl: "/conferences/aist-2026-sliet-longowal.pdf",
        mimeType: "application/pdf",
      },
    ],
  },
  {
    id: "default-iks-arni-2026",
    title:
      "IKS @2047 — International Conference on Indian Knowledge Systems (Arni University)",
    slug: "iks-viksit-bharat-2026-arni-university",
    description:
      "International Conference on Indian Knowledge Systems for Viksit Bharat 2047 will be held at Arni University, Kathgarh, Indora, Kangra (H.P.) on 11–12 September 2026 in hybrid mode, under the umbrella of Shiksha Mahakumbh Abhiyan with DHE, Central University of Himachal Pradesh, Institute of Civilizational Studies (USA), and Kavya Garima Hindi Sahitya Manch. Theme: Bridging Traditions & Transforming Futures. Tracks cover IKS in science & engineering, arts & humanities, constitution & governance, and business management. Key dates: abstract 27 August 2026; acceptance 1 September 2026; full paper 5 September 2026; registration 8 September 2026. Contact: conference@arniuniversity.edu.in · +91 98053 84555. Brochure PDF attached; full details on Academic Council → Conference.",
    priority: 11,
    isPinned: true,
    publishAt: "2026-08-01T00:00:00.000Z",
    expireAt: null,
    category: { name: "Programmes", slug: "programmes" },
    attachments: [
      {
        id: "att-iks-arni-2026-pdf",
        fileName: "IKS-Viksit-Bharat-2026-Arni-University-brochure.pdf",
        fileUrl: "/conferences/iks-viksit-bharat-2026-arni-university.pdf",
        mimeType: "application/pdf",
      },
    ],
  },
  {
    id: "default-icesed-sri-sai-2026",
    title:
      "International Conference on Society, Education and Social Development (Sri Sai University, Palampur)",
    slug: "icesed-2026-sri-sai-university-palampur",
    description:
      "International Conference on Society, Education and Social Development: Emerging Issues and Alternatives will be held at Sri Sai University, Palampur (H.P.) on 26–27 September 2026 in hybrid mode, jointly organised with Chaudhary Bansi Lal University (CBLU), Bhiwani, under the academic umbrella of Shiksha Mahakumbh 6.0 with the Department of Holistic Education (DHE). Key dates: abstract submission 15 September 2026; acceptance 20 September 2026; full paper & registration 22 September 2026. Registration via official Google Form. Accepted papers will be published in Viksit India / Viksit Bharat Journal (ISSN 2278-1757). Contact: journalsformahakumbh2026@gmail.com | 82838 25534. Download brochure and register via the Academic Council → Conference tab.",
    priority: 10,
    isPinned: true,
    publishAt: "2026-08-15T00:00:00.000Z",
    expireAt: null,
    category: { name: "Programmes", slug: "programmes" },
    attachments: [
      {
        id: "att-icesed-sri-sai-2026-pdf",
        fileName: "sri-sai-university-palampur-icesed-2026.pdf",
        fileUrl: "/conferences/sri-sai-university-palampur-icesed-2026.pdf",
        mimeType: "application/pdf",
      },
    ],
  },
  ...buildSmk6ProgrammePosterNotices("en"),
  ...buildSmk6PanelDiscussionNotices("en"),
  ...buildSmk6ConclaveNotices("en"),
  {
    id: "default-registration-deadline-extended",
    title: "Registration Deadline Extended — 30 September 2026",
    slug: "registration-deadline-extended-smk-6",
    description:
      `Applicable Shiksha Mahakumbh 6.0 registrations have been extended until ${REGISTRATION_DEADLINE}. Participants are requested to complete registration by the revised deadline. Register at ${REGISTRATION_PATH}. Media Conclave uses the official Google Form on the Conclaves section of that page.`,
    priority: 14,
    isPinned: true,
    publishAt: "2026-09-17T00:00:00.000Z",
    expireAt: null,
    category: { name: "Registration", slug: "registration" },
    attachments: [],
  },
  {
    id: "default-registration-open",
    title: `Registration Open — ${event.name}`,
    slug: "registration-open-smk-6",
    description:
      `Unified registration is open for delegates, academic conclaves, exhibitions, project displays, and accommodation requests. DHE Olympiad exam dates are to be announced — apply via the registration hub when open. For programme-specific help, see ${SMK_6_PROGRAMME_CONTACTS_HREF}. The summit runs 9–11 October 2026 at ${event.venue}, ${event.location}.`,
    priority: 9,
    isPinned: true,
    publishAt: "2026-05-01T00:00:00.000Z",
    expireAt: null,
    category: { name: "Registration", slug: "registration" },
    attachments: [],
  },
  {
    id: "default-venue-dates",
    title: `Venue & Dates — ${event.venue}`,
    slug: "venue-dates-smk-6",
    description:
      `${event.name} will be hosted at National Institute of Technology Hamirpur (NIT Hamirpur / NITH), ${event.location} on 9–11 October 2026. Plan travel via Dharamshala (Gaggal) or Chandigarh airports and Una/Amb Andaura railway stations. Venue maps and local stay guidance will be updated on the notice board.`,
    priority: 9,
    isPinned: true,
    publishAt: "2026-05-01T00:00:00.000Z",
    expireAt: null,
    category: { name: "General", slug: "general" },
    attachments: [],
  },
  {
    id: "default-mtc-abstracts",
    title: "Multi-Track Conference — Paper & Abstract Submission",
    slug: "mtc-abstract-submission-2026",
    description:
      `Authors may submit research papers and abstracts for the Multi-Track International Conference through the official CMT portal (${CMT_SUBMISSION_URL}). Review timelines, formatting guidelines, and track listings are on the Academic Council conference page. ${ACADEMIC_PUBLICATION_NOTE}`,
    priority: 7,
    isPinned: false,
    publishAt: "2026-05-15T00:00:00.000Z",
    expireAt: null,
    category: { name: "Programmes", slug: "programmes" },
    attachments: [],
  },
  {
    id: "default-olympiads",
    title: "DHE Olympiads & Talent Programmes — Dates TBA",
    slug: "dhe-olympiads-2026",
    description:
      "DHE Olympiads (Classes 3–10), Talented Students Conclave, and Shodhankur participation will open via the registration hub. Registration and exam dates to be announced; top achievers felicitated at Shiksha Mahakumbh 6.0.",
    priority: 6,
    isPinned: false,
    publishAt: "2026-05-20T00:00:00.000Z",
    expireAt: null,
    category: { name: "Programmes", slug: "programmes" },
    attachments: [],
  },
  {
    id: "default-accommodation",
    title: "Accommodation — Request via Registration",
    slug: "accommodation-smk-6",
    description:
      "Delegates requiring campus or hotel accommodation should indicate preferences during registration. Allotment confirmations, check-in timings, and transport shuttles will be shared closer to the event. Official contact: Wing Commander Sanjeev Sharma, DHE, +91 85660 60808. Programme contacts: " +
      SMK_6_PROGRAMME_CONTACTS_HREF,
    priority: 5,
    isPinned: false,
    publishAt: "2026-06-01T00:00:00.000Z",
    expireAt: null,
    category: { name: "Registration", slug: "registration" },
    attachments: [],
  },
  {
    id: "default-sponsorship",
    title: "Sponsorship & Institutional Partnership Window",
    slug: "sponsorship-partnership-2026",
    description:
      "CSR, industry, media, and institutional partnership enquiries are invited for Shiksha Mahakumbh 6.0. Sponsors receive brand visibility across conclaves, exhibitions, and national outreach. Official contact: director@shikshamahakumbh.com. Programme contacts: " +
      SMK_6_PROGRAMME_CONTACTS_HREF,
    priority: 4,
    isPinned: false,
    publishAt: "2026-06-01T00:00:00.000Z",
    expireAt: null,
    category: { name: "General", slug: "general" },
    attachments: [],
  },
  {
    id: "default-project-display",
    title: "Project Display & Exhibition Registration",
    slug: "project-display-exhibition-2026",
    description:
      "Higher-education institutions and student innovators may register for project displays, best-practice exhibitions, and startup showcases. Space is limited — submit institutional nominations through the HEI project display form linked from registration.",
    priority: 3,
    isPinned: false,
    publishAt: "2026-06-10T00:00:00.000Z",
    expireAt: null,
    category: { name: "Programmes", slug: "programmes" },
    attachments: [],
  },
  {
    id: "default-volunteer",
    title: "Volunteer Orientation & Campus Roles",
    slug: "volunteer-orientation-2026",
    description:
      "Student and faculty volunteers for registration desks, conclave logistics, and exhibition support will receive orientation briefings before the summit. Expression-of-interest forms will be circulated to participating institutions; watch this board for schedule updates.",
    priority: 2,
    isPinned: false,
    publishAt: "2026-06-15T00:00:00.000Z",
    expireAt: null,
    category: { name: "General", slug: "general" },
    attachments: [],
  },
];

/** Hindi fallback notices (used when locale is hi and DB is empty). */
export const DEFAULT_NOTICES_HI: CmsNotice[] = [
  buildOfficialScheduleNotice("hi"),
  {
    id: "default-aist-2026-sliet-hi",
    title: "AIST-2026 — कृत्रिम बुद्धिमत्ता सम्मेलन (SLIET लौंगोवाल)",
    slug: "aist-2026-sliet-longowal-hi",
    description:
      "कृत्रिम बुद्धिमत्ता विज्ञान एवं प्रौद्योगिकी राष्ट्रीय सम्मेलन (AIST-2026) SLIET लौंगोवाल में 21–22 अगस्त 2026 (हाइब्रिड) — शिक्षा महाकुंभ अभियान व डीएचई के अंतर्गत। सार-पत्र अंतिम तिथि 15 जुलाई 2026। ब्रॉशर शैक्षिक परिषद → सम्मेलन टैब पर उपलब्ध।",
    priority: 12,
    isPinned: true,
    publishAt: "2026-07-01T00:00:00.000Z",
    expireAt: null,
    category: { name: "कार्यक्रम", slug: "programmes" },
    attachments: [
      {
        id: "att-aist-2026-pdf-hi",
        fileName: "AIST-2026-SLIET-Longowal-brochure.pdf",
        fileUrl: "/conferences/aist-2026-sliet-longowal.pdf",
        mimeType: "application/pdf",
      },
    ],
  },
  {
    id: "default-iks-arni-2026-hi",
    title: "IKS @2047 — भारतीय ज्ञान प्रणाली सम्मेलन (अरनी विश्वविद्यालय)",
    slug: "iks-viksit-bharat-2026-arni-university-hi",
    description:
      "अंतरराष्ट्रीय सम्मेलन — भारतीय ज्ञान प्रणालियाँ विकसित भारत 2047 हेतु, अरनी विश्वविद्यालय (काठगढ़, इंदौरा, कांगड़ा) में 11–12 सितंबर 2026 (हाइब्रिड), शिक्षा महाकुंभ अभियान व डीएचई के अंतर्गत। सार-पत्र 27 अगस्त 2026। संपर्क: conference@arniuniversity.edu.in। ब्रॉशर शैक्षिक परिषद → सम्मेलन टैब पर।",
    priority: 11,
    isPinned: true,
    publishAt: "2026-08-01T00:00:00.000Z",
    expireAt: null,
    category: { name: "कार्यक्रम", slug: "programmes" },
    attachments: [
      {
        id: "att-iks-arni-2026-pdf-hi",
        fileName: "IKS-Viksit-Bharat-2026-Arni-University-brochure.pdf",
        fileUrl: "/conferences/iks-viksit-bharat-2026-arni-university.pdf",
        mimeType: "application/pdf",
      },
    ],
  },
  {
    id: "default-icesed-sri-sai-2026-hi",
    title:
      "अंतरराष्ट्रीय सम्मेलन: समाज, शिक्षा एवं सामाजिक विकास (श्री साई विश्वविद्यालय, पालमपुर)",
    slug: "icesed-2026-sri-sai-university-palampur-hi",
    description:
      "श्री साई विश्वविद्यालय, पालमपुर (हि.प्र.) व चौधरी बंसी लाल विश्वविद्यालय (CBLU) भिवानी के संयुक्त तत्वावधान में अंतरराष्ट्रीय सम्मेलन — 26–27 सितंबर 2026 (हाइब्रिड), शिक्षा महाकुंभ 6.0 व डीएचई के अंतर्गत। सार-पत्र अंतिम तिथि 15 सितंबर 2026; पंजीकरण 22 सितंबर 2026। संपर्क: journalsformahakumbh2026@gmail.com | 82838 25534। ब्रॉशर शैक्षिक परिषद → सम्मेलन टैब पर।",
    priority: 10,
    isPinned: true,
    publishAt: "2026-08-15T00:00:00.000Z",
    expireAt: null,
    category: { name: "कार्यक्रम", slug: "programmes" },
    attachments: [
      {
        id: "att-icesed-sri-sai-2026-pdf-hi",
        fileName: "sri-sai-university-palampur-icesed-2026.pdf",
        fileUrl: "/conferences/sri-sai-university-palampur-icesed-2026.pdf",
        mimeType: "application/pdf",
      },
    ],
  },
  ...buildSmk6ProgrammePosterNotices("hi"),
  ...buildSmk6PanelDiscussionNotices("hi"),
  ...buildSmk6ConclaveNotices("hi"),
  {
    id: "default-registration-deadline-extended-hi",
    title: "पंजीकरण अंतिम तिथि बढ़ाई गई — 30 सितंबर 2026",
    slug: "registration-deadline-extended-smk-6-hi",
    description:
      `शिक्षा महाकुंभ 6.0 के लागू कार्यक्रमों का पंजीकरण ${REGISTRATION_DEADLINE} तक बढ़ाया गया है। कृपया संशोधित तिथि तक पंजीकरण पूर्ण करें। पंजीकरण: ${REGISTRATION_PATH}`,
    priority: 14,
    isPinned: true,
    publishAt: "2026-09-17T00:00:00.000Z",
    expireAt: null,
    category: { name: "पंजीकरण", slug: "registration" },
    attachments: [],
  },
  {
    id: "default-registration-hi",
    title: "शिक्षा महाकुंभ 6.0 — पंजीकरण खुला",
    slug: "smk-6-registration-hi",
    description:
      "9–11 अक्टूबर 2026, एनआईटी हमीरपुर। प्रतिनिधि, अधिवेशन, ओलंपियाड, प्रदर्शनी और आवास के लिए एकीकृत पंजीकरण प्रारंभ।",
    priority: 9,
    isPinned: true,
    publishAt: "2026-05-01T00:00:00.000Z",
    expireAt: null,
    category: { name: "पंजीकरण", slug: "registration" },
    attachments: [],
  },
  {
    id: "default-venue-hi",
    title: "स्थान एवं तिथि — एनआईटी हमीरपुर",
    slug: "venue-travel-hi",
    description:
      "शिक्षा महाकुंभ 6.0 एनआईटी हमीरपुर, हिमाचल प्रदेश में 9–11 अक्टूबर 2026 को आयोजित होगा। यात्रा और आवास संबंधी अद्यतन इस बोर्ड पर प्रकाशित होंगे।",
    priority: 9,
    isPinned: true,
    publishAt: "2026-05-01T00:00:00.000Z",
    expireAt: null,
    category: { name: "सामान्य", slug: "general" },
    attachments: [],
  },
  {
    id: "default-programme-hi",
    title: "बहु-ट्रैक सम्मेलन एवं शोध सत्र",
    slug: "academic-programme-hi",
    description:
      "शोध पत्र और सार-पत्र आधिकारिक CMT पोर्टल (SMK2026) के माध्यम से जमा करें। दिशानिर्देश शैक्षिक परिषद पृष्ठ पर उपलब्ध हैं।",
    priority: 7,
    isPinned: false,
    publishAt: "2026-05-15T00:00:00.000Z",
    expireAt: null,
    category: { name: "कार्यक्रम", slug: "programmes" },
    attachments: [],
  },
  {
    id: "default-accommodation-hi",
    title: "आवास सुविधा — पंजीकरण के माध्यम से अनुरोध",
    slug: "accommodation-hi",
    description:
      "पंजीकरण के दौरान आवास विकल्प चुनें; पुष्टि आयोजन समिति द्वारा साझा की जाएगी।",
    priority: 5,
    isPinned: false,
    publishAt: "2026-06-01T00:00:00.000Z",
    expireAt: null,
    category: { name: "पंजीकरण", slug: "registration" },
    attachments: [],
  },
  {
    id: "default-abstract-hi",
    title: "सार-पत्र जमा करने की जानकारी",
    slug: "abstract-deadline-hi",
    description:
      "शोध सार-पत्र के लिए दिशानिर्देश और समयसीमा अमूर्त पृष्ठ पर उपलब्ध।",
    priority: 6,
    isPinned: false,
    publishAt: "2026-05-20T00:00:00.000Z",
    expireAt: null,
    category: { name: "कार्यक्रम", slug: "programmes" },
    attachments: [],
  },
  {
    id: "default-olympiads-hi",
    title: "डीएचई ओलंपियाड एवं प्रतिभा कार्यक्रम — तिथि घोषित होगी",
    slug: "dhe-olympiads-hi",
    description:
      "कक्षा 3–10 के लिए DHE ओलंपियाड, प्रतिभा अधिवेशन और शोधांकुर — पंजीकरण व परीक्षा तिथियाँ घोषित की जाएंगी। पंजीकरण हब के माध्यम से आवेदन करें।",
    priority: 6,
    isPinned: false,
    publishAt: "2026-05-20T00:00:00.000Z",
    expireAt: null,
    category: { name: "कार्यक्रम", slug: "programmes" },
    attachments: [],
  },
  {
    id: "default-sponsorship-hi",
    title: "प्रायोजन एवं संस्थागत साझेदारी",
    slug: "sponsorship-hi",
    description:
      "शिक्षा महाकुंभ 6.0 के लिए सीएसआर, उद्योग और मीडिया साझेदारी के लिए संपर्क करें।",
    priority: 4,
    isPinned: false,
    publishAt: "2026-06-01T00:00:00.000Z",
    expireAt: null,
    category: { name: "सामान्य", slug: "general" },
    attachments: [],
  },
  {
    id: "default-project-display-hi",
    title: "परियोजना प्रदर्शन एवं प्रदर्शनी पंजीकरण",
    slug: "project-display-hi",
    description:
      "उच्च शिक्षा संस्थान और छात्र नवाचारकर्ता परियोजना प्रदर्शन के लिए पंजीकरण हब से नामांकन कर सकते हैं।",
    priority: 3,
    isPinned: false,
    publishAt: "2026-06-10T00:00:00.000Z",
    expireAt: null,
    category: { name: "कार्यक्रम", slug: "programmes" },
    attachments: [],
  },
  {
    id: "default-volunteer-hi",
    title: "स्वयंसेवक अभिविन्यास",
    slug: "volunteer-hi",
    description:
      "पंजीकरण डेस्क, अधिवेशन और प्रदर्शनी सहायता के लिए स्वयंसेवक अभिविन्यास की तिथियाँ इस बोर्ड पर साझा की जाएंगी।",
    priority: 2,
    isPinned: false,
    publishAt: "2026-06-15T00:00:00.000Z",
    expireAt: null,
    category: { name: "सामान्य", slug: "general" },
    attachments: [],
  },
];

export function getDefaultNotices(locale: string = "en"): CmsNotice[] {
  return locale === "hi" ? DEFAULT_NOTICES_HI : DEFAULT_NOTICES_EN;
}

/** CMS notices when present; otherwise curated defaults (sorted like public API). */
export function resolvePublicNotices(
  notices: CmsNotice[] | null | undefined,
  locale: string = "en"
): CmsNotice[] {
  const defaults = getDefaultNotices(locale);
  const posterNotices = defaults.filter(
    (notice) =>
      notice.slug.startsWith("smk-6-conclave-") ||
      notice.slug.startsWith("smk-6-shodhankur") ||
      notice.slug.startsWith("smk-6-project-expo") ||
      notice.slug.startsWith("smk-6-panel-discussion") ||
      notice.slug.startsWith("smk-6-official-schedule")
  );
  if (notices && notices.length > 0) {
    const slugs = new Set(notices.map((notice) => notice.slug));
    const missingPosters = posterNotices.filter((notice) => !slugs.has(notice.slug));
    return sortNotices([...notices, ...missingPosters]);
  }
  return sortNotices(defaults);
}

/** Top N for homepage widget. */
export function resolveWidgetNotices(
  widgetNotices: CmsNotice[] | null | undefined,
  allNotices: CmsNotice[] | null | undefined,
  locale: string = "en",
  limit = 5
): CmsNotice[] {
  if (widgetNotices && widgetNotices.length > 0) {
    return sortNotices(widgetNotices).slice(0, limit);
  }
  return resolvePublicNotices(allNotices, locale).slice(0, limit);
}

export function sortNotices(notices: CmsNotice[]): CmsNotice[] {
  return [...notices].sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    if (a.priority !== b.priority) return b.priority - a.priority;
    const aDate = a.publishAt ? new Date(a.publishAt).getTime() : 0;
    const bDate = b.publishAt ? new Date(b.publishAt).getTime() : 0;
    return bDate - aDate;
  });
}

export function formatNoticeDate(iso: string | null): string | null {
  if (!iso) return null;
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return null;
  }
}
