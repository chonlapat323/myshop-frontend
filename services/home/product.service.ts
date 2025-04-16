import { API_URL } from "@/lib/config";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { Product } from "@/types/home/product";

export async function getBestSellers() {
  const res = await fetchWithAuth(`${API_URL}/products/best-sellers`);

  if (!res.ok) {
    throw new Error("Failed to fetch best seller products");
  }

  return res.json();
}

export async function getProductsByCategory(
  slug: string,
  searchTerm: string,
  sortOption: "none" | "lowest" | "highest"
): Promise<Product[]> {
  const params = new URLSearchParams();
  if (searchTerm) params.append("search", searchTerm);
  if (sortOption !== "none") params.append("sort", sortOption);

  const res = await fetchWithAuth(
    `${API_URL}/products/category/${slug}?${params.toString()}`
  );
  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
}

export async function getProductById(id: string): Promise<Product> {
  const res = await fetchWithAuth(`${API_URL}/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}
