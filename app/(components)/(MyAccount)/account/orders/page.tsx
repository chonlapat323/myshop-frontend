"use client";

import { useState } from "react";
import Link from "next/link";

interface OrderItem {
  id: string;
  productName: string;
  seller: string;
  size: string;
  quantity: number;
  price: number;
  status: string;
  deliveryDate: string;
  image: string;
}

interface Order {
  orderId: string;
  orderDate: string;
  orderItems: OrderItem[];
  totalAmount: number;
}

const orders: Order[] = [
  {
    orderId: "R0374915036",
    orderDate: "17 Nov 2023",
    totalAmount: 3010,
    orderItems: [
      {
        id: "1",
        productName: "Netting Mykonos Tunic Dress",
        seller: "Milly Thomas",
        size: "S",
        quantity: 1,
        price: 1250,
        status: "In Transit",
        deliveryDate: "24 December 2023",
        image: "/images/products/armchair.jpg",
      },
      {
        id: "2",
        productName: "Embroidered Sequin Mini Dress",
        seller: "Sonia Agrawal",
        size: "S",
        quantity: 1,
        price: 1760,
        status: "In Transit",
        deliveryDate: "24 December 2023",
        image: "/images/products/chair.jpg",
      },
    ],
  },
  {
    orderId: "R0374915037",
    orderDate: "05 Dec 2023",
    totalAmount: 2200,
    orderItems: [
      {
        id: "3",
        productName: "Classic Leather Handbag",
        seller: "Luxury Fashion",
        size: "-",
        quantity: 1,
        price: 2200,
        status: "Delivered",
        deliveryDate: "10 December 2023",
        image: "/images/products/lamp.jpg",
      },
    ],
  },
];

export default function MyOrders() {
  return (
    <section className="mx-auto px-4 md:py-0 py-8">
      {/* ✅ Header */}
      <h2 className="text-2xl font-bold mb-2">My Orders</h2>
      <p className="text-gray-500 mb-6">View and manage your orders here.</p>

      <div className="bg-white shadow-md p-4 sm:p-6 rounded-lg">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="border-b last:border-none pb-6 mb-6"
          >
            {/* ✅ Order Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Order #</span>
                <Link
                  href="#"
                  className="text-blue-500 hover:underline font-medium cursor-pointer"
                >
                  {order.orderId}
                </Link>
              </div>
              <p className="text-sm text-gray-500">
                Order Placed: {order.orderDate}
              </p>
              <button className="bg-black text-white px-4 py-1 rounded-md text-sm cursor-pointer hover:bg-gray-800">
                Track Order
              </button>
            </div>

            {/* ✅ Order Items */}
            {order.orderItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4 border-b pb-4 last:border-none"
              >
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-20 h-24 object-cover border rounded-md cursor-pointer hover:opacity-80"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.productName}</h3>
                  <p className="text-sm text-gray-500">By: {item.seller}</p>
                  <p className="text-sm">
                    Size: <span className="font-medium">{item.size}</span> |
                    Qty: <span className="font-medium">{item.quantity}</span>
                  </p>
                  <p className="text-lg font-semibold">฿ {item.price}</p>
                </div>
              </div>
            ))}

            {/* ✅ Order Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t pt-4 mt-4">
              <button className="text-red-500 font-medium hover:underline cursor-pointer">
                Cancel Order
              </button>
              <span className="text-lg font-bold">
                Total: ฿ {order.totalAmount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
