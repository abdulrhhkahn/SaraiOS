import { pageMetadata } from "@/lib/seo";
import { ImageBanner } from "@/components/ui/ImageBanner";

export const metadata = pageMetadata({
  title: "SaraiOS Features — AI Guest Experience Platform",
  description:
    "AI Concierge, guest messaging, guest requests, guest profiles, analytics and integrations — see how SaraiOS connects every guest conversation to the right action.",
  path: "/features",
});

/** Platform page: the banner, then the closing call to action and footer. More sections will be added below the banner. */
export default function FeaturesPage() {
  return <ImageBanner src="/images/platform/banner.jpg" title="Platform" imageClassName="object-[50%_28%]" />;
}
