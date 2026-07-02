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

/** Static imports so Next.js bundles nested admin routes (dynamic template imports miss some paths). */
const ROUTE_LOADERS: Record<string, () => Promise<unknown>> = {
  registrations: () => import("@/app/api/v2/admin/registrations/route"),
  "registrations/stats": () => import("@/app/api/v2/admin/registrations/stats/route"),
  "registrations/bulk-status": () =>
    import("@/app/api/v2/admin/registrations/bulk-status/route"),
  dashboard: () => import("@/app/api/v2/admin/dashboard/route"),
  "attendees/export": () => import("@/app/api/v2/admin/attendees/export/route"),
  "payments/analytics": () => import("@/app/api/v2/admin/payments/analytics/route"),
  "analytics/pages": () => import("@/app/api/v2/admin/analytics/pages/route"),
  "analytics/visitors": () => import("@/app/api/v2/admin/analytics/visitors/route"),
  "executive-dashboard": () => import("@/app/api/v2/admin/executive-dashboard/route"),
  "lifecycle-analytics": () => import("@/app/api/v2/admin/lifecycle-analytics/route"),
  "payment-recovery": () => import("@/app/api/v2/admin/payment-recovery/route"),
  "payment-audit": () => import("@/app/api/v2/admin/payment-audit/route"),
  "email-logs": () => import("@/app/api/v2/admin/email-logs/route"),
  payments: () => import("@/app/api/v2/admin/payments/route"),
  checkin: () => import("@/app/api/v2/admin/checkin/route"),
  attendees: () => import("@/app/api/v2/admin/attendees/route"),
  documents: () => import("@/app/api/v2/admin/documents/route"),
  donations: () => import("@/app/api/v2/admin/donations/route"),
  communications: () => import("@/app/api/v2/admin/communications/route"),
  webhooks: () => import("@/app/api/v2/admin/webhooks/route"),
  users: () => import("@/app/api/v2/admin/users/route"),
  settings: () => import("@/app/api/v2/admin/settings/route"),
  feedback: () => import("@/app/api/v2/admin/feedback/route"),
  contact: () => import("@/app/api/v2/admin/contact/route"),
  events: () => import("@/app/api/v2/admin/events/route"),
  committees: () => import("@/app/api/v2/admin/committees/route"),
  notices: () => import("@/app/api/v2/admin/notices/route"),
  pages: () => import("@/app/api/v2/admin/pages/route"),
  media: () => import("@/app/api/v2/admin/media/route"),
  "media-library": () => import("@/app/api/v2/admin/media-library/route"),
  "ai-insights": () => import("@/app/api/v2/admin/ai-insights/route"),
  "audit-logs": () => import("@/app/api/v2/admin/audit-logs/route"),
};

export async function buildInnerAdminRequest(
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
  const pathKey = segments.join("/");

  const staticLoader = ROUTE_LOADERS[pathKey];
  if (staticLoader) {
    try {
      const mod = await staticLoader();
      const handler = getMethodHandler(mod, m);
      if (handler) return { handler, params: {} };
    } catch (error) {
      console.error("ADMIN_GATEWAY_STATIC_ROUTE_FAILED", {
        path: pathKey,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

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

  const innerRequest = await buildInnerAdminRequest(request, session, segments);
  return resolved.handler(innerRequest, {
    params: Promise.resolve(resolved.params),
  });
}
