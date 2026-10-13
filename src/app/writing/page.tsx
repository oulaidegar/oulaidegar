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
    <div className="space-y-8">
      {/* Header */}
      <header className="space-y-2 pb-6 border-b border-stone-200 dark:border-stone-800">
        <h1 className="font-serif-title text-3xl text-stone-900 dark:text-stone-100">
          Essays & Writings
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-sans">
          Long-form thoughts on cultural embeddings, archival power, digital minimalism, and the philosophies undergirding computational systems.
        </p>

        {/* Tag Filters */}
        <div className="flex flex-wrap items-center gap-1.5 pt-3 text-xs font-mono-meta">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
              selectedTag === null
                ? "bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-semibold"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900"
            }`}
          >
            all
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                selectedTag === tag
                  ? "bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-semibold"
                  : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </header>

      {/* Posts List */}
      <div className="divide-y divide-stone-200/80 dark:divide-stone-800/80">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/writing/${post.slug}`}
            className="group block py-5 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
              <h2 className="font-serif-title text-xl text-stone-900 dark:text-stone-100 group-hover:underline underline-offset-4 decoration-stone-400">
                {post.title}
              </h2>
              <div className="text-[11px] font-mono-meta text-stone-400 dark:text-stone-500 shrink-0">
                {post.date} &bull; {post.readingTime}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-sans mb-3">
              {post.summary}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono-meta px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
