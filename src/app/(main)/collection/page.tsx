"use client";

import { HeroText } from "@/components/hero/HeroText";
import { FilterSortSection } from "@/components/product-catalog/FilterSortSection";
import { ProductCard } from "@/components/product/ProductCard";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 4;

export default function CollectionPage() {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string | undefined>("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const [cursors, setCursors] = useState<{ [page: number]: string | null }>({
    1: null,
  });
  const [products, setProducts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const cursor = cursors[currentPage] ?? null;

  const result = useQuery(api.products.getProducts, {
    paginationOpts: { cursor, numItems: ITEMS_PER_PAGE },
    category,
    minPrice,
    sortBy,
  });

  useEffect(() => {
    if (!result) return;

    setProducts((prev) => [...prev, ...result.page]);

    const hasData = result.page.length > 0;
    const hasNext = !result.isDone && !!result.continueCursor;

    setHasMore(hasNext && hasData);

    if (hasNext && hasData) {
      setCursors((prev) => ({
        ...prev,
        [currentPage + 1]: result.continueCursor!,
      }));
    }
  }, [result]);

  const currentProducts = products;

  const categories = useMemo(() => {
    const all = currentProducts.map((p) => p.category);
    return [...new Set(all)];
  }, [currentProducts]);

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleClearFilters = () => {
    setCategory(undefined);
    setMinPrice(undefined);
    setSortBy("newest");
    setCurrentPage(1);
    setProducts([]);
    setCursors({ 1: null });
  };

  return (
    <div className="container mx-auto">
      <HeroText
        title="Welcome to the Collection"
        description="Browse our latest arrivals from premium brands and timeless styles."
        showButton={false}
        buttonText="Explore Now"
        bgColor="#000000"
        align="left"
        titleColor="#ffffff"
      />

      <FilterSortSection
        categories={categories}
        productCount={products.filter(product => product.isActive).length}
        selectedSortBy={sortBy || "newest"}
        onSortChange={(value) => {
          setSortBy(value);
          handleClearFilters();
        }}
        onClearFilters={handleClearFilters}
      >
        {currentProducts.length === 0 && result === undefined ? (
          <div className="text-center py-10">Loading products...</div>
        ) : (
          currentProducts.map((product) => (
            product.isActive && (
            <ProductCard key={product._id} {...product} />)
          ))
        )}
      </FilterSortSection>


      <div className="flex justify-center mt-8">
        <Button
          onClick={handleLoadMore}
          disabled={!hasMore}
          className="px-16 py-4 border-1 border-black text-black bg-transparent rounded disabled:opacity-50 mt-4 mb-4"
        >
          {hasMore ? "Load More Product" : "No More Products"}
        </Button>
      </div>
    </div>
  );
}
