import { HeroBlog } from "./components/hero-blog";
import HeroImageBlog from "./components/heroimageblog";
import { PostsPanel } from "./components/posts-panel";
import { getMostRecentPosts } from "./data";

export default async function BlogPage() {
  const recentPosts = await getMostRecentPosts();

  return (
    <div className="container mx-auto py-4">
      <HeroImageBlog />
      <div className="hidden md:block">
      <HeroBlog recentPosts={recentPosts} />
      </div>
      <PostsPanel/>
    </div>
  );
}