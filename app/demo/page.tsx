import { Check } from "lucide-react";
import { demoFields } from "@/lib/forms";
import { getScreenAvailability } from "@/lib/screenshots.server";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/primitives";
import { ImageBanner } from "@/components/ui/ImageBanner";
import { Reveal } from "@/components/animations/Reveal";
import { LeadForm } from "@/components/forms/LeadForm";
import { ProductScreenshot } from "@/components/dashboard/ProductScreenshot";

export const metadata = pageMetadata({
  title: "Book a SaraiOS Demo",
  description: "See SaraiOS in action. Book a demo tailored to your property's guests, workflows and systems.",
  path: "/demo",
});

const expectations = [
  "A walkthrough of the guest and team experience",
  "How requests route to your departments",
  "How SaraiOS fits alongside your systems",
  "Next steps and a tailored proposal",
];

export default function DemoPage() {
  const shots = getScreenAvailability();
  return (
    <>
      <ImageBanner src="/images/demo/banner.jpg" title="Book a Demo" imageClassName="object-[50%_50%]" />
      <Container className="grid gap-12 pt-14 pb-28 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal>
          <LeadForm
            formId="demo"
            fields={demoFields}
            submitLabel="Request a Demo"
            successTitle="Your demo request is in."
            successBody="Thanks. We'll be in touch shortly to find a time that works for your team."
          />
        </Reveal>
        <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
          <ProductScreenshot screen="concierge" src={shots.concierge} sizes="(min-width: 1024px) 45vw, 100vw" />
          <div className="mt-8 rounded-3xl bg-card p-6 ring-1 ring-line">
            <h2 className="heading-sub text-2xl">What to expect</h2>
            <ul className="mt-4 space-y-3">
              {expectations.map((e) => (
                <li key={e} className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-iris-ink" aria-hidden />
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
