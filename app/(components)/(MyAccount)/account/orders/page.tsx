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
        productName: "Netting Mykonos Tunic Chair",
        seller: "Milly Thomas",
        size: "S",
        quantity: 1,
        price: 1250,
        status: "In Transit",
        deliveryDate: "24 December 2023",
        image: "/images/products/chair.jpg",
      },
      {
        id: "2",
        productName: "Embroidered Sequin Mini Chair",
        seller: "Sonia Agrawal",
        size: "S",
        quantity: 1,
        price: 1760,
        status: "In Transit",
        deliveryDate: "24 December 2023",
        image: "/images/products/armchair.jpg",
      },
    ],
  },
  {
    orderId: "R0374915037",
    orderDate: "17 Nov 2023",
    totalAmount: 3010,
    orderItems: [
      {
        id: "1",
        productName: "Netting Mykonos Tunic Chair",
        seller: "Milly Thomas",
        size: "S",
        quantity: 1,
        price: 1250,
        status: "In Transit",
        deliveryDate: "24 December 2023",
        image: "/images/products/chair.jpg",
      },
      {
        id: "2",
        productName: "Embroidered Sequin Mini Chair",
        seller: "Sonia Agrawal",
        size: "S",
        quantity: 1,
        price: 1760,
        status: "In Transit",
        deliveryDate: "24 December 2023",
        image: "/images/products/armchair.jpg",
      },
    ],
  },
];

export default function MyOrders() {
  return (
    <section className="max-w-6xl mx-auto  md:py-0 py-4">
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
              <button className="bg-black text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-800 transition-all">
                Track Order
              </button>
            </div>

            {/* ✅ Order Items */}
            <div className="mt-4 space-y-4">
              {order.orderItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-20 h-20 object-cover rounded-md border cursor-pointer hover:opacity-80 transition"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.productName}</h3>
                    <p className="text-sm text-gray-500">By: {item.seller}</p>
                    <p className="text-sm">
                      Size: <span className="font-medium">{item.size}</span> |
                      Qty: <span className="font-medium">{item.quantity}</span>
                    </p>
                    <p className="text-lg font-semibold text-black">
                      ฿ {item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ Order Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t pt-4 mt-4 gap-2">
              <button className="text-red-500 font-medium hover:underline cursor-pointer sm:mr-auto">
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
