import useSWR from "swr";
import { getOrders } from "@/services/order/order.service";
import { Order } from "@/types/member/Order";

export const useGetOrders = () => {
  const { data, error, isLoading, mutate } = useSWR<Order[]>(
    "orders",
    getOrders
  );

  return {
    orders: data ?? [],
    isLoading,
    isError: !!error,
    refresh: mutate,
  };
};
