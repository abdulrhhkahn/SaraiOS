import {
  BedDouble,
  Building2,
  CalendarDays,
  CreditCard,
  Flower2,
  MessageSquareText,
  Mountain,
  ShoppingBag,
  Users,
} from "lucide-react";
import { integrationCategories, integrationStatusLabel } from "@/lib/content";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal, RevealItem, Stagger } from "@/components/animations/Reveal";
import { LogoMark } from "@/components/layout/Logo";
import { cn } from "@/lib/cn";

const icons: Record<string, typeof Users> = {
  PMS: Building2,
  CRM: Users,
  "Booking Engine": CalendarDays,
  POS: ShoppingBag,
  Housekeeping: BedDouble,
  Messaging: MessageSquareText,
  Payments: CreditCard,
  Spa: Flower2,
  Activities: Mountain,
};

export function IntegrationsSection({ heading = true }: { heading?: boolean }) {
  return (
    <Section>
      <Container>
        {heading && (
          <Reveal>
            <SectionHeading
              eyebrow="Integrations"
              title="Connect SaraiOS to your hospitality ecosystem."
              body="SaraiOS is designed to sit on top of the systems you already run. Integration availability is confirmed for each property during onboarding."
            />
          </Reveal>
        )}
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[320px_1fr]">
          <Reveal className="relative mx-auto flex aspect-square w-full max-w-[300px] items-center justify-center">
            <span aria-hidden className="absolute inset-0 rounded-full border border-dashed border-line-strong" />
            <span aria-hidden className="absolute inset-10 rounded-full border border-line" />
            <span aria-hidden className="absolute inset-20 rounded-full bg-iris-soft/60" />
            <div className="relative flex flex-col items-center gap-2 rounded-3xl bg-card px-6 py-5 shadow-[var(--shadow-float)] ring-1 ring-line">
              <LogoMark className="size-9" />
              <span className="text-sm font-bold">SaraiOS</span>
            </div>
          </Reveal>
          <Stagger as="ul" className="grid grid-cols-2 gap-3 sm:grid-cols-3" stagger={0.05}>
            {integrationCategories.map((c) => {
              const Icon = icons[c.name];
              return (
                <RevealItem
                  as="li"
                  key={c.name}
                  className="flex items-center gap-3 rounded-2xl bg-card p-4 ring-1 ring-line"
                >
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-linen">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold">{c.name}</p>
                    <p
                      className={cn(
                        "text-xs font-semibold",
                        c.status === "integration" ? "text-iris-ink" : "text-stone",
                      )}
                    >
                      {integrationStatusLabel[c.status]}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
