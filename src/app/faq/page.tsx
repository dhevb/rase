import PublicPageShell from "@/components/layouts/PublicPageShell";
import HomeFaqSection from "@/components/home/HomeFaqSection";
import { createPageMetadata } from "@/lib/seo/metadata";
import { withHreflang } from "@/lib/seo/hreflang";
import { loadCmsFeaturedFaqs, loadPublicChromeCms } from "@/lib/cms/server";
import { CmsProvider } from "@/lib/cms/context";
import { buildFaqPageSchema, extractFaqsFromCmsData } from "@/lib/cms/faq";
import { HOME_DEFAULT_FAQS } from "@/data/home-faqs";

export const revalidate = 3600;

export async function generateMetadata() {
  return withHreflang(
    createPageMetadata({
      title: "Frequently Asked Questions",
      description:
        "Answers to common questions about Shiksha Mahakumbh 6.0 — dates, venue, registration, accommodation, and programme tracks.",
      path: "/faq",
      keywords: [
        "Shiksha Mahakumbh FAQ",
        "SMK 6.0 registration help",
        "NIT Hamirpur conference questions",
      ],
    }),
    "/faq"
  );
}

export default async function FaqPage() {
  const [chrome, featuredFaqs] = await Promise.all([
    loadPublicChromeCms("en"),
    loadCmsFeaturedFaqs("en"),
  ]);
  const cmsData = { ...chrome, featuredFaqs };
  const faqs = extractFaqsFromCmsData(cmsData);
  const faqSchema = buildFaqPageSchema(faqs.length ? faqs : HOME_DEFAULT_FAQS);

  return (
    <CmsProvider data={cmsData}>
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      <PublicPageShell
        hero={{
          eyebrow: "Help",
          title: "Frequently Asked Questions",
          subtitle:
            "Registration, venue, accommodation, and programme information for Shiksha Mahakumbh 6.0.",
          accent: "brand",
        }}
        showCta={false}
        skipContainer
        mainClassName=""
      >
        <HomeFaqSection />
      </PublicPageShell>
    </CmsProvider>
  );
}
