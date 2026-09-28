import { cn } from "@/lib/cn";

/**
 * Rotating pastel conic-gradient swirl used behind every page banner, with a
 * fade layer on top so the banner blends into the page background instead of
 * ending in a hard edge. Place inside a `relative isolate overflow-hidden`
 * section, before its content. Animation is disabled automatically for
 * prefers-reduced-motion (see globals.css).
 */
export function BannerGlow({ className }: { className?: string }) {
  return (
    <>
      <div aria-hidden className={cn("banner-glow", className)} />
      <div aria-hidden className="banner-glow-fade" />
    </>
  );
}
