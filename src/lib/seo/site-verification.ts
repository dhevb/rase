import type { Metadata } from "next";

function parseTokens(raw?: string): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(/[,;\s]+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

/** Google Search Console HTML verification tokens. */
export function parseGoogleSiteVerificationTokens(raw?: string): string[] {
  return parseTokens(raw);
}

/** Bing Webmaster Tools msvalidate.01 tokens. */
export function parseBingSiteVerificationTokens(raw?: string): string[] {
  return parseTokens(raw);
}

/** Meta / Facebook domain verification tokens (Open Graph sharing domain). */
export function parseFacebookDomainVerificationTokens(raw?: string): string[] {
  return parseTokens(raw);
}

/** Build Next.js metadata.verification for all configured search/social platforms. */
export function buildSiteVerificationMetadata(): Metadata["verification"] {
  const google = parseGoogleSiteVerificationTokens(
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  );
  const bing = parseBingSiteVerificationTokens(
    process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
  );
  const facebook = parseFacebookDomainVerificationTokens(
    process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION
  );

  const other: Record<string, string | string[]> = {};
  if (bing.length === 1) other["msvalidate.01"] = bing[0];
  else if (bing.length > 1) other["msvalidate.01"] = bing;
  if (facebook.length === 1) other["facebook-domain-verification"] = facebook[0];
  else if (facebook.length > 1) other["facebook-domain-verification"] = facebook;

  if (!google.length && !Object.keys(other).length) return undefined;

  return {
    ...(google.length
      ? { google: google.length === 1 ? google[0] : google }
      : {}),
    ...(Object.keys(other).length ? { other } : {}),
  };
}
