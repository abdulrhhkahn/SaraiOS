import { cn } from "@/lib/cn";

/**
 * Dark slate backdrop with soft Sarai-green light and faint blurred ridges, like brushed fabric.
 * Fill a positioned parent with it (`absolute inset-0`) and put the content above (`relative`).
 * Static and decorative only.
 */
const rings = Array.from({ length: 24 }, (_, i) => 40 + i * 24);

export function GreyGreenBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#39414b]", className)}
    >
      {/* studio-style light from the top left */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_18%_8%,rgba(255,255,255,0.08),transparent)]" />

      <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        <defs>
          <filter id="gg-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="48" />
          </filter>
          <filter id="gg-ridge">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
          <radialGradient id="gg-fade" cx="0.68" cy="0.64" r="0.6">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <mask id="gg-mask">
            <rect width="1200" height="800" fill="url(#gg-fade)" />
          </mask>
        </defs>

        {/* green glows where the reference has its warm ones */}
        <g filter="url(#gg-soft)">
          <ellipse cx="860" cy="570" rx="340" ry="250" fill="#00787d" opacity="0.85" />
          <ellipse cx="1020" cy="250" rx="220" ry="170" fill="#2fae9a" opacity="0.55" />
          <ellipse cx="600" cy="720" rx="270" ry="140" fill="#005a5e" opacity="0.75" />
          <ellipse cx="1140" cy="660" rx="170" ry="230" fill="#3cba8f" opacity="0.45" />
        </g>

        {/* blurred ridges */}
        <g mask="url(#gg-mask)" filter="url(#gg-ridge)" fill="none" transform="rotate(-18 830 530)">
          {rings.map((r, i) => (
            <ellipse
              key={r}
              cx="830"
              cy="530"
              rx={r}
              ry={r * 0.62}
              stroke={i % 2 ? "#c8f5e6" : "#7fdcc4"}
              strokeOpacity={i % 2 ? 0.1 : 0.14}
              strokeWidth={i % 3 === 0 ? 11 : 8}
            />
          ))}
        </g>
      </svg>

      <div className="absolute inset-0 bg-grain opacity-[0.1] mix-blend-overlay" />
    </div>
  );
}
