import Link from "next/link";
import { DHE_ORGANIZATION, NIT_VENUE_CONTACT } from "@/config/organization";
import { CANONICAL_ROUTES } from "@/constants/canonical-routes";
import { phoneToWhatsAppHref } from "@/data/contact-hub";
import { NIT_HAMIRPUR_MAP_LINK } from "@/config/venue-maps";

export default function ContactVenueSection() {
  return (
    <section aria-labelledby="venue-contact-heading" className="mb-12">
      <h2 id="venue-contact-heading" className="mb-2 text-lg font-bold text-brand-navy md:text-xl">
        Event venue &amp; local coordination
      </h2>
      <p className="mb-5 max-w-3xl text-sm text-slate-600">
        For travel, campus access, and on-site logistics at NIT Hamirpur during Shiksha Mahakumbh
        6.0, contact the local coordination team. For registration, partnerships, media, and
        academic programmes, use the organising secretariat contacts above.
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-brand-surface p-5 shadow-sm">
          <span className="text-2xl" aria-hidden>
            ⌖
          </span>
          <h3 className="mt-3 text-sm font-bold uppercase tracking-wider text-brand-navy">Venue</h3>
          <p className="mt-2 text-sm text-gray-700">{NIT_VENUE_CONTACT.organization}</p>
          <p className="mt-1 text-sm text-gray-700">{NIT_VENUE_CONTACT.venue}</p>
          <p className="mt-2 text-sm font-semibold text-brand-saffron-dark">
            {NIT_VENUE_CONTACT.eventDates}
          </p>
          <a
            href={NIT_HAMIRPUR_MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-brand-navy underline"
          >
            Open venue in Google Maps →
          </a>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <span className="text-2xl" aria-hidden>
            ✉
          </span>
          <h3 className="mt-3 text-sm font-bold uppercase tracking-wider text-brand-navy">
            Local email
          </h3>
          <a
            href={`mailto:${NIT_VENUE_CONTACT.email}`}
            className="mt-2 block text-sm font-medium text-brand-navy hover:text-brand-saffron-dark hover:underline"
          >
            {NIT_VENUE_CONTACT.email}
          </a>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <span className="text-2xl" aria-hidden>
            📞
          </span>
          <h3 className="mt-3 text-sm font-bold uppercase tracking-wider text-brand-navy">
            Venue phone / WhatsApp
          </h3>
          <ul className="mt-2 space-y-2">
            {NIT_VENUE_CONTACT.phones.map((phone) => {
              const tel = phone.replace(/\s/g, "");
              return (
                <li key={phone} className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <a
                    href={`tel:${tel}`}
                    className="text-sm font-medium text-brand-navy hover:text-brand-saffron-dark hover:underline"
                  >
                    {phone}
                  </a>
                  <a
                    href={phoneToWhatsAppHref(phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-emerald-700 hover:underline"
                  >
                    WhatsApp →
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <p className="mt-5 text-center text-sm text-gray-500">
        Organising secretariat: {DHE_ORGANIZATION.name},{" "}
        {DHE_ORGANIZATION.address.formatted}. ·{" "}
        <Link href={CANONICAL_ROUTES.registration} className="font-semibold text-brand-navy hover:underline">
          Register for SMK 6.0
        </Link>
        {" · "}
        <Link
          href={CANONICAL_ROUTES.departments.sampark}
          className="font-semibold text-brand-navy hover:underline"
        >
          Sampark Vibhag
        </Link>
      </p>
    </section>
  );
}
