import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { academicCouncilProgrammeUrl } from "../../src/data/academic-council-hub";
import {
  ABOUT_6TH_EDITION_HREF,
  SMK_6_EVENT_THEME,
  SMK_6_FRONT_PAGE_CAMPUSES,
  SMK_6_OFFICIAL_COVER,
  SMK_6_ORGANISING_IDENTITY,
  groupSmk6Dignitaries,
  smk6ConferenceTracks,
  smk6ConclaveCards,
  smk6HomepageProgrammeHighlights,
  smk6ProgrammeCards,
  smk6BrochureInitiatives,
} from "../../src/data/smk-6-edition-hub";
import { CANONICAL_ROUTES } from "../../src/constants/canonical-routes";

describe("SMK 6.0 edition hub composition", () => {
  it("About 6th Edition uses the existing upcoming-events hub hash", () => {
    assert.equal(ABOUT_6TH_EDITION_HREF, "/upcoming-events#about-6th-edition");
  });

  it("event-wide theme is confirmed from the official brochure", () => {
    assert.equal(SMK_6_EVENT_THEME.status, "confirmed");
    assert.equal(SMK_6_EVENT_THEME.heading, "शिक्षा, प्रकृति और प्रगति");
    assert.match(SMK_6_EVENT_THEME.english, /Education for Development/);
  });

  it("organising line includes AIU and Himachal host campuses from the 2026 front page", () => {
    assert.match(SMK_6_ORGANISING_IDENTITY.statement, /Association of Indian Universities/);
    assert.match(SMK_6_ORGANISING_IDENTITY.statement, /IIT Mandi/);
    assert.match(SMK_6_ORGANISING_IDENTITY.statement, /CUHP/);
    assert.equal(SMK_6_FRONT_PAGE_CAMPUSES[0].id, "nit-hamirpur");
    assert.equal(SMK_6_OFFICIAL_COVER.src, "/branding/shiksha-mahakumbh-6-0-official-cover.png");
  });

  it("programme cards link into Academic Council hashes", () => {
    const cards = smk6ProgrammeCards();
    assert.ok(cards.length > 0);
    const patrika = cards.find((card) => card.id === "patrika");
    const projects = cards.find((card) => card.id === "projects");
    assert.equal(patrika?.poster?.src, "/images/programmes/smk-6-shodhankur.webp");
    assert.equal(projects?.poster?.src, "/images/programmes/smk-6-project-expo.webp");
    assert.equal(cards.find((card) => card.id === "panel-discussion"), undefined);
    assert.ok(
      cards.every((card) => card.href.startsWith(CANONICAL_ROUTES.departments.academicCouncil))
    );
    assert.equal(
      academicCouncilProgrammeUrl("PanelDiscussionPage"),
      "/departments/academic-council#panel-discussion"
    );
  });

  it("homepage highlights are a subset of Academic Council programmes", () => {
    const highlights = smk6HomepageProgrammeHighlights();
    assert.equal(highlights.length, 7);
    assert.ok(highlights.some((item) => item.id === "patrika"));
    assert.ok(highlights.some((item) => item.id === "projects"));
  });

  it("multi-track roster matches the official 16-track conference sheet", () => {
    const tracks = smk6ConferenceTracks();
    assert.equal(tracks.length, 16);
    assert.ok(tracks.some((track) => track.title === "Defence and Security"));
    assert.ok(tracks.some((track) => track.title === "Indian Knowledge System"));
    assert.ok(tracks[0].title === "Fundamental and Applied Sciences");
  });

  it("conclave roster includes Defence and Security as the eighth conclave", () => {
    const cards = smk6ConclaveCards();
    assert.equal(cards.length, 8);
    assert.ok(cards.some((card) => card.title === "Talented Students Conclave"));
    assert.equal(cards.filter((card) => card.poster).length, 7);
  });

  it("panel discussion uses the three official 6.0 posters and coordinator line", () => {
    const panel = smk6BrochureInitiatives().find((item) => item.id === "panel");
    assert.equal(panel?.href, "/departments/academic-council#panel-discussion");
    assert.match(panel?.leadership ?? "", /प्रो\. अवनीश वर्मा/);
    assert.match(panel?.leadership ?? "", /9416481652/);
    assert.match(panel?.detail ?? "", /आध्यात्मिक भारत/);
    assert.match(panel?.detail ?? "", /विज्ञानमय भारत/);
    assert.match(panel?.detail ?? "", /सुरक्षित भारत/);
    assert.doesNotMatch(panel?.leadership ?? "", /Chair:/);
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
