import Link from "next/link";
import { Check } from "lucide-react";
import { planComparison, pricingPlans, type PlanCell } from "@/lib/pricing";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { primaryCta } from "@/lib/navigation";
import { cn } from "@/lib/cn";

const fmt = (n: number) => n.toLocaleString("en-US");

/** Growth column tint. The header needs an opaque version so rows do not show through while it is stuck. */
const TINT = "bg-[#e4f1ee]/70";
const TINT_SOLID = "bg-[#ecf5f3]";

function Cell({ value }: { value: PlanCell }) {
  if (value === true) {
    return (
      <>
        <Check className="size-4 text-cta" aria-hidden />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <span aria-hidden className="text-ink/30">
          —
        </span>
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span className="text-ink/80">{value}</span>;
}

/**
 * Plan-by-plan feature matrix. The plan names stay pinned under the site header while the table scrolls, and
 * release when the button row at the end comes into view. The Growth column carries the same soft green as its
 * pricing card. Below md the table scrolls sideways instead, so the pinned header is off there.
 */
export function ComparisonTable() {
  return (
    <div className="rounded-3xl bg-white ring-1 ring-black/[0.08] max-md:overflow-x-auto">
      <div className="min-w-[720px]">
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">Feature comparison between Essential, Growth and Pro</caption>
          <colgroup>
            <col className="w-[34%]" />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th
                scope="col"
                className="bg-white px-6 py-5 align-bottom text-sm font-medium text-ink/55 shadow-[inset_0_-1px_0_rgba(0,0,0,0.08)] md:sticky md:top-[76px] md:z-20 md:rounded-tl-3xl"
              >
                Features
              </th>
              {pricingPlans.map((p, i) => (
                <th
                  key={p.id}
                  scope="col"
                  className={cn(
                    "px-5 py-5 align-bottom shadow-[inset_0_-1px_0_rgba(0,0,0,0.08)] md:sticky md:top-[76px] md:z-20",
                    p.featured ? TINT_SOLID : "bg-white",
                    i === pricingPlans.length - 1 && "md:rounded-tr-3xl",
                  )}
                >
                  <span
                    className="block heading-sub text-xl text-subheading"
                    style={p.featured ? { color: "var(--cta)" } : undefined}
                  >
                    {p.name}
                  </span>
                  <span className="mt-1 block text-xs font-normal text-ink/55">
                    {p.monthly === null ? "Free" : `${p.currency} ${fmt(p.monthly)} per month`}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {planComparison.map((row) => (
              <tr key={row.feature} className="border-b border-black/[0.06]">
                <th scope="row" className="px-6 py-3.5 text-[0.9rem] font-normal text-ink">
                  {row.feature}
                </th>
                {row.values.map((v, i) => (
                  <td key={pricingPlans[i].id} className={cn("px-5 py-3.5 text-[0.9rem]", pricingPlans[i].featured && TINT)}>
                    <span className="inline-flex items-center gap-2">
                      <Cell value={v} />
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Same column widths as the table above, so each button sits under its plan. */}
        <div className="grid grid-cols-[34%_1fr_1fr_1fr]">
          <div aria-hidden className="rounded-bl-3xl" />
          {pricingPlans.map((p, i) => (
            <div
              key={p.id}
              className={cn("px-5 pt-6 pb-6", p.featured && TINT, i === pricingPlans.length - 1 && "rounded-br-3xl")}
            >
              <ArrowButton href={p.cta.href} size="md" variant={p.featured ? "primary" : "secondary"} className="w-full">
                {p.cta.label}
              </ArrowButton>
              <p className="mt-3 text-center text-xs text-ink/60">
                or{" "}
                <Link
                  href={primaryCta.href}
                  className="underline underline-offset-2 transition-colors hover:text-ink"
                >
                  book a demo
                </Link>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
