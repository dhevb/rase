import { CANONICAL_ROUTES } from "@/constants/canonical-routes";
import { NIT_VENUE_CONTACT } from "@/config/organization";
import { ROUTES } from "@/constants/routes";

export type InstitutionalAboutPage = {
  slug: string;
  path: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  description: string;
  paragraphs: readonly string[];
  highlights?: readonly { title: string; body: string }[];
  relatedLinks: readonly { label: string; href: string }[];
};

export const INSTITUTIONAL_ABOUT_PAGES: Record<string, InstitutionalAboutPage> = {
  nit: {
    slug: "nit-hamirpur",
    path: CANONICAL_ROUTES.about.nitHamirpur,
    title: "NIT Hamirpur",
    eyebrow: "Venue Partner",
    subtitle: `Host campus for Shiksha Mahakumbh 6.0 — ${NIT_VENUE_CONTACT.eventDates}`,
    description:
      "National Institute of Technology Hamirpur is the venue partner and local coordinating institution for Shiksha Mahakumbh 6.0 in Himachal Pradesh.",
    paragraphs: [
      "National Institute of Technology (NIT) Hamirpur is a premier engineering and technology institution in Himachal Pradesh. As the venue partner for Shiksha Mahakumbh 6.0, NIT Hamirpur provides the campus infrastructure, local coordination, and hospitality support for delegates attending the national education summit.",
      "The summit theme शिक्षा, प्रकृति और प्रगति — Education for Development and Harmony with Nature — aligns with NIT Hamirpur's commitment to sustainable, research-driven, and community-engaged education in the Himalayan region.",
      "Delegates travelling to NIT Hamirpur can reach the campus via Una Himachal railway station (~80 km), Chandigarh airport (~175 km), or road routes from Delhi, Chandigarh, and Jalandhar. Detailed travel guidance is available on the Contact page.",
    ],
    highlights: [
      {
        title: "Venue address",
        body: NIT_VENUE_CONTACT.venue,
      },
      {
        title: "Local coordination",
        body: `${NIT_VENUE_CONTACT.email} · ${NIT_VENUE_CONTACT.phones.join(" / ")}`,
      },
    ],
    relatedLinks: [
      { label: "Contact & travel guide", href: ROUTES.contact },
      { label: "Register for SMK 6.0", href: ROUTES.registration },
      { label: "Upcoming events", href: ROUTES.upcomingEvents },
      { label: "Academic Council", href: ROUTES.academicCouncil },
    ],
  },
  uba: {
    slug: "unnat-bharat-abhiyan",
    path: CANONICAL_ROUTES.about.unnatBharatAbhiyan,
    title: "Unnat Bharat Abhiyan",
    eyebrow: "National Initiative",
    subtitle: "Connecting higher education institutions with rural development",
    description:
      "Unnat Bharat Abhiyan (UBA) is a flagship national programme linking institutions of higher education with rural communities for sustainable development — a key collaborating framework for Shiksha Mahakumbh 6.0 at NIT Hamirpur.",
    paragraphs: [
      "Unnat Bharat Abhiyan is a programme of the Ministry of Education, Government of India, that aims to bring transformational change in rural development processes by leveraging knowledge institutions to help build the architecture of an inclusive India.",
      "Through UBA, participating institutions — including NIT Hamirpur — engage with adopted villages to address local challenges in health, education, livelihoods, water, energy, and community innovation.",
      "Shiksha Mahakumbh 6.0 at NIT Hamirpur reflects this Whole-of-Society spirit: connecting academic research, student innovation, community development models, and institutional partnerships toward Viksit Bharat 2047.",
    ],
    highlights: [
      {
        title: "Collaboration at SMK 6.0",
        body: "Student projects, exhibition pavilions, and community development models at the summit showcase UBA-aligned grassroots innovation.",
      },
    ],
    relatedLinks: [
      { label: "Student Projects / Project Expo", href: `${ROUTES.academicCouncil}#projects` },
      { label: "Exhibition programme", href: `${ROUTES.academicCouncil}#exhibition` },
      { label: "About NIT Hamirpur", href: ROUTES.aboutNit },
      { label: "Register for SMK 6.0", href: ROUTES.registration },
    ],
  },
} as const;

export function getInstitutionalAboutPage(slug: string): InstitutionalAboutPage | undefined {
  const key =
    slug === "nit-hamirpur" ? "nit" : slug === "unnat-bharat-abhiyan" ? "uba" : slug;
  return INSTITUTIONAL_ABOUT_PAGES[key as keyof typeof INSTITUTIONAL_ABOUT_PAGES];
}
