import { API_URL } from "@/lib/config";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { Product } from "@/types/home/product";

export function getBestSellers(): Promise<Product[]> {
  return fetchWithAuth<Product[]>(`${API_URL}/products/best-sellers`);
}

export function getProductsByCategory(
  slug: string,
  searchTerm: string,
  sortOption: "none" | "lowest" | "highest"
): Promise<Product[]> {
  const params = new URLSearchParams();
  if (searchTerm) params.append("search", searchTerm);
  if (sortOption !== "none") params.append("sort", sortOption);

  return fetchWithAuth<Product[]>(
    `${API_URL}/products/category/${slug}?${params.toString()}`
  );
}

export function getProductById(id: number): Promise<Product> {
  return fetchWithAuth<Product>(`${API_URL}/products/${id}`);
}
