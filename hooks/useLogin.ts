"use client";

import { useState } from "react";
import { fetchStatusAndGetUser, login } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
export function useLogin() {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(email: string, password: string) {
    try {
      setLoading(true);
      const res = await login(email, password);
      console.log(res);
      if (res.data.ok) {
        const user = await fetchStatusAndGetUser();
        setUser(user);
        window.location.href = "/";
      } else {
        setError(res.data.message || "Email or password is incorrect");
      }
    } catch (err: unknown) {
      toast.error(`"Login failed: ${err}`);
    } finally {
      setLoading(false);
    }
  }

  return { handleLogin, loading, error };
}
