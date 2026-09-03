import UpcomingEventsQuickLinks from "@/components/upcoming-events/UpcomingEventsQuickLinks";
import { UpcomingEventsShowcase } from "@/lib/perf/deferred-showcases";
import Smk6EditionDetail from "@/components/upcoming-events/Smk6EditionDetail";
import PublicPageShell from "@/components/layouts/PublicPageShell";
import { loadCmsSpeakersForEdition } from "@/lib/cms/organizational";
import {
  UPCOMING_EVENTS_BREADCRUMBS,
  UPCOMING_EVENTS_PATH,
  UPCOMING_EVENTS_QUICK_LINKS,
} from "@/data/upcoming-events-hub";

export default async function UpcomingEventsPage() {
  const smk6Speakers = await loadCmsSpeakersForEdition("6.0");

  return (
    <PublicPageShell
      showHero={false}
      showCta={false}
      breadcrumbs={[...UPCOMING_EVENTS_BREADCRUMBS]}
      relatedPath={UPCOMING_EVENTS_PATH}
      quickLinks={[...UPCOMING_EVENTS_QUICK_LINKS]}
      skipContainer
    >
      <UpcomingEventsQuickLinks />
      <UpcomingEventsShowcase />
      <Smk6EditionDetail speakers={smk6Speakers} />
    </PublicPageShell>
  );
}
