import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseGoogleSiteVerificationTokens } from "../../src/lib/seo/google-site-verification";

describe("parseGoogleSiteVerificationTokens", () => {
  it("parses comma-separated tokens", () => {
    assert.deepEqual(parseGoogleSiteVerificationTokens("abc,def"), ["abc", "def"]);
  });

  it("returns empty for blank input", () => {
    assert.deepEqual(parseGoogleSiteVerificationTokens(""), []);
    assert.deepEqual(parseGoogleSiteVerificationTokens(undefined), []);
  });
});
