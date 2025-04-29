"use client";

import { formatCurrencyTHB } from "@/utils/format-currency";

type CartSummaryProps = {
  total: number;
  onCheckout: () => void;
};

export default function CartSummary({ total, onCheckout }: CartSummaryProps) {
  return (
    <div className="bg-gray-100 rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Total</span>
        <span className="font-bold">{formatCurrencyTHB(total)} ฿</span>
      </div>
      <button
        onClick={onCheckout}
        className="cursor-pointer mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
