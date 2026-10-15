import Link from "next/link";
import { industries } from "@/lib/industries";
import { getScreenAvailability } from "@/lib/screenshots.server";
import { pageJsonLd, seoMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/layout/JsonLd";
import { Container } from "@/components/ui/primitives";
import { ImageBanner } from "@/components/ui/ImageBanner";
import { IndustrySection } from "@/components/industries/IndustrySection";
import { BrandedCheckin } from "@/components/industries/BrandedCheckin";
import { SolutionsFaq } from "@/components/industries/SolutionsFaq";
import { IndustryIcon } from "@/components/industries/IndustryIcon";

export const metadata = seoMetadata("solutions");

export default function IndustriesPage() {
  const shots = getScreenAvailability();
  return (
    <>
      <JsonLd data={pageJsonLd("solutions")} />
      <ImageBanner src="/images/solutions/banner.jpg" title="Solutions" imageClassName="object-[50%_38%]" />
      {/* The tabs stay pinned only while the solution panels are on screen, not over the FAQ below */}
      <div>
        <nav aria-label="Industries" className="sticky top-[84px] z-30 mt-6">
          <Container>
            <ul className="flex [scrollbar-width:none] gap-2 overflow-x-auto rounded-2xl bg-page/80 p-1.5 ring-1 ring-line backdrop-blur-xl">
              {industries.map((i) => (
                <li key={i.slug} className="shrink-0">
                  <Link
                    href={`#${i.slug}`}
                    className="inline-flex min-h-10 items-center gap-2 rounded-xl px-3.5 text-sm font-semibold text-stone transition-colors hover:bg-card hover:text-ink"
                  >
                    <IndustryIcon icon={i.icon} className="size-4 text-cta" />
                    {i.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
        <div className="mt-10 space-y-6 pb-24 sm:pb-32">
          {industries.map((ind, i) => (
            <IndustrySection key={ind.slug} industry={ind} src={shots[ind.screen]} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
      <BrandedCheckin />
      <SolutionsFaq />
    </>
  );
}
