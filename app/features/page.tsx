import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "SaraiOS Features — AI Guest Experience Platform",
  description:
    "AI Concierge, guest messaging, guest requests, guest profiles, analytics and integrations — see how SaraiOS connects every guest conversation to the right action.",
  path: "/features",
});

/** Platform page: sections are being rebuilt, so only the header, the closing call to action in the footer and the footer remain. */
export default function FeaturesPage() {
  return (
    <div className="pt-12 sm:pt-16">
      <h1 className="sr-only">Platform</h1>
    </div>
  );
}
