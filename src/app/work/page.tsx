"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";

const categories = [
  "All",
  "Democracy & Civic AI",
  "AI Ethics & Audits",
  "Creative Tech & Interfaces",
  "Cultural Data",
] as const;

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="space-y-2 pb-6 border-b border-stone-200 dark:border-stone-800">
        <h1 className="font-serif-title text-3xl text-stone-900 dark:text-stone-100">
          Selected Works & Systems
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-sans">
          Creative technology prototypes, AI ethics evaluation tools, open civic platforms for democratic deliberation, and cultural data systems.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-4 text-xs font-mono-meta">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeCategory === cat
                  ? "bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-semibold"
                  : "bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Projects List */}
      <div className="space-y-6">
        {filtered.map((project) => (
          <article
            key={project.id}
            className="p-5 rounded-md border border-stone-200 dark:border-stone-800/80 bg-[#faf9f6] dark:bg-[#121110] space-y-3 transition-colors hover:border-stone-400 dark:hover:border-stone-600"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif-title text-xl text-stone-900 dark:text-stone-100">
                    {project.title}
                  </h2>
                  <span className="text-[10px] font-mono-meta px-1.5 py-0.5 rounded bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    {project.category}
                  </span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-mono-meta mt-0.5">
                  {project.tagline}
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono-meta text-stone-500 shrink-0">
                <span>{project.year}</span>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-800 dark:text-stone-200 hover:underline flex items-center gap-0.5"
                  >
                    <span>demo</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-800 dark:text-stone-200 hover:underline flex items-center gap-0.5"
                  >
                    <span>code</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
              {project.description}
            </p>

            {project.highlights && project.highlights.length > 0 && (
              <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1 pl-4 list-disc marker:text-stone-400">
                {project.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 dark:border-stone-800/80">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono-meta px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.metrics && (
                <span className="text-[11px] font-mono-meta text-emerald-700 dark:text-emerald-400">
                  {project.metrics}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
