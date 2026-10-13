"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import {
  recommendations,
  CATEGORIES,
  RecommendationCategory,
  RecommendationItem,
} from "@/data/recommendations";
import {
  Search,
  X,
  Play,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  BookOpen,
  Film,
  Globe,
  FileText,
  Feather,
  Grid,
  List,
  Shuffle,
  Eye,
} from "lucide-react";
import { YoutubeIcon, InstagramIcon } from "@/components/Icons";

export default function RecommendationsExplorer() {
  const [activeCategory, setActiveCategory] = useState<RecommendationCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"cards" | "index">("cards");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<{
    id: string;
    title: string;
    creator?: string;
    youtubeId: string;
  } | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const itemRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Close video modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeVideo) setActiveVideo(null);
        if (searchQuery) setSearchQuery("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeVideo, searchQuery]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: { [key: string]: number } = { all: recommendations.length };
    CATEGORIES.forEach((c) => {
      if (c.id !== "all") {
        counts[c.id] = recommendations.filter((r) => r.category === c.id).length;
      }
    });
    return counts;
  }, []);

  // Filter recommendations
  const filteredItems = useMemo(() => {
    return recommendations.filter((item) => {
      // Category match
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }

      // Tag filter
      if (selectedTag && !item.tags.includes(selectedTag)) {
        return false;
      }

      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = item.title.toLowerCase().includes(q);
        const inCreator = item.creator?.toLowerCase().includes(q) || false;
        const inHandle = item.handle?.toLowerCase().includes(q) || false;
        const inDesc = item.description.toLowerCase().includes(q);
        const inTags = item.tags.some((t) => t.toLowerCase().includes(q));
        if (!inTitle && !inCreator && !inHandle && !inDesc && !inTags) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategory, selectedTag, searchQuery]);

  // Handle Copy Link
  const handleCopy = (id: string, url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Serendipity / Randomizer
  const handlePickRandom = () => {
    if (recommendations.length === 0) return;
    const randomIndex = Math.floor(Math.random() * recommendations.length);
    const item = recommendations[randomIndex];
    setActiveCategory("all");
    setSelectedTag(null);
    setSearchQuery("");
    setHighlightedId(item.id);

    // Scroll into view
    setTimeout(() => {
      const el = itemRefs.current[item.id];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 150);

    setTimeout(() => {
      setHighlightedId(null);
    }, 3500);
  };

  // Icon selector per category
  const getCategoryIcon = (category: RecommendationCategory) => {
    switch (category) {
      case "youtube-channels":
      case "youtube-videos":
        return <YoutubeIcon className="w-3.5 h-3.5" />;
      case "articles":
        return <FileText className="w-3.5 h-3.5" />;
      case "websites":
        return <Globe className="w-3.5 h-3.5" />;
      case "books":
        return <BookOpen className="w-3.5 h-3.5" />;
      case "cinema":
        return <Film className="w-3.5 h-3.5" />;
      case "poetry":
        return <Feather className="w-3.5 h-3.5" />;
      case "creators":
        return <InstagramIcon className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* ============================================================ */}
      {/* Search, Serendipity, and View Controls                       */}
      {/* ============================================================ */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, creator, topic, or tag (e.g. 3Blue1Brown, AI ethics, craft)..."
              className="w-full pl-9 pr-8 py-2 rounded-sm border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/50 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 text-xs font-mono-meta focus:outline-none focus:border-stone-400 dark:focus:border-stone-600 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Serendipity Random Button */}
          <button
            onClick={handlePickRandom}
            title="Pick a random recommendation"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-sm border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100 text-xs font-mono-meta cursor-pointer transition-colors shrink-0"
          >
            <Shuffle className="w-3.5 h-3.5 text-stone-500" />
            <span className="hidden sm:inline">Surprise Me</span>
          </button>

          {/* View Mode Toggle */}
          <div className="inline-flex items-center p-0.5 rounded-sm border border-stone-200 dark:border-stone-800 bg-stone-100/70 dark:bg-stone-900/70 text-stone-500 shrink-0">
            <button
              onClick={() => setViewMode("cards")}
              className={`p-1.5 rounded-xs transition-colors cursor-pointer ${
                viewMode === "cards"
                  ? "bg-white dark:bg-stone-800 text-stone-950 dark:text-white shadow-2xs"
                  : "hover:text-stone-900 dark:hover:text-stone-300"
              }`}
              title="Cards view"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("index")}
              className={`p-1.5 rounded-xs transition-colors cursor-pointer ${
                viewMode === "index"
                  ? "bg-white dark:bg-stone-800 text-stone-950 dark:text-white shadow-2xs"
                  : "hover:text-stone-900 dark:hover:text-stone-300"
              }`}
              title="Index / Canon view"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.id] || 0;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedTag(null);
                }}
                className={`text-xs font-mono-meta px-2.5 py-1 rounded-sm transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-medium"
                    : "bg-stone-100/70 dark:bg-stone-900/60 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800/60"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] ${
                    isActive ? "opacity-75" : "text-stone-400 dark:text-stone-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Tag Filter Indicator */}
        {selectedTag && (
          <div className="flex items-center gap-2 pt-1 text-xs font-mono-meta text-stone-500">
            <span>Filtered by tag:</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-stone-200/80 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200">
              #{selectedTag}
              <button
                onClick={() => setSelectedTag(null)}
                className="hover:text-red-500 cursor-pointer ml-0.5"
                title="Remove tag filter"
              >
                &times;
              </button>
            </span>
            <button
              onClick={() => setSelectedTag(null)}
              className="text-[11px] underline text-stone-400 hover:text-stone-600 cursor-pointer"
            >
              clear
            </button>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* Results Count & Status                                       */}
      {/* ============================================================ */}
      <div className="flex items-baseline justify-between text-xs font-mono-meta text-stone-400 dark:text-stone-500 border-b border-stone-200/80 dark:border-stone-800/80 pb-2">
        <span>
          Showing {filteredItems.length} of {recommendations.length} recommendations
        </span>
        {searchQuery && (
          <span className="truncate max-w-[200px]">Query: &ldquo;{searchQuery}&rdquo;</span>
        )}
      </div>

      {/* ============================================================ */}
      {/* VIEW MODE 1: CARDS VIEW                                      */}
      {/* ============================================================ */}
      {viewMode === "cards" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const isHighlighted = highlightedId === item.id;
            return (
              <article
                key={item.id}
                ref={(el) => {
                  itemRefs.current[item.id] = el;
                }}
                className={`p-4 rounded-sm border transition-all duration-300 flex flex-col justify-between group relative bg-white/40 dark:bg-stone-900/30 ${
                  isHighlighted
                    ? "border-amber-400 dark:border-amber-500 shadow-lg ring-2 ring-amber-400/30 bg-amber-50/20 dark:bg-amber-950/20 scale-[1.01]"
                    : "border-stone-200/80 dark:border-stone-800/80 hover:border-stone-300 dark:hover:border-stone-700"
                }`}
              >
                <div className="space-y-2.5">
                  {/* Category, creator & metrics */}
                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono-meta text-stone-400 dark:text-stone-500">
                    <div className="flex items-center gap-1.5">
                      <span className="text-stone-500 dark:text-stone-400">
                        {getCategoryIcon(item.category)}
                      </span>
                      <span>{item.categoryLabel}</span>
                      {item.language && <span>&bull; {item.language}</span>}
                    </div>

                    {item.subscribers && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-xs bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300">
                        {item.subscribers} subs
                      </span>
                    )}
                    {item.year && !item.subscribers && <span>{item.year}</span>}
                  </div>

                  {/* Title & Creator */}
                  <div>
                    <h3 className="font-serif-title text-lg text-stone-900 dark:text-stone-100 leading-snug group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {item.title}
                      </a>
                    </h3>

                    {(item.creator || item.handle) && (
                      <div className="text-xs font-mono-meta text-stone-500 dark:text-stone-400 mt-0.5">
                        {item.creator}
                        {item.creator && item.handle && " "}
                        {item.handle && (
                          <span className="text-stone-400 dark:text-stone-500">
                            ({item.handle})
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-stone-600 dark:text-stone-400 font-sans leading-relaxed line-clamp-4">
                    {item.description}
                  </p>
                </div>

                {/* Footer: Tags and Actions */}
                <div className="pt-3 mt-3 border-t border-stone-100 dark:border-stone-800/60 space-y-2">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                        className={`text-[10px] font-mono-meta px-1.5 py-0.5 rounded-xs transition-colors cursor-pointer ${
                          selectedTag === tag
                            ? "bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-medium"
                            : "bg-stone-100 dark:bg-stone-800/60 text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-between pt-1 text-xs font-mono-meta">
                    <div className="flex items-center gap-2">
                      {/* Embed & Watch video if available */}
                      {item.youtubeId && (
                        <button
                          onClick={() =>
                            setActiveVideo({
                              id: item.id,
                              title: item.title,
                              creator: item.creator,
                              youtubeId: item.youtubeId!,
                            })
                          }
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-xs bg-red-600/10 text-red-700 dark:bg-red-950/40 dark:text-red-300 hover:bg-red-600/20 text-[11px] font-medium cursor-pointer transition-colors"
                          title="Watch embedded video"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Watch</span>
                        </button>
                      )}

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 text-[11px] transition-colors"
                      >
                        <span>Open</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Copy Link Button */}
                    <button
                      onClick={(e) => handleCopy(item.id, item.url, e)}
                      className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-1 cursor-pointer transition-colors"
                      title="Copy URL"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* ============================================================ */}
      {/* VIEW MODE 2: CANON / INDEX VIEW                              */}
      {/* ============================================================ */}
      {viewMode === "index" && (
        <div className="border border-stone-200/80 dark:border-stone-800/80 rounded-sm divide-y divide-stone-200/60 dark:divide-stone-800/60 font-mono-meta text-xs">
          {filteredItems.map((item, idx) => {
            const isHighlighted = highlightedId === item.id;
            return (
              <div
                key={item.id}
                ref={(el) => {
                  itemRefs.current[item.id] = el;
                }}
                className={`p-3 sm:px-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 hover:bg-stone-50 dark:hover:bg-stone-900/40 transition-colors ${
                  isHighlighted ? "bg-amber-50/40 dark:bg-amber-950/40" : ""
                }`}
              >
                <div className="flex items-baseline gap-2.5 min-w-0">
                  <span className="text-[10px] text-stone-400 shrink-0 w-6">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif-title text-sm sm:text-base text-stone-900 dark:text-stone-100 hover:underline truncate"
                    >
                      {item.title}
                    </a>
                    {item.creator && (
                      <span className="text-stone-400 dark:text-stone-500 text-[11px] ml-2 font-mono-meta">
                        by {item.creator}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 text-[11px] text-stone-400 pl-8 sm:pl-0">
                  <span className="truncate max-w-[120px] text-stone-500">
                    {item.categoryLabel}
                  </span>
                  {item.subscribers && <span>{item.subscribers}</span>}
                  {item.youtubeId && (
                    <button
                      onClick={() =>
                        setActiveVideo({
                          id: item.id,
                          title: item.title,
                          creator: item.creator,
                          youtubeId: item.youtubeId!,
                        })
                      }
                      className="text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-0.5 cursor-pointer"
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>Watch</span>
                    </button>
                  )}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-stone-900 dark:hover:text-stone-200"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="py-16 text-center space-y-3 border border-dashed border-stone-300 dark:border-stone-800 rounded-sm">
          <p className="text-sm font-serif-title text-stone-600 dark:text-stone-400">
            No recommendations match your current query or category filter.
          </p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setSelectedTag(null);
              setSearchQuery("");
            }}
            className="text-xs font-mono-meta underline text-stone-900 dark:text-stone-100 cursor-pointer"
          >
            Reset all filters
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* INTERACTIVE VIDEO EMBED MODAL                                */}
      {/* ============================================================ */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl bg-stone-950 border border-stone-800 rounded-sm overflow-hidden shadow-2xl space-y-3 p-4 sm:p-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between text-stone-200 pb-2 border-b border-stone-800/80">
              <div>
                <h4 className="font-serif-title text-base sm:text-lg truncate max-w-xl">
                  {activeVideo.title}
                </h4>
                {activeVideo.creator && (
                  <p className="text-xs font-mono-meta text-stone-400">
                    {activeVideo.creator}
                  </p>
                )}
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1 rounded text-stone-400 hover:text-white cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Responsive 16:9 Embed */}
            <div className="relative aspect-video w-full bg-black rounded-xs overflow-hidden">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs font-mono-meta text-stone-400 pt-1">
              <span>Playing in privacy-enhanced mode (youtube-nocookie)</span>
              <a
                href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white flex items-center gap-1"
              >
                <span>Open on YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
