import { API_URL } from "@/lib/config";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
export async function getBestSellers() {
  const res = await fetchWithAuth(`${API_URL}/products/best-sellers`);

  if (!res.ok) {
    throw new Error("Failed to fetch best seller products");
  }

  return res.json();
}
