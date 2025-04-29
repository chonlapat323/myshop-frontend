import { useState } from "react";
import { useCartItems } from "@/hooks/cart/useCartItems";
import { useAddresses } from "@/hooks/member/useAddresses";
import { toast } from "sonner";

export const useCartController = () => {
  const {
    updateItemQuantity,
    removeItem,
    placeOrder,
    items,
    total,
    isLoading,
  } = useCartItems();

  const { addresses } = useAddresses();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const handleConfirmAddress = async (addressId: number) => {
    setShowAddressModal(false);
    const address = addresses.find((a) => a.id === addressId);
    if (!address) return;

    await placeOrder(address);
    toast.success("Order confirmed");
  };

  const handleConfirmDelete = async () => {
    if (selectedItemId !== null) {
      removeItem(selectedItemId);
      setSelectedItemId(null);
      setConfirmOpen(false);
    }
  };

  return {
    updateItemQuantity,
    items,
    total,
    isLoading,
    showAddressModal,
    confirmOpen,
    selectedItemId,
    setSelectedItemId,
    setShowAddressModal,
    setConfirmOpen,
    handleConfirmAddress,
    handleConfirmDelete,
  };
};
