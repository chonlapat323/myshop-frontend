import { useState } from "react";
import { addToCart } from "@/services/member/cart.service";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { flyToCart } from "@/lib/cart-animation";

export function useAddToCart(productId: number) {
  const { increase, refresh } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const add = async (quantity: number, imageEl?: HTMLImageElement) => {
    try {
      setIsAdding(true);

      const cartIcon = document.getElementById("cart-icon");
      if (imageEl && cartIcon) {
        flyToCart(imageEl, cartIcon);
      }

      await addToCart(productId, quantity);
      increase(1);
      await refresh();
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Unable to add the product. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  return { add, isAdding, added };
}
