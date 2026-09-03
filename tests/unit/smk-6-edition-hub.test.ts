import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { academicCouncilProgrammeUrl } from "../../src/data/academic-council-hub";
import {
  ABOUT_6TH_EDITION_HREF,
  SMK_6_EVENT_THEME,
  groupSmk6Dignitaries,
  smk6ConferenceTracks,
  smk6ConclaveCards,
  smk6HomepageProgrammeHighlights,
  smk6ProgrammeCards,
} from "../../src/data/smk-6-edition-hub";
import { CANONICAL_ROUTES } from "../../src/constants/canonical-routes";

describe("SMK 6.0 edition hub composition", () => {
  it("About 6th Edition uses the existing upcoming-events hub hash", () => {
    assert.equal(ABOUT_6TH_EDITION_HREF, "/upcoming-events#about-6th-edition");
  });

  it("event-wide theme is confirmed from the official brochure", () => {
    assert.equal(SMK_6_EVENT_THEME.status, "confirmed");
    assert.match(SMK_6_EVENT_THEME.english, /Education for Development/);
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
    assert.equal(highlights.length, 7);
    assert.ok(highlights.some((item) => item.id === "patrika"));
    assert.ok(highlights.some((item) => item.id === "projects"));
  });

  it("multi-track roster matches the official 16-track brochure list", () => {
    assert.equal(smk6ConferenceTracks().length, 16);
    assert.ok(smk6ConferenceTracks().some((track) => track.title === "Defence and Security"));
  });

  it("conclave roster includes Defence and Security as the eighth conclave", () => {
    const cards = smk6ConclaveCards();
    assert.equal(cards.length, 8);
    assert.ok(cards.some((card) => card.title === "Defence and Security"));
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
