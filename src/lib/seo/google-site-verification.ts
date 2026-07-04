/** Parse one or more Google Search Console HTML verification tokens from env. */
export function parseGoogleSiteVerificationTokens(raw?: string): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(/[,;\s]+/)
    .map((token) => token.trim())
    .filter(Boolean);
}
