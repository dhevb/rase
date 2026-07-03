import { RegistrationRow } from "@/lib/exportRegistrations";
import type { RegistrationAdminStats } from "@/types/admin-dashboard";
import {
  registrationAttributionValue,
  type RegistrationAttributionField,
} from "@/lib/analytics/registration-attribution";

export type MetricRow = { label: string; count: number };

function tally(rows: RegistrationRow[], field: keyof RegistrationRow): MetricRow[] {
  const map = new Map<string, number>();
  for (const r of rows) {
    const v = String(r[field] ?? "").trim() || "unknown";
    map.set(v, (map.get(v) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

function tallyAttribution(rows: RegistrationRow[], field: RegistrationAttributionField): MetricRow[] {
  const map = new Map<string, number>();
  for (const r of rows) {
    const v = registrationAttributionValue(r, field) || "unknown";
    map.set(v, (map.get(v) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

export function computeAdminMetrics(rows: RegistrationRow[]) {
  const total = rows.length;
  const completed = rows.filter((r) => r.registrationId).length;
  const paid = rows.filter((r) => r.paymentStatus === "Paid").length;

  return {
    total,
    completed,
    paid,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    paidRate: total > 0 ? Math.round((paid / total) * 100) : 0,
    utmSources: tallyAttribution(rows, "utmSource"),
    utmCampaigns: tallyAttribution(rows, "utmCampaign"),
    trafficSources: tallyAttribution(rows, "trafficSource"),
    devices: tallyAttribution(rows, "deviceType"),
    languages: tallyAttribution(rows, "browserLanguage"),
    countries: tally(rows, "country"),
    registrationTypes: tally(rows, "registrationType"),
  };
}

function countRegistrationType(rows: RegistrationRow[], ...types: string[]): number {
  const normalized = new Set(types.map((t) => t.toLowerCase()));
  return rows.filter((r) => normalized.has(String(r.registrationType ?? "").toLowerCase())).length;
}

/** Approximate server stats from loaded rows when the stats API is unavailable. */
export function deriveRegistrationAdminStatsFromRows(
  rows: RegistrationRow[],
  listTotal: number
): RegistrationAdminStats {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const today = rows.filter((r) => {
    if (!r.createdAt) return false;
    const created = new Date(String(r.createdAt));
    return !Number.isNaN(created.getTime()) && created >= startOfToday;
  }).length;

  const paidRows = rows.filter((r) => r.paymentStatus === "Paid");
  const revenue = paidRows.reduce((sum, r) => sum + Number(r.registrationFee ?? 0), 0);

  return {
    total: listTotal,
    delegate: countRegistrationType(rows, "Delegate"),
    conclave: countRegistrationType(rows, "Conclave"),
    olympiad: countRegistrationType(rows, "Olympiad"),
    awards: countRegistrationType(rows, "Awards"),
    bestPractices: countRegistrationType(rows, "Best_Practices", "Best Practices"),
    accommodation: rows.filter(
      (r) =>
        r.accommodationRequired === "Yes" ||
        r.accommodationStatus === "Requested"
    ).length,
    today,
    pendingPayments: rows.filter(
      (r) =>
        r.paymentStatus === "Pending Payment" ||
        r.paymentStatus === "Pending_Payment"
    ).length,
    submittedFree: rows.filter((r) => r.paymentStatus === "Submitted").length,
    completedPayments: paidRows.length,
    pendingVerifications: rows.filter((r) => r.registrationStatus === "Pending").length,
    approved: rows.filter((r) => r.registrationStatus === "Approved").length,
    verified: rows.filter((r) => r.registrationStatus === "Verified").length,
    pendingAccommodation: rows.filter((r) => r.accommodationStatus === "Requested").length,
    revenue,
  };
}
