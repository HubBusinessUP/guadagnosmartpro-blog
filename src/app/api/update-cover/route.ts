import { createServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { slug, cover_image, cover_alt } = await req.json();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("articles")
    .update({ cover_image, cover_alt })
    .eq("slug", slug)
    .eq("site", "guadagnosmartpro")
    .select("id, slug, cover_image")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, data });
}
