"use client";
import { API_URL } from "@/lib/config";
import { getCartCount } from "@/services/cart/cart.service";
import { CartContextTypeProp } from "@/types/context/create-context";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
const CartContext = createContext<CartContextTypeProp | null>(null);

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
    const checkLogin = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/status_member`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data.user) {
          await refresh();
        } else {
          setCount(0);
        }
      } catch {
        setCount(0);
      }
    };
    checkLogin();
  }, []);

  return (
    <CartContext.Provider value={{ count, increase, reset, refresh }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext)!;
