import { useGetOrders } from "@/hooks/api/order/useGetOrders";

export const useOrderActions = () => {
  const { orders, isLoading, isError, refresh } = useGetOrders();

  return {
    orders,
    isLoading,
    isError,
    refreshOrders: refresh,
  };
};
