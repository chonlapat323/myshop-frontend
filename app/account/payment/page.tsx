"use client";

import { useState } from "react";

interface PaymentMethod {
  id: number;
  cardHolder: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  isDefault: boolean;
}

export default function PaymentMethodPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>([
    {
      id: 1,
      cardHolder: "John Doe",
      cardNumber: "**** **** **** 1234",
      expiryDate: "12/26",
      cvv: "***",
      isDefault: true,
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<PaymentMethod | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newMethod, setNewMethod] = useState<PaymentMethod>({
    id: Date.now(),
    cardHolder: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    isDefault: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validate form fields
  const validate = (data: PaymentMethod) => {
    const tempErrors: { [key: string]: string } = {};

    if (!data.cardHolder) tempErrors.cardHolder = "Cardholder name is required";
    if (!data.cardNumber || data.cardNumber.length < 16)
      tempErrors.cardNumber = "Card number must be 16 digits";
    if (!data.expiryDate) tempErrors.expiryDate = "Expiry date is required";
    if (!data.cvv || data.cvv.length < 3)
      tempErrors.cvv = "CVV must be 3 digits";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isAdding) {
      setNewMethod((prev) => ({ ...prev, [name]: value }));
    } else if (editingId) {
      setEditData((prev) => ({ ...prev!, [name]: value }));
    }
  };

  // Save Edited Payment Method
  const handleSave = () => {
    if (editData && validate(editData)) {
      setMethods((prev) =>
        prev.map((method) => (method.id === editingId ? editData : method))
      );
      setEditingId(null);
      setEditData(null);
      setErrors({}); // Clear errors after successful save
    }
  };

  // Save New Payment Method
  const handleSaveNew = () => {
    if (validate(newMethod)) {
      setMethods([...methods, { ...newMethod, id: Date.now() }]);
      setIsAdding(false);
      setNewMethod({
        id: Date.now(),
        cardHolder: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        isDefault: false,
      });
      setErrors({}); // Clear errors after successful save new
    }
  };

  // Set Default Payment Method
  const handleSetDefault = (id: number) => {
    setMethods((prev) =>
      prev.map((method) => ({ ...method, isDefault: method.id === id }))
    );
  };

  // Cancel Edit or Add Mode
  const handleCancel = () => {
    setEditingId(null);
    setEditData(null);
    setIsAdding(false);
    setErrors({}); // Clear errors when cancel
  };

  return (
    <section className="mx-auto">
      <h2 className="text-2xl font-bold mb-4">Payment Methods</h2>

      {methods.length > 0 ? (
        <div className="space-y-4">
          {methods.map((method) => (
            <div
              key={method.id}
              className={`border p-4 rounded-md shadow-sm bg-white ${
                method.isDefault ? "border-black" : "border-gray-200"
              }`}
            >
              {editingId === method.id ? (
                // Editable Form Fields
                <div className="space-y-2">
                  <input
                    type="text"
                    name="cardHolder"
                    value={editData?.cardHolder || ""}
                    onChange={handleChange}
                    placeholder="Cardholder Name"
                    className="w-full border px-3 py-2 rounded-md"
                  />
                  {errors.cardHolder && (
                    <p className="text-red-500 text-sm">{errors.cardHolder}</p>
                  )}

                  <input
                    type="text"
                    name="cardNumber"
                    value={editData?.cardNumber || ""}
                    onChange={handleChange}
                    placeholder="Card Number (16 digits)"
                    className="w-full border px-3 py-2 rounded-md"
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm">{errors.cardNumber}</p>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      name="expiryDate"
                      value={editData?.expiryDate || ""}
                      onChange={handleChange}
                      placeholder="Expiry Date (MM/YY)"
                      className="border px-3 py-2 rounded-md"
                    />
                    <input
                      type="text"
                      name="cvv"
                      value={editData?.cvv || ""}
                      onChange={handleChange}
                      placeholder="CVV (3 digits)"
                      className="border px-3 py-2 rounded-md"
                    />
                  </div>
                  {errors.expiryDate && (
                    <p className="text-red-500 text-sm">{errors.expiryDate}</p>
                  )}
                  {errors.cvv && (
                    <p className="text-red-500 text-sm">{errors.cvv}</p>
                  )}

                  {/* Save & Cancel Buttons */}
                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={handleSave}
                      className="bg-black text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-800"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-gray-500 hover:underline text-sm cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // Display Mode
                <div>
                  <h3 className="font-semibold">
                    {method.cardHolder}{" "}
                    {method.isDefault && (
                      <span className="bg-black text-white text-xs px-2 py-1 rounded-md ml-2">
                        Default
                      </span>
                    )}
                  </h3>
                  <p>{method.cardNumber}</p>
                  <p>Expires: {method.expiryDate}</p>

                  {/* Edit, Delete & Default Buttons */}
                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={() => {
                        setEditingId(method.id);
                        setEditData({ ...method });
                      }}
                      className="bg-black text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleSetDefault(method.id)}
                      className="bg-gray-200 text-black px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-300"
                    >
                      Set as Default
                    </button>
                    <button className="text-red-500 hover:underline text-sm cursor-pointer">
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No saved payment methods.</p>
      )}

      {/* Add New Payment Method Form */}
      {isAdding && (
        <div className="mt-6 border p-4 rounded-md shadow-sm bg-white">
          <h3 className="text-lg font-semibold mb-4">Add New Payment Method</h3>
          <div className="space-y-2">
            <input
              type="text"
              name="cardHolder"
              value={newMethod.cardHolder}
              onChange={handleChange}
              placeholder="Cardholder Name"
              className="w-full border px-3 py-2 rounded-md"
            />
            {errors.cardHolder && (
              <p className="text-red-500 text-sm">{errors.cardHolder}</p>
            )}

            <input
              type="text"
              name="cardNumber"
              value={newMethod.cardNumber}
              onChange={handleChange}
              placeholder="Card Number (16 digits)"
              className="w-full border px-3 py-2 rounded-md"
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm">{errors.cardNumber}</p>
            )}

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                name="expiryDate"
                value={newMethod.expiryDate}
                onChange={handleChange}
                placeholder="Expiry Date (MM/YY)"
                className="border px-3 py-2 rounded-md"
              />
              <input
                type="text"
                name="cvv"
                value={newMethod.cvv}
                onChange={handleChange}
                placeholder="CVV (3 digits)"
                className="border px-3 py-2 rounded-md"
              />
            </div>
            {errors.expiryDate && (
              <p className="text-red-500 text-sm">{errors.expiryDate}</p>
            )}
            {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}

            {/* Save & Cancel Buttons for Add New Payment Method */}
            <div className="mt-3 flex gap-3">
              <button
                onClick={handleSaveNew}
                className="bg-black text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-800"
              >
                Save New
              </button>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:underline text-sm cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Payment Method Button */}
      <button
        onClick={() => setIsAdding(true)}
        className="mt-6 bg-black text-white px-6 py-2 rounded-md cursor-pointer hover:bg-gray-800"
      >
        Add New Payment Method
      </button>
    </section>
  );
}
