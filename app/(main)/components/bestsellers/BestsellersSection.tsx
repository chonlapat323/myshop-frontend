"use client";

import ProductCard from "@/app/(main)/components/ui/ProductCard";
import { BestsellersProps } from "@/types/components/bestsellers/BestSellersSection";

export default function BestSellersSection({ products }: BestsellersProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-center text-2xl font-bold mb-6">BESTSELLERS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products &&
          products?.length > 0 &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </section>
  );
}
