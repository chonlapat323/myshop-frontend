"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/app/components/ui/ProductCard"; // Import ProductCard
import { ProductInterface } from "../../components/ui/ProductCard"; // Import Product Interface from ProductCard
const mockProducts = [
  {
    id: 1,
    name: "Modern Sofa",
    category: "living-room",
    brand: "IKEA",
    price: 1200,
    image: "/images/catalog/living-room/1.jpg",
    link: "/products/sofa",
  },
  {
    id: 2,
    name: "Elegant Coffee Table",
    category: "living-room",
    brand: "Ashley",
    price: 350,
    image: "/images/catalog/living-room/2.jpg",
    link: "/products/coffee-table",
  },
  {
    id: 3,
    name: "Minimalist TV Stand",
    category: "living-room",
    brand: "HermanMiller",
    price: 500,
    image: "/images/catalog/living-room/3.jpg",
    link: "/products/tv-stand",
  },
  {
    id: 4,
    name: "Contemporary Bookshelf",
    category: "living-room",
    brand: "IKEA",
    price: 450,
    image: "/images/catalog/living-room/4.jpg",
    link: "/products/bookshelf",
  },
];

// Define the Product interface here to match the data structure

export default function CategoryPage() {
  // Extract the dynamic route parameter.
  const { categorySlug } = useParams();
  // Ensure slug is a string:
  const slug = Array.isArray(categorySlug)
    ? categorySlug[0]
    : categorySlug || "";

  // State for search, filter (by brand), and sort option
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [sortOption, setSortOption] = useState<"none" | "lowest" | "highest">(
    "none"
  );

  // 1. Filter products by category (case-insensitive)
  const productsByCategory = mockProducts.filter(
    (p) => p.category.toLowerCase() === slug.toLowerCase()
  ) as ProductInterface[]; // Cast to Product

  // 2. Filter by brand if one is selected
  const filteredByBrand =
    selectedBrand === "all"
      ? productsByCategory
      : productsByCategory.filter(
          (p) => p.brand.toLowerCase() === selectedBrand.toLowerCase()
        );

  // 3. Filter by search term (in product name)
  const searchedProducts = filteredByBrand.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 4. Sort the products based on sortOption
  const sortedProducts = useMemo(() => {
    if (sortOption === "lowest") {
      return [...searchedProducts].sort((a, b) => a.price - b.price);
    }
    if (sortOption === "highest") {
      return [...searchedProducts].sort((a, b) => b.price - a.price);
    }
    return searchedProducts;
  }, [searchedProducts, sortOption]) as ProductInterface[]; // Cast to Product;

  // Unique brand options from this category
  const brandOptions = Array.from(
    new Set(productsByCategory.map((p) => p.brand))
  );

  return (
    <section className="max-w-6xl mx-auto px-4 py-0">
      <h1 className="text-2xl font-bold capitalize mb-6">{slug} Products</h1>

      {/* Filter, Search & Sort Panel */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        {/* Brand Filter */}
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="border p-2 rounded w-full md:w-1/4"
        >
          <option value="all">All Brands</option>
          {brandOptions.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        {/* Sort Options */}
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

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
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
