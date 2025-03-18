"use client";

import { FC, useState } from "react";
import Image from "next/image";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart: FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Armchair Dublin",
      price: 680,
      quantity: 1,
      image: "/images/catalog/living-room/1.jpg",
    },
    {
      id: 2,
      name: "Vase Amass",
      price: 300,
      quantity: 2,
      image: "/images/catalog/living-room/2.jpg",
    },
  ]);

  // ฟังก์ชันอัปเดตจำนวน
  const updateQuantity = (id: number, newQty: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  // คำนวณ Subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  // สมมติ Tax
  const tax = 12;
  // สมมติค่าขนส่ง
  const shippingCost = 0;
  // รวม
  const total = subtotal + tax + shippingCost;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-center text-2xl font-semibold mb-8">
        YOUR SHOPPING CART
      </h1>

      {/* Layout หลัก: 2 ส่วน (Cart / Summary) บนจอใหญ่ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ซ้าย: ตารางสินค้า + Coupon + Update Cart (กิน 2 ส่วน) */}
        <div className="lg:col-span-2 flex flex-col space-y-6">
          {/* หัวตาราง (4 คอลัมน์) - แสดงเฉพาะ md ขึ้นไป */}
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 border-b border-gray-200 py-3 text-gray-500 uppercase text-sm mb-0">
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Total</div>
          </div>

          {/* แสดงสินค้าทีละรายการ */}
          {cartItems.map((item) => {
            const itemTotal = item.price * item.quantity;
            return (
              <div
                key={item.id}
                className="border-b border-gray-200 last:border-b-0 py-4 md:py-2"
              >
                {/* บนจอเล็ก: stack เป็น block, จอ md+: grid 4 คอลัมน์ */}
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-4">
                  {/* (1) Product (รูป + ชื่อสินค้า) */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* รูปภาพ */}
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 96px, 128px"
                        style={{ objectFit: "cover" }}
                        className="rounded"
                      />
                    </div>
                    {/* ชื่อสินค้า */}
                    <div className="flex flex-col">
                      <p className="font-medium text-base sm:text-lg">
                        {item.name}
                      </p>
                      {/* หากต้องการคำอธิบายสั้นๆ ใต้ชื่อ 
                      <p className="text-gray-500 text-sm">
                        A comfortable armchair for your living room
                      </p>
                      */}
                    </div>
                  </div>

                  {/* (2) Price */}
                  <div className="flex items-center">
                    {/* บนจอเล็กใส่ label เพื่อความชัดเจน */}
                    <p className="md:hidden text-gray-500 w-24">Price:</p>
                    <p className="text-base sm:text-lg">${item.price}</p>
                  </div>

                  {/* (3) Quantity */}
                  <div className="flex items-center">
                    {/* บนจอเล็กใส่ label เพื่อความชัดเจน */}
                    <p className="md:hidden text-gray-500 w-24">Qty:</p>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="border px-2 py-1 text-sm cursor-pointer"
                        type="button"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        min={1}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          updateQuantity(item.id, isNaN(val) ? 1 : val);
                        }}
                        className="border w-12 text-center py-1"
                      />
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="border px-2 py-1 text-sm cursor-pointer"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* (4) Total + ปุ่มลบ */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center space-x-2">
                      <p className="md:hidden text-gray-500 w-24">Total:</p>
                      <p className="text-base sm:text-lg">${itemTotal}</p>
                    </div>
                    {/* ปุ่มลบสินค้า */}
                    <button
                      onClick={() =>
                        setCartItems((prev) =>
                          prev.filter((i) => i.id !== item.id)
                        )
                      }
                      className="text-gray-400 hover:text-black mt-2 text-3xl md:mt-0 cursor-pointer"
                      type="button"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Coupon code + Update Cart */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Coupon code"
                className="border p-2 w-40"
              />
              <button
                className="bg-gray-900 text-white px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
                type="button"
              >
                APPLY COUPON
              </button>
            </div>
            <button
              className="bg-gray-900 text-white px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
              type="button"
            >
              UPDATE CART
            </button>
          </div>
        </div>

        {/* ขวา: Summary (หรือจะใส่ Shipping, Calculate shipping ได้ตามต้องการ) */}
        <div className="flex flex-col space-y-6">
          <div className="border p-4 space-y-2">
            <p className="flex justify-between text-sm sm:text-base">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </p>
            <p className="flex justify-between text-sm sm:text-base">
              <span>Tax:</span>
              <span>${tax}</span>
            </p>
            <p className="flex justify-between text-sm sm:text-base">
              <span>Shipping:</span>
              <span>${shippingCost}</span>
            </p>
            <p className="flex justify-between font-semibold text-lg mt-2">
              <span>Total:</span>
              <span>${total}</span>
            </p>
          </div>
          <button
            className="bg-black text-white py-3 w-full font-semibold hover:bg-gray-800 transition-colors"
            type="button"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
