import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { buttonBase } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

/**
 * Button with a circled arrow after the label. On hover or focus the arrow slides 5px to the right and
 * the background moves to the hover tone. Size, shape and colours follow the regular buttons.
 */
const variants = {
  primary:
    "bg-cta text-white hover:bg-cta-hover focus-visible:bg-cta-hover shadow-[0_1px_0_rgba(255,255,255,0.14)_inset,0_8px_20px_-8px_rgba(0,120,125,0.55)]",
  secondary: "bg-card text-ink ring-1 ring-line-strong hover:ring-ink/30 focus-visible:ring-ink/30",
} as const;

/** Icon size per button size; can be overridden with e.g. `md:[--icon:1.5rem]`. */
const icon = { sm: "[--icon:1.75rem]", md: "[--icon:1.75rem]", lg: "[--icon:2rem]" } as const;

function CircleArrow({ className }: { className?: string }) {
  return (
    <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 74 74" className={className}>
      <circle strokeWidth={3} stroke="currentColor" r="35.5" cy={37} cx={37} />
      <path
        fill="currentColor"
        d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
      />
    </svg>
  );
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
    <Link
      href={href}
      className={cn(buttonBase(size), "gap-2.5 pr-3", icon[size], variants[variant], className)}
      {...rest}
    >
      {children}
      <CircleArrow className="size-(--icon) shrink-0 transition-transform duration-300 ease-in-out group-hover:translate-x-[5px] group-focus-visible:translate-x-[5px]" />
    </Link>
  );
}
