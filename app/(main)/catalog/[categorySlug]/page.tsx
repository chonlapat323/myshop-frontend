"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/app/(main)/components/ui/ProductCard";
import { useProductsByCategory } from "@/hooks/product/useProductsByCategory";

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const slug = Array.isArray(categorySlug)
    ? categorySlug[0]
    : categorySlug || "";

  const { products, loading, error } = useProductsByCategory(slug);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [sortOption, setSortOption] = useState<"none" | "lowest" | "highest">(
    "none"
  );

  const productsByCategory = products;

  const filteredByBrand =
    selectedBrand === "all"
      ? productsByCategory
      : productsByCategory.filter(
          (p) => p.brand.toLowerCase() === selectedBrand.toLowerCase()
        );

  const searchedProducts = filteredByBrand.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = useMemo(() => {
    if (sortOption === "lowest") {
      return [...searchedProducts].sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
    }
    if (sortOption === "highest") {
      return [...searchedProducts].sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
    }
    return searchedProducts;
  }, [searchedProducts, sortOption]);

  const brandOptions = Array.from(
    new Set(productsByCategory.map((p) => p.brand))
  );

  return (
    <section className="mx-auto py-0">
      <h1 className="text-2xl font-bold capitalize mb-6">{slug} Products</h1>

      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />

        <select
          value={sortOption}
          onChange={(e) =>
            setSortOption(e.target.value as "none" | "lowest" | "highest")
          }
          className="border p-2 rounded w-full md:w-1/4"
        >
          <option value="none">Sort By (Default)</option>
          <option value="lowest">Price: Lowest to Highest</option>
          <option value="highest">Price: Highest to Lowest</option>
        </select>
      </div>

      {/* Loading & Error */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Product Grid */}
      {!loading && sortedProducts.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
