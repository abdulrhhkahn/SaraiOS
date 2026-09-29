import { features } from "@/lib/features";
import { getScreenAvailability } from "@/lib/screenshots.server";
import { pageMetadata, softwareJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/layout/JsonLd";
import { HomeHero } from "@/components/hero/HomeHero";
import { ValueFlow } from "@/components/home/ValueFlow";
import { StickyFeatureCards } from "@/components/home/StickyFeatureCards";
import { DashboardShowcase } from "@/components/home/DashboardShowcase";
import { GuestJourney } from "@/components/home/GuestJourney";
import { AiTakesAction } from "@/components/home/AiTakesAction";
import { IndustryPreview } from "@/components/home/IndustryPreview";
import { IntegrationsSection } from "@/components/home/IntegrationsSection";
import { FaqPreview } from "@/components/home/PreviewSections";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata = pageMetadata({
  title: "SaraiOS — AI-Native Guest Experience Platform",
  description:
    "SaraiOS helps hotels deliver smarter guest experiences with AI-powered concierge, messaging, guest requests and hospitality automation.",
  path: "/",
});

const byId = (id: string) => features.find((f) => f.id === id)!;
const coreFeatureIds = ["ai-concierge", "guest-messaging", "guest-requests", "guest-profile", "analytics"];

export default function HomePage() {
  const shots = getScreenAvailability();
  const coreFeatures = coreFeatureIds.map(byId);

  return (
    <>
      <JsonLd data={softwareJsonLd()} />
      <HomeHero src={shots.concierge} />
      <DashboardShowcase shots={shots} />
      <ValueFlow />

      <StickyFeatureCards features={coreFeatures} shots={shots} />

      <GuestJourney />
      <AiTakesAction />
      <IndustryPreview />
      <IntegrationsSection />
      <FaqPreview />
      <FinalCta src={shots.overview} />
    </>
  );
}
