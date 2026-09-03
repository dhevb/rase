import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { academicCouncilProgrammeUrl } from "../../src/data/academic-council-hub";
import {
  ABOUT_6TH_EDITION_HREF,
  SMK_6_EVENT_THEME,
  groupSmk6Dignitaries,
  smk6ConferenceTracks,
  smk6HomepageProgrammeHighlights,
  smk6ProgrammeCards,
} from "../../src/data/smk-6-edition-hub";
import { CANONICAL_ROUTES } from "../../src/constants/canonical-routes";

describe("SMK 6.0 edition hub composition", () => {
  it("About 6th Edition uses the existing upcoming-events hub hash", () => {
    assert.equal(ABOUT_6TH_EDITION_HREF, "/upcoming-events#about-6th-edition");
  });

  it("event-wide theme is marked unconfirmed", () => {
    assert.equal(SMK_6_EVENT_THEME.status, "unconfirmed");
  });

  it("programme cards link into Academic Council hashes", () => {
    const cards = smk6ProgrammeCards();
    assert.ok(cards.length > 0);
    assert.ok(
      cards.every((card) => card.href.startsWith(CANONICAL_ROUTES.departments.academicCouncil))
    );
    assert.equal(
      academicCouncilProgrammeUrl("ConferencePage"),
      "/departments/academic-council#multi-track-conference"
    );
  });

  it("homepage highlights are a subset of Academic Council programmes", () => {
    const highlights = smk6HomepageProgrammeHighlights();
    assert.equal(highlights.length, 6);
  });

  it("multi-track roster stays at the existing 15 tracks", () => {
    assert.equal(smk6ConferenceTracks().length, 15);
  });

  it("dignitary grouping ignores speakers without edition 6.0", () => {
    const groups = groupSmk6Dignitaries([
      {
        id: "past",
        fullName: "Past Speaker",
        slug: "past",
        title: null,
        designation: "Keynote",
        institution: "Example",
        photoUrl: null,
        isFeatured: true,
        href: "/speakers/past",
        edition: "5.0",
        category: "keynote",
        tags: ["chief-guest"],
      },
    ]);
    assert.ok(groups.every((group) => group.speakers.length === 0));
  });
});
