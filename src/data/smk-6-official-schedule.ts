/**
 * Canonical public timetable for Shiksha Mahakumbh 6.0.
 * Source: official Word document “Shiksha Mahakumbh 2026 Main Programme Schedule” (editable).
 * Do not invent speakers, halls, fees, or URLs that are not in that document.
 */

import { academicCouncilProgrammeUrl } from "@/data/academic-council-hub";
import { SMK_6_EVENT_THEME } from "@/data/smk-6-edition-hub";

export const SMK_6_SCHEDULE_PATH = "/schedule";

export const SMK_6_SCHEDULE_HREF = SMK_6_SCHEDULE_PATH;

export const SMK_6_SCHEDULE_DOWNLOAD_HREF =
  "/downloads/Shiksha_Mahakumbh_2026_Main_Programme_Schedule_Editable.docx";

export const SMK_6_SCHEDULE_DOWNLOAD_FILENAME =
  "Shiksha_Mahakumbh_2026_Main_Programme_Schedule_Editable.docx";

export const SMK_6_SCHEDULE_DOWNLOAD_MIME =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export const SMK_6_SCHEDULE_DOCUMENT_TITLE =
  "Shiksha Mahakumbh 2026 Main Programme Schedule";

const PROGRAMME_URLS = {
  panel: academicCouncilProgrammeUrl("PanelDiscussionPage"),
  conclave: academicCouncilProgrammeUrl("ConclavePage"),
  conference: academicCouncilProgrammeUrl("ConferencePage"),
  exhibition: academicCouncilProgrammeUrl("ExhibitionPage"),
  cultural: academicCouncilProgrammeUrl("CulturalPage"),
  projects: academicCouncilProgrammeUrl("ProjectsPage"),
  shodhankur: academicCouncilProgrammeUrl("PatrikaPage"),
} as const;

export const SMK_6_SCHEDULE_META = {
  hindiTitle: "शिक्षा महाकुंभ-6.0",
  editionLabel: "6th Edition",
  tableTitle: "मुख्य कार्यक्रम सारणी",
  englishTitle: "Official Programme Schedule",
  themeHi: SMK_6_EVENT_THEME.heading,
  themeEn: SMK_6_EVENT_THEME.english,
  datesLabel: "9–11 October 2026",
  venue: "NIT Hamirpur",
  location: "Himachal Pradesh",
  changeNote:
    "नोट: कार्यक्रम में परिवर्तन संभव है।  |  नवीनतम जानकारी के लिए कृपया आधिकारिक स्रोत देखें।",
  petitionerLabel: "निवेदक",
  contactName: "डॉ. शमशेर सिंह",
  contactPhone: "+91 94632 31250",
} as const;

export type ScheduleCategory =
  | "yoga"
  | "meal"
  | "panel-discussion"
  | "exhibition"
  | "ceremony"
  | "conclave"
  | "paper-presentations"
  | "student-projects"
  | "shodhankur"
  | "cultural"
  | "meeting";

export type ScheduleSlotLayout = "single" | "paired" | "parallel";

export type ScheduleSessionPart = {
  label: string;
  time: string;
};

export type ScheduleItem = {
  id: string;
  title: string;
  category: ScheduleCategory;
  detailsUrl?: string;
  notes?: readonly string[];
  sessions?: readonly ScheduleSessionPart[];
};

export type ScheduleSlot = {
  id: string;
  timeLabel: string;
  startTime: string;
  endTime: string;
  layout: ScheduleSlotLayout;
  groupLabel?: string;
  items: readonly ScheduleItem[];
};

export type ScheduleDay = {
  id: "day-1" | "day-2" | "day-3";
  dayNumber: 1 | 2 | 3;
  dateLabel: string;
  isoDate: string;
  themeHi: string;
  slots: readonly ScheduleSlot[];
};

export type ScheduleDignitary = {
  id: string;
  name: string;
  designation: string;
  dateLabel?: string;
  isoDate?: string;
};

