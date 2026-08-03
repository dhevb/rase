import SiteQuickLinksSection from "@/components/layout/SiteQuickLinksSection";
import RelatedContentSection from "./RelatedContentSection";

type Props = {
  path: string;
  title?: string;
  limit?: number;
  excludePaths?: string[];
  className?: string;
  showQuickLinks?: boolean;
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
  quickLinksClassName,
}: Props) {
  return (
    <>
      {showQuickLinks ? (
        <SiteQuickLinksSection className={quickLinksClassName} />
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
