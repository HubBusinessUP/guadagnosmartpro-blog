import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });
  const { data, error } = await supabase
    .from("articles")
    .select("id, slug, content")
    .eq("slug", slug)
    .eq("site", "guadagnosmartpro")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { slug, content } = await req.json();
  if (!slug || !content) return NextResponse.json({ error: "slug and content required" }, { status: 400 });
  const { data, error } = await supabase
    .from("articles")
    .update({ content })
    .eq("slug", slug)
    .eq("site", "guadagnosmartpro")
    .select("id, slug")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, data });
}