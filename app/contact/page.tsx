import Link from "next/link";
import { ArrowUpRight, CalendarCheck, HelpCircle } from "lucide-react";
import { contactFields } from "@/lib/forms";
import { siteConfig } from "@/lib/siteConfig";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/primitives";
import { ImageBanner } from "@/components/ui/ImageBanner";
import { Reveal } from "@/components/animations/Reveal";
import { LeadForm } from "@/components/forms/LeadForm";
import { ContactFaq } from "@/components/contact/ContactFaq";

export const metadata = pageMetadata({
  title: "Contact SaraiOS",
  description: "Talk to the SaraiOS team about bringing an AI-native guest experience to your property.",
  path: "/contact",
});

const shortcuts = [
  {
    icon: CalendarCheck,
    title: "Want to see the product?",
    body: "Book a guided demo tailored to your property.",
    href: "/demo",
    label: "Book a Demo",
  },
  {
    icon: HelpCircle,
    title: "Have a quick question?",
    body: "Browse answers about the platform, operations and pricing.",
    href: "/faq",
    label: "Read the FAQ",
  },
];

export default function ContactPage() {
  return (
    <>
      <ImageBanner src="/images/contact/banner-lobby.jpg" title="Contact" imageClassName="object-[50%_40%]" />
      <Container className="grid gap-12 pt-14 pb-28 sm:pt-20 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <Reveal>
          <LeadForm
            formId="contact"
            floatingLabels
            fields={contactFields}
            submitLabel="Get in Touch"
            successTitle="Thanks. We'll be in touch shortly."
            successBody="A member of the SaraiOS team will review your message and reply to your work email."
          />
        </Reveal>
        <Reveal delay={0.1} className="space-y-4">
          {shortcuts.map(({ icon: Icon, ...s }) => (
            <Link
              key={s.href}
              href={s.href}
              className="group block rounded-3xl bg-card p-6 ring-1 ring-line transition-shadow hover:shadow-[var(--shadow-float)]"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-line">
                <Icon className="size-5 text-cta" aria-hidden />
              </span>
              <p className="mt-5 text-lg font-bold tracking-[-0.02em]">{s.title}</p>
              <p className="mt-1 text-stone">{s.body}</p>
              <p className="mt-4 inline-flex items-center gap-1 font-semibold text-cta">
                {s.label}
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </p>
            </Link>
          ))}
          {siteConfig.demoEmail && (
            <p className="rounded-3xl bg-linen-2 p-6 text-stone">
              Prefer email?{" "}
              <a
                className="font-semibold text-ink underline underline-offset-4"
                href={`mailto:${siteConfig.demoEmail}`}
              >
                {siteConfig.demoEmail}
              </a>
            </p>
          )}
        </Reveal>
      </Container>
      <ContactFaq />
    </>
  );
}
