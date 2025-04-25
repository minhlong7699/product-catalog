import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const updateProduct = mutation({
  args: {
    id: v.id("products"),
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
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
    return id;
  },
});
