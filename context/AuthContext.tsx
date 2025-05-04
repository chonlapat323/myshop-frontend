"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { fetchStatusAndGetUser } from "@/services/auth.service";
import { User } from "@/types/context/auth-context";

const AuthContext = createContext<{
  user: User;
  setUser: (user: User) => void;
  loading: boolean;
}>({
  user: null,
  setUser: () => {},
  loading: true,
});

export function AuthProvider({
  children,
  checkOnMount = true,
}: {
  children: React.ReactNode;
  checkOnMount?: boolean;
}) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(checkOnMount);

  useEffect(() => {
    if (!checkOnMount) return;

    fetchStatusAndGetUser()
      .then(setUser)
      .catch((err) => {
        if (err instanceof Error && err.message !== "Unauthorized") {
          console.error("Auth check failed:", err);
        }
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [checkOnMount]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
