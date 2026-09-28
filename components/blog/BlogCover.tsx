import Image from "next/image";
import type { BlogPost } from "@/lib/blog";
import { cn } from "@/lib/cn";

const palettes: Record<BlogPost["category"], { bg: string; a: string; b: string }> = {
  "AI in Hospitality": { bg: "#1b1c20", a: "#7c7cff", b: "#d6b47a" },
  "Guest Experience": { bg: "#efe6d4", a: "#d6b47a", b: "#171717" },
  Operations: { bg: "#e9e9ff", a: "#4f4cd6", b: "#171717" },
  Product: { bg: "#f7f6f2", a: "#171717", b: "#7c7cff" },
};

function seeded(slug: string) {
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return (n: number) => ((h >> (n * 3)) % 100) / 100;
}

/**
 * Cover for a blog post. Uses `post.image` when the file exists
 * (resolved server-side and passed as `hasImage`); otherwise draws an
 * abstract "thread" composition — never a fake photograph.
 */
export function BlogCover({
  post,
  hasImage,
  className,
  priority,
  sizes = "(min-width: 1024px) 33vw, 100vw",
}: {
  post: BlogPost;
  hasImage: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (hasImage && post.image) {
    return (
      <div className={cn("relative overflow-hidden bg-linen-2", className)}>
        <Image src={post.image} alt="" fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  const p = palettes[post.category];
  const r = seeded(post.slug);
  const y1 = 30 + r(1) * 40;
  const y2 = 25 + r(2) * 50;
  const dark = post.category === "AI in Hospitality";
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ background: p.bg }} aria-hidden>
      <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        <defs>
          <radialGradient id={`g-${post.slug}`} cx={`${20 + r(3) * 60}%`} cy="40%" r="60%">
            <stop offset="0%" stopColor={p.a} stopOpacity="0.35" />
            <stop offset="100%" stopColor={p.a} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="250" fill={`url(#g-${post.slug})`} />
        <path
          d={`M -10 ${y1 * 2.5} C 120 ${y1 * 2.5 - 80}, 220 ${y2 * 2.5 + 70}, 410 ${y2 * 2.5 - 20}`}
          fill="none"
          stroke={p.a}
          strokeWidth="1.5"
          strokeDasharray="2 6"
          strokeLinecap="round"
        />
        <circle cx={60 + r(4) * 60} cy={y1 * 2.5 - 22} r="9" fill={p.b} opacity={dark ? 0.9 : 0.85} />
        <circle cx={250 + r(5) * 80} cy={y2 * 2.5 + 8} r="6" fill={p.a} />
        <rect
          x={40 + r(6) * 40}
          y={40 + r(7) * 30}
          width="120"
          height="34"
          rx="17"
          fill={dark ? "#ffffff" : "#ffffff"}
          opacity={dark ? 0.08 : 0.7}
        />
        <rect
          x={210 + r(8) * 50}
          y={160 + r(9) * 30}
          width="140"
          height="34"
          rx="17"
          fill={p.b}
          opacity={dark ? 0.2 : 0.9}
        />
      </svg>
    </div>
  );
}
