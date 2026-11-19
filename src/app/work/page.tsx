import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";
import StatusMark from "@/components/StatusMark";

export const metadata: Metadata = {
  title: "Built",
  description:
    "Civic tools, public-interest platforms and experiments in attention, built independently.",
};

export default function WorkPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="label text-stone-500 dark:text-stone-400">
          Register &middot; {projects.length} entries
        </div>
        <h1 className="font-serif-title text-4xl sm:text-5xl text-stone-900 dark:text-stone-100 font-normal tracking-tight">
          Built
        </h1>
        <div className="rule-double" />
        <p className="text-[15px] text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed pt-2">
          Things I design and build on my own: civic infrastructure for the Middle East,
          research platforms, and experiments in attention. Each entry says honestly whether
          it is live, a prototype, or still being built.
        </p>
      </header>

      <ol className="space-y-0">
        {projects.map((project, i) => (
          <li
            key={project.id}
            id={project.id}
            className="scroll-mt-20 grid grid-cols-1 sm:grid-cols-[3.5rem_1fr] gap-x-2 py-10 border-t border-stone-200/80 dark:border-stone-800/80 first:border-t-0 first:pt-2"
          >
            <span className="font-mono-meta text-xs text-accent pt-2 mb-2 sm:mb-0">
              №&nbsp;{String(i + 1).padStart(2, "0")}
            </span>

            <article className="space-y-4 min-w-0">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <StatusMark status={project.status} />
                  <span className="font-mono-meta text-[11px] text-stone-400 dark:text-stone-500">
                    {project.year}
                  </span>
                  <span className="font-mono-meta text-[11px] text-stone-400 dark:text-stone-500">
                    {project.category}
                  </span>
                </div>
                <h2 className="font-serif-title text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 font-normal leading-tight">
                  {project.title}
                </h2>
                <p className="font-serif-title italic text-lg text-stone-600 dark:text-stone-400 leading-snug">
                  {project.tagline}
                </p>
              </div>

              <p className="text-[15px] text-stone-700 dark:text-stone-300 leading-relaxed max-w-2xl">
                {project.description}
              </p>

              {project.metrics && (
                <p className="font-mono-meta text-xs text-stone-500 dark:text-stone-400">
                  {project.metrics}
                </p>
              )}

              {project.highlights && project.highlights.length > 0 && (
                <details className="group/details max-w-2xl">
                  <summary className="cursor-pointer list-none label text-stone-500 dark:text-stone-400 hover:text-accent transition-colors select-none">
                    <span className="group-open/details:hidden">+ Details</span>
                    <span className="hidden group-open/details:inline">&minus; Details</span>
                  </summary>
                  <ul className="mt-3 text-sm text-stone-600 dark:text-stone-400 space-y-2 pl-4 list-disc marker:text-stone-300 dark:marker:text-stone-700 leading-relaxed">
                    {project.highlights.map((h, j) => (
                      <li key={j}>{h}</li>
                    ))}
                  </ul>
                </details>
              )}

              <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] font-mono-meta text-stone-400 dark:text-stone-500">
                {project.tags.map((tag, j) => (
                  <span key={tag}>
                    {tag}
                    {j < project.tags.length - 1 ? " ·" : ""}
                  </span>
                ))}
              </div>

              {(project.demo || project.github) && (
                <div className="flex items-center gap-5 text-sm pt-1">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-stone-900 dark:text-stone-100 hover:text-accent transition-colors"
                    >
                      <span>{project.status === "Live" ? "Visit" : "See prototype"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-stone-600 dark:text-stone-400 hover:text-accent transition-colors"
                    >
                      <span>Source</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
