import PublicPageShell from "@/components/layouts/PublicPageShell";
import { MediaCenterShowcase } from "@/lib/perf/deferred-showcases";
import MediaCenterJsonLd from "@/components/media/MediaCenterJsonLd";
import { loadCmsMediaCenterHub } from "@/lib/cms/organizational";
import { MEDIA_CENTER_PAGE_QUICK_LINKS } from "@/data/media-center-hub";

const BREADCRUMBS = [
  { name: "Home", path: "/" },
  { name: "Media Centre", path: "/media-center" },
];

export default async function MediaCenterPage() {
  const cmsItems = await loadCmsMediaCenterHub();

  return (
    <PublicPageShell
      showHero={false}
      skipContainer
      showCta
      relatedPath="/media-center"
      quickLinks={[...MEDIA_CENTER_PAGE_QUICK_LINKS]}
      breadcrumbs={BREADCRUMBS}
    >
      <MediaCenterJsonLd cmsItems={cmsItems} />
      <MediaCenterShowcase cmsItems={cmsItems} />
    </PublicPageShell>
  );
}
