"use client";
import { useManageAddressForm } from "@/hooks/member/useManageAddressForm";

import ManageAddressForm from "../../components/account/ManageAddressForm";
import ManageAddressList from "../../components/account/ManageAddressList";
export default function ManageAddressPage() {
  const {
    newAddress,
    errors,
    loading,
    isAdding,
    setIsAdding,
    handleChange,
    handleSaveNew,
    handleUpdateEdit,
    handleEdit,
    cancelEdit,
    addresses,
    editingAddressId,
    setAddresses,
  } = useManageAddressForm();

  return (
    <section className="mx-auto px-0 py-0">
      <h2 className="text-2xl font-bold mb-4">Manage Address</h2>

      <ManageAddressList
        addresses={addresses}
        setAddresses={setAddresses}
        onEdit={handleEdit}
        editingAddressId={editingAddressId}
        newAddress={newAddress}
        errors={errors}
        onChange={handleChange}
        onSaveOrUpdate={handleUpdateEdit}
        onCancel={cancelEdit}
        loading={loading}
      />

      {isAdding && !editingAddressId && (
        <ManageAddressForm
          newAddress={newAddress}
          errors={errors}
          loading={loading}
          onChange={handleChange}
          onSaveOrUpdate={handleSaveNew}
          onCancel={cancelEdit}
          editingAddressId={null}
        />
      )}

      {!isAdding && !editingAddressId && (
        <button
          onClick={() => setIsAdding(true)}
          className="cursor-pointer mt-6 bg-black text-white px-6 py-2 rounded-md"
        >
          Add New Address
        </button>
      )}
    </section>
  );
}
