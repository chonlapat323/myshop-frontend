"use client";

import { useState } from "react";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    let tempErrors: { [key: string]: string } = {};
    if (!currentPassword) {
      tempErrors.currentPassword = "Current password is required";
    }
    if (!newPassword) {
      tempErrors.newPassword = "New password is required";
    } else if (newPassword.length <= 8) {
      tempErrors.newPassword =
        "Your new password must be more than 8 characters";
    }
    if (newPassword !== confirmNewPassword) {
      tempErrors.confirmNewPassword = "New passwords do not match";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "currentPassword") {
      setCurrentPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmNewPassword") {
      setConfirmNewPassword(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // ในส่วนนี้คือส่วนที่คุณจะเรียก API หรือ function เพื่อเปลี่ยนรหัสผ่านจริงๆ
      // สำหรับ demo นี้ เราจะ console log ข้อมูลที่กรอก
      console.log("Current Password:", currentPassword);
      console.log("New Password:", newPassword);
      console.log("Password Change Successful!");
      // หลังจากเปลี่ยนรหัสผ่านสำเร็จ อาจจะ reset form หรือ redirect ไปหน้าอื่น
      resetForm();
    } else {
      console.log("Form validation failed. Please check errors.");
    }
  };

  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setErrors({});
  };

  return (
    <section className="max-w-md md:py-0 py-6">
      {" "}
      {/* นำ mx-auto ออก */}
      <h2 className="text-2xl font-bold mb-4">Password</h2>
      <p className="text-gray-700 mb-4">
        Please enter your current password to change your password.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Current password
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={currentPassword}
            onChange={handleChange}
            className="mt-1 block w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.currentPassword}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            New password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
            className="mt-1 block w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
          )}
          {newPassword && newPassword.length <= 8 && !errors.newPassword && (
            <p className="text-gray-500 text-sm mt-1">
              Your new password must be more than 8 characters.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmNewPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm new password
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={confirmNewPassword}
            onChange={handleChange}
            className="mt-1 block w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          />
          {errors.confirmNewPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmNewPassword}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-800"
          >
            Change Password
          </button>
        </div>
      </form>
    </section>
  );
}
