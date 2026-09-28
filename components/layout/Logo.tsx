import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

/** Mark: the SaraiOS "S" — reads the same on light or dark backgrounds. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/images/icons/logo-mark.png"
      alt=""
      aria-hidden
      width={256}
      height={256}
      className={cn("size-7", className)}
    />
  );
}

export function Logo({ tone = "ink", className }: { tone?: "ink" | "linen"; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="SaraiOS home"
      className={cn("inline-flex min-h-11 items-center gap-2.5 rounded-lg", className)}
    >
      <LogoMark />
      {tone === "ink" ? (
        <span className="text-[1.15rem] font-bold tracking-[-0.03em] text-stone">SaraiOS</span>
      ) : (
        <span className="text-[1.15rem] font-bold tracking-[-0.03em] text-linen">
          Sarai<span className="text-night-muted">OS</span>
        </span>
      )}
    </Link>
  );
}
