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
        setProducts(data);
      } catch (err: any) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug, searchTerm, sortOption]); // 🧠 รอฟังค์ชัน trigger เมื่อค่าใดค่าหนึ่งเปลี่ยน

  return { products, loading, error };
}
