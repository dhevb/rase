import DonationQuickLinks from "@/components/donation/DonationQuickLinks";
import { DonationShowcase } from "@/lib/perf/deferred-showcases";
import PublicPageShell from "@/components/layouts/PublicPageShell";
import { DONATION_BREADCRUMBS, DONATION_PATH, DONATION_QUICK_LINKS } from "@/data/donation-hub";

export default function DonationPage() {
  return (
    <PublicPageShell
      showHero={false}
      showCta={false}
      breadcrumbs={[...DONATION_BREADCRUMBS]}
      relatedPath={DONATION_PATH}
      quickLinks={[...DONATION_QUICK_LINKS]}
      skipContainer
    >
      <DonationQuickLinks />
      <DonationShowcase />
    </PublicPageShell>
  );
}
