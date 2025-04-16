import { useEffect, useState } from "react";
import {
  getMemberInfo,
  updateMemberInfo,
} from "@/services/member/member.service";
import { toast } from "sonner";

export function useMemberForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getMemberInfo();
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phoneNumber || "",
        });
      } catch (err) {
        setError("ไม่สามารถโหลดข้อมูลสมาชิก");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateMemberInfo({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phone,
        avatarUrl: "", // ยังไม่ได้จัดการ avatar
      });
      toast.success("บันทึกข้อมูลเรียบร้อย");
    } catch (err) {
      toast.error("เกิดข้อผิดพลาด");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    formData,
    loading,
    error,
    submitting,
    handleChange,
    handleSubmit,
  };
}
