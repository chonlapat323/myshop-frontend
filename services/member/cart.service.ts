// src/services/cart.service.ts
import { API_URL } from "@/lib/config";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
export async function addToCart(productId: number, quantity = 1) {
  const res = await fetchWithAuth(`${API_URL}/cart/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, quantity }),
  });

  if (!res.ok) {
    throw new Error("Failed to add item to cart");
  }

  return res.json();
}
