import { useEffect, useState } from "react";
import { CartItem } from "@/types/cart/cart";
import { getCart } from "@/services/cart/cart.service";

export function useCartFromAPI() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchCart() {
    try {
      const data = await getCart(); // ✅ เรียกผ่าน service
      setItems(data.items);
      setTotal(data.total);
    } catch (err) {
      console.error("❌ Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItemFromState = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return { items, total, loading, refresh: fetchCart, removeItemFromState };
}
