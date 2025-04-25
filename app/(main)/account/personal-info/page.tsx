"use client";
import PersonalInfoForm from "../../components/account/PersonalInfoForm";
import { useMemberForm } from "@/hooks/member/useMemberForm";

export default function PersonalInfo() {
  const {
    formData,
    handleChange,
    handleSubmit,
    handleAvatarChange,
    loading,
    error,
    submitting,
  } = useMemberForm();

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <PersonalInfoForm
      formData={formData}
      loading={loading}
      submitting={submitting}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onAvatarChange={handleAvatarChange}
    />
  );
}
