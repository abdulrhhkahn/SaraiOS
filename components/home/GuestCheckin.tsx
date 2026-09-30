import type { ComponentType, ReactNode } from "react";
import {
  BookUser,
  Camera,
  Clock,
  IdCard,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  User,
  Wifi,
  BookOpen,
} from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { Reveal, RevealItem, Stagger } from "@/components/animations/Reveal";
import { cn } from "@/lib/cn";

/* ---------- Small building blocks (same idea as the flow diagrams in the reference) ---------- */

type Tone = "teal" | "cream" | "white" | "mint";

const tones: Record<Tone, string> = {
  teal: "bg-cta/10 text-cta",
  cream: "bg-brass-soft text-brass-ink",
  mint: "bg-[#e3eee9] text-[#1f5a4d]",
  white: "bg-white text-ink ring-1 ring-black/[0.08] shadow-[0_2px_8px_-3px_rgba(0,0,0,0.18)]",
};

function Chip({
  icon: Icon,
  tone = "teal",
  className,
  children,
}: {
  icon?: ComponentType<{ className?: string }>;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[0.72rem] leading-none font-medium whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {Icon && <Icon className="size-3.5 shrink-0" />}
      {children}
    </span>
  );
}

function Tile({
  icon: Icon,
  tone = "white",
  className,
}: {
  icon: ComponentType<{ className?: string }>;
  tone?: Tone | "solid";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "absolute inline-flex size-10 items-center justify-center rounded-xl",
        tone === "solid" ? "bg-cta text-white shadow-[0_6px_14px_-6px_rgba(0,120,125,0.7)]" : tones[tone],
        className,
      )}
    >
      <Icon className="size-[1.15rem]" />
    </span>
  );
}

function Connector() {
  return <span aria-hidden className="block h-4 w-px bg-cta/30" />;
}

/* ---------- Illustration 1: QR code check-in ---------- */

/** Decorative QR-style pattern (not a real code). Deterministic so server and client render the same. */
const QR_SIZE = 21;
const qrPath = (() => {
  let seed = 11;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const finders = [
    [0, 0],
    [QR_SIZE - 7, 0],
    [0, QR_SIZE - 7],
  ];
  const inFinderZone = (x: number, y: number) =>
    finders.some(([fx, fy]) => x >= fx - 1 && x <= fx + 7 && y >= fy - 1 && y <= fy + 7);
  let d = "";
  for (let y = 0; y < QR_SIZE; y++) {
    for (let x = 0; x < QR_SIZE; x++) {
      let dark: boolean;
      if (inFinderZone(x, y)) {
        const f = finders.find(([fx, fy]) => x >= fx && x < fx + 7 && y >= fy && y < fy + 7);
        if (!f) dark = false;
        else {
          const lx = x - f[0];
          const ly = y - f[1];
          dark = lx === 0 || lx === 6 || ly === 0 || ly === 6 || (lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4);
        }
      } else dark = rnd() > 0.5;
      if (dark) d += `M${x} ${y}h1v1h-1z`;
    }
  }
  return d;
})();

