import { createApiHandler } from "@/server/lib/api-handler";
import { getRegistrationAdminStats } from "@/server/services/dashboard.service";

export const runtime = "nodejs";
export const maxDuration = 60;

export const GET = createApiHandler(
  async () => getRegistrationAdminStats(),
  { requireAdmin: true, adminResource: "registrations", rateLimitKey: "v2-admin-registrations-stats", limit: 60 }
);
