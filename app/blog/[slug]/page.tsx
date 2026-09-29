import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { formatDate, getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { publicFileExists } from "@/lib/screenshots.server";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { BannerGlow } from "@/components/ui/BannerGlow";
import { Reveal, RevealItem, Stagger } from "@/components/animations/Reveal";
import { reveal } from "@/components/animations/variants";
import { JsonLd } from "@/components/layout/JsonLd";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogCover } from "@/components/blog/BlogCover";
import { ReadingProgress } from "@/components/blog/ReadingProgress";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: `${post.title} | SaraiOS Blog`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = getRelatedPosts(post.slug);
  const hasImage = publicFileExists(post.image);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author.name },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    ...(hasImage && post.image ? { image: absoluteUrl(post.image) } : {}),
  };

  return (
    <>
      <ReadingProgress />
      <JsonLd
        data={[
          articleLd,
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <article className="pt-36 sm:pt-44">
        <div className="relative isolate overflow-hidden">
          <BannerGlow />
          <Container className="max-w-[880px]">
            <nav aria-label="Breadcrumb" className="flex justify-center">
              <ol className="flex flex-wrap items-center justify-center gap-1.5 text-sm text-stone">
                <li>
                  <Link href="/" className="hover:text-ink">
                    Home
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="size-3.5" />
                </li>
                <li>
                  <Link href="/blog" className="hover:text-ink">
                    Blog
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="size-3.5" />
                </li>
                <li aria-current="page" className="max-w-[40ch] truncate text-ink">
                  {post.title}
                </li>
              </ol>
            </nav>
            <Reveal className="text-center">
              <p className="mt-10 text-sm font-semibold text-brass-ink">{post.category}</p>
              <h1 className="mt-4 heading-hero text-balance">{post.title}</h1>
              <p className="mt-6 lead text-stone">{post.excerpt}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-y border-line py-4 text-sm">
                <span>
                  <span className="text-stone">By </span>
                  <span className="font-semibold">{post.author.name}</span>
                </span>
                <time dateTime={post.date} className="text-stone">
                  {formatDate(post.date)}
                </time>
                <span className="text-stone">{post.readingMinutes} min read</span>
                {post.placeholder && (
                  <span className="rounded-full bg-warning-soft px-2.5 py-0.5 text-xs font-semibold text-warning">
                    Placeholder article
                  </span>
                )}
              </div>
            </Reveal>
          </Container>
        </div>

        <Container className="mt-12 max-w-[1100px]">
          <Reveal variants={reveal}>
            <BlogCover
              post={post}
              hasImage={hasImage}
              priority
              sizes="(min-width: 1100px) 1100px, 100vw"
              className="aspect-[16/8] rounded-[1.5rem]"
            />
          </Reveal>
        </Container>

        <Container className="mt-14 max-w-[720px] pb-20">
          <ArticleBody post={post} />
        </Container>
      </article>

      <section className="on-night bg-night py-20 text-linen">
        <Container className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="max-w-2xl heading-section">See what an AI-native guest experience looks like.</h2>
          <ButtonLink href="/demo" size="lg" variant="light" arrow>
            Book a Demo
          </ButtonLink>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <h2 className="heading-sub text-3xl">Related articles</h2>
          <Stagger className="mt-8 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <RevealItem key={p.slug}>
                <BlogCard post={p} hasImage={publicFileExists(p.image)} />
              </RevealItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
