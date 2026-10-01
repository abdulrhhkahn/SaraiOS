import Link from "next/link";
import type { ReactNode } from "react";
import { footerNav, primaryCta, secondaryCta } from "@/lib/navigation";
import { siteConfig } from "@/lib/siteConfig";
import { getScreenAvailability } from "@/lib/screenshots.server";
import { Container } from "@/components/ui/primitives";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { ProductScreenshot } from "@/components/dashboard/ProductScreenshot";
import { Logo } from "./Logo";

/** Simple Icons paths (CC0). lucide-react no longer ships brand icons. */
const socialIcons: Record<string, ReactNode> = {
  LinkedIn: (
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  ),
  X: (
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  ),
  Instagram: (
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  ),
};

function SocialIcon({ name }: { name: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="size-4">
      {socialIcons[name]}
    </svg>
  );
}

const socialClass = "inline-flex size-8 items-center justify-center rounded-md text-ink transition-colors";
const linkClass = "inline-flex min-h-8 items-center text-sm text-ink/60 transition-colors hover:text-ink";

export function Footer() {
  const shots = getScreenAvailability();
  const groups = footerNav.filter((g) => g.title !== "Connect");
  const social = footerNav.find((g) => g.title === "Connect")?.links ?? [];

  return (
    <footer className="bg-page text-ink">
      {/* Closing call to action with the product underneath */}
      <section aria-labelledby="footer-cta" className="relative overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-40 -z-10 h-[520px] bg-[radial-gradient(60%_60%_at_50%_40%,var(--linen-2),transparent)]"
        />
        <Container className="text-center">
          <p className="font-mono text-[0.8125rem] tracking-[0.08em] text-cta uppercase">Get started</p>
          <h2 id="footer-cta" className="mx-auto mt-5 max-w-[16ch] heading-section text-balance text-subheading">
            Give every guest a smarter stay.
          </h2>
          <p className="mx-auto mt-5 max-w-[46ch] text-lg text-pretty text-stone">
            Bring AI into the guest journey without taking the hospitality out of it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            <ArrowButton href={primaryCta.href} size="sm">
              {primaryCta.label}
            </ArrowButton>
            <ArrowButton href={secondaryCta.href} size="sm" variant="secondary">
              {secondaryCta.label}
            </ArrowButton>
          </div>
        </Container>

        <Container className="mt-14 sm:mt-20">
          <div className="rounded-[1.75rem] bg-black/[0.03] [mask-image:linear-gradient(to_bottom,#000_58%,transparent)] p-2.5 ring-1 ring-black/[0.05] sm:p-3">
            <ProductScreenshot
              screen="overview"
              src={shots.overview}
              chrome={false}
              sizes="(min-width: 1240px) 1150px, 100vw"
            />
          </div>
        </Container>
      </section>

      {/* Links: same width as the sections and the header, inset like the header pill so the logos line up. */}
      <Container>
        <div className="border-t border-black/[0.08] px-4 pt-11 pb-8 sm:px-5">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-[1.62fr_1fr_1.5fr_1fr_1fr_0.48fr]">
            <div className="col-span-full lg:col-span-1">
              <Logo />
              <p className="mt-2 ml-[3px] text-sm text-ink/60">{siteConfig.footerTagline}</p>
            </div>
            {groups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="flex min-h-8 items-center text-sm font-medium text-ink">{group.title}</h2>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className={linkClass}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <ul className="mt-16 -ml-[5px] flex gap-2 sm:mt-24" aria-label="Social media">
            {social.map((link) => (
              <li key={link.label}>
                {link.disabled ? (
                  // Inactive until the matching NEXT_PUBLIC_*_URL is configured.
                  <span aria-label={link.label} aria-disabled="true" className={`${socialClass} opacity-35`}>
                    <SocialIcon name={link.label} />
                  </span>
                ) : (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className={`${socialClass} hover:bg-black/5`}
                  >
                    <SocialIcon name={link.label} />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container>
        <div className="border-t border-black/[0.08] px-4 py-5 text-sm text-ink/60 sm:px-5">
          <p className="ml-[3px]">© 2026 SaraiOS. All rights reserved. {siteConfig.footerNote}</p>
        </div>
      </Container>
    </footer>
  );
}
