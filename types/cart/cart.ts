import { Address } from "../member/Address";

export interface CartItem {
  id: number;
  product_id: number;
  name: string;
  quantity: number;
  image: string;
  price: number;
  price_snapshot: string;
}

export interface UseCartItemsProp {
  items: CartItem[];
  total: number;
  isLoading: boolean;
  updateItemQuantity: (id: number, qty: number) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  placeOrder: (address: Address) => Promise<void>;
}
