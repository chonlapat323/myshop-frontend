import { useState, useCallback, useEffect } from "react";
import { useCreateAddress } from "../api/address/useCreateAddress";
import { Address } from "@/types/member/address";
import { getAddresses } from "@/services/member/address.service";

export function useManageAddressForm() {
  const { create, loading } = useCreateAddress();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newAddress, setNewAddress] = useState({
    full_name: "",
    address_line: "",
    city: "",
    state: "",
    zip_code: "",
    phone_number: "",
  });

  const [errors, setErrors] = useState({
    full_name: "",
    address_line: "",
    city: "",
    state: "",
    zip_code: "",
    phone_number: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAddresses();
        setAddresses(data);
      } catch (err) {
        console.error("โหลดที่อยู่ไม่สำเร็จ", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { ...errors };

    for (const key in newErrors) {
      if (!newAddress[key as keyof typeof newAddress]) {
        newErrors[key as keyof typeof newErrors] = "This field is required";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveNew = useCallback(async () => {
    if (!validate()) return;
    const newItem = await create(newAddress);
    if (newItem) {
      setAddresses((prev) => [...prev, newItem]);
    }
    setIsAdding(false);
    setNewAddress({
      full_name: "",
      address_line: "",
      city: "",
      state: "",
      zip_code: "",
      phone_number: "",
    });
  }, [newAddress]);

  return {
    isAdding,
    setIsAdding,
    newAddress,
    handleChange,
    handleSaveNew,
    addresses,
    setAddresses,
    errors,
    loading,
  };
}
