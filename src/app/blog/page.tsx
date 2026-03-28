import { redirect } from "next/navigation";

// Redirect /blog to /archivio
export default function BlogPage() {
  redirect("/archivio");
}
