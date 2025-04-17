import { useState, useCallback } from "react";
import { useCreateAddress } from "../api/address/useCreateAddress";

export function useManageAddressForm() {
  const { create, loading } = useCreateAddress();
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
    await create(newAddress);
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
    errors,
    loading,
  };
}
