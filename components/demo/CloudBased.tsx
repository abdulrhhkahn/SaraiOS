import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import { Cloud, RefreshCw } from "lucide-react";
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
        "flex flex-col overflow-hidden rounded-3xl bg-linen p-7 ring-1 ring-black/[0.08] sm:p-8",
        className,
      )}
    >
      {children}
    </article>
  );
}

/** A real SaraiOS screen (the guest page of the demo hotel) opened in a browser window. */
function BrowserWindow() {
  return (
    <div className="w-[calc(100%+2rem)] pt-5">
      <div className="rounded-[1.6rem] bg-black/[0.03] p-2 ring-1 ring-black/[0.06]">
        <div className="overflow-hidden rounded-[1.2rem] bg-white">
          <div aria-hidden className="flex items-center gap-1.5 border-b border-black/[0.07] px-4 py-3">
            <span className="size-2.5 rounded-full bg-black/15" />
            <span className="size-2.5 rounded-full bg-black/15" />
            <span className="size-2.5 rounded-full bg-black/15" />
            <span className="ml-3 flex-1 rounded-md bg-black/[0.05] px-3 py-1 text-[0.7rem] text-ink/50">
              Demo hotel · guest page
            </span>
          </div>
          <Image
            src="/images/demo/guest-welcome.png"
            alt="The guest welcome page of a demo hotel, opened in a web browser"
            width={588}
            height={448}
            sizes="(min-width: 1024px) 30vw, 90vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}

export function CloudBased() {
  return (
    <section className="relative pb-24 sm:pb-32">
      <Container>
        <Reveal className="flex max-w-[44rem] flex-col items-start text-left">
          <p className="font-mono text-[0.9375rem] tracking-[0.08em] text-cta uppercase">Cloud based</p>
          <h2 className="mt-5 max-w-[20ch] heading-section text-balance text-subheading">
            Nothing to install. Just open it.
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg text-pretty text-stone">
            SaraiOS runs in the cloud, so your team and your guests use it from a web browser. There is no server to
            set up and no software to maintain at your property.
          </p>
        </Reveal>

        <Stagger
          className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-5 sm:mt-16 lg:grid-cols-3 lg:items-start"
          stagger={0.1}
        >
          <RevealItem>
            <CardShell className="min-h-[22rem] lg:h-[27rem]">
              <IconBadge icon={Cloud} />
              <div className="mt-auto pt-16">
                <h3 className="heading-sub text-xl text-subheading">No software to install</h3>
                <p className="mt-3 max-w-[40ch] text-[0.95rem] text-pretty text-ink/60">
                  Sign in from a browser and start working. Nothing to set up on your own servers.
                </p>
              </div>
            </CardShell>
          </RevealItem>

          <RevealItem>
            <CardShell className="lg:h-[31rem]">
              <h3 className="heading-sub text-xl text-subheading">Open it on any device</h3>
              <p className="mt-3 max-w-[40ch] text-[0.95rem] text-pretty text-ink/60">
                Guests open their page from a link on their own phone, with no app store download.
              </p>
              <DemoTag className="mt-5 w-fit">Demo property</DemoTag>
              <div className="relative mt-auto -mr-7 -mb-7 h-[22rem] overflow-hidden sm:-mr-8 sm:-mb-8 lg:h-auto lg:flex-1">
                <BrowserWindow />
              </div>
            </CardShell>
          </RevealItem>

          <RevealItem>
            <CardShell className="min-h-[22rem] lg:h-[27rem]">
              <IconBadge icon={RefreshCw} />
              <div className="mt-auto pt-16">
                <h3 className="heading-sub text-xl text-subheading">Always up to date</h3>
                <p className="mt-3 max-w-[40ch] text-[0.95rem] text-pretty text-ink/60">
                  Updates reach everyone at once, so your whole team works on the same version.
                </p>
              </div>
            </CardShell>
          </RevealItem>
        </Stagger>
      </Container>
    </section>
  );
}
