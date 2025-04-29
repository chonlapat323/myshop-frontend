import { CartItem } from "@/types/cart/cart";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { API_URL } from "@/lib/config";
import {
  GetCartResponse,
  RawCartResponse,
} from "@/types/services/cart/cart.service";

export async function getCartCount(): Promise<number> {
  try {
    const res = await fetchWithAuth(`${API_URL}/cart/count`);
    if (!res.ok) {
      const message = await res.text().catch(() => "Unknown error");
      throw new Error(`❌ getCartCount failed: ${res.status} ${message}`);
    }

    const data = await res.json();
    if (typeof data.count !== "number") return 0;

    return data.count;
  } catch (err) {
    console.error(err);
    return 0;
  }
}

export async function getCart(): Promise<GetCartResponse> {
  const res = await fetchWithAuth(`${API_URL}/cart`);

  if (!res.ok) {
    const message = await res.text().catch(() => "Unknown error");
    throw new Error(`❌ getCart failed: ${res.status} ${message}`);
  }

  const data: RawCartResponse = await res.json();

  const items: CartItem[] = data.items.map((item) => ({
    id: item.id,
    product_id: item.product_id,
    name: item.name,
    quantity: item.quantity,
    price: parseFloat(item.price_snapshot),
    price_snapshot: item.price_snapshot,
    image: item.image,
  }));

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return { items, total };
}

export async function updateCartItemQuantity(
  id: number,
  quantity: number
): Promise<void> {
  const res = await fetchWithAuth(`${API_URL}/cart/items/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity }),
  });

  if (!res.ok) {
    throw new Error("Failed to update cart item quantity");
  }
}

export async function removeCartItem(id: number): Promise<void> {
  const res = await fetchWithAuth(`${API_URL}/cart/items/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to remove cart item");
  }
}
