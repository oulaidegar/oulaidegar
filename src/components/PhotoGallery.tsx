"use client";

import { useState, useEffect } from "react";
import { initialPhotos, Photo } from "@/data/photos";
import PhotoLightbox from "./PhotoLightbox";
import { Plus, Upload, Trash2, Camera, Info, X } from "lucide-react";

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [camera, setCamera] = useState("");
  const [film, setFilm] = useState("");
  const [aspectRatio, setAspectRatio] = useState<"portrait" | "landscape" | "square">("landscape");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadError, setUploadError] = useState("");

  // Load custom photos from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("oulaidegar_user_photos");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPhotos([...parsed, ...initialPhotos]);
        }
      }
    } catch (e) {
      console.error("Could not load photos from storage:", e);
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file (JPEG, PNG, WebP).");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setUploadError("File size exceeds 8MB. Please choose a smaller image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImageUrl(result);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, ""));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      setUploadError("Please provide an image file or direct URL.");
      return;
    }
    if (!title) {
      setUploadError("Please enter a title for the picture.");
      return;
    }

    const newPhoto: Photo = {
      id: "user-" + Date.now(),
      url: imageUrl,
      title,
      caption: caption || title,
      location: location || "Archive",
      year: year || new Date().getFullYear().toString(),
      aspectRatio,
      camera: camera || undefined,
      film: film || undefined,
    };

    const updated = [newPhoto, ...photos];
    setPhotos(updated);

    // Save user uploaded photos
    try {
      const stored = localStorage.getItem("oulaidegar_user_photos");
      const currentList: Photo[] = stored ? JSON.parse(stored) : [];
      localStorage.setItem(
        "oulaidegar_user_photos",
        JSON.stringify([newPhoto, ...currentList])
      );
    } catch (err) {
      console.error("Error saving photo to local storage:", err);
    }

    // Reset form
    setTitle("");
    setCaption("");
    setLocation("");
    setCamera("");
    setFilm("");
    setImageUrl("");
    setUploadError("");
    setIsUploadOpen(false);
  };

  const clearCustomPhotos = () => {
    if (confirm("Reset gallery back to default photographs?")) {
      localStorage.removeItem("oulaidegar_user_photos");
      setPhotos(initialPhotos);
    }
  };

  const currentPhoto =
    selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200 dark:border-stone-800">
        <div className="text-xs font-mono-meta text-stone-500 dark:text-stone-400">
          Visual Archive &bull; {photos.length} photos
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-meta rounded border border-stone-300 dark:border-stone-700 hover:border-stone-900 dark:hover:border-stone-300 text-stone-800 dark:text-stone-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload Picture</span>
          </button>
          {photos.length > initialPhotos.length && (
            <button
              onClick={clearCustomPhotos}
              title="Reset uploaded pictures"
              className="p-1.5 text-xs font-mono-meta text-stone-400 hover:text-red-500 rounded transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid of Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhotoIndex(index)}
            className="group cursor-pointer rounded-sm overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800/80 transition-all hover:border-stone-400 dark:hover:border-stone-600"
          >
            <div className="aspect-[4/3] w-full overflow-hidden relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-2.5 bg-[#faf9f6] dark:bg-[#161514] font-mono-meta">
              <div className="text-xs text-stone-900 dark:text-stone-100 truncate font-medium">
                {photo.title}
              </div>
              <div className="text-[11px] text-stone-500 dark:text-stone-400 flex justify-between items-center mt-1">
                <span className="truncate pr-2">{photo.location}</span>
                <span>{photo.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <PhotoLightbox
        photo={currentPhoto}
        onClose={() => setSelectedPhotoIndex(null)}
        onPrev={() =>
          setSelectedPhotoIndex((prev) =>
            prev !== null && prev > 0 ? prev - 1 : photos.length - 1
          )
        }
        onNext={() =>
          setSelectedPhotoIndex((prev) =>
            prev !== null && prev < photos.length - 1 ? prev + 1 : 0
          )
        }
        hasPrev={photos.length > 1}
        hasNext={photos.length > 1}
      />

      {/* Upload Picture Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#faf9f6] dark:bg-[#161514] border border-stone-300 dark:border-stone-700 rounded-lg max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
              <h3 className="font-serif-title text-xl text-stone-900 dark:text-stone-100">
                Upload New Picture
              </h3>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePhoto} className="space-y-4 text-xs font-mono-meta">
              {uploadError && (
                <div className="p-2.5 rounded bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 text-[11px]">
                  {uploadError}
                </div>
              )}

              {/* File upload or URL */}
              <div>
                <label className="block text-stone-700 dark:text-stone-300 mb-1">
                  Choose Image File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full text-stone-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border file:border-stone-300 dark:file:border-stone-700 file:text-xs file:bg-stone-100 dark:file:bg-stone-800 file:text-stone-800 dark:file:text-stone-200 hover:file:bg-stone-200 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-stone-700 dark:text-stone-300 mb-1">
                  Or Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-1.5 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-500"
                />
              </div>

              {imageUrl && (
                <div className="w-full h-32 relative border border-stone-200 dark:border-stone-800 rounded overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Monolith at Sunrise"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-1.5 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Paris, France"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-1.5 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 dark:text-stone-300 mb-1">
                  Caption / Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Short reflection or context..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-3 py-1.5 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 mb-1">
                    Camera
                  </label>
                  <input
                    type="text"
                    placeholder="Leica / iPhone"
                    value={camera}
                    onChange={(e) => setCamera(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 mb-1">
                    Film / Note
                  </label>
                  <input
                    type="text"
                    placeholder="Kodak Tri-X"
                    value={film}
                    onChange={(e) => setFilm(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-2.5 bg-stone-100 dark:bg-stone-800/50 rounded flex items-start gap-2 text-[11px] text-stone-500 dark:text-stone-400">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Photos uploaded here persist immediately in your browser. To make photos permanent in the source code, drop files into <code>public/photos/</code> and add them to <code>src/data/photos.ts</code>.
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-3 py-1.5 rounded border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 font-medium hover:opacity-90"
                >
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
