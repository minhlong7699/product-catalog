import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const createProductVariant = mutation({
  args: {
    productId: v.id("products"),
    sku: v.string(),
    color: v.optional(v.string()),
    size: v.optional(v.string()),
    stock: v.number(),
    price: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("productVariants", args);
    return id;
  },
});
