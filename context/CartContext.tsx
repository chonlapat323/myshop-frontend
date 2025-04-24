"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getCartCount } from "@/services/cart/cart.service";

interface CartContextType {
  count: number;
  increase: (qty?: number) => void;
  reset: () => void;
  refresh: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);

  const increase = (qty = 1) => setCount((c) => c + qty);
  const reset = () => setCount(0);

  const refresh = async () => {
    try {
      const newCount = await getCartCount();
      setCount(newCount);
    } catch (err) {
      console.error("❌ Failed to refresh cart count", err);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <CartContext.Provider value={{ count, increase, reset, refresh }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext)!;