export const SMK_6_SCHEDULE_FILTERS: readonly { id: ScheduleCategory | "all"; label: string }[] = [
  { id: "all", label: "All sessions" },
  { id: "panel-discussion", label: "Panel Discussion" },
  { id: "conclave", label: "Conclaves" },
  { id: "paper-presentations", label: "Paper Presentations" },
  { id: "exhibition", label: "Exhibition" },
  { id: "student-projects", label: "Student Projects" },
  { id: "shodhankur", label: "Shodhankur" },
  { id: "cultural", label: "Cultural Event" },
  { id: "ceremony", label: "INAUGURAL / DISCOURSE / VALIDATORY" },
  { id: "yoga", label: "Yoga" },
] as const;

export const SMK_6_SCHEDULE_CATEGORY_LABEL: Record<ScheduleCategory, string> = {
  yoga: "Yoga",
  meal: "Meal",
  "panel-discussion": "Panel Discussion",
  exhibition: "Exhibition",
  ceremony: "Ceremony",
  conclave: "Conclave",
  "paper-presentations": "Paper Presentations",
  "student-projects": "Student Projects",
  shodhankur: "Shodhankur",
  cultural: "Cultural Event",
  meeting: "Core Group Meeting",
};

function item(
  id: string,
  title: string,
  category: ScheduleCategory,
  extras: Partial<Pick<ScheduleItem, "detailsUrl" | "notes" | "sessions">> = {}
): ScheduleItem {
  return { id, title, category, ...extras };
}

function slot(
  id: string,
  timeLabel: string,
  startTime: string,
  endTime: string,
  layout: ScheduleSlotLayout,
  items: readonly ScheduleItem[],
  groupLabel?: string
): ScheduleSlot {
  return { id, timeLabel, startTime, endTime, layout, items, groupLabel };
}

const DAY_1_SLOTS: readonly ScheduleSlot[] = [
  slot("d1-yoga", "6:30 – 7:30", "06:30", "07:30", "single", [
    item("d1-yoga", "Yoga", "yoga"),
  ]),
  slot("d1-breakfast", "8:00 – 9:00", "08:00", "09:00", "single", [
    item("d1-breakfast", "Breakfast & Interaction", "meal"),
  ]),
  slot("d1-panel", "9:30 – 10:45", "09:30", "10:45", "single", [
    item("d1-panel", "Panel Discussion", "panel-discussion", { detailsUrl: PROGRAMME_URLS.panel }),
  ]),
  slot("d1-reception", "11:00 – 11:30", "11:00", "11:30", "paired", [
    item("d1-reception-guests", "Reception of Guests", "exhibition"),
    item("d1-exhibition-open", "Opening of Exhibition", "exhibition", {
      detailsUrl: PROGRAMME_URLS.exhibition,
    }),
  ]),
  slot("d1-inaugural", "11:30 – 13:30", "11:30", "13:30", "single", [
    item("d1-inaugural", "INAUGURAL SESSION", "ceremony"),
  ]),
  slot("d1-lunch", "13:30 – 14:30", "13:30", "14:30", "single", [
    item("d1-lunch", "Lunch", "meal"),
  ]),
  slot(
    "d1-parallel",
    "14:30 – 17:30",
    "14:30",
    "17:30",
    "parallel",
    [
      item("d1-vc-conclave", "Vice Chancellors & Directors’ Conclave", "conclave", {
        detailsUrl: PROGRAMME_URLS.conclave,
      }),
      item("d1-scientists-conclave", "Scientists & Research Scholars’ Conclave", "conclave", {
        detailsUrl: PROGRAMME_URLS.conclave,
      }),
      item("d1-startup-conclave", "Startups Leaders & Entrepreneurs’ Conclave", "conclave", {
        detailsUrl: PROGRAMME_URLS.conclave,
      }),
      item("d1-papers", "Paper Presentations", "paper-presentations", {
        detailsUrl: PROGRAMME_URLS.conference,
      }),
    ],
    "PARALLEL SESSIONS"
  ),
  slot("d1-tea", "17:30 – 18:30", "17:30", "18:30", "single", [
    item("d1-tea", "High Tea & Exhibition Visit", "exhibition", {
      detailsUrl: PROGRAMME_URLS.exhibition,
    }),
  ]),
  slot("d1-cultural", "18:30 – 20:30", "18:30", "20:30", "single", [
    item("d1-cultural", "Cultural Event", "cultural", { detailsUrl: PROGRAMME_URLS.cultural }),
  ]),
  slot("d1-dinner", "20:30 – 21:30", "20:30", "21:30", "single", [
    item("d1-dinner", "Dinner", "meal"),
  ]),
  slot("d1-core", "21:30 – 22:30", "21:30", "22:30", "single", [
    item("d1-core", "Core Group Meeting", "meeting"),
  ]),
];

