// hooks/api/address/useUpdateAddress.ts

import { updateAddress } from "@/services/member/address.service";
import { Address } from "@/types/member/address";
import { toast } from "sonner";
import { useState } from "react";

export function useUpdateAddress() {
  const [loading, setLoading] = useState(false);

  const update = async (id: string, data: Partial<Address>) => {
    try {
      setLoading(true);
      const updated = await updateAddress(id, data);
      toast.success("อัปเดตที่อยู่เรียบร้อยแล้ว");
      return updated;
    } catch (err) {
      toast.error("ไม่สามารถอัปเดตที่อยู่ได้");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading };
}
