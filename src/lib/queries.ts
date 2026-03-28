import { createServerClient } from "@/lib/supabase/server";
import type { Article, Category, Tag } from "@/types/database";

const SITE: "guadagnosmartpro" = "guadagnosmartpro";

export function calcReadingTime(content: string | null, fallback?: number | null): number {
  if (fallback && fallback > 0) return fallback;
  const words = (content || "").replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// ─── ARTICLES ───

export async function getArticles({
  page = 1,
  limit = 12,
  categorySlug,
}: {
  page?: number;
  limit?: number;
  categorySlug?: string;
} = {}) {
  const supabase = createServerClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("articles")
    .select("*, category:categories(*)", { count: "exact" })
    .eq("site", SITE)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(from, to);

  if (categorySlug) {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("site", SITE)
      .eq("slug", categorySlug)
      .single();

    if (cat) {
      query = query.eq("category_id", cat.id);
    }
  }

  const { data, count, error } = await query;

  if (error) {
    console.error("getArticles error:", error);
    return { articles: [], totalPages: 1, total: 0 };
  }

  return {
    articles: (data as (Article & { category: Category })[]) || [],
    totalPages: Math.ceil((count || 0) / limit),
    total: count || 0,
  };
}

export async function getArticleBySlug(slug: string) {
  const supabase = createServerClient();

  const { data: article, error } = await supabase
    .from("articles")
    .select("*, category:categories(*)")
    .eq("site", SITE)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !article) return null;

  const { data: articleTags } = await supabase
    .from("article_tags")
    .select("tag_id")
    .eq("article_id", article.id);

  let tags: Tag[] = [];
  if (articleTags && articleTags.length > 0) {
    const tagIds = articleTags.map((at) => at.tag_id);
    const { data: tagsData } = await supabase
      .from("tags")
      .select("*")
      .in("id", tagIds);
    tags = (tagsData as Tag[]) || [];
  }

  return {
    ...(article as Article & { category: Category }),
    tags,
  };
}

export async function getRelatedArticles(articleId: string, categoryId: string | null, limit = 3) {
  const supabase = createServerClient();

  let query = supabase
    .from("articles")
    .select("*, category:categories(*)")
    .eq("site", SITE)
    .eq("status", "published")
    .neq("id", articleId)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  const { data } = await query;
  return (data as (Article & { category: Category })[]) || [];
}

// ─── SEARCH ───

export async function searchArticles(query: string, page = 1, limit = 12) {
  const supabase = createServerClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await supabase
    .from("articles")
    .select("*, category:categories(*)", { count: "exact" })
    .eq("site", SITE)
    .eq("status", "published")
    .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
    .order("published_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("searchArticles error:", error);
    return { articles: [], totalPages: 1, total: 0 };
  }

  return {
    articles: (data as (Article & { category: Category })[]) || [],
    totalPages: Math.ceil((count || 0) / limit),
    total: count || 0,
  };
}

// ─── CATEGORIES ───

export async function getCategories() {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("site", SITE)
    .order("name");

  if (error) {
    console.error("getCategories error:", error);
    return [];
  }

  return (data as Category[]) || [];
}

export async function getCategoriesWithCount(): Promise<{ category: Category; count: number }[]> {
  const supabase = createServerClient();

  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .eq("site", SITE)
    .order("name");

  if (error || !categories) return [];

  const results: { category: Category; count: number }[] = [];

  for (const cat of categories) {
    const { count } = await supabase
      .from("articles")
      .select("id", { count: "exact", head: true })
      .eq("site", SITE)
      .eq("status", "published")
      .eq("category_id", cat.id);

    if ((count || 0) > 0) {
      results.push({ category: cat as Category, count: count || 0 });
    }
  }

  return results;
}

export async function getCategoryBySlug(slug: string) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("site", SITE)
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data as Category;
}

// ─── UTILS ───

export async function incrementViews(articleId: string) {
  const supabase = createServerClient();
  await supabase.rpc("increment_views", { article_id: articleId });
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
