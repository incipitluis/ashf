import { notFound } from "next/navigation";
import { getBlogPostById } from "../../data";
import BlogPostContent from "../../components/blog-post-content";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await getBlogPostById(resolvedParams.id);

  if (!post) {
    notFound();
  }

  

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <BlogPostContent {...post} />
    </div>
  );
}