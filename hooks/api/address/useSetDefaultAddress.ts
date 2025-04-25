import { useState } from "react";
import { toast } from "sonner";
import { setDefaultAddress } from "@/services/member/address.service";
import { Address } from "@/types/member/Address";

export function useSetDefaultAddress() {
  const [loading, setLoading] = useState(false);

  const setDefault = async (id: number): Promise<Address | null> => {
    try {
      setLoading(true);
      const updated = await setDefaultAddress(id);
      toast.success("ตั้งค่าที่อยู่เริ่มต้นเรียบร้อยแล้ว");
      return updated;
    } catch (err) {
      toast.error("ไม่สามารถตั้งค่าที่อยู่เริ่มต้นได้");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { setDefault, loading };
}
