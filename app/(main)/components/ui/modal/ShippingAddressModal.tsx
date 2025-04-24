// components/modal/ShippingAddressModal.tsx
"use client";

import { Address } from "@/types/member/address";

interface ShippingAddressModalProps {
  open: boolean;
  address: Address | null;
  onClose: () => void;
}

export default function ShippingAddressModal({
  open,
  address,
  onClose,
}: ShippingAddressModalProps) {
  if (!open || !address) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">รายละเอียดที่อยู่จัดส่ง</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>ชื่อผู้รับ:</strong> {address.full_name}
          </p>
          <p>
            <strong>ที่อยู่:</strong> {address.address_line}
          </p>
          <p>
            <strong>เมือง:</strong> {address.city}
          </p>
          <p>
            <strong>รัฐ/จังหวัด:</strong> {address.state}
          </p>
          <p>
            <strong>รหัสไปรษณีย์:</strong> {address.zip_code}
          </p>
          <p>
            <strong>เบอร์โทร:</strong> {address.phone_number}
          </p>
        </div>
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
}
