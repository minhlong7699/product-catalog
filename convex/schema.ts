
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
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
  })
  .index("by_category", ["category"])                    
  .index("by_price", ["price"])                            
  .index("by_createdAt", ["createdAt"])                    
  .index("by_category_price", ["category", "price"])       
  .index("by_category_createdAt", ["category", "createdAt"]),

  productVariants: defineTable({
    productId: v.id("products"),
    sku: v.string(),
    color: v.optional(v.string()),
    size: v.optional(v.string()),
    stock: v.number(),
    price: v.optional(v.number()),
  }).index("by_product", ["productId"]),
});
