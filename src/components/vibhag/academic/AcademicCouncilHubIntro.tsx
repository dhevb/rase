import BreadcrumbNav from "@/components/ui/BreadcrumbNav";
import HubGradientBanner from "@/components/ui/HubGradientBanner";
import {
  ACADEMIC_COUNCIL_BREADCRUMBS,
  ACADEMIC_COUNCIL_HUB_STATS,
  ACADEMIC_COUNCIL_PAGE_HERO,
} from "@/data/academic-council-hub";

export default function AcademicCouncilHubIntro() {  return (
    <div className="border-b border-brand-navy/10 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        <BreadcrumbNav
          items={ACADEMIC_COUNCIL_BREADCRUMBS.map((item, index, arr) => ({
            label: item.name,
            href: index < arr.length - 1 ? item.path : undefined,
          }))}
          className="mb-6"
        />

        <HubGradientBanner
          id="academic-council-hub-banner"
          titleAs="h1"
          eyebrow={ACADEMIC_COUNCIL_PAGE_HERO.eyebrow}
          title={ACADEMIC_COUNCIL_PAGE_HERO.title}
          subtitle={ACADEMIC_COUNCIL_PAGE_HERO.subtitle}
          stats={ACADEMIC_COUNCIL_HUB_STATS}
          footer={
            <p className="max-w-3xl text-sm leading-relaxed text-white/85 md:text-base">
              {ACADEMIC_COUNCIL_PAGE_HERO.tagline}
            </p>
          }
        />
      </div>
    </div>
  );
}
