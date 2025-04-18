"use client";

import React from "react";
import { PaymentMethod } from "@/types/member/payment";
import ConfirmModal from "../ui/modal/ConfirmModal";
import { usePaymentAction } from "@/hooks/member/usePaymentAction";

interface Props {
  methods: PaymentMethod[];
  setMethods: React.Dispatch<React.SetStateAction<PaymentMethod[]>>;
  onEdit: (method: PaymentMethod) => void;
  editingId: string | null;
  newMethod: {
    cardholder_name: string;
    card_number: string;
    expiry_date: string;
    is_default?: boolean;
  };
  errors: {
    cardholder_name: string;
    card_number: string;
    expiry_date: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveOrUpdate: () => void;
  onCancel: () => void;
  loading: boolean;
}

export default function ManagePaymentList({
  methods,
  setMethods,
  onEdit,
  editingId,
  newMethod,
  errors,
  onChange,
  onSaveOrUpdate,
  onCancel,
  loading,
}: Props) {
  const {
    handleDelete,
    handleConfirmDelete,
    handleSetDefault,
    showConfirm,
    setShowConfirm,
    setSelectedId,
    settingDefault,
    deleting,
  } = usePaymentAction({ setMethods });

  if (methods.length === 0) {
    return <p className="text-gray-500">No saved payment methods.</p>;
  }

  return (
    <>
      <div className="space-y-4">
        {methods.map((method) => {
          const isEditing = editingId === method.id;

          return (
            <div
              key={method.id}
              className={`border p-4 rounded-md shadow-sm bg-white ${
                method.is_default ? "border-black" : "border-gray-200"
              }`}
            >
              {isEditing ? (
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
                    <p className="text-red-500 text-sm">
                      {errors.cardholder_name}
                    </p>
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
                      disabled={loading}
                      onClick={onSaveOrUpdate}
                      className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800"
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={onCancel}
                      className="text-gray-500 hover:underline text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold">
                    {method.cardholder_name}{" "}
                    {method.is_default && (
                      <span className="bg-black text-white text-xs px-2 py-1 rounded-md ml-2">
                        Default
                      </span>
                    )}
                  </h3>
                  <p>•••• •••• •••• {method.card_number.slice(-4)}</p>
                  <p>Expires: {method.expiry_date}</p>

                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={() => onEdit(method)}
                      className="cursor-pointer bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleSetDefault(method.id)}
                      disabled={method.is_default || settingDefault}
                      className="cursor-pointer bg-gray-200 text-black px-4 py-2 rounded-md text-sm hover:bg-gray-300"
                    >
                      {settingDefault ? "Setting..." : "Set as Default"}
                    </button>
                    <button
                      onClick={() => handleDelete(method.id)}
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
        description="การลบวิธีชำระเงินนี้ไม่สามารถกู้คืนได้"
        onCancel={() => {
          setShowConfirm(false);
          setSelectedId(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
