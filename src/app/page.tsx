import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import PostCard from "@/components/PostCard";
import { getArticles } from "@/lib/queries";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { articles } = await getArticles({ page: 1, limit: 10 });

  return (
    <>
      <Navbar />

      <div className="page">
        <main className="posts">
          {articles.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--muted)" }}>
              <p style={{ fontSize: "16px" }}>Nessun articolo pubblicato ancora.</p>
              <p style={{ marginTop: "8px", fontSize: "13px" }}>Torna presto per nuovi contenuti!</p>
            </div>
          )}

          {articles.map((article, i) => (
            <PostCard
              key={article.slug}
              slug={article.slug}
              title={article.title}
              excerpt={article.excerpt}
              categoryName={article.category?.name || ""}
              author={article.author || "Antony"}
              readingTime={article.reading_time}
              coverImage={article.cover_image}
              coverAlt={article.cover_alt || article.title}
              gradientIndex={i}
            />
          ))}

          {articles.length >= 10 && (
            <div className="load-wrap">
              <Link href="/archivio">
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
