import useSWR from "swr";
import { OrderListResponse } from "@/types/member/order";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { API_URL } from "@/lib/config";

export function useGetOrders(page = 1, limit = 10) {
  const { data, error, isLoading, mutate } = useSWR<OrderListResponse>(
    `${API_URL}/orders?page=${page}&limit=${limit}`,
    fetchWithAuth<OrderListResponse>
  );

  return {
    orders: data?.data ?? [],
    total: data?.total ?? 0,
    page: data?.page ?? 1,
    pageCount: data?.pageCount ?? 1,
    isLoading,
    isError: !!error,
    refresh: mutate,
  };
}
