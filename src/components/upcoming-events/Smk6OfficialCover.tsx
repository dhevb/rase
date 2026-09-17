import Image from "next/image";
import { SMK_6_OFFICIAL_COVER } from "@/data/smk-6-edition-hub";

type Props = {
  className?: string;
  priority?: boolean;
};

/** Official 2026 front page — contained so artwork is not cropped or stretched. */
export default function Smk6OfficialCover({ className = "", priority = false }: Props) {
  return (
    <figure className={`mx-auto w-full max-w-[28rem] ${className}`}>
      <div className="overflow-hidden rounded-2xl border border-brand-saffron/30 bg-white shadow-md">
        <Image
          src={SMK_6_OFFICIAL_COVER.src}
          alt={SMK_6_OFFICIAL_COVER.alt}
          width={SMK_6_OFFICIAL_COVER.width}
          height={SMK_6_OFFICIAL_COVER.height}
          className="h-auto w-full"
          sizes="(max-width: 640px) 100vw, 28rem"
          priority={priority}
        />
      </div>
      <figcaption className="mt-2 text-center text-xs leading-relaxed text-slate-500">
        Official Shiksha Mahakumbh 2026 front page — षष्ठम संस्करण / 6th Edition
      </figcaption>
    </figure>
  );
}
