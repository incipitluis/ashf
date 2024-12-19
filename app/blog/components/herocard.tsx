'use client'

import { SelectBlog } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";


interface HeroCardProps {
  post: SelectBlog;
  type: string;
}


const normalizeTitle = (title: string) => {
    if (title.includes("ASHF")) {
        return "New number released!";
    }
    return title;
}

export const HeroCard = ({ post, type }: HeroCardProps) => {
    


    if (type === "main") {
        return (
            <Link href={`/blog/post/${post.id}`}>
            <div className="relative h-96 w-46 flex flex-col items-center justify-center bg-white dark:text-white dark:bg-neutral-800 shadow-md rounded-md overflow-hidden cursor-pointer group">
                <div className="relative w-full h-full">
                    <Image src={"/davinci.webp"} alt={post.title} fill className="object-cover position-start transition-opacity duration-500 ease-in-out group-hover:opacity-50" />
                </div>
                <div className="p-4 text-center">
                    <h2 className="text-xl font-bold text-slate-800 mb-2">{normalizeTitle(post.title)}</h2>
                </div>
                <div className="absolute inset-0 flex items-center justify-center p-4 bg-white bg-opacity-75 dark:bg-neutral-800 dark:bg-opacity-75 text-center transition-opacity duration-500 ease-in-out opacity-100 md:opacity-0 group-hover:opacity-100">
                    <p className="text-slate-800 text-sm mb-4">{post.content?.substring(0, 150)}...</p>
                </div>
                </div>
            </Link>
        );
    }

if (type === "secondary") {
    return (
        <Link href={`/blog/post/${post.id}`}>
            <div className="relative h-full w-full flex flex-col items-center justify-center bg-white dark:text-white dark:bg-neutral-800 shadow-md rounded-md overflow-hidden cursor-pointer group">
                <div className="relative w-full h-full">
                    <Image src={"/galileo.webp"} alt={post.title} fill className="object-cover position-start transition-opacity duration-500 ease-in-out group-hover:opacity-50" />
                </div>
                <div className="p-4 text-center">
                    <h2 className="text-xl font-bold text-indigo-600 mb-2">{normalizeTitle(post.title)}</h2>
                </div>
                <div className="absolute inset-0 flex items-center justify-center p-4 bg-white bg-opacity-75 dark:bg-neutral-800 dark:bg-opacity-75 text-center transition-opacity duration-500 ease-in-out opacity-100 md:opacity-0 group-hover:opacity-100">
                    <p className="text-slate-800 text-sm mb-4">{post.content?.substring(0, 150)}...</p>
                </div>
                </div>
            </Link>
    );
}

if (type === "tertiary") {
    return (
        <div className={`h-full bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-slate-200 p-3 transition-transform transform hover:scale-100`}>
           <Link href={`/blog/post/${post.id}`}> 
           <h2 className="text-lg font-bold text-slate-800 mb-1">{normalizeTitle(post.title)}</h2>
           </Link>
            <p className="text-sm text-slate-600">{post.content?.substring(0, 75)}...</p>
        </div>
    );
}
}
