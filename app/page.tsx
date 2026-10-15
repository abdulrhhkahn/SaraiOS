import { getScreenAvailability } from "@/lib/screenshots.server";
import { pageJsonLd, seoMetadata, softwareJsonLd, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/layout/JsonLd";
import { HomeHero } from "@/components/hero/HomeHero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { ConciergeKnowledge } from "@/components/home/ConciergeKnowledge";
import { GuestCheckin } from "@/components/home/GuestCheckin";
import { IndustryPreview } from "@/components/home/IndustryPreview";
import { OfflineReady } from "@/components/home/OfflineReady";
import { FaqPreview } from "@/components/home/PreviewSections";

export const metadata = seoMetadata("home");

export default function HomePage() {
  const shots = getScreenAvailability();

  return (
    <>
      <JsonLd data={[websiteJsonLd(), ...pageJsonLd("home")]} />
      <JsonLd data={softwareJsonLd()} />
      <HomeHero src={shots.concierge} />
      <ProblemSection />
      <GuestCheckin />
      <ConciergeKnowledge />
      <IndustryPreview />
      <OfflineReady />
      <FaqPreview />
    </>
  );
}
