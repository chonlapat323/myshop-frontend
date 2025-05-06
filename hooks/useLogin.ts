"use client";

import { useState } from "react";
import { fetchStatusAndGetUser, login } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
export function useLogin() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(email: string, password: string) {
    try {
      setLoading(true);
      const res = await login(email, password);
      const data = await res.json();
      if (res.ok) {
        window.location.href = "/";
      } else {
        setError(data.message || "Email or password is incorrect");
      }
      const user = await fetchStatusAndGetUser();
      setUser(user);
      router.push("/");
    } catch (err: unknown) {
      toast.error(`"Login failed: ${err}`);
    } finally {
      setLoading(false);
    }
  }

  return { handleLogin, loading, error };
}
