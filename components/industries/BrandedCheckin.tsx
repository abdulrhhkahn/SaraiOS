import type { ComponentType, ReactNode } from "react";
import { ArrowRight, Building2 } from "lucide-react";
import { Container, DemoTag } from "@/components/ui/primitives";
import { Reveal, RevealItem, Stagger } from "@/components/animations/Reveal";
import { cn } from "@/lib/cn";

/** The hotel's own brand colour in the demo (every hotel sets theirs in Settings). */
const BRAND = "#0b6b75";

/** Round gradient badge that holds the icon on the plain card. */
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

/** Crops a zoomed mockup at the right and bottom edges of its card. */
function Crop({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative mt-auto -mr-7 -mb-7 h-[20rem] overflow-hidden sm:-mr-8 sm:-mb-8 lg:h-auto lg:flex-1",
        className,
      )}
    >
      <div aria-hidden className="w-[calc(100%+2rem)] pt-5">
        <div className="rounded-[1.6rem] bg-black/[0.03] p-2 ring-1 ring-black/[0.06]">{children}</div>
      </div>
    </div>
  );
}

/** Staff dashboard, Settings > Property, filled with demo data. */
function PropertyMock() {
  const field = "mt-1.5 rounded-xl px-3.5 py-2 text-[0.82rem] text-ink ring-1 ring-black/[0.1]";
  const label = "mt-3 text-[0.82rem] font-medium text-ink";
  return (
    <div className="rounded-[1.2rem] bg-white p-5 pr-9 pb-12">
      <p className="text-[1rem] text-ink">Property</p>

      <p className={label}>Name</p>
      <p className={field}>Demo Hotel</p>

      <p className={label}>Brand color</p>
      <div className="mt-1.5 flex items-center gap-3">
        <span className="size-10 shrink-0 rounded-lg ring-1 ring-black/[0.12]" style={{ backgroundColor: BRAND }} />
        <p className={cn(field, "mt-0 flex-1")}>{BRAND}</p>
      </div>

      <p className={label}>Logo</p>
      <div className="mt-1.5 flex items-center gap-3">
        <span className="size-10 shrink-0 rounded-lg" style={{ backgroundColor: BRAND }} />
        <p className={cn(field, "mt-0 flex-1 truncate")}>
          <span className="font-medium">Choose file</span> demo-hotel-logo.png
        </p>
      </div>

      <p className={label}>Address</p>
      <p className={cn(field, "h-20")}>1 Harbour Road, Lisbon</p>
    </div>
  );
}

/** The guest check-in welcome screen carrying the hotel's branding, on a white background. */
function GuestWelcomeMock() {
  return (
    <div className="rounded-[1.2rem] bg-white p-5 pr-9 pb-32">
      <div className="flex items-center gap-3">
        <span className="size-9 rounded-xl" style={{ backgroundColor: BRAND }} />
        <p className="font-serif text-[1rem] text-ink">Demo Hotel</p>
      </div>
      <span className="mt-3 block h-[3px] w-20 rounded-full" style={{ backgroundColor: BRAND }} />

      <h4 className="mt-6 pr-1 text-center font-serif text-[1.5rem] leading-tight text-ink">Welcome to Demo Hotel.</h4>
      <p className="mx-auto mt-2.5 max-w-[34ch] text-center text-[0.8rem] leading-relaxed text-ink/60">
        Your room is ready — we hope you enjoy a restful stay.
      </p>
      <span
        className="mt-4 flex items-center justify-center gap-2 rounded-xl py-3 text-[0.88rem] font-semibold text-white"
        style={{ backgroundColor: BRAND }}
      >
        Start check-in <ArrowRight className="size-4" />
      </span>
    </div>
  );
}

export function BrandedCheckin() {
  return (
    <section className="relative pb-24 sm:pb-32">
      <Container>
        <Reveal className="flex max-w-[44rem] flex-col items-start text-left">
          <p className="font-mono text-[0.9375rem] tracking-[0.08em] text-cta uppercase">Guest surface</p>
          <h2 className="mt-5 max-w-[20ch] heading-section text-balance text-subheading">
            A check-in page that carries your branding.
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg text-pretty text-stone">
            Add your hotel&apos;s name, brand colour, logo and address once. Guests get a dedicated check-in page that
            looks like your hotel.
          </p>
        </Reveal>

        <Stagger
          className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-5 sm:mt-16 lg:grid-cols-3 lg:items-start"
          stagger={0.1}
        >
          <RevealItem>
            <CardShell className="lg:h-[31rem]">
              <h3 className="heading-sub text-xl text-subheading">Set up your brand</h3>
              <p className="mt-3 min-h-[2.9rem] max-w-[40ch] text-[0.95rem] text-pretty text-ink/60">
                Enter your hotel&apos;s name, brand colour, logo and address in the dashboard.
              </p>
              <DemoTag className="mt-5 w-fit">Demo data</DemoTag>
              <Crop>
                <PropertyMock />
              </Crop>
            </CardShell>
          </RevealItem>

          <RevealItem>
            <CardShell className="min-h-[22rem] lg:h-[31rem]">
              <IconBadge icon={Building2} />
              <div className="mt-auto pt-16">
                <h3 className="heading-sub text-xl text-subheading">One page per property</h3>
                <p className="mt-3 max-w-[40ch] text-[0.95rem] text-pretty text-ink/60">
                  Each property gets its own check-in link and branding, so groups can set up every hotel separately.
                </p>
              </div>
            </CardShell>
          </RevealItem>

          <RevealItem>
            <CardShell className="lg:h-[31rem]">
              <h3 className="heading-sub text-xl text-subheading">Your own guest surface</h3>
              <p className="mt-3 min-h-[2.9rem] max-w-[40ch] text-[0.95rem] text-pretty text-ink/60">
                Guests check in on a page with your name, colour and logo.
              </p>
              <DemoTag className="mt-5 w-fit">Demo data</DemoTag>
              <Crop>
                <GuestWelcomeMock />
              </Crop>
            </CardShell>
          </RevealItem>
        </Stagger>
      </Container>
    </section>
  );
}
