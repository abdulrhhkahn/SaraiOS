import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate, type BlogPost } from "@/lib/blog";
import { BlogCover } from "./BlogCover";
import { cn } from "@/lib/cn";

export function PostMeta({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone", className)}>
      <span className="font-semibold text-brass-ink">{post.category}</span>
      <span aria-hidden className="size-1 rounded-full bg-black/20" />
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden className="size-1 rounded-full bg-black/20" />
      <span>{post.readingMinutes} min read</span>
    </p>
  );
}

export function BlogCard({ post, hasImage }: { post: BlogPost; hasImage: boolean }) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="overflow-hidden rounded-3xl ring-1 ring-line">
        <BlogCover
          post={post}
          hasImage={hasImage}
          className="aspect-[16/10] transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-[1.04]"
        />
      </div>
      <PostMeta post={post} className="mt-5" />
      <h3 className="mt-2.5 text-xl leading-snug font-semibold tracking-[-0.02em] text-balance">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 leading-relaxed text-stone">{post.excerpt}</p>
      <p className="mt-4 inline-flex items-center gap-1.5 font-semibold">
        Read article
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
      </p>
    </article>
  );
}
