"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import {
  Key,
  Lock,
  Unlock,
  Upload,
  Trash2,
  ArrowLeft,
  Loader2,
  Check,
  Folder as FolderIcon,
  FolderPlus,
} from "lucide-react";
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
  const [targetFolderId, setTargetFolderId] = useState<Id<"folders"> | "">("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  // New folder form
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderDesc, setNewFolderDesc] = useState("");

  const convexPhotos = useQuery(api.photos.list);
  const convexFolders = useQuery(api.photos.listFolders);

  const generateUploadUrl = useMutation(api.photos.generateUploadUrl);
  const addPhotoMutation = useMutation(api.photos.addPhoto);
  const deletePhotoMutation = useMutation(api.photos.deletePhoto);
  const createFolderMutation = useMutation(api.photos.createFolder);
  const deleteFolderMutation = useMutation(api.photos.deleteFolder);
  const movePhotoMutation = useMutation(api.photos.movePhoto);

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
      const folderParam = targetFolderId ? (targetFolderId as Id<"folders">) : undefined;

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
          folderId: folderParam,
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
          folderId: folderParam,
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
      setTargetFolderId("");
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim() || !adminSecret) return;
    setErrorMsg("");
    try {
      await createFolderMutation({
        adminSecret,
        name: newFolderName,
        description: newFolderDesc || undefined,
      });
      setSuccessMsg(`Created folder "${newFolderName}".`);
      setNewFolderName("");
      setNewFolderDesc("");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to create folder.");
    }
  };

  const handleDeleteFolder = async (id: Id<"folders">, name: string) => {
    if (!confirm(`Delete folder "${name}"? Photos will be moved back to unorganized.`)) return;
    try {
      await deleteFolderMutation({ adminSecret, id });
      setSuccessMsg(`Deleted folder "${name}".`);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to delete folder.");
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

  const handleMovePhoto = async (photoId: Id<"photos">, folderId?: Id<"folders">) => {
    try {
      await movePhotoMutation({ adminSecret, photoId, folderId });
      setSuccessMsg("Updated photo folder.");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to move photo.");
    }
  };

  return (
    <div className="space-y-10 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200/80 dark:border-stone-800/80">
        <div className="flex items-center gap-2">
          <Link
            href="/visuals"
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
              Enter your secret admin passphrase to unlock uploads, folders, and management.
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

          {/* Create Folder Section */}
          <section className="space-y-3 p-5 rounded-sm border border-stone-200 dark:border-stone-800 bg-[#faf8f5] dark:bg-[#161514]">
            <h2 className="font-serif-title text-xl text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <FolderPlus className="w-4 h-4 text-stone-500" />
              <span>Create New Folder</span>
            </h2>

            <form onSubmit={handleCreateFolder} className="space-y-3 font-mono-meta text-xs">
              <input
                type="text"
                required
                placeholder="Folder name (e.g. Paris 2024, Architecture)..."
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Optional description..."
                value={newFolderDesc}
                onChange={(e) => setNewFolderDesc(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xs bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-medium cursor-pointer"
              >
                Create Folder
              </button>
            </form>

            {convexFolders && convexFolders.length > 0 && (
              <div className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-1.5 text-xs font-mono-meta">
                <span className="text-stone-400">Existing folders:</span>
                <div className="flex flex-wrap gap-2">
                  {convexFolders.map((f) => (
                    <span
                      key={f._id}
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                    >
                      <span>{f.name} ({f.count})</span>
                      <button
                        onClick={() => handleDeleteFolder(f._id, f.name)}
                        className="text-stone-400 hover:text-red-500 cursor-pointer"
                        title="Delete folder"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Upload Form */}
          <section className="space-y-4 p-5 rounded-sm border border-stone-200 dark:border-stone-800 bg-[#faf8f5] dark:bg-[#161514]">
            <h2 className="font-serif-title text-xl text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Upload className="w-4 h-4 text-stone-500" />
              <span>Upload New Photograph</span>
            </h2>

            <form onSubmit={handleUploadPhoto} className="space-y-3 font-mono-meta text-xs">
              {/* Destination folder */}
              {convexFolders && convexFolders.length > 0 && (
                <div>
                  <label className="block text-stone-600 dark:text-stone-400 mb-1">
                    Destination Folder
                  </label>
                  <select
                    value={targetFolderId}
                    onChange={(e) => setTargetFolderId(e.target.value as any)}
                    className="w-full px-3 py-1.5 rounded-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                  >
                    <option value="">None (Unsorted Stream on Left)</option>
                    {convexFolders.map((f) => (
                      <option key={f._id} value={f._id}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

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
                <label className="block text-stone-600 dark:text-stone-400 mb-1">Caption</label>
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
                convexPhotos?.map((p) => {
                  const assignedFolder = convexFolders?.find((f) => f._id === p.folderId);
                  return (
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
                            {assignedFolder ? `Folder: ${assignedFolder.name}` : "Unsorted"} &bull; {p.location}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Move folder select */}
                        {convexFolders && convexFolders.length > 0 && (
                          <select
                            value={p.folderId || ""}
                            onChange={(e) =>
                              handleMovePhoto(
                                p._id,
                                e.target.value ? (e.target.value as Id<"folders">) : undefined
                              )
                            }
                            className="text-[10px] px-1.5 py-0.5 rounded-xs border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900"
                          >
                            <option value="">Stream (Unsorted)</option>
                            {convexFolders.map((f) => (
                              <option key={f._id} value={f._id}>
                                {f.name}
                              </option>
                            ))}
                          </select>
                        )}

                        <button
                          onClick={() => handleDeletePhoto(p._id, p.title)}
                          className="text-stone-400 hover:text-red-500 p-1 cursor-pointer"
                          title="Delete photo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
