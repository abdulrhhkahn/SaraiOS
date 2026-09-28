import { Check } from "lucide-react";
import { plans } from "@/lib/pricing";
import { ButtonLink } from "@/components/ui/primitives";
import { RevealItem, Stagger } from "@/components/animations/Reveal";
import { cn } from "@/lib/cn";

export function PlanCards({ compact = false }: { compact?: boolean }) {
  return (
    <Stagger className="grid gap-4 md:grid-cols-2">
      {plans.map((plan) => (
        <RevealItem
          key={plan.id}
          as="article"
          className={cn(
            "flex flex-col rounded-[1.75rem] p-8 sm:p-10",
            plan.emphasis ? "on-night bg-night text-linen shadow-[var(--shadow-frame)]" : "bg-card ring-1 ring-line",
          )}
        >
          <h3 className="text-3xl font-semibold tracking-[-0.03em]">{plan.name}</h3>
          <p className={cn("mt-2 lead", plan.emphasis ? "text-night-muted" : "text-stone")}>{plan.audience}</p>
          {!compact && (
            <p className={cn("mt-6 leading-relaxed", plan.emphasis ? "text-linen/85" : "text-ink/80")}>
              {plan.description}
            </p>
          )}
          <ul className="mt-8 space-y-3">
            {plan.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <Check
                  className={cn("mt-1 size-4 shrink-0", plan.emphasis ? "text-brass" : "text-iris-ink")}
                  aria-hidden
                />
                {h}
              </li>
            ))}
          </ul>
          <div
            className="mt-10 flex items-center justify-between gap-4 border-t [border-color:inherit] pt-6"
            style={{ borderColor: plan.emphasis ? "var(--night-line)" : "var(--line)" }}
          >
            <p className={cn("text-sm font-semibold", plan.emphasis ? "text-night-muted" : "text-stone")}>
              Tailored proposal
            </p>
            <ButtonLink href={plan.cta.href} variant={plan.emphasis ? "light" : "primary"} arrow>
              {plan.cta.label}
            </ButtonLink>
          </div>
        </RevealItem>
      ))}
    </Stagger>
  );
}
