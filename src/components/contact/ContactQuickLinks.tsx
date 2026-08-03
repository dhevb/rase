import PageBreadcrumbBar from "@/components/layout/PageBreadcrumbBar";
import { CONTACT_BREADCRUMBS } from "@/data/contact-hub";

export default function ContactQuickLinks() {
  return <PageBreadcrumbBar items={CONTACT_BREADCRUMBS} innerClassName="mx-auto max-w-6xl px-4 py-5 md:px-8" />;
}
