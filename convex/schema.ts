import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  folders: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
  }),

  photos: defineTable({
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
  }),

  notes: defineTable({
    title: v.string(),
    content: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
  }),
});
