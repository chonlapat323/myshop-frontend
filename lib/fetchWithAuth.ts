import { API_URL } from "@/lib/config";
import { HttpError } from "./HttpError";
export async function fetchWithAuth<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  let response = await fetch(input, {
    ...init,
    credentials: "include",
  });

  if (response.status === 401) {
    const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshRes.ok) {
      response = await fetch(input, {
        ...init,
        credentials: "include",
      });
    } else {
      window.location.href = "/login";
      throw new HttpError("Unauthorized, redirected to signin", 401); // 👈 new HttpError จริง
    }
  }

  if (!response.ok) {
    let errorMessage = "Unknown error";
    let statusCode = response.status;

    try {
      const errorBody = await response.json();
      errorMessage = errorBody.message || errorMessage;
      statusCode = errorBody.statusCode || statusCode;
    } catch {
      errorMessage = await response.text();
    }

    throw new HttpError(errorMessage, statusCode);
  }
  console.log(response.headers.get("content-type"));
  const contentLength = response.headers.get("content-length");
  if (
    response.status === 204 ||
    !contentLength ||
    Number(contentLength) === 0
  ) {
    return undefined as T; // ✅ ไม่มีเนื้อหา → ไม่ต้อง parse json
  }

  let data: T;
  try {
    data = await response.json();
  } catch (err) {
    console.error("❌ Failed to parse JSON:", err);
    const rawText = await response.text();
    console.warn("❗ Raw response text:", rawText.slice(0, 300));
    throw new HttpError("Invalid JSON response", response.status);
  }
  return data;
}