const DAY_2_SLOTS: readonly ScheduleSlot[] = [
  slot("d2-yoga", "6:30 – 7:30", "06:30", "07:30", "single", [
    item("d2-yoga", "Yoga", "yoga"),
  ]),
  slot("d2-breakfast", "8:00 – 9:00", "08:00", "09:00", "single", [
    item("d2-breakfast", "Breakfast & Interaction", "meal"),
  ]),
  slot("d2-panel", "9:30 – 10:45", "09:30", "10:45", "single", [
    item("d2-panel", "Panel Discussion", "panel-discussion", { detailsUrl: PROGRAMME_URLS.panel }),
  ]),
  slot("d2-reception", "11:00 – 11:30", "11:00", "11:30", "paired", [
    item("d2-reception-guests", "Reception of Guests", "exhibition"),
    item("d2-exhibition-visit", "Visiting of Exhibition", "exhibition", {
      detailsUrl: PROGRAMME_URLS.exhibition,
    }),
  ]),
  slot("d2-discourse", "11:30 – 13:30", "11:30", "13:30", "single", [
    item("d2-discourse", "DISCOURSE SESSION", "ceremony"),
  ]),
  slot("d2-lunch", "13:30 – 14:30", "13:30", "14:30", "single", [
    item("d2-lunch", "Lunch", "meal"),
  ]),
  slot(
    "d2-parallel",
    "14:30 – 17:30",
    "14:30",
    "17:30",
    "parallel",
    [
      item("d2-media-conclave", "Media Conclave", "conclave", { detailsUrl: PROGRAMME_URLS.conclave }),
      item("d2-csr-conclave", "CSR & NGO Conclave", "conclave", { detailsUrl: PROGRAMME_URLS.conclave }),
      item("d2-talent-conclave", "Talented Students Conclave", "conclave", {
        detailsUrl: PROGRAMME_URLS.conclave,
        sessions: [
          { label: "Session 1", time: "14:30 – 16:00 PM" },
          { label: "Session 2", time: "16:15 – 17:30 PM" },
        ],
      }),
      item("d2-principal-conclave", "Principal's & Outstanding Teacher's Conclave", "conclave", {
        detailsUrl: PROGRAMME_URLS.conclave,
        sessions: [
          { label: "Session 1", time: "14:30 – 16:00 PM" },
          { label: "Session 2", time: "16:15 – 17:30 PM" },
        ],
      }),
      item("d2-papers", "Paper Presentations", "paper-presentations", {
        detailsUrl: PROGRAMME_URLS.conference,
      }),
      item("d2-projects", "Student Projects", "student-projects", {
        detailsUrl: PROGRAMME_URLS.projects,
      }),
      item("d2-shodhankur", "Shodhankur", "shodhankur", { detailsUrl: PROGRAMME_URLS.shodhankur }),
    ],
    "PARALLEL SESSIONS"
  ),
  slot("d2-tea", "17:30 – 18:30", "17:30", "18:30", "single", [
    item("d2-tea", "High Tea & Exhibition Visit", "exhibition", {
      detailsUrl: PROGRAMME_URLS.exhibition,
    }),
  ]),
  slot("d2-cultural", "18:30 – 20:30", "18:30", "20:30", "single", [
    item("d2-cultural", "Cultural Event", "cultural", { detailsUrl: PROGRAMME_URLS.cultural }),
  ]),
  slot("d2-dinner", "20:30 – 21:30", "20:30", "21:30", "single", [
    item("d2-dinner", "Dinner", "meal"),
  ]),
  slot("d2-core", "21:30 – 22:30", "21:30", "22:30", "single", [
    item("d2-core", "Core Group Meeting", "meeting"),
  ]),
];

