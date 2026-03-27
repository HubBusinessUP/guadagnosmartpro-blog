export type SiteId = "guadagnosmartpro" | "tradingmatematicopro";

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  author_name: string;
  author_role: string | null;
  author_bio: string | null;
  published_at: string;
  reading_time: number | null;
  site: SiteId;
  category_id: string | null;
  category?: Category;
  tags?: Tag[];
  status: "draft" | "published";
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  site: SiteId;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}
