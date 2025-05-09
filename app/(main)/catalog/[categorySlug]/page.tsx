"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/app/(main)/components/ui/ProductCard";
import { useProductsByCategory } from "@/hooks/product/useProductsByCategory";
import Breadcrumbs from "../components/Breadcrumbs";

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const slug = Array.isArray(categorySlug)
    ? categorySlug[0]
    : categorySlug || "";
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<"none" | "lowest" | "highest">(
    "none"
  );
  const { products, loading, error } = useProductsByCategory(
    slug,
    searchTerm,
    sortOption
  );
  return (
    <section className="mx-auto py-0">
      <Breadcrumbs categorySlug={categorySlug as string} />
      <h1 className="text-2xl font-bold capitalize mb-6">{slug} Products</h1>

      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={tempSearchTerm}
          onChange={(e) => setTempSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />

        <button
          onClick={() => setSearchTerm(tempSearchTerm)}
          className="cursor-pointer bg-black hover:text-black hover:bg-[#ddd] text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>

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

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : Array.isArray(products) && products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </section>
  );
}
