import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Helper function to verify admin secret against server environment
function verifyAdminSecret(providedSecret?: string) {
  const serverSecret = process.env.ADMIN_SECRET;
  // If ADMIN_SECRET is configured on Convex, enforce it strictly
  if (serverSecret && providedSecret !== serverSecret) {
    throw new Error("Unauthorized: Invalid admin passphrase.");
  }
}

// Check whether a provided passphrase is valid
export const checkAdminPassphrase = query({
  args: { adminSecret: v.string() },
  handler: async (ctx, args) => {
    const serverSecret = process.env.ADMIN_SECRET;
    if (!serverSecret) {
      return { configured: false, valid: true };
    }
    return { configured: true, valid: args.adminSecret === serverSecret };
  },
});

// List all photos sorted newest first (public read-only query)
export const list = query({
  args: {},
  handler: async (ctx) => {
    const photos = await ctx.db
      .query("photos")
      .order("desc")
      .collect();

    // Map each photo to resolve storage URL if storageId is set
    return await Promise.all(
      photos.map(async (photo) => {
        let resolvedUrl = photo.url;
        if (photo.storageId) {
          const storageUrl = await ctx.storage.getUrl(photo.storageId);
          if (storageUrl) {
            resolvedUrl = storageUrl;
          }
        }
        return {
          ...photo,
          url: resolvedUrl || "",
        };
      })
    );
  },
});

// List all folders with photo counts and cover image
export const listFolders = query({
  args: {},
  handler: async (ctx) => {
    const folders = await ctx.db.query("folders").order("desc").collect();
    const photos = await ctx.db.query("photos").collect();

    return await Promise.all(
      folders.map(async (folder) => {
        const folderPhotos = photos.filter((p) => p.folderId === folder._id);
        let coverUrl = "";
        if (folderPhotos.length > 0) {
          const latest = folderPhotos[folderPhotos.length - 1];
          if (latest.storageId) {
            coverUrl = (await ctx.storage.getUrl(latest.storageId)) || latest.url || "";
          } else {
            coverUrl = latest.url || "";
          }
        }
        return {
          ...folder,
          count: folderPhotos.length,
          coverUrl,
        };
      })
    );
  },
});

// Create a new folder - PROTECTED by adminSecret
export const createFolder = mutation({
  args: {
    adminSecret: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    verifyAdminSecret(args.adminSecret);
    return await ctx.db.insert("folders", {
      name: args.name.trim(),
      description: args.description?.trim(),
    });
  },
});

// Delete a folder - PROTECTED by adminSecret
// Unassigns photos belonging to this folder instead of deleting them
export const deleteFolder = mutation({
  args: {
    adminSecret: v.string(),
    id: v.id("folders"),
  },
  handler: async (ctx, args) => {
    verifyAdminSecret(args.adminSecret);

    const photosInFolder = await ctx.db
      .query("photos")
      .filter((q) => q.eq(q.field("folderId"), args.id))
      .collect();

    for (const photo of photosInFolder) {
      await ctx.db.patch(photo._id, { folderId: undefined });
    }

    await ctx.db.delete(args.id);
  },
});

// Move a photo into a folder or back to unorganized - PROTECTED by adminSecret
export const movePhoto = mutation({
  args: {
    adminSecret: v.string(),
    photoId: v.id("photos"),
    folderId: v.optional(v.id("folders")),
  },
  handler: async (ctx, args) => {
    verifyAdminSecret(args.adminSecret);
    await ctx.db.patch(args.photoId, { folderId: args.folderId });
  },
});

// Generate an upload URL - PROTECTED by adminSecret
export const generateUploadUrl = mutation({
  args: {
    adminSecret: v.string(),
  },
  handler: async (ctx, args) => {
    verifyAdminSecret(args.adminSecret);
    return await ctx.storage.generateUploadUrl();
  },
});

// Add a new photo record - PROTECTED by adminSecret
export const addPhoto = mutation({
  args: {
    adminSecret: v.string(),
    title: v.string(),
    caption: v.optional(v.string()),
    location: v.optional(v.string()),
    year: v.optional(v.string()),
    camera: v.optional(v.string()),
    film: v.optional(v.string()),
    storageId: v.optional(v.id("_storage")),
    url: v.optional(v.string()),
    aspectRatio: v.optional(v.string()),
    folderId: v.optional(v.id("folders")),
  },
  handler: async (ctx, args) => {
    verifyAdminSecret(args.adminSecret);

    return await ctx.db.insert("photos", {
      title: args.title,
      caption: args.caption,
      location: args.location,
      year: args.year,
      camera: args.camera,
      film: args.film,
      storageId: args.storageId,
      url: args.url,
      aspectRatio: args.aspectRatio || "landscape",
      folderId: args.folderId,
    });
  },
});

// Delete a photo and its stored file - PROTECTED by adminSecret
export const deletePhoto = mutation({
  args: {
    adminSecret: v.string(),
    id: v.id("photos"),
  },
  handler: async (ctx, args) => {
    verifyAdminSecret(args.adminSecret);

    const photo = await ctx.db.get(args.id);
    if (!photo) return;

    if (photo.storageId) {
      await ctx.storage.delete(photo.storageId);
    }
    await ctx.db.delete(args.id);
  },
});
