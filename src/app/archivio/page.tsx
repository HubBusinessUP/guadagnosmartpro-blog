import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getArticles, formatDate } from "@/lib/queries";

const GRADIENTS = [
  "linear-gradient(140deg, var(--c1), var(--c3), var(--c4))",
  "linear-gradient(140deg, var(--c2), var(--c4), var(--c5))",
  "linear-gradient(140deg, var(--c4), var(--c5), var(--c6))",
  "linear-gradient(140deg, var(--c1), var(--c4), var(--c6))",
  "linear-gradient(140deg, var(--c3), var(--c5), var(--c6))",
  "linear-gradient(140deg, var(--c2), var(--c3), var(--c5))",
];

export const metadata: Metadata = {
  title: "Archivio — Tutti gli articoli",
  description: "Tutti gli articoli pubblicati su GuadagnoSmartPro. Business online, trading, finanza personale.",
  alternates: { canonical: "/archivio" },
};

interface ArchivioPageProps {
  searchParams: Promise<{ page?: string; sort?: string }>;
}

export default async function ArchivioPage({ searchParams }: ArchivioPageProps) {
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  const { articles, totalPages } = await getArticles({ page, limit: 12 });

  return (
    <>
      <Navbar />

      <div className="archive-header">
        <div className="archive-title">Tutti gli Articoli</div>
        <div className="archive-sort">
          <span className="sort-btn active">Recenti</span>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "20px auto 0", padding: "0 20px" }}>
        <div className="archive-grid">
          {articles.map((article, i) => (
            <Link key={article.slug} href={`/posts/${article.slug}`} className="archive-card">
              <div
                className="archive-thumb"
                style={{ background: article.cover_image ? undefined : GRADIENTS[i % GRADIENTS.length] }}
              >
                {article.cover_image && (
                  <Image
                    src={article.cover_image}
                    alt={article.cover_alt || article.title}
                    fill
                    sizes="(max-width:640px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                )}
                {article.category && (
                  <span className="archive-badge">{article.category.name}</span>
                )}
              </div>
              <div className="archive-body">
                <div className="archive-title-txt">{article.title}</div>
                <div className="archive-meta">
                  <img src="/author-antony.webp" alt="Antony" className="meta-avatar-img" />
                  <span>{article.author || "Antony"}</span>
                  <span className="meta-dot">·</span>
                  <span>{article.published_at ? formatDate(article.published_at) : ""}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {articles.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--muted)" }}>
            <p style={{ fontSize: "16px" }}>Nessun articolo pubblicato ancora.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination" style={{ marginTop: 28 }}>
            {page > 1 && (
              <Link href={`/archivio?page=${page - 1}`} className="page-btn">‹</Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/archivio?page=${p}`}
                className={`page-btn${p === page ? " active" : ""}`}
              >
                {p}
              </Link>
            ))}
            {page < totalPages && (
              <Link href={`/archivio?page=${page + 1}`} className="page-btn">›</Link>
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
