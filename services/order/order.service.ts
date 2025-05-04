import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { API_URL } from "@/lib/config";
import { OrderPayload } from "@/types/utils/order/buildOrderPayload";
import { Order, OrderListResponse } from "@/types/member/order";

export function createOrder(payload: OrderPayload) {
  return fetchWithAuth(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function cancelOrder(orderId: number): Promise<void> {
  return fetchWithAuth<void>(`${API_URL}/orders/${orderId}/cancel`, {
    method: "PATCH",
  });
}