function QrIllustration() {
  return (
    <div className="flex h-full flex-col items-center pt-6">
      <div className="rounded-2xl bg-white p-2.5 shadow-[0_10px_26px_-12px_rgba(0,60,62,0.45)] ring-1 ring-black/[0.07]">
        <svg
          viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`}
          className="size-[4.6rem] text-ink"
          shapeRendering="crispEdges"
          aria-hidden
        >
          <path d={qrPath} fill="currentColor" />
        </svg>
      </div>
      <Connector />
      <Chip icon={Smartphone}>Opens on the guest&apos;s phone</Chip>
      <Connector />
      <div className="w-[13rem] rounded-xl bg-white px-4 py-3 text-center shadow-[0_6px_18px_-8px_rgba(0,0,0,0.25)] ring-1 ring-black/[0.07]">
        <p className="font-serif text-[0.85rem] text-ink">Welcome to Demo Hotel.</p>
        <p className="mt-2 border-t border-black/[0.07] pt-2 text-[0.68rem] text-ink/55">Start your check-in</p>
      </div>
    </div>
  );
}

/* ---------- Illustration 2: ID verification ---------- */

function IdIllustration() {
  return (
    <div className="relative h-full">
      {/* light connectors, like the bracket lines in the reference */}
      <svg aria-hidden viewBox="0 0 300 240" className="absolute inset-0 size-full" fill="none">
        <path d="M62 50V70Q62 80 72 80H150M238 50V70Q238 80 228 80H150M150 80V104" stroke="rgba(0,120,125,0.3)" />
        <circle cx="150" cy="104" r="2.5" fill="rgba(0,120,125,0.5)" />
      </svg>

      <Tile icon={Camera} className="top-4 left-[11%]" />
      <Tile icon={ShieldCheck} tone="solid" className="top-4 right-[11%]" />
      <Tile icon={BookUser} tone="mint" className="top-[34%] left-[3%] hidden sm:inline-flex" />
      <Tile icon={IdCard} tone="cream" className="top-[34%] right-[3%] hidden sm:inline-flex" />

      <div className="absolute top-[45%] left-1/2 h-[5.6rem] w-[8.8rem] -translate-x-1/2 -rotate-3 rounded-xl bg-white p-2.5 shadow-[0_12px_28px_-12px_rgba(0,60,62,0.5)] ring-1 ring-black/[0.08]">
        <div className="flex items-center justify-between">
          <span className="text-[0.55rem] font-semibold tracking-wider text-cta uppercase">Passport · ID</span>
          <span className="h-1.5 w-6 rounded-full bg-cta/25" />
        </div>
        <div className="mt-2 flex gap-2.5">
          <span className="inline-flex size-10 items-center justify-center rounded-lg bg-cta/10 text-cta">
            <User className="size-5" />
          </span>
          <span className="flex-1 space-y-1.5 pt-1">
            <span className="block h-1.5 w-full rounded-full bg-black/[0.09]" />
            <span className="block h-1.5 w-4/5 rounded-full bg-black/[0.07]" />
            <span className="block h-1.5 w-3/5 rounded-full bg-black/[0.07]" />
          </span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-3 flex justify-center">
        <Chip icon={Clock} tone="cream">
          Deleted 30 days after check-out
        </Chip>
      </div>
    </div>
  );
}

/* ---------- Illustration 3: guest hub ---------- */

const hubItems: { icon: ComponentType<{ className?: string }>; label: string }[] = [
  { icon: Wifi, label: "Wi-Fi" },
  { icon: Clock, label: "Stay details" },
  { icon: BookOpen, label: "Guidebook" },
  { icon: MessageCircle, label: "Chat" },
];

function HubIllustration() {
  return (
    <div className="flex h-full items-center justify-center pb-4">
      <Chip icon={Smartphone} tone="white" className="px-3 py-2.5 text-[0.78rem]">
        Guest hub
      </Chip>
      <svg aria-hidden width="44" height="158" viewBox="0 0 44 158" fill="none" className="shrink-0">
        <path
          d="M0 79H16M16 15V143M16 15H40M16 53H40M16 91H40M16 129H40"
          stroke="rgba(0,120,125,0.3)"
          strokeLinecap="round"
        />
        {[15, 53, 91, 129].map((y) => (
          <path key={y} d={`M38 ${y - 3}l4 3-4 3z`} fill="rgba(0,120,125,0.55)" />
        ))}
      </svg>
      <div className="flex flex-col gap-[0.8rem]">
        {hubItems.map((item, i) => (
          <Chip
            key={item.label}
            icon={item.icon}
            tone={i % 2 ? "teal" : "white"}
            className={cn("h-[1.75rem] py-0", i % 2 ? "" : "text-ink")}
          >
            {item.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}

/* ---------- Section ---------- */

const cards: { title: string; text: string; art: ReactNode }[] = [
  {
    title: "QR code check-in",
    text: "Guests scan a QR code or open a link and start check-in on their own phone, with no login.",
    art: <QrIllustration />,
  },
  {
    title: "ID verification",
    text: "Guests photograph their passport or ID. It is checked when uploaded and deleted 30 days after check-out.",
    art: <IdIllustration />,
  },
  {
    title: "Guest hub",
    text: "After check-in, guests land in the hub with Wi-Fi, check-in and check-out details, the guidebook and chat.",
    art: <HubIllustration />,
  },
];

export function GuestCheckin() {
  return (
    <section className="relative pb-24 sm:pb-32">
      <Container>
        <Reveal className="mx-auto flex max-w-[44rem] flex-col items-center text-center">
          <p className="font-mono text-[0.8125rem] tracking-[0.08em] text-cta uppercase">Guest check-in</p>
          <h2 className="mt-5 max-w-[20ch] heading-section text-balance text-subheading">
            Check-in done before the guest arrives.
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg text-pretty text-stone">
            Every hotel gets its own guest surface. Guests scan a QR code, add their details and ID on their phone, and
            land in a guest hub with everything they need for the stay.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:mt-16 lg:grid-cols-3" stagger={0.1}>
          {cards.map((c) => (
            <RevealItem key={c.title} className="h-full">
              <article className="flex h-full flex-col rounded-3xl bg-white p-7 ring-1 ring-black/[0.08] sm:p-8">
                <div
                  aria-hidden
                  className="relative h-[15rem] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_72%,transparent)]"
                >
                  {c.art}
                </div>
                <h3 className="mt-8 heading-sub text-xl text-subheading">{c.title}</h3>
                <p className="mt-3 max-w-[40ch] text-[0.95rem] text-pretty text-ink/60">{c.text}</p>
              </article>
            </RevealItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
