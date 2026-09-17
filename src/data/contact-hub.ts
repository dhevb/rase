import { CANONICAL_ROUTES } from "@/constants/canonical-routes";
import { SITE_URL } from "@/config/site";
import { DHE_ORGANIZATION, NIT_VENUE_CONTACT } from "@/config/organization";

export const CONTACT_PATH = CANONICAL_ROUTES.contact;

export const CONTACT_HERO_IMAGE = "/branding/shiksha-mahakumbh-brand-hero.png";

export const CONTACT_HERO_IMAGE_ALT =
  "Contact Shiksha Mahakumbh Abhiyan — Department of Holistic Education organising team";

export const CONTACT_OG_IMAGE = `${SITE_URL}${CONTACT_HERO_IMAGE}`;

export const CONTACT_CANONICAL_URL = `${SITE_URL}${CONTACT_PATH}`;

export const CONTACT_PAGE_HERO = {
  eyebrow: "Get in Touch",
  title: "Contact Us",
  subtitle:
    "Find the official contact for each Shiksha Mahakumbh 6.0 programme, plus the organising secretariat, venue coordination, and message form.",
} as const;

export const CONTACT_BREADCRUMBS = [
  { name: "Home", path: "/" },
  { name: "Contact Us", path: CONTACT_PATH },
] as const;

export const CONTACT_QUICK_LINKS = [
  { label: "Register for SMK 6.0", href: CANONICAL_ROUTES.registration, icon: "✅" },
  { label: "Programme Contacts", href: `${CANONICAL_ROUTES.contact}#programme-contacts`, icon: "📞" },
  { label: "Sampark Vibhag", href: CANONICAL_ROUTES.departments.sampark, icon: "🤝" },
  { label: "Donate (80G)", href: CANONICAL_ROUTES.donation, icon: "💝" },
  { label: "Upcoming Events", href: CANONICAL_ROUTES.upcomingEvents, icon: "🗓️" },
  { label: "Press Releases", href: CANONICAL_ROUTES.press, icon: "📰" },
  { label: "About the Abhiyan", href: CANONICAL_ROUTES.introduction, icon: "📜" },
] as const;

export const CONTACT_SUBJECT_PRESETS = [
  "Registration support",
  "Conference",
  "Conclave",
  "Exhibition",
  "Project Expo",
  "Partnership / institution",
  "Media enquiry",
  "Donation / sponsorship",
  "General enquiry",
] as const;

export const CONTACT_KEYWORDS = [
  "Contact Shiksha Mahakumbh",
  "Department of Holistic Education address",
  "DHE SAS Nagar",
  "education summit contact India",
  "SMK 2026 registration help",
  "programme contacts Shiksha Mahakumbh",
  "Shiksha Mahakumbh partnership",
] as const;

export function contactMetaDescription(): string {
  return `Official Shiksha Mahakumbh 6.0 programme contacts — Multi-Track Conference, conclaves, Shodhankur, Student Projects, accommodation, and general enquiries. ${DHE_ORGANIZATION.name}, ${DHE_ORGANIZATION.address.formatted}.`;
}

export const CONTACT_FAQ = [
  {
    question: "How do I contact Shiksha Mahakumbh for registration help?",
    answer: `Use the programme contact directory on this page. Papers, Multi-Track Conference, Shodhankur, and Student Projects: academics@shikshamahakumbh.com. Conclaves: conclaves@shikshamahakumbh.com. VCs & Directors Conclave, sponsorship, and academic partnership: director@shikshamahakumbh.com. General enquiries: info@shikshamahakumbh.com.`,
  },
  {
    question: "What is the Department of Holistic Education office address?",
    answer: `${DHE_ORGANIZATION.name}, ${DHE_ORGANIZATION.address.formatted}, ${DHE_ORGANIZATION.address.country}.`,
  },
  {
    question: "Who handles institutional partnerships?",
    answer: `Sponsorship and academic partnership enquiries: director@shikshamahakumbh.com. Institutional liaison is also coordinated by the Sampark Vibhag (${SITE_URL}${CANONICAL_ROUTES.departments.sampark}).`,
  },
  {
    question: "How can I reach the team on WhatsApp?",
    answer: `Use the WhatsApp links next to our phone numbers on this page, or call ${DHE_ORGANIZATION.phones.join(" / ")}.`,
  },
  {
    question: "Who do I contact for venue and travel to NIT Hamirpur?",
    answer: `For campus access and local logistics, email ${NIT_VENUE_CONTACT.email} or call ${NIT_VENUE_CONTACT.phones.join(" / ")}. See the travel guide on this page for railway, bus, and air routes.`,
  },
  {
    question: "How quickly will I receive a reply?",
    answer:
      "The team typically responds within 2–3 working days. Urgent registration queries before summit deadlines are prioritised.",
  },
] as const;

/** E.164 digits for wa.me links (India numbers). */
export function phoneToWhatsAppHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("91") ? digits : `91${digits}`;
  return `https://wa.me/${normalized}`;
}

export const CONTACT_ORG_SUMMARY = {
  name: DHE_ORGANIZATION.name,
  abhiyan: DHE_ORGANIZATION.abhiyan,
  emails: DHE_ORGANIZATION.emails,
  phones: DHE_ORGANIZATION.phones,
  address: DHE_ORGANIZATION.address,
  websites: DHE_ORGANIZATION.websites,
} as const;
