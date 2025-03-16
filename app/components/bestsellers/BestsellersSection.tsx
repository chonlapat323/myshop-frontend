"use client";

import { ProductInterface } from "../../components/ui/ProductCard"; // Import Product Interface from ProductCard
import ProductCard from "@/app/components/ui/ProductCard"; // Import the ProductCard component

interface BestsellersProps {
  products: ProductInterface[];
}

export default function BestsellersSection({ products }: BestsellersProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-center text-2xl font-bold mb-6">BESTSELLERS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: ProductInterface) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
