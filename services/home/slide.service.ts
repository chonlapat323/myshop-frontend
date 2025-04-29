import { API_URL } from "@/lib/config";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { Slide } from "@/types/home/slide";

export async function getSlides(): Promise<Slide> {
  return fetchWithAuth<Slide>(`${API_URL}/slides/default`);
}
