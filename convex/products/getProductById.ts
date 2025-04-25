import { query } from "../_generated/server";
import { v } from "convex/values";

export const getProductById = query({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId);
    return product;
  },
});