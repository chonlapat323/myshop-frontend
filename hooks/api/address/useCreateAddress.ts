import { createAddress } from "@/services/member/address.service";
import { useState } from "react";
import { toast } from "sonner";
import { Address, CreateAddressDto } from "@/types/member/address"; // หรือปรับตามของคุณ
export function useCreateAddress() {
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const create = async (data: CreateAddressDto) => {
    try {
      setLoading(true);
      const newAddress = await createAddress(data);
      toast.success("เพิ่มที่อยู่เรียบร้อยแล้ว");
      return newAddress;
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดขณะเพิ่มที่อยู่");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading };
}
