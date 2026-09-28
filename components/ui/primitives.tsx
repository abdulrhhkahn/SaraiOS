import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-8", className)} {...props} />;
}

export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("relative py-24 sm:py-32", className)} {...props} />;
}

export function Eyebrow({
  children,
  className,
  tone = "iris",
}: {
  children: ReactNode;
  className?: string;
  tone?: "iris" | "brass" | "night";
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.14em] uppercase",
        tone === "iris" && "text-subheading",
        tone === "brass" && "text-brass-ink",
        tone === "night" && "text-brass",
        className,
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", tone === "iris" ? "bg-iris" : "bg-brass")} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  className,
  tone = "light",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  className?: string;
  tone?: "light" | "night";
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Eyebrow tone={tone === "night" ? "night" : "iris"} className="mb-5">
          {eyebrow}
        </Eyebrow>
      )}
      <Heading className={cn("heading-section text-balance", tone === "night" ? "text-linen" : "text-subheading")}>
        {title}
      </Heading>
      {body && (
        <p
          className={cn(
            "mt-5 max-w-[62ch] lead text-pretty",
            align === "center" && "mx-auto",
            tone === "night" ? "text-night-muted" : "text-stone",
          )}
        >
          {body}
        </p>
      )}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost" | "light";

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-cta text-white hover:bg-cta-hover shadow-[0_1px_0_rgba(255,255,255,0.14)_inset,0_8px_20px_-8px_rgba(0,120,125,0.55)]",
  secondary: "bg-card text-ink ring-1 ring-line-strong hover:ring-ink/30",
  ghost: "text-ink hover:bg-ink/5",
  light: "bg-linen text-ink hover:bg-white",
};

export function buttonClass(variant: ButtonVariant = "primary", size: "md" | "lg" | "sm" = "md") {
  return cn(
    "group inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap",
    "transition-[background-color,box-shadow,transform,color] duration-200 ease-out active:scale-[0.97]",
    "disabled:pointer-events-none disabled:opacity-60",
    size === "sm" && "min-h-9 px-4 text-sm",
    size === "md" && "px-5 text-[0.95rem]",
    size === "lg" && "min-h-13 px-7 text-base",
    buttonStyles[variant],
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "md" | "lg" | "sm";
  arrow?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link href={href} className={cn(buttonClass(variant, size), className)} {...rest}>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
        />
      )}
    </Link>
  );
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink underline-offset-4 hover:underline",
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}

export function DemoTag({ className, children = "Demo data" }: { className?: string; children?: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-warning-soft px-2 py-0.5 text-[0.65rem] font-semibold text-warning",
        className,
      )}
    >
      {children}
    </span>
  );
}
