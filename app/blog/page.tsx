import { BlogPostCard } from "./components/blog-post-card";
import { getBlogPosts } from "./data";


export default async function BlogPage() {
  const posts = await getBlogPosts();
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))} 
      </div>
    </div>
  );
}
