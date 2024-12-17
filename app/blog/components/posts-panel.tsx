'use client'

import { SelectBlog } from "@/db/schema";
import { BlogPostCard } from "./blog-post-card";
import { useEffect, useState, useTransition } from "react";
import { getThreeMorePosts } from "../data";
import { Loader2 } from "lucide-react";


export const PostsPanel = () => {
  const [isLoading, StartLoading] = useTransition();
  const [posts, setPosts] = useState<SelectBlog[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getThreeMorePosts(3);
      setPosts(posts);
    };
    fetchPosts();
  }, []);

  const loadMore = () => {
    const skip = posts.length;
    StartLoading(async () => {
      const moreposts = await getThreeMorePosts(3 + skip);
      setPosts([...posts, ...moreposts]);
    });
  };

  return (
    <>
      {/* <h2 className="text-2xl font-bold text-slate-800 mb-4"></h2> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
        {isLoading && <Loader2 className="animate-spin" />}
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
      <button
        onClick={loadMore}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Load more
      </button>
    </>
  );
};
