import type { ComponentType, ReactNode } from "react";
import { Headset, MessageSquareWarning, X } from "lucide-react";
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

/** Zoomed-in "Chat with support" window from the app, with a sample conversation (dummy data). */
function SupportChatMock() {
  return (
    <div aria-hidden className="w-[calc(100%+2rem)] pt-5">
      <div className="rounded-[1.6rem] bg-black/[0.03] p-2 ring-1 ring-black/[0.06]">
        <div className="rounded-[1.2rem] bg-white pb-40">
          <div className="flex items-center justify-between border-b border-black/[0.07] px-5 py-3.5 pr-9">
            <p className="text-[1.05rem] font-semibold text-ink">Chat with support</p>
            <X className="size-4 text-ink/60" />
          </div>

          <div className="space-y-2.5 px-5 py-4 pr-9 text-[0.85rem] leading-snug">
            <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-cta px-3.5 py-2.5 text-white">
              The check-in page is not loading on my phone.
            </p>
            <div className="w-fit max-w-[88%] rounded-2xl rounded-bl-md bg-[#f1f0ec] px-3.5 py-2.5 text-ink">
              <p className="mb-0.5 text-[0.7rem] font-semibold text-cta">SaraiOS support</p>
              Thanks for letting us know. Which phone and browser are you using?
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-5 pr-9">
            <span className="flex-1 rounded-xl border-[1.5px] border-cta/70 px-3.5 py-2.5 text-[0.85rem] text-ink/50">
              Type your message…
            </span>
            <span className="rounded-lg bg-black/25 px-3.5 py-2.5 text-[0.8rem] font-semibold text-white">Send</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SupportChat() {
  return (
    <section className="relative pb-24 sm:pb-32">
      <Container>
        <Reveal className="flex max-w-[44rem] flex-col items-start text-left">
          <p className="font-mono text-[0.9375rem] tracking-[0.08em] text-cta uppercase">In-app support</p>
          <h2 className="mt-5 max-w-[20ch] heading-section text-balance text-subheading">
            Support, right inside the app.
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg text-pretty text-stone">
            Chat with the SaraiOS support team 24/7 from inside the app, and share any technical issue you run into.
          </p>
        </Reveal>

        <Stagger
          className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-5 sm:mt-16 lg:grid-cols-3 lg:items-start"
          stagger={0.1}
        >
          <RevealItem>
            <CardShell className="min-h-[22rem] lg:h-[27rem]">
              <IconBadge icon={Headset} />
              <div className="mt-auto pt-16">
                <h3 className="heading-sub text-xl text-subheading">24/7 chat support</h3>
                <p className="mt-3 max-w-[40ch] text-[0.95rem] text-pretty text-ink/60">
                  Reach the support team at any hour, without leaving the app.
                </p>
              </div>
            </CardShell>
          </RevealItem>

          <RevealItem>
            <CardShell className="lg:h-[31rem]">
              <h3 className="heading-sub text-xl text-subheading">Chat with support</h3>
              <p className="mt-3 max-w-[40ch] text-[0.95rem] text-pretty text-ink/60">
                Send a message about your issue and get the reply in the same chat.
              </p>
              <DemoTag className="mt-5 w-fit">Sample conversation</DemoTag>
              <div className="relative mt-auto -mr-7 -mb-7 h-[22rem] overflow-hidden sm:-mr-8 sm:-mb-8 lg:h-auto lg:flex-1">
                <SupportChatMock />
              </div>
            </CardShell>
          </RevealItem>

          <RevealItem>
            <CardShell className="min-h-[22rem] lg:h-[27rem]">
              <IconBadge icon={MessageSquareWarning} />
              <div className="mt-auto pt-16">
                <h3 className="heading-sub text-xl text-subheading">Any technical issue</h3>
                <p className="mt-3 max-w-[40ch] text-[0.95rem] text-pretty text-ink/60">
                  Tell the team about any technical problem you run into while using the app.
                </p>
              </div>
            </CardShell>
          </RevealItem>
        </Stagger>
      </Container>
    </section>
  );
}
