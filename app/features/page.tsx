import { features } from "@/lib/features";
import { getScreenAvailability } from "@/lib/screenshots.server";
import { pageMetadata } from "@/lib/seo";
import { primaryCta } from "@/lib/navigation";
import { ButtonLink } from "@/components/ui/primitives";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/animations/Reveal";
import { reveal } from "@/components/animations/variants";
import { ProductScreenshot } from "@/components/dashboard/ProductScreenshot";
import { StickyFeatureStory } from "@/components/features/StickyFeatureStory";
import { RequestWorkflowDemo } from "@/components/features/RequestWorkflowDemo";
import { HorizontalShowcase } from "@/components/features/HorizontalShowcase";
import { IntegrationsSection } from "@/components/home/IntegrationsSection";

export const metadata = pageMetadata({
  title: "SaraiOS Features — AI Guest Experience Platform",
  description:
    "AI Concierge, guest messaging, guest requests, guest profiles, analytics and integrations — see how SaraiOS connects every guest conversation to the right action.",
  path: "/features",
});

export default function FeaturesPage() {
  const shots = getScreenAvailability();

  return (
    <>
      <PageHero
        eyebrow="Features"
        title="AI guest experience platform built for how hotels actually operate."
        body="From guest questions to operational requests, SaraiOS connects every conversation to the right action."
        actions={
          <ButtonLink href={primaryCta.href} size="lg" arrow>
            {primaryCta.label}
          </ButtonLink>
        }
      >
        <Reveal variants={reveal} className="mt-16 sm:mt-20">
          <ProductScreenshot
            screen="overview"
            src={shots.overview}
            priority
            sizes="(min-width: 1280px) 1180px, 100vw"
          />
        </Reveal>
      </PageHero>

      <StickyFeatureStory features={features} shots={shots} />
      <RequestWorkflowDemo />
      <HorizontalShowcase shots={shots} />
      <IntegrationsSection />
    </>
  );
}
