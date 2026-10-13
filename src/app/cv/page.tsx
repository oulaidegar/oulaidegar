"use client";

import { cvData } from "@/data/cvData";
import { Printer } from "lucide-react";

export default function CVPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-10">
      {/* Top Action Bar (hidden in print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200 dark:border-stone-800 no-print">
        <div>
          <h1 className="font-serif-title text-3xl text-stone-900 dark:text-stone-100">
            Curriculum Vitae
          </h1>
          <p className="text-xs text-stone-500 font-mono-meta mt-0.5">
            Updated Autumn 2025 &bull; Academic & Practice Track
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono-meta border border-stone-300 dark:border-stone-700 hover:border-stone-900 dark:hover:border-stone-200 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 transition-colors cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Export PDF</span>
        </button>
      </div>

      {/* CV Document Container */}
      <div className="space-y-8 font-sans text-stone-800 dark:text-stone-200">
        {/* Header Block */}
        <header className="space-y-3 pb-6 border-b border-stone-300 dark:border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h2 className="font-serif-title text-2xl sm:text-3xl font-medium text-stone-900 dark:text-stone-100">
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

          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans pt-2">
            {cvData.summary}
          </p>
        </header>

        {/* Education Section */}
        <section className="space-y-4">
          <h3 className="text-xs font-mono-meta uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold border-b border-stone-200 dark:border-stone-800 pb-1">
            Education
          </h3>

          <div className="space-y-5">
            {cvData.education.map((edu, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                  <h4 className="font-semibold text-sm text-stone-900 dark:text-stone-100">
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
                  <div className="p-2.5 rounded bg-stone-100/80 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800 text-xs text-stone-800 dark:text-stone-200 my-1.5 font-sans leading-relaxed">
                    <span className="font-semibold font-mono-meta text-[11px] uppercase tracking-wide text-stone-600 dark:text-stone-400 block mb-0.5">
                      Master&apos;s Thesis Topic:
                    </span>
                    {edu.thesisTopic}
                  </div>
                )}

                <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1 pl-4 list-disc marker:text-stone-400">
                  {edu.details.map((detail, dIdx) => (
                    <li key={dIdx}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="space-y-4">
          <h3 className="text-xs font-mono-meta uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold border-b border-stone-200 dark:border-stone-800 pb-1">
            Research & Experience
          </h3>

          <div className="space-y-5">
            {cvData.experience.map((exp, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                  <h4 className="font-semibold text-sm text-stone-900 dark:text-stone-100">
                    {exp.role}
                  </h4>
                  <span className="text-xs font-mono-meta text-stone-400 dark:text-stone-500 shrink-0">
                    {exp.period}
                  </span>
                </div>

                <div className="text-xs text-stone-600 dark:text-stone-400 font-mono-meta">
                  {exp.organization} &bull; {exp.location}
                </div>

                <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1 pl-4 list-disc marker:text-stone-400">
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Publications & Talks */}
        <section className="space-y-4">
          <h3 className="text-xs font-mono-meta uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold border-b border-stone-200 dark:border-stone-800 pb-1">
            Publications & Talks
          </h3>

          <div className="space-y-3">
            {cvData.publications.map((pub, idx) => (
              <div key={idx} className="text-xs space-y-0.5">
                <div className="font-medium text-stone-900 dark:text-stone-100">
                  &ldquo;{pub.title}&rdquo;
                </div>
                <div className="text-stone-500 dark:text-stone-400 font-mono-meta text-[11px]">
                  {pub.venue} &bull; {pub.year} ({pub.type})
                </div>
              </div>
            ))}

            {cvData.talks.map((talk, idx) => (
              <div key={idx} className="text-xs space-y-0.5 pt-1">
                <div className="font-medium text-stone-900 dark:text-stone-100">
                  {talk.title}
                </div>
                <div className="text-stone-500 dark:text-stone-400 font-mono-meta text-[11px]">
                  {talk.event} &bull; {talk.location} &bull; {talk.year}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Competencies */}
        <section className="space-y-3">
          <h3 className="text-xs font-mono-meta uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold border-b border-stone-200 dark:border-stone-800 pb-1">
            Competencies & Skills
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="font-medium text-stone-800 dark:text-stone-200 block mb-1">
                Machine Learning & AI:
              </span>
              <p className="text-stone-600 dark:text-stone-400 font-mono-meta text-[11px]">
                {cvData.skills.machineLearning.join(", ")}
              </p>
            </div>

            <div>
              <span className="font-medium text-stone-800 dark:text-stone-200 block mb-1">
                Cultural Data & Standards:
              </span>
              <p className="text-stone-600 dark:text-stone-400 font-mono-meta text-[11px]">
                {cvData.skills.culturalData.join(", ")}
              </p>
            </div>

            <div>
              <span className="font-medium text-stone-800 dark:text-stone-200 block mb-1">
                Programming & Tools:
              </span>
              <p className="text-stone-600 dark:text-stone-400 font-mono-meta text-[11px]">
                {cvData.skills.programming.join(", ")}
              </p>
            </div>

            <div>
              <span className="font-medium text-stone-800 dark:text-stone-200 block mb-1">
                Languages:
              </span>
              <p className="text-stone-600 dark:text-stone-400 font-mono-meta text-[11px]">
                {cvData.skills.languages.join(", ")}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
