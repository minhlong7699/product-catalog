
import { query } from "../_generated/server";
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

export const getProducts = query({
    args: { 
      paginationOpts: paginationOptsValidator,
      category: v.optional(v.string()),
      minPrice: v.optional(v.number()),
      sortBy: v.optional(v.string())
    },
    handler: async (ctx, args) => {
      let productsQuery;
  
      const sortBy = args.sortBy || "newest";
  
      if (args.category) {

        if (sortBy === "price_asc") {
          productsQuery = ctx.db
            .query("products")
            .withIndex("by_category_price", q =>
              q.eq("category", args.category!)
            )
            .order("asc",);
        } 

        else if (sortBy === "price_desc") {
          productsQuery = ctx.db
            .query("products")
            .withIndex("by_category_price", q =>
              q.eq("category", args.category!)
            )
            .order("desc");
        } 

        else {
          productsQuery = ctx.db
            .query("products")
            .withIndex("by_category_createdAt", q =>
              q.eq("category", args.category!)
            )
            .order("desc");
        }
  

        if (args.minPrice) {
            productsQuery = productsQuery.filter(q =>
              q.gte(q.field("price"), args.minPrice!)
            );
          }
      } 

      else {
        if (sortBy === "price_asc") {
          productsQuery = ctx.db
            .query("products")
            .withIndex("by_price")
            .order("asc");
        } else if (sortBy === "price_desc") {
          productsQuery = ctx.db
            .query("products")
            .withIndex("by_price")
            .order("desc");
        } else {
          productsQuery = ctx.db
            .query("products")
            .withIndex("by_createdAt")
            .order("desc");
        }
  
        if (args.minPrice) {
            productsQuery = productsQuery.filter(q =>
              q.gte(q.field("price"), args.minPrice!)
            );
          }
      }
  
      return await productsQuery.paginate(args.paginationOpts);
    },
  });
  