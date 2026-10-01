import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { buttonBase } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";

/**
 * Arrow button: a round cap sits behind the start of the label and sweeps across the whole button on
 * hover or focus while the arrow slides in. Size, shape and colours follow the regular buttons, the
 * sweep uses the existing hover tone (darker green on primary, soft green tint on secondary).
 */
const variants = {
  primary: {
    button: "bg-cta text-white shadow-[0_1px_0_rgba(255,255,255,0.14)_inset,0_8px_20px_-8px_rgba(0,120,125,0.55)]",
    sweep: "bg-cta-hover",
  },
  secondary: {
    button: "bg-card text-ink ring-1 ring-line-strong hover:ring-ink/30",
    sweep: "bg-cta/10",
  },
} as const;

/** Width of the round cap at rest = button height for each size. */
const cap = { sm: "[--cap:2.25rem]", md: "[--cap:2.75rem]", lg: "[--cap:3.25rem]" } as const;

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
  const v = variants[variant];
  return (
    <Link
      href={href}
      className={cn(buttonBase(size), "relative overflow-hidden", cap[size], v.button, className)}
      {...rest}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-0 left-0 w-(--cap) rounded-full transition-[width] duration-300 ease-out group-hover:w-full group-focus-visible:w-full",
          v.sweep,
        )}
      />
      <span className="relative">{children}</span>
      <ArrowRight
        aria-hidden
        className="relative size-4 -translate-x-[5px] transition-transform duration-300 ease-out group-hover:translate-x-0 group-focus-visible:translate-x-0"
      />
    </Link>
  );
}
