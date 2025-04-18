import { useState } from "react";
import { toast } from "sonner";
import { setDefaultPaymentMethod } from "@/services/member/payment.service";
import { PaymentMethod } from "@/types/member/payment";

export function useSetDefaultPayment() {
  const [loading, setLoading] = useState(false);

  const setDefault = async (id: string): Promise<PaymentMethod | null> => {
    try {
      setLoading(true);
      const updated = await setDefaultPaymentMethod(id);
      toast.success("ตั้งค่า default สำเร็จ");
      return updated;
    } catch (error) {
      toast.error("ไม่สามารถตั้งค่า default ได้");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { setDefault, loading };
}
