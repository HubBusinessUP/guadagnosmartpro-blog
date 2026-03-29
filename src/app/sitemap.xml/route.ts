import { createServerClient } from "@/lib/supabase/server";

const SITE_URL = "https://www.guadagnosmartpro.com";

export async function GET() {
  const supabase = createServerClient();

  const { data: articles } = await supabase
    .from("articles")
    .select("slug, published_at, updated_at")
    .eq("site", "guadagnosmartpro")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const { data: categories } = await supabase
    .from("categories")
    .select("slug")
    .eq("site", "guadagnosmartpro");

  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "daily" },
    { url: "/archivio", priority: "0.8", changefreq: "daily" },
    { url: "/cerca", priority: "0.5", changefreq: "monthly" },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(p => `  <url>
    <loc>${SITE_URL}${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n")}
${(articles || []).map(a => `  <url>
    <loc>${SITE_URL}/posts/${a.slug}</loc>
    <lastmod>${(a.updated_at || a.published_at || "").slice(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join("\n")}
${(categories || []).map(c => `  <url>
    <loc>${SITE_URL}/categoria/${c.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
