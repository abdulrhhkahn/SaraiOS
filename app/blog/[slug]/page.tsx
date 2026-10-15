import { notFound } from "next/navigation";
import { formatDate, getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { publicFileExists } from "@/lib/screenshots.server";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/primitives";
import { BookDemoButton } from "@/components/demo/BookDemoLink";
import { Reveal, RevealItem, Stagger } from "@/components/animations/Reveal";
import { reveal } from "@/components/animations/variants";
import { JsonLd } from "@/components/layout/JsonLd";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { ArticleFaq } from "@/components/blog/ArticleFaq";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogCover } from "@/components/blog/BlogCover";
import { ReadingProgress } from "@/components/blog/ReadingProgress";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

/** Meta description: the first sentence of the direct answer when it fits in a search snippet, else the excerpt. */
function metaDescription(post: { answer: string; excerpt: string }) {
  const first = post.answer.split(/(?<=[.?!])\s/)[0] ?? "";
  return first.length >= 110 && first.length <= 160 ? first : post.excerpt;
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    ...pageMetadata({
      title: `${post.title} | SaraiOS`,
      description: metaDescription(post),
      path: `/blog/${post.slug}`,
      type: "article",
      image: publicFileExists(post.image) && post.image ? post.image : undefined,
    }),
    keywords: post.keywords,
    authors: [{ name: post.author.name }],
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = getRelatedPosts(post.slug);
  const hasImage = publicFileExists(post.image);
  const wordCount = [
    post.answer,
    ...post.content.map((b) =>
      b.type === "list" ? b.items.join(" ") : b.type === "story" ? `${b.title} ${b.text} ${b.takeaway}` : "text" in b ? b.text : "",
    ),
  ]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated,
    articleSection: post.category,
    keywords: post.keywords.join(", "),
    inLanguage: "en",
    wordCount,
    abstract: post.answer,
    citation: post.sources.map((src) => ({ "@type": "CreativeWork", name: src.title, url: src.url })),
    author: { "@type": "Organization", name: post.author.name, url: siteConfig.url },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: { "@type": "ImageObject", url: absoluteUrl("/icon-512.png") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/blog/${post.slug}`) },
    image: absoluteUrl(hasImage && post.image ? post.image : "/opengraph-image"),
  };

  return (
    <>
      <ReadingProgress />
      <JsonLd
        data={[
          articleLd,
          faqJsonLd(post.faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <article className="pt-36 sm:pt-44">
        <div>
          <Container className="max-w-[880px]">
            <Reveal className="text-center">
              <p className="text-sm font-semibold text-cta">{post.category}</p>
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
                <span className="text-stone">Updated {formatDate(post.updated)}</span>
                <span className="text-stone">{post.readingMinutes} min read</span>
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

        <Container className="mt-14 max-w-[720px]">
          <section aria-label="Summary" className="rounded-3xl bg-[#e4f1ee] p-6 ring-1 ring-[#005458]/10 sm:p-8">
            <p className="font-mono text-[0.8125rem] tracking-[0.08em] text-cta uppercase">In short</p>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink">{post.answer}</p>
            <h2 className="mt-6 text-base font-semibold">Key takeaways</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[0.98rem] leading-relaxed text-stone">
              {post.takeaways.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        </Container>

        <Container className="mt-12 max-w-[720px] pb-16">
          <ArticleBody post={post} />
        </Container>

        <Container className="max-w-[720px] pb-20">
          <section aria-labelledby="article-faq">
            <h2 id="article-faq" className="text-2xl font-semibold tracking-[-0.02em]">
              Frequently asked questions
            </h2>
            <div className="mt-6">
              <ArticleFaq faqs={post.faqs} />
            </div>
          </section>
          <section aria-labelledby="article-sources" className="mt-14">
            <h2 id="article-sources" className="text-lg font-semibold">
              Sources
            </h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-[0.95rem] text-stone">
              {post.sources.map((src) => (
                <li key={src.url}>
                  <a href={src.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-cta underline underline-offset-2">
                    {src.title}
                  </a>
                  , {src.publisher}
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-stone">
              Examples above come from the cited third-party sources and describe other hotels and vendors, not
              SaraiOS customers. Last updated {formatDate(post.updated)}.
            </p>
          </section>
        </Container>
      </article>

      <section className="on-night bg-cta py-20 text-linen">
        <Container className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="max-w-2xl heading-section">See what an AI-native guest experience looks like.</h2>
          <BookDemoButton variant="secondary" />
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <p className="font-mono text-[0.9375rem] tracking-[0.08em] text-cta uppercase">Keep reading</p>
          <h2 className="mt-5 heading-section text-balance text-subheading">Related articles.</h2>
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
