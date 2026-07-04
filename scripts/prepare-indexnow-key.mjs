#!/usr/bin/env node
/**
 * Write IndexNow root key file to public/{key}.txt (required for site-wide URL submission).
 * Non-root keyLocation paths (e.g. /api/indexnow) only authorize URLs under that path.
 */
import { readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const publicDir = join(process.cwd(), "public");
const key = process.env.INDEXNOW_API_KEY?.trim();

if (!key || key.length < 8 || key.length > 128) {
  console.log("[indexnow] INDEXNOW_API_KEY not set — skip root key file");
  process.exit(0);
}

const filename = `${key}.txt`;
const hexKeyPattern = /^[0-9a-f]{32}\.txt$/i;

for (const name of readdirSync(publicDir)) {
  if (hexKeyPattern.test(name) && name !== filename) {
    unlinkSync(join(publicDir, name));
    console.log(`[indexnow] removed stale ${name}`);
  }
}

writeFileSync(join(publicDir, filename), key, { encoding: "utf8" });
console.log(`[indexnow] wrote public/${filename}`);
