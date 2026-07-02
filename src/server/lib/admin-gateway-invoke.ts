import { NextRequest, NextResponse } from "next/server";
import { adminGatewayProxyHeaders } from "@/server/lib/admin-gateway-proxy";
import type { AdminSessionPayload } from "@/server/lib/supabase-admin-auth";
import {
  ADMIN_REGISTRATION_PUBLIC_ID_RE,
  ADMIN_REGISTRATION_UUID_RE,
} from "@/lib/admin/registration-id";

type RouteHandler = (
  request: NextRequest,
  context: { params: Promise<Record<string, string>> }
) => Promise<Response>;

function getMethodHandler(mod: unknown, method: string): RouteHandler | undefined {
  if (!mod || typeof mod !== "object") return undefined;
  const handler = (mod as Record<string, unknown>)[method.toUpperCase()];
  return typeof handler === "function" ? (handler as RouteHandler) : undefined;
}

async function buildInnerRequest(
  request: NextRequest,
  session: AdminSessionPayload,
  segments: string[]
): Promise<NextRequest> {
  const incoming = new URL(request.url);
  const targetPath = `/api/v2/admin/${segments.join("/")}`;
  const targetUrl = new URL(targetPath, incoming.origin);
  targetUrl.search = incoming.search;

  const headers = adminGatewayProxyHeaders(session);
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);

  const method = request.method.toUpperCase();
  const hasBody = !["GET", "HEAD"].includes(method);
  const body = hasBody ? await request.arrayBuffer() : undefined;

  return new NextRequest(targetUrl, {
    method,
    headers,
    body: body?.byteLength ? body : undefined,
  });
}

function isRegistrationId(value: string): boolean {
  return ADMIN_REGISTRATION_PUBLIC_ID_RE.test(value) || ADMIN_REGISTRATION_UUID_RE.test(value);
}

async function loadHandlerModule(
  segments: string[],
  method: string
): Promise<{ handler: RouteHandler; params: Record<string, string> } | null> {
  const m = method.toUpperCase();

  if (segments.length === 1) {
    const [resource] = segments;
    try {
      const mod = await import(`@/app/api/v2/admin/${resource}/route`);
      const handler = getMethodHandler(mod, m);
      if (handler) return { handler, params: {} };
    } catch {
      /* try dynamic patterns */
    }
  }

  if (segments.length === 2) {
    const [resource, second] = segments;
    try {
      const mod = await import(`@/app/api/v2/admin/${resource}/${second}/route`);
      const handler = getMethodHandler(mod, m);
      if (handler) return { handler, params: {} };
    } catch {
      /* fall through */
    }

    if (resource === "registrations" && isRegistrationId(second)) {
      const mod = await import("@/app/api/v2/admin/registrations/[registrationId]/route");
      const handler = getMethodHandler(mod, m);
      if (handler) return { handler, params: { registrationId: second } };
    }

    if (resource === "receipts" && isRegistrationId(second)) {
      const mod = await import("@/app/api/v2/admin/receipts/[registrationId]/route");
      const handler = getMethodHandler(mod, m);
      if (handler) return { handler, params: { registrationId: second } };
    }

    if (resource === "badges" && isRegistrationId(second)) {
      const mod = await import("@/app/api/v2/admin/badges/[registrationId]/route");
      const handler = getMethodHandler(mod, m);
      if (handler) return { handler, params: { registrationId: second } };
    }

    if (resource === "certificates" && isRegistrationId(second)) {
      const mod = await import("@/app/api/v2/admin/certificates/[registrationId]/route");
      const handler = getMethodHandler(mod, m);
      if (handler) return { handler, params: { registrationId: second } };
    }
  }

  if (segments.length === 3 && segments[0] === "documents" && segments[2] === "download") {
    const mod = await import("@/app/api/v2/admin/documents/[id]/download/route");
    const handler = getMethodHandler(mod, m);
    if (handler) return { handler, params: { id: segments[1] } };
  }

  if (segments.length === 3 && segments[0] === "donations" && segments[2] === "resend-receipt") {
    const mod = await import("@/app/api/v2/admin/donations/[donationId]/resend-receipt/route");
    const handler = getMethodHandler(mod, m);
    if (handler) return { handler, params: { donationId: segments[1] } };
  }

  if (segments.length === 3 && segments[0] === "email-logs" && segments[2] === "resend") {
    const mod = await import("@/app/api/v2/admin/email-logs/[id]/resend/route");
    const handler = getMethodHandler(mod, m);
    if (handler) return { handler, params: { id: segments[1] } };
  }

  return null;
}

/** Invoke v2 admin route handlers in-process (avoids self-fetch 504 on Vercel). */
export async function invokeV2AdminInProcess(
  request: NextRequest,
  session: AdminSessionPayload,
  segments: string[]
): Promise<Response> {
  const resolved = await loadHandlerModule(segments, request.method);
  if (!resolved) {
    return NextResponse.json(
      { error: "Admin route not found", path: segments.join("/") },
      { status: 404 }
    );
  }

  const innerRequest = await buildInnerRequest(request, session, segments);
  return resolved.handler(innerRequest, {
    params: Promise.resolve(resolved.params),
  });
}
