import type { RegistrationRow } from "@/lib/exportRegistrations";

export const REGISTRATION_ATTRIBUTION_FIELDS = [
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "utmTerm",
  "utmContent",
  "trafficSource",
  "deviceType",
  "browserLanguage",
  "screenClass",
  "referrer",
] as const;

export type RegistrationAttributionField = (typeof REGISTRATION_ATTRIBUTION_FIELDS)[number];

function metadataRecord(row: RegistrationRow): Record<string, unknown> {
  const meta = row.metadata;
  if (meta && typeof meta === "object" && !Array.isArray(meta)) {
    return meta as Record<string, unknown>;
  }
  return {};
}

/** Read attribution saved in metadata or flattened on the row (admin list / exports). */
export function registrationAttributionValue(
  row: RegistrationRow,
  field: RegistrationAttributionField
): string {
  const top = row[field];
  if (top != null && String(top).trim()) return String(top).trim();
  const nested = metadataRecord(row)[field];
  if (nested != null && String(nested).trim()) return String(nested).trim();
  return "";
}

export function flattenRegistrationAttribution(
  row: RegistrationRow
): Record<RegistrationAttributionField, string> {
  const out = {} as Record<RegistrationAttributionField, string>;
  for (const field of REGISTRATION_ATTRIBUTION_FIELDS) {
    out[field] = registrationAttributionValue(row, field);
  }
  return out;
}
