import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PublicPageShell from "@/components/layouts/PublicPageShell";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import InstitutionalAboutView from "@/components/about/InstitutionalAboutView";
import { getInstitutionalAboutPage } from "@/data/institutional-about-pages";
import { createPageMetadata } from "@/lib/seo/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

const VALID_SLUGS = new Set(["nit-hamirpur", "unnat-bharat-abhiyan"]);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getInstitutionalAboutPage(slug);
  if (!page) return {};
  return createPageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    keywords: [page.title, "Shiksha Mahakumbh 6.0", "Department of Holistic Education"],
  });
}

export default async function InstitutionalAboutPage({ params }: Props) {
  const { slug } = await params;
  if (!VALID_SLUGS.has(slug)) notFound();

  const page = getInstitutionalAboutPage(slug);
  if (!page) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/introduction" },
          { name: page.title, path: page.path },
        ]}
      />
      <PublicPageShell
        hero={{
          eyebrow: page.eyebrow,
          title: page.title,
          subtitle: page.subtitle,
          accent: "brand",
        }}
        relatedPath={page.path}
        showSiteQuickLinks={false}
        showCta={false}
        skipContainer
      >
        <InstitutionalAboutView page={page} />
      </PublicPageShell>
    </>
  );
}
