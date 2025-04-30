import { API_URL } from "@/lib/config";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { HttpError } from "@/lib/HttpError";
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

export async function getProductById(id: number): Promise<Product | null> {
  try {
    return await fetchWithAuth<Product>(`${API_URL}/products/${id}`);
  } catch (error) {
    if (error instanceof HttpError && error.status === 404) {
      return null;
    }
    throw error;
  }
}
