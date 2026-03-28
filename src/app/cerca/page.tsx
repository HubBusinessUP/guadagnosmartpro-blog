import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import PostCard from "@/components/PostCard";
import { searchArticles } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Cerca nel blog",
  description: "Cerca articoli su GuadagnoSmartPro.",
  alternates: { canonical: "/cerca" },
};

interface CercaPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function CercaPage({ searchParams }: CercaPageProps) {
  const sp = await searchParams;
  const query = sp.q || "";
  const page = Number(sp.page) || 1;

  const hasQuery = query.trim().length > 0;
  const { articles, total } = hasQuery
    ? await searchArticles(query.trim(), page, 12)
    : { articles: [], total: 0 };

  return (
    <>
      <Navbar />

      <div className="search-hero">
        <div className="search-hero-inner">
          <h1>Cerca nel blog</h1>
          <form action="/cerca" method="GET" className="search-bar">
            <input
              type="text"
              name="q"
              placeholder="Es. Broker vs Broker, Kelly Criterion…"
              defaultValue={query}
            />
            <button type="submit">Cerca</button>
          </form>
          {hasQuery && (
            <p className="search-info">
              Risultati per: <strong>&ldquo;{query}&rdquo;</strong> — {total} articol{total === 1 ? "o" : "i"} trovat{total === 1 ? "o" : "i"}
            </p>
          )}
        </div>
      </div>

      <div className="page">
        <main className="posts">
          {hasQuery && articles.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--muted)", fontSize: "13px" }}>
              Nessun risultato per &ldquo;{query}&rdquo;. Prova con altre parole chiave.
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
        </main>

        <Sidebar />
      </div>

      <Footer />
    </>
  );
}
