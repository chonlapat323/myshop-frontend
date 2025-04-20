// app/components/ui/ProductCard.tsx
"use client";

import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { API_URL } from "@/lib/config";
import { Product } from "@/types/home/product";
import { addToCart } from "@/services/member/cart.service";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { flyToCart } from "@/lib/cart-animation";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: number) => void;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hoveredPopup, setHoveredPopup] = useState<number | null>(null);
  const [cartPopup, setCartPopup] = useState<number | null>(null);
  const [added, setAdded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { increase } = useCart();
  const imageRef = useRef<HTMLImageElement>(null);
  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      const cartIcon = document.getElementById("cart-icon");
      if (imageRef.current && cartIcon) {
        flyToCart(imageRef.current, cartIcon);
      }

      await addToCart(product.id);

      increase(1);

      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error(err);
      toast.error("ไม่สามารถเพิ่มสินค้าได้");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div
      key={product.id}
      className="group relative bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center"
    >
      <div className="w-full aspect-[3/4] overflow-hidden">
        <Image
          ref={imageRef}
          src={`${API_URL}${product.images[0].url}`}
          alt={product.name}
          width={300}
          height={400}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
      </div>

      <div className="text-center mt-4">
        <p className="font-semibold">{product.name}</p>
        <p className="text-gray-500">${product.price}</p>
      </div>

      <div className="flex gap-2 mt-4 group-hover:pointer">
        <div
          className="relative"
          onMouseEnter={() => setCartPopup(product.id)}
          onMouseLeave={() => setCartPopup(null)}
        >
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="cursor-pointer p-2 bg-black text-white rounded-full shadow-md hover:bg-gray-800 cursor-pointer"
          >
            <ShoppingCartOutlined />
          </button>

          {cartPopup === product.id && (
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-[10px] px-2 py-[2px] rounded shadow-md text-center whitespace-nowrap">
              Add to Cart
              <div
                className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0
                border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"
              ></div>
            </div>
          )}
        </div>

        <div
          className="relative"
          onMouseEnter={() => setHoveredPopup(product.id)}
          onMouseLeave={() => setHoveredPopup(null)}
        >
          <Link
            href={`/catalog/product/${product.id}`}
            key={`view-product-${product.id}`}
          >
            <button className="p-2 bg-black text-white rounded-full shadow-md hover:bg-gray-800 cursor-pointer">
              <EyeOutlined />
            </button>
          </Link>

          {hoveredPopup === product.id && (
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-[10px] px-2 py-[2px] rounded shadow-md text-center whitespace-nowrap">
              Quick View
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
