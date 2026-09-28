/**
 * Building blocks for the product UI mockups. These render at a fixed design
 * size (see ScaledCanvas) so they behave like real screenshots.
 * All names, rooms and numbers are fictional demo data.
 */
import type { ReactNode } from "react";
import {
  BarChart3,
  BedDouble,
  ConciergeBell,
  Inbox,
  LayoutGrid,
  Plug,
  Settings,
  Sparkles,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/cn";

export type NavKey =
  "overview" | "concierge" | "inbox" | "requests" | "guests" | "analytics" | "integrations" | "settings";

const nav: { key: NavKey; label: string; icon: typeof Inbox }[] = [
  { key: "overview", label: "Overview", icon: LayoutGrid },
  { key: "concierge", label: "AI Concierge", icon: Sparkles },
  { key: "inbox", label: "Conversations", icon: Inbox },
  { key: "requests", label: "Requests", icon: ConciergeBell },
  { key: "guests", label: "Guests", icon: UserRound },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
  { key: "integrations", label: "Integrations", icon: Plug },
  { key: "settings", label: "Settings", icon: Settings },
];

export function AppShell({
  active,
  title,
  actions,
  children,
}: {
  active: NavKey;
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full w-full bg-[#fbfaf8] text-[13px] text-ink">
      <aside className="flex w-[216px] shrink-0 flex-col border-r border-line bg-[#f4f3ee] px-3 py-4">
        <div className="mb-6 flex items-center gap-2 px-2">
          <svg viewBox="0 0 32 32" className="size-6" aria-hidden>
            <path
              d="M24.5 9.5A11 11 0 1 0 27 16"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <circle cx="16" cy="16" r="3.4" fill="var(--iris)" />
            <circle cx="26.2" cy="11.2" r="2.6" fill="var(--brass)" />
          </svg>
          <span className="font-bold tracking-tight">SaraiOS</span>
        </div>
        <div className="mb-4 rounded-lg border border-line bg-white px-2.5 py-2">
          <p className="text-[11px] text-stone">Property</p>
          <p className="font-semibold">Demo Hotel</p>
        </div>
        <ul className="space-y-0.5">
          {nav.map(({ key, label, icon: Icon }) => (
            <li
              key={key}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-2",
                key === active ? "bg-white font-semibold shadow-[0_0_0_1px_var(--line)]" : "text-stone",
              )}
            >
              <Icon className={cn("size-4", key === active && "text-iris-ink")} />
              {label}
            </li>
          ))}
        </ul>
        <div className="mt-auto rounded-lg bg-iris-soft/70 p-3">
          <p className="flex items-center gap-1.5 font-semibold text-iris-ink">
            <Sparkles className="size-3.5" /> Sarai is active
          </p>
          <p className="mt-1 text-[11px] leading-snug text-stone">Handing off to your team when needed.</p>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-line px-6">
          <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
          <div className="flex items-center gap-3">
            {actions}
            <span className="rounded-full bg-warning-soft px-2 py-0.5 text-[10px] font-semibold text-warning">
              Demo data
            </span>
            <Avatar name="Front Desk" tone="stone" />
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

const avatarTones = {
  iris: "bg-iris-soft text-iris-ink",
  brass: "bg-brass-soft text-brass-ink",
  stone: "bg-linen-2 text-ink",
  success: "bg-success-soft text-success",
} as const;

export function Avatar({
  name,
  tone = "brass",
  size = 28,
}: {
  name: string;
  tone?: keyof typeof avatarTones;
  size?: number;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
        avatarTones[tone],
      )}
      style={{ width: size, height: size }}
    >
      {initials}
    </span>
  );
}

const pillTones = {
  ai: "bg-iris-soft text-iris-ink",
  human: "bg-brass-soft text-brass-ink",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  neutral: "bg-linen-2 text-stone",
} as const;

export type PillTone = keyof typeof pillTones;

export function Pill({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: PillTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap",
        pillTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Bubble({
  from,
  children,
  className,
}: {
  from: "guest" | "sarai" | "staff";
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex", from === "guest" ? "justify-end" : "justify-start", className)}>
      <div
        className={cn(
          "max-w-[78%] rounded-2xl px-3.5 py-2.5 leading-relaxed",
          from === "guest" && "rounded-br-md bg-ink text-linen",
          from === "sarai" && "rounded-bl-md bg-white shadow-[0_0_0_1px_var(--line)]",
          from === "staff" && "rounded-bl-md bg-brass-soft",
        )}
      >
        {from !== "guest" && (
          <p
            className={cn(
              "mb-0.5 text-[10px] font-bold tracking-wide uppercase",
              from === "sarai" ? "text-iris-ink" : "text-brass-ink",
            )}
          >
            {from === "sarai" ? "Sarai" : "Front desk"}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

export function Panel({
  title,
  children,
  className,
  aside,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  aside?: ReactNode;
}) {
  return (
    <section className={cn("rounded-xl border border-line bg-white p-4", className)}>
      {title && (
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-[12px] font-semibold tracking-wide text-stone uppercase">{title}</h4>
          {aside}
        </div>
      )}
      {children}
    </section>
  );
}

export function KeyValue({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <span className="text-stone">{k}</span>
      <span className="font-semibold">{v}</span>
    </div>
  );
}

export function RoomTag({ room }: { room: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-linen-2 px-1.5 py-0.5 text-[11px] font-semibold">
      <BedDouble className="size-3" /> {room}
    </span>
  );
}
