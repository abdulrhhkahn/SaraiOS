import { cookies } from "@/lib/legal";
import { pageJsonLd, seoMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/layout/JsonLd";
import { LegalDocument } from "@/components/ui/LegalDocument";

export const metadata = seoMetadata("cookies");

export default function CookiesPage() {
  return (
    <>
      <JsonLd data={pageJsonLd("cookies")} />
      <LegalDocument doc={cookies} />
    </>
  );
}
