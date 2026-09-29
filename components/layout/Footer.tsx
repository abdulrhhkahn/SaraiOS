import Image from "next/image";
import Link from "next/link";
import { footerNav, primaryCta, secondaryCta } from "@/lib/navigation";
import { siteConfig } from "@/lib/siteConfig";
import { publicFileExists } from "@/lib/screenshots.server";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { Logo } from "./Logo";
import { LobbyArt } from "./LobbyArt";

/** Drop a hotel photo here (JPG, ~2400px wide) and it replaces the illustration automatically. */
const HOTEL_PHOTO = "/images/footer/hotel.jpg";

const linkClass = "inline-flex min-h-10 items-center text-[0.95rem] text-white transition-colors hover:text-white/80";

export function Footer() {
  const hasPhoto = publicFileExists(HOTEL_PHOTO);

  return (
    <footer className="on-green relative overflow-hidden bg-cta text-white">
      {/* Image banner with the closing call to action */}
      <Container className="pt-10 sm:pt-14">
        <div className="relative isolate flex min-h-[420px] items-end overflow-hidden rounded-[1.75rem] sm:min-h-[500px] sm:rounded-[2.25rem]">
          {hasPhoto ? (
            <Image
              src={HOTEL_PHOTO}
              alt=""
              fill
              quality={80}
              sizes="(min-width: 1240px) 1176px, 100vw"
              className="object-cover"
            />
          ) : (
            <LobbyArt />
          )}
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,18,20,0.88),rgba(17,18,20,0.55)_50%,rgba(17,18,20,0.08)),linear-gradient(to_top,rgba(17,18,20,0.5),transparent_55%)]"
          />
          <div className="relative z-10 max-w-2xl p-7 sm:p-12">
            <h2 className="heading-section text-balance">Give every guest a smarter stay.</h2>
            <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-white/90">
              Bring AI into the guest journey without taking the hospitality out of it.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <ButtonLink href={primaryCta.href} size="sm" variant="light" arrow>
                {primaryCta.label}
              </ButtonLink>
              <ButtonLink
                href={secondaryCta.href}
                size="sm"
                className="bg-white/15 text-white ring-1 ring-white/35 backdrop-blur hover:bg-white/25"
              >
                {secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>

      <Container className="pt-16 pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_2fr]">
          <div className="max-w-sm">
            <Logo tone="linen" />
            <p className="mt-5 text-[0.95rem] text-white/90">{siteConfig.footerTagline}</p>
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
                          <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                            {link.label}
                          </a>
                        ) : (
                          <Link href={link.href} className={linkClass}>
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

        <div className="mt-16 flex flex-col gap-3 border-t border-white/25 pt-8 text-sm text-white/90 sm:flex-row sm:items-center sm:justify-between">
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
