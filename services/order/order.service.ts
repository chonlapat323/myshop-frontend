// services/order/order.service.ts
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { API_URL } from "@/lib/config";
import { OrderPayload } from "@/utils/order/buildOrderPayload";
import { Order } from "@/types/member/order";

export async function getOrders(): Promise<Order[]> {
  const res = await fetchWithAuth(`${API_URL}/orders`);
  return await res.json();
}

export async function createOrder(payload: OrderPayload) {
  const res = await fetchWithAuth(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("สั่งซื้อไม่สำเร็จ");
  return res.json();
}
