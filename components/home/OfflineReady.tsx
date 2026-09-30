import type { ComponentType, ReactNode } from "react";
import { Clock, Feather, Send, WifiOff } from "lucide-react";
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

/** Zoomed-in guest hub chat with no connection: the hub still opens and a new message waits in the queue. */
function OfflineChat() {
  return (
    <div aria-hidden className="w-[calc(100%+2rem)] pt-5">
      <div className="rounded-[1.6rem] bg-black/[0.03] p-2 ring-1 ring-black/[0.06]">
        <div className="rounded-[1.2rem] bg-white p-5 pb-12">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 pr-8">
            <div className="flex items-center gap-3">
              <span className="size-10 rounded-xl bg-cta" />
              <div className="leading-tight">
                <p className="font-serif text-[1.2rem] text-ink">Demo Hotel</p>
                <p className="text-[0.8rem] text-ink/55">Guest hub · offline</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brass-soft px-3 py-1.5 text-[0.8rem] font-semibold text-brass-ink">
              <WifiOff className="size-4" /> Offline
            </span>
          </div>

          {/* Tabs */}
          <div className="mt-4 grid grid-cols-3 rounded-xl bg-black/[0.05] p-1 text-center text-[0.9rem] font-medium text-ink/65">
            <span className="py-1.5">Info</span>
            <span className="py-1.5">Guidebook</span>
            <span className="rounded-lg bg-white py-1.5 text-ink shadow-sm">Chat</span>
          </div>

          {/* Conversation */}
          <div className="mt-4 space-y-3 pr-8 text-[0.95rem] leading-snug">
            <div className="ml-auto w-fit max-w-[80%]">
              <p className="rounded-2xl rounded-br-md bg-cta px-4 py-2.5 text-white">Can we get two extra towels?</p>
              <p className="mt-1.5 flex items-center justify-end gap-1.5 text-[0.75rem] text-ink/55">
                <Clock className="size-3.5" /> Queued, sends when online
              </p>
            </div>
          </div>

          {/* Input */}
          <div className="mt-5 flex items-center gap-3">
            <span className="flex-1 rounded-full bg-black/[0.05] px-4 py-3 text-[0.9rem] text-ink/50">
              Offline — will queue
            </span>
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-cta text-white">
              <Send className="size-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OfflineReady() {
  return (
    <section className="relative pt-24 sm:pt-32">
      <Container>
        <Reveal className="flex max-w-[44rem] flex-col items-start text-left">
          <p className="font-mono text-[0.8125rem] tracking-[0.08em] text-cta uppercase">Offline ready</p>
          <h2 className="mt-5 max-w-[20ch] heading-section text-balance text-subheading">
            Still works when the signal drops.
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg text-pretty text-stone">
            The guest hub is a light web app. It keeps the last stay details on the guest&apos;s phone and holds
            messages until the connection is back.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:mt-16 lg:grid-cols-3 lg:items-start" stagger={0.1}>
          <RevealItem>
            <CardShell className="min-h-[22rem] lg:h-[27rem]">
              <IconBadge icon={WifiOff} />
              <div className="mt-auto pt-16">
                <h3 className="heading-sub text-xl text-subheading">Works offline</h3>
                <p className="mt-3 max-w-[40ch] text-[0.95rem] text-pretty text-ink/60">
                  Wi-Fi details and hotel info still open without a signal, from what the phone saved last time.
                </p>
              </div>
            </CardShell>
          </RevealItem>

          <RevealItem>
            <CardShell className="lg:h-[31rem]">
              <h3 className="heading-sub text-xl text-subheading">Chat keeps working</h3>
              <p className="mt-3 max-w-[40ch] text-[0.95rem] text-pretty text-ink/60">
                Messages written offline are saved and sent in order once the phone is back online.
              </p>
              <DemoTag className="mt-5 w-fit">Sample conversation</DemoTag>
              <div className="relative mt-auto -mr-7 -mb-7 h-[20rem] overflow-hidden sm:-mr-8 sm:-mb-8 lg:h-auto lg:flex-1">
                <OfflineChat />
              </div>
            </CardShell>
          </RevealItem>

          <RevealItem>
            <CardShell className="min-h-[22rem] lg:h-[27rem]">
              <IconBadge icon={Feather} />
              <div className="mt-auto pt-16">
                <h3 className="heading-sub text-xl text-subheading">Light on data</h3>
                <p className="mt-3 max-w-[40ch] text-[0.95rem] text-pretty text-ink/60">
                  No app store download. It loads only the stay details a guest needs, then keeps a copy on the phone.
                </p>
              </div>
            </CardShell>
          </RevealItem>
        </Stagger>
      </Container>
    </section>
  );
}
