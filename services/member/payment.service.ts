import { API_URL } from "@/lib/config";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import {
  PaymentMethod,
  CreatePaymentMethodDto,
  UpdatePaymentMethodDto,
} from "@/types/member/Payment";

export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  return fetchWithAuth<PaymentMethod[]>(`${API_URL}/payment-method`);
}

export function createPaymentMethod(
  data: CreatePaymentMethodDto
): Promise<PaymentMethod> {
  return fetchWithAuth<PaymentMethod>(`${API_URL}/payment-method`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function updatePaymentMethod(
  id: string,
  data: UpdatePaymentMethodDto
): Promise<PaymentMethod> {
  return fetchWithAuth<PaymentMethod>(`${API_URL}/payment-method/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function deletePaymentMethod(id: string): Promise<void> {
  return fetchWithAuth<void>(`${API_URL}/payment-method/${id}`, {
    method: "DELETE",
  });
}

export function setDefaultPaymentMethod(id: string): Promise<PaymentMethod> {
  return fetchWithAuth<PaymentMethod>(
    `${API_URL}/payment-method/${id}/default`,
    {
      method: "PATCH",
    }
  );
}
