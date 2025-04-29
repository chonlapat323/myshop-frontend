"use client";
import { useEffect, useState } from "react";
import {
  getMemberInfo,
  updateMemberInfo,
} from "@/services/member/member.service";
import { toast } from "sonner";
import { API_URL } from "@/lib/config";

export type MemberProfileForm = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  avatar?: File;
};

export function toFormData(input: MemberProfileForm): FormData {
  const form = new FormData();
  form.append("first_name", input.first_name);
  form.append("last_name", input.last_name);
  form.append("email", input.email);
  form.append("phone_number", input.phone_number);
  if (input.avatar) form.append("avatar", input.avatar);
  return form;
}

export function useMemberForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    avatar_url: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMemberInfo();
        setFormData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          phone_number: data.phone_number || "",
          avatar_url: `${API_URL}${data.avatar_url}` || "",
        });
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (file: File | null) => {
    if (!file) return;
    setAvatarFile(file);
    const preview = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      avatar_url: preview,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const payload = toFormData({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_number: formData.phone_number,
        avatar: avatarFile ?? undefined,
      });
      await updateMemberInfo(payload);
      toast.success("Profile updated successfully");
    } catch (err) {
      setError("Failed to update profile");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleAvatarChange,
    handleSubmit,
    loading,
    submitting,
    error,
  };
}
