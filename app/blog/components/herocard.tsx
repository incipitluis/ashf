'use client'

import { SelectBlog } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";
import { imagesKeywordMap } from "./blog-post-card";

interface HeroCardProps {
  post: SelectBlog;
  type: string;
}

export const HeroCard = ({ post, type }: HeroCardProps) => {

    const isModerna = post.keywords?.includes("moderna");
    const isAntigua = post.keywords?.includes("antigua");
    const isMedieval = post.keywords?.includes("medieval");
    const isContemporanea = post.keywords?.includes("contemporanea");
    const isDeleuze = post.keywords?.includes("Deleuze");

    let source = "/defaultblog.jpg";
    if (isModerna) {
      source = imagesKeywordMap.moderna;
    } else if (isAntigua) {
        source = imagesKeywordMap.antigua;
      } else if (isMedieval) {
        source = imagesKeywordMap.medieval;
      } else if (isContemporanea) {
        if (isDeleuze) {
          source = imagesKeywordMap.Deleuze;
        } else {
          source = imagesKeywordMap.contemporanea;
        }
      }

    if (type === "main") {
        return (
            <div className={`h-full bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-slate-200 p-3 transition-transform transform hover:scale-100`}>
                <h2 className="text-xl font-bold text-slate-800 mb-2">{post.title}</h2>
                <p className="text-slate-600 mb-4">{post.content?.substring(0, 150)}...</p>
                <div className="relative w-full h-48 mb-4">
                    <Image
                        src={source}
                        alt={post.title}
                           fill
                        className="object-cover rounded-md"
                    />
                </div>
                <a href={`/blog/${post.id}`} className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors">
                    Read more
                </a>
            </div>
        );
    }

if (type === "secondary") {
    return (
        <div className={`h-full bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-slate-200 p-3 transition-transform transform hover:scale-100`}>
           <Link href={`/blog/${post.id}`}> 
            <h2 className="text-xl font-bold text-slate-800 mb-2">{post.title}</h2>
           </Link>
            <p className="text-base text-slate-600">{post.content?.substring(0, 100)}...</p>
            <div className="relative w-full h-36">
                <Image
                    src={source}
                    alt={post.title}
                    fill
                    className="object-cover rounded-md"
                />
            </div>
        </div>
    );
}

if (type === "tertiary") {
    return (
        <div className={`h-full bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-slate-200 p-3 transition-transform transform hover:scale-100`}>
           <Link href={`/blog/${post.id}`}> 
           <h2 className="text-lg font-bold text-slate-800 mb-1">{post.title}</h2>
           </Link>
            <p className="text-sm text-slate-600">{post.content?.substring(0, 75)}...</p>
        </div>
    );
}
}
