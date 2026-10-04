import { BadgeCheck } from "lucide-react";
import { pricingPlans } from "@/lib/pricing";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { RevealItem, Stagger } from "@/components/animations/Reveal";
import { cn } from "@/lib/cn";

/** Three plan cards: name and price on top, grouped features with check badges, a full-width button at the bottom. */
export function PricingCards() {
  return (
    <Stagger className="grid grid-cols-[minmax(0,1fr)] gap-5 pt-3 md:grid-cols-3" stagger={0.1}>
      {pricingPlans.map((plan) => {
        const f = plan.featured;
        return (
          <RevealItem key={plan.id} className="h-full">
            <article
              className={cn(
                "relative flex h-full flex-col rounded-3xl p-7 sm:p-8",
                f ? "on-night on-green bg-cta text-white" : "bg-white ring-1 ring-black/[0.08]",
              )}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brass-soft px-3.5 py-1 text-xs font-semibold whitespace-nowrap text-brass-ink shadow-sm">
                  {plan.badge}
                </span>
              )}

              <div className="flex items-start justify-between gap-4">
                <h3 className={cn("heading-sub text-2xl", f ? "text-white" : "text-subheading")}>{plan.name}</h3>
                <div className="text-right">
                  <p className={cn("flex items-baseline justify-end gap-1.5", f ? "text-white" : "text-subheading")}>
                    {plan.currency && <span className="text-sm font-medium opacity-80">{plan.currency}</span>}
                    <span className="heading-sub text-[2.4rem] leading-none">{plan.price}</span>
                    {plan.period && <span className="text-sm font-medium opacity-80">{plan.period}</span>}
                  </p>
                  {plan.priceNote && (
                    <p className={cn("mt-1.5 text-xs", f ? "text-white/75" : "text-ink/55")}>{plan.priceNote}</p>
                  )}
                </div>
              </div>

              <p className={cn("mt-4 text-[0.95rem] text-pretty", f ? "text-white/80" : "text-ink/60")}>
                {plan.tagline}
              </p>

              <div className={cn("mt-6 border-t pt-6", f ? "border-white/20" : "border-black/[0.08]")}>
                {plan.groups.map((g, i) => (
                  <div key={g.title} className={cn(i > 0 && "mt-6")}>
                    <h4 className={cn("text-[1.02rem] font-medium", f ? "text-white" : "text-ink")}>{g.title}</h4>
                    <ul className="mt-3.5 space-y-3">
                      {g.items.map((item) => (
                        <li key={item} className={cn("flex gap-3 text-[0.92rem]", f ? "text-white/90" : "text-ink/70")}>
                          <BadgeCheck
                            className={cn("mt-px size-5 shrink-0", f ? "fill-white text-cta" : "fill-cta text-white")}
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-9">
                <ArrowButton
                  href={plan.cta.href}
                  size="lg"
                  variant={f ? "secondary" : "primary"}
                  className="w-full justify-between px-6"
                >
                  {plan.cta.label}
                </ArrowButton>
              </div>
            </article>
          </RevealItem>
        );
      })}
    </Stagger>
  );
}
