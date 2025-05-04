import { createAddress } from "@/services/member/address.service";
import { useState } from "react";
import { toast } from "sonner";
import { Address, CreateAddressDto } from "@/types/member/address";
export function useCreateAddress() {
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const create = async (data: CreateAddressDto) => {
    try {
      setLoading(true);
      const newAddress = await createAddress(data);
      toast.success("Address added successfully");
      return newAddress;
    } catch (error) {
      toast.error("Failed to add address");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading };
}
