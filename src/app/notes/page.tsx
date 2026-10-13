"use client";

import { useState } from "react";
import { notes } from "@/data/notes";
import { Search } from "lucide-react";

const noteCategories = ["All", "Reading", "Idea", "Code", "Epistemology"] as const;

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
    <div className="space-y-8">
      {/* Header */}
      <header className="space-y-2 pb-6 border-b border-stone-200 dark:border-stone-800">
        <h1 className="font-serif-title text-3xl text-stone-900 dark:text-stone-100">
          Field Notes & Garden
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-sans">
          Atomic thoughts, reading highlights, theoretical marginalia, and unfinished hypotheses maintained in a public digital garden.
        </p>

        {/* Search & Categories */}
        <div className="pt-4 space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search notes, concepts, or tags..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded text-xs font-mono-meta border border-stone-200 dark:border-stone-800 bg-[#faf9f6] dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-stone-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1 text-xs font-mono-meta">
            {noteCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                  selectedCat === cat
                    ? "bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-semibold"
                    : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Notes Stream */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-stone-400 font-mono-meta text-xs">
            No notes matching your query.
          </div>
        ) : (
          filtered.map((note) => (
            <article
              key={note.id}
              className="p-4 sm:p-5 rounded border border-stone-200/90 dark:border-stone-800/80 bg-[#faf9f6] dark:bg-[#121110] space-y-2.5 transition-colors hover:border-stone-300 dark:hover:border-stone-700"
            >
              <div className="flex items-center justify-between text-[11px] font-mono-meta text-stone-400 dark:text-stone-500">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[10px]">
                    {note.category}
                  </span>
                  <span>{note.id}</span>
                </div>
                <span>{note.date}</span>
              </div>

              <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-mono-meta">
                {note.title}
              </h2>

              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                {note.content}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono-meta text-stone-400 dark:text-stone-500"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
