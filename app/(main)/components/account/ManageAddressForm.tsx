"use client";

import React from "react";

interface AddressFormProps {
  newAddress: {
    full_name: string;
    address_line: string;
    city: string;
    state: string;
    zip_code: string;
    phone_number: string;
  };
  errors: {
    full_name: string;
    address_line: string;
    city: string;
    state: string;
    zip_code: string;
    phone_number: string;
  };
  loading: boolean;
  editingAddressId: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveOrUpdate: () => void;
  onCancel: () => void;
}

export default function ManageAddressForm({
  newAddress,
  errors,
  loading,
  editingAddressId,
  onChange,
  onSaveOrUpdate,
  onCancel,
}: AddressFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSaveOrUpdate();
      }}
    >
      <div className="mt-6 border p-4 rounded-md shadow-sm bg-white">
        <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
        <div className="space-y-2">
          <input
            type="text"
            name="full_name"
            required
            value={newAddress.full_name}
            onChange={onChange}
            placeholder="Full Name"
            className="w-full border px-3 py-2 rounded-md"
          />
          {errors.full_name && (
            <p className="text-red-500 text-sm">{errors.full_name}</p>
          )}

          <input
            type="text"
            name="address_line"
            required
            value={newAddress.address_line}
            onChange={onChange}
            placeholder="Address Line"
            className="w-full border px-3 py-2 rounded-md"
          />
          {errors.address_line && (
            <p className="text-red-500 text-sm">{errors.address_line}</p>
          )}

          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              name="city"
              required
              value={newAddress.city}
              onChange={onChange}
              placeholder="City"
              className="border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              name="state"
              required
              value={newAddress.state}
              onChange={onChange}
              placeholder="State"
              className="border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              name="zip_code"
              required
              value={newAddress.zip_code}
              onChange={onChange}
              placeholder="ZIP Code"
              className="border px-3 py-2 rounded-md"
            />
          </div>

          <input
            type="text"
            name="phone_number"
            required
            value={newAddress.phone_number}
            onChange={onChange}
            placeholder="Phone Number"
            className="w-full border px-3 py-2 rounded-md"
          />

          <div className="mt-3 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800"
            >
              {loading
                ? editingAddressId
                  ? "Updating..."
                  : "Saving..."
                : editingAddressId
                ? "Update"
                : "Save"}
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
    </form>
  );
}
