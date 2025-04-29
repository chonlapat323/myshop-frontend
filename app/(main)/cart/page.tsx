"use client";
import { useCartController } from "@/hooks/cart/useCartController";
import CartItemCard from "../components/cart/CartItemCard";
import CartSummary from "../components/cart/CartSummary";
import ConfirmModal from "../components/ui/modal/ConfirmModal";
import AddressSelectModal from "../components/ui/modal/AddressSelectModal";

export default function CartPage() {
  const {
    updateItemQuantity,
    items,
    total,
    isLoading,
    showAddressModal,
    confirmOpen,
    setSelectedItemId,
    setShowAddressModal,
    setConfirmOpen,
    handleConfirmAddress,
    handleConfirmDelete,
  } = useCartController();

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

        {isLoading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500"> Your cart is empty.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 flex flex-col gap-4">
              {items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onQuantityChange={(newQty) =>
                    updateItemQuantity(item.id, newQty)
                  }
                  onRemove={() => {
                    setSelectedItemId(item.id);
                    setConfirmOpen(true);
                  }}
                />
              ))}
            </div>

            <CartSummary
              total={total}
              onCheckout={() => setShowAddressModal(true)}
            />
          </div>
        )}
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Remove item?"
        description="Are you sure you want to remove this item from your cart?"
        onCancel={() => {
          setConfirmOpen(false);
          setSelectedItemId(null);
        }}
        onConfirm={handleConfirmDelete}
      />

      <AddressSelectModal
        open={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onConfirm={handleConfirmAddress}
      />
    </>
  );
}
