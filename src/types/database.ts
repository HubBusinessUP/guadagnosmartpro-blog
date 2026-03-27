export type SiteId = "guadagnosmartpro" | "tradingmatematicopro";

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  cover_image: string | null;
  cover_alt: string | null;
  author: string | null;
  author_name: string;
  author_role: string | null;
  author_bio: string | null;
  published_at: string | null;
  updated_at: string | null;
  reading_time: number | null;
  views: number | null;
  site: SiteId;
  category_id: string | null;
  category?: Category;
  tags?: Tag[];
  seo_title: string | null;
  seo_description: string | null;
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
