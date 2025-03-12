"use client";

import { useState } from "react";

interface Address {
  id: number;
  fullName: string;
  addressLine: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  isDefault: boolean;
}

export default function ManageAddress() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      fullName: "John Doe",
      addressLine: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      phone: "+1 234 567 890",
      isDefault: true,
    },
    {
      id: 2,
      fullName: "Jane Smith",
      addressLine: "456 Elm St",
      city: "San Francisco",
      state: "CA",
      zip: "94102",
      phone: "+1 987 654 321",
      isDefault: false,
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Address | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newAddress, setNewAddress] = useState<Address>({
    id: Date.now(),
    fullName: "",
    addressLine: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    isDefault: false,
  });

  // Handle field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editData && !isAdding) return;
    if (isAdding) {
      setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    } else {
      setEditData({ ...editData!, [e.target.name]: e.target.value });
    }
  };

  // Save Edited Address
  const handleSave = () => {
    if (!editData) return;
    setAddresses((prev) =>
      prev.map((addr) => (addr.id === editingId ? editData : addr))
    );
    setEditingId(null);
    setEditData(null);
  };

  // Save New Address
  const handleSaveNew = () => {
    if (!newAddress.fullName || !newAddress.addressLine) return;
    setAddresses([...addresses, { ...newAddress, id: Date.now() }]);
    setIsAdding(false);
    setNewAddress({
      id: Date.now(),
      fullName: "",
      addressLine: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      isDefault: false,
    });
  };

  // Set Address as Default
  const handleSetDefault = (id: number) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  // Cancel Edit or Add Mode
  const handleCancel = () => {
    setEditingId(null);
    setEditData(null);
    setIsAdding(false);
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Manage Address</h2>

      {addresses.length > 0 ? (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`border p-4 rounded-md shadow-sm bg-white ${
                address.isDefault ? "border-black" : "border-gray-200"
              }`}
            >
              {editingId === address.id ? (
                // Editable Input Fields
                <div className="space-y-2">
                  <input
                    type="text"
                    name="fullName"
                    value={editData?.fullName || ""}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full border px-3 py-2 rounded-md"
                  />
                  <input
                    type="text"
                    name="addressLine"
                    value={editData?.addressLine || ""}
                    onChange={handleChange}
                    placeholder="Address Line"
                    className="w-full border px-3 py-2 rounded-md"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      name="city"
                      value={editData?.city || ""}
                      onChange={handleChange}
                      placeholder="City"
                      className="border px-3 py-2 rounded-md"
                    />
                    <input
                      type="text"
                      name="state"
                      value={editData?.state || ""}
                      onChange={handleChange}
                      placeholder="State"
                      className="border px-3 py-2 rounded-md"
                    />
                    <input
                      type="text"
                      name="zip"
                      value={editData?.zip || ""}
                      onChange={handleChange}
                      placeholder="ZIP Code"
                      className="border px-3 py-2 rounded-md"
                    />
                  </div>
                  <input
                    type="text"
                    name="phone"
                    value={editData?.phone || ""}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full border px-3 py-2 rounded-md"
                  />

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
                    {address.fullName}{" "}
                    {address.isDefault && (
                      <span className="bg-black text-white text-xs px-2 py-1 rounded-md ml-2">
                        Default
                      </span>
                    )}
                  </h3>
                  <p>{address.addressLine}</p>
                  <p>
                    {address.city}, {address.state} {address.zip}
                  </p>
                  <p className="text-gray-500">{address.phone}</p>

                  {/* Edit, Delete & Default Buttons */}
                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={() => {
                        setEditingId(address.id);
                        setEditData({ ...address });
                      }}
                      className="bg-black text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleSetDefault(address.id)}
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
        <p className="text-gray-500">No saved addresses.</p>
      )}

      {/* Add New Address Button */}
      <button
        onClick={() => setIsAdding(true)}
        className="mt-6 bg-black text-white px-6 py-2 rounded-md"
      >
        Add New Address
      </button>
    </section>
  );
}
