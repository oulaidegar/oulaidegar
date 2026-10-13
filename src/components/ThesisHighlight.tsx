import Link from "next/link";
import { thesisData } from "@/data/thesis";
import { ArrowUpRight } from "lucide-react";

export default function ThesisHighlight() {
  return (
    <section className="relative rounded-lg p-5 sm:p-6 border border-stone-300 dark:border-stone-800 bg-[#f7f5f0] dark:bg-[#141312] transition-colors">
      <div className="flex items-center justify-between text-xs font-mono-meta text-stone-500 dark:text-stone-400 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
          <span>Master&apos;s Thesis &bull; {thesisData.status}</span>
        </div>
        <span>{thesisData.expectedYear}</span>
      </div>

      <div className="space-y-2">
        <h3 className="font-serif-title text-xl sm:text-2xl text-stone-900 dark:text-stone-100 leading-snug">
          {thesisData.workingTitle}
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
          {thesisData.subtitle}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-stone-200/80 dark:border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-meta">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-stone-200/70 dark:bg-stone-800 text-stone-800 dark:text-stone-300 text-[11px]">
            {thesisData.field}
          </span>
          <span className="text-stone-400 dark:text-stone-500 text-[11px]">
            &bull; {thesisData.datasets.length} datasets
          </span>
        </div>

        <Link
          href="/thesis"
          className="inline-flex items-center gap-1 text-stone-900 dark:text-stone-100 font-medium hover:underline underline-offset-4 group"
        >
          <span>Read Research Proposal</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
}
