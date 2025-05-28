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
      await login(email, password);
      const user = await fetchStatusAndGetUser();
      setUser(user);
      window.location.href = "/";
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed");
      }
      setLoading(false);
    }
  }

  return { handleLogin, loading, error };
}
