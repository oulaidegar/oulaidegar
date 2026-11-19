import type { Metadata } from "next";
import { thesisData } from "@/data/thesis";
import { ArrowUpRight } from "lucide-react";
import GazetteArchive from "@/components/GazetteArchive";

export const metadata: Metadata = {
  title: "Thesis: 402 Payment Required",
  description:
    "MA thesis (University of Amsterdam) on agency, dependency and AI, through a practice-based reconstruction of the Lebanese Official Gazette.",
};

export default function ThesisPage() {
  return (
    <article className="space-y-14">
      {/* Editorial Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 label text-stone-500 dark:text-stone-400">
          <span>MA Thesis</span>
          <span>&middot;</span>
          <span>{thesisData.institution}</span>
          <span>&middot;</span>
          <span>{thesisData.expectedYear}</span>
        </div>

        <h1 className="font-serif-title text-4xl sm:text-5xl lg:text-6xl text-stone-900 dark:text-stone-100 leading-[1.05] font-normal tracking-tight">
          <span className="font-mono-meta text-accent tracking-tight">402</span> Payment Required
        </h1>
        <p className="font-serif-title text-xl sm:text-2xl text-stone-700 dark:text-stone-300 leading-snug">
          Agency, Dependency, and the Lebanese Official Gazette
        </p>
        <div className="rule-double" />

        <p className="font-serif-title italic text-lg sm:text-xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
          {thesisData.subtitle}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono-meta text-xs text-stone-500 dark:text-stone-400 pt-1">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {thesisData.status}
          </span>
          <span>{thesisData.degree}</span>
        </div>
      </header>

      {/* Key finding */}
      <aside className="border-l-2 border-accent pl-5 sm:pl-6 py-1 space-y-2 max-w-2xl">
        <div className="label text-accent">Key finding</div>
        <p className="font-serif-title text-xl sm:text-2xl text-stone-900 dark:text-stone-100 leading-snug">
          Democratizing the capacity to build software is not the same as democratizing the
          infrastructures on which societies depend.
        </p>
        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
          The clearest moment: a commercial API&apos;s billing threshold switched off Arabic
          semantic search, so an economic dependency became a linguistic one.
        </p>
      </aside>

      {/* The archive, issue by issue */}
      <section className="space-y-4">
        <h2 className="font-mono-meta text-xs uppercase tracking-wider text-stone-400 dark:text-stone-500">
          The Archive
        </h2>
        <GazetteArchive />
      </section>

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
                {method.tools.join(" · ")}
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

      {/* Theoretical framework */}
      <section className="space-y-4 pt-6 border-t border-stone-200/60 dark:border-stone-800/60">
        <h2 className="font-mono-meta text-xs uppercase tracking-wider text-stone-400 dark:text-stone-500">
          Theoretical Framework
        </h2>
        <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-300 max-w-2xl">
          {thesisData.theoreticalFramework.map((t) => (
            <li key={t} className="flex gap-3">
              <span className="text-accent select-none">&middot;</span>
              <span className="leading-relaxed">{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Key readings */}
      <section className="space-y-4 pt-6 border-t border-stone-200/60 dark:border-stone-800/60">
        <h2 className="font-mono-meta text-xs uppercase tracking-wider text-stone-400 dark:text-stone-500">
          Key Readings
        </h2>
        <div className="space-y-5 max-w-2xl">
          {thesisData.keyReadings.map((r) => (
            <div key={r.title} className="space-y-1">
              <div className="font-serif-title text-lg text-stone-900 dark:text-stone-100 leading-snug">
                {r.title}
              </div>
              <div className="font-mono-meta text-[11px] text-stone-500 dark:text-stone-400">
                {r.author} &middot; {r.year}
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{r.note}</p>
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
                  <span>Open</span>
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
