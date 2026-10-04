"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { pricingPlans, YEARLY_DISCOUNT } from "@/lib/pricing";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { RevealItem, Stagger } from "@/components/animations/Reveal";
import { cn } from "@/lib/cn";

type Billing = "monthly" | "yearly";

/** Fixed locale so the server and the browser format numbers the same way. */
const fmt = (n: number) => n.toLocaleString("en-US");

const options: { id: Billing; label: string }[] = [
  { id: "monthly", label: "Monthly" },
  { id: "yearly", label: "Yearly" },
];

function BillingToggle({ value, onChange }: { value: Billing; onChange: (b: Billing) => void }) {
  return (
    <div className="flex justify-center">
      <div
        role="group"
        aria-label="Billing period"
        className="relative inline-flex rounded-full bg-black/[0.04] p-1 ring-1 ring-black/[0.05]"
      >
        {options.map((o) => {
          const active = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.id)}
              className={cn(
                "relative z-10 cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200",
                active ? "text-ink" : "text-ink/60 hover:text-ink",
              )}
            >
              {active && (
                <motion.span
                  layoutId="billing-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-white shadow-sm ring-1 ring-black/[0.06]"
                  transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                />
              )}
              {o.label}
              {o.id === "yearly" && <span className="ml-1.5 text-cta">({YEARLY_DISCOUNT * 100}% OFF)</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Three plan cards with a monthly / yearly toggle. Yearly takes 10% off the monthly price of the paid plans;
 * the card shows the discounted price per month and what is billed for the year.
 */
export function PricingCards() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const yearly = billing === "yearly";

  return (
    <div>
      <BillingToggle value={billing} onChange={setBilling} />

      <Stagger className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-3" stagger={0.1}>
        {pricingPlans.map((plan) => {
          const f = plan.featured;
          const perMonth =
            plan.monthly === null ? null : yearly ? Math.round(plan.monthly * (1 - YEARLY_DISCOUNT)) : plan.monthly;
          const yearTotal = plan.monthly === null ? null : Math.round(plan.monthly * 12 * (1 - YEARLY_DISCOUNT));
          const note =
            plan.monthly === null
              ? plan.priceNote
              : yearly && yearTotal !== null
                ? `Billed yearly: ${plan.currency} ${fmt(yearTotal)}`
                : "Billed monthly";

          return (
            <RevealItem key={plan.id} className="h-full">
              <article
                className={cn(
                  "flex h-full flex-col rounded-3xl p-7 ring-1 sm:p-8",
                  f
                    ? "bg-[linear-gradient(to_bottom,#ffffff_45%,#e4f1ee_100%)] ring-cta/30"
                    : "bg-white ring-black/[0.08]",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3
                    className={cn("heading-sub text-2xl", !f && "text-subheading")}
                    // inline colour: the global heading colour rule would otherwise win over a text-* class
                    style={f ? { color: "var(--cta)" } : undefined}
                  >
                    {plan.name}
                  </h3>
                  {plan.badge && (
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-cta ring-1 ring-cta/50">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <div className="mt-9 min-h-[4.6rem]">
                  <motion.p
                    key={`${plan.id}-${billing}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-wrap items-baseline gap-x-1.5 text-subheading"
                  >
                    {perMonth === null ? (
                      <span className="heading-sub text-[2.4rem] leading-none">Free</span>
                    ) : (
                      <>
                        <span className="text-sm font-medium text-ink/60">{plan.currency}</span>
                        <span className="heading-sub text-[2.4rem] leading-none">{fmt(perMonth)}</span>
                        <span className="text-sm text-ink/60">per month</span>
                      </>
                    )}
                  </motion.p>
                  {note && <p className="mt-2 text-xs text-ink/55">{note}</p>}
                </div>

                <p className="mt-3 text-[0.95rem] text-pretty text-ink/60">{plan.tagline}</p>

                <div className="mt-8">
                  {plan.groups.map((g, gi) => (
                    <div key={g.title} className={cn(gi > 0 && "mt-6")}>
                      <h4 className="text-[1rem] font-medium text-ink">{g.title}</h4>
                      <ul className="mt-1.5">
                        {g.items.map((item, i) => (
                          <li
                            key={item}
                            className={cn(
                              "flex gap-3 py-3 text-[0.92rem] text-ink/75",
                              i > 0 && "border-t border-black/[0.07]",
                            )}
                          >
                            <Check className="mt-0.5 size-[1.05rem] shrink-0 text-cta" aria-hidden />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-9">
                  <ArrowButton href={plan.cta.href} size="md" variant={f ? "primary" : "secondary"} className="w-full">
                    {plan.cta.label}
                  </ArrowButton>
                </div>
              </article>
            </RevealItem>
          );
        })}
      </Stagger>
    </div>
  );
}
