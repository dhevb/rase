"use client";

import Link from "next/link";
import { SectionHeader } from "@/components/ui";
import { ROUTES } from "@/constants/routes";
import { BEST_WISHES_ENTRIES } from "@/data/best-wishes";

const FEATURED_QUOTES = BEST_WISHES_ENTRIES.filter((w) => w.featured).slice(0, 3);

export default function TestimonialsStrip() {
  return (
    <section
      id="messages"
      className="border-y border-brand-saffron/15 bg-white py-12 md:py-14"
      aria-label="Messages of support"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Voices of Support"
          title="Messages from National Leaders"
          description="Dignitaries and institutions share best wishes for Shiksha Mahakumbh Abhiyan."
        />

        {FEATURED_QUOTES.length > 0 ? (
          <ul className="mt-8 space-y-4">
            {FEATURED_QUOTES.map((wish) => (
              <li
                key={wish.id}
                className="rounded-2xl border border-slate-200/80 bg-brand-surface p-5 shadow-sm"
              >
                <blockquote className="text-sm leading-relaxed text-slate-700 md:text-base">
                  &ldquo;{wish.message}&rdquo;
                </blockquote>
                <footer className="mt-3 text-xs font-semibold text-brand-navy md:text-sm">
                  {wish.name}
                  <span className="mt-0.5 block font-normal text-slate-500">
                    {wish.designation}
                  </span>
                </footer>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href={ROUTES.bestWishes}
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-brand-navy px-6 py-3 text-sm font-bold text-white hover:bg-brand-navy-light"
          >
            Read all best wishes
          </Link>
          <Link
            href={ROUTES.speakers}
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border-2 border-brand-saffron px-6 py-3 text-sm font-bold text-brand-saffron"
          >
            Speakers directory
          </Link>
        </div>
      </div>
    </section>
  );
}
