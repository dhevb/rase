import { NextRequest, NextResponse } from "next/server";
import { getClientIp, rateLimitAsync } from "@/lib/security/rateLimit";
import { getPublicVisitorStats } from "@/server/services/visitor-analytics.service";

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
};

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const limited = await rateLimitAsync({
    key: `v2-analytics-stats:${ip}`,
    limit: 120,
    windowMs: 60_000,
  });
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } }
    );
  }

  try {
    const stats = await getPublicVisitorStats();
    return NextResponse.json({ success: true, ...stats }, { headers: CACHE_HEADERS });
  } catch {
    return NextResponse.json(
      { success: false, error: "Unable to load visitor stats" },
      { status: 503, headers: CACHE_HEADERS }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: CACHE_HEADERS,
  });
}
