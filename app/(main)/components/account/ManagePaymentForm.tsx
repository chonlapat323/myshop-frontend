"use client";

import React from "react";
import { ManagePaymentFormProps } from "@/types/member/Payment";

export default function ManagePaymentForm({
  newMethod,
  errors,
  loading,
  onChange,
  onSaveOrUpdate,
  onCancel,
  editingId,
}: ManagePaymentFormProps) {
  return (
    <div className="mt-6 border p-4 rounded-md shadow-sm bg-white">
      <h3 className="text-lg font-semibold mb-4">
        {editingId ? "Edit Payment Method" : "Add New Payment Method"}
      </h3>

      <div className="space-y-2">
        <input
          type="text"
          name="cardholder_name"
          value={newMethod.cardholder_name}
          onChange={onChange}
          placeholder="Cardholder Name"
          className="w-full border px-3 py-2 rounded-md"
        />
        {errors.cardholder_name && (
          <p className="text-red-500 text-sm">{errors.cardholder_name}</p>
        )}

        <input
          type="text"
          name="card_number"
          value={newMethod.card_number}
          onChange={onChange}
          placeholder="Card Number (16 digits)"
          className="w-full border px-3 py-2 rounded-md"
        />
        {errors.card_number && (
          <p className="text-red-500 text-sm">{errors.card_number}</p>
        )}

        <input
          type="text"
          name="expiry_date"
          value={newMethod.expiry_date}
          onChange={onChange}
          placeholder="Expiry Date (MM/YY)"
          className="w-full border px-3 py-2 rounded-md"
        />
        {errors.expiry_date && (
          <p className="text-red-500 text-sm">{errors.expiry_date}</p>
        )}

        <div className="mt-3 flex gap-3">
          <button
            onClick={onSaveOrUpdate}
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800"
          >
            {loading ? "Saving..." : editingId ? "Update" : "Save"}
          </button>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:underline text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
