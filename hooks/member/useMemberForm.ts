"use client";
import { useEffect, useState } from "react";
import {
  getMemberInfo,
  updateMemberInfo,
} from "@/services/member/member.service";
import { toast } from "sonner";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { API_URL } from "@/lib/config";

export function useMemberForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    avatarUrl: "", // ✅ สำหรับ preview
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
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phoneNumber || "",
          avatarUrl: `${API_URL}${data.avatarUrl}` || "",
        });
      } catch (err: any) {
        setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
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
      avatarUrl: preview,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload = new FormData();
      payload.append("first_name", formData.firstName);
      payload.append("last_name", formData.lastName);
      payload.append("email", formData.email);
      payload.append("phone_number", formData.phone);
      if (avatarFile) {
        payload.append("avatar", avatarFile);
      }

      const res = await fetchWithAuth(`${API_URL}/users/me`, {
        method: "PATCH",
        body: payload,
      });

      if (!res.ok) throw new Error("update failed");
      toast.success("อัปเดตข้อมูลเรียบร้อยแล้ว");
    } catch (err) {
      setError("อัปเดตข้อมูลไม่สำเร็จ");
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
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
