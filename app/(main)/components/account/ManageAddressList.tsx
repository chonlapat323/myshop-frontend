// components/account/ManageAddressList.tsx
"use client";

import { Address } from "@/types/member/address";

import ManageAddressForm from "./ManageAddressForm";
import { useSetDefaultAddress } from "@/hooks/api/address/useSetDefaultAddress";

interface Props {
  addresses: Address[];
  onEdit: (address: Address) => void;
  editingAddressId: string | null;
  newAddress: {
    full_name: string;
    address_line: string;
    city: string;
    state: string;
    zip_code: string;
    phone_number: string;
    is_default?: boolean;
  };
  errors: {
    full_name: string;
    address_line: string;
    city: string;
    state: string;
    zip_code: string;
    phone_number: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveOrUpdate: () => void;
  onCancel: () => void;
  loading: boolean;
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
}

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
}: Props) {
  const { setDefault, loading: settingDefault } = useSetDefaultAddress();

  const handleSetDefault = async (id: string) => {
    const updated = await setDefault(id);
    if (!updated) return;

    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        is_default: addr.id === updated.id, // ✅ default ตัวเดียว
      }))
    );
  };

  if (addresses.length === 0) {
    return <p className="text-gray-500">No saved addresses.</p>;
  }

  return (
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
                  <button className="cursor-pointer text-red-500 hover:underline text-sm">
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
