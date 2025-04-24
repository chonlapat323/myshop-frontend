"use client";

import { useState } from "react";
import { fetchStatusAndGetUser, login } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
export function useLogin() {
  const { setUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(email: string, password: string) {
    try {
      setLoading(true);
      await login(email, password);
      const user = await fetchStatusAndGetUser();
      setUser(user);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return { handleLogin, loading, error };
}
