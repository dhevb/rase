import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  officialPhotographsAnnouncementCopy,
  SMK_6_OFFICIAL_PHOTOGRAPHS_FOLDER_URL,
} from "../../src/data/smk-6-official-photographs";
import { getDefaultAnnouncementItems, pickWelcomeModalBar, resolveAnnouncementBars } from "../../src/data/default-announcements";
import { getDefaultNotices, resolvePublicNotices } from "../../src/data/default-notices";

const FOLDER =
  "https://drive.google.com/drive/folders/1jl-Jwidxb_SA-9zhvsg__Zv9rSWHZzc-?usp=sharing";

describe("SMK 6.0 official event photographs", () => {
  it("uses the supplied Google Drive folder URL exactly", () => {
    assert.equal(SMK_6_OFFICIAL_PHOTOGRAPHS_FOLDER_URL, FOLDER);
    assert.equal(officialPhotographsAnnouncementCopy().folderUrl, FOLDER);
  });

  it("surfaces the photographs announcement first among defaults", () => {
    const items = getDefaultAnnouncementItems("en");
    assert.equal(items[0]?.href, FOLDER);
    assert.equal(items[0]?.cta, "View & Download Event Photographs");
    assert.equal(items[0]?.external, true);
  });

  it("uses the photographs bar for the homepage welcome modal", () => {
    const bars = resolveAnnouncementBars([], "en");
    const modal = pickWelcomeModalBar(bars);
    assert.equal(modal?.ctaUrl, FOLDER);
    assert.match(modal?.title ?? "", /Official Event Photographs/);
  });

  it("pins the photographs notice with the Drive CTA attachment", () => {
    const notices = resolvePublicNotices(getDefaultNotices("en"), "en");
    const photos = notices.find((notice) => notice.slug.startsWith("smk-6-official-event-photographs"));
    assert.ok(photos);
    assert.equal(photos?.isPinned, true);
    assert.equal(photos?.attachments[0]?.fileUrl, FOLDER);
    assert.equal(photos?.attachments[0]?.fileName, "View & Download Event Photographs");
  });
});
