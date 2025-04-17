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
  } = useManageAddressForm();

  return (
    <section className="mx-auto px-0 py-0">
      <h2 className="text-2xl font-bold mb-4">Manage Address</h2>

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
