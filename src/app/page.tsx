import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { projects } from "@/data/projects";
import { notes } from "@/data/notes";
import { thesisData } from "@/data/thesis";
import { ArrowRight } from "lucide-react";
import { SubstackIcon, GithubIcon } from "@/components/Icons";
import StatusMark from "@/components/StatusMark";
import CaseStudyBlock from "@/components/CaseStudyBlock";
import { darajCaseStudy } from "@/data/darajCaseStudy";
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

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    url: `https://${siteConfig.domain}`,
    email: `mailto:${siteConfig.email}`,
    jobTitle: siteConfig.role,
    nationality: [{ "@type": "Country", name: "France" }, { "@type": "Country", name: "Lebanon" }],
    knowsLanguage: ["French", "English", "Arabic", "Spanish"],
    alumniOf: { "@type": "CollegeOrUniversity", name: "University of Amsterdam" },
    knowsAbout: [
      "Responsible AI",
      "AI governance",
      "Digital policy",
      "Data governance",
      "Digital rights",
      "Civic technology",
    ],
    sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.substack].filter(Boolean),
  };

  return (
    <div className="space-y-20 sm:space-y-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* Masthead */}
      <section className="pt-2 sm:pt-6">
        <div className="flex items-baseline justify-between gap-4 label text-stone-500 dark:text-stone-400">
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            {siteConfig.availability}
          </span>
          <span className="hidden sm:inline shrink-0">Updated {lastUpdated}</span>
        </div>

        <h1 className="font-serif-title text-5xl sm:text-7xl text-stone-900 dark:text-stone-100 font-normal tracking-tight leading-none mt-4 mb-4">
          {siteConfig.fullName}
        </h1>

        <div className="rule-double" />

        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mt-2 label text-stone-500 dark:text-stone-400">
          <span className="text-stone-900 dark:text-stone-100">{siteConfig.role}</span>
          <span>{siteConfig.secondaryRole}</span>
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

        <p className="inline-block text-sm text-stone-800 dark:text-stone-200 bg-accent-soft px-3 py-1.5 rounded-sm">
          {siteConfig.openTo}.
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
            {siteConfig.email}
          </a>
          {siteConfig.linkedin && (
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
            >
              LinkedIn
            </a>
          )}
          {siteConfig.github && (
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 flex items-center gap-1.5 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          )}
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

      {/* Experience: Daraj */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between pb-3 border-b border-stone-900 dark:border-stone-200">
          <h2 className="label text-stone-900 dark:text-stone-100">Experience</h2>
          <Link
            href="/cv"
            className="label text-stone-500 hover:text-accent dark:text-stone-400 flex items-center gap-1 group"
          >
            <span>Full CV</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="space-y-1">
          <h3 className="font-serif-title text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 leading-tight">
            {darajCaseStudy.role}
          </h3>
          <p className="font-mono-meta text-xs text-stone-500 dark:text-stone-400">
            {darajCaseStudy.organization} &middot; {darajCaseStudy.location} &middot;{" "}
            {darajCaseStudy.period}
          </p>
        </div>

        <CaseStudyBlock study={darajCaseStudy} />

        <div className="grid grid-cols-1 sm:grid-cols-[8.5rem_1fr] gap-x-6 gap-y-2 pt-6 border-t border-stone-200/80 dark:border-stone-800/80">
          <span className="label text-stone-400 dark:text-stone-500 pt-0.5">Training</span>
          <ul className="space-y-1 text-sm text-stone-700 dark:text-stone-300">
            <li>MA Cultural Data &amp; AI, University of Amsterdam (2026)</li>
            <li>
              AI and Digital Transformation in Government; AI, Justice, and the Rule of Law
              <span className="text-stone-500 dark:text-stone-400"> · Oxford Saïd &amp; UNESCO</span>
            </li>
            <li>
              Ethics of AI <span className="text-stone-500 dark:text-stone-400">· University of Helsinki</span>
            </li>
            <li>
              EU AI Act Fundamentals; Data Governance Fundamentals
              <span className="text-stone-500 dark:text-stone-400"> · DataCamp</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Built: case studies */}
      <section className="space-y-2">
        <div className="flex items-baseline justify-between pb-3 border-b border-stone-900 dark:border-stone-200">
          <h2 className="label text-stone-900 dark:text-stone-100">Selected work</h2>
          <Link
            href="/work"
            className="label text-stone-500 hover:text-accent dark:text-stone-400 flex items-center gap-1 group"
          >
            <span>All case studies</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ol className="divide-y divide-stone-200/80 dark:divide-stone-800/80">
          {entries.map((project, i) => (
            <li key={project.id}>
              <Link
                href={`/work#${project.id}`}
                className="group grid grid-cols-[2.75rem_1fr] sm:grid-cols-[3.5rem_1fr_auto] gap-x-2 gap-y-1 py-6"
              >
                <span className="font-mono-meta text-xs text-accent pt-1.5">
                  №&nbsp;{String(i + 1).padStart(2, "0")}
                </span>

                <div className="space-y-2 min-w-0">
                  <h3 className="font-serif-title text-xl sm:text-2xl text-stone-900 dark:text-stone-100 leading-tight group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    {project.tagline}
                  </p>
                  {project.caseStudy && (
                    <p className="font-mono-meta text-[11px] text-stone-500 dark:text-stone-400">
                      {project.caseStudy.evidence.join(" · ")}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1 label text-stone-400 dark:text-stone-500 group-hover:text-accent transition-colors pt-1">
                    Problem, evidence &amp; lesson
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>

                <div className="col-start-2 sm:col-start-3 sm:row-start-1 sm:text-right pt-1 sm:pt-2 flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1">
                  <StatusMark status={project.status} />
                  <span className="font-mono-meta text-[11px] text-stone-400 dark:text-stone-500">
                    {project.year}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
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
