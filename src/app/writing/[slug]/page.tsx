import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "@/data/posts";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Simple clean markdown-like parser for paragraphs, headings, code, and lists
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBuffer: string[] = [];

    lines.forEach((line, index) => {
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={`code-${index}`}
              className="p-3.5 my-4 rounded-md bg-stone-900 text-stone-100 dark:bg-stone-950 font-mono-meta text-xs overflow-x-auto leading-relaxed border border-stone-800"
            >
              <code>{codeBuffer.join("\n")}</code>
            </pre>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      const trimmed = line.trim();
      if (!trimmed) {
        return;
      }

      if (trimmed.startsWith("### ")) {
        elements.push(
          <h3
            key={index}
            className="font-serif-title text-xl text-stone-900 dark:text-stone-100 mt-8 mb-3 font-normal"
          >
            {trimmed.replace("### ", "")}
          </h3>
        );
      } else if (trimmed.startsWith("#### ")) {
        elements.push(
          <h4
            key={index}
            className="font-serif-title text-base text-stone-900 dark:text-stone-100 mt-6 mb-2 font-medium"
          >
            {trimmed.replace("#### ", "")}
          </h4>
        );
      } else if (trimmed.startsWith("- ")) {
        elements.push(
          <li
            key={index}
            className="ml-5 list-disc text-stone-700 dark:text-stone-300 text-sm leading-relaxed my-1 marker:text-stone-400"
          >
            <span
              dangerouslySetInnerHTML={{
                __html: trimmed
                  .replace("- ", "")
                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                  .replace(/\*(.*?)\*/g, "<em>$1</em>")
                  .replace(/`(.*?)`/g, "<code class='bg-stone-200/80 dark:bg-stone-800 px-1 py-0.5 rounded text-xs font-mono-meta'>$1</code>"),
              }}
            />
          </li>
        );
      } else if (/^\d+\.\s/.test(trimmed)) {
        elements.push(
          <li
            key={index}
            className="ml-5 list-decimal text-stone-700 dark:text-stone-300 text-sm leading-relaxed my-1 marker:text-stone-400"
          >
            <span
              dangerouslySetInnerHTML={{
                __html: trimmed
                  .replace(/^\d+\.\s/, "")
                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                  .replace(/\*(.*?)\*/g, "<em>$1</em>")
                  .replace(/`(.*?)`/g, "<code class='bg-stone-200/80 dark:bg-stone-800 px-1 py-0.5 rounded text-xs font-mono-meta'>$1</code>"),
              }}
            />
          </li>
        );
      } else {
        elements.push(
          <p
            key={index}
            className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed my-3 font-sans"
            dangerouslySetInnerHTML={{
              __html: trimmed
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\*(.*?)\*/g, "<em>$1</em>")
                .replace(/`(.*?)`/g, "<code class='bg-stone-200/80 dark:bg-stone-800 px-1 py-0.5 rounded text-xs font-mono-meta'>$1</code>"),
            }}
          />
        );
      }
    });

    return elements;
  };

  return (
    <article className="space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/writing"
          className="inline-flex items-center gap-1.5 text-xs font-mono-meta text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>all essays</span>
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-3 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-2 text-xs font-mono-meta text-stone-400 dark:text-stone-500">
          <span>{post.date}</span>
          <span>&bull;</span>
          <span>{post.readingTime}</span>
        </div>

        <h1 className="font-serif-title text-2xl sm:text-4xl text-stone-900 dark:text-stone-100 leading-tight">
          {post.title}
        </h1>

        <p className="font-serif-title italic text-stone-600 dark:text-stone-400 text-sm sm:text-base">
          {post.summary}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono-meta px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Body */}
      <div className="prose-content leading-relaxed">{renderContent(post.content)}</div>

      {/* Footer / Colophon */}
      <div className="pt-8 mt-12 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs font-mono-meta text-stone-400">
        <Link
          href="/writing"
          className="hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>back to writing</span>
        </Link>
        <span>oulaidegar</span>
      </div>
    </article>
  );
}
