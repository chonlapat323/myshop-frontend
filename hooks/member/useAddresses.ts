"use client";

import { useEffect, useState } from "react";
import { getAddresses } from "@/services/member/address.service";
import { Address } from "@/types/member/Address";

export function useAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await getAddresses();
        setAddresses(data);
      } catch (err) {
        setError("ไม่สามารถโหลดรายการที่อยู่ได้");
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  return {
    addresses,
    loading,
    error,
    setAddresses,
  };
}
