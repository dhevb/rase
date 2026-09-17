import PublicPageShell from "@/components/layouts/PublicPageShell";
import CmtSubmitInterstitial from "@/components/research/CmtSubmitInterstitial";
import { createPageMetadata } from "@/lib/seo/metadata";
import { brandPageHero } from "@/lib/page-heroes";

export const metadata = createPageMetadata({
  title: "Paper Submission — Microsoft CMT",
  description:
    "Submit research papers and abstracts for the Shiksha Mahakumbh 6.0 Multi Track Conference (SMK2026) via the official Microsoft CMT portal. Double-blind peer review; conference registration deadline 30 September 2026.",
  path: "/research/submit",
  keywords: [
    "Shiksha Mahakumbh paper submission",
    "SMK 6.0 CMT",
    "Multi Track Conference",
  ],
});

export default function ResearchSubmitPage() {
  return (
    <PublicPageShell
      hero={brandPageHero(
        "Paper Submission",
        "Official Microsoft CMT portal for Shiksha Mahakumbh 6.0 research tracks.",
        "Research"
      )}
      skipContainer
    >
      <CmtSubmitInterstitial />
    </PublicPageShell>
  );
}
