"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { mainNav, primaryCta } from "@/lib/navigation";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the menu whenever the route changes (state adjusted during render).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-linen"
      >
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-50 pt-3">
        <Container>
          <div className="flex h-16 items-center justify-between rounded-2xl bg-page/80 pr-2 pl-4 shadow-[0_0_0_1px_var(--line),0_10px_30px_-18px_rgba(23,23,23,0.35)] backdrop-blur-xl backdrop-saturate-150 sm:pl-5">
            <Logo />

            <nav aria-label="Main" className="hidden md:block">
              <ul className="flex items-center gap-1">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "relative inline-flex min-h-11 items-center rounded-full px-4 text-[0.95rem] font-medium transition-colors duration-200",
                        isActive(item.href) ? "text-ink" : "text-stone hover:text-ink",
                      )}
                    >
                      {item.label}
                      {isActive(item.href) && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-x-4 bottom-2 h-px bg-ink"
                          transition={{ type: "spring", stiffness: 500, damping: 40 }}
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-1.5">
              <ButtonLink href={primaryCta.href} size="sm" className="max-sm:hidden sm:inline-flex md:min-h-10 md:px-5">
                {primaryCta.label}
              </ButtonLink>
              <ButtonLink href={primaryCta.href} size="sm" className="sm:hidden">
                Book Demo
              </ButtonLink>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 md:hidden"
              >
                <AnimatePresence initial={false} mode="wait">
                  <motion.span
                    key={open ? "x" : "menu"}
                    initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                  >
                    {open ? <X className="size-5" /> : <Menu className="size-5" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </Container>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
