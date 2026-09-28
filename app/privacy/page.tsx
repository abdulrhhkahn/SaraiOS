import { privacy } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";
import { LegalDocument } from "@/components/ui/LegalDocument";

export const metadata = pageMetadata({
  title: "Privacy Policy | SaraiOS",
  description: "SaraiOS Privacy Policy (placeholder pending legal review).",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalDocument doc={privacy} />;
}
