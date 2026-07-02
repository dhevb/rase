import type { NextRequest } from "next/server";
import { signAdminGatewayContext } from "@/server/lib/admin-gateway-context";
import { handleRegistrationAdminStats } from "@/server/lib/admin-gateway-direct";
import {
  buildInnerAdminRequest,
  invokeV2AdminInProcess,
} from "@/server/lib/admin-gateway-invoke";
import type { AdminSessionPayload } from "@/server/lib/supabase-admin-auth";

/** Build signed headers for internal v2 admin proxy calls. */
export function adminGatewayProxyHeaders(session: AdminSessionPayload): Headers {
  const secret = process.env.ADMIN_OPS_SECRET;
  if (!secret) {
    throw new Error("ADMIN_OPS_SECRET is not configured");
  }

  const headers = new Headers();
  headers.set("x-ops-secret", secret);
  headers.set("x-admin-role", session.role);
  headers.set("x-admin-email", session.email);
  headers.set("x-admin-uid", session.uid);
  const expMs = Date.now() + 60_000;
  headers.set("x-admin-session-version", String(session.sessionVersion));
  headers.set("x-admin-context-exp", String(expMs));
  headers.set(
    "x-admin-context-sig",
    signAdminGatewayContext(
      session.email,
      session.role,
      session.uid,
      session.sessionVersion,
      expMs
    )
  );
  return headers;
}

export async function proxyToV2Admin(
  request: NextRequest,
  session: AdminSessionPayload,
  segments: string[]
): Promise<Response> {
  const pathKey = segments.join("/");
  if (pathKey === "registrations/stats" && request.method.toUpperCase() === "GET") {
    const innerRequest = await buildInnerAdminRequest(request, session, segments);
    return handleRegistrationAdminStats(innerRequest);
  }
  return invokeV2AdminInProcess(request, session, segments);
}
