import { useCallback, useEffect, useState } from "react";
import { CartItem } from "@/types/cart/cart";
import { getCart } from "@/services/cart/cart.service";

export function useCartFromAPI() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCart = useCallback(async () => {
    try {
      const data = await getCart();
      const items: CartItem[] = data.items.map((item) => ({
        id: item.id,
        product_id: item.product_id,
        name: item.name,
        quantity: item.quantity,
        price: parseFloat(item.price_snapshot),
        price_snapshot: item.price_snapshot,
        image: item.image,
      }));
      setItems(items);
      const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      setTotal(total);
    } catch (err) {
      console.error("❌ Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const removeItemFromState = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return { items, total, loading, refresh: fetchCart, removeItemFromState };
}
