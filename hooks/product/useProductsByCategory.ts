import { useEffect, useState } from "react";
import { getProductsByCategory } from "@/services/home/product.service";
import { Product } from "@/types/home/product";

export function useProductsByCategory(
  slug: string,
  searchTerm: string,
  sortOption: "none" | "lowest" | "highest"
) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProductsByCategory(slug, searchTerm, sortOption);
        console.log("✅ API response", data);
        setProducts(data);
      } catch (err: any) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug, searchTerm, sortOption]);
  return { products, loading, error };
}
