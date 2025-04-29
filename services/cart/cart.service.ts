import { CartItem } from "@/types/cart/cart";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { API_URL } from "@/lib/config";
import { GetCartResponse } from "@/types/services/cart/cart.service";

export async function getCartCount(): Promise<number> {
  try {
    const data = await fetchWithAuth<{ count: number }>(
      `${API_URL}/cart/count`
    );
    return typeof data.count === "number" ? data.count : 0;
  } catch (err) {
    console.error(err);
    return 0;
  }
}

export function getCart(): Promise<GetCartResponse> {
  return fetchWithAuth<GetCartResponse>(`${API_URL}/cart`);
}

export function updateCartItemQuantity(
  id: number,
  quantity: number
): Promise<void> {
  return fetchWithAuth<void>(`${API_URL}/cart/items/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity }),
  });
}

export function removeCartItem(id: number): Promise<void> {
  return fetchWithAuth<void>(`${API_URL}/cart/items/${id}`, {
    method: "DELETE",
  });
}
