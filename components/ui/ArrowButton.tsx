import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { buttonBase } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

/**
 * Button with a small drawn arrow after the label. At rest only the arrow head shows. On hover or focus the
 * shaft fades in and the head moves to the end of it, so the arrow "extends". Size, shape and colours follow
 * the regular buttons (the arrow uses the text colour).
 */
const variants = {
  primary:
    "bg-cta text-white hover:bg-cta-hover focus-visible:bg-cta-hover shadow-[0_1px_0_rgba(255,255,255,0.14)_inset,0_8px_20px_-8px_rgba(0,120,125,0.55)]",
  secondary: "bg-card text-ink ring-1 ring-line-strong hover:ring-ink/30 focus-visible:ring-ink/30",
} as const;

/** The drawn arrow after the label; reused by buttons that are not links (e.g. form submit). */
export function ArrowGlyph() {
  return (
    <span
      aria-hidden
      className="relative mt-px h-0.5 w-2.5 bg-transparent transition-colors duration-200 group-hover:bg-current group-focus-visible:bg-current"
    >
      <span className="absolute -top-[3px] right-[3px] box-border inline-block -rotate-45 border-r-2 border-b-2 border-current p-[3px] transition-[right] duration-200 group-hover:right-0 group-focus-visible:right-0" />
    </span>
  );
}

/** Class list for an arrow button, for elements other than a link. */
export function arrowButtonClass(variant: keyof typeof variants = "primary", size: "sm" | "md" | "lg" = "md") {
  return cn(buttonBase(size), variants[variant]);
}

export function ArrowButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: "sm" | "md" | "lg";
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link href={href} className={cn(buttonBase(size), variants[variant], className)} {...rest}>
      {children}
      <ArrowGlyph />
    </Link>
  );
}
