import { Check, Circle, MessageCircle } from "lucide-react";
import { availabilityLabel, comparison, type Availability } from "@/lib/pricing";

function Cell({ value }: { value: Availability }) {
  const Icon = value === "included" ? Check : value === "available" ? Circle : MessageCircle;
  return (
    <span className="inline-flex items-center gap-2 text-sm">
      <Icon className={value === "included" ? "size-4 text-iris-ink" : "size-3.5 text-stone"} aria-hidden />
      <span className={value === "included" ? "font-semibold" : "text-stone"}>{availabilityLabel[value]}</span>
    </span>
  );
}

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-3xl bg-card ring-1 ring-line">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <caption className="sr-only">Feature comparison between Custom and Enterprise</caption>
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="px-6 py-5 text-sm font-semibold text-stone">
              Capability
            </th>
            <th scope="col" className="px-6 py-5 text-lg font-bold">
              Custom
            </th>
            <th scope="col" className="px-6 py-5 text-lg font-bold">
              Enterprise
            </th>
          </tr>
        </thead>
        <tbody>
          {comparison.map((row) => (
            <tr key={row.feature} className="border-b border-line last:border-0">
              <th scope="row" className="px-6 py-4 font-semibold">
                {row.feature}
              </th>
              <td className="px-6 py-4">
                <Cell value={row.custom} />
              </td>
              <td className="px-6 py-4">
                <Cell value={row.enterprise} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
