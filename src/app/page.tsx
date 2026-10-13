import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { projects } from "@/data/projects";
import { posts } from "@/data/posts";
import { notes } from "@/data/notes";
import { initialPhotos } from "@/data/photos";
import ThesisHighlight from "@/components/ThesisHighlight";
import { ArrowUpRight, ArrowRight, Mail, FileText } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const recentPosts = posts.slice(0, 3);
  const recentNotes = notes.slice(0, 3);
  const previewPhotos = initialPhotos.slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Intro Hero Section */}
      <section className="space-y-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono-meta text-stone-500 dark:text-stone-400">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-400 dark:bg-stone-500" />
            <span>{siteConfig.location}</span>
            <span>&bull;</span>
            <span>{siteConfig.status}</span>
          </div>
          <h1 className="font-serif-title text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 font-normal tracking-tight">
            {siteConfig.name}
          </h1>
        </div>

        <p className="text-base sm:text-lg text-stone-700 dark:text-stone-300 font-serif-title italic leading-relaxed max-w-2xl">
          &ldquo;Investigating the epistemological shifts when human cultural memory is compressed into continuous latent vector spaces.&rdquo;
        </p>

        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-sans max-w-2xl">
          {siteConfig.bio}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono-meta pt-1">
          <Link
            href="/cv"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 transition-opacity font-medium"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View CV</span>
          </Link>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-1 text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </a>
        </div>
      </section>

      {/* Featured Master's Thesis Spotlight */}
      <ThesisHighlight />

      {/* Featured Work / What I Built */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
          <h2 className="font-serif-title text-xl text-stone-900 dark:text-stone-100">
            Selected Works
          </h2>
          <Link
            href="/work"
            className="text-xs font-mono-meta text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 flex items-center gap-1"
          >
            <span>All projects ({projects.length})</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-4">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="group p-4 rounded-md border border-stone-200/90 dark:border-stone-800/80 hover:border-stone-400 dark:hover:border-stone-600 transition-colors space-y-2 bg-[#faf9f6]/40 dark:bg-[#121110]/40"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-mono-meta">
                    {project.title}
                  </h3>
                  {project.metrics && (
                    <span className="text-[10px] font-mono-meta px-1.5 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      {project.metrics}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs font-mono-meta text-stone-400 dark:text-stone-500">
                  <span>{project.year}</span>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-700 dark:text-stone-300 hover:underline flex items-center gap-0.5"
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
                      className="text-stone-700 dark:text-stone-300 hover:underline flex items-center gap-0.5"
                    >
                      <span>source</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono-meta px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Writing / Blog */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
          <h2 className="font-serif-title text-xl text-stone-900 dark:text-stone-100">
            Writing
          </h2>
          <Link
            href="/writing"
            className="text-xs font-mono-meta text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 flex items-center gap-1"
          >
            <span>All essays ({posts.length})</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="divide-y divide-stone-200/80 dark:divide-stone-800/80">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="group block py-3.5 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                <h3 className="font-serif-title text-base sm:text-lg text-stone-900 dark:text-stone-100 group-hover:underline underline-offset-4 decoration-stone-400">
                  {post.title}
                </h3>
                <div className="text-[11px] font-mono-meta text-stone-400 dark:text-stone-500 shrink-0">
                  {post.date} &bull; {post.readingTime}
                </div>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                {post.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Field Notes & Thoughts */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
          <h2 className="font-serif-title text-xl text-stone-900 dark:text-stone-100">
            Field Notes
          </h2>
          <Link
            href="/notes"
            className="text-xs font-mono-meta text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 flex items-center gap-1"
          >
            <span>Garden ({notes.length})</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {recentNotes.map((note) => (
            <div
              key={note.id}
              className="p-3 rounded border border-stone-200 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/30 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono-meta text-stone-400 dark:text-stone-500 flex justify-between">
                  <span>{note.category}</span>
                  <span>{note.date}</span>
                </div>
                <h4 className="text-xs font-medium text-stone-900 dark:text-stone-100 font-sans">
                  {note.title}
                </h4>
                <p className="text-[11px] text-stone-600 dark:text-stone-400 line-clamp-3 leading-normal">
                  {note.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Archive Preview */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
          <h2 className="font-serif-title text-xl text-stone-900 dark:text-stone-100">
            Visual Archive
          </h2>
          <Link
            href="/visuals"
            className="text-xs font-mono-meta text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 flex items-center gap-1"
          >
            <span>View gallery & upload</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {previewPhotos.map((photo) => (
            <Link
              key={photo.id}
              href="/visuals"
              className="group block aspect-[4/3] rounded overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
