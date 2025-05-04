import { useState } from "react";
import { toast } from "sonner";
import { setDefaultAddress } from "@/services/member/address.service";
import { Address } from "@/types/member/address";

export function useSetDefaultAddress() {
  const [loading, setLoading] = useState(false);

  const setDefault = async (id: number): Promise<Address | null> => {
    try {
      setLoading(true);
      const updated = await setDefaultAddress(id);
      toast.success("Default address set successfully");
      return updated;
    } catch (err) {
      toast.error("Failed to set default address");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { setDefault, loading };
}
