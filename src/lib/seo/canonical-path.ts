/**
 * Legacy CMS department pages were seeded at `/{slug}`; public routes live under `/departments/*`.
 * Normalize canonicals and sitemap URLs so search engines never index orphan short paths.
 */
const ROOT_SLUG_TO_CANONICAL: Record<string, string> = {
  home: "/",
  "academic-council": "/departments/academic-council",
  prabandhan: "/departments/prabandhan",
  prachar: "/departments/prachar",
  sampark: "/departments/sampark",
  vitt: "/departments/vitt",
};

export const LEGACY_DEPARTMENT_ROOT_SLUGS = new Set(Object.keys(ROOT_SLUG_TO_CANONICAL));

export function normalizeCanonicalPath(path: string | null | undefined): string {
  if (!path || path === "/") return path ?? "/";

  let pathname = path;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    try {
      pathname = new URL(path).pathname;
    } catch {
      return path;
    }
  }

  if (!pathname.startsWith("/")) {
    pathname = `/${pathname}`;
  }

  const segments = pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  if (segments.length === 1) {
    const mapped = ROOT_SLUG_TO_CANONICAL[segments[0]!];
    if (mapped) return mapped;
  }

  return pathname;
}

export function isLegacyDepartmentRootPath(path: string): boolean {
  const normalized = normalizeCanonicalPath(path);
  const slug = path.replace(/^\//, "").split("/")[0];
  return Boolean(slug && ROOT_SLUG_TO_CANONICAL[slug] === normalized && path === `/${slug}`);
}

export function defaultPageCanonicalUrl(slug: string, pageType?: string): string {
  if (pageType === "department") {
    return `/departments/${slug}`;
  }
  if (slug === "home") {
    return "/";
  }
  return `/${slug}`;
}
