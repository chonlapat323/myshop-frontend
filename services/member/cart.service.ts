import { API_URL } from "@/lib/config";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { CartItem } from "@/types/cart/cart";
export function addToCart(productId: number, quantity = 1): Promise<CartItem> {
  return fetchWithAuth<CartItem>(`${API_URL}/cart/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, quantity }),
  });
}
