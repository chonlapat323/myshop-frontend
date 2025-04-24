"use client";

import { useEffect, useState } from "react";
import { Address } from "@/types/member/address";
import { getAddresses } from "@/services/member/address.service";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: (addressId: number) => void;
};

export default function AddressSelectModal({
  open,
  onClose,
  onConfirm,
}: Props) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (open) {
      getAddresses().then((data) => {
        setAddresses(data);

        const defaultAddr = data.find((addr) => addr.is_default);
        if (defaultAddr) {
          setSelectedId(defaultAddr.id!);
        }
      });
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">เลือกที่อยู่สำหรับจัดส่ง</h2>

        <div className="max-h-60 overflow-y-auto space-y-2 mb-4">
          {addresses.map((addr) => (
            <label
              key={addr.id}
              className="block border rounded p-2 cursor-pointer"
            >
              <input
                type="radio"
                name="address"
                value={addr.id}
                checked={selectedId === addr.id}
                onChange={() => setSelectedId(addr.id!)}
                className="mr-2"
              />
              <span>
                {addr.full_name} | {addr.address_line} | {addr.phone_number}
              </span>
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            ยกเลิก
          </button>
          <button
            onClick={() => selectedId && onConfirm(selectedId)}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
            disabled={!selectedId}
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
}
