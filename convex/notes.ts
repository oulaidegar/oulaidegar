import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// List all notes ordered newest first
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("notes")
      .order("desc")
      .collect();
  },
});

// Add a note
export const addNote = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("notes", {
      title: args.title,
      content: args.content,
      category: args.category,
      tags: args.tags,
    });
  },
});
