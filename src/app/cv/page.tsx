"use client";

import { cvData } from "@/data/cvData";
import { Printer } from "lucide-react";

export default function CVPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-12">
      {/* Top Action Bar (hidden in print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-stone-200/80 dark:border-stone-800/80 no-print">
        <div>
          <h1 className="font-serif-title text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 font-normal">
            Curriculum Vitae
          </h1>
          <p className="text-xs text-stone-500 font-mono-meta mt-1">
            Academic, Civic & Creative Technology Track &bull; Updated 2025
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-mono-meta border border-stone-300 dark:border-stone-700 hover:border-stone-900 dark:hover:border-stone-200 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Export PDF</span>
        </button>
      </div>

      {/* CV Document Container */}
      <div className="space-y-12 font-sans text-stone-800 dark:text-stone-200">
        {/* Header Block */}
        <header className="space-y-4 pb-8 border-b border-stone-200/80 dark:border-stone-800/80">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h2 className="font-serif-title text-3xl sm:text-4xl font-normal text-stone-900 dark:text-stone-100">
                {cvData.name}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-mono-meta mt-1">
                {cvData.title}
              </p>
            </div>
            <div className="text-xs font-mono-meta text-stone-500 dark:text-stone-400 space-y-0.5 sm:text-right">
              <div>{cvData.email}</div>
              <div>{cvData.website}</div>
              <div>{cvData.location}</div>
            </div>
          </div>

          <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed font-sans pt-2 max-w-2xl">
            {cvData.summary}
          </p>
        </header>

        {/* Education Section */}
        <section className="space-y-6">
          <h3 className="text-xs font-mono-meta uppercase tracking-wider text-stone-400 dark:text-stone-500 font-semibold border-b border-stone-200/60 dark:border-stone-800/60 pb-2">
            Education
          </h3>

          <div className="space-y-8">
            {cvData.education.map((edu, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                  <h4 className="font-serif-title text-xl text-stone-900 dark:text-stone-100 font-normal">
                    {edu.degree}
                  </h4>
                  <span className="text-xs font-mono-meta text-stone-400 dark:text-stone-500 shrink-0">
                    {edu.period}
                  </span>
                </div>

                <div className="text-xs text-stone-600 dark:text-stone-400 font-mono-meta">
                  {edu.institution} &bull; {edu.location}
                </div>

                {edu.thesisTopic && (
                  <div className="p-3.5 rounded-sm bg-stone-100/60 dark:bg-stone-900/40 border border-stone-200/60 dark:border-stone-800/60 text-xs text-stone-800 dark:text-stone-200 my-2 font-sans leading-relaxed">
                    <span className="font-semibold font-mono-meta text-[11px] uppercase tracking-wide text-stone-500 dark:text-stone-400 block mb-1">
                      Master&apos;s Thesis Topic:
                    </span>
                    {edu.thesisTopic}
                  </div>
                )}

                <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1 pl-4 list-disc marker:text-stone-400 max-w-2xl">
                  {edu.details.map((detail, dIdx) => (
                    <li key={dIdx}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="space-y-6">
          <h3 className="text-xs font-mono-meta uppercase tracking-wider text-stone-400 dark:text-stone-500 font-semibold border-b border-stone-200/60 dark:border-stone-800/60 pb-2">
            Research & Experience
          </h3>

          <div className="space-y-8">
            {cvData.experience.map((exp, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                  <h4 className="font-serif-title text-xl text-stone-900 dark:text-stone-100 font-normal">
                    {exp.role}
                  </h4>
                  <span className="text-xs font-mono-meta text-stone-400 dark:text-stone-500 shrink-0">
                    {exp.period}
                  </span>
                </div>

                <div className="text-xs text-stone-600 dark:text-stone-400 font-mono-meta">
                  {exp.organization} &bull; {exp.location}
                </div>

                <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1 pl-4 list-disc marker:text-stone-400 max-w-2xl">
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Publications & Talks */}
        <section className="space-y-6">
          <h3 className="text-xs font-mono-meta uppercase tracking-wider text-stone-400 dark:text-stone-500 font-semibold border-b border-stone-200/60 dark:border-stone-800/60 pb-2">
            Publications & Talks
          </h3>

          <div className="space-y-4">
            {cvData.publications.map((pub, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="font-serif-title text-base sm:text-lg text-stone-900 dark:text-stone-100">
                  &ldquo;{pub.title}&rdquo;
                </div>
                <div className="text-stone-500 dark:text-stone-400 font-mono-meta text-xs">
                  {pub.venue} &bull; {pub.year} ({pub.type})
                </div>
              </div>
            ))}

            {cvData.talks && cvData.talks.length > 0 &&
              cvData.talks.map((talk: { title: string; event: string; location: string; year: string }, idx: number) => (
                <div key={idx} className="space-y-0.5 pt-2">
                  <div className="font-serif-title text-base sm:text-lg text-stone-900 dark:text-stone-100">
                    {talk.title}
                  </div>
                  <div className="text-stone-500 dark:text-stone-400 font-mono-meta text-xs">
                    {talk.event} &bull; {talk.location} &bull; {talk.year}
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Selected Projects if present */}
        {cvData.projects && cvData.projects.length > 0 && (
          <section className="space-y-6">
            <h3 className="text-xs font-mono-meta uppercase tracking-wider text-stone-400 dark:text-stone-500 font-semibold border-b border-stone-200/60 dark:border-stone-800/60 pb-2">
              Civic Technology & Research Projects
            </h3>

            <div className="space-y-6">
              {cvData.projects.map((proj: any, idx: number) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                    <div className="flex items-baseline gap-2">
                      <h4 className="font-serif-title text-lg text-stone-900 dark:text-stone-100 font-normal">
                        {proj.title}
                      </h4>
                      <span className="text-[10px] font-mono-meta text-stone-400">
                        {proj.type}
                      </span>
                    </div>
                    <span className="text-xs font-mono-meta text-stone-400 shrink-0">
                      {proj.period}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-sans max-w-2xl">
                    {proj.description}
                  </p>

                  {proj.technologies && (
                    <div className="text-[11px] font-mono-meta text-stone-400 pt-0.5">
                      {proj.technologies.join(" &bull; ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Competencies & Skills */}
        <section className="space-y-6">
          <h3 className="text-xs font-mono-meta uppercase tracking-wider text-stone-400 dark:text-stone-500 font-semibold border-b border-stone-200/60 dark:border-stone-800/60 pb-2">
            Competencies & Skills
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1">
              <span className="font-mono-meta uppercase text-[10px] text-stone-400 tracking-wider block">
                Democratic & Civic AI
              </span>
              <p className="text-stone-800 dark:text-stone-200 font-sans leading-relaxed">
                {cvData.skills.democraticCivicAI.join(", ")}
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-mono-meta uppercase text-[10px] text-stone-400 tracking-wider block">
                AI Ethics & Auditing
              </span>
              <p className="text-stone-800 dark:text-stone-200 font-sans leading-relaxed">
                {cvData.skills.aiEthicsAuditing.join(", ")}
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-mono-meta uppercase text-[10px] text-stone-400 tracking-wider block">
                Creative Technology & Speculative UI
              </span>
              <p className="text-stone-800 dark:text-stone-200 font-sans leading-relaxed">
                {cvData.skills.creativeTechnology.join(", ")}
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-mono-meta uppercase text-[10px] text-stone-400 tracking-wider block">
                Cultural Data & Standards
              </span>
              <p className="text-stone-800 dark:text-stone-200 font-sans leading-relaxed">
                {cvData.skills.culturalDataStandards.join(", ")}
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-mono-meta uppercase text-[10px] text-stone-400 tracking-wider block">
                Engineering Stack
              </span>
              <p className="text-stone-800 dark:text-stone-200 font-mono-meta text-[11px] leading-relaxed">
                {cvData.skills.engineeringStack.join(", ")}
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-mono-meta uppercase text-[10px] text-stone-400 tracking-wider block">
                Languages
              </span>
              <p className="text-stone-800 dark:text-stone-200 font-sans leading-relaxed">
                {cvData.skills.languages.join(", ")}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
