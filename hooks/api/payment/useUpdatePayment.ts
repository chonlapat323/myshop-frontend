import { useState } from "react";
import { toast } from "sonner";
import { updatePaymentMethod } from "@/services/member/payment.service";
import { UpdatePaymentMethodDto, PaymentMethod } from "@/types/member/payment";

export function useUpdatePayment() {
  const [loading, setLoading] = useState(false);

  const update = async (
    id: string,
    data: UpdatePaymentMethodDto
  ): Promise<PaymentMethod | null> => {
    try {
      setLoading(true);
      const updated = await updatePaymentMethod(id, data);
      toast.success("อัปเดตวิธีชำระเงินเรียบร้อยแล้ว");
      return updated;
    } catch (error) {
      toast.error("ไม่สามารถอัปเดตวิธีชำระเงินได้");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading };
}
