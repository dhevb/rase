import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  defaultPageCanonicalUrl,
  normalizeCanonicalPath,
} from "../../src/lib/seo/canonical-path";

describe("normalizeCanonicalPath", () => {
  it("maps legacy department root slugs to /departments/*", () => {
    assert.equal(normalizeCanonicalPath("/vitt"), "/departments/vitt");
    assert.equal(
      normalizeCanonicalPath("/academic-council"),
      "/departments/academic-council"
    );
  });

  it("maps /home to /", () => {
    assert.equal(normalizeCanonicalPath("/home"), "/");
  });

  it("leaves canonical department paths unchanged", () => {
    assert.equal(normalizeCanonicalPath("/departments/vitt"), "/departments/vitt");
  });

  it("normalizes full URLs", () => {
    assert.equal(
      normalizeCanonicalPath("https://www.rase.co.in/vitt"),
      "/departments/vitt"
    );
  });
});

describe("defaultPageCanonicalUrl", () => {
  it("uses /departments for department page type", () => {
    assert.equal(defaultPageCanonicalUrl("vitt", "department"), "/departments/vitt");
  });

  it("uses / for home slug", () => {
    assert.equal(defaultPageCanonicalUrl("home", "homepage"), "/");
  });
});
