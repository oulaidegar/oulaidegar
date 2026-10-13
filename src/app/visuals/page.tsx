import type { Metadata } from "next";
import PhotoGallery from "@/components/PhotoGallery";

export const metadata: Metadata = {
  title: "Visuals & Photographs",
  description: "Curated photography, urban geometry, and visual archives.",
};

export default function VisualsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="space-y-2 pb-4">
        <h1 className="font-serif-title text-3xl text-stone-900 dark:text-stone-100">
          Visual Archive
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-sans">
          Observational photography, architectural lines, and physical materiality captured across cities and archives. You can upload new photographs directly to this gallery.
        </p>
      </header>

      {/* Interactive Gallery & Uploader */}
      <PhotoGallery />
    </div>
  );
}
