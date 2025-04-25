import { CartItem } from "@/types/cart/cart";

export interface CartItemCardProps {
  item: CartItem;
  onQuantityChange: (newQty: number) => void;
  onRemove: () => void;
}
