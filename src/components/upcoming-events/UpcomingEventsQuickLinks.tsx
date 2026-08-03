import PageBreadcrumbBar from "@/components/layout/PageBreadcrumbBar";
import { UPCOMING_EVENTS_BREADCRUMBS } from "@/data/upcoming-events-hub";

export default function UpcomingEventsQuickLinks() {
  return <PageBreadcrumbBar items={UPCOMING_EVENTS_BREADCRUMBS} />;
}
