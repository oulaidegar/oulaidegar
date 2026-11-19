import type { Project } from "@/data/projects";

const styles: Record<Project["status"], string> = {
  Live: "bg-emerald-500",
  Prototype: "bg-amber-500",
  "In development": "bg-stone-400 dark:bg-stone-500",
};

export default function StatusMark({ status }: { status: Project["status"] }) {
  return (
    <span className="inline-flex items-center gap-1.5 label text-stone-500 dark:text-stone-400 normal-case tracking-normal text-[11px]">
      <span className={`w-1.5 h-1.5 rounded-full ${styles[status]}`} />
      {status}
    </span>
  );
}
