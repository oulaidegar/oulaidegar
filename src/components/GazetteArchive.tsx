"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import data from "@/data/gazette-issues.json";

type State = "searchable" | "ocr" | "image";
type Issue = { year: number; issue: number; pages: number; state: State };

const issues: Issue[] = (data.issues as [number, number, number, string][]).map(
  ([year, issue, pages, state]) => ({ year, issue, pages, state: state as State })
);

const stateLabel: Record<State, string> = {
  searchable: "Searchable: OCR, embedded, in the prototype",
  ocr: "Text extracted, not yet searchable",
  image: "Still images of text",
};

const fmt = (n: number) => n.toLocaleString("en-US");

export default function GazetteArchive() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [active, setActive] = useState<Issue | null>(null);

  const { years, totals } = useMemo(() => {
    const byYear = new Map<number, Issue[]>();
    const totals = { issues: 0, pages: 0, searchable: 0, ocr: 0, image: 0 };
    for (const i of issues) {
      if (!byYear.has(i.year)) byYear.set(i.year, []);
      byYear.get(i.year)!.push(i);
      totals.issues += 1;
      totals.pages += i.pages;
      totals[i.state] += i.pages;
    }
    return { years: [...byYear.entries()].sort((a, b) => b[0] - a[0]), totals };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pct = ((totals.searchable / totals.pages) * 100).toFixed(1);

  const tileClass = (s: State) => {
    if (!revealed || s === "image") return "bg-stone-300 dark:bg-stone-700";
    if (s === "searchable") return "bg-accent";
    return "bg-accent/35";
  };

  return (
    <figure ref={ref} className="space-y-5">
      <figcaption className="space-y-1">
        <p className="font-serif-title text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 leading-snug">
          {fmt(totals.pages)} pages of Lebanese law.{" "}
          <span className="text-accent">{fmt(totals.searchable)}</span> can be searched.
        </p>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Every square is one issue of the Official Gazette, 2014–2025. Hover or tap to inspect.
        </p>
      </figcaption>

      <div
        className="space-y-1.5"
        onMouseLeave={() => setActive(null)}
        aria-hidden="true"
      >
        {years.map(([year, list], row) => (
          <div key={year} className="flex items-center gap-3">
            <span className="font-mono-meta text-[10px] text-stone-400 dark:text-stone-500 w-8 shrink-0 tabular-nums">
              {year}
            </span>
            <div className="flex flex-wrap gap-[2px] flex-1">
              {list.map((i, col) => (
                <span
                  key={i.issue}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`block w-[7px] h-[11px] sm:w-[6px] sm:h-[12px] rounded-[1px] cursor-crosshair transition-colors duration-500 motion-reduce:transition-none ${tileClass(
                    i.state
                  )} ${active?.issue === i.issue ? "ring-1 ring-stone-900 dark:ring-stone-100 ring-offset-1 ring-offset-[var(--background)]" : ""}`}
                  style={{ transitionDelay: revealed ? `${row * 60 + col * 6}ms` : "0ms" }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Readout */}
      <div className="min-h-[2.5rem] font-mono-meta text-xs text-stone-600 dark:text-stone-400 border-t border-stone-200/80 dark:border-stone-800/80 pt-3">
        {active ? (
          <span>
            Issue {active.issue} &middot; {active.year} &middot; {fmt(active.pages)} pages &middot;{" "}
            <span className={active.state === "image" ? "" : "text-accent"}>
              {stateLabel[active.state]}
            </span>
          </span>
        ) : (
          <div className="flex flex-wrap gap-x-5 gap-y-1.5">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-[1px] bg-accent" /> Searchable &middot; {fmt(totals.searchable)} pages ({pct}%)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-[1px] bg-accent/35" /> Text extracted &middot; {fmt(totals.ocr)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-[1px] bg-stone-300 dark:bg-stone-700" /> Images only &middot; {fmt(totals.image)}
            </span>
          </div>
        )}
      </div>

      <p className="sr-only">
        The Lebanese Official Gazette archive from 2014 to 2025 contains {totals.issues} issues and{" "}
        {fmt(totals.pages)} pages. In the thesis prototype, {fmt(totals.searchable)} pages (all of
        2025) were made searchable, text was extracted for {fmt(totals.ocr)} pages from 2024, and{" "}
        {fmt(totals.image)} pages remain images only.
      </p>
    </figure>
  );
}
