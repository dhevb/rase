import Link from "next/link";
import { SITE_QUICK_LINKS, type SiteQuickLink } from "@/data/site-quick-links";

const linkClassName =
  "flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy transition hover:border-brand-saffron/40 hover:shadow-sm";

type Props = {
  links?: readonly SiteQuickLink[];
  ariaLabel?: string;
  className?: string;
};

export default function SiteQuickLinksSection({
  links = SITE_QUICK_LINKS,
  ariaLabel = "Programme quick links",
  className = "mx-auto max-w-5xl px-4 pt-8 border-t border-slate-100",
}: Props) {
  if (!links.length) return null;

  return (
    <section aria-label={ariaLabel} className={className}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) =>
          link.external ? (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              <span aria-hidden>{link.icon ?? "→"}</span>
              {link.label}
            </a>
          ) : (
            <Link key={link.href} href={link.href} className={linkClassName}>
              <span aria-hidden>{link.icon ?? "→"}</span>
              {link.label}
            </Link>
          )
        )}
      </div>
    </section>
  );
}
