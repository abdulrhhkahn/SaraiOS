import { Check } from "lucide-react";
import { planComparison, pricingPlans, type PlanCell } from "@/lib/pricing";
import { cn } from "@/lib/cn";

const fmt = (n: number) => n.toLocaleString("en-US");

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

/** Plan-by-plan feature matrix. The Growth column carries the same soft green as its pricing card. */
export function ComparisonTable() {
  return (
    <div className="relative overflow-x-auto rounded-3xl bg-white ring-1 ring-black/[0.08]">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <caption className="sr-only">Feature comparison between Essential, Growth and Pro</caption>
        <thead>
          <tr className="border-b border-black/[0.08]">
            <th scope="col" className="w-[34%] px-6 py-5 align-bottom text-sm font-medium text-ink/55">
              Features
            </th>
            {pricingPlans.map((p) => (
              <th key={p.id} scope="col" className={cn("px-5 py-5 align-bottom", p.featured && "bg-[#e4f1ee]/70")}>
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
        {planComparison.map((group) => (
          <tbody key={group.title}>
            <tr>
              <th
                scope="colgroup"
                colSpan={4}
                className="border-b border-black/[0.06] bg-linen px-6 py-2.5 text-xs font-semibold tracking-[0.08em] text-ink/60 uppercase"
              >
                {group.title}
              </th>
            </tr>
            {group.rows.map((row) => (
              <tr key={row.feature} className="border-b border-black/[0.06] last:border-0">
                <th scope="row" className="px-6 py-3.5 text-[0.9rem] font-normal text-ink">
                  {row.feature}
                </th>
                {row.values.map((v, i) => (
                  <td
                    key={pricingPlans[i].id}
                    className={cn("px-5 py-3.5 text-[0.9rem]", pricingPlans[i].featured && "bg-[#e4f1ee]/70")}
                  >
                    <span className="inline-flex items-center gap-2">
                      <Cell value={v} />
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
