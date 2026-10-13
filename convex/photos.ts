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
      // If not configured yet on Convex, allow for initial setup
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
