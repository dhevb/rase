import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  indexNowKeyLocation,
  indexNowKeyPath,
  rewriteUrlsForHost,
} from "../../src/lib/seo/indexnow";
import {
  buildSiteVerificationMetadata,
  parseGoogleSiteVerificationTokens,
} from "../../src/lib/seo/site-verification";

describe("parseGoogleSiteVerificationTokens", () => {
  it("parses comma-separated tokens", () => {
    assert.deepEqual(parseGoogleSiteVerificationTokens("abc,def"), ["abc", "def"]);
  });
});

describe("buildSiteVerificationMetadata", () => {
  it("merges google, bing, and facebook tokens", () => {
    const prev = { ...process.env };
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION = "g1";
    process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION = "b1";
    process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION = "f1";
    try {
      const meta = buildSiteVerificationMetadata();
      assert.equal(meta?.google, "g1");
      assert.equal(meta?.other?.["msvalidate.01"], "b1");
      assert.equal(meta?.other?.["facebook-domain-verification"], "f1");
    } finally {
      process.env = prev;
    }
  });
});

describe("indexNowKeyLocation", () => {
  it("builds key URL under /api/indexnow/", () => {
    assert.equal(
      indexNowKeyLocation("https://www.rase.co.in", "abc123"),
      "https://www.rase.co.in/api/indexnow/abc123"
    );
    assert.equal(indexNowKeyPath("abc123"), "/api/indexnow/abc123");
  });

  it("rewrites sitemap hostnames", () => {
    assert.deepEqual(
      rewriteUrlsForHost(["https://www.rase.co.in/faq"], "www.shikshamahakumbh.com"),
      ["https://www.shikshamahakumbh.com/faq"]
    );
  });
});
