import { useState } from "react";
import { toast } from "sonner";
import { deleteAddress } from "@/services/member/address.service";

export function useDeleteAddress() {
  const [loading, setLoading] = useState(false);

  const remove = async (id: number): Promise<boolean> => {
    try {
      setLoading(true);
      await deleteAddress(id);
      toast.success("Address deleted successfully");
      return true;
    } catch (err) {
      toast.error("Failed to delete address");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading };
}
