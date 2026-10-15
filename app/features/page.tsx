import { pageJsonLd, seoMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/layout/JsonLd";
import { ImageBanner } from "@/components/ui/ImageBanner";
import { StaffCheckins } from "@/components/features/StaffCheckins";
import { ConversationsSection } from "@/components/features/ConversationsSection";
import { AnalyticsSection } from "@/components/features/AnalyticsSection";
import { RequestsSection } from "@/components/features/RequestsSection";
import { GuestsSection } from "@/components/features/GuestsSection";
import { StaffActivitySection } from "@/components/features/StaffActivitySection";
import { PlatformFaq } from "@/components/features/PlatformFaq";

export const metadata = seoMetadata("platform");

/** Platform page: banner, then the platform sections, then the closing call to action and footer. */
export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={pageJsonLd("platform")} />
      <ImageBanner src="/images/platform/banner.jpg" title="Platform" imageClassName="object-[50%_36%]" />
      <StaffCheckins />
      <ConversationsSection />
      <AnalyticsSection />
      <RequestsSection />
      <GuestsSection />
      <StaffActivitySection />
      <PlatformFaq />
    </>
  );
}
