"use client";

import { useEffect } from "react";
import { Photo } from "@/data/photos";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import Image from "next/image";

interface PhotoLightboxProps {
  photo: Photo | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export default function PhotoLightbox({
  photo,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: PhotoLightboxProps) {
  useEffect(() => {
    if (!photo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [photo, onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div
        className="w-full max-w-5xl mx-auto flex items-center justify-between text-stone-300 font-mono-meta text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="truncate pr-4">{photo.title}</span>
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="p-1.5 rounded-full hover:bg-stone-800 text-stone-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Area */}
      <div
        className="relative flex-1 flex items-center justify-center my-2 max-w-5xl mx-auto w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {hasPrev && (
          <button
            onClick={onPrev}
            aria-label="Previous photo"
            className="absolute left-2 z-10 p-2 rounded-full bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Image container */}
        <div className="relative max-h-[75vh] max-w-full flex items-center justify-center overflow-hidden rounded-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.url}
            alt={photo.title}
            className="max-h-[75vh] max-w-full object-contain rounded-sm shadow-2xl"
          />
        </div>

        {hasNext && (
          <button
            onClick={onNext}
            aria-label="Next photo"
            className="absolute right-2 z-10 p-2 rounded-full bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Caption & Metadata Footer */}
      <div
        className="w-full max-w-5xl mx-auto text-stone-300 font-mono-meta text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-2 border-t border-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <p className="font-sans text-stone-200 text-sm">{photo.caption}</p>
          <p className="text-[11px] text-stone-400 mt-0.5">
            {photo.location} &bull; {photo.year}
          </p>
        </div>

        {(photo.camera || photo.film) && (
          <div className="flex items-center gap-2 text-stone-400 text-[11px]">
            <Camera className="w-3.5 h-3.5" />
            <span>
              {[photo.camera, photo.film].filter(Boolean).join(" / ")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
