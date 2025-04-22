import { cancelOrder } from "@/services/order/order.service";

export function useCancelOrder() {
  return async (orderId: number) => {
    return await cancelOrder(orderId);
  };
}
