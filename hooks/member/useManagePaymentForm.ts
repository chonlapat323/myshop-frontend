import { useState, useEffect, useCallback } from "react";
import { PaymentMethod } from "@/types/member/payment";
import { getPaymentMethods } from "@/services/member/payment.service";
import { useCreatePayment } from "@/hooks/api/payment/useCreatePayment";
import { useUpdatePayment } from "@/hooks/api/payment/useUpdatePayment";

export function useManagePaymentForm() {
  const { create, loading: creating } = useCreatePayment();
  const { update, loading: updating } = useUpdatePayment();

  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newMethod, setNewMethod] = useState({
    cardholder_name: "",
    card_number: "",
    expiry_date: "",
    is_default: false,
  });

  const [errors, setErrors] = useState({
    cardholder_name: "",
    card_number: "",
    expiry_date: "",
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getPaymentMethods();
        setMethods(res);
      } catch (err) {
        console.error("โหลดรายการ payment method ไม่สำเร็จ", err);
      }
    };
    fetch();
  }, []);

  const handleEdit = (method: PaymentMethod) => {
    setIsAdding(true);
    setEditingId(method.id ?? null);
    setNewMethod({
      cardholder_name: method.cardholder_name,
      card_number: method.card_number,
      expiry_date: method.expiry_date,
      is_default: method.is_default ?? false,
    });
    setErrors({
      cardholder_name: "",
      card_number: "",
      expiry_date: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMethod({ ...newMethod, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let isValid = true;
    const tempErrors = { ...errors };

    if (!newMethod.cardholder_name) {
      tempErrors.cardholder_name = "Cardholder name is required";
      isValid = false;
    }
    if (!newMethod.card_number || newMethod.card_number.length < 16) {
      tempErrors.card_number = "Card number must be 16 digits";
      isValid = false;
    }
    if (
      !newMethod.expiry_date ||
      !/^(0[1-9]|1[0-2])\/\d{2}$/.test(newMethod.expiry_date)
    ) {
      tempErrors.expiry_date = "Expiry date must be in MM/YY format";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSaveNew = useCallback(async () => {
    if (!validate()) return;
    const result = await create(newMethod);
    if (result) {
      setMethods((prev) => [...prev, result]);
    }
    cancelEdit();
  }, [newMethod]);

  const handleUpdateEdit = useCallback(async () => {
    if (!validate() || !editingId) return;
    const updated = await update(editingId, newMethod);
    if (updated) {
      setMethods((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
    }
    cancelEdit();
  }, [editingId, newMethod]);

  const cancelEdit = () => {
    setIsAdding(false);
    setEditingId(null);
    setNewMethod({
      cardholder_name: "",
      card_number: "",
      expiry_date: "",
      is_default: false,
    });
    setErrors({
      cardholder_name: "",
      card_number: "",
      expiry_date: "",
    });
  };

  return {
    isAdding,
    setIsAdding,
    newMethod,
    handleChange,
    handleSaveNew,
    handleUpdateEdit,
    methods,
    setMethods,
    handleEdit,
    cancelEdit,
    editingId,
    errors,
    loading: creating || updating,
  };
}
