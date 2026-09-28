import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/cn";

/** Minimal browser chrome. */
export function BrowserFrame({
  children,
  url = "app.saraios.com",
  className,
  chrome = true,
}: {
  children: ReactNode;
  url?: string;
  className?: string;
  chrome?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-frame)] bg-white shadow-[var(--shadow-frame)] ring-1 ring-black/[0.07]",
        className,
      )}
    >
      {chrome && (
        <div className="flex h-9 items-center gap-3 border-b border-line bg-[#f3f2ee] px-3.5 sm:h-10">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-black/15" />
            <span className="size-2.5 rounded-full bg-black/15" />
            <span className="size-2.5 rounded-full bg-black/15" />
          </div>
          <div className="mx-auto flex h-6 max-w-[60%] min-w-0 items-center gap-1.5 truncate rounded-md bg-white/80 px-3 text-[11px] text-stone ring-1 ring-line">
            <Lock className="size-3 shrink-0" aria-hidden />
            <span className="truncate">{url}</span>
          </div>
          <div className="w-10" aria-hidden />
        </div>
      )}
      {children}
    </div>
  );
}

/** Device frames for tablet and mobile presentations. */
export function DeviceFrame({
  children,
  device,
  className,
}: {
  children: ReactNode;
  device: "tablet" | "mobile";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-ink p-2.5 shadow-[var(--shadow-frame)]",
        device === "mobile" ? "rounded-[2.6rem]" : "rounded-[2rem] p-3",
        className,
      )}
    >
      <div className={cn("overflow-hidden bg-white", device === "mobile" ? "rounded-[2.1rem]" : "rounded-[1.4rem]")}>
        {children}
      </div>
    </div>
  );
}
