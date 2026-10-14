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
    <header className="w-full border-b border-stone-200/80 dark:border-stone-800/80 backdrop-blur-sm sticky top-0 z-40 bg-[#faf9f6]/90 dark:bg-[#0f0e0d]/90 transition-colors">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo / Domain identity */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-mono-meta text-sm font-medium tracking-tight text-stone-900 dark:text-stone-100"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="oulaidegar"
            className="w-5 h-5 object-contain rounded-xs transition-transform duration-200 group-hover:scale-110"
          />
          <span>{siteConfig.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-1 text-xs font-mono-meta">
          {siteConfig.navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 py-1 rounded transition-colors duration-150 ${
                  active
                    ? "text-stone-950 dark:text-white font-semibold bg-stone-200/60 dark:bg-stone-800/70"
                    : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pl-1.5 border-l border-stone-200 dark:border-stone-800 ml-1 flex items-center gap-1">
            <Link
              href="/play"
              title="Play Monastic Pong"
              className={`p-1.5 rounded transition-colors ${
                pathname === "/play"
                  ? "text-stone-950 dark:text-white bg-stone-200/60 dark:bg-stone-800/70"
                  : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
            </Link>
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-1.5">
          <Link
            href="/play"
            title="Play Monastic Pong"
            className="w-9 h-9 flex items-center justify-center rounded-md text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
          >
            <Gamepad2 className="w-4 h-4" />
          </Link>
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="w-9 h-9 flex items-center justify-center rounded-md text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-stone-200/80 dark:border-stone-800/80 px-5 py-3 space-y-1 bg-[#faf9f6]/95 dark:bg-[#0f0e0d]/95 backdrop-blur-md animate-in slide-in-from-top-2 duration-150">
          {siteConfig.navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded text-sm font-mono-meta transition-colors ${
                  active
                    ? "text-stone-950 dark:text-white font-semibold bg-stone-200/60 dark:bg-stone-800/70"
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
            className="flex items-center gap-2 px-3 py-2 rounded text-sm font-mono-meta text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Play Monastic Pong</span>
          </Link>
        </div>
      )}
    </header>
  );
}
