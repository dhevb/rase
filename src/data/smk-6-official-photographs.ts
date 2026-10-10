/** Official SMK 6.0 event photographs — Google Drive folder (day-wise updates). */

export const SMK_6_OFFICIAL_PHOTOGRAPHS_FOLDER_URL =
  "https://drive.google.com/drive/folders/1jl-Jwidxb_SA-9zhvsg__Zv9rSWHZzc-?usp=sharing";

export const SMK_6_OFFICIAL_PHOTOGRAPHS_NOTICE_SLUG = "smk-6-official-event-photographs";
export const SMK_6_OFFICIAL_PHOTOGRAPHS_NOTICE_SLUG_HI = "smk-6-official-event-photographs-hi";
export const SMK_6_OFFICIAL_PHOTOGRAPHS_BAR_ID = "default-bar-photographs";
export const SMK_6_OFFICIAL_PHOTOGRAPHS_BAR_ID_HI = "default-bar-photographs-hi";

export function officialPhotographsAnnouncementCopy() {
  return {
    title: "Shiksha Mahakumbh Abhiyan 6.0 – Official Event Photographs",
    titleHi: "शिक्षा महाकुंभ अभियान 6.0 — आधिकारिक कार्यक्रम छायाचित्र",
    headline: "Relive the Moments of Shiksha Mahakumbh Abhiyan 6.0!",
    headlineHi: "शिक्षा महाकुंभ अभियान 6.0 के क्षणों को फिर से देखें!",
    description:
      "Photographs from all three days of Shiksha Mahakumbh Abhiyan 6.0 are being uploaded and updated day-wise. Participants, institutions and visitors can view and download event photographs from the official photo gallery folder.",
    descriptionHi:
      "शिक्षा महाकुंभ अभियान 6.0 के तीनों दिनों के छायाचित्र दिन-वार अपलोड और अद्यतन किए जा रहे हैं। प्रतिभागी, संस्थान और आगंतुक आधिकारिक फोटो गैलरी फोल्डर से कार्यक्रम की तस्वीरें देख और डाउनलोड कर सकते हैं।",
    updateNote: "Day 1 | Day 2 | Day 3 — Photographs will be updated regularly.",
    updateNoteHi: "दिन 1 | दिन 2 | दिन 3 — छायाचित्र नियमित रूप से अद्यतन किए जाएंगे।",
    footerNote: "Please revisit the folder for the latest photographs and updates.",
    footerNoteHi: "नवीनतम छायाचित्रों और अद्यतनों के लिए कृपया फोल्डर को पुनः देखें।",
    cta: "View & Download Event Photographs",
    ctaHi: "कार्यक्रम छायाचित्र देखें और डाउनलोड करें",
    ctaShort: "View Photos",
    ctaShortHi: "तस्वीरें देखें",
    folderUrl: SMK_6_OFFICIAL_PHOTOGRAPHS_FOLDER_URL,
    ticker:
      "Official SMK 6.0 event photographs — Day 1, Day 2 and Day 3 are being updated regularly.",
    tickerHi:
      "शिक्षा महाकुंभ 6.0 के आधिकारिक छायाचित्र — दिन 1, दिन 2 और दिन 3 नियमित रूप से अद्यतन।",
  } as const;
}

export function officialPhotographsNoticeDescription(locale: "en" | "hi" = "en"): string {
  const copy = officialPhotographsAnnouncementCopy();
  if (locale === "hi") {
    return `${copy.headlineHi}\n\n${copy.descriptionHi}\n\n${copy.updateNoteHi}\n\n${copy.footerNoteHi}`;
  }
  return `${copy.headline}\n\n${copy.description}\n\n${copy.updateNote}\n\n${copy.footerNote}`;
}

export function officialPhotographsModalMessage(locale: "en" | "hi" = "en"): string {
  const copy = officialPhotographsAnnouncementCopy();
  if (locale === "hi") {
    return `${copy.descriptionHi} ${copy.updateNoteHi} ${copy.footerNoteHi}`;
  }
  return `${copy.description} ${copy.updateNote} ${copy.footerNote}`;
}
