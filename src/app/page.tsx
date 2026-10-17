import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { projects } from "@/data/projects";
import { posts } from "@/data/posts";
import { notes } from "@/data/notes";
import { initialPhotos } from "@/data/photos";
import { recommendations } from "@/data/recommendations";
import { ArrowUpRight, ArrowRight, FileText } from "lucide-react";
import { SubstackIcon, SpotifyIcon } from "@/components/Icons";

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);
  const recentPosts = posts.slice(0, 3);
  const recentNotes = notes.slice(0, 3);
  const previewPhotos = initialPhotos.slice(0, 3);
  const featuredRecs = recommendations.filter((r) => r.featured).slice(0, 3);

  return (
    <div className="space-y-20 sm:space-y-24">
      {/* Editorial Hero */}
      <section className="space-y-6 pt-4 sm:pt-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 text-xs font-mono-meta text-stone-500 dark:text-stone-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{siteConfig.location}</span>
            <span>&bull;</span>
            <span>{siteConfig.role}</span>
          </div>

          <h1 className="font-serif-title text-4xl sm:text-5xl lg:text-6xl text-stone-900 dark:text-stone-100 font-normal tracking-tight leading-[1.08]">
            {siteConfig.name}
          </h1>
        </div>

        <p className="text-lg sm:text-xl text-stone-800 dark:text-stone-200 font-serif-title italic leading-relaxed max-w-2xl border-l-2 border-stone-300 dark:border-stone-700 pl-4 py-0.5">
          &ldquo;{siteConfig.statement}&rdquo;
        </p>

        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed font-sans max-w-2xl">
          {siteConfig.bio}
        </p>

        {/* Focus Areas as subtle text tags */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-mono-meta text-stone-500 dark:text-stone-400 pt-1">
          <span className="text-stone-400 dark:text-stone-600">Focus:</span>
          {siteConfig.focusAreas.map((area, i) => (
            <span key={area} className="flex items-center gap-2">
              <span className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors">
                {area}
              </span>
              {i < siteConfig.focusAreas.length - 1 && (
                <span className="text-stone-300 dark:text-stone-700">&bull;</span>
              )}
            </span>
          ))}
        </div>

        {/* Quiet Actions */}
        <div className="flex flex-wrap items-center gap-5 text-xs font-mono-meta pt-2">
          <Link
            href="/cv"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-medium hover:opacity-90 transition-opacity"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Curriculum Vitae</span>
          </Link>
          <Link
            href="/thesis"
            className="text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100 flex items-center gap-1 group transition-colors editorial-link"
          >
            <span>Master&apos;s Thesis</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href={siteConfig.substack}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 flex items-center gap-1 transition-colors"
          >
            <SubstackIcon className="w-3.5 h-3.5" />
            <span>Substack</span>
          </a>
          <a
            href={siteConfig.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 flex items-center gap-1 transition-colors"
          >
            <SpotifyIcon className="w-3.5 h-3.5" />
            <span>Spotify</span>
          </a>
        </div>
      </section>

      {/* Featured Master's Thesis Section - Editorial Publication Style */}
      <section className="space-y-4 pt-4 border-t border-stone-200/80 dark:border-stone-800/80">
        <div className="flex items-baseline justify-between text-xs font-mono-meta text-stone-400 dark:text-stone-500">
          <span className="uppercase tracking-wider">Research Focus</span>
          <span>M.Sc. Cultural Data & AI &bull; 2024–2026</span>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif-title text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 leading-snug">
            Latent Assemblies: AI Ethics, Cultural Data, and the Democratic Politics of Collective Memory
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-sans max-w-2xl">
            Investigating the epistemological consequences of applying multimodal foundation models to digitized public cultural heritage. Developing an open audit suite to evaluate cultural skew and proposing sovereign AI architectures for citizen assemblies.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/thesis"
            className="inline-flex items-center gap-1.5 text-xs font-mono-meta font-medium text-stone-900 dark:text-stone-100 group editorial-link"
          >
            <span>Read full thesis proposal & methodologies</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Selected Works - Refined Typographic Index */}
      <section className="space-y-6 pt-4 border-t border-stone-200/80 dark:border-stone-800/80">
        <div className="flex items-baseline justify-between">
          <h2 className="font-mono-meta text-xs uppercase tracking-wider text-stone-400 dark:text-stone-500">
            Selected Works & Systems
          </h2>
          <Link
            href="/work"
            className="text-xs font-mono-meta text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 flex items-center gap-1 group"
          >
            <span>All projects ({projects.length})</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="divide-y divide-stone-200/60 dark:divide-stone-800/60">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="group py-4.5 transition-colors flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-baseline gap-2.5">
                  <h3 className="font-serif-title text-lg sm:text-xl text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-[10px] font-mono-meta text-stone-400 dark:text-stone-500">
                    {project.category}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
                  {project.tagline}
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono-meta text-stone-400 dark:text-stone-500 shrink-0 self-start sm:self-auto pt-1 sm:pt-0">
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
            </article>
          ))}
        </div>
      </section>

      {/* Writing / Essays - Clean Literary Index (renders once user publishes essays) */}
      {recentPosts.length > 0 && (
        <section className="space-y-6 pt-4 border-t border-stone-200/80 dark:border-stone-800/80">
          <div className="flex items-baseline justify-between">
            <h2 className="font-mono-meta text-xs uppercase tracking-wider text-stone-400 dark:text-stone-500">
              Essays & Writings
            </h2>
            <Link
              href="/writing"
              className="text-xs font-mono-meta text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 flex items-center gap-1 group"
            >
              <span>All essays ({posts.length})</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="divide-y divide-stone-200/60 dark:divide-stone-800/60">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/writing/${post.slug}`}
                className="group block py-4.5 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <h3 className="font-serif-title text-lg sm:text-xl text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
                    {post.title}
                  </h3>
                  <span className="text-[11px] font-mono-meta text-stone-400 dark:text-stone-500 shrink-0">
                    {post.date}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed font-sans">
                  {post.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Field Notes - Clean Stream */}
      <section className="space-y-6 pt-4 border-t border-stone-200/80 dark:border-stone-800/80">
        <div className="flex items-baseline justify-between">
          <h2 className="font-mono-meta text-xs uppercase tracking-wider text-stone-400 dark:text-stone-500">
            Field Notes & Garden
          </h2>
          <Link
            href="/notes"
            className="text-xs font-mono-meta text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 flex items-center gap-1 group"
          >
            <span>Digital Garden ({notes.length})</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {recentNotes.map((note) => (
            <div key={note.id} className="space-y-2">
              <div className="text-[10px] font-mono-meta text-stone-400 dark:text-stone-500 flex justify-between">
                <span>{note.category}</span>
                <span>{note.date}</span>
              </div>
              <h4 className="text-sm font-medium text-stone-900 dark:text-stone-100 font-sans">
                {note.title}
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-4">
                {note.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Archive Preview - Editorial Gallery Strip */}
      <section className="space-y-6 pt-4 border-t border-stone-200/80 dark:border-stone-800/80">
        <div className="flex items-baseline justify-between">
          <h2 className="font-mono-meta text-xs uppercase tracking-wider text-stone-400 dark:text-stone-500">
            Visual Archive
          </h2>
          <Link
            href="/visuals"
            className="text-xs font-mono-meta text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 flex items-center gap-1 group"
          >
            <span>Full Gallery & Upload</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {previewPhotos.map((photo) => (
            <Link
              key={photo.id}
              href="/visuals"
              className="group block aspect-[4/3] max-w-sm overflow-hidden bg-stone-100 dark:bg-stone-900 relative"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      {/* Curated Canon & Recommendations Strip */}
      <section className="space-y-6 pt-4 border-t border-stone-200/80 dark:border-stone-800/80">
        <div className="flex items-baseline justify-between">
          <h2 className="font-mono-meta text-xs uppercase tracking-wider text-stone-400 dark:text-stone-500">
            Curated Canon & Media
          </h2>
          <Link
            href="/recommendations"
            className="text-xs font-mono-meta text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 flex items-center gap-1 group"
          >
            <span>All recommendations ({recommendations.length})</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {featuredRecs.map((rec) => (
            <Link
              key={rec.id}
              href="/recommendations"
              className="p-4 rounded-sm border border-stone-200/80 dark:border-stone-800/80 hover:border-stone-400 dark:hover:border-stone-600 bg-white/40 dark:bg-stone-900/30 space-y-2 transition-all block group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono-meta text-stone-400">
                <span>{rec.categoryLabel}</span>
                {rec.subscribers && <span>{rec.subscribers} subs</span>}
              </div>
              <h3 className="font-serif-title text-base text-stone-900 dark:text-stone-100 group-hover:underline">
                {rec.title}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 font-sans line-clamp-3 leading-relaxed">
                {rec.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
