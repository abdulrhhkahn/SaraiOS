import type { Metadata } from "next";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { BannerGlow } from "@/components/ui/BannerGlow";
import { NotFoundChat } from "@/components/ui/NotFoundChat";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/** Branded 404 — served for any unknown route (Next.js App Router convention). */
export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden pt-40 pb-28 text-center sm:pt-48">
      <BannerGlow />
      <Container>
        <p className="text-sm font-semibold text-brass-ink">404</p>
        <h1 className="mt-4 heading-hero">This page checked out.</h1>
        <p className="mx-auto mt-5 max-w-md lead text-stone">The page you&apos;re looking for isn&apos;t available.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" size="lg">
            Back Home
          </ButtonLink>
          <ButtonLink href="/demo" size="lg" variant="secondary">
            Book a Demo
          </ButtonLink>
        </div>
        <div className="mt-16">
          <NotFoundChat />
        </div>
      </Container>
    </section>
  );
}
