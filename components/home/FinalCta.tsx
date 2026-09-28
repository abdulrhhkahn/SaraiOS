import type { ScreenKey } from "@/lib/screenshots";
import { primaryCta, secondaryCta } from "@/lib/navigation";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations/Reveal";
import { ProductScreenshot } from "@/components/dashboard/ProductScreenshot";

export function FinalCta({
  src,
  screen = "overview",
  title = "Give every guest a smarter stay.",
  body = "Bring AI into the guest journey without taking the hospitality out of it.",
}: {
  src: string | null;
  screen?: ScreenKey;
  title?: string;
  body?: string;
}) {
  return (
    <section className="on-night relative overflow-hidden bg-night pt-24 text-linen sm:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(214,180,122,0.22),transparent)]"
      />
      <Container className="relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-4xl heading-section text-balance">{title}</h2>
          <p className="mx-auto mt-5 max-w-xl lead text-night-muted">{body}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href={primaryCta.href} size="lg" variant="light" arrow>
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={secondaryCta.href}
              size="lg"
              className="bg-white/10 text-linen ring-1 ring-white/15 hover:bg-white/15"
            >
              {secondaryCta.label}
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal className="relative mx-auto mt-16 max-w-5xl [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]">
          <ProductScreenshot screen={screen} src={src} sizes="(min-width: 1024px) 1000px, 100vw" />
        </Reveal>
      </Container>
    </section>
  );
}
