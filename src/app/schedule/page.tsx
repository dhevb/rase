import PublicPageShell from "@/components/layouts/PublicPageShell";
import Smk6ScheduleExperience from "@/components/schedule/Smk6ScheduleExperience";
import Smk6ScheduleJsonLd from "@/components/schedule/Smk6ScheduleJsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";
import { CANONICAL_ROUTES } from "@/constants/canonical-routes";
import { officialScheduleSeo, SMK_6_SCHEDULE_PATH } from "@/data/smk-6-official-schedule";
import { SMK_6_OFFICIAL_COVER } from "@/data/smk-6-edition-hub";
import { SITE_URL } from "@/config/site";

const seo = officialScheduleSeo();

export const metadata = createPageMetadata({
  title: seo.title,
  description: seo.description,
  path: seo.path,
  keywords: [...seo.keywords],
  locale: "en_IN",
  ogImageUrl: `${SITE_URL}${SMK_6_OFFICIAL_COVER.src}`,
});

export default function OfficialSchedulePage() {
  return (
    <PublicPageShell
      showHero={false}
      showCta={false}
      skipContainer
      relatedPath={SMK_6_SCHEDULE_PATH}
      breadcrumbs={[
        { name: "Home", path: CANONICAL_ROUTES.home },
        { name: "Upcoming Events", path: CANONICAL_ROUTES.upcomingEvents },
        { name: "Official Schedule", path: SMK_6_SCHEDULE_PATH },
      ]}
    >
      <Smk6ScheduleJsonLd />
      <Smk6ScheduleExperience />
    </PublicPageShell>
  );
}
