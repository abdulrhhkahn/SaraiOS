import type { ComponentType, ReactNode } from "react";
import { History, Users } from "lucide-react";
import { Container, DemoTag } from "@/components/ui/primitives";
import { Reveal, RevealItem, Stagger } from "@/components/animations/Reveal";
import { cn } from "@/lib/cn";

/** Round gradient badge that holds the icon on the two outer cards. */
function IconBadge({ icon: Icon }: { icon: ComponentType<{ className?: string }> }) {
  return (
    <span
      aria-hidden
      className="inline-flex size-20 items-center justify-center rounded-full bg-[linear-gradient(to_bottom,#ffffff_0%,#c9e6e4_38%,#3f9ea1_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
    >
      <Icon className="size-8 text-ink" />
    </span>
  );
}

function CardShell({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-black/[0.08] sm:p-8",
        className,
      )}
    >
      {children}
    </article>
  );
}

const groups = [
  {
    email: "frontdesk@demohotel.com",
    items: [
      ["Marked Maya Chen's check-in verified", "09:12"],
      ["Replied to Tom Walsh", "09:40"],
    ],
  },
  {
    email: "housekeeping@demohotel.com",
    items: [
      ["Completed request: Two extra pillows", "10:05"],
      ["Assigned room 318 to Ines Duarte", "10:21"],
    ],
  },
];

/** Zoomed-in Staff activity page (dummy data): tabs for the period, then tasks grouped by staff email. */
function ActivityMock() {
  return (
    <div aria-hidden className="w-[calc(100%+2rem)] pt-5">
      <div className="rounded-[1.6rem] bg-black/[0.03] p-2 ring-1 ring-black/[0.06]">
        <div className="rounded-[1.2rem] bg-white p-5 pb-12">
          <p className="pr-8 font-serif text-[1.45rem] leading-none text-ink">Staff activity</p>
          <p className="mt-2 max-w-[34ch] pr-8 text-[0.8rem] leading-snug text-ink/55">
            Tasks carried out by each staff member, grouped by email.
          </p>

          <div className="mt-4 grid grid-cols-4 rounded-xl bg-black/[0.05] p-1 pr-9 text-center text-[0.85rem] font-medium text-ink/65">
            <span className="rounded-lg bg-white py-1.5 text-ink shadow-sm">Daily</span>
            <span className="py-1.5">Weekly</span>
            <span className="py-1.5">Monthly</span>
            <span className="py-1.5">Yearly</span>
          </div>

          <div className="mt-5 space-y-4 pr-8">
            {groups.map((g) => (
              <div key={g.email}>
                <p className="text-[0.78rem] font-semibold text-cta">{g.email}</p>
                <ul className="mt-2 space-y-2">
                  {g.items.map(([what, when]) => (
                    <li
                      key={what}
                      className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-[0.82rem] text-ink ring-1 ring-black/[0.08]"
                    >
                      <span className="truncate">{what}</span>
                      <span className="shrink-0 text-[0.75rem] text-ink/50">{when}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function StaffActivitySection() {
  return (
    <section className="relative pb-24 sm:pb-32">
      <Container>
        <Reveal className="flex max-w-[44rem] flex-col items-start text-left">
          <p className="font-mono text-[0.9375rem] tracking-[0.08em] text-cta uppercase">Staff activity</p>
          <h2 className="mt-5 max-w-[20ch] heading-section text-balance text-subheading">
            See what your team has done.
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg text-pretty text-stone">
            Tasks carried out by each staff member, grouped by email, with a history you can revisit anytime.
          </p>
        </Reveal>

        <Stagger
          className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-5 sm:mt-16 lg:grid-cols-3 lg:items-start"
          stagger={0.1}
        >
          <RevealItem>
            <CardShell className="min-h-[22rem] lg:h-[27rem]">
              <IconBadge icon={Users} />
              <div className="mt-auto pt-16">
                <h3 className="heading-sub text-xl text-subheading">By staff member</h3>
                <p className="mt-3 max-w-[40ch] text-[0.95rem] text-pretty text-ink/60">
                  Tasks are grouped by each team member&apos;s email, so you can see who did what.
                </p>
              </div>
            </CardShell>
          </RevealItem>

          <RevealItem>
            <CardShell className="lg:h-[31rem]">
              <h3 className="heading-sub text-xl text-subheading">Daily to yearly</h3>
              <p className="mt-3 max-w-[40ch] text-[0.95rem] text-pretty text-ink/60">
                Switch between daily, weekly, monthly and yearly views of what your team carried out.
              </p>
              <DemoTag className="mt-5 w-fit">Sample activity</DemoTag>
              <div className="relative mt-auto -mr-7 -mb-7 h-[20rem] overflow-hidden sm:-mr-8 sm:-mb-8 lg:h-auto lg:flex-1">
                <ActivityMock />
              </div>
            </CardShell>
          </RevealItem>

          <RevealItem>
            <CardShell className="min-h-[22rem] lg:h-[27rem]">
              <IconBadge icon={History} />
              <div className="mt-auto pt-16">
                <h3 className="heading-sub text-xl text-subheading">History stays available</h3>
                <p className="mt-3 max-w-[40ch] text-[0.95rem] text-pretty text-ink/60">
                  Past activity is kept, so you can go back and revisit it anytime.
                </p>
              </div>
            </CardShell>
          </RevealItem>
        </Stagger>
      </Container>
    </section>
  );
}
