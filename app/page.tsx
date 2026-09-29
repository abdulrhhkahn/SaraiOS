import { getScreenAvailability } from "@/lib/screenshots.server";
import { pageMetadata, softwareJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/layout/JsonLd";
import { HomeHero } from "@/components/hero/HomeHero";
import { IndustryPreview } from "@/components/home/IndustryPreview";
import { FaqPreview } from "@/components/home/PreviewSections";

export const metadata = pageMetadata({
  title: "SaraiOS — AI-Native Guest Experience Platform",
  description:
    "SaraiOS helps hotels deliver smarter guest experiences with AI-powered concierge, messaging, guest requests and hospitality automation.",
  path: "/",
});

export default function HomePage() {
  const shots = getScreenAvailability();

  return (
    <>
      <JsonLd data={softwareJsonLd()} />
      <HomeHero src={shots.concierge} />
      <IndustryPreview />
      <FaqPreview />
    </>
  );
}
