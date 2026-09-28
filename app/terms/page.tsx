import { terms } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";
import { LegalDocument } from "@/components/ui/LegalDocument";

export const metadata = pageMetadata({
  title: "Terms of Service | SaraiOS",
  description: "SaraiOS Terms of Service (placeholder pending legal review).",
  path: "/terms",
});

export default function TermsPage() {
  return <LegalDocument doc={terms} />;
}
