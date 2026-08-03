import PageBreadcrumbBar from "@/components/layout/PageBreadcrumbBar";
import { DONATION_BREADCRUMBS } from "@/data/donation-hub";

export default function DonationQuickLinks() {
  return <PageBreadcrumbBar items={DONATION_BREADCRUMBS} />;
}
