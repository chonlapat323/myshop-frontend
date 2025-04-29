import { updateAddress } from "@/services/member/address.service";
import { Address } from "@/types/member/Address";
import { toast } from "sonner";
import { useState } from "react";

export function useUpdateAddress() {
  const [loading, setLoading] = useState(false);

  const update = async (id: number, data: Partial<Address>) => {
    try {
      setLoading(true);
      const updated = await updateAddress(id, data);
      toast.success("Address updated successfully");
      return updated;
    } catch (err) {
      toast.error("Failed to update address");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading };
}
