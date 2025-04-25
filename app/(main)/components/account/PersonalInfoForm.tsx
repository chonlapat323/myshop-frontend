"use client";

import AvatarUpload from "@/component/ui/AvatarUpload";
import { PersonalInfoFormProps } from "@/types/member/PersonalInfoForm";

export default function PersonalInfoForm({
  formData,
  loading,
  submitting,
  onChange,
  onAvatarChange,
  onSubmit,
}: PersonalInfoFormProps) {
  return (
    <div className="mx-auto bg-white p-6 rounded-md shadow">
      <h2 className="text-2xl font-bold mb-4">Personal Information</h2>

      <div className="flex justify-center mb-6">
        <AvatarUpload
          value={formData.avatarUrl}
          loading={loading}
          onChange={onAvatarChange}
        />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={onChange}
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
              onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`w-full cursor-pointer py-2 rounded-md ${
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
