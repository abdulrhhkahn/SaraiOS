import Image from "next/image";
import type { BlogPost, ContentBlock } from "@/lib/blog";
import { BlogCover } from "./BlogCover";

function Block({ block, post, index }: { block: ContentBlock; post: BlogPost; index: number }) {
  switch (block.type) {
    case "heading":
      return <h2>{block.text}</h2>;
    case "list":
      return (
        <ul>
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <figure className="!my-12 border-l-2 border-brass pl-6">
          <blockquote className="font-serif text-[clamp(1.6rem,3vw,2.1rem)] leading-snug text-ink">
            “{block.text}”
          </blockquote>
        </figure>
      );
    case "image":
      return (
        <figure className="!my-12">
          {block.src ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-line">
              <Image src={block.src} alt={block.alt} fill sizes="(min-width: 720px) 720px, 100vw" className="object-cover" />
            </div>
          ) : (
            <BlogCover
              post={{ ...post, slug: `${post.slug}-${index}` }}
              hasImage={false}
              className="aspect-[16/9] rounded-2xl ring-1 ring-line"
            />
          )}
          {block.caption && <figcaption className="mt-3 text-sm text-stone">{block.caption}</figcaption>}
        </figure>
      );
    default:
      return <p>{block.text}</p>;
  }
}

export function ArticleBody({ post }: { post: BlogPost }) {
  return (
    <div className="prose-sarai">
      {post.content.map((b, i) => (
        <Block key={i} block={b} post={post} index={i} />
      ))}
    </div>
  );
}
