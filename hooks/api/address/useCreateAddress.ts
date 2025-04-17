import { createAddress } from "@/services/member/address.service";
import { useState } from "react";
import { toast } from "sonner";

export function useCreateAddress() {
  const [loading, setLoading] = useState(false);

  const create = async (data: any) => {
    try {
      setLoading(true);
      await createAddress(data);
      toast.success("เพิ่มที่อยู่เรียบร้อยแล้ว");
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดขณะเพิ่มที่อยู่");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading };
}
