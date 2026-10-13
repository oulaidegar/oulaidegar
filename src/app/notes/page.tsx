"use client";

import { useState } from "react";
import { notes } from "@/data/notes";
import { Search } from "lucide-react";

const noteCategories = [
  "All",
  "Democracy",
  "AI Ethics",
  "Creative Tech",
  "Cultural Data",
] as const;

export default function NotesPage() {
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const [query, setQuery] = useState("");

  const filtered = notes.filter((note) => {
    const matchesCat = selectedCat === "All" || note.category === selectedCat;
    const matchesQuery =
      query === "" ||
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.content.toLowerCase().includes(query.toLowerCase()) ||
      note.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-12">
      {/* Header */}
      <header className="space-y-4 pb-6 border-b border-stone-200/80 dark:border-stone-800/80">
        <h1 className="font-serif-title text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 font-normal">
          Field Notes & Garden
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 font-sans max-w-2xl leading-relaxed">
          Atomic thoughts, civic tech reflections, AI ethics notes, and speculative marginalia maintained in a public digital garden.
        </p>

        {/* Search & Categories */}
        <div className="pt-2 space-y-3">
          <div className="relative max-w-md">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search concepts or notes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-sm text-xs font-mono-meta border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-stone-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono-meta">
            {noteCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`cursor-pointer transition-colors ${
                  selectedCat === cat
                    ? "text-stone-950 dark:text-white font-semibold underline underline-offset-4"
                    : "text-stone-500 hover:text-stone-900 dark:text-stone-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Notes Stream */}
      <div className="divide-y divide-stone-200/60 dark:divide-stone-800/60">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-stone-400 font-mono-meta text-xs">
            No notes matching your query.
          </div>
        ) : (
          filtered.map((note) => (
            <article key={note.id} className="py-7 space-y-2 max-w-2xl">
              <div className="flex items-center justify-between text-[11px] font-mono-meta text-stone-400 dark:text-stone-500">
                <span className="uppercase tracking-wider">{note.category}</span>
                <span>{note.date}</span>
              </div>

              <h2 className="text-base font-medium text-stone-900 dark:text-stone-100 font-sans">
                {note.title}
              </h2>

              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                {note.content}
              </p>

              <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono-meta text-stone-400 dark:text-stone-500">
                {note.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
