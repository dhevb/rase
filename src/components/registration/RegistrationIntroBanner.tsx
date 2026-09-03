import Link from "next/link";
import { CANONICAL_ROUTES } from "@/constants/canonical-routes";

export default function RegistrationIntroBanner() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-4 md:px-8">
      <div className="rounded-2xl border border-brand-saffron/30 bg-gradient-to-br from-brand-saffron/5 to-white p-4 md:p-5">
        <p className="text-sm font-bold text-brand-navy">
          Direct registration paths
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Research papers use the on-site CMT notice. Programme tracks open the Academic
          Council. Shodhankur, Student Projects, and each conclave open an official Google
          Form immediately. Delegate Registration (last on this page) remains the on-site
          form with existing fees.
        </p>
        <p className="mt-2 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-slate-700">
          <strong className="text-brand-navy">Accommodation:</strong> registration opens
          from the beginning of September. Further details will be shared on this page.
        </p>
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <Link
            href={`${CANONICAL_ROUTES.downloads}#edition-brochures`}
            className="font-semibold text-brand-saffron underline decoration-brand-saffron/40"
          >
            Download edition brochures
          </Link>
          <Link
            href="/dashboard"
            className="font-semibold text-brand-navy underline decoration-brand-saffron/40"
          >
            Already registered? My portal
          </Link>
          <Link
            href="/refund-policy"
            className="font-semibold text-brand-navy underline decoration-brand-saffron/40"
          >
            Refund policy
          </Link>
        </p>
      </div>
    </div>
  );
}
