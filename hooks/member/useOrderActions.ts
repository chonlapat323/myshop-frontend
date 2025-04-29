import { useState } from "react";
import { useGetOrders } from "@/hooks/api/order/useGetOrders";
import { useCancelOrder } from "../api/order/useCancelOrder";
import { toast } from "sonner";

export const useOrderActions = (page: number, limit: number) => {
  const { orders, isLoading, isError, total, pageCount, refresh } =
    useGetOrders(page, limit);
  const cancel = useCancelOrder();
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const handleClickCancel = (orderId: number) => {
    setSelectedOrderId(orderId);
    setShowConfirm(true);
  };

  const handleCancelOrder = async (orderId: number) => {
    try {
      await cancel(orderId);
      await refresh();
      toast.success("Order cancelled successfully");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to cancel order");
    }
  };

  const handleConfirmCancel = async () => {
    if (selectedOrderId) {
      await handleCancelOrder(selectedOrderId);
    }
    setShowConfirm(false);
    setSelectedOrderId(null);
  };

  const handleCancelModal = () => {
    setShowConfirm(false);
    setSelectedOrderId(null);
  };

  return {
    orders,
    isLoading,
    isError,
    refreshOrders: refresh,
    showConfirm,
    selectedOrderId,
    page,
    total,
    pageCount,
    handleClickCancel,
    handleConfirmCancel,
    handleCancelModal,
  };
};
