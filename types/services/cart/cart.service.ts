import { CartItem } from "@/types/cart/cart";

export interface RawCartResponse {
  cart_id: number;
  items: CartItem[];
}

export interface GetCartResponse {
  items: CartItem[];
  total: number;
}
