import Image from "next/image";
import { CtaButton } from "@/components/ui";
import { ROUTES } from "@/constants/routes";
import { academicCouncilHash } from "@/lib/home/home-link-targets";

export default function BrandShowcaseSection() {
  return (
    <section
      aria-label="Shiksha Mahakumbh brand vision"
      className="border-y border-brand-saffron/20 bg-white py-12 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-saffron-dark">
              Department of Holistic Education
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-brand-navy md:text-3xl">
              Where Bharatiya wisdom meets{" "}
              <span className="text-brand-blue">modern science</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              From ISRO&apos;s reach to the call of the conch — Shiksha Mahakumbh Abhiyan celebrates
              holistic education that is vibrant, inclusive, and globally relevant. Our visual identity
              reflects energy, tradition, and forward-looking innovation.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CtaButton href={academicCouncilHash("conclave")} variant="primary">
                View programmes
              </CtaButton>
              <CtaButton href="/past-events" variant="ghost">
                Explore past editions
              </CtaButton>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/2024M/Press7.jpg"
              alt="Inauguration of Shiksha Mahakumbh — national education summit"
              width={640}
              height={480}
              className="relative z-10 w-full rounded-2xl shadow-xl"
              sizes="(max-width: 1024px) 100vw, 588px"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
