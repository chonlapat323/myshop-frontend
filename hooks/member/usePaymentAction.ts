"use client";

import { useDeletePayment } from "@/hooks/api/payment/useDeletePayment";
import { useSetDefaultPayment } from "@/hooks/api/payment/userSetDefaultPayment";
import { PaymentMethod } from "@/types/member/payment";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  setMethods: React.Dispatch<React.SetStateAction<PaymentMethod[]>>;
};

export function usePaymentAction({ setMethods }: Props) {
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
    toast.success("ตั้งค่าบัตรเริ่มต้นเรียบร้อยแล้ว");
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
      toast.success("ลบบัตรเรียบร้อยแล้ว");
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
