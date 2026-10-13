"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNote = exports.list = void 0;
const server_1 = require("./_generated/server");
const values_1 = require("convex/values");
// List all notes ordered newest first
exports.list = (0, server_1.query)({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("notes")
            .order("desc")
            .collect();
    },
});
// Add a note
exports.addNote = (0, server_1.mutation)({
    args: {
        title: values_1.v.string(),
        content: values_1.v.string(),
        category: values_1.v.string(),
        tags: values_1.v.array(values_1.v.string()),
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
