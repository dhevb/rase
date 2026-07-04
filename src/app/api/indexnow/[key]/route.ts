export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ key: string }> }
) {
  const configuredKey = process.env.INDEXNOW_API_KEY?.trim();
  if (!configuredKey) {
    return new Response("Not Found", { status: 404 });
  }

  const { key } = await context.params;
  if (key !== configuredKey) {
    return new Response("Not Found", { status: 404 });
  }

  return new Response(configuredKey, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
