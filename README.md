This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


# 🛍️ Product Catalog Documentation

This documentation covers the main functionalities of the product catalog, including browsing products, viewing product details, and managing products in the admin dashboard.

---

## 📦 Features

- ✅ View all available products  
- 🔍 View product details  
- 🛠 Admin interface to edit products  

---

## 🗂 Product Listing

### 📍 Route
```bash
/collection
```

### 📝 Description
Displays a list of all active products (`isActive: true`) available in the catalog. Users can browse, filter, and sort products by categories or custom criteria.

### 💡 Notes
- Products with `isActive: false` are not shown.
- Each product displays:
  - Title
  - Price / Sale Price (if available)
  - Main image
  - Category & brand tags

---

## 🔎 Product Detail

### 📍 Route
```bash
/product/{id}
```

### 📝 Description
Displays the detail page for a single product.

### 📌 Parameters
- `id`: The unique identifier of the product document in Convex.

### 📄 Content
- Title  
- Full description  
- Price and Sale Price  
- Images (main + gallery)  
- Stock status  
- SKU  
- Tags  
- Related information (category, brand, etc.)

### ⚠️ Errors
If a product with the provided `id` is not found or inactive (`isActive: false`), display a 404 page or a fallback message.

---

## 🔧 Admin - Edit Product

### 📍 Route
```bash
/admin/product
```

### 📝 Description
Admin dashboard interface to edit existing products or create new ones.

### 🔐 Access
This page should be protected, only accessible to authorized users.

### ✏️ Features
- Create new product
- Edit existing product fields:
  - Title, Description
  - Price, Sale Price
  - Images (main & gallery)
  - SKU, Stock
  - Tags, Category, Brand
  - Active status
- Form validation
- Live preview (optional)

---

## 📌 Schema Reference

Here’s the schema each product follows:

```ts
{
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  stock: number;
  sku: string;
  category: string;
  brand: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  images: string[];
  tags: string[];
}
```

---

## 🚀 Deployment Notes

- Product data is stored and fetched via **Convex Cloud**.
- Make sure your frontend is connected to your Convex project.
