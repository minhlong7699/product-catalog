import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const createProduct = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    price: v.number(),
    salePrice: v.optional(v.number()),
    stock: v.number(),
    sku: v.string(),
    category: v.string(),
    brand: v.string(),
    isActive: v.boolean(),
    createdAt: v.string(),
    updatedAt: v.string(),
    imageUrl: v.string(),
    images: v.array(v.string()),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("products", args);
    return id;
  },
});
