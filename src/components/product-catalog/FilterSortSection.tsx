interface FilterSortSectionProps {
  categories: string[];
  productCount: number;
  onClearFilters?: () => void;
  onSortChange: (value: string) => void;
  children?: React.ReactNode;
  selectedSortBy: string;
}

export function FilterSortSection({
  categories,
  productCount,
  onSortChange,
  onClearFilters,
  children,
  selectedSortBy,
}: FilterSortSectionProps) {
  return (
    <section className="mt-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/5">
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <h2 className="text-black text-[22px] font-semibold tracking-[-0.55px]">
                  Filters
                </h2>
                {onClearFilters && (
                  <button
                    className="text-[rgba(196,196,196,1)] text-sm tracking-[-0.4px] underline"
                    onClick={onClearFilters}
                  >
                    Clear filters
                  </button>
                )}
              </div>

              <h3 className="text-black text-sm font-bold tracking-[-0.4px]">
                Categories
              </h3>
            </div>

            <div className="mt-5 space-y-2.5">
              {categories.map((category) => (
                <div key={category} className="flex items-center gap-3">
                  <input type="checkbox" id={category} className="w-5 h-5" />
                  <label htmlFor={category}>{category}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-4/5">
            <div className="flex justify-center sm:justify-end mb-4">
              <div className="flex items-center gap-3 flex-col md:flex-row md:items-center">
                <select
                  className="border px-3 py-2"
                  onChange={(e) => onSortChange(e.target.value)}
                  value={selectedSortBy}
                >
                  <option value="newest">Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
                <div className="text-sm mt-2 md:mt-0 ml-0 md:ml-4">
                  Showing {productCount} Products
                </div>
              </div>
            </div>
            <div className="flex justify-center sm:justify-end">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
