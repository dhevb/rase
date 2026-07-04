import { indexNowKeyFileName } from "@/lib/seo/indexnow";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ keyfile: string }> }
) {
  const key = process.env.INDEXNOW_API_KEY?.trim();
  if (!key) {
    return new Response("Not Found", { status: 404 });
  }

  const { keyfile } = await context.params;
  if (keyfile !== indexNowKeyFileName(key)) {
    return new Response("Not Found", { status: 404 });
  }

  return new Response(key, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
