import Link from "next/link";
import { SectionHeader } from "@/components/ui";
import { ROUTES } from "@/constants/routes";
import { HOME_REGISTRATION_TYPES } from "@/data/home-registration-types";
import { sanitizeExternalUrl } from "@/lib/security/safe-external-url";

export default function RegistrationTypesStrip() {
  return (
    <section
      id="registration-types"
      aria-label="Registration categories and fees"
      className="border-y border-brand-saffron/15 bg-brand-surface py-12 md:py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Start here"
          title="Who should register — and what does it cost?"
          description="One portal for all SMK 6.0 categories. Free programme forms and paid project displays — choose your track on the registration hub."
          align="left"
        />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_REGISTRATION_TYPES.map((item) => {
            const safeHref = item.external
              ? sanitizeExternalUrl(item.href)
              : item.href;
            const className =
              "flex flex-col rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:border-brand-saffron/40 hover:shadow-md";

            const inner = (
              <>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-brand-navy">{item.label}</h3>
                  <span className="shrink-0 rounded-full bg-brand-saffron/15 px-2.5 py-0.5 text-xs font-bold text-brand-saffron-dark">
                    {item.fee}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.hint}</p>
              </>
            );

            if (item.external && safeHref) {
              return (
                <a
                  key={item.label}
                  href={safeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {inner}
                </a>
              );
            }

            return (
              <Link key={item.label} href={safeHref ?? ROUTES.registration} className={className}>
                {inner}
              </Link>
            );
          })}
        </div>
        <p className="mt-6 text-center text-sm text-slate-600">
          <Link
            href={ROUTES.registration}
            className="font-semibold text-brand-navy underline decoration-brand-saffron/40 underline-offset-2 hover:text-brand-saffron"
          >
            Open registration hub →
          </Link>
        </p>
      </div>
    </section>
  );
}
