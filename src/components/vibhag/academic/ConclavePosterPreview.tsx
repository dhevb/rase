"use client";

import { useState } from "react";
import Image from "next/image";
import PremiumModal from "@/components/ui/PremiumModal";

type Poster = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export default function ConclavePosterPreview({ poster, title }: { poster: Poster; title: string }) {
  const [open, setOpen] = useState(false);
  const titleId = `poster-dialog-${title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group mt-3 w-full max-w-xs text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="mb-2 block text-sm font-semibold text-brand-navy">Official poster</span>
        <span className="block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <Image
            src={poster.src}
            alt={poster.alt}
            width={poster.width}
            height={poster.height}
            className="h-auto w-full object-contain"
            sizes="(max-width: 640px) 90vw, 20rem"
          />
        </span>
        <span className="mt-2 inline-block text-sm font-bold text-brand-navy underline decoration-brand-saffron/40 underline-offset-2 group-hover:text-brand-saffron-dark">
          View full poster
        </span>
      </button>
      <PremiumModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={title}
        titleId={titleId}
        maxWidth="2xl"
        ariaLabel={`${title} official poster`}
      >
        <div className="px-4 pb-6 pt-12 md:px-6">
          <Image
            src={poster.src}
            alt={poster.alt}
            width={poster.width}
            height={poster.height}
            className="h-auto w-full object-contain"
            sizes="(max-width: 768px) 95vw, 42rem"
            priority
          />
        </div>
      </PremiumModal>
    </>
  );
}
