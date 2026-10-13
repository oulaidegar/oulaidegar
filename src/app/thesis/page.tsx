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
    <article className="space-y-12">
      {/* Header */}
      <header className="space-y-4 pb-8 border-b border-stone-200 dark:border-stone-800">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono-meta text-stone-500 dark:text-stone-400">
          <span className="px-2 py-0.5 rounded bg-stone-200/70 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
            {thesisData.degree}
          </span>
          <span>&bull;</span>
          <span>{thesisData.field}</span>
          <span>&bull;</span>
          <span>{thesisData.expectedYear}</span>
        </div>

        <h1 className="font-serif-title text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 leading-snug">
          {thesisData.workingTitle}
        </h1>

        <p className="font-serif-title italic text-base sm:text-lg text-stone-600 dark:text-stone-300">
          {thesisData.subtitle}
        </p>

        <div className="flex items-center gap-2 text-xs font-mono-meta text-emerald-700 dark:text-emerald-400 pt-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          <span>Status: {thesisData.status} ({thesisData.institution})</span>
        </div>
      </header>

      {/* Abstract */}
      <section className="space-y-3">
        <h2 className="font-mono-meta text-xs uppercase tracking-wider text-stone-400 dark:text-stone-500 font-semibold">
          Abstract
        </h2>
        <div className="text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed font-sans space-y-4 bg-stone-50/70 dark:bg-stone-900/30 p-5 rounded-md border border-stone-200/70 dark:border-stone-800/60">
          {thesisData.abstract.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {/* Core Research Pillars */}
      {thesisData.pillars && (
        <section className="space-y-3">
          <h2 className="font-mono-meta text-xs uppercase tracking-wider text-stone-400 dark:text-stone-500 font-semibold">
            Pillars of Inquiry
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {thesisData.pillars.map((pillar, i) => (
              <div
                key={i}
                className="p-4 rounded border border-stone-200 dark:border-stone-800 bg-[#faf9f6] dark:bg-[#121110] space-y-1.5"
              >
                <div className="font-mono-meta text-[11px] text-stone-400 dark:text-stone-500 font-medium">
                  Pillar 0{i + 1}
                </div>
                <h3 className="font-serif-title text-base text-stone-900 dark:text-stone-100">
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
      <section className="space-y-3">
        <h2 className="font-mono-meta text-xs uppercase tracking-wider text-stone-400 dark:text-stone-500 font-semibold">
          Core Research Questions
        </h2>
        <ol className="space-y-3 font-sans text-sm text-stone-700 dark:text-stone-300">
          {thesisData.coreQuestions.map((q, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded border border-stone-200 dark:border-stone-800 bg-[#faf9f6] dark:bg-[#121110]"
            >
              <span className="font-mono-meta text-xs font-bold text-stone-400 dark:text-stone-500 shrink-0 mt-0.5">
                0{idx + 1}.
              </span>
              <span className="leading-relaxed">{q}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Methodological Framework */}
      <section className="space-y-4">
        <h2 className="font-mono-meta text-xs uppercase tracking-wider text-stone-400 dark:text-stone-500 font-semibold">
          Methodological Framework
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {thesisData.methodologies.map((method, i) => (
            <div
              key={i}
              className="p-4 rounded border border-stone-200 dark:border-stone-800 space-y-2 bg-[#faf9f6] dark:bg-[#121110] flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h3 className="font-serif-title text-base text-stone-900 dark:text-stone-100">
                  {method.title}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
                  {method.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-1 pt-2 border-t border-stone-100 dark:border-stone-800">
                {method.tools.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono-meta px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Datasets Examined */}
      <section className="space-y-4">
        <h2 className="font-mono-meta text-xs uppercase tracking-wider text-stone-400 dark:text-stone-500 font-semibold">
          Archival Datasets
        </h2>
        <div className="space-y-3">
          {thesisData.datasets.map((data, i) => (
            <div
              key={i}
              className="p-3.5 rounded border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div>
                <div className="font-medium text-xs sm:text-sm text-stone-900 dark:text-stone-100">
                  {data.name}
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  {data.description}
                </div>
              </div>
              <div className="text-right shrink-0 font-mono-meta text-[11px] text-stone-400 dark:text-stone-500">
                <div>{data.size}</div>
                <div className="text-[10px]">{data.type}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Theoretical Roots */}
      <section className="space-y-3">
        <h2 className="font-mono-meta text-xs uppercase tracking-wider text-stone-400 dark:text-stone-500 font-semibold">
          Theoretical Genealogy
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-meta text-stone-700 dark:text-stone-300">
          {thesisData.theoreticalFramework.map((theory, i) => (
            <li
              key={i}
              className="p-2.5 rounded border border-stone-200 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/30 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
              <span>{theory}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Software & Artifacts */}
      <section className="space-y-3">
        <h2 className="font-mono-meta text-xs uppercase tracking-wider text-stone-400 dark:text-stone-500 font-semibold">
          Research Outputs & Artifacts
        </h2>
        <div className="space-y-2">
          {thesisData.artifacts.map((artifact, i) => (
            <div
              key={i}
              className="p-3.5 rounded border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-xs sm:text-sm text-stone-900 dark:text-stone-100">
                    {artifact.title}
                  </span>
                  <span className="text-[10px] font-mono-meta px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                    {artifact.type}
                  </span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
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
