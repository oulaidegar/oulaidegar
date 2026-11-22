import type { CaseStudy } from "@/data/projects";

/** Problem → What I did → Evidence → Governance lesson. */
export default function CaseStudyBlock({
  study,
  compact = false,
}: {
  study: CaseStudy;
  compact?: boolean;
}) {
  const label = "label text-stone-400 dark:text-stone-500 pt-0.5";
  const body = "text-[15px] text-stone-700 dark:text-stone-300 leading-relaxed";

  return (
    <dl className="grid grid-cols-1 sm:grid-cols-[8.5rem_1fr] gap-x-6 gap-y-2 sm:gap-y-4">
      {!compact && (
        <>
          <dt className={label}>Problem</dt>
          <dd className={body}>{study.problem}</dd>

          <dt className={`${label} mt-2 sm:mt-0`}>What I did</dt>
          <dd className={body}>{study.whatIDid}</dd>
        </>
      )}

      <dt className={`${label} ${compact ? "" : "mt-2 sm:mt-0"}`}>Evidence</dt>
      <dd>
        <ul className="space-y-1">
          {study.evidence.map((e) => (
            <li key={e} className="flex gap-2.5 font-mono-meta text-[13px] text-stone-800 dark:text-stone-200">
              <span className="text-accent select-none">&middot;</span>
              <span>{e}</span>
            </li>
          ))}
        </ul>
      </dd>

      <dt className={`${label} text-accent! mt-2 sm:mt-0`}>Governance lesson</dt>
      <dd className="font-serif-title text-lg text-stone-900 dark:text-stone-100 leading-snug border-l-2 border-accent pl-4">
        {study.lesson}
      </dd>
    </dl>
  );
}
