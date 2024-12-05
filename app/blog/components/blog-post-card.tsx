'use client'

import { SelectBlog } from "@/db/schema";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatKeywords, keywordColors } from "./blog-post-content";

interface BlogPostCardProps {
  post: SelectBlog;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/post/${post.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-xl">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 line-clamp-3">{post.content?.substring(0, 150)}...</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {formatKeywords(post.keywords!).map((keyword, index) => (
              <span 
                key={index}
                className={`px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full ${keywordColors[index % keywordColors.length]}`}
              >
                {keyword.trim()}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}