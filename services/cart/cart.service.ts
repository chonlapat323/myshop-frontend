import { CartItem } from "@/types/cart/cart";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { API_URL } from "@/lib/config";

interface RawCartResponse {
  cart_id: number;
  items: CartItem[];
}

interface GetCartResponse {
  items: CartItem[];
  total: number;
}

export async function getCartCount(): Promise<number> {
  const res = await fetchWithAuth(`${API_URL}/cart/count`);

  if (!res.ok) {
    console.error("❌ Failed to fetch cart count");
    return 0;
  }

  const data = await res.json();
  return data.count || 0;
}

export async function getCart(): Promise<GetCartResponse> {
  const res = await fetchWithAuth(`${API_URL}/cart`);

  if (!res.ok) {
    throw new Error("Failed to fetch cart");
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
