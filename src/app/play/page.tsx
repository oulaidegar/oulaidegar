import { Metadata } from "next";
import PongGame from "@/components/PongGame";

export const metadata: Metadata = {
  title: "Play — oulaidegar",
  description:
    "A minimalist, tactile Pong minigame built with HTML5 canvas physics, responsive controls, and synthesized Web Audio.",
};

export default function PlayPage() {
  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Editorial Header */}
      <section className="space-y-3 pt-2 sm:pt-4 border-b border-stone-200/80 dark:border-stone-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono-meta text-stone-500 dark:text-stone-400">
          <span className="uppercase tracking-wider">Playground</span>
          <span>&bull;</span>
          <span>Tactile Kinetics & Canvas Physics</span>
        </div>

        <h1 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl text-stone-900 dark:text-stone-100 font-normal tracking-tight">
          Monastic Pong
        </h1>

        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 font-sans leading-relaxed max-w-2xl">
          An homage to the pioneering 1972 arcade classic, re-rendered through a minimalist, monastic lens. Features paddle spin dynamics, responsive mouse/touch/keyboard controls, audio synthesis, and an adaptive AI sparring partner.
        </p>
      </section>

      {/* The Pong Game */}
      <PongGame />
    </div>
  );
}
