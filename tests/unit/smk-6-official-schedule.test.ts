import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  SMK_6_SCHEDULE_CHIEF_GUESTS,
  SMK_6_SCHEDULE_DAYS,
  SMK_6_SCHEDULE_DOWNLOAD_HREF,
  SMK_6_SCHEDULE_GUESTS_OF_HONOUR,
  SMK_6_SCHEDULE_META,
  flattenOfficialSchedule,
} from "../../src/data/smk-6-official-schedule";

describe("SMK 6.0 official schedule canonical data", () => {
  const items = flattenOfficialSchedule();

  it("covers three dated days at NIT Hamirpur", () => {
    assert.equal(SMK_6_SCHEDULE_DAYS.length, 3);
    assert.deepEqual(
      SMK_6_SCHEDULE_DAYS.map((day) => day.isoDate),
      ["2026-10-09", "2026-10-10", "2026-10-11"]
    );
    assert.equal(SMK_6_SCHEDULE_META.venue, "NIT Hamirpur");
  });

  it("preserves printed programme titles including VALIDATORY SESSION", () => {
    assert.ok(items.some((row) => row.item.title === "VALIDATORY SESSION"));
    assert.ok(items.some((row) => row.item.title === "INAUGURAL SESSION"));
    assert.ok(items.some((row) => row.item.title === "DISCOURSE SESSION"));
    assert.ok(items.some((row) => row.item.title === "Startups Leaders & Entrepreneurs’ Conclave"));
    assert.ok(items.some((row) => row.item.title === "Principal's & Outstanding Teacher's Conclave"));
  });

  it("keeps Day 1 and Day 2 afternoon programmes in parallel groups", () => {
    const day1 = SMK_6_SCHEDULE_DAYS[0].slots.find((slot) => slot.id === "d1-parallel");
    const day2 = SMK_6_SCHEDULE_DAYS[1].slots.find((slot) => slot.id === "d2-parallel");
    assert.equal(day1?.layout, "parallel");
    assert.equal(day1?.items.length, 4);
    assert.equal(day2?.layout, "parallel");
    assert.equal(day2?.items.length, 7);
    assert.equal(day2?.items.find((item) => item.id === "d2-talent-conclave")?.sessions?.length, 2);
  });

  it("does not invent programmes absent from the Word table", () => {
    assert.equal(
      items.filter((row) => /defence|olympiad/i.test(row.item.title)).length,
      0
    );
  });

  it("lists dated chief guests and undated guests of honour as printed", () => {
    assert.equal(SMK_6_SCHEDULE_CHIEF_GUESTS.length, 3);
    assert.equal(SMK_6_SCHEDULE_CHIEF_GUESTS[0].name, "Shri Gulab Chand Kataria");
    assert.equal(SMK_6_SCHEDULE_GUESTS_OF_HONOUR[1].name, "Captain Anurag Singh Thakur");
    assert.equal(SMK_6_SCHEDULE_META.contactName, "डॉ. शमशेर सिंह");
    assert.equal(SMK_6_SCHEDULE_META.contactPhone, "+91 94632 31250");
  });

  it("points download to the official Word document, not a generated PDF", () => {
    assert.match(SMK_6_SCHEDULE_DOWNLOAD_HREF, /\.docx$/);
    assert.doesNotMatch(SMK_6_SCHEDULE_DOWNLOAD_HREF, /\.pdf$/i);
  });
});
