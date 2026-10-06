import type { FaqItem } from "@/lib/faq";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { pricingPlans, YEARLY_DISCOUNT } from "@/lib/pricing";
import { Container } from "@/components/ui/primitives";
import { ImageBanner } from "@/components/ui/ImageBanner";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Reveal } from "@/components/animations/Reveal";
import { PricingCards } from "@/components/pricing/PricingCards";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { Accordion } from "@/components/faq/Accordion";
import { JsonLd } from "@/components/layout/JsonLd";

export const metadata = pageMetadata({
  title: "SaraiOS Pricing",
  description:
    "SaraiOS plans for hotels: Essential is free to start, Growth is PKR 12,999 per month and Pro is PKR 27,999 per month, with 10% off when billed yearly.",
  path: "/pricing",
});

// Answers are built from the same plan data as the cards, so prices and limits cannot drift apart.
const fmt = (n: number) => n.toLocaleString("en-US");
const [, growth, pro] = pricingPlans;
const perMonth = (monthly: number) => Math.round(monthly * (1 - YEARLY_DISCOUNT));
const perYear = (monthly: number) => Math.round(monthly * 12 * (1 - YEARLY_DISCOUNT));
const growthMonthly = growth.monthly ?? 0;
const proMonthly = pro.monthly ?? 0;
const savePct = YEARLY_DISCOUNT * 100;

const pricingFaqs: FaqItem[] = [
  {
    id: "plan-difference",
    question: "What is the difference between Essential, Growth and Pro?",
    answer: `Essential is free to start and covers digital check-in, a dedicated guest surface, in-app web chat and an AI Concierge that suggests replies, for one property with 2 email seats and 50 conversations a month. Growth (PKR ${fmt(growthMonthly)} per month) adds auto-sent AI replies, WhatsApp and SMS, unlimited conversations, advanced analytics, a weekly report, a staff activity tracker and 5 email seats. Pro (PKR ${fmt(proMonthly)} per month) adds unlimited email seats, multiple properties and cross property comparison.`,
  },
  {
    id: "essential-free",
    question: "Is Essential really free?",
    answer: `Yes. Essential has no monthly price. There is an onboarding fee of PKR 5,000.`,
  },
  {
    id: "yearly-billing",
    question: "How does yearly billing work?",
    answer: `Switch the pricing toggle to Yearly to take ${savePct}% off Growth and Pro. Growth then works out at PKR ${fmt(perMonth(growthMonthly))} per month, billed as PKR ${fmt(perYear(growthMonthly))} for the year, and Pro at PKR ${fmt(perMonth(proMonthly))} per month, billed as PKR ${fmt(perYear(proMonthly))} for the year.`,
  },
  {
    id: "channels",
    question: "Which messaging channels does each plan include?",
    answer: "Essential includes in-app web chat. Growth and Pro add WhatsApp and SMS.",
  },
  {
    id: "limits",
    question: "How many conversations and team members does each plan allow?",
    answer:
      "Essential allows 50 conversations a month and 2 email seats. Growth allows unlimited conversations and 5 email seats. Pro allows unlimited conversations and unlimited email seats.",
  },
  {
    id: "multi-property",
    question: "Can I run more than one property?",
    answer:
      "Essential and Growth are for a single property. Pro supports multiple properties and adds cross property comparison.",
  },
  {
    id: "support",
    question: "What support and offline features are included?",
    answer:
      "Every plan includes 24/7 chat support, plus offline capabilities and a lightweight data load so the guest hub keeps working on weak connections.",
  },
  {
    id: "demo",
    question: "Can I see SaraiOS before I subscribe?",
    answer: 'Yes. Use "or book a demo" under any plan and we will walk you through SaraiOS first.',
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(pricingFaqs)} />
      <ImageBanner src="/images/pricing/banner-lobby.jpg" title="Pricing" imageClassName="object-[50%_50%]" />
      <Container className="pt-14 pb-8 sm:pt-20">
        <h2 className="sr-only">Plans</h2>
        <PricingCards />
      </Container>

      <section className="relative pt-20 pb-24 sm:pt-28 sm:pb-32">
        <Container>
          <Reveal>
            <p className="font-mono text-[0.9375rem] tracking-[0.08em] text-cta uppercase">Compare plans</p>
            <h2 className="mt-5 max-w-[20ch] heading-section text-balance text-subheading">
              What&apos;s in each plan.
            </h2>
            <p className="mt-5 max-w-[52ch] text-lg text-pretty text-stone">
              See what changes as you move from Essential to Growth and Pro.
            </p>
          </Reveal>
          <Reveal className="mt-12">
            <ComparisonTable />
          </Reveal>
        </Container>
      </section>

      <section className="relative pb-24 sm:pb-32">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <Reveal>
            <p className="font-mono text-[0.9375rem] tracking-[0.08em] text-cta uppercase">FAQ</p>
            <h2 className="mt-5 max-w-[14ch] heading-section text-balance text-subheading">
              Questions about our plans.
            </h2>
            <ArrowButton href="/faq" size="sm" variant="secondary" className="mt-8">
              View All FAQs
            </ArrowButton>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion items={pricingFaqs} defaultOpen={pricingFaqs[0]?.id} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
