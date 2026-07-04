/**
 * Crawler / Search Console policy — robots disallow + locale prefix rules.
 */

/** Paths disallowed in robots.txt (prefix match). */
export const ROBOTS_DISALLOW_PREFIXES = [
  "/admin",
  "/api/",
  "/event/checkin",
  "/registration/success",
  "/status",
  "/maintenance",
  "/newsletter/",
  "/AllData",
  "/DelegateForm",
  "/addkeynotespeaker",
  "/addvcdirector",
  "/addwishesreceived",
  "/noticeboarddata",
  "/participantregistrationdatadekh",
  "/volunteerdatadekh",
  "/volunteerregistrationdatadekh",
  "/ngoregistrationdatadekh",
  "/organiserdatadekh",
  "/abstractdatadekh",
  "/abstractdatadekhsm24",
  "/fulllengthdatadekh",
  "/fulllengthdatadekhsm24",
  "/fulllengthpaperdatadekh",
  "/schooldata",
  "/Talentdata",
  "/Conclavedata",
  "/Bestpracticedata",
  "/accomodationdata",
  "/heiprojectregistrationdata",
] as const;

/**
 * Locale-prefixed URLs that intentionally exist under src/app/[locale]/*.
 * All other /en|fr|es|ar/* paths 301 to the root English route.
 */
export const LOCALE_PREFIX_ALLOWED = new Set([
  "/en",
  "/en/introduction",
  "/en/registration",
  "/en/ContactUs",
  "/fr/contact-us",
  "/es/contact-us",
  "/ar/contact-us",
]);

/** Strip default-locale prefix for SEO — returns destination path or null. */
export function stripNonContentLocalePrefix(pathname: string): string | null {
  const match = pathname.match(/^\/(en|fr|es|ar)(\/.*)?$/);
  if (!match) return null;
  if (LOCALE_PREFIX_ALLOWED.has(pathname)) return null;
  const rest = match[2] ?? "";
  if (match[1] === "en" && rest === "/ContactUs") {
    return "/contact-us";
  }
  return rest || "/";
}
