import { API_URL } from "@/lib/config";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import {
  PaymentMethod,
  CreatePaymentMethodDto,
  UpdatePaymentMethodDto,
} from "@/types/member/Payment";

export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  const res = await fetchWithAuth(`${API_URL}/payment-method`);
  if (!res.ok) throw new Error("Failed to fetch payment methods");
  return res.json();
}

export async function createPaymentMethod(
  data: CreatePaymentMethodDto
): Promise<PaymentMethod> {
  const res = await fetchWithAuth(`${API_URL}/payment-method`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create payment method");
  return res.json();
}

export async function updatePaymentMethod(
  id: string,
  data: UpdatePaymentMethodDto
): Promise<PaymentMethod> {
  const res = await fetchWithAuth(`${API_URL}/payment-method/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update payment method");
  return res.json();
}

export async function deletePaymentMethod(id: string): Promise<void> {
  const res = await fetchWithAuth(`${API_URL}/payment-method/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete payment method");
}

export async function setDefaultPaymentMethod(
  id: string
): Promise<PaymentMethod> {
  const res = await fetchWithAuth(`${API_URL}/payment-method/${id}/default`, {
    method: "PATCH",
  });

  if (!res.ok) throw new Error("Failed to set default payment method");
  return res.json();
}
