import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// List all photos sorted newest first
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

// Generate an upload URL to upload directly to Convex file storage
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Add a new photo record (either with storageId or external URL)
export const addPhoto = mutation({
  args: {
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

// Delete a photo and its stored file
export const deletePhoto = mutation({
  args: { id: v.id("photos") },
  handler: async (ctx, args) => {
    const photo = await ctx.db.get(args.id);
    if (!photo) return;

    if (photo.storageId) {
      await ctx.storage.delete(photo.storageId);
    }
    await ctx.db.delete(args.id);
  },
});
