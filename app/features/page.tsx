import { pageMetadata } from "@/lib/seo";
import { ImageBanner } from "@/components/ui/ImageBanner";
import { StaffCheckins } from "@/components/features/StaffCheckins";
import { ConversationsSection } from "@/components/features/ConversationsSection";
import { AnalyticsSection } from "@/components/features/AnalyticsSection";

export const metadata = pageMetadata({
  title: "SaraiOS Features — AI Guest Experience Platform",
  description:
    "AI Concierge, guest messaging, guest requests, guest profiles, analytics and integrations — see how SaraiOS connects every guest conversation to the right action.",
  path: "/features",
});

/** Platform page: banner, then the platform sections, then the closing call to action and footer. */
export default function FeaturesPage() {
  return (
    <>
      <ImageBanner src="/images/platform/banner.jpg" title="Platform" imageClassName="object-[50%_28%]" />
      <StaffCheckins />
      <ConversationsSection />
      <AnalyticsSection />
    </>
  );
}
