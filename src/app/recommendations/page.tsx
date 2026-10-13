import { Metadata } from "next";
import RecommendationsExplorer from "@/components/RecommendationsExplorer";

export const metadata: Metadata = {
  title: "Recommendations — oulaidegar",
  description:
    "Curated recommendations spanning YouTube channels, video essays, foundational books, civic web tools, cinema, and poetry on AI ethics, craft, and cultural data.",
};

export default function RecommendationsPage() {
  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Editorial Header */}
      <section className="space-y-3 pt-2 sm:pt-4 border-b border-stone-200/80 dark:border-stone-800/80 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono-meta text-stone-500 dark:text-stone-400">
          <span className="uppercase tracking-wider">Curated Canon</span>
          <span>&bull;</span>
          <span>Syllabus & Living Atlas</span>
        </div>

        <h1 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl text-stone-900 dark:text-stone-100 font-normal tracking-tight">
          Recommendations
        </h1>

        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 font-sans leading-relaxed max-w-2xl">
          A living, filterable library of thinkers, YouTube channels, video essays, foundational texts, websites, and films that inform my practice as a creative technologist. Grounded in critical AI ethics, decolonial history, hands-on craft, and democratic systems.
        </p>
      </section>

      {/* Interactive Explorer Component */}
      <RecommendationsExplorer />
    </div>
  );
}
