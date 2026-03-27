import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import ShareBar from "@/components/ShareBar";
import PostCard from "@/components/PostCard";
import { getArticleBySlug, getRelatedArticles, formatDate } from "@/lib/queries";
import { notFound } from "next/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.guadagnosmartpro.com";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
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
