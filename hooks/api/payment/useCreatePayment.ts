import { useState } from "react";
import { toast } from "sonner";
import { createPaymentMethod } from "@/services/member/payment.service";
import { CreatePaymentMethodDto, PaymentMethod } from "@/types/member/Payment";

export function useCreatePayment() {
  const [loading, setLoading] = useState(false);

  const create = async (
    data: CreatePaymentMethodDto
  ): Promise<PaymentMethod | null> => {
    try {
      setLoading(true);
      const result = await createPaymentMethod(data);
      toast.success("เพิ่มวิธีชำระเงินเรียบร้อยแล้ว");
      return result;
    } catch (error) {
      toast.error("ไม่สามารถเพิ่มวิธีชำระเงินได้");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading };
}
