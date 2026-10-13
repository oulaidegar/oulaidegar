import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { ArrowUpRight, Mail } from "lucide-react";
import { SpotifyIcon, SubstackIcon } from "@/components/Icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-stone-200/80 dark:border-stone-800/80 py-10 mt-16 text-xs text-stone-500 dark:text-stone-400 font-mono-meta">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <div className="font-medium text-stone-800 dark:text-stone-200">
            {siteConfig.name}
          </div>
          <div className="text-[11px] text-stone-400 dark:text-stone-500 mt-0.5">
            M.Sc. Cultural Data & AI &bull; {currentYear}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <a
            href={siteConfig.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1.5 transition-colors"
          >
            <SpotifyIcon className="w-3.5 h-3.5" />
            <span>Spotify</span>
          </a>
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
            href={`mailto:${siteConfig.email}`}
            className="hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1.5 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{siteConfig.email}</span>
          </a>
          <Link
            href="/cv"
            className="hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-0.5 transition-colors"
          >
            <span>CV</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Link
            href="/play"
            className="hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-0.5 transition-colors"
          >
            <span>Pong</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
