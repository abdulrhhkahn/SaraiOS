import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { publicFileExists } from "@/lib/screenshots.server";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/primitives";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealItem, Stagger } from "@/components/animations/Reveal";
import { reveal } from "@/components/animations/variants";
import { BlogCard, PostMeta } from "@/components/blog/BlogCard";
import { BlogCover } from "@/components/blog/BlogCover";

export const metadata = pageMetadata({
  title: "SaraiOS Blog — AI & Hospitality",
  description: "Perspectives on AI, hospitality operations and the future of the guest experience.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured.slug);

  return (
    <>
      <PageHero eyebrow="Blog" title="Hospitality, AI & the future of guest experience." />
      <Container className="pb-28">
        {posts.some((p) => p.placeholder) && (
          <p className="mb-10 inline-flex rounded-full bg-warning-soft px-3 py-1 text-xs font-semibold text-warning">
            Sample articles — placeholder content until editorial is published
          </p>
        )}

        <Reveal variants={reveal}>
          <article className="group relative grid overflow-hidden rounded-[2rem] bg-card ring-1 ring-line lg:grid-cols-[1.25fr_1fr]">
            <div className="overflow-hidden">
              <BlogCover
                post={featured}
                hasImage={publicFileExists(featured.image)}
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="aspect-[16/10] h-full transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-[1.03] lg:aspect-auto"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <p className="text-xs font-semibold tracking-[0.14em] text-iris-ink uppercase">Featured</p>
              <PostMeta post={featured} className="mt-4" />
              <h2 className="mt-3 heading-sub text-[clamp(2rem,3.6vw,3rem)] leading-[1.05] text-balance">
                <Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0 after:content-['']">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-4 lead text-stone">{featured.excerpt}</p>
              <p className="mt-6 inline-flex items-center gap-1.5 font-semibold">
                Read article{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </p>
            </div>
          </article>
        </Reveal>

        <h2 className="mt-24 heading-sub text-3xl">Latest articles</h2>
        <Stagger className="mt-8 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <RevealItem key={post.slug}>
              <BlogCard post={post} hasImage={publicFileExists(post.image)} />
            </RevealItem>
          ))}
        </Stagger>
      </Container>
    </>
  );
}
