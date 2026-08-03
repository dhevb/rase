import PageBreadcrumbBar from "@/components/layout/PageBreadcrumbBar";
import { REGISTRATION_BREADCRUMBS } from "@/data/registration-hub";

export default function RegistrationQuickLinks() {
  return <PageBreadcrumbBar items={REGISTRATION_BREADCRUMBS} />;
}
