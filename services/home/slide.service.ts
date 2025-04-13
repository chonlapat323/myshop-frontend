import { API_URL } from "@/lib/config";

export async function getSlides() {
  const res = await fetch(`${API_URL}/slides/default`);
  if (!res.ok) throw new Error("Failed to fetch slides");
  return res.json();
}
