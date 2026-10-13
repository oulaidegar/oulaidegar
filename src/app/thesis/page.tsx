import type { Metadata } from "next";
import { thesisData } from "@/data/thesis";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Thesis: Cultural Data & AI",
  description:
    "Master's thesis research exploring generative AI, multimodal embeddings, and the algorithmic curation of cultural heritage collections.",
};

export default function ThesisPage() {
  return (
    <article className="space-y-14">
      {/* Editorial Header */}
      <header className="space-y-4 pb-8 border-b border-stone-200/80 dark:border-stone-800/80">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono-meta text-stone-500 dark:text-stone-400">
          <span>{thesisData.degree}</span>
          <span>&bull;</span>
          <span>{thesisData.field}</span>
          <span>&bull;</span>
          <span>{thesisData.expectedYear}</span>
        </div>

        <h1 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl text-stone-900 dark:text-stone-100 leading-tight font-normal">
          {thesisData.workingTitle}
        </h1>

        <p className="font-serif-title italic text-lg sm:text-xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
          {thesisData.subtitle}
        </p>

        <div className="flex items-center gap-2 text-xs font-mono-meta text-emerald-700 dark:text-emerald-400 pt-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
          <span>Status: {thesisData.status} ({thesisData.institution})</span>
        </div>
      </header>

      {/* Abstract */}
      <section className="space-y-3">
        <h2 className="font-mono-meta text-xs uppercase tracking-wider text-stone-400 dark:text-stone-500">
          Abstract
        </h2>
        <div className="text-base sm:text-lg text-stone-800 dark:text-stone-200 leading-relaxed font-serif-title space-y-4 max-w-2xl">
          {thesisData.abstract.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {/* Pillars of Inquiry */}
      {thesisData.pillars && (
        <section className="space-y-4 pt-6 border-t border-stone-200/60 dark:border-stone-800/60">
          <h2 className="font-mono-meta text-xs uppercase tracking-wider text-stone-400 dark:text-stone-500">
            Pillars of Inquiry
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {thesisData.pillars.map((pillar, i) => (
              <div key={i} className="space-y-2">
                <span className="font-mono-meta text-xs text-stone-400 dark:text-stone-500">
                  0{i + 1}
                </span>
                <h3 className="font-serif-title text-lg text-stone-900 dark:text-stone-100">
                  {pillar.title}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 font-sans leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Core Research Questions */}
      <section className="space-y-4 pt-6 border-t border-stone-200/60 dark:border-stone-800/60">
        <h2 className="font-mono-meta text-xs uppercase tracking-wider text-stone-400 dark:text-stone-500">
          Core Research Questions
        </h2>
        <div className="space-y-4 font-sans text-sm text-stone-700 dark:text-stone-300 max-w-2xl">
          {thesisData.coreQuestions.map((q, idx) => (
            <div key={idx} className="flex items-start gap-4 pb-4 border-b border-stone-200/40 dark:border-stone-800/40 last:border-b-0">
              <span className="font-mono-meta text-xs font-bold text-stone-400 dark:text-stone-500 shrink-0 mt-0.5">
                0{idx + 1}.
              </span>
              <span className="leading-relaxed">{q}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Methodological Framework */}
      <section className="space-y-4 pt-6 border-t border-stone-200/60 dark:border-stone-800/60">
        <h2 className="font-mono-meta text-xs uppercase tracking-wider text-stone-400 dark:text-stone-500">
          Methodological Framework
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {thesisData.methodologies.map((method, i) => (
            <div key={i} className="space-y-2">
              <h3 className="font-serif-title text-base text-stone-900 dark:text-stone-100">
                {method.title}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
                {method.description}
              </p>
              <div className="flex flex-wrap gap-1 text-[11px] font-mono-meta text-stone-400 dark:text-stone-500 pt-1">
                {method.tools.join(" &bull; ")}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Datasets */}
      <section className="space-y-4 pt-6 border-t border-stone-200/60 dark:border-stone-800/60">
        <h2 className="font-mono-meta text-xs uppercase tracking-wider text-stone-400 dark:text-stone-500">
          Archival Datasets
        </h2>
        <div className="divide-y divide-stone-200/60 dark:divide-stone-800/60">
          {thesisData.datasets.map((data, i) => (
            <div key={i} className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <div className="font-medium text-sm text-stone-900 dark:text-stone-100">
                  {data.name}
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 font-sans">
                  {data.description}
                </div>
              </div>
              <div className="font-mono-meta text-xs text-stone-400 shrink-0">
                {data.size}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Artifacts */}
      <section className="space-y-4 pt-6 border-t border-stone-200/80 dark:border-stone-800/80">
        <h2 className="font-mono-meta text-xs uppercase tracking-wider text-stone-400 dark:text-stone-500">
          Research Outputs & Artifacts
        </h2>
        <div className="divide-y divide-stone-200/60 dark:divide-stone-800/60">
          {thesisData.artifacts.map((artifact, i) => (
            <div key={i} className="py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-medium text-sm text-stone-900 dark:text-stone-100">
                    {artifact.title}
                  </span>
                  <span className="text-[10px] font-mono-meta text-stone-400">
                    {artifact.type}
                  </span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 font-sans">
                  {artifact.description}
                </p>
              </div>

              {artifact.link && (
                <a
                  href={artifact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono-meta text-stone-800 dark:text-stone-200 hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>view code</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
