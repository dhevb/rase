import UpcomingEventsQuickLinks from "@/components/upcoming-events/UpcomingEventsQuickLinks";
import { UpcomingEventsShowcase } from "@/lib/perf/deferred-showcases";
import PublicPageShell from "@/components/layouts/PublicPageShell";
import {
  UPCOMING_EVENTS_BREADCRUMBS,
  UPCOMING_EVENTS_PATH,
  UPCOMING_EVENTS_QUICK_LINKS,
} from "@/data/upcoming-events-hub";

export default function UpcomingEventsPage() {
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
    </PublicPageShell>
  );
}
