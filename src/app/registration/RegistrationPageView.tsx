import PublicPageShell from "@/components/layouts/PublicPageShell";
import RegistrationQuickLinks from "@/components/registration/RegistrationQuickLinks";
import RegistrationIntroBanner from "@/components/registration/RegistrationIntroBanner";
import RegistrationFaqSection from "@/components/registration/RegistrationFaqSection";
import RegistrationHub from "./RegistrationHub";
import {
  REGISTRATION_BREADCRUMBS,
  REGISTRATION_PATH,
  REGISTRATION_QUICK_LINKS,
} from "@/data/registration-hub";

export default function RegistrationPageView() {
  return (
    <PublicPageShell
      showHero={false}
      breadcrumbs={[...REGISTRATION_BREADCRUMBS]}
      relatedPath={REGISTRATION_PATH}
      quickLinks={[...REGISTRATION_QUICK_LINKS]}
      showCta={false}
      skipContainer
    >
      <RegistrationHub />
      <RegistrationQuickLinks />
      <RegistrationIntroBanner />
      <RegistrationFaqSection />
    </PublicPageShell>
  );
}
