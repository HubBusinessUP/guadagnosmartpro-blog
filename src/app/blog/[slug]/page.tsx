import { redirect } from "next/navigation";

// Redirect vecchi URL /blog/[slug] → /posts/[slug]
export default async function BlogSlugRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/posts/${slug}`);
}
