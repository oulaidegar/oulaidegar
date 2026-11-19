import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Data",
  description: "Everything on this site is available as structured JSON.",
};

const endpoints = [
  { path: "/api", what: "Index of everything below" },
  { path: "/api/projects", what: "Every project, its status, links and details" },
  { path: "/api/notes", what: "All notes, full text" },
  { path: "/api/gazette", what: "All 816 Gazette issues: year, number, pages, processing state" },
  { path: "/api/thesis", what: "Thesis abstract, questions, method, datasets, readings" },
  { path: "/api/cv", what: "Curriculum vitae" },
];

export default function DataPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <div className="label text-stone-500 dark:text-stone-400">Open by default</div>
        <h1 className="font-serif-title text-4xl sm:text-5xl text-stone-900 dark:text-stone-100 font-normal tracking-tight">
          This site is machine-readable
        </h1>
        <div className="rule-double" />
      </header>

      <div className="space-y-4 text-[15px] text-stone-700 dark:text-stone-300 leading-relaxed max-w-2xl">
        <p>
          My thesis started with an archive of public laws published as scanned images:
          readable by people, useless to anyone who wanted to build on it. I&apos;ve{" "}
          <Link href="/notes" className="editorial-link hover:text-accent">
            argued
          </Link>{" "}
          that public information should come with structured data and documented access,
          so the least I can do is the same here.
        </p>
        <p>
          Everything on this site is available as JSON. No key, no sign-up. Use it for
          whatever you like; a credit is appreciated.
        </p>
      </div>

      <ul className="divide-y divide-stone-200/80 dark:divide-stone-800/80 border-y border-stone-200/80 dark:border-stone-800/80">
        {endpoints.map((e) => (
          <li key={e.path}>
            <a
              href={e.path}
              className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 py-4"
            >
              <code className="font-mono-meta text-sm text-stone-900 dark:text-stone-100 group-hover:text-accent transition-colors">
                GET {e.path}
              </code>
              <span className="text-sm text-stone-500 dark:text-stone-400">{e.what}</span>
            </a>
          </li>
        ))}
      </ul>

      <pre className="font-mono-meta text-xs bg-stone-100 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800/80 rounded-sm p-4 overflow-x-auto text-stone-700 dark:text-stone-300">
{`curl https://oulaidegar.com/api/projects`}
      </pre>
    </div>
  );
}
