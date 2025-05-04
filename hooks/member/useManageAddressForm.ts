import { useState, useCallback, useEffect } from "react";
import { useCreateAddress } from "../api/address/useCreateAddress";
import { Address } from "@/types/member/address";
import { getAddresses } from "@/services/member/address.service";
import { useUpdateAddress } from "../api/address/useUpdateAddress";
export function useManageAddressForm() {
  const { create, loading } = useCreateAddress();
  const { update } = useUpdateAddress();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const [newAddress, setNewAddress] = useState({
    full_name: "",
    address_line: "",
    city: "",
    state: "",
    zip_code: "",
    phone_number: "",
    is_default: false,
  });
  const [errors, setErrors] = useState({
    full_name: "",
    address_line: "",
    city: "",
    state: "",
    zip_code: "",
    phone_number: "",
  });

  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const handleEdit = (address: Address) => {
    setIsAdding(true);
    setEditingAddressId(address.id ?? null);
    setNewAddress({
      full_name: address.full_name,
      address_line: address.address_line,
      city: address.city,
      state: address.state,
      zip_code: address.zip_code,
      phone_number: address.phone_number,
      is_default: address.is_default ?? false,
    });
    setErrors({
      full_name: "",
      address_line: "",
      city: "",
      state: "",
      zip_code: "",
      phone_number: "",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAddresses();
        setAddresses(data);
      } catch (err) {
        console.error("Failed to load addresses", err);
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
      is_default: false,
    });
  }, [newAddress]);

  const handleUpdateEdit = useCallback(async () => {
    if (!validate() || !editingAddressId) return;
    debugger;
    const updated = await update(editingAddressId, newAddress);
    if (updated) {
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === updated.id ? updated : addr))
      );
    }
    cancelEdit();
  }, [editingAddressId, newAddress]);

  const cancelEdit = () => {
    setIsAdding(false);
    setEditingAddressId(null);
    setNewAddress({
      full_name: "",
      address_line: "",
      city: "",
      state: "",
      zip_code: "",
      phone_number: "",
      is_default: false,
    });
    setErrors({
      full_name: "",
      address_line: "",
      city: "",
      state: "",
      zip_code: "",
      phone_number: "",
    });
  };

  return {
    isAdding,
    setIsAdding,
    newAddress,
    handleChange,
    handleSaveNew,
    addresses,
    setAddresses,
    handleUpdateEdit,
    handleEdit,
    cancelEdit,
    editingAddressId,
    errors,
    loading,
  };
}
