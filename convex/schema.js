"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("convex/server");
const values_1 = require("convex/values");
exports.default = (0, server_1.defineSchema)({
    photos: (0, server_1.defineTable)({
        title: values_1.v.string(),
        caption: values_1.v.optional(values_1.v.string()),
        location: values_1.v.optional(values_1.v.string()),
        year: values_1.v.optional(values_1.v.string()),
        camera: values_1.v.optional(values_1.v.string()),
        film: values_1.v.optional(values_1.v.string()),
        storageId: values_1.v.optional(values_1.v.id("_storage")),
        url: values_1.v.optional(values_1.v.string()),
        aspectRatio: values_1.v.optional(values_1.v.string()),
    }),
    notes: (0, server_1.defineTable)({
        title: values_1.v.string(),
        content: values_1.v.string(),
        category: values_1.v.string(),
        tags: values_1.v.array(values_1.v.string()),
    }),
});
