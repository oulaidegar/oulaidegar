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
    <div className="space-y-12">
      {/* Header */}
      <header className="space-y-4 pb-6 border-b border-stone-200/80 dark:border-stone-800/80">
        <h1 className="font-serif-title text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 font-normal">
          Selected Works & Systems
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 font-sans max-w-2xl leading-relaxed">
          Open-source software, democratic deliberation tools, algorithmic auditing frameworks, and speculative interfaces built at the intersection of cultural data and machine learning.
        </p>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 pt-2 text-xs font-mono-meta overflow-x-auto pb-1.5 -mx-1 px-1 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1.5 rounded-sm transition-colors cursor-pointer shrink-0 sm:shrink ${
                activeCategory === cat
                  ? "bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-medium"
                  : "bg-stone-100 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Projects Editorial List */}
      <div className="space-y-10">
        {filtered.map((project) => (
          <article
            key={project.id}
            className="group space-y-3 pb-8 border-b border-stone-200/60 dark:border-stone-800/60 last:border-b-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div className="flex items-baseline gap-3">
                <h2 className="font-serif-title text-xl sm:text-2xl text-stone-900 dark:text-stone-100 font-normal group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
                  {project.title}
                </h2>
                <span className="text-[10px] font-mono-meta text-stone-400 dark:text-stone-500">
                  {project.category}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono-meta text-stone-500 shrink-0 pt-1 sm:pt-0">
                <span>{project.year}</span>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-900 dark:text-stone-100 hover:underline flex items-center gap-0.5 font-medium"
                  >
                    <span>live demo</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-900 dark:text-stone-100 hover:underline flex items-center gap-0.5 font-medium"
                  >
                    <span>source</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            <p className="text-xs font-mono-meta text-stone-500 dark:text-stone-400">
              {project.tagline}
            </p>

            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans max-w-2xl">
              {project.description}
            </p>

            {project.highlights && project.highlights.length > 0 && (
              <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1 pl-4 list-disc marker:text-stone-400 max-w-2xl">
                {project.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 text-[11px] font-mono-meta text-stone-400 dark:text-stone-500">
              <span>Stack:</span>
              {project.tags.map((tag, i) => (
                <span key={tag} className="text-stone-600 dark:text-stone-400">
                  {tag}
                  {i < project.tags.length - 1 ? "," : ""}
                </span>
              ))}
              {project.metrics && (
                <span className="ml-auto text-emerald-700 dark:text-emerald-400 text-[10px]">
                  &bull; {project.metrics}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
