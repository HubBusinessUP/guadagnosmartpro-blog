import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import PostCard from "@/components/PostCard";
import { getCategoryBySlug, getArticles, getCategories, formatDate } from "@/lib/queries";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
  searchParams: { page?: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) return { title: "Categoria non trovata" };

  return {
    title: `${category.name} — Articoli e Guide`,
    description: category.description || `Tutti gli articoli della categoria ${category.name} su GuadagnoSmartPro.`,
    alternates: { canonical: `/categoria/${category.slug}` },
  };
}

export default async function CategoriaPage({ params, searchParams }: PageProps) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) notFound();

  const page = Number(searchParams.page) || 1;
  const { articles, totalPages } = await getArticles({
    page,
    limit: 12,
    categorySlug: params.slug,
  });

  const allCategories = await getCategories();
  const featured = articles[0];
  const restArticles = articles.slice(1);

  return (
    <>
      <Navbar />

      {/* Category Hero */}
      <div className="cat-hero">
        <div className="cat-hero-inner">
          <div className="cat-breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">›</span>
            <span>{category.name}</span>
          </div>
          <div className="cat-hero-label">Categoria</div>
          <div className="cat-hero-title">{category.name}</div>
          {category.description && (
            <div className="cat-hero-desc">{category.description}</div>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="cat-tabs-wrap">
        <div className="cat-tabs">
          <Link
            href={`/categoria/${params.slug}`}
            className="cat-tab active"
          >
            Tutti
          </Link>
          {allCategories
            .filter((c) => c.slug !== params.slug)
            .map((c) => (
              <Link key={c.slug} href={`/categoria/${c.slug}`} className="cat-tab">
                {c.name}
              </Link>
            ))}
        </div>
      </div>

      <div className="page">
        <main>
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
                  />
                )}
                <span className="featured-badge">In Evidenza</span>
                <span className="featured-new">Nuovo</span>
              </div>
              <div className="featured-body">
                <div className="featured-meta">
                  <div className="meta-avatar">
                    {featured.author?.charAt(0)?.toUpperCase() || "A"}
                  </div>
                  <span>{featured.author || "Antonio"}</span>
                  <span className="meta-dot">·</span>
                  <span>
                    {featured.published_at ? formatDate(featured.published_at) : ""}
                  </span>
                  <span className="meta-dot">·</span>
                  <span>{featured.reading_time || 5} Min</span>
                </div>
                <div className="featured-title">{featured.title}</div>
                {featured.excerpt && (
                  <p className="featured-excerpt">{featured.excerpt}</p>
                )}
                <span className="featured-readmore">Leggi l&apos;articolo →</span>
              </div>
            </Link>
          )}

          {/* Article List */}
          {restArticles.length > 0 && (
            <div className="posts">
              {restArticles.map((article, i) => (
                <PostCard
                  key={article.slug}
                  slug={article.slug}
                  title={article.title}
                  excerpt={article.excerpt}
                  categoryName={article.category?.name || category.name}
                  author={article.author || "Antonio"}
                  readingTime={article.reading_time}
                  coverImage={article.cover_image}
                  coverAlt={article.cover_alt || article.title}
                  gradientIndex={i + 1}
                />
              ))}
            </div>
          )}

          {articles.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--muted)" }}>
              <p style={{ fontSize: "16px" }}>Nessun articolo in questa categoria.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              {page > 1 && (
                <Link
                  href={`/categoria/${params.slug}?page=${page - 1}`}
                  className="page-btn"
                >
                  ‹
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/categoria/${params.slug}?page=${p}`}
                  className={`page-btn${p === page ? " active" : ""}`}
                >
                  {p}
                </Link>
              ))}
              {page < totalPages && (
                <Link
                  href={`/categoria/${params.slug}?page=${page + 1}`}
                  className="page-btn"
                >
                  ›
                </Link>
              )}
            </div>
          )}
        </main>

        <Sidebar />
      </div>

      <Footer />
    </>
  );
}
