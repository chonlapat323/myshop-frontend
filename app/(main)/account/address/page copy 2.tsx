// app/account/address/page.tsx
"use client";

import ManageAddressForm from "../../components/account/ManageAddressForm";
import { useManageAddressForm } from "@/hooks/member/useManageAddressForm";
export default function ManageAddressPage() {
  const {
    newAddress,
    errors,
    loading,
    isAdding,
    setIsAdding,
    handleChange,
    handleSaveNew,
    addresses, // ✅ เพิ่มเข้ามา
    setAddresses, // optional เผื่อใช้ในภายหลัง
  } = useManageAddressForm();

  return (
    <section className="mx-auto px-0 py-0">
      <h2 className="text-2xl font-bold mb-4">Manage Address</h2>

      {addresses.length > 0 ? (
        <div className="space-y-4 mb-6">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="border p-4 rounded-md bg-white shadow-sm"
            >
              <h3 className="font-semibold">{addr.full_name}</h3>
              <p>{addr.address_line}</p>
              <p>
                {addr.city}, {addr.state} {addr.zip_code}
              </p>
              <p className="text-gray-500">{addr.phone_number}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-6">No saved addresses.</p>
      )}

      {isAdding && (
        <ManageAddressForm
          newAddress={newAddress}
          errors={errors}
          loading={loading}
          onChange={handleChange}
          onSave={handleSaveNew}
          onCancel={() => setIsAdding(false)}
        />
      )}

      <button
        onClick={() => setIsAdding(true)}
        className="cursor-pointer mt-6 bg-black text-white px-6 py-2 rounded-md"
      >
        Add New Address
      </button>
    </section>
  );
}
