"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { ProductGallery } from "@/components/product/ProductGallery";
import { Product } from "@/app/types/product";
import { ProductInfo } from "@/components/product/ProductInfo";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product>();

  const productData = useQuery(
    api.products.getProductById.getProductById,
    id ? { productId: id as Id<"products"> } : "skip"
  );

  useEffect(() => {
    if (productData) {
      console.log("Product data:", productData);
      setProduct(productData);
    }
  }, [productData]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto">
          <section className="flex flex-col md:flex-row justify-center items-start gap-8 p-4 md:p-8">
            {product && (
              <>
                <ProductGallery images={product.images} />
                <ProductInfo product={product} />
              </>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
