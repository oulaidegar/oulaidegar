"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePhoto = exports.addPhoto = exports.generateUploadUrl = exports.list = void 0;
const server_1 = require("./_generated/server");
const values_1 = require("convex/values");
// List all photos sorted newest first
exports.list = (0, server_1.query)({
    args: {},
    handler: async (ctx) => {
        const photos = await ctx.db
            .query("photos")
            .order("desc")
            .collect();
        // Map each photo to resolve storage URL if storageId is set
        return await Promise.all(photos.map(async (photo) => {
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
        }));
    },
});
// Generate an upload URL to upload directly to Convex file storage
exports.generateUploadUrl = (0, server_1.mutation)({
    args: {},
    handler: async (ctx) => {
        return await ctx.storage.generateUploadUrl();
    },
});
// Add a new photo record (either with storageId or external URL)
exports.addPhoto = (0, server_1.mutation)({
    args: {
        title: values_1.v.string(),
        caption: values_1.v.optional(values_1.v.string()),
        location: values_1.v.optional(values_1.v.string()),
        year: values_1.v.optional(values_1.v.string()),
        camera: values_1.v.optional(values_1.v.string()),
        film: values_1.v.optional(values_1.v.string()),
        storageId: values_1.v.optional(values_1.v.id("_storage")),
        url: values_1.v.optional(values_1.v.string()),
        aspectRatio: values_1.v.optional(values_1.v.string()),
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
exports.deletePhoto = (0, server_1.mutation)({
    args: { id: values_1.v.id("photos") },
    handler: async (ctx, args) => {
        const photo = await ctx.db.get(args.id);
        if (!photo)
            return;
        if (photo.storageId) {
            await ctx.storage.delete(photo.storageId);
        }
        await ctx.db.delete(args.id);
    },
});
