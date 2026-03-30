import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import ShareBar from "@/components/ShareBar";
import { getArticleBySlug, getRelatedArticles, formatDate } from "@/lib/queries";
import { notFound } from "next/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.guadagnosmartpro.com";
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Articolo non trovato" };

  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.excerpt || "",
    alternates: { canonical: `/posts/${article.slug}` },
    openGraph: {
      title: article.seo_title || article.title,
      description: article.seo_description || article.excerpt || "",
      type: "article",
      publishedTime: article.published_at || undefined,
      images: article.cover_image ? [{ url: article.cover_image }] : undefined,
    },
  };
}
export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article.id, article.category_id);
  const wordCount = (article.content || "").replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  const postUrl = `${SITE_URL}/posts/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt || "",
    url: postUrl,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: { "@type": "Person", name: "Antony", url: "https://t.me/caliblackk" },
    publisher: {
      "@type": "Organization",
      name: "GuadagnoSmartPro",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/og-default.png` },
    },
    image: article.cover_image || `${SITE_URL}/og-default.png`,
  };
  // Extract FAQ from H2 + following paragraph for FAQPage schema (AI Search SEO)
  const faqItems: { question: string; answer: string }[] = [];
  const h2Regex = /<h2[^>]*>(.*?)<\/h2>\s*<p[^>]*>(.*?)<\/p>/gi;
  let faqMatch;
  const htmlContent = article.content || "";
  while ((faqMatch = h2Regex.exec(htmlContent)) !== null) {
    const q = faqMatch[1].replace(/<[^>]*>/g, "").trim();
    const a = faqMatch[2].replace(/<[^>]*>/g, "").trim();
    if (q && a) faqItems.push({ question: q, answer: a });
  }
  const faqJsonLd = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Navbar />

      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">›</span>
        {article.category && (
          <>
            <Link href={`/categoria/${article.category.slug}`}>{article.category.name}</Link>
            <span className="sep">›</span>
          </>
        )}
        <span>{article.title}</span>
      </div>

      <div className="page">
        <main>
          <div className="post-hero">
            {article.cover_image && (
              <Image
                src={article.cover_image}
                alt={article.cover_alt || article.title}
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
                priority
              />
            )}
            {article.category && <span className="hero-badge">{article.category.name}</span>}
          </div>

          <article>
            <div className="post-content">
              <h1 className="post-title">{article.title}</h1>

              <div className="post-meta-bar">
                <a href="https://t.me/caliblackk" target="_blank" rel="noopener noreferrer" className="meta-author">
                  <img src="/author-antony.webp" alt="Antony" className="author-avatar-img" />
                  <div>
                    <div className="author-name">{"Antony"}</div>
                    <div className="author-role">GuadagnoSmartPro</div>
                  </div>
                </a>
                <div className="meta-divider"></div>
                <div className="meta-item">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  {article.published_at ? formatDate(article.published_at) : "—"}
                </div>
                <div className="meta-item">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  {readingTime} Min
                </div>
                <div className="meta-item">
                  <svg viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  {article.views || 0}
                </div>
                <ShareBar url={postUrl} title={article.title} />
              </div>

              <div
                className="post-body"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {article.tags && article.tags.length > 0 && (
                <div className="post-tags">
                  {article.tags.map((tag) => (
                    <Link key={tag.id} href={`/tag/${tag.slug}`} className="tag">
                      {tag.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <a href="https://t.me/caliblackk" target="_blank" rel="noopener noreferrer" className="author-box">
              <img src="/author-antony.webp" alt="Antony" className="author-box-avatar-img" />
              <div>
                <div className="author-box-name">{"Antony"}</div>
                <div className="author-box-role">Fondatore &middot; GuadagnoSmartPro</div>
                <div className="author-box-bio">
                  Creo Ecosistemi digitali che generano entrate | Trading Matematico | AI &amp; Automazioni | Affiliate Marketing
                </div>
              </div>
            </a>

            {related.length > 0 && (
              <div className="related">
                <h3>
                  <span className="slash">//</span> Articoli Correlati
                </h3>
                <div className="related-grid">
                  {related.map((rel) => (
                    <Link key={rel.slug} href={`/posts/${rel.slug}`} className="rel-card">
                      <div className="rel-thumb">
                        {rel.cover_image ? (
                          <Image
                            src={rel.cover_image}
                            alt={rel.cover_alt || rel.title}
                            width={400}
                            height={100}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : null}
                      </div>
                      <div className="rel-body">
                        <div className="rel-badge">{rel.category?.name || ""}</div>
                        <div className="rel-title">{rel.title}</div>
                        <div className="rel-date">
                          {rel.published_at ? formatDate(rel.published_at) : ""}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </main>

        <Sidebar />
      </div>

      <Footer />
    </>
  );
}
