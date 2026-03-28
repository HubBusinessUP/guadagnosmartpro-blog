import { createServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { categorySlug, ...body } = await req.json();
  const supabase = createServerClient();

  if (categorySlug) {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("site", "guadagnosmartpro")
      .eq("slug", categorySlug)
      .single();
    if (cat) body.category_id = cat.id;
  }

  const { data, error } = await supabase
    .from("articles")
    .insert({ site: "guadagnosmartpro", ...body })
    .select("id, slug, title, category_id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, data });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const supabase = createServerClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
