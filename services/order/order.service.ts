import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { API_URL } from "@/lib/config";
import { OrderPayload } from "@/types/utils/order/buildOrderPayload";
import { Order } from "@/types/member/Order";

export async function getOrders(): Promise<Order[]> {
  const res = await fetchWithAuth(`${API_URL}/orders`);
  return await res.json();
}

export function createOrder(payload: OrderPayload) {
  return fetchWithAuth(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function cancelOrder(orderId: number): Promise<void> {
  const res = await fetchWithAuth(`${API_URL}/orders/${orderId}/cancel`, {
    method: "PATCH",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "ยกเลิกคำสั่งซื้อไม่สำเร็จ");
  }
}
