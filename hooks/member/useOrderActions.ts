import { useGetOrders } from "@/hooks/api/order/useGetOrders";
import { useCancelOrder } from "../api/order/useCancelOrder";

export const useOrderActions = () => {
  const { orders, isLoading, isError, refresh } = useGetOrders();
  const cancel = useCancelOrder();
  const handleCancelOrder = async (orderId: number) => {
    try {
      await cancel(orderId);
      await refresh();
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };
  return {
    orders,
    isLoading,
    isError,
    refreshOrders: refresh,
    handleCancelOrder,
  };
};
