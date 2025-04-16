"use client";

import AvatarUpload from "@/app/(main)/components/ui/AvatarUpload";
import { useMemberForm } from "@/hooks/member/useMemberForm"; // ✅ Hook ใหม่

export default function PersonalInfo() {
  const { formData, handleChange, handleSubmit, loading, error, submitting } =
    useMemberForm();

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mx-auto bg-white p-6 md:mt-0 mt-4 rounded-md shadow">
      <h2 className="text-2xl font-bold mb-4">Personal Information</h2>

      {/* Avatar Upload */}
      <div className="flex justify-center mb-6">
        <AvatarUpload />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-2 rounded-md ${
            submitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {submitting ? "Updating..." : "Update Changes"}
        </button>
      </form>
    </div>
  );
}
