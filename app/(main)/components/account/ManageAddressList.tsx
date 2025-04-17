// components/account/ManageAddressList.tsx
"use client";

import { Address } from "@/types/member/address";

interface Props {
  addresses: Address[];
}

export default function ManageAddressList({ addresses }: Props) {
  if (addresses.length === 0) {
    return <p className="text-gray-500">No saved addresses.</p>;
  }

  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <div
          key={address.id}
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

          {/* ปุ่ม Edit/Delete จะใส่ทีหลัง */}
          <div className="mt-3 flex gap-3">
            <button className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800">
              Edit
            </button>
            <button className="bg-gray-200 text-black px-4 py-2 rounded-md text-sm hover:bg-gray-300">
              Set as Default
            </button>
            <button className="text-red-500 hover:underline text-sm">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