const DAY_3_SLOTS: readonly ScheduleSlot[] = [
  slot("d3-yoga", "6:30 – 7:30", "06:30", "07:30", "single", [
    item("d3-yoga", "Yoga", "yoga"),
  ]),
  slot("d3-breakfast", "8:00 – 9:00", "08:00", "09:00", "single", [
    item("d3-breakfast", "Breakfast & Interaction", "meal"),
  ]),
  slot("d3-panel", "9:30 – 10:45", "09:30", "10:45", "single", [
    item("d3-panel", "Panel Discussion", "panel-discussion", { detailsUrl: PROGRAMME_URLS.panel }),
  ]),
  slot("d3-reception", "11:00 – 11:30", "11:00", "11:30", "paired", [
    item("d3-reception-guests", "Reception of Guests", "exhibition"),
    item("d3-exhibition-visit", "Visiting of Exhibition", "exhibition", {
      detailsUrl: PROGRAMME_URLS.exhibition,
    }),
  ]),
  slot("d3-validatory", "11:30 – 13:30", "11:30", "13:30", "single", [
    item("d3-validatory", "VALIDATORY SESSION", "ceremony"),
  ]),
  slot("d3-lunch", "13:30 – 14:30", "13:30", "14:30", "single", [
    item("d3-lunch", "Lunch", "meal"),
  ]),
];

export const SMK_6_SCHEDULE_DAYS: readonly ScheduleDay[] = [
  {
    id: "day-1",
    dayNumber: 1,
    dateLabel: "October 9, 2026",
    isoDate: "2026-10-09",
    themeHi: "आध्यात्मिक भारत – विकसित भारत",
    slots: DAY_1_SLOTS,
  },
  {
    id: "day-2",
    dayNumber: 2,
    dateLabel: "October 10, 2026",
    isoDate: "2026-10-10",
    themeHi: "विज्ञानमय भारत – विकसित भारत",
    slots: DAY_2_SLOTS,
  },
  {
    id: "day-3",
    dayNumber: 3,
    dateLabel: "October 11, 2026",
    isoDate: "2026-10-11",
    themeHi: "सुरक्षित भारत – विकसित भारत",
    slots: DAY_3_SLOTS,
  },
];

export const SMK_6_SCHEDULE_CHIEF_GUESTS: readonly ScheduleDignitary[] = [
  {
    id: "cg-09",
    dateLabel: "Oct 09",
    isoDate: "2026-10-09",
    name: "Shri Gulab Chand Kataria",
    designation: "Hon'ble Governor, Punjab",
  },
  {
    id: "cg-10",
    dateLabel: "Oct 10",
    isoDate: "2026-10-10",
    name: "Shri Jairam Thakur",
    designation: "Former CM, Himachal Pradesh",
  },
  {
    id: "cg-11",
    dateLabel: "Oct 11",
    isoDate: "2026-10-11",
    name: "Shri Kavinder Gupta",
    designation: "Hon'ble Governor, Himachal Pradesh",
  },
];

