"use client";

import Link from "next/link";
import Image from "next/image";
import { useGetOrders } from "@/hooks/api/order/useGetOrders";
import { API_URL } from "@/lib/config";
import { NoImage } from "@/app/icons";

export default function MyOrders() {
  const { orders, isLoading, isError } = useGetOrders();

  if (isLoading) return <p className="text-gray-500">Loading orders...</p>;
  if (isError) return <p className="text-red-500">Failed to load orders.</p>;

  return (
    <section className="max-w-6xl mx-auto md:py-0 py-4">
      <h2 className="text-2xl font-bold mb-2">My Orders</h2>
      <p className="text-gray-500 mb-6">View and manage your orders here.</p>
      <div className="bg-white shadow-md p-4 sm:p-6 rounded-lg">
        {orders.map((order) => (
          <div
            key={order.order_number}
            className="border-b last:border-none pb-6 mb-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Order #</span>
                <Link
                  href={`/account/orders/${order.order_number}`}
                  className="text-blue-500 hover:underline font-medium"
                >
                  {order.order_number}
                </Link>
              </div>
              <p className="text-sm text-gray-500">
                Order Placed: {order.created_at}
              </p>
              <button className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-all">
                Track Order
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {order.items.map((item) => {
                const imageUrl = item.product?.product_image?.[0]?.url;
                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm"
                  >
                    {imageUrl ? (
                      <Image
                        src={`${API_URL}${imageUrl}`}
                        alt={item.product_name}
                        width={100}
                        height={100}
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                    ) : (
                      <NoImage />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.product_name}</h3>
                      <p className="text-sm">
                        Qty:{" "}
                        <span className="font-medium">{item.quantity}</span>
                      </p>
                      <p className="text-lg font-semibold">฿ {item.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t pt-4 mt-4 gap-2">
              <button className="text-red-500 font-medium hover:underline cursor-pointer">
                Cancel Order
              </button>
              <span className="text-lg font-bold">
                Total: ฿ {order.total_price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
