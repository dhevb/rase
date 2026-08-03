import Link from "next/link";
import { SITE_QUICK_LINKS } from "@/data/site-quick-links";

const linkClassName =
  "flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy transition hover:border-brand-saffron/40 hover:shadow-sm";

type Props = {
  className?: string;
};

export default function SiteQuickLinksSection({
  className = "mx-auto max-w-5xl px-4 pt-8 border-t border-slate-100",
}: Props) {
  return (
    <section aria-label="Programme quick links" className={className}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SITE_QUICK_LINKS.map((link) =>
          link.external ? (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              <span aria-hidden>{link.icon}</span>
              {link.label}
            </a>
          ) : (
            <Link key={link.href} href={link.href} className={linkClassName}>
              <span aria-hidden>{link.icon}</span>
              {link.label}
            </Link>
          )
        )}
      </div>
    </section>
  );
}
