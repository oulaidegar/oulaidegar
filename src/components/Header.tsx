"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import { Menu, X, Gamepad2 } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full border-b border-stone-200/80 dark:border-stone-800/80 backdrop-blur-sm sticky top-0 z-40 bg-[#faf8f5]/90 dark:bg-[#11100f]/90 transition-colors">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-mono-meta text-sm font-medium tracking-tight text-stone-900 dark:text-stone-100"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt=""
            className="w-5 h-5 object-contain rounded-xs transition-transform duration-200 group-hover:scale-110"
          />
          <span>{siteConfig.name}</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden sm:flex items-center gap-5 text-[13px]">
          {siteConfig.navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-1 transition-colors duration-150 ${
                  active
                    ? "text-stone-950 dark:text-white after:absolute after:left-0 after:right-0 after:-bottom-[17px] after:h-[2px] after:bg-accent"
                    : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pl-3 border-l border-stone-200 dark:border-stone-800 flex items-center gap-1">
            <Link
              href="/play"
              title="Play Monastic Pong"
              aria-label="Play Monastic Pong"
              className={`p-1.5 rounded transition-colors ${
                pathname === "/play"
                  ? "text-accent"
                  : "text-stone-400 hover:text-stone-900 dark:text-stone-500 dark:hover:text-stone-100"
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
            </Link>
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-1.5">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            className="w-9 h-9 flex items-center justify-center rounded-md text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-stone-200/80 dark:border-stone-800/80 px-5 py-3 space-y-0.5 bg-[#faf8f5]/95 dark:bg-[#11100f]/95 backdrop-blur-md">
          {[...siteConfig.navLinks, ...siteConfig.secondaryLinks].map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded text-[15px] transition-colors ${
                  active
                    ? "text-stone-950 dark:text-white font-medium bg-accent-soft"
                    : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/play"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded text-[15px] text-stone-500 dark:text-stone-400"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Pong</span>
          </Link>
        </div>
      )}
    </header>
  );
}
