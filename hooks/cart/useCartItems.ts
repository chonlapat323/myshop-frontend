import { useCart } from "@/context/CartContext";
import { useCartFromAPI } from "../api/cart/useCartFromAPI.ts";
import {
  updateCartItemQuantity,
  removeCartItem,
} from "@/services/cart/cart.service";
import { UseCartItemsProp } from "@/types/cart/cart";
import { Address } from "@/types/member/address.js";
import { BuildOrderPayload } from "@/utils/order/buildOrderPayload";
import { createOrder } from "@/services/order/order.service";

export function useCartItems(): UseCartItemsProp {
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

  const placeOrder = async (address: Address): Promise<void> => {
    const payload = BuildOrderPayload(address, items);
    await createOrder(payload);
    await refreshCartItem();
    await refreshCartCount();
    await refreshCartItem();
  };

  return {
    items,
    total,
    isLoading: loading,
    updateItemQuantity,
    removeItem,
    placeOrder,
  };
}
