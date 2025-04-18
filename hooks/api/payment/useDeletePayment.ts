import { useState } from "react";
import { toast } from "sonner";
import { deletePaymentMethod } from "@/services/member/payment.service";

export function useDeletePayment() {
  const [loading, setLoading] = useState(false);

  const remove = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      await deletePaymentMethod(id);
      toast.success("ลบวิธีชำระเงินเรียบร้อยแล้ว");
      return true;
    } catch (error) {
      toast.error("ไม่สามารถลบวิธีชำระเงินได้");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading };
}
