"use client";

import { useState } from "react";
import Image from "next/image";
import { API_URL } from "@/lib/config";
import { NoImage } from "@/app/icons";
import { useOrderActions } from "@/hooks/member/useOrderActions";
import ConfirmModal from "../../components/ui/modal/ConfirmModal";
import ShippingAddressModal from "../../components/ui/modal/ShippingAddressModal";
import { formatDate } from "@/utils/format-date";
import {
  getOrderStatusColor,
  getOrderStatusLabel,
} from "@/utils/order/order-status";
import { formatCurrencyTHB } from "@/utils/format-currency";
import { Address } from "@/types/member/Address";
import Pagination from "../../components/Pagination";

export default function MyOrders() {
  const [page, setPage] = useState(1);
  const limit = 4;
  const {
    orders,
    isLoading,
    isError,
    showConfirm,
    pageCount,
    handleClickCancel,
    handleConfirmCancel,
    handleCancelModal,
  } = useOrderActions(page, limit);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  if (isLoading) return <p className="text-gray-500">Loading orders...</p>;
  if (isError) return <p className="text-red-500">Failed to load orders.</p>;

  return (
    <>
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
                  <span className="text-blue-500 hover:underline font-medium">
                    {order.order_number}
                  </span>
                  <div
                    onClick={() => {
                      setSelectedAddress(order.shipping_address);
                      setShowAddressModal(true);
                    }}
                    className="text-sm text-blue-500 hover:underline cursor-pointer"
                  >
                    รายละเอียดการจัดส่ง
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Order Placed: {formatDate(order.created_at)}
                </p>
                <div className="flex gap-2 items-center">
                  <span
                    className={`font-medium ${getOrderStatusColor(
                      order.order_status
                    )}`}
                  >
                    {getOrderStatusLabel(order.order_status)}
                  </span>

                  {["shipped", "delivered"].includes(order.order_status) &&
                    order.tracking_number && (
                      <div className="ml-2 px-2 py-1 bg-gray-100 text-sm rounded-md flex items-center gap-1">
                        <span>{order.tracking_number}</span>
                        <button
                          onClick={() =>
                            navigator.clipboard.writeText(order.tracking_number)
                          }
                          className="text-blue-500 text-xs hover:underline"
                        >
                          Copy
                        </button>
                      </div>
                    )}
                </div>
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
                        <NoImage width={100} height={100} />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.product_name}</h3>
                        <p className="text-sm">
                          Qty:{" "}
                          <span className="font-medium">{item.quantity}</span>
                        </p>
                        <p className="text-lg font-semibold">
                          {formatCurrencyTHB(item.price)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t pt-4 mt-4 gap-2">
                <button
                  onClick={() => handleClickCancel(order.id)}
                  className="text-red-500 font-medium hover:underline cursor-pointer"
                >
                  Cancel Order
                </button>
                <span className="text-lg font-bold">
                  Total: {formatCurrencyTHB(order.total_price)}
                </span>
              </div>
            </div>
          ))}
        </div>
        {pageCount > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={pageCount}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </div>
        )}
      </section>
      <ConfirmModal
        open={showConfirm}
        title="Cancel this order?"
        description="This action cannot be undone. Do you really want to cancel it?"
        onConfirm={handleConfirmCancel}
        onCancel={handleCancelModal}
      />
      <ShippingAddressModal
        open={showAddressModal}
        address={selectedAddress}
        onClose={() => {
          setShowAddressModal(false);
          setSelectedAddress(null);
        }}
      />
    </>
  );
}
