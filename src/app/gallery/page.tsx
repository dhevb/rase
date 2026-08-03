import GalleryJsonLd from "@/components/gallery/GalleryJsonLd";
import { GalleryShowcase } from "@/lib/perf/deferred-showcases";
import PublicPageShell from "@/components/layouts/PublicPageShell";
import type { GalleryTab } from "@/data/gallery-hub";
import { GALLERY_QUICK_LINKS } from "@/data/gallery-hub";

const BREADCRUMBS = [
  { name: "Home", path: "/" },
  { name: "Media Centre", path: "/media-center" },
  { name: "Gallery", path: "/gallery" },
];

type Props = {
  searchParams: Promise<{ tab?: string }>;
};

export default async function GalleryRoutePage({ searchParams }: Props) {
  const params = await searchParams;
  const activeTab: GalleryTab = params.tab === "videos" ? "videos" : "photos";

  return (
    <PublicPageShell
      showHero={false}
      showCta={false}
      breadcrumbs={BREADCRUMBS}
      relatedPath="/gallery"
      quickLinks={[...GALLERY_QUICK_LINKS]}
      skipContainer
    >
      <GalleryJsonLd />
      <GalleryShowcase activeTab={activeTab} />
    </PublicPageShell>
  );
}
