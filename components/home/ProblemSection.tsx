import type { ReactNode } from "react";
import { ArrowRight, Globe, Mail, MessageSquare, Phone, Wifi } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
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

function Arrow() {
  return <ArrowRight className="size-3.5 text-stone/40" aria-hidden />;
}

function WorkflowPanel() {
  return (
    <>
      <PanelHeader
        title="Routing"
        aside={
          <span className="rounded-full bg-brass-soft px-2.5 py-0.5 text-xs font-semibold text-brass-ink">Manual</span>
        }
      />
      <div className="mt-4 space-y-2.5">
        <div className="flex items-center gap-2">
          <span className={chip}>Guest</span>
          <Arrow />
          <span className={chip}>Front desk</span>
          <Arrow />
        </div>
        <div className="flex items-center gap-2">
          <span className={chip}>Phone</span>
          <Arrow />
          <span className={chip}>Housekeeping</span>
        </div>
      </div>
      <div className="mt-6 space-y-2.5">
        <Bar w="70%" />
        <Bar w="52%" />
      </div>
    </>
  );
}

function MissedPanel() {
  return (
    <>
      <PanelHeader title="Guest stay" />
      <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-dashed border-line-strong bg-linen/70 px-4 py-3.5 text-sm">
        <p className="font-semibold text-ink line-through decoration-ink/50">
          Spa · Sunset dinner ·<br />
          Room upgrade
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
    label: "Manual workflows",
    text: "Requests often need to be manually routed to the right team.",
    panel: <WorkflowPanel />,
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
        <Reveal className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>The problem</Eyebrow>
            <h2 className="mt-5 heading-section text-balance text-subheading">
              Guests expect instant. <br className="hidden lg:block" />
              Hotels still run on inboxes.
            </h2>
          </div>
          <div className="lg:pt-9">
            <p className="text-base font-semibold text-ink">Guest expectations have changed.</p>
            <p className="mt-4 max-w-[52ch] text-lg text-pretty text-stone">
              Questions arrive through multiple channels. Requests move between teams. Staff answer the same questions
              repeatedly. Revenue opportunities disappear between guest interactions.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:mt-16 md:grid-cols-2" stagger={0.09}>
          {problems.map((p) => (
            <RevealItem key={p.label} className="h-full">
              <article className="group relative isolate flex h-full min-h-[27rem] flex-col overflow-hidden rounded-[2rem] bg-[linear-gradient(165deg,#f7f4ec_0%,#f0eee5_55%,#e3eee9_100%)] p-7 ring-1 ring-black/[0.04] sm:p-9">
                <p className="text-[0.95rem] text-stone/70">{p.label}</p>
                <h3 className="mt-3 max-w-[24ch] heading-sub text-2xl leading-snug text-balance text-subheading sm:text-[1.7rem]">
                  {p.text}
                </h3>

                {/* Soft Sarai-green glow behind the frame */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-[8%] bottom-[16%] -z-10 h-40 w-[72%] rounded-full bg-cta/25 blur-3xl"
                />

                {/* Frosted frame holding the mini interface; it runs off the card edge like a cropped screenshot */}
                <div className="mt-auto -mr-14 -mb-14 pt-10">
                  <div className="rounded-[1.75rem] bg-white/50 p-3.5 ring-1 ring-white/80 backdrop-blur-sm transition-transform duration-500 ease-out group-hover:-translate-y-1">
                    <div
                      aria-hidden
                      className="min-h-[15.5rem] rounded-2xl bg-white p-5 pb-16 shadow-[0_10px_30px_-14px_rgba(0,60,62,0.3)]"
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
