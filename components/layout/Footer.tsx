import Link from "next/link";
import { footerNav } from "@/lib/navigation";
import { siteConfig } from "@/lib/siteConfig";
import { Container } from "@/components/ui/primitives";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="on-green relative overflow-hidden bg-cta text-white">
      <Container className="pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_2fr]">
          <div className="max-w-sm">
            <Logo tone="linen" />
            <p className="mt-6 heading-sub text-[0.95rem] leading-snug text-white">{siteConfig.footerTagline}</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="text-[0.75rem] font-semibold tracking-[0.14em] text-white/90 uppercase">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-1">
                  {group.links.map((link) =>
                    link.disabled ? (
                      <li key={link.label}>
                        {/* Social link inactive until NEXT_PUBLIC_*_URL is configured. */}
                        <span
                          className="inline-flex min-h-10 items-center text-[0.95rem] text-white/60"
                          aria-disabled="true"
                        >
                          {link.label}
                        </span>
                      </li>
                    ) : (
                      <li key={link.label}>
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-10 items-center text-[0.95rem] text-white transition-colors hover:text-white/80"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="inline-flex min-h-10 items-center text-[0.95rem] text-white transition-colors hover:text-white/80"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-white/25 pt-8 text-sm text-white/90 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SaraiOS. All rights reserved.</p>
          <p>{siteConfig.footerNote}</p>
        </div>
      </Container>
      <div
        aria-hidden
        className="pointer-events-none -mb-[0.2em] text-center text-[22vw] leading-none font-bold tracking-[-0.06em] text-white/[0.08] select-none before:content-['SaraiOS']"
      />
    </footer>
  );
}
