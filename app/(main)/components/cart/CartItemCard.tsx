import { useState, useEffect, useMemo } from "react";
import debounce from "lodash/debounce";
import Image from "next/image";
import { API_URL } from "@/lib/config";
import { formatCurrencyTHB } from "@/utils/format-currency";
import { CartItemCardProps } from "@/types/components/cart/cartItem-card";

export default function CartItemCard({
  item,
  onQuantityChange,
  onRemove,
}: CartItemCardProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [totalPrice, setTotalPrice] = useState(item.price * item.quantity);

  const debouncedUpdate = useMemo(
    () =>
      debounce((qty: number) => {
        onQuantityChange(qty);
      }, 0),
    [onQuantityChange]
  );

  useEffect(() => {
    if (quantity !== item.quantity) {
      debouncedUpdate(quantity);
      setTotalPrice(item.price * quantity);
    }
  }, [quantity, item.quantity, item.price, debouncedUpdate]);

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };
  const imageUrl = item.image
    ? `${API_URL}${item.image}`
    : `/uploads/no-image.jpg`;

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg relative">
      <Image
        src={imageUrl}
        alt={item.name}
        width={80}
        height={80}
        className="object-cover rounded"
      />
      <div className="flex-1">
        <p className="font-medium">{item.name}</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={decrease}
            className="cursor-pointer px-2 py-1 bg-gray-200 rounded"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={increase}
            className="cursor-pointer px-2 py-1 bg-gray-200 rounded"
          >
            +
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold">{formatCurrencyTHB(totalPrice)} ฿</p>
      </div>
      <button
        onClick={onRemove}
        className="cursor-pointer absolute top-2 right-2 text-gray-400 hover:text-red-500"
        title="ลบสินค้าออก"
      >
        🗑
      </button>
    </div>
  );
}
