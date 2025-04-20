import { useCart } from "@/context/CartContext";
import { useCartFromAPI } from "../api/cart/useCartFromAPI.ts";
import {
  updateCartItemQuantity,
  removeCartItem,
} from "@/services/cart/cart.service";
import { CartItem } from "@/types/cart/cart";

interface UseCartItems {
  items: CartItem[];
  total: number;
  isLoading: boolean;
  updateItemQuantity: (id: number, qty: number) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
}

export function useCartItems(): UseCartItems {
  const {
    items,
    refresh: refreshCartItem,
    removeItemFromState,
    total,
    loading,
  } = useCartFromAPI();
  const { refresh: refreshCartCount } = useCart();

  const updateItemQuantity = async (id: number, qty: number) => {
    try {
      await updateCartItemQuantity(id, qty);
      await refreshCartItem();
      await refreshCartCount();
    } catch (err) {
      console.error("❌ update failed", err);
    }
  };

  const removeItem = async (id: number) => {
    try {
      await removeCartItem(id);
      removeItemFromState(id);
      await refreshCartItem();
      await refreshCartCount();
    } catch (err) {
      console.error("❌ delete failed", err);
    }
  };

  return {
    items,
    total,
    isLoading: loading,
    updateItemQuantity,
    removeItem,
  };
}
