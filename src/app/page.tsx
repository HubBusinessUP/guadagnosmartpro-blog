import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import PostCard from "@/components/PostCard";
import { getArticles, formatDate } from "@/lib/queries";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { articles } = await getArticles({ page: 1, limit: 10 });
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <>
      <Navbar />

      <div className="page">
        <main>
          {articles.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--muted)" }}>
              <p style={{ fontSize: "16px" }}>Nessun articolo pubblicato ancora.</p>
              <p style={{ marginTop: "8px", fontSize: "13px" }}>Torna presto per nuovi contenuti!</p>
            </div>
          )}

          {/* Featured Article */}
          {featured && (
            <Link href={`/posts/${featured.slug}`} className="featured-card">
              <div className="featured-thumb">
                {featured.cover_image && (
                  <Image
                    src={featured.cover_image}
                    alt={featured.cover_alt || featured.title}
                    fill
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                )}
                {featured.category && (
                  <span className="featured-badge">{featured.category.name}</span>
                )}
                <span className="featured-new">Nuovo</span>
              </div>
              <div className="featured-body">
                <div className="featured-meta">
                  <div className="meta-avatar">
                    {featured.author?.charAt(0)?.toUpperCase() || "A"}
                  </div>
                  <span>{featured.author || "Antonio"}</span>
                  <span className="meta-dot">&middot;</span>
                  <span>
                    {featured.published_at ? formatDate(featured.published_at) : ""}
                  </span>
                  <span className="meta-dot">&middot;</span>
                  <span>{featured.reading_time || 5} Min</span>
                </div>
                <div className="featured-title">{featured.title}</div>
                {featured.excerpt && (
                  <p className="featured-excerpt">{featured.excerpt}</p>
                )}
                <span className="featured-readmore">Leggi l&apos;articolo &rarr;</span>
              </div>
            </Link>
          )}

          {/* Rest of Articles */}
          {rest.length > 0 && (
            <div className="posts">
              {rest.map((article, i) => (
                <PostCard
                  key={article.slug}
                  slug={article.slug}
                  title={article.title}
                  excerpt={article.excerpt}
                  categoryName={article.category?.name || ""}
                  author={article.author || "Antonio"}
                  readingTime={article.reading_time}
                  coverImage={article.cover_image}
                  coverAlt={article.cover_alt || article.title}
                  gradientIndex={i + 1}
                />
              ))}
            </div>
          )}

          {articles.length >= 10 && (
            <div className="load-wrap">
              <Link href="/blog">
                <button className="btn-more">Carica altri articoli</button>
              </Link>
            </div>
          )}
        </main>

        <Sidebar />
      </div>

      <Footer />
    </>
  );
}
