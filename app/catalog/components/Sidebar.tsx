"use client";

import { useState } from "react";

const allCategories = [
  { name: "Living Room", slug: "living-room" },
  { name: "Bedroom", slug: "bedroom" },
  { name: "Bathroom", slug: "bathroom" },
  { name: "Kitchen", slug: "kitchen" },
  { name: "Office", slug: "office" },
  { name: "Outdoor", slug: "outdoor" },
  { name: "Lighting", slug: "lighting" },
  { name: "Decor", slug: "decor" },
];

export default function Sidebar() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredCategories = allCategories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  return (
    <aside className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Categories</h3>

      {/* ✅ Search Input */}
      <input
        type="text"
        placeholder="Search categories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />

      {/* ✅ Categories List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {filteredCategories.map((category) => (
          <label
            key={category.slug}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.slug)}
              onChange={() => toggleCategory(category.slug)}
              className="cursor-pointer"
            />
            {category.name}
          </label>
        ))}
      </div>
    </aside>
  );
}
