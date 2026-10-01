import type { ReactNode } from "react";
import { Globe, Mail, MessageSquare, Phone, Wifi } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { Reveal, RevealItem, Stagger } from "@/components/animations/Reveal";
import { cn } from "@/lib/cn";

/* ---------- Mini interfaces shown inside each card ---------- */

const chip = "inline-flex items-center gap-1.5 rounded-xl bg-linen px-3 py-2 text-sm text-stone ring-1 ring-line";

function PanelHeader({ title, aside }: { title: string; aside?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-sm font-semibold text-ink">{title}</p>
      {aside}
    </div>
  );
}

function Bar({ w }: { w: string }) {
  return <span className="block h-2 rounded-full bg-black/[0.06]" style={{ width: w }} />;
}

function ChannelsPanel() {
  return (
    <>
      <PanelHeader title="Inbox" aside={<span className="text-xs text-stone/60">4 channels</span>} />
      <div className="mt-4 flex flex-wrap gap-2">
        <span className={chip}>
          <Globe className="size-4" aria-hidden /> Web
        </span>
        <span className={chip}>
          <MessageSquare className="size-4" aria-hidden /> Messaging
        </span>
        <span className={chip}>
          <Mail className="size-4" aria-hidden /> Email
        </span>
        <span className={chip}>
          <Phone className="size-4" aria-hidden /> Phone
        </span>
      </div>
      <div className="mt-6 space-y-2.5">
        <Bar w="82%" />
        <Bar w="64%" />
        <Bar w="72%" />
      </div>
    </>
  );
}

function RepeatPanel() {
  const asks = [
    { text: "What's the Wi-Fi password?", o: "opacity-100" },
    { text: "What's the Wi-Fi password?", o: "opacity-70" },
    { text: "Wi-Fi password please?", o: "opacity-45" },
  ];
  return (
    <>
      <PanelHeader title="Guest questions" aside={<Wifi className="size-4 text-stone/50" aria-hidden />} />
      <div className="mt-4 space-y-2">
        {asks.map((a, i) => (
          <p
            key={i}
            className={cn(
              "w-fit rounded-2xl rounded-bl-md bg-linen px-3.5 py-2 text-sm text-stone ring-1 ring-line",
              a.o,
            )}
          >
            {a.text}
          </p>
        ))}
      </div>
    </>
  );
}

function MissedPanel() {
  return (
    <>
      <PanelHeader title="Guest stay" />
      <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-dashed border-line-strong bg-linen/70 px-4 py-3.5 text-sm">
        <p className="space-y-0.5 font-semibold text-ink [&>span]:block [&>span]:line-through [&>span]:decoration-ink/50">
          <span>Spa</span>
          <span>Sunset dinner</span>
          <span>Room upgrade</span>
        </p>
        <p className="shrink-0 text-stone">Never offered</p>
      </div>
      <div className="mt-6 space-y-2.5">
        <Bar w="78%" />
        <Bar w="58%" />
      </div>
    </>
  );
}

/* ---------- Content ---------- */

const problems: { label: string; text: string; panel: ReactNode }[] = [
  {
    label: "Too many channels",
    text: "Guests communicate through web, messaging, email and other channels.",
    panel: <ChannelsPanel />,
  },
  {
    label: "Repetitive questions",
    text: "Wi-Fi, breakfast, checkout, amenities, directions and hotel information.",
    panel: <RepeatPanel />,
  },
  {
    label: "Missed opportunities",
    text: "Upsells and hotel experiences can be difficult to surface at the right moment.",
    panel: <MissedPanel />,
  },
];

export function ProblemSection() {
  return (
    <section className="relative pt-12 pb-24 sm:pt-16 sm:pb-32">
      <Container>
        <Reveal>
          <p className="font-mono text-[0.9375rem] tracking-[0.08em] text-cta uppercase">The problem</p>
          <h2 className="mt-5 heading-section text-balance text-subheading">
            Guests expect instant. <br className="hidden lg:block" />
            Hotels still run on inboxes.
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg text-pretty text-stone">
            Questions arrive through multiple channels. Requests move between teams. Staff answer the same questions
            repeatedly. Revenue opportunities disappear between guest interactions.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:mt-16 lg:grid-cols-3" stagger={0.09}>
          {problems.map((p) => (
            <RevealItem key={p.label} className="h-full">
              <article className="group relative isolate flex h-full min-h-[27rem] flex-col overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-black/[0.08] sm:p-9">
                <p className="text-[0.95rem] text-stone/70">{p.label}</p>
                <h3 className="mt-3 max-w-[24ch] heading-sub text-2xl leading-snug text-balance text-subheading sm:text-[1.7rem] lg:text-2xl">
                  {p.text}
                </h3>

                {/* Light frame holding the mini interface; it runs off the card edge like a cropped screenshot */}
                <div className="mt-auto -mr-14 -mb-14 pt-10">
                  <div className="rounded-[1.75rem] bg-black/[0.03] p-3.5 ring-1 ring-black/[0.06] transition-transform duration-500 ease-out group-hover:-translate-y-1">
                    <div
                      aria-hidden
                      className="h-[16.5rem] overflow-hidden rounded-2xl bg-white p-5 shadow-[0_6px_20px_-14px_rgba(0,0,0,0.3)] ring-1 ring-black/[0.06]"
                    >
                      {p.panel}
                    </div>
                  </div>
                </div>
              </article>
            </RevealItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
