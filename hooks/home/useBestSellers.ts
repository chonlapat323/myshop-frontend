import useSWR from "swr";
import { getBestSellers } from "@/services/home/product.service";
import { Product } from "@/types/home/product";

export function useBestSellers() {
  const { data, error, isLoading } = useSWR<Product[]>(
    "/products/best-sellers",
    getBestSellers
  );

  return {
    bestSellers: data ?? [],
    isLoading,
    error,
  };
}
