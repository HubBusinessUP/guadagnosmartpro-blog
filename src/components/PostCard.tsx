import Link from "next/link";
import Image from "next/image";

interface PostCardProps {
  slug: string;
  title: string;
  excerpt: string | null;
  categoryName: string;
  author: string;
  readingTime: number | null;
  coverImage?: string | null;
  coverAlt?: string;
  gradientIndex?: number;
}

const GRADIENTS = [
  "linear-gradient(140deg, var(--c1), var(--c3), var(--c4))",
  "linear-gradient(140deg, var(--c2), var(--c4), var(--c5))",
  "linear-gradient(140deg, var(--c4), var(--c5), var(--c6))",
  "linear-gradient(140deg, var(--c1), var(--c2), var(--c3))",
  "linear-gradient(140deg, var(--c3), var(--c5), var(--c6))",
];

export default function PostCard({
  slug,
  title,
  excerpt,
  categoryName,
  author,
  readingTime,
  coverImage,
  coverAlt,
  gradientIndex = 0,
}: PostCardProps) {
  const gradient = GRADIENTS[gradientIndex % GRADIENTS.length];
  const initial = author?.charAt(0)?.toUpperCase() || "A";

  return (
    <Link href={`/posts/${slug}`} className="card">
      <div className="card-thumb" style={{ background: coverImage ? undefined : gradient }}>
        {coverImage && (
          <Image
            src={coverImage}
            alt={coverAlt || title}
            fill
            sizes="210px"
            style={{ objectFit: "cover" }}
          />
        )}
        <span className="card-badge">{categoryName}</span>
      </div>
      <div className="card-body">
        <div className="card-title">{title}</div>
        <div className="card-meta">
          <img src="/author-antony.webp" alt={author} className="meta-avatar-img" />
          <span>{author}</span>
          <span className="meta-dot">·</span>
          <span>{readingTime || 5} Min</span>
        </div>
        {excerpt && <p className="card-excerpt">{excerpt}</p>}
      </div>
    </Link>
  );
}
