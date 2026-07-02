import { NextRequest, NextResponse } from "next/server";
import { requireAdminSecret } from "@/server/lib/admin-guard";
import { assertPermission } from "@/server/lib/admin-rbac";
import { toErrorResponse } from "@/server/lib/errors";
import { getRegistrationAdminStats } from "@/server/services/dashboard.service";

/** Serve registration stats without loading the App Router module (reliable on Vercel). */
export async function handleRegistrationAdminStats(
  request: NextRequest
): Promise<Response> {
  try {
    requireAdminSecret(request);
    await assertPermission(request, "registrations.read");
    const stats = await getRegistrationAdminStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("ADMIN_STATS_DIRECT_FAILED", {
      error: error instanceof Error ? error.message : String(error),
    });
    const mapped = toErrorResponse(error);
    return NextResponse.json(
      { error: mapped.error, code: mapped.code },
      { status: mapped.status }
    );
  }
}
