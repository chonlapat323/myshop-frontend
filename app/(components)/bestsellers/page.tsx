"use client";

import {
  ShoppingCartOutlined,
  EyeOutlined,
  HeartOutlined,
} from "@ant-design/icons";

interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  link: string;
}

interface BestsellersProps {
  products: Product[];
}

export default function Bestsellers({ products }: BestsellersProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-center text-2xl font-bold mb-6">BESTSELLERS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative bg-gray-100 p-4  shadow-md"
          >
            {/* รูปสินค้า (แนวตั้ง) */}
            <div className="w-full aspect-[3/4] overflow-hidden  relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />

              {/* ไอคอนอยู่ด้านบนของรูป */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200">
                  <ShoppingCartOutlined />
                </button>
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200">
                  <EyeOutlined />
                </button>
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200">
                  <HeartOutlined />
                </button>
              </div>
            </div>

            {/* ชื่อสินค้า & ราคา (ไม่มีไอคอนบัง) */}
            <div className="text-center mt-4">
              <p className="font-semibold">{product.name}</p>
              <p className="text-gray-500">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
