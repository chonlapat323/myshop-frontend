const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // ✅ สำคัญ! cookie จะถูกแนบกลับมา
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  // ✅ ไม่มีการอ่าน token หรือเก็บ accessToken แล้ว
  return data; // หรือจะ return true ก็ได้
}

export async function fetchStatusAndGetUser(): Promise<{
  email: string;
  role: string;
} | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/status`,
      {
        method: "GET",
        credentials: "include", // ✅ ต้องมี เพื่อให้ cookie ติดไป
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.user; // { email, role }
  } catch (err) {
    console.error("Failed to fetch auth status:", err);
    return null;
  }
}

export async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include", // เพื่อใช้ refreshToken จาก cookie
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
