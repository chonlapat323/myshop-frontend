"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface CartContextType {
  count: number;
  increase: (qty?: number) => void;
  reset: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);

  const increase = (qty = 1) => setCount((c) => c + qty);
  const reset = () => setCount(0);

  return (
    <CartContext.Provider value={{ count, increase, reset }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext)!;
