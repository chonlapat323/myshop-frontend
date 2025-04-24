"use client";

import { useState } from "react";

export default function Sidebar() {
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <aside className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-3 border-b pb-2">Filter Products</h3>
      <div className="mb-4 mt-4">
        <span className="font-semibold mb-2 block">Price Range</span>
        <div className="flex items-center gap-2">
          <input
            placeholder="Min"
            className="border px-3 py-1 w-full rounded-md"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: e.target.value })
            }
          />
          <span>-</span>
          <input
            placeholder="Max"
            className="border px-3 py-1 w-full rounded-md"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: e.target.value })
            }
          />
        </div>
      </div>
      <div className="mt-4">
        <h4 className="font-semibold mb-2">Brands</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {["IKEA", "HomePro", "INDEX"].map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold mb-2">Rating</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input type="checkbox" />
              {rating} Stars & Up
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold mb-2">Availability</h4>
        <div className="space-y-2">
          {["In Stock", "Out of Stock", "Pre-order"].map((status) => (
            <label
              key={status}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input type="checkbox" />
              {status}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
