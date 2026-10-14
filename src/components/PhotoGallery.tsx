"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { initialPhotos, Photo } from "@/data/photos";
import PhotoLightbox from "./PhotoLightbox";
import {
  Plus,
  Trash2,
  X,
  Lock,
  Unlock,
  Loader2,
  Key,
  Folder as FolderIcon,
  FolderPlus,
  FolderOpen,
  ArrowRight,
  MoveRight,
  Check,
} from "lucide-react";

export default function PhotoGallery() {
  const convexPhotos = useQuery(api.photos.list);
  const convexFolders = useQuery(api.photos.listFolders);

  const generateUploadUrl = useMutation(api.photos.generateUploadUrl);
  const addPhotoMutation = useMutation(api.photos.addPhoto);
  const deletePhotoMutation = useMutation(api.photos.deletePhoto);
  const createFolderMutation = useMutation(api.photos.createFolder);
  const deleteFolderMutation = useMutation(api.photos.deleteFolder);
  const movePhotoMutation = useMutation(api.photos.movePhoto);

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isNewFolderOpen, setIsNewFolderOpen] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<Id<"folders"> | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderDesc, setNewFolderDesc] = useState("");
  const [folderActionError, setFolderActionError] = useState("");

  // Admin secret management
  const [adminSecret, setAdminSecret] = useState<string>("");
  const [passphraseInput, setPassphraseInput] = useState<string>("");
  const [passphraseError, setPassphraseError] = useState<string>("");

  // Move-to-folder dropdown state for a specific photo
  const [movingPhotoId, setMovingPhotoId] = useState<string | null>(null);

  useEffect(() => {
    const savedSecret = localStorage.getItem("oulaidegar_admin_secret");
    if (savedSecret) {
      setAdminSecret(savedSecret);
    }

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

  // Form state for uploading
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [camera, setCamera] = useState("");
  const [film, setFilm] = useState("");
  const [aspectRatio, setAspectRatio] = useState<"portrait" | "landscape" | "square">("landscape");
  const [targetFolderId, setTargetFolderId] = useState<Id<"folders"> | "">("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadError, setUploadError] = useState("");

  // Source photos: use live Convex photos once loaded; fallback to initialPhotos while loading
  const allPhotos: (Photo & {
    _id?: Id<"photos">;
    folderId?: Id<"folders">;
    isConvex?: boolean;
  })[] =
    convexPhotos !== undefined
      ? convexPhotos.map((p) => ({
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
          folderId: p.folderId,
          isConvex: true,
        }))
      : initialPhotos.map((p) => ({
          ...p,
          isConvex: false,
        }));

  // Left side: pictures that are NOT in any folder
  const unorganizedPhotos = allPhotos.filter((p) => !p.folderId);

  // Selected folder's photos (if viewing a folder)
  const currentFolder = convexFolders?.find((f) => f._id === selectedFolderId);
  const photosInSelectedFolder = selectedFolderId
    ? allPhotos.filter((p) => p.folderId === selectedFolderId)
    : [];

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim() || !adminSecret) return;
    setFolderActionError("");
    try {
      await createFolderMutation({
        adminSecret,
        name: newFolderName,
        description: newFolderDesc || undefined,
      });
      setNewFolderName("");
      setNewFolderDesc("");
      setIsNewFolderOpen(false);
    } catch (err) {
      setFolderActionError(err instanceof Error ? err.message : "Failed to create folder.");
    }
  };

  const handleDeleteFolder = async (id: Id<"folders">, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!adminSecret) return;
    if (confirm(`Delete folder "${name}"? Photos will be returned to the stream.`)) {
      try {
        await deleteFolderMutation({ adminSecret, id });
        if (selectedFolderId === id) setSelectedFolderId(null);
      } catch (err) {
        alert(err instanceof Error ? err.message : "Failed to delete folder.");
      }
    }
  };

  const handleMovePhoto = async (photoId: Id<"photos">, folderId?: Id<"folders">) => {
    if (!adminSecret) return;
    try {
      await movePhotoMutation({ adminSecret, photoId, folderId });
      setMovingPhotoId(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to move photo.");
    }
  };

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
      const folderParam = targetFolderId ? (targetFolderId as Id<"folders">) : undefined;

      if (selectedFile) {
        const uploadUrl = await generateUploadUrl({ adminSecret });
        const response = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": selectedFile.type },
          body: selectedFile,
        });

        if (!response.ok) throw new Error("Failed to upload image file to Convex storage.");
        const { storageId } = await response.json();

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
          aspectRatio,
          folderId: folderParam,
        });
      }

      setTitle("");
      setCaption("");
      setLocation("");
      setCamera("");
      setFilm("");
      setSelectedFile(null);
      setImageUrl("");
      setPreviewUrl("");
      setTargetFolderId("");
      setIsUploadOpen(false);
    } catch (err: unknown) {
      console.error("Convex upload error:", err);
      setUploadError(err instanceof Error ? err.message : "Failed to save photo to Convex.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePhoto = async (photoId: Id<"photos">, photoTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!adminSecret) return;
    if (confirm(`Delete "${photoTitle}" from Convex?`)) {
      try {
        await deletePhotoMutation({ adminSecret, id: photoId });
        if (selectedPhotoIndex !== null) setSelectedPhotoIndex(null);
      } catch (err) {
        alert(err instanceof Error ? err.message : "Unauthorized to delete photo.");
      }
    }
  };

  // Lightbox selection handles allPhotos
  const currentPhoto =
    selectedPhotoIndex !== null ? allPhotos[selectedPhotoIndex] : null;

  return (
    <div className="space-y-8">
      {/* Admin Mode Bar */}
      {adminSecret && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-sm border border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/60 dark:bg-emerald-950/20 text-xs font-mono-meta text-emerald-900 dark:text-emerald-200">
          <div className="flex items-center gap-2">
            <Unlock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Admin Mode Active &bull; Organize & Upload</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsNewFolderOpen(true)}
              className="flex items-center gap-1 hover:underline cursor-pointer"
            >
              <FolderPlus className="w-3.5 h-3.5" />
              <span>+ New Folder</span>
            </button>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="px-2.5 py-1 rounded-sm bg-emerald-900 text-emerald-50 dark:bg-emerald-200 dark:text-emerald-950 font-medium hover:opacity-90 cursor-pointer"
            >
              + Upload Photo
            </button>
            <button
              onClick={handleLogoutAdmin}
              className="text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 cursor-pointer"
            >
              Lock
            </button>
          </div>
        </div>
      )}

      {/* Main Two-Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ============================================================ */}
        {/* LEFT COLUMN: All Pictures NOT in a folder (Stream / Inbox)    */}
        {/* ============================================================ */}
        <section className="lg:col-span-7 space-y-4">
          <div className="flex items-baseline justify-between pb-2 border-b border-stone-200/80 dark:border-stone-800/80">
            <div className="flex items-baseline gap-2">
              <h2 className="font-serif-title text-xl text-stone-900 dark:text-stone-100">
                Unsorted Stream
              </h2>
              <span className="text-xs font-mono-meta text-stone-400 dark:text-stone-500">
                ({unorganizedPhotos.length})
              </span>
            </div>
            <span className="text-[11px] font-mono-meta text-stone-400">
              Not in any folder
            </span>
          </div>

          {unorganizedPhotos.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono-meta text-stone-400 border border-dashed border-stone-200 dark:border-stone-800 rounded-sm">
              All pictures are organized into folders.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {unorganizedPhotos.map((photo) => {
                const globalIndex = allPhotos.findIndex((p) => p.id === photo.id);
                return (
                  <div key={photo.id} className="group space-y-2 relative">
                    <div
                      onClick={() => setSelectedPhotoIndex(globalIndex)}
                      className="aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-900 relative cursor-pointer"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.url}
                        alt={photo.title}
                        loading="lazy"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                      />

                      {/* Admin controls */}
                      {adminSecret && photo._id && (
                        <div className="absolute top-2 right-2 flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setMovingPhotoId(movingPhotoId === photo._id ? null : photo._id!);
                            }}
                            title="Move to folder"
                            className="p-1.5 sm:p-1 rounded-xs bg-black/75 text-stone-200 hover:text-white hover:bg-black/90 cursor-pointer"
                          >
                            <FolderIcon className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDeletePhoto(photo._id!, photo.title, e)}
                            title="Delete"
                            className="p-1.5 sm:p-1 rounded-xs bg-black/75 text-stone-200 hover:text-red-400 hover:bg-black/90 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Move to folder quick selector */}
                    {movingPhotoId === photo._id && (
                      <div className="p-2.5 rounded-sm bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs font-mono-meta space-y-1.5 shadow-lg z-10 relative">
                        <div className="flex justify-between items-center text-[11px] text-stone-500">
                          <span>Move to folder:</span>
                          <button
                            onClick={() => setMovingPhotoId(null)}
                            className="text-stone-400 hover:text-stone-700"
                          >
                            &times;
                          </button>
                        </div>
                        {convexFolders && convexFolders.length > 0 ? (
                          <div className="space-y-1 max-h-32 overflow-y-auto">
                            {convexFolders.map((f) => (
                              <button
                                key={f._id}
                                onClick={() => handleMovePhoto(photo._id!, f._id)}
                                className="w-full text-left px-2 py-1 rounded-xs hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 flex items-center justify-between cursor-pointer"
                              >
                                <span className="truncate">{f.name}</span>
                                <MoveRight className="w-3 h-3 text-stone-400" />
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[11px] text-stone-400">
                            No folders yet. Create one on the right!
                          </p>
                        )}
                      </div>
                    )}

                    <div className="space-y-0.5">
                      <div className="text-xs font-serif-title text-stone-900 dark:text-stone-100 truncate font-medium">
                        {photo.title}
                      </div>
                      <div className="text-[11px] font-mono-meta text-stone-400 dark:text-stone-500 flex justify-between items-center">
                        <span className="truncate pr-2">{photo.location}</span>
                        <span>{photo.year}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: The Different Folders & Contents               */}
        {/* ============================================================ */}
        <section className="lg:col-span-5 space-y-4">
          <div className="flex items-baseline justify-between pb-2 border-b border-stone-200/80 dark:border-stone-800/80">
            <div className="flex items-baseline gap-2">
              <h2 className="font-serif-title text-xl text-stone-900 dark:text-stone-100">
                Folders
              </h2>
              <span className="text-xs font-mono-meta text-stone-400 dark:text-stone-500">
                ({convexFolders?.length || 0})
              </span>
            </div>

            {adminSecret && (
              <button
                onClick={() => setIsNewFolderOpen(true)}
                className="text-xs font-mono-meta text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-100 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>New Folder</span>
              </button>
            )}
          </div>

          {/* New Folder Inline Form */}
          {isNewFolderOpen && (
            <form
              onSubmit={handleCreateFolder}
              className="p-3.5 rounded-sm border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 space-y-2.5 text-xs font-mono-meta"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  Create Folder
                </span>
                <button
                  type="button"
                  onClick={() => setIsNewFolderOpen(false)}
                  className="text-stone-400 hover:text-stone-700"
                >
                  &times;
                </button>
              </div>

              {folderActionError && (
                <div className="text-[11px] text-red-600">{folderActionError}</div>
              )}

              <input
                type="text"
                required
                placeholder="Folder name (e.g. Paris 2024)..."
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xs border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 focus:outline-none"
              />

              <input
                type="text"
                placeholder="Optional description..."
                value={newFolderDesc}
                onChange={(e) => setNewFolderDesc(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xs border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 focus:outline-none text-[11px]"
              />

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsNewFolderOpen(false)}
                  className="px-2 py-1 text-stone-500 hover:text-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded-xs bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-medium"
                >
                  Create
                </button>
              </div>
            </form>
          )}

          {/* If viewing a specific folder */}
          {selectedFolderId && currentFolder ? (
            <div className="space-y-4 p-4 rounded-sm border border-stone-300 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30">
              <div className="flex items-baseline justify-between">
                <div>
                  <button
                    onClick={() => setSelectedFolderId(null)}
                    className="text-[11px] font-mono-meta text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1 mb-1 cursor-pointer"
                  >
                    &larr; Back to all folders
                  </button>
                  <h3 className="font-serif-title text-xl text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-stone-500" />
                    <span>{currentFolder.name}</span>
                  </h3>
                  {currentFolder.description && (
                    <p className="text-xs text-stone-500 font-sans mt-0.5">
                      {currentFolder.description}
                    </p>
                  )}
                </div>

                {adminSecret && (
                  <button
                    onClick={(e) => handleDeleteFolder(currentFolder._id, currentFolder.name, e)}
                    className="text-stone-400 hover:text-red-500 text-xs font-mono-meta p-1"
                    title="Delete folder"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {photosInSelectedFolder.length === 0 ? (
                <div className="py-8 text-center text-xs font-mono-meta text-stone-400">
                  Folder is empty. Move pictures from the left stream into this folder.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {photosInSelectedFolder.map((photo) => {
                    const globalIndex = allPhotos.findIndex((p) => p.id === photo.id);
                    return (
                      <div key={photo.id} className="group space-y-1 relative">
                        <div
                          onClick={() => setSelectedPhotoIndex(globalIndex)}
                          className="aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-900 relative cursor-pointer"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photo.url}
                            alt={photo.title}
                            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                          />

                          {adminSecret && photo._id && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMovePhoto(photo._id!, undefined);
                              }}
                              title="Remove from folder"
                              className="absolute top-1.5 right-1.5 px-2 py-1 rounded-xs bg-black/75 text-stone-200 hover:text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-[10px]"
                            >
                              unassign
                            </button>
                          )}
                        </div>
                        <div className="text-[11px] font-serif-title truncate text-stone-900 dark:text-stone-100">
                          {photo.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* List of all folders */
            <div className="space-y-3">
              {convexFolders?.length === 0 ? (
                <div className="py-8 text-center text-xs font-mono-meta text-stone-400 border border-dashed border-stone-200 dark:border-stone-800 rounded-sm">
                  No folders created yet.
                  {adminSecret && (
                    <div className="mt-2">
                      <button
                        onClick={() => setIsNewFolderOpen(true)}
                        className="underline text-stone-600 dark:text-stone-300 cursor-pointer"
                      >
                        Create your first folder
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                convexFolders?.map((folder) => (
                  <div
                    key={folder._id}
                    onClick={() => setSelectedFolderId(folder._id)}
                    className="p-3.5 rounded-sm border border-stone-200/90 dark:border-stone-800/80 hover:border-stone-400 dark:hover:border-stone-600 bg-white dark:bg-stone-950 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3 truncate">
                      {folder.coverUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={folder.coverUrl}
                          alt={folder.name}
                          className="w-11 h-11 object-cover rounded-xs shrink-0"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-xs bg-stone-100 dark:bg-stone-900 flex items-center justify-center shrink-0">
                          <FolderIcon className="w-5 h-5 text-stone-400" />
                        </div>
                      )}

                      <div className="truncate">
                        <div className="font-serif-title text-base text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-300 truncate">
                          {folder.name}
                        </div>
                        <div className="text-[11px] font-mono-meta text-stone-400">
                          {folder.count} {folder.count === 1 ? "photo" : "photos"}
                          {folder.description && (
                            <span> &bull; {folder.description}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                      {adminSecret && (
                        <button
                          onClick={(e) => handleDeleteFolder(folder._id, folder.name, e)}
                          title="Delete folder"
                          className="p-1 text-stone-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </div>

      {/* Discrete footer trigger for admin login */}
      <div className="pt-6 border-t border-stone-200/40 dark:border-stone-800/40 flex justify-between items-center text-[11px] font-mono-meta text-stone-400 dark:text-stone-500">
        <span>{allPhotos.length} total photographs</span>
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
            prev !== null && prev > 0 ? prev - 1 : allPhotos.length - 1
          )
        }
        onNext={() =>
          setSelectedPhotoIndex((prev) =>
            prev !== null && prev < allPhotos.length - 1 ? prev + 1 : 0
          )
        }
        hasPrev={allPhotos.length > 1}
        hasNext={allPhotos.length > 1}
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

              {/* Destination Folder */}
              {convexFolders && convexFolders.length > 0 && (
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 mb-1">
                    Destination Folder
                  </label>
                  <select
                    value={targetFolderId}
                    onChange={(e) => setTargetFolderId(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 rounded-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                  >
                    <option value="">None (Unsorted Stream)</option>
                    {convexFolders.map((f) => (
                      <option key={f._id} value={f._id}>
                        {f.name}
                      </option>
                    ))}
                  </select>
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
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
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
                  <label className="block text-stone-700 dark:text-stone-300 mb-1">Year</label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 mb-1">Camera</label>
                  <input
                    type="text"
                    placeholder="Leica"
                    value={camera}
                    onChange={(e) => setCamera(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 mb-1">Film</label>
                  <input
                    type="text"
                    placeholder="Tri-X"
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
