"use client";

import { SelectBlog } from "@/db/schema";
import Image from "next/image";
import { splitContentInThree } from "../utils/format-content";
import { incrementLikes } from "../actions";
import { BookOpen, Heart } from "lucide-react";

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export const formatKeywords = (keywords: string) => {
    return keywords.split(',').map(keyword => keyword.replace(/[{}""*()]/g, '').trim());
}

export const keywordColors = [
    "bg-blue-200",
    "bg-green-200",
    "bg-red-200",
    "bg-purple-200",
    "bg-yellow-200"
];


export default function BlogPostContent(post: SelectBlog) {
    const contentFragments = splitContentInThree(post.content!);

    const firstFragment = contentFragments[0];
    const secondFragment = contentFragments[1];
    const thirdFragment = contentFragments[2];

    return(
        <article className="container mx-auto px-4 max-w-4xl">
             {post.keywords && (
            <div className="bg-gray-50 rounded-2xl px-8 mb-4">
                <div className="flex flex-wrap gap-2 justify-end">
                    {formatKeywords(post.keywords).map((keyword, index) => (
                        <span 
                            key={index}
                            className={`px-2 py-1 ${keywordColors[index % keywordColors.length]} border border-gray-200 text-gray-700 rounded-full text-sm opacity-80 hover:opacity-100 hover:bg-gray-50 hover:border-gray-300 transition-all`}
                        >
                            {keyword}
                        </span>
                    ))}
                </div>
            </div>
        )}
        {/* Header Section */}
        <header className="mb-12">
          {post.image && (
            <div className="relative w-full h-[400px] mb-8 rounded-2xl overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          <div className="flex items-center justify-between text-gray-600">
            <div className="flex items-center gap-4">
              <span className="text-sm">By {post.author}, {formatDate(post.createdAt!)}</span>
              <div className="flex items-center gap-2" onClick={() => incrementLikes(post.id, "/blog/post/" + post.id)}>
                {(post.likes ?? 0) > 0 ? (
                  <Heart className="h-5 w-5 text-red-500" />
                ) : (
                  <Heart className="h-5 w-5 text-gray-500" />
                )}
                <span className="text-sm">{post.likes ?? 0}</span>
              </div>
            </div>
            
            {post.url && (
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <BookOpen className="h-5 w-5" />
                <span className="text-sm">Read the Paper</span>
              </a>
            )}
          </div>
        </header>
        {/* First Fragment */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600">
                {firstFragment}
            </div>
        </div>

        {/* Middle Section with Important Fragment and Second Fragment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Important Fragment */}
            {post.importantFragment && (
                <div className="bg-blue-50 rounded-2xl p-8 flex items-center">
                    <blockquote className="text-2xl font-serif text-blue-800 italic border-l-4 border-blue-300 pl-6">
                        &ldquo;{post.importantFragment}&rdquo;
                    </blockquote>
                </div>
            )}

            {/* Second Fragment */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
                <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600">
                    {secondFragment}
                </div>
            </div>
        </div>

        {/* Third Fragment */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600">
                {thirdFragment}
            </div>
        </div>

        {/* Call to Action - Read Paper */}
        {post.url && (
            <div className="text-center">
                <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
                >
                    <BookOpen className="h-5 w-5" />
                    Read the Full Paper
                </a>
            </div>
        )}
        </article>
    )
}