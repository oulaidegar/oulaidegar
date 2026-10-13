"use client";

import { useState } from "react";
import Link from "next/link";
import { posts } from "@/data/posts";

export default function WritingPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  const filteredPosts = selectedTag
    ? posts.filter((p) => p.tags.includes(selectedTag))
    : posts;

  return (
    <div className="space-y-12">
      {/* Header */}
      <header className="space-y-4 pb-6 border-b border-stone-200/80 dark:border-stone-800/80">
        <h1 className="font-serif-title text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 font-normal">
          Essays & Writings
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 font-sans max-w-2xl leading-relaxed">
          Essays on democratic technology, artificial intelligence ethics, cultural embeddings, and the philosophies undergirding public digital infrastructure.
        </p>

        {/* Tag Filters (if any) */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono-meta">
            <button
              onClick={() => setSelectedTag(null)}
              className={`cursor-pointer transition-colors ${
                selectedTag === null
                  ? "text-stone-950 dark:text-white font-semibold underline underline-offset-4"
                  : "text-stone-500 hover:text-stone-900 dark:text-stone-400"
              }`}
            >
              all ({posts.length})
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`cursor-pointer transition-colors ${
                  selectedTag === tag
                    ? "text-stone-950 dark:text-white font-semibold underline underline-offset-4"
                    : "text-stone-500 hover:text-stone-900 dark:text-stone-400"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Posts List or Empty State */}
      {filteredPosts.length === 0 ? (
        <div className="py-20 text-center space-y-3 border border-dashed border-stone-200 dark:border-stone-800/80 rounded-sm">
          <p className="font-serif-title text-base sm:text-lg text-stone-700 dark:text-stone-300">
            No essays published yet.
          </p>
          <p className="text-xs font-mono-meta text-stone-400 dark:text-stone-500 max-w-sm mx-auto">
            Dispatches, research notes, and essays on AI ethics and cultural data will appear here soon.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-stone-200/60 dark:divide-stone-800/60">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="group block py-6 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                <h2 className="font-serif-title text-xl sm:text-2xl text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors font-normal">
                  {post.title}
                </h2>
                <div className="text-xs font-mono-meta text-stone-400 dark:text-stone-500 shrink-0">
                  {post.date} &bull; {post.readingTime}
                </div>
              </div>

              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-sans max-w-2xl mb-3">
                {post.summary}
              </p>

              <div className="flex flex-wrap gap-2 text-[11px] font-mono-meta text-stone-400 dark:text-stone-500">
                {post.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
