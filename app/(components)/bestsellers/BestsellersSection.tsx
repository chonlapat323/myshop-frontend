"use client";

import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import Image from "next/image";

export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  link: string;
}

interface BestsellersProps {
  products: Product[];
}

export default function BestsellersSection({ products }: BestsellersProps) {
  const [hoveredPopup, setHoveredPopup] = useState<number | null>(null);
  const [cartPopup, setCartPopup] = useState<number | null>(null);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-center text-2xl font-bold mb-6">BESTSELLERS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="group relative bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center"
          >
            {/* รูปสินค้า (แนวตั้ง) */}
            <div className="w-full aspect-[3/4] overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={400}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>

            {/* ชื่อสินค้า & ราคา */}
            <div className="text-center mt-4">
              <p className="font-semibold">{product.name}</p>
              <p className="text-gray-500">${product.price}</p>
            </div>

            {/* ไอคอนเมนู (ด้านล่าง) */}
            <div className="flex gap-2 mt-4 group-hover:pointer">
              {/* ปุ่ม Cart + Popup */}
              <div
                className="relative"
                onMouseEnter={() => setCartPopup(product.id)}
                onMouseLeave={() => setCartPopup(null)}
              >
                <button className="p-2 bg-black text-white rounded-full shadow-md hover:bg-gray-800 cursor-pointer">
                  <ShoppingCartOutlined />
                </button>

                {/* Popup Add to Cart + ลูกศร */}
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

              {/* ปุ่ม Eye + Popup Quick View */}
              <div
                className="relative"
                onMouseEnter={() => setHoveredPopup(product.id)}
                onMouseLeave={() => setHoveredPopup(null)}
              >
                <button className="p-2 bg-black text-white rounded-full shadow-md hover:bg-gray-800 cursor-pointer">
                  <EyeOutlined />
                </button>

                {/* Popup Quick View + ลูกศร */}
                {hoveredPopup === product.id && (
                  <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-[10px] px-2 py-[2px] rounded shadow-md text-center whitespace-nowrap">
                    Quick View
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
