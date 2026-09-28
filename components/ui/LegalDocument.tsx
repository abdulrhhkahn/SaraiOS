import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import type { LegalDoc } from "@/lib/legal";
import { Container } from "./primitives";
import { BannerGlow } from "./BannerGlow";

export function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <div className="pt-36 pb-28 sm:pt-44">
      <section className="relative isolate overflow-hidden">
        <BannerGlow />
        <Container className="mb-14 text-center">
          <h1 className="heading-hero">{doc.title}</h1>
          <p className="mt-4 text-stone">Last updated: {doc.lastUpdated}</p>
        </Container>
      </section>
      <Container className="grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-semibold tracking-[0.14em] text-stone uppercase">On this page</p>
          <ul className="mt-4 hidden space-y-1 text-sm lg:block">
            {doc.sections.map((s) => (
              <li key={s.id}>
                <Link href={`#${s.id}`} className="inline-flex min-h-8 items-center text-stone hover:text-ink">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <article className="max-w-[720px]">
          <div role="note" className="flex gap-3 rounded-2xl bg-warning-soft p-5 text-[0.95rem] text-[#6b4a0c]">
            <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden />
            <p>
              <strong>Content requires legal review before production.</strong> This page is a structural placeholder
              and does not constitute legal advice or a binding policy.
            </p>
          </div>
          <div className="prose-sarai mt-10">
            <p>{doc.intro}</p>
            {doc.sections.map((s, i) => (
              <section key={s.id} aria-labelledby={s.id}>
                <h2 id={s.id} className="scroll-mt-28">
                  {i + 1}. {s.title}
                </h2>
                {s.body.map((p, j) => (
                  <p key={j} className={p.startsWith("[") ? "mt-3 text-stone italic" : "mt-3"}>
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </Container>
    </div>
  );
}
