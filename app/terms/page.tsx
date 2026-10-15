import { terms } from "@/lib/legal";
import { pageJsonLd, seoMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/layout/JsonLd";
import { LegalDocument } from "@/components/ui/LegalDocument";

export const metadata = seoMetadata("terms");

export default function TermsPage() {
  return (
    <>
      <JsonLd data={pageJsonLd("terms")} />
      <LegalDocument doc={terms} />
    </>
  );
}
