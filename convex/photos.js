"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePhoto = exports.addPhoto = exports.generateUploadUrl = exports.list = exports.checkAdminPassphrase = void 0;
const server_1 = require("./_generated/server");
const values_1 = require("convex/values");
// Helper function to verify admin secret against server environment
function verifyAdminSecret(providedSecret) {
    const serverSecret = process.env.ADMIN_SECRET;
    // If ADMIN_SECRET is configured on Convex, enforce it strictly
    if (serverSecret && providedSecret !== serverSecret) {
        throw new Error("Unauthorized: Invalid admin passphrase.");
    }
}
// Check whether a provided passphrase is valid
exports.checkAdminPassphrase = (0, server_1.query)({
    args: { adminSecret: values_1.v.string() },
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
// Generate an upload URL - PROTECTED by adminSecret
exports.generateUploadUrl = (0, server_1.mutation)({
    args: {
        adminSecret: values_1.v.string(),
    },
    handler: async (ctx, args) => {
        verifyAdminSecret(args.adminSecret);
        return await ctx.storage.generateUploadUrl();
    },
});
// Add a new photo record - PROTECTED by adminSecret
exports.addPhoto = (0, server_1.mutation)({
    args: {
        adminSecret: values_1.v.string(),
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
exports.deletePhoto = (0, server_1.mutation)({
    args: {
        adminSecret: values_1.v.string(),
        id: values_1.v.id("photos"),
    },
    handler: async (ctx, args) => {
        verifyAdminSecret(args.adminSecret);
        const photo = await ctx.db.get(args.id);
        if (!photo)
            return;
        if (photo.storageId) {
            await ctx.storage.delete(photo.storageId);
        }
        await ctx.db.delete(args.id);
    },
});
