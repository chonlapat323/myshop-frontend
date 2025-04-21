// app/cart/page.tsx
"use client";

import { useCartItems } from "@/hooks/cart/useCartItems";
import CartItemCard from "../components/cart/CartItemCard";
import ConfirmModal from "../components/ui/modal/ConfirmModal";
import { useState } from "react";
import AddressSelectModal from "../components/ui/modal/AddressSelectModal";
import { useCart } from "@/context/CartContext";
import { useAddresses } from "@/hooks/member/useAddresses";
export default function CartPage() {
  const {
    updateItemQuantity,
    removeItem,
    placeOrder,
    items,
    total,
    isLoading,
  } = useCartItems();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const { addresses, loading } = useAddresses();
  const handleConfirmAddress = async (addressId: number) => {
    setShowAddressModal(false);
    const address = addresses.find((a) => a.id === addressId);
    if (!address) return;

    await placeOrder(address); // ✅ เรียกผ่าน hook
    alert("สั่งซื้อสำเร็จ!");
  };

  const handleConfirmDelete = () => {
    if (selectedItemId !== null) {
      removeItem(selectedItemId); // ✅ ลบจาก hook
      setSelectedItemId(null);
      setConfirmOpen(false); // ✅ ปิด modal
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">🛒 ตะกร้าสินค้าของคุณ</h1>

        {isLoading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500">ยังไม่มีสินค้าที่เพิ่มเข้ามา</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* รายการสินค้า */}
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

            {/* สรุปราคา */}
            <div className="bg-gray-100 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">สรุปคำสั่งซื้อ</h2>
              <div className="flex justify-between mb-2">
                <span>รวมทั้งหมด</span>
                <span className="font-bold">{total.toFixed(2)} บาท</span>
              </div>
              <button
                onClick={() => setShowAddressModal(true)}
                className="cursor-pointer mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
              >
                ดำเนินการชำระเงิน
              </button>
            </div>
          </div>
        )}
      </div>
      <ConfirmModal
        open={confirmOpen}
        title="ยืนยันการลบสินค้า"
        description="คุณต้องการลบสินค้านี้ออกจากตะกร้าหรือไม่?"
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
