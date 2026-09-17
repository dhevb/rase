import { SITE_URL } from "@/config/site";
import {
  SMK_6_SCHEDULE_HREF,
  SMK_6_SCHEDULE_META,
  flattenOfficialSchedule,
} from "@/data/smk-6-official-schedule";

function toIso(date: string, time: string) {
  return `${date}T${time}:00+05:30`;
}

export default function Smk6ScheduleJsonLd() {
  const subEvents = flattenOfficialSchedule().map(({ day, slot, item }) => ({
    "@type": "EducationEvent",
    name: item.title,
    startDate: toIso(day.isoDate, slot.startTime),
    endDate: toIso(day.isoDate, slot.endTime),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: SMK_6_SCHEDULE_META.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: SMK_6_SCHEDULE_META.venue,
        addressRegion: SMK_6_SCHEDULE_META.location,
        addressCountry: "IN",
      },
    },
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${SMK_6_SCHEDULE_META.hindiTitle} ${SMK_6_SCHEDULE_META.englishTitle}`,
    description: `${SMK_6_SCHEDULE_META.tableTitle}. Theme: ${SMK_6_SCHEDULE_META.themeHi} — ${SMK_6_SCHEDULE_META.themeEn}.`,
    startDate: "2026-10-09",
    endDate: "2026-10-11",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: `${SITE_URL}${SMK_6_SCHEDULE_HREF}`,
    location: {
      "@type": "Place",
      name: SMK_6_SCHEDULE_META.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hamirpur",
        addressRegion: SMK_6_SCHEDULE_META.location,
        addressCountry: "IN",
      },
    },
    subEvent: subEvents,
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}
