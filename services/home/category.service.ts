import { API_URL } from "@/lib/config";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { Category } from "@/types/home/category";

export function getCategories(): Promise<Category[]> {
  return fetchWithAuth<Category[]>(`${API_URL}/categories/active`);
}
