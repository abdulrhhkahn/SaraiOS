import Link from "next/link";
import { industries } from "@/lib/industries";
import { getScreenAvailability } from "@/lib/screenshots.server";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/primitives";
import { PageHero } from "@/components/ui/PageHero";
import { IndustrySection } from "@/components/industries/IndustrySection";
import { IndustryIcon } from "@/components/industries/IndustryIcon";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata = pageMetadata({
  title: "AI Guest Experience for Hotels, Resorts & Hospitality",
  description:
    "SaraiOS for hotels, resorts, boutique and luxury properties, hotel management companies and multi-property groups.",
  path: "/industries",
});

export default function IndustriesPage() {
  const shots = getScreenAvailability();
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="AI guest experience for every kind of hospitality."
        body="Whether you run one boutique property or a portfolio of hotels, SaraiOS adapts to your guests, your team and your way of working."
      />
      <nav aria-label="Industries" className="sticky top-[84px] z-30 -mt-4">
        <Container>
          <ul className="flex [scrollbar-width:none] gap-2 overflow-x-auto rounded-2xl bg-page/80 p-1.5 ring-1 ring-line backdrop-blur-xl">
            {industries.map((i) => (
              <li key={i.slug} className="shrink-0">
                <Link
                  href={`#${i.slug}`}
                  className="inline-flex min-h-10 items-center gap-2 rounded-xl px-3.5 text-sm font-semibold text-stone transition-colors hover:bg-card hover:text-ink"
                >
                  <IndustryIcon icon={i.icon} className="size-4" />
                  {i.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
      <div className="divide-y divide-line">
        {industries.map((ind, i) => (
          <IndustrySection key={ind.slug} industry={ind} src={shots[ind.screen]} flip={i % 2 === 1} />
        ))}
      </div>
      <FinalCta src={shots.overview} />
    </>
  );
}
