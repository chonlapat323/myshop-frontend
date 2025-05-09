import { useState } from "react";
import { RegisterMemberDto } from "@/types/member/register-member";
import { registerMember } from "@/services/auth.service";
import { toast } from "sonner";
import { HttpError } from "@/lib/HttpError";
import { UseFormSetError } from "react-hook-form";

export function useRegisterMember(
  setError: UseFormSetError<RegisterMemberDto>
) {
  const [loading, setLoading] = useState(false);
  const handleRegister = async (data: RegisterMemberDto) => {
    try {
      setLoading(true);

      await registerMember(data);
      toast.success("Register successful");
      window.location.assign("/login");
    } catch (error) {
      if (error instanceof HttpError) {
        setError("email", {
          type: "manual",
          message: error.message,
        });
      } else {
        toast.error("Register failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading };
}
