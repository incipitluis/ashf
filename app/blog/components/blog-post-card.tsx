'use client'

import { SelectBlog } from "@/db/schema";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Heart } from "lucide-react";

interface BlogPostCardProps {
  post: SelectBlog;
}

const imagesKeywordMap = {
  antigua: "/antigua.jpeg",
  moderna: "/moderna.jpg",
  medieval: "/medieval.jpg",
  Deleuze: "/deleuze.jpg",
  modern: "/moderna.jpg",
  contemporanea: "/defaultblog.jpg"
}

export function BlogPostCard({ post }: BlogPostCardProps) {

const isModerna = post.keywords?.includes("moderna");
const isAntigua = post.keywords?.includes("antigua");
const isMedieval = post.keywords?.includes("medieval");
const isContemporanea = post.keywords?.includes("contemporanea");
const isDeleuze = post.keywords?.includes("Deleuze");

let imageSource = "/defaultblog.jpg";
if (isModerna) {
  imageSource = imagesKeywordMap.moderna;
} else if (isAntigua) {
    imageSource = imagesKeywordMap.antigua;
  } else if (isMedieval) {
    imageSource = imagesKeywordMap.medieval;
  } else if (isContemporanea) {
    if (isDeleuze) {
      imageSource = imagesKeywordMap.Deleuze;
    } else {
      imageSource = imagesKeywordMap.contemporanea;
    }
  }

  return (
    <Link href={`/blog/post/${post.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow relative">
        <CardHeader>
            <div className="flex w-full h-24 justify-center rounded-md overflow-hidden">
                <Image src={imageSource} alt="Logo" width={300} height={200} className="object-cover" />
            </div>
          <CardTitle className="text-lg">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 line-clamp-3 mb-2">{post.content?.substring(0, 150)}...</p>
          <div className={`absolute bottom-2 right-2 flex items-center gap-1 ${post.likes && post.likes > 0 ? 'text-red-500' : 'text-gray-500'}`}>
            <Heart size={16} />
            <span className="text-sm">{post.likes || 0}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}