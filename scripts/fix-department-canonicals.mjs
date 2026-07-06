/**
 * One-time fix: CMS department pages seeded with canonicalUrl `/{slug}` instead of `/departments/{slug}`.
 * Usage: node scripts/fix-department-canonicals.mjs
 */
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SLUG_TO_CANONICAL = {
  home: "/",
  "academic-council": "/departments/academic-council",
  prabandhan: "/departments/prabandhan",
  prachar: "/departments/prachar",
  sampark: "/departments/sampark",
  vitt: "/departments/vitt",
};

async function main() {
  const pages = await prisma.page.findMany({
    where: {
      slug: { in: Object.keys(SLUG_TO_CANONICAL) },
      deletedAt: null,
    },
    select: { id: true, slug: true },
  });

  let updated = 0;
  for (const page of pages) {
    const canonicalUrl = SLUG_TO_CANONICAL[page.slug];
    if (!canonicalUrl) continue;

    const result = await prisma.seoMetadata.updateMany({
      where: {
        entityType: "page",
        entityId: page.id,
        OR: [
          { canonicalUrl: `/${page.slug}` },
          { canonicalUrl: `https://www.rase.co.in/${page.slug}` },
          { canonicalUrl: `https://rase.co.in/${page.slug}` },
        ],
      },
      data: { canonicalUrl },
    });
    updated += result.count;
    if (result.count > 0) {
      console.log(`✓ ${page.slug}: canonical → ${canonicalUrl} (${result.count} row(s))`);
    }
  }

  console.log(`Done. Updated ${updated} seo_metadata row(s).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
