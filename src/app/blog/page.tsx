import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import PostCard from "@/components/PostCard";
import { getArticles } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Blog — Tutti gli articoli",
  description:
    "Articoli su guadagno online, trading matematico, affitti brevi, business locale e tool verificati.",
  alternates: { canonical: "/blog" },
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  const { articles, totalPages } = await getArticles({ page, limit: 12 });

  return (
    <>
      <Navbar />

      <div className="page">
        <main>
          <div className="posts">
            {articles.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--muted)" }}>
                <p style={{ fontSize: "16px" }}>Nessun articolo pubblicato ancora.</p>
              </div>
            )}

            {articles.map((article, i) => (
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
                gradientIndex={i}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              {page > 1 && (
                <Link href={`/blog?page=${page - 1}`} className="page-btn">
                  ‹
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/blog?page=${p}`}
                  className={`page-btn${p === page ? " active" : ""}`}
                >
                  {p}
                </Link>
              ))}
              {page < totalPages && (
                <Link href={`/blog?page=${page + 1}`} className="page-btn">
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
