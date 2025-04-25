/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as productVariants_createProductVariant from "../productVariants/createProductVariant.js";
import type * as products_createProduct from "../products/createProduct.js";
import type * as products_getProductById from "../products/getProductById.js";
import type * as products_getProducts from "../products/getProducts.js";
import type * as products_updateProduct from "../products/updateProduct.js";
import type * as products from "../products.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "productVariants/createProductVariant": typeof productVariants_createProductVariant;
  "products/createProduct": typeof products_createProduct;
  "products/getProductById": typeof products_getProductById;
  "products/getProducts": typeof products_getProducts;
  "products/updateProduct": typeof products_updateProduct;
  products: typeof products;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