export const SMK_6_SCHEDULE_GUESTS_OF_HONOUR: readonly ScheduleDignitary[] = [
  {
    id: "goh-rajeev",
    name: "Dr. Rajeev Bhardwaj",
    designation: "Hon'ble MP, Lok Sabha, Himachal Pradesh",
  },
  {
    id: "goh-anurag",
    name: "Captain Anurag Singh Thakur",
    designation: "Hon'ble MP, Lok Sabha, Himachal Pradesh",
  },
  {
    id: "goh-sikander",
    name: "Dr. Sikander Kumar",
    designation: "Hon'ble MP, Rajya Sabha, Himachal Pradesh",
  },
];

export type FlattenedScheduleItem = {
  day: ScheduleDay;
  slot: ScheduleSlot;
  item: ScheduleItem;
};

export function flattenOfficialSchedule(
  days: readonly ScheduleDay[] = SMK_6_SCHEDULE_DAYS
): FlattenedScheduleItem[] {
  return days.flatMap((day) =>
    day.slots.flatMap((slotRow) => slotRow.items.map((entry) => ({ day, slot: slotRow, item: entry })))
  );
}

export function searchOfficialSchedule(
  query: string,
  days: readonly ScheduleDay[] = SMK_6_SCHEDULE_DAYS
): FlattenedScheduleItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return flattenOfficialSchedule(days);
  return flattenOfficialSchedule(days).filter(({ day, slot, item: entry }) => {
    const haystack = [
      entry.title,
      SMK_6_SCHEDULE_CATEGORY_LABEL[entry.category],
      entry.notes?.join(" ") ?? "",
      entry.sessions?.map((part) => `${part.label} ${part.time}`).join(" ") ?? "",
      slot.timeLabel,
      slot.groupLabel ?? "",
      day.dateLabel,
      day.themeHi,
      SMK_6_SCHEDULE_META.venue,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function officialScheduleAnnouncementCopy() {
  return {
    title: "Official Schedule Released",
    titleHi: "आधिकारिक कार्यक्रम सारणी जारी",
    summary: `${SMK_6_SCHEDULE_META.hindiTitle} official programme schedule is now available.`,
    summaryHi: `${SMK_6_SCHEDULE_META.hindiTitle} की आधिकारिक मुख्य कार्यक्रम सारणी अब उपलब्ध है।`,
    detail: `The complete official programme schedule (${SMK_6_SCHEDULE_META.tableTitle}) for Shiksha Mahakumbh 6.0 at ${SMK_6_SCHEDULE_META.venue} is now available. ${SMK_6_SCHEDULE_META.datesLabel}. Theme: ${SMK_6_SCHEDULE_META.themeHi} — ${SMK_6_SCHEDULE_META.themeEn}.`,
    href: SMK_6_SCHEDULE_HREF,
    downloadHref: SMK_6_SCHEDULE_DOWNLOAD_HREF,
    cta: "View Schedule",
    ctaHi: "सारणी देखें",
    downloadCta: "Download Official Schedule",
  } as const;
}

export const SMK_6_SCHEDULE_NOTICE_SLUG = "smk-6-official-schedule";
export const SMK_6_SCHEDULE_NOTICE_SLUG_HI = "smk-6-official-schedule-hi";

export function officialScheduleSeo() {
  return {
    title: "Shiksha Mahakumbh 6.0 Official Schedule — 9–11 October 2026, NIT Hamirpur",
    description: `${SMK_6_SCHEDULE_META.tableTitle} for शिक्षा महाकुंभ 6.0 at NIT Hamirpur, 9–11 October 2026. Day-by-day programme including inaugural, conclaves, paper presentations, exhibition, cultural event, and VALIDATORY SESSION.`,
    path: SMK_6_SCHEDULE_PATH,
    keywords: [
      "Shiksha Mahakumbh 6.0 schedule",
      "शिक्षा महाकुंभ 6.0 कार्यक्रम सारणी",
      "NIT Hamirpur 9-11 October 2026",
      "main programme schedule",
      SMK_6_SCHEDULE_META.themeHi,
    ],
  } as const;
}
