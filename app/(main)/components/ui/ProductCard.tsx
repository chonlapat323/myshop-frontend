"use client";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { flyToCart } from "@/lib/cart-animation";
import { API_URL } from "@/lib/config";
import { addToCart } from "@/services/member/cart.service";
import { ProductCardProps } from "@/types/ui/product-card";
import { formatCurrencyTHB } from "@/utils/format-currency";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function ProductCard({ product }: ProductCardProps) {
  const [hoveredPopup, setHoveredPopup] = useState<number | null>(null);
  const [cartPopup, setCartPopup] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isBackendAvailable, setIsBackendAvailable] = useState<boolean | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const { increase, refresh } = useCart();
  const { user } = useAuth(); // เช็คสถานะการ login
  const imageRef = useRef<HTMLImageElement>(null);

  // ตรวจสอบว่า backend server รันอยู่หรือไม่
  useEffect(() => {
    const checkBackend = async () => {
      if (!API_URL) {
        setIsBackendAvailable(false);
        return;
      }

      try {
        // ลองโหลดรูปภาพแทนการเช็ค /health
        const testImageUrl = `${API_URL}/uploads/products/11-1752737904387-6d66.jpg`;
        const response = await fetch(testImageUrl, { 
          method: 'HEAD',
          signal: AbortSignal.timeout(3000) // timeout 3 วินาที
        });
        setIsBackendAvailable(response.ok);
      } catch (error) {
        console.warn("⚠️ Backend server is not available:", error);
        setIsBackendAvailable(false);
      }
    };

    checkBackend();
  }, [API_URL]);

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      const cartIcon = document.getElementById("cart-icon");
      if (imageRef.current && cartIcon) {
        flyToCart(imageRef.current, cartIcon);
      }

      await addToCart(product.id);
      increase(1);
      await refresh();
    } catch (err) {
      console.error(err);
      toast.error("ไม่สามารถเพิ่มสินค้าได้");
    } finally {
      setIsAdding(false);
    }
  };
  
  // ตรวจสอบว่ามี API_URL และรูปภาพ
  const canLoadImages = API_URL && product.product_image?.[0]?.url;
  
  // สร้าง URL รูปภาพ เหมือนกับ CategoryGrid
  const image = product.product_image?.[0]?.url && canLoadImages
    ? `${API_URL}${product.product_image[0].url}`
    : "/images/no-image.jpg";

  // Debug: ตรวจสอบค่า API_URL และรูปภาพ
  console.log("🔍 ProductCard Debug:", {
    productId: product.id,
    productName: product.name,
    API_URL,
    isBackendAvailable,
    canLoadImages,
    productImageUrl: product.product_image?.[0]?.url,
    finalImageUrl: image,
    productImageLength: product.product_image?.length
  });
  return (
    <div
      key={product.id}
      className="group relative bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center"
    >
      <div className="relative w-full sm:aspect-[3/5]  md:aspect-[4.8/5] aspect-[5/5] overflow-hidden">
        {/* Loading Skeleton */}
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg">
            <div className="flex items-center justify-center h-full">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            </div>
          </div>
        )}
        
        <Image
          ref={imageRef}
          src={image}
          alt={product.name}
          fill
          className={`md:object-contain object-contain transition-transform group-hover:scale-105 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoadStart={() => setImageLoading(true)}
          onLoad={() => setImageLoading(false)}
          onError={(e) => {
            console.log("❌ ProductCard image load error:", image);
            const target = e.target as HTMLImageElement;
            target.src = "/images/no-image.jpg";
            setImageLoading(false);
          }}
        />
      </div>

      <div className="text-center mt-4">
        <p className="font-semibold">{product.name}</p>
        <p className="text-gray-500">
          {formatCurrencyTHB(Number(product.price))}
        </p>
        {Array.isArray(product.tags) && product.tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1 mt-2">
            {product.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-4 group-hover:pointer">
        {/* แสดงปุ่ม Add to Cart เฉพาะเมื่อ login แล้ว */}
        {user && (
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
        )}

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
