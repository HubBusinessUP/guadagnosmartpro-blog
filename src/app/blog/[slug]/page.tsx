import { redirect } from "next/navigation";

// Redirect vecchi URL /blog/[slug] → /posts/[slug]
export default function BlogSlugRedirect({ params }: { params: { slug: string } }) {
  redirect(`/posts/${params.slug}`);
}
