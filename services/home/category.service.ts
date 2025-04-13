import { API_URL } from "@/lib/config";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { Category } from "@/types/home/category";

export async function getCategories(): Promise<Category[]> {
  const res = await fetchWithAuth(`${API_URL}/categories/active`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}
