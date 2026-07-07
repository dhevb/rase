import Link from "next/link";
import type { InstitutionalAboutPage } from "@/data/institutional-about-pages";
import { CtaButton } from "@/components/ui";
import { ROUTES } from "@/constants/routes";

type Props = {
  page: InstitutionalAboutPage;
};

export default function InstitutionalAboutView({ page }: Props) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-12">
      <div className="space-y-5 text-base leading-relaxed text-slate-700">
        {page.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>

      {page.highlights?.length ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {page.highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-100 bg-brand-surface p-5 shadow-sm"
            >
              <h2 className="text-sm font-bold uppercase tracking-wider text-brand-navy">
                {item.title}
              </h2>
              <p className="mt-2 text-sm text-slate-700">{item.body}</p>
            </div>
          ))}
        </div>
      ) : null}

      <section aria-labelledby="related-about-links" className="mt-12 border-t border-slate-100 pt-8">
        <h2 id="related-about-links" className="text-lg font-bold text-brand-navy">
          Related programmes &amp; resources
        </h2>
        <ul className="mt-4 space-y-2">
          {page.relatedLinks.map((link) => {
            const external = link.href.startsWith("http");
            return (
              <li key={link.href}>
                {external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand-navy underline decoration-brand-saffron/40 hover:text-brand-saffron-dark"
                  >
                    {link.label} →
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="font-medium text-brand-navy underline decoration-brand-saffron/40 hover:text-brand-saffron-dark"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <CtaButton href={ROUTES.registration} variant="primary">
          Register for SMK 6.0
        </CtaButton>
        <CtaButton href={ROUTES.contact} variant="secondary">
          Contact organising team
        </CtaButton>
      </div>
    </div>
  );
}
