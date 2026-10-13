"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { Key, Lock, Unlock, Upload, Trash2, ArrowLeft, Loader2, Check } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const [adminSecret, setAdminSecret] = useState<string>("");
  const [passphraseInput, setPassphraseInput] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [camera, setCamera] = useState("");
  const [film, setFilm] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const convexPhotos = useQuery(api.photos.list);
  const generateUploadUrl = useMutation(api.photos.generateUploadUrl);
  const addPhotoMutation = useMutation(api.photos.addPhoto);
  const deletePhotoMutation = useMutation(api.photos.deletePhoto);

  useEffect(() => {
    const saved = localStorage.getItem("oulaidegar_admin_secret");
    if (saved) setAdminSecret(saved);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passphraseInput.trim()) return;
    const secret = passphraseInput.trim();
    localStorage.setItem("oulaidegar_admin_secret", secret);
    setAdminSecret(secret);
    setPassphraseInput("");
    setErrorMsg("");
  };

  const handleLogout = () => {
    localStorage.removeItem("oulaidegar_admin_secret");
    setAdminSecret("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ""));
  };

  const handleUploadPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile && !imageUrl) {
      setErrorMsg("Please select an image file or provide an image URL.");
      return;
    }
    if (!title) {
      setErrorMsg("Please provide a title.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (selectedFile) {
        const uploadUrl = await generateUploadUrl({ adminSecret });
        const res = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": selectedFile.type },
          body: selectedFile,
        });

        if (!res.ok) throw new Error("Upload failed to Convex storage.");
        const { storageId } = await res.json();

        await addPhotoMutation({
          adminSecret,
          title,
          caption: caption || undefined,
          location: location || undefined,
          year: year || undefined,
          camera: camera || undefined,
          film: film || undefined,
          storageId,
        });
      } else {
        await addPhotoMutation({
          adminSecret,
          title,
          caption: caption || undefined,
          location: location || undefined,
          year: year || undefined,
          camera: camera || undefined,
          film: film || undefined,
          url: imageUrl,
        });
      }

      setSuccessMsg(`Photo "${title}" uploaded successfully!`);
      setTitle("");
      setCaption("");
      setLocation("");
      setCamera("");
      setFilm("");
      setSelectedFile(null);
      setImageUrl("");
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePhoto = async (id: Id<"photos">, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      await deletePhotoMutation({ adminSecret, id });
      setSuccessMsg(`Deleted "${title}".`);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Delete failed.");
    }
  };

  return (
    <div className="space-y-10 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200/80 dark:border-stone-800/80">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-serif-title text-2xl text-stone-900 dark:text-stone-100">
            Admin Console
          </h1>
        </div>

        {adminSecret && (
          <button
            onClick={handleLogout}
            className="text-xs font-mono-meta text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1 cursor-pointer"
          >
            <Lock className="w-3 h-3" />
            <span>Lock</span>
          </button>
        )}
      </div>

      {!adminSecret ? (
        /* Login Screen */
        <div className="p-6 rounded-sm border border-stone-200 dark:border-stone-800 bg-[#faf8f5] dark:bg-[#161514] space-y-4">
          <div className="space-y-1">
            <h2 className="font-serif-title text-xl text-stone-900 dark:text-stone-100">
              Authentication Required
            </h2>
            <p className="text-xs text-stone-500 font-mono-meta">
              Enter your secret admin passphrase to unlock uploads and management.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3 font-mono-meta text-xs">
            <div>
              <input
                type="password"
                required
                placeholder="ADMIN_SECRET..."
                value={passphraseInput}
                onChange={(e) => setPassphraseInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-xs bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-medium hover:opacity-90 cursor-pointer"
            >
              Unlock Console
            </button>
          </form>
        </div>
      ) : (
        /* Authenticated Dashboard */
        <div className="space-y-10">
          {errorMsg && (
            <div className="p-3 rounded-xs bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 text-xs font-mono-meta">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xs bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-mono-meta flex items-center gap-2">
              <Check className="w-3.5 h-3.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Upload Form */}
          <section className="space-y-4 p-5 rounded-sm border border-stone-200 dark:border-stone-800 bg-[#faf8f5] dark:bg-[#161514]">
            <h2 className="font-serif-title text-xl text-stone-900 dark:text-stone-100">
              Upload New Photograph
            </h2>

            <form onSubmit={handleUploadPhoto} className="space-y-3 font-mono-meta text-xs">
              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1">
                  Choose Photo File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-stone-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xs file:border file:border-stone-300 dark:file:border-stone-700 file:text-xs file:bg-stone-100 dark:file:bg-stone-800 file:text-stone-800 dark:file:text-stone-200 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1">
                  Or Direct Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 dark:text-stone-400 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 dark:text-stone-400 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-400 mb-1">
                  Caption
                </label>
                <textarea
                  rows={2}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-stone-600 dark:text-stone-400 mb-1">Year</label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 dark:text-stone-400 mb-1">Camera</label>
                  <input
                    type="text"
                    placeholder="Leica"
                    value={camera}
                    onChange={(e) => setCamera(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 dark:text-stone-400 mb-1">Film</label>
                  <input
                    type="text"
                    placeholder="Tri-X"
                    value={film}
                    onChange={(e) => setFilm(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 rounded-xs bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-medium hover:opacity-90 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading to Convex...</span>
                  </>
                ) : (
                  <span>Upload Photo</span>
                )}
              </button>
            </form>
          </section>

          {/* Existing Photos List */}
          <section className="space-y-4">
            <h2 className="font-serif-title text-xl text-stone-900 dark:text-stone-100">
              Convex Cloud Photos ({convexPhotos?.length || 0})
            </h2>

            <div className="divide-y divide-stone-200/60 dark:divide-stone-800/60 text-xs font-mono-meta">
              {convexPhotos?.length === 0 ? (
                <div className="py-4 text-stone-400">No photos in Convex yet.</div>
              ) : (
                convexPhotos?.map((p) => (
                  <div key={p._id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 truncate">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.url}
                        alt={p.title}
                        className="w-10 h-10 object-cover rounded-xs shrink-0"
                      />
                      <div className="truncate">
                        <div className="text-stone-900 dark:text-stone-100 font-medium truncate">
                          {p.title}
                        </div>
                        <div className="text-[10px] text-stone-400 truncate">
                          {p.location} &bull; {p.year}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeletePhoto(p._id, p.title)}
                      className="text-stone-400 hover:text-red-500 p-1 cursor-pointer shrink-0"
                      title="Delete photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
