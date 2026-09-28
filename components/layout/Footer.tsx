import Link from "next/link";
import { footerNav } from "@/lib/navigation";
import { siteConfig } from "@/lib/siteConfig";
import { Container } from "@/components/ui/primitives";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="on-night relative overflow-hidden bg-night text-linen">
      <Container className="pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_2fr]">
          <div className="max-w-sm">
            <Logo tone="linen" />
            <p className="mt-6 font-serif text-[1.65rem] leading-snug text-linen">{siteConfig.manifesto.join(" ")}</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="text-[0.75rem] font-semibold tracking-[0.14em] text-night-muted uppercase">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-1">
                  {group.links.map((link) =>
                    link.disabled ? (
                      <li key={link.label}>
                        {/* Social link inactive until NEXT_PUBLIC_*_URL is configured. */}
                        <span
                          className="inline-flex min-h-10 items-center text-[0.95rem] text-white/35"
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
                            className="inline-flex min-h-10 items-center text-[0.95rem] text-linen/85 transition-colors hover:text-white"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="inline-flex min-h-10 items-center text-[0.95rem] text-linen/85 transition-colors hover:text-white"
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

        <div className="mt-20 flex flex-col gap-3 border-t border-night-line pt-8 text-sm text-night-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SaraiOS. All rights reserved.</p>
          <p>{siteConfig.footerNote}</p>
        </div>
      </Container>
      <div
        aria-hidden
        className="pointer-events-none -mb-[0.2em] text-center text-[22vw] leading-none font-bold tracking-[-0.06em] text-white/[0.04] select-none before:content-['SaraiOS']"
      />
    </footer>
  );
}
