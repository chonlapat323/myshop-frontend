import { useEffect, useState } from "react";
import { getProductsByCategory } from "@/services/home/product.service";
import { Product } from "@/types/home/product";

export function useProductsByCategory(slug: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProductsByCategory(slug);
        setProducts(data);
      } catch (err: any) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug]);

  return { products, loading, error };
}
