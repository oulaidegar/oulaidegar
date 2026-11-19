import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 sm:py-24 space-y-6">
      <div className="font-mono-meta text-7xl sm:text-8xl text-accent tracking-tight">404</div>
      <h1 className="font-serif-title text-3xl sm:text-4xl text-stone-900 dark:text-stone-100">
        Not Found.
      </h1>
      <p className="text-[15px] text-stone-600 dark:text-stone-400 max-w-md leading-relaxed">
        This page doesn&apos;t exist. On the bright side, it isn&apos;t a{" "}
        <Link href="/thesis" className="font-mono-meta text-stone-900 dark:text-stone-100 editorial-link hover:text-accent">
          402
        </Link>
        : nobody is asking you to pay to read it.
      </p>
      <Link
        href="/"
        className="inline-block text-sm font-medium text-stone-900 dark:text-stone-100 hover:text-accent transition-colors"
      >
        &larr; Back to the front page
      </Link>
    </div>
  );
}
