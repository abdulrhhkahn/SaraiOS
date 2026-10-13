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
    case "story":
      return (
        <aside className="!my-12 rounded-3xl bg-[#e4f1ee] p-6 ring-1 ring-[#005458]/10 sm:p-8">
          <p className="font-mono text-[0.8125rem] tracking-[0.08em] text-cta uppercase">{block.label}</p>
          <h3 className="!mt-3 !text-[1.35rem] !leading-snug">{block.title}</h3>
          <p className="!mt-3">{block.text}</p>
          <p className="!mt-4 rounded-2xl bg-white/70 p-4 text-[0.95rem] ring-1 ring-line">
            <strong className="text-cta">For your hotel: </strong>
            {block.takeaway}
          </p>
          <p className="!mt-4 text-sm text-stone">
            Source:{" "}
            <a href={block.source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-cta underline underline-offset-2">
              {block.source.name}
            </a>
          </p>
        </aside>
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
