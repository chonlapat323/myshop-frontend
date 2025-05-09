import { API_URL } from "@/lib/config";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { User } from "@/types/context/auth-context";
import { RegisterMemberDto } from "@/types/member/register-member";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function registerMember(data: RegisterMemberDto): Promise<User> {
  return fetchWithAuth<User>(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login_member`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Email or password is incorrect");
  }

  return data;
}

export async function fetchStatusAndGetUser(): Promise<{
  email: string;
  role: string;
} | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/status_member`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.user;
  } catch (err) {
    console.error("Failed to fetch auth status:", err);
    return null;
  }
}

export async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to refresh token");

    if (data.accessToken) {
      return data.accessToken;
    }

    return null;
  } catch (err) {
    return null;
  }
}
