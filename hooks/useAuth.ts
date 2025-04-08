// hooks/useAuth.ts
"use client";

import { useState, useEffect } from "react";
import { fetchStatusAndGetUser } from "@/services/auth.service";

export function useAuth() {
  const [user, setUser] = useState<{ email: string; role: string } | null>(
    null
  );
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetchStatusAndGetUser()
      .then((user) => setUser(user))
      .finally(() => setIsReady(true));
  }, []);

  return {
    isAuthenticated: !!user,
    isReady,
    user, // ✅ เอาไว้ใช้ใน UI เช่น user.email
  };
}
