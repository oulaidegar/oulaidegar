import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";
import StatusMark from "@/components/StatusMark";
import CaseStudyBlock from "@/components/CaseStudyBlock";

export const metadata: Metadata = {
  title: "Built",
  description:
    "Case studies in public-interest technology: the problem, what I built, the evidence, and the governance lesson.",
};

export default function WorkPage() {
  const shipped = projects.filter((p) => p.featured);
  const inDevelopment = projects.filter((p) => !p.featured);

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="label text-stone-500 dark:text-stone-400">
          Case studies &middot; {shipped.length} entries
        </div>
        <h1 className="font-serif-title text-4xl sm:text-5xl text-stone-900 dark:text-stone-100 font-normal tracking-tight">
          Built
        </h1>
        <div className="rule-double" />
        <p className="text-[15px] text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed pt-2">
          Public-interest tools I designed and built on my own. Each one follows the same
          shape: the problem, what I did, the evidence, and what it taught me about how
          technology should be governed.
        </p>
      </header>

      <ol>
        {shipped.map((project, i) => (
          <li
            key={project.id}
            id={project.id}
            className="scroll-mt-20 grid grid-cols-1 sm:grid-cols-[3.5rem_1fr] gap-x-2 py-12 border-t border-stone-200/80 dark:border-stone-800/80 first:border-t-0 first:pt-2"
          >
            <span className="font-mono-meta text-xs text-accent pt-2 mb-2 sm:mb-0">
              №&nbsp;{String(i + 1).padStart(2, "0")}
            </span>

            <article className="space-y-6 min-w-0">
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

              {project.caseStudy ? (
                <CaseStudyBlock study={project.caseStudy} />
              ) : (
                <p className="text-[15px] text-stone-700 dark:text-stone-300 leading-relaxed max-w-2xl">
                  {project.description}
                </p>
              )}

              {project.highlights && project.highlights.length > 0 && (
                <details className="group/details max-w-2xl">
                  <summary className="cursor-pointer list-none label text-stone-500 dark:text-stone-400 hover:text-accent transition-colors select-none">
                    <span className="group-open/details:hidden">+ Full details</span>
                    <span className="hidden group-open/details:inline">&minus; Full details</span>
                  </summary>
                  <div className="mt-3 space-y-3">
                    <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                      {project.description}
                    </p>
                    <ul className="text-sm text-stone-600 dark:text-stone-400 space-y-2 pl-4 list-disc marker:text-stone-300 dark:marker:text-stone-700 leading-relaxed">
                      {project.highlights.map((h, j) => (
                        <li key={j}>{h}</li>
                      ))}
                    </ul>
                    <p className="text-[11px] font-mono-meta text-stone-400 dark:text-stone-500">
                      {project.tags.join(" · ")}
                    </p>
                  </div>
                </details>
              )}

              {(project.demo || project.github) && (
                <div className="flex items-center gap-5 text-sm">
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

      {inDevelopment.length > 0 && (
        <section className="space-y-6 pt-4">
          <div className="pb-3 border-b border-stone-900 dark:border-stone-200">
            <h2 className="label text-stone-900 dark:text-stone-100">In development</h2>
          </div>
          <ul className="space-y-8">
            {inDevelopment.map((project) => (
              <li key={project.id} id={project.id} className="scroll-mt-20 space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-serif-title text-xl text-stone-900 dark:text-stone-100">
                    {project.title}
                  </h3>
                  <StatusMark status={project.status} />
                </div>
                <p className="text-[15px] text-stone-600 dark:text-stone-400 leading-relaxed">
                  {project.tagline}
                </p>
                <details className="group/details">
                  <summary className="cursor-pointer list-none label text-stone-500 dark:text-stone-400 hover:text-accent transition-colors select-none">
                    <span className="group-open/details:hidden">+ What it will do</span>
                    <span className="hidden group-open/details:inline">&minus; What it will do</span>
                  </summary>
                  <p className="mt-3 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    {project.description}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
