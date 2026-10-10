import Link from "next/link";
import { allFaqs, faqCategories } from "@/lib/faq";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { ImageBanner } from "@/components/ui/ImageBanner";
import { Reveal } from "@/components/animations/Reveal";
import { Accordion } from "@/components/faq/Accordion";
import { JsonLd } from "@/components/layout/JsonLd";

export const metadata = pageMetadata({
  title: "SaraiOS FAQ",
  description:
    "Answers about SaraiOS, the AI concierge, guest experience, operations, integrations, privacy and pricing.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(allFaqs)} />
      <ImageBanner src="/images/faq/banner.jpg" title="FAQ" imageClassName="object-[50%_60%]" />
      <Container className="grid gap-12 pt-14 pb-28 sm:pt-20 lg:grid-cols-[240px_1fr] lg:gap-20">
        <nav aria-label="FAQ categories" className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible">
            {faqCategories.map((c) => (
              <li key={c.id} className="shrink-0">
                <Link
                  href={`#${c.id}`}
                  className="inline-flex min-h-10 items-center rounded-full px-4 text-sm font-semibold text-stone ring-1 ring-line transition-colors hover:text-ink lg:w-full lg:rounded-xl lg:ring-0 lg:hover:bg-card"
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0 space-y-16">
          {faqCategories.map((c) => (
            <Reveal as="section" key={c.id}>
              <h2 id={c.id} className="mb-4 scroll-mt-28 text-2xl font-semibold tracking-[-0.02em]">
                {c.title}
              </h2>
              <Accordion items={c.items} />
            </Reveal>
          ))}
          <div className="rounded-3xl bg-card p-8 ring-1 ring-line">
            <h2 className="text-xl font-semibold tracking-[-0.02em]">Still have questions?</h2>
            <p className="mt-2 text-stone">
              Talk to the team — we&apos;ll walk you through anything specific to your property.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/demo" arrow>
                Book a Demo
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Contact us
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
