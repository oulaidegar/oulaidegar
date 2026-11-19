import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { projects } from "@/data/projects";
import { notes } from "@/data/notes";
import { thesisData } from "@/data/thesis";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { SubstackIcon } from "@/components/Icons";
import StatusMark from "@/components/StatusMark";
import GazetteArchive from "@/components/GazetteArchive";

const lastUpdated = new Date().toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function excerpt(text: string, max = 280) {
  const firstPara = text.split("\n\n")[0];
  return firstPara.length > max ? firstPara.slice(0, max).trimEnd() + "…" : firstPara;
}

export default function Home() {
  const entries = projects.filter((p) => p.featured);
  const latestNote = notes[0];

  return (
    <div className="space-y-20 sm:space-y-24">
      {/* Masthead */}
      <section className="pt-2 sm:pt-6">
        <div className="flex items-baseline justify-between label text-stone-500 dark:text-stone-400">
          <span>{siteConfig.location}</span>
          <span className="hidden sm:inline">Last updated {lastUpdated}</span>
        </div>

        <h1 className="font-serif-title text-5xl sm:text-7xl text-stone-900 dark:text-stone-100 font-normal tracking-tight leading-none mt-4 mb-4">
          {siteConfig.name}
        </h1>

        <div className="rule-double" />

        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mt-2 label text-stone-500 dark:text-stone-400">
          <span>{siteConfig.role}</span>
          <span>Civic tech &middot; AI governance &middot; MENA</span>
        </div>
      </section>

      {/* Headline + intro */}
      <section className="space-y-8 -mt-6 sm:-mt-8">
        <p className="font-serif-title text-2xl sm:text-[2rem] leading-snug text-stone-900 dark:text-stone-100 max-w-2xl">
          <span className="text-accent">&ldquo;</span>
          {siteConfig.headline}
          <span className="text-accent">&rdquo;</span>
        </p>

        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed max-w-xl">
          {siteConfig.intro}
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <Link
            href="/cv"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 font-medium hover:bg-accent dark:hover:bg-accent dark:hover:text-stone-950 transition-colors"
          >
            Curriculum Vitae
          </Link>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-stone-700 dark:text-stone-300 editorial-link hover:text-accent"
          >
            Get in touch
          </a>
          <a
            href={siteConfig.substack}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 flex items-center gap-1.5 transition-colors"
          >
            <SubstackIcon className="w-3.5 h-3.5" />
            <span>Substack</span>
          </a>
        </div>
      </section>

      {/* Now */}
      <section className="grid grid-cols-1 sm:grid-cols-[8rem_1fr] gap-3 sm:gap-6 pt-6 border-t border-stone-200/80 dark:border-stone-800/80">
        <h2 className="label text-stone-400 dark:text-stone-500 pt-1">Now</h2>
        <ul className="space-y-2 text-[15px] text-stone-700 dark:text-stone-300">
          {siteConfig.now.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-accent select-none">&rarr;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Built: numbered register of entries */}
      <section className="space-y-2">
        <div className="flex items-baseline justify-between pb-3 border-b border-stone-900 dark:border-stone-200">
          <h2 className="label text-stone-900 dark:text-stone-100">Built</h2>
          <Link
            href="/work"
            className="label text-stone-500 hover:text-accent dark:text-stone-400 flex items-center gap-1 group"
          >
            <span>Full register</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ol className="divide-y divide-stone-200/80 dark:divide-stone-800/80">
          {entries.map((project, i) => {
            const href = project.demo ?? `/work#${project.id}`;
            const external = Boolean(project.demo);
            return (
              <li key={project.id}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group grid grid-cols-[2.75rem_1fr] sm:grid-cols-[3.5rem_1fr_auto] gap-x-2 gap-y-1 py-5"
                >
                  <span className="font-mono-meta text-xs text-accent pt-1.5">
                    №&nbsp;{String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="space-y-1.5 min-w-0">
                    <h3 className="font-serif-title text-xl sm:text-2xl text-stone-900 dark:text-stone-100 leading-tight flex items-baseline gap-2">
                      <span className="group-hover:text-accent transition-colors">{project.title}</span>
                      {external && (
                        <ArrowUpRight className="w-4 h-4 shrink-0 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                      {project.tagline}
                    </p>
                    {project.metrics && !project.metrics.startsWith("In development") && (
                      <p className="font-mono-meta text-[11px] text-stone-500 dark:text-stone-500">
                        {project.metrics}
                      </p>
                    )}
                  </div>

                  <div className="col-start-2 sm:col-start-3 sm:row-start-1 sm:text-right pt-1 sm:pt-2 flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1">
                    <StatusMark status={project.status} />
                    <span className="font-mono-meta text-[11px] text-stone-400 dark:text-stone-500">
                      {project.year}
                    </span>
                  </div>
                </a>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Thesis */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between pb-3 border-b border-stone-900 dark:border-stone-200">
          <h2 className="label text-stone-900 dark:text-stone-100">Thesis</h2>
          <span className="label text-stone-500 dark:text-stone-400">
            MA &middot; University of Amsterdam &middot; {thesisData.status}
          </span>
        </div>

        <div className="space-y-4">
          <h3 className="font-serif-title text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 leading-tight">
            <span className="font-mono-meta text-accent text-2xl sm:text-3xl tracking-tight">402</span>{" "}
            Payment Required
          </h3>
          <p className="font-serif-title italic text-lg text-stone-600 dark:text-stone-400">
            Agency, Dependency, and the Lebanese Official Gazette
          </p>
          <p className="text-[15px] text-stone-700 dark:text-stone-300 leading-relaxed max-w-2xl">
            I tried to rebuild Lebanon&apos;s paywalled archive of laws and decrees with AI
            tools: 816 issues, 149,094 scanned images, Arabic OCR and semantic search. At
            one point a commercial API&apos;s billing threshold cut off Arabic search. The
            thesis is about what that moment shows: building is easier than ever, but the
            infrastructure underneath still belongs to someone else.
          </p>
        </div>

        <div className="pt-4">
          <GazetteArchive />
        </div>

        <Link
          href="/thesis"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-900 dark:text-stone-100 group hover:text-accent transition-colors"
        >
          <span>Read the abstract and method</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>

      {/* Latest note */}
      {latestNote && (
        <section className="space-y-6">
          <div className="flex items-baseline justify-between pb-3 border-b border-stone-900 dark:border-stone-200">
            <h2 className="label text-stone-900 dark:text-stone-100">Latest note</h2>
            <Link
              href="/notes"
              className="label text-stone-500 hover:text-accent dark:text-stone-400 flex items-center gap-1 group"
            >
              <span>All notes</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <Link href="/notes" className="group block space-y-3">
            <div className="font-mono-meta text-[11px] text-stone-400 dark:text-stone-500">
              {new Date(latestNote.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            <h3 className="font-serif-title text-2xl text-stone-900 dark:text-stone-100 group-hover:text-accent transition-colors">
              {latestNote.title}
            </h3>
            <p className="text-[15px] text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl">
              {excerpt(latestNote.content)}
            </p>
          </Link>
        </section>
      )}
    </div>
  );
}
