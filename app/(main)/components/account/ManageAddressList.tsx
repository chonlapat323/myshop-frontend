"use client";

import { AddressListProps } from "@/types/member/Address";
import ManageAddressForm from "./ManageAddressForm";
import { useAddressActions } from "@/hooks/member/useAddressActions";
import ConfirmModal from "../ui/modal/ConfirmModal";

export default function ManageAddressList({
  addresses,
  onEdit,
  editingAddressId,
  newAddress,
  errors,
  onChange,
  onSaveOrUpdate,
  onCancel,
  loading,
  setAddresses,
}: AddressListProps) {
  const {
    handleSetDefault,
    handleDelete,
    handleConfirmDelete,
    setShowConfirm,
    setSelectedId,
    showConfirm,
    settingDefault,
    deleting,
  } = useAddressActions(setAddresses);

  if (addresses.length === 0) {
    return <p className="text-gray-500">No saved addresses.</p>;
  }

  return (
    <>
      <div className="space-y-4">
        {addresses.map((address) => {
          const isEditing = editingAddressId === address.id;

          return (
            <div key={address.id}>
              {isEditing ? (
                <ManageAddressForm
                  newAddress={newAddress}
                  errors={errors}
                  loading={loading}
                  onChange={onChange}
                  onSaveOrUpdate={onSaveOrUpdate}
                  onCancel={onCancel}
                  editingAddressId={editingAddressId}
                />
              ) : (
                <div
                  className={`border p-4 rounded-md shadow-sm bg-white ${
                    address.is_default ? "border-black" : "border-gray-200"
                  }`}
                >
                  <h3 className="font-semibold">
                    {address.full_name}{" "}
                    {address.is_default && (
                      <span className="bg-black text-white text-xs px-2 py-1 rounded-md ml-2">
                        Default
                      </span>
                    )}
                  </h3>
                  <p>{address.address_line}</p>
                  <p>
                    {address.city}, {address.state} {address.zip_code}
                  </p>
                  <p className="text-gray-500">{address.phone_number}</p>

                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={() => onEdit(address)}
                      className="cursor-pointer bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleSetDefault(address.id!)}
                      disabled={address.is_default || settingDefault}
                      className="cursor-pointer bg-gray-200 text-black px-4 py-2 rounded-md text-sm hover:bg-gray-300"
                    >
                      {settingDefault && address.id === editingAddressId
                        ? "Setting..."
                        : "Set as Default"}
                    </button>
                    <button
                      onClick={() => handleDelete(address.id!)}
                      className="cursor-pointer text-red-500 hover:underline text-sm"
                      disabled={deleting}
                    >
                      {deleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <ConfirmModal
        open={showConfirm}
        title="คุณแน่ใจหรือไม่?"
        description="การลบที่อยู่นี้ไม่สามารถกู้คืนได้"
        onCancel={() => {
          setShowConfirm(false);
          setSelectedId(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
