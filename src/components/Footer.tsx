import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { Mail, Braces } from "lucide-react";
import { SpotifyIcon, SubstackIcon } from "@/components/Icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-stone-200/80 dark:border-stone-800/80 py-10 mt-16 text-xs text-stone-500 dark:text-stone-400 font-mono-meta">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
          <div className="space-y-1">
            <div className="font-medium text-stone-800 dark:text-stone-200">
              {siteConfig.fullName}
            </div>
            <div className="text-[11px] text-stone-400 dark:text-stone-500">
              {siteConfig.name} &middot; {siteConfig.location} &middot; {currentYear}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{siteConfig.email}</span>
            </a>
            {siteConfig.linkedin && (
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              >
                LinkedIn
              </a>
            )}
            <a
              href={siteConfig.substack}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1.5 transition-colors"
            >
              <SubstackIcon className="w-3.5 h-3.5" />
              <span>Substack</span>
            </a>
            <a
              href={siteConfig.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1.5 transition-colors"
            >
              <SpotifyIcon className="w-3.5 h-3.5" />
              <span>Spotify</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-stone-200/60 dark:border-stone-800/60">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {siteConfig.secondaryLinks.filter((l) => l.href !== "/data").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Link
            href="/data"
            className="flex items-center gap-1.5 text-stone-400 dark:text-stone-500 hover:text-accent transition-colors"
          >
            <Braces className="w-3.5 h-3.5" />
            <span>This site is machine-readable &rarr;</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
