import { privacy } from "@/lib/legal";
import { pageJsonLd, seoMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/layout/JsonLd";
import { LegalDocument } from "@/components/ui/LegalDocument";

export const metadata = seoMetadata("privacy");

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={pageJsonLd("privacy")} />
      <LegalDocument doc={privacy} />
    </>
  );
}
