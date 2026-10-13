"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { initialPhotos, Photo } from "@/data/photos";
import PhotoLightbox from "./PhotoLightbox";
import { Plus, Trash2, X, Lock, Unlock, Loader2, Key } from "lucide-react";

export default function PhotoGallery() {
  const convexPhotos = useQuery(api.photos.list);
  const generateUploadUrl = useMutation(api.photos.generateUploadUrl);
  const addPhotoMutation = useMutation(api.photos.addPhoto);
  const deletePhotoMutation = useMutation(api.photos.deletePhoto);

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Admin secret management
  const [adminSecret, setAdminSecret] = useState<string>("");
  const [passphraseInput, setPassphraseInput] = useState<string>("");
  const [passphraseError, setPassphraseError] = useState<string>("");

  useEffect(() => {
    // Check if admin secret is stored in localStorage
    const savedSecret = localStorage.getItem("oulaidegar_admin_secret");
    if (savedSecret) {
      setAdminSecret(savedSecret);
    }

    // Keyboard shortcut to trigger admin modal: Cmd+Shift+U or Ctrl+Shift+U
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "u") {
        e.preventDefault();
        setIsAdminLoginOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLoginAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passphraseInput.trim()) {
      setPassphraseError("Please enter your admin passphrase.");
      return;
    }
    const secret = passphraseInput.trim();
    localStorage.setItem("oulaidegar_admin_secret", secret);
    setAdminSecret(secret);
    setPassphraseInput("");
    setPassphraseError("");
    setIsAdminLoginOpen(false);
  };

  const handleLogoutAdmin = () => {
    localStorage.removeItem("oulaidegar_admin_secret");
    setAdminSecret("");
  };

  // Form state
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [camera, setCamera] = useState("");
  const [film, setFilm] = useState("");
  const [aspectRatio, setAspectRatio] = useState<"portrait" | "landscape" | "square">("landscape");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadError, setUploadError] = useState("");

  // Merge live Convex photos with initial curated archive
  const displayPhotos: (Photo & { _id?: Id<"photos">; isConvex?: boolean })[] = [
    ...(convexPhotos || []).map((p) => ({
      id: p._id,
      _id: p._id,
      url: p.url,
      title: p.title,
      caption: p.caption || "",
      location: p.location || "Archive",
      year: p.year || "",
      camera: p.camera,
      film: p.film,
      aspectRatio: (p.aspectRatio as "portrait" | "landscape" | "square") || "landscape",
      isConvex: true,
    })),
    ...initialPhotos,
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file (JPEG, PNG, WebP).");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setUploadError("File size exceeds 20MB.");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    if (!title) {
      setTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleSavePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile && !imageUrl) {
      setUploadError("Please choose an image file or provide an image URL.");
      return;
    }
    if (!title) {
      setUploadError("Please enter a title for the picture.");
      return;
    }
    if (!adminSecret) {
      setUploadError("Admin authorization required. Please authenticate.");
      return;
    }

    setIsSubmitting(true);
    setUploadError("");

    try {
      if (selectedFile) {
        // Step 1: Request upload URL from Convex Storage using adminSecret
        const uploadUrl = await generateUploadUrl({ adminSecret });

        // Step 2: POST the file directly to Convex storage
        const response = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": selectedFile.type },
          body: selectedFile,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image file to Convex storage.");
        }

        const { storageId } = await response.json();

        // Step 3: Insert document into Convex database with adminSecret
        await addPhotoMutation({
          adminSecret,
          title,
          caption: caption || undefined,
          location: location || undefined,
          year: year || undefined,
          camera: camera || undefined,
          film: film || undefined,
          storageId,
          aspectRatio,
        });
      } else {
        // Direct URL insertion
        await addPhotoMutation({
          adminSecret,
          title,
          caption: caption || undefined,
          location: location || undefined,
          year: year || undefined,
          camera: camera || undefined,
          film: film || undefined,
          url: imageUrl,
          aspectRatio,
        });
      }

      // Reset form and close
      setTitle("");
      setCaption("");
      setLocation("");
      setCamera("");
      setFilm("");
      setSelectedFile(null);
      setImageUrl("");
      setPreviewUrl("");
      setIsUploadOpen(false);
    } catch (err: unknown) {
      console.error("Convex upload error:", err);
      const msg = err instanceof Error ? err.message : "Failed to save photo to Convex.";
      setUploadError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePhoto = async (photo: typeof displayPhotos[0], e: React.MouseEvent) => {
    e.stopPropagation();
    if (!photo._id || !adminSecret) return;
    if (confirm(`Delete "${photo.title}" from Convex storage?`)) {
      try {
        await deletePhotoMutation({ adminSecret, id: photo._id });
        if (selectedPhotoIndex !== null) setSelectedPhotoIndex(null);
      } catch (err) {
        console.error("Failed to delete photo:", err);
        alert(err instanceof Error ? err.message : "Unauthorized to delete photo.");
      }
    }
  };

  const currentPhoto =
    selectedPhotoIndex !== null ? displayPhotos[selectedPhotoIndex] : null;

  return (
    <div className="space-y-8">
      {/* Admin Mode Bar (Only visible when Admin Secret is set) */}
      {adminSecret ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-sm border border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/60 dark:bg-emerald-950/20 text-xs font-mono-meta text-emerald-900 dark:text-emerald-200">
          <div className="flex items-center gap-2">
            <Unlock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Admin Mode Active &bull; Authorized Uploader</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsUploadOpen(true)}
              className="px-2.5 py-1 rounded-sm bg-emerald-900 text-emerald-50 dark:bg-emerald-200 dark:text-emerald-950 hover:opacity-90 font-medium cursor-pointer"
            >
              + Upload Picture
            </button>
            <button
              onClick={handleLogoutAdmin}
              className="px-2 py-1 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 cursor-pointer"
            >
              Lock / Exit
            </button>
          </div>
        </div>
      ) : null}

      {/* Grid of Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayPhotos.map((photo, index) => (
          <div
            key={photo.id || index}
            onClick={() => setSelectedPhotoIndex(index)}
            className="group cursor-pointer space-y-2"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-900 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-500 grayscale hover:grayscale-0 group-hover:scale-105"
              />
              {/* Only show delete button if admin mode is unlocked */}
              {adminSecret && photo._id && (
                <button
                  onClick={(e) => handleDeletePhoto(photo, e)}
                  title="Delete photo from Convex"
                  className="absolute top-2 right-2 p-1.5 rounded-xs bg-black/60 text-stone-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="space-y-0.5">
              <div className="text-xs font-serif-title text-stone-900 dark:text-stone-100 truncate group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors font-medium">
                {photo.title}
              </div>
              <div className="text-[11px] font-mono-meta text-stone-400 dark:text-stone-500 flex justify-between items-center">
                <span className="truncate pr-2">{photo.location}</span>
                <span>{photo.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Discrete footer trigger for admin login */}
      <div className="pt-6 border-t border-stone-200/40 dark:border-stone-800/40 flex justify-between items-center text-[11px] font-mono-meta text-stone-400 dark:text-stone-500">
        <span>{displayPhotos.length} photographs</span>
        <button
          onClick={() => setIsAdminLoginOpen(true)}
          className="flex items-center gap-1 hover:text-stone-700 dark:hover:text-stone-300 transition-colors cursor-pointer"
          title="Admin Access (Shortcut: Cmd+Shift+U)"
        >
          {adminSecret ? <Unlock className="w-3 h-3 text-emerald-500" /> : <Lock className="w-3 h-3" />}
          <span>{adminSecret ? "admin active" : "admin"}</span>
        </button>
      </div>

      {/* Lightbox Modal */}
      <PhotoLightbox
        photo={currentPhoto}
        onClose={() => setSelectedPhotoIndex(null)}
        onPrev={() =>
          setSelectedPhotoIndex((prev) =>
            prev !== null && prev > 0 ? prev - 1 : displayPhotos.length - 1
          )
        }
        onNext={() =>
          setSelectedPhotoIndex((prev) =>
            prev !== null && prev < displayPhotos.length - 1 ? prev + 1 : 0
          )
        }
        hasPrev={displayPhotos.length > 1}
        hasNext={displayPhotos.length > 1}
      />

      {/* Admin Passphrase Login Modal */}
      {isAdminLoginOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#faf8f5] dark:bg-[#161514] border border-stone-300 dark:border-stone-800 rounded-sm max-w-sm w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
              <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-serif-title text-lg">
                <Key className="w-4 h-4" />
                <span>Admin Passphrase</span>
              </div>
              <button
                onClick={() => setIsAdminLoginOpen(false)}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleLoginAdmin} className="space-y-3 text-xs font-mono-meta">
              {passphraseError && (
                <div className="p-2 rounded bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 text-[11px]">
                  {passphraseError}
                </div>
              )}

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1">
                  Enter your ADMIN_SECRET
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="Passphrase..."
                  value={passphraseInput}
                  onChange={(e) => setPassphraseInput(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <p className="text-[10px] text-stone-400 dark:text-stone-500 leading-normal">
                Stored securely in your local browser storage. Verified server-side by Convex on every upload or deletion.
              </p>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-200 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsAdminLoginOpen(false)}
                  className="px-2.5 py-1 text-stone-500 hover:text-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded-xs bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 font-medium hover:opacity-90"
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Picture Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#faf8f5] dark:bg-[#161514] border border-stone-300 dark:border-stone-800 rounded-sm max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
              <div>
                <h3 className="font-serif-title text-xl text-stone-900 dark:text-stone-100">
                  Upload Picture to Convex
                </h3>
                <p className="text-[11px] font-mono-meta text-emerald-600 dark:text-emerald-400 mt-0.5">
                  Authenticated via ADMIN_SECRET
                </p>
              </div>
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

              {/* File upload input */}
              <div>
                <label className="block text-stone-700 dark:text-stone-300 mb-1">
                  Choose Photo File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-stone-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xs file:border file:border-stone-300 dark:file:border-stone-700 file:text-xs file:bg-stone-100 dark:file:bg-stone-800 file:text-stone-800 dark:file:text-stone-200 hover:file:bg-stone-200 cursor-pointer"
                />
              </div>

              {/* Or direct URL */}
              <div>
                <label className="block text-stone-700 dark:text-stone-300 mb-1">
                  Or External Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setPreviewUrl(e.target.value);
                  }}
                  className="w-full px-3 py-1.5 rounded-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              {previewUrl && (
                <div className="w-full h-32 relative border border-stone-200 dark:border-stone-800 rounded-xs overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
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
                    placeholder="E.g. Monolithic Shadow"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
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
                    className="w-full px-3 py-1.5 rounded-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 dark:text-stone-300 mb-1">
                  Caption
                </label>
                <textarea
                  rows={2}
                  placeholder="Context or photographic reflection..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
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
                    className="w-full px-2.5 py-1.5 rounded-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 mb-1">
                    Camera
                  </label>
                  <input
                    type="text"
                    placeholder="Leica M6"
                    value={camera}
                    onChange={(e) => setCamera(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 mb-1">
                    Film / Note
                  </label>
                  <input
                    type="text"
                    placeholder="Tri-X 400"
                    value={film}
                    onChange={(e) => setFilm(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-200 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  disabled={isSubmitting}
                  className="px-3 py-1.5 rounded-xs border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:text-stone-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xs bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 font-medium hover:opacity-90 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Uploading to Convex...</span>
                    </>
                  ) : (
                    <span>Save to Convex</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
