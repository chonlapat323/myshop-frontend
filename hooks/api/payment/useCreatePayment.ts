import { useState } from "react";
import { toast } from "sonner";
import { createPaymentMethod } from "@/services/member/payment.service";
import { CreatePaymentMethodDto, PaymentMethod } from "@/types/member/payment";

export function useCreatePayment() {
  const [loading, setLoading] = useState(false);

  const create = async (
    data: CreatePaymentMethodDto
  ): Promise<PaymentMethod | null> => {
    try {
      setLoading(true);
      const result = await createPaymentMethod(data);
      toast.success("Payment method added successfully");
      return result;
    } catch (error) {
      toast.error("Failed to add payment method");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading };
}
