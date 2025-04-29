"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useDeletePayment } from "@/hooks/api/payment/useDeletePayment";
import { useSetDefaultPayment } from "@/hooks/api/payment/userSetDefaultPayment";
import { usePaymentActionProps } from "@/types/hook/usePaymentAction";

export function usePaymentAction({ setMethods }: usePaymentActionProps) {
  const { remove, loading: deleting } = useDeletePayment();
  const { setDefault, loading: settingDefault } = useSetDefaultPayment();

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSetDefault = async (id: string) => {
    const updated = await setDefault(id);
    if (!updated) return;

    setMethods((prev) =>
      prev.map((method) => ({
        ...method,
        is_default: method.id === updated.id,
      }))
    );
    toast.success("Default payment method set successfully");
  };

  const handleDelete = (id: string) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    const success = await remove(selectedId);
    if (success) {
      setMethods((prev) => prev.filter((method) => method.id !== selectedId));
      toast.success("Payment method deleted successfully");
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
