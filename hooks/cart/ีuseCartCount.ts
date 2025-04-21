import { useEffect, useState } from "react";
import { getCartCount } from "@/services/cart/cart.service";

export function useCartCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const c = await getCartCount();
      setCount(c);
    };

    fetch();
  }, []);

  return count;
}
