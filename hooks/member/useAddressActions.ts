"use client";
import { useSetDefaultAddress } from "@/hooks/api/address/useSetDefaultAddress";
import { useDeleteAddress } from "@/hooks/api/address/useDeleteAddress";
import { Address } from "@/types/member/Address";
import { useState } from "react";

export function useAddressActions(
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>
) {
  const { setDefault, loading: settingDefault } = useSetDefaultAddress();
  const { remove, loading: deleting } = useDeleteAddress();
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSetDefault = async (id: number) => {
    const updated = await setDefault(id);
    if (!updated) return;

    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        is_default: addr.id === updated.id,
      }))
    );
  };

  const handleDelete = async (id: number) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    const success = await remove(selectedId);
    if (success) {
      setAddresses((prev) => prev.filter((addr) => addr.id !== selectedId));
    }

    setShowConfirm(false);
    setSelectedId(null);
  };

  return {
    handleSetDefault,
    handleDelete,
    handleConfirmDelete,
    setShowConfirm,
    setSelectedId,
    showConfirm,
    settingDefault,
    deleting,
  };
}
