/** How a gallery slide image should fill its frame. */
export type SlideImageFit = "contain" | "cover";

export type SlideFitInput = {
  src: string;
  fit?: SlideImageFit;
};

/** Posters/flyers use contain on a navy pad; photos use cover. */
export function resolveSlideImageFit(slide: SlideFitInput): SlideImageFit {
  if (slide.fit) return slide.fit;
  const src = slide.src.toLowerCase();
  if (
    /\.(png|webp)$/i.test(src) ||
    /poster|flyer|invite|vyakh|press\d|banner|abstract|booklet/i.test(src)
  ) {
    return "contain";
  }
  return "cover";
}

export function slideImageClassName(fit: SlideImageFit): string {
  return fit === "contain"
    ? "object-contain object-center p-2 sm:p-3"
    : "object-cover object-center";
}

export function slideFrameClassName(fit: SlideImageFit): string {
  return fit === "contain"
    ? "bg-gradient-to-b from-brand-navy-light/90 to-brand-navy"
    : "bg-brand-navy";
}
