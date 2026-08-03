import SiteQuickLinksSection from "@/components/layout/SiteQuickLinksSection";
import { SITE_QUICK_LINKS, type SiteQuickLink } from "@/data/site-quick-links";
import RelatedContentSection from "./RelatedContentSection";

type Props = {
  path: string;
  title?: string;
  limit?: number;
  excludePaths?: string[];
  className?: string;
  showQuickLinks?: boolean;
  quickLinks?: readonly SiteQuickLink[];
  quickLinksClassName?: string;
};

/** Quick-link grid followed by related programmes block. */
export default function RelatedProgramsSection({
  path,
  title,
  limit,
  excludePaths,
  className,
  showQuickLinks = true,
  quickLinks,
  quickLinksClassName,
}: Props) {
  const linksToShow = quickLinks ?? (showQuickLinks ? SITE_QUICK_LINKS : undefined);

  return (
    <>
      {linksToShow?.length ? (
        <SiteQuickLinksSection links={linksToShow} className={quickLinksClassName} />
      ) : null}
      <RelatedContentSection
        path={path}
        title={title}
        limit={limit}
        excludePaths={excludePaths}
        className={className}
      />
    </>
  );
}
