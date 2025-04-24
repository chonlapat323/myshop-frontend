"use client";

import ManagePaymentForm from "../../components/account/ManagePaymentForm";
import ManagePaymentList from "../../components/account/ManagePaymentList";
import { useManagePaymentForm } from "@/hooks/member/useManagePaymentForm";

export default function PaymentMethodPage() {
  const {
    methods,
    setMethods,
    editingId,
    isAdding,
    setIsAdding,
    newMethod,
    handleChange,
    handleSaveNew,
    handleUpdateEdit,
    cancelEdit,
    handleEdit,
    errors,
    loading,
  } = useManagePaymentForm();

  return (
    <section className="mx-auto px-0 py-0">
      <h2 className="text-2xl font-bold mb-4">Payment Methods</h2>

      <ManagePaymentList
        methods={methods}
        setMethods={setMethods}
        onEdit={handleEdit}
        editingId={editingId}
        newMethod={newMethod}
        errors={errors}
        onChange={handleChange}
        onSaveOrUpdate={handleUpdateEdit}
        onCancel={cancelEdit}
        loading={loading}
      />

      {isAdding && !editingId && (
        <ManagePaymentForm
          newMethod={newMethod}
          errors={errors}
          loading={loading}
          onChange={handleChange}
          onSaveOrUpdate={handleSaveNew}
          onCancel={cancelEdit}
          editingId={null}
        />
      )}

      {editingId && !isAdding && (
        <ManagePaymentForm
          newMethod={newMethod}
          errors={errors}
          loading={loading}
          onChange={handleChange}
          onSaveOrUpdate={handleUpdateEdit}
          onCancel={cancelEdit}
          editingId={editingId}
        />
      )}

      {!isAdding && !editingId && (
        <button
          onClick={() => setIsAdding(true)}
          className="cursor-pointer mt-6 bg-black text-white px-6 py-2 rounded-md"
        >
          Add New Payment Method
        </button>
      )}
    </section>
  );
}
